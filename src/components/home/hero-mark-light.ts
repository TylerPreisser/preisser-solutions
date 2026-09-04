/**
 * hero-mark-light.ts — the hero background.
 *
 * ONE copy of the Preisser mark, drawn very large and cropped by the frame,
 * held at a low opacity so it sits behind the type, with a narrow beam of the
 * brand blue travelling its outline.
 *
 * The previous version decomposed the mark into four magnified fragments and
 * composed them as abstract planes. It measured well and read as nothing —
 * you could not see the P. The ask was simpler than the implementation:
 * the logo, big, cropped, faded, recoloured, with light on its edge. This is
 * that, and nothing else.
 *
 * MARK_BODY / MARK_WEDGE are the literal pixel boundary of
 * public/images/ps-logo.webp, traced from its ink mask (re-filling the two
 * polygons reproduces the original at IoU 0.9937). The wedge is a separate
 * ink island — the piece the swoosh cuts free — so the two are filled with
 * "evenodd" to keep the counter open.
 *
 * Cost: the mark never moves, so it is painted ONCE into an offscreen plate.
 * Per frame the only work is restoring the plate over the rectangle the beam
 * last touched and stroking the beam again. The loop never touches the full
 * viewport.
 *
 * Narrow viewports animate too, but cheaper: a smaller backing store, half the
 * frame rate and fewer beam segments. The lap there is FASTER, not slower —
 * see BEAM_PERIOD_MS. Only prefers-reduced-motion parks the beam as a still
 * frame.
 */

type RGB = [number, number, number];

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
const MARK_WEDGE = [
316,278, 273.2,386.2, 203,570, 204,570, 206.8,567.8, 213.8,560.8,
  242.2,529.2, 265,506, 266.6,505.6, 281.2,492.2, 301.7,475.7, 323.3,460.3,
  327,457, 331.2,455.2, 363.7,435.7, 411,412, 415.8,410.8, 445.1,399.1,
  462.3,393.3, 486.4,386.4, 502.6,382.6, 508,382, 513.2,368.2, 516,363,
  518.1,355.1, 543.9,287.9, 547,278
];

const BOX = 1024;                 // the mark's native coordinate box
const NARROW_MAX = 768;           // below this we use the narrow framing
/** The width at or above which the hero mark exists AT ALL. Exported so hero.tsx
 *  and this file share one number. The client rejected the mark on phones in
 *  three successive forms — sprawling, badge, and large watermark — so below
 *  this width nothing is mounted: no canvas, no backing store, no rAF, no
 *  observers, no listeners. Same threshold as NARROW_MAX by design. */
export const MARK_MIN_WIDTH = NARROW_MAX;
const DPR_CAP = 1.5;
const DPR_CAP_NARROW = 1.25;      // fewer pixels to clear/blit per frame
/** One full lap of the outline. This has to read as a line TRAVELLING the
 *  shape within the few seconds someone looks at the hero before scrolling —
 *  at the old 30s a visitor saw ~15% of a lap, which is a static glow, not a
 *  beam. 11s puts a visible head-of-light past a recognisable stretch of the
 *  mark in about a second.
 *
 *  Narrow is FASTER, not slower. The mark is drawn at 0.70 of the hero height
 *  there instead of 0.92, so a lap is fewer css pixels of travel and the same
 *  duration reads as slower motion; 9s restores the apparent speed. It is also
 *  the shorter visit. Smoothness is not the thing being bought here — at a 9s
 *  lap and 30fps the head advances 4.4% of the beam's own length per frame,
 *  which is far below the point where a low-opacity background line steps. */
const BEAM_PERIOD_MS = 11000;
const BEAM_PERIOD_MS_NARROW = 9000;
const FRAME_GAP_MS_NARROW = 30;   // ~30fps on a 60Hz or 120Hz phone
/* Beam weight multipliers. Added 2026-09-03: at the original alpha 0.55 /
   width 0.9-2.0 the beam measured 1.03:1 against the page on a light-theme
   phone and 1.70:1 on dark — moving, and invisible. The `.ps-hero` contrast
   veil sits over this canvas at a flat 0.55 (globals.css:1017-1031) and is a
   documented deliberate trade-off protecting the headline
   (globals.css:1033-1045), so it stays; the beam's own weight underneath is
   the only honest lever.
   Light theme takes the larger alpha gain because the veil costs it more
   headroom than it costs dark. Narrow takes the larger width gain because the
   mark is drawn at 0.70 scale there, so an identical stroke covers fewer CSS
   pixels — and a phone was the worst case to begin with.
   WIDTH_GAIN_* is read in TWO places: the stroke, and the dirty-rect `pad`
   that restores the plate behind it. Change one without the other and the
   blit misses the stroke's outer edge, leaving a sliver every frame until the
   ghost accumulates into coloured banding. */
/* Lowered 2026-09-04 from 1.85 / 1.5. Those were tuned to punch through a
   0.55-0.99 veil that the beam is no longer under: the mark is now fitted into
   a stage that sits where the light-theme scrim has already released (see
   `stage()` below), so 1.85 put the peak at 0.55*1.85 = 1.0 clamped — a fully
   saturated #1590FF hairline on near-white, which reads as harsh un-veiled. */
const ALPHA_GAIN_LIGHT = 1.15;   // peak 0.63
/* DARK LOWERED 1.25 -> 1.00 on 2026-09-04, as a direct consequence of §24: that
   change lowered the dark EDGE to 0.27 and released the veil that was also
   dimming the beam, so the mark got fainter and the beam got brighter from one
   edit. The target is the RELATIONSHIP, not the number — light reads correctly
   at beam/edge = 2.37/1.64 = 1.45x, and dark had drifted to 3.63/1.93 = 1.88x.
   Deliberately aimed at the low side of 1.3-1.5x because the beam is the moving
   element. WIDTH_GAIN_* is untouched: it is coupled to the dirty-rect pad.
   TUNED TO THE INSTRUMENT, not computed: 1.00 still measured 1.64x because §24
   raised the dark EDGE too (1.93 -> 2.13), so the ratio's denominator moved as
   well as its numerator. Measured 1.00 -> 1.64x, 0.85 -> 1.55x, 0.75 -> 1.46x,
   which lands on light's own 1.46x. */
const ALPHA_GAIN_DARK = 0.75;    // peak 0.413
const WIDTH_GAIN_NARROW = 1.9;
const WIDTH_GAIN_WIDE = 1.5;
const BEAM_STEPS = 72;
const BEAM_STEPS_NARROW = 44;     // the beam covers fewer css px on a phone

/** The mark's ink extent inside its 1024 box (verified against the webp at
 *  IoU 0.9924 — see the header note). */
const MARK_X0 = 85, MARK_Y0 = 116, MARK_W = 895, MARK_H = 790;
/** Clear air at the frame edges. (STAGE_GAP, the old bounding-box margin between
 *  the headline and the mark, is gone — §22(c) replaced that margin with a true
 *  ink-vs-ink test in layout(), which is what allows the mark to be large.) */
const STAGE_PAD = 24;
/** The x at which the light-theme desktop scrim reaches zero, as a fraction of
 *  the hero's width. MUST track globals.css `[data-theme="light"] .ps-hero-overlay`
 *  inside @media (min-width:768px). If that ramp moves, move this. */
const SCRIM_CLEAR = 0.70;
/* NOTE, kept because it corrects a false claim that lived here: the phone scrim
 * is NOT "a flat veil with no horizontal ramp". It is a 90deg ramp exactly like
 * the desktop one — `0.97 0% -> 0.95 62% -> 0.55 70% -> 0 78%` after the
 * 2026-09-04 retiming in globals.css. There is no SCRIM_CLEAR_NARROW any more:
 * §22(b) gives narrow viewports the FULL width and lets the ramp fade the mark's
 * left side, which is the large-faint-watermark reading the client asked for
 * rather than a small fully-released badge. */

function parseRGB(raw: string): RGB | null {
  const m = raw.trim().match(/^#?([0-9a-f]{6})$/i);
  if (m) {
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const r = raw.match(/rgba?\(([^)]+)\)/);
  if (!r) return null;
  const p = r[1].split(",").map((v) => parseFloat(v));
  return p.length >= 3 ? [p[0], p[1], p[2]] : null;
}
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/** Theme-dependent ink. Dark: the mark is a lighter form catching light.
 *  Light: a cool shade, because the page is #F6F9FC and a grey wash reads as
 *  dirt — a tinted shadow reads as a form. */
function palette(isLight: boolean) {
  return isLight
    // Raised 2026-09-04. WCAG relative-luminance ratios against the measured
    // hero background (rgb(246,249,252) light, rgb(10,22,40) dark) with the mark
    // in its released position: fill ~1.35:1 (a soft watermark that is
    // unmistakably present without competing), edge ~2.2:1 (a definite
    // contour). Both are far under the headline's own >15:1, so the mark cannot
    // pull focus. Light and dark are matched so the mark reads the same weight
    // in both themes — dark used to be 2.4x fainter than light on fill.
    // 2026-09-04, §22(a): back to the WATERMARK register. The 0.34/0.62 values
    // were tuned when the mark was a small contained badge and needed to hold
    // its own; at watermark scale they read as a placed object. Lowering these
    // LOWERS the measured contrast ratio and that is the correct direction —
    // §3's targets were always ~1.3:1 fill and ~2.1:1 contour, and the number
    // was never the problem. Dark is scaled proportionally.
    ? { fill: [140, 160, 190] as RGB, fillA: 0.20, edge: [104, 128, 162] as RGB, edgeA: 0.38 }
    // DARK EDGE IS 0.27, NOT 0.20. §22 scaled dark proportionally from light,
    // but light uses two DIFFERENT colours for fill and edge ([140,160,190] /
    // [104,128,162]) while dark uses the SAME colour for both, so proportional
    // scaling does not preserve the fill-to-edge relationship. Matched instead
    // on mean dRGB against the page: light fill 0.20 -> 17.1 vs dark 0.10 ->
    // 17.0; light edge 0.38 -> 45.2 vs dark 0.27 -> 44.6. (0.20 would give 33.1,
    // about a quarter of light.) dRGB rather than a WCAG ratio deliberately:
    // ratio is a text-legibility metric, and on a dark ground the same ratio
    // carries ~12x less absolute luminance difference.
    : { fill: [150, 186, 232] as RGB, fillA: 0.10, edge: [150, 186, 232] as RGB, edgeA: 0.27 };
}

export type MarkLight = { destroy: () => void };

export function mountMarkLight(container: HTMLElement): MarkLight {
  const canvas = document.createElement("canvas");
  canvas.id = "ps-hero-canvas";
  canvas.setAttribute("aria-hidden", "true");
  container.prepend(canvas);
  const ctx0 = canvas.getContext("2d");
  if (!ctx0) return { destroy: () => canvas.remove() };
  const ctx: CanvasRenderingContext2D = ctx0;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  let raf = 0;
  let destroyed = false;
  let plate: HTMLCanvasElement | null = null;
  let outline: Array<[number, number]> = [];
  let cumulative: number[] = [];
  let total = 0;
  let W = 0, H = 0, dpr = 1;
  let onStage = true;
  let started = 0;
  let narrow = false;
  let lastPaint = 0;
  /** --color-primary, resolved once per build() instead of on every frame.
     It only changes with the theme, and a theme change already triggers a
     rebuild via the MutationObserver below. Cheap either way (0.33us on clean
     style) but there is no reason to read layout-adjacent state at 30-60Hz. */
  let accent: RGB = [21, 144, 255];
  /** The rectangle the previous frame's beam was stroked into, in device
   *  pixels. Restoring only this plus the new one is what keeps the loop off
   *  the full viewport. Null means "the whole canvas is clean plate". */
  let dirty: [number, number, number, number] | null = null;
  /** Arc-length distance of the outline's rightmost vertex. Set in build(). */
  let parkDist = 0;

  const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
  /** Reduced motion parks the beam, AND SO DOES NARROW, since 2026-09-04.
   *
   *  On a phone the mark now spans the light scrim's 0.95-0.97 plateau, so a
   *  travelling beam is only visible while it crosses the released right-hand
   *  band: measured 4 of 12 samples across a full lap at 390 light. A highlight
   *  that blinks in and out as it travels IS the client's issue #1, on the exact
   *  device they reported it on. Raising the beam's alpha cannot fix it — the
   *  scrim composites OVER the canvas, so under a 0.95-0.97 white plateau a beam
   *  at alpha 1.0 still arrives at ~3-5% of its own colour; it would only make
   *  the already-visible samples louder. Moving the plateau is not available:
   *  it ends at 62% against accent ink at 55.9%.
   *  A still highlight cannot blink. It also stops the rAF loop outright on
   *  phones, which the IntersectionObserver note below already calls the
   *  mitigation that matters most there. Desktop is untouched. */
  const still = () => reduced || narrow;
  const period = () => (narrow ? BEAM_PERIOD_MS_NARROW : BEAM_PERIOD_MS);
  /** Where the parked beam sits, as a `now` value that drawBeam turns into a
   *  phase. The old hardcoded 0.34 of a lap was chosen when the mark was
   *  elsewhere and is no longer guaranteed to land in the released band — park
   *  on the outline's RIGHTMOST point instead, which is the bowl's outer curve
   *  and is released at every width by construction, since the stage's right
   *  edge is W - STAGE_PAD. */
  const parked = () => (total > 0 ? period() * (parkDist / total) : 0);

  function markPath(p: Path2D, s: number, tx: number, ty: number) {
    for (const poly of [MARK_BODY, MARK_WEDGE]) {
      p.moveTo(poly[0] * s + tx, poly[1] * s + ty);
      for (let i = 2; i < poly.length; i += 2) p.lineTo(poly[i] * s + tx, poly[i + 1] * s + ty);
      p.closePath();
    }
  }

  /** The rectangle the whole mark is fitted inside. Two candidates: the column
   *  right of the headline, and the band between the CTAs and the scroll cue.
   *  Whichever fits the mark larger wins — which self-selects the column on
   *  desktop and the band on tablets and phones, with no magic breakpoint.
   *  Measured rather than assumed: the headline's ink edge moves with the webfont
   *  and with clamp(1.375rem, 7.5vw, 5.5rem), so a hardcoded fraction is wrong on
   *  half the width range. */
  /** The headline's INK rectangles, in container coordinates. Boxes are the full
   *  flex column and are useless for this; ink is what can actually collide. */
  function headlineInk(): Array<{ l: number; r: number; t: number; b: number }> {
    const cr = container.getBoundingClientRect();
    const out: Array<{ l: number; r: number; t: number; b: number }> = [];
    container.querySelectorAll(".ps-hero-line").forEach((el) => {
      const rg = document.createRange();
      rg.selectNodeContents(el);
      const b = rg.getBoundingClientRect();
      if (b.width > 0 && b.height > 0) {
        out.push({ l: b.left - cr.left, r: b.right - cr.left, t: b.top - cr.top, b: b.bottom - cr.top });
      }
    });
    return out;
  }

  /** Area, in css px², where the mark's INK overlaps the headline's INK.
   *  Scanlines the evenodd polygon pair — the same fill rule markPath() uses —
   *  against each line's ink rect. This is the whole point of §22(c): the old
   *  guard pushed the mark's BOX right of the headline, but the mark's ink at
   *  the headline's y-band sits far right of its box edge because the tail
   *  sweeps down-left BELOW the text. Testing ink against ink is what buys the
   *  size back. Runs in build(), never in frame(). */
  function inkOverlap(sCss: number, ox: number, oy: number,
                      rects: Array<{ l: number; r: number; t: number; b: number }>): number {
    if (!rects.length || !(sCss > 0)) return 0;
    let area = 0;
    for (const rect of rects) {
      const y0 = Math.floor(rect.t), y1 = Math.ceil(rect.b);
      for (let y = y0; y < y1; y++) {
        const xs: number[] = [];
        for (const poly of [MARK_BODY, MARK_WEDGE]) {
          const n = poly.length / 2;
          for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            const ay = poly[i * 2 + 1] * sCss + oy, by = poly[j * 2 + 1] * sCss + oy;
            if ((ay <= y && by > y) || (by <= y && ay > y)) {
              const ax = poly[i * 2] * sCss + ox, bx = poly[j * 2] * sCss + ox;
              xs.push(ax + ((y - ay) / (by - ay)) * (bx - ax));
            }
          }
        }
        if (xs.length < 2) continue;
        xs.sort((a, b) => a - b);
        // even-odd: fill between alternate pairs
        for (let k = 0; k + 1 < xs.length; k += 2) {
          const l = Math.max(xs[k], rect.l), r = Math.min(xs[k + 1], rect.r);
          if (r > l) area += r - l;
        }
      }
    }
    return area;
  }

  type Placement = { sCss: number; ox: number; oy: number };

  /** Fit the mark into a stage rect and return its placement in css px, where a
   *  polygon point maps to (P.x * sCss + ox, P.y * sCss + oy). */
  function fitInto(st: { x: number; y: number; w: number; h: number }, shrink: number): Placement {
    const sCss = Math.min(st.w / MARK_W, st.h / MARK_H) * shrink;
    return {
      sCss,
      ox: st.x + (st.w - MARK_W * sCss) / 2 - MARK_X0 * sCss,
      oy: st.y + (st.h - MARK_H * sCss) / 2 - MARK_Y0 * sCss,
    };
  }

  /** §22(b)+(c). A WIDTH REGIME, not an A/B fit, plus a true ink test.
   *
   *  Wide: the full hero height in the column the light scrim has released. The
   *  mark is width-bound there, so it grows to fill that column.
   *  Narrow: the full width, dropped below the headline's ink, sweeping BEHIND
   *  the CTA buttons. Passing behind content is what makes it read as a
   *  background layer; the previous contained version sat in empty space below
   *  everything, which is exactly what makes a thing look stuck on.
   *
   *  The headline guard is now a TEST, not a margin. Deleting it outright is not
   *  safe — measured at 820, the scrim floor alone leaves ~2,825 px² of real ink
   *  overlap. So: lay out, scanline, and only if ink actually collides drop
   *  below the headline and then shrink 4% per iteration. */
  function layout(): Placement {
    const rects = headlineInk();
    const headBottom = rects.length ? Math.max(...rects.map((r) => r.b)) : 0;
    const floor = Math.max(STAGE_PAD, W * SCRIM_CLEAR);

    const primary = narrow
      ? { x: STAGE_PAD, y: headBottom + 8, w: W - STAGE_PAD * 2, h: H - STAGE_PAD - (headBottom + 8) }
      : { x: floor, y: STAGE_PAD, w: W - STAGE_PAD - floor, h: H - STAGE_PAD * 2 };
    // Step 3: the same recipe the narrow regime already uses — drop clear of the
    // headline's ink entirely. For narrow this is identical to `primary`, so the
    // loop simply falls through to the shrink step.
    const dropped = { x: STAGE_PAD, y: headBottom + 8, w: W - STAGE_PAD * 2, h: H - STAGE_PAD - (headBottom + 8) };

    let last = fitInto(primary, 1);
    for (const st of [primary, dropped]) {
      if (!(st.w > 0 && st.h > 0)) continue;
      for (let k = 0; k < 12; k++) {
        const pl = fitInto(st, Math.pow(0.96, k));
        if (!(pl.sCss > 0)) break;
        last = pl;
        if (inkOverlap(pl.sCss, pl.ox, pl.oy, rects) === 0) return pl;
      }
    }
    return last;   // never paint nothing; the caller guards sCss > 0
  }


  /** Paint the mark into the offscreen plate and cache its outline in device
   *  pixels so the beam can walk the same edge that is actually visible. */
  function build() {
    const rect = container.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    narrow = W < NARROW_MAX;
    dpr = Math.min(window.devicePixelRatio || 1, narrow ? DPR_CAP_NARROW : DPR_CAP);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    /* The whole mark is fitted INSIDE a measured stage rather than drawn
       oversized and cropped by the frame. That single change is what makes the
       beam continuously visible (no part of the outline is off-canvas, so there
       are no dark gaps), what makes the P legible (it now sits where the scrim
       has released, so raising its alpha actually shows up), and what takes the
       headline overlap to zero at every width by construction rather than by
       tuning a breakpoint. It deliberately reverses the "bigger than 1 means it
       is cropped by the frame — which is the point" intent in the header note:
       you cannot have a continuously-visible beam around a shape whose outline
       leaves the frame. */
    const pl = layout();
    const sCss = pl.sCss;
    const s = sCss * dpr;
    const tx = pl.ox * dpr;
    const ty = pl.oy * dpr;

    // A degenerate stage (a very short viewport) means there is nowhere honest
    // to put the mark. Paint nothing rather than a sliver.
    if (!(s > 0)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      outline = []; cumulative = [0]; total = 0; plate = null; dirty = null;
      return;
    }

    accent = parseRGB(getComputedStyle(container).getPropertyValue("--color-primary")) || [21, 144, 255];
    const pal = palette(isLight());
    plate = document.createElement("canvas");
    plate.width = canvas.width;
    plate.height = canvas.height;
    const p = plate.getContext("2d");
    if (!p) return;

    // Filled from the traced contour, not the webp. The bitmap is lossy and
    // its compression banding becomes visible as vertical striping once it is
    // tinted and scaled this far up; the polygons are exact and flat.
    const path = new Path2D();
    markPath(path, s, tx, ty);
    p.fillStyle = rgba(pal.fill, pal.fillA);
    p.fill(path, "evenodd");
    // A hairline keeps the edge definite rather than letting it dissolve.
    p.strokeStyle = rgba(pal.edge, pal.edgeA);
    /* Scale-proportional, clamped. An absolute 1.1*dpr hairline read ~2.2x
       heavier once the mark stopped being drawn oversized. */
    p.lineWidth = Math.max(1.25 * dpr, Math.min(3 * dpr, s * 3.2));
    p.lineJoin = "round";
    p.stroke(path);

    /* The `destination-in` alpha ramp that used to fade the plate toward the
       text column is GONE (2026-09-04). It faded the P but never the beam —
       the beam is stroked onto `ctx`, not onto the plate — so the light read as
       detached from a mark that was not there. Geometry now does the separation
       the ramp was doing: the stage never overlaps the headline. Removing it
       also drops one full-canvas gradient fill and one composite pass from
       every build(). */

    // Outline in device pixels, for the beam.
    outline = [];
    for (let i = 0; i < MARK_BODY.length; i += 2) {
      outline.push([MARK_BODY[i] * s + tx, MARK_BODY[i + 1] * s + ty]);
    }
    // Close the loop. Without this the closing edge — the top bar of the P —
    // is not part of the arc-length, so when the beam runs off the last vertex
    // it jumps straight back to the first instead of crossing that edge.
    outline.push([outline[0][0], outline[0][1]]);
    cumulative = [0];
    total = 0;
    for (let i = 1; i < outline.length; i++) {
      total += Math.hypot(outline[i][0] - outline[i - 1][0], outline[i][1] - outline[i - 1][1]);
      cumulative.push(total);
    }
    // Park point: the rightmost vertex, i.e. deepest into the released band.
    parkDist = 0;
    for (let i = 0, best = -Infinity; i < outline.length; i++) {
      if (outline[i][0] > best) { best = outline[i][0]; parkDist = cumulative[i]; }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(plate, 0, 0);
    dirty = null;   // the canvas is clean plate again
  }

  const at = (d: number): [number, number] => {
    let lo = 0, hi = cumulative.length - 1;
    while (lo < hi - 1) { const mid = (lo + hi) >> 1; if (cumulative[mid] <= d) lo = mid; else hi = mid; }
    const seg = cumulative[hi] - cumulative[lo] || 1;
    const t = (d - cumulative[lo]) / seg;
    return [outline[lo][0] + (outline[hi][0] - outline[lo][0]) * t,
            outline[lo][1] + (outline[hi][1] - outline[lo][1]) * t];
  };

  /** The beam: a short run of the outline, brightest at its head, faded at
   *  both ends. It is no longer clipped — the mark is fitted into a stage that
   *  is already clear of the wordmark, so the whole lap is on-canvas and the
   *  light never reaches the type. */
  function drawBeam(now: number) {
    if (!plate || !total) return;

    const P = period();
    const phase = ((now - started) % P) / P;
    const head = phase * total;
    const len = total * 0.085;
    const steps = narrow ? BEAM_STEPS_NARROW : BEAM_STEPS;
    /* Half the widest stroke, plus the round cap, plus a pixel of slack. This
       MUST track the `widthGain` used when stroking below: the beam's widest
       lineWidth is (0.9 + 1.1) * widthGain * dpr, and a round cap extends half
       that beyond each endpoint. Under-padding here does not merely clip — the
       restore blit misses the stroke's outer edge, so every frame leaves a
       sliver behind and the ghost accumulates to near-opaque coloured banding.
       Kept deliberately generous; the dirty area is ~1.4% of the canvas even
       so. */
    const widthGain = narrow ? WIDTH_GAIN_NARROW : WIDTH_GAIN_WIDE;
    const widestStroke = 2.0 * widthGain * dpr;
    const pad = widestStroke + 2 * dpr + 2;

    // Walk the beam first and keep its bounding box, so the repaint below can
    // be confined to the pixels this frame and the last one actually touch.
    const segs: Array<[number, number, number, number, number]> = [];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps, t1 = (i + 1) / steps;
      const a = (head - len * (1 - t0) + total) % total;
      const b = (head - len * (1 - t1) + total) % total;
      const p0 = at(a), p1 = at(b);
      /* The left guard (`W * 0.46 * dpr`) is gone with the ramp. It existed to
         keep the beam out of the text column; the mark is no longer in the text
         column. Below ~900px it was the second source of the dark gaps in the
         lap — at 390 it removed roughly a third of the outline. */
      const fall = Math.sin(Math.PI * t1);       // dark -> bright -> dark
      segs.push([p0[0], p0[1], p1[0], p1[1], fall]);
      x0 = Math.min(x0, p0[0], p1[0]); x1 = Math.max(x1, p0[0], p1[0]);
      y0 = Math.min(y0, p0[1], p1[1]); y1 = Math.max(y1, p0[1], p1[1]);
    }
    const box: [number, number, number, number] | null = segs.length
      ? [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2]
      : null;

    // Restore the plate over the union of the old beam's rectangle and the new
    // one. clearRect first: drawImage composites, it does not replace. Without
    // this, every frame stacks another copy of the semi-transparent plate and
    // another beam stroke — the ghost accumulates to near-opaque and the beam
    // smears into coloured vertical banding.
    const zone = union(dirty, box);
    if (zone) {
      const [rx, ry, rw, rh] = zone;
      ctx.clearRect(rx, ry, rw, rh);
      // src and dst are the same size at integer device pixels, so this is a
      // straight blit with no resampling.
      ctx.drawImage(plate, rx, ry, rw, rh, rx, ry, rw, rh);
    }
    dirty = box;

    /* Beam weight. The old values (alpha 0.55 * fall^2, width 0.9 + 1.1 * fall)
       measured 1.03:1 against the page on a light-theme phone and 1.70:1 on
       dark — i.e. the light was moving and nobody could see it, which is the
       whole thing the owner asked for. The `.ps-hero` contrast veil at
       globals.css:1017-1031 sits OVER this canvas at a flat 0.55 and is a
       deliberate, documented trade-off (globals.css:1033-1045) protecting the
       headline, so it stays; the only honest lever is the beam's own weight
       underneath it.
       Narrow viewports get the bigger boost: the mark is drawn at 0.70 scale
       there, so the same stroke covers fewer CSS pixels and reads thinner, and
       a phone is the case that was worst. Light theme gets a further push
       because the veil costs it more headroom than it costs dark.
       Widening the stroke is doing more of the work than raising alpha — on a
       3x screen a bright hairline still reads as a hairline. */
    const alphaGain = isLight() ? ALPHA_GAIN_LIGHT : ALPHA_GAIN_DARK;

    ctx.save();
    ctx.lineCap = "round";
    for (const [ax, ay, bx, by, fall] of segs) {
      ctx.strokeStyle = rgba(accent, Math.min(1, 0.55 * alphaGain * fall * fall));
      ctx.lineWidth = (0.9 + 1.1 * fall) * widthGain * dpr;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    }
    ctx.restore();
  }

  /** Union of two device-pixel rects, snapped out to whole pixels and clamped
   *  to the canvas. Either side may be absent. */
  function union(
    a: [number, number, number, number] | null,
    b: [number, number, number, number] | null,
  ): [number, number, number, number] | null {
    const r = !a ? b : !b ? a : [
      Math.min(a[0], b[0]),
      Math.min(a[1], b[1]),
      Math.max(a[0] + a[2], b[0] + b[2]) - Math.min(a[0], b[0]),
      Math.max(a[1] + a[3], b[1] + b[3]) - Math.min(a[1], b[1]),
    ] as [number, number, number, number];
    if (!r) return null;
    const lx = Math.max(0, Math.floor(r[0]));
    const ly = Math.max(0, Math.floor(r[1]));
    const rx = Math.min(canvas.width, Math.ceil(r[0] + r[2]));
    const ry = Math.min(canvas.height, Math.ceil(r[1] + r[3]));
    return rx > lx && ry > ly ? [lx, ly, rx - lx, ry - ly] : null;
  }

  function frame(now: number) {
    if (!started) started = now;
    // Narrow viewports paint at ~30fps. rAF still drives the loop so the
    // browser keeps throttling us in background tabs; we just skip the work.
    if (!narrow || now - lastPaint >= FRAME_GAP_MS_NARROW) {
      lastPaint = now;
      drawBeam(now);
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    /* `destroyed` is load-bearing, not defensive. io.disconnect() does not reset
       onStage, so after unmount a still-pending fonts.ready.then(rebuild) — or
       the entrance animationend — reached start() with onStage still true and
       started an rAF loop on a detached canvas that nothing could ever cancel:
       one leaked loop per client-side visit to the homepage. */
    if (destroyed || raf || still() || document.hidden) return;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  function rebuild() {
    if (destroyed) return;   // a late fonts.ready / animationend must not repaint
    stop();
    build();               // sets `narrow`, which parked() and the loop read
    started = 0;
    lastPaint = 0;
    if (still()) {
      drawBeam(parked());  // a still frame, beam parked on the edge
    } else if (onStage) {
      start();
    }
  }

  build();
  if (still()) drawBeam(parked());

  // The hero leaves a phone's viewport within one flick of the thumb, so this
  // is the mitigation that matters most on mobile: no beam, no loop, off stage.
  const io = new IntersectionObserver((entries) => {
    onStage = entries[0]?.isIntersecting ?? true;
    if (onStage) start(); else stop();
  }, { threshold: 0 });
  io.observe(container);

  // rAF is already throttled in a hidden tab, but cancel the handle outright
  // so a backgrounded phone holds no pending frame at all.
  const onVisibility = () => { if (document.hidden) stop(); else if (onStage) start(); };
  document.addEventListener("visibilitychange", onVisibility);

  // Repaint on theme change even while the loop is stopped.
  const mo = new MutationObserver(rebuild);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  /* Rebuild on WIDTH changes only. The stage, the mark's scale and the backing
     store are all driven by width; a height-only change (an iOS toolbar moving,
     a desktop window dragged shorter) does not need either canvas reallocated.
     Height is still re-read on the next real rebuild. Belt-and-braces with the
     svh change in globals.css: that stops the hero's box tracking the toolbar,
     this stops the canvas reacting even if some other height source moves.
     `lastW` is seeded from W AFTER the first build() above, because build() is
     what sets W. */
  let lastW = W;
  let resizeTimer = 0;
  const onResize = () => {
    if (Math.round(container.getBoundingClientRect().width) === lastW) return;
    clearTimeout(resizeTimer);
    // rebuild() FIRST: build() is the only thing that writes W, so reading
    // lastW before it left lastW permanently stale and the width guard dead
    // after a single width change.
    resizeTimer = window.setTimeout(() => { rebuild(); lastW = W; }, 150);
  };
  window.addEventListener("resize", onResize);

  // The stage is measured from the headline's ink, which moves when the webfont
  // swaps in. Without this the mark is laid out against the fallback metrics.
  if (document.fonts?.ready) document.fonts.ready.then(() => rebuild());

  /* Same problem, different mover: hero-entrance.css translates .ps-hero-ctas
     while the entrance plays, and stage() candidate B is anchored to that
     element's rect — so a build() that runs mid-entrance reads ctasBottom too
     low and places the mark under it. Measured 2026-09-04 at 390x844:
     mark box [102,608,287,772] (185x164) mid-entrance against [99,592,290,760]
     (191x168) at rest; a forced rebuild converged to the latter, so the
     geometry was right and only the timing was wrong. Rebuild once when the
     CTAs settle. Only stage B is affected (390 and the 768-940 band); stage A
     is anchored to the headline, which does not move. No-op under
     prefers-reduced-motion, where no animation runs and no event ever fires.
     stage() reads BOTH .ps-hero-ctas (for `ctasBottom`) and .ps-hero-cue__btn
     (for `cueTop`), and the entrance translates the cue too — by 12px, finishing
     ~340ms AFTER the CTAs — so listening only for the CTAs left `cueTop`
     readable mid-flight. Rebuild on either; rebuild() is idempotent and costs
     1-2ms, so firing twice is cheap insurance and firing once is correct.
     NOTE: under prefers-reduced-motion NO animationend ever fires. That path is
     correct without this listener — nothing is transformed there, so the very
     first build() already measures both elements at rest — and this listener
     must never become the only thing producing a correct build. Verified. */
  /* .ps-hero-line is in this list because layout() now measures the HEADLINE's
     ink, and hero-entrance.css translates those lines by 24px while the entrance
     plays. The other two remain harmless no-ops. */
  const ENTRANCE_ANCHORS = ["ps-hero-line", "ps-hero-ctas", "ps-hero-cue__btn"];
  const onEntranceEnd = (e: AnimationEvent) => {
    if (!e.animationName.startsWith("ps-hero-rise")) return;
    const el = e.target as Element;
    if (!ENTRANCE_ANCHORS.some((c) => el.classList?.contains(c))) return;
    rebuild();
  };
  container.addEventListener("animationend", onEntranceEnd);

  return {
    destroy() {
      destroyed = true;
      onStage = false;      // io.disconnect() does NOT do this, and start() reads it
      stop(); io.disconnect(); mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("animationend", onEntranceEnd);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      canvas.remove();
    },
  };
}
