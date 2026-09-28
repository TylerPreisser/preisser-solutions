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

test("every built stage route is declared in tests/e2e/stages, and every declared route is built", () => {
  const dir = path.join(OUT_DIR, "case-studies");
  expect(fs.existsSync(dir), `no export at ${dir}; run npm run build first`).toBe(true);
  const built = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .filter((f) => fs.readFileSync(path.join(dir, f), "utf8").includes("data-demo-section"))
    .map((f) => `/case-studies/${f.slice(0, -".html".length)}`)
    .sort();
  expect(built).toEqual(MANIFESTS.map((m) => m.route).sort());
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
          const tracks = page.locator("[data-demo-stage] [data-track]");
          let armedBelowFold = 0;
          for (let i = 0; i < (await tracks.count()); i += 1) {
            const t = tracks.nth(i);
            if (!(await t.isVisible())) continue;
            if ((await t.getAttribute("data-track-state")) === "paused") armedBelowFold += 1;
            await t.scrollIntoViewIfNeeded();
            await expect(t).toHaveAttribute("data-track-state", "end", { timeout: 60_000 });
          }
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
          const t = page.locator("[data-demo-stage] [data-track]:visible").first();
          await t.scrollIntoViewIfNeeded();
          await expect(t).toHaveAttribute("data-track-state", "end", { timeout: 60_000 });
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
          expect(await page.evaluate(endStateViolations)).toEqual([]);
        } finally {
          await context.close();
        }
      });
    }

    test("the guards can fail: armed steps, an invisible ancestor, an over-wide child", async ({ browser, browserName }) => {
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
      } finally {
        await context.close();
      }
    });
  });
}
