"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { ImpactBeat as ImpactBeatData, ImpactChapter, ImpactCopy, ImpactPair, ImpactShape, ImpactStep } from "@/data/showcase/types";
import type { BeatProps } from "./shared";
import "./impact.css";

/**
 * The Impact tab (ADR-0022 §3; design spec §5, reworked after critic round 1
 * §3). The payoff comes first: what the work was, receded, and what it is now,
 * bright, at display size. Then the figures, large. Then how the engine does
 * it, smaller, in a shape that comes from the client's own material:
 *
 *   chapters  each engine its own numbered section (HG Oil)
 *   pieces    the weekend's pieces as before -> now cards (NWKS Encounter)
 *   path      the stations a bill passes through (FarmBooks)
 *   loop      the partner loop, which comes back to its start (Duffer Golf)
 *
 * Our voice and tokens, never the client's portal theme. It uses the panel's
 * full width on desktop (container queries on the panel, not the viewport) and
 * stacks in the same order on phones. Absent data leaves no trace.
 *
 * Motion: the steps build in once, the first time the tab is shown, only under
 * data-play (set by JS when motion is allowed). Without it everything rests
 * visible. The contrast, figures and closing never move.
 *
 * Real facts, not demonstration data: a `data-fact-stage`, scanned by the
 * privacy probe like a demo stage but carrying no "Demonstration data" label.
 */
export function ImpactBeat({ client, beat, active, reduced, quiet }: BeatProps<ImpactBeatData>) {
  const scroller = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [edge, setEdge] = useState({ top: false, more: false });
  const uid = useId();
  const kickerId = `${uid}-k`;
  const narrId = `${uid}-n`;

  useEffect(() => {
    if (active && !reduced) setPlay(true);
  }, [active, reduced]);

  // Which edges have more text past them: those fade instead of slicing a line mid-glyph.
  function readEdge(el: HTMLElement) {
    const top = el.scrollTop > 0;
    const more = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    setEdge((e) => (e.top === top && e.more === more ? e : { top, more }));
  }

  // The scroller joins the Tab order only when there is something to scroll.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const read = () => {
      setOverflow(el.scrollHeight > el.clientHeight + 1);
      readEdge(el);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      className={`im im--${beat.shape}`}
      data-fact-stage={`${client.slug}-impact`}
      aria-hidden={quiet || undefined}
      aria-labelledby={kickerId}
      aria-describedby={narrId}
    >
      <p id={narrId} data-demo-narration hidden>
        {beat.narration}
      </p>
      <div
        ref={scroller}
        className="im__scroll"
        data-edge={edge.top && edge.more ? "both" : edge.top ? "top" : edge.more ? "bottom" : undefined}
        tabIndex={overflow ? 0 : undefined}
        onScroll={(e) => readEdge(e.currentTarget)}
      >
        <div className="im__col" data-play={play ? "" : undefined}>
          <p className="im__kicker" id={kickerId}>
            {beat.kicker}
          </p>
          {beat.chapters.map((c, i) => (
            <Chapter key={c.name} c={c} n={i + 1} shape={beat.shape} numbered={beat.chapters.length > 1} />
          ))}
          <p className="im__close">{copy(beat.closing)}</p>
        </div>
      </div>
    </section>
  );
}

const copy = (c: ImpactCopy) => (typeof c === "string" ? c : c.text);

function Arrow({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 48 24" fill="none" aria-hidden="true">
      <path d="M2 12h40M33 4l9 8-9 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chapter({ c, n, shape, numbered }: { c: ImpactChapter; n: number; shape: ImpactShape; numbered: boolean }) {
  const pieces = shape === "pieces";
  return (
    <div className="im__ch">
      <div className="im__ch-head">
        {numbered ? (
          <span className="im__ch-n" aria-hidden="true">
            {String(n).padStart(2, "0")}
          </span>
        ) : null}
        <h3 className="im__ch-name">{c.name}</h3>
        {c.cadence ? <span className="im__ch-when">{copy(c.cadence)}</span> : null}
      </div>

      <div className="im__hero">
        <div className="im__was">
          <p className="im__tag">Before</p>
          <p className="im__was-t">{copy(c.hero.before)}</p>
        </div>
        <Arrow className="im__arrow" />
        <div className="im__is">
          <p className="im__tag im__tag--now">Now</p>
          <p className="im__is-t">{copy(c.hero.now)}</p>
        </div>
      </div>

      {c.figures && c.figures.length > 0 ? (
        <ul className="im__figs" data-n={c.figures.length}>
          {c.figures.map((f) => (
            <li key={f.value} className="im__fig">
              <span className="im__fig-v">{f.value}</span>
              <span className="im__fig-l">{f.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {c.time && c.time.length > 0 ? (
        <ul className="im__time">
          {c.time.map((t) => (
            <li key={t.label} className="im__time-row">
              <p className="im__pair-l">{t.label}</p>
              <p className="im__time-was">
                <span className="ps-visually-hidden">Before: </span>
                <span className="im__time-v">{t.before.value}</span> {t.before.label}
              </p>
              <Arrow className="im__arrow im__arrow--sm" />
              <p className="im__time-is">
                <span className="ps-visually-hidden">Now: </span>
                <span className="im__time-v">{t.now.value}</span> {t.now.label}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {pieces && c.pairs?.length ? <Pieces pairs={c.pairs} /> : null}

      <p className="im__how">{c.how}</p>
      <Steps steps={c.steps} shape={shape} />

      {!pieces && c.pairs?.length ? <Pairs pairs={c.pairs} /> : null}
    </div>
  );
}

function Steps({ steps, shape }: { steps: readonly ImpactStep[]; shape: ImpactShape }) {
  const kind = shape === "path" || shape === "loop" ? "track" : "grid";
  const list = (
    <ol className={`im__steps im__steps--${kind}`} data-n={steps.length}>
      {steps.map((s, i) => (
        <li key={s.verb + i} className="im__step" style={{ "--im-i": i } as CSSProperties}>
          <span className="im__step-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="im__step-body">
            <span className="im__verb">{s.verb}</span> <span className="im__text">{copy(s.text)}</span>
          </span>
        </li>
      ))}
    </ol>
  );
  if (shape !== "loop") return list;
  // The loop comes back to its start: a dashed return line under the stations,
  // from the last one back up into the first (wide); beside them on a phone.
  const a = 1000 / (2 * steps.length);
  const b = 1000 - a;
  return (
    <div className="im__loop">
      {list}
      <svg className="im__loop-back" viewBox="0 0 1000 60" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path
          d={`M${b} 2 C${b} 50, ${b - 20} 50, ${b - 60} 50 L${a + 60} 50 C${a + 20} 50, ${a} 50, ${a} 6`}
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 7"
          vectorEffect="non-scaling-stroke"
        />
        <path d={`M${a - 9} 16 L${a} 4 L${a + 9} 16`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function Pairs({ pairs }: { pairs: readonly ImpactPair[] }) {
  return (
    <ul className="im__pairs">
      {pairs.map((p) => (
        <li key={p.label} className="im__pair">
          <p className="im__pair-l">{p.label}</p>
          <p className="im__pair-was">
            <span className="ps-visually-hidden">Before: </span>
            {copy(p.before)}
          </p>
          <Arrow className="im__arrow im__arrow--sm" />
          <p className="im__pair-is">
            <span className="ps-visually-hidden">Now: </span>
            {copy(p.now)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Pieces({ pairs }: { pairs: readonly ImpactPair[] }) {
  return (
    <ul className="im__pieces" data-n={pairs.length}>
      {pairs.map((p) => (
        <li key={p.label} className="im__piece">
          <p className="im__piece-l">{p.label}</p>
          <p className="im__piece-was">
            <span className="ps-visually-hidden">Before: </span>
            {copy(p.before)}
          </p>
          <Arrow className="im__arrow im__arrow--sm im__arrow--down" />
          <p className="im__piece-is">
            <span className="ps-visually-hidden">Now: </span>
            {copy(p.now)}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** How long the Impact tab holds before the window moves on (only while a window still auto-advances). */
export function impactMs(b: ImpactBeatData): number {
  const words = b.chapters
    .flatMap((c) => [copy(c.hero.before), copy(c.hero.now), ...c.steps.map((s) => `${s.verb} ${copy(s.text)}`)])
    .join(" ")
    .split(/\s+/).length;
  return Math.min(30000, Math.max(12000, words * 260));
}
