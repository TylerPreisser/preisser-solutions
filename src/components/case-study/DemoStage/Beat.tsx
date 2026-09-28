"use client";

import { useMemo, type ReactNode } from "react";
import type { DemoBeat, DemoStep } from "@/types/demo-stage";
import { StepControls } from "./StepControls";
import { useStageTimeline } from "./useStageTimeline";

const EYEBROW: Record<DemoBeat["kind"], string> = {
  before: "Before",
  read: "The read",
  caught: "What it caught",
  screen: "The screen",
};

export function stepsOf(beat: DemoBeat): readonly DemoStep[] {
  switch (beat.kind) {
    case "before":
      return [];
    case "read":
      return beat.steps;
    case "caught":
      return beat.cards.map((c) => ({ caption: c.caption }));
    case "screen":
      return beat.tabs ? [] : beat.steps ?? [];
  }
}

export function BeatHead({ beat }: { beat: DemoBeat }) {
  return (
    <div className="demo-beat__head">
      <span className="demo-beat__eyebrow">{beat.eyebrow ?? EYEBROW[beat.kind]}</span>
      <p className="demo-beat__caption">{beat.caption}</p>
    </div>
  );
}

export function Beat({ beat, children }: { beat: DemoBeat; children: ReactNode }) {
  const steps = useMemo(() => stepsOf(beat), [beat]);
  if (steps.length === 0) {
    return (
      <div className="demo-beat" data-beat={beat.id} data-beat-kind={beat.kind}>
        <BeatHead beat={beat} />
        <div className="demo-beat__body">{children}</div>
      </div>
    );
  }
  return (
    <SteppedBeat beat={beat} steps={steps}>
      {children}
    </SteppedBeat>
  );
}

function SteppedBeat({ beat, steps, children }: { beat: DemoBeat; steps: readonly DemoStep[]; children: ReactNode }) {
  const tl = useStageTimeline(steps);
  return (
    <div className="demo-beat demo-beat--stepped" data-beat={beat.id} data-beat-kind={beat.kind} {...tl.trackProps}>
      <BeatHead beat={beat} />
      <div className="demo-beat__body">{children}</div>
      <StepControls steps={steps} tl={tl} label={beat.eyebrow ?? EYEBROW[beat.kind]} />
    </div>
  );
}
