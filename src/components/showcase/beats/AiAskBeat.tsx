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
 * column 320 wide (round 7: scaled to the sheet's width, so a 12.5 px face is
 * never under 11 css px at 320), as tall as the sheet allows; the column moves up to the
 * answer and then down through it, the way a person would scroll.
 */
const PHASES = ["Reading your question", "Reading your numbers", "Working it out", "Writing", "Checking every figure"] as const;
const TYPE_AT = 120;
/** The whole question types in 1.08 s or less, whatever its length (critique r6 A2). */
const TYPE_MS = 1080;
const charMs = (q: string) => Math.min(42, TYPE_MS / Math.max(1, q.length));

/**
 * Every moment of the ask, in ms from the beat's start. The answer column is
 * never blank: it shows the waiting card from 0, the phase rail and the first
 * step row the moment the question is sent, and the steps run until the
 * answer replaces them.
 */
export function aiTimeline(beat: AiAskBeatData) {
  const typed = TYPE_AT + beat.question.length * charMs(beat.question);
  const press = typed + 140;
  const ask = press + 120;
  let t = ask;
  const steps = beat.steps.map((s) => {
    const r = { start: t, end: t + s.ms };
    t += s.ms;
    return r;
  });
  const answer = t + 200;
  // The column scrolls down through "What we're doing next" and the sources at `pan`,
  // then comes back up at `back` and HOLDS on the answer with its figures and chart:
  // that is the resting frame, never the plan or the sources (critique r8 S1).
  const pan = answer + 2900;
  return { typed, press, ask, steps, answer, worked: answer + 900, pan, back: pan + 2700, total: pan + 6200 };
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

  const typed = t < TYPE_AT ? 0 : Math.min(beat.question.length, Math.floor((t - TYPE_AT) / charMs(beat.question)) + 1);
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
        // The column sits inside 12 px of padding: its view is the picture less 24 px, so its bottom edge is the edge you see.
        <FitWidth w={320}>{(h) => <div className="pt-screen pt-ai pt-ai--phone">{body(h - 24)}</div>}</FitWidth>
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
  // Every resting stop has clean edges (critique r6 A3): the top stops on the
  // top of a line, and the bottom is clipped above the first line that would
  // be sliced, so no line of text is ever cut, in motion or reduced motion.
  const viewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  const [clip, setClip] = useState({ top: 0, bottom: 0 });
  const [settle, setSettle] = useState(0);
  const panned = t >= T.pan && t < T.back;
  // Measured again whenever the column's size changes (the faces arriving re-wrap the question).
  const col = useBox(colRef);
  // Measure once more after the answer's blocks have finished arriving (they rise 6 px as they fade in).
  useEffect(() => {
    if (!answered) return;
    let on = true;
    const id = window.setTimeout(() => setSettle((n) => n + 1), 900);
    // The faces arriving re-wrap the lines: measure again once they have.
    document.fonts?.ready.then(() => on && setSettle((n) => n + 1));
    return () => {
      on = false;
      window.clearTimeout(id);
    };
  }, [answered, panned]);
  useLayoutEffect(() => {
    const view = viewRef.current;
    const card = cardRef.current;
    if (!view || !card || !answered) {
      setY(0);
      setClip({ top: 0, bottom: 0 });
      return;
    }
    if (phone) {
      const column = colRef.current;
      if (!column) return;
      const viewH = view.clientHeight;
      const lines = linesOf(card, column);
      const box = rel(card, column);
      // The first stop shows the card's top edge, never a slice of the question above it.
      const asked = column.querySelector<HTMLElement>(".ai-asked");
      const above = asked ? rel(asked, column).bottom : box.top - 20;
      const top = box.top - Math.max(0, Math.min(10, (box.top - above) / 2));
      const room = box.bottom + 12 - viewH;
      const at = panned && !reduced && room > top ? snapTop(lines, room) : top;
      let bottom = cleanBottom(lines, at + viewH);
      // A section heading never ends the view on its own ("What it likely means" with nothing under it).
      for (const k of card.querySelectorAll<HTMLElement>(".aa-k")) {
        const hd = rel(k, column);
        const after = lines.find((l) => l.top > hd.bottom - 0.5);
        if (hd.top >= at && hd.bottom <= bottom + 0.5 && (!after || after.bottom > bottom + 0.5)) bottom = Math.min(bottom, hd.top - 1);
      }
      setY(at);
      setClip({ top: 0, bottom: Math.max(0, at + viewH - bottom) });
    } else {
      const body = card.querySelector<HTMLElement>(".ai-answer__body");
      if (!body) return;
      const cs = getComputedStyle(card);
      const visH = card.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const lines = linesOf(body, body);
      const over = body.offsetHeight - visH;
      const at = panned && !reduced && over > 0 ? snapTop(lines, over) : 0;
      const bottom = cleanBottom(lines, at + visH);
      setY(at);
      setClip({ top: at, bottom: Math.max(0, body.offsetHeight - bottom) });
    }
  }, [answered, panned, phone, reduced, h, col.h, settle]);

  const ask = (
    <div className="pt-ai__left">
      <form className={`ai-ask${typing ? " is-typing" : ""}`} onSubmit={(e) => e.preventDefault()} aria-hidden="true">
        <span className="ai-ask__field">
          {field ? (
            <span className="ai-ask__typed">
              {field}
              {typing ? <i className="ai-ask__caret" /> : null}
            </span>
          ) : (
            <span className="ai-ask__ph">Ask about your numbers…</span>
          )}
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
    <Answer beat={beat} cardRef={cardRef} y={phone ? 0 : y} clip={phone ? null : clip} phone={phone} />
  ) : (
    <LiveCard steps={beat.steps} t={t} T={T} waiting={!live} />
  );

  if (phone) {
    return (
      <div
        className={clip.bottom > 0 ? "pt-ai__view is-clipped" : "pt-ai__view"}
        ref={viewRef}
        style={{ height: h, clipPath: clip.bottom > 0 ? `inset(0 0 ${clip.bottom}px 0)` : undefined }}
      >
        <div className="pt-ai__col" ref={colRef} style={{ transform: `translateY(${-y}px)`, transitionDuration: panned ? "2200ms" : undefined }}>
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

/**
 * "Working on it": the clock, the five phases, and the steps, newest first.
 * `waiting`: the question is still being typed, so the card shows its phase
 * rail at rest instead of an empty box (critique r6 A2).
 */
function LiveCard({ steps, t, T, waiting }: { steps: readonly AiStep[]; t: number; T: T; waiting: boolean }) {
  const now = steps.findIndex((_, i) => t < T.steps[i].end);
  const running = now === -1 ? steps.length - 1 : now;
  const phase = waiting ? -1 : steps[running].phase;
  const shown = waiting ? [] : steps.map((s, i) => ({ s, i })).filter(({ i }) => t >= T.steps[i].start);
  const secs = waiting ? 0 : Math.max(0, Math.floor((t - T.ask) / 1000));
  return (
    <div className={waiting ? "ai-card aw-live is-waiting" : "ai-card aw-live"}>
      <div className="aw-head">
        <p className="aw-kicker">{waiting ? "Ready for your question" : "Working on it"}</p>
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
      {/* The phone shows only the phase that is running, on its own line, under the rail. */}
      <p className="aw-now">{phase >= 0 ? (PHASES as readonly string[])[phase] : "\u00a0"}</p>
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
function Answer({
  beat,
  cardRef,
  y,
  clip,
  phone,
}: {
  beat: AiAskBeatData;
  cardRef: React.RefObject<HTMLDivElement | null>;
  y: number;
  clip: { top: number; bottom: number } | null;
  phone: boolean;
}) {
  const a = beat.answer;
  const max = a.chart.ticks[a.chart.ticks.length - 1];
  const fmt = (v: number) => (a.chart.money ? `$${v.toLocaleString("en-US")}` : v.toLocaleString("en-US"));
  const long = a.figures.some((f) => f.value.length > 5);
  const figs = (
    <dl className="aa-figs aa-in" data-n={a.figures.length} data-long={long ? "" : undefined} style={{ "--i": phone ? 2 : 1 } as CSSProperties}>
      {a.figures.map((f) => (
        <div key={f.label} className="aa-fig">
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
  const chart = (
    <div className="aa-chart aa-in" style={{ "--i": phone ? 1 : 2 } as CSSProperties}>
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
  );
  return (
    <div className="ai-card ai-answer" ref={cardRef}>
      <div
        className="ai-answer__body"
        style={{ transform: `translateY(${-y}px)`, clipPath: clip && (clip.top > 0 || clip.bottom > 0) ? `inset(${clip.top}px 0 ${clip.bottom}px 0)` : undefined }}
      >
        <p className="aa-head aa-in" style={{ "--i": 0 } as CSSProperties}>
          {a.headline}
        </p>
        {/* A phone has room for the answer and one more block: the chart comes first there, so the resting frame carries the sentence with its figures drawn (critique r8 S1, S2). */}
        {phone ? chart : figs}
        {phone ? figs : chart}
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

/** The answer's lines: every piece of text that must never be cut by an edge. */
const LINES = ".aa-head, .aa-fig, .ch-title, .ch-row, .aa-k, .aa-means > li, .aa-next > li, .ai-sources";

/** An element's top and bottom in `ref`'s own (unscaled) px. */
function rel(el: HTMLElement, ref: HTMLElement) {
  const r0 = ref.getBoundingClientRect();
  const k = r0.height / (ref.offsetHeight || 1) || 1;
  const r = el.getBoundingClientRect();
  return { top: (r.top - r0.top) / k, bottom: (r.bottom - r0.top) / k };
}

function linesOf(root: HTMLElement, ref: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>(LINES)].map((e) => rel(e, ref)).sort((a, b) => a.top - b.top);
}

/** A scroll position at or below `need` that starts on the top of a line, with a little air above it. */
function snapTop(lines: { top: number; bottom: number }[], need: number) {
  const i = lines.findIndex((l) => l.top >= need);
  if (i < 0) return need;
  const above = i > 0 ? lines[i - 1].bottom : -Infinity;
  return lines[i].top - Math.max(0, Math.min(4, (lines[i].top - above) / 2));
}

/** The lowest edge at or above `edge` that no line straddles. */
function cleanBottom(lines: { top: number; bottom: number }[], edge: number) {
  let e = edge;
  for (let moved = true; moved; ) {
    moved = false;
    for (const l of lines) {
      if (l.top < e - 0.5 && l.bottom > e + 0.5) {
        e = l.top - 1;
        moved = true;
      }
    }
  }
  return e;
}
