"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { PortalMark, PortalTheme, RailIcon, ShowcaseClient } from "@/data/showcase/types";
import { fontStack, fontVars } from "./fonts";

export type Variant = "desk" | "phone";

/** What every beat is handed by the window. */
export interface BeatProps<B> {
  client: ShowcaseClient;
  beat: B;
  variant: Variant;
  /** This beat is the one on screen: its timeline runs from the start each time it becomes true. */
  active: boolean;
  /** Fill the height the phone sheet gives instead of a fixed 1.6 ratio. */
  fill: boolean;
  reduced: boolean;
  /** Not the first stage with this name on the page: hide it from assistive tech. */
  quiet?: boolean;
  /** A beat whose line changes as it plays (a scene) reports it here; the window shows it in its caption slot. */
  onCaption?: (line: string) => void;
}

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Live width and height of an element. */
export function useBox(ref: React.RefObject<HTMLElement | null>) {
  const [box, setBox] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return box;
}

/**
 * A timeline that restarts each time `active` turns true: `at` is a list of
 * [ms, step] pairs; the hook returns the latest step reached. Reduced motion
 * (or inactive and never played) jumps straight to `end`.
 */
export function useSteps<T>(active: boolean, reduced: boolean, at: readonly (readonly [number, T])[], start: T, end: T): T {
  const [step, setStep] = useState<T>(reduced ? end : start);
  const atRef = useRef(at);
  atRef.current = at;
  useEffect(() => {
    if (reduced) {
      setStep(end);
      return;
    }
    if (!active) return;
    setStep(start);
    const ts = atRef.current.map(([ms, s]) => window.setTimeout(() => setStep(s), ms));
    return () => ts.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);
  return step;
}

/** A number that counts up from 0 to `to` over `ms` once `on`. */
export function useCount(to: number, on: boolean, ms: number, reduced: boolean) {
  const [n, setN] = useState(reduced ? to : 0);
  useEffect(() => {
    if (reduced) return setN(to);
    if (!on) return setN(0);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      setN(Math.round(to * e));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, on, ms, reduced]);
  return n;
}

/** The portal's theme as --pt-* custom properties, plus its faces. */
export function themeStyle(t: PortalTheme): CSSProperties {
  return {
    "--pt-ground": t.ground,
    "--pt-ground-deep": t.groundDeep,
    "--pt-card": t.card,
    "--pt-ink": t.ink,
    "--pt-ink-soft": t.inkSoft,
    "--pt-accent": t.accent,
    "--pt-accent-text": t.accentText,
    "--pt-chart-1": t.chart1,
    "--pt-chart-2": t.chart2,
    "--pt-display": fontStack[t.display],
    "--pt-body": fontStack[t.body],
  } as CSSProperties;
}

/**
 * A native-size picture (laid out in whole css px), scaled as ONE transform to
 * fit its box. Font sizes are never scaled one by one: that is what made
 * Chromium space glyphs apart in round 1 (critique A2). `focus` moves a camera
 * in: the picture fills the box's height and centres on native x.
 */
export function Fit({
  w,
  h,
  focus,
  moveMs = 1000,
  className,
  children,
}: {
  w: number;
  h: number;
  focus?: { x: number } | null;
  moveMs?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const box = useBox(ref);
  const W = box.w || 688;
  const H = box.h || W * (h / w);
  const fit = Math.min(W / w, H / h);
  let s = fit;
  let tx = (W - w * s) / 2;
  let ty = (H - h * s) / 2;
  if (focus) {
    s = Math.min(H / h, fit * 3);
    tx = Math.min(0, Math.max(W - w * s, W / 2 - focus.x * s));
    ty = (H - h * s) / 2;
  }
  return (
    <div ref={ref} className={`pt-fitbox${className ? ` ${className}` : ""}`}>
      <div
        className="pt-fit"
        style={{ width: w, height: h, transform: `translate(${tx}px, ${ty}px) scale(${s})`, "--pt-move-ms": `${moveMs}ms` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

/** Same idea, but the picture is laid out `w` wide and as tall as the box allows (the phone AI column). */
export function FitWidth({ w, className, children }: { w: number; className?: string; children: (h: number) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const box = useBox(ref);
  const W = box.w || 330;
  const s = W / w;
  const h = Math.max(200, Math.floor((box.h || 480) / s));
  return (
    <div ref={ref} className={`pt-fitbox${className ? ` ${className}` : ""}`}>
      <div className="pt-fit" style={{ width: w, height: h, transform: `scale(${s})` }}>
        {children(h)}
      </div>
    </div>
  );
}

function Chrome({ label, when, badge }: { label?: string; when?: string; badge?: boolean }) {
  return (
    <div className="sc-frame__chrome" aria-hidden="true">
      <span className="sc-frame__dots">
        <i />
        <i />
        <i />
      </span>
      {label ? <span className="sc-frame__url">{label}</span> : <span className="sc-frame__fill" />}
      {when ? <span className="sc-frame__when">{when}</span> : null}
      {badge ? (
        <span className="sc-frame__label" data-demo-label>
          Demonstration data
        </span>
      ) : null}
    </div>
  );
}
export { Chrome };

/**
 * A MarCommand screen, as a labelled Proof Stage the privacy probe reads:
 * data-demo-stage, exactly one "Demonstration data" label, an 80+ character
 * narration, no h1/h2 inside.
 */
export function PortalFrame({
  client,
  stage,
  narration,
  variant,
  fill,
  quiet,
  children,
}: {
  client: ShowcaseClient;
  stage: string;
  narration: string;
  variant: Variant;
  fill: boolean;
  quiet?: boolean;
  children: ReactNode;
}) {
  return (
    <figure
      className={`sc-frame sc-frame--portal sc-frame--${variant}${fill ? " sc-frame--fill" : ""}`}
      data-demo-stage={`${client.slug}-${stage}`}
      aria-hidden={quiet || undefined}
    >
      <Chrome label={variant === "desk" ? "MarCommand" : undefined} badge />
      <p className="ps-visually-hidden" data-demo-narration>
        {narration}
      </p>
      <div className={`sc-frame__portal pt-root ${fontVars}`} style={{ ...themeStyle(client.theme), ...(fill ? null : { aspectRatio: "1.6 / 1" }) }}>
        {children}
      </div>
    </figure>
  );
}

/** The portal's top bar: Overview, Activity, AI, and the window chip. */
export function TopBar({ tab, window: win }: { tab: "Overview" | "AI"; window: string }) {
  return (
    <div className="pt-top" aria-hidden="true">
      <span className="pt-seg">
        {(["Overview", "Activity", "AI"] as const).map((t) => (
          <span key={t} className={t === tab ? "is-on" : undefined}>
            {t}
          </span>
        ))}
      </span>
      <span className="pt-chip pt-chip--quiet">Client view</span>
      <span className="pt-chip pt-chip--end">
        <Cal />
        {win}
      </span>
    </div>
  );
}

function Cal() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="2.5" y="3.5" width="11" height="10" rx="2" />
      <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" strokeLinecap="round" />
    </svg>
  );
}

/** The client's mark: their own image, Duffer's golf ball, or letters. */
export function Mark({ mark, size }: { mark: PortalMark; size: number }) {
  if (mark.kind === "img") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="pt-mark" src={mark.src} alt="" width={size} height={size} />;
  }
  if (mark.kind === "letters") {
    return (
      <span className="pt-mark pt-mark--letters" style={{ width: size, height: size, fontSize: size * 0.42 }}>
        {mark.text}
      </span>
    );
  }
  // A golf ball: a disc of dimples, as on Duffer's own portal mark.
  const dots: { x: number; y: number }[] = [];
  for (let r = -4; r <= 4; r++) {
    for (let c = -4; c <= 4; c++) {
      const x = c * 10 + (r % 2 ? 5 : 0);
      const y = r * 8.7;
      if (x * x + y * y < 40 * 40) dots.push({ x, y });
    }
  }
  return (
    <svg className="pt-mark" viewBox="-50 -50 100 100" width={size} height={size} aria-hidden="true">
      <circle r="47" fill="none" stroke="currentColor" strokeWidth="4" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3.4" fill="currentColor" />
      ))}
    </svg>
  );
}

const ICON: Record<RailIcon, string> = {
  ads: "M3 13 8 3l5 10M5.5 9h5",
  "social-ads": "M2.5 8c1.5-3 3.5-3 5.5 0s4 3 5.5 0c-1.5-3-3.5-3-5.5 0s-4 3-5.5 0",
  search: "M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10.5 10.5 14 14",
  direct: "M6 3h6v10H6M2.5 8h7M7 5.5 9.5 8 7 10.5",
  maps: "M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 9.8 8 14 8 14zM8 8.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z",
  social: "M3 4h10v7H8l-3 2.5V11H3zM6 7.5h.01M8 7.5h.01M10 7.5h.01",
  sites: "M6.5 9.5a3 3 0 0 0 4.2 0l2-2a3 3 0 0 0-4.2-4.2l-.6.6M9.5 6.5a3 3 0 0 0-4.2 0l-2 2a3 3 0 0 0 4.2 4.2l.6-.6",
  flag: "M4.5 14V2.5M4.5 3h7l-1.8 2.8 1.8 2.7h-7",
  flags: "M3.5 14V3M3.5 3.5h5.5l-1.4 2.2 1.4 2.1H3.5M9.5 14V7M9.5 7.5h3.5",
};

export function RailGlyph({ icon }: { icon: RailIcon }) {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON[icon]} />
    </svg>
  );
}
