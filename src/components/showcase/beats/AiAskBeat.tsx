"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { AiAskBeat as AiAskBeatData, AiStep } from "@/data/showcase/types";
import { Fit, FitWidth, PortalFrame, TopBar, useBox, type BeatProps } from "./shared";

/**
 * The MarCommand AI tab (marcommand-marketing-engine packages/portal-ui/ai:
 * AiView, AiWork's live card and phase track, AnswerBlocks; copy from
 * ai/copy.ts), rendered on its harness 2026-11-01 and matched here. A question
 * types itself into the field, the five phases light up in order while the
 * steps run, then the answer lands in the real answer layout: the one-sentence
 * answer, its figures, its chart, what it likely means and what we're doing next.
 *
 * Desk: the tab's two columns at 960 x 600, scaled as one picture. Phone: one
 * column 400 wide, as tall as the sheet allows; the column moves up to the
 * answer and then down through it, the way a person would scroll.
 */
const PHASES = ["Reading your question", "Reading your numbers", "Working it out", "Writing", "Checking every figure"] as const;
const CHAR_MS = 42;
const TYPE_AT = 500;

/** Every moment of the ask, in ms from the beat's start. */
export function aiTimeline(beat: AiAskBeatData) {
  const typed = TYPE_AT + beat.question.length * CHAR_MS;
  const press = typed + 320;
  const ask = press + 180;
  let t = ask + 220;
  const steps = beat.steps.map((s) => {
    const r = { start: t, end: t + s.ms };
    t += s.ms;
    return r;
  });
  const answer = t + 320;
  return { typed, press, ask, steps, answer, worked: answer + 900, pan: answer + 2900, total: answer + 6600 };
}

export const aiMs = (beat: AiAskBeatData) => aiTimeline(beat).total;

/** Elapsed ms since `active` turned true, ticking every 40ms until `until`. Reduced motion: the end. */
function useClock(active: boolean, reduced: boolean, until: number) {
  const [t, setT] = useState(reduced ? Infinity : 0);
  useEffect(() => {
    if (reduced) return setT(Infinity);
    if (!active) return;
    const t0 = performance.now();
    setT(0);
    const id = window.setInterval(() => {
      const e = performance.now() - t0;
      setT(e);
      if (e > until) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [active, reduced, until]);
  return t;
}

export function AiAskBeat({ client, beat, variant, active, fill, reduced, quiet }: BeatProps<AiAskBeatData>) {
  const T = aiTimeline(beat);
  const t = useClock(active, reduced, T.total);
  const phone = variant === "phone";

  const typed = t < TYPE_AT ? 0 : Math.min(beat.question.length, Math.floor((t - TYPE_AT) / CHAR_MS) + 1);
  const asked = t >= T.ask;
  const answered = t >= T.answer;
  const field = asked ? "" : beat.question.slice(0, typed);
  const pressing = t >= T.press && t < T.ask;
  const live = asked && !answered;

  const body = (h: number) => (
    <Column beat={beat} t={t} T={T} h={h} phone={phone} field={field} typing={typed > 0 && !asked} pressing={pressing} asked={asked} answered={answered} live={live} reduced={reduced} />
  );

  return (
    <PortalFrame client={client} stage="ai" narration={beat.narration} variant={variant} fill={fill} quiet={quiet}>
      {phone && fill ? (
        <FitWidth w={400}>{(h) => <div className="pt-screen pt-ai pt-ai--phone">{body(h)}</div>}</FitWidth>
      ) : (
        <Fit w={960} h={600}>
          <div className="pt-screen pt-ai pt-ai--desk">
            <TopBar tab="AI" window="30 days" />
            {body(600)}
          </div>
        </Fit>
      )}
    </PortalFrame>
  );
}

type T = ReturnType<typeof aiTimeline>;

function Column({
  beat,
  t,
  T,
  h,
  phone,
  field,
  typing,
  pressing,
  asked,
  answered,
  live,
  reduced,
}: {
  beat: AiAskBeatData;
  t: number;
  T: T;
  h: number;
  phone: boolean;
  field: string;
  typing: boolean;
  pressing: boolean;
  asked: boolean;
  answered: boolean;
  live: boolean;
  reduced: boolean;
}) {
  // The scroll: phone moves the whole column up to the answer, then through it;
  // desk moves the answer card's body if the answer is taller than its place.
  const viewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  const panned = t >= T.pan;
  // Measured again whenever the column's size changes (the faces arriving re-wrap the question).
  const col = useBox(colRef);
  useLayoutEffect(() => {
    const view = viewRef.current;
    const card = cardRef.current;
    if (!view || !card || !answered) return setY(0);
    const viewH = view.clientHeight;
    // The scroll stops on a block's top edge, never through a line of text (critique r2, A-r2-1).
    const blocks = [...card.querySelectorAll<HTMLElement>(".ai-answer__body > *")];
    const snap = (need: number, base: number) => {
      const top = blocks.map((b) => base + b.offsetTop - 4).find((y) => y >= need);
      return top ?? need;
    };
    if (phone) {
      const top = card.offsetTop - 10;
      const room = card.offsetTop + card.offsetHeight + 12 - viewH;
      setY(panned && !reduced && room > top ? snap(room, 0) : top);
    } else {
      const body = card.querySelector<HTMLElement>(".ai-answer__body");
      const over = card.scrollHeight - viewH;
      setY(panned && !reduced && over > 0 && body ? snap(over + 4, -body.offsetTop) : 0);
    }
  }, [answered, panned, phone, reduced, h, col.h]);

  const ask = (
    <div className="pt-ai__left">
      <form className={`ai-ask${typing ? " is-typing" : ""}`} onSubmit={(e) => e.preventDefault()} aria-hidden="true">
        <span className="ai-ask__field">
          {field ? <span className="ai-ask__typed">{field}</span> : <span className="ai-ask__ph">Ask about your numbers…</span>}
          {typing ? <i className="ai-ask__caret" /> : null}
        </span>
        <span className={`ai-btn ai-btn-fill${pressing ? " is-pressed" : ""}`}>Ask</span>
      </form>
      {asked ? (
        <div className="ai-asked">
          <p className="ai-kicker">You asked</p>
          <p className="ai-question">{beat.question}</p>
          {!phone && t >= T.worked ? <Worked beat={beat} /> : null}
        </div>
      ) : null}
    </div>
  );

  const card = answered ? (
    <Answer beat={beat} cardRef={cardRef} y={phone ? 0 : y} />
  ) : live ? (
    <LiveCard steps={beat.steps} t={t} T={T} />
  ) : (
    <div className="ai-card ai-empty" />
  );

  if (phone) {
    return (
      <div className="pt-ai__view" ref={viewRef} style={{ height: h }}>
        <div className="pt-ai__col" ref={colRef} style={{ transform: `translateY(${-y}px)` }}>
          {ask}
          <div className="pt-ai__right">{card}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-ai__cols" ref={colRef}>
      {ask}
      <div className="pt-ai__right" ref={viewRef}>
        {card}
      </div>
    </div>
  );
}

function Worked({ beat }: { beat: AiAskBeatData }) {
  return (
    <ol className="ai-working">
      {beat.worked.map((g) => (
        <li key={g.kind}>
          <span className="ai-kind">{g.kind}</span>
          {g.lines.map((l) => (
            <span key={l.text} className="ai-line">
              <span>{l.text}</span>
              {l.chip ? <span className="ai-chip">{l.chip}</span> : null}
            </span>
          ))}
        </li>
      ))}
    </ol>
  );
}

const sec = (ms: number) => `${(ms / 1000).toFixed(1)} s`;

/** "Working on it": the clock, the five phases, and the steps, newest first. */
function LiveCard({ steps, t, T }: { steps: readonly AiStep[]; t: number; T: T }) {
  const now = steps.findIndex((_, i) => t < T.steps[i].end);
  const running = now === -1 ? steps.length - 1 : now;
  const phase = steps[running].phase;
  const shown = steps.map((s, i) => ({ s, i })).filter(({ i }) => t >= T.steps[i].start);
  const secs = Math.max(0, Math.floor((t - T.ask) / 1000));
  return (
    <div className="ai-card aw-live">
      <div className="aw-head">
        <p className="aw-kicker">Working on it</p>
        <span className="aw-clock">0:{String(secs).padStart(2, "0")}</span>
      </div>
      <ol className="aw-phases">
        {PHASES.map((p, i) => (
          <li key={p} className="aw-stop" data-stop={i < phase ? "done" : i === phase ? "now" : "next"}>
            <span className="aw-bar" />
            <span className="aw-stop__label">{p}</span>
          </li>
        ))}
      </ol>
      <ol className="aw-list">
        {[...shown].reverse().map(({ s, i }) => {
          const done = t >= T.steps[i].end;
          return (
            <li key={s.label} className="aw-row" data-step-state={done ? "done" : "running"}>
              <span className="aw-glyph">{done ? <Tick /> : <Spin />}</span>
              <span className="aw-label">
                {s.label}
                {done && s.chip ? <span className="aw-chip">{s.chip}</span> : null}
              </span>
              <span className="aw-t">{done ? sec(s.ms) : ""}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="7.5" fill="var(--pt-accent-text)" />
      <path className="aw-tick" d="M4.8 8.2 7 10.3l4.2-4.5" fill="none" stroke="var(--pt-card)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spin() {
  return (
    <svg className="aw-spin" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke="var(--pt-ground-deep)" strokeWidth="2" />
      <path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke="var(--pt-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** The structured answer, block by block, as ai/AnswerBlocks.tsx lays it out. */
function Answer({ beat, cardRef, y }: { beat: AiAskBeatData; cardRef: React.RefObject<HTMLDivElement | null>; y: number }) {
  const a = beat.answer;
  const max = a.chart.ticks[a.chart.ticks.length - 1];
  const fmt = (v: number) => (a.chart.money ? `$${v.toLocaleString("en-US")}` : v.toLocaleString("en-US"));
  const long = a.figures.some((f) => f.value.length > 5);
  return (
    <div className="ai-card ai-answer" ref={cardRef}>
      <div className="ai-answer__body" style={{ transform: `translateY(${-y}px)` }}>
        <p className="aa-head aa-in" style={{ "--i": 0 } as CSSProperties}>
          {a.headline}
        </p>
        <dl className="aa-figs aa-in" data-n={a.figures.length} data-long={long ? "" : undefined} style={{ "--i": 1 } as CSSProperties}>
          {a.figures.map((f) => (
            <div key={f.label} className="aa-fig">
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="aa-chart aa-in" style={{ "--i": 2 } as CSSProperties}>
          <p className="ch-title">{a.chart.title}</p>
          <div className="ch-bars" style={{ "--n": a.chart.bars.length } as CSSProperties}>
            {a.chart.bars.map((b, i) => (
              <div key={b.label} className="ch-row">
                <span className="ch-label">{b.label}</span>
                <span className="ch-track">
                  {a.chart.ticks.slice(1).map((k) => (
                    <i key={k} className="ch-grid" style={{ left: `${(k / max) * 100}%` }} />
                  ))}
                  <span className="ch-bar" style={{ width: `${(b.value / max) * 100}%`, "--b": i } as CSSProperties} />
                  <span className="ch-val" style={{ left: `${(b.value / max) * 100}%` }}>
                    {fmt(b.value)}
                  </span>
                </span>
              </div>
            ))}
            <div className="ch-row ch-axis">
              <span className="ch-label" />
              <span className="ch-track">
                {a.chart.ticks.map((k) => (
                  <span key={k} className="ch-tick" style={{ left: `${(k / max) * 100}%` }}>
                    {fmt(k)}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
        <section className="aa-sec aa-in" style={{ "--i": 3 } as CSSProperties}>
          <p className="aa-k">What it likely means</p>
          <ul className="aa-means">
            {a.means.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>
        <section className="aa-sec aa-plan aa-in" style={{ "--i": 4 } as CSSProperties}>
          <p className="aa-k">What we&apos;re doing next</p>
          <ol className="aa-next">
            {a.next.map((n) => (
              <li key={n}>
                <span>{n}</span>
              </li>
            ))}
          </ol>
        </section>
        <p className="ai-sources aa-in" style={{ "--i": 5 } as CSSProperties}>
          <span>Sources: </span>
          {a.sources.map((s, i) => (
            <span key={s.label}>
              {i > 0 ? " · " : ""}
              <strong>{s.label}</strong>
              {s.detail ? ` (${s.detail})` : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
