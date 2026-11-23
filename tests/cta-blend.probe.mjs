/**
 * Browser probe: the "Get in Touch" block blends into the page instead of standing as its own band.
 *
 * Oracle: the owner's phone screenshot and words, 2026-11-22: "Make this section just seamless or
 * transparent or blend with the rest of the background instead of be its own section". On his phone
 * (dark theme) the block was a lighter slab with a hard top edge. Cause: its glow was a fixed 600px
 * circle, taller than the block on a phone, so the block's `overflow: hidden` cut it mid-fade.
 *
 * Rule: across the block's top edge the colour is the same on both sides, and the block's ground just
 * inside its bottom edge is the ground just inside its top edge (within 2 of 255 per channel), sampled
 * across the width, on phone, tablet and desktop, in both themes, on every page that uses the block.
 * The footer below is its own surface in the light theme and is not part of the rule. A guard first
 * proves the rule can fail by planting a flat tint.
 *
 *   PS_TEST_BASE_URL=http://127.0.0.1:4321 node tests/cta-blend.probe.mjs
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const req = createRequire(import.meta.url);
const playwright = req("playwright");
const sharp = req("sharp");

const ORIGIN = (process.env.PS_TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const ONLY = process.env.PS_TEST_ONLY || "";
/** Largest difference, per colour channel, allowed across an edge. Anti-aliasing noise is 0 to 1. */
const LIMIT = 2;
/** The glow must still be there: this many of 81 grid points over the block's middle are lit by it. */
const LIT_MIN = 12;
const ENGINES = (process.env.PS_TEST_ENGINES || "chromium").split(",");
const SIZES = [
  { name: "phone 402x874", viewport: { width: 402, height: 874 }, hasTouch: true, isMobile: true },
  { name: "phone 320x568", viewport: { width: 320, height: 568 }, hasTouch: true, isMobile: true },
  { name: "tablet 820x1180", viewport: { width: 820, height: 1180 }, hasTouch: true },
  { name: "desktop 1440x900", viewport: { width: 1440, height: 900 } },
];
const PAGES = ["/", "/services", "/why-automation"];

try {
  const res = await fetch(`${ORIGIN}/`, { signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (error) {
  console.error(`\nFAIL  no server at ${ORIGIN}/ (${error.message})\n      PS_TEST_BASE_URL=http://127.0.0.1:<port> node tests/cta-blend.probe.mjs\n`);
  process.exit(1);
}

let browser;
let engineName = "";
let passed = 0;
let failed = 0;

async function check(rawName, fn) {
  const name = `[${engineName}] ${rawName}`;
  if (ONLY && !name.includes(ONLY)) return;
  try {
    const note = await fn();
    passed += 1;
    console.log(`  PASS  ${name}${note ? `\n        ${note}` : ""}`);
  } catch (error) {
    failed += 1;
    console.log(`  FAIL  ${name}\n        ${String(error.message).split("\n")[0]}`);
  }
}

/** Mean colour of a small box of a raw RGB(A) buffer. */
function mean(data, info, x, y, w, h) {
  const sum = [0, 0, 0];
  let n = 0;
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      const i = (yy * info.width + xx) * info.channels;
      sum[0] += data[i]; sum[1] += data[i + 1]; sum[2] += data[i + 2];
      n += 1;
    }
  }
  return sum.map((v) => v / n);
}

/**
 * The largest colour step across the block's top edge and across its bottom edge, in the open page.
 * The edge is brought to mid-screen first, so the fixed header is nowhere near the samples.
 */
async function edgeSteps(page) {
  const out = {};
  const FX = [0.08, 0.3, 0.5, 0.7, 0.92];
  let ground = null; // the block's own colour just inside its top edge, per sample column
  for (const side of ["top", "bottom"]) {
    const edge = await page.evaluate((s) => {
      const el = document.querySelector(".ps-cta-section");
      const r = el.getBoundingClientRect();
      const y = (s === "top" ? r.top : r.bottom) + window.scrollY;
      window.scrollTo({ top: Math.max(0, y - Math.round(window.innerHeight / 2)), behavior: "instant" });
      const r2 = el.getBoundingClientRect();
      return { y: Math.round(s === "top" ? r2.top : r2.bottom), w: window.innerWidth, h: window.innerHeight };
    }, side);
    await page.waitForTimeout(350);
    assert.ok(edge.y > 20 && edge.y < edge.h - 20, `the ${side} edge could not be brought into view (y ${edge.y})`);
    const { data, info } = await sharp(await page.screenshot()).raw().toBuffer({ resolveWithObject: true });
    let worst = 0;
    const inside = [];
    FX.forEach((fx, k) => {
      const x = Math.round(edge.w * fx) - 3;
      const above = mean(data, info, x, edge.y - 10, 6, 6);
      const below = mean(data, info, x, edge.y + 4, 6, 6);
      if (side === "top") {
        // The seam with the section above: the same colour on both sides of the edge.
        inside.push(below);
        worst = Math.max(worst, ...above.map((v, i) => Math.abs(v - below[i])));
      } else {
        // The block's ground at its bottom edge is the ground at its top edge: the glow reaches neither.
        // What lies below is the footer, a surface of its own in the light theme, so it is not compared.
        worst = Math.max(worst, ...above.map((v, i) => Math.abs(v - ground[k][i])));
      }
    });
    if (side === "top") ground = inside;
    out[side] = worst;
  }
  // The glow is still there. Bring the block to mid-screen and count the points of a 9 by 9 grid over
  // its middle that are lit: off the ground colour by 3 or more, but by less than 45 (text and the
  // button are far further off, so they are not counted).
  const box = await page.evaluate(() => {
    const el = document.querySelector(".ps-cta-section");
    const r = el.getBoundingClientRect();
    window.scrollTo({ top: Math.max(0, r.top + window.scrollY - Math.round((window.innerHeight - r.height) / 2)), behavior: "instant" });
    const r2 = el.getBoundingClientRect();
    return { top: r2.top, h: r2.height, w: window.innerWidth, vh: window.innerHeight };
  });
  await page.waitForTimeout(350);
  const { data, info } = await sharp(await page.screenshot()).raw().toBuffer({ resolveWithObject: true });
  const base = ground[0];
  let lit = 0;
  for (let gy = 0; gy < 9; gy++) {
    for (let gx = 0; gx < 9; gx++) {
      const x = Math.round(box.w * (0.2 + (0.6 * gx) / 8));
      const y = Math.round(box.top + box.h * (0.2 + (0.6 * gy) / 8));
      if (y < 1 || y >= box.vh - 1) continue;
      const c = mean(data, info, x, y, 1, 1);
      const d = Math.max(...c.map((v, i) => Math.abs(v - base[i])));
      if (d >= 3 && d < 45) lit += 1;
    }
  }
  out.lit = lit;
  return out;
}

async function open(size, theme, path) {
  const context = await browser.newContext({ ...size, name: undefined, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  // The first page a fresh headless browser opens can hold its main thread for over a minute on a loaded machine.
  await page.goto(`${ORIGIN}${path}`, { waitUntil: "load", timeout: 180000 });
  await page.waitForSelector(".ps-cta-section", { timeout: 180000 });
  await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
  await page.waitForTimeout(400);
  return { context, page };
}

for (const engine of ENGINES) {
  engineName = engine;
  browser = await playwright[engine].launch();
// Guards: each half of the rule must go red on the defect it is there for.
const PLANT = ".ps-cta-glow{inset:0!important;width:auto!important;height:auto!important;transform:none!important;border-radius:0!important;background:VALUE!important}";
await check("guard: a planted flat tint is caught at the top edge", async () => {
  const { context, page } = await open(SIZES[0], "dark", "/");
  try {
    await page.addStyleTag({ content: PLANT.replace("VALUE", "rgba(20,110,255,.07)") });
    await page.waitForTimeout(200);
    const s = await edgeSteps(page);
    assert.ok(s.top > LIMIT, `the planted band was not caught (top ${s.top.toFixed(1)})`);
    return `planted band read as a step of ${s.top.toFixed(1)} at the top edge`;
  } finally {
    await context.close();
  }
});
await check("guard: a planted glow that is cut off at the bottom is caught at the bottom edge", async () => {
  const { context, page } = await open(SIZES[0], "dark", "/");
  try {
    await page.addStyleTag({ content: PLANT.replace("VALUE", "linear-gradient(180deg, transparent 0%, rgba(20,110,255,.1) 100%)") });
    await page.waitForTimeout(200);
    const s = await edgeSteps(page);
    assert.ok(s.bottom > LIMIT, `the planted cut-off glow was not caught (bottom ${s.bottom.toFixed(1)})`);
    return `planted cut-off glow read as a step of ${s.bottom.toFixed(1)} at the bottom edge`;
  } finally {
    await context.close();
  }
});

await check("guard: with the glow removed, the glow rule fails", async () => {
  const { context, page } = await open(SIZES[0], "dark", "/");
  try {
    await page.addStyleTag({ content: ".ps-cta-glow{display:none!important}" });
    await page.waitForTimeout(200);
    const s = await edgeSteps(page);
    assert.ok(s.lit < LIT_MIN, `a block with no glow still counted ${s.lit} lit points`);
    return `no glow read as ${s.lit} lit points of 81`;
  } finally {
    await context.close();
  }
});

for (const path of PAGES) {
  for (const size of SIZES) {
    // The home page at every size; the two other pages that share the block at the phone and desktop sizes.
    if (path !== "/" && !["phone 402x874", "desktop 1440x900"].includes(size.name)) continue;
    for (const theme of ["dark", "light"]) {
      await check(`${path} ${size.name} ${theme}: the block has no edge, top or bottom`, async () => {
        const { context, page } = await open(size, theme, path);
        try {
          const s = await edgeSteps(page);
          assert.ok(s.top <= LIMIT, `a colour step of ${s.top.toFixed(1)} across the block's top edge (limit ${LIMIT})`);
          assert.ok(s.bottom <= LIMIT, `a colour step of ${s.bottom.toFixed(1)} across the block's bottom edge (limit ${LIMIT})`);
          assert.ok(s.lit >= LIT_MIN, `the glow is gone: only ${s.lit} of 81 points over the block's middle are lit (need ${LIT_MIN})`);
          return `top ${s.top.toFixed(1)}, bottom ${s.bottom.toFixed(1)}, glow on ${s.lit} of 81 points`;
        } finally {
          await context.close();
        }
      });
    }
  }
}

  await browser.close();
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
