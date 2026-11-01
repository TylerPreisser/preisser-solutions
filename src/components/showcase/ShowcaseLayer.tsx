"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { loadShowcase, type ShowcaseSlug } from "@/data/showcase";
import type { ShowcaseClient } from "@/data/showcase/types";
import { BeatView, beatMs } from "./beats";
import "./showcase.css";

/** Every desk frame is a 1.6 : 1 picture (the 1280 x 800 site, the 960 x 600 portal). */
const VIEW_RATIO = 0.625;

/**
 * The home card's showcase (ADR-0020). Loaded only when a visitor shows intent
 * (pointer rests on a showcase card, or taps or presses it), so the home page
 * pays nothing for it up front.
 *
 *   popover  fine pointer and a viewport 900px or wider: a glass window that
 *            grows out of the card and plays the client's beats in order
 *            (src/data/showcase/types.ts): their website, then what we
 *            built. Hover-opened windows close when the pointer leaves both
 *            the card and the window; click- or key-opened ones are
 *            modal dialogs that close on Escape, the close button, or a click
 *            outside.
 *   sheet    touch, or narrower than 900px: the same beats in a glass sheet
 *            from the bottom; their real mobile site in a phone, the portal
 *            beats in their desktop composition scaled to fit. Swipe or tap
 *            the tabs to move between them.
 */
export type LayerMode = "hover" | "pinned";

const GAP = 16; // between the card and the window
const EDGE = 24; // between the window and the viewport edge
const MIN_SIDE_W = 520; // narrower than this beside the card, and the card opens in place instead

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isSheetLayout() {
  return typeof window !== "undefined" && (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.innerWidth < 900);
}

export default function ShowcaseLayer(props: LayerProps) {
  const [show, setShow] = useState<ShowcaseClient | null>(null);
  const { slug } = props;
  const closeRef = useRef(props.onClose);
  closeRef.current = props.onClose;
  useEffect(() => {
    let on = true;
    loadShowcase(slug).then(
      (c) => on && setShow(c),
      () => on && closeRef.current(),
    );
    return () => {
      on = false;
    };
  }, [slug]);
  return show ? <Layer {...props} show={show} /> : null;
}

interface LayerProps {
  slug: ShowcaseSlug;
  anchor: HTMLElement;
  mode: LayerMode;
  onClose: () => void;
  /** Hover mode: the pointer entered (true) or left (false) the window. */
  onHoverChange?: (inside: boolean) => void;
  /** The parent asks the window to leave (hover ended); it animates out, then calls onClose. */
  dismissed?: boolean;
}

function Layer({
  show,
  anchor,
  mode,
  onClose,
  onHoverChange,
  dismissed,
}: LayerProps & { show: ShowcaseClient }) {
  const [sheet] = useState(isSheetLayout);
  const [reduced] = useState(prefersReduced);
  const [phase, setPhase] = useState<"measure" | "from" | "open" | "leave">(sheet ? "from" : "measure");
  const [at, setAt] = useState(0);
  const [auto, setAuto] = useState(!reduced);
  const beats = show.beats;
  // A scene beat's current step line, shown in the caption slot instead of the beat's own caption (one caption, never two).
  const [live, setLive] = useState<{ at: number; line: string } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [geo, setGeo] = useState<{ left: number; top: number; width: number; from: string; inPlace: boolean; hole: number[]; veilTop: number } | null>(null);

  const titleId = useId();
  // A tablet-wide sheet has room for the desktop picture; a phone gets the phone one.
  const [variant] = useState<"desk" | "phone">(() => (sheet && window.innerWidth < 600 ? "phone" : "desk"));
  const modal = mode === "pinned" || sheet;

  // ── Place the window (critique A1). It never covers the section heading or
  // the card it came from: it opens beside the card, at the card row, on the
  // side with more room, and shrinks to fit the height left under the heading.
  // When neither side has room for a useful window (the middle card at
  // 1024px), the card itself opens in place: the window grows out of it and the
  // card hides behind it, so nothing is covered that the visitor was looking at.
  const place = useCallback(() => {
    const box = boxRef.current;
    if (!box || sheet) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const card = anchor.getBoundingClientRect();
    const heading = document.getElementById("work-heading")?.getBoundingClientRect();
    const navBottom = 88;
    // Height that does not scale with width: head, caption, foot, padding, frame chrome.
    const w0 = box.offsetWidth;
    const fixed = box.offsetHeight - (w0 - 32) * VIEW_RATIO;
    const lo = Math.max(navBottom + 8, heading ? heading.bottom + 16 : 0);
    const h720 = fixed + (720 - 32) * VIEW_RATIO;
    const top = Math.round(Math.max(lo, Math.min(card.top, vh - 16 - h720)));
    const wForHeight = (vh - 16 - top - fixed) / VIEW_RATIO + 32;
    const roomR = vw - EDGE - (card.right + GAP);
    const roomL = card.left - GAP - EDGE;
    const right = roomR >= roomL;
    const sideW = Math.floor(Math.min(720, wForHeight, right ? roomR : roomL));
    let width: number;
    let left: number;
    let inPlace = false;
    if (sideW >= MIN_SIDE_W) {
      width = sideW;
      left = right ? card.right + GAP : card.left - GAP - width;
    } else {
      inPlace = true;
      width = Math.floor(Math.min(720, wForHeight, vw - EDGE * 2));
      left = Math.min(Math.max(card.left + card.width / 2 - width / 2, EDGE), vw - width - EDGE);
    }
    left = Math.round(left);
    const h = fixed + (width - 32) * VIEW_RATIO;
    const sx = card.width / width;
    const dx = card.left + card.width / 2 - (left + width / 2);
    const dy = card.top + card.height / 2 - (top + h / 2);
    setGeo({
      left,
      top,
      width,
      inPlace,
      from: `translate(${dx}px, ${dy}px) scale(${sx.toFixed(3)})`,
      hole: [card.left, card.top, card.width, card.height],
      veilTop: Math.max(0, heading ? heading.bottom + 8 : 0),
    });
  }, [anchor, sheet]);

  useLayoutEffect(() => {
    if (sheet) return;
    place();
    setPhase("from");
  }, [place, sheet]);

  useEffect(() => {
    if (phase !== "from") return;
    // Two frames: the "from" transform must paint before the transition to "open" starts.
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setPhase("open"));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [phase]);

  // Keep the window on its card if the page scrolls while it is open.
  useEffect(() => {
    if (sheet) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(place);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [place, sheet]);

  // ── The timeline: each beat plays, then the window moves to the next. The last one stays.
  const phone = variant === "phone";
  const dwell = beatMs(beats[at], phone);
  useEffect(() => {
    if (phase !== "open" || !auto || at >= beats.length - 1) return;
    const t = window.setTimeout(() => setAt((i) => Math.min(i + 1, beats.length - 1)), dwell);
    return () => window.clearTimeout(t);
  }, [phase, auto, at, dwell, beats.length]);

  // The source card hides behind a window that opened in place over it.
  useEffect(() => {
    if (!geo?.inPlace) return;
    anchor.classList.add("sc-source");
    return () => anchor.classList.remove("sc-source");
  }, [geo?.inPlace, anchor]);

  // The phone sheet is a full-screen modal: the site nav steps back and the page stops scrolling.
  useEffect(() => {
    if (!sheet) return;
    const html = document.documentElement;
    html.classList.add("sc-sheet-open");
    return () => html.classList.remove("sc-sheet-open");
  }, [sheet]);

  const close = useCallback(() => {
    setPhase("leave");
    window.setTimeout(onClose, reduced ? 120 : sheet ? 230 : 190);
  }, [onClose, reduced, sheet]);

  useEffect(() => {
    if (dismissed) close();
  }, [dismissed, close]);

  // ── Dialog behaviour for click/key/touch opens.
  useEffect(() => {
    if (!modal) return;
    const returnTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab" && boxRef.current) {
        const f = [...boxRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter((el) => !el.closest("[inert]"));
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onDown = (e: PointerEvent) => {
      if (sheet) return; // the sheet has its own scrim
      if (boxRef.current && !boxRef.current.contains(e.target as Node) && !anchor.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      returnTo?.focus?.({ preventScroll: true });
    };
  }, [modal, close, sheet, anchor]);

  // A hover-opened window still closes on Escape, without stealing focus.
  useEffect(() => {
    if (modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal, close]);

  // Swipe between the beats in the sheet.
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const choose = (i: number) => {
    setAuto(false);
    setAt(Math.max(0, Math.min(beats.length - 1, i)));
  };
  const opened = phase === "open" || phase === "leave";

  const body = (
    <>
      <div className="sc-head">
        <p className="sc-head__name" id={titleId}>
          {show.short}
        </p>
        <div
          className="sc-tabs"
          role="tablist"
          aria-label={`${show.name}: ${beats.map((b) => b.tab).join(", ")}`}
          data-auto={auto && phase === "open" && at < beats.length - 1 ? "" : undefined}
          style={{ "--sc-dwell": `${dwell}ms`, "--sc-n": beats.length, "--sc-at": at } as CSSProperties}
        >
          <span className="sc-tabs__pill" aria-hidden="true" />
          {beats.map((b, i) => (
            <button key={b.tab} type="button" role="tab" className="sc-tabs__tab" aria-selected={at === i} onClick={() => choose(i)}>
              {b.tab}
              {i === at ? <span key={`f${at}`} className="sc-tabs__fill" aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
        <button type="button" className="sc-close" ref={closeRef} onClick={close} aria-label={`Close ${show.name}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        onPointerDown={(e) => {
          if (sheet) swipe.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const s = swipe.current;
          swipe.current = null;
          if (!s) return;
          const dx = e.clientX - s.x;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) choose(at + (dx < 0 ? 1 : -1));
        }}
        className={sheet ? "sc-sheet__stage" : undefined}
        style={sheet ? { touchAction: "pan-y" } : undefined}
      >
        <div className={sheet && phone ? "sc-stage sc-stage--fill" : "sc-stage"} data-at={at}>
          {beats.map((b, i) => (
            <div
              key={b.tab}
              className="sc-beat"
              data-pos={i < at ? "past" : i === at ? "now" : "next"}
              aria-hidden={i !== at || undefined}
              inert={i !== at || undefined}
            >
              <BeatView
                client={show}
                beat={b}
                variant={variant}
                active={opened && i === at}
                fill={sheet && phone}
                reduced={reduced}
                onCaption={i === at ? (line) => setLive((p) => (p && p.at === i && p.line === line ? p : { at: i, line })) : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="sc-caption" aria-live="polite">
        {live && live.at === at ? live.line : beats[at].caption}
      </p>

      <div className="sc-foot">
        <a className="sc-live" href={show.live.url} target="_blank" rel="noopener noreferrer">
          Visit {show.live.label}
          <span className="ps-visually-hidden"> (opens in a new tab)</span>
        </a>
      </div>
    </>
  );

  const dialogProps = {
    role: "dialog" as const,
    "aria-modal": modal || undefined,
    "aria-labelledby": titleId,
  };

  if (sheet) {
    return createPortal(
      <div className="sc-root">
        <div className="sc-scrim" data-phase={phase} onClick={close} aria-hidden="true" />
        <div ref={boxRef} className="sc-sheet sc-glass" data-phase={phase} {...dialogProps}>
          <div className="sc-sheet__grip" aria-hidden="true" />
          <span className="sc-sheen" aria-hidden="true" />
          {body}
        </div>
      </div>,
      document.body,
    );
  }

  const style = {
    left: geo?.left ?? 0,
    top: geo?.top ?? 0,
    width: phase === "measure" || !geo ? 720 : geo.width,
    transform: phase === "from" ? geo?.from : undefined,
  } as CSSProperties;
  const hole = geo?.hole;

  return createPortal(
    <div className="sc-root">
      {/* The rest of the section steps back; the heading stays clear, and so does the card the window came from. */}
      <div className="sc-veil" data-phase={phase} aria-hidden="true" style={{ clipPath: `inset(${geo?.veilTop ?? 0}px 0 0 0)` }}>
        {hole && !geo?.inPlace ? (
          <span className="sc-veil__hole" style={{ left: hole[0], top: hole[1], width: hole[2], height: hole[3] }} />
        ) : (
          <span className="sc-veil__all" />
        )}
      </div>
      <div
        ref={boxRef}
        className="sc-pop sc-glass"
        data-phase={phase}
        style={style}
        onPointerEnter={() => onHoverChange?.(true)}
        onPointerLeave={() => onHoverChange?.(false)}
        {...dialogProps}
      >
        <span className="sc-sheen" aria-hidden="true" />
        {body}
      </div>
    </div>,
    document.body,
  );
}
