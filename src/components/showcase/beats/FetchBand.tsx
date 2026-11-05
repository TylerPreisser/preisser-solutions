"use client";

import type { CSSProperties } from "react";
import type { AiSource, AiStep } from "@/data/showcase/types";
import { Elara, type ElaraFrame } from "./Elara";

/**
 * The top of the AI tab (ADR-0025 §4): the home page's robot walks a wire to
 * each source the answer reads, reaches it, and its row count lands as a chip.
 *
 * Everything here is mounted from the first frame and changes state with CSS
 * TRANSITIONS on elements that already exist. Nothing enters through a keyframe
 * animation that starts at opacity 0: in WebKit (Playwright 390x844, 2026-11-04)
 * rows that mounted mid-run with `animation: pt-in ... both` under the scaled,
 * 40 ms re-rendered AI picture stayed on their invisible first frame, which is
 * what left the live tab's working card blank.
 */

/** When each source is reached and read, in ms from the beat's start (from AiAskBeat's timeline). */
export interface FetchPlan {
  /** The robot sets off. */
  go: number;
  /** The first walk, bus start to source 1. */
  first: number;
  /** Walk between sources. */
  walk: number;
  /** The walk back to the start after the last source. */
  back: number;
  arrive: readonly number[];
  done: readonly number[];
  /** Back at the start: "Checking every figure" until `checked`. */
  home: number;
  checked: number;
  /** The band folds to its bottom strip (bus, robot, status) to give the answer room. */
  fold: number;
}

/** Native geometry, in the picture's own px (desk: 960-1220 wide; phone: 320). */
const GEO = {
  desk: { band: 270, card: 84, gap: 168, top: 34, stemTop: 146, bus: 236, bot: 72 as const, reach: 40, busL: 40, start: 58, fold: 145, nudge: 70 },
  phone: { band: 182, card: 58, gap: 76, top: 20, stemTop: 100, bus: 156, bot: 48 as const, reach: 27, busL: 10, start: 26, fold: 86, nudge: 4 },
};

export const bandHeight = (phone: boolean, folded: boolean) => {
  const g = phone ? GEO.phone : GEO.desk;
  return folded ? g.band - g.fold : g.band;
};

const ICON: Record<AiSource["icon"], string> = {
  scan: "M5 4h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM21 4h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM5 20h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zM21 21h3v3M28 21v7h-4M16 4v6M16 15h6M4 16h6",
  visit: "M16 27a11 11 0 1 0 0-22 11 11 0 0 0 0 22zM5 16h22M16 5c4 4 4 18 0 22M16 5c-4 4-4 18 0 22",
  lead: "M16 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM6 27c1-6 5-9 10-9s9 3 10 9",
  order: "M4 6h4l3 14h14l3-10H10M13 27a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM23 27a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  ads: "M5 13h5l11-6v18l-11-6H5zM10 19l2 7h4l-2-7M24.5 12.5c1.6 1.8 1.6 5.2 0 7",
  "social-ads": "M6 6h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14l-6 5v-5H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM16 18.5s-4.5-2.6-4.5-5.3a2.3 2.3 0 0 1 4.5-.7 2.3 2.3 0 0 1 4.5.7c0 2.7-4.5 5.3-4.5 5.3z",
  search: "M14 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM20 20l7 7",
  enroll: "M3 12l13-6 13 6-13 6zM8 14.5V21c4 3.5 12 3.5 16 0v-6.5M29 12v7",
};

function SourceIcon({ icon }: { icon: AiSource["icon"] }) {
  return (
    <svg className="fb-ico" viewBox="0 0 32 32" aria-hidden="true">
      <path d={ICON[icon]} />
    </svg>
  );
}

/** "Reading orders, last 30 days" -> bold verb phrase, quiet rest. */
function Lead({ text }: { text: string }) {
  const at = text.indexOf(",");
  if (at < 0) return <b>{text}</b>;
  return (
    <>
      <b>{text.slice(0, at)}</b>
      {text.slice(at)}
    </>
  );
}

const rowsOf = (chip: string) => parseInt(chip.replace(/[^\d]/g, ""), 10) || 0;

export function FetchBand({
  sources,
  steps,
  plan,
  t,
  phone,
  width,
  folded,
}: {
  sources: readonly AiSource[];
  steps: readonly AiStep[];
  plan: FetchPlan;
  t: number;
  phone: boolean;
  /** The picture's native width. */
  width: number;
  folded: boolean;
}) {
  const g = phone ? GEO.phone : GEO.desk;
  const n = sources.length;
  // The desk group sits a little right of centre (the status line is on the left); a stage under 900 wide centres it.
  const x0 = (width - (n - 1) * g.gap - g.card) / 2 + (width < 900 ? 0 : g.nudge);
  const stems = sources.map((_, i) => x0 + i * g.gap + g.card / 2);
  const stance = stems.map((x) => x - g.reach);
  const busR = stems[n - 1];

  // Where the robot is going, how long the walk takes, and which sheet cell shows.
  type Leg = { from: number; to: number; start: number; ms: number };
  const legs: Leg[] = [{ from: g.start, to: stance[0], start: plan.go, ms: plan.first }];
  for (let i = 1; i < n; i++) legs.push({ from: stance[i - 1], to: stance[i], start: plan.done[i - 1], ms: plan.walk });
  const backLeg: Leg = { from: stance[n - 1], to: g.start, start: plan.done[n - 1], ms: plan.back };
  const all = [...legs, backLeg];
  let x = g.start;
  let ms = 0;
  let frame: ElaraFrame = 0;
  let flip: 1 | -1 = 1;
  const reached = all.filter((l) => t >= l.start);
  const leg = reached[reached.length - 1];
  if (leg) {
    x = leg.to;
    ms = leg.ms;
    if (t < leg.start + leg.ms) {
      frame = (4 + (Math.floor((t - leg.start) / 110) % 4)) as ElaraFrame;
      flip = leg.to >= leg.from ? 1 : -1;
    }
  }
  const reading = sources.findIndex((_, i) => t >= plan.arrive[i] && t < plan.done[i]);
  if (reading >= 0) {
    const k = t - plan.arrive[reading];
    const dwell = plan.done[reading] - plan.arrive[reading];
    frame = k < 90 ? 1 : k < dwell - 90 ? 2 : 3;
    flip = 1;
  }

  // The status line under the bus.
  const total = sources.reduce((s, src) => s + rowsOf(src.chip), 0);
  let status: React.ReactNode;
  let settled = false;
  if (t >= plan.checked) {
    settled = true;
    status = (
      <>
        <b>Read {n} sources</b>
        {` · ${total.toLocaleString("en-US")} rows${phone ? "" : " · every figure checked"}`}
      </>
    );
  } else if (t >= plan.done[n - 1]) {
    status = <Lead text={steps.find((s) => s.phase === 4)?.label ?? "Checking every figure"} />;
  } else if (t >= plan.arrive[0]) {
    // The line names the source the robot is AT (it changes on arrival, never ahead of him).
    const at = sources.reduce((k, _, i) => (t >= plan.arrive[i] ? i : k), 0);
    status = <Lead text={steps[sources[at].step]?.label ?? sources[at].label} />;
  } else {
    status = <Lead text={steps[0]?.label ?? "Reading your question"} />;
  }

  // Wires: a grey base, and a blue copy revealed by stroke-dashoffset (the home section's technique).
  const segs = stems.map((sx, i) => ({ from: i === 0 ? g.busL : stems[i - 1], to: sx, lit: t >= legs[i].start, ms: legs[i].ms }));
  const W = width;
  return (
    <div className="fb" data-folded={folded ? "" : undefined} style={{ "--fb-h": `${g.band}px`, "--fb-fold": `${g.fold}px` } as CSSProperties}>
      <div className="fb__in">
        <svg className="fb-wires" width={W} height={g.band} viewBox={`0 0 ${W} ${g.band}`} aria-hidden="true">
          <line className="fb-w" x1={g.busL} y1={g.bus} x2={busR} y2={g.bus} />
          {stems.map((sx) => (
            <line key={`b${sx}`} className="fb-w" x1={sx} y1={g.stemTop} x2={sx} y2={g.bus} />
          ))}
          {segs.map((s, i) => {
            const len = Math.max(1, s.to - s.from);
            return (
              <line
                key={`s${i}`}
                className="fb-w fb-w--lit"
                x1={s.from}
                y1={g.bus}
                x2={s.to}
                y2={g.bus}
                strokeDasharray={`${len} ${len + 2}`}
                style={{ strokeDashoffset: s.lit ? 0 : len, transitionDuration: `${s.ms}ms` } as CSSProperties}
              />
            );
          })}
          {stems.map((sx, i) => {
            const len = g.bus - g.stemTop;
            return (
              <line
                key={`l${i}`}
                className="fb-w fb-w--lit fb-w--stem"
                x1={sx}
                y1={g.bus}
                x2={sx}
                y2={g.stemTop}
                strokeDasharray={`${len} ${len + 2}`}
                style={{ strokeDashoffset: t >= plan.arrive[i] ? 0 : len } as CSSProperties}
              />
            );
          })}
        </svg>
        {sources.map((s, i) => {
          const state = t < plan.arrive[i] ? "idle" : t < plan.done[i] ? "on" : "done";
          const chip = t >= plan.arrive[i] + 90;
          return (
            <div key={s.label} className="fb-src" data-state={state} style={{ left: x0 + i * g.gap, top: g.top, width: g.card } as CSSProperties}>
              <div className="fb-src__card">
                <SourceIcon icon={s.icon} />
                <span className="fb-chip" data-on={chip ? "" : undefined}>
                  <svg className="fb-chip__tick" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2.5 6.3 5 8.6l4.5-5" />
                  </svg>
                  {s.chip}
                </span>
              </div>
              <span className="fb-src__label">{phone ? (s.short ?? s.label) : s.label}</span>
            </div>
          );
        })}
        <div className="fb-bot" style={{ transform: `translate3d(${x}px, ${g.bus}px, 0)`, transitionDuration: `${ms}ms` } as CSSProperties}>
          <Elara width={g.bot} frame={frame} flip={flip} halo="var(--ai-band)" />
        </div>
        <p className="fb-status" data-settled={settled ? "" : undefined} style={{ top: g.bus + (phone ? 6 : 10), left: g.busL }}>
          {settled ? (
            <svg className="fb-status__tick" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="8" />
              <path d="M4.6 8.3 7 10.5l4.4-4.8" />
            </svg>
          ) : null}
          <span>{status}</span>
        </p>
      </div>
    </div>
  );
}
