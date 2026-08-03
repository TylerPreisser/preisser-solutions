/**
 * hero-mark-light.ts — the hero background.
 *
 * WHAT IT IS
 * Light falling across a structure. Three enormous, very-low-contrast planes
 * recede into depth, and one soft blue source drifts along the frontmost fold,
 * catching the edges as it passes. No data imagery. No metaphor. It is the
 * visual equivalent of a well-built thing: calm, deliberate, quiet.
 *
 * WHY THE PLANES ARE THE SHAPES THEY ARE
 * Every edge in the composition is lifted off Preisser Solutions' own mark
 * (`public/images/ps-logo.webp`), traced from its pixels:
 *
 *   - the swoosh          cubic (545,285) (470,390) (330,450) (207,566)
 *   - the blade back      dx/dy = -2.62   (69.1 deg), straight for 280 units
 *   - the blade underside dx/dy = -1.42   (35.1 deg) — the two meet at the
 *                         mark's acute point, a 34 deg vertex
 *   - the bowl            a circular cap, r = 210 of a 1024 box
 *
 * Scaled 2-3x the viewport and rotated, the mark stops being a logo and
 * becomes architecture — you read folds and depth, not a watermark. That is
 * the whole point: this geometry belongs to one company by construction, so
 * "a lot of people have that" cannot be true of it.
 *
 * WHY NOT ANOTHER DATA METAPHOR
 * The previous background drew records snapping onto a lattice. It was a
 * well-executed literal metaphor and it read as a spreadsheet — which argues
 * against a business whose entire pitch is getting people off spreadsheets.
 * There is deliberately nothing orthogonal, nothing repeating, and nothing
 * countable in here. Every line is a diagonal or a curve, and there are four
 * of them in total.
 *
 * CONSTRAINTS THIS FILE HONOURS
 * - Canvas 2D only. No dependencies.
 * - `prefers-reduced-motion` and every viewport under 768px paint ONE frame
 *   and never start a rAF loop. The still frame is the full composition with
 *   the light parked at its most flattering position — a deliberate image, not
 *   an empty box.
 * - The rAF loop is cancelled outright by an IntersectionObserver when the
 *   hero scrolls away.
 * - Colour is read from the CSS custom properties (`--ps-hero-accent`, which
 *   resolves to `--color-primary` in dark and to the AA-safe variant in
 *   light). No brand hex is hardcoded here.
 * - Theme is watched with a MutationObserver on `<html data-theme>`, and a
 *   stopped loop is explicitly repainted so a toggle never leaves stale paint.
 * - The canvas paints TRANSPARENT. The page colour is `.ps-hero`; the contrast
 *   scrim over the wordmark is `.ps-hero-overlay`. Painting full-viewport
 *   scrims inside the loop is what once regressed frame pacing from 8.3ms to
 *   16.7ms, so they stay in CSS where they cost nothing per frame.
 *
 * HOW IT STAYS CHEAP
 * The planes never change, so they are painted ONCE into an offscreen plate.
 * Per frame the only work is: restore the plate over the rectangle the light
 * touched, then draw the light. The light is bounded, so that rectangle is
 * bounded — the loop never touches the full viewport.
 */

type RGB = [number, number, number];

// ── The mark's own geometry, in its native 1024 box ──────────────────────────
const MARK_ANCHOR_SWEEP: Pt = [394, 421]; // the swoosh's midpoint
const MARK_ANCHOR_POINT: Pt = [85, 904]; // the acute vertex
const MARK_ANCHOR_BOWL: Pt = [769, 326]; // the bowl's centre

const SWOOSH: [Pt, Pt, Pt, Pt] = [
  [545, 285],
  [470, 390],
  [330, 450],
  [207, 566],
];
/** The blade's back edge and underside, as unit directions in mark space. */
const BACK_DIR: Pt = norm([1, -2.62]);
const UNDER_DIR: Pt = norm([1.42, -1]);
const BOWL_R = 210;

type Pt = [number, number];

// ── Composition ──────────────────────────────────────────────────────────────
// One rotation for the whole scene, so every plane stays in the mark's own
// angular family. `span` is the plane's size as a multiple of the viewport's
// long edge; `ax`/`ay` place that plane's anchor as a fraction of the hero box.
const SCENE_ROT = -85.3;

/** Sized so the CURVED part of the swoosh spans most of the crossing rather
 *  than one of its straight tangents. That matters: a fold that reads as a
 *  curve is the thing separating this from the angular-shard look every
 *  template agency site already has. */
const SWEEP_LAYER = { span: 1.2, ax: 0.66, ay: 0.5, lift: 1.0 };
/** Placed so the mark's acute vertex lands INSIDE the frame, to the right of
 *  the sweep. That 34-degree point is the most particular thing the mark owns.
 *  Kept quiet on purpose — it should be found, not announced.
 *
 *  This is the one plane that DARKENS. Every plane lightening the page reads
 *  as translucent film stacked on glass; one plane that occludes is what makes
 *  the others read as being in front of it. */
const BLADE_LAYER = { span: 2.1, ax: 0.93, ay: 0.68, lift: 0.5 };
/** A shallow dome under the composition — the quietest plane, there to put a
 *  floor under the depth rather than to be noticed. */
const BOWL_LAYER = { span: 3.02, ax: 0.62, ay: 1.62, lift: 0.34 };

/** How far past the frame a plane's polygon runs. Any value that clears the
 *  diagonal at the largest span works; this is generous on purpose. */
const OVERSHOOT = 6000;

// ── Light ────────────────────────────────────────────────────────────────────
/** One full there-and-back drift. Deliberately long — presence, not motion. */
const DRIFT_PERIOD = 34;
/** Bloom radius as a fraction of the viewport's long edge. Also the distance
 *  at which an edge stops catching the light, which is what bounds the dirty
 *  rectangle and therefore the per-frame cost. */
const BLOOM_SPAN = 0.3;
/** How far the source floats off its fold, as a fraction of the long edge. */
const OFFSET_SPAN = 0.09;
/** Where the light parks for the still frame — 0.34 of its travel puts it on
 *  the upper third of the fold, where it catches two edges at once. */
const STILL_PHASE = 0.34;

// ── Palette ──────────────────────────────────────────────────────────────────
/** What gets painted OVER the page colour. Dark theme lifts toward a cool
 *  light; light theme lays down a cool shade. Both are tints of the same hue
 *  family as the brand blue, so the planes never read as grey. */
const DARK_INK: RGB = [152, 196, 255];
const LIGHT_INK: RGB = [12, 46, 96];
/** What the occluding plane lays down. Below the page colour in dark, a cool
 *  shade in light — either way it reads as a face turned away from the light. */
const DARK_SHADE: RGB = [2, 7, 16];
const LIGHT_SHADE: RGB = [34, 72, 126];

type Tone = {
  ink: RGB;
  shade: RGB;
  /** the occluding plane's own fill alpha */
  occlude: number;
  /** plane fill alpha at the fold, and out in the depth */
  planeNear: number;
  planeFar: number;
  /** the fold hairline */
  edge: number;
  /** the sheen banded along the inside of each fold — this is what gives a
   *  plane a rounded surface instead of the flat look of filled vector art */
  sheen: number;
  /** grain, which is what keeps a 5%-contrast gradient from banding */
  grain: number;
  /** the light */
  bloom: number;
  glint: number;
  glintHalo: number;
  /** dark theme adds light; light theme tints. See paintLight(). */
  additive: boolean;
};

const DARK_TONE: Omit<Tone, "ink" | "shade"> = {
  occlude: 0.42,
  planeNear: 0.07,
  planeFar: 0.0,
  edge: 0.3,
  sheen: 0.075,
  grain: 0.05,
  bloom: 0.16,
  glint: 0.8,
  glintHalo: 0.17,
  additive: true,
};

// A light page has almost no headroom below it, so every value here is
// roughly half its dark counterpart. Pushed any further the planes stop
// reading as light on a surface and start reading as grey creases.
const LIGHT_TONE: Omit<Tone, "ink" | "shade"> = {
  occlude: 0.034,
  planeNear: 0.055,
  planeFar: 0.0,
  edge: 0.17,
  sheen: 0.045,
  grain: 0.035,
  bloom: 0.14,
  glint: 0.55,
  glintHalo: 0.11,
  additive: false,
};

// ── small maths ──────────────────────────────────────────────────────────────

function norm(v: Pt): Pt {
  const m = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / m, v[1] / m];
}

/** scale + rotate about `origin`, then land `origin` on (tx, ty). */
type Mat = { a: number; b: number; c: number; d: number; e: number; f: number };

function makeMat(
  scale: number,
  deg: number,
  origin: Pt,
  tx: number,
  ty: number
): Mat {
  const r = (deg * Math.PI) / 180;
  const a = Math.cos(r) * scale;
  const b = Math.sin(r) * scale;
  return {
    a,
    b,
    c: -b,
    d: a,
    e: tx - (a * origin[0] - b * origin[1]),
    f: ty - (b * origin[0] + a * origin[1]),
  };
}

const applyMat = (m: Mat, p: Pt): Pt => [
  m.a * p[0] + m.c * p[1] + m.e,
  m.b * p[0] + m.d * p[1] + m.f,
];

/** Direction vectors ignore the translation. */
const applyDir = (m: Mat, p: Pt): Pt =>
  norm([m.a * p[0] + m.c * p[1], m.b * p[0] + m.d * p[1]]);

function cubicAt(c: [Pt, Pt, Pt, Pt], t: number): Pt {
  const u = 1 - t;
  const w0 = u * u * u;
  const w1 = 3 * u * u * t;
  const w2 = 3 * u * t * t;
  const w3 = t * t * t;
  return [
    w0 * c[0][0] + w1 * c[1][0] + w2 * c[2][0] + w3 * c[3][0],
    w0 * c[0][1] + w1 * c[1][1] + w2 * c[2][1] + w3 * c[3][1],
  ];
}

function rgba(c: RGB, a: number): string {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

/**
 * Accepts every shape a resolved custom property can take: `#1590FF`, `#19F`,
 * `rgb(21 144 255)`, or a bare `21, 144, 255` triple.
 */
function parseColor(raw: string): RGB | null {
  const s = raw.trim();
  if (!s) return null;
  if (s[0] === "#") {
    const hex = s.slice(1);
    if (hex.length === 3) {
      const n = parseInt(hex, 16);
      if (Number.isNaN(n)) return null;
      const r = (n >> 8) & 0xf;
      const g = (n >> 4) & 0xf;
      const b = n & 0xf;
      return [r * 17, g * 17, b * 17];
    }
    if (hex.length === 6) {
      const n = parseInt(hex, 16);
      if (Number.isNaN(n)) return null;
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    return null;
  }
  const m = s.match(/(-?[\d.]+)[\s,]+(-?[\d.]+)[\s,]+(-?[\d.]+)/);
  return m ? [+m[1], +m[2], +m[3]] : null;
}

// ── geometry built per resize ────────────────────────────────────────────────

/** A fold: the polyline a hairline is stroked along and the light glints on. */
type Fold = {
  pts: Float64Array; // x,y pairs, in CSS px
  cum: Float64Array; // cumulative arc length, same count
  len: number;
};

type Plane = {
  fill: Path2D;
  fold: Fold;
  /** the plane's fill gradient runs from the fold into the depth */
  g0: Pt;
  g1: Pt;
  lift: number;
  /** true for the plane that occludes rather than catches light */
  occludes?: boolean;
};

/** Longest gap allowed between fold samples. The glint finds the lit stretch
 *  of a fold by walking its samples, so a fold made of two 2000px segments
 *  would light all-or-nothing. Densifying makes that walk smooth. */
const FOLD_STEP = 22;
const FOLD_MAX_STEPS = 220;

function densify(pts: Pt[]): Pt[] {
  const out: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const d = Math.hypot(bx - ax, by - ay);
    const steps = Math.max(1, Math.min(Math.ceil(d / FOLD_STEP), FOLD_MAX_STEPS));
    for (let s = 1; s <= steps; s++) {
      out.push([ax + ((bx - ax) * s) / steps, ay + ((by - ay) * s) / steps]);
    }
  }
  return out;
}

function makeFold(raw: Pt[]): Fold {
  const pts = densify(raw);
  const n = pts.length;
  const flat = new Float64Array(n * 2);
  const cum = new Float64Array(n);
  let len = 0;
  for (let i = 0; i < n; i++) {
    flat[i * 2] = pts[i][0];
    flat[i * 2 + 1] = pts[i][1];
    if (i > 0) {
      len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    }
    cum[i] = len;
  }
  return { pts: flat, cum, len };
}

export type MarkLight = { destroy: () => void };

export function mountMarkLight(container: HTMLElement): MarkLight {
  const canvas = document.createElement("canvas");
  canvas.id = "ps-hero-canvas";
  canvas.setAttribute("aria-hidden", "true");
  container.prepend(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    // Never drop silently: say so, then leave the plain hero background.
    console.warn("[hero] 2D canvas unavailable — hero background not drawn");
    canvas.remove();
    return { destroy: () => {} };
  }
  const c2d = ctx;

  // Manual check, matching the convention used across this codebase.
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let isLight = document.documentElement.getAttribute("data-theme") === "light";
  let w = 0;
  let h = 0;
  let dpr = 1;
  let staticFrame = true;
  let planes: Plane[] = [];
  /** the path the source drifts along — the sweep's fold, pushed off it */
  let track: Fold | null = null;
  /** arc-length bounds on `track` that keep the source inside the hero box */
  let travel: [number, number] = [0, 0];
  let bloomR = 0;
  let tone: Tone = { ...DARK_TONE, ink: DARK_INK, shade: DARK_SHADE };
  let accent: RGB = [21, 144, 255];

  /** The planes, painted once. Only allocated when there is a loop to feed. */
  let plate: HTMLCanvasElement | null = null;
  let prevBox: [number, number, number, number] | null = null;

  let t = 0;
  let lastTs = 0;
  let animId = 0;
  let onScreen = true;

  // ── palette ────────────────────────────────────────────────────────────────
  function readPalette() {
    isLight = document.documentElement.getAttribute("data-theme") === "light";
    tone = isLight
      ? { ...LIGHT_TONE, ink: LIGHT_INK, shade: LIGHT_SHADE }
      : { ...DARK_TONE, ink: DARK_INK, shade: DARK_SHADE };

    const cs = getComputedStyle(container);
    const raw =
      cs.getPropertyValue("--ps-hero-accent") ||
      getComputedStyle(document.documentElement).getPropertyValue(
        "--color-primary"
      );
    const parsed = parseColor(raw);
    if (parsed) {
      accent = parsed;
    } else {
      // Never drop silently. Keep the last good accent and say why.
      console.warn(
        `[hero] could not resolve --ps-hero-accent (got ${JSON.stringify(raw)}) — keeping previous accent`
      );
    }
  }

  // ── geometry ───────────────────────────────────────────────────────────────

  /** The swoosh plane: the mark's cubic, run out past the frame at both ends,
   *  closed off on one side. The fold keeps only the part near the frame. */
  function buildSweep(K: number): Plane {
    const m = makeMat(
      (SWEEP_LAYER.span * K) / 1024,
      SCENE_ROT,
      MARK_ANCHOR_SWEEP,
      SWEEP_LAYER.ax * w,
      SWEEP_LAYER.ay * h
    );

    const curve: Pt[] = [];
    for (let i = 0; i <= 96; i++) curve.push(applyMat(m, cubicAt(SWOOSH, i / 96)));

    // Tangent directions leaving each end, in canvas space.
    const headDir = applyDir(m, [
      SWOOSH[0][0] - SWOOSH[1][0],
      SWOOSH[0][1] - SWOOSH[1][1],
    ]);
    const tailDir = applyDir(m, [
      SWOOSH[3][0] - SWOOSH[2][0],
      SWOOSH[3][1] - SWOOSH[2][1],
    ]);

    const head = curve[0];
    const tail = curve[curve.length - 1];
    const reach = K * 1.4;

    // The fold: what a hairline is drawn along. Long enough to leave the frame
    // at both ends so it never appears to stop in mid-air, no longer.
    const foldPts: Pt[] = [
      [head[0] + headDir[0] * reach, head[1] + headDir[1] * reach],
      ...curve,
      [tail[0] + tailDir[0] * reach, tail[1] + tailDir[1] * reach],
    ];

    // The filled region sits on the concave side, so the plane's boundary
    // bulges into it and reads as a curved fold rather than a cut.
    const chord = norm([tail[0] - head[0], tail[1] - head[1]]);
    const nrm: Pt = [chord[1], -chord[0]];
    const mid = curve[48];
    const chordMid: Pt = [(head[0] + tail[0]) / 2, (head[1] + tail[1]) / 2];
    // Flip the normal so it points AWAY from the bulge (the concave side).
    const bulge =
      (mid[0] - chordMid[0]) * nrm[0] + (mid[1] - chordMid[1]) * nrm[1];
    const side: Pt = bulge > 0 ? [-nrm[0], -nrm[1]] : nrm;

    const fill = new Path2D();
    const far: Pt[] = [
      [head[0] + headDir[0] * OVERSHOOT, head[1] + headDir[1] * OVERSHOOT],
      ...curve,
      [tail[0] + tailDir[0] * OVERSHOOT, tail[1] + tailDir[1] * OVERSHOOT],
    ];
    fill.moveTo(far[0][0], far[0][1]);
    for (let i = 1; i < far.length; i++) fill.lineTo(far[i][0], far[i][1]);
    const last = far[far.length - 1];
    fill.lineTo(
      last[0] + side[0] * OVERSHOOT,
      last[1] + side[1] * OVERSHOOT
    );
    fill.lineTo(
      far[0][0] + side[0] * OVERSHOOT,
      far[0][1] + side[1] * OVERSHOOT
    );
    fill.closePath();

    return {
      fill,
      fold: makeFold(foldPts),
      g0: mid,
      g1: [mid[0] + side[0] * K * 0.8, mid[1] + side[1] * K * 0.8],
      lift: SWEEP_LAYER.lift,
    };
  }

  /** The blade: the mark's 34-degree acute vertex, opened out to plane scale.
   *  Its point is the single most recognisable thing about the mark, and at
   *  this size it reads as the corner of a structure. */
  function buildBlade(K: number): Plane {
    const m = makeMat(
      (BLADE_LAYER.span * K) / 1024,
      SCENE_ROT,
      MARK_ANCHOR_POINT,
      BLADE_LAYER.ax * w,
      BLADE_LAYER.ay * h
    );
    const v = applyMat(m, MARK_ANCHOR_POINT);
    const back = applyDir(m, BACK_DIR);
    const under = applyDir(m, UNDER_DIR);

    const fill = new Path2D();
    fill.moveTo(v[0], v[1]);
    fill.lineTo(v[0] + back[0] * OVERSHOOT, v[1] + back[1] * OVERSHOOT);
    fill.lineTo(v[0] + under[0] * OVERSHOOT, v[1] + under[1] * OVERSHOOT);
    fill.closePath();

    // The fold runs IN along one edge, through the vertex, and OUT along the
    // other — so the hairline gradient peaks exactly on the mark's acute
    // point, and the light traces around the corner as it passes.
    const reach = K * 1.9;
    const fold = makeFold([
      [v[0] + under[0] * reach, v[1] + under[1] * reach],
      [v[0], v[1]],
      [v[0] + back[0] * reach, v[1] + back[1] * reach],
    ]);

    const bis = norm([back[0] + under[0], back[1] + under[1]]);
    return {
      fill,
      fold,
      // Deepest right at the vertex, easing off as the plane opens out — a
      // corner is always the darkest part of a turned face.
      g0: [v[0] + bis[0] * K * 0.02, v[1] + bis[1] * K * 0.02],
      g1: [v[0] + bis[0] * K * 1.35, v[1] + bis[1] * K * 1.35],
      lift: BLADE_LAYER.lift,
      occludes: true,
    };
  }

  /** The bowl: the mark's large-radius cap, the deepest and quietest plane. */
  function buildBowl(K: number): Plane {
    const s = (BOWL_LAYER.span * K) / 1024;
    const m = makeMat(s, SCENE_ROT, MARK_ANCHOR_BOWL, BOWL_LAYER.ax * w, BOWL_LAYER.ay * h);
    const c = applyMat(m, MARK_ANCHOR_BOWL);
    const r = BOWL_R * s;

    const fill = new Path2D();
    fill.arc(c[0], c[1], r, 0, Math.PI * 2);

    // The fold is the arc, sampled only where it can plausibly cross the frame.
    const pts: Pt[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push([c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r]);
    }

    return {
      fill,
      fold: makeFold(pts),
      // Brightest at the dome's crest, falling away into the depth below it.
      g0: [c[0], c[1] - r],
      g1: [c[0], c[1] + r * 0.35],
      lift: BOWL_LAYER.lift,
    };
  }

  function build() {
    const rect = container.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    staticFrame = prefersReduced || w < 768;

    // 1.5 rather than 2: this is a soft decorative field with no text in it,
    // and the backing store scales with the square of the ratio.
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    c2d.setTransform(dpr, 0, 0, dpr, 0, 0);

    const K = Math.max(w, h);
    bloomR = K * BLOOM_SPAN;

    // Back to front: bowl, blade, sweep.
    planes = [buildBowl(K), buildBlade(K), buildSweep(K)];

    // The source drifts along the sweep's fold, floated off it so it reads as
    // a light in the space above the fold rather than a bead on a wire.
    const sweepFold = planes[2].fold;
    const off = K * OFFSET_SPAN;
    const n = sweepFold.cum.length;
    const shifted: Pt[] = [];
    for (let i = 0; i < n; i++) {
      const x = sweepFold.pts[i * 2];
      const y = sweepFold.pts[i * 2 + 1];
      const j = Math.min(i + 1, n - 1);
      const k = Math.max(i - 1, 0);
      const tx = sweepFold.pts[j * 2] - sweepFold.pts[k * 2];
      const ty = sweepFold.pts[j * 2 + 1] - sweepFold.pts[k * 2 + 1];
      const d = norm([tx, ty]);
      shifted.push([x - d[1] * off, y + d[0] * off]);
    }
    track = makeFold(shifted);

    // The fold deliberately runs well past the frame at both ends, so the
    // source has to be confined to the stretch of it that is actually on
    // screen — otherwise most of the cycle is spent lighting nothing.
    travel = [track.len * 0.12, track.len * 0.88];
    let first = -1;
    let last = -1;
    const margin = bloomR * 0.35;
    for (let i = 0; i < track.cum.length; i++) {
      const x = track.pts[i * 2];
      const y = track.pts[i * 2 + 1];
      if (x < -margin || x > w + margin || y < -margin || y > h + margin) continue;
      if (first < 0) first = i;
      last = i;
    }
    if (first >= 0 && last > first) {
      travel = [track.cum[first], track.cum[last]];
    } else {
      console.warn("[hero] light track never crosses the hero — using its midspan");
    }

    prevBox = null;
    if (staticFrame) {
      // No loop, so no plate: a 12MB backing store nobody reads is 12MB of
      // phone memory spent on nothing.
      plate = null;
    } else {
      plate = plate ?? document.createElement("canvas");
      plate.width = canvas.width;
      plate.height = canvas.height;
      paintPlate();
    }
    t = staticFrame ? STILL_PHASE * DRIFT_PERIOD : 0;
  }

  // ── painting ───────────────────────────────────────────────────────────────

  /** Fine grain. A 5%-contrast gradient on a dark page bands visibly on an
   *  8-bit display; a per-pixel dither is what stops it. Painted once. */
  function paintGrain(g: CanvasRenderingContext2D) {
    const size = 128;
    const tile = document.createElement("canvas");
    tile.width = size;
    tile.height = size;
    const tg = tile.getContext("2d");
    if (!tg) return;
    const img = tg.createImageData(size, size);
    const d = img.data;
    const c = tone.ink;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = c[0];
      d[i + 1] = c[1];
      d[i + 2] = c[2];
      d[i + 3] = Math.random() * 255 * tone.grain;
    }
    tg.putImageData(img, 0, 0);
    const pat = g.createPattern(tile, "repeat");
    if (!pat) return;
    g.fillStyle = pat;
    g.fillRect(0, 0, w, h);
  }

  /** The planes and their folds. Never changes between frames. */
  function paintScene(g: CanvasRenderingContext2D) {
    g.clearRect(0, 0, w, h);

    for (const p of planes) {
      const paint = p.occludes ? tone.shade : tone.ink;
      const near = p.occludes ? tone.occlude : tone.planeNear * p.lift;
      const far = p.occludes ? 0 : tone.planeFar * p.lift;
      const grad = g.createLinearGradient(p.g0[0], p.g0[1], p.g1[0], p.g1[1]);
      grad.addColorStop(0, rgba(paint, near));
      grad.addColorStop(1, rgba(paint, far));
      g.fillStyle = grad;
      g.fill(p.fill);
    }

    const K = Math.max(w, h);

    /** Trace a fold, with a gradient that dies at both ends — an edge running
     *  to the corner at full strength reads as a graphic, not as a lit fold. */
    const traceFold = (p: Plane, alpha: number) => {
      const f = p.fold;
      const n = f.cum.length;
      const a: Pt = [f.pts[0], f.pts[1]];
      const b: Pt = [f.pts[(n - 1) * 2], f.pts[(n - 1) * 2 + 1]];
      const grad = g.createLinearGradient(a[0], a[1], b[0], b[1]);
      grad.addColorStop(0, rgba(tone.ink, 0));
      grad.addColorStop(0.34, rgba(tone.ink, alpha));
      grad.addColorStop(0.66, rgba(tone.ink, alpha));
      grad.addColorStop(1, rgba(tone.ink, 0));
      g.strokeStyle = grad;
      g.beginPath();
      g.moveTo(f.pts[0], f.pts[1]);
      for (let i = 1; i < n; i++) g.lineTo(f.pts[i * 2], f.pts[i * 2 + 1]);
      g.stroke();
    };

    g.lineJoin = "round";
    g.lineCap = "butt";

    // Sheen: wide soft strokes along each fold, CLIPPED to that plane so only
    // the inboard half survives. The result is a surface that rolls away from
    // its own edge — the difference between a lit plane and a flat fill.
    for (const p of planes) {
      g.save();
      g.clip(p.fill);
      // Two bands, not three: a tight third band turns the fold into a beam,
      // and beams across a dark hero is exactly the look everyone has.
      for (const band of [
        { width: K * 0.19, alpha: tone.sheen * 0.5 },
        { width: K * 0.075, alpha: tone.sheen },
      ]) {
        g.lineWidth = band.width;
        traceFold(p, band.alpha * p.lift);
      }
      g.restore();
    }

    // Hairlines last, so a fold is never buried by the plane in front of it.
    g.lineWidth = Math.max(1 / dpr, 0.75);
    for (const p of planes) traceFold(p, tone.edge * p.lift);

    paintGrain(g);
  }

  function paintPlate() {
    if (!plate) return;
    const g = plate.getContext("2d");
    if (!g) {
      // Never drop silently — and fall back to painting straight to screen.
      console.warn("[hero] offscreen plate unavailable — falling back");
      plate = null;
      return;
    }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintScene(g);
  }

  /** Where the source is at clock `time`, and how strongly it burns. */
  function sourceAt(time: number): Pt | null {
    if (!track || track.len <= 0) return null;
    // Cosine ease: the light slows at each end of its travel instead of
    // snapping around, which is what makes a 34s cycle read as drift.
    const phase = 0.5 - 0.5 * Math.cos((2 * Math.PI * time) / DRIFT_PERIOD);
    const s = travel[0] + (travel[1] - travel[0]) * phase;
    const cum = track.cum;
    let lo = 0;
    let hi = cum.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < s) lo = mid + 1;
      else hi = mid;
    }
    const i = Math.max(1, lo);
    const seg = cum[i] - cum[i - 1] || 1;
    const f = (s - cum[i - 1]) / seg;
    return [
      track.pts[(i - 1) * 2] + (track.pts[i * 2] - track.pts[(i - 1) * 2]) * f,
      track.pts[(i - 1) * 2 + 1] +
        (track.pts[i * 2 + 1] - track.pts[(i - 1) * 2 + 1]) * f,
    ];
  }

  /**
   * The light. Two parts, both bounded by `bloomR` so the dirty rectangle
   * stays bounded:
   *   1. a soft bloom, clipped to the planes so it can never float free of
   *      the geometry (an unclipped one is just a gradient blob);
   *   2. a glint on every fold that passes close enough — a short bright
   *      segment of the edge itself, which is what sells it as light on a
   *      structure rather than a light on a background.
   */
  function paintLight(g: CanvasRenderingContext2D, L: Pt) {
    // 1 — bloom.
    g.save();
    const clip = new Path2D();
    for (const p of planes) clip.addPath(p.fill);
    g.clip(clip);
    if (tone.additive) g.globalCompositeOperation = "lighter";
    const bg = g.createRadialGradient(L[0], L[1], 0, L[0], L[1], bloomR);
    bg.addColorStop(0, rgba(accent, tone.bloom));
    bg.addColorStop(0.45, rgba(accent, tone.bloom * 0.34));
    bg.addColorStop(1, rgba(accent, 0));
    g.fillStyle = bg;
    g.fillRect(L[0] - bloomR, L[1] - bloomR, bloomR * 2, bloomR * 2);
    g.restore();

    // 2 — glints.
    g.save();
    if (tone.additive) g.globalCompositeOperation = "lighter";
    g.lineCap = "round";
    for (const p of planes) {
      const f = p.fold;
      const n = f.cum.length;

      // Nearest sample on this fold.
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < n; i++) {
        const dx = f.pts[i * 2] - L[0];
        const dy = f.pts[i * 2 + 1] - L[1];
        const d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      const dist = Math.sqrt(bestD);
      if (best < 0 || dist > bloomR) continue;

      // Falls off with distance, and never reaches full strength on the
      // planes set back in depth.
      const fall = 1 - dist / bloomR;
      const strength = fall * fall * p.lift;
      if (strength < 0.02) continue;

      // The lit stretch: whatever of this fold is inside the bloom.
      const reach = Math.sqrt(Math.max(0, bloomR * bloomR - bestD));
      const s0 = f.cum[best] - reach;
      const s1 = f.cum[best] + reach;
      let i0 = best;
      let i1 = best;
      while (i0 > 0 && f.cum[i0 - 1] > s0) i0--;
      while (i1 < n - 1 && f.cum[i1 + 1] < s1) i1++;
      if (i1 <= i0) continue;

      const a: Pt = [f.pts[i0 * 2], f.pts[i0 * 2 + 1]];
      const b: Pt = [f.pts[i1 * 2], f.pts[i1 * 2 + 1]];

      // Two passes: a wide soft halo, then the hairline itself. Cheaper and
      // crisper than shadowBlur, which costs a full-surface blur per stroke.
      for (const pass of [
        { width: 7, alpha: tone.glintHalo },
        { width: Math.max(1 / dpr, 0.9), alpha: tone.glint },
      ]) {
        const grad = g.createLinearGradient(a[0], a[1], b[0], b[1]);
        grad.addColorStop(0, rgba(accent, 0));
        grad.addColorStop(0.5, rgba(accent, pass.alpha * strength));
        grad.addColorStop(1, rgba(accent, 0));
        g.strokeStyle = grad;
        g.lineWidth = pass.width;
        g.beginPath();
        g.moveTo(a[0], a[1]);
        for (let i = i0 + 1; i <= i1; i++) g.lineTo(f.pts[i * 2], f.pts[i * 2 + 1]);
        g.stroke();
      }
    }
    g.restore();
  }

  /** Full repaint — used for the still frame, and whenever the plate changes. */
  function drawStill() {
    paintScene(c2d);
    const L = sourceAt(t);
    if (L) paintLight(c2d, L);
    prevBox = null;
  }

  /** The animated path. Restores only the rectangle the light touched. */
  function drawFrame() {
    if (!plate) {
      drawStill();
      return;
    }
    const L = sourceAt(t);
    if (!L) return;

    // The light's footprint, plus a pixel of slack for the halo's line width.
    const pad = bloomR + 6;
    const box: [number, number, number, number] = [
      L[0] - pad,
      L[1] - pad,
      pad * 2,
      pad * 2,
    ];

    // Union with the previous frame's footprint, so the trailing edge of the
    // bloom is cleaned up rather than smeared across the hero.
    let x0 = box[0];
    let y0 = box[1];
    let x1 = box[0] + box[2];
    let y1 = box[1] + box[3];
    if (prevBox) {
      x0 = Math.min(x0, prevBox[0]);
      y0 = Math.min(y0, prevBox[1]);
      x1 = Math.max(x1, prevBox[0] + prevBox[2]);
      y1 = Math.max(y1, prevBox[1] + prevBox[3]);
    }
    x0 = Math.max(0, Math.floor(x0));
    y0 = Math.max(0, Math.floor(y0));
    x1 = Math.min(w, Math.ceil(x1));
    y1 = Math.min(h, Math.ceil(y1));
    prevBox = box;
    if (x1 <= x0 || y1 <= y0) return;

    const dw = x1 - x0;
    const dh = y1 - y0;

    c2d.save();
    c2d.beginPath();
    c2d.rect(x0, y0, dw, dh);
    c2d.clip();
    c2d.clearRect(x0, y0, dw, dh);
    c2d.drawImage(
      plate,
      x0 * dpr,
      y0 * dpr,
      dw * dpr,
      dh * dpr,
      x0,
      y0,
      dw,
      dh
    );
    paintLight(c2d, L);
    c2d.restore();
  }

  function loop(ts: number) {
    animId = requestAnimationFrame(loop);
    // Frame-rate independent, and clamped so a backgrounded tab does not
    // return and fast-forward the drift.
    const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0.016;
    lastTs = ts;
    t += dt;
    drawFrame();
  }

  function start() {
    if (animId || staticFrame) return;
    lastTs = 0;
    animId = requestAnimationFrame(loop);
  }

  function stop() {
    if (!animId) return;
    cancelAnimationFrame(animId);
    animId = 0;
  }

  function onResize() {
    build();
    drawStill();
    if (staticFrame) stop();
    else if (onScreen) start();
  }

  const themeObserver = new MutationObserver(() => {
    const nowLight =
      document.documentElement.getAttribute("data-theme") === "light";
    if (nowLight === isLight) return;
    readPalette();
    // The plate holds baked-in theme colour, so it has to be repainted before
    // anything reads from it again.
    if (plate) paintPlate();
    // A running loop picks it up on its next frame, but only inside the dirty
    // rectangle — so repaint in full here either way, or a toggle leaves the
    // old palette everywhere except under the light.
    drawStill();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // Scrolling the hero away cancels the loop outright rather than idling it —
  // an idling rAF still wakes the main thread on every frame for nothing.
  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      if (!onScreen) stop();
      else start();
    },
    { threshold: 0 }
  );
  io.observe(container);

  window.addEventListener("resize", onResize, { passive: true });

  readPalette();
  build();
  drawStill();
  start();

  return {
    destroy() {
      stop();
      window.removeEventListener("resize", onResize);
      io.disconnect();
      themeObserver.disconnect();
      canvas.remove();
      plate = null;
    },
  };
}
