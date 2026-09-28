// Proof Stage contract (ADR-0016). Held on CaseStudyData.demo.
//
// SERIALIZABLE DATA ONLY. CaseStudyPage is a client component, so `data`,
// including `demo`, is serialized into each route's RSC payload. No React
// nodes, functions, getters, class instances or Dates. The drawing (the scene)
// arrives separately as a slot passed by the route (ADR-0016 §7).
//
// Amounts: invented amounts may appear in captions and narration, because all
// of it renders INSIDE the labeled stage element (ADR-0016 §4). `title` and
// `kicker` may not carry amounts: the OG generator reuses the title outside
// the stage. defineStages() enforces both.

/** One `.demo-skin--<name>` class per value, in DemoStage/skins.css. */
export type DemoSkin = "psadmin" | "nwks-mens" | "farmbooks";

/** Closed vocabulary for the visible label (ADR-0016 §1, ADR-0017 §2). */
export type DemoLabel = "Demonstration data" | "Recreation · demonstration data";

export interface DemoNarration {
  label: DemoLabel;
  /**
   * Screen-reader paragraph, rendered visually hidden. Says what the stage
   * shows, in order. Its LAST sentence says the data is invented
   * (marcommand-live.tsx:1656-1672 precedent).
   */
  description: string;
}

export interface DemoStep {
  /** One sentence in the page's voice, at most 90 characters. */
  caption: string;
  /** Dwell after this step lands during auto-play, 600..6000. Default 1800. */
  holdMs?: number;
}

interface DemoBeatBase {
  /** kebab-case, unique within its stage. Rendered as data-beat. */
  id: string;
  /** Label over the beat. Defaults: Before / The read / What it caught / The screen. */
  eyebrow?: string;
  /** One visible sentence under the eyebrow. */
  caption: string;
}

export interface DemoBeforeBeat extends DemoBeatBase {
  kind: "before";
}

export interface DemoReadBeat extends DemoBeatBase {
  kind: "read";
  /** 3 to 6 steps. */
  steps: readonly DemoStep[];
}

export interface DemoCaughtCard {
  id: string;
  title: string;
  /** Also the card's step caption. */
  caption: string;
}

export interface DemoCaughtBeat extends DemoBeatBase {
  kind: "caught";
  /** 1 to 3 cards. Each card is one step. */
  cards: readonly DemoCaughtCard[];
}

export interface DemoTab {
  id: string;
  /** Tab text, at most 14 characters. */
  label: string;
  /** Screen-reader description of this tab's panel. */
  description: string;
  /** Caption over the tab's "before" card (the client's old materials). */
  before?: { caption: string };
  /** 1 to 6 steps: the tab's screen filling in. */
  steps: readonly DemoStep[];
  /** Caption shown while "Take the tour" is on this tab. */
  tourCaption: string;
}

export interface DemoScreenBeat extends DemoBeatBase {
  kind: "screen";
  /** Window-chrome title, e.g. "Money · Review". A product name, never a client. */
  chrome: string;
  /** Optional fill-in steps. Mutually exclusive with `tabs`. */
  steps?: readonly DemoStep[];
  /** Tabbed recreation (ADR-0017), 2 to 6 tabs. */
  tabs?: readonly DemoTab[];
  /** Caption for a downstream artifact pane (PDF, export, email) when drawn. */
  artifact?: { label: string };
}

export type DemoBeat = DemoBeforeBeat | DemoReadBeat | DemoCaughtBeat | DemoScreenBeat;

interface DemoStageBase {
  /** kebab-case, unique within the case study. Rendered as data-demo-stage. */
  id: string;
  /** The stage's h3. No amounts. */
  title: string;
  /** One line under the title. No amounts. */
  kicker?: string;
  skin: DemoSkin;
  narration: DemoNarration;
}

/** Shape "beats": an ordered list, at least one Screen (ADR-0016 §1). */
export interface DemoBeatsStage extends DemoStageBase {
  shape: "beats";
  beats: readonly DemoBeat[];
}

export interface DemoLoopNode {
  id: string;
  label: string;
  detail: string;
}

/** Shape "loop": input to process to output, plus the required Screen. */
export interface DemoLoopStage extends DemoStageBase {
  shape: "loop";
  loop: {
    inputs: readonly DemoLoopNode[];
    process: DemoLoopNode;
    outputs: readonly DemoLoopNode[];
  };
  screen: DemoScreenBeat;
}

export type DemoStage = DemoBeatsStage | DemoLoopStage;
