import type { DemoBeat, DemoScreenBeat, DemoStage, DemoStep } from "@/types/demo-stage";

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const AMOUNT = /\$\s?\d|\bUSD\s?\d|\d\s?USD\b/;

function fail(stage: string, msg: string): never {
  throw new Error(`[demo stage "${stage}"] ${msg} (ADR-0016; src/data/demos/_define.ts)`);
}

function checkSteps(stage: string, where: string, steps: readonly DemoStep[], min: number, max: number): void {
  if (steps.length < min || steps.length > max) {
    fail(stage, `${where}: ${steps.length} steps, want ${min} to ${max}`);
  }
  steps.forEach((s, i) => {
    if (!s.caption.trim()) fail(stage, `${where}: step ${i + 1} has an empty caption`);
    if (s.caption.length > 90) fail(stage, `${where}: step ${i + 1} caption is ${s.caption.length} characters, max 90`);
    if (s.holdMs !== undefined && (s.holdMs < 600 || s.holdMs > 6000)) {
      fail(stage, `${where}: step ${i + 1} holdMs ${s.holdMs} is outside 600..6000`);
    }
  });
}

function checkScreen(stage: string, b: DemoScreenBeat): void {
  if (b.steps && b.tabs) fail(stage, `screen "${b.id}" has both steps and tabs`);
  if (b.steps) checkSteps(stage, `screen "${b.id}"`, b.steps, 1, 6);
  if (b.tabs) {
    if (b.tabs.length < 2 || b.tabs.length > 6) fail(stage, `screen "${b.id}": ${b.tabs.length} tabs, want 2 to 6`);
    const ids = new Set<string>();
    for (const t of b.tabs) {
      if (!KEBAB.test(t.id) || ids.has(t.id)) fail(stage, `tab id "${t.id}" is not unique kebab-case`);
      ids.add(t.id);
      if (t.label.length > 14) fail(stage, `tab "${t.id}" label is over 14 characters`);
      if (!t.description.trim() || !t.tourCaption.trim()) fail(stage, `tab "${t.id}" needs a description and a tourCaption`);
      checkSteps(stage, `tab "${t.id}"`, t.steps, 1, 6);
    }
  }
}

function checkBeats(stage: string, beats: readonly DemoBeat[]): void {
  const ids = new Set<string>();
  const count = { before: 0, read: 0, caught: 0, screen: 0 };
  beats.forEach((b, i) => {
    if (!KEBAB.test(b.id) || ids.has(b.id)) fail(stage, `beat id "${b.id}" is not unique kebab-case`);
    ids.add(b.id);
    count[b.kind] += 1;
    if (!b.caption.trim()) fail(stage, `beat "${b.id}" has an empty caption`);
    if (b.kind === "before" && i !== 0) fail(stage, `"before" must be the first beat`);
    if (b.kind === "read") checkSteps(stage, `read "${b.id}"`, b.steps, 3, 6);
    if (b.kind === "caught" && (b.cards.length < 1 || b.cards.length > 3)) {
      fail(stage, `caught "${b.id}": ${b.cards.length} cards, want 1 to 3`);
    }
    if (b.kind === "screen") checkScreen(stage, b);
  });
  if (count.screen < 1) fail(stage, `no Screen beat; Screen is required (ADR-0016 §1)`);
  if (count.before > 1 || count.read > 1 || count.caught > 1) {
    fail(stage, `at most one before, one read and one caught beat`);
  }
  // A stage with no stepped beat renders no [data-track] at all, so the
  // motion gate's playback tests wait forever for a track that never exists
  // (review-F.md LOW 6). Read and Caught always produce one (checkSteps and
  // the card-count check above already require at least one step/card); a
  // Screen only does if it has steps or tabs.
  const hasTrack = beats.some(
    (b) => b.kind === "read" || b.kind === "caught" || (b.kind === "screen" && ((b.steps && b.steps.length > 0) || Boolean(b.tabs))),
  );
  if (!hasTrack) {
    fail(stage, `no beat produces a track (need a Read, a Caught, or a Screen with steps or tabs); every stage must move (ADR-0016 §3)`);
  }
}

/**
 * Validates a case study's stages when the module is evaluated, so a malformed
 * stage fails `next build`. tsc checks the shape; this checks the counts and
 * the rules a type cannot express. Returns its input unchanged.
 */
export function defineStages<const T extends readonly DemoStage[]>(stages: T): T {
  const ids = new Set<string>();
  for (const s of stages) {
    if (!KEBAB.test(s.id) || ids.has(s.id)) fail(s.id, `stage id is not unique kebab-case`);
    ids.add(s.id);
    if (AMOUNT.test(s.title) || (s.kicker !== undefined && AMOUNT.test(s.kicker))) {
      fail(s.id, `title and kicker may not carry amounts (ADR-0016 §4)`);
    }
    const d = s.narration.description.trim();
    if (d.length < 80) fail(s.id, `narration.description is under 80 characters`);
    const sentences = d.split(/[.!?]\s+/);
    const last = sentences[sentences.length - 1] ?? "";
    if (!/demonstration|invented/i.test(last)) {
      fail(s.id, `the narration's last sentence must say the data is invented`);
    }
    if (s.shape === "beats") {
      checkBeats(s.id, s.beats);
    } else {
      const { inputs, outputs } = s.loop;
      if (inputs.length < 1 || inputs.length > 4 || outputs.length < 1 || outputs.length > 4) {
        fail(s.id, `a loop wants 1 to 4 inputs and 1 to 4 outputs`);
      }
      checkScreen(s.id, s.screen);
      if (!((s.screen.steps && s.screen.steps.length > 0) || s.screen.tabs)) {
        fail(s.id, `the loop's Screen has no steps or tabs; every stage must move (ADR-0016 §3)`);
      }
    }
  }
  return stages;
}
