"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { showcases, type ShowcaseSlug } from "@/data/showcase";
import { ShowcaseStage } from "./ShowcaseStage";

/**
 * The home card's showcase (ADR-0020). Loaded only when a visitor shows intent
 * (pointer rests on a showcase card, or taps or presses it), so the home page
 * pays nothing for it up front.
 *
 *   popover  fine pointer and a viewport 900px or wider: a glass window that
 *            grows out of the card, shows the website scrolling, then slides
 *            to the command center. Hover-opened windows close when the pointer
 *            leaves both the card and the window; click- or key-opened ones are
 *            modal dialogs that close on Escape, the close button, or a click
 *            outside.
 *   sheet    touch, or narrower than 900px: the same two slides in a glass
 *            sheet from the bottom, inside a phone-sized frame. Swipe or tap
 *            the tabs to move between them.
 */
export type LayerMode = "hover" | "pinned";

const DWELL_MS = 3700; // website slide, before the move to the command center
const PAN_DELAY_MS = 420;
const PAN_MS = 2800;

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isSheetLayout() {
  return typeof window !== "undefined" && (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.innerWidth < 900);
}

export default function ShowcaseLayer({
  slug,
  anchor,
  mode,
  onClose,
  onHoverChange,
  dismissed,
}: {
  slug: ShowcaseSlug;
  anchor: HTMLElement;
  mode: LayerMode;
  onClose: () => void;
  /** Hover mode: the pointer entered (true) or left (false) the window. */
  onHoverChange?: (inside: boolean) => void;
  /** The parent asks the window to leave (hover ended); it animates out, then calls onClose. */
  dismissed?: boolean;
}) {
  const show = showcases[slug];
  const [sheet] = useState(isSheetLayout);
  const [reduced] = useState(prefersReduced);
  const [phase, setPhase] = useState<"measure" | "from" | "open" | "leave">(sheet ? "from" : "measure");
  const [slide, setSlide] = useState<0 | 1>(0);
  const [auto, setAuto] = useState(!reduced);
  const [panY, setPanY] = useState(0);
  const [live, setLive] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [geo, setGeo] = useState<{ left: number; top: number; from: string } | null>(null);
  const titleId = useId();
  // A tablet-wide sheet has room for the desktop picture; a phone gets the phone one.
  const [variant] = useState<"desk" | "phone">(() => (sheet && window.innerWidth < 600 ? "phone" : "desk"));
  const modal = mode === "pinned" || sheet;

  // ── Place the popover beside its card, then grow it out of the card (FLIP).
  const place = useCallback(() => {
    const box = boxRef.current;
    if (!box || sheet) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const card = anchor.getBoundingClientRect();
    const w = box.offsetWidth;
    const h = box.offsetHeight;
    const navBottom = 88;
    const left = Math.round(Math.min(Math.max(card.left + card.width / 2 - w / 2, 24), vw - w - 24));
    const top = Math.round(Math.min(Math.max(card.top + card.height / 2 - h / 2, navBottom + 8), Math.max(navBottom + 8, vh - h - 16)));
    const sx = card.width / w;
    const dx = card.left + card.width / 2 - (left + w / 2);
    const dy = card.top + card.height / 2 - (top + h / 2);
    setGeo({ left, top, from: `translate(${dx}px, ${dy}px) scale(${sx.toFixed(3)})` });
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

  // ── The timeline: pan the website, then move to the command center.
  useEffect(() => {
    if (phase !== "open" || !auto) return;
    const t1 = window.setTimeout(() => setPanY(variant === "phone" ? show.pan.phone : show.pan.desk), PAN_DELAY_MS);
    const t2 = window.setTimeout(() => setSlide(1), DWELL_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase, auto, variant, show]);

  // The live scan replays only once the command center has arrived.
  useEffect(() => {
    if (slide !== 1) return setLive(false);
    const t = window.setTimeout(() => setLive(true), reduced ? 0 : 640);
    return () => window.clearTimeout(t);
  }, [slide, reduced]);

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

  // Swipe between the slides in the sheet.
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const choose = (s: 0 | 1) => {
    setAuto(false);
    if (s === 0 && panY === 0) setPanY(variant === "phone" ? show.pan.phone : show.pan.desk);
    setSlide(s);
  };

  const body = (
    <>
      <div className="sc-head">
        <p className="sc-head__name" id={titleId}>
          {show.name}
        </p>
        <div className="sc-tabs" role="tablist" aria-label={`${show.name}: website or ${show.commandName}`} data-slide={slide} data-auto={auto && slide === 0 && phase === "open" ? "" : undefined} style={{ "--sc-dwell": `${DWELL_MS}ms` } as CSSProperties}>
          <span className="sc-tabs__pill" aria-hidden="true" />
          <button type="button" role="tab" className="sc-tabs__tab" aria-selected={slide === 0} onClick={() => choose(0)}>
            Website
            <span className="sc-tabs__fill" aria-hidden="true" />
          </button>
          <button type="button" role="tab" className="sc-tabs__tab" aria-selected={slide === 1} onClick={() => choose(1)}>
            {show.commandName}
          </button>
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
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) choose(dx < 0 ? 1 : 0);
        }}
        className={sheet ? "sc-sheet__stage" : undefined}
        style={sheet ? { touchAction: "pan-y" } : undefined}
      >
        <ShowcaseStage
          show={show}
          variant={variant}
          slide={slide}
          web={{ y: panY, panMs: auto ? PAN_MS : 760, lazy: false }}
          live={live}
        />
      </div>

      <p className="sc-caption" aria-live="polite">
        {slide === 0 ? show.captions.website : show.captions.command}
      </p>

      <div className="sc-foot">
        <a className="sc-cta" href={`/showcase/${show.slug}`}>
          Walk through it
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a className="sc-live" href={show.liveUrl} target="_blank" rel="noopener noreferrer">
          Visit {show.liveLabel}
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
          {body}
        </div>
      </div>,
      document.body,
    );
  }

  const style = {
    left: geo?.left ?? 0,
    top: geo?.top ?? 0,
    transform: phase === "from" ? geo?.from : undefined,
  } as CSSProperties;

  return createPortal(
    <div className="sc-root">
      <div
        ref={boxRef}
        className="sc-pop sc-glass"
        data-phase={phase}
        style={style}
        onPointerEnter={() => onHoverChange?.(true)}
        onPointerLeave={() => onHoverChange?.(false)}
        {...dialogProps}
      >
        {body}
      </div>
    </div>,
    document.body,
  );
}
