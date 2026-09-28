import { stages } from "@/data/demos/nwks-encounter";

/**
 * A step's caption, placed against the element that step changes (critic-NW
 * M3): the narration was 940-1,560px below the screen it described. The text
 * is the tab's own step caption from the stage script (the kit's step list
 * below keeps the same words as an index), so the two never drift. It arrives
 * with its step and is emphasised while it is the current one; at rest every
 * note shows, so the resting screen is the fully annotated end frame. Blue
 * inside the product always means Preisser is pointing at something (strip
 * NOTES.md, "How the NWKS skin and the Preisser frame meet").
 */
type TabId = "dashboard" | "attendees" | "org-sheet" | "cabins" | "email" | "lookout";

const beat = stages[0].beats[0];
function captionOf(tab: TabId, k: number): string {
  if (beat.kind !== "screen" || !beat.tabs) throw new Error("[nwks StepNote] the panel beat is not tabbed");
  const t = beat.tabs.find((x) => x.id === tab);
  const step = t?.steps[k - 1];
  if (!step) throw new Error(`[nwks StepNote] tab "${tab}" has no step ${k}`);
  return step.caption;
}

export function StepNote({ tab, k }: { tab: TabId; k: number }) {
  return (
    <p className="nwks-note" data-stage-step={k} data-fx="rise" data-note={k}>
      <span className="nwks-note-n">{k}</span>
      <span>{captionOf(tab, k)}</span>
    </p>
  );
}
