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
//   impact      what we automated, as text: the before -> now contrast, the
//               figures and the steps, only numbers with a source (ADR-0022 §3).
//
// One file per client in ./clients/<slug>.ts, default export a ShowcaseClient.
// The window loads it with import(`./clients/${slug}`), so a new client is a
// new file there plus `showcase: "<slug>"` on its home card. Nothing else.
//
// Everything a reader sees here must read as the owner wrote it: no em dashes,
// straight quotes only, no client staff names. Sample numbers are invented and
// the funnel and AI beats are labelled "Demonstration data".
import type { SceneId } from "@/components/showcase/scenes";

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

/**
 * A site whose hero is its own video: a short muted loop cut from the real
 * file, played under the site's header bar (the capture, `SiteCapture.src`).
 */
export interface SiteVideo {
  webm: string;
  mp4: string;
  /** The clip's first frame: its poster, and the whole picture under reduced motion. */
  poster: string;
  /** The clip's pixel size. */
  width: number;
  height: number;
  /**
   * "width": the clip's full width, centred top to bottom; a taller view shows
   * the clip's own sky above it and its own ground below (colours measured from
   * its top and bottom rows), a shorter one loses a sliver of each. "cover": it
   * fills the view.
   */
  fit: "width" | "cover";
  sky: string;
  ground: string;
}

export interface SiteCapture {
  /** The page capture; with `video`, only the site's header bar above it. */
  src: string;
  /** css px; the file is drawn at 2x (phone) or 1.25x (desk). */
  width: number;
  height: number;
  /** Where the frame scrolls, in order, and how long each holds. The first is the hero. */
  stops: readonly {
    y: number;
    holdMs: number;
    /** Never show past the capture's end: the view ends on its last row instead of going on into empty space. */
    toEnd?: boolean;
    /**
     * Bands of the capture (y from, y to) that an edge of the view must never cut,
     * such as a logo or a button: the stop moves to the nearest top (within 160 px)
     * where neither the top nor the bottom edge falls inside one.
     */
    avoid?: readonly (readonly [number, number])[];
    /**
     * A band of the capture (y from, y to) the stop must show whole, such as a
     * price row the caption promises: the stop takes the nearest top that holds
     * it and cuts no `avoid` band. Taller than the view: the view centres on it.
     */
    keep?: readonly [number, number];
  }[];
  video?: SiteVideo;
}

/**
 * The client's live site, framed in the window (ADR-0022 §2, ADR-0023, design
 * spec §3). The frame counts as live only when the framed page posts
 * `{ type: "ps-portal-ready" }` from one of `origins`: a frame the browser
 * refused still fires `load`, so `load` alone proves nothing.
 */
export interface WebsiteLive {
  /** The page the frame opens on, e.g. "https://duffergolf.net/". Also the "Open site" link. */
  src: string;
  /** Origins the ready message may come from (a site that redirects apex -> www lists both). */
  origins: readonly string[];
  /**
   * "handshake": live only on the site's ready message (every client today).
   * "load": interim, live on the iframe load event; allowed only while this repo's gate runs the header probe (spec §3.6).
   * "off": never framed; the still picture with "Open <domain>".
   */
  frame: "handshake" | "load" | "off";
}

export interface WebsiteBeat extends BeatBase {
  kind: "website";
  live: WebsiteLive;
  /** "Captured Nov 1, 2026": the Preview chip's title attribute and the still's alt text, not on screen. */
  captured: string;
  /** The still under (and instead of) the frame on desk windows: its first stop, or the video's poster under the header image. */
  desk: SiteCapture;
  /** The still for the phone sheet. `stops` and the pan are no longer played. */
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

/**
 * A product picture drawn by one of the scene components in
 * src/components/showcase/scenes (HG Oil, FarmBooks, NWKS): not the
 * MarCommand portal. The scene owns its own beats, captions and labels.
 */
export interface SceneBeat extends BeatBase {
  kind: "scene";
  scene: SceneId;
  /** Screen-reader narration for the stage (80+ characters). */
  narration: string;
}

/*
 * The Impact tab (ADR-0022 §3, design spec §5, critic round 1 §3). Text tells
 * the story: the before -> now contrast first at display size, then the
 * figures, then how the engine does it, in a shape that comes from the
 * client's own material.
 *
 * Every number a visitor can read is SOURCED, and the source never ships: it
 * is a TYPE argument (fact<"Owner, Oct 23 2026">("..."), figure<...>(...)),
 * checked by tsc and `next build` and erased from the bundle. Copy that holds
 * a digit or a number word without one fails the type check (impact.ts). The
 * precise citations are kept outside this public repo.
 */

/** Copy that carries a number or a claim, made by fact<source>() in ./impact.ts. */
export interface ImpactFact {
  readonly kind: "fact";
  readonly text: string;
}

/** Copy: plain words, or a sourced fact. */
export type ImpactCopy = string | ImpactFact;

/** A number shown large, made by figure<source>() in ./impact.ts. */
export interface ImpactFigure {
  readonly kind: "figure";
  /** As shown: "74", "24 h", "42-70 s". */
  readonly value: string;
  /** What it counts, sentence case, no trailing period. */
  readonly label: string;
}

/** One step of how the engine works: "Reads" + "every certificate that arrives...". */
export interface ImpactStep {
  /** One capitalised verb or two-word verb phrase. */
  verb: string;
  /** Continues the verb, lower-case start, ends with a period. */
  text: ImpactCopy;
}

/** A smaller before -> now pair: one piece of the work. */
export interface ImpactPair {
  label: string;
  before: ImpactCopy;
  now: ImpactCopy;
}

/** The hours (or people) story. BOTH sides or the row does not exist: half a comparison is a claim. */
export interface ImpactTime {
  label: string;
  before: ImpactFigure;
  now: ImpactFigure;
}

/**
 * How the steps are drawn, from the client's own material:
 *   chapters  each chapter its own section (HG: the month-end close, vendor insurance)
 *   pieces    the pairs are the story, one card per piece of the work (NWKS's weekend)
 *   path      the steps are stations a bill passes through (FarmBooks)
 *   loop      the steps are a loop that comes back to the start (Duffer's partner loop)
 */
export type ImpactShape = "chapters" | "pieces" | "path" | "loop";

export interface ImpactChapter {
  /** "The month-end close". */
  name: string;
  /** "Every month"; omitted -> nothing after the name. */
  cadence?: ImpactCopy;
  /** The payoff, at display size: what it was, and what it is now. */
  hero: { before: ImpactCopy; now: ImpactCopy };
  /** 0 to 3, shown large. Absent -> no band, no rule, no trace. */
  figures?: readonly ImpactFigure[];
  /** 0 to 2. Absent -> nothing (the owner has not supplied hours or people yet). */
  time?: readonly ImpactTime[];
  /** The label over the steps: "How it runs", "The bill's path". */
  how: string;
  /** 3 to 5. */
  steps: readonly ImpactStep[];
  /** 0 to 4 smaller before -> now pairs. */
  pairs?: readonly ImpactPair[];
}

export interface ImpactBeat extends BeatBase {
  kind: "impact";
  shape: ImpactShape;
  /** "What we automated". */
  kicker: string;
  /** 1 or 2 (HG has two). */
  chapters: readonly ImpactChapter[];
  /** One short sentence. */
  closing: ImpactCopy;
  /** Screen-reader summary, 80+ characters, no numbers (the privacy probe reads it). */
  narration: string;
}

export type Beat = WebsiteBeat | FunnelBeat | AiAskBeat | AiAtWorkBeat | SceneBeat | ImpactBeat;
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
