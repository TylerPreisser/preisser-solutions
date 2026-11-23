/**
 * What a walkthrough still is made of, beyond its word boxes: the text lines and stacked blocks the words form, the
 * cards drawn on the page, and which rows of the picture carry anything at all. The walkthrough probe judges each
 * resting view against these (rules j, k and l in tests/showcase-walkthroughs.probe.mjs). Everything is in still css px.
 *
 *   line   words on one baseline whose gaps are under LINE_GAP x their height (a sentence, a label with its value on
 *          one line; table columns sit further apart and stay separate).
 *   block  lines stacked with a gap under BLOCK_GAP x the smaller line's height and the same left edge (a wrapped
 *          sentence, a heading with the value or control under it). Form controls (solids) count as one-word lines.
 *   card   a white panel: a connected region of near-white pixels at least CARD_MIN_W x CARD_MIN_H, mostly filled,
 *          and not the page itself. Dividers split a card into its parts (a header strip, a list), each judged alone.
 *          Up to CARD_TOL px of a card may fall past an edge, and a sliver up to CARD_TOL px may show.
 *   ink    a pixel that is drawn content: dark (text, bars, icons) or strongly coloured (buttons, chips).
 */
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export const LINE_GAP = 0.8;
export const BLOCK_GAP = 0.6;
const BASE_TOL = 3;
const LEFT_TOL = 6;
const CARD_MIN_W = 60;
const CARD_MIN_H = 36;
const CARD_TOL = 16;
const WHITE = 251;
const INK_DARK = 190;
const INK_CHROMA = 60;
const INK_LIGHT = 235;
const INK_ROW = 0.04; // a row with ink across more than 4% of the view's width carries drawn content (an icon does; a sliver of a dark sidebar at the edge does not)

/** boxes: [x, y, w, h, text] -> lines [{ x0, y0, x1, y1, h, words: [box] }]. */
export function linesOf(boxes) {
  const ws = boxes.map(([x, y, w, h, t]) => ({ x0: x, y0: y, x1: x + w, y1: y + h, h, t })).sort((a, b) => a.y1 - b.y1 || a.x0 - b.x0);
  const rows = [];
  for (const w of ws) {
    let r = rows.find((g) => Math.abs(g.base - w.y1) <= BASE_TOL);
    if (!r) rows.push((r = { base: w.y1, words: [] }));
    r.words.push(w);
  }
  const lines = [];
  for (const r of rows) {
    r.words.sort((a, b) => a.x0 - b.x0);
    let cur = null;
    for (const w of r.words) {
      const h = Math.min(w.h, cur ? cur.h : w.h);
      const isCtl = (t) => t === "[form control]" || t === "[control]";
      const control = isCtl(w.t) || (cur && isCtl(cur.words[0].t));
      if (cur && !control && w.x0 - cur.x1 <= LINE_GAP * h && w.x0 >= cur.x0) {
        cur.words.push(w);
        cur.x1 = Math.max(cur.x1, w.x1);
        cur.y0 = Math.min(cur.y0, w.y0);
        cur.y1 = Math.max(cur.y1, w.y1);
        cur.h = Math.max(cur.h, w.h);
      } else {
        cur = { x0: w.x0, y0: w.y0, x1: w.x1, y1: w.y1, h: w.h, words: [w] };
        lines.push(cur);
      }
    }
  }
  return lines;
}

/** lines -> blocks [{ x0, y0, x1, y1, lines: [line] }] (only blocks of two or more lines are returned). */
export function blocksOf(lines) {
  const ls = [...lines].sort((a, b) => a.y0 - b.y0);
  const parent = ls.map((_, i) => i);
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (let i = 0; i < ls.length; i++) {
    for (let j = i + 1; j < ls.length; j++) {
      const a = ls[i];
      const b = ls[j];
      if (b.y0 - a.y1 > 40) break;
      const gap = b.y0 - a.y1;
      // Solids are tall (a select is ~40 px), so the gap is measured against the smaller of the two text heights.
      const h = Math.min(/control\]$/.test(a.words[0].t) ? b.h : a.h, /control\]$/.test(b.words[0].t) ? a.h : b.h);
      if (gap >= -2 && gap <= BLOCK_GAP * h && Math.abs(a.x0 - b.x0) <= LEFT_TOL) parent[find(j)] = find(i);
    }
  }
  const groups = new Map();
  ls.forEach((l, i) => {
    const k = find(i);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(l);
  });
  return [...groups.values()]
    .filter((g) => g.length > 1)
    .map((g) => ({ x0: Math.min(...g.map((l) => l.x0)), y0: Math.min(...g.map((l) => l.y0)), x1: Math.max(...g.map((l) => l.x1)), y1: Math.max(...g.map((l) => l.y1)), lines: g }));
}

/** The still's pixels at css scale: { W, H, data (RGB) }. */
export async function stillPixels(file, W, H) {
  const sharp = req("sharp");
  const data = await sharp(file).resize(W, H, { kernel: "nearest" }).removeAlpha().raw().toBuffer();
  return { W, H, data };
}

/** White panels on the page: [{ x0, y0, x1, y1 }]. */
export function cardsOf(px) {
  const { W, H, data } = px;
  const white = new Uint8Array(W * H);
  for (let i = 0, p = 0; i < W * H; i++, p += 3) white[i] = data[p] >= WHITE && data[p + 1] >= WHITE && data[p + 2] >= WHITE ? 1 : 0;
  const seen = new Uint8Array(W * H);
  const stack = new Int32Array(W * H);
  const cards = [];
  for (let s = 0; s < W * H; s++) {
    if (!white[s] || seen[s]) continue;
    let n = 0;
    let top = 0;
    stack[top++] = s;
    seen[s] = 1;
    let x0 = W, y0 = H, x1 = 0, y1 = 0;
    while (top) {
      const i = stack[--top];
      n++;
      const x = i % W;
      const y = (i - x) / W;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
      if (x > 0 && white[i - 1] && !seen[i - 1]) (seen[i - 1] = 1), (stack[top++] = i - 1);
      if (x < W - 1 && white[i + 1] && !seen[i + 1]) (seen[i + 1] = 1), (stack[top++] = i + 1);
      if (y > 0 && white[i - W] && !seen[i - W]) (seen[i - W] = 1), (stack[top++] = i - W);
      if (y < H - 1 && white[i + W] && !seen[i + W]) (seen[i + W] = 1), (stack[top++] = i + W);
    }
    const w = x1 - x0 + 1;
    const h = y1 - y0 + 1;
    if (w >= CARD_MIN_W && h >= CARD_MIN_H && n >= 0.5 * w * h && w * h <= 0.6 * W * H) cards.push({ x0, y0, x1: x1 + 1, y1: y1 + 1 });
  }
  return cards;
}

/** Per row of the still, how many pixels inside [xa, xb) are ink. */
export function inkRows(px, xa, xb) {
  const { W, H, data } = px;
  const a = Math.max(0, Math.floor(xa));
  const b = Math.min(W, Math.ceil(xb));
  const out = new Float32Array(H);
  for (let y = 0; y < H; y++) {
    let n = 0;
    for (let x = a, p = (y * W + a) * 3; x < b; x++, p += 3) {
      const r = data[p], g = data[p + 1], bl = data[p + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * bl;
      const chroma = Math.max(r, g, bl) - Math.min(r, g, bl);
      if (lum < INK_DARK || (chroma > INK_CHROMA && lum < INK_LIGHT)) n++;
    }
    out[y] = b > a ? n / (b - a) : 0;
  }
  return out;
}

/**
 * The tallest band of the window with no word and no drawn content, in still px. A row counts as content when a word
 * (or solid) crosses it or more than INK_ROW of its pixels are ink; a run of content rows 3 px or shorter with no word in it
 * is a hairline (a rule or a border) and does not break a band.
 */
export function tallestBlank(px, boxes, win) {
  const ya = Math.max(0, Math.floor(win.y));
  const yb = Math.min(px.H, Math.ceil(win.y + win.h));
  const ink = inkRows(px, win.x, win.x + win.w);
  const content = new Uint8Array(yb - ya);
  const worded = new Uint8Array(yb - ya);
  for (const [x, y, w, h] of boxes) {
    if (x + w <= win.x || x >= win.x + win.w) continue;
    for (let r = Math.max(ya, Math.floor(y)); r < Math.min(yb, Math.ceil(y + h)); r++) worded[r - ya] = 1;
  }
  for (let r = ya; r < yb; r++) content[r - ya] = worded[r - ya] || ink[r] > INK_ROW ? 1 : 0;
  // Hairlines: short wordless runs of content rows.
  for (let i = 0; i < content.length; ) {
    if (!content[i]) {
      i++;
      continue;
    }
    let j = i;
    let words = false;
    while (j < content.length && content[j]) words = words || worded[j] === 1, j++;
    if (j - i <= 3 && !words) for (let k = i; k < j; k++) content[k] = 0;
    i = j;
  }
  let best = { h: 0, y: ya };
  for (let i = 0; i < content.length; ) {
    if (content[i]) {
      i++;
      continue;
    }
    let j = i;
    while (j < content.length && !content[j]) j++;
    if (j - i > best.h) best = { h: j - i, y: ya + i };
    i = j;
  }
  return best;
}

// A band of the view taller than this share of its height with nothing in it fails. The lead asked for "about 15%"; 18%
// is where every view the independent critic judged right passes (bands up to 17%) and every view it judged wrong fails
// (23% to 76%).
export const BLANK_MAX = 0.18;

/**
 * Judge one view of a still. win: the still-px rect the stage shows. boxes: [x, y, w, h, text] (words and solids).
 * Returns the problems the three rules find:
 *   edges  (rule j) a text line with part of it inside the view and part outside; a card cut by the left or right edge
 *          that shows as a blank stub or has words off the stage; a horizontal bar (a row's measure) that runs off a
 *          side edge, its value off the stage.
 *   blank  (rule k) the tallest band of the view with no word and no drawn content, when over BLANK_MAX of the stage's
 *          height (stageH, in still px; the view is the whole stage unless its picture is a shorter card).
 *   pairs  (rule l) a block (a wrapped sentence, a heading with its value or control) split by the view's edge.
 */
export function judgeView({ px, cards, art = [], boxes, win, stageH = win.h, slack = 1 }) {
  const isIn = (b) => b.x0 >= win.x - slack && b.x1 <= win.x + win.w + slack && b.y0 >= win.y - slack && b.y1 <= win.y + win.h + slack;
  const isOut = (b) => b.x1 <= win.x + slack || b.x0 >= win.x + win.w - slack || b.y1 <= win.y + slack || b.y0 >= win.y + win.h - slack;
  const lines = linesOf(boxes);
  const edges = [];
  for (const l of lines) {
    if (l.words.length < 2 || isOut(l) || isIn(l)) continue;
    if (l.words.some(isIn)) edges.push(`the line "${l.words.map((w) => w.t).join(" ").slice(0, 60)}" is cut by the edge`);
  }
  // A card is cut when its left or right edge lies more than CARD_TOL px past the stage edge while more than CARD_TOL px
  // of it shows, and what shows is a blank stub (none of its words), or the card would fit across the view and some of
  // its words are off the stage. (A card wider than the view, a table row, may show its leading columns: rule i keeps
  // each row's first word. A card running past the bottom reads as the page going on; a card trimmed only in its empty
  // padding loses nothing.)
  const T = CARD_TOL;
  const words = boxes.map(([x, y, w, h, t]) => ({ x0: x, y0: y, x1: x + w, y1: y + h, t }));
  for (const c of cards) {
    const shownX = Math.min(c.x1, win.x + win.w) - Math.max(c.x0, win.x);
    const shownY = Math.min(c.y1, win.y + win.h) - Math.max(c.y0, win.y);
    if (shownX <= T || shownY <= T) continue;
    if (!(c.x0 < win.x - T || c.x1 > win.x + win.w + T)) continue;
    const own = words.filter((w) => w.x0 >= c.x0 - 1 && w.x1 <= c.x1 + 1 && w.y0 >= c.y0 - 1 && w.y1 <= c.y1 + 1 && w.y0 >= win.y - slack && w.y1 <= win.y + win.h + slack);
    const shown = own.filter(isIn);
    const at = `a ${Math.round(c.x1 - c.x0)}x${Math.round(c.y1 - c.y0)} card at ${Math.round(c.x0)},${Math.round(c.y0)}`;
    // A blank part whose words lie straight above or below it (in the view's columns) is the card going on past the top
    // or bottom; a blank part whose words are all off to the side is a stub.
    const above = words.some((w) => w.x0 >= c.x0 - 1 && w.x1 <= c.x1 + 1 && w.y0 >= c.y0 - 1 && w.y1 <= c.y1 + 1 && w.x0 < win.x + win.w && w.x1 > win.x);
    if (!shown.length && !above) edges.push(`${at} shows as a blank stub at the edge`);
    else if (shown.length < own.length && c.x1 - c.x0 <= win.w) edges.push(`${at} is cut by the edge ("${own.find((w) => !isIn(w)).t}" is off the stage)`);
  }
  // A horizontal bar (a row's measure: at least 40 px long, at most 20 px tall, 4 x longer than tall) cut by a side edge runs off the
  // stage with the value at its end: the row's label shows without its value.
  for (const [x, y, w, h] of art) {
    if (w < 40 || w < 4 * h || h > 20) continue;
    const b = { x0: x, y0: y, x1: x + w, y1: y + h };
    if (b.y1 <= win.y + slack || b.y0 >= win.y + win.h - slack) continue;
    const shown = Math.min(b.x1, win.x + win.w) - Math.max(b.x0, win.x);
    if (shown > CARD_TOL && (b.x0 < win.x - CARD_TOL || b.x1 > win.x + win.w + CARD_TOL)) edges.push(`a ${w}px bar at ${x},${y} runs off the edge (the value at its end is off the stage)`);
  }
  const pairs = [];
  for (const b of blocksOf(lines)) {
    const inn = b.lines.filter(isIn);
    if (inn.length && inn.length < b.lines.length) {
      const off = b.lines.find((l) => !isIn(l));
      pairs.push(`"${inn[0].words.map((w) => w.t).join(" ").slice(0, 40)}" shows without "${off.words.map((w) => w.t).join(" ").slice(0, 40)}"`);
    }
  }
  const band = tallestBlank(px, boxes, win);
  const share = band.h / stageH;
  const blank = share > BLANK_MAX ? `an empty band ${Math.round(share * 100)}% of the stage's height (still y ${band.y}-${band.y + band.h})` : null;
  return { edges, blank, pairs, bandShare: share };
}

/**
 * Drawn content that is not a word: connected regions of ink pixels (chart bars, icons, a logo, a badge's artwork)
 * outside every word box, at least 4 x 4 px (a 1-3 px rule is a hairline, not content). [x, y, w, h] each.
 */
export function artOf(px, boxes) {
  const { W, H, data } = px;
  const ink = new Uint8Array(W * H);
  for (let i = 0, p = 0; i < W * H; i++, p += 3) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    ink[i] = lum < INK_DARK || (Math.max(r, g, b) - Math.min(r, g, b) > INK_CHROMA && lum < INK_LIGHT) ? 1 : 0;
  }
  // Words (and 3 px around them) are text, judged as words.
  for (const [x, y, w, h] of boxes) {
    for (let yy = Math.max(0, Math.floor(y - 3)); yy < Math.min(H, Math.ceil(y + h + 3)); yy++) ink.fill(0, yy * W + Math.max(0, Math.floor(x - 3)), yy * W + Math.min(W, Math.ceil(x + w + 3)));
  }
  const seen = new Uint8Array(W * H);
  const stack = new Int32Array(W * H);
  const out = [];
  for (let s = 0; s < W * H; s++) {
    if (!ink[s] || seen[s]) continue;
    let top = 0;
    stack[top++] = s;
    seen[s] = 1;
    let x0 = W, y0 = H, x1 = 0, y1 = 0;
    while (top) {
      const i = stack[--top];
      const x = i % W;
      const y = (i - x) / W;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
      if (x > 0 && ink[i - 1] && !seen[i - 1]) (seen[i - 1] = 1), (stack[top++] = i - 1);
      if (x < W - 1 && ink[i + 1] && !seen[i + 1]) (seen[i + 1] = 1), (stack[top++] = i + 1);
      if (y > 0 && ink[i - W] && !seen[i - W]) (seen[i - W] = 1), (stack[top++] = i - W);
      if (y < H - 1 && ink[i + W] && !seen[i + W]) (seen[i + W] = 1), (stack[top++] = i + W);
    }
    if (x1 - x0 + 1 >= 4 && y1 - y0 + 1 >= 4) out.push([x0, y0, x1 - x0 + 1, y1 - y0 + 1]);
  }
  return out;
}
