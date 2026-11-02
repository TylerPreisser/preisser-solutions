"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { SiteVideo, WebsiteBeat as WebsiteBeatData } from "@/data/showcase/types";
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
  const want = cap.stops[stop];
  const maxTop = cap.height - viewH * (want.toEnd ? 1 : 0.55);
  const hi = Math.max(0, maxTop);
  let top = Math.max(0, Math.min(want.y, hi));
  if (box.h > 0 && (want.avoid || want.keep)) {
    const avoid = want.avoid ?? [];
    const keep = want.keep;
    // A taller-than-the-view keep band: centre on it instead of holding it whole.
    const fits = !keep || keep[1] - keep[0] <= viewH;
    if (keep && !fits) top = Math.max(0, Math.min((keep[0] + keep[1] - viewH) / 2, hi));
    const cuts = (t: number) => avoid.some(([a, b]) => (t > a && t < b) || (t + viewH > a && t + viewH < b));
    const holds = (t: number) => !keep || !fits || (t <= keep[0] && t + viewH >= keep[1]);
    // The nearest top that holds the keep band and cuts nothing; else the nearest that cuts nothing.
    const find = (ok: (t: number) => boolean, reach: number) => {
      for (let d = 0; d <= reach; d += 1) {
        for (const t of [top + d, top - d]) if (t >= 0 && t <= hi && ok(t)) return t;
      }
      return null;
    };
    top = find((t) => holds(t) && !cuts(t), 400) ?? find((t) => !cuts(t), 160) ?? top;
  }
  const alt = `The ${client.live.label} ${variant === "phone" ? "mobile site" : "home page"}, as we built it.`;
  const page = cap.video ? (
    <div className="sc-frame__page sc-frame__page--video">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sc-frame__head" src={cap.src} width={cap.width} height={cap.height} alt="" loading="eager" decoding="async" draggable={false} />
      <HeroVideo video={cap.video} active={active} reduced={reduced} alt={alt} />
    </div>
  ) : (
    <div className="sc-frame__page" style={{ transform: `translateY(-${(top / cap.height) * 100}%)`, "--sc-pan-ms": `${PAN_MS}ms` } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="sc-frame__shot"
        src={cap.src}
        width={cap.width}
        height={cap.height}
        alt={alt}
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

/**
 * The site's hero video, muted and looping from its first frame each time the
 * beat comes on screen, paused when it leaves. Reduced motion gets the poster
 * still and no motion at all.
 */
function HeroVideo({ video, active, reduced, alt }: { video: SiteVideo; active: boolean; reduced: boolean; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (active) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    } else v.pause();
  }, [active]);
  const style = { "--sc-sky": video.sky, "--sc-ground": video.ground } as CSSProperties;
  return (
    <div className={`sc-frame__hero sc-frame__hero--${video.fit}`} style={style}>
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={video.poster} width={video.width} height={video.height} alt={alt} loading="eager" decoding="async" draggable={false} />
      ) : (
        <video ref={ref} poster={video.poster} width={video.width} height={video.height} muted loop playsInline autoPlay preload="auto" aria-label={alt}>
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
