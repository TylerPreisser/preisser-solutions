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

export function useStageTimeline(
  steps: readonly DemoStep[],
  options: { autoplay?: "entry" | "manual"; onEnd?: () => void } = {},
): StageTimeline {
  const ref = useRef<HTMLDivElement | null>(null);
  const [s, dispatch] = useReducer(timelineReducer, steps.length, endState);
  const autoplay = options.autoplay ?? "entry";
  const onEnd = useRef(options.onEnd);
  const prevStep = useRef(s.step);
  const counters = useRef<Array<() => void>>([]);
  const wasArmed = useRef(false);

  useEffect(() => {
    onEnd.current = options.onEnd;
  });

  // Mount: decide whether this track ever arms (marcommand-live.tsx:150, :159 order).
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dispatch({ type: "hydrate", reduced });
    if (reduced || autoplay !== "entry") return;
    if (typeof IntersectionObserver === "undefined") return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    if (root.getBoundingClientRect().top <= window.innerHeight * 0.9) return; // already seen
    dispatch({ type: "arm" });
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        dispatch({ type: "start" });
      },
      // Fires when the track's top crosses 65% of the viewport: reachable for a
      // track of any height, unlike a ratio threshold on a tall phone beat.
      { rootMargin: "0px 0px -35% 0px", threshold: 0 },
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

  // Auto-play: one step per hold; waits while the tab is hidden.
  useEffect(() => {
    if (!s.auto) return;
    const hold = s.step === 0 ? FIRST_STEP_DELAY_MS : steps[s.step - 1]?.holdMs ?? DEFAULT_HOLD_MS;
    let t = window.setTimeout(function fire() {
      if (document.visibilityState === "hidden") {
        t = window.setTimeout(fire, 500);
        return;
      }
      dispatch({ type: "tick" });
    }, hold);
    return () => window.clearTimeout(t);
  }, [s.auto, s.step, steps]);

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

  const next = useCallback(() => dispatch({ type: "next" }), []);
  const back = useCallback(() => dispatch({ type: "back" }), []);
  const goto = useCallback((step: number) => dispatch({ type: "goto", step }), []);
  const replay = useCallback(() => dispatch({ type: "start" }), []);
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
