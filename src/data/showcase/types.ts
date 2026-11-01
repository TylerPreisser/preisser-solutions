// src/data/showcase/types.ts — the product showcase's beat schema (ADR-0020, round 5).
//
// A client is a list of BEATS. The home card's glass window (desktop) or sheet
// (phone) plays them in order, one tab each, and the tab labels come from here.
//
//   website     their public site: a capture of the hero and the section that
//               sells, desk (1280) and phone (390), with the stops the frame
//               scrolls to.
//   funnel      the MarCommand Overview: channel (or partner) cards whose
//               streams run into the funnel and the client's mark.
//   ai-ask      the MarCommand AI tab: a question types itself in, the five
//               phases light up, and the answer lands in its real layout.
//   ai-at-work  the AI working a queue on its own: items come in, it reads
//               each one, does the steps and files the result.
//
// One file per client in ./clients/<slug>.ts, default export a ShowcaseClient.
// The window loads it with import(`./clients/${slug}`), so a new client is a
// new file there plus `showcase: "<slug>"` on its home card. Nothing else.
//
// Everything a reader sees here must read as the owner wrote it: no em dashes,
// straight quotes only, no client staff names. Sample numbers are invented and
// the funnel and AI beats are labelled "Demonstration data".

/** A brand mark for the portal sidebar and the funnel's seal. */
export type PortalMark =
  | { kind: "img"; src: string }
  /** Duffer's golf-ball mark, drawn in SVG. */
  | { kind: "golf-ball" }
  /** Two or three letters set in the display face. */
  | { kind: "letters"; text: string };

/** The faces the beats can use; each is loaded by the beats chunk (beats/fonts.ts). */
export type PortalFont = "fraunces" | "figtree" | "bricolage" | "inter";

/** The client's MarCommand portal theme (marcommand-marketing-engine portal/clients/<slug>/theme.css). */
export interface PortalTheme {
  ground: string;
  groundDeep: string;
  card: string;
  ink: string;
  inkSoft: string;
  accent: string;
  /** Accent for text and filled buttons; must read 4.5:1 on ground and card. */
  accentText: string;
  /** Stream and chart hues, in the portal's validated order. */
  chart1: string;
  chart2: string;
  display: PortalFont;
  body: PortalFont;
  mark: PortalMark;
}

interface BeatBase {
  /** The tab label. Short: three tabs share a 320px phone. */
  tab: string;
  /** One line under the frame while this beat shows. */
  caption: string;
}

/** [x, y, width, height] in a capture's css pixels. */
export type Rect = readonly [number, number, number, number];

export interface SiteCapture {
  src: string;
  /** css px; the file is drawn at 2x (phone) or 1.25x (desk). */
  width: number;
  height: number;
  /** Where the frame scrolls, in order, and how long each holds. The first is the hero. */
  stops: readonly { y: number; holdMs: number }[];
}

export interface WebsiteBeat extends BeatBase {
  kind: "website";
  /** "Captured Nov 1, 2026": shown in the desktop frame's chrome. */
  captured: string;
  desk: SiteCapture;
  phone: SiteCapture;
}

/** One card on the funnel's left rail, with its stream. */
export interface RailItem {
  label: string;
  sub: string;
  icon: RailIcon;
  /** Which theme hue its stream wears (1 = chart1, 2 = chart2). */
  hue: 1 | 2;
  /** The card's two figures, labelled by Funnel.railFigures. */
  figures: readonly [number, number];
  /** How wide the stream runs: the count of people it carries into the funnel. */
  weight: number;
  /** The deepest stage (index into Funnel.stages) its people reached; the stream ends there. */
  reach: number;
}

export type RailIcon = "ads" | "social-ads" | "search" | "direct" | "maps" | "social" | "sites" | "flag" | "flags";

export interface Funnel {
  /** Top bar date chip, e.g. "30 days". */
  window: string;
  /** The stage band's left block (the real portal's ad spend block). */
  lead: { kicker: string; value: string; sub: readonly { label: string; value: string }[] };
  stages: readonly { label: string; value: number; note?: string }[];
  /** The two figure labels on every rail card, e.g. ["Visited", "Leads"]. */
  railFigures: readonly [string, string];
  rail: readonly RailItem[];
}

export interface FunnelBeat extends BeatBase {
  kind: "funnel";
  /** Screen-reader narration for the stage (80+ characters; the privacy probe checks it). */
  narration: string;
  funnel: Funnel;
}

/** One row of "Working on it": its label, which of the five phases it belongs to, how long it runs. */
export interface AiStep {
  label: string;
  /** 0 Reading your question, 1 Reading your numbers, 2 Working it out, 3 Writing, 4 Checking every figure. */
  phase: 0 | 1 | 2 | 3 | 4;
  ms: number;
  /** "412 rows" chip; "6 figures matched" for a check. */
  chip?: string;
}

export interface AiAnswer {
  /** The one-sentence answer. */
  headline: string;
  figures: readonly { value: string; label: string }[];
  chart: {
    title: string;
    money: boolean;
    bars: readonly { label: string; value: number }[];
    ticks: readonly number[];
  };
  means: readonly string[];
  next: readonly string[];
  sources: readonly { label: string; detail?: string }[];
}

export interface AiAskBeat extends BeatBase {
  kind: "ai-ask";
  narration: string;
  question: string;
  steps: readonly AiStep[];
  /** The left column once answered: the real tab's "Pulled / Compared / Concluded" record. */
  worked: readonly { kind: "Pulled" | "Calculated" | "Compared" | "Recalled" | "Concluded"; lines: readonly { text: string; chip?: string }[] }[];
  answer: AiAnswer;
}

/** One piece of work in the AI's queue. */
export interface WorkItem {
  /** What came in: "Email", "PDF", "Form", "Upload". */
  source: string;
  title: string;
  /** Who or where it came from (invented, never a real person). */
  from: string;
  /** What the AI did, in order; each lights as it finishes. */
  steps: readonly string[];
  /** The result chip once it is done, e.g. "Filed to Well 14". */
  result: string;
}

export interface AiAtWorkBeat extends BeatBase {
  kind: "ai-at-work";
  narration: string;
  /** Over the queue, e.g. "Inbox". */
  title: string;
  items: readonly WorkItem[];
  /** One line once the queue is done, e.g. "6 done. Nothing waiting on you." */
  done: string;
}

export type Beat = WebsiteBeat | FunnelBeat | AiAskBeat | AiAtWorkBeat;
export type BeatKind = Beat["kind"];

export interface ShowcaseClient {
  slug: string;
  /** Full name: the dialog's accessible name. */
  name: string;
  /** Short name for the window header. */
  short: string;
  live: { url: string; label: string };
  theme: PortalTheme;
  beats: readonly Beat[];
}
