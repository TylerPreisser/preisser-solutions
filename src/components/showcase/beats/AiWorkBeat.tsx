"use client";

import { useEffect, useState } from "react";
import type { AiAtWorkBeat as AiAtWorkBeatData } from "@/data/showcase/types";
import { Fit, FitWidth, PortalFrame, type BeatProps } from "./shared";

/**
 * The AI working a queue by itself: items come in on the left, the one it is
 * on opens on the right and its steps tick off, then the result is filed and
 * it moves to the next. Same portal look and theme as the other beats; data
 * only (beat.items), so a client file can use it without new code.
 */
const STEP_MS = 620;
const RESULT_MS = 700;

const itemMs = (n: number) => n * STEP_MS + RESULT_MS;
export const aiWorkMs = (beat: AiAtWorkBeatData) => 400 + beat.items.reduce((a, it) => a + itemMs(it.steps.length), 0) + 2600;

export function AiWorkBeat({ client, beat, variant, active, fill, reduced, quiet }: BeatProps<AiAtWorkBeatData>) {
  const total = aiWorkMs(beat);
  const [t, setT] = useState(reduced ? Infinity : 0);
  useEffect(() => {
    if (reduced) return setT(Infinity);
    if (!active) return;
    const t0 = performance.now();
    setT(0);
    const id = window.setInterval(() => {
      const e = performance.now() - t0;
      setT(e);
      if (e > total) window.clearInterval(id);
    }, 60);
    return () => window.clearInterval(id);
  }, [active, reduced, total]);

  // Where each item starts, and which one is open now.
  let at = 400;
  const spans = beat.items.map((it) => {
    const s = { start: at, end: at + itemMs(it.steps.length) };
    at = s.end;
    return s;
  });
  const cur = Math.max(0, spans.findIndex((s) => t < s.end));
  const allDone = t >= at;
  const open = allDone ? beat.items.length - 1 : cur;
  const item = beat.items[open];
  const local = t - spans[open].start;
  const stepsDone = allDone ? item.steps.length : Math.min(item.steps.length, Math.floor(local / STEP_MS));
  const filed = allDone || local >= item.steps.length * STEP_MS;

  const queue = (
    <ol className="pt-q">
      {beat.items.map((it, i) => {
        const state = allDone || t >= spans[i].end ? "done" : i === open ? "now" : "wait";
        return (
          <li key={it.title} className="pt-q__item" data-state={state}>
            <span className="pt-q__src">{it.source}</span>
            <span className="pt-q__title">{it.title}</span>
            <span className="pt-q__from">{it.from}</span>
            {state === "done" ? <span className="pt-q__result">{it.result}</span> : null}
          </li>
        );
      })}
    </ol>
  );
  const work = (
    <div className="ai-card pt-w">
      <p className="aw-kicker">
        {item.source} · {item.from}
      </p>
      <p className="pt-w__title">{item.title}</p>
      <ol className="aw-list">
        {item.steps.map((s, i) => {
          const state = i < stepsDone ? "done" : i === stepsDone && !filed ? "running" : "next";
          return (
            <li key={s} className="aw-row" data-step-state={state}>
              <span className="aw-glyph">{state === "done" ? "✓" : state === "running" ? "•" : ""}</span>
              <span className="aw-label">{s}</span>
            </li>
          );
        })}
      </ol>
      {filed ? <p className="pt-w__result">{item.result}</p> : null}
      {allDone ? <p className="pt-w__done">{beat.done}</p> : null}
    </div>
  );

  return (
    <PortalFrame client={client} stage="ai-work" narration={beat.narration} variant={variant} fill={fill} quiet={quiet}>
      {variant === "phone" && fill ? (
        <FitWidth w={400}>
          {() => (
            <div className="pt-screen pt-aw pt-aw--phone">
              <p className="pt-k">{beat.title}</p>
              {work}
              {queue}
            </div>
          )}
        </FitWidth>
      ) : (
        <Fit w={960} h={600}>
          <div className="pt-screen pt-aw pt-aw--desk">
            <div>
              <p className="pt-k">{beat.title}</p>
              {queue}
            </div>
            {work}
          </div>
        </Fit>
      )}
    </PortalFrame>
  );
}
