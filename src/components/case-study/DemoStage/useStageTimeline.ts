"use client";

import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, type RefObject } from "react";
import type { DemoStep } from "@/types/demo-stage";
import { intText, usdCents } from "@/data/demos/_money";

/*
 * THE STEP ENGINE (ADR-0016 §3). One integer per track decides what shows.
 *
 *   base    Markup plus CSS is the END frame. Nothing rests at opacity 0.
 *   arm     Only if the track is below the fold at mount: jump to step 0,
 *           transitions off (reveal-motion.md:135-141).
 *   go      On entry: one step per hold, transitions on.
 *   disarm  At the last step, once transitions settle, every engine attribute
 *           is removed, so the resting DOM matches the server's
 *           (reveal-motion.md:123 measured 863 px of residue when left on).
 *
 * No JS, reduced motion, Data Saver, no IntersectionObserver, or a track
 * already on screen at mount: never armed, so the end frame shows.
 *
 * Contract with scenes:
 *   data-stage-step="k"   element arrives at step k (1..n). Optional
 *                         data-fx="rise|pop|sweep|ghost" (default: fade).
 *   data-stage-until="k"  before-state element, visible only while armed and
 *                         before step k; hidden at rest. Put it in a .demo-swap
 *                         cell with its replacement so the row never resizes.
 *   data-count-to="N"     with data-stage-step, counts up when step k lands.
 *                         data-count-from (default 0), data-count-format
 *                         ("usd-cents" | "int"). Its text MUST already be the
 *                         formatted final value; the count ends on that text.
 * Tracks never nest. `steps` must be referentially stable (module data).
 */

const DEFAULT_HOLD_MS = 1800;
const FIRST_STEP_DELAY_MS = 350;
/** --demo-dur is 520ms in demo-stage.css. Change both together. */
const SETTLE_MS = 800;
const COUNT_MS = 700;
/**
 * The single band both the mount-time "already seen" check and the
 * IntersectionObserver's start line use (critic-BO.md M2): a track must never
 * arm at one line and start at a different, later one, or it can rest on
 * screen armed and blank at a natural stopping point (a beat's end).
 */
const ENTRY_LINE = 0.9;
/**
 * Designed clearance between a scrolled-to step's bottom and the pinned phone
 * bar's top. Zero (the old flush landing) let the browser's rounding of the
 * fractional scroll tip tall cards up to 2px under the bar (FarmBooks read at
 * 320x568, fb-stage-gatefix-20260929.md); 8px is a visible gap no rounding
 * closes. The scroll aims SCROLL_ROUNDING_PX further, because scrollIntoView
 * itself lands up to 0.5px short of its target (measured at 8px: 7.5-7.99px
 * in chromium, webkit and firefox at 320-393 wide), and 8px is the floor.
 */
export const BAR_CLEARANCE_PX = 8;
const SCROLL_ROUNDING_PX = 1;
/**
 * A tour-followed tick waits until the window has been still this long, so a
 * step never scrolls while the tour's own panel scroll is still travelling
 * (a second smooth scrollIntoView replaces the first mid-flight, and the
 * panel would never land under its tab bar).
 */
const SCROLL_IDLE_MS = 150;

// When the window last scrolled, for SCROLL_IDLE_MS. One passive listener for
// every track, attached on the first mount.
let lastWindowScroll = -Infinity;
let scrollClock = false;
function startScrollClock(): void {
  if (scrollClock) return;
  scrollClock = true;
  window.addEventListener(
    "scroll",
    () => {
      lastWindowScroll = performance.now();
    },
    { passive: true },
  );
}

export interface TimelineState {
  n: number;
  step: number;
  armed: boolean;
  instant: boolean;
  auto: boolean;
  js: boolean;
  reduced: boolean;
}

export type TimelineAction =
  | { type: "hydrate"; reduced: boolean }
  | { type: "arm" }
  | { type: "start" }
  | { type: "tick" }
  | { type: "next" }
  | { type: "back" }
  | { type: "goto"; step: number }
  | { type: "stop" }
  | { type: "settle" };

/** The server render and the first client render: the end frame. */
export function endState(n: number): TimelineState {
  return { n, step: n, armed: false, instant: false, auto: false, js: false, reduced: false };
}

export function timelineReducer(s: TimelineState, a: TimelineAction): TimelineState {
  const clamp = (k: number) => Math.max(0, Math.min(s.n, k));
  switch (a.type) {
    case "hydrate":
      return { ...s, js: true, reduced: a.reduced };
    case "arm":
      return { ...s, step: 0, armed: true, instant: true, auto: false };
    case "start":
      return { ...s, step: 0, armed: true, instant: true, auto: true };
    case "tick": {
      if (!s.auto) return s;
      const step = clamp(s.step + 1);
      return { ...s, step, instant: s.reduced, auto: step < s.n };
    }
    case "next":
      return s.step >= s.n ? s : { ...s, step: s.step + 1, armed: true, instant: s.reduced, auto: false };
    case "back":
      return s.step <= 0 ? s : { ...s, step: s.step - 1, armed: true, instant: s.reduced, auto: false };
    case "goto": {
      const step = clamp(a.step);
      if (step === s.step && !s.auto) return s;
      return { ...s, step, armed: true, instant: s.reduced, auto: false };
    }
    case "stop":
      return s.auto ? { ...s, auto: false } : s;
    case "settle":
      return s.armed && !s.auto && s.step === s.n ? { ...s, armed: false, instant: false } : s;
  }
}

/** Elements of THIS track only. Tracks never nest; the filter makes a mistake local. */
function own(root: HTMLElement, selector: string): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.closest("[data-track]") === root,
  );
}

function applyState(root: HTMLElement, s: TimelineState): void {
  root.toggleAttribute("data-track-js", s.js);
  root.toggleAttribute("data-track-armed", s.armed);
  root.toggleAttribute("data-track-instant", s.armed && s.instant);
  root.setAttribute("data-track-step", String(s.step));
  root.setAttribute(
    "data-track-state",
    !s.armed && s.step === s.n ? "end" : s.auto ? "playing" : "paused",
  );
  for (const el of own(root, "[data-stage-step]")) {
    el.toggleAttribute("data-pending", s.armed && Number(el.dataset.stageStep) > s.step);
  }
  for (const el of own(root, "[data-stage-until]")) {
    el.toggleAttribute("data-live", s.armed && s.step < Number(el.dataset.stageUntil));
  }
  // Commit an instant jump before the next, transitioned, change reads styles.
  if (s.armed && s.instant) void root.offsetWidth;
}

const FINAL_TEXT = new WeakMap<HTMLElement, string>();

function runCount(el: HTMLElement): () => void {
  const to = Number(el.dataset.countTo);
  const from = Number(el.dataset.countFrom ?? "0");
  const format = el.dataset.countFormat === "usd-cents" ? usdCents : intText;
  if (!FINAL_TEXT.has(el)) FINAL_TEXT.set(el, el.textContent ?? "");
  const final = FINAL_TEXT.get(el) ?? "";
  if (!Number.isFinite(to) || !Number.isFinite(from)) return () => undefined;
  const t0 = performance.now();
  let raf = 0;
  const frame = (t: number) => {
    const p = Math.min(1, (t - t0) / COUNT_MS);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = p < 1 ? format(from + (to - from) * eased) : final;
    if (p < 1) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    el.textContent = final;
  };
}

export interface StageTimeline {
  state: TimelineState;
  trackProps: {
    ref: RefObject<HTMLDivElement | null>;
    "data-track": "";
    "data-track-n": number;
  };
  next: () => void;
  back: () => void;
  goto: (step: number) => void;
  replay: () => void;
  stop: () => void;
}

export interface TimelineOptions {
  autoplay?: "entry" | "manual";
  onEnd?: () => void;
  /**
   * Asked at every autoplay tick: true while a tour drives this track and
   * still owns the page's scroll (TabbedScreen). A followed tick scrolls its
   * step clear exactly like a Next tap; every other tick never scrolls.
   */
  follow?: () => boolean;
  /** Asked before a followed tick fires: false while the tour's own scroll is still travelling. */
  followReady?: () => boolean;
  /** Called right before this track scrolls the window (a tap or a followed tick). */
  onScroll?: () => void;
  /**
   * Px a scrolled-to step must keep clear at the viewport top, e.g. under a
   * pinned tab bar. 0 (the default) leaves the top edge alone.
   */
  topInset?: () => number;
}

export function useStageTimeline(steps: readonly DemoStep[], options: TimelineOptions = {}): StageTimeline {
  const ref = useRef<HTMLDivElement | null>(null);
  const [s, dispatch] = useReducer(timelineReducer, steps.length, endState);
  const autoplay = options.autoplay ?? "entry";
  const onEnd = useRef(options.onEnd);
  const follow = useRef(options.follow);
  const followReady = useRef(options.followReady);
  const onScroll = useRef(options.onScroll);
  const topInset = useRef(options.topInset);
  const prevStep = useRef(s.step);
  const counters = useRef<Array<() => void>>([]);
  const wasArmed = useRef(false);
  // Set right before a DIRECT-action dispatch (next/back/goto/replay), and
  // before a tick ONLY when a tour follows it (`options.follow`) -- never
  // before any other "tick" (an autoplay step) or "arm"/"hydrate"/"start"/
  // "settle". AUTOPLAY NEVER SCROLLS THE WINDOW (lane F4, 2026-09-28): two
  // tracks autoplaying near the same viewport position each moved
  // window.scrollY toward its own target, and the two fought (Firefox
  // measured: never settled inside a 5s poll). A track that starts playing
  // because it entered the viewport must not scroll at all; its reserved
  // layout (swap cells, `.demo-swap`) already keeps the revealed element
  // where it was going to be. Only a visitor's own tap moves the page, once,
  // which is what this flag scopes the scroll effect below to.
  const advanced = useRef(false);

  useEffect(() => {
    onEnd.current = options.onEnd;
    follow.current = options.follow;
    followReady.current = options.followReady;
    onScroll.current = options.onScroll;
    topInset.current = options.topInset;
  });

  // Mount: decide whether this track ever arms (marcommand-live.tsx:150, :159 order).
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    startScrollClock();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dispatch({ type: "hydrate", reduced });
    if (reduced || autoplay !== "entry") return;
    if (typeof IntersectionObserver === "undefined") return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    // The arm line and the start line MUST be the same band (critic-BO.md
    // M2 / review-F.md follow-up): arming at 90% but starting only at 65%
    // left a track resting ARMED AND BLANK whenever it stopped between the
    // two, e.g. at the natural pause after the beat above it finishes.
    if (root.getBoundingClientRect().top <= window.innerHeight * ENTRY_LINE) return; // already seen
    dispatch({ type: "arm" });
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        dispatch({ type: "start" });
      },
      // Fires when the track's top crosses the SAME line as the arm check
      // above: reachable for a track of any height, unlike a ratio threshold
      // on a tall phone beat.
      { rootMargin: `0px 0px -${Math.round((1 - ENTRY_LINE) * 100)}% 0px`, threshold: 0 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [autoplay]);

  // Apply state before paint; start counters on forward, animated steps only.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    applyState(root, s);
    const forward = s.step > prevStep.current;
    prevStep.current = s.step;
    if (!forward || s.instant || s.reduced) return;
    for (const el of own(root, "[data-count-to]")) {
      if (Number(el.dataset.stageStep) === s.step) counters.current.push(runCount(el));
    }
  }, [s]);

  // Auto-play: one step per hold; waits while the tab is hidden. Sets
  // `advanced` only for a tick a tour follows, and otherwise clears any stale
  // one -- AUTOPLAY NEVER SCROLLS THE WINDOW on its own (see the ref's own
  // comment above); the scroll effect below runs for a direct tap or a
  // followed tick.
  useEffect(() => {
    if (!s.auto) return;
    const hold = s.step === 0 ? FIRST_STEP_DELAY_MS : steps[s.step - 1]?.holdMs ?? DEFAULT_HOLD_MS;
    let t = window.setTimeout(function fire() {
      if (document.visibilityState === "hidden") {
        t = window.setTimeout(fire, 500);
        return;
      }
      const followed = follow.current?.() ?? false;
      // A followed tick lets the page come to rest first: the tour's panel
      // scroll (TabbedScreen) is usually still travelling when step 1 is due.
      if (followed && (!(followReady.current?.() ?? true) || performance.now() - lastWindowScroll < SCROLL_IDLE_MS)) {
        t = window.setTimeout(fire, SCROLL_IDLE_MS);
        return;
      }
      // Clear, not merely "don't set": a direct action whose dispatch leaves
      // `s.step` unchanged (Replay or the tour's start at step 0, goto to the
      // current step) never runs the scroll effect, so its flag would
      // otherwise survive to THIS tick and scroll the window from autoplay
      // (review-F4.md HIGH 1: measured 355-385 ms after the click, all engines).
      advanced.current = followed;
      dispatch({ type: "tick" });
    }, hold);
    return () => window.clearTimeout(t);
  }, [s.auto, s.step, steps]);

  // Keep the step a visitor just asked for clear of the phone control bar
  // (demo-stage.css's `[data-track-js] .demo-controls { position: sticky;
  // bottom: 12px }`, critic-BO.md B1: "a step that reveals an element below
  // the fold lands UNDER the sticky phone control bar"). Runs only after a
  // DIRECT action or a tour-followed tick (`advanced.current`, set only by
  // next/back/goto/replay below and by a tick `options.follow` claims --
  // never by any other tick, nor arm/hydrate/start/settle), so plain
  // autoplay, mount and the entry IntersectionObserver's first frame never
  // scroll the page.
  //
  // Targets the FRONTMOST revealed [data-stage-step] element (the highest
  // dataset.stageStep at or below the new step) rather than one matching the
  // step number exactly: a step can retire an element with no
  // [data-stage-step] of its own (e.g. a caption-only step), and `back()`
  // must re-reveal whichever element is now current, not necessarily one
  // tagged with the exact number just landed on.
  //
  // Within that step it takes the LAST element (`>=`), not the first: a step
  // that reveals two rows (the back-office Read, step 3) scrolled only its
  // upper row clear and left the lower one half under the bar at 320x568
  // (final-BO.md item 2). The rows sit in order, so clearing the last clears
  // the ones above it. Only rendered elements count: desk and phone variants
  // both render (ProductScreen.tsx), and `>=` would otherwise land on the
  // hidden variant's copy, a display:none box scrollIntoView cannot bring
  // anywhere.
  useEffect(() => {
    if (!advanced.current) return;
    advanced.current = false;
    const root = ref.current;
    if (!root) return;
    const bar = root.querySelector<HTMLElement>(".demo-controls");
    if (!bar) return;
    let el: HTMLElement | null = null;
    let elStep = -1;
    for (const e of own(root, "[data-stage-step]")) {
      if (e.getClientRects().length === 0) continue;
      const k = Number(e.dataset.stageStep);
      if (k <= s.step && k >= elStep) {
        el = e;
        elStep = k;
      }
    }
    if (!el) return;
    // Only phones and tablets pin the bar (demo-stage.css `@media
    // (max-width: 1023px)`); desktop's `.demo-controls` is static, in flow
    // below the content, so it never covers a step there and needs no
    // margin. Read from the LIVE element, not a cached flag, so a resize
    // across the breakpoint during a play stays correct.
    if (getComputedStyle(bar).position === "sticky") {
      const barRect = bar.getBoundingClientRect();
      // getComputedStyle().bottom on a sticky box resolves the declared
      // length (demo-stage.css: `bottom: 12px`) regardless of whether the
      // bar is currently pinned, so this is correct even before the page
      // has scrolled the bar into its stuck position.
      const pinGap = parseFloat(getComputedStyle(bar).bottom) || 0;
      el.style.scrollMarginBottom = `${barRect.height + pinGap + BAR_CLEARANCE_PX + SCROLL_ROUNDING_PX}px`;
    } else {
      el.style.scrollMarginBottom = "0px";
    }
    // The top edge: clear of a pinned tab bar when the owner asks
    // (TabbedScreen's topInset), so "nearest" never tucks the step's top
    // under it; otherwise untouched, as before.
    const inset = topInset.current?.() ?? 0;
    el.style.scrollMarginTop = inset > 0 ? `${inset}px` : "";
    onScroll.current?.();
    el.scrollIntoView({ block: "nearest", behavior: s.reduced ? "instant" : "smooth" });
  }, [s.step, s.reduced]);

  // Disarm once the last step has settled.
  useEffect(() => {
    if (!(s.armed && !s.auto && s.step === s.n)) return;
    const t = window.setTimeout(() => dispatch({ type: "settle" }), s.instant ? 0 : SETTLE_MS);
    return () => window.clearTimeout(t);
  }, [s.armed, s.auto, s.step, s.n, s.instant]);

  // Report the end once per play (the tour listens).
  useEffect(() => {
    if (s.armed) {
      wasArmed.current = true;
    } else if (wasArmed.current && s.step === s.n) {
      wasArmed.current = false;
      onEnd.current?.();
    }
  }, [s.armed, s.step, s.n]);

  useEffect(() => {
    const list = counters.current;
    return () => list.forEach((stop) => stop());
  }, []);

  const next = useCallback(() => {
    advanced.current = true;
    dispatch({ type: "next" });
  }, []);
  const back = useCallback(() => {
    advanced.current = true;
    dispatch({ type: "back" });
  }, []);
  const goto = useCallback((step: number) => {
    advanced.current = true;
    dispatch({ type: "goto", step });
  }, []);
  const replay = useCallback(() => {
    // A direct tap, listed with Next/Back: mark it, even though "start"
    // resets to step 0 where nothing is revealed yet (own() below finds no
    // element), so there is nothing to scroll to today -- kept for
    // consistency should a future scene ever reveal something at step 0.
    // When "start" leaves the step at 0 the flag is never consumed here; the
    // autoplay timer clears it before its first tick (above).
    advanced.current = true;
    dispatch({ type: "start" });
  }, []);
  const stop = useCallback(() => dispatch({ type: "stop" }), []);

  return {
    state: s,
    trackProps: { ref, "data-track": "", "data-track-n": s.n },
    next,
    back,
    goto,
    replay,
    stop,
  };
}
