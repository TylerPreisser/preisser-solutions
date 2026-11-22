/**
 * Browser probe for the two click-through walkthrough tabs in the client showcase window:
 * NWKS Encounter > Admin and Duffer Golf > Command Center (StillsWalkthrough).
 *
 * The owner's rules for a walkthrough: "show EVERY step: pointer clicks the real thing ... never jump
 * A to B", and everything reads as premium on a phone. This probe plays each film for real, in a real
 * browser, at every size below, and reads what the visitor would see at each step's resting frame.
 *
 * What is measured, and how. Each still ships a `<still>.words.json` whose `boxes` are one
 * [x, y, w, h, word] per drawn word in the still's css px (written by the capture scripts from the
 * real page's own text ranges, not guessed). The probe reads the painted geometry of the shown still
 * (its client rect) and of the stage (`.stw-screen`), derives the scale as shotRect.width / stillCssWidth,
 * and maps every box to screen px.
 *
 *   a. cut words   a word is cut when the stage edge passes through its box (neither fully inside nor
 *                  fully outside, 0.75 px slack). Also: the pointer's tip is inside the stage, and when the
 *                  film names the region the step is about (`data-focus` on .stw, still css px) it is whole.
 *   b. readable    phones only. Effective text size of a word = (box.h / 1.2) * scale: a text range's
 *                  height is the font's line box, about 1.2 x the font size, and `scale` is the applied
 *                  still-px to screen-px factor. Of the words fully inside the stage (the region the step
 *                  is about), the MEDIAN must be >= 11 px and no more than 15% may be under 9 px.
 *   c. dev note    no shipped `.words.json` (nor its manifest line) carries the maintainer's note about a
 *                  label stock's geometry source ("gLabels", "not yet checked against a physical box").
 *   d. clicked     every time the shown picture changes to a different PAGE of the product (PAGES below),
 *                  the pointer must have clicked, within CLICK_WINDOW_MS before it, a control on the
 *                  previous picture whose words name where it goes (DEST below).
 *   e. pointer     a pointer is on the stage during every step of the film.
 *   f. ending      the film comes to rest on a replay control (aria-label "Replay"), and pressing it
 *                  starts the film again from its first step.
 *   g. no bars     the still covers the whole stage (no letterbox or dead band under the picture).
 *
 * Served as the production origin through tests/support/serve-prod-origin.mjs (the build in out/).
 * Knobs: PS_OUT_DIR, PS_TEST_ONLY=<words from a rule name>, PS_TEST_TABS=nwks,duffer,
 * PS_TEST_VIEWPORTS=393x852,820x1180, PS_TEST_ENGINE=chromium|webkit|firefox, PS_TEST_THEME=light|dark,
 * PS_TEST_SHOTS=<dir> (writes every resting frame as a PNG there), PS_TEST_JSON=<file> (all numbers).
 *
 *   npm run build && node tests/showcase-walkthroughs.probe.mjs
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { serveAsProdOrigin, PROD_ORIGIN } from "./support/serve-prod-origin.mjs";

const req = createRequire(import.meta.url);
const pw = req("playwright");

// ------------------------------------------------------------------------------------------ thresholds
const SLACK = 0.75; // px: sub-pixel rounding of a transformed box.
const MIN_TEXT_PX = 11; // the owner's phone bar for reading a screen.
const SMALL_TEXT_PX = 9;
const SMALL_SHARE = 0.15;
const LINE_BOX = 1.2; // a text range's height / font size.
const SETTLE_MS = 900; // a view is "resting" once it has been unchanged this long (fade 280-400 ms, pointer travel 520 ms).
const SAMPLE_MS = 100;
const CLICK_WINDOW_MS = 4500; // the click must be the last thing before the page changes.
const END_WAIT_MS = 42000; // the films run 34 s.
const ALL_VIEWPORTS = ["320x568", "393x659", "393x852", "414x896", "768x1024", "820x1180", "1024x768", "1440x900"];
const PHONE_MAX_W = 430;

const OUT = path.resolve(process.env.PS_OUT_DIR || "out");
const ONLY = (process.env.PS_TEST_ONLY || "").toLowerCase();
const ENGINE = process.env.PS_TEST_ENGINE || "chromium";
const THEME = process.env.PS_TEST_THEME || "light";
const SHOTS = process.env.PS_TEST_SHOTS || "";
const VIEWPORTS = (process.env.PS_TEST_VIEWPORTS || ALL_VIEWPORTS.join(",")).split(",");

// Which page of the product each still is, and the words a click must land on to go to a page.
const TABS = {
  nwks: {
    title: "NWKS Encounter",
    tab: "Admin",
    dir: "nwks",
    pages: { dashboard: "Dashboard", "cabins-before": "Cabins", cabins: "Cabins", "cabins-moved": "Cabins", attendees: "Attendees", "attendees-unpaid": "Attendees", badges: "Badges", labels: "Labels" },
    dest: { Dashboard: /^dashboard$/i, Cabins: /^cabins$/i, Attendees: /^attendees$/i, Badges: /^(badges|tags)$/i, Labels: /^(labels?|luggage)$/i },
  },
  duffer: {
    title: "Duffer Golf",
    tab: "Command Center",
    dir: "duffer",
    pages: { dashboard: "Dashboard", "feed-before": "Dashboard", feed: "Dashboard", qr: "QR", partners: "Partners", partner: "Partner", orders: "Orders", commissions: "Commissions" },
    dest: { Dashboard: /^dashboard$/i, QR: /^(qr|codes)$/i, Partners: /^partners$/i, Partner: /^(sumac|lone|wheatgrass|hollow|cottonwood|golf|club|course|pines)$/i, Orders: /^orders$/i, Commissions: /^commissions$/i },
  },
};

// ------------------------------------------------------------------------------------------ the still manifests
const manifests = new Map(); // src -> { W, boxes, lines }
function manifestFor(src) {
  if (manifests.has(src)) return manifests.get(src);
  const file = path.join(OUT, src.replace(/\.webp$/, ".words.json"));
  const j = JSON.parse(fs.readFileSync(file, "utf8"));
  const W = Array.isArray(j.rect) ? j.rect[0].w : j.rect.w;
  const m = { W, boxes: j.boxes ?? [], lines: j.lines ?? [] };
  manifests.set(src, m);
  return m;
}

// ------------------------------------------------------------------------------------------ pure analysis (also run on fakes by the guards)
const inside = (b, s) => b.x0 >= s.x - SLACK && b.x1 <= s.x + s.w + SLACK && b.y0 >= s.y - SLACK && b.y1 <= s.y + s.h + SLACK;
const outside = (b, s) => b.x1 <= s.x + SLACK || b.x0 >= s.x + s.w - SLACK || b.y1 <= s.y + SLACK || b.y0 >= s.y + s.h - SLACK;

/** Boxes of a still mapped to screen px through the shot's painted rect. */
function screenBoxes(sample) {
  const m = manifestFor(sample.src);
  const s = sample.shot.w / m.W;
  return { s, words: m.boxes.map(([x, y, w, h, t]) => ({ t, h, x0: sample.shot.x + x * s, y0: sample.shot.y + y * s, x1: sample.shot.x + (x + w) * s, y1: sample.shot.y + (y + h) * s })) };
}

/** The views that rested: the last sample of every run of >= SETTLE_MS on the same still and framing. */
function resting(samples) {
  const out = [];
  let a = 0;
  for (let i = 1; i <= samples.length; i++) {
    const cur = samples[i];
    const first = samples[a];
    if (!cur || cur.still !== first.still || cur.view !== first.view) {
      const last = samples[i - 1];
      if (last.t - first.t >= SETTLE_MS) out.push(last);
      a = i;
    }
  }
  return out;
}

export function ruleCut(rec) {
  const bad = [];
  for (const r of resting(rec.samples)) {
    const { words } = screenBoxes(r);
    const cut = words.filter((w) => !inside(w, r.screen) && !outside(w, r.screen));
    if (cut.length) bad.push(`step ${r.step} ${r.still}: ${cut.length} word(s) cut by the stage edge, e.g. "${cut[0].t}"`);
    const tip = r.cursor ? { x: r.cursor.lr.x + (r.cursor.l / 100) * r.cursor.lr.w, y: r.cursor.lr.y + (r.cursor.t / 100) * r.cursor.lr.h } : null;
    if (tip && !(tip.x >= r.screen.x && tip.x <= r.screen.x + r.screen.w && tip.y >= r.screen.y && tip.y <= r.screen.y + r.screen.h)) bad.push(`step ${r.step} ${r.still}: the pointer is outside the stage`);
    if (r.focus) {
      const m = manifestFor(r.src);
      const s = r.shot.w / m.W;
      const [fx, fy, fw, fh] = r.focus;
      const f = { x0: r.shot.x + fx * s, y0: r.shot.y + fy * s, x1: r.shot.x + (fx + fw) * s, y1: r.shot.y + (fy + fh) * s };
      if (!inside(f, r.screen)) bad.push(`step ${r.step} ${r.still}: the region the step is about is not whole inside the stage`);
    }
  }
  assert.ok(bad.length === 0, bad.slice(0, 3).join(" | ") + (bad.length > 3 ? ` (+${bad.length - 3} more)` : ""));
  return `${resting(rec.samples).length} resting frames, no word cut`;
}

export function ruleReadable(rec) {
  const bad = [];
  let worst = Infinity;
  for (const r of resting(rec.samples)) {
    const { s, words } = screenBoxes(r);
    const seen = words.filter((w) => inside(w, r.screen));
    if (!seen.length) continue;
    const px = seen.map((w) => (w.h / LINE_BOX) * s).sort((a, b) => a - b);
    const med = px[Math.floor(px.length / 2)];
    const small = px.filter((p) => p < SMALL_TEXT_PX).length / px.length;
    worst = Math.min(worst, med);
    if (med < MIN_TEXT_PX || small > SMALL_SHARE) bad.push(`step ${r.step} ${r.still}: median ${med.toFixed(1)}px, ${(small * 100).toFixed(0)}% under ${SMALL_TEXT_PX}px (scale ${s.toFixed(2)})`);
  }
  assert.ok(bad.length === 0, bad.slice(0, 3).join(" | ") + (bad.length > 3 ? ` (+${bad.length - 3} more)` : ""));
  return `lowest median ${worst.toFixed(1)}px`;
}

export function ruleNoBars(rec) {
  const bad = [];
  for (const r of resting(rec.samples)) {
    const s = r.screen;
    const k = r.shot;
    if (k.x > s.x + 1 || k.y > s.y + 1 || k.x + k.w < s.x + s.w - 1 || k.y + k.h < s.y + s.h - 1) bad.push(`step ${r.step} ${r.still}: the picture stops short of the stage`);
  }
  assert.ok(bad.length === 0, bad.slice(0, 3).join(" | "));
  return "the picture fills the stage at every resting frame";
}

export function rulePointerPresent(rec) {
  const steps = [...new Set(rec.samples.map((s) => s.step))].sort();
  const missing = steps.filter((st) => !rec.samples.some((s) => s.step === st && s.cursor && s.cursorOn));
  assert.ok(steps.length >= 5, `only ${steps.length} steps were seen`);
  assert.ok(missing.length === 0, `no pointer on the stage during step(s) ${missing.join(", ")} of ${steps.join(",")}`);
  return `pointer present in all ${steps.length} steps`;
}

export function ruleClicked(rec, tab) {
  const bad = [];
  let changes = 0;
  let lastClick = null; // { t, still, tip }
  for (let i = 1; i < rec.samples.length; i++) {
    const a = rec.samples[i - 1];
    const b = rec.samples[i];
    if (a.cursor?.ring && a.cursorOn) lastClick = { t: a.t, src: a.src, still: a.still, tip: { x: (a.cursor.l / 100) * manifestFor(a.src).W, y: (a.cursor.t / 100) * (a.cursor.lr.h / (a.cursor.lr.w / manifestFor(a.src).W)) } };
    if (a.still === b.still) continue;
    const from = tab.pages[a.still];
    const to = tab.pages[b.still];
    if (from === to) continue;
    changes++;
    const want = tab.dest[to];
    let ok = false;
    if (lastClick && lastClick.still === a.still && b.t - lastClick.t <= CLICK_WINDOW_MS) {
      const near = manifestFor(lastClick.src).boxes.filter(([x, y, w, h]) => lastClick.tip.x >= x - 16 && lastClick.tip.x <= x + w + 16 && lastClick.tip.y >= y - 6 && lastClick.tip.y <= y + h + 6);
      ok = near.some(([, , , , t]) => want.test(t.replace(/[^\w]/g, "")));
    }
    if (!ok) bad.push(`${a.still} -> ${b.still} (${to}): no click on a control naming "${to}" just before`);
  }
  assert.ok(changes >= 4, `only ${changes} page changes were seen`);
  assert.ok(bad.length === 0, bad.join(" | "));
  return `${changes} page changes, each clicked`;
}

export function ruleEnding(rec) {
  assert.ok(rec.end, "the replay probe did not run");
  assert.ok(rec.end.label === "Replay", `the film ends showing "${rec.end.label}" (not "Replay") after ${END_WAIT_MS / 1000}s`);
  assert.ok(rec.end.restartStep === "1" && rec.end.restartStill === rec.end.firstStill, `pressing it did not start from the first step (step ${rec.end.restartStep}, still ${rec.end.restartStill})`);
  assert.ok(rec.end.restartLabel === "Pause", `after pressing it the control reads "${rec.end.restartLabel}", not "Pause"`);
  return "ends on Replay; pressing it plays again from step 1";
}

export function ruleDevNote(root = OUT) {
  const bad = [];
  for (const dir of ["nwks", "duffer"]) {
    const d = path.join(root, "images", "showcase", dir);
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".words.json"))) {
      const t = fs.readFileSync(path.join(d, f), "utf8");
      if (/gLabels|physical box|U-0087/i.test(t)) bad.push(`${dir}/${f}`);
    }
  }
  assert.ok(bad.length === 0, `the maintainer's label-stock note is drawn in: ${bad.join(", ")}`);
  return "no words manifest carries the note";
}

// ------------------------------------------------------------------------------------------ the guards: every rule must be able to fail
function fakeGuards() {
  const m = { W: 1000, boxes: [[100, 100, 100, 20, "Cabins"], [900, 100, 100, 20, "Edge"]], lines: [] };
  manifests.set("/fake.webp", m);
  const base = { src: "/fake.webp", still: "dashboard", step: "1", view: 0, screen: { x: 0, y: 0, w: 500, h: 400 }, shot: { x: 0, y: 0, w: 1000, h: 800 }, cursor: null, cursorOn: false, focus: null };
  const run = (extra, fn, ...a) => {
    const samples = [];
    for (let t = 0; t <= 1200; t += 100) samples.push({ ...base, ...extra, t });
    return fn({ samples }, ...a);
  };
  const fails = (name, f) => {
    let threw = false;
    try { f(); } catch { threw = true; }
    assert.ok(threw, `guard "${name}" did not fail on a planted defect`);
  };
  // a. the stage edge at x=150 passes through "Cabins" (100..200)
  fails("cut", () => run({ screen: { x: 150, y: 0, w: 400, h: 400 }, shot: { x: 0, y: 0, w: 1000, h: 800 } }, ruleCut));
  run({ screen: { x: 0, y: 0, w: 1000, h: 800 } }, ruleCut); // whole: passes
  fails("pointer outside", () => run({ screen: { x: 0, y: 0, w: 1000, h: 800 }, cursor: { l: 50, t: 50, lr: { x: 1200, y: 0, w: 1000, h: 800 } } }, ruleCut));
  fails("focus not whole", () => run({ screen: { x: 0, y: 0, w: 1000, h: 800 }, focus: [800, 0, 400, 100] }, ruleCut));
  // b. scale 0.5 of a 20px-tall box (16.7px type) is 8.3px
  fails("small text", () => run({ screen: { x: 0, y: 0, w: 1000, h: 800 }, shot: { x: 0, y: 0, w: 500, h: 400 } }, ruleReadable));
  run({ screen: { x: 0, y: 0, w: 1000, h: 800 } }, ruleReadable); // scale 1: 16.7px passes
  // g. bars
  fails("bars", () => run({ shot: { x: 0, y: 0, w: 1000, h: 300 } }, ruleNoBars));
  // c is file based: planted in a temp manifest
  const tmp = fs.mkdtempSync(path.join(fs.realpathSync(process.env.TMPDIR || "/tmp"), "wtprobe-"));
  try {
    fs.mkdirSync(path.join(tmp, "images", "showcase", "nwks"), { recursive: true });
    fs.mkdirSync(path.join(tmp, "images", "showcase", "duffer"), { recursive: true });
    fs.writeFileSync(path.join(tmp, "images", "showcase", "nwks", "x.words.json"), JSON.stringify({ lines: ["not yet checked against a physical box"] }));
    let threw = false;
    try { ruleDevNote(tmp); } catch { threw = true; }
    assert.ok(threw, "guard \"dev note\" did not fail on a planted note");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  // d. page change with no click, with a click on the wrong word, with a right click
  const tab = { pages: { a: "A", b: "B" }, dest: { A: /^cabins$/i, B: /^cabins$/i } };
  // Six page changes; before each one the pointer either rests on "Cabins" (a real click), on another word, or nowhere.
  const seq = (clickWord, ring) => {
    const samples = [];
    for (let i = 0; i < 70; i++) {
      const block = Math.floor(i / 10);
      const cursor = ring && i % 10 < 9 ? { l: ((clickWord === "Cabins" ? 120 : 600) / 1000) * 100, t: (110 / 800) * 100, ring: true, lr: { x: 0, y: 0, w: 1000, h: 800 } } : null;
      samples.push({ ...base, still: block % 2 ? "b" : "a", t: i * 100, cursor, cursorOn: Boolean(cursor), step: String(1 + block) });
    }
    return { samples };
  };
  ruleClicked(seq("Cabins", true), tab); // positive control: passes
  fails("no click", () => ruleClicked(seq("Cabins", false), tab));
  fails("wrong click", () => ruleClicked(seq("Nothing", true), tab));
  // e. a step with no pointer
  const steps = ["1", "2", "3", "4", "5"].flatMap((st) => [0, 1].map((k) => ({ ...base, step: st, t: k, cursor: st === "4" ? null : { l: 1, t: 1, lr: base.screen }, cursorOn: st !== "4" })));
  fails("pointer vanishes", () => rulePointerPresent({ samples: steps }));
  // f. ending
  fails("ends on Pause", () => ruleEnding({ end: { label: "Pause" } }));
  fails("replay does not restart", () => ruleEnding({ end: { label: "Replay", restartStep: "4", restartStill: "x", firstStill: "y", restartLabel: "Pause" } }));
  return "all 8 rule guards fail on planted defects";
}

// ------------------------------------------------------------------------------------------ the browser run
function snapshot() {
  const panel = document.querySelector('[role="tabpanel"][data-on]');
  const root = panel && panel.querySelector(".stw");
  if (!root) return null;
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  };
  const screen = root.querySelector(".stw-screen");
  const shots = [...root.querySelectorAll(".stw-shot")];
  const on = root.querySelector(".stw-shot[data-on]");
  if (!screen || !on) return null;
  const cur = root.querySelector(".stw-cursor:not(.stw-cursor--drag)");
  const layer = root.querySelector(".stw-layer");
  const sr = rect(screen);
  let cursor = null;
  let cursorOn = false;
  if (cur && layer) {
    cursor = { l: parseFloat(cur.style.left), t: parseFloat(cur.style.top), ring: Boolean(cur.querySelector(".stw-ring")), lr: rect(layer) };
    const tx = cursor.lr.x + (cursor.l / 100) * cursor.lr.w;
    const ty = cursor.lr.y + (cursor.t / 100) * cursor.lr.h;
    cursorOn = tx >= sr.x && tx <= sr.x + sr.w && ty >= sr.y && ty <= sr.y + sr.h;
  }
  const f = root.getAttribute("data-focus");
  return {
    step: root.dataset.step,
    still: root.dataset.still,
    view: shots.indexOf(on),
    src: on.querySelector("img").getAttribute("src"),
    screen: sr,
    shot: rect(on),
    cursor,
    cursorOn,
    focus: f ? f.split(",").map(Number) : null,
    label: (root.querySelector(".stw-pause") || {}).ariaLabel ?? null,
  };
}

async function openTab(page, tab) {
  await page.goto(`${PROD_ORIGIN}/`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(800);
  if (THEME === "dark") {
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
      try { sessionStorage.setItem("ps-theme", "dark"); } catch { /* none */ }
    });
    await page.waitForTimeout(300);
  }
  await page.evaluate(() => document.getElementById("case-studies").scrollIntoView({ behavior: "instant", block: "start" }));
  await page.waitForTimeout(600);
  const btn = page.locator(`button[aria-label^="${tab.title}:"]`).first();
  await btn.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center", inline: "center" }));
  await page.waitForTimeout(400);
  await page.mouse.move(2, 2);
  await page.waitForTimeout(500);
  await btn.click({ timeout: 10000 });
  await page.locator('[role="tablist"]').first().waitFor({ state: "visible", timeout: 15000 });
  const tb = page.getByRole("tab", { name: tab.tab, exact: true }).first();
  if ((await tb.getAttribute("aria-selected")) !== "true") await tb.click({ timeout: 10000 });
}

async function play(browser, tab, vp) {
  const [W, H] = vp.split("x").map(Number);
  const phone = W <= PHONE_MAX_W;
  const opts = { viewport: { width: W, height: H }, deviceScaleFactor: phone ? 3 : 1, colorScheme: THEME, reducedMotion: "no-preference" };
  if (phone) {
    opts.hasTouch = true;
    if (ENGINE === "chromium") opts.isMobile = true;
  }
  const ctx = await browser.newContext(opts);
  try {
    await serveAsProdOrigin(ctx, OUT);
    // Everything that is not the local build (client sites, analytics) is refused: only the walkthrough is measured.
    await ctx.route((u) => u.origin !== PROD_ORIGIN, (r) => r.abort());
    const page = await ctx.newPage();
    await openTab(page, tab);
    const samples = [];
    const t0 = Date.now();
    let ended = false;
    while (Date.now() - t0 < END_WAIT_MS) {
      const s = await page.evaluate(snapshot);
      if (s) {
        s.t = Date.now() - t0;
        samples.push(s);
        if (s.label === "Replay") {
          ended = true;
          await page.waitForTimeout(1200);
          const e = await page.evaluate(snapshot);
          if (e) samples.push({ ...e, t: Date.now() - t0 });
          break;
        }
      }
      await page.waitForTimeout(SAMPLE_MS);
    }
    const rec = { samples, vp, phone, end: null };
    if (SHOTS) {
      fs.mkdirSync(SHOTS, { recursive: true });
      await page.screenshot({ path: path.join(SHOTS, `${tab.dir}__${ENGINE}__${vp}__${THEME}__rest.png`) });
    }
    const first = samples.find((s) => s.step === "1");
    const last = samples[samples.length - 1];
    rec.end = { label: last?.label ?? "none", firstStill: first?.still };
    if (ended) {
      await page.locator('[role="tabpanel"][data-on] .stw-pause').click();
      await page.waitForTimeout(1300);
      const r = await page.evaluate(snapshot);
      rec.end.restartStep = r?.step;
      rec.end.restartStill = r?.still;
      rec.end.restartLabel = r?.label;
    }
    return rec;
  } finally {
    await ctx.close();
  }
}

// ------------------------------------------------------------------------------------------ run
let pass = 0;
let fail = 0;
const json = {};
function report(name, fn) {
  if (ONLY && !name.toLowerCase().includes(ONLY)) return;
  try {
    const detail = fn();
    pass++;
    console.log(`PASS  ${name}\n        ${detail}`);
    json[name] = { pass: true, detail };
  } catch (e) {
    fail++;
    const msg = ((e && e.message) || String(e)).split("\n")[0];
    console.log(`FAIL  ${name}\n        ${msg}`);
    json[name] = { pass: false, detail: msg };
  }
}

report("guards: every rule can fail", fakeGuards);
report("c. the maintainer's label-stock note is in no shipped still manifest", ruleDevNote);

const tabKeys = (process.env.PS_TEST_TABS || Object.keys(TABS).join(",")).split(",");
const recs = {};
if (!ONLY || /^[abdefg]\./.test(ONLY) || ONLY.includes("cut") || ONLY.includes("read") || ONLY.includes("click") || ONLY.includes("pointer") || ONLY.includes("end") || ONLY.includes("bars") || ONLY.includes("walk")) {
  const browser = await pw[ENGINE].launch();
  try {
    for (const key of tabKeys) {
      recs[key] = {};
      for (const vp of VIEWPORTS) {
        try {
          recs[key][vp] = await play(browser, TABS[key], vp);
          console.log(`  [played ${key} ${ENGINE} ${vp}: ${recs[key][vp].samples.length} samples]`);
        } catch (e) {
          recs[key][vp] = { error: String(e.message).split("\n")[0] };
          console.log(`  [${key} ${vp} could not be played: ${recs[key][vp].error}]`);
        }
      }
    }
  } finally {
    await browser.close();
  }
}

/** One rule over one tab across the viewports; the failing viewports are named in the one-line detail. */
function across(key, rule, only) {
  const bad = [];
  const ok = [];
  for (const [vp, rec] of Object.entries(recs[key] ?? {})) {
    if (only && !only(rec)) continue;
    try {
      if (rec.error) throw new Error(rec.error);
      ok.push(`${vp}: ${rule(rec)}`);
    } catch (e) {
      bad.push(`[${ENGINE} ${vp}] ${String(e.message).split("\n")[0]}`);
    }
  }
  assert.ok(bad.length === 0, bad.slice(0, 4).join(" || ") + (bad.length > 4 ? ` (+${bad.length - 4} more sizes)` : ""));
  return `${ok.length} sizes ok`;
}
for (const key of Object.keys(recs)) {
  const label = `${TABS[key].title} > ${TABS[key].tab}`;
  report(`a. no word is cut by the stage edge, pointer and focus whole (${label})`, () => across(key, ruleCut));
  report(`b. phone text is at least ${MIN_TEXT_PX}px effective (${label})`, () => across(key, ruleReadable, (r) => r.phone));
  report(`d. every page change is clicked first (${label})`, () => across(key, (r) => ruleClicked(r, TABS[key])));
  report(`e. the pointer is present in every step (${label})`, () => across(key, rulePointerPresent));
  report(`f. the film ends on Replay and replays (${label})`, () => across(key, ruleEnding));
  report(`g. the picture fills the stage, no bars (${label})`, () => across(key, ruleNoBars));
}

if (process.env.PS_TEST_JSON) fs.writeFileSync(process.env.PS_TEST_JSON, JSON.stringify({ engine: ENGINE, theme: THEME, json }, null, 1));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
