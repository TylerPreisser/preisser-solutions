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
const DPR_CAP = 1.5;
const BEAM_PERIOD_MS = 30000;     // one full lap of the outline

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

  const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
  /** Below this width the mark is painted once and never animated. */
  const still = () => reduced || window.innerWidth < 768;

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
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    const L = W < 768 ? LAYOUT.narrow : LAYOUT.wide;
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
    cumulative = [0];
    total = 0;
    for (let i = 1; i < outline.length; i++) {
      total += Math.hypot(outline[i][0] - outline[i - 1][0], outline[i][1] - outline[i - 1][1]);
      cumulative.push(total);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(plate, 0, 0);
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
    // clearRect first: drawImage composites, it does not replace. Without
    // this, every frame stacks another copy of the semi-transparent plate and
    // another beam stroke — the ghost accumulates to near-opaque and the beam
    // smears into coloured vertical banding.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(plate, 0, 0);

    const phase = ((now - started) % BEAM_PERIOD_MS) / BEAM_PERIOD_MS;
    const head = phase * total;
    const len = total * 0.085;
    const steps = 72;
    const guard = W * 0.46 * dpr;      // never left of this

    const accent = parseRGB(getComputedStyle(container).getPropertyValue("--color-primary")) || [21, 144, 255];

    ctx.save();
    ctx.lineCap = "round";
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps, t1 = (i + 1) / steps;
      const a = (head - len * (1 - t0) + total) % total;
      const b = (head - len * (1 - t1) + total) % total;
      if (b < a) continue;                       // skip the wrap seam
      const p0 = at(a), p1 = at(b);
      if (p0[0] < guard || p1[0] < guard) continue;
      const fall = Math.sin(Math.PI * t1);       // dark -> bright -> dark
      ctx.strokeStyle = rgba(accent, 0.55 * fall * fall);
      ctx.lineWidth = (0.9 + 1.1 * fall) * dpr;
      ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke();
    }
    ctx.restore();
  }

  function frame(now: number) {
    if (!started) started = now;
    drawBeam(now);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (raf || still()) return;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  function rebuild() {
    stop();
    build();
    if (still()) {
      // a still frame with the beam parked somewhere flattering on the edge
      started = 0;
      drawBeam(BEAM_PERIOD_MS * 0.34);
    } else if (onStage) {
      started = 0;
      start();
    }
  }

  build();
  if (still()) drawBeam(BEAM_PERIOD_MS * 0.34);

  const io = new IntersectionObserver((entries) => {
    onStage = entries[0]?.isIntersecting ?? true;
    if (onStage) start(); else stop();
  }, { threshold: 0 });
  io.observe(container);

  // Repaint on theme change even while the loop is stopped.
  const mo = new MutationObserver(rebuild);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  let resizeTimer = 0;
  const onResize = () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(rebuild, 150); };
  window.addEventListener("resize", onResize);

  return {
    destroy() {
      stop(); io.disconnect(); mo.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      canvas.remove();
    },
  };
}
