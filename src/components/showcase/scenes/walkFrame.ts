/**
 * How a walkthrough frames one captured still inside its stage (StillsWalkthrough).
 *
 * A film names the part of a still that matters (`cam`, in the still's css px). This turns that and the
 * stage's size into a window onto the still (a scale and an offset) such that
 *   - the whole `cam` shows (never cropped), and
 *   - the window's edge passes through no word: every word box is whole inside the window or whole outside it
 *     (a still is a picture of a page, and half a word at the edge reads as a mistake).
 * The window is as tall as it can be, up to the stage: its side edges only have to avoid the words in the rows it
 * shows, so it grows over rows that stay clear of them and stops above the first row that would be cut. A window
 * shorter than the stage is a card; the scene fills the rest of the stage with a soft blur of the same picture.
 *
 * Word boxes come from the still's `<still>.words.json` (`boxes`: [x, y, w, h, word] per drawn word, from the
 * capture). The scale starts at "cam fits exactly" and may zoom out a little (to MIN_ZOOM_OUT of that) to find a
 * clean window. Pure functions: no DOM, so a node script can run it.
 */
export type Box = readonly [number, number, number, number, string?];
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Most css px the window may show below the cam (default: as far as the stage and the clean rows allow; it always grows
   *  upward freely). A step whose picture has tiny print under the part that matters (a badge sheet) stops short of it. */
  grow?: number;
  /** Close views: most css px the window may show above this unit (so it stops under a line it would only catch part of). */
  above?: number;
  /** Close views: most css px the window may show left of this unit (a tablet's wide window stops at a column gap). */
  left?: number;
  /** Close views: "centre" sits the units in the middle of a taller window (a short column with empty page above and
   *  below it); the default puts them near the top, with the page that follows under them. */
  place?: "centre";
  /** Close views: this set frames a camera pass (held well under a second while the pointer clicks): it takes the
   *  fullest window that keeps every word and line whole, without the card and empty-band checks a resting view meets. */
  pass?: true;
}
export interface Frame {
  /** Screen px per still css px. */
  s: number;
  /** The still css px at the card's top-left. */
  x0: number;
  y0: number;
  /** The card, screen px: as large as the stage allows (the whole stage unless the window had to stop short). */
  cardW: number;
  cardH: number;
  /** Words the window's edge would cut (0 when a clean window was found). */
  cuts: number;
}

/** How far below "cam fits exactly" the scale may go to dodge a cut word. */
export const MIN_ZOOM_OUT = 0.86;
const STEPS = [1, 0.98, 0.96, 0.94, 0.92, 0.9, 0.88, MIN_ZOOM_OUT];

/** Words cut by an edge: a vertical line at x through rows [y0, y1], or a horizontal line at y through columns [x0, x1]. */
function cutsAtX(boxes: readonly Box[], x: number, y0: number, y1: number, eps: number) {
  let n = 0;
  for (const b of boxes) if (b[1] < y1 && b[1] + b[3] > y0 && b[0] < x - eps && b[0] + b[2] > x + eps) n++;
  return n;
}
function cutsAtY(boxes: readonly Box[], y: number, x0: number, x1: number, eps: number) {
  let n = 0;
  for (const b of boxes) if (b[0] < x1 && b[0] + b[2] > x0 && b[1] < y - eps && b[1] + b[3] > y + eps) n++;
  return n;
}

/**
 * Rows a window x0..x1 may show: the widest band [lo, hi] around [need0, need1] in which no word is crossed by
 * the window's left or right edge. null when a word crossing an edge sits inside [need0, need1].
 */
function band(boxes: readonly Box[], x0: number, x1: number, need0: number, need1: number, H: number, eps: number) {
  let lo = 0;
  let hi = H;
  for (const b of boxes) {
    const crosses = (b[0] < x0 - eps && b[0] + b[2] > x0 + eps) || (b[0] < x1 - eps && b[0] + b[2] > x1 + eps);
    if (!crosses) continue;
    const top = b[1];
    const bottom = b[1] + b[3];
    if (bottom > need0 && top < need1) return null;
    if (bottom <= need0) lo = Math.max(lo, bottom);
    else hi = Math.min(hi, top);
  }
  return { lo, hi };
}

/** Marks a box that stands for a whole text line or block (see withLines): framed around, never counted as a word. */
export const SPAN = "\u00b6";
/** Tags for a still's white panels and its drawn non-word content (`cards`, `art` in its .words.json). */
export const CARD = "\u25a1";
export const ART = "\u25a0";
const CONTROL = "[control]";
const CARD_TOL = 16;
const BLANK_MAX = 0.17;

/**
 * Whether a close view's window leaves a card's blank stub at its side edge or cuts a card that would fit across it (some
 * of the card's words off), or holds a band over BLANK_MAX of the stage's height with no word and no drawn content. The probe's
 * rules j and k (tests/support/walk-layout.mjs) judge the same things from the still's pixels (the probe allows 18%).
 */
function cleanWindow(words: readonly Box[], cards: readonly Box[], art: readonly Box[], x0: number, y0: number, vw: number, vh: number, stageH: number) {
  // (stageH: the stage's height in still px; an empty band is measured against the stage, as the visitor sees it.)
  const band = BLANK_MAX * stageH;
  const x1 = x0 + vw;
  const y1 = y0 + vh;
  for (const c of cards) {
    const cx1 = c[0] + c[2];
    const cy1 = c[1] + c[3];
    if (Math.min(cx1, x1) - Math.max(c[0], x0) <= CARD_TOL || Math.min(cy1, y1) - Math.max(c[1], y0) <= CARD_TOL) continue;
    if (!(c[0] < x0 - CARD_TOL || cx1 > x1 + CARD_TOL)) continue;
    let own = 0;
    let shown = 0;
    let column = false; // some of the card's words lie in the window's columns (above or below it, or in it)
    for (const w of words) {
      if (w[0] < c[0] - 1 || w[0] + w[2] > cx1 + 1 || w[1] < c[1] - 1 || w[1] + w[3] > cy1 + 1) continue;
      if (w[0] < x1 && w[0] + w[2] > x0) column = true;
      if (w[1] < y0 - 0.5 || w[1] + w[3] > y1 + 0.5) continue;
      own++;
      if (w[0] >= x0 - 0.5 && w[0] + w[2] <= x1 + 0.5) shown++;
    }
    if ((shown === 0 && !column) || (shown > 0 && shown < own && c[2] <= vw)) return false;
  }
  // Rows that carry something: every word or drawn region the window's columns cross.
  const spans: [number, number][] = [];
  // (A drawn region counts where more than 4% of the window's width of it shows, as the probe counts ink pixels.)
  for (const b of words) if (b[0] < x1 && b[0] + b[2] > x0 && b[1] < y1 && b[1] + b[3] > y0) spans.push([Math.max(y0, b[1]), Math.min(y1, b[1] + b[3])]);
  for (const b of art) if (Math.min(b[0] + b[2], x1) - Math.max(b[0], x0) > 0.04 * vw && b[1] < y1 && b[1] + b[3] > y0) spans.push([Math.max(y0, b[1]), Math.min(y1, b[1] + b[3])]);
  spans.sort((a, b) => a[0] - b[0]);
  let reach = y0;
  for (const [a, b] of spans) {
    if (a - reach > band) return false;
    reach = Math.max(reach, b);
  }
  return y1 - reach <= band;
}

/**
 * The word boxes plus one box per text line and per stacked block, so a close view's edge never splits a sentence or a
 * heading from its value. A line: words on one baseline (within 3 px) whose gaps are under 0.8 x their height (table
 * columns sit further apart). A block: lines stacked with a gap under 0.6 x the smaller text height and the same left
 * edge (within 6 px): a wrapped sentence, a label over its value or control. Form controls (`CONTROL`) are lines of
 * their own. The probe (tests/support/walk-layout.mjs) judges views by the same definitions.
 */
export function withLines(boxes: readonly Box[]): Box[] {
  type L = { x0: number; y0: number; x1: number; y1: number; h: number; n: number; control: boolean };
  const ws = boxes.filter((b) => b[4] !== CARD && b[4] !== ART).map((b) => ({ x0: b[0], y0: b[1], x1: b[0] + b[2], y1: b[1] + b[3], h: b[3], control: b[4] === CONTROL })).sort((a, b) => a.y1 - b.y1 || a.x0 - b.x0);
  const rows: { base: number; words: typeof ws }[] = [];
  for (const w of ws) {
    let r = rows.find((g) => Math.abs(g.base - w.y1) <= 3);
    if (!r) rows.push((r = { base: w.y1, words: [] }));
    r.words.push(w);
  }
  const lines: L[] = [];
  for (const r of rows) {
    r.words.sort((a, b) => a.x0 - b.x0);
    let cur: L | null = null;
    for (const w of r.words) {
      if (cur && !w.control && !cur.control && w.x0 - cur.x1 <= 0.8 * Math.min(w.h, cur.h) && w.x0 >= cur.x0) {
        cur.x1 = Math.max(cur.x1, w.x1);
        cur.y0 = Math.min(cur.y0, w.y0);
        cur.y1 = Math.max(cur.y1, w.y1);
        cur.h = Math.max(cur.h, w.h);
        cur.n++;
      } else {
        cur = { ...w, n: 1 };
        lines.push(cur);
      }
    }
  }
  const out: Box[] = [...boxes];
  for (const l of lines) if (l.n > 1) out.push([l.x0, l.y0, l.x1 - l.x0, l.y1 - l.y0, SPAN]);
  const ls = [...lines].sort((a, b) => a.y0 - b.y0);
  const parent = ls.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (let i = 0; i < ls.length; i++) {
    for (let j = i + 1; j < ls.length; j++) {
      const a = ls[i];
      const b = ls[j];
      if (b.y0 - a.y1 > 40) break;
      const h = Math.min(a.control ? b.h : a.h, b.control ? a.h : b.h);
      const gap = b.y0 - a.y1;
      if (gap >= -2 && gap <= 0.6 * h && Math.abs(a.x0 - b.x0) <= 6) parent[find(j)] = find(i);
    }
  }
  const groups = new Map<number, L[]>();
  ls.forEach((l, i) => {
    const k = find(i);
    groups.set(k, [...(groups.get(k) ?? []), l]);
  });
  for (const g of groups.values()) {
    if (g.length < 2) continue;
    const x0 = Math.min(...g.map((l) => l.x0));
    const y0 = Math.min(...g.map((l) => l.y0));
    out.push([x0, y0, Math.max(...g.map((l) => l.x1)) - x0, Math.max(...g.map((l) => l.y1)) - y0, SPAN]);
  }
  return out;
}

/** The framing of a still (W x H css px) in a stage (sw x sh px) so `cam` shows whole. */
export function frameView(W: number, H: number, cam: Rect | null, sw: number, sh: number, boxes: readonly Box[]): Frame {
  const target = cam ?? { x: 0, y: 0, w: W, h: H };
  const fit = Math.min(sw / target.w, sh / target.h);
  let best: Frame | null = null;
  let leastCuts = Infinity;
  let clean: { rank: number; frame: Frame } | null = null;
  for (const k of STEPS) {
    const s = fit * k;
    const eps = 0.4 / s;
    const vw = Math.min(sw / s, W);
    const vhMax = Math.min(sh / s, H);
    const below = target.y + target.h + (target.grow ?? Infinity);
    // Window left edge: it must hold the whole cam, so x0 in [cam.right - vw, cam.x] (and inside the still).
    const xLo = Math.max(0, target.x + target.w - vw);
    const xHi = Math.min(target.x, W - vw);
    if (xHi < xLo - 0.01) continue;
    const idealX = Math.min(xHi, Math.max(xLo, target.x + target.w / 2 - vw / 2));
    let pick: { x0: number; y0: number; vh: number } | null = null;
    let pickScore = -Infinity;
    const reach = Math.ceil(Math.max(idealX - xLo, xHi - idealX));
    for (let d = 0; d <= reach; d++) {
      for (const x0 of d === 0 ? [idealX] : [idealX - d, idealX + d]) {
        if (x0 < xLo - 0.01 || x0 > xHi + 0.01) continue;
        const bd = band(boxes, x0, x0 + vw, target.y, target.y + target.h, H, eps);
        if (!bd) continue;
        // Tallest window in the band that holds the cam and has clean top and bottom edges.
        for (let vh = Math.min(vhMax, bd.hi - bd.lo); vh >= Math.min(vhMax, target.h); vh -= 2) {
          const yLo = Math.max(bd.lo, target.y + target.h - vh);
          const yHi = Math.min(target.y, bd.hi - vh, below - vh);
          if (yHi < yLo - 0.01) continue;
          // Page content flows downward: sit the window just above the cam (a little air over its first row), not centred on it.
          const ideal = Math.min(yHi, Math.max(yLo, target.y - 24));
          let y0 = NaN;
          for (let e = 0; e <= Math.ceil(yHi - yLo); e++) {
            const ys = e === 0 ? [ideal] : [ideal - e, ideal + e];
            const hit = ys.find((y) => y >= yLo - 0.01 && y <= yHi + 0.01 && cutsAtY(boxes, y, x0, x0 + vw, eps) + cutsAtY(boxes, y + vh, x0, x0 + vw, eps) === 0);
            if (hit !== undefined) {
              y0 = hit;
              break;
            }
          }
          if (Number.isNaN(y0)) continue;
          // Taller is better; among equals, the window closest to centred on the cam.
          const score = vh * 1000 - Math.abs(x0 - idealX) - Math.abs(y0 - ideal) * 0.5;
          if (score > pickScore) {
            pickScore = score;
            pick = { x0, y0, vh };
          }
          break; // the tallest clean height for this x0
        }
      }
    }
    if (pick) {
      // A clean window at this scale. Take it unless a smaller scale gives a clearly fuller stage: the card should
      // fill most of the stage (the rest is blur), and a little zoom-out is the price of a taller clean window.
      const fill = Math.min(1, (pick.vh * s) / sh);
      const rank = Math.min(fill, 0.8) * 100 + k * 12;
      if (!clean || rank > clean.rank) clean = { rank, frame: { s, x0: pick.x0, y0: pick.y0, cardW: vw * s, cardH: pick.vh * s, cuts: 0 } };
      continue;
    }
    // No clean window at this scale: remember the least bad (the centred window, cam rows only) in case none is found.
    const x0 = idealX;
    const y0 = Math.min(Math.max(0, target.y + target.h / 2 - vhMax / 2), H - vhMax);
    const cuts = cutsAtX(boxes, x0, y0, y0 + vhMax, eps) + cutsAtX(boxes, x0 + vw, y0, y0 + vhMax, eps);
    if (cuts < leastCuts) {
      leastCuts = cuts;
      best = { s, x0, y0, cardW: vw * s, cardH: vhMax * s, cuts };
    }
  }
  if (clean) return clean.frame;
  if (!best) {
    const s = Math.min(sw / W, sh / H);
    return { s, x0: 0, y0: 0, cardW: W * s, cardH: H * s, cuts: 0 };
  }
  return best;
}

/**
 * A close view: what a narrow, tall or small stage shows instead of the desk framing (phones, portrait tablets, and
 * any stage on which the desk framing would put text under 10 px). A film names, per step, the WHOLE unit(s) of
 * meaning a stranger must see (a card, a list with its name column, a label with its value); this finds the window
 * onto the still that
 *   - holds every unit whole, and every word the stage edge meets is whole inside or whole outside (as frameView),
 *   - reads: the median word at least `readPx` screen px and no more than 15% of words under 9 px,
 *   - fills the stage: the whole width, and at least `minFill` of its height, with the still itself (no strip in blur),
 * at the largest scale that does all three (the tightest window around the units). `sets` are alternatives in order
 * of preference: a smaller stage that cannot show the first unit whole at a readable size falls back to the next.
 * When nothing meets every bar the window that comes closest is returned with `ok: false` (the probe then fails).
 */
export interface CloseFrame extends Frame {
  /** Share of the stage's height the window fills (0-1). */
  fill: number;
  /** Median effective text size in the window, screen px. */
  textPx: number;
  /** Which of `sets` was used. */
  set: number;
  ok: boolean;
}
export interface CloseOpts {
  minFill: number;
  readPx: number;
  /** Most screen px per still css px (the stills are 2x captures; past ~1.5 they soften on a 3x phone). */
  maxScale: number;
  /** "tight": the largest scale that meets every bar (a phone: the units fill the width, the text as big as it gets).
   *  "wide": the smallest (a tablet: the biggest window that still reads, so the units come with their page). */
  prefer: "tight" | "wide";
}
const LINE = 1.2;

function textStats(boxes: readonly Box[], x0: number, y0: number, x1: number, y1: number, s: number) {
  const px: number[] = [];
  for (const b of boxes) if (b[4] !== SPAN && b[4] !== CONTROL && b[0] >= x0 && b[0] + b[2] <= x1 && b[1] >= y0 && b[1] + b[3] <= y1) px.push((b[3] / LINE) * s);
  if (!px.length) return { med: Infinity, small: 0 };
  px.sort((a, b) => a - b);
  return { med: px[Math.floor(px.length / 2)], small: px.filter((p) => p < 9).length / px.length };
}

export function frameClose(W: number, H: number, sets: readonly (readonly Rect[])[], sw: number, sh: number, all: readonly Box[], o: CloseOpts): CloseFrame {
  let fallback: { score: number; f: CloseFrame } | null = null;
  const boxes = all.filter((b) => b[4] !== CARD && b[4] !== ART);
  const cards = all.filter((b) => b[4] === CARD);
  const art = all.filter((b) => b[4] === ART);
  const words = boxes.filter((b) => b[4] !== SPAN);
  // When no window passes the clean check, the fullest one that only keeps every word and line whole.
  let dirty: { x0: number; y0: number; vh: number; s: number; vw: number } | null = null;
  // Two passes: the first looks only for windows that meet every bar (fast: a window that fails the clean check is not
  // shrunk below the fill bar); only when none exists does the second look for the best clean window under the bars.
  for (const shrink of [false, true]) {
  for (let si = 0; si < sets.length; si++) {
    const set = sets[si];
    const ux0 = Math.min(...set.map((r) => r.x));
    const uy0 = Math.min(...set.map((r) => r.y));
    const ux1 = Math.max(...set.map((r) => r.x + r.w));
    const uy1 = Math.max(...set.map((r) => r.y + r.h));
    // How high the window may start (a unit's `above`), and how low it may end (its `grow`).
    const top = Math.max(0, ...set.map((r) => (r.above === undefined ? 0 : r.y - r.above)));
    const bottom = Math.min(H, ...set.map((r) => (r.grow === undefined ? H : r.y + r.h + r.grow)));
    const leftmost = Math.max(0, ...set.map((r) => (r.left === undefined ? 0 : r.x - r.left)));
    const isPass = set.some((r) => r.pass);
    const sTop = Math.min(o.maxScale, sw / (ux1 - ux0), sh / (uy1 - uy0));
    const sLow = Math.min(sTop, 0.5);
    const scales: number[] = [];
    // (Scales 0.02 apart: finer steps change a window by under 1.5%, and every step costs a full column search.)
    for (let s = sTop; s >= sLow; s -= 0.02) scales.push(s);
    if (o.prefer === "wide") scales.reverse();
    // A resting view's text must read: a scale at which the units' own median word would fall clearly under the bar is
    // not searched (it would only produce a nearest miss, and the search runs in the visitor's browser).
    const unitWords: number[] = [];
    for (const b of words) if (b[4] !== CONTROL && b[0] >= ux0 - 1 && b[0] + b[2] <= ux1 + 1 && b[1] >= uy0 - 1 && b[1] + b[3] <= uy1 + 1) unitWords.push(b[3] / LINE);
    unitWords.sort((a, b) => a - b);
    const unitMed = unitWords.length ? unitWords[Math.floor(unitWords.length / 2)] : 0;
    for (const s of scales) {
      if (!isPass && unitMed && unitMed * s < o.readPx * 0.92) continue;
      const eps = 0.4 / s;
      const vw = sw / s;
      if (vw > W + 0.01) continue;
      const vhMax = Math.min(sh / s, H);
      const xLo = Math.max(leftmost, ux1 - vw);
      const xHi = Math.min(ux0, W - vw);
      if (xHi < xLo - 0.01) continue;
      const idealX = Math.min(xHi, Math.max(xLo, (ux0 + ux1) / 2 - vw / 2));
      // A card that fits across the window may not be cut by its side edges (beyond CARD_TOL of padding): for the
      // column search it is one more box the edges must clear.
      const sides = [...boxes, ...cards.filter((c) => c[2] <= vw && c[2] > 2 * CARD_TOL).map((c) => [c[0] + CARD_TOL, c[1], c[2] - 2 * CARD_TOL, c[3]] as Box)];
      let pick: { x0: number; y0: number; vh: number; score: number } | null = null;
      // Where the window's left edge may go: a 3 px grid, plus every position that puts either edge just clear of a
      // word (the gaps between words in a long line are narrower than any grid).
      const xs: number[] = [idealX];
      for (let x = xLo; x <= xHi + 0.01; x += 6) xs.push(x);
      for (const b of [...boxes, ...cards]) for (const x of [b[0] - 1, b[0] + b[2] + 1, b[0] - 1 - vw, b[0] + b[2] + 1 - vw]) if (x >= xLo - 0.01 && x <= xHi + 0.01) xs.push(x);
      // (Half-pixel duplicates come from neighbouring words; one of each is enough.)
      const seenX = new Set<number>();
      const xsU = xs.filter((x) => {
        const k = Math.round(x * 2);
        if (seenX.has(k)) return false;
        seenX.add(k);
        return true;
      });
      xs.length = 0;
      xs.push(...xsU);
      xs.sort((a, b) => Math.abs(a - idealX) - Math.abs(b - idealX));
      // The 80 positions nearest the units' centre: a window further off is not the one a visitor should see, and the
      // search runs in the visitor's browser.
      if (xs.length > 80) xs.length = 80;
      for (let n = 0; n < xs.length; n++) {
        const x0 = xs[n];
        const bd0 = band(sides, x0, x0 + vw, uy0, uy1, H, eps);
        if (!bd0) continue;
        const bd = { lo: Math.max(bd0.lo, top), hi: Math.min(bd0.hi, bottom) };
        const avail = Math.min(vhMax, bd.hi - bd.lo);
        if (avail < uy1 - uy0 - 0.01) continue;
        // A window that could not beat the one in hand is not worth placing.
        if (pick && avail < pick.vh) continue;
        for (let vh = avail; vh >= uy1 - uy0 - 0.01 && (!pick || vh >= pick.vh); vh -= 2) {
          const yLo = Math.max(bd.lo, uy1 - vh);
          const yHi = Math.min(uy0, bd.hi - vh);
          if (yHi < yLo - 0.01) continue;
          // Page content flows downward: the units near the top with a little air, the rest of the page under them.
          const want = set.some((r) => r.place === "centre") ? (uy0 + uy1) / 2 - vh / 2 : uy0 - 24;
          const ideal = Math.min(yHi, Math.max(yLo, want));
          let y0 = NaN;
          for (let e = 0; e <= Math.ceil(yHi - yLo); e++) {
            const ys = e === 0 ? [ideal] : [ideal - e, ideal + e];
            const hit = ys.find((y) => y >= yLo - 0.01 && y <= yHi + 0.01 && cutsAtY(boxes, y, x0, x0 + vw, eps) + cutsAtY(boxes, y + vh, x0, x0 + vw, eps) === 0);
            if (hit !== undefined) {
              y0 = hit;
              break;
            }
          }
          if (Number.isNaN(y0)) continue;
          // The full check (cards' stubs, empty bands). A window that fails it is not taken; a shorter one may pass (less
          // empty page), down to the fill bar.
          if (!isPass && !cleanWindow(words, cards, art, x0, y0, vw, vh, sh / s)) {
            if (!dirty || vh > dirty.vh) dirty = { x0, y0, vh, s, vw };
            // Shorter windows carry less empty page; below the fill bar they only serve as the nearest miss.
            if (vh * s < o.minFill * sh) {
              if (!shrink) break;
              vh -= 14;
            }
            continue;
          }
          const score = vh * 1000 - Math.abs(x0 - idealX) - Math.abs(y0 - ideal) * 0.5;
          if (!pick || score > pick.score) pick = { x0, y0, vh, score };
          break;
        }
        // A window that already fills the stage, found this close to centred, will not be beaten by one further off.
        if (pick && pick.vh >= vhMax - 0.01) break;
      }
      if (!pick) continue;
      const fill = Math.min(1, (pick.vh * s) / sh);
      const t = textStats(boxes, pick.x0, pick.y0, pick.x0 + vw, pick.y0 + pick.vh, s);
      const f: CloseFrame = { s, x0: pick.x0, y0: pick.y0, cardW: vw * s, cardH: pick.vh * s, cuts: 0, fill, textPx: t.med, set: si, ok: false };
      const readable = t.med >= o.readPx && t.small <= 0.15;
      if (fill >= o.minFill && readable) return { ...f, ok: true };
      // Nothing yet: remember the nearest miss. A camera pass (a view held for a moment while the pointer clicks) is
      // better full than sharp; a resting view whose unit cannot fill the stage cleanly is better readable than full
      // (the whole unit as a card, the rest of the stage the picture's soft blur).
      const score = isPass ? Math.min(fill / o.minFill, 1) * 2 + (readable ? 1 : 0) + Math.min(t.med / o.readPx, 1) * 0.5 - si * 0.01 : Math.min(fill / o.minFill, 1) * 2 + (readable ? 1.5 : 0) + Math.min(t.med / o.readPx, 1) - si * 0.1;
      if (!fallback || score > fallback.score) fallback = { score, f };
    }
  }
  }
  if (fallback) return fallback.f;
  if (dirty) {
    const t = textStats(boxes, dirty.x0, dirty.y0, dirty.x0 + dirty.vw, dirty.y0 + dirty.vh, dirty.s);
    return { s: dirty.s, x0: dirty.x0, y0: dirty.y0, cardW: dirty.vw * dirty.s, cardH: dirty.vh * dirty.s, cuts: 0, fill: Math.min(1, (dirty.vh * dirty.s) / sh), textPx: t.med, set: 0, ok: false };
  }
  const s = Math.min(sw / W, sh / H);
  return { s, x0: 0, y0: 0, cardW: W * s, cardH: H * s, cuts: 0, fill: (H * s) / sh, textPx: 0, set: 0, ok: false };
}

/** The bars a close view must meet on a stage (the probe checks 85% / 80% fill and an 11 px median; these keep a margin). */
export function closeOpts(phone: boolean, sw: number, sh: number): CloseOpts {
  // A phone draws a 2x still on a 3x screen, so past 1.5x it softens; tablets and laptops (1x-2x screens) can go to 1.8x.
  return { minFill: sh > sw && !phone ? 0.82 : 0.86, readPx: 11.1, maxScale: phone ? 1.5 : 1.8, prefer: phone ? "tight" : "wide" };
}

/** When a stage gets close views: a phone, a portrait stage, or one on which the desk framing (a ~1180 x 620 css px
 *  part of a 1440 x 900 screen) would draw the screen's text under 10 px. */
export function wantsClose(phone: boolean, sw: number, sh: number) {
  return phone || sh > sw || Math.min(sw / 1180, sh / 620) < 0.8;
}

type Pt = { x: number; y: number; click?: boolean };
export interface PlanCue {
  still: number;
  cam?: Rect;
  /** Close view: the whole unit(s) this step must show; a list of lists is alternatives in order of preference. */
  close?: readonly Rect[] | readonly (readonly Rect[])[];
  cursor?: Pt;
  /** The pointer in a close view, when it should point somewhere other than on the desk; a list gives one per unit
   *  alternative (the last one serves any further alternatives). */
  closeCursor?: Pt | readonly Pt[];
}
export interface PlanView {
  still: number;
  /** Desk: the cam. */
  cam: Rect | null;
  /** Close: the declared unit sets (what the probe checks), and the same with every pointer position the view shows. */
  sets: Rect[][] | null;
  framed: Rect[][] | null;
}
const isNested = (u: PlanCue["close"]): u is readonly (readonly Rect[])[] => Array.isArray(u) && Array.isArray(u[0]);
const rk = (r: Rect) => `${r.x},${r.y},${r.w},${r.h}${r.grow === undefined ? "" : `+${r.grow}`}${r.above === undefined ? "" : `^${r.above}`}${r.left === undefined ? "" : `<${r.left}`}`;

/** The pointer in force at cue i (it stays where it was until a cue moves it); `set` is the close view's alternative. */
export function pointerAt(cues: readonly PlanCue[], i: number, close: boolean, set = 0): Pt | null {
  for (let k = i; k >= 0; k--) {
    const cc = close ? cues[k].closeCursor : undefined;
    const c = cc ? (isPtList(cc) ? cc[Math.min(set, cc.length - 1)] : cc) : cues[k].cursor;
    if (c) return c;
  }
  return null;
}
const isPtList = (c: Pt | readonly Pt[]): c is readonly Pt[] => Array.isArray(c);

/** Each cue's view (a still under one framing) and the views themselves, keyed. */
export function viewPlan(cues: readonly PlanCue[], close: boolean) {
  const keys: string[] = [];
  const views = new Map<string, PlanView>();
  cues.forEach((c, i) => {
    let cam: Rect | null = null;
    let sets: Rect[][] | null = null;
    for (let k = i; k >= 0 && cues[k].still === c.still; k--) {
      if (close && cues[k].close) {
        const u = cues[k].close!;
        sets = isNested(u) ? u.map((s) => [...s]) : [[...(u as readonly Rect[])]];
        break;
      }
      if (!close && cues[k].cam) {
        cam = cues[k].cam!;
        break;
      }
    }
    if (close && !sets) {
      const camHere = (() => {
        for (let k = i; k >= 0 && cues[k].still === c.still; k--) if (cues[k].cam) return cues[k].cam!;
        return null;
      })();
      sets = camHere ? [[camHere]] : null;
    }
    const key = `${c.still}:${close ? (sets ? sets.map((s) => s.map(rk).join(";")).join("|") : "-") : cam ? rk(cam) : "-"}`;
    keys.push(key);
    if (!views.has(key)) views.set(key, { still: c.still, cam, sets, framed: sets ? sets.map((s) => [...s]) : null });
    // Every pointer position this view shows must be inside its window.
    const v = views.get(key)!;
    v.framed?.forEach((s, j) => {
      const p = pointerAt(cues, i, close, j);
      if (p) s.push({ x: p.x - 4, y: p.y - 4, w: 26, h: 30 });
    });
  });
  return { keys, views };
}
