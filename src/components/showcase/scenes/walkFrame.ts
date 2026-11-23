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
