"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "./scenes.css";

/**
 * Scene kit: what every "AI at work" / automation scene shares.
 *
 * A scene is one picture at a native size (desk 1280 x 800, phone 390 x 600,
 * the same sizes the command-center frame scales), played as a timeline of
 * beats. Beat N is "on" once its cue has passed.
 *
 * End state first: the first render is the FINAL frame (every number landed,
 * last caption up). That is what server HTML, no JavaScript, the privacy probe
 * and prefers-reduced-motion see. On mount, with motion allowed, the scene
 * remounts at beat 0 and plays; each loop fades out, remounts and plays again.
 */
export type SceneLayout = "desk" | "phone";

export interface SceneProps {
  layout: SceneLayout;
  /** False holds the final frame (e.g. while the slide is off screen). */
  playing?: boolean;
  /** Replay after the last beat has held. Default true. */
  loop?: boolean;
  /**
   * Show the "Demonstration data" label inside the scene. Turn it off when the
   * surrounding frame already carries the one data-demo-label for its stage.
   */
  label?: boolean;
}

export const NATIVE_SIZE: Record<SceneLayout, { w: number; h: number }> = {
  desk: { w: 1280, h: 800 },
  phone: { w: 390, h: 600 },
};

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The beat clock. `cues` are ms from the start of a run, ascending; `step` is
 * how many have passed (0 = nothing yet, cues.length = final). `run` is -1 for
 * the static final frame and counts up per played loop: key the scene body on
 * it so each loop starts from a fresh mount, never from a reverse transition.
 */
export function useTimeline(cues: readonly number[], { playing = true, loop = true, holdMs = 3200 } = {}) {
  const final = cues.length;
  const [state, setState] = useState({ run: -1, step: final, fading: false });
  const runRef = useRef(-1);

  useIsoLayoutEffect(() => {
    if (!playing || prefersReduced()) {
      setState({ run: -1, step: final, fading: false });
      return;
    }
    const timers: number[] = [];
    const start = () => {
      runRef.current += 1;
      const run = runRef.current;
      setState({ run, step: 0, fading: false });
      cues.forEach((ms, i) => timers.push(window.setTimeout(() => setState((s) => (s.run === run ? { ...s, step: i + 1 } : s)), ms)));
      if (loop) {
        const end = cues[cues.length - 1] + holdMs;
        timers.push(window.setTimeout(() => setState((s) => ({ ...s, fading: true })), end - 420));
        timers.push(window.setTimeout(start, end));
      }
    };
    start();
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [playing, loop, final]);

  return state;
}

/** A number that rolls to its new value. Mounts at its value, no roll. */
export function Count({
  value,
  ms = 900,
  format = (n: number) => String(Math.round(n)),
  className,
}: {
  value: number;
  ms?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (from.current === value) return;
    if (prefersReduced() || ms === 0) {
      from.current = value;
      setShown(value);
      return;
    }
    const a = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      setShown(a + (value - a) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      from.current = value;
    };
  }, [value, ms]);
  return <span className={className ? `scn-num ${className}` : "scn-num"}>{format(shown)}</span>;
}

export const money = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const whole = (n: number) => Math.round(n).toLocaleString("en-US");

/** Text that types itself once `on` turns true. Full text when mounted on. */
export function Typed({ text, on, cps = 26, delay = 0 }: { text: string; on: boolean; cps?: number; delay?: number }) {
  const [n, setN] = useState(on ? text.length : 0);
  const was = useRef(on);
  useEffect(() => {
    if (!on) {
      was.current = false;
      setN(0);
      return;
    }
    if (was.current) return;
    was.current = true;
    if (prefersReduced()) {
      setN(text.length);
      return;
    }
    let i = 0;
    let iv = 0;
    const t = window.setTimeout(() => {
      iv = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) window.clearInterval(iv);
      }, 1000 / cps);
    }, delay);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(iv);
    };
  }, [on, text, cps, delay]);
  const typing = on && n < text.length;
  return (
    <span className="scn-typed">
      {text.slice(0, n)}
      {typing ? <i className="scn-caret" aria-hidden="true" /> : null}
    </span>
  );
}

/** The one caption line under the picture: one line per beat, cross-faded. */
export function Caption({ lines, index }: { lines: readonly string[]; index: number }) {
  const at = Math.max(0, Math.min(lines.length - 1, index));
  return (
    <div className="scn-caption">
      {lines.map((l, i) => (
        <p key={i} className={i === at ? "scn-caption__line is-on" : "scn-caption__line"} aria-hidden={i !== at || undefined}>
          {l}
        </p>
      ))}
    </div>
  );
}

/**
 * The scene's root: native size, theme-aware palette (`brand` picks it),
 * and the label. The picture is decorative; `summary` is what a screen reader
 * hears instead of every moving number.
 */
export function SceneRoot({
  brand,
  layout,
  label = true,
  fading,
  summary,
  scene,
  step,
  children,
  style,
}: {
  brand: "hg" | "fb" | "nw";
  layout: SceneLayout;
  label?: boolean;
  fading?: boolean;
  summary: string;
  scene: string;
  step: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`scn scn--${brand} scn--${layout}${fading ? " is-fading" : ""}`}
      data-scene={scene}
      data-step={step}
      role="img"
      aria-label={summary}
      style={style}
    >
      {children}
      {label ? (
        <span className="scn-label" data-demo-label aria-hidden="true">
          Demonstration data
        </span>
      ) : null}
    </div>
  );
}

/**
 * What kind of work the scene shows, said truthfully: "AI at work" (COI and
 * FarmBooks, where a model reads and decides), "Automation" (the SWD close:
 * no model in it), "Custom built" (the NWKS bed board: rules written for one camp).
 */
export function KindPill({ kind }: { kind: "ai" | "auto" | "custom" }) {
  return (
    <span className={`scn-kind scn-kind--${kind}`}>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {kind === "ai" ? (
          <path d="M8 1.5l1.5 4.2 4.3 1.5-4.3 1.5L8 13l-1.5-4.3L2.2 7.2l4.3-1.5zM13 11l.6 1.6 1.6.6-1.6.6L13 15.4l-.6-1.6-1.6-.6 1.6-.6z" fill="currentColor" />
        ) : kind === "auto" ? (
          <path d="M8 2.5a5.5 5.5 0 1 0 5.2 3.7M13.5 2v4h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M3 13.5 9.5 7M9 3.5a3 3 0 0 0 3.5 3.5L14 5.5 10.5 2zM2.5 14l1-1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
      {kind === "ai" ? "AI at work" : kind === "auto" ? "Automation" : "Custom built"}
    </span>
  );
}

/** Index of a deterministic shuffle, so a wall of tiles looks organic but renders the same on server and client. */
export function seeded(n: number, seed: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  let s = seed >>> 0;
  for (let i = n - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
