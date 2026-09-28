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
  tapViolations,
  themeReadout,
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

async function shot(page: Page, slug: string, engine: string, vp: Vp, theme: string, mode: string) {
  const file = path.join(SHOTS, slug, engine, `${vpName(vp)}-${theme}-${mode}.png`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.locator("[data-demo-section]").screenshot({ path: file, animations: "disabled" });
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

    test("the guards can fail: armed steps, an invisible ancestor, an over-wide child, an invisible inner scene element", async ({
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
      } finally {
        await context.close();
      }
    });
  });
}
