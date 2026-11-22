/**
 * Browser probe: MarCommand lives inside the fifth Services card's sheet (ADR-0029).
 *
 * Owner, 2026-11-22: "we need to start an initiative to build MarCommand as part of the other cards
 * instead of it being its own thing on the website there just put it into one of the cards where it
 * needs to go". Settled reading: the block sits in "AI and Search Engine Visibility." after
 * "What we deliver" and before "Reach out"; the homepage section is gone.
 *
 * One check per acceptance row (A1 to A14 of the design spec) plus the words, the card face and the
 * lazy loading. Every check asserts on what is rendered (boxes, pixels, computed styles, real keys).
 *
 *   PS_TEST_BASE_URL=http://127.0.0.1:4321 node tests/marcommand-card.probe.mjs
 *   PS_TEST_ONLY="robot" ...   runs the checks whose name has those words
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const req = createRequire(import.meta.url);
const { chromium } = req("playwright");
const sharp = req("sharp");

const ORIGIN = (process.env.PS_TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/+$/, "");
const HOME = `${ORIGIN}/`;
const LEDE = "Our proprietary AI-powered marketing optimization platform";

const SIZES = [
  { name: "1920x1080", w: 1920, h: 1080 },
  { name: "1440x900", w: 1440, h: 900 },
  { name: "1280x800", w: 1280, h: 800 },
  { name: "1024x768", w: 1024, h: 768 },
  { name: "820x1180", w: 820, h: 1180 },
  { name: "768x1024", w: 768, h: 1024 },
  { name: "430x932", w: 430, h: 932, phone: true },
  { name: "402x874", w: 402, h: 874, phone: true },
  { name: "393x659", w: 393, h: 659, phone: true },
  { name: "393x852", w: 393, h: 852, phone: true },
  { name: "390x844", w: 390, h: 844, phone: true },
  { name: "375x667", w: 375, h: 667, phone: true },
  { name: "360x640", w: 360, h: 640, phone: true },
  { name: "320x568", w: 320, h: 568, phone: true },
  { name: "874x402", w: 874, h: 402, phone: true },
  { name: "852x393", w: 852, h: 393, phone: true },
];
const pick = (...names) => SIZES.filter((s) => names.includes(s.name));
const MAIN = pick("1440x900", "1024x768", "820x1180", "768x1024", "430x932", "402x874", "390x844", "360x640", "320x568", "874x402");
const THEMES = ["light", "dark"];

try {
  const res = await fetch(HOME, { signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (error) {
  console.error(`\nFAIL  no server at ${HOME} (${error.message})\n`);
  process.exit(1);
}

const browser = await chromium.launch();

// The first page a fresh browser opens in a given configuration can take a minute or more to hydrate
// (measured here with the page's main thread blocked: 32s, 90s and 101s on the first load of a new
// browser process, then 0.3s on every later load), and that stall used to land on whichever check ran
// first. It is first-use cost in the browser (the same page is instant on its second load), not the
// page. So before any check starts, open one throwaway page in each configuration the checks use, a
// desktop one and a phone one, and wait for each to hydrate.
async function warmUp(b, label) {
  const configs = [
    ["desktop", { viewport: { width: 1440, height: 900 } }],
    ["phone", { viewport: { width: 402, height: 874 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true }],
  ];
  for (const [name, options] of configs) {
    const t0 = Date.now();
    const context = await b.newContext(options);
    const page = await context.newPage();
    await page.goto(HOME, { waitUntil: "load" });
    await page.waitForFunction(() => {
      const el = document.querySelector("#services button.ps-bento-card");
      return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
    }, null, { timeout: 300000 });
    await context.close();
    console.log(`  (warm-up ${label} ${name}: first page hydrated in ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  }
}
await warmUp(browser, "chromium");
let pass = 0;
let fail = 0;
const ONLY = (process.env.PS_TEST_ONLY || "").toLowerCase();

const ctxFor = (s, extra = {}) => ({
  viewport: { width: s.w, height: s.h },
  deviceScaleFactor: s.phone ? 3 : 1,
  hasTouch: !!s.phone,
  isMobile: !!s.phone,
  ...extra,
});

let webkitBrowser = null;
async function check(name, contextOptions, fn, { theme, noOpen, before, engine } = {}) {
  if (ONLY && !name.toLowerCase().includes(ONLY)) return;
  let b = browser;
  if (engine === "webkit") {
    if (!webkitBrowser) {
      webkitBrowser = await req("playwright").webkit.launch();
      await warmUp(webkitBrowser, "webkit");
    }
    b = webkitBrowser;
  }
  const context = await b.newContext(contextOptions);
  if (before) await before(context);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message || e)));
  page.errors = errors;
  const requests = [];
  page.on("response", (r) => requests.push(r));
  try {
    await page.goto(HOME, { waitUntil: "load" });
    await page.waitForFunction(() => {
      const b = document.querySelector("#services button.ps-bento-card");
      return !!b && Object.keys(b).some((k) => k.startsWith("__react"));
    }, null, { timeout: 120000 });
    await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
    if (theme) {
      const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
      await page.waitForTimeout(1200); // the page eases its background over 300ms; a busy machine is slower
      const after = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      const want = theme === "dark" ? "rgb(10, 22, 40)" : "rgb(255, 255, 255)";
      assert.equal(after, want, `theme ${theme}: body background is ${after} (was ${before})`);
    }
    if (!noOpen) await openSheet(page);
    await fn(page, requests);
    pass += 1;
    console.log(`  PASS  ${name}`);
  } catch (error) {
    fail += 1;
    console.log(`  FAIL  ${name}\n        ${String(error.message).split("\n").slice(0, 4).join(" | ")}`);
  } finally {
    await context.close();
  }
}

async function openSheet(page) {
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("#services button.ps-bento-card")].find((x) =>
      /Search Engine Visibility/.test(x.getAttribute("aria-label") || ""));
    if (!b) throw new Error("card 5 button not found");
    b.scrollIntoView({ block: "center", behavior: "instant" });
    b.click();
  });
  await page.waitForSelector(".ps-dialog-panel.ps-dialog-panel--open", { timeout: 8000 });
  await page.waitForTimeout(900); // the slide-up
}

/** Boxes of panel and stage, or a clear failure when the block is not in the sheet. */
async function boxes(page) {
  const r = await page.evaluate(() => {
    const panel = document.querySelector(".ps-dialog-panel");
    const stage = panel.querySelector(".mc-sheet .mc-stage");
    if (!stage) return null;
    const p = panel.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    return {
      panel: { l: p.left, t: p.top, w: p.width, h: p.height, ch: panel.clientHeight, cw: panel.clientWidth, sw: panel.scrollWidth },
      stage: { l: s.left, t: s.top, w: s.width, h: s.height },
      docOverflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
  assert.ok(r, "no .mc-sheet .mc-stage inside the open sheet (the block is not in the sheet)");
  return r;
}

async function scrollStageIntoView(page, frac = 0.5) {
  await page.evaluate((f) => {
    const panel = document.querySelector(".ps-dialog-panel");
    const stage = panel.querySelector(".mc-sheet .mc-stage");
    const s = stage.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    // put the stage middle at the panel's middle
    panel.scrollTop += s.top + s.height * f - (p.top + p.height * 0.5);
  }, frac);
  await page.waitForTimeout(500);
}

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a.toFixed(1)} vs ${b.toFixed(1)} (tol ${tol})`);
const robotBox = (page) => page.evaluate(() => {
  const r = document.querySelector(".ps-dialog-panel .mc-elara").getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
});
// The robot stands still for a beat or two inside the loop, so one pair of samples can read "not
// moving" while it plays. Sample across 2.4s and call it moving if it travelled at any point.
const moved = async (page, ms = 2400) => {
  const a = await robotBox(page);
  let best = 0;
  for (let t = 0; t < ms; t += 300) {
    await page.waitForTimeout(300);
    const b = await robotBox(page);
    best = Math.max(best, Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
    if (best > 0.5) return true;
  }
  return false;
};

// ---------------------------------------------------------------------------------------- R1 to R4
await check("homepage: no MarCommand section of its own is left and no h2 reads MarCommand", ctxFor(SIZES[1]), async (page) => {
  const r = await page.evaluate(() => ({
    ids: document.querySelectorAll("#marcommand-live").length,
    h2: [...document.querySelectorAll("h2")].filter((h) => h.textContent.trim() === "MarCommand").length,
  }));
  assert.equal(r.ids, 0, `${r.ids} element(s) with id marcommand-live`);
  assert.equal(r.h2, 0, `${r.h2} h2 reading MarCommand`);
}, { noOpen: true });

await check("sheet words: one h4 'MarCommand' then the proprietary line, first under the title, before the tiles and 'Reach out'", ctxFor(SIZES[1]), async (page) => {
  const r = await page.evaluate((lede) => {
    const panel = document.querySelector(".ps-dialog-panel");
    const h4s = [...panel.querySelectorAll("h4")].filter((h) => h.textContent === "MarCommand");
    const h4 = h4s[0];
    const p = h4 && h4.nextElementSibling;
    const title = panel.querySelector("h3.ps-dialog-title");
    const car = panel.querySelector(".ps-carousel-card")?.closest(".ps-dialog-section");
    const cta = panel.querySelector(".ps-dialog-cta");
    const after = (a, b) => !!a && !!b && !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    const first = panel.querySelector(".ps-carousel-card");
    return {
      count: h4s.length,
      lede: p ? p.textContent.trim() === lede : false,
      order: after(title, h4) && after(h4, car) && after(car, cta),
      face: document.querySelector(".ps-bento-card--search-ads")?.textContent.includes("MarCommand"),
      firstTile: first ? first.textContent : "",
      emdash: /—/.test(panel.querySelector(".mc-sheet")?.textContent || ""),
    };
  }, LEDE);
  assert.equal(r.count, 1, `${r.count} h4 reading exactly MarCommand in the sheet`);
  assert.ok(r.lede, "the line under the heading is not the proprietary sentence");
  assert.ok(r.order, "order is not title, MarCommand, tiles, Reach out");
  assert.ok(r.firstTile.includes("MarCommand"), "the MarCommand tile is no longer first");
  assert.ok(!r.emdash, "an em dash in the block");
});

for (const theme of THEMES) {
  await check(`card face unchanged (${theme}): no word MarCommand on card 5's face`, ctxFor(SIZES[1]), async (page) => {
    const t = await page.evaluate(() => document.querySelector(".ps-bento-card--search-ads").textContent);
    assert.ok(!t.includes("MarCommand"), "the face names MarCommand");
    assert.ok(t.includes("AI and Search Engine Visibility"), "the face lost its title");
  }, { theme, noOpen: true });
}

// ---------------------------------------------------------------------------------------- A1
for (const s of MAIN) for (const theme of THEMES) {
  await check(`A1 stage box ${s.name} ${theme}: edge to edge from 769px up, inside the padding below, right shape`, ctxFor(s), async (page) => {
    const b = await boxes(page);
    if (s.w >= 769) {
      near(b.stage.w, b.panel.cw, 1, "stage width vs panel");
      near(b.stage.h, b.stage.w * (680 / 1200), 1.5, "wide stage height");
    } else {
      const pad = s.w <= 480 ? 16 : 24;
      const want = Math.min(430, b.panel.cw - 2 * pad);
      near(b.stage.w, want, 1.5, "narrow stage width");
      near(b.stage.h, b.stage.w * (620 / 390), 1.5, "narrow stage height");
      assert.ok(b.stage.l - b.panel.l >= pad - 1, `left gutter ${b.stage.l - b.panel.l}`);
      assert.ok(b.panel.l + b.panel.cw - (b.stage.l + b.stage.w) >= pad - 1, "right gutter too small");
    }
  }, { theme });
}

// ---------------------------------------------------------------------------------------- A2
for (const s of SIZES) for (const theme of THEMES) {
  await check(`A2 no sideways scroll ${s.name} ${theme}, block in view`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    const r = await boxes(page);
    assert.equal(r.panel.sw - r.panel.cw, 0, `sheet scrolls sideways by ${r.panel.sw - r.panel.cw}`);
    assert.equal(r.docOverflow, 0, `page scrolls sideways by ${r.docOverflow}`);
  }, { theme });
}

// ---------------------------------------------------------------------------------------- A3
// MarCommand comes first under the title: on open its heading is inside the first screen of the sheet
// and the loop has begun (owner-approved order change, ADR-0029).
for (const s of SIZES) {
  await check(`A3 first screen ${s.name}: MarCommand heading is on the first screen of the sheet and the stage has begun`, ctxFor(s), async (page) => {
    const r = await page.evaluate(() => {
      const panel = document.querySelector(".ps-dialog-panel");
      const h4 = [...panel.querySelectorAll("h4")].find((h) => h.textContent === "MarCommand");
      const tiles = panel.querySelector(".ps-carousel-card");
      const p = panel.getBoundingClientRect();
      const after = (a, b) => !!a && !!b && !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
      return {
        h4: !!h4,
        top: h4 ? h4.getBoundingClientRect().top - p.top : null,
        ch: panel.clientHeight,
        before: h4 && tiles ? after(h4, tiles) : false,
      };
    });
    assert.ok(r.h4, "no MarCommand h4 in the sheet");
    assert.ok(r.before, "the MarCommand block is not before the tiles");
    assert.ok(r.top >= 0 && r.top <= r.ch - 60, `heading is ${r.top.toFixed(0)}px down a ${r.ch}px first screen`);
    await page.waitForSelector(".ps-dialog-panel .mc-live__pause", { timeout: 15000 });
    await page.waitForTimeout(800);
    assert.ok(await moved(page, 1400), "the stage is not running on open (nothing scrolled)");
  });
}

// ---------------------------------------------------------------------------------------- A4
for (const s of SIZES.filter((x) => x.name !== "874x402" && x.name !== "852x393")) {
  await check(`A4 the whole stage fits the visible sheet ${s.name}`, ctxFor(s), async (page) => {
    const b = await boxes(page);
    assert.ok(b.stage.h <= b.panel.ch, `stage ${b.stage.h.toFixed(0)} taller than the sheet ${b.panel.ch}`);
  });
}

// ---------------------------------------------------------------------------------------- A5, A6
for (const s of SIZES) for (const theme of THEMES) {
  await check(`A5 robot is 48 by 58 ${s.name} ${theme}`, ctxFor(s), async (page) => {
    await boxes(page);
    const r = await robotBox(page);
    assert.equal(Math.round(r.w * 10) / 10, 48, `robot width ${r.w}`);
    assert.equal(Math.round(r.h * 10) / 10, 58, `robot height ${r.h}`);
  }, { theme });
}

for (const s of pick("1440x900", "820x1180", "402x874", "320x568")) for (const theme of THEMES) {
  await check(`A6 robot is painted, not an empty box ${s.name} ${theme}`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    await page.waitForTimeout(900);
    const rb = await robotBox(page);
    const ground = await page.evaluate(() => getComputedStyle(document.querySelector(".ps-dialog-panel")).backgroundColor);
    const [gr, gg, gb] = ground.match(/\d+/g).map(Number);
    const sc = s.phone ? 3 : 1;
    const buf = await page.screenshot();
    const left = Math.max(0, Math.round(rb.x * sc)), top = Math.max(0, Math.round(rb.y * sc));
    const { data, info } = await sharp(buf).extract({ left, top, width: Math.round(rb.w * sc), height: Math.round(rb.h * sc) }).raw().toBuffer({ resolveWithObject: true });
    let ink = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      if (Math.max(Math.abs(data[i] - gr), Math.abs(data[i + 1] - gg), Math.abs(data[i + 2] - gb)) > 40) ink++;
    }
    const share = ink / (info.width * info.height);
    assert.ok(share >= 0.3, `ink share ${share.toFixed(2)} in the robot's box`);
  }, { theme });
}

// ---------------------------------------------------------------------------------------- A7
// Every label of the stage: at least 12 CSS px at 1200px wide and up, at least 11 everywhere else.
for (const s of pick("1920x1080", "1440x900", "1280x800", "1024x768", "820x1180", "768x1024", "402x874", "320x568")) {
  await check(`A7 every stage label is at least ${s.w >= 1200 ? 12 : 11}px ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    const r = await page.evaluate(() => {
      const root = document.querySelector(".ps-dialog-panel .mc-sheet .mc-stage");
      const groups = [...root.querySelectorAll(".mc-stage__wide, .mc-stage__narrow")].filter((g) => getComputedStyle(g).display !== "none");
      const scale = groups[0].getScreenCTM().a; // the visible composition's own scale
      const out = [];
      for (const g of groups) for (const t of g.querySelectorAll("text")) {
        if (t.closest(".mc-pill--new")) continue; // enters scaled from near zero; same class and size as the other pills at rest
        out.push({ t: t.textContent.trim(), px: parseFloat(getComputedStyle(t).fontSize) * scale });
      }
      return out;
    });
    assert.ok(r.length >= 10, `only ${r.length} labels found`);
    const floor = s.w >= 1200 ? 12 : 11;
    const bad = r.filter((x) => x.px < floor - 0.05);
    assert.equal(bad.length, 0, `under ${floor}px: ${bad.slice(0, 4).map((x) => `${x.t} ${x.px.toFixed(2)}`).join(", ")}`);
  });
}

// No label overlaps another or a dial, sampled across a whole loop.
async function overlapScan(page, samples, gap = 1500) {
  const hits = [];
  for (let i = 0; i < samples; i++) {
    const r = await page.evaluate(() => {
      const root = document.querySelector(".ps-dialog-panel .mc-sheet .mc-stage");
      const vis = (el) => { let o = 1; for (let n = el; n && n !== root; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity); return o; };
      const g = [...root.querySelectorAll(".mc-stage__wide, .mc-stage__narrow")].find((x) => getComputedStyle(x).display !== "none");
      const texts = [...g.querySelectorAll("text")].filter((t) => vis(t) > 0.3 && t.getBoundingClientRect().width > 0);
      const dials = [...g.querySelectorAll("circle")].filter((c) => /dial/.test(c.getAttribute("class") || "") && vis(c) > 0.3);
      const R = (e) => e.getBoundingClientRect();
      const ov = (a, b, tol) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > tol && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > tol;
      const bad = [];
      for (let i = 0; i < texts.length; i++) {
        for (let j = i + 1; j < texts.length; j++) if (ov(R(texts[i]), R(texts[j]), 2.5)) bad.push(`${texts[i].textContent.trim()} x ${texts[j].textContent.trim()}`);
        for (const d of dials) if (ov(R(texts[i]), R(d), 2.5)) bad.push(`${texts[i].textContent.trim()} x dial`);
      }
      return bad;
    });
    hits.push(...r);
    await page.waitForTimeout(gap);
  }
  return hits;
}

for (const s of pick("1440x900", "820x1180", "402x874", "320x568")) {
  await check(`A7b no stage label overlaps another label or a dial ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    const hits = await overlapScan(page, 12);
    assert.equal(hits.length, 0, `overlaps: ${[...new Set(hits)].slice(0, 5).join(" | ")}`);
  });
}

// Guard: the detector above must be able to fail. Push each dial's name down 14 units onto its value
// (styles added to the built page here, nothing in source) and it has to report overlaps.
for (const s of pick("1440x900", "402x874")) {
  await check(`A7b guard: the overlap detector fires when two labels are forced together ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    await page.addStyleTag({ content: ".mc-sheet .mc-dial__label { transform: translateY(14px) !important; }" });
    const hits = await overlapScan(page, 12);
    assert.ok(hits.length > 0, "the detector reported nothing with two labels forced onto each other");
  });
}

// The phone layouts: the robot is never cut by the stage's right edge or the sheet's content box, and
// at his keyword stop he is not standing on the keyword panel.
const PHONES_EDGE = [
  { name: "402x874", w: 402, h: 874, phone: true },
  { name: "390x844", w: 390, h: 844, phone: true },
  { name: "360x800", w: 360, h: 800, phone: true },
  { name: "320x568", w: 320, h: 568, phone: true },
];
for (const s of PHONES_EDGE) for (const theme of THEMES) {
  await check(`robot edge ${s.name} ${theme}: across a whole loop he never passes the stage's right edge or the sheet's content box, and is clear of the keyword panel`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    const r = await page.evaluate(async () => {
      const panel = document.querySelector(".ps-dialog-panel");
      const stage = panel.querySelector(".mc-sheet .mc-stage");
      const robot = panel.querySelector(".mc-elara");
      const tile = stage.querySelector(".mc-stage__narrow .mc-tile__box");
      const pcs = getComputedStyle(panel);
      const content = panel.getBoundingClientRect().left + panel.clientWidth - parseFloat(pcs.paddingRight || "0");
      const contentLeft = panel.getBoundingClientRect().left + parseFloat(pcs.paddingLeft || "0");
      let worstRight = -Infinity, worstLeft = -Infinity, worstContent = -Infinity, tileOverlap = 0;
      const t0 = performance.now();
      while (performance.now() - t0 < 19000) {
        const b = robot.getBoundingClientRect();
        const sb = stage.getBoundingClientRect();
        worstRight = Math.max(worstRight, b.right - sb.right);
        worstLeft = Math.max(worstLeft, sb.left - b.left);
        worstContent = Math.max(worstContent, b.right - content, contentLeft - b.left);
        const tb = tile.getBoundingClientRect();
        if (tb.width > 0 && b.bottom > tb.top + 6) tileOverlap = Math.max(tileOverlap, Math.min(b.right, tb.right) - Math.max(b.left, tb.left));
        await new Promise((res) => setTimeout(res, 120));
      }
      return { worstRight, worstLeft, worstContent, tileOverlap };
    });
    assert.ok(r.worstRight <= -2, `the robot is within 2px of (or past) the stage's right edge: ${(-r.worstRight).toFixed(1)}px to spare at his worst`);
    assert.ok(r.worstLeft <= -2, `the robot is within 2px of (or past) the stage's left edge: ${(-r.worstLeft).toFixed(1)}px to spare`);
    assert.ok(r.worstContent <= -2, `the robot is within 2px of (or past) the sheet's content box: ${(-r.worstContent).toFixed(1)}px to spare`);
    assert.ok(r.tileOverlap <= 4, `the robot stands ${r.tileOverlap.toFixed(1)}px over the keyword panel`);
  }, { theme });
}

// ---------------------------------------------------------------------------------------- A8
for (const s of pick("1440x900", "402x874")) {
  await check(`A8 plays only while half the stage shows in the sheet, pauses out of view, hidden tab, and on the button ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    assert.ok(await moved(page), "not playing with the stage in view");
    // scrolled out of the sheet (the sheet's own scroll, not the window's)
    // The block is the first thing in the sheet, so on a tall screen the stage never leaves it by
    // scrolling the real content. Push the rest of the sheet far down to prove the gate.
    await page.evaluate(() => {
      const panel = document.querySelector(".ps-dialog-panel");
      panel.querySelector(".ps-dialog-cta").style.marginTop = "4000px";
      panel.scrollTop = panel.scrollHeight;
    });
    await page.waitForTimeout(700);
    assert.ok(!(await moved(page)), "still playing with the stage out of view of the sheet");
    await scrollStageIntoView(page);
    assert.ok(await moved(page), "did not resume when scrolled back");
    // hidden tab
    await page.evaluate(() => {
      Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(300);
    assert.ok(!(await moved(page)), "playing in a hidden tab");
    await page.evaluate(() => {
      Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "visible" });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(300);
    assert.ok(await moved(page), "did not resume when the tab came back");
    const btn = page.locator(".ps-dialog-panel .mc-live__pause");
    await btn.click();
    assert.equal(await btn.getAttribute("aria-label"), "Play animation");
    assert.ok(!(await moved(page)), "still moving after Pause animation");
    await btn.click();
    assert.ok(await moved(page), "not moving after Play animation");
  });
}

// ---------------------------------------------------------------------------------------- A9
for (const theme of THEMES) for (const s of pick("1440x900", "402x874")) {
  await check(`A9 heading and line are readable ${s.name} ${theme} (4.5:1)`, ctxFor(s), async (page) => {
    await boxes(page);
    const r = await page.evaluate(() => {
      const panel = document.querySelector(".ps-dialog-panel");
      const h4 = [...panel.querySelectorAll("h4")].find((h) => h.textContent === "MarCommand");
      const spans = h4.querySelectorAll("span");
      return {
        bg: getComputedStyle(panel).backgroundColor,
        mar: getComputedStyle(spans[0]).color,
        cmd: getComputedStyle(spans[1]).color,
        lede: getComputedStyle(h4.nextElementSibling).color,
      };
    });
    const lum = (c) => {
      const [r0, g0, b0] = c.match(/[\d.]+/g).slice(0, 3).map((v) => { v = Number(v) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
      return 0.2126 * r0 + 0.7152 * g0 + 0.0722 * b0;
    };
    const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
    for (const k of ["mar", "cmd", "lede"]) assert.ok(cr(r[k], r.bg) >= 4.5, `${k} ${r[k]} on ${r.bg} = ${cr(r[k], r.bg).toFixed(2)}`);
  }, { theme });
}

// ---------------------------------------------------------------------------------------- A10
for (const s of pick("1440x900", "402x874")) {
  await check(`A10 reduced motion ${s.name}: still end state, no pause button, no movement, one description, no empty gutter`, ctxFor(s, { reducedMotion: "reduce" }), async (page) => {
    const b = await boxes(page);
    await scrollStageIntoView(page);
    const r = await page.evaluate(() => {
      const panel = document.querySelector(".ps-dialog-panel");
      const card = panel.querySelector(".mc-sheet");
      const stage = card.querySelector(".mc-stage");
      const sr = [...card.querySelectorAll(".mc-live__sr")].filter((e) => getComputedStyle(e).display !== "none").length;
      return {
        pause: card.querySelectorAll(".mc-live__pause").length,
        sr,
        gap: card.getBoundingClientRect().bottom - stage.getBoundingClientRect().bottom,
        text: stage.textContent,
      };
    });
    assert.equal(r.pause, 0, "a pause button with nothing to pause");
    assert.equal(r.sr, 1, `${r.sr} visible descriptions`);
    assert.ok(!(await moved(page, 2000)), "the robot moves under reduced motion");
    assert.ok(/2,?850/.test(r.text), "end state lacks $2,850");
    assert.ok(r.gap <= 8, `${r.gap.toFixed(0)}px of empty gutter under the stage`);
    void b;
  });
}

// ---------------------------------------------------------------------------------------- A11
await check("A11 keyboard: Tab from Close reaches Pause animation first, then the tiles, then Reach out; the stage takes no focus; Escape closes and focus returns to card 5", ctxFor(SIZES[1]), async (page) => {
  await boxes(page);
  await page.waitForSelector(".ps-dialog-panel .mc-live__pause", { timeout: 15000 });
  await page.evaluate(() => document.querySelector(".ps-dialog-panel button[aria-label^='Close']").focus());
  await page.keyboard.press("Tab");
  let label = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim());
  assert.equal(label, "Pause animation", `first Tab after Close landed on ${label}`);
  assert.equal(await page.evaluate(() => !!document.querySelector(".ps-dialog-panel .mc-sheet .mc-stage")?.matches(":focus-within")), false, "the stage took focus");
  await page.evaluate(() => {
    const tiles = document.querySelectorAll(".ps-dialog-panel .ps-carousel-card");
    tiles[tiles.length - 1].focus();
  });
  await page.keyboard.press("Tab");
  label = await page.evaluate(() => document.activeElement?.textContent?.trim());
  assert.equal(label, "Reach out");
  await page.keyboard.press("Escape");
  await page.waitForSelector(".ps-dialog-panel", { state: "detached", timeout: 5000 });
  const back = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || "");
  assert.ok(/Search Engine Visibility/.test(back), `focus returned to ${back || "nothing"}`);
});

// ---------------------------------------------------------------------------------------- A12
for (const s of pick("1440x900", "402x874")) {
  await check(`A12 closing the sheet leaves other sections' scroll animations alive (call to action still arrives) ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    await page.keyboard.press("Escape");
    await page.waitForSelector(".ps-dialog-panel", { state: "detached", timeout: 5000 });
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    await page.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector("#cta-heading")).opacity) >= 0.99, null, { timeout: 2500 });
  });
}

// ---------------------------------------------------------------------------------------- A13
await check("A13 frame budget: at most 10% of frames over 33.4ms while the loop plays in the sheet (1440)", ctxFor(SIZES[1]), async (page) => {
  await boxes(page);
  await scrollStageIntoView(page);
  const share = await page.evaluate(() => new Promise((done) => {
    const d = []; let last = performance.now(); const t0 = last;
    const f = (now) => { d.push(now - last); last = now; if (now - t0 < 6000) requestAnimationFrame(f); else done(d.filter((x) => x > 33.4).length / d.length); };
    requestAnimationFrame(f);
  }));
  assert.ok(share <= 0.1, `${(share * 100).toFixed(1)}% of frames over 33.4ms`);
});

// ---------------------------------------------------------------------------------------- A14
// Services now runs straight into the client work. The gap from the last services card to the client
// section's heading must sit inside the range the page's other section joins make: How We Work to
// Services (section edge to heading) and client work to the call to action (last content to heading).
for (const s of pick("1440x900", "820x1180", "402x874")) for (const theme of THEMES) {
  await check(`A14 Services runs straight into the client work ${s.name} ${theme}: the gap matches the page's other joins`, ctxFor(s), async (page) => {
    const r = await page.evaluate(() => {
      const Y = (e) => e.getBoundingClientRect().top + window.scrollY;
      const B = (e) => e.getBoundingClientRect().bottom + window.scrollY;
      const head = (sec) => sec.querySelector("h2,h1,.ps-eyebrow");
      const services = document.querySelector("#services");
      const how = document.querySelector("#how-we-work");
      const work = document.querySelector("#case-studies");
      const cta = document.querySelector("#cta");
      const cards = [...services.querySelectorAll(".ps-bento-card")];
      const lastCard = Math.max(...cards.map(B));
      const pb = (e) => parseFloat(getComputedStyle(e).paddingBottom);
      return {
        next: services.nextElementSibling?.id || services.nextElementSibling?.tagName,
        whyUs: document.querySelectorAll("#why-us").length,
        join: Y(head(work)) - lastCard,
        refHow: Y(head(services)) - B(how),
        refWork: Y(head(cta)) - (B(work) - pb(work)),
        bgServices: getComputedStyle(services).backgroundColor,
        bgWork: getComputedStyle(work).backgroundColor,
        bgBody: getComputedStyle(document.body).backgroundColor,
      };
    });
    assert.equal(r.whyUs, 0, "a Why Us section is still on the page");
    assert.ok(/case-studies/.test(r.next || "") || r.next === "SECTION", `Services is followed by ${r.next}`);
    const lo = Math.min(r.refHow, r.refWork) - 2, hi = Math.max(r.refHow, r.refWork) + 2;
    assert.ok(r.join >= lo && r.join <= hi, `gap last card to client heading ${r.join.toFixed(0)}px, other joins ${r.refHow.toFixed(0)} (How We Work to Services) and ${r.refWork.toFixed(0)} (client work to call to action)`);
  }, { theme, noOpen: true });
}

await check("homepage: no Why Us section (no #why-us, no #why-heading, no 'Your success is')", ctxFor(SIZES[1]), async (page) => {
  const r = await page.evaluate(() => ({
    sec: document.querySelectorAll("#why-us").length,
    head: document.querySelectorAll("#why-heading").length,
    text: document.body.innerText.includes("Your success is"),
  }));
  assert.equal(r.sec, 0, `${r.sec} #why-us`);
  assert.equal(r.head, 0, `${r.head} #why-heading`);
  assert.equal(r.text, false, "the words 'Your success is' are on the home page");
}, { noOpen: true });

// ---------------------------------------------------------------------------------------- lazy
await check("loading: the stage's code is not requested until the card is approached or opened", ctxFor(SIZES[1]), async (page, requests) => {
  const hasStage = async (list) => {
    for (const r of list) {
      if (r.request().resourceType() !== "script") continue;
      const body = await r.text().catch(() => "");
      if (body.includes("mc-elara-anchor")) return r.url();
    }
    return null;
  };
  const early = await hasStage(requests);
  assert.equal(early, null, `homepage loaded the stage's code up front: ${early}`);
  await openSheet(page);
  await page.waitForSelector(".ps-dialog-panel .mc-sheet .mc-stage", { timeout: 8000 });
  assert.ok(await hasStage(requests), "the stage's code never loaded after opening");
}, { noOpen: true });

// ---------------------------------------------------------------------------------------- failure and reuse
await check("chunk failure: if MarCommand's code cannot load, the sheet still opens with its tiles and Reach out, nothing throws",
  ctxFor(SIZES[1]),
  async (page) => {
    // hover first, as a visitor does: the warm-up request must fail quietly too
    await page.evaluate(() => {
      const b = [...document.querySelectorAll("#services button.ps-bento-card")].find((x) => /Search Engine Visibility/.test(x.getAttribute("aria-label") || ""));
      b.scrollIntoView({ block: "center", behavior: "instant" });
      b.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
    });
    await page.waitForTimeout(600);
    await openSheet(page);
    await page.waitForTimeout(2500);
    const r = await page.evaluate(() => {
      const panel = document.querySelector(".ps-dialog-panel");
      const vis = (el) => !!el && el.getBoundingClientRect().width > 0 && getComputedStyle(el).visibility !== "hidden";
      return {
        panel: !!panel,
        tiles: panel ? [...panel.querySelectorAll(".ps-carousel-card")].filter(vis).length : 0,
        cta: panel ? vis([...panel.querySelectorAll("a")].find((a) => a.textContent.trim() === "Reach out")) : false,
        busy: panel ? panel.querySelectorAll('[aria-busy="true"]').length : -1,
        services: !!document.querySelector("#services"),
      };
    });
    assert.ok(r.panel, "the sheet did not open");
    assert.ok(r.tiles >= 1, `${r.tiles} tiles visible`);
    assert.ok(r.cta, "Reach out is not visible");
    assert.equal(r.busy, 0, `${r.busy} element(s) still aria-busy`);
    assert.ok(r.services, "the page behind has gone");
    assert.deepEqual(page.errors, [], `page errors: ${page.errors.join(" | ")}`);
  },
  {
    noOpen: true,
    before: async (context) => {
      // Abort whichever script carries the stage (found by its content, so a new hash cannot dodge it).
      await context.route("**/_next/static/chunks/**/*.js", async (route) => {
        const res = await route.fetch();
        const body = await res.text();
        if (body.includes("mc-elara-anchor")) return route.abort("failed");
        return route.fulfill({ response: res, body });
      });
    },
  });

await check("reuse: open and close card 5 three times (the third mid-loop), no errors, and a fourth open runs the loop again",
  ctxFor(SIZES[1]),
  async (page) => {
    for (let i = 0; i < 3; i++) {
      await openSheet(page);
      await page.waitForSelector(".ps-dialog-panel .mc-sheet .mc-stage", { timeout: 8000 });
      if (i === 2) {
        await scrollStageIntoView(page);
        await page.waitForTimeout(1500); // mid-loop
      }
      await page.keyboard.press("Escape");
      await page.waitForSelector(".ps-dialog-panel", { state: "detached", timeout: 5000 });
      await page.waitForTimeout(300);
    }
    await openSheet(page);
    await page.waitForSelector(".ps-dialog-panel .mc-sheet .mc-stage", { timeout: 8000 });
    await scrollStageIntoView(page);
    assert.ok(await moved(page), "the loop is not running on the fourth open");
    assert.deepEqual(page.errors, [], `page errors: ${page.errors.join(" | ")}`);
  },
  { noOpen: true });

// ---------------------------------------------------------------------------------------- cold open
// The stage's code arrives late (held 2.5s): the heading and line are in the sheet at once, the stage's
// box is already there, and when the code lands nothing below it moves.
const delayStage = (ms) => async (context) => {
  await context.route("**/_next/static/chunks/**/*.js", async (route) => {
    const res = await route.fetch();
    const body = await res.text();
    if (body.includes("mc-elara-anchor")) await new Promise((r) => setTimeout(r, ms));
    return route.fulfill({ response: res, body });
  });
};
for (const [s, engine] of [[SIZES[7], "chromium"], [SIZES[4], "chromium"], [SIZES[1], "chromium"], [SIZES[7], "webkit"]]) {
  await check(`cold open ${s.name} ${engine}: heading at once, stage box held, nothing moves when the code lands`, ctxFor(s), async (page) => {
    const read = () => page.evaluate(() => {
      const panel = document.querySelector(".ps-dialog-panel");
      const h4 = [...panel.querySelectorAll("h4")].find((h) => h.textContent === "MarCommand");
      const cta = panel.querySelector(".ps-dialog-cta").getBoundingClientRect();
      const hb = h4 && h4.getBoundingClientRect();
      const p = panel.getBoundingClientRect();
      return {
        h4: !!h4,
        h4Visible: !!hb && hb.width > 0 && getComputedStyle(h4).visibility !== "hidden" && parseFloat(getComputedStyle(h4.closest("section")).opacity) > 0.95,
        h4Top: hb ? hb.top - p.top + panel.scrollTop : null,
        ctaTop: cta.top - p.top + panel.scrollTop,
        sh: panel.scrollHeight,
        busy: panel.querySelectorAll('[aria-busy="true"]').length,
        stageSvg: !!panel.querySelector(".mc-sheet .mc-stage svg"),
      };
    });
    await openSheet(page);
    // the sheet's own fade-in (staggered, under 1s) is part of "at once"
    await page.waitForFunction(() => {
      const h = [...document.querySelectorAll(".ps-dialog-panel h4")].find((x) => x.textContent === "MarCommand");
      return !!h && parseFloat(getComputedStyle(h.closest("section")).opacity) > 0.95;
    }, null, { timeout: 1200 }).catch(() => {});
    const cold = await read();
    assert.ok(cold.h4, "no MarCommand heading while the stage code is still loading");
    assert.ok(cold.h4Visible, "heading is in the DOM but not visible while the stage code loads");
    assert.equal(cold.stageSvg, false, "sampled too late: the stage had already landed");
    assert.equal(cold.busy, 1, "no loading stage box while the code loads");
    await page.waitForSelector(".ps-dialog-panel .mc-sheet .mc-stage svg", { timeout: 15000 });
    await page.waitForTimeout(500);
    const warm = await read();
    assert.ok(Math.abs(warm.ctaTop - cold.ctaTop) <= 1, `Reach out moved ${(warm.ctaTop - cold.ctaTop).toFixed(1)}px when the code landed`);
    assert.ok(Math.abs(warm.sh - cold.sh) <= 1, `sheet height changed ${warm.sh - cold.sh}px when the code landed`);
    assert.ok(Math.abs(warm.h4Top - cold.h4Top) <= 1, `heading moved ${(warm.h4Top - cold.h4Top).toFixed(1)}px`);
  }, { noOpen: true, engine, before: delayStage(2500) });
}

// ---------------------------------------------------------------------------------------- stage flaws
for (const s of pick("402x874", "320x568")) {
  await check(`keywords: the third keyword clears the panel's bottom border by at least 8px at rest, and never crosses it ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    const r = await page.evaluate(async () => {
      const root = document.querySelector(".ps-dialog-panel .mc-sheet .mc-stage");
      const g = [...root.querySelectorAll(".mc-stage__wide, .mc-stage__narrow")].find((x) => getComputedStyle(x).display !== "none");
      const scale = root.querySelector("svg").getScreenCTM().a;
      const tile = g.querySelector(".mc-tile__box");
      const tb = parseFloat(tile.getAttribute("y")) + parseFloat(tile.getAttribute("height"));
      const rest = Math.min(...[...g.querySelectorAll(".mc-pill__box")].map((p) => tb - (parseFloat(p.getAttribute("y")) + parseFloat(p.getAttribute("height"))))) * scale;
      const box = tile.getBoundingClientRect();
      let min = Infinity;
      for (let i = 0; i < 16; i++) {
        for (const pill of g.querySelectorAll(".mc-pill__box")) {
          const q = pill.getBoundingClientRect();
          if (q.width > 0) min = Math.min(min, box.bottom - q.bottom);
        }
        await new Promise((res) => setTimeout(res, 1200));
      }
      return { rest, min };
    });
    assert.ok(r.rest >= 8, `at rest the third keyword is ${r.rest.toFixed(1)}px above the panel's bottom border`);
    assert.ok(r.min >= 0, `a keyword crosses the panel's bottom border by ${(-r.min).toFixed(1)}px mid-loop`);
  });
}

for (const s of pick("1440x900", "402x874")) {
  await check(`dark theme: the TikTok note and the mail envelope read on their tiles (3:1) ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    const r = await page.evaluate(() => {
      const root = document.querySelector(".ps-dialog-panel .mc-sheet .mc-stage");
      const g = [...root.querySelectorAll(".mc-stage__wide, .mc-stage__narrow")].find((x) => getComputedStyle(x).display !== "none");
      const lum = (c) => {
        const [r0, g0, b0] = c.match(/[\d.]+/g).slice(0, 3).map((v) => { v = Number(v) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
        return 0.2126 * r0 + 0.7152 * g0 + 0.0722 * b0;
      };
      const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
      const ground = getComputedStyle(document.querySelector(".ps-dialog-panel")).backgroundColor;
      const tk = g.querySelector(".mc-logo--tiktok");
      const ml = g.querySelector(".mc-logo--mail");
      return {
        tk: tk ? cr(getComputedStyle(tk).fill, ground) : null,
        ml: ml ? cr(getComputedStyle(ml).stroke, ground) : null,
      };
    });
    assert.ok(r.tk !== null && r.ml !== null, "the TikTok or mail mark is not tagged in the stage");
    assert.ok(r.tk >= 3, `TikTok note contrast ${r.tk.toFixed(2)}:1`);
    assert.ok(r.ml >= 3, `mail envelope contrast ${r.ml.toFixed(2)}:1`);
  }, { theme: "dark" });
}

await browser.close();
if (webkitBrowser) await webkitBrowser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
