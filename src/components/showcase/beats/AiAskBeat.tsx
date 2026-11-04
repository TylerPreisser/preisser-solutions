"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { AiAskBeat as AiAskBeatData, AiStep } from "@/data/showcase/types";
import { FitWidth, PortalFrame, TopBar, useBox, type BeatProps } from "./shared";
import { FetchBand, bandHeight, type FetchPlan } from "./FetchBand";

/**
 * The MarCommand AI tab (marcommand-marketing-engine packages/portal-ui/ai:
 * AiView, AiWork's live card and phase track, AnswerBlocks; copy from
 * ai/copy.ts), rendered on its harness 2026-11-01 and matched here. A question
 * types itself into the field, the five phases light up in order while the
 * steps run, then the answer lands in the real answer layout: the one-sentence
 * answer, its figures, its chart, what it likely means and what we're doing next.
 *
 * Desk: the tab's two columns laid out at the window's own size (960 to 1220
 * css px wide, scaled down only below 960), so the answer has room to stand
 * whole. Phone: one column 320 wide (round 7: scaled to the sheet's width, so a
 * 12.5 px face is never under 11 css px at 320), as tall as the sheet allows;
 * the column moves up once, to the answer, and rests there.
 *
 * The answer never scrolls by itself (critique 2026-11-04 #2: a pan hid the
 * headline and left a blank band). It rests on its top, headline first; a
 * block that would not fit whole is not shown at all, so no edge cuts a line.
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
  return { typed, press, ask, steps, answer, worked: answer + 900, total: answer + 3000 };
}

export const aiMs = (beat: AiAskBeatData) => (beat.sources?.length ? fetchTimeline(beat).total : aiTimeline(beat).total);

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

export function AiAskBeat(p: BeatProps<AiAskBeatData>) {
  // Round 2 (ADR-0025 §4): a beat with sources shows the robot fetching them, then the answer.
  return p.beat.sources?.length ? <AiFetchBeat {...p} /> : <AiWorkingBeat {...p} />;
}

function AiWorkingBeat({ client, beat, variant, active, fill, reduced, quiet }: BeatProps<AiAskBeatData>) {
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
        // Laid out at the panel's width (960 to 1220), never the 960 x 600 picture blown up or squeezed.
        <FitWidth w={[960, 1220]}>
          {(h, w) => (
            <div className="pt-screen pt-ai pt-ai--desk" data-wide={w >= 1100 ? "" : undefined}>
              <TopBar tab="AI" window="30 days" />
              {body(h)}
            </div>
          )}
        </FitWidth>
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
  // Phone: the column moves up once, so the answer card's top (its headline) is at the top
  // of the view, and rests there. Desk: the card stands where it is. On both, the answer's
  // blocks that would not fit whole are hidden (`cut` = the first hidden block), so the
  // resting frame always ends on a whole block and never on a sliced line.
  const viewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  // What of the answer is shown: `cut` = the first block left out (null: all of it), `n` = how many
  // "What it likely means" lines are kept. null = a measuring pass: everything is laid out, measured
  // before paint, then the leftovers are taken out of the layout (display: none), so the card is
  // only as tall as what it shows (critique R2-1: no white void inside the card).
  // `noChart`: a phone too short for the chart and a line of "What it likely means" drops the chart (the
  // headline carries its numbers), never the insight (critique R2-1).
  const [fit, setFit] = useState<{ cut: number | null; n: number; noChart?: boolean } | null>(null);
  const [settle, setSettle] = useState(0);
  // Measured again whenever the column's size changes (the faces arriving re-wrap the question).
  const col = useBox(colRef);
  useEffect(() => {
    if (!answered) return;
    let on = true;
    const id = window.setTimeout(() => setSettle((n) => n + 1), 900);
    document.fonts?.ready.then(() => on && setSettle((n) => n + 1));
    return () => {
      on = false;
      window.clearTimeout(id);
    };
  }, [answered]);
  // Anything that can change what fits starts a new measuring pass.
  useLayoutEffect(() => {
    setFit(null);
  }, [answered, phone, h, col.w, settle]);
  useLayoutEffect(() => {
    if (fit !== null) return;
    const view = viewRef.current;
    const card = cardRef.current;
    const body = card?.querySelector<HTMLElement>(".ai-answer__body");
    if (!view || !card || !body || !answered) {
      setY(0);
      return;
    }
    const blocks = [...body.children] as HTMLElement[];
    let at = 0;
    let room: number;
    if (phone) {
      const column = colRef.current;
      if (!column) return;
      const box = rel(card, column);
      const asked = column.querySelector<HTMLElement>(".ai-asked");
      const above = asked ? rel(asked, column).bottom : box.top - 20;
      at = Math.max(0, box.top - Math.max(0, Math.min(10, (box.top - above) / 2)));
      // Room for the body inside the view, below the card's top padding and above its bottom padding.
      const cs = getComputedStyle(card);
      room = at + view.clientHeight - (box.top + parseFloat(cs.paddingTop)) - parseFloat(cs.paddingBottom) - 6;
    } else {
      const cs = getComputedStyle(card);
      room = (view.clientHeight || card.clientHeight) - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 2;
    }
    // The body is not positioned, so its blocks and the body share an offsetParent: subtract its top.
    const bottom = (el: HTMLElement) => el.offsetTop - body.offsetTop + el.offsetHeight;
    const first = blocks.findIndex((b) => bottom(b) > room + 0.5);
    let next: { cut: number | null; n: number; noChart?: boolean } = { cut: first < 0 ? null : Math.max(1, first), n: Infinity };
    // "What it likely means" is the insight: keep as many of its lines as fit whole, at least one.
    const means = blocks.findIndex((b) => b.matches(".aa-means-sec"));
    let n = 0;
    if (first >= 0 && first === means) {
      const pad = parseFloat(getComputedStyle(blocks[first]).paddingBottom) || 0;
      n = [...blocks[first].querySelectorAll<HTMLElement>(".aa-means > li")].filter((li) => bottom(li) + pad <= room + 0.5).length;
      if (n > 0) next = { cut: first + 1, n };
    }
    // Not one line fits under the chart on a phone: the chart goes and the lines are checked again below.
    if (phone && first >= 0 && means > 0 && first <= means && n === 0) next = { cut: means + 1, n: Infinity, noChart: true };
    setY(at);
    setFit(next);
  }, [fit, answered, phone]);
  // Check the settled card against the view: the measuring pass saw every block laid out, and taking
  // some out can re-wrap the rest. Still past the edge: give up one more line (or block) and check
  // again. Bounded: it stops at the headline plus one block.
  useLayoutEffect(() => {
    if (fit === null || !answered) return;
    const view = viewRef.current;
    const card = cardRef.current;
    const body = card?.querySelector<HTMLElement>(".ai-answer__body");
    if (!view || !card || !body) return;
    let over: number;
    if (phone) {
      const column = colRef.current;
      if (!column) return;
      over = rel(card, column).bottom - y - (view.clientHeight - 6);
    } else {
      over = card.scrollHeight - card.clientHeight;
    }
    if (over <= 0.5) return;
    const blocks = [...body.children] as HTMLElement[];
    const last = (fit.cut ?? blocks.length) - 1;
    const lines = blocks[last]?.matches(".aa-means-sec") ? blocks[last].querySelectorAll(".aa-means > li").length : 0;
    const shown = Math.min(fit.n, lines);
    if (shown > 1) setFit({ ...fit, cut: last + 1, n: shown - 1 });
    else if (fit.noChart) return;
    else if (phone && lines > 0 && last > 1) setFit({ cut: last + 1, n: Infinity, noChart: true });
    else if (last > 1) setFit({ cut: last, n: Infinity });
  }, [fit, answered, phone, y]);
  const cut = fit?.cut ?? null;
  const keep = fit?.n ?? Infinity;
  const noChart = fit?.noChart ?? false;

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
    <Answer beat={beat} cardRef={cardRef} cut={cut} keep={keep} noChart={noChart} phone={phone} />
  ) : (
    <LiveCard steps={beat.steps} t={t} T={T} waiting={!live} />
  );

  if (phone) {
    return (
      <div className={answered ? "pt-ai__view is-clipped" : "pt-ai__view"} ref={viewRef} style={{ height: h }}>
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
  cut,
  keep,
  noChart,
  phone,
  motion,
}: {
  beat: AiAskBeatData;
  cardRef: React.RefObject<HTMLDivElement | null>;
  /**
   * Round 2 (§4.3): the card lands as one piece, then the headline word by word, the figures
   * counting, the bars growing and the lines of "What it likely means", each by a CSS transition
   * delayed by these offsets (ms after the card lands). The phone keeps the 2x2 figure grid.
   */
  motion?: { words: number; figs: number; bars: number; means: number; rest: number; fig: (value: string, i: number) => string };
  /** Index of the first block that does not fit whole: it and every block after it are hidden. */
  cut: number | null;
  /** How many "What it likely means" lines are shown. */
  keep: number;
  /** A phone too short for both leaves the chart out and keeps "What it likely means". */
  noChart: boolean;
  phone: boolean;
}) {
  const a = beat.answer;
  const max = a.chart.ticks[a.chart.ticks.length - 1];
  const fmt = (v: number) => (a.chart.money ? `$${v.toLocaleString("en-US")}` : v.toLocaleString("en-US"));
  const long = a.figures.some((f) => f.value.length > 5);
  // Taken out of the layout (display: none) from the first block that does not fit.
  const off = (i: number) => (cut !== null && i >= cut ? "" : undefined);
  // A phone shows the chart and leaves the figure grid out: its numbers repeat the chart's bars, and
  // the room goes to "What it likely means" (critique R2-1). Order: headline, chart, means, plan, sources.
  // Round 2 keeps the figures on the phone (the 2x2 grid of the concept).
  const lean = phone && !motion;
  const figsAt = 1;
  const chartAt = lean ? 1 : 2;
  const at = (desk: number) => (lean ? desk - 1 : desk);
  const d = (ms: number) => (motion ? ({ "--d": `${ms}ms` } as CSSProperties) : null);
  const figs = (
    <dl className="aa-figs aa-in" data-off={off(figsAt)} data-n={a.figures.length} data-long={long ? "" : undefined} style={{ "--i": lean ? 2 : 1 } as CSSProperties}>
      {a.figures.map((f, i) => (
        <div key={f.label} className="aa-fig" style={d((motion?.figs ?? 0) + i * 80) ?? undefined}>
          <dt>{f.label}</dt>
          <dd>{motion ? motion.fig(f.value, i) : f.value}</dd>
        </div>
      ))}
    </dl>
  );
  const chart = (
    <div className="aa-chart aa-in" data-off={noChart ? "" : off(chartAt)} style={{ "--i": lean ? 1 : 2, ...d(motion?.bars ?? 0) } as CSSProperties}>
      <p className="ch-title">{a.chart.title}</p>
      <div className="ch-bars" style={{ "--n": a.chart.bars.length } as CSSProperties}>
        {a.chart.bars.map((b, i) => (
          <div key={b.label} className="ch-row">
            <span className="ch-label">{b.label}</span>
            <span className="ch-track">
              {a.chart.ticks.slice(1).map((k) => (
                <i key={k} className="ch-grid" style={{ left: `${(k / max) * 100}%` }} />
              ))}
              <span className="ch-bar" style={{ width: `${(b.value / max) * 100}%`, "--b": i, ...d((motion?.bars ?? 0) + i * 70) } as CSSProperties} />
              <span className="ch-val" style={{ left: `${(b.value / max) * 100}%`, ...d((motion?.bars ?? 0) + i * 70 + 400) } as CSSProperties}>
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
      <div className="ai-answer__body">
        <p className="aa-head aa-in" data-off={off(0)} style={{ "--i": 0 } as CSSProperties}>
          {motion
            ? chunks(a.headline).map((w, i, all) => (
                <Fragment key={i}>
                  <span className="aa-w" style={d(motion.words + i * 45) ?? undefined}>
                    {w}
                  </span>
                  {i < all.length - 1 ? " " : null}
                </Fragment>
              ))
            : a.headline}
        </p>
        {/* A phone has room for the answer and one more block: the chart comes first there, so the resting frame carries the sentence with its figures drawn (critique r8 S1, S2). */}
        {lean ? null : figs}
        {chart}
        <section className="aa-sec aa-means-sec aa-in" data-off={off(at(3))} style={{ "--i": 3, ...d(motion?.means ?? 0) } as CSSProperties}>
          <p className="aa-k">What it likely means</p>
          <ul className="aa-means">
            {a.means.map((m, i) => (
              <li key={m} data-off={i >= keep ? "" : undefined} style={d((motion?.means ?? 0) + i * 80) ?? undefined}>
                {m}
              </li>
            ))}
          </ul>
        </section>
        <section className="aa-sec aa-plan aa-in" data-off={off(at(4))} style={{ "--i": 4, ...d(motion?.rest ?? 0) } as CSSProperties}>
          <p className="aa-k">What we&apos;re doing next</p>
          <ol className="aa-next">
            {a.next.map((n) => (
              <li key={n}>
                <span>{n}</span>
              </li>
            ))}
          </ol>
        </section>
        <p className="ai-sources aa-in" data-off={off(at(5))} style={{ "--i": 5, ...d((motion?.rest ?? 0) + 80) } as CSSProperties}>
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

/** An element's top and bottom in `ref`'s own (unscaled) px. */
function rel(el: HTMLElement, ref: HTMLElement) {
  const r0 = ref.getBoundingClientRect();
  const k = r0.height / (ref.offsetHeight || 1) || 1;
  const r = el.getBoundingClientRect();
  return { top: (r.top - r0.top) / k, bottom: (r.bottom - r0.top) / k };
}

/* ── Round 2: the robot fetches the sources, then the answer lands (ADR-0025 §4) ── */

const FIRST_WALK = 600;
const DWELL = 650;
const WALK = 500;
const BACK = 600;

/**
 * Every moment of the round-2 ask, in ms from the beat's start (§4.3): the question types into
 * its centred place, the robot reads each source (~1.15 s each), walks back, the figures are
 * checked, the band folds, the question moves to its answer position, and the answer lands
 * block by block. `total` holds the answer 3 s after its last line.
 */
export function fetchTimeline(beat: AiAskBeatData) {
  const n = beat.sources?.length ?? 0;
  const typed = TYPE_AT + beat.question.length * charMs(beat.question);
  const go = Math.max(1300, Math.round(typed) + 100);
  const arrive = Array.from({ length: n }, (_, i) => go + FIRST_WALK + i * (DWELL + WALK));
  const done = arrive.map((a) => a + DWELL);
  const home = done[n - 1] + BACK;
  const checked = home + 200;
  const move = checked + 200;
  const answer = move + 440;
  const a = beat.answer;
  // Offsets after the card lands.
  const words = 120;
  const figs = words + a.headline.split(" ").length * 45 + 260;
  const bars = figs + 300;
  const means = bars + 560 + Math.max(0, a.chart.bars.length - 1) * 70;
  const rest = means + a.means.length * 80;
  const total = answer + rest + 240 + 3000;
  const plan: FetchPlan = { go, first: FIRST_WALK, walk: WALK, back: BACK, arrive, done, home, checked, fold: move };
  return { typed, plan, move, answer, words, figs, bars, means, rest, total };
}

/**
 * The headline's words for the word-by-word entry, with a run of capitalised words kept as one
 * piece: a name ("Sumac Hollow", "Google Ads.") lands whole, and stays one text node, which is
 * how the privacy probe recognises a registered name (tests/demo-privacy.probe.mjs units()).
 */
function chunks(text: string) {
  const out: string[] = [];
  for (const w of text.split(" ")) {
    const prev = out[out.length - 1];
    if (prev && /^\p{Lu}/u.test(w) && /(^|\s)\p{Lu}[^\s]*$/u.test(prev) && !/[.,:;!?]$/.test(prev)) out[out.length - 1] = `${prev} ${w}`;
    else out.push(w);
  }
  return out;
}

/** "$520" counts from $0, "5" from 0: integers of four digits or fewer (§4.3); anything else lands as is. */
function countUp(value: string, k: number) {
  const m = /^(\D*)(\d[\d,]*)(\D*)$/.exec(value);
  if (!m) return value;
  const n = parseInt(m[2].replace(/,/g, ""), 10);
  if (!(n <= 9999) || k >= 1) return value;
  const e = 1 - Math.pow(1 - Math.max(0, k), 4);
  return `${m[1]}${Math.round(n * e).toLocaleString("en-US")}${m[3]}`;
}

function AiFetchBeat({ client, beat, variant, active, fill, reduced, quiet }: BeatProps<AiAskBeatData>) {
  const T = fetchTimeline(beat);
  const t = useClock(active, reduced, T.total);
  const phone = variant === "phone";
  return (
    <PortalFrame client={client} stage="ai" narration={beat.narration} variant={variant} fill={fill} quiet={quiet}>
      <div className="ai2" data-variant={variant} data-cut={t < 100 ? "" : undefined}>
        {phone ? (
          <FitWidth w={320}>{(h) => <FetchView beat={beat} T={T} t={t} phone h={h} w={320} />}</FitWidth>
        ) : (
          <FitWidth w={[960, 1220]}>{(h, w) => <FetchView beat={beat} T={T} t={t} phone={false} h={h} w={w} />}</FitWidth>
        )}
      </div>
    </PortalFrame>
  );
}

function FetchView({ beat, T, t, phone, h, w }: { beat: AiAskBeatData; T: ReturnType<typeof fetchTimeline>; t: number; phone: boolean; h: number; w: number }) {
  // The band folds to its bottom strip when the answer needs the room: always on a phone, and on a
  // desk window too short for the headline, the figures and the chart under the full band.
  const foldable = phone || h - bandHeight(false, false) < 420;
  const folded = foldable && t >= T.plan.fold;
  const moved = t >= T.move;
  const answered = t >= T.answer;

  const typed = t < TYPE_AT ? 0 : Math.min(beat.question.length, Math.floor((t - TYPE_AT) / charMs(beat.question)) + 1);
  const typing = typed > 0 && typed < beat.question.length;

  // FLIP: the question is laid out where it rests after the answer; while the robot works, a
  // transform puts it centred in the room below the band and larger (the text block only).
  const bodyRef = useRef<HTMLDivElement>(null);
  const qRef = useRef<HTMLDivElement>(null);
  const [centre, setCentre] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const body = useBox(bodyRef);
  useLayoutEffect(() => {
    const b = bodyRef.current;
    const q = qRef.current;
    if (!b || !q) return;
    const k = phone ? 1 : 34 / 24;
    const tx = (b.clientWidth - q.offsetWidth * k) / 2 - q.offsetLeft;
    const ty = (b.clientHeight - q.offsetHeight * k) / 2 - q.offsetTop - (phone ? 0 : 12);
    setCentre(`translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${k.toFixed(4)})`);
  }, [body.w, body.h, phone, folded]);
  useEffect(() => {
    if (centre === null || ready) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [centre, ready]);

  // The answer's blocks that would not fit whole are hidden (the round-1 fit rule): measured when it lands.
  const viewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ cut: number | null; n: number; noChart?: boolean } | null>(null);
  const [settle, setSettle] = useState(0);
  useEffect(() => {
    if (!answered) return;
    let on = true;
    const id = window.setTimeout(() => setSettle((n) => n + 1), 900);
    document.fonts?.ready.then(() => on && setSettle((n) => n + 1));
    return () => {
      on = false;
      window.clearTimeout(id);
    };
  }, [answered]);
  useLayoutEffect(() => {
    setFit(null);
  }, [answered, phone, h, w, settle]);
  useLayoutEffect(() => {
    if (fit !== null || !answered) return;
    const view = viewRef.current;
    const card = cardRef.current;
    const ab = card?.querySelector<HTMLElement>(".ai-answer__body");
    if (!view || !card || !ab) return;
    const blocks = [...ab.children] as HTMLElement[];
    const cs = getComputedStyle(card);
    const room = view.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 2;
    const bottom = (el: HTMLElement) => el.offsetTop - ab.offsetTop + el.offsetHeight;
    const first = blocks.findIndex((b) => bottom(b) > room + 0.5);
    let next: { cut: number | null; n: number; noChart?: boolean } = { cut: first < 0 ? null : Math.max(1, first), n: Infinity };
    const means = blocks.findIndex((b) => b.matches(".aa-means-sec"));
    let n = 0;
    if (first >= 0 && first === means) {
      const pad = parseFloat(getComputedStyle(blocks[first]).paddingBottom) || 0;
      n = [...blocks[first].querySelectorAll<HTMLElement>(".aa-means > li")].filter((li) => bottom(li) + pad <= room + 0.5).length;
      if (n > 0) next = { cut: first + 1, n };
    }
    // A phone with no room for a line of "What it likely means" under the chart keeps the line, not the chart.
    if (phone && first >= 0 && means > 0 && first <= means && n === 0 && room > 330) next = { cut: means + 1, n: Infinity, noChart: true };
    setFit(next);
  }, [fit, answered, phone]);
  useLayoutEffect(() => {
    if (fit === null || !answered) return;
    const card = cardRef.current;
    const ab = card?.querySelector<HTMLElement>(".ai-answer__body");
    if (!card || !ab) return;
    if (card.scrollHeight - card.clientHeight <= 0.5) return;
    const blocks = [...ab.children] as HTMLElement[];
    const last = (fit.cut ?? blocks.length) - 1;
    const lines = blocks[last]?.matches(".aa-means-sec") ? blocks[last].querySelectorAll(".aa-means > li").length : 0;
    const shown = Math.min(fit.n, lines);
    if (shown > 1) setFit({ ...fit, cut: last + 1, n: shown - 1 });
    else if (fit.noChart) setFit({ cut: Math.max(1, last), n: Infinity, noChart: true });
    else if (last > 1) setFit({ cut: last, n: Infinity });
  }, [fit, answered]);

  const k = (ms: number) => (t - T.answer - ms) / 520;
  const motion = {
    words: T.words,
    figs: T.figs,
    bars: T.bars,
    means: T.means,
    rest: T.rest,
    fig: (v: string, i: number) => countUp(v, k(T.figs + i * 80)),
  };

  return (
    <div className="ai2__screen" data-ready={ready ? "" : undefined}>
      <FetchBand sources={beat.sources ?? []} steps={beat.steps} plan={T.plan} t={t} phone={phone} width={w} folded={folded} />
      <div className="ai2__body" ref={bodyRef}>
        <div className="ai2__q" ref={qRef} data-moved={moved ? "" : undefined} style={{ transform: moved || !centre ? "none" : centre }}>
          <p className="ai2__k">You asked</p>
          <p className="ai2__qt">
            <span>{beat.question.slice(0, typed)}</span>
            {typing ? <i className="ai2__caret" /> : null}
            <span className="ai2__ghost">{beat.question.slice(typed)}</span>
          </p>
        </div>
        <div className="ai2__area" ref={viewRef}>
          <div className="ai2__card" data-in={answered ? "" : undefined}>
            <Answer beat={beat} cardRef={cardRef} cut={fit?.cut ?? null} keep={fit?.n ?? Infinity} noChart={fit?.noChart ?? false} phone={phone} motion={motion} />
          </div>
        </div>
      </div>
    </div>
  );
}
