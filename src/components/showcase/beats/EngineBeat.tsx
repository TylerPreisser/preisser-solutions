"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { EngineBeat as EngineBeatData, EngineChannel } from "@/data/showcase/types";
import { Elara, type ElaraFrame } from "./Elara";
import { Fit, FitWidth, PortalFrame, RailGlyph, type BeatProps } from "./shared";
import "./engine.css";

/**
 * The MarCommand tab (ADR-0025 §5): the engine room, in the home page's
 * MarCommand-section language (src/components/home/marcommand-live-stage.tsx):
 * flat channel cards, a blue wire from the channel it favours, navy knobs with
 * a blue arc, and the same robot walking the wire to turn them. It reads the
 * channels (chips), chooses one (its wire lights), turns one or two dials, keeps
 * a new learning, and the result moves.
 *
 * Every element exists from the first frame; the timeline only flips states and
 * CSS transitions do the moving (no keyframe entry from opacity 0: see FetchBand).
 * Reduced motion and an inactive tab show the end state's picture when reduced.
 */

/** Storyboard, ms from the beat's start (§5.3). */
const E = {
  chip0: 200,
  chipStep: 300,
  choose: 1600,
  stemMs: 300,
  bus: 1900,
  busMs: 300,
  walk1: 2400,
  walk1Ms: 1400,
  reach1: 3800,
  sweep1: 4000,
  sweep1Ms: 900,
  release1: 5200,
  walk2: 5400,
  walk2Ms: 1000,
  reach2: 6400,
  sweep2: 6500,
  sweep2Ms: 600,
  release2: 7200,
  learn: 7000,
  flashMs: 600,
  result: 9000,
  total: 12400,
};
export const engineMs = () => E.total;

/** Native geometry. Desk: a 1160 x 640 picture scaled as one. Phone: 320 wide, as tall as the sheet. */
const DESK = { w: 1160, h: 640, card: 92, cardTop: 44, cx0: 110, cgap: 150, stemTop: 172, bus: 452, dy: 430, r: 46, dx: [260, 450, 640], bot: 96 as const, reach: 93, busL: 50, busR: 780 };
const PHONE = { w: 320, card: 64, cardTop: 24, cx0: 44, cgap: 78, stemTop: 112, bus: 200, dy: 189, r: 31, dx: [76, 160, 244], bot: 48 as const, reach: 54, busL: 6, busR: 314 };
type Geo = typeof DESK | typeof PHONE;

function useClock(active: boolean, reduced: boolean) {
  const [t, setT] = useState(reduced ? Infinity : 0);
  useEffect(() => {
    if (reduced) return setT(Infinity);
    if (!active) return;
    const t0 = performance.now();
    setT(0);
    const id = window.setInterval(() => {
      const e = performance.now() - t0;
      setT(e);
      if (e > E.total) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [active, reduced]);
  return t;
}

const num = (s: string) => {
  const m = /^(\D*)(\d[\d,]*)(\D*)$/.exec(s);
  return m ? { pre: m[1], n: parseInt(m[2].replace(/,/g, ""), 10), post: m[3] } : null;
};

export function EngineBeat({ client, beat, variant, active, fill, reduced, quiet }: BeatProps<EngineBeatData>) {
  const t = useClock(active, reduced);
  const phone = variant === "phone";
  return (
    // The MarCommand tab's stage keeps the name of the funnel stage it replaces: the privacy probe
    // derives the window's name registry from it (tests/demo-privacy.probe.mjs:367 strips -funnel).
    <PortalFrame client={client} stage="funnel" narration={beat.narration} variant={variant} fill={fill} quiet={quiet}>
      <div className="en" data-variant={variant} data-cut={t < 100 ? "" : undefined}>
        {phone ? (
          <FitWidth w={PHONE.w}>{(h) => <Room beat={beat} t={t} g={PHONE} h={h} phone />}</FitWidth>
        ) : (
          <Fit w={DESK.w} h={DESK.h} moveMs={0}>
            <Room beat={beat} t={t} g={DESK} h={DESK.h} phone={false} />
          </Fit>
        )}
      </div>
    </PortalFrame>
  );
}

function Room({ beat, t, g, h, phone }: { beat: EngineBeatData; t: number; g: Geo; h: number; phone: boolean }) {
  const cx = (i: number) => g.cx0 + i * g.cgap;
  const pickX = cx(beat.pick);
  const turns = beat.turns.slice(0, 2);
  const last = beat.dials.length - 1;
  // He stands left of the knob he turns, or right of it when it is the last knob he turns and the last in the row.
  const side = (d: number, k: number) => (d === last && k === turns.length - 1 ? -1 : 1);
  const stance = (d: number, k: number) => g.dx[d] - side(d, k) * g.reach;
  const start = g.dx[last] + g.reach;

  // The robot: legs, cell, facing.
  const legs = [{ from: start, to: stance(turns[0], 0), at: E.walk1, ms: E.walk1Ms }];
  if (turns.length > 1) legs.push({ from: stance(turns[0], 0), to: stance(turns[1], 1), at: E.walk2, ms: E.walk2Ms });
  const turnAt = [
    { reach: E.reach1, sweep: E.sweep1, ms: E.sweep1Ms, release: E.release1 },
    { reach: E.reach2, sweep: E.sweep2, ms: E.sweep2Ms, release: E.release2 },
  ];
  let x = start;
  let ms = 0;
  let frame: ElaraFrame = 0;
  let flip: 1 | -1 = -1;
  const leg = legs.filter((l) => t >= l.at).pop();
  if (leg) {
    x = leg.to;
    ms = leg.ms;
    const k = legs.indexOf(leg);
    flip = side(turns[k], k);
    if (t < leg.at + leg.ms) {
      frame = (4 + (Math.floor((t - leg.at) / 110) % 4)) as ElaraFrame;
      flip = leg.to >= leg.from ? 1 : -1;
    }
  }
  turns.forEach((_, k) => {
    const a = turnAt[k];
    if (t >= a.reach && t < a.release + 90) frame = t < a.reach + 90 ? 1 : t < a.release ? 2 : 3;
  });

  // Dials: where each one's arc and value are.
  const dialState = beat.dials.map((d, i) => {
    const k = turns.indexOf(i);
    const a = k >= 0 ? turnAt[k] : null;
    const turned = !!a && d.to !== undefined && t >= a.sweep;
    const p = a ? Math.min(1, Math.max(0, (t - a.sweep) / a.ms)) : 0;
    const r = turned && d.r1 !== undefined ? d.r1 : d.r0;
    const f = num(d.from);
    const to = d.to !== undefined ? num(d.to) : null;
    let value = d.from;
    if (turned && d.to !== undefined) value = f && to && f.pre === to.pre && f.post === to.post && p < 1 ? `${to.pre}${Math.round(f.n + (to.n - f.n) * (1 - Math.pow(1 - p, 3))).toLocaleString("en-US")}${to.post}` : d.to;
    return { r, turned, value, ms: a?.ms ?? 0, lit: k >= 0 && t >= (k === 0 ? E.bus + E.busMs : E.walk2 + 500) };
  });

  const chose = t >= E.choose;
  const learnt = t >= E.learn;
  const result = t >= E.result;
  const rFrom = num(beat.result.from)?.n ?? 0;
  const rTo = num(beat.result.to)?.n ?? 0;
  const gain = `+${rTo - rFrom} leads`;

  // The lit wires: the chosen card's stem, the bus to the first knob turned, then on to the second.
  const busA = { x1: pickX, x2: g.dx[turns[0]], at: E.bus, ms: E.busMs };
  const busB = turns.length > 1 ? { x1: g.dx[turns[0]], x2: g.dx[turns[1]], at: E.walk2, ms: 500 } : null;
  const stemLen = g.bus - g.stemTop;
  const lit = (x1: number, x2: number, y: number, on: boolean, msx: number, key: string, y2 = y) => {
    const len = Math.max(1, Math.abs(x2 - x1) + Math.abs(y2 - y));
    return (
      <line
        key={key}
        className="en-w en-w--lit"
        x1={x1}
        y1={y}
        x2={x2}
        y2={y2}
        strokeDasharray={`${len} ${len + 2}`}
        style={{ strokeDashoffset: on ? 0 : len, transitionDuration: `${msx}ms` } as CSSProperties}
      />
    );
  };

  const newL = beat.learned.find((l) => l.isNew);
  const oldL = beat.learned.filter((l) => !l.isNew);
  const roomH = phone ? h : DESK.h;
  const showLearned = !phone || h >= 492;

  let caption: ReactNode;
  if (t < E.choose) caption = (<><b>Reading</b> every channel&apos;s results</>);
  else if (t < E.walk1) caption = (<><b>Choosing</b> {beat.channels[beat.pick].label}</>);
  else if (t < (turns.length > 1 ? E.walk2 : E.learn)) caption = <Turning d={beat.dials[turns[0]]} />;
  else if (t < E.learn) caption = <Turning d={beat.dials[turns[1]]} />;
  else if (t < E.result) caption = (<><b>Learned</b> it, and kept it for next time</>);
  else caption = (<><b>{rTo - rFrom > 0 ? `+${rTo - rFrom}` : ""}</b> {beat.result.label.toLowerCase()}</>);

  return (
    <div className="en-room" style={{ width: g.w, height: roomH }}>
      <svg className="en-wires" width={g.w} height={roomH} viewBox={`0 0 ${g.w} ${roomH}`} aria-hidden="true">
        <line className="en-w" x1={g.busL} y1={g.bus} x2={g.busR} y2={g.bus} />
        <line className="en-w" x1={pickX} y1={g.stemTop} x2={pickX} y2={g.bus} />
        <line
          className="en-w en-w--lit en-w--stem"
          x1={pickX}
          y1={g.stemTop}
          x2={pickX}
          y2={g.bus}
          strokeDasharray={`${stemLen} ${stemLen + 2}`}
          style={{ strokeDashoffset: chose ? 0 : stemLen, transitionDuration: `${E.stemMs}ms` } as CSSProperties}
        />
        {lit(busA.x1, busA.x2, g.bus, t >= busA.at, busA.ms, "a")}
        {busB ? lit(busB.x1, busB.x2, g.bus, t >= busB.at, busB.ms, "b") : null}
      </svg>

      {beat.channels.map((c, i) => {
        const pick = i === beat.pick;
        const shown = t >= E.chip0 + i * E.chipStep;
        return (
          <div key={c.label} className="en-ch" data-pick={pick && chose ? "" : undefined} style={{ left: cx(i) - g.card / 2, top: g.cardTop, width: g.card }}>
            <div className="en-ch__card">
              <ChannelMark icon={c.icon} label={c.label} />
              {c.delta ? (
                <span className="en-chip" data-tone={c.delta.tone} data-on={shown && !(pick && result) ? "" : undefined}>
                  {phone ? c.delta.text.split(" ")[0] : c.delta.text}
                </span>
              ) : null}
              {pick ? (
                <span className="en-chip" data-tone="up" data-on={result ? "" : undefined}>
                  {gain}
                </span>
              ) : null}
            </div>
            <span className="en-ch__label">{c.label}</span>
          </div>
        );
      })}

      {beat.dials.map((d, i) => (
        <Dial key={d.label} g={g} x={g.dx[i]} from={d.from} label={d.label} s={dialState[i]} />
      ))}

      <div className="en-bot" style={{ transform: `translate3d(${x}px, ${g.bus}px, 0)`, transitionDuration: `${ms}ms` } as CSSProperties}>
        <Elara width={g.bot} frame={frame} flip={flip} halo="var(--en-bg)" />
      </div>

      {showLearned ? (
        <div className="en-learn">
          {/* The phone shows only the new learning, so its heading arrives with it instead of over an empty space. */}
          {phone ? null : <p className="en-k">What it learned</p>}
          {newL ? (
            <div className="en-new" data-on={learnt ? "" : undefined} data-flash={learnt && t < E.learn + E.flashMs ? "" : undefined}>
              <div className="en-new__in">
                {phone ? <p className="en-k">What it learned</p> : null}
                <p className="en-lc en-lc--new">
                  {newL.text}
                  <span className="en-lc__when">{newL.when}</span>
                </p>
              </div>
            </div>
          ) : null}
          {phone
            ? null
            : oldL.map((l) => (
                <p key={l.text} className="en-lc">
                  {l.text}
                  <span className="en-lc__when">{l.when}</span>
                </p>
              ))}
        </div>
      ) : null}

      <div className="en-res" data-on={result ? "" : undefined}>
        <p className="en-res__k">{beat.result.label}</p>
        <p className="en-res__n">
          <s className="en-res__old">{beat.result.from}</s>
          <span className="en-res__slot">
            <span className="en-res__from">{beat.result.from}</span>
            <span className="en-res__to">{beat.result.to}</span>
          </span>
        </p>
      </div>

      {phone ? null : (
        <p className="en-cap" aria-hidden="true">
          {caption}
        </p>
      )}
    </div>
  );
}

function Turning({ d }: { d: EngineBeatData["dials"][number] }) {
  return (
    <>
      <b>Turning</b> {d.label.toLowerCase()} to {d.to ?? d.from}
    </>
  );
}

function Dial({ g, x, from, label, s }: { g: Geo; x: number; from: string; label: string; s: { r: number; turned: boolean; value: string; ms: number; lit: boolean } }) {
  const R = g.r;
  const arcR = Math.round(R * 0.78);
  const C = 2 * Math.PI * arcR;
  const sweep = 0.75 * C;
  const size = R * 2;
  return (
    <div className="en-dial" data-lit={s.lit ? "" : undefined} style={{ left: x - R - 30, top: g.dy - R, width: size + 60 } as CSSProperties}>
      <div className="en-knob" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle className="en-knob__body" cx={R} cy={R} r={R - 1} />
          <circle
            className="en-knob__arc"
            cx={R}
            cy={R}
            r={arcR}
            transform={`rotate(135 ${R} ${R})`}
            strokeDasharray={`${sweep.toFixed(2)} ${C.toFixed(2)}`}
            style={{ strokeDashoffset: (sweep * (1 - s.r)).toFixed(2), transitionDuration: `${s.ms}ms` } as CSSProperties}
          />
        </svg>
        <i className="en-needle" style={{ width: arcR - 6, transform: `rotate(${135 + 270 * s.r}deg)`, transitionDuration: `${s.ms}ms` } as CSSProperties} />
      </div>
      <span className="en-dial__label">{label}</span>
      <span className="en-dial__value" data-turned={s.turned ? "" : undefined}>
        <s className="en-dial__old">{from}</s>
        <span className="en-dial__new">{s.value}</span>
      </span>
    </div>
  );
}

/** The channel's mark, as the home section draws it (marcommand-live-stage.tsx ChannelLogo). */
function ChannelMark({ icon, label }: { icon: EngineChannel["icon"]; label: string }) {
  if (icon === "ads")
    return (
      <svg className="en-logo" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 17.2 12 6.8" stroke="#FBBC04" strokeWidth="6" strokeLinecap="round" />
        <path d="M12 6.8 18 17.2" stroke="#4285F4" strokeWidth="6" strokeLinecap="round" />
        <circle cx="6" cy="17.2" r="3" fill="#34A853" />
      </svg>
    );
  if (icon === "social-ads")
    return (
      <svg className="en-logo" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path fill="#fff" d="M13.4 23.9V14.6h3l.5-3.3h-3.5V9.3c0-1 .5-1.7 1.8-1.7H17V4.6c-.3 0-1.4-.2-2.7-.2-2.7 0-4.4 1.7-4.4 4.6v2.3H7v3.3h2.9v9.3z" />
      </svg>
    );
  if (icon === "social" && /tiktok/i.test(label))
    return (
      <svg className="en-logo en-logo--ink" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2h3.4a5.8 5.8 0 0 0 5.8 5.8v3.3a9 9 0 0 1-5.2-1.7v6.6a6.3 6.3 0 1 1-6.3-6.3c.35 0 .7.03 1.03.09v3.4a2.9 2.9 0 1 0 2.07 2.78z" />
      </svg>
    );
  if (icon === "displays")
    return (
      <svg className="en-logo en-logo--line" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="2.5" width="14" height="14" rx="2" />
        <path d="M8 5.5h3v3H8zM13 5.5h3v3h-3zM8 10.5h3v3H8zM13.5 11h2.5M16 13.5h-2.5M12 16.5v5M8 21.5h8" />
      </svg>
    );
  return (
    <span className="en-glyph">
      <RailGlyph icon={icon === "social" ? "social" : icon} />
    </span>
  );
}
