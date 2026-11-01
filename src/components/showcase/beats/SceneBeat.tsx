"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import type { SceneBeat as SceneBeatData } from "@/data/showcase/types";
import { NATIVE_SIZE, PHONE_H, SCENE_CAM, SCENES, type Shot } from "@/components/showcase/scenes";
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
        <Camera w={n.w} h={n.h} shot={shot} cover={variant === "phone"}>
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
 * scale) and centres on it; a shot taller than the box shows from its top.
 */
function Camera({ w, h, shot, cover, children }: { w: number; h: number; shot: Shot | null; cover: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
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
  }
  const tx = w * s <= W ? (W - w * s) / 2 : clamp(W / 2 - cx * s, W - w * s, 0);
  const ty = h * s <= H ? (H - h * s) / 2 : clamp(H / 2 - cy * s, H - h * s, 0);
  return (
    <div ref={ref} className="pt-fitbox" data-cam={shot ? `${shot.at}` : "rest"}>
      <div
        className="pt-fit"
        style={{ width: w, height: h, transform: `translate(${tx}px, ${ty}px) scale(${s})`, "--pt-move-ms": `${shot?.ms ?? 900}ms` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
