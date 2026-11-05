"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { EngineBeat as EngineBeatData, EngineChannel } from "@/data/showcase/types";
import { Elara, type ElaraFrame } from "./Elara";
import { Fit, FitWidth, PortalFrame, RailGlyph, useBox, type BeatProps } from "./shared";
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

/**
 * Three compositions, chosen from the stage's MEASURED width, each laid out at a size where no text renders
 * under ~12 css px (critic r2 M1, M2): a desk picture (1000 x 560, scaled as one, stage >= 900 css wide), a
 * tablet picture (720 wide, as tall as the stage, 600-900) and a phone column (320 wide, as tall as the sheet).
 * The phone shows the dials it turns and one tile that carries the new learning above the result, so a
 * learning is on screen at every size.
 */
type Mode = "desk" | "tablet" | "phone";
interface Geo {
  mode: Mode;
  w: number;
  h: number;
  card: number;
  cardTop: number;
  cx: (i: number) => number;
  stemTop: number;
  bus: number;
  dy: number;
  r: number;
  /** The dials shown, in order, and where each sits. */
  shown: readonly number[];
  dx: readonly number[];
  bot: 96 | 48;
  /** Feet to the knob centre when he stands beside it, his hand on its rim. */
  reach: number;
  busL: number;
  busR: number;
  learn?: { x: number; y: number; w: number; max: number };
  res?: { x: number; y: number; w: number };
  /** Phone: the learning + result tile, anchored to the bottom; `earlier` adds the previous learning. */
  tile?: { h: number; earlier: boolean };
  cap?: { x: number; y: number };
}

const DESK_W = 1000;
const DESK_H = 560;
const TILE_H = 135;

function geo(mode: Mode, h: number, beat: EngineBeatData): Geo {
  const turns = beat.turns.slice(0, 2);
  if (mode === "desk") {
    return {
      mode, w: DESK_W, h: DESK_H, card: 92, cardTop: 36, cx: (i) => 100 + i * 140, stemTop: 164,
      bus: 360, dy: 338, r: 46, shown: beat.dials.map((_, i) => i), dx: [200, 380, 560], bot: 96, reach: 101,
      busL: 40, busR: 620, learn: { x: 640, y: 36, w: 320, max: 2 }, res: { x: 640, y: 292, w: 320 }, cap: { x: 40, y: 506 },
    };
  }
  if (mode === "tablet") {
    // Cards at the top, the learning and result along the bottom, the knob row centred between them.
    const bottom = h - 36 - 196;
    const bus = Math.round(Math.max(330, Math.min(bottom - 96, (176 + 116 + bottom - 96) / 2)));
    return {
      mode, w: 720, h, card: 92, cardTop: 40, cx: (i) => 150 + i * 140, stemTop: 168,
      bus, dy: bus - 22, r: 46, shown: beat.dials.map((_, i) => i), dx: [190, 360, 530], bot: 96, reach: 101,
      busL: 60, busR: 620, learn: { x: 40, y: bottom, w: 380, max: 2 }, res: { x: 440, y: bottom, w: 240 },
    };
  }
  // Phone: cards (labels may take two lines), the two dials it turns, the tile at the bottom. A tall phone's
  // tile also carries the earlier learning, so its room shows what the engine already knew.
  const tall = h >= 540;
  const tileTop = h - 12 - TILE_H - (tall ? 62 : 0);
  const bus = Math.round(Math.max(164, Math.min(tileTop - 66, (106 + 58 + tileTop - 66) / 2)));
  return {
    mode, w: 320, h, card: 52, cardTop: 16, cx: (i) => 44 + i * 77, stemTop: 108,
    bus, dy: bus - 12, r: 30, shown: turns, dx: [100, 236], bot: 48, reach: 57,
    busL: 6, busR: 314, tile: { h: TILE_H + (tall ? 62 : 0), earlier: tall },
  };
}

export function EngineBeat({ client, beat, variant, active, fill, reduced, quiet }: BeatProps<EngineBeatData>) {
  const t = useClock(active, reduced);
  const boxRef = useRef<HTMLDivElement>(null);
  const box = useBox(boxRef);
  const mode: Mode = variant === "phone" || (box.w > 0 && box.w < 600) ? "phone" : box.w > 0 && box.w < 900 ? "tablet" : "desk";
  return (
    // The MarCommand tab's stage keeps the name of the funnel stage it replaces: the privacy probe
    // derives the window's name registry from it (tests/demo-privacy.probe.mjs:367 strips -funnel).
    <PortalFrame client={client} stage="funnel" narration={beat.narration} variant={variant} fill={fill} quiet={quiet}>
      <div
        ref={boxRef}
        className="en"
        data-mode={mode}
        data-cut={t < 100 ? "" : undefined}
        style={{ "--en-brand": client.theme.accent, "--en-brand-t": client.theme.accentText } as CSSProperties}
      >
        {mode === "desk" ? (
          <Fit w={DESK_W} h={DESK_H} moveMs={0}>
            <Room beat={beat} t={t} g={geo("desk", DESK_H, beat)} />
          </Fit>
        ) : (
          <FitWidth w={mode === "phone" ? 320 : 720}>{(h) => <Room beat={beat} t={t} g={geo(mode, h, beat)} />}</FitWidth>
        )}
      </div>
    </PortalFrame>
  );
}

function Room({ beat, t, g }: { beat: EngineBeatData; t: number; g: Geo }) {
  const phone = g.mode === "phone";
  const pickX = g.cx(beat.pick);
  const turns = beat.turns.slice(0, 2);
  const at = (d: number) => g.dx[g.shown.indexOf(d)];
  // He always stands LEFT of the knob he turns, facing it; he walks BEHIND the knobs (critic r2 M4).
  const stance = (d: number) => at(d) - g.reach;
  const start = stance(turns[turns.length - 1]);

  const legs = [{ from: start, to: stance(turns[0]), at: E.walk1, ms: E.walk1Ms }];
  if (turns.length > 1) legs.push({ from: stance(turns[0]), to: stance(turns[1]), at: E.walk2, ms: E.walk2Ms });
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
    flip = 1;
    if (t < leg.at + leg.ms) {
      frame = (4 + (Math.floor((t - leg.at) / 110) % 4)) as ElaraFrame;
      flip = leg.to >= leg.from ? 1 : -1;
    }
  }
  turns.forEach((_, k) => {
    const a = turnAt[k];
    if (t >= a.reach && t < a.release + 90) frame = t < a.reach + 90 ? 1 : t < a.release ? 2 : 3;
  });

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
    return { r, turned, value, ms: a?.ms ?? 0 };
  });

  const chose = t >= E.choose;
  const learnt = t >= E.learn;
  const result = t >= E.result;
  const rFrom = num(beat.result.from)?.n ?? 0;
  const rTo = num(beat.result.to)?.n ?? 0;
  // The phone chip is the number alone: the tile under it says what it counts.
  const gain = phone ? `+${rTo - rFrom}` : `+${rTo - rFrom} leads`;

  const busA = { x1: pickX, x2: at(turns[0]), at: E.bus, ms: E.busMs };
  const busB = turns.length > 1 ? { x1: at(turns[0]), x2: at(turns[1]), at: E.walk2, ms: 500 } : null;
  const stemLen = g.bus - g.stemTop;
  const lit = (x1: number, x2: number, y: number, on: boolean, msx: number, key: string) => {
    const len = Math.max(1, Math.abs(x2 - x1));
    return (
      <line
        key={key}
        className="en-w en-w--lit"
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        strokeDasharray={`${len} ${len + 2}`}
        style={{ strokeDashoffset: on ? 0 : len, transitionDuration: `${msx}ms` } as CSSProperties}
      />
    );
  };

  const newL = beat.learned.find((l) => l.isNew);
  const oldL = beat.learned.filter((l) => !l.isNew).slice(0, Math.max(0, (g.learn?.max ?? 1) - 1));

  let caption: ReactNode;
  if (t < E.choose) caption = (<><b>Reading</b> every channel&apos;s results</>);
  else if (t < E.walk1) caption = (<><b>Choosing</b> {beat.channels[beat.pick].label}</>);
  else if (t < (turns.length > 1 ? E.walk2 : E.learn)) caption = <Turning d={beat.dials[turns[0]]} />;
  else if (t < E.learn) caption = <Turning d={beat.dials[turns[1]]} />;
  else if (t < E.result) caption = (<><b>Learned</b> it, and kept it for next time</>);
  else caption = (<><b>{rTo - rFrom > 0 ? `+${rTo - rFrom}` : ""}</b> {beat.result.label.toLowerCase()}</>);

  const resultNumbers = (
    <p className="en-res__n">
      <s className="en-res__old">{beat.result.from}</s>
      <span className="en-res__slot">
        <span className="en-res__from">{beat.result.from}</span>
        <span className="en-res__to">{beat.result.to}</span>
      </span>
    </p>
  );

  return (
    <div className="en-room" style={{ width: g.w, height: g.h }}>
      <svg className="en-wires" width={g.w} height={g.h} viewBox={`0 0 ${g.w} ${g.h}`} aria-hidden="true">
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
        const shownAt = E.chip0 + i * E.chipStep;
        return (
          <div
            key={c.label}
            className="en-ch"
            data-pick={pick && chose ? "" : undefined}
            // While it reads, each channel lights in turn: it watches every one before it picks.
            data-scan={t >= shownAt && t < shownAt + 450 ? "" : undefined}
            style={{ left: g.cx(i) - g.card / 2, top: g.cardTop, width: g.card }}
          >
            <div className="en-ch__card">
              <ChannelMark icon={c.icon} label={c.label} />
              {c.delta ? (
                <span className="en-chip" data-tone={c.delta.tone} data-on={t >= shownAt && !(pick && result) ? "" : undefined}>
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

      <div className="en-bot" style={{ transform: `translate3d(${x}px, ${g.bus}px, 0)`, transitionDuration: `${ms}ms` } as CSSProperties}>
        <Elara width={g.bot} frame={frame} flip={flip} halo="var(--en-bg)" />
      </div>

      {g.shown.map((d, k) => (
        <Dial key={beat.dials[d].label} g={g} x={g.dx[k]} from={beat.dials[d].from} label={beat.dials[d].label} s={dialState[d]} />
      ))}

      {g.learn ? (
        <div className="en-learn" style={{ left: g.learn.x, top: g.learn.y, width: g.learn.w }}>
          <p className="en-k">What it learned</p>
          {newL ? (
            <div className="en-new" data-on={learnt ? "" : undefined} data-flash={learnt && t < E.learn + E.flashMs ? "" : undefined}>
              <div className="en-new__in">
                <p className="en-lc en-lc--new">
                  {newL.text}
                  <span className="en-lc__when">{newL.when}</span>
                </p>
              </div>
            </div>
          ) : null}
          {oldL.map((l) => (
            <p key={l.text} className="en-lc">
              {l.text}
              <span className="en-lc__when">{l.when}</span>
            </p>
          ))}
        </div>
      ) : null}

      {g.res ? (
        <div className="en-res" data-on={result ? "" : undefined} style={{ left: g.res.x, top: g.res.y, width: g.res.w }}>
          <p className="en-res__k">{beat.result.label}</p>
          {resultNumbers}
        </div>
      ) : null}

      {g.tile ? (
        <div className="en-tile" data-on={result ? "" : undefined} style={{ minHeight: g.tile.h }}>
          {g.tile.earlier && beat.learned.find((l) => !l.isNew) ? (
            <p className="en-tile__was">
              <b>{beat.learned.find((l) => !l.isNew)?.when}:</b> {beat.learned.find((l) => !l.isNew)?.text}
            </p>
          ) : null}
          {/* The phone has no caption line: until it learns, this line says what the engine is doing. */}
          <p className="en-tile__l" data-on="" data-learned={learnt ? "" : undefined}>
            {learnt ? (
              <>
                <b>{newL?.when}, it learned:</b> {newL?.text}
              </>
            ) : (
              caption
            )}
          </p>
          <div className="en-tile__res en-res" data-on={result ? "" : undefined}>
            <p className="en-res__k">{beat.result.label}</p>
            {resultNumbers}
          </div>
        </div>
      ) : null}

      {g.cap ? (
        <p className="en-cap" aria-hidden="true" style={{ left: g.cap.x, top: g.cap.y }}>
          {caption}
        </p>
      ) : null}
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

function Dial({ g, x, from, label, s }: { g: Geo; x: number; from: string; label: string; s: { r: number; turned: boolean; value: string; ms: number } }) {
  const R = g.r;
  const arcR = Math.round(R * 0.78);
  const C = 2 * Math.PI * arcR;
  const sweep = 0.75 * C;
  const size = R * 2;
  return (
    <div className="en-dial" style={{ left: x - R - 30, top: g.dy - R, width: size + 60 } as CSSProperties}>
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
