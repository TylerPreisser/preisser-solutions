"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { LoadingStill, WebsiteBeat as WebsiteBeatData } from "@/data/showcase/types";
import { estimateViewWidth, frameScale, loadingStill } from "@/data/showcase";
import { useBox, type BeatProps } from "./shared";

/**
 * Their live site, in a frame the visitor scrolls and clicks (ADR-0022 §2,
 * ADR-0023, design spec §3). The frame loads behind a still of the site under a
 * loading bar, and is shown only once the framed page says it rendered (the
 * `ps-portal-ready` message, §3.5) AND its own preloader or entrance has had its
 * time (`live.revealMs`): every client sends ready before its content is on
 * screen, and Hays's flat pink preloader showed as "Live" (owner, 2026-11-22: "if
 * it needs to load it can show a bit of a loading animation instead of it being
 * so clunky"). Then the frame cross-fades in over the still (350 ms), which is the
 * same picture (`first`, captured framed). A frame the browser refused still fires
 * `load`, and would otherwise show a blank white box as "Live". A frame that
 * never says ready (refused, or no word within 12 s) is removed and the window
 * settles in its fallback state on the SAME still, with "Open <domain>": the
 * picture under "Loading" never changes and never blanks (critic 2026-11-22 MUST 2).
 *
 * While loading, the chip says so in words ("Loading the live site…") and a wheel or touch on the still
 * answers with a short hint: a visitor who scrolls the still and sees nothing move reads it as a dead
 * window (owner, 2026-11-04, Duffer: "it's still, it's not scrollable"). The frame waits transparent and
 * untouchable above the still, not visibility:hidden, so engines do not throttle it as hidden content
 * (Firefox held the ready message back up to ~1 s that way) and the still takes the visitor's input.
 */

/**
 * A frame that has fired `load` but not said it is ready this long after is taken as refused, and the window
 * settles in its fallback state (the same still; only the chip and the "Open <domain>" button change). A blocked
 * frame fires `load` within ~5-64 ms with no ready message; a real page sends ready around its own load, but later
 * on a slow engine or a heavy site. Measured 2026-11-22, Playwright WebKit on a loaded PC: all five sites, phone and
 * desk, ready at most 218 ms after load; FarmBooks desk traced at ~1.2 s, the critic's run ~1.7 s (at the old 1 s it
 * was taken as refused and its picture swapped mid-load). 8 s is ~2x the worst seen even with a further 2.5 s of
 * delay (the bench's check k); a truly refused frame says Loading that long, over the same picture, then falls back.
 */
const REFUSED_MS = 8000;
/** How long the "the live site is loading" hint stays up after the last wheel or touch on the still. */
const HINT_MS = 2200;

/**
 * How long a frame may take to say it rendered before the window settles in its fallback state (the same still).
 * FarmBooks said ready up to ~5.2 s after the tap in Playwright WebKit on a loaded PC (2026-11-22); at 8 s a slow
 * site lost its frame. A site that HAS said ready is never dropped by this, even while its reveal is pending.
 */
export const READY_MS = 12000;

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

export { frameScale };

export function WebsiteBeat({ client, beat, variant, active }: BeatProps<WebsiteBeatData>) {
  const live = beat.live;
  const revealMs = live.revealMs ?? 0;
  const domain = domainOf(live.src);
  const viewRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const box = useBox(viewRef);
  // The frame is created the first time the tab is on screen, and kept while the window is open.
  const [shown, setShown] = useState(false);
  const [state, setState] = useState<FrameState>(live.frame === "off" ? "preview" : "loading");
  const [reload, setReload] = useState(0);
  // The frame loaded but never said ready in time: the browser refused it (or the page is broken).
  const refusedTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(refusedTimer.current), []);
  // The site said ready (its reveal may still be playing): neither fallback timer may take its frame away now.
  const heard = useRef(false);
  // Ready arrived; the site's own preloader / entrance is still playing for `revealMs`.
  const revealTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(revealTimer.current), []);
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
      window.clearTimeout(refusedTimer.current);
      heard.current = true;
      if (revealTimer.current !== undefined) return;
      revealTimer.current = window.setTimeout(() => {
        revealTimer.current = undefined;
        setState((s) => (s === "loading" ? "live" : s));
      }, revealMs);
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(revealTimer.current);
      revealTimer.current = undefined;
    };
  }, [framed, live.frame, live.origins, revealMs]);

  // No word from the site in time: drop the frame (a refused frame's blank page never shows, a stuck one stops costing CPU).
  useEffect(() => {
    if (!framed || state !== "loading") return;
    const t = window.setTimeout(() => setState((s) => (s === "loading" && !heard.current ? "preview" : s)), READY_MS);
    return () => window.clearTimeout(t);
  }, [framed, state]);

  const cap = variant === "phone" ? beat.phone : beat.desk;
  const { w: renderW, s } = variant === "phone" ? { w: box.w, s: 1 } : frameScale(box.w);
  // The loading still for this frame's width (a 320 phone and a tablet sheet reflow the site): chosen once, from
  // the window's CSS before the view is measured, so the picture never swaps under the visitor.
  const [first] = useState(() => {
    const sheet = typeof window !== "undefined" && (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.innerWidth < 900);
    const view = typeof window !== "undefined" ? estimateViewWidth(window.innerWidth, sheet) : 0;
    return loadingStill(cap, variant === "phone" ? view : frameScale(view).w);
  });
  const frameStyle: CSSProperties | undefined =
    box.w > 0
      ? { width: renderW, height: s === 1 ? box.h : box.h / s, transform: s === 1 ? undefined : `scale(${s})` }
      : undefined;

  const chip = state === "live" ? "Live" : state === "preview" ? "Preview" : "Loading";
  const when = (first.captured ?? "").replace(/^Captured\s+/i, "");

  // --sc-ground: the site's own ground colour (the still's bottom colour), under the still until it is decoded, so
  // the picture area is never an empty white field.
  return (
    <div
      className="sc-web"
      data-state={state}
      data-frame-scale={s.toFixed(3)}
      data-frame-width={Math.round(renderW)}
      style={first.edge ? ({ "--sc-ground": first.edge } as CSSProperties) : undefined}
    >
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
              window.clearTimeout(revealTimer.current);
              revealTimer.current = undefined;
              heard.current = false;
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
          <span className="sc-web__chip" data-state={state} title={state === "preview" ? first.captured : undefined} aria-live="polite">
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
        {/* One picture for every state: loading, under the live frame, and the fallback (refused or no word). */}
        <Still pic={first} alt={`${domain} home page, a still from ${when}`} />
        {/* The loading sign over the picture, under the URL strip (a browser's own loading bar): it slides by
            transform only, and fades out as the live site fades in. */}
        <div className="sc-web__bar" aria-hidden="true">
          <i />
        </div>
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
            onLoad={
              live.frame === "load"
                ? () => setState((st) => (st === "loading" ? "live" : st))
                : () => {
                    window.clearTimeout(refusedTimer.current);
                    refusedTimer.current = window.setTimeout(() => setState((st) => (st === "loading" && !heard.current ? "preview" : st)), REFUSED_MS);
                  }
            }
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

/** The website still. It shows the moment its pixels are decoded: at the window's first paint when it was decoded
 *  ahead (warmShowcase, with the data prefetch), else as soon as decode() resolves, mid-grow or not, on its own
 *  opacity layer (showcase.css) so neither the fade nor the grow repaints the window. Until then the view shows the
 *  site's ground colour. It used to wait for the grow to end, and the desktop window grew as an empty white panel
 *  (critic 2026-11-22 MUST 3). */
function Still({ pic, alt }: { pic: LoadingStill; alt: string }) {
  const [ready, setReady] = useState<string | null>(null);
  const key = pic.src;
  const edge = pic.edge;
  const boxRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const img = boxRef.current?.querySelector("img");
    if (!img) return;
    // Already decoded (the same file decoded ahead is in the document's available images): shown in this paint.
    if (img.complete && img.naturalWidth > 0) {
      setReady(key);
      return;
    }
    let off = false;
    const done = () => {
      if (!off) setReady(key);
    };
    img.decode().then(done, () => {
      if (img.complete && img.naturalWidth > 0) done();
      else img.addEventListener("load", done, { once: true });
    });
    return () => {
      off = true;
    };
  }, [key]);
  const shown = ready === key ? "" : undefined;
  const [band, setBand] = useState(false);
  useEffect(() => {
    const box = boxRef.current;
    const img = box?.querySelector("img");
    if (!edge || !box || !img) return;
    const measure = () => setBand(box.clientHeight - img.clientHeight > 1);
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    ro.observe(img);
    return () => ro.disconnect();
  }, [edge, key]);
  // A frame taller than the picture (`band`): the picture's last rows fade into its own bottom colour, which fills the
  // rest of the frame, so the page reads as continuing instead of stopping at a white band. The header stays
  // width-first, where the live page draws it.
  return (
    <div ref={boxRef} className="sc-web__still" data-ready={shown} data-band={band ? "" : undefined} style={edge ? ({ "--sc-still-edge": edge } as CSSProperties) : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={pic.src} width={pic.width} height={pic.height} alt={alt} loading="eager" decoding="async" draggable={false} />
      {band ? <i className="sc-web__still-fade" aria-hidden="true" /> : null}
    </div>
  );
}
