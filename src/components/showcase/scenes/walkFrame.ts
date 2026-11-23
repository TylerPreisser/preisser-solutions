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
  /** Close views: "centre" sits the units in the middle of a taller window (a short column with empty page above and
   *  below it); the default puts them near the top, with the page that follows under them. */
  place?: "centre";
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
  for (const b of boxes) if (b[0] >= x0 && b[0] + b[2] <= x1 && b[1] >= y0 && b[1] + b[3] <= y1) px.push((b[3] / LINE) * s);
  if (!px.length) return { med: Infinity, small: 0 };
  px.sort((a, b) => a - b);
  return { med: px[Math.floor(px.length / 2)], small: px.filter((p) => p < 9).length / px.length };
}

export function frameClose(W: number, H: number, sets: readonly (readonly Rect[])[], sw: number, sh: number, boxes: readonly Box[], o: CloseOpts): CloseFrame {
  let fallback: { score: number; f: CloseFrame } | null = null;
  for (let si = 0; si < sets.length; si++) {
    const set = sets[si];
    const ux0 = Math.min(...set.map((r) => r.x));
    const uy0 = Math.min(...set.map((r) => r.y));
    const ux1 = Math.max(...set.map((r) => r.x + r.w));
    const uy1 = Math.max(...set.map((r) => r.y + r.h));
    // How high the window may start (a unit's `above`), and how low it may end (its `grow`).
    const top = Math.max(0, ...set.map((r) => (r.above === undefined ? 0 : r.y - r.above)));
    const bottom = Math.min(H, ...set.map((r) => (r.grow === undefined ? H : r.y + r.h + r.grow)));
    const sTop = Math.min(o.maxScale, sw / (ux1 - ux0), sh / (uy1 - uy0));
    const sLow = Math.min(sTop, 0.5);
    const scales: number[] = [];
    for (let s = sTop; s >= sLow; s -= 0.01) scales.push(s);
    if (o.prefer === "wide") scales.reverse();
    for (const s of scales) {
      const eps = 0.4 / s;
      const vw = sw / s;
      if (vw > W + 0.01) continue;
      const vhMax = Math.min(sh / s, H);
      const xLo = Math.max(0, ux1 - vw);
      const xHi = Math.min(ux0, W - vw);
      if (xHi < xLo - 0.01) continue;
      const idealX = Math.min(xHi, Math.max(xLo, (ux0 + ux1) / 2 - vw / 2));
      let pick: { x0: number; y0: number; vh: number; score: number } | null = null;
      // Where the window's left edge may go: a 3 px grid, plus every position that puts either edge just clear of a
      // word (the gaps between words in a long line are narrower than any grid).
      const xs: number[] = [idealX];
      for (let x = xLo; x <= xHi + 0.01; x += 3) xs.push(x);
      for (const b of boxes) for (const x of [b[0] - 1, b[0] + b[2] + 1, b[0] - 1 - vw, b[0] + b[2] + 1 - vw]) if (x >= xLo - 0.01 && x <= xHi + 0.01) xs.push(x);
      xs.sort((a, b) => Math.abs(a - idealX) - Math.abs(b - idealX));
      for (let n = 0; n < xs.length; n++) {
        const x0 = xs[n];
        const bd0 = band(boxes, x0, x0 + vw, uy0, uy1, H, eps);
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
      // Nothing yet: remember the nearest miss. Only a camera pass (a view held for a moment while the pointer clicks)
      // should ever miss, and a pass is better full than sharp: the fuller stage first, then the bigger text.
      const score = Math.min(fill / o.minFill, 1) * 2 + (readable ? 1 : 0) + Math.min(t.med / o.readPx, 1) * 0.5 - si * 0.01;
      if (!fallback || score > fallback.score) fallback = { score, f };
    }
  }
  if (fallback) return fallback.f;
  const s = Math.min(sw / W, sh / H);
  return { s, x0: 0, y0: 0, cardW: W * s, cardH: H * s, cuts: 0, fill: (H * s) / sh, textPx: 0, set: 0, ok: false };
}

/** The bars a close view must meet on a stage (the probe checks 85% / 80% fill and an 11 px median; these keep a margin). */
export function closeOpts(phone: boolean, sw: number, sh: number): CloseOpts {
  return { minFill: sh > sw && !phone ? 0.82 : 0.86, readPx: 11.1, maxScale: 1.5, prefer: phone ? "tight" : "wide" };
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
const rk = (r: Rect) => `${r.x},${r.y},${r.w},${r.h}${r.grow === undefined ? "" : `+${r.grow}`}${r.above === undefined ? "" : `^${r.above}`}`;

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
