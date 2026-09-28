"use client";

import type { DemoStep } from "@/types/demo-stage";
import type { StageTimeline } from "./useStageTimeline";

export function StepControls({ steps, tl, label }: { steps: readonly DemoStep[]; tl: StageTimeline; label: string }) {
  const { step, n, js, auto } = tl.state;
  return (
    <div className="demo-controls">
      <ol className="demo-steps" aria-label={`${label}, step by step`}>
        {steps.map((st, i) => {
          const k = i + 1;
          return (
            <li key={k}>
              <button
                type="button"
                className="demo-steps__item"
                data-reached={step >= k ? "" : undefined}
                aria-current={js && step === k ? "step" : undefined}
                disabled={!js}
                onClick={() => tl.goto(k)}
              >
                <span className="demo-steps__n" aria-hidden="true">
                  {k}
                </span>
                <span className="demo-steps__caption">{st.caption}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="demo-controls__buttons" role="group" aria-label={`${label} controls`}>
        <button type="button" className="demo-btn" onClick={tl.back} disabled={!js || step <= 0}>
          Back
        </button>
        <button type="button" className="demo-btn" onClick={tl.next} disabled={!js || step >= n}>
          Next
        </button>
        <button type="button" className="demo-btn" onClick={tl.replay} disabled={!js}>
          Replay
        </button>
        <span className="demo-controls__count" aria-live={auto ? "off" : "polite"}>
          Step {Math.max(1, step)} of {n}
        </span>
      </div>
    </div>
  );
}
