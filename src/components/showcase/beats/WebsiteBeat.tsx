"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { SiteCapture, WebsiteBeat as WebsiteBeatData } from "@/data/showcase/types";
import { useBox, type BeatProps } from "./shared";

/**
 * Their live site, in a frame the visitor scrolls and clicks (ADR-0022 §2,
 * ADR-0023, design spec §3). The frame loads behind a dated still of the site
 * and is shown only once the framed page says it rendered (the
 * `ps-portal-ready` message, §3.5): a frame the browser refused still fires
 * `load`, and would otherwise show a blank white box as "Live". No message
 * within 8 s and the frame is removed; the still stays, with "Open <domain>".
 *
 * While loading, the chip says so in words ("Loading the live site…") and a wheel or touch on the still
 * answers with a short hint: a visitor who scrolls the still and sees nothing move reads it as a dead
 * window (owner, 2026-11-04, Duffer: "it's still, it's not scrollable"). The frame waits transparent and
 * untouchable above the still, not visibility:hidden, so engines do not throttle it as hidden content
 * (Firefox held the ready message back up to ~1 s that way) and the still takes the visitor's input.
 */

/** How long the "the live site is loading" hint stays up after the last wheel or touch on the still. */
const HINT_MS = 2200;

/** How long a frame may take to say it rendered before the window falls back to the still. */
export const READY_MS = 8000;
/** The narrowest width a desktop frame renders at; a narrower view scales it down to fit (§3.4). */
const DESK_RENDER_W = 1024;
/** Below this scale the client's own narrower layout reads better than a shrunken desktop. */
const MIN_SCALE = 0.8;

/**
 * Kept for the beats index (beatMs). Nothing auto-advances any more (ADR-0022 §2),
 * so the window never waits on this; it is the capture's old pan length.
 */
export const PAN_MS = 900;
export const websiteMs = (beat: WebsiteBeatData, phone: boolean) => {
  const stops = (phone ? beat.phone : beat.desk).stops;
  return stops.reduce((a, s) => a + s.holdMs, 0) + (stops.length - 1) * PAN_MS;
};

export type FrameState = "loading" | "live" | "preview";

const domainOf = (src: string) => {
  try {
    return new URL(src).hostname.replace(/^www\./, "");
  } catch {
    return src;
  }
};

/** Render width and scale for a view of this size (§3.4). */
export function frameScale(vw: number) {
  if (vw >= DESK_RENDER_W) return { w: vw, s: 1 };
  const s = vw / DESK_RENDER_W;
  if (s >= MIN_SCALE) return { w: DESK_RENDER_W, s };
  return { w: vw, s: 1 };
}

export function WebsiteBeat({ client, beat, variant, active }: BeatProps<WebsiteBeatData>) {
  const live = beat.live;
  const domain = domainOf(live.src);
  const viewRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const box = useBox(viewRef);
  // The frame is created the first time the tab is on screen, and kept while the window is open.
  const [shown, setShown] = useState(false);
  const [state, setState] = useState<FrameState>(live.frame === "off" ? "preview" : "loading");
  const [reload, setReload] = useState(0);
  const [hint, setHint] = useState(false);
  const hintTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (active) setShown(true);
  }, [active]);
  useEffect(() => {
    if (state !== "loading") setHint(false);
  }, [state]);
  useEffect(() => () => window.clearTimeout(hintTimer.current), []);
  const nudge = () => {
    if (state !== "loading") return;
    setHint(true);
    window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHint(false), HINT_MS);
  };

  const framed = shown && state !== "preview";

  // The ready handshake: only from this frame, only from an allowed origin, only this message.
  useEffect(() => {
    if (!framed || live.frame !== "handshake") return;
    const onMessage = (e: MessageEvent) => {
      const win = frameRef.current?.contentWindow;
      if (!win || e.source !== win) return;
      if (!live.origins.includes(e.origin)) return;
      const data = e.data as { type?: unknown } | null;
      if (!data || typeof data !== "object" || data.type !== "ps-portal-ready") return;
      setState((s) => (s === "loading" ? "live" : s));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [framed, live.frame, live.origins]);

  // No word from the site in time: drop the frame (a refused frame's blank page never shows, a stuck one stops costing CPU).
  useEffect(() => {
    if (!framed || state !== "loading") return;
    const t = window.setTimeout(() => setState((s) => (s === "loading" ? "preview" : s)), READY_MS);
    return () => window.clearTimeout(t);
  }, [framed, state]);

  const cap = variant === "phone" ? beat.phone : beat.desk;
  const { w: renderW, s } = variant === "phone" ? { w: box.w, s: 1 } : frameScale(box.w);
  const frameStyle: CSSProperties | undefined =
    box.w > 0
      ? { width: renderW, height: s === 1 ? box.h : box.h / s, transform: s === 1 ? undefined : `scale(${s})` }
      : undefined;

  const chip = state === "live" ? "Live" : state === "preview" ? "Preview" : "Loading";
  const when = beat.captured.replace(/^Captured\s+/i, "");

  return (
    <div className="sc-web" data-state={state} data-frame-scale={s.toFixed(3)} data-frame-width={Math.round(renderW)}>
      <div className="sc-web__strip">
        {state === "live" ? (
          <button
            type="button"
            className="sc-web__home"
            aria-label={`Back to ${domain} home`}
            onClick={() => {
              // The frame's path cannot be read cross-origin, so going home is a NEW frame on its first
              // page. Re-setting the same src is a no-op in Firefox once the visitor has navigated
              // inside the frame (QA 2026-11-04, HG Oil at 1440), so the frame is remounted instead,
              // and it is live again only when the site says so, like the first time.
              setState("loading");
              setReload((n) => n + 1);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2.5 7.2 8 2.7l5.5 4.5M4 6v7.3h3V10h2v3.3h3V6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
        <span className="sc-web__url">
          <svg className="sc-web__lock" width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <path d="M2 5V3.6a3 3 0 0 1 6 0V5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <rect x="0.5" y="5" width="9" height="6.5" rx="1.6" fill="currentColor" />
          </svg>
          <span className="sc-web__domain">{domain}</span>
          <span className="sc-web__chip" data-state={state} title={state === "preview" ? beat.captured : undefined} aria-live="polite">
            <i aria-hidden="true" />
            {chip}
            {state === "loading" ? <span className="sc-web__chip-more"> the live site…</span> : null}
          </span>
        </span>
        <a className="sc-web__open" href={live.src} target="_blank" rel="noopener noreferrer">
          Open<span className="sc-web__open-word"> site</span> <span aria-hidden="true">↗</span>
          <span className="ps-visually-hidden"> (opens in a new tab)</span>
        </a>
      </div>
      <div className="sc-web__view" ref={viewRef} onWheel={nudge} onTouchStart={nudge}>
        <Still cap={cap} alt={`${domain} home page, a still from ${when}`} />
        {framed ? (
          <iframe
            key={reload}
            ref={frameRef}
            className="sc-web__frame"
            src={live.src}
            title={`${client.name} website, live`}
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
            referrerPolicy="strict-origin-when-cross-origin"
            allow=""
            loading="eager"
            style={frameStyle}
            onLoad={live.frame === "load" ? () => setState((st) => (st === "loading" ? "live" : st)) : undefined}
          />
        ) : null}
        {hint && state === "loading" ? (
          <div className="sc-web__hint" aria-hidden="true">
            One second, the live site is loading
          </div>
        ) : null}
        {state === "preview" ? (
          <div className="sc-web__fallback">
            <span>A still of their site.</span>
            <a className="sc-web__fallback-btn" href={live.src} target="_blank" rel="noopener noreferrer">
              Open {domain} <span aria-hidden="true">↗</span>
              <span className="ps-visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** The dated still: the capture's top, or the site's header bar over its hero video's poster. Never pans. */
function Still({ cap, alt }: { cap: SiteCapture; alt: string }) {
  if (cap.video) {
    return (
      <div className="sc-web__still sc-web__still--video" role="img" aria-label={alt}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sc-web__still-head" src={cap.src} width={cap.width} height={cap.height} alt="" loading="eager" decoding="async" draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sc-web__still-hero" src={cap.video.poster} width={cap.video.width} height={cap.video.height} alt="" loading="eager" decoding="async" draggable={false} />
      </div>
    );
  }
  return (
    <div className="sc-web__still">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cap.src} width={cap.width} height={cap.height} alt={alt} loading="eager" decoding="async" draggable={false} />
    </div>
  );
}
