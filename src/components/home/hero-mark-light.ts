/**
 * hero-mark-light.ts — the hero background.
 *
 * WHAT IT IS
 * Preisser Solutions' own mark, blown up to three or four times the viewport
 * and cropped hard by the frame. You never see a logo — you see the fragments
 * that stay in shot: one long sweeping arc and two or three angular blades
 * running off the edges. They overlap, each at its own tonal value, and one
 * narrow blue light travels slowly along a real contour of the mark.
 *
 * WHERE THE GEOMETRY COMES FROM — this is not "inspired by" the logo
 * MARK_BODY and MARK_WEDGE below are the literal pixel boundary of
 * `public/images/ps-logo.webp` (1024x1024, ink #1590FF). They were produced by
 * a crack-following contour trace of the ink mask, corner-detected with
 * Douglas-Peucker at eps=4 to find the mark's true vertices, smoothed only
 * BETWEEN those vertices (so the 33-degree point stays a point), then
 * re-simplified at eps=0.45. Re-filling those two polygons reproduces the
 * original ink mask at IoU 0.9937. At the scales used here a 0.45-unit
 * tolerance is under 2 CSS px, so the arcs stay smooth when magnified.
 *
 * The four primitives measured by an earlier pass all check out against the
 * trace, with one label correction:
 *   - swoosh cubic (545,285)(470,390)(330,450)(207,566) — its endpoints land
 *     on the traced wedge edge to within 4 units, max deviation 34 units over
 *     the whole span (the real edge is slightly flatter in the middle). The
 *     trace is used instead of the cubic because it IS the edge.
 *   - blade underside 35.1 deg — traced 34.97 deg.
 *   - blade back edge 69.1 deg — traced 68.2 deg. NOTE the "-2.62" in that
 *     table is dy/dx, not dx/dy; as dx/dy it would be a 21-degree edge and the
 *     vertex would not close.
 *   - the two meet at the mark's acute vertex — traced 33.2 deg (called 34).
 *   - bowl r = 210 — least-squares fit of the traced outer arc gives
 *     r = 210.9 about (771.4, 309.6).
 *
 * WHY THIS COMPOSITION AND NOT ANOTHER
 * Two earlier backgrounds were rejected: an animated wave mesh ("a lot of
 * people have that") and a field of records snapping to a lattice ("looks like
 * an Excel sheet" — fatal for a business that sells getting people OFF
 * spreadsheets). So: nothing orthogonal, nothing repeating, nothing countable.
 * Every edge in here is an edge of this company's mark, which is the one thing
 * no template can also have.
 *
 * CONSTRAINTS THIS FILE HONOURS
 * - Canvas 2D only. No dependencies.
 * - `prefers-reduced-motion` and every viewport under 768px paint ONE frame and
 *   never start a rAF. The still frame is the whole composition with the light
 *   parked at its most flattering point — a deliberate image, not a blank box.
 * - The rAF is cancelled outright by an IntersectionObserver when the hero
 *   leaves the viewport, not idled.
 * - Colour comes from the CSS custom properties (`--ps-hero-accent`, which
 *   resolves to `--color-primary` = the exact logo blue). No brand hex here.
 * - Theme is watched with a MutationObserver on `<html data-theme>`, and a
 *   stopped loop is explicitly repainted so a toggle never leaves stale paint.
 * - The canvas paints TRANSPARENT. The page colour is `.ps-hero`; the contrast
 *   scrim over the wordmark is `.ps-hero-overlay`, in CSS. Painting those
 *   scrims inside the loop is what once regressed frame pacing from 8.3ms to
 *   16.7ms, so they stay declarative where they cost nothing per frame.
 *
 * HOW IT STAYS CHEAP
 * The planes never move, so they are painted ONCE into an offscreen plate. Per
 * frame the only work is: blit the plate back over the rectangle the light
 * touched last, then stroke the light. The light is a short arc segment, so
 * that rectangle is small and the loop never touches the full viewport.
 */

type RGB = [number, number, number];
type Pt = [number, number];

// ── The mark, traced from public/images/ps-logo.webp ─────────────────────────
// Flat x,y pairs in the logo's native 1024 box. See the header for provenance.
// The main body: top bar, bowl, counter, swoosh and the stem down to the point.
const MARK_BODY = [
  121,116, 121,117, 123.3,118.7, 239.6,194.4, 315.2,242.8, 316,244, 537,244,
  552,243, 721,243, 729,244, 738,244, 738.3,244.7, 758,249, 772.4,257.6,
  782,266, 782,267, 785.3,271.7, 791,283, 793,296, 793,309, 792.3,309.3,
  791.4,316.4, 786.8,332.8, 779.3,348.3, 773,358, 773,359, 770.2,361.2,
  761.8,370.8, 751.8,378.8, 750,381, 749,381, 724,395, 705.4,400.4,
  693.4,403.4, 680.3,405.3, 680,406, 666,407, 561,407, 553,408, 543,408,
  542.7,408.7, 514.7,412.7, 497.6,416.6, 482,421, 480,421, 479.7,421.7,
  450.1,432.1, 427,442, 391,460, 390.2,461.2, 370.8,472.8, 345.6,489.6,
  323.7,505.7, 306.6,519.6, 305,520, 264.2,560.2, 251.8,574.8, 249,577,
  248.6,578.6, 235.7,594.7, 223.6,611.6, 208.8,633.8, 194.2,658.2, 193,659,
  190.3,665.3, 168.7,705.7, 150,746, 147,751, 146.6,753.6, 127.2,799.2,
  85,906, 90.3,903.3, 155.6,856.6, 300.4,755.4, 377.6,700.6, 381,699,
  384.3,694.3, 386.8,688.8, 410.2,626.2, 421,602, 422.2,601.2, 432.2,587.2,
  439.3,579.3, 458,564, 480,553, 497.7,546.7, 498,546, 513.7,542.7,
  533.7,539.7, 534,539, 543,539, 551,538, 744,538, 745.2,537.2, 766.1,535.1,
  781.4,532.4, 802.7,526.7, 825,519, 852.2,504.2, 865.4,495.4, 877.4,486.4,
  879,486, 906.8,458.8, 916.2,447.2, 919,445, 920.6,441.6, 935.2,421.2,
  952,391, 953,387, 962.9,363.9, 970.3,340.3, 971,340, 977.3,310.3, 979,298,
  980,288, 980,261, 979.3,260.7, 976.3,239.7, 973.4,228.6, 970.9,220.1,
  963,200, 961.8,199.2, 951.4,182.6, 944.8,174.2, 924,154, 920.6,152.4,
  909.3,144.7, 892,136, 874.9,129.1, 856.3,123.7, 856,123, 824.1,117.9,
  809.2,116.8, 808,116
];
// The wedge the swoosh cuts free of the body. A second, separate ink island.
const MARK_WEDGE = [
  316,278, 273.2,386.2, 203,570, 204,570, 206.8,567.8, 213.8,560.8,
  242.2,529.2, 265,506, 266.6,505.6, 281.2,492.2, 301.7,475.7, 323.3,460.3,
  327,457, 331.2,455.2, 363.7,435.7, 411,412, 415.8,410.8, 445.1,399.1,
  462.3,393.3, 486.4,386.4, 502.6,382.6, 508,382, 513.2,368.2, 516,363,
  518.1,355.1, 543.9,287.9, 547,278
];

/** Vertex index ranges into MARK_BODY, so a layer can name the run of real
 *  contour it leads with — and so the light has real contours to choose from. */
const RUN_SWOOSH = [35, 58] as const; // the swoosh's curved span
const RUN_BLADE = [64, 78] as const; // the 33-degree point and both its edges
const RUN_BOWL = [95, 133] as const; // the outer bowl arc — the long sweep

// ── Composition ──────────────────────────────────────────────────────────────
/**
 * Each layer is the WHOLE mark, magnified and cropped. `height` is the mark's
 * 790-unit height as a multiple of the hero's height — 3 and up, so what stays
 * in frame is a fragment, not a logo. `anchor` is a vertex index in MARK_BODY
 * pinned at (ax, ay) of the hero box, which is how a specific real edge is
 * aimed at a specific part of the frame. `value` scales the layer's tone.
 */
type LayerSpec = {
  height: number;
  rot: number;
  anchor: number;
  ax: number;
  ay: number;
  value: number;
  /** the contour run this layer leads with — where its crisp edge is drawn */
  lead: readonly [number, number];
};

/** Back to front: two deep blades, the bowl, then the sweep. Overlap is doing
 *  the depth work, so the order matters.
 *
 *  Every anchor is an ACUTE vertex or a point on a curve — never the mark's
 *  one right-angled corner. Two right angles in frame and the composition
 *  starts reading as panels, which is the failure mode this background exists
 *  to avoid. */
const LAYERS: LayerSpec[] = [
  // The deep blade: the mark's 33-degree point, its vertex parked off the
  // bottom-right corner so the wedge opens up across the frame. Quietest.
  { height: 5.0, rot: -47, anchor: 70, ax: 1.14, ay: 1.18, value: 0.55, lead: RUN_BLADE },
  // A second blade off the right edge, crossing the first at a shallow angle
  // so the two read at different depths where they overlap.
  { height: 3.4, rot: 158, anchor: 70, ax: 1.1, ay: 0.16, value: 0.8, lead: RUN_BLADE },
  // The bowl: r = 210 of the mark, magnified until its radius is most of the
  // viewport. It is the only closed curve in the mark and it puts a floor of
  // real curvature under the angular work.
  { height: 5.6, rot: 22, anchor: 110, ax: 0.62, ay: 1.06, value: 0.7, lead: RUN_BOWL },
  // The sweep: the swoosh, the mark's signature curve, arcing down through the
  // right of the frame. First in line for the light (see build()).
  { height: 2.1, rot: 6, anchor: 52, ax: 0.86, ay: 0.24, value: 1.0, lead: RUN_SWOOSH },
];

/** How far outside the hero a layer's polygon may run before it is clipped.
 *  Only used to bound the sheen gradient; the fill itself is a closed polygon. */
const SHEEN_SPAN = 0.16;

// ── Light ────────────────────────────────────────────────────────────────────
/** One full there-and-back drift, in seconds. Slow on purpose: presence, not
 *  motion. Anything under ~20s starts reading as an animation. */
const DRIFT_PERIOD = 30;
/** The lit stretch of contour, as a fraction of the hero's long edge. */
const BEAM_SPAN = 0.3;
/** Where the light parks in the still frame — just off centre, so the parked
 *  frame does not read as the midpoint of an animation someone paused. */
const STILL_PHASE = 0.36;
/**
 * The light is the brightest thing on the canvas AND it is the exact blue of
 * "AI Integration." in the headline, which has about 0.2 of contrast margin on
 * the light theme. So it is not allowed under the type at all: its travel is
 * clipped to the stretch of contour that clears the measured keep-out boxes
 * (see keepOut()) by this fraction of the hero's long edge, and is never left of
 * BEAM_FLOOR_X. Both are structural — they hold for any copy length, any
 * viewport and any font, rather than being tuned to one screenshot.
 */
const BEAM_CLEARANCE = 0.03;
const BEAM_FLOOR_X = 0.45;

/**
 * Narrow viewports are a different picture, not the same one squeezed: the
 * text column IS the whole frame there, so the composition slides down and
 * right, out from behind the copy, and shrinks enough that a real curve still
 * fits across the remaining band.
 */
const NARROW = 768;
const NARROW_SCALE = 0.62;
const NARROW_DX = 0.14;
const NARROW_DY = -0.12;

// ── Palette ──────────────────────────────────────────────────────────────────
/** What a plane lays down over the page colour. Dark lifts toward a cool
 *  light; light lays down a cool shade. Both stay in the brand's hue family so
 *  a plane never reads as neutral grey. */
const DARK_INK: RGB = [150, 196, 255];
const LIGHT_INK: RGB = [26, 62, 112];
/** Light theme only: the plane that lifts instead of shading. The page is
 *  #F6F9FC, not white, so pure white is a real value ABOVE it — which is what
 *  keeps a low-contrast light composition from turning into grey smears. */
const LIGHT_LIFT: RGB = [255, 255, 255];

type Tone = {
  ink: RGB;
  lift: RGB | null;
  /** flat fill alpha of one plane, before its own `value` */
  plane: number;
  /** the crisp hairline along a plane's boundary */
  edge: number;
  /** the soft band just inside a plane's lead edge — gives it a surface */
  sheen: number;
  /** dither, so a 4%-contrast fill cannot band on an 8-bit display */
  grain: number;
  /** the light: narrow core, and the halo that keeps it from looking drawn */
  beam: number;
  beamHalo: number;
  /** dark theme adds light; light theme lays down tint. See paintBeam(). */
  additive: boolean;
};

const DARK_TONE: Omit<Tone, "ink" | "lift"> = {
  plane: 0.062,
  edge: 0.36,
  sheen: 0.07,
  grain: 0.05,
  beam: 0.85,
  beamHalo: 0.13,
  additive: true,
};

// A light page has almost no headroom, and a cool shade pushed too far stops
// reading as a lit plane and starts reading as dirt. Every value here is well
// under its dark counterpart, and the composition earns its separation from
// the lift plane instead of from more shade.
const LIGHT_TONE: Omit<Tone, "ink" | "lift"> = {
  plane: 0.06,
  edge: 0.3,
  sheen: 0.055,
  grain: 0.03,
  beam: 0.6,
  beamHalo: 0.09,
  additive: false,
};

// ── small maths ──────────────────────────────────────────────────────────────

type Mat = { a: number; b: number; c: number; d: number; e: number; f: number };

/** scale + rotate about `origin`, then land `origin` on (tx, ty). */
function makeMat(scale: number, deg: number, origin: Pt, tx: number, ty: number): Mat {
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

const applyMat = (m: Mat, x: number, y: number): Pt => [
  m.a * x + m.c * y + m.e,
  m.b * x + m.d * y + m.f,
];

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

/** A run of contour in CSS px, arc-length indexed so the light can walk it. */
type Edge = {
  pts: Float64Array; // x,y pairs
  cum: Float64Array; // cumulative arc length
  len: number;
};

type Plane = {
  fill: Path2D;
  /** the whole boundary — stroked crisply, because a plane meeting a plane on
   *  a defined line is what makes this read as built rather than smudged */
  outline: Path2D;
  /** the run this layer leads with, densified for the light to ride */
  lead: Edge;
  value: number;
  /** the sheen band's gradient, running inward from the lead edge */
  s0: Pt;
  s1: Pt;
};

/** Longest gap allowed between lead-edge samples. The light finds its lit
 *  stretch by walking these, so a run made of two 900px segments would light
 *  all-or-nothing. Densifying makes the walk smooth. */
const EDGE_STEP = 14;
const EDGE_MAX_STEPS = 400;

function makeEdge(raw: Pt[]): Edge {
  const dense: Pt[] = [raw[0]];
  for (let i = 1; i < raw.length; i++) {
    const [ax, ay] = raw[i - 1];
    const [bx, by] = raw[i];
    const d = Math.hypot(bx - ax, by - ay);
    const steps = Math.max(1, Math.min(Math.ceil(d / EDGE_STEP), EDGE_MAX_STEPS));
    for (let s = 1; s <= steps; s++) {
      dense.push([ax + ((bx - ax) * s) / steps, ay + ((by - ay) * s) / steps]);
    }
  }
  const n = dense.length;
  const pts = new Float64Array(n * 2);
  const cum = new Float64Array(n);
  let len = 0;
  for (let i = 0; i < n; i++) {
    pts[i * 2] = dense[i][0];
    pts[i * 2 + 1] = dense[i][1];
    if (i > 0) len += Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]);
    cum[i] = len;
  }
  return { pts, cum, len };
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
  /** the contour the light rides — see the selection in build() */
  let track: Edge | null = null;
  /** arc-length bounds on `track` that keep the light on stage and off the
   *  type (see BEAM_CLEARANCE / BEAM_FLOOR_X) */
  let travel: [number, number] = [0, 0];
  let beamLen = 0;
  let haloWidth = 0;
  let tone: Tone = { ...DARK_TONE, ink: DARK_INK, lift: null };
  let accent: RGB = [21, 144, 255];

  /** The planes, painted once. Only allocated when there is a loop to feed. */
  let plate: HTMLCanvasElement | null = null;
  /** Where the composition is assembled before the ramp is applied to it.
   *  Reused: on the degraded path where the plate is unavailable this is
   *  reached once per frame, and allocating a full-viewport canvas there
   *  would turn a cosmetic fallback into a memory problem. */
  let scratch: HTMLCanvasElement | null = null;
  let prevBox: [number, number, number, number] | null = null;

  let t = 0;
  let lastTs = 0;
  let animId = 0;
  let onScreen = true;

  // ── palette ────────────────────────────────────────────────────────────────
  function readPalette() {
    isLight = document.documentElement.getAttribute("data-theme") === "light";
    tone = isLight
      ? { ...LIGHT_TONE, ink: LIGHT_INK, lift: LIGHT_LIFT }
      : { ...DARK_TONE, ink: DARK_INK, lift: null };

    const cs = getComputedStyle(container);
    const raw =
      cs.getPropertyValue("--ps-hero-accent") ||
      getComputedStyle(document.documentElement).getPropertyValue("--color-primary");
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

  /** One magnified, cropped copy of the mark. */
  function buildPlane(spec: LayerSpec): Plane {
    const narrow = w < NARROW;
    const height = spec.height * (narrow ? NARROW_SCALE : 1);
    const ax = spec.ax + (narrow ? NARROW_DX : 0);
    const ay = spec.ay + (narrow ? NARROW_DY : 0);
    const scale = (height * h) / 790; // 790 = the mark's own height
    const anchor: Pt = [MARK_BODY[spec.anchor * 2], MARK_BODY[spec.anchor * 2 + 1]];
    const m = makeMat(scale, spec.rot, anchor, ax * w, ay * h);

    const fill = new Path2D();
    const outline = new Path2D();
    for (const poly of [MARK_BODY, MARK_WEDGE]) {
      const n = poly.length / 2;
      for (let i = 0; i < n; i++) {
        const [x, y] = applyMat(m, poly[i * 2], poly[i * 2 + 1]);
        if (i === 0) {
          fill.moveTo(x, y);
          outline.moveTo(x, y);
        } else {
          fill.lineTo(x, y);
          outline.lineTo(x, y);
        }
      }
      fill.closePath();
      outline.closePath();
    }

    // The lead run, in canvas space.
    const [i0, i1] = spec.lead;
    const raw: Pt[] = [];
    for (let i = i0; i <= i1; i++) raw.push(applyMat(m, MARK_BODY[i * 2], MARK_BODY[i * 2 + 1]));
    const lead = makeEdge(raw);

    // The sheen runs inward from the lead run's midpoint. "Inward" is decided
    // by testing which side of the edge normal is actually inside the polygon,
    // so it is correct for any rotation rather than tuned per layer.
    const mid = Math.floor(lead.cum.length / 2);
    const mx = lead.pts[mid * 2];
    const my = lead.pts[mid * 2 + 1];
    const j = Math.min(mid + 1, lead.cum.length - 1);
    const k = Math.max(mid - 1, 0);
    const tx = lead.pts[j * 2] - lead.pts[k * 2];
    const ty = lead.pts[j * 2 + 1] - lead.pts[k * 2 + 1];
    const tl = Math.hypot(tx, ty) || 1;
    let nx = -ty / tl;
    let ny = tx / tl;
    // isPointInPath is specified to take its point in canvas coordinates
    // UNAFFECTED by the current transform, while the path IS transformed by
    // it. With the CTM at scale(dpr) the two disagree, and the sheen would
    // band the wrong way round on every device with dpr > 1. Testing under an
    // identity transform puts both in the same CSS-pixel space.
    const probe = Math.max(w, h) * 0.01;
    c2d.save();
    c2d.setTransform(1, 0, 0, 1, 0, 0);
    const inside = c2d.isPointInPath(fill, mx + nx * probe, my + ny * probe);
    c2d.restore();
    if (!inside) {
      nx = -nx;
      ny = -ny;
    }
    const reach = Math.max(w, h) * SHEEN_SPAN;

    return {
      fill,
      outline,
      lead,
      value: spec.value,
      s0: [mx, my],
      s1: [mx + nx * reach, my + ny * reach],
    };
  }

  /**
   * The rectangles the light must stay out of, in canvas coordinates.
   *
   * Two of them, kept SEPARATE on purpose. Unioning them would merge the
   * full-width site header into the type's box and leave no safe region at
   * all on a wide screen.
   *
   *   1. the hero's type — deliberately the RANGE rect of each line's text
   *      nodes, not the element box: `.ps-hero-line` and `.ps-hero-subtitle`
   *      are block-level and span the full 1200px content column, so their
   *      element boxes claim backdrop the glyphs never sit on.
   *   2. the site header, which floats over the top of the hero. Without it
   *      the narrow still frame parks the light behind the nav pill, where
   *      nobody ever sees it.
   */
  function keepOut(): [number, number, number, number][] {
    const base = container.getBoundingClientRect();
    const rel = (r: DOMRect): [number, number, number, number] => [
      r.left - base.left,
      r.top - base.top,
      r.right - base.left,
      r.bottom - base.top,
    ];
    const boxes: [number, number, number, number][] = [];

    const nodes = container.querySelectorAll<HTMLElement>(
      ".ps-hero-line, .ps-hero-subtitle, .ps-hero-ctas"
    );
    if (!nodes.length) {
      // Never drop silently: without this the light has no exclusion zone.
      console.warn("[hero] no hero type found — light falls back to a width floor");
    }
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const el of nodes) {
      // The CTA row is boxes, not a text run; everything else is measured as ink.
      let r: DOMRect;
      if (el.classList.contains("ps-hero-ctas")) {
        r = el.getBoundingClientRect();
      } else {
        const range = document.createRange();
        range.selectNodeContents(el);
        r = range.getBoundingClientRect();
        range.detach();
      }
      if (r.width <= 0 || r.height <= 0) continue;
      const b = rel(r);
      x0 = Math.min(x0, b[0]);
      y0 = Math.min(y0, b[1]);
      x1 = Math.max(x1, b[2]);
      y1 = Math.max(y1, b[3]);
    }
    if (Number.isFinite(x0)) boxes.push([x0, y0, x1, y1]);

    const header = document.querySelector("header");
    if (header) {
      const b = rel(header.getBoundingClientRect());
      if (b[3] > 0 && b[1] < h) boxes.push(b);
    }
    return boxes;
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
    beamLen = K * BEAM_SPAN;
    haloWidth = Math.max(6, K * 0.007);

    planes = LAYERS.map(buildPlane);

    // Which contour does the light ride? The longest stretch of a lead run
    // that is on stage, right of BEAM_FLOOR_X and clear of the measured type.
    // Front to back, first acceptable wins — so the light prefers the swoosh,
    // the mark's signature curve, and only falls back to a deeper arc on a
    // viewport where the swoosh has no room. Nothing here is per-breakpoint.
    const boxes = keepOut();
    const clear = K * BEAM_CLEARANCE;
    const floorX = BEAM_FLOOR_X * w;
    const margin = K * 0.04;

    const safeRun = (e: Edge): [number, number] | null => {
      let bestA = -1;
      let bestB = -1;
      let runA = -1;
      for (let i = 0; i < e.cum.length; i++) {
        const x = e.pts[i * 2];
        const y = e.pts[i * 2 + 1];
        const onStage = x >= floorX && x <= w + margin && y >= -margin && y <= h + margin;
        // Outside EVERY keep-out box, with clearance on all four sides.
        let clearOfType = true;
        for (const b of boxes) {
          if (
            x < b[2] + clear &&
            x > b[0] - clear &&
            y < b[3] + clear &&
            y > b[1] - clear
          ) {
            clearOfType = false;
            break;
          }
        }
        if (onStage && clearOfType) {
          if (runA < 0) runA = i;
          if (bestA < 0 || e.cum[i] - e.cum[runA] > e.cum[bestB] - e.cum[bestA]) {
            bestA = runA;
            bestB = i;
          }
        } else {
          runA = -1;
        }
      }
      return bestA >= 0 && bestB > bestA ? [e.cum[bestA], e.cum[bestB]] : null;
    };

    const wanted = K * BEAM_SPAN;
    let chosen: { edge: Edge; run: [number, number] } | null = null;
    for (let i = planes.length - 1; i >= 0; i--) {
      const run = safeRun(planes[i].lead);
      if (!run) continue;
      const len = run[1] - run[0];
      if (!chosen || len > chosen.run[1] - chosen.run[0]) chosen = { edge: planes[i].lead, run };
      // Long enough to carry a full-length beam AND some travel: stop here, so
      // the frontmost workable contour wins rather than merely the longest.
      if (len >= wanted * 1.05) break;
    }

    if (chosen) {
      track = chosen.edge;
      // The beam has to FIT inside the safe stretch, not merely be centred in
      // it — its own length is what would otherwise reach past the clearance
      // and put the brightest thing on the canvas under the wordmark.
      beamLen = Math.min(wanted, (chosen.run[1] - chosen.run[0]) * 0.72);
      travel = [chosen.run[0] + beamLen * 0.5, chosen.run[1] - beamLen * 0.5];
    } else {
      // Never drop silently — say why the light is parked mid-run.
      console.warn("[hero] no contour clears the hero type — light parked mid-sweep");
      track = planes[planes.length - 1].lead;
      beamLen = Math.min(wanted, track.len * 0.5);
      travel = [track.len * 0.4, track.len * 0.6];
    }

    prevBox = null;
    if (staticFrame) {
      // No loop, so no plate: a backing store nobody reads is phone memory
      // spent on nothing.
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

  /** Fine grain. A 5%-contrast fill on a dark page bands visibly on an 8-bit
   *  display; a per-pixel dither is what stops it. Painted once. */
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

  /**
   * The composition, minus the light. Never changes between frames.
   *
   * The whole thing is drawn into a scratch layer first and then composited
   * through a horizontal ramp, so the planes keep their crisp edges on the
   * right — that definition is the point — while the whole composition falls
   * away to nothing under the text column on the left.
   */
  function paintScene(g: CanvasRenderingContext2D) {
    g.clearRect(0, 0, w, h);

    scratch = scratch ?? document.createElement("canvas");
    scratch.width = Math.max(1, Math.round(w * dpr));
    scratch.height = Math.max(1, Math.round(h * dpr));
    const sg = scratch.getContext("2d");
    if (!sg) {
      // Never drop silently, and never leave the hero unpainted.
      console.warn("[hero] scratch layer unavailable — drawing planes direct");
      paintPlanes(g);
      paintGrain(g);
      return;
    }
    sg.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintPlanes(sg);
    paintGrain(sg);

    // The ramp. Left of FADE_FROM the composition is gone entirely, which is
    // what keeps the wordmark's contrast independent of what the planes do.
    sg.setTransform(1, 0, 0, 1, 0, 0);
    sg.globalCompositeOperation = "destination-in";
    const ramp = sg.createLinearGradient(0, 0, scratch.width, 0);
    ramp.addColorStop(0, "rgba(0,0,0,0)");
    ramp.addColorStop(0.42, "rgba(0,0,0,0)");
    ramp.addColorStop(0.68, "rgba(0,0,0,0.55)");
    ramp.addColorStop(1, "rgba(0,0,0,1)");
    sg.fillStyle = ramp;
    sg.fillRect(0, 0, scratch.width, scratch.height);

    g.drawImage(scratch, 0, 0, scratch.width, scratch.height, 0, 0, w, h);
  }

  function paintPlanes(g: CanvasRenderingContext2D) {
    g.lineJoin = "round";
    g.lineCap = "butt";

    for (const p of planes) {
      // 1 — the flat value. Overlapping planes compound, which is where the
      //     depth comes from: no plane is shaded to fake it.
      const paint = tone.lift && p.value < 0.8 ? tone.lift : tone.ink;
      g.fillStyle = rgba(paint, tone.plane * p.value);
      g.fill(p.fill);

      // 2 — a soft band inside the lead edge, so a plane has a surface that
      //     rolls away from its own boundary instead of reading as flat art.
      g.save();
      g.clip(p.fill);
      const sheen = g.createLinearGradient(p.s0[0], p.s0[1], p.s1[0], p.s1[1]);
      sheen.addColorStop(0, rgba(paint, tone.sheen * p.value));
      sheen.addColorStop(1, rgba(paint, 0));
      g.fillStyle = sheen;
      g.fillRect(0, 0, w, h);
      g.restore();
    }

    // 3 — the boundaries, last so no plane buries the edge of the one behind
    //     it. These are what make the forms definite.
    g.lineWidth = Math.max(1 / dpr, 0.8);
    for (const p of planes) {
      g.strokeStyle = rgba(tone.ink, tone.edge * p.value);
      g.stroke(p.outline);
    }
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

  /** Sample index on `track` nearest arc length `s`. */
  function indexAt(s: number): number {
    if (!track) return 0;
    const cum = track.cum;
    let lo = 0;
    let hi = cum.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < s) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  /** The lit stretch of contour at clock `time`, plus the box it dirties. */
  function beamAt(time: number): { i0: number; i1: number; box: [number, number, number, number] } | null {
    if (!track || track.len <= 0 || travel[1] <= travel[0]) return null;
    // Cosine ease: the light slows at each end of its travel instead of
    // snapping around, which is what makes a 30s cycle read as drift.
    const phase = 0.5 - 0.5 * Math.cos((2 * Math.PI * time) / DRIFT_PERIOD);
    const s = travel[0] + (travel[1] - travel[0]) * phase;
    const i0 = indexAt(s - beamLen * 0.5);
    const i1 = indexAt(s + beamLen * 0.5);
    if (i1 <= i0) return null;

    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (let i = i0; i <= i1; i++) {
      const x = track.pts[i * 2];
      const y = track.pts[i * 2 + 1];
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
    const pad = haloWidth + 2;
    return { i0, i1, box: [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2] };
  }

  /**
   * The light. A narrow bright core with one soft halo behind it, gradient-
   * faded to nothing at both ends so it reads as light catching a contour
   * rather than as a lit outline or a moving dot. Two stroked passes are
   * cheaper and crisper than shadowBlur, which costs a full-surface blur.
   */
  function paintBeam(g: CanvasRenderingContext2D, b: { i0: number; i1: number }) {
    if (!track) return;
    const a: Pt = [track.pts[b.i0 * 2], track.pts[b.i0 * 2 + 1]];
    const z: Pt = [track.pts[b.i1 * 2], track.pts[b.i1 * 2 + 1]];

    g.save();
    if (tone.additive) g.globalCompositeOperation = "lighter";
    g.lineCap = "round";
    g.lineJoin = "round";
    for (const pass of [
      { width: haloWidth, alpha: tone.beamHalo },
      { width: Math.max(1.6, haloWidth * 0.22), alpha: tone.beam },
    ]) {
      const grad = g.createLinearGradient(a[0], a[1], z[0], z[1]);
      grad.addColorStop(0, rgba(accent, 0));
      grad.addColorStop(0.34, rgba(accent, pass.alpha * 0.7));
      grad.addColorStop(0.55, rgba(accent, pass.alpha));
      grad.addColorStop(1, rgba(accent, 0));
      g.strokeStyle = grad;
      g.lineWidth = pass.width;
      g.beginPath();
      g.moveTo(a[0], a[1]);
      for (let i = b.i0 + 1; i <= b.i1; i++) g.lineTo(track.pts[i * 2], track.pts[i * 2 + 1]);
      g.stroke();
    }
    g.restore();
  }

  /** Full repaint — the still frame, and whenever the plate changes. */
  function drawStill() {
    paintScene(c2d);
    const b = beamAt(t);
    if (b) paintBeam(c2d, b);
    prevBox = null;
  }

  /** The animated path. Restores only the rectangle the light touched. */
  function drawFrame() {
    if (!plate) {
      drawStill();
      return;
    }
    const b = beamAt(t);
    if (!b) return;

    // Union with the previous frame's footprint, so the trailing end of the
    // beam is cleaned up rather than smeared along the contour.
    let x0 = b.box[0];
    let y0 = b.box[1];
    let x1 = b.box[0] + b.box[2];
    let y1 = b.box[1] + b.box[3];
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
    prevBox = b.box;
    if (x1 <= x0 || y1 <= y0) return;

    const dw = x1 - x0;
    const dh = y1 - y0;

    c2d.save();
    c2d.beginPath();
    c2d.rect(x0, y0, dw, dh);
    c2d.clip();
    c2d.clearRect(x0, y0, dw, dh);
    c2d.drawImage(plate, x0 * dpr, y0 * dpr, dw * dpr, dh * dpr, x0, y0, dw, dh);
    paintBeam(c2d, b);
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
    const nowLight = document.documentElement.getAttribute("data-theme") === "light";
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
      scratch = null;
    },
  };
}
