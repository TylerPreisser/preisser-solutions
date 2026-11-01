"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "./scenes.css";

/**
 * Scene kit: what every "AI at work" / automation scene shares.
 *
 * A scene is one picture at a native size (desk 1280 x 800, phone 300 x PHONE_H,
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
  /**
   * Draw the caption pill inside the picture. Off when a frame shows the line
   * in its own caption slot (the showcase window): never both.
   */
  caption?: boolean;
  /** Called with the current step's caption line whenever it changes. */
  onCaption?: (line: string) => void;
}

/**
 * Desk is the 1280 x 800 picture the popover scales. Phone is laid out 300
 * wide (round 7): every phone sheet is 286 to 396 css px wide, so the picture
 * is scaled to the sheet's WIDTH (1.0x or more at 320) and a 12 px native face
 * never draws under 11 css px. It is taller than a short phone's sheet shows,
 * so a camera moves down it step by step (SCENE_CAM in ./index.ts), the way
 * the funnel's camera moves along the dashboard. No letterbox bars.
 */
export const NATIVE_SIZE: Record<SceneLayout, { w: number; h: number }> = {
  desk: { w: 1280, h: 800 },
  phone: { w: 300, h: 460 },
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
    const lo = Math.min(a, value);
    const hi = Math.max(a, value);
    const tick = (now: number) => {
      // Clamped at 0: a rAF timestamp can be earlier than t0, and a negative
      // progress rolled the number past where it started (critique r6 A1).
      const p = Math.min(1, Math.max(0, (now - t0) / ms));
      const e = 1 - Math.pow(1 - p, 3);
      setShown(Math.max(lo, Math.min(hi, a + (value - a) * e)));
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

/**
 * A set of whole numbers that rolls together from one state to the next and
 * keeps the same total in every frame (the COI wall: Covered + Expiring + Not
 * covered + Needs you is 192 at every instant, critique r6 A1). The change is
 * a list of one-unit moves from the parts that fall to the parts that rise,
 * spread evenly; one eased progress says how many have happened. So every
 * part moves one way only and the parts always add up to the whole.
 */
export function useRollSet(values: readonly number[], ms = 900): number[] {
  const key = values.join(",");
  const [shown, setShown] = useState<number[]>(() => [...values]);
  const from = useRef<number[]>([...values]);
  useEffect(() => {
    const to = key.split(",").map(Number);
    const a = from.current;
    if (a.join(",") === key) return;
    if (prefersReduced() || ms === 0) {
      from.current = to;
      setShown(to);
      return;
    }
    const moves = unitMoves(a, to);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / ms));
      const e = 1 - Math.pow(1 - p, 3);
      const k = Math.round(moves.length * e);
      const v = [...a];
      for (let j = 0; j < k; j++) {
        v[moves[j][0]] -= 1;
        v[moves[j][1]] += 1;
      }
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      from.current = to;
    };
  }, [key, ms]);
  return shown;
}

/** One-unit moves [from part, to part] that turn `a` into `b` (same total), each side spread evenly over the roll. */
export function unitMoves(a: readonly number[], b: readonly number[]): [number, number][] {
  const spread = (sign: 1 | -1) =>
    a
      .flatMap((x, i) => {
        const d = (b[i] - x) * sign;
        return Array.from({ length: Math.max(0, d) }, (_, k) => ({ i, at: (k + 0.5) / d }));
      })
      .sort((p, q) => p.at - q.at)
      .map((u) => u.i);
  const down = spread(-1);
  const up = spread(1);
  return down.slice(0, up.length).map((i, j) => [i, up[j]]);
}

/**
 * How many of `count` items have landed: all of them when mounted on (the
 * final frame, reduced motion), otherwise one every `every` ms from `at` after
 * `on` turns true.
 */
export function useReveal(on: boolean, count: number, at: number, every: number) {
  const [n, setN] = useState(on ? count : 0);
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
      setN(count);
      return;
    }
    const ts = Array.from({ length: count }, (_, i) => window.setTimeout(() => setN(i + 1), at + i * every));
    return () => ts.forEach((t) => window.clearTimeout(t));
  }, [on, count, at, every]);
  return n;
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

/**
 * The one caption line: one line per beat, cross-faded. It reports the
 * current line to `onLine` (the window's caption slot) and, when `show` is
 * false, draws nothing itself, so a reader never sees the line twice.
 */
export function Caption({
  lines,
  index,
  show = true,
  onLine,
}: {
  lines: readonly string[];
  index: number;
  show?: boolean;
  onLine?: (line: string) => void;
}) {
  const at = Math.max(0, Math.min(lines.length - 1, index));
  const report = useRef(onLine);
  report.current = onLine;
  const line = lines[at];
  // Report on every new line, and again when a listener attaches (a beat
  // becoming active under reduced motion keeps its final line, so the line
  // itself does not change).
  const listening = Boolean(onLine);
  useEffect(() => {
    if (listening) report.current?.(line);
  }, [line, listening]);
  if (!show) return null;
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
