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
//   engine      (round 2) the MarCommand engine room: channels, the dials the
//               engine turns, what it learned (ADR-0025 §5).
//   scene       a coded or captured product walkthrough (scenes/).
//   impact      big numbers first: the old number struck, the new one large,
//               then rows; only numbers with a source (ADR-0022 §3, ADR-0025).
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

/** One source the robot fetches from at the top of an AI tab (ADR-0025 §4.1). */
export interface AiSource {
  icon: "scan" | "visit" | "lead" | "order" | "ads" | "social-ads" | "search" | "enroll";
  label: string;
  /** Phone label; defaults to `label`. */
  short?: string;
  /** The row-count chip: "5 rows". */
  chip: string;
  /** Index into `steps`: the chip comes from the same rows the answer used. */
  step: number;
}

export interface AiAskBeat extends BeatBase {
  kind: "ai-ask";
  narration: string;
  question: string;
  steps: readonly AiStep[];
  /** 3 to 4 sources the robot visits before the answer lands (§4.1). Absent: the old working card. */
  sources?: readonly AiSource[];
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
 * The Impact tab (ADR-0022 §3, ADR-0025, round 2 spec §3). Big numbers first:
 * the old number struck, the new one at display size, then up to four smaller
 * rows and one optional sentence. A slot with no sourced number is simply
 * absent from its array: nothing is rendered for it.
 *
 * Every number a visitor can read is SOURCED, and the source never ships: it
 * is a TYPE argument (fact<"Owner, Oct 23 2026">("..."), figure<...>(...)),
 * checked by tsc and `next build` and erased from the bundle. Copy that holds
 * a digit or a number word without one fails the type check (impact.ts). The
 * precise citations are kept outside this public repo.
 */

/** Type-only brand: only fact() and figure() in ./impact.ts can mint a sourced value; a hand-written literal does not type-check. */
declare const sourced: unique symbol;

/** Copy that carries a number or a claim, made by fact<source>() in ./impact.ts. */
export interface ImpactFact {
  readonly [sourced]: true;
  readonly kind: "fact";
  readonly text: string;
}

/** Copy: plain words, or a sourced fact. */
export type ImpactCopy = string | ImpactFact;

/** A number shown large, made by figure<source>() in ./impact.ts. */
export interface ImpactFigure {
  readonly [sourced]: true;
  readonly kind: "figure";
  /** As shown: "74", "24 h", "42-70 s". */
  readonly value: string;
  /** What it counts, sentence case, no trailing period. */
  readonly label: string;
}

/** A channel card in the engine room; `displays` is Duffer's course displays. */
export interface EngineChannel {
  icon: RailIcon | "displays";
  label: string;
  /** A short chip under the card, one line: "+38% cost/lead". */
  delta?: { text: string; tone: "up" | "down" };
}

/** A knob the engine turns. r0 and r1 are 0..1 of the 270 degree sweep. */
export interface EngineDial {
  label: string;
  from: string;
  to?: string;
  r0: number;
  r1?: number;
}

/** The MarCommand tab (Duffer, Hays): the engine adjusting its knobs and learning (ADR-0025 §5.1). */
export interface EngineBeat extends BeatBase {
  kind: "engine";
  /** 3 to 4. */
  channels: readonly EngineChannel[];
  /** Exactly 3. */
  dials: readonly EngineDial[];
  /** The channel (index) the engine favours: its wire lights. */
  pick: number;
  /** Which dials (indices) it turns, in order; 1 to 2. */
  turns: readonly number[];
  /** 1 to 3; exactly one isNew. */
  learned: readonly { text: string; when: string; isNew?: boolean }[];
  result: { label: string; from: string; to: string };
  /** Screen-reader narration for the stage (80+ characters, no numbers). */
  narration: string;
}

/*
 * Scene data (ADR-0025 §2, §3.5, §6). A `scene` beat names a SceneId; the
 * scene's own data module (src/data/showcase/scenes/<id>.ts) exports a value of
 * one of these shapes. Names, towns and numbers in all of them are invented.
 */

/** HG "Vendor Insurance": one certificate arrives, four checks tick, it is filed (§2). */
export interface VendorSceneData {
  vendor: string;
  /** The raster of the ACORD 25 and its thumbnail (public/images/showcase/hg/). */
  cert: { src: string; thumb: string; alt: string; width: number; height: number };
  /** The four checks, in the order the scan reads them. `short` is the phone value. */
  checks: readonly { id: "coverage" | "dates" | "limits" | "holder"; label: string; value: string; short: string; region: Rect }[];
  verdict: string;
  /** Vendor files in the filing view; `open` is the one that receives the certificate. */
  files: readonly { name: string; open?: boolean }[];
  filed: { title: string; detail: string };
}

/** FarmBooks "Bills": a bill is snapped, read, sorted, split by field, booked, summed up (§6.1). */
export interface BillsSceneData {
  supplier: string;
  invoice: string;
  date: string;
  /** Printed lines. `category` is a Schedule F name copied VERBATIM from FarmBooks data/categories.json. */
  lines: readonly { text: string; plain: string; amount: number; category: string; split?: readonly { field: string; acres: number; amount: number }[] }[];
  total: number;
  /** The year-end summary: invented fields. */
  summary: { kpis: readonly { label: string; value: string }[]; categories: readonly { label: string; value: number }[]; perAcre: readonly { field: string; acres: number; perAcre: number }[] };
}

/** One captured screen in a StillsWalkthrough (Duffer Command Center, NWKS Admin). */
export interface Still {
  id: string;
  /** Desk still (WebP, drawn at its display box) and the phone crop. */
  desk: { src: string; width: number; height: number };
  phone: { src: string; width: number; height: number };
  alt: string;
}

/** A drawn cursor target in a still, in the still's css px. */
export interface CursorTarget {
  x: number;
  y: number;
  /** Draw the click ring on arrival. */
  click?: boolean;
}

/** The clicked-through screen recording: stills, cues, a drawn cursor, optional coded overlays (§6.2, §6.3). */
export interface StillsWalkthroughData {
  stills: readonly Still[];
  /** ms from beat start. `still` indexes `stills`; `step` is the dot that lights; `fadeMs` defaults to 280. */
  cues: readonly { at: number; still: number; step: number; cursor?: CursorTarget; fadeMs?: number; overlay?: "feed-row" | "pin-drag" }[];
  /** Step names for the dots. */
  steps: readonly string[];
  totalMs: number;
  /** The still shown with no JS and under reduced motion. */
  ssrStill: number;
  /** Text manifest for the privacy guard (§7.2 #18): every name and number visible in the stills. */
  manifest: readonly string[];
}

/** Duffer's QR story at the head of its Impact tab (§3.5). */
export interface DufferQrData {
  course: string;
  display: string;
  town: string;
  device: string;
  /** The feed row, the order and the commission, invented. */
  feedRow: string;
  order: { id: string; item: string; code: string };
  commission: { amount: string; to: string };
  scansBefore: number;
  scansAfter: number;
}

/** The new Impact: big numbers first (ADR-0025 §3, spec §3.1). */
export interface ImpactStat {
  /** The number now: figure<"Measured live, Oct 27 2026">("155", "vendor certificates on file, checked and current"). */
  now: ImpactFigure;
  /** The number before, struck. ONLY when sourced; omit otherwise. */
  before?: ImpactFigure;
  /** The old way as one short plain line above the number, NOT struck (use when the before is not a number): fact<"Client's words, ...">("Typed one at a time"). */
  oldWay?: ImpactCopy;
  /** Unit shown after the value: "s", "h", "%", "/mo". Not part of the sourced value string. */
  unit?: string;
}

/** The Impact tab (ADR-0025 §3, spec §3.1): big numbers first, then rows, then one sentence. */
export interface ImpactBeat extends BeatBase {
  kind: "impact";
  /** "What changed". */
  kicker: string;
  /** Duffer only: the QR story leads (built by DufferQrScene, spec §3.5). */
  lead?: "qr-story";
  /** 0..3, shown large. */
  big: readonly ImpactStat[];
  /** 0..4, smaller. */
  rows: readonly ImpactStat[];
  /** One sentence, 140 characters at most. */
  text?: ImpactCopy;
  /** 80+ characters, no numbers (the privacy probe reads it). */
  narration: string;
}

export type Beat = WebsiteBeat | FunnelBeat | AiAskBeat | AiAtWorkBeat | SceneBeat | ImpactBeat | EngineBeat;
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
