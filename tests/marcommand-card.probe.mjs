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

async function check(name, contextOptions, fn, { theme, noOpen } = {}) {
  if (ONLY && !name.toLowerCase().includes(ONLY)) return;
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  const requests = [];
  page.on("response", (r) => requests.push(r));
  try {
    await page.goto(HOME, { waitUntil: "load" });
    await page.waitForFunction(() => {
      const b = document.querySelector("#services button.ps-bento-card");
      return !!b && Object.keys(b).some((k) => k.startsWith("__react"));
    }, null, { timeout: 60000 });
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
    const stage = panel.querySelector(".mc-card .mc-stage");
    if (!stage) return null;
    const p = panel.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    return {
      panel: { l: p.left, t: p.top, w: p.width, h: p.height, ch: panel.clientHeight, cw: panel.clientWidth, sw: panel.scrollWidth },
      stage: { l: s.left, t: s.top, w: s.width, h: s.height },
      docOverflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
  assert.ok(r, "no .mc-card .mc-stage inside the open sheet (the block is not in the sheet)");
  return r;
}

async function scrollStageIntoView(page, frac = 0.5) {
  await page.evaluate((f) => {
    const panel = document.querySelector(".ps-dialog-panel");
    const stage = panel.querySelector(".mc-card .mc-stage");
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
const moved = async (page, ms = 1200) => {
  const a = await robotBox(page);
  await page.waitForTimeout(ms);
  const b = await robotBox(page);
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) > 0.5;
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

await check("sheet words: one h4 'MarCommand' then the proprietary line, between the tiles and 'Reach out'", ctxFor(SIZES[1]), async (page) => {
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
      order: after(title, car) && after(car, h4) && after(h4, cta),
      face: document.querySelector(".ps-bento-card--search-ads")?.textContent.includes("MarCommand"),
      firstTile: first ? first.textContent : "",
      emdash: /—/.test(panel.querySelector(".mc-card")?.textContent || ""),
    };
  }, LEDE);
  assert.equal(r.count, 1, `${r.count} h4 reading exactly MarCommand in the sheet`);
  assert.ok(r.lede, "the line under the heading is not the proprietary sentence");
  assert.ok(r.order, "order is not title, tiles, MarCommand, Reach out");
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
for (const s of SIZES) {
  await check(`A3 below the fold on open ${s.name}`, ctxFor(s), async (page) => {
    const b = await boxes(page);
    const visibleBottom = b.panel.t + b.panel.ch;
    const shown = Math.max(0, visibleBottom - b.stage.t);
    if (s.name === "820x1180" || s.name === "768x1024") assert.ok(shown <= 80, `${shown.toFixed(0)}px of the stage shows on open`);
    else assert.ok(shown <= 0.5, `${shown.toFixed(0)}px of the stage shows on open`);
  });
}

// ---------------------------------------------------------------------------------------- A4
for (const s of SIZES.filter((x) => x.name !== "874x402")) {
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
for (const s of pick("1440x900", "1024x768", "820x1180", "402x874", "320x568")) {
  await check(`A7 label text is at least 10px ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    const px = await page.evaluate(() => {
      const root = document.querySelector(".ps-dialog-panel .mc-card .mc-stage");
      const texts = [...root.querySelectorAll("text")].filter((t) => /budget/i.test(t.textContent) && t.getBoundingClientRect().width > 0);
      return texts.map((t) => parseFloat(getComputedStyle(t).fontSize) * t.getScreenCTM().a);
    });
    assert.ok(px.length > 0, "no visible Budget label in the stage");
    assert.ok(Math.max(...px) >= 10, `Budget label ${Math.max(...px).toFixed(2)}px`);
  });
}

// ---------------------------------------------------------------------------------------- A8
for (const s of pick("1440x900", "402x874")) {
  await check(`A8 plays only while half the stage shows in the sheet, pauses out of view, hidden tab, and on the button ${s.name}`, ctxFor(s), async (page) => {
    await boxes(page);
    await scrollStageIntoView(page);
    assert.ok(await moved(page), "not playing with the stage in view");
    // scrolled out of the sheet (the sheet's own scroll, not the window's)
    await page.evaluate(() => { document.querySelector(".ps-dialog-panel").scrollTop = 0; });
    await page.waitForTimeout(600);
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
      const card = panel.querySelector(".mc-card");
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
await check("A11 keyboard: Tab from the last tile reaches Pause animation, then Reach out; Escape closes and focus returns to card 5", ctxFor(SIZES[1]), async (page) => {
  await boxes(page);
  await scrollStageIntoView(page);
  await page.evaluate(() => {
    const tiles = document.querySelectorAll(".ps-dialog-panel .ps-carousel-card");
    tiles[tiles.length - 1].focus();
  });
  await page.keyboard.press("Tab");
  let label = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim());
  assert.equal(label, "Pause animation", `first Tab after the last tile landed on ${label}`);
  await page.keyboard.press("Tab");
  label = await page.evaluate(() => document.activeElement?.textContent?.trim());
  assert.equal(label, "Reach out");
  assert.equal(await page.evaluate(() => !!document.querySelector(".ps-dialog-panel .mc-card .mc-stage")?.matches(":focus-within")), false, "the stage took focus");
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
for (const s of pick("1440x900", "402x874")) for (const theme of THEMES) {
  await check(`A14 Services runs straight into Why us ${s.name} ${theme}: last card to the Why Us eyebrow`, ctxFor(s), async (page) => {
    const r = await page.evaluate(() => {
      const cards = [...document.querySelectorAll("#services .ps-bento-card")];
      const last = Math.max(...cards.map((c) => c.getBoundingClientRect().bottom + window.scrollY));
      const eb = [...document.querySelectorAll(".ps-eyebrow, [class*=eyebrow]")].find((e) => /why us/i.test(e.textContent));
      return { last, eb: eb ? eb.getBoundingClientRect().top + window.scrollY : null };
    });
    assert.ok(r.eb !== null, "no Why Us eyebrow found");
    const want = s.w >= 769 ? 172 : 92;
    near(r.eb - r.last, want, 2, "gap from last card to Why Us eyebrow");
  }, { theme, noOpen: true });
}

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
  await page.waitForSelector(".ps-dialog-panel .mc-card .mc-stage", { timeout: 8000 });
  assert.ok(await hasStage(requests), "the stage's code never loaded after opening");
}, { noOpen: true });

await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
