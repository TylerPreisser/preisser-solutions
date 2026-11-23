/**
 * Browser probe for the client showcase's AI, Impact and tab-strip fixes (critic r2, 2026-11-22: M3, M4, M5,
 * SHOULD 2, 7, 9). Each rule is a pure function over numbers read from the real page, and each one is shown
 * able to fail on a planted defect before the browser runs ("guards").
 *
 *  1. AI tabs (Hays, Duffer) at rest.
 *     1a. layout   the robot's box does not touch the question's text box, the answer card does not touch the
 *                  robot, no fetch wire crosses the question, no mark of the band (status tick, chips, wires)
 *                  shows over the question or the answer, and the answer starts below the band. Played with the
 *                  stylesheets in the order they load AND in the reverse order (the race behind M3: two lazily
 *                  loaded stylesheets both styled `.fb`, and whichever landed last won), and N fresh plays under
 *                  a CPU throttle, plus a tab switch and a window resize mid-play.
 *     1b. answer   the answer shows more than its headline (critic M3 b: headline only at 1024x768).
 *     1c. fold     the band folds as a transition (Chromium, per animation frame: at least 6 in-between heights
 *                  over 250 ms or more); under reduced motion it is folded from the first frame.
 *  2. Impact tabs (FarmBooks, NWKS; the same component draws HG Oil and Duffer, so they are measured too).
 *     2a. strike   an old way given as a sentence is struck through at rest (also under reduced motion), and the
 *                  strike is drawn during play.
 *     2b. apart    the struck sentence ends at least 16 px above the new figure, and the figure has its own label.
 *     2c. fill     the content uses the panel's height: it spans at least 60% of it and no empty band above,
 *                  below or between is over 25% (tall stages only: 820x1180, 1440x900, 393x852 and up).
 *     2d. orphans  no text block ends on a line holding a single word (also swept at every width 320 to 1440).
 *     2e. figures  any text drawn at 24 px or more holds a digit (a word is not shown as a giant figure).
 *     2f. cue      a panel that scrolls at rest shows a visible cue (`.im__more`) at its cut edge.
 *     2i. clear    and that cue rests on blank ground: every text line is whole (opaque top to bottom, inside the panel)
 *                  or gone (transparent), and no line that shows touches the cue (its alpha read from the panel's mask).
 *     2g. size     every visible word is at least 12 px (effective, after any scale), both themes.
 *     2h. contrast every visible word meets 4.5:1 (3:1 at 24 px+, or 18.66 px bold) on its own background.
 *  3. Duffer's QR story (`[data-scene="duffer-qr"]`).
 *     3a. parts    a shop, a sign with the code, a hand, a phone, the feed, the new row and the count are drawn
 *                  and visible at rest; the new row names the partner shop and its code; the count equals the
 *                  Impact figure shown under the story.
 *     3b. size     the story spans at least 90% of the stage's width, and on a phone at least half its height.
 *     3c. whole    no word in the story is cut (no ellipsis, nothing clipped, nothing outside the story).
 *     3d. still    under reduced motion the first frame is already the final one.
 *  4. Impact sentences: none of the retired slogan lines is shown; each is one plain sentence, no dash.
 *  5. Tab strip (Duffer's five tabs on phones; the 3- and 4-tab clients are recorded and must not scroll at
 *     393 and up): the selected label is whole and clear of any edge cue; an edge with tabs past it shows a cue
 *     (`.sc-tabs__more`); every other label is whole, hidden, or (40 px or wider) peeks under its edge's cue with at
 *     least 40% of it in the clear (never a sliver such as "MarC", nor a stray "A" of "AI").
 *  z. static: no class is styled by two stylesheets that can load on the same page with different values for a
 *     layout property (position, display, inset, size, margin, padding, flex, grid, overflow, transform).
 *
 * Served as the production origin through tests/support/serve-prod-origin.mjs (the build in out/); every other
 * origin is refused. Knobs: PS_OUT_DIR, PS_TEST_ONLY=<words from a rule name>, PS_TEST_ENGINES=chromium,webkit,
 * PS_TEST_VIEWPORTS=393x852,..., PS_TEST_THEMES=light,dark, PS_TEST_PLAYS=<throttled AI plays per size, default 2>, PS_TEST_LOAD=0 (skip the throttled plays), PS_TEST_LOAD_VP, PS_TEST_LOAD_KEYS, PS_TEST_FOLD=0, PS_TEST_MATRIX=0 (skip the per-size sweep), PS_TEST_SWEEP=0|1 (the 320-1440 orphan sweep; on by default only when no
 * viewports are named). A run is split by these knobs into parts that each fit a 10-minute window; every part is the same file.
 * PS_TEST_THROTTLE=<CPU rate, default 6>, PS_TEST_SHOTS=<dir> (rest frames as PNG), PS_TEST_JSON=<file>.
 *
 *   npm run build && node tests/showcase-beats.probe.mjs
 */
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { serveAsProdOrigin, PROD_ORIGIN } from "./support/serve-prod-origin.mjs";

const req = createRequire(import.meta.url);
const pw = req("playwright");

// ------------------------------------------------------------------------------------------ knobs
const OUT = path.resolve(process.env.PS_OUT_DIR || "out");
const ONLY = (process.env.PS_TEST_ONLY || "").toLowerCase();
const ENGINES = (process.env.PS_TEST_ENGINES || "chromium,webkit,firefox").split(",");
const ALL_SIZES = ["320x568", "393x659", "393x852", "402x874", "820x1180", "1024x768", "1440x900"];
const OTHER_ENGINE_SIZES = ["393x852", "1440x900"];
const SIZES = process.env.PS_TEST_VIEWPORTS ? process.env.PS_TEST_VIEWPORTS.split(",") : null;
const THEMES = (process.env.PS_TEST_THEMES || "light,dark").split(",");
const PLAYS = Number(process.env.PS_TEST_PLAYS ?? 2);
const THROTTLE = Number(process.env.PS_TEST_THROTTLE ?? 6);
const LOAD = process.env.PS_TEST_LOAD !== "0"; // the throttled fresh plays (1a under load)
const FOLD = process.env.PS_TEST_FOLD !== "0"; // 1c, per frame
const MATRIX = process.env.PS_TEST_MATRIX !== "0"; // the per-size sweep of every client
const SWEEP = process.env.PS_TEST_SWEEP ? process.env.PS_TEST_SWEEP === "1" : !process.env.PS_TEST_VIEWPORTS; // 2d at every width
const SHOTS = process.env.PS_TEST_SHOTS || "";
const ORPHAN_WIDTHS = ["320x568", "360x640", "375x667", "390x844", "414x896", "430x932", "768x1024", "1024x768", "1280x800", "1440x900"];
const PHONE_MAX_W = 430;
const AI_REST_MS = 11000; // the fetch beats' answers are whole by ~10 s (fetchTimeline: answer ~7.4 s + 2.3 s of entry).
const QR_REST_MS = 11000; // the QR story rests at 9.8 s.
const IMPACT_REST_MS = 3500;

const CLIENTS = {
  hays: { title: "Hays Academy of Hair Design", tabs: 3 },
  duffer: { title: "Duffer Golf", tabs: 5 },
  farmbooks: { title: "FarmBooks", tabs: 3 },
  nwks: { title: "NWKS Encounter", tabs: 3 },
  hg: { title: "HG Oil Holdings", tabs: 3 },
};
// The lines an agent drafted (design spec 2026-11-03 "draft copy, the owner's to approve"); retired here.
const RETIRED_LINES = [
  "Line items in. Never a typed total.",
  "Volunteers adjust the plan. They no longer type it.",
  "Vendor insurance and the month-end close now run themselves. A person signs off; nobody types.",
  "Every scan and visit is credited to the partner who sent it.",
];

// ------------------------------------------------------------------------------------------ pure rules
const SLACK = 0.5;
/** Overlap of two rects (x, y, w, h), both axes past the slack. */
export function overlaps(a, b, slack = SLACK) {
  if (!a || !b) return false;
  return a.x < b.x + b.w - slack && b.x < a.x + a.w - slack && a.y < b.y + b.h - slack && b.y < a.y + a.h - slack;
}
const clip = (r, to) => {
  const x = Math.max(r.x, to.x);
  const y = Math.max(r.y, to.y);
  const x1 = Math.min(r.x + r.w, to.x + to.w);
  const y1 = Math.min(r.y + r.h, to.y + to.h);
  return x1 > x && y1 > y ? { x, y, w: x1 - x, h: y1 - y } : null;
};

/** 1a. g = { band, body, qt, bot, card, wires: [rect], marks: [rect] } (marks and wires as drawn, before the band's clip). */
export function ruleAiLayout(g) {
  if (!g) throw new Error("no AI screen on the selected tab");
  const bad = [];
  const bot = g.bot && clip(g.bot, g.band);
  if (bot && overlaps(bot, g.qt)) bad.push("the robot sits on the question");
  if (bot && g.card && overlaps(bot, g.card)) bad.push("the answer card covers the robot");
  const wires = g.wires.map((w) => clip(w, g.band)).filter(Boolean);
  const crossing = wires.filter((w) => overlaps(w, g.qt)).length;
  if (crossing) bad.push(`${crossing} fetch wire(s) cross the question`);
  const marks = g.marks.map((m) => clip(m, g.band)).filter(Boolean);
  const stray = marks.filter((m) => overlaps(m, g.qt) || (g.card && overlaps(m, g.card))).length;
  if (stray) bad.push(`${stray} band mark(s) show over the question or the answer`);
  if (g.body.y < g.band.y + g.band.h - SLACK) bad.push(`the answer starts ${(g.band.y + g.band.h - g.body.y).toFixed(0)} px inside the band`);
  assert.ok(bad.length === 0, bad.join("; "));
  return "clear";
}

/** 1b. blocks = how many blocks of the answer are shown. */
export function ruleAiAnswer(g) {
  assert.ok(g && g.blocks >= 2, `the answer rests on ${g?.blocks ?? 0} block(s): its headline only`);
  return `${g.blocks} blocks`;
}

/** 1c. frames = [[ms, height]] from the fold on; reduced: the run is under reduced motion. */
export function ruleFold(frames, reduced) {
  assert.ok(frames.length > 0, "no band frames recorded");
  const hs = frames.map((f) => f[1]);
  const first = hs[0];
  const last = hs[hs.length - 1];
  if (reduced) {
    assert.ok(Math.abs(first - last) < 1, `under reduced motion the band moved from ${first} to ${last}`);
    return "folded from the first frame";
  }
  assert.ok(first - last > 20, `the band never folded (${first} -> ${last})`);
  const mid = frames.filter((f) => f[1] < first - 1 && f[1] > last + 1);
  const span = mid.length ? mid[mid.length - 1][0] - mid[0][0] : 0;
  assert.ok(mid.length >= 6 && span >= 250, `the band folds in ${mid.length} in-between frame(s) over ${span} ms (a jump)`);
  return `${mid.length} in-between frames over ${span} ms`;
}

/** 2a. olds = [{ text, strike: { image, size } | null }] at rest; mid = [sizes sampled during play] (null: not checked). */
export function ruleStrike(s) {
  const bad = [];
  for (const o of s.olds) {
    if (!o.strike || !/gradient/.test(o.strike.image)) bad.push(`"${o.text}" is not struck`);
    else if (!/^100%/.test(o.strike.size)) bad.push(`"${o.text}" is struck only ${o.strike.size.split(" ")[0]} of the way at rest`);
  }
  if (s.mid && s.olds.length && !s.mid.some((m) => /^(\d+(\.\d+)?)%/.test(m) && parseFloat(m) < 100)) bad.push("the strike is never seen being drawn");
  assert.ok(bad.length === 0, bad.join("; "));
  return s.olds.length ? `${s.olds.length} struck` : "no old way on this tab";
}

/** 2b. cards = [{ old: rect, now: rect, lab: rect | null }] for cards whose old way is a sentence. */
export function ruleApart(s) {
  const bad = [];
  for (const c of s.cards) {
    const gap = c.now.y - (c.old.y + c.old.h);
    if (gap < 16) bad.push(`the old way ends ${gap.toFixed(0)} px above its figure`);
    if (!c.lab || c.lab.y < c.now.y + c.now.h - 4) bad.push("the figure has no label of its own under it");
  }
  assert.ok(bad.length === 0, bad.join("; "));
  return `${s.cards.length} card(s) apart`;
}

/** 2c. panel = rect; items = rects of what is drawn (rows of content). Only checked on tall stages. */
export function ruleFill(s) {
  const items = s.items.filter((r) => r.h > 0).sort((a, b) => a.y - b.y);
  assert.ok(items.length, "nothing drawn");
  const top = s.panel.y;
  const bottom = s.panel.y + s.panel.h;
  const lo = Math.max(top, Math.min(...items.map((r) => r.y)));
  const hi = Math.min(bottom, Math.max(...items.map((r) => r.y + r.h)));
  const share = (hi - lo) / s.panel.h;
  let gap = Math.max(lo - top, bottom - hi);
  let reach = items[0].y + items[0].h;
  for (const r of items.slice(1)) {
    gap = Math.max(gap, r.y - reach);
    reach = Math.max(reach, r.y + r.h);
  }
  const g = gap / s.panel.h;
  assert.ok(share >= 0.6 && g <= 0.25, `content spans ${(share * 100).toFixed(0)}% of the panel; the largest empty band is ${(g * 100).toFixed(0)}%`);
  return `spans ${(share * 100).toFixed(0)}%, largest gap ${(g * 100).toFixed(0)}%`;
}

/** 2d. blocks = [{ text, words, last }]: total words and words on the last line. */
export function ruleOrphans(s) {
  const bad = s.blocks.filter((b) => b.words >= 3 && b.last === 1).map((b) => `"${b.text.slice(0, 48)}" ends on one word`);
  assert.ok(bad.length === 0, bad.slice(0, 3).join("; ") + (bad.length > 3 ? ` (+${bad.length - 3})` : ""));
  return `${s.blocks.length} blocks, no lone last word`;
}

/** 2e. display = [{ text, px }] for text drawn at 24 px or more inside the numbers block. */
export function ruleFigures(s) {
  const bad = s.display.filter((d) => !/\d/.test(d.text)).map((d) => `"${d.text}" is drawn at ${d.px.toFixed(0)} px with no figure in it`);
  assert.ok(bad.length === 0, bad.join("; "));
  return `${s.display.length} display figures`;
}

/** 2f. overflow: the panel scrolls at rest; cue: a visible cue at the cut edge. */
export function ruleCue(s) {
  if (!s.overflow) return "fits";
  assert.ok(s.cue, "the panel scrolls with nothing showing that it does");
  return "scrolls, cue shown";
}

/**
 * 2i. A panel that scrolls rests its cue on blank ground: no text line that shows (at least half opaque) touches the
 * cue, and every line is either whole (opaque top to bottom, inside the panel) or gone (transparent top to bottom).
 * lines = [{ text, top, bottom, aTop, aMid, aBot }] in the scroller's own px, alpha from its mask; cue = rect or null.
 */
export function ruleCueClear(s) {
  if (!s.overflow) return "fits, no cue";
  const bad = [];
  for (const l of s.lines) {
    const inPanel = l.top >= -0.5 && l.bottom <= s.height + 0.5;
    const whole = inPanel && l.aTop >= 0.9 && l.aBot >= 0.9;
    const gone = Math.max(l.aTop, l.aMid, l.aBot) <= 0.1 || l.top >= s.height - 0.5;
    if (!whole && !gone) bad.push(`"${l.text}" is cut at the panel's lower edge`);
    else if (whole && s.cue && l.bottom > s.cue.top + 0.5 && l.top < s.cue.bottom - 0.5 && l.right > s.cue.left + 0.5 && l.left < s.cue.right - 0.5) bad.push(`"${l.text}" shows under the scroll cue`);
  }
  assert.ok(bad.length === 0, bad.slice(0, 3).join("; ") + (bad.length > 3 ? ` (+${bad.length - 3})` : ""));
  return `${s.lines.length} lines, each whole or gone, cue on blank ground`;
}

/** 2g/3. texts = [{ text, px }]. */
export function ruleTextSize(s, min = 12) {
  const bad = s.texts.filter((t) => t.px < min - 0.05);
  assert.ok(bad.length === 0, `${bad.length} word run(s) under ${min} px, e.g. "${bad[0]?.text}" at ${bad[0]?.px.toFixed(1)} px`);
  return `${s.texts.length} runs, smallest ${Math.min(...s.texts.map((t) => t.px)).toFixed(1)} px`;
}

/** 2h. texts = [{ text, ratio, large }]. */
export function ruleContrast(s) {
  const bad = s.texts.filter((t) => t.ratio < (t.large ? 3 : 4.5) - 0.02);
  assert.ok(bad.length === 0, `${bad.length} run(s) under contrast, e.g. "${bad[0]?.text}" at ${bad[0]?.ratio.toFixed(2)}:1`);
  return `${s.texts.length} runs, lowest ${Math.min(...s.texts.map((t) => t.ratio)).toFixed(2)}:1`;
}

/** 3a. q = { parts: {name: visible}, row, count, figure }. */
export function ruleQrParts(q) {
  assert.ok(q, "no QR story on the Impact tab");
  const missing = ["shop", "sign", "hand", "phone", "feed", "row", "count"].filter((p) => !q.parts[p]);
  const bad = [];
  if (missing.length) bad.push(`not drawn: ${missing.join(", ")}`);
  if (!/Sumac Hollow/.test(q.row || "")) bad.push("the new row does not name the partner shop");
  if (!/SUMAC/.test(q.row || "")) bad.push("the new row does not carry the shop's code");
  if (!q.figure || q.count !== q.figure) bad.push(`the count reads "${q.count}", the Impact figure "${q.figure}"`);
  assert.ok(bad.length === 0, bad.join("; "));
  return "every part drawn";
}

/** 3b. q = { scene, stage, phone }. */
export function ruleQrSize(q) {
  assert.ok(q, "no QR story");
  const wShare = q.scene.w / q.stage.w;
  const hShare = q.scene.h / q.stage.h;
  const bad = [];
  if (wShare < 0.9) bad.push(`the story spans ${(wShare * 100).toFixed(0)}% of the stage's width`);
  if (q.phone && hShare < 0.5) bad.push(`the story takes ${(hShare * 100).toFixed(0)}% of the phone stage's height`);
  assert.ok(bad.length === 0, bad.join("; "));
  return `${(wShare * 100).toFixed(0)}% wide, ${(hShare * 100).toFixed(0)}% tall`;
}

/** 3c. cut = [text of words cut]. */
export function ruleQrWhole(q) {
  assert.ok(q, "no QR story");
  assert.ok(q.cut.length === 0, `${q.cut.length} cut: ${q.cut.slice(0, 3).join(" | ")}`);
  return "nothing cut";
}

/** 4. lines = the Impact sentences shown. */
export function ruleSentences(lines) {
  const bad = [];
  for (const l of lines) {
    if (RETIRED_LINES.includes(l)) bad.push(`retired line still shown: "${l}"`);
    else if (!/^[^.!?;]+[.!?]$/.test(l.trim())) bad.push(`not one plain sentence: "${l}"`);
    if (/[–—]/.test(l)) bad.push(`dash in "${l}"`);
  }
  assert.ok(bad.length === 0, bad.join("; "));
  return `${lines.length} sentence(s)`;
}

/** 5. strip = { scroll, track, clearL, clearR, cueL, cueR, tabs: [{ label, sel, x0, x1, hidden }] }. */
export function ruleStrip(s) {
  const bad = [];
  const tl = s.track.x;
  const tr = s.track.x + s.track.w;
  let pastL = false;
  let pastR = false;
  for (const t of s.tabs) {
    const shows = t.x1 > tl + SLACK && t.x0 < tr - SLACK;
    const whole = t.x0 >= s.clearL - SLACK && t.x1 <= s.clearR + SLACK;
    // A label crossing an edge may peek under that edge's cue when at least 40% of it is in the clear; a sliver is hidden.
    const shown = (Math.min(t.x1, s.clearR) - Math.max(t.x0, s.clearL)) / Math.max(1, t.x1 - t.x0);
    const cued = (t.x0 < s.clearL - SLACK ? s.cueL : true) && (t.x1 > s.clearR + SLACK ? s.cueR : true);
    // A short label (under 40 px) never peeks: part of "AI" is a stray letter.
    const peek = cued && shown >= 0.4 && t.x1 - t.x0 >= 40;
    if (t.sel && !whole) bad.push(`the selected tab "${t.label}" is not whole and clear of the edges`);
    else if (!t.sel && shows && !whole && !t.hidden && !peek) bad.push(`"${t.label}" is sliced at the strip's edge (${Math.round(shown * 100)}% shows)`);
    if (t.x0 < s.clearL - SLACK) pastL = true;
    if (t.x1 > s.clearR + SLACK) pastR = true;
  }
  if (pastL && !s.cueL) bad.push("tabs past the left edge, no cue there");
  if (pastR && !s.cueR) bad.push("tabs past the right edge, no cue there");
  assert.ok(bad.length === 0, bad.join("; "));
  return s.scroll ? `strip, cues ${s.cueL ? "L" : ""}${s.cueR ? "R" : ""}` : "fits";
}

/** z. A class styled with different layout values by two stylesheets that can load on one page. */
const LAYOUT = /^(position|display|inset|top|left|right|bottom|width|height|min-width|min-height|max-width|max-height|margin(-\w+)?|padding(-\w+)?|flex(-\w+)?|grid(-\w+)?|overflow(-[xy])?|transform)$/;
export function cssCollisions(sheets) {
  const owner = new Map(); // class -> Map(prop -> Map(file -> value))
  for (const [file, css] of sheets) {
    const flat = css.replace(/@media[^{]*\{/g, "").replace(/@container[^{]*\{/g, "").replace(/@supports[^{]*\{/g, "");
    for (const m of flat.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const decls = m[2].split(";").map((d) => d.split(":")).filter((d) => d.length >= 2).map(([k, ...v]) => [k.trim(), v.join(":").trim()]);
      for (const part of m[1].split(",")) {
        const c = /^\.([A-Za-z_][\w-]*)$/.exec(part.trim());
        if (!c) continue;
        for (const [k, v] of decls) {
          if (!LAYOUT.test(k)) continue;
          if (!owner.has(c[1])) owner.set(c[1], new Map());
          const props = owner.get(c[1]);
          if (!props.has(k)) props.set(k, new Map());
          props.get(k).set(file, v);
        }
      }
    }
  }
  const out = [];
  for (const [cls, props] of owner) {
    for (const [k, files] of props) {
      if (files.size > 1 && new Set(files.values()).size > 1) out.push(`.${cls} { ${k} } differs between ${[...files.keys()].join(" and ")}`);
    }
  }
  return out;
}
function ruleStaticCss() {
  const html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
  const linked = [...html.matchAll(/href="\/_next\/static\/css\/([^"]+\.css)"/g)].map((m) => m[1]);
  const runtime = fs.readdirSync(path.join(OUT, "_next/static/chunks")).find((f) => /^webpack-.*\.js$/.test(f));
  const rt = fs.readFileSync(path.join(OUT, "_next/static/chunks", runtime), "utf8");
  const map = /miniCssF=\w+=>"static\/css\/"\+\(\{([^}]*)\}\)/.exec(rt);
  assert.ok(map, "could not read the lazily loaded stylesheets from the webpack runtime");
  const lazy = [...map[1].matchAll(/"([0-9a-f]+)"/g)].map((m) => `${m[1]}.css`);
  const files = [...new Set([...linked, ...lazy])];
  const sheets = files.map((f) => [f, fs.readFileSync(path.join(OUT, "_next/static/css", f), "utf8")]);
  const bad = cssCollisions(sheets);
  assert.ok(bad.length === 0, bad.slice(0, 3).join("; "));
  return `${files.length} stylesheets on the home page, no layout collisions`;
}

// ------------------------------------------------------------------------------------------ guards
function fakeGuards() {
  const fails = (name, f) => {
    let threw = false;
    try {
      f();
    } catch {
      threw = true;
    }
    assert.ok(threw, `guard "${name}" did not fail on a planted defect`);
  };
  const ok = { band: { x: 0, y: 0, w: 320, h: 96 }, body: { x: 0, y: 96, w: 320, h: 500 }, qt: { x: 14, y: 110, w: 280, h: 20 }, bot: { x: 10, y: 40, w: 48, h: 56 }, card: { x: 12, y: 140, w: 296, h: 300 }, wires: [{ x: 60, y: 14, w: 2, h: 56 }], marks: [{ x: 12, y: 76, w: 13, h: 13 }] };
  ruleAiLayout(ok);
  // The M3 frame: the body laid over the band.
  const broken = { ...ok, body: { x: 0, y: 0, w: 320, h: 596 }, qt: { x: 14, y: 14, w: 280, h: 20 }, card: { x: 12, y: 45, w: 296, h: 300 } };
  fails("1a robot on question", () => ruleAiLayout(broken));
  fails("1a wire crosses", () => ruleAiLayout({ ...ok, qt: { x: 50, y: 30, w: 100, h: 20 }, body: { x: 0, y: 96, w: 320, h: 500 }, bot: null }));
  fails("1a answer in band", () => ruleAiLayout({ ...ok, body: { x: 0, y: 60, w: 320, h: 500 } }));
  ruleAiAnswer({ blocks: 3 });
  fails("1b headline only", () => ruleAiAnswer({ blocks: 1 }));
  const fold = Array.from({ length: 26 }, (_, i) => [7100 + i * 17, 208 - Math.min(98, i * 4)]);
  ruleFold(fold, false);
  fails("1c jump", () => ruleFold([[0, 208], [16, 208], [33, 110], [50, 110]], false));
  fails("1c reduced moves", () => ruleFold(fold, true));
  ruleStrike({ olds: [{ text: "x", strike: { image: "linear-gradient(red, red)", size: "100% 2px" } }], mid: ["40% 2px"] });
  fails("2a not struck", () => ruleStrike({ olds: [{ text: "x", strike: null }], mid: null }));
  fails("2a half struck", () => ruleStrike({ olds: [{ text: "x", strike: { image: "linear-gradient(red, red)", size: "50% 2px" } }], mid: null }));
  fails("2a never drawn", () => ruleStrike({ olds: [{ text: "x", strike: { image: "linear-gradient(red, red)", size: "100% 2px" } }], mid: ["100% 2px"] }));
  ruleApart({ cards: [{ old: { y: 0, h: 20 }, now: { y: 40, h: 80 }, lab: { y: 124, h: 20 } }] });
  fails("2b label above figure", () => ruleApart({ cards: [{ old: { y: 0, h: 20 }, now: { y: 24, h: 80 }, lab: { y: 110, h: 20 } }] }));
  ruleFill({ panel: { y: 0, h: 1000 }, items: [{ y: 150, h: 300 }, { y: 460, h: 400 }] });
  fails("2c dead half", () => ruleFill({ panel: { y: 0, h: 1000 }, items: [{ y: 100, h: 400 }] }));
  ruleOrphans({ blocks: [{ text: "two words here", words: 3, last: 2 }] });
  fails("2d orphan", () => ruleOrphans({ blocks: [{ text: "Volunteers adjust the plan. They no longer type it.", words: 9, last: 1 }] }));
  ruleFigures({ display: [{ text: "101", px: 88 }] });
  fails("2e word figure", () => ruleFigures({ display: [{ text: "Milliseconds", px: 32 }] }));
  fails("2f no cue", () => ruleCue({ overflow: true, cue: false }));
  const cueOk = { overflow: true, height: 400, cue: { top: 350, bottom: 380, left: 150, right: 180 }, lines: [{ text: "a b", top: 300, bottom: 320, left: 20, right: 300, aTop: 1, aMid: 1, aBot: 1 }, { text: "c d", top: 340, bottom: 360, left: 20, right: 300, aTop: 0, aMid: 0, aBot: 0 }] };
  ruleCueClear(cueOk);
  fails("2i word under the cue", () => ruleCueClear({ ...cueOk, lines: [{ ...cueOk.lines[1], aTop: 1, aMid: 1, aBot: 1 }] }));
  fails("2i line faded half way", () => ruleCueClear({ ...cueOk, lines: [{ ...cueOk.lines[0], aBot: 0.4 }] }));
  fails("2i line cut by the edge", () => ruleCueClear({ ...cueOk, lines: [{ ...cueOk.lines[0], top: 390, bottom: 410 }] }));
  fails("2g small", () => ruleTextSize({ texts: [{ text: "Sumac", px: 9.6 }] }));
  fails("2h contrast", () => ruleContrast({ texts: [{ text: "x", ratio: 3.1, large: false }] }));
  const q = { parts: { shop: 1, sign: 1, hand: 1, phone: 1, feed: 1, row: 1, count: 1 }, row: "Scan Sumac Hollow code SUMAC", count: "366", figure: "366" };
  ruleQrParts(q);
  fails("3a no hand", () => ruleQrParts({ ...q, parts: { ...q.parts, hand: 0 } }));
  fails("3a count", () => ruleQrParts({ ...q, count: "15" }));
  fails("3b small", () => ruleQrSize({ scene: { w: 270, h: 150 }, stage: { w: 360, h: 690 }, phone: true }));
  fails("3c cut", () => ruleQrWhole({ cut: ["Sumac Hol…"] }));
  fails("4 retired", () => ruleSentences([RETIRED_LINES[0]]));
  fails("4 two sentences", () => ruleSentences(["A thing. Another thing."]));
  const strip = { scroll: true, track: { x: 12, w: 296 }, clearL: 90, clearR: 280, cueL: true, cueR: false, tabs: [{ label: "MarCommand", sel: false, x0: 20, x1: 110, hidden: false }, { label: "Impact", sel: true, x0: 200, x1: 250, hidden: false }] };
  fails("5 sliced", () => ruleStrip(strip));
  ruleStrip({ ...strip, clearL: 40 }); // 78% shows under the left cue: a peek, allowed
  fails("5 peek without a cue", () => ruleStrip({ ...strip, clearL: 40, cueL: false }));
  fails("5 short label peeks", () => ruleStrip({ ...strip, clearL: 40, tabs: [{ label: "AI", sel: false, x0: 30, x1: 43, hidden: false }, strip.tabs[1]] }));
  ruleStrip({ ...strip, tabs: [{ ...strip.tabs[0], hidden: true }, strip.tabs[1]] });
  fails("5 no cue", () => ruleStrip({ ...strip, cueL: false, tabs: [{ ...strip.tabs[0], hidden: true }, strip.tabs[1]] }));
  fails("5 selected cut", () => ruleStrip({ ...strip, tabs: [{ ...strip.tabs[1], x0: 270, x1: 320 }] }));
  fails("z collision", () => assert.ok(cssCollisions([["a.css", ".fb{position:relative}"], ["b.css", ".fb{position:absolute;inset:0}"]]).length === 0));
  assert.ok(cssCollisions([["a.css", ".x{background:red}"], ["b.css", ".x{background:blue}"]]).length === 0, "z flags a non-layout difference");
  return "all 31 planted defects fail their rule; every clean input passes; z ignores a colour-only difference";
}

// ------------------------------------------------------------------------------------------ in-page readers
/** Shared helpers, injected once per page. */
function installReaders() {
  const R = (el) => {
    const b = el.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  };
  const opacity = (el, stop) => {
    let o = 1;
    for (let a = el; a && a !== stop; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.display === "none" || cs.visibility === "hidden") return 0;
      o *= Number(cs.opacity);
    }
    return o;
  };
  const hiddenText = (el) => Boolean(el.closest(".ps-visually-hidden, [hidden], [data-demo-narration], [aria-hidden='true'] .ps-visually-hidden"));
  const scaleOf = (el) => {
    const b = el.getBoundingClientRect();
    return el.offsetWidth > 0 && b.width > 0 ? b.width / el.offsetWidth : 1;
  };
  const rgba = (s) => {
    const m = /rgba?\(([^)]+)\)/.exec(s);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ground = (el) => {
    const stack = [];
    for (let a = el; a; a = a.parentElement) {
      const c = rgba(getComputedStyle(a).backgroundColor);
      if (c && c.a > 0) stack.push(c);
      if (c && c.a >= 0.95) break;
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    if (document.documentElement.getAttribute("data-theme") === "dark" && !stack.some((c) => c.a >= 0.95)) bg = { r: 10, g: 22, b: 40, a: 1 };
    for (const c of stack.reverse()) bg = { r: c.r * c.a + bg.r * (1 - c.a), g: c.g * c.a + bg.g * (1 - c.a), b: c.b * c.a + bg.b * (1 - c.a), a: 1 };
    return bg;
  };
  /** Every visible run of text under root: its words, effective size, contrast and box. */
  const runs = (root, stop) => {
    const out = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const text = n.textContent.replace(/\s+/g, " ").trim();
      if (!text) continue;
      const el = n.parentElement;
      if (!el || hiddenText(el) || el.closest("svg")) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      const box = range.getBoundingClientRect();
      if (box.width < 1 || box.height < 1) continue;
      const op = opacity(el, stop);
      if (op < 0.5) continue;
      const cs = getComputedStyle(el);
      if (cs.color === "rgba(0, 0, 0, 0)" || cs.color === "transparent") continue;
      const px = parseFloat(cs.fontSize) * scaleOf(el);
      const fg = rgba(cs.color);
      const bg = ground(el);
      const a = (fg?.a ?? 1) * op;
      const mix = { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a) };
      const L1 = lum(mix);
      const L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const bold = parseInt(cs.fontWeight, 10) >= 700;
      out.push({ text: text.slice(0, 40), px, ratio, large: px >= 24 || (bold && px >= 18.66), box: { x: box.x, y: box.y, w: box.width, h: box.height }, el });
    }
    return out;
  };
  /** Words per line of an element's text (lines grouped by each word's top). */
  const lines = (el) => {
    const tops = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (hiddenText(n.parentElement)) continue;
      const re = /\S+/g;
      let m;
      while ((m = re.exec(n.textContent))) {
        const r = document.createRange();
        r.setStart(n, m.index);
        r.setEnd(n, m.index + m[0].length);
        const b = r.getClientRects()[0];
        if (b && b.width > 0) tops.push(b.top);
      }
    }
    if (!tops.length) return { words: 0, last: 0 };
    const lastTop = tops[tops.length - 1];
    return { words: tops.length, last: tops.filter((t) => Math.abs(t - lastTop) < 3).length };
  };
  window.__ps = { R, opacity, runs, lines, scaleOf };
}

function readAi() {
  const { R, opacity } = window.__ps;
  const panel = document.querySelector('[role="tabpanel"][data-on]');
  const scr = panel && panel.querySelector(".ai2__screen");
  if (!scr) return null;
  const band = R(scr.querySelector(".fb"));
  const qtEl = scr.querySelector(".ai2__qt");
  const range = document.createRange();
  range.selectNodeContents(qtEl.firstElementChild || qtEl);
  const q = range.getBoundingClientRect();
  const bot = scr.querySelector(".sc-elara");
  const card = scr.querySelector(".ai2__card[data-in] .ai-answer");
  const wires = [...scr.querySelectorAll(".fb-wires line")].map(R);
  const marks = [...scr.querySelectorAll(".fb-status__tick, .fb-chip, .fb-src__card")].filter((m) => opacity(m, scr) > 0.1).map(R);
  const body = card ? card.querySelector(".ai-answer__body") : null;
  const blocks = body ? [...body.children].filter((b) => getComputedStyle(b).display !== "none" && !b.hasAttribute("data-off") && b.getBoundingClientRect().height > 0).length : 0;
  return { band, body: R(scr.querySelector(".ai2__body")), qt: { x: q.x, y: q.y, w: q.width, h: q.height }, bot: bot ? R(bot) : null, card: card ? R(card) : null, wires, marks, blocks };
}

function readImpact() {
  const { R, runs, lines, opacity } = window.__ps;
  const panel = document.querySelector('[role="tabpanel"][data-on]');
  const im = panel && panel.querySelector(".im");
  if (!im) return null;
  const scroller = im.querySelector(".im__scroll");
  const body = im.querySelector(".im__body");
  const all = runs(im, panel);
  const textRuns = all.map(({ text, px, ratio, large }) => ({ text, px, ratio, large }));
  // A figure is the whole value (a unit such as "s" rides with its number); visually hidden words are left out.
  const display = [...body.querySelectorAll(".im__now, .im__was, .im__row-v")]
    .filter((e) => opacity(e, panel) > 0.5 && parseFloat(getComputedStyle(e).fontSize) * window.__ps.scaleOf(e) >= 24)
    .map((e) => ({ text: [...e.childNodes].filter((n) => !(n.nodeType === 1 && n.classList.contains("ps-visually-hidden"))).map((n) => n.textContent).join("").trim(), px: parseFloat(getComputedStyle(e).fontSize) * window.__ps.scaleOf(e) }));
  const olds = [...im.querySelectorAll(".im__old")].map((o) => {
    const s = o.querySelector("[data-strike]");
    const cs = s ? getComputedStyle(s) : null;
    return { text: o.textContent.trim(), strike: cs ? { image: cs.backgroundImage, size: cs.backgroundSize } : null };
  });
  const cards = [...im.querySelectorAll(".im__card")].filter((c) => c.querySelector(".im__old")).map((c) => {
    // Element boxes (line boxes), not glyph boxes: a 84 px figure's glyph box starts ~8 px above its line box.
    const ob = R(c.querySelector(".im__old"));
    const lab = c.querySelector(".im__lab");
    const nb = R(c.querySelector(".im__now"));
    return { old: { y: ob.y, h: ob.h }, now: { y: nb.y, h: nb.h }, lab: lab ? R(lab) : null };
  });
  const blockEls = [...im.querySelectorAll(".im__k, .im__old, .im__lab, .im__row-l, .im__text:not([hidden])")].filter((e) => opacity(e, panel) > 0.5);
  const blocks = blockEls.map((e) => ({ text: e.textContent.trim(), ...lines(e) }));
  const items = [...im.querySelectorAll(".im__lead, .im__k, .im__old, .im__was, .im__now, .im__lab, .im__row, .im__text:not([hidden])")].filter((e) => opacity(e, panel) > 0.5).map(R);
  const more = im.querySelector(".im__more");
  const cue = Boolean(more) && opacity(more, panel) > 0.5 && R(more).h > 0;
  // The scroller's mask as alpha by height: its linear-gradient stops resolved against the scroller's height.
  const sb = scroller.getBoundingClientRect();
  const H = scroller.clientHeight;
  const mask = getComputedStyle(scroller).maskImage || getComputedStyle(scroller).webkitMaskImage || "none";
  const stops = [];
  const g = /linear-gradient\((.*)\)$/.exec(mask.trim());
  if (g) {
    const parts = [];
    let depth = 0;
    let cur = "";
    for (const ch of g[1]) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (ch === "," && depth === 0) {
        parts.push(cur.trim());
        cur = "";
      } else cur += ch;
    }
    parts.push(cur.trim());
    const probeEl = document.createElement("div");
    probeEl.style.cssText = `position:absolute;left:0;top:0;width:1px;visibility:hidden;`;
    const host = document.createElement("div");
    host.style.cssText = `position:absolute;left:0;top:0;width:1px;height:${H}px;visibility:hidden;`;
    host.appendChild(probeEl);
    document.body.appendChild(host);
    for (const part of parts) {
      if (/^to\s|deg$/.test(part)) continue;
      const m = /^((?:rgba?|hsla?)\([^)]*\)|#[0-9a-f]+|transparent|black|white)\s*(.*)$/i.exec(part);
      if (!m) continue;
      const col = m[1];
      const a = col === "transparent" ? 0 : /rgba\(/.test(col) ? parseFloat(col.split(",")[3]) : 1;
      let pos = null;
      if (m[2]) {
        probeEl.style.height = m[2];
        pos = probeEl.getBoundingClientRect().height;
      }
      stops.push({ a, pos });
    }
    host.remove();
    if (stops.length) {
      if (stops[0].pos === null) stops[0].pos = 0;
      if (stops[stops.length - 1].pos === null) stops[stops.length - 1].pos = H;
      for (let i = 1; i < stops.length; i++) if (stops[i].pos === null) stops[i].pos = stops[i - 1].pos;
      for (let i = 1; i < stops.length; i++) stops[i].pos = Math.max(stops[i].pos, stops[i - 1].pos);
    }
  }
  const alphaAt = (y) => {
    if (!stops.length) return 1;
    if (y <= stops[0].pos) return stops[0].a;
    for (let i = 1; i < stops.length; i++) {
      if (y <= stops[i].pos) {
        const span = stops[i].pos - stops[i - 1].pos;
        return span <= 0 ? stops[i].a : stops[i - 1].a + ((stops[i].a - stops[i - 1].a) * (y - stops[i - 1].pos)) / span;
      }
    }
    return stops[stops.length - 1].a;
  };
  const textLines = [];
  const walker = document.createTreeWalker(scroller, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement;
    const text = n.textContent.replace(/\s+/g, " ").trim();
    if (!el || !text || el.closest(".ps-visually-hidden, [hidden], [data-demo-narration]") || el.closest("svg")) continue;
    if (opacity(el, panel) < 0.5) continue;
    const rg = document.createRange();
    rg.selectNodeContents(n);
    for (const q of rg.getClientRects()) {
      if (q.width < 1 || q.height < 1) continue;
      const top = q.top - sb.top;
      const bottom = q.bottom - sb.top;
      if (bottom <= 0) continue;
      textLines.push({ text: text.slice(0, 40), top, bottom, left: q.left - sb.left, right: q.right - sb.left, aTop: alphaAt(top + 1), aMid: alphaAt((top + bottom) / 2), aBot: alphaAt(bottom - 1) });
    }
  }
  const mr = more ? more.getBoundingClientRect() : null;
  const sentence = im.querySelector(".im__text");
  return {
    panel: R(im),
    items,
    texts: textRuns,
    display,
    olds,
    cards,
    blocks,
    overflow: scroller.scrollHeight > scroller.clientHeight + 1,
    cue,
    lines: textLines,
    height: H,
    cueBox: cue && mr ? { top: mr.top - sb.top, bottom: mr.bottom - sb.top, left: mr.left - sb.left, right: mr.right - sb.left } : null,
    sentence: sentence ? sentence.textContent.trim() : null,
    strikeSizes: [...im.querySelectorAll(".im__old [data-strike]")].map((s) => getComputedStyle(s).backgroundSize),
  };
}

function readQr() {
  const { R, runs, opacity } = window.__ps;
  const panel = document.querySelector('[role="tabpanel"][data-on]');
  const scene = panel && panel.querySelector('[data-scene="duffer-qr"]');
  if (!scene) return null;
  const im = panel.querySelector(".im");
  const sr = R(scene);
  const parts = {};
  for (const p of ["shop", "sign", "hand", "phone", "feed", "row", "count"]) {
    const el = scene.querySelector(`[data-qr="${p}"]`);
    const r = el && R(el);
    parts[p] = Boolean(el && r.w > 2 && r.h > 2 && opacity(el, panel) > 0.5 && r.x >= sr.x - 1 && r.x + r.w <= sr.x + sr.w + 1);
  }
  const all = runs(scene, panel);
  const cut = [];
  for (const t of all) {
    const cs = getComputedStyle(t.el);
    if (t.el.scrollWidth > t.el.clientWidth + 1 && (cs.overflow !== "visible" || cs.textOverflow === "ellipsis")) cut.push(t.text);
    else if (t.text.includes("…")) cut.push(t.text);
    else if (t.box.x < sr.x - 1 || t.box.x + t.box.w > sr.x + sr.w + 1 || t.box.y < sr.y - 1 || t.box.y + t.box.h > sr.y + sr.h + 1) cut.push(`${t.text} (outside the story)`);
  }
  const now = panel.querySelector(".im__now");
  const figure = now ? [...now.childNodes].filter((n) => !(n.nodeType === 1 && n.classList.contains("ps-visually-hidden"))).map((n) => n.textContent).join("").trim() : null;
  const row = scene.querySelector('[data-qr="row"]');
  const count = scene.querySelector('[data-qr="count"]');
  return {
    scene: sr,
    stage: R(im),
    parts,
    row: row ? row.textContent : null,
    count: count ? count.textContent.trim() : null,
    figure,
    cut,
    texts: all.map(({ text, px, ratio, large }) => ({ text, px, ratio, large })),
  };
}

function readStrip() {
  const { R, opacity } = window.__ps;
  const track = document.querySelector('[role="tablist"]');
  if (!track) return null;
  const tr = R(track);
  const cue = (side) => {
    const el = track.parentElement.querySelector(`.sc-tabs__more[data-side="${side}"]`);
    if (!el) return null;
    const r = R(el);
    return opacity(el, document.body) > 0.5 && r.w > 0 ? r : null;
  };
  const cueL = cue("l");
  const cueR = cue("r");
  const tabs = [...track.querySelectorAll('[role="tab"]')].map((t) => {
    const r = document.createRange();
    r.selectNodeContents(t);
    const b = r.getBoundingClientRect();
    const cs = getComputedStyle(t);
    const hidden = cs.color === "rgba(0, 0, 0, 0)" || cs.color === "transparent" || opacity(t, track) < 0.05;
    return { label: t.textContent, sel: t.getAttribute("aria-selected") === "true", x0: b.x, x1: b.x + b.width, w: R(t).w, hidden };
  });
  return {
    scroll: track.hasAttribute("data-scroll"),
    track: { x: tr.x, w: tr.w },
    clearL: cueL ? cueL.x + cueL.w : tr.x + 4,
    clearR: cueR ? cueR.x : tr.x + tr.w - 4,
    cueL: Boolean(cueL),
    cueR: Boolean(cueR),
    tabs,
  };
}

// ------------------------------------------------------------------------------------------ browser helpers
async function newPage(browser, engine, vp, { reduced = false } = {}) {
  const [W, H] = vp.split("x").map(Number);
  const phone = W <= PHONE_MAX_W;
  const opts = { viewport: { width: W, height: H }, deviceScaleFactor: phone ? 3 : 1, colorScheme: "light", reducedMotion: reduced ? "reduce" : "no-preference" };
  if (phone) {
    opts.hasTouch = true;
    if (engine === "chromium") opts.isMobile = true;
  }
  const ctx = await browser.newContext(opts);
  await serveAsProdOrigin(ctx, OUT);
  await ctx.route((u) => u.origin !== PROD_ORIGIN, (r) => r.abort());
  const page = await ctx.newPage();
  return { ctx, page, phone };
}

/** Loads the home page and returns the stylesheets it started with. */
async function load(page) {
  await page.goto(`${PROD_ORIGIN}/`, { waitUntil: "load", timeout: 90000 });
  await page.waitForTimeout(700);
  await page.evaluate(installReaders);
  await theme(page, "light");
  return page.evaluate(() => [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.getAttribute("href")));
}

/** Sets the theme after load, as the site's own toggle does, and waits until the page's ground has changed to it. */
const GROUNDS = new Map();
async function theme(page, t) {
  const open = await page.evaluate(() => Boolean(document.querySelector(".sc-panel")));
  const key = `${open}`;
  if (!GROUNDS.has(key)) GROUNDS.set(key, { light: null, dark: null });
  const GROUND = GROUNDS.get(key);
  await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), t);
  let bg = "";
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(120);
    // The ground of the open window's panel (the page under a phone sheet is dimmed in both themes), else the page's.
    const now = await page.evaluate(() => getComputedStyle(document.querySelector(".sc-panel") ?? document.body).backgroundColor);
    if (now === bg) break;
    bg = now;
  }
  GROUND[t] ??= bg;
  assert.equal(bg, GROUND[t], `the ${t} theme did not take (body ${bg})`);
  if (GROUND.light && GROUND.dark) assert.notEqual(GROUND.light, GROUND.dark, "light and dark grounds are the same");
}

/** Opens a client's window from its card (the pointer parked in the corner, so nothing opens by hover). */
async function openClient(page, key) {
  await page.mouse.move(0, 0);
  await page.evaluate(() => document.getElementById("case-studies").scrollIntoView({ behavior: "instant", block: "start" }));
  await page.waitForTimeout(300);
  const btn = page.locator(`button[aria-label^="${CLIENTS[key].title}:"]`).first();
  await btn.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center", inline: "center" }));
  await page.waitForTimeout(300);
  await btn.click({ timeout: 15000 });
  await page.locator('[role="tablist"]').first().waitFor({ state: "visible", timeout: 20000 });
  await page.waitForTimeout(500);
}

async function closeClient(page) {
  await page.keyboard.press("Escape");
  await page.locator('[role="tablist"]').first().waitFor({ state: "detached", timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);
}

/** The lazily loaded stylesheets (added after load) put into the reverse of their order. Calling it twice restores it. */
async function reverseLazySheets(page, initial) {
  // A moved <link> is loaded again: wait for every one to load, or a reading sees the page unstyled.
  return page.evaluate(async (initial) => {
    const lazy = [...document.querySelectorAll('link[rel="stylesheet"]')].filter((l) => !initial.includes(l.getAttribute("href")));
    const loaded = lazy.map((l) => new Promise((res) => {
      l.addEventListener("load", res, { once: true });
      l.addEventListener("error", res, { once: true });
      setTimeout(res, 4000);
    }));
    for (const l of lazy.reverse()) document.head.appendChild(l);
    await Promise.all(loaded);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    return lazy.map((l) => l.getAttribute("href").replace(/.*\//, ""));
  }, initial);
}

async function tab(page, name) {
  const t = page.getByRole("tab", { name, exact: true }).first();
  if ((await t.getAttribute("aria-selected")) !== "true") await t.click({ timeout: 15000 });
}

async function shot(page, name) {
  if (!SHOTS) return;
  fs.mkdirSync(SHOTS, { recursive: true });
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`) });
}

// ------------------------------------------------------------------------------------------ results
const results = new Map(); // rule -> { ok: [], bad: [] }
function record(rule, where, fn) {
  if (ONLY && !rule.toLowerCase().includes(ONLY)) return;
  if (!results.has(rule)) results.set(rule, { ok: [], bad: [] });
  const r = results.get(rule);
  try {
    r.ok.push(`${where}: ${fn()}`);
  } catch (e) {
    r.bad.push(`[${where}] ${String(e.message).split("\n")[0]}`);
  }
}
const failed = (where, e) => record("every run completes", where, () => {
  throw e;
});
const json = { strips: {}, plays: [] };
const name = (key) => (key === "hays" ? "Hays" : key === "duffer" ? "Duffer" : key);

// ------------------------------------------------------------------------------------------ the checks on one open window
/** The AI tab at rest, in the stylesheets' own order and then reversed (and put back). */
async function checkAi(page, where, key, initial) {
  await tab(page, "AI");
  await page.waitForTimeout(AI_REST_MS);
  for (const order of ["natural", "reversed"]) {
    if (order === "reversed") {
      await reverseLazySheets(page, initial);
      await page.waitForTimeout(400);
    }
    const g = await page.evaluate(readAi);
    record(`1a. the AI tab rests with the robot, wires and question apart (${name(key)})`, `${where} ${order} order`, () => ruleAiLayout(g));
    record(`1b. the AI answer rests on more than its headline (${name(key)})`, `${where} ${order} order`, () => ruleAiAnswer(g));
    await shot(page, `ai__${key}__${where.replace(/ /g, "__")}__${order}`);
  }
  await reverseLazySheets(page, initial);
}

/** The Impact tab at rest, in each theme; Duffer's QR story with it. */
async function checkImpact(page, where, key, { phone, W, H, sweep }) {
  await tab(page, "Impact");
  const mid = [];
  if (!sweep) {
    for (let i = 0; i < 8; i++) {
      mid.push(...(await page.evaluate(() => [...document.querySelectorAll('[role="tabpanel"][data-on] .im__old [data-strike]')].map((s) => getComputedStyle(s).backgroundSize))));
      await page.waitForTimeout(90);
    }
  }
  await page.waitForTimeout(key === "duffer" && !sweep ? QR_REST_MS : IMPACT_REST_MS);
  const label = `(${key})`;
  for (const t of sweep ? ["light"] : THEMES) {
    await theme(page, t);
    const at = `${where} ${t}`;
    const s = await page.evaluate(readImpact);
    await shot(page, `impact__${key}__${at.replace(/ /g, "__")}`);
    record(`2d. no text block ends on one word ${label}`, at, () => ruleOrphans(s));
    if (sweep) continue;
    record(`2a. the old way is struck through ${label}`, at, () => ruleStrike({ olds: s.olds, mid: t === "light" ? mid : null }));
    record(`2b. the old way stands apart from the new figure ${label}`, at, () => ruleApart(s));
    if ((key === "farmbooks" || key === "nwks") && (W >= 820 || (W <= PHONE_MAX_W && H >= 852))) record(`2c. the content uses the panel's height ${label}`, at, () => ruleFill(s));
    record(`2e. only figures are drawn at display size ${label}`, at, () => ruleFigures(s));
    record(`2f. a panel that scrolls shows a cue ${label}`, at, () => ruleCue(s));
    record(`2i. a scrolling panel's lines are whole or gone, none under the cue ${label}`, at, () => ruleCueClear({ overflow: s.overflow, height: s.height, cue: s.cueBox, lines: s.lines }));
    record(`2g. every word is at least 12 px ${label}`, at, () => ruleTextSize(s));
    record(`2h. every word meets contrast ${label}`, at, () => ruleContrast(s));
    if (s.sentence !== null) record(`4. the Impact sentence is one plain line ${label}`, at, () => ruleSentences([s.sentence]));
    if (key === "duffer") {
      const q = await page.evaluate(readQr);
      record("3a. the QR story draws the shop, the scan and the landed row", at, () => ruleQrParts(q));
      record("3b. the QR story fills the stage", at, () => ruleQrSize(q && { ...q, phone }));
      record("3c. no word of the QR story is cut", at, () => ruleQrWhole(q));
      record("3e. every word of the QR story is at least 12 px", at, () => ruleTextSize(q));
      record("3f. every word of the QR story meets contrast", at, () => ruleContrast(q));
    }
  }
  await theme(page, "light");
}

async function checkStrip(page, where, key, W) {
  json.strips[`${key} ${where}`] = await page.evaluate(readStrip);
  if (key !== "duffer") {
    const st = json.strips[`${key} ${where}`];
    record("5. the tab strip shows whole labels and cues (3-tab clients)", `${where} ${key}`, () => ruleStrip(st));
    if (W >= 393) record("5b. a 3-tab strip does not scroll at 393 and up", `${where} ${key}`, () => {
      assert.ok(!st.scroll, "it scrolls");
      return "fits";
    });
    return;
  }
  for (const n of ["Website", "Command Center", "MarCommand", "AI", "Impact"]) {
    await tab(page, n);
    await page.waitForTimeout(900);
    const st = await page.evaluate(readStrip);
    record("5. the tab strip shows whole labels and cues (Duffer)", `${where} on ${n}`, () => ruleStrip(st));
    if (n === "Impact") await shot(page, `strip__duffer__${where.replace(/ /g, "__")}`);
  }
}

/** One engine at one size: every client's window opened in turn on one page. */
async function sweepSize(browser, engine, vp, { sweep = false } = {}) {
  const [W, H] = vp.split("x").map(Number);
  const { ctx, page, phone } = await newPage(browser, engine, vp);
  try {
    const initial = await load(page);
    const keys = sweep ? ["farmbooks", "nwks", "hg", "duffer"] : ["duffer", "hays", "farmbooks", "nwks", "hg"];
    for (const key of keys) {
      const where = `${engine} ${vp}`;
      try {
        await openClient(page, key);
        if (!sweep && (key === "duffer" || key === "hays") && wants("1a", "1b", "ai")) await checkAi(page, where, key, initial);
        if (key !== "hays" && wants("2", "3", "4", "impact", "qr", "orphan")) await checkImpact(page, where, key, { phone, W, H, sweep });
        if (!sweep && wants("5", "strip")) await checkStrip(page, where, key, W);
      } catch (e) {
        failed(`${engine} ${vp} ${key}`, e);
      }
      await closeClient(page);
    }
  } finally {
    await ctx.close();
  }
}

/** Reduced motion: the QR story's first frame is already its final one. */
async function reducedQr(browser, engine, vp) {
  const { ctx, page } = await newPage(browser, engine, vp, { reduced: true });
  try {
    await load(page);
    await openClient(page, "duffer");
    await tab(page, "Impact");
    await page.waitForTimeout(250);
    const q = await page.evaluate(readQr);
    record("3d. under reduced motion the QR story's first frame is its final one", `${engine} ${vp}`, () => ruleQrParts(q));
    const s = await page.evaluate(readImpact);
    record("2a. the old way is struck through (reduced motion)", `${engine} ${vp}`, () => ruleStrike({ olds: s.olds, mid: null }));
    await shot(page, `qr__reduced__${engine}__${vp}`);
  } finally {
    await ctx.close();
  }
}

/** A fresh play of an AI tab, optionally under a CPU throttle and with a tab switch or a resize mid-play. */
async function aiPlay(browser, vp, key, { throttle = 0, mid = null } = {}) {
  const { ctx, page } = await newPage(browser, "chromium", vp);
  try {
    await load(page);
    await theme(page, "dark");
    await openClient(page, key);
    const cdp = await ctx.newCDPSession(page);
    if (throttle > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: throttle });
    await tab(page, "AI");
    if (mid === "switch") {
      await page.waitForTimeout(3500);
      await tab(page, "Website");
      await page.waitForTimeout(800);
      await tab(page, "AI");
    } else if (mid === "resize") {
      const [W, H] = vp.split("x").map(Number);
      await page.waitForTimeout(6500);
      await page.setViewportSize({ width: W, height: Math.round(H * 0.8) });
      await page.waitForTimeout(600);
      await page.setViewportSize({ width: W, height: H });
    }
    await page.waitForTimeout(AI_REST_MS + (throttle > 1 ? 4000 : 0));
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    const g = await page.evaluate(readAi);
    await shot(page, `play__${key}__${vp}__x${throttle}${mid ? `__${mid}` : ""}`);
    return g;
  } finally {
    await ctx.close();
  }
}

async function aiFold(browser, vp, key, reduced) {
  const { ctx, page } = await newPage(browser, "chromium", vp, { reduced });
  try {
    await load(page);
    await openClient(page, key);
    await page.evaluate(() => {
      window.__fold = [];
      const t0 = performance.now();
      const tick = () => {
        const fb = document.querySelector('[role="tabpanel"][data-on] .fb');
        if (fb) window.__fold.push([Math.round(performance.now() - t0), +fb.getBoundingClientRect().height.toFixed(1), fb.hasAttribute("data-folded")]);
        if (performance.now() - t0 < 11000) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await tab(page, "AI");
    await page.waitForTimeout(11500);
    const all = await page.evaluate(() => window.__fold);
    const at = reduced ? 0 : Math.max(0, all.findIndex((f) => f[2]));
    return all.slice(at).map((f) => [f[0], f[1]]);
  } finally {
    await ctx.close();
  }
}

// ------------------------------------------------------------------------------------------ main
function report(rule, fn) {
  if (ONLY && !rule.toLowerCase().includes(ONLY)) return;
  if (!results.has(rule)) results.set(rule, { ok: [], bad: [] });
  try {
    results.get(rule).ok.push(fn());
  } catch (e) {
    results.get(rule).bad.push(String(e.message).split("\n")[0]);
  }
}
const wants = (...words) => !ONLY || words.some((w) => ONLY.startsWith(w.toLowerCase()) || ONLY.includes(w.toLowerCase()) || w.toLowerCase().startsWith(ONLY));
report("guards: every rule can fail", fakeGuards);
report("z. no class gets two layouts from two stylesheets on one page", ruleStaticCss);

const engineSizes = (e) => SIZES ?? (e === "chromium" ? ALL_SIZES : OTHER_ENGINE_SIZES);
const browserRuns = !ONLY || !/^(guards|z\.)/.test(ONLY);
const t0 = Date.now();
for (const engine of browserRuns ? ENGINES : []) {
  const browser = await pw[engine].launch();
  try {
    {
      // A throwaway page: the first page of a run can time out on hydration under load.
      const { ctx, page } = await newPage(browser, engine, "1024x768");
      await page.goto(`${PROD_ORIGIN}/`, { waitUntil: "load", timeout: 90000 }).catch(() => {});
      await ctx.close();
    }
    for (const vp of MATRIX ? engineSizes(engine) : []) {
      await sweepSize(browser, engine, vp);
      if (wants("3d", "2a", "reduced") && (vp === "393x852" || vp === "1440x900")) {
        try {
          await reducedQr(browser, engine, vp);
        } catch (e) {
          failed(`${engine} ${vp} reduced`, e);
        }
      }
      console.log(`  [${engine} ${vp} done, ${((Date.now() - t0) / 1000).toFixed(0)} s]`);
    }
    if (engine !== "chromium") continue;
    if (wants("1c", "fold") && FOLD) {
      for (const key of ["hays", "duffer"]) {
        for (const reduced of [false, true]) {
          try {
            const f = await aiFold(browser, "393x852", key, reduced);
            record(`1c. the AI band folds as a transition${reduced ? " (reduced motion: no motion)" : ""}`, `chromium 393x852 ${key}`, () => ruleFold(f, reduced));
          } catch (e) {
            failed(`fold ${key}`, e);
          }
        }
      }
    }
    if (wants("1a", "load", "throttle") && LOAD) {
      for (const vp of (process.env.PS_TEST_LOAD_VP || "393x852,1024x768").split(",")) {
        for (const key of (process.env.PS_TEST_LOAD_KEYS || "hays,duffer").split(",")) {
          const plays = [...Array.from({ length: PLAYS }, () => ({ throttle: THROTTLE })), { throttle: THROTTLE, mid: "switch" }, { throttle: THROTTLE, mid: "resize" }];
          for (const r of plays) {
            let broken = null;
            try {
              const g = await aiPlay(browser, vp, key, r);
              ruleAiLayout(g);
              ruleAiAnswer(g);
            } catch (e) {
              broken = String(e.message).split("\n")[0];
            }
            json.plays.push({ vp, key, ...r, broken });
            console.log(`  [play ${key} ${vp} x${r.throttle}${r.mid ? ` ${r.mid}` : ""}: ${broken ?? "ok"}]`);
          }
        }
      }
      record("1a. under a CPU throttle, fresh plays end in a clean layout", `chromium x${THROTTLE}`, () => {
        const bad = json.plays.filter((p) => p.broken);
        assert.ok(bad.length === 0, `${bad.length} broken of ${json.plays.length}: ${bad.slice(0, 2).map((p) => `${p.key} ${p.vp}${p.mid ? ` ${p.mid}` : ""}: ${p.broken}`).join(" || ")}`);
        return `0 broken of ${json.plays.length}`;
      });
    }
    if (wants("2d", "orphan") && SWEEP) {
      for (const vp of ORPHAN_WIDTHS.filter((w) => !ALL_SIZES.includes(w))) await sweepSize(browser, "chromium", vp, { sweep: true });
      console.log(`  [orphan sweep done, ${((Date.now() - t0) / 1000).toFixed(0)} s]`);
    }
  } finally {
    await browser.close();
  }
}

// ------------------------------------------------------------------------------------------ report
let pass = 0;
let fail = 0;
for (const [name, r] of results) {
  if (r.bad.length) {
    fail++;
    console.log(`FAIL  ${name}\n        ${r.bad.slice(0, 4).join(" || ")}${r.bad.length > 4 ? ` (+${r.bad.length - 4} more)` : ""}  [${r.ok.length} ok]`);
  } else {
    pass++;
    console.log(`PASS  ${name}\n        ${r.ok.length > 1 ? `${r.ok.length} configs ok; e.g. ${r.ok[0]}` : r.ok[0]}`);
  }
}
if (process.env.PS_TEST_JSON) fs.writeFileSync(process.env.PS_TEST_JSON, JSON.stringify({ results: Object.fromEntries(results), ...json }, null, 1));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
