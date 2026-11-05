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
 *            Hover-opened ("hover"): until the pointer has been inside the window's
 *            resting box once, it stays open wherever the pointer is (a card at the
 *            row's end sits outside the centred window, so the visitor crosses the
 *            scrim to reach it). After that it stays open while the pointer is
 *            inside it, including inside the client's site, and closes 400 ms after
 *            the pointer leaves. Any pointerdown on our own chrome pins it; x,
 *            Escape and a scrim click close it.
 *            Click- or key-opened ("pinned"): a modal dialog that closes only by
 *            the close button, Escape or the scrim.
 *   sheet    touch, or narrower than 900px: an opaque sheet from the bottom,
 *            swiped down from its grip and title row to dismiss.
 *   armed    hover intent has begun but not yet held: the window is mounted at its resting place,
 *            transparent and untouchable, so the Website tab's frame starts loading early. Nothing
 *            else happens (no scrim, no scroll lock, no keys) until the card clears `armed`.
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
  /** Mounted ahead of hover intent completing: invisible, inert, only the Website frame loads. */
  armed?: boolean;
  onClose: () => void;
}

type Phase = "measure" | "from" | "open" | "leave";

function Layer({ show, anchor, mode, armed = false, onClose }: LayerProps & { show: ShowcaseClient }) {
  const [sheet] = useState(isSheetLayout);
  const [reduced] = useState(prefersReduced);
  // A sheet mounts already "open" and rises by a CSS animation that starts on its first frame: the old
  // "from" state needed two more frames first, and on a slow phone each frame of this page is the cost
  // (critic r2 W2, WebKit: ~0.6 s between the sheet entering the DOM and its first visible frame).
  const [phase, setPhase] = useState<Phase>(sheet ? "open" : "measure");
  const [at, setAt] = useState(0);
  // Tabs are built when first shown, not all at once on open: the open is one tab's work, not five.
  const [built, setBuilt] = useState<ReadonlySet<number>>(() => new Set([0]));
  useEffect(() => {
    setBuilt((b) => (b.has(at) ? b : new Set(b).add(at)));
  }, [at]);
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
    if (sheet || armed) return;
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
  }, [anchor, sheet, armed]);

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
    if (armed) return;
    const html = document.documentElement;
    // Keep the gutter only where a classic scrollbar takes room; an overlay scrollbar has none to keep.
    const gutter = window.innerWidth - html.clientWidth > 0;
    html.classList.add("sc-lock");
    if (gutter) html.classList.add("sc-lock--gutter");
    if (sheet) html.classList.add("sc-sheet-open");
    return () => html.classList.remove("sc-lock", "sc-lock--gutter", "sc-sheet-open");
  }, [sheet, armed]);

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

  // The pointer has been inside the window's RESTING box at least once. Until then nothing closes a
  // hover window but x, Escape or a scrim click: the window grows out of the card, so on a wide screen
  // its edge sweeps past a pointer resting on an end card (FarmBooks at 1920, NWKS at 2560), and the
  // old rule closed it 400 ms later while the visitor was still on the way in, then the card under the
  // pointer opened again (debug report 2026-11-04, all three engines).
  const entered = useRef(false);
  const inFinal = (e: ReactPointerEvent) => {
    const fin = finalBox.current;
    return fin ? e.clientX >= fin.left && e.clientX <= fin.right && e.clientY >= fin.top && e.clientY <= fin.bottom : false;
  };
  const onWinEnter = (e: ReactPointerEvent) => {
    inside.current = true;
    if (inFinal(e)) entered.current = true;
    disarmLeave();
  };
  const onWinMove = (e: ReactPointerEvent) => {
    if (!entered.current && inFinal(e)) entered.current = true;
  };
  const onWinLeave = (e: ReactPointerEvent) => {
    if (!hover || !entered.current) return;
    const edge = e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth - 1 || e.clientY >= window.innerHeight - 1;
    if (edge) return;
    inside.current = false;
    armLeave();
  };
  // Over the scrim: the pointer is outside the window's final box (it may still be growing under the pointer).
  const onScrimMove = (e: ReactPointerEvent) => {
    if (!hover || !entered.current || inFinal(e)) return;
    inside.current = false;
    armLeave();
  };

  // ── Keyboard: Escape closes either kind (while focus is in our document; Escape inside the client's site is theirs).
  useEffect(() => {
    if (armed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close, armed]);

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

  // Labels that do not fit side by side (Duffer's five tabs on a phone sheet, design spec r2 §1.1) turn
  // the bar into a horizontal scroll strip; labels are never squeezed, overprinted or cut. Measured from
  // the labels' own text, so the answer is the same in either layout (no flip-flop between them).
  const [scrollTabs, setScrollTabs] = useState(false);
  // The strip's end is padded just enough that its last resting place also starts on a tab, so the left edge
  // never shows the tail of a word ("nter", "mmand Center": critic r2 W3) even fully scrolled.
  const padEnd = useCallback(() => {
    const track = tabsRef.current;
    if (!track) return;
    const tabs = [...track.querySelectorAll<HTMLElement>(".sc-tabs__tab")];
    let pad = "";
    if (track.hasAttribute("data-scroll") && tabs.length) {
      const last = tabs[tabs.length - 1];
      const end = last.offsetLeft + last.offsetWidth + 4; // content end with the track's own 4 px
      const cw = track.clientWidth;
      const start = tabs.map((t) => t.offsetLeft - 4).find((x) => x + cw >= end);
      const extra = start === undefined ? 0 : Math.max(0, Math.ceil(start + cw - end));
      if (extra > 0) pad = `${4 + extra}px`;
    }
    if (track.style.paddingRight !== pad) track.style.paddingRight = pad;
  }, []);
  const keepInView = useCallback((smooth: boolean) => {
    const track = tabsRef.current;
    if (!track || !track.hasAttribute("data-scroll")) return;
    const t = track.querySelector<HTMLElement>(`[aria-selected="true"]`);
    if (!t) return;
    const cw = track.clientWidth;
    const max = Math.max(0, track.scrollWidth - cw);
    const L = t.offsetLeft;
    const R = L + t.offsetWidth;
    const CLEAR = 28; // the fade (20) and a little air
    const fits = (c: number) => (c <= 0 ? L >= 0 : L - c >= CLEAR) && (c >= max ? R <= c + cw : c + cw - R >= CLEAR);
    const starts = [0, max, ...[...track.querySelectorAll<HTMLElement>(".sc-tabs__tab")].map((x) => Math.min(max, Math.max(0, x.offsetLeft - 4)))];
    // No tab-aligned rest fits (a long label on a 320 phone): the selected tab sits just clear of the left
    // fade, so at most the fade's width of the previous label shows, under the fade.
    let ok = starts.filter(fits);
    if (!ok.length) ok = [L - CLEAR, R + CLEAR - cw].map((c) => Math.min(max, Math.max(0, c))).filter(fits).slice(0, 1);
    const now = track.scrollLeft;
    const left = ok.length
      ? ok.reduce((best, c) => (Math.abs(c - now) < Math.abs(best - now) ? c : best), ok[0])
      : Math.min(max, Math.max(0, L - (cw - t.offsetWidth) / 2));
    if (Math.abs(left - now) > 0.5) track.scrollTo({ left, behavior: smooth && !reduced ? "smooth" : "auto" });
  }, [reduced]);
  // In the strip, a fade marks whichever edge has tabs hidden past it.
  const edges = useCallback(() => {
    const track = tabsRef.current;
    if (!track) return;
    const on = track.hasAttribute("data-scroll");
    track.toggleAttribute("data-fade-l", on && track.scrollLeft > 1);
    track.toggleAttribute("data-fade-r", on && track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);
  useEffect(() => {
    const track = tabsRef.current;
    if (!track) return;
    let live = true;
    const fit = () => {
      if (!live) return;
      let need = 8; // the track's own padding
      track.querySelectorAll<HTMLElement>(".sc-tabs__tab").forEach((t) => {
        const r = document.createRange();
        r.selectNodeContents(t);
        // 10px a side: below that the labels read as one run ("Command Center MarCommand", WebKit at 430).
        need += r.getBoundingClientRect().width + 20;
      });
      setScrollTabs(need > track.clientWidth + 1);
      requestAnimationFrame(() => {
        padEnd();
        keepInView(false);
        edges();
      });
    };
    fit();
    document.fonts?.ready.then(fit).catch(() => {});
    const ro = new ResizeObserver(fit);
    ro.observe(track);
    return () => {
      live = false;
      ro.disconnect();
    };
  }, [edges, keepInView, padEnd]);
  // The selected tab stays in view, whole and clear of the 20 px edge fades, and the strip comes to rest
  // with a tab's start at its left edge so no cut-off word sits there (critic r2 W3: "MarCommand" ran into
  // the right fade; "ommand Center" was cut at the left). Computed by hand: the engines disagree on
  // scroll-padding for programmatic scrolls, and scroll snapping moved the strip after we placed it.
  // At once on open and under reduced motion, smoothly after.
  const scrolledOnce = useRef(false);
  useEffect(() => {
    if (scrollTabs) {
      padEnd();
      keepInView(scrolledOnce.current);
      scrolledOnce.current = true;
    }
    edges();
  }, [at, scrollTabs, keepInView, edges, padEnd]);

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
  }, [at, scrollTabs]);

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
  // A settled sheet covers the whole page but its top strip. Then the page under it, and the scrim, stop
  // being drawn: drawn, they made Chromium composite the page in big layers and the sheet's scene frame in
  // a layer of its own for as long as the sheet was open (LayerTree, 390x844 at DPR 3: ~10 MB for the
  // frame alone, iOS Safari dropped the page ~1 s into a tab). They come back for any movement: a drag,
  // the close, the next open.
  const covered = sheet && phase === "open" && settled && dragY === null;
  useEffect(() => {
    if (!covered) return;
    const html = document.documentElement;
    html.classList.add("sc-sheet-covered");
    return () => html.classList.remove("sc-sheet-covered");
  }, [covered]);
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
      <div
        className="sc-tabs"
        role="tablist"
        aria-label={show.name}
        ref={tabsRef}
        onKeyDown={onTabKey}
        data-scroll={scrollTabs ? "" : undefined}
        onScroll={scrollTabs ? edges : undefined}
      >
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
          {built.has(i) || i === at ? <BeatView
            client={show}
            beat={b}
            variant={variant}
            active={(opened || (armed && b.kind === "website")) && i === at}
            fill
            reduced={reduced}
            onCaption={i === at ? (l) => setLine((p) => (p === l ? p : l)) : undefined}
          /> : null}
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
          data-rise={!settled && phase === "open" ? "" : undefined}
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
    <div className="sc-root" data-armed={armed ? "" : undefined} aria-hidden={armed || undefined} inert={armed || undefined}>
      <div {...scrimProps} />
      <div
        ref={boxRef}
        className="sc-pop sc-glass"
        data-phase={phase}
        data-mode={pinned ? "pinned" : "hover"}
        style={style}
        onPointerEnter={onWinEnter}
        onPointerMove={hover ? onWinMove : undefined}
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
