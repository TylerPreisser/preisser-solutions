"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { loadShowcase, type ShowcaseSlug } from "@/data/showcase";
import type { ShowcaseClient } from "@/data/showcase/types";
import { BeatView } from "./beats";
import "./showcase.css";

/**
 * The home card's showcase (ADR-0020, ADR-0022, ADR-0023; design spec
 * ~/.claude/agent-reports/ps-showcase-revamp-2026-11-03/design-spec.md §2-§4, §7).
 * Loaded only when a visitor shows intent, so the home page pays nothing up front.
 *
 *   window   fine pointer and a viewport 900px or wider: a glass window centred
 *            over a scrim, min(100% - 96, 1248) x min(100% - 64, 940), grown
 *            out of the card. The client's live site renders inside it at its
 *            desktop width. Nothing auto-advances: the visitor picks the tab.
 *            Hover-opened ("hover"): stays open while the pointer is anywhere
 *            inside it, including inside the client's site, and closes 400 ms
 *            after the pointer leaves. Any pointerdown on our own chrome pins it.
 *            Click- or key-opened ("pinned"): a modal dialog that closes only by
 *            the close button, Escape or the scrim.
 *   sheet    touch, or narrower than 900px: an opaque sheet from the bottom,
 *            swiped down from its grip and title row to dismiss.
 */
export type LayerMode = "hover" | "pinned";

/** Hover window: how long the pointer may be outside it before it closes (the bezel is crossed on the way out). */
const LEAVE_MS = 400;
/** Sheet: drag further than this, or release faster than this, and it closes. */
const DISMISS_PX = 96;
const DISMISS_V = 0.6;
/** Sheet: the drag zone is the grip and the name/close row. */
const DRAG_ZONE = 72;

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
  /** The card the window grows out of. */
  anchor: HTMLElement;
  mode: LayerMode;
  onClose: () => void;
}

type Phase = "measure" | "from" | "open" | "leave";

function Layer({ show, anchor, mode, onClose }: LayerProps & { show: ShowcaseClient }) {
  const [sheet] = useState(isSheetLayout);
  const [reduced] = useState(prefersReduced);
  const [phase, setPhase] = useState<Phase>(sheet ? "from" : "measure");
  const [at, setAt] = useState(0);
  const [pinned, setPinned] = useState(mode === "pinned");
  const [from, setFrom] = useState<string | undefined>(undefined);
  // A scene's current step line, for screen readers only (the caption row is gone, spec §9).
  const [line, setLine] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  /** The window's resting box (it is centred by CSS; read before the grow transform applies, and on resize). */
  const finalBox = useRef<DOMRect | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const beats = show.beats;
  const uid = useId();
  const titleId = `${uid}-name`;
  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = (i: number) => `${uid}-panel-${i}`;
  // A tablet-wide sheet has room for the desktop still; a phone gets the phone one.
  const [variant] = useState<"desk" | "phone">(() => (sheet && window.innerWidth < 600 ? "phone" : "desk"));
  const modal = pinned || sheet;

  // ── Open: the window's place is CSS (centred, spec §2.1); JS only measures where it grows from.
  useLayoutEffect(() => {
    if (sheet) return;
    const box = boxRef.current;
    if (!box) return;
    const w = box.getBoundingClientRect();
    finalBox.current = w;
    const c = anchor.getBoundingClientRect();
    const sx = c.width / w.width;
    const dx = c.left + c.width / 2 - (w.left + w.width / 2);
    const dy = c.top + c.height / 2 - (w.top + w.height / 2);
    setFrom(`translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sx.toFixed(3)})`);
    setPhase("from");
  }, [anchor, sheet]);

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

  useEffect(() => {
    if (sheet) return;
    const onResize = () => {
      const box = boxRef.current;
      if (box && phase === "open") finalBox.current = box.getBoundingClientRect();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sheet, phase]);

  // The page behind stops scrolling (a wheel at the end of a client page would chain into ours), without shifting sideways.
  useEffect(() => {
    const html = document.documentElement;
    // Keep the gutter only where a classic scrollbar takes room; an overlay scrollbar has none to keep.
    const gutter = window.innerWidth - html.clientWidth > 0;
    html.classList.add("sc-lock");
    if (gutter) html.classList.add("sc-lock--gutter");
    if (sheet) html.classList.add("sc-sheet-open");
    return () => html.classList.remove("sc-lock", "sc-lock--gutter", "sc-sheet-open");
  }, [sheet]);

  const closing = useRef(false);
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setPhase("leave");
    window.setTimeout(onClose, reduced ? 120 : sheet ? 230 : 180);
  }, [onClose, reduced, sheet]);

  // ── Hover window: open while the pointer is inside (including inside the client's frame, where the
  // parent sees no pointermove), closed 400 ms after it leaves. A leave at the viewport's edge is the
  // visitor going to the dock or another app, not away from the window.
  const inside = useRef(true);
  const leaveTimer = useRef<number | undefined>(undefined);
  const hover = !pinned && !sheet;
  const armLeave = useCallback(() => {
    if (leaveTimer.current !== undefined) return;
    leaveTimer.current = window.setTimeout(() => {
      leaveTimer.current = undefined;
      if (!inside.current) close();
    }, LEAVE_MS);
  }, [close]);
  const disarmLeave = () => {
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = undefined;
  };
  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);
  useEffect(() => {
    if (!hover) disarmLeave();
  }, [hover]);

  const onWinEnter = () => {
    inside.current = true;
    disarmLeave();
  };
  const onWinLeave = (e: ReactPointerEvent) => {
    if (!hover) return;
    const edge = e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth - 1 || e.clientY >= window.innerHeight - 1;
    if (edge) return;
    inside.current = false;
    armLeave();
  };
  // Over the scrim: the pointer is outside the window's final box (it may still be growing under the pointer).
  const onScrimMove = (e: ReactPointerEvent) => {
    if (!hover) return;
    const fin = finalBox.current;
    const inBox = fin ? e.clientX >= fin.left && e.clientX <= fin.right && e.clientY >= fin.top && e.clientY <= fin.bottom : false;
    if (inBox) return;
    inside.current = false;
    armLeave();
  };

  // ── Keyboard: Escape closes either kind (while focus is in our document; Escape inside the client's site is theirs).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // A click-, key- or touch-opened window takes focus to its close button, and gives it back on close.
  // (Not while measuring: the window is visibility:hidden then, and focus() on it is a no-op.)
  const openedModal = useRef(modal);
  const pinnedRef = useRef(pinned);
  pinnedRef.current = pinned;
  const focused = useRef(false);
  useEffect(() => {
    if (!openedModal.current || focused.current || phase === "measure") return;
    focused.current = true;
    closeBtn.current?.focus({ preventScroll: true });
  }, [phase]);
  useEffect(() => {
    const returnTo = openedModal.current ? (document.activeElement as HTMLElement | null) : null;
    return () => {
      // A hover window pinned by a click returns focus to its card's button (it never took focus at open).
      const back = returnTo ?? (pinnedRef.current ? anchor.querySelector<HTMLElement>('[aria-haspopup="dialog"]') : null);
      back?.focus?.({ preventScroll: true });
    };
  }, [anchor]);

  // The focus trap's two ends: Tab inside the client's frame cannot be seen, so the trap is two
  // focusable sentinels, first and last, that send focus round to the other end.
  const focusables = () =>
    boxRef.current
      ? [...boxRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')].filter(
          (el) => !el.closest("[inert]") && !el.hasAttribute("data-sentinel") && el.getClientRects().length > 0,
        )
      : [];
  const toFirst = () => closeBtn.current?.focus();
  const toLast = () => {
    const f = focusables();
    (f[f.length - 1] ?? closeBtn.current)?.focus();
  };

  // ── Tabs (spec §4): roving tabindex, arrows wrap, Home/End.
  const tabsRef = useRef<HTMLDivElement>(null);
  const choose = (i: number, focus = false) => {
    const n = beats.length;
    const k = ((i % n) + n) % n;
    setAt(k);
    if (focus) document.getElementById(tabId(k))?.focus();
  };
  const onTabKey = (e: ReactKeyboardEvent) => {
    const key = e.key;
    if (key === "ArrowRight") choose(at + 1, true);
    else if (key === "ArrowLeft") choose(at - 1, true);
    else if (key === "Home") choose(0, true);
    else if (key === "End") choose(beats.length - 1, true);
    else return;
    e.preventDefault();
  };

  // The pill sits under the selected tab by measurement (tab widths are unequal), after the
  // web font has loaded and again whenever the track resizes.
  const [pill, setPill] = useState<{ x: number; w: number; ready: boolean } | null>(null);
  useEffect(() => {
    const track = tabsRef.current;
    if (!track) return;
    let live = true;
    const measure = () => {
      const t = track.querySelector<HTMLElement>(`[aria-selected="true"]`);
      if (!t || !live) return;
      setPill((p) => ({ x: t.offsetLeft, w: t.offsetWidth, ready: p !== null }));
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    track.querySelectorAll(".sc-tabs__tab").forEach((t) => ro.observe(t));
    return () => {
      live = false;
      ro.disconnect();
    };
  }, [at]);

  // ── Sheet: swipe down to dismiss, from the grip and the name/close row only.
  const drag = useRef<{ y0: number; y: number; t: number; v: number; id: number; moved: boolean } | null>(null);
  const [dragY, setDragY] = useState<number | null>(null);
  // Once the sheet is up, a short drag springs back in 240 ms instead of the 460 ms rise.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!sheet || phase !== "open") return;
    const t = window.setTimeout(() => setSettled(true), 480);
    return () => window.clearTimeout(t);
  }, [sheet, phase]);
  const onSheetDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const box = boxRef.current;
    if (!box || phase !== "open") return;
    const top = box.getBoundingClientRect().top;
    if (e.clientY - top > DRAG_ZONE || (e.target as HTMLElement).closest(".sc-tabs")) return;
    drag.current = { y0: e.clientY, y: e.clientY, t: e.timeStamp, v: 0, id: e.pointerId, moved: false };
  };
  const onSheetMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dt = Math.max(1, e.timeStamp - d.t);
    d.v = (e.clientY - d.y) / dt;
    d.y = e.clientY;
    d.t = e.timeStamp;
    const dy = Math.max(0, e.clientY - d.y0);
    if (!d.moved && dy > 4) {
      d.moved = true;
      boxRef.current?.setPointerCapture(e.pointerId);
    }
    if (d.moved) setDragY(dy);
  };
  const onSheetUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;
    const dy = Math.max(0, e.clientY - d.y0);
    // A finger that stopped before letting go has no release speed, however fast it moved earlier.
    const v = e.timeStamp - d.t > 80 ? 0 : d.v;
    if (dy > DISMISS_PX || v > DISMISS_V) {
      close();
      // Leave the inline drag position in place: the close transition runs from where the finger let go.
    } else setDragY(null);
  };

  const opened = phase === "open" || phase === "leave";
  const scrimProps = {
    className: `sc-scrim ${sheet ? "sc-scrim--sheet" : "sc-scrim--pop"}`,
    "data-phase": phase,
    "aria-hidden": true as const,
    onPointerDown: close,
    onPointerMove: sheet ? undefined : onScrimMove,
  };

  const head = (
    <div className="sc-head">
      <button type="button" className="sc-close" ref={closeBtn} onClick={close} aria-label={`Close ${show.name}`}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <p className="sc-head__name" id={titleId}>
        {show.short}
      </p>
      <div className="sc-tabs" role="tablist" aria-label={show.name} ref={tabsRef} onKeyDown={onTabKey}>
        <span
          className="sc-tabs__pill"
          data-ready={pill?.ready ? "" : undefined}
          aria-hidden="true"
          style={pill ? ({ width: pill.w, transform: `translateX(${pill.x}px)` } as CSSProperties) : { opacity: 0 }}
        />
        {beats.map((b, i) => (
          <button
            key={b.tab}
            id={tabId(i)}
            type="button"
            role="tab"
            className="sc-tabs__tab"
            aria-selected={at === i}
            aria-controls={panelId(i)}
            tabIndex={at === i ? 0 : -1}
            onClick={() => choose(i)}
          >
            {b.tab}
          </button>
        ))}
      </div>
    </div>
  );

  const panel = (
    <div className="sc-panel">
      {beats.map((b, i) => (
        <div
          key={b.tab}
          id={panelId(i)}
          className="sc-beat"
          role="tabpanel"
          aria-labelledby={tabId(i)}
          data-on={i === at ? "" : undefined}
          aria-hidden={i !== at || undefined}
          inert={i !== at || undefined}
        >
          <BeatView
            client={show}
            beat={b}
            variant={variant}
            active={opened && i === at}
            fill
            reduced={reduced}
            onCaption={i === at ? (l) => setLine((p) => (p === l ? p : l)) : undefined}
          />
        </div>
      ))}
      <p className="ps-visually-hidden" aria-live="polite">
        {line}
      </p>
    </div>
  );

  const dialogProps = {
    role: "dialog" as const,
    "aria-modal": modal || undefined,
    "aria-labelledby": titleId,
  };
  const sentinel = (to: () => void) =>
    modal ? <span tabIndex={0} data-sentinel="" className="sc-sentinel" onFocus={to} aria-hidden="true" /> : null;

  if (sheet) {
    const style = dragY !== null ? ({ transform: phase === "leave" ? undefined : `translateY(${dragY}px)` } as CSSProperties) : undefined;
    return createPortal(
      <div className="sc-root">
        <div {...scrimProps} />
        <div
          ref={boxRef}
          className="sc-sheet"
          data-phase={phase}
          data-drag={dragY !== null && phase !== "leave" ? "" : undefined}
          data-settled={settled && phase === "open" ? "" : undefined}
          style={style}
          onPointerDown={onSheetDown}
          onPointerMove={onSheetMove}
          onPointerUp={onSheetUp}
          onPointerCancel={onSheetUp}
          {...dialogProps}
        >
          {sentinel(toLast)}
          <div className="sc-sheet__grip" aria-hidden="true" />
          {head}
          {panel}
          {sentinel(toFirst)}
        </div>
      </div>,
      document.body,
    );
  }

  const style = { transform: phase === "from" ? from : undefined } as CSSProperties;
  return createPortal(
    <div className="sc-root">
      <div {...scrimProps} />
      <div
        ref={boxRef}
        className="sc-pop sc-glass"
        data-phase={phase}
        data-mode={pinned ? "pinned" : "hover"}
        style={style}
        onPointerEnter={onWinEnter}
        onPointerLeave={onWinLeave}
        onPointerDownCapture={() => {
          // Using our own chrome (a tab, home, the strip) pins a hover window. Clicks inside the
          // client's frame never reach us, and window blur differs by engine, so it is not used.
          if (!pinned) setPinned(true);
        }}
        {...dialogProps}
      >
        {sentinel(toLast)}
        <span className="sc-sheen" aria-hidden="true" />
        {head}
        {panel}
        {sentinel(toFirst)}
      </div>
    </div>,
    document.body,
  );
}
