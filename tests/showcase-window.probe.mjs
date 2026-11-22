/**
 * Browser probe for the client window on the home page ("Real Projects. Real Results.", #case-studies):
 * the bottom sheet on a phone, the centred window on a desktop, opened by tapping / clicking / hovering a
 * client card (Hays Academy, FarmBooks).
 *
 * The owner, 2026-11-22: "the animation for the like hays academy modal that comes up when I tap them
 * needs to be smooth and if it needs to load it can show a bit of a loading animation instead of it
 * being so clunky like it is now"
 *
 * Every check says what a person sees, and reads it per frame (requestAnimationFrame samples of the
 * painted state; CDP screencast frames for the picture). Timing checks run REPS times (default 3) in
 * fresh browser contexts and assert on the MEDIAN; all values are printed. Everything is "lab, loaded
 * machine": compare builds to each other, not to a phone.
 *
 * Which page is measured:
 *   (default)                      the built out/ served AS https://preissersolutions.com through request
 *                                  interception (the client sites only allow being framed by that origin),
 *                                  so the live frames load for real. PS_OUT_DIR picks another build.
 *   PS_TEST_BASE_URL=https://preissersolutions.com   a real URL, no interception (production).
 *   PS_TEST_ORIGIN_DELAY_MS=60     adds a wait to every answer served from out/, standing in for a CDN trip.
 * Other knobs: PS_TEST_ONLY=<words from a check name>, PS_TEST_REPS=3, PS_TEST_JSON=<file> (all numbers),
 * PS_TEST_FILM=<dir> (writes the cold Hays filmstrips, phone tap and desktop click, there).
 *   PS_TEST_ENGINE=chromium|webkit|firefox   which engine (default chromium). WebKit and Firefox have no CDP:
 *                                  their runs make the frame-sampler checks (a, b, e, c1, a0, f, g) at 1x only;
 *                                  the picture checks (c2, d, screencast), the 4x CPU rows and the drag close
 *                                  are Chromium only, and the output says so.
 *   PS_TEST_PHONE=402x874          the touch size (sheet). 820x1180 is the tablet; under 600 wide runs at DPR 3.
 *   PS_TEST_DESK=1440x900          the desktop size (window).
 *
 *   node tests/showcase-window.probe.mjs
 *   PS_TEST_BASE_URL=https://preissersolutions.com node tests/showcase-window.probe.mjs
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { serveAsProdOrigin, PROD_ORIGIN } from "./support/serve-prod-origin.mjs";

const req = createRequire(import.meta.url);
const ENGINE = (process.env.PS_TEST_ENGINE || "chromium").toLowerCase();
const engine = req("playwright")[ENGINE];
if (!engine || !["chromium", "webkit", "firefox"].includes(ENGINE)) throw new Error(`PS_TEST_ENGINE must be chromium, webkit or firefox, not ${ENGINE}`);
const CDP = ENGINE === "chromium"; // screencast, CPU throttle and raw touch events need the Chrome DevTools Protocol

// ---------------------------------------------------------------------------------------------------
// Thresholds. Each one says why that number.
// ---------------------------------------------------------------------------------------------------
const ANSWER_MS = 100; // Nielsen: under ~100 ms a response feels caused by the tap.
const ANSWER_MS_4X = 150; // same, on a CPU 4x slower (a mid phone).
const FIRST_FRAME_MS = 250; // the sheet / window must be on its way inside a quarter second.
const FIRST_FRAME_MS_4X = 400;
const HOVER_INTENT_MS = 280; // the page's own wait before a hover opens (case-studies.tsx), added to the above for hover.
const GAP_MS = 50; // ~3 dropped frames at 60 Hz is where a rise starts to look stuttery.
const GAP_MS_4X = 100;
const CLOSE_FIRST_MS = 100; // a close must start as the tap lands.
const CLOSE_GAP_MS = 50;
const LOAD_MISSING_MS = 100; // the loading sign may be absent for at most this long in total (one slow first frame).
const FLAT_CELL = 6; // luma levels (0-255): a cell this close to the median is "the same colour".
const FLAT_FRAC = 0.9; // near-flat = at least 90% of the content area's cells are one colour (a preloader / blank field).
const CELL_DELTA = 24; // luma levels: a cell differs between two frames when it moved by more than this.
const CUT_FRAC = 0.25; // a step that changes more than a quarter of the picture ...
const CUT_SHARE = 0.8; // ... and holds 80%+ of the whole change within +-FADE_MS is a hard cut, not a fade.
const FADE_MS = 150; // a still-to-live change must be spread over at least this long.
const HANDOVER_MISMATCH = 0.3; // still vs the settled live page may differ in at most 30% of cells.
const LIVE_SETTLE_MS = 2000; // "settled live" = this long after the chip says Live.
const ALLOWED_ANIMATED = new Set(["transform", "opacity", "translate", "scale", "rotate"]); // compositor-only properties.
const SETTLE_MS = { phone: 1500, desk: 900 }; // wait after scrolling the card in, as the earlier measurement did.
const SAMPLE_MS = 5500; // how long each open is watched (cold FarmBooks goes Live ~2.7 s unthrottled).
const SAMPLE_MS_4X = 8000;
const HOLD_MS = 1500; // a0: how long after the tap the window's code and the client's data are held back
const HANDOVER_MS = 200; // a0: the swap from shell to window is these frames (the live frame starts 250 ms after it, ShowcaseLayer HANDOFF_MS; the client's start-up that follows is not the swap)

const REPS = Number(process.env.PS_TEST_REPS || 3);
const BASE = (process.env.PS_TEST_BASE_URL || "").replace(/\/+$/, "");
const BUILD = !BASE;
const ORIGIN = BASE || PROD_ORIGIN;
const HOME = `${ORIGIN}/`;
const OUT = path.resolve(process.env.PS_OUT_DIR || "out");
const DELAY = Number(process.env.PS_TEST_ORIGIN_DELAY_MS || 0);
const ONLY = (process.env.PS_TEST_ONLY || "").toLowerCase();
const LABEL = { hays: "Hays Academy", farm: "FarmBooks" };

const size = (v, d) => {
  const m = String(v || d).match(/^(\d+)x(\d+)$/);
  if (!m) throw new Error(`bad size ${v}`);
  return { width: Number(m[1]), height: Number(m[2]) };
};
const PHONE_VP = size(process.env.PS_TEST_PHONE, "402x874");
const DESK_VP = size(process.env.PS_TEST_DESK, "1440x900");
const DEVICES = {
  phone: {
    viewport: PHONE_VP, deviceScaleFactor: PHONE_VP.width < 600 ? 3 : 2, hasTouch: true,
    // Firefox has no isMobile emulation.
    ...(ENGINE === "firefox" ? {} : { isMobile: true }),
    userAgent: PHONE_VP.width < 600
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
      : "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  },
  desk: { viewport: DESK_VP, deviceScaleFactor: 1 },
};

const browser = await engine.launch();
const results = [];
let pass = 0;
let fail = 0;

async function check(name, contextOptions, fn) {
  if (ONLY && !name.toLowerCase().includes(ONLY)) return;
  try {
    const detail = await fn(contextOptions);
    pass++;
    console.log(`PASS  ${name}\n        ${detail}`);
    results.push({ name, pass: true, detail });
  } catch (error) {
    fail++;
    const msg = (error && error.message) || String(error);
    console.log(`FAIL  ${name}\n        ${msg.split("\n")[0]}`);
    results.push({ name, pass: false, detail: msg.split("\n")[0] });
  }
}

const median = (a) => {
  const v = a.map((x) => (x == null || Number.isNaN(x) ? Infinity : x)).sort((x, y) => x - y);
  return v.length ? (v.length % 2 ? v[(v.length - 1) / 2] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2) : Infinity;
};
const fmt = (x) => (x === Infinity ? "never" : x == null ? "n/a" : Math.round(x * 100) / 100);
/** Assert the median of `vals` is <= limit; the detail lists every value. */
function atMost(label, vals, limit, unit = "ms") {
  const m = median(vals);
  const text = `${label}: median ${fmt(m)}${unit} (runs ${vals.map(fmt).join(", ")}) vs limit ${limit}${unit}`;
  assert.ok(m <= limit, text);
  return text;
}

// ---------------------------------------------------------------------------------------------------
// In-page recorder: one requestAnimationFrame sample per painted frame. Serialised into the page.
// ---------------------------------------------------------------------------------------------------
function recorderStart(sel) {
  const S = (window.__psrec = { samples: [], events: [], props: new Set(), sigs: [], run: true });
  const toggle = document.querySelector(sel);
  const card = toggle.closest("article") || toggle;
  const kids = [card, toggle, ...Array.from(card.children)];
  const sigOf = () =>
    kids
      .map((el) => {
        const c = getComputedStyle(el);
        return [c.transform, c.filter, c.opacity, c.boxShadow, c.backgroundColor, c.borderTopColor, c.outlineStyle, c.translate, c.scale].join("|");
      })
      .join("§");
  const ident = (tf) => tf === "none" || tf === "matrix(1, 0, 0, 1, 0, 0)";
  const beatOk = (el) => {
    const b = el.closest(".sc-beat");
    return !b || parseFloat(getComputedStyle(b).opacity) > 0.5;
  };
  const vis = (el) => {
    if (!el.getClientRects().length) return false;
    const c = getComputedStyle(el);
    return c.visibility !== "hidden" && parseFloat(c.opacity) > 0.01 && beatOk(el);
  };
  for (const type of ["pointerdown", "pointerup", "mousemove", "keydown", "click"]) {
    window.addEventListener(
      type,
      (e) => S.events.push({ type, t: e.timeStamp, inCard: !!(e.target && e.target.closest && e.target.closest(".ps-work-card")) }),
      true,
    );
  }
  const tick = (ts) => {
    if (!S.run) return;
    const o = { t: ts, e: performance.timeOrigin + ts };
    const sig = sigOf();
    let ix = S.sigs.indexOf(sig);
    if (ix < 0) ix = S.sigs.push(sig) - 1;
    o.card = ix;
    const sheet = document.querySelector(".sc-sheet");
    const pop = document.querySelector(".sc-pop");
    const scrim = document.querySelector(".sc-scrim");
    if (sheet) {
      const r = sheet.getBoundingClientRect();
      const c = getComputedStyle(sheet);
      o.sheet = { top: r.top, id: ident(c.transform), op: +c.opacity, ph: sheet.dataset.phase || "" };
    }
    if (pop) {
      const c = getComputedStyle(pop);
      o.pop = { vis: c.visibility, id: ident(c.transform), op: +c.opacity, ph: pop.dataset.phase || "" };
    }
    if (scrim) o.scrim = +getComputedStyle(scrim).opacity;
    if (sheet || pop) {
      const chip = Array.from(document.querySelectorAll(".sc-web__chip")).find(vis);
      o.chip = chip ? { st: chip.dataset.state || "", tx: chip.textContent.trim() } : null;
      let ind = false;
      for (const a of document.getAnimations()) {
        const tg = a.effect && a.effect.target;
        if (!tg || !tg.closest || !tg.closest(".sc-root") || a.playState !== "running") continue;
        if (a.effect.getTiming().iterations === Infinity && vis(tg) && !tg.closest(".sc-sentinel")) ind = true;
        if (tg.matches(".sc-sheet,.sc-pop,.sc-scrim,.sc-sheen,.sc-glass")) {
          const cls = String(tg.className).split(" ")[0];
          const names = a.transitionProperty
            ? [a.transitionProperty]
            : a.effect.getKeyframes().flatMap((k) => Object.keys(k)).filter((k) => !["offset", "computedOffset", "easing", "composite"].includes(k));
          names.forEach((n) => S.props.add(`${cls}:${n}`));
        }
      }
      o.ind = ind;
      o.ho = !!document.querySelector(".sc-root[data-handoff]");
    }
    S.samples.push(o);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
function recorderStop() {
  const S = window.__psrec;
  S.run = false;
  const v = Array.from(document.querySelectorAll(".sc-web__view")).find((el) => el.getClientRects().length);
  const r = v ? v.getBoundingClientRect() : null;
  return {
    samples: S.samples, events: S.events, props: Array.from(S.props), sigs: S.sigs.length, H: innerHeight, W: innerWidth,
    view: r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null,
  };
}

// ---------------------------------------------------------------------------------------------------
// Analysis of one recording (pure functions: also exercised by the guard checks below with fake data).
// ---------------------------------------------------------------------------------------------------
const winVisible = (s, H) => !!((s.sheet && s.sheet.top < H - 8) || (s.pop && s.pop.vis !== "hidden" && s.pop.op > 0.02));

function t0Of(rec, kind) {
  const ev = kind === "hover" ? rec.events.find((e) => e.type === "mousemove" && e.inCard) : rec.events.find((e) => e.type === "pointerdown");
  return ev ? ev.t : null;
}

function analyseOpen(rec, kind, { reduced = false } = {}) {
  const t0 = t0Of(rec, kind);
  const S = rec.samples;
  const out = { t0, answer: Infinity, first: Infinity, done: Infinity, live: Infinity, maxGap: Infinity, maxGapHandover: Infinity, missing: Infinity, props: rec.props, cardNoisy: false };
  if (t0 == null) return out;
  const pre = S.filter((s) => s.t <= t0);
  const base = pre.length ? pre[pre.length - 1].card : null;
  out.cardNoisy = pre.slice(-6).some((s) => s.card !== base);
  const after = S.filter((s) => s.t >= t0);
  const pressed = (s) => !out.cardNoisy && base != null && s.card !== base;
  const answered = (s) => (kind === "click" ? false : pressed(s)) || winVisible(s, rec.H) || (s.scrim ?? 0) > 0.05;
  const a = after.find(answered);
  if (a) out.answer = a.t - t0;
  const fw = after.find((s) => winVisible(s, rec.H));
  if (fw) {
    out.first = fw.t - t0;
    out.firstSample = fw;
    const last = [...S].reverse().find((s) => s.sheet && s.sheet.ph !== "leave");
    const finalTop = last ? last.sheet.top : null;
    const dn = after.find(
      (s) => s.t >= fw.t && ((s.sheet && finalTop != null && Math.abs(s.sheet.top - finalTop) <= 1 && s.sheet.id) || (s.pop && s.pop.op >= 0.99 && s.pop.id)),
    );
    if (dn) {
      out.done = dn.t - t0;
      out.doneEpoch = dn.e;
      let gap = 0;
      for (let i = 1; i < after.length; i++) {
        if (after[i].t < fw.t || after[i].t > dn.t) continue;
        gap = Math.max(gap, after[i].t - after[i - 1].t);
      }
      out.maxGap = gap;
    }
    const lv = after.find((s) => s.chip && s.chip.st === "live");
    if (lv) {
      out.live = lv.t - t0;
      out.liveEpoch = lv.e;
    }
    // a shell -> window handover: every frame from the window's first until HANDOVER_MS after the window
    // took the shell's place (the client site's own start-up, which follows on every path, is not the swap)
    const ho = after.find((s) => s.ho);
    out.handover = ho ? ho.t - t0 : null;
    let gapHo = 0;
    for (let i = 1; i < after.length; i++) {
      if (after[i].t < fw.t || (ho ? after[i].t > ho.t + HANDOVER_MS : out.done !== Infinity && after[i].t > t0 + out.done)) continue;
      gapHo = Math.max(gapHo, after[i].t - after[i - 1].t);
    }
    out.maxGapHandover = gapHo;
    // the loading sign, from the window's first frame until the chip says Live
    const hasSign = (s) => !!(s.ind || (reduced && s.chip && /loading/i.test(s.chip.tx)));
    let missing = 0;
    const win = after.filter((s) => s.t >= fw.t && (!lv || s.t < lv.t));
    for (let i = 0; i < win.length; i++) {
      const next = win[i + 1] ? win[i + 1].t : lv ? lv.t : win[i].t;
      if (!hasSign(win[i])) missing += Math.max(0, next - win[i].t);
    }
    out.missing = missing;
    out.reducedSlide = after.some((s) => s.t >= fw.t && ((s.sheet && finalTop != null && Math.abs(s.sheet.top - finalTop) > 2) || (s.pop && s.pop.vis !== "hidden" && s.pop.op > 0.02 && !s.pop.id)));
  }
  return out;
}

function analyseClose(rec, kind) {
  const t0 = t0Of(rec, kind === "drag" ? "up" : "tap") ?? null;
  const out = { first: Infinity, maxGap: Infinity, closed: false };
  const ev = kind === "esc" ? rec.events.find((e) => e.type === "keydown") : kind === "drag" ? [...rec.events].reverse().find((e) => e.type === "pointerup") : rec.events.find((e) => e.type === "pointerdown");
  if (!ev) return out;
  const S = rec.samples;
  const pre = S.filter((s) => s.t <= ev.t);
  const b = pre[pre.length - 1];
  if (!b) return out;
  const moved = (s) =>
    (s.sheet && b.sheet && Math.abs(s.sheet.top - b.sheet.top) > 2) ||
    (s.pop && b.pop && (Math.abs(s.pop.op - b.pop.op) > 0.02 || s.pop.id !== b.pop.id)) ||
    (s.scrim != null && b.scrim != null && Math.abs(s.scrim - b.scrim) > 0.02);
  const after = S.filter((s) => s.t >= ev.t);
  const f = after.find(moved);
  if (f) out.first = f.t - ev.t;
  const gone = after.find((s) => !s.sheet && !s.pop);
  out.closed = !!gone;
  const end = gone ? gone.t : after.length ? after[after.length - 1].t : ev.t;
  let gap = 0;
  for (let i = 1; i < after.length; i++) if (after[i].t <= end) gap = Math.max(gap, after[i].t - after[i - 1].t);
  out.maxGap = after.length > 1 ? gap : Infinity;
  return out;
}

// ---------------------------------------------------------------------------------------------------
// Picture analysis: decode screencast frames in a separate page, reduce the content area to a luma grid.
// ---------------------------------------------------------------------------------------------------
let analyzer;
async function decodeGrids(frames, rect, vw, vh) {
  analyzer ||= await (await browser.newContext()).newPage();
  return analyzer.evaluate(
    async ({ frames, rect, vw, vh }) => {
      const outW = 40;
      const outH = Math.max(8, Math.round((rect.h * outW) / rect.w));
      const cv = new OffscreenCanvas(outW, outH);
      const cx = cv.getContext("2d", { willReadFrequently: true });
      const grids = [];
      for (const f of frames) {
        const bin = atob(f.data);
        const u = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
        const bmp = await createImageBitmap(new Blob([u], { type: "image/jpeg" }));
        const sx = bmp.width / vw;
        const sy = bmp.height / vh;
        cx.clearRect(0, 0, outW, outH);
        cx.drawImage(bmp, rect.x * sx, rect.y * sy, rect.w * sx, rect.h * sy, 0, 0, outW, outH);
        const d = cx.getImageData(0, 0, outW, outH).data;
        const g = new Array(outW * outH);
        for (let i = 0; i < g.length; i++) g[i] = Math.round(0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]);
        grids.push(g);
        bmp.close();
      }
      return grids;
    },
    { frames, rect, vw, vh },
  );
}
const flatFrac = (g) => {
  const s = [...g].sort((a, b) => a - b);
  const m = s[s.length >> 1];
  return g.filter((v) => Math.abs(v - m) <= FLAT_CELL).length / g.length;
};
const stepDiff = (a, b) => {
  let n = 0;
  for (let i = 0; i < a.length; i++) if (Math.abs(a[i] - b[i]) > CELL_DELTA) n++;
  return n / a.length;
};
/** frames: [{e, g}] sorted by epoch. Returns the hard cuts (steps that are the whole change). */
function findCuts(frames) {
  const cuts = [];
  for (let i = 0; i + 1 < frames.length; i++) {
    const step = stepDiff(frames[i].g, frames[i + 1].g);
    if (step < CUT_FRAC) continue;
    let A = i;
    while (A > 0 && frames[i].e - frames[A - 1].e <= FADE_MS) A--;
    let B = i + 1;
    while (B + 1 < frames.length && frames[B + 1].e - frames[i + 1].e <= FADE_MS) B++;
    const total = stepDiff(frames[A].g, frames[B].g);
    if (step >= CUT_SHARE * total) cuts.push({ atMs: frames[i + 1].e, step: Math.round(step * 100) / 100, spreadMs: Math.round(frames[B].e - frames[A].e) });
  }
  return cuts;
}

// ---------------------------------------------------------------------------------------------------
// Sessions: one fresh context per run; origin served from out/ unless PS_TEST_BASE_URL is set.
// ---------------------------------------------------------------------------------------------------
// A page that never hydrates within 90 s on this loaded machine is a set-up failure, not a measurement: one retry.
async function newSession(kind, slug, opts = {}) {
  try {
    return await newSessionOnce(kind, slug, opts);
  } catch (error) {
    console.log(`        (set-up retry: ${String((error && error.message) || error).split("\n")[0]})`);
    return newSessionOnce(kind, slug, opts);
  }
}
async function newSessionOnce(kind, slug, { cpu = 1, reduced = false, picture = false, hold = false } = {}) {
  const dev = kind === "phone" ? "phone" : "desk";
  const ctx = await browser.newContext({ ...DEVICES[dev], reducedMotion: reduced ? "reduce" : "no-preference" });
  if (BUILD) await serveAsProdOrigin(ctx, OUT, { delayMs: DELAY });
  // hold: every script chunk the home page did not load up front (the window's code, the client's data) is
  // held back until S.release() — a tap that lands before they arrive (a fast thumb, a slow connection).
  let release = () => {};
  const released = new Promise((r) => (release = r));
  if (hold) {
    let upfront = null;
    await ctx.route(/\/_next\/static\/chunks\/.+\.js(\?.*)?$/, async (route) => {
      if (!upfront) {
        const html = BUILD ? fs.readFileSync(path.join(OUT, "index.html"), "utf8") : await (await fetch(HOME)).text();
        upfront = new Set(html.match(/\/_next\/static\/chunks\/[^"']+\.js/g) || []);
      }
      const p = new URL(route.request().url()).pathname;
      if (!upfront.has(p)) await released;
      return route.fallback();
    });
  }
  const page = await ctx.newPage();
  const cdp = CDP ? await ctx.newCDPSession(page) : null; // before goto: Page.startScreencast sends no frames otherwise
  const sel = `button.ps-work-card__toggle[aria-label^="${LABEL[slug]}"]`;
  try {
    await page.goto(HOME, { waitUntil: "load" });
    await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
    await page.waitForFunction((s) => {
      const el = document.querySelector(s);
      return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
    }, sel, { timeout: 90000 }); // the first desktop page in a fresh browser held its main thread ~38 s here (measured 2026-11-22)
  } catch (error) {
    await ctx.close().catch(() => {});
    throw error;
  }
  const S = { ctx, page, cdp, sel, kind, dev, cpu, picture, frames: [], hold, release };
  await bringIn(S);
  if (cpu !== 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  if (cdp) {
    cdp.on("Page.screencastFrame", (f) => {
      S.frames.push({ e: f.metadata.timestamp * 1000, data: f.data });
      cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
    });
  }
  return S;
}
async function bringIn(S) {
  await S.page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", inline: "center", behavior: "instant" }), S.sel);
  await S.page.waitForTimeout(SETTLE_MS[S.dev]);
}
async function center(S) {
  const b = await S.page.locator(S.sel).boundingBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2, top: b.y };
}
async function actOpen(S, kind) {
  const { x, y } = await center(S);
  if (kind === "phone") return S.page.touchscreen.tap(x, y);
  if (kind === "click") {
    await S.page.mouse.move(x, y);
    await S.page.waitForTimeout(120); // a person's pointer lands before the press; shorter than the 280 ms hover intent
    await S.page.mouse.down();
    return S.page.mouse.up();
  }
  // Hover: a hand moving onto the card, from just above it, in steps (a person's mouse sends a stream of
  // moves). One lone move straight onto the card is what a pointer RESTING there sends, and must not open
  // the window (check h). t0 is the first move inside the card.
  const { top } = await center(S);
  await S.page.mouse.move(x, top - 40);
  await S.page.waitForTimeout(60);
  return S.page.mouse.move(x, y, { steps: 5 });
}
async function record(S, kind, sampleMs, { pictureRun = false } = {}) {
  await S.page.evaluate(recorderStart, S.sel);
  if (pictureRun) {
    S.frames = [];
    const { width, height } = DEVICES[S.dev].viewport;
    await S.cdp.send("Page.startScreencast", { format: "jpeg", quality: 60, maxWidth: width, maxHeight: height, everyNthFrame: 1 });
  }
  await S.page.waitForTimeout(400); // pre-roll: the card's resting state
  const sentAt = Date.now();
  await actOpen(S, kind);
  if (S.hold) setTimeout(() => S.release(), HOLD_MS);
  await S.page.waitForTimeout(sampleMs);
  if (pictureRun) await S.cdp.send("Page.stopScreencast");
  const rec = await S.page.evaluate(recorderStop);
  rec.sentAt = sentAt;
  return rec;
}
async function closeAndReset(S, kind) {
  await S.page.keyboard.press("Escape");
  await S.page.waitForSelector(".sc-root", { state: "detached", timeout: 6000 }).catch(() => {});
  await S.page.mouse.move(3, 3);
  await S.page.waitForTimeout(500);
  await bringIn(S);
}
async function endSession(S) {
  await S.ctx.close();
}

// ---- cached scenarios -----------------------------------------------------------------------------
const cache = new Map();
const once = (key, fn) => {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key);
};

/** Opens a card cold, then (same page) again warm. REPS times. -> {cold:[analysis], warm:[analysis]} */
function timing(kind, slug, cpu, reduced = false, hold = false) {
  return once(`t|${kind}|${slug}|${cpu}|${reduced}|${hold}`, async () => {
    const cold = [];
    const warm = [];
    const ms = cpu > 1 ? SAMPLE_MS_4X : SAMPLE_MS;
    for (let i = 0; i < REPS; i++) {
      const S = await newSession(kind, slug, { cpu, reduced, hold });
      try {
        cold.push(analyseOpen(await record(S, kind, ms), kind, { reduced }));
        if (hold) continue; // the held run is about the first tap only
        await closeAndReset(S, kind);
        warm.push(analyseOpen(await record(S, kind, ms), kind, { reduced }));
      } finally {
        await endSession(S);
      }
    }
    return { cold, warm };
  });
}

/** Same with a screencast running. -> {cold:[{an, rec, frames, grids}], warm:[...]} (1x only) */
function pictures(kind, slug) {
  return once(`p|${kind}|${slug}`, async () => {
    const out = { cold: [], warm: [] };
    for (let i = 0; i < REPS; i++) {
      const S = await newSession(kind, slug, { picture: true });
      try {
        for (const load of ["cold", "warm"]) {
          if (load === "warm") await closeAndReset(S, kind);
          const rec = await record(S, kind, SAMPLE_MS, { pictureRun: true });
          const an = analyseOpen(rec, kind);
          const frames = S.frames.slice();
          const grids = rec.view ? await decodeGrids(frames, rec.view, rec.W, rec.H) : [];
          out[load].push({ an, rec, frames, grids: frames.map((f, k) => ({ e: f.e, g: grids[k] })) });
        }
      } finally {
        await endSession(S);
      }
    }
    return out;
  });
}

/** Closing methods on a warm window. -> {method: [analysis]} */
function closings(kind) {
  return once(`c|${kind}`, async () => {
    const methods = kind === "phone" ? ["esc", "x", "scrim", ...(CDP ? ["drag"] : [])] : ["esc", "x", "scrim"];
    const out = Object.fromEntries(methods.map((m) => [m, []]));
    for (let i = 0; i < REPS; i++) {
      const S = await newSession(kind, "hays");
      try {
        await actOpen(S, kind);
        await S.page.waitForTimeout(3000);
        await closeAndReset(S, kind);
        for (const m of methods) {
          await actOpen(S, kind);
          await S.page.waitForFunction(() => {
            const e = document.querySelector(".sc-sheet,.sc-pop");
            if (!e) return false;
            const c = getComputedStyle(e);
            return (c.transform === "none" || c.transform === "matrix(1, 0, 0, 1, 0, 0)") && parseFloat(c.opacity) >= 0.99;
          }, null, { timeout: 8000 }).catch(() => {});
          await S.page.waitForTimeout(600);
          await S.page.evaluate(recorderStart, S.sel);
          await S.page.waitForTimeout(300);
          const { width, height } = DEVICES[S.dev].viewport;
          if (m === "esc") await S.page.keyboard.press("Escape");
          else if (m === "x") {
            const b = await S.page.locator(".sc-close").boundingBox();
            if (kind === "phone") await S.page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
            else await S.page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
          } else if (m === "scrim") {
            if (kind === "phone") await S.page.touchscreen.tap(width / 2, 5);
            else await S.page.mouse.click(30, height / 2);
          } else {
            const b = await S.page.locator(".sc-sheet__grip").boundingBox();
            const x = b.x + b.width / 2;
            const y = b.y + b.height / 2;
            const tp = (type, yy) => S.cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y: yy, id: 1 }] });
            await tp("touchStart", y);
            for (let k = 1; k <= 8; k++) {
              await tp("touchMove", y + k * 40);
              await S.page.waitForTimeout(16);
            }
            await tp("touchEnd", y + 320);
          }
          await S.page.waitForTimeout(1400);
          const rec = await S.page.evaluate(recorderStop);
          out[m].push(analyseClose(rec, m));
          await closeAndReset(S, kind);
        }
      } finally {
        await endSession(S);
      }
    }
    return out;
  });
}

// ---------------------------------------------------------------------------------------------------
// Start-up: prove what is being measured.
// ---------------------------------------------------------------------------------------------------
const chunkOf = (html) => (html.match(/_next\/static\/chunks\/app\/page-[a-z0-9]+\.js/) || [null])[0];
console.log(`lab, loaded machine. target: ${BUILD ? `${OUT} served as ${PROD_ORIGIN} (origin delay ${DELAY} ms)` : BASE}; reps ${REPS}; engine ${ENGINE}; touch ${PHONE_VP.width}x${PHONE_VP.height}, desktop ${DESK_VP.width}x${DESK_VP.height}`);
if (!CDP) console.log(`NOT RUN in ${ENGINE} (no CDP): picture checks c2/d and their guard, the filmstrips, the 4x CPU rows, the drag close. Chromium runs them.`);
console.log("");

await check("fingerprint: the page measured is the build we think it is", {}, async () => {
  const ctx = await browser.newContext();
  try {
    if (BUILD) await serveAsProdOrigin(ctx, OUT, { delayMs: 0 });
    const page = await ctx.newPage();
    const res = await page.goto(HOME, { waitUntil: "domcontentloaded" });
    const served = chunkOf(await res.text());
    assert.ok(served, "no page-<hash>.js in the served home page");
    const src = res.headers()["x-ps-probe-source"] || "network";
    if (!BUILD) return `served by ${ORIGIN}: ${served}`;
    const local = chunkOf(fs.readFileSync(path.join(OUT, "index.html"), "utf8"));
    const live = chunkOf(await (await fetch(`${PROD_ORIGIN}/`)).text());
    assert.equal(src, "local-out", "response did not come from out/");
    assert.equal(served, local, "served chunk differs from out/index.html");
    assert.notEqual(served, live, `served chunk equals production's (${live}): this build is what production already runs`);
    const csp = res.headers()["content-security-policy-report-only"] || "";
    assert.ok(csp.includes("frame-src"), "out/_headers CSP not applied");
    return `x-ps-probe-source=${src}; served ${served} (local out/index.html: ${local}); production serves ${live}; CSP frame-src applied`;
  } finally {
    await ctx.close();
  }
});

// ---------------------------------------------------------------------------------------------------
// Guards: each detector is shown to FAIL on bad input and PASS on good input.
// ---------------------------------------------------------------------------------------------------
const fake = (over) => ({ t: 0, e: 0, card: 0, ...over });
await check("guard: the answer, gap and loading detectors can fail and can pass", {}, async () => {
  const mk = (gapAt, withSign, winAt) => {
    const S = [];
    for (let t = 0; t <= 1200; t += 16.7) {
      if (gapAt && t > gapAt && t < gapAt + 120) continue;
      const o = fake({ t, e: t });
      if (t >= winAt) {
        o.sheet = { top: Math.max(0, 600 - (t - winAt) * 2), id: t > winAt + 300, op: 1, ph: "open" };
        o.chip = { st: t > 900 ? "live" : "loading", tx: "Loading" };
        o.ind = withSign;
      }
      S.push(o);
    }
    S.push(fake({ t: 1210, e: 1210, sheet: { top: 0, id: true, op: 1, ph: "open" }, chip: { st: "live", tx: "Live" }, ind: false }));
    return { samples: S, events: [{ type: "pointerdown", t: 200 }], H: 874, props: [] };
  };
  const good = analyseOpen(mk(0, true, 220), "tap");
  const slow = analyseOpen(mk(0, true, 800), "tap");
  const janky = analyseOpen(mk(400, true, 220), "tap");
  const noSign = analyseOpen(mk(0, false, 220), "tap");
  assert.ok(good.answer <= ANSWER_MS && good.maxGap <= GAP_MS && good.missing <= LOAD_MISSING_MS, `good fake should pass: ${JSON.stringify(good)}`);
  assert.ok(slow.answer > ANSWER_MS, "a late window should fail the answer check");
  assert.ok(janky.maxGap > GAP_MS, "a 120 ms hole should fail the gap check");
  assert.ok(noSign.missing > LOAD_MISSING_MS, "no loading sign should fail the loading check");
  return `good: answer ${fmt(good.answer)}ms gap ${fmt(good.maxGap)}ms missing ${fmt(good.missing)}ms; late window ${fmt(slow.answer)}ms; hole ${fmt(janky.maxGap)}ms; no sign ${fmt(noSign.missing)}ms`;
});

if (CDP) await check("guard: the cut and near-flat detectors on a synthetic cross-fade, a hard cut and a flat page", {}, async () => {
  // Frames only flow from a real page (a bare data: page gave none), so the synthetic pictures are laid over the home page.
  const ctx = await browser.newContext({ viewport: { width: 402, height: 600 }, deviceScaleFactor: 1 });
  if (BUILD) await serveAsProdOrigin(ctx, OUT, { delayMs: 0 });
  try {
    const run = async (html) => {
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await page.goto(HOME, { waitUntil: "load" });
      await page.evaluate((h) => {
        const o = document.createElement("div");
        o.id = "guard";
        o.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#fff";
        o.innerHTML = h;
        document.body.appendChild(o);
      }, html);
      await page.waitForTimeout(500);
      const frames = [];
      cdp.on("Page.screencastFrame", (f) => {
        frames.push({ e: f.metadata.timestamp * 1000, data: f.data });
        cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
      });
      await cdp.send("Page.startScreencast", { format: "jpeg", quality: 60, maxWidth: 402, maxHeight: 600, everyNthFrame: 1 });
      await page.waitForTimeout(300);
      await page.evaluate(() => { const b = document.getElementById("gb"); if (b) b.style.opacity = "1"; });
      await page.waitForTimeout(1500);
      await cdp.send("Page.stopScreencast");
      await page.close();
      const grids = await decodeGrids(frames, { x: 0, y: 0, w: 402, h: 600 }, 402, 600);
      return frames.map((f, i) => ({ e: f.e, g: grids[i] }));
    };
    const stripes = (c) => `repeating-linear-gradient(45deg, ${c} 0 18px, #fff 18px 36px)`;
    const layers = (mode) => `<div style="position:absolute;inset:0;background:${stripes("#222")}"></div><div id="gb" style="position:absolute;inset:0;background:${stripes("#c33")};opacity:0;${mode === "fade" ? "transition:opacity 500ms linear" : ""}"></div>`;
    const fade = await run(layers("fade"));
    const cut = await run(layers("cut"));
    const flat = await run(`<div style="position:absolute;inset:0;background:#f7e9dc"></div><div style="position:absolute;left:40px;top:40px;width:60px;height:20px;background:#111"></div>`);
    const textured = await run(layers("cut"));
    const fadeCuts = findCuts(fade);
    const cutCuts = findCuts(cut);
    const flatMin = Math.min(...flat.map((f) => flatFrac(f.g)));
    const texMax = Math.max(...textured.map((f) => flatFrac(f.g)));
    assert.equal(fadeCuts.length, 0, `a 500 ms cross-fade was called a cut: ${JSON.stringify(fadeCuts)}`);
    assert.ok(cutCuts.length >= 1, `a hard cut was not detected (frames ${cut.length})`);
    assert.ok(flatMin >= FLAT_FRAC, `a flat page with a small mark scored ${flatMin}`);
    assert.ok(texMax < FLAT_FRAC, `a striped page scored ${texMax} as flat`);
    return `fade ${fade.length} frames -> ${fadeCuts.length} cuts; cut ${cut.length} frames -> ${cutCuts.length} cut(s) ${JSON.stringify(cutCuts[0])}; flat page ${fmt(flatMin)} >= ${FLAT_FRAC}; striped page ${fmt(texMax)} < ${FLAT_FRAC}`;
  } finally {
    await ctx.close();
  }
});

// ---------------------------------------------------------------------------------------------------
// The checks. a, b, e, c(loading) come from the rAF runs; c(Live), d from the screencast runs.
// ---------------------------------------------------------------------------------------------------
const NAMES = { phone: "phone tap", click: "desktop click", hover: "desktop hover" };
const COMBOS = [
  ["phone", "hays", 1], ["phone", "farm", 1], ["phone", "hays", 4],
  ["click", "hays", 1], ["click", "farm", 1], ["click", "hays", 4],
  ["hover", "hays", 1], ["hover", "farm", 1],
];
const tag = (kind, slug, load, cpu) => `[${NAMES[kind]} · ${LABEL[slug]} · ${load} · ${cpu}x CPU]`;

for (const [kind, slug, cpu] of COMBOS) {
  if (cpu > 1 && !CDP) continue;
  for (const load of ["cold", "warm"]) {
    const dev = kind === "phone" ? { ...DEVICES.phone } : { ...DEVICES.desk };
    const intent = kind === "hover" ? HOVER_INTENT_MS : 0;

    // a. "...when I tap them ... so clunky": nothing may sit dead after the tap.
    await check(`${tag(kind, slug, load, cpu)} a. the tap is answered at once (something visibly changes)`, dev, async () => {
      const r = (await timing(kind, slug, cpu))[load];
      const noisy = r.some((x) => x.cardNoisy) ? " (card was animating before the tap: its pressed state was ignored)" : "";
      return atMost("first visible change after the tap", r.map((x) => x.answer), (cpu > 1 ? ANSWER_MS_4X : ANSWER_MS)) + noisy;
    });

    // b. the window itself is on its way.
    await check(`${tag(kind, slug, load, cpu)} b. the window is on its way within a quarter second`, dev, async () => {
      const r = (await timing(kind, slug, cpu))[load];
      return atMost("first frame of the window", r.map((x) => x.first), (cpu > 1 ? FIRST_FRAME_MS_4X : FIRST_FRAME_MS) + intent);
    });

    // e. smooth entrance: no hole in the frames, and only compositor properties animate.
    await check(`${tag(kind, slug, load, cpu)} e. the entrance is smooth (no frame hole, only transform/opacity move)`, dev, async () => {
      const r = (await timing(kind, slug, cpu))[load];
      const text = atMost("longest gap between frames while the window rises", r.map((x) => x.maxGap), cpu > 1 ? GAP_MS_4X : GAP_MS);
      const bad = [...new Set(r.flatMap((x) => x.props))].filter((p) => !ALLOWED_ANIMATED.has(p.split(":")[1]));
      assert.equal(bad.length, 0, `the entrance animates properties that are not transform/opacity: ${bad.join(", ")}`);
      return `${text}; animated shell properties: ${[...new Set(r.flatMap((x) => x.props))].join(", ") || "none seen"}`;
    });

    // c1. loading sign (rAF runs, 1x only to bound the run count).
    if (cpu === 1) {
      await check(`${tag(kind, slug, load, cpu)} c1. while it loads the window shows it is loading (an animation, not a frozen still)`, dev, async () => {
        const r = (await timing(kind, slug, cpu))[load];
        const live = r.map((x) => x.live);
        return atMost(`time inside the window with no loading animation before it says Live (Live at ${live.map(fmt).join("/")} ms)`, r.map((x) => x.missing), LOAD_MISSING_MS);
      });
    }
  }
}

// a0. A tap before the window's code and the client's data have arrived (held back for HOLD_MS): the card
// answers and the window (its shell) is on its way at once, it says it is loading, and the window taking
// over from the shell makes no hole in the frames.
for (const kind of ["phone", "click"]) {
  const dev = kind === "phone" ? { ...DEVICES.phone } : { ...DEVICES.desk };
  const t = `[${NAMES[kind]} · Hays Academy · code still on its way · 1x CPU]`;
  await check(`${t} a0. a tap before the window's code arrives is answered at once and the window is on its way`, dev, async () => {
    const r = (await timing(kind, "hays", 1, false, true)).cold;
    const a = atMost("first visible change after the tap", r.map((x) => x.answer), ANSWER_MS);
    const b = atMost("first frame of the window", r.map((x) => x.first), FIRST_FRAME_MS);
    return `${a}; ${b}`;
  });
  await check(`${t} a0. while the code loads, the window says it is loading and the handover makes no frame hole`, dev, async () => {
    const r = (await timing(kind, "hays", 1, false, true)).cold;
    const live = r.map((x) => x.live);
    const c = atMost(`time with no loading animation before Live (Live at ${live.map(fmt).join("/")} ms)`, r.map((x) => x.missing), LOAD_MISSING_MS);
    assert.ok(r.every((x) => x.handover != null), `the window never took over from the shell (handover at ${r.map((x) => fmt(x.handover)).join("/")})`);
    const e = atMost(`longest gap between frames from the window's first frame to ${HANDOVER_MS} ms after it took over from the shell (at ${r.map((x) => fmt(x.handover)).join("/")} ms)`, r.map((x) => x.maxGapHandover), GAP_MS);
    return `${c}; ${e}`;
  });
}

// h. A pointer merely resting on a card when the page loads must not open the window: the page's first
// mouse event lands on the card, and the browser repeats it at the same spot (after layout or a scroll).
// Then the same pointer moving onto the card does open it (the control: the check can pass and fail).
await check(`[desktop hover · Hays Academy · cold · 1x CPU] h. a pointer resting on the card as the page loads does not open the window; moving onto it does`, DEVICES.desk, async () => {
  const runs = [];
  for (let i = 0; i < REPS; i++) {
    const S = await newSession("hover", "hays");
    try {
      const { x, y, top } = await center(S);
      const shown = () => S.page.evaluate(() => !!document.querySelector(".sc-root:not([data-armed]) .sc-pop"));
      await S.page.mouse.move(x, y); // the resting pointer's first event, on the card
      await S.page.waitForTimeout(300);
      await S.page.mouse.move(x, y); // the browser's repeat at the same spot
      await S.page.waitForTimeout(1200);
      const rested = await shown();
      await S.page.mouse.move(x, top - 40);
      await S.page.waitForTimeout(60);
      await S.page.mouse.move(x, y, { steps: 5 });
      await S.page.waitForTimeout(1200);
      runs.push({ rested, moved: await shown() });
    } finally {
      await endSession(S);
    }
  }
  const t = `window open after resting: ${runs.map((r) => r.rested).join(", ")}; after moving onto the card: ${runs.map((r) => r.moved).join(", ")}`;
  assert.ok(runs.every((r) => !r.rested && r.moved), t);
  return t;
});

// c2 + d: the picture. Cold and warm, phone and desktop click, Hays and FarmBooks. Chromium only (screencast).
const PICS = CDP ? [["phone", "hays"], ["phone", "farm"], ["click", "hays"], ["click", "farm"]] : [];
for (const [kind, slug] of PICS) {
  for (const load of ["cold", "warm"]) {
    const dev = kind === "phone" ? { ...DEVICES.phone } : { ...DEVICES.desk };
    const per = async () => {
      const runs = (await pictures(kind, slug))[load];
      return runs.map((r) => {
        const live = r.an.liveEpoch ?? null;
        const flats = live == null ? [] : r.grids.filter((f) => f.e >= live && flatFrac(f.g) >= FLAT_FRAC);
        const done = r.an.doneEpoch ?? 0;
        const after = r.grids.filter((f) => f.e >= done + 100);
        const cuts = findCuts(after);
        let mismatch = null;
        if (live != null) {
          const A = [...r.grids].reverse().find((f) => f.e <= live);
          // the frame nearest LIVE_SETTLE_MS after Live (a static page sends no frames, so the last one before it counts)
          const B = [...r.grids].reverse().find((f) => f.e <= live + LIVE_SETTLE_MS && f.e > live + 300);
          if (A && B) mismatch = stepDiff(A.g, B.g);
        }
        return { live, flats: flats.length, cuts, mismatch, frames: r.grids.length, flatMin: Math.min(...r.grids.map((f) => flatFrac(f.g))) };
      });
    };

    await check(`${tag(kind, slug, load, 1)} c2. the chip never says Live while the framed page is a near-flat colour field`, dev, async () => {
      const p = await per();
      const m = median(p.map((x) => x.flats));
      const t = `frames after "Live" that were >= ${FLAT_FRAC * 100}% one colour: runs ${p.map((x) => (x.live == null ? "never Live" : x.flats)).join(", ")} (of ${p.map((x) => x.frames).join("/")} frames)`;
      assert.ok(m === 0, t);
      return t;
    });

    await check(`${tag(kind, slug, load, 1)} d. the picture does not jump (no hard cut, still and live match)`, dev, async () => {
      const p = await per();
      const nCuts = median(p.map((x) => x.cuts.length));
      const t1 = `hard cuts after the window finished rising: runs ${p.map((x) => x.cuts.length).join(", ")}${p[0].cuts[0] ? ` e.g. ${JSON.stringify(p[0].cuts[0])}` : ""}`;
      assert.ok(nCuts === 0, t1);
      const mm = p.every((x) => x.mismatch == null) ? 0 : median(p.map((x) => x.mismatch));
      const t2 = `still vs settled live page differ in (fraction of cells): runs ${p.map((x) => fmt(x.mismatch)).join(", ")} vs limit ${HANDOVER_MISMATCH}`;
      assert.ok(mm <= HANDOVER_MISMATCH, `${t1}; ${t2}`);
      return `${t1}; ${t2}`;
    });
  }
}

// f. closing.
for (const kind of ["phone", "click"]) {
  const methods = kind === "phone" ? ["esc", "x", "scrim", ...(CDP ? ["drag"] : [])] : ["esc", "x", "scrim"];
  const words = { esc: "Escape", x: "the X", scrim: "a tap on the dimmed page", drag: "a downward drag of the sheet" };
  for (const m of methods) {
    await check(`[${NAMES[kind]} · Hays · warm] f. closing with ${words[m]} starts at once and is smooth`, kind === "phone" ? DEVICES.phone : DEVICES.desk, async () => {
      const r = (await closings(kind))[m];
      assert.ok(r.every((x) => x.closed), `the window did not close (closed in ${r.filter((x) => x.closed).length} of ${r.length} runs)`);
      const lim = (label, vals, limit) => {
        const m = median(vals);
        return { ok: m <= limit, text: `${label}: median ${fmt(m)}ms (runs ${vals.map(fmt).join(", ")}) vs limit ${limit}ms` };
      };
      const a = lim("first PAINTED change (position/opacity) after the action", r.map((x) => x.first), CLOSE_FIRST_MS);
      const b = lim("longest gap between frames while closing", r.map((x) => x.maxGap), CLOSE_GAP_MS);
      assert.ok(a.ok && b.ok, `${a.text}; ${b.text}`);
      return `${a.text}; ${b.text}`;
    });
  }
}

// g. reduced motion.
for (const [kind, slug] of [["phone", "hays"], ["click", "hays"]]) {
  await check(`${tag(kind, slug, "cold", 1).replace("1x CPU", "reduced motion")} g. the window appears without the slide/grow and still says it is loading`, kind === "phone" ? DEVICES.phone : DEVICES.desk, async () => {
    const r = (await timing(kind, slug, 1, true)).cold;
    const slid = r.filter((x) => x.reducedSlide).length;
    assert.equal(slid, 0, `the window still slides/grows under reduced motion (${slid} of ${r.length} runs)`);
    const t = atMost("time with no loading sign (text counts under reduced motion)", r.map((x) => x.missing), LOAD_MISSING_MS);
    return `no slide/grow in any run; ${t}`;
  });
}

// ---------------------------------------------------------------------------------------------------
// Filmstrips of the cold Hays open, phone tap and desktop click (contact sheets < 2400 px wide), when
// PS_TEST_FILM is set. Each is written when its picture runs were made (with PS_TEST_ONLY too).
// ---------------------------------------------------------------------------------------------------
if (process.env.PS_TEST_FILM && CDP) {
  const dir = path.resolve(process.env.PS_TEST_FILM);
  fs.mkdirSync(dir, { recursive: true });
  for (const kind of ["phone", "click"]) {
    if (!cache.has(`p|${kind}|hays`)) continue;
    const run = (await pictures(kind, "hays")).cold[0];
    const vp = DEVICES[kind === "phone" ? "phone" : "desk"].viewport;
    const tapEpoch = run.rec.sentAt; // wall clock of the tap's dispatch (pre-roll is 400 ms before it)
    const t0 = run.rec.samples.length ? run.rec.samples[0].e - run.rec.samples[0].t + (run.an.t0 ?? 0) : tapEpoch;
    const offs = kind === "phone" ? [-200, 0, 100, 200, 300, 450, 600, 800, 1000, 1400, 2000, 3000] : [-200, 0, 100, 200, 300, 450, 600, 1000, 1400, 2000, 3000];
    const pick = offs.map((o) => {
      const f = [...run.frames].reverse().find((fr) => fr.e <= t0 + o) || run.frames[0];
      return { o, real: Math.round(f.e - t0), data: f.data };
    });
    analyzer ||= await (await browser.newContext()).newPage();
    const png = await analyzer.evaluate(async ({ pick, vw, vh }) => {
      const W = vw > 1000 ? 218 : 190;
      const H = Math.round((W * vh) / vw);
      const cv = new OffscreenCanvas(W * pick.length, H + 26);
      const cx = cv.getContext("2d");
      cx.fillStyle = "#111";
      cx.fillRect(0, 0, cv.width, cv.height);
      for (let i = 0; i < pick.length; i++) {
        const bin = atob(pick[i].data);
        const u = new Uint8Array(bin.length);
        for (let k = 0; k < bin.length; k++) u[k] = bin.charCodeAt(k);
        const bmp = await createImageBitmap(new Blob([u], { type: "image/jpeg" }));
        cx.drawImage(bmp, i * W, 26, W - 2, H);
        cx.fillStyle = "#fff";
        cx.font = "14px sans-serif";
        // the slot, and the real time of the frame shown in it (the screencast skips frames when the page is busy)
        cx.fillText(`${pick[i].o >= 0 ? "+" : ""}${pick[i].o} (${pick[i].real})`, i * W + 4, 18);
      }
      const blob = await cv.convertToBlob({ type: "image/png" });
      const buf = new Uint8Array(await blob.arrayBuffer());
      let s = "";
      for (const b of buf) s += String.fromCharCode(b);
      return btoa(s);
    }, { pick, vw: vp.width, vh: vp.height });
    const label = `${BUILD ? "build" : "prod"}-${vp.width}x${vp.height}`;
    const file = path.join(dir, `${kind === "phone" ? "phone" : "desk"}-hays-cold-${label}.png`);
    fs.writeFileSync(file, Buffer.from(png, "base64"));
    console.log(`filmstrip written: ${file}`);
  }
}

if (process.env.PS_TEST_JSON) fs.writeFileSync(process.env.PS_TEST_JSON, JSON.stringify({ target: BUILD ? `out:${OUT}` : BASE, engine: ENGINE, phone: PHONE_VP, desk: DESK_VP, delay: DELAY, reps: REPS, results }, null, 1));
await browser.close();
console.log(`\n${pass} passed, ${fail} failed (lab, loaded machine; medians of ${REPS})`);
process.exit(fail ? 1 : 0);
