"use client";

import "./demo-stage.css";
import "./skins.css";
import { isValidElement, type ReactNode } from "react";
import type { DemoBeatsStage, DemoStage as DemoStageData } from "@/types/demo-stage";
import { Beat } from "./Beat";
import { TabbedScreen, type TabSlots, type TabbedScreenBeat } from "./TabbedScreen";

/** A beat's drawing, or for a tabbed Screen beat, one drawing pair per tab. */
export type BeatSlot = ReactNode | { tabs: Readonly<Record<string, TabSlots>> };

function isTabSlot(slot: BeatSlot): slot is { tabs: Readonly<Record<string, TabSlots>> } {
  return typeof slot === "object" && slot !== null && !isValidElement(slot) && "tabs" in slot;
}

function renderBeats(stage: DemoBeatsStage, slots: Readonly<Record<string, BeatSlot>>) {
  return stage.beats.map((b) => {
    const slot = slots[b.id];
    if (slot === undefined) throw new Error(`[DemoStage ${stage.id}] no slot for beat "${b.id}"`);
    if (b.kind === "screen" && b.tabs) {
      if (!isTabSlot(slot)) throw new Error(`[DemoStage ${stage.id}] beat "${b.id}" is tabbed; pass { tabs: {...} }`);
      return <TabbedScreen key={b.id} beat={b as TabbedScreenBeat} panels={slot.tabs} />;
    }
    if (isTabSlot(slot)) throw new Error(`[DemoStage ${stage.id}] beat "${b.id}" is not tabbed`);
    return (
      <Beat key={b.id} beat={b}>
        {slot}
      </Beat>
    );
  });
}

/**
 * The Preisser mat (ADR-0016 §6): follows --theme-* in both themes with a
 * measured edge; the product skin applies INSIDE .demo-stage__beats only, so a
 * product ground never touches the page ground.
 */
export function DemoStage({ stage, slots }: { stage: DemoStageData; slots: Readonly<Record<string, BeatSlot>> }) {
  const titleId = `demo-${stage.id}-title`;
  if (stage.shape === "loop") {
    throw new Error(`[DemoStage ${stage.id}] the "loop" renderer is not built yet; it lands with the first loop stage (wave 2)`);
  }
  return (
    <figure className="demo-stage" data-demo-stage={stage.id} data-stage-shape={stage.shape} aria-labelledby={titleId}>
      <figcaption className="demo-stage__head">
        <h3 id={titleId} className="demo-stage__title">
          {stage.title}
        </h3>
        <span className="demo-stage__label" data-demo-label>
          {stage.narration.label}
        </span>
        {stage.kicker ? <p className="demo-stage__kicker">{stage.kicker}</p> : null}
      </figcaption>
      <p className="ps-visually-hidden" data-demo-narration>
        {stage.narration.description}
      </p>
      <div className={`demo-stage__beats demo-skin--${stage.skin}`}>{renderBeats(stage, slots)}</div>
    </figure>
  );
}
