"use client";

import { useRef, type CSSProperties } from "react";
import type { WebsiteBeat as WebsiteBeatData } from "@/data/showcase/types";
import { Chrome, useBox, useSteps, type BeatProps } from "./shared";

/**
 * Their public site (a capture, ADR-0020): the hero, then the section that
 * sells. A desk window shows the desktop site in a browser frame; the phone
 * sheet shows the real mobile site in a phone. The frame holds on each stop,
 * then scrolls to the next the way a visitor would.
 */
export const PAN_MS = 900;
export const websiteMs = (beat: WebsiteBeatData, phone: boolean) => {
  const stops = (phone ? beat.phone : beat.desk).stops;
  return stops.reduce((a, s) => a + s.holdMs, 0) + (stops.length - 1) * PAN_MS;
};

export function WebsiteBeat({ client, beat, variant, active, fill, reduced }: BeatProps<WebsiteBeatData>) {
  const cap = variant === "phone" ? beat.phone : beat.desk;
  const viewRef = useRef<HTMLDivElement>(null);
  const box = useBox(viewRef);

  // Which stop the frame is on: each stop holds, then the frame moves on.
  let at = 0;
  const marks: [number, number][] = [];
  cap.stops.forEach((s, i) => {
    if (i > 0) marks.push([at, i]);
    at += s.holdMs + PAN_MS;
  });
  const stop = useSteps(active, reduced, marks, 0, 0);

  const ratio = box.w > 0 && box.h > 0 ? box.h / box.w : variant === "phone" ? 1.6 : 0.625;
  const viewH = cap.width * ratio;
  // A stop near the end may scroll a little past the capture (the site's own white
  // space continues there), so a tall phone lands on the row asked for, not on a
  // sliced row above it.
  const top = Math.max(0, Math.min(cap.stops[stop].y, cap.height - viewH * 0.55));
  const page = (
    <div className="sc-frame__page" style={{ transform: `translateY(-${(top / cap.height) * 100}%)`, "--sc-pan-ms": `${PAN_MS}ms` } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="sc-frame__shot"
        src={cap.src}
        width={cap.width}
        height={cap.height}
        alt={`The ${client.live.label} ${variant === "phone" ? "mobile site" : "home page"}, as we built it.`}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  );

  if (variant === "phone") {
    return (
      <figure className={`sc-phone${fill ? " sc-phone--fill" : ""}`}>
        <div className="sc-phone__status" aria-hidden="true">
          <span>9:41</span>
          <i className="sc-phone__island" />
          <span className="sc-phone__icons">
            <i />
            <i />
          </span>
        </div>
        <div className="sc-frame__view sc-phone__view" ref={viewRef} style={fill ? undefined : { aspectRatio: "390 / 640" }}>
          {page}
        </div>
        <div className="sc-phone__bar" aria-hidden="true">
          <span>{client.live.label}</span>
        </div>
      </figure>
    );
  }
  return (
    <figure className={`sc-frame sc-frame--web sc-frame--desk${fill ? " sc-frame--fill" : ""}`}>
      <Chrome label={client.live.label} when={beat.captured} />
      <div className="sc-frame__view" ref={viewRef} style={fill ? undefined : { aspectRatio: "1.6 / 1" }}>
        {page}
      </div>
    </figure>
  );
}
