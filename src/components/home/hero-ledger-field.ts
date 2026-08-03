/**
 * hero-ledger-field.ts — the hero background.
 *
 * WHAT IT IS
 * A ledger that files itself. Records arrive off-grid — scattered, tilted,
 * faint — and snap onto a strict column/row lattice. The moment a record lands
 * it flashes the brand blue, then cools to a quiet neutral. When every record
 * in a row has landed, that row's rule draws in. After the field settles, new
 * records keep trickling in a few at a time and get filed the same way, so the
 * motif never stops but never shouts.
 *
 * WHY THIS AND NOT A WAVE MESH
 * This is the product, drawn literally: scattered records become one system.
 * Columns are typed the way a real record is — wide name fields on the left,
 * right-aligned numeric fields on the right — so it reads as a table of
 * records, not as decoration. Nobody else's hero does this, because nobody
 * else's hero is about filing.
 *
 * CONSTRAINTS THIS FILE HONOURS
 * - Canvas 2D only. No new dependencies.
 * - `prefers-reduced-motion` and every viewport under 768px render ONE static
 *   frame and never start a rAF loop. The still frame is the deliberate
 *   composition: settled at the top-left, still arriving at the bottom-right.
 * - The rAF loop is suspended by an IntersectionObserver when the hero
 *   scrolls out of view.
 * - Theme is read live from `<html data-theme>` and watched with a
 *   MutationObserver, so a theme toggle repaints immediately in both modes.
 * - The canvas paints TRANSPARENT — the page colour comes from `.ps-hero`, and
 *   the contrast scrim over the wordmark is `.ps-hero-overlay`. Both were once
 *   full-viewport gradient fills inside this loop; measured at 2880x1800 they
 *   alone cost the difference between a 16.7ms and an 8.3ms frame. As CSS they
 *   cost nothing per frame and the contrast guarantee becomes declarative.
 */

type Palette = {
  rule: string;
  guide: string;
  cell: string;
  flash: string;
};

const DARK: Palette = {
  rule: "rgba(150,182,216,0.24)",
  guide: "rgba(150,182,216,0.06)",
  cell: "rgba(196,218,242,0.13)",
  flash: "rgba(13,149,232,0.6)",
};

const LIGHT: Palette = {
  rule: "rgba(15,42,74,0.20)",
  guide: "rgba(15,42,74,0.06)",
  cell: "rgba(15,42,74,0.14)",
  flash: "rgba(11,114,179,0.55)",
};

/** The clock position used for the static (reduced-motion / mobile) frame.
 *  Chosen so the intro wave has resolved the top-left of the field while the
 *  bottom-right is still arriving — a still with direction in it. */
const STATIC_T = 2.55;

const ROW_GAP = 32;
const CELL_H = 5;
const SETTLE_DUR = 1.05;
const FLASH_DECAY = 0.9;

type Cell = {
  row: number;
  targetX: number;
  targetY: number;
  w: number;
  startX: number;
  startY: number;
  startRot: number;
  delay: number;
  /** progress 0..1, recomputed each frame */
  p: number;
};

/** Deterministic PRNG so the lattice is stable across resizes and themes —
 *  a field that reshuffles itself on every resize reads as noise. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sharp mechanical snap — fast approach, no overshoot. */
function easeOutExpo(x: number): number {
  return x >= 1 ? 1 : 1 - Math.pow(2, -9 * x);
}

function columnCount(w: number): number {
  if (w < 560) return 3;
  if (w < 1000) return 4;
  if (w < 1500) return 5;
  return 6;
}

export type LedgerField = { destroy: () => void };

export function mountLedgerField(container: HTMLElement): LedgerField {
  const canvas = document.createElement("canvas");
  canvas.id = "ps-hero-canvas";
  canvas.setAttribute("aria-hidden", "true");
  container.prepend(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    // Never drop silently: say so, and leave the plain background behind.
    console.warn("[hero] 2D canvas unavailable — hero background not drawn");
    canvas.remove();
    return { destroy: () => {} };
  }
  const c2d = ctx;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let isLight = document.documentElement.getAttribute("data-theme") === "light";
  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  let colX: number[] = [];
  let colW = 0;
  let cells: Cell[] = [];
  let rowFill: number[] = [];
  /** Every Nth rule is drawn at full strength — the section break a printed
   *  statement has. It is what stops the field reading as a skeleton loader. */
  let groupSize = 5;
  /** Device pixels per CSS pixel, so hairlines can be snapped to the device
   *  grid instead of straddling it. */
  let dprScale = 1;
  let t = 0;
  let lastTs = 0;
  let animId = 0;
  let onScreen = true;
  let staticFrame = true;
  let nextBatchAt = 0;

  const hasRoundRect = typeof c2d.roundRect === "function";

  function scatterInto(cell: Cell, rnd: () => number, at: number) {
    // Records arrive from the right and above — the direction paperwork comes
    // from into a system that files it leftward onto the grid.
    cell.startX = cell.targetX + (18 + rnd() * 90);
    cell.startY = cell.targetY + (rnd() - 0.5) * 46;
    cell.startRot = (rnd() - 0.5) * 0.28;
    cell.delay = at;
    cell.p = 0;
  }

  function build() {
    const rect = container.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    staticFrame = prefersReduced || w < 768;

    // 1.5 rather than the usual 2: this is a soft decorative field with no
    // text in it, and the backing store area scales with the square of the
    // ratio — 2x costs 78% more pixels per clear for no visible gain.
    dprScale = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(w * dprScale);
    canvas.height = Math.round(h * dprScale);
    c2d.setTransform(dprScale, 0, 0, dprScale, 0, 0);

    cols = columnCount(w);
    rows = Math.ceil(h / ROW_GAP) + 1;

    const pad = w < 768 ? 20 : 48;
    const gutter = w < 768 ? 14 : 26;
    const usable = w - pad * 2;
    colW = (usable - gutter * (cols - 1)) / cols;
    colX = Array.from({ length: cols }, (_, i) => pad + i * (colW + gutter));

    // Column "types": the first column is a wide identifier, the last two are
    // right-aligned numerics. That asymmetry is what makes it read as records.
    const rnd = mulberry32(0x5eed ^ (cols * 131) ^ rows);
    groupSize = 4 + Math.floor(rnd() * 3);
    const fills = Array.from({ length: cols }, (_, i) => {
      if (i === 0) return 0.88;
      if (i >= cols - 2) return 0.5;
      return 0.6 + rnd() * 0.28;
    });

    cells = [];
    rowFill = new Array(rows).fill(0);

    for (let r = 0; r < rows; r++) {
      for (let cIdx = 0; cIdx < cols; cIdx++) {
        // Gaps keep it from reading as a solid block of bars.
        if (rnd() < 0.16) continue;
        const width = Math.max(
          10,
          colW * fills[cIdx] * (0.62 + rnd() * 0.5)
        );
        const clamped = Math.min(width, colW);
        const rightAligned = cIdx >= cols - 2;
        const targetX = rightAligned
          ? colX[cIdx] + colW - clamped
          : colX[cIdx];
        const cell: Cell = {
          row: r,
          targetX,
          targetY: Math.round(r * ROW_GAP + ROW_GAP * 0.5) + 0.5,
          w: clamped,
          startX: 0,
          startY: 0,
          startRot: 0,
          delay: 0,
          p: 0,
        };
        // The intro is a diagonal wave: order propagates top-left to
        // bottom-right rather than everything landing at once.
        scatterInto(cell, rnd, r * 0.045 + cIdx * 0.09 + rnd() * 0.4);
        cells.push(cell);
        rowFill[r]++;
      }
    }

    t = staticFrame ? STATIC_T : 0;
    nextBatchAt = 6;
  }

  function bar(x: number, y: number, width: number) {
    if (hasRoundRect) {
      c2d.beginPath();
      c2d.roundRect(x, y - CELL_H / 2, width, CELL_H, CELL_H / 2);
      c2d.fill();
    } else {
      c2d.fillRect(x, y - CELL_H / 2, width, CELL_H);
    }
  }

  function draw() {
    const pal = isLight ? LIGHT : DARK;

    // Transparent, not filled: `.ps-hero` supplies the page colour, so the
    // theme's base never has to be restated here.
    c2d.clearRect(0, 0, w, h);

    // Pass 1 — advance every cell and tally how much of each row has landed.
    const rowSettled = new Array(rows).fill(0);
    let landedTotal = 0;
    for (const cell of cells) {
      const raw = (t - cell.delay) / SETTLE_DUR;
      cell.p = raw <= 0 ? 0 : raw >= 1 ? 1 : easeOutExpo(raw);
      rowSettled[cell.row] += cell.p;
      if (cell.p >= 1) landedTotal++;
    }
    const fieldSettled = cells.length ? landedTotal / cells.length : 0;

    // Pass 2 — the lattice itself. Column guides fade in with the whole field;
    // each row rule fades in with that row's own completeness.
    // One device pixel expressed in CSS units — hairlines are snapped to it so
    // they land on the device grid instead of antialiasing to nothing.
    const px = 1 / dprScale;
    const snap = (v: number) => Math.round(v * dprScale) / dprScale;

    c2d.fillStyle = pal.guide;
    if (fieldSettled > 0.01) {
      c2d.globalAlpha = fieldSettled;
      for (let i = 0; i < cols; i++) {
        c2d.fillRect(snap(colX[i]), 0, px, h);
      }
      c2d.globalAlpha = 1;
    }

    c2d.fillStyle = pal.rule;
    for (let r = 0; r < rows; r++) {
      if (!rowFill[r]) continue;
      const a = rowSettled[r] / rowFill[r];
      if (a <= 0.02) continue;
      c2d.globalAlpha = a * ((r + 1) % groupSize === 0 ? 1 : 0.45);
      c2d.fillRect(0, snap((r + 1) * ROW_GAP), w, px);
    }
    c2d.globalAlpha = 1;

    // Pass 3 — the records.
    for (const cell of cells) {
      const p = cell.p;
      const x = cell.startX + (cell.targetX - cell.startX) * p;
      const y = cell.startY + (cell.targetY - cell.startY) * p;
      const rot = cell.startRot * (1 - p);

      c2d.fillStyle = pal.cell;
      c2d.globalAlpha = 0.28 + 0.72 * p;

      if (rot !== 0) {
        c2d.save();
        c2d.translate(x + cell.w / 2, y);
        c2d.rotate(rot);
        bar(-cell.w / 2, 0, cell.w);
        c2d.restore();
      } else {
        bar(x, y, cell.w);
      }

      // The landing flash: brand blue at the instant of settle, cooling off.
      if (p >= 1) {
        const since = t - (cell.delay + SETTLE_DUR);
        if (since >= 0 && since < FLASH_DECAY) {
          const f = 1 - since / FLASH_DECAY;
          c2d.globalAlpha = f * f;
          c2d.fillStyle = pal.flash;
          bar(cell.targetX, cell.targetY, cell.w);
        }
      }
    }
    c2d.globalAlpha = 1;
    // No scrim pass — `.ps-hero-overlay` owns it. See the header note.
  }

  /** After the field settles, a few new records keep arriving and getting
   *  filed. Small batches, long gaps — presence, not motion. */
  function trickle(now: number) {
    if (now < nextBatchAt || cells.length === 0) return;
    const rnd = mulberry32((now * 1000) | 0);
    const batch = 4 + Math.floor(rnd() * 5);
    for (let i = 0; i < batch; i++) {
      const cell = cells[Math.floor(rnd() * cells.length)];
      if (cell.p < 1) continue;
      scatterInto(cell, rnd, now + rnd() * 0.9);
    }
    nextBatchAt = now + 2.4 + rnd() * 2.6;
  }

  function loop(ts: number) {
    animId = requestAnimationFrame(loop);
    // Frame-rate independent, and clamped so a backgrounded tab does not
    // return and fast-forward the whole field.
    const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0.016;
    lastTs = ts;
    t += dt;
    trickle(t);
    draw();
  }

  function onResize() {
    build();
    draw();
    if (staticFrame) stop();
    else if (onScreen) start();
  }

  function start() {
    if (animId) return;
    lastTs = 0;
    animId = requestAnimationFrame(loop);
  }

  function stop() {
    if (!animId) return;
    cancelAnimationFrame(animId);
    animId = 0;
  }

  const themeObserver = new MutationObserver(() => {
    isLight = document.documentElement.getAttribute("data-theme") === "light";
    // The animated path repaints on its own next frame; a stopped loop (static
    // viewport, reduced motion, or hero scrolled away) has to be told, or the
    // toggle leaves the old palette on screen until the hero is scrolled back.
    if (!animId) draw();
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
      else if (!staticFrame) start();
    },
    { threshold: 0 }
  );
  io.observe(container);

  window.addEventListener("resize", onResize, { passive: true });

  build();
  draw();
  if (!staticFrame) start();

  return {
    destroy() {
      stop();
      window.removeEventListener("resize", onResize);
      io.disconnect();
      themeObserver.disconnect();
      canvas.remove();
    },
  };
}
