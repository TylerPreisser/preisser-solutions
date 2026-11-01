"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import type { SceneBeat as SceneBeatData } from "@/data/showcase/types";
import { CLEAN_TOPS, NATIVE_SIZE, PHONE_H, SCENE_CAM, SCENES, type Shot } from "@/components/showcase/scenes";
import { Chrome, useBox, useSteps, type BeatProps } from "./shared";

/**
 * A product picture drawn by a scene (src/components/showcase/scenes): HG Oil's
 * vendor insurance and saltwater close, FarmBooks reading a bill, NWKS's bed
 * board. Not the MarCommand portal, so the chrome names the client, never
 * "MarCommand". The scene plays once while active and holds its final frame;
 * reduced motion shows the final frame. Its step captions go to the window's
 * caption slot through `onCaption`, and the picture draws none of its own, so
 * a reader never sees the line twice (reduced motion: the final step's line).
 *
 * A camera (SCENE_CAM) frames the part of the picture each step is about: on a
 * phone it moves down a picture scaled to the sheet's width; on desk it pushes
 * in where small type carries the point (the HG close's tie-out).
 */
export function SceneBeat({ client, beat, variant, active, fill, reduced, quiet, onCaption }: BeatProps<SceneBeatData>) {
  const Scene = SCENES[beat.scene];
  const n = variant === "phone" ? { w: NATIVE_SIZE.phone.w, h: PHONE_H[beat.scene] } : NATIVE_SIZE.desk;
  const track = SCENE_CAM[beat.scene][variant] ?? [];
  const last = track.length ? track[track.length - 1] : null;
  const shot = useSteps<Shot | null>(
    active && track.length > 0,
    reduced,
    track.map((s) => [s.at, s] as const),
    track[0] ?? null,
    last,
  );
  return (
    <figure
      className={`sc-frame sc-frame--portal sc-frame--${variant}${fill ? " sc-frame--fill" : ""}`}
      data-demo-stage={`${client.slug}-scene`}
      aria-hidden={quiet || undefined}
    >
      <Chrome label={variant === "desk" ? client.short : undefined} badge />
      <p className="ps-visually-hidden" data-demo-narration>
        {beat.narration}
      </p>
      <div className="sc-frame__portal" style={fill ? undefined : { aspectRatio: `${n.w} / ${n.h}` }}>
        <Camera w={n.w} h={n.h} shot={shot} cover={variant === "phone"} live={active} clean={variant === "phone" ? CLEAN_TOPS[beat.scene] : undefined}>
          <Scene layout={variant} playing={active && !reduced} loop={false} label={false} caption={false} onCaption={active ? onCaption : undefined} />
        </Camera>
      </div>
    </figure>
  );
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * The picture at its native size, scaled as ONE transform (never font by font,
 * critique r1 A2). `cover`: the phone picture fills the box's width and is
 * never letterboxed; with no shot it shows from the top. A shot is a native
 * rect: the camera scales in until it fills the box (never below the resting
 * scale) and centres on it; a shot taller than the box shows from its top;
 * a `top` shot starts on one of the scene's clean lines (CLEAN_TOPS).
 */
function Camera({
  w,
  h,
  shot,
  cover,
  live,
  clean,
  children,
}: {
  w: number;
  h: number;
  shot: Shot | null;
  cover: boolean;
  live: boolean;
  clean?: readonly number[];
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const box = useBox(ref);
  const W = box.w || (cover ? 330 : 688);
  const H = box.h || W * (h / w);
  const rest = cover ? Math.max(W / w, H / h) : Math.min(W / w, H / h);
  let s = rest;
  let cx = w / 2;
  let cy = cover ? H / (2 * s) : h / 2;
  if (shot) {
    const sw = shot.w ?? w;
    const sx = shot.x ?? 0;
    s = Math.max(rest, Math.min(W / sw, H / shot.h));
    cx = sx + sw / 2;
    cy = shot.h * s > H + 0.5 ? shot.y + H / (2 * s) : shot.y + shot.h / 2;
    if (shot.top) {
      // Start on a clean line: the lowest one that still shows the rect's bottom, else the lowest that fits.
      const vis = H / s;
      const hi = Math.min(shot.y, h - vis);
      const lo = Math.max(0, shot.y + shot.h - vis);
      const tops = [...(clean ?? [shot.y])].sort((a, b) => b - a);
      // A clean line that loses no more than 60 native px of the rect's bottom, else the rect's own bottom edge.
      const below = tops.find((c) => c <= hi + 0.5);
      const start = tops.find((c) => c >= lo - 0.5 && c <= hi + 0.5) ?? (below !== undefined && (lo > hi || below >= lo - 60) ? below : hi);
      cy = start + vis / 2;
    }
  }
  const tx = w * s <= W ? (W - w * s) / 2 : clamp(W / 2 - cx * s, W - w * s, 0);
  const ty = h * s <= H ? (H - h * s) / 2 : clamp(H / 2 - cy * s, H - h * s, 0);
  const cut = useEdgeCut(cover, live, fitRef, h, s, ty, H);
  return (
    <div
      ref={ref}
      className="pt-fitbox"
      data-cam={shot ? `${shot.at}` : "rest"}
      style={cut[0] || cut[1] ? { clipPath: `inset(${cut[0]}px 0 ${cut[1]}px 0)` } : undefined}
    >
      <div
        ref={fitRef}
        className="pt-fit"
        style={{ width: w, height: h, transform: `translate(${tx}px, ${ty}px) scale(${s})`, "--pt-move-ms": `${shot?.ms ?? 900}ms` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Phone only: no line of text is ever cut in half by the picture's top or
 * bottom edge (critique r8 N1). The camera rests on a clean line where the
 * scene lists one (CLEAN_TOPS); whatever a resting edge would still slice
 * (a card that pops in later, an engine's taller line box, a shorter phone)
 * is clipped off here instead, so the frame ends on the last whole line.
 * Measured in native px against where the camera is GOING (s, ty), so the
 * clip is already right while the camera moves, and re-measured while the
 * scene plays because its cards come and go.
 */
function useEdgeCut(
  on: boolean,
  live: boolean,
  fitRef: RefObject<HTMLDivElement | null>,
  h: number,
  s: number,
  ty: number,
  H: number,
): readonly [number, number] {
  const [cut, setCut] = useState<readonly [number, number]>([0, 0]);
  useEffect(() => {
    const fit = fitRef.current;
    if (!on || !fit || !(s > 0) || !(H > 0)) {
      setCut((c) => (c[0] || c[1] ? [0, 0] : c));
      return;
    }
    const measure = () => {
      const fr = fit.getBoundingClientRect();
      const cur = fr.height / h;
      if (!(cur > 0)) return;
      const start = -ty / s;
      const end = start + H / s;
      const lines: [number, number][] = [];
      const walk = document.createTreeWalker(fit, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let t = walk.nextNode(); t; t = walk.nextNode()) {
        if (!t.textContent || !t.textContent.trim()) continue;
        const el = t.parentElement;
        if (!el || !visible(el, fit)) continue;
        range.selectNodeContents(t);
        for (const q of range.getClientRects()) {
          if (q.height < 2 || q.width < 1) continue;
          lines.push([(q.top - fr.top) / cur, (q.bottom - fr.top) / cur]);
        }
      }
      let b = end;
      for (let i = 0; i < 12; i++) {
        const crossing = lines.filter(([t0, t1]) => t0 + 0.5 < b && t1 - 0.5 > b);
        if (!crossing.length) break;
        b = Math.min(...crossing.map(([t0]) => t0)) - 0.5;
      }
      let a = start;
      for (let i = 0; i < 12; i++) {
        const crossing = lines.filter(([t0, t1]) => t0 + 0.5 < a && t1 - 0.5 > a);
        if (!crossing.length) break;
        a = Math.max(...crossing.map(([, t1]) => t1)) + 0.5;
      }
      const next = [Math.max(0, Math.round((a - start) * s)), Math.max(0, Math.round((end - b) * s))] as const;
      setCut((c) => (c[0] === next[0] && c[1] === next[1] ? c : next));
    };
    measure();
    if (!live) {
      // Reduced motion / a still frame: once more after the fonts settle.
      const t = window.setTimeout(measure, 400);
      return () => window.clearTimeout(t);
    }
    const iv = window.setInterval(measure, 160);
    return () => window.clearInterval(iv);
  }, [on, live, fitRef, h, s, ty, H]);
  return cut;
}

/** Drawn at all: not display:none, not hidden, not faded below 15% on the way up to the picture. */
function visible(el: Element, root: Element) {
  for (let e: Element | null = el; e && e !== root; e = e.parentElement) {
    const cs = getComputedStyle(e);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.15) return false;
  }
  return true;
}
