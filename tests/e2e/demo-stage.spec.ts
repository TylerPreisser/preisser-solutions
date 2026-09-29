import { test, expect, type Browser, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { ORIGIN, OUT_DIR, serveOut } from "./lib/serve-out";
import { VIEWPORTS, vpName, type Vp } from "./lib/viewports";
import {
  armEverything,
  contrast,
  endStateViolations,
  overflowViolations,
  parseRgb,
  renderedStageIds,
  stepBarOcclusion,
  tapViolations,
  themeReadout,
  tourPanelGeometry,
  trackEndStateViolations,
} from "./lib/checks";

/** One file per stage lane: tests/e2e/stages/<slug>.json = { route, stages }. */
interface Manifest {
  route: string;
  stages: string[];
}
const MANIFESTS: Manifest[] = (() => {
  const dir = path.resolve("tests/e2e/stages");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Manifest);
})();

const SHOTS = path.resolve("test-results/demo-stage-shots");
const GROUND = { dark: [10, 22, 40], light: [255, 255, 255] } as const; // --theme-section-alt, globals.css:155, :215
const byName = (w: number, h: number) => VIEWPORTS.find((v) => v.w === w && v.h === h) as Vp;

async function open(browser: Browser, browserName: string, vp: Vp, o: { js?: boolean; reduced?: boolean } = {}) {
  const tablet = !vp.phone && vp.w < 1024;
  const context = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: vp.phone ? 3 : tablet ? 2 : 1,
    hasTouch: vp.phone || tablet,
    isMobile: vp.phone && browserName !== "firefox", // Firefox does not support isMobile
    javaScriptEnabled: o.js ?? true,
    reducedMotion: o.reduced ? "reduce" : "no-preference",
  });
  await serveOut(context);
  return { context, page: await context.newPage() };
}

async function hydrated(page: Page) {
  await page.waitForFunction(
    () => document.querySelectorAll("[data-track]").length > 0 && document.querySelectorAll("[data-track]:not([data-track-js])").length === 0,
  );
}

/** Post-load, never addInitScript: layout.tsx overwrites an init-script theme (CLAUDE.md trap). */
async function setTheme(page: Page, theme: "dark" | "light") {
  await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
  await expect
    .poll(async () => {
      const r = await page.evaluate(themeReadout);
      return r.section ? parseRgb(r.section) : null;
    }, { message: `section ground did not become ${theme}` })
    .toEqual([...GROUND[theme]]);
}

/**
 * Screenshots here are EVIDENCE, never the assertion: every call site captures
 * only after its own real checks (renderedStageIds/endStateViolations/
 * overflowViolations/contrast) already passed. A real six-tab stage stacks
 * to ~11,880 CSS px without JS (review-NW.md, PR #12 `b8a5aab`); at
 * deviceScaleFactor 3 (phone contexts, `open()` above) that is ~35,600
 * device px, past Firefox's own 32,767px screenshot ceiling
 * ("Cannot take screenshot larger than 32767") even though nothing is wrong
 * with the page. `scale: "css"` renders one image pixel per CSS pixel,
 * ignoring deviceScaleFactor, which stays under the ceiling for any
 * page this site would ever ship; fall back to it instead of failing a test
 * whose checks already passed. If even that throws, log and move on rather
 * than lose the whole test to a screenshot.
 */
async function shot(page: Page, slug: string, engine: string, vp: Vp, theme: string, mode: string) {
  const file = path.join(SHOTS, slug, engine, `${vpName(vp)}-${theme}-${mode}.png`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const target = page.locator("[data-demo-section]");
  try {
    await target.screenshot({ path: file, animations: "disabled" });
  } catch (err) {
    const msg = (err as Error).message.split("\n")[0];
    console.warn(`[demo-stage.spec] ${engine} ${vpName(vp)} ${theme}/${mode}: full-resolution screenshot failed (${msg}); retrying at scale:"css"`);
    try {
      await target.screenshot({ path: file, animations: "disabled", scale: "css" });
    } catch (err2) {
      console.warn(`[demo-stage.spec] ${engine} ${vpName(vp)} ${theme}/${mode}: screenshot skipped entirely (${(err2 as Error).message.split("\n")[0]})`);
    }
  }
}

/**
 * Scrolls a track's top to a safe distance ABOVE the engine's entry line
 * (useStageTimeline.ts: `rootMargin: "0px 0px -35% 0px"`, i.e. the track must
 * cross 65% of the viewport height to start) and waits for it to settle at
 * "end". `scrollIntoViewIfNeeded()` is a no-op when a track is already
 * partly visible just below the fold, which left it sitting at "paused"
 * forever (review-F.md HIGH 1).
 */
async function settleTrack(t: ReturnType<Page["locator"]>): Promise<void> {
  await t.evaluate((el) => window.scrollBy(0, el.getBoundingClientRect().top - window.innerHeight * 0.3));
  await expect(t).toHaveAttribute("data-track-state", "end", { timeout: 60_000 });
}

/**
 * Brings every VISIBLE track on the page to "end", one at a time, and
 * reports how many started below the fold. Used by both the motion test and
 * the Back/Next test, so the latter's whole-page endStateViolations() check
 * never sees another track still armed and pending off screen (HIGH 1's
 * second defect: it scoped nothing and checked the whole page after playing
 * only the one track under test).
 */
async function settleVisibleTracks(page: Page): Promise<{ total: number; armedBelowFold: number }> {
  const tracks = page.locator("[data-demo-stage] [data-track]");
  let armedBelowFold = 0;
  const total = await tracks.count();
  for (let i = 0; i < total; i += 1) {
    const t = tracks.nth(i);
    if (!(await t.isVisible())) continue;
    if ((await t.getAttribute("data-track-state")) === "paused") armedBelowFold += 1;
    await settleTrack(t);
  }
  return { total, armedBelowFold };
}

test("every built stage route is declared in tests/e2e/stages, and every declared route is built", () => {
  const dir = path.join(OUT_DIR, "case-studies");
  expect(fs.existsSync(dir), `no export at ${dir}; run npm run build first`).toBe(true);
  const htmlBySlug = new Map<string, string>();
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".html"))) {
    htmlBySlug.set(f.slice(0, -".html".length), fs.readFileSync(path.join(dir, f), "utf8"));
  }
  const built = [...htmlBySlug.entries()]
    .filter(([, html]) => html.includes("data-demo-section"))
    .map(([slug]) => `/case-studies/${slug}`)
    .sort();
  expect(built).toEqual(MANIFESTS.map((m) => m.route).sort());

  // Non-vacuous even at zero manifests (review-F.md HIGH 1): assert the built
  // stage COUNT per route matches the manifest's declared count, not just the
  // route set, and print how many stages this run actually exercised — so a
  // gate with zero real stages is visibly a no-op, not silently identical to
  // a passing one.
  let exercised = 0;
  for (const m of MANIFESTS) {
    const slug = m.route.split("/").pop() as string;
    const html = htmlBySlug.get(slug) ?? "";
    const rendered = (html.match(/data-demo-stage="/g) ?? []).length;
    expect(rendered, `${m.route}: built page has ${rendered} [data-demo-stage] element(s), manifest declares ${m.stages.length}`).toBe(
      m.stages.length,
    );
    exercised += rendered;
  }
  console.log(`Proof Stage gate: ${MANIFESTS.length} route(s) declared, ${exercised} stage(s) exercised`);
});

for (const m of MANIFESTS) {
  const slug = m.route.split("/").pop() as string;

  test.describe(m.route, () => {
    for (const vp of VIEWPORTS) {
      test(`${vpName(vp)} without JavaScript: end frame, no overflow, both themes`, async ({ browser, browserName }) => {
        const { context, page } = await open(browser, browserName, vp, { js: false });
        try {
          await page.goto(`${ORIGIN}${m.route}`, { waitUntil: "load" });
          expect(await page.evaluate(renderedStageIds)).toEqual({ expected: m.stages, rendered: m.stages });
          expect(await page.evaluate(endStateViolations)).toEqual([]);
          expect(await page.evaluate(overflowViolations)).toEqual([]);
          for (const theme of ["dark", "light"] as const) {
            await setTheme(page, theme);
            await shot(page, slug, browserName, vp, theme, "nojs");
          }
        } finally {
          await context.close();
        }
      });

      test(`${vpName(vp)} reduced motion: end frame, no overflow, 44px targets, measured mat in both themes`, async ({ browser, browserName }) => {
        const { context, page } = await open(browser, browserName, vp, { reduced: true });
        try {
          await page.goto(`${ORIGIN}${m.route}`, { waitUntil: "load" });
          await hydrated(page);
          await page.locator("[data-demo-section]").scrollIntoViewIfNeeded();
          const states = await page.locator("[data-track]").evaluateAll((els) => els.map((e) => e.getAttribute("data-track-state")));
          expect(states.filter((s) => s !== "end"), "a track armed under reduced motion").toEqual([]);
          expect(await page.evaluate(endStateViolations)).toEqual([]);
          expect(await page.evaluate(overflowViolations)).toEqual([]);
          if (vp.phone) expect(await page.evaluate(tapViolations)).toEqual([]);
          for (const theme of ["dark", "light"] as const) {
            await setTheme(page, theme);
            const r = await page.evaluate(themeReadout);
            expect(contrast(r.matEdge, r.section), `${theme}: mat edge vs page`).toBeGreaterThanOrEqual(3);
            if (r.screenEdge) expect(contrast(r.screenEdge, r.mat), `${theme}: screen edge vs mat`).toBeGreaterThanOrEqual(3);
            await shot(page, slug, browserName, vp, theme, "rest");
          }
        } finally {
          await context.close();
        }
      });
    }

    for (const vp of [byName(390, 844), byName(1440, 900)]) {
      test(`${vpName(vp)} with motion: every visible track plays once, ends, and disarms`, async ({ browser, browserName }) => {
        test.setTimeout(180_000);
        const { context, page } = await open(browser, browserName, vp);
        try {
          await page.goto(`${ORIGIN}${m.route}`, { waitUntil: "load" });
          await hydrated(page);
          const { armedBelowFold } = await settleVisibleTracks(page);
          expect(armedBelowFold, "no track armed below the fold: motion was never exercised").toBeGreaterThan(0);
          expect(await page.evaluate(endStateViolations)).toEqual([]);
        } finally {
          await context.close();
        }
      });

      test(`${vpName(vp)} Back, Next and Replay step the same timeline`, async ({ browser, browserName }) => {
        test.setTimeout(120_000);
        const { context, page } = await open(browser, browserName, vp);
        try {
          await page.goto(`${ORIGIN}${m.route}`, { waitUntil: "load" });
          await hydrated(page);
          // Settle EVERY visible track to "end" first, not just the one under
          // test: otherwise a second track still armed and pending below the
          // fold makes a whole-page endStateViolations() check red for a
          // reason unrelated to Back/Next/Replay (review-F.md HIGH 1).
          await settleVisibleTracks(page);
          const t = page.locator("[data-demo-stage] [data-track]:visible").first();
          await expect(t).toHaveAttribute("data-track-state", "end", { timeout: 5_000 });
          const n = Number(await t.getAttribute("data-track-n"));
          await t.getByRole("button", { name: "Back", exact: true }).click();
          await expect(t).toHaveAttribute("data-track-step", String(n - 1));
          await expect
            .poll(() =>
              t.evaluate((root) =>
                Array.from(root.querySelectorAll("[data-pending]")).some((el) => {
                  const cs = getComputedStyle(el);
                  return el.getClientRects().length > 0 && (Number(cs.opacity) < 1 || cs.clipPath !== "none");
                }),
              ),
            { message: "Back changed the step but hid nothing: the last step has no visible [data-stage-step]" })
            .toBe(true);
          await t.getByRole("button", { name: "Next", exact: true }).click();
          await expect(t).toHaveAttribute("data-track-state", "end", { timeout: 5_000 });
          await t.getByRole("button", { name: "Replay", exact: true }).click();
          await expect(t).toHaveAttribute("data-track-state", "playing");
          await expect(t).toHaveAttribute("data-track-state", "end", { timeout: 60_000 });
          // Scoped to the INTERACTED track's own subtree, not the whole page:
          // useStageTimeline arms every below-the-fold track at mount by
          // design, so an adjacent track the test never scrolled to is
          // correctly still armed and pending here, which a page-wide check
          // would misreport as a violation (review-F.md HIGH 1 follow-up;
          // Lane FB's diagnosis on a 4-track stage). Whole-page end-state
          // coverage belongs to the "every visible track plays once, ends,
          // and disarms" test above, which scrolls and settles each in turn.
          expect(await t.evaluate(trackEndStateViolations)).toEqual([]);
        } finally {
          await context.close();
        }
      });
    }

    // Every tour stop, not the first three; with motion at a phone and a desk
    // width, and once under reduced motion at the phone width (review-F4.md:
    // Firefox + reduced motion landed the panel 140px under the pinned bar
    // while every with-motion run passed).
    for (const { vp, reduced } of [
      { vp: byName(390, 844), reduced: false },
      { vp: byName(1440, 900), reduced: false },
      { vp: byName(390, 844), reduced: true },
    ]) {
      const mode = reduced ? " reduced motion:" : "";
      test(`${vpName(vp)}${mode} "Take the tour" pins the bar, lands every panel just under it, and keeps the active tab in view`, async ({
        browser,
        browserName,
      }) => {
        test.setTimeout(240_000);
        const { context, page } = await open(browser, browserName, vp, { reduced });
        try {
          await page.goto(`${ORIGIN}${m.route}`, { waitUntil: "load" });
          await hydrated(page);
          const tabbed = page.locator(".demo-tabs").first();
          if ((await tabbed.count()) === 0) {
            test.skip(true, `${m.route}: no tabbed screen (ADR-0017) on this route`);
          }
          const nTabs = await tabbed.getByRole("tab").count();
          expect(nTabs, `${m.route}: a tabbed screen with fewer than two tabs has no tour to check`).toBeGreaterThan(1);
          // Start from the top of the page, and fire a real DOM click
          // (`el.click()`) rather than Playwright's `.click()`: the latter
          // auto-scrolls its target into view as part of its own
          // actionability wait, which would scroll the bar into a
          // reasonable position by itself and mask a broken fix underneath
          // (review-NW.md B3 measured scrollY stuck at an ARBITRARY position
          // for the whole tour -- wherever a real click happened to leave it).
          await page.evaluate(() => window.scrollTo(0, 0));
          await tabbed
            .getByRole("button", { name: "Take the tour" })
            .evaluate((el) => (el as HTMLButtonElement).click());

          const activeLabel = () => page.locator('.demo-tabs__tab[aria-selected="true"]').first().textContent();
          let prevLabel = "";
          for (let stop = 0; stop < nTabs; stop++) {
            await expect
              .poll(async () => ((await activeLabel()) ?? "") !== prevLabel, {
                timeout: 40_000,
                message: `the tour never reached a new tab for stop ${stop}`,
              })
              .toBe(true);
            prevLabel = (await activeLabel()) ?? "";
            // Let a real (non-reduced) smooth scroll settle before measuring:
            // poll scrollY until two consecutive reads agree, rather than a
            // fixed wait -- the distance from page top to a stage many
            // screens down took ~1.5s to settle in Chromium. A short wait
            // FIRST, before the stability baseline: a poll started at
            // scrollY 0 can catch two back-to-back reads before the
            // browser's own scroll animation has begun (measured in WebKit),
            // reporting "stable" at the pre-scroll position.
            await page.waitForTimeout(300);
            let lastY = -1;
            await expect
              .poll(
                async () => {
                  const y = await page.evaluate(() => window.scrollY);
                  const stable = y === lastY;
                  lastY = y;
                  return stable;
                },
                { timeout: 10_000, message: "the page never stopped scrolling" },
              )
              .toBe(true);
            const g = await page.evaluate(tourPanelGeometry);
            expect(g, `${m.route} ${vpName(vp)} stop ${stop}: no tabbed-screen geometry to check`).not.toBeNull();
            const geo = g!;
            const at = `stop ${stop} (${prevLabel})`;
            // ABSOLUTE placement first (review-F4.md MEDIUM): relative checks
            // alone passed while the whole tabbed screen rested half-way down
            // the screen (panel top 443 of 844, the bar never pinned). The
            // bar's top sits at the header's edge: pinned there by
            // `position: sticky; top: var(--nav-height)` below 1024px, and
            // placed there by TabPanel's own margin (bar-to-panel distance
            // + header) on desktop, where the bar is static.
            expect(
              Math.abs(geo.bar.top - geo.nav),
              `${at}: bar top ${geo.bar.top.toFixed(1)} is not at the header's edge (${geo.nav}) -- the tour did not bring the bar up`,
            ).toBeLessThanOrEqual(1);
            // The panel's top is in the top third of the viewport.
            expect(geo.panelTop, `${at}: panel top ${geo.panelTop.toFixed(1)} is not in the top third of the viewport (${geo.viewportH}px)`).toBeLessThan(
              geo.viewportH / 3,
            );
            if (geo.sticky) {
              // Phone/tablet: the panel starts just under the pinned bar
              // (the tour-caption row is hidden under the bar there, see
              // lib/checks.ts `tourPanelGeometry`).
              expect(geo.panelTop, `${at}: panel top ${geo.panelTop.toFixed(1)} is under the pinned bar (bottom ${geo.bar.bottom.toFixed(1)})`).toBeGreaterThanOrEqual(
                geo.bar.bottom - 1,
              );
              expect(
                geo.panelTop,
                `${at}: panel top ${geo.panelTop.toFixed(1)} is more than 8px below the bar's bottom (${geo.bar.bottom.toFixed(1)})`,
              ).toBeLessThanOrEqual(geo.bar.bottom + 8);
            } else {
              // Desktop: the bar is static and the tour-caption row sits
              // between it and the panel, a real `.demo-beat { gap: 14px }`
              // away (measured 14.0px, 1440x900), so the tolerance is taken
              // from the caption row's bottom (`floor`) with +16, not +8.
              expect(geo.panelTop, `${at}: panel top ${geo.panelTop.toFixed(1)} is above the bar/caption row (${geo.floor.toFixed(1)})`).toBeGreaterThanOrEqual(
                geo.floor - 2,
              );
              expect(
                geo.panelTop,
                `${at}: panel top ${geo.panelTop.toFixed(1)} is more than 16px below the bar/caption row (${geo.floor.toFixed(1)})`,
              ).toBeLessThanOrEqual(geo.floor + 16);
            }
            // The active tab's box is inside the bar, and inside the tab
            // list's own horizontal scroller (not clipped by it).
            expect(geo.tab.top, `${at}: active tab top ${geo.tab.top} above the bar (${geo.bar.top})`).toBeGreaterThanOrEqual(geo.bar.top - 1);
            expect(geo.tab.bottom, `${at}: active tab bottom ${geo.tab.bottom} below the bar (${geo.bar.bottom})`).toBeLessThanOrEqual(
              geo.bar.bottom + 1,
            );
            expect(geo.tab.left, `${at}: active tab left ${geo.tab.left} is left of the tab list's own scroller (${geo.list.left})`).toBeGreaterThanOrEqual(
              geo.list.left - 1,
            );
            expect(geo.tab.right, `${at}: active tab right ${geo.tab.right} is right of the tab list's own scroller (${geo.list.right})`).toBeLessThanOrEqual(
              geo.list.right + 1,
            );
          }
        } finally {
          await context.close();
        }
      });
    }

    for (const vp of [byName(320, 568), byName(375, 667), byName(393, 659), byName(390, 844)]) {
      test(`${vpName(vp)} a step landing stays clear of the sticky phone control bar`, async ({ browser, browserName }) => {
        test.setTimeout(60_000);
        const { context, page } = await open(browser, browserName, vp);
        try {
          await page.goto(`${ORIGIN}${m.route}`, { waitUntil: "load" });
          await hydrated(page);
          const t = page.locator("[data-demo-stage] [data-track]:visible").first();
          if ((await t.count()) === 0) {
            test.skip(true, `${m.route}: no visible track on this route`);
          }
          // Scroll ONLY this one track to a natural viewing position and
          // wait for it to finish its own entry autoplay (settleTrack, not
          // settleVisibleTracks): settling every visible track in turn would
          // leave the window wherever the LAST one settled, which can be far
          // past THIS track -- off screen above, not below the bar -- and
          // silently defeats the whole check.
          await settleTrack(t);
          const n = Number(await t.getAttribute("data-track-n"));
          if (n < 1) {
            test.skip(true, `${m.route}: track has no steps`);
          }
          // Rewind to step 0 (Back is a no-op once there), then step forward
          // one at a time with Next -- the same control a real visitor uses,
          // and what autoplay does on its own -- checking after every landing
          // that the newly revealed row clears the sticky bar (critic-BO.md
          // B1: "a step that reveals an element below the fold lands UNDER
          // the sticky phone control bar").
          // Real DOM clicks (`el.click()`), not Playwright's `.click()`: the
          // latter auto-scrolls its target into view as part of its own
          // actionability wait, which would bring the row above the bar by
          // itself and mask a broken fix underneath (same trap as the
          // tour-scroll test above, review-NW.md B3).
          for (let i = 0; i < n; i++) {
            await t.getByRole("button", { name: "Back", exact: true }).evaluate((el) => (el as HTMLButtonElement).click());
          }
          await expect(t).toHaveAttribute("data-track-step", "0");
          for (let i = 0; i < n; i++) {
            await t.getByRole("button", { name: "Next", exact: true }).evaluate((el) => (el as HTMLButtonElement).click());
            await expect(t).toHaveAttribute("data-track-step", String(i + 1));
            // Let the fix's own smooth scroll settle before measuring (same
            // stability poll as the tour-scroll test above).
            await page.waitForTimeout(200);
            let lastY = -1;
            await expect
              .poll(
                async () => {
                  const y = await page.evaluate(() => window.scrollY);
                  const stable = y === lastY;
                  lastY = y;
                  return stable;
                },
                { timeout: 5_000, message: "the page never stopped scrolling" },
              )
              .toBe(true);
            const geo = await t.evaluate(stepBarOcclusion);
            if (geo === null) continue; // no sticky bar at this width/track (e.g. a beat with no reachable [data-stage-step] yet)
            expect(
              geo.occludedPx,
              `step ${i + 1}: revealed row bottom ${geo.elBottom.toFixed(1)} is ${geo.occludedPx.toFixed(1)}px under the bar top (${geo.barTop.toFixed(1)})`,
            ).toBeLessThanOrEqual(1);
          }
        } finally {
          await context.close();
        }
      });
    }

    test("the guards can fail: armed steps, an invisible ancestor, an over-wide child, an invisible inner scene element, an invisible graphic inside a screen body", async ({
      browser,
      browserName,
    }) => {
      const { context, page } = await open(browser, browserName, byName(390, 844), { js: false });
      const url = `${ORIGIN}${m.route}`;
      try {
        await page.goto(url);
        expect(await page.evaluate(armEverything), "no [data-stage-step] to arm").toBeGreaterThan(0);
        const armed = await page.evaluate(endStateViolations);
        expect(armed.some((v) => v.rule === "opacity" || v.rule === "clip-path"), "armed CSS was not seen by computed style").toBe(true);

        await page.goto(url);
        await page.evaluate(() => {
          (document.querySelector("[data-demo-section]") as HTMLElement).style.opacity = "0";
        });
        expect((await page.evaluate(endStateViolations)).some((v) => v.rule === "opacity")).toBe(true);

        await page.goto(url);
        await page.evaluate(() => {
          const d = document.createElement("div");
          d.style.width = "2000px";
          d.style.height = "10px";
          document.querySelector(".demo-stage__beats")?.appendChild(d);
        });
        expect((await page.evaluate(overflowViolations)).length).toBeGreaterThan(0);

        // review-F.md MEDIUM 3: an inner scene element that carries no
        // data-stage-* attribute at all (e.g. a Framer motion.div left at its
        // opacity:0 initial state) must still be caught by the whole-stage walk.
        await page.goto(url);
        await page.evaluate(() => {
          const d = document.createElement("div");
          d.textContent = "planted invisible scene content";
          d.style.opacity = "0";
          document.querySelector("[data-demo-stage]")?.appendChild(d);
        });
        expect((await page.evaluate(endStateViolations)).some((v) => v.rule === "opacity")).toBe(true);

        // review-F2.md MEDIUM A: ProductScreen.tsx puts aria-hidden="true" on
        // the WHOLE non-scroller screen body, so the decorative-graphic
        // exemption must not follow "any aria-hidden ancestor" -- it is
        // scoped to the kit's own .demo-screen__chrome only. A textless
        // graphic resting at opacity 0 inside the screen BODY (not the
        // chrome) must still go red.
        await page.goto(url);
        const plantedSvg = await page.evaluate(() => {
          const body = document.querySelector(".demo-screen__body");
          if (!body) return false;
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("width", "40");
          svg.setAttribute("height", "40");
          svg.setAttribute("style", "opacity:0");
          body.appendChild(svg);
          return true;
        });
        expect(plantedSvg, "no [data-demo-stage] .demo-screen__body on this page to plant into").toBe(true);
        expect((await page.evaluate(endStateViolations)).some((v) => v.rule === "opacity")).toBe(true);
      } finally {
        await context.close();
      }
    });
  });
}
