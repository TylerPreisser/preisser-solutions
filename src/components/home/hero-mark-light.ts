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
const ALPHA_GAIN_LIGHT = 1.85;
const ALPHA_GAIN_DARK = 1.5;
const WIDTH_GAIN_NARROW = 1.9;
const WIDTH_GAIN_WIDE = 1.5;
const BEAM_STEPS = 72;
const BEAM_STEPS_NARROW = 44;     // the beam covers fewer css px on a phone

/** How tall the mark is drawn, as a multiple of the hero's height, and where
 *  its centre sits as a fraction of the viewport. Bigger than 1 means it is
 *  cropped by the frame — which is the point. */
const LAYOUT = {
  wide:   { scale: 0.92, cx: 0.80, cy: 0.50 },
  narrow: { scale: 0.70, cx: 0.80, cy: 0.62 },
};

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
    ? { fill: [140, 160, 190] as RGB, fillA: 0.13, edge: [104, 128, 162] as RGB, edgeA: 0.26 }
    : { fill: [150, 186, 232] as RGB, fillA: 0.055, edge: [150, 186, 232] as RGB, edgeA: 0.16 };
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
  let plate: HTMLCanvasElement | null = null;
  let outline: Array<[number, number]> = [];
  let cumulative: number[] = [];
  let total = 0;
  let W = 0, H = 0, dpr = 1;
  let onStage = true;
  let started = 0;
  let narrow = false;
  let lastPaint = 0;
  /** The rectangle the previous frame's beam was stroked into, in device
   *  pixels. Restoring only this plus the new one is what keeps the loop off
   *  the full viewport. Null means "the whole canvas is clean plate". */
  let dirty: [number, number, number, number] | null = null;

  const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
  /** Only a stated motion preference parks the beam. Narrow viewports animate;
   *  they animate cheaply. See the per-frame budget in drawBeam. */
  const still = () => reduced;
  const period = () => (narrow ? BEAM_PERIOD_MS_NARROW : BEAM_PERIOD_MS);
  /** Phase 0.34 of a lap — the beam parked somewhere flattering on the edge. */
  const parked = () => period() * 0.34;

  function markPath(p: Path2D, s: number, tx: number, ty: number) {
    for (const poly of [MARK_BODY, MARK_WEDGE]) {
      p.moveTo(poly[0] * s + tx, poly[1] * s + ty);
      for (let i = 2; i < poly.length; i += 2) p.lineTo(poly[i] * s + tx, poly[i + 1] * s + ty);
      p.closePath();
    }
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

    const L = narrow ? LAYOUT.narrow : LAYOUT.wide;
    const s = (H * L.scale) / BOX * dpr;
    const tx = W * L.cx * dpr - (BOX * s) / 2;
    const ty = H * L.cy * dpr - (BOX * s) / 2;

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
    p.lineWidth = Math.max(1, 1.1 * dpr);
    p.lineJoin = "round";
    p.stroke(path);

    // Fade toward the text column. A ramp, not a dissolve: every edge on the
    // right keeps its definition, and nothing survives on the left.
    const ramp = p.createLinearGradient(0, 0, canvas.width, 0);
    ramp.addColorStop(0, "rgba(0,0,0,0)");
    ramp.addColorStop(0.40, "rgba(0,0,0,0)");
    ramp.addColorStop(0.68, "rgba(0,0,0,0.55)");
    ramp.addColorStop(1, "rgba(0,0,0,1)");
    p.globalCompositeOperation = "destination-in";
    p.fillStyle = ramp;
    p.fillRect(0, 0, canvas.width, canvas.height);
    p.globalCompositeOperation = "source-over";

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
   *  both ends. It is clipped to the right of the text column so the brightest
   *  thing on the canvas can never reach the wordmark, which has very little
   *  contrast margin to give on the light theme. */
  function drawBeam(now: number) {
    if (!plate || !total) return;

    const P = period();
    const phase = ((now - started) % P) / P;
    const head = phase * total;
    const len = total * 0.085;
    const steps = narrow ? BEAM_STEPS_NARROW : BEAM_STEPS;
    const guard = W * 0.46 * dpr;      // never left of this
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

    const accent = parseRGB(getComputedStyle(container).getPropertyValue("--color-primary")) || [21, 144, 255];

    // Walk the beam first and keep its bounding box, so the repaint below can
    // be confined to the pixels this frame and the last one actually touch.
    const segs: Array<[number, number, number, number, number]> = [];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps, t1 = (i + 1) / steps;
      const a = (head - len * (1 - t0) + total) % total;
      const b = (head - len * (1 - t1) + total) % total;
      const p0 = at(a), p1 = at(b);
      if (p0[0] < guard || p1[0] < guard) continue;
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
    if (raf || still() || document.hidden) return;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  function rebuild() {
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

  let resizeTimer = 0;
  const onResize = () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(rebuild, 150); };
  window.addEventListener("resize", onResize);

  return {
    destroy() {
      stop(); io.disconnect(); mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      canvas.remove();
    },
  };
}
