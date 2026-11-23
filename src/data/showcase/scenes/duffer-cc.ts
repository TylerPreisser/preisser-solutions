// Duffer Golf "Command Center": the real panel, captured as stills and clicked through like a
// screen recording (design-spec-r2 §6.2). The stills are the panel's own screens rendered on its
// test fixtures with every course, dealer, person and town swapped for the invented Duffer set
// (scripts/capture-duffer-cc.mjs). Demonstration data: no figure here is Duffer's.
// The phone sheet shows these same desk stills through a close window that pans from part to part
// (`phoneUsesDesk`): the panel's own phone layout has its pages behind a tab bar and a More list, so a click
// from page to page could not be shown on it.
//
// Commission: the panel's flat seed rate, paid by check (spec §3.5); nothing pays out by itself.
import type { CursorTarget, Still, StillsWalkthroughData } from "../types";
import { DUFFER_CC_SHOTS as S } from "./duffer-cc-stills";

type Shot = { desk: { src: string; width: number; height: number; css: { w: number; h: number } } };
export type Rect = { x: number; y: number; w: number; h: number; grow?: number; above?: number; left?: number; place?: "centre"; pass?: true };

/** What a walkthrough needs beyond the shared data shape: overlay boxes, step captions, framings. */
export interface WalkCue {
  at: number;
  still: number;
  step: number;
  cursor?: CursorTarget;
  /** The pointer in a close view, when it should point somewhere other than on the desk (absent = `cursor`). */
  closeCursor?: CursorTarget | readonly CursorTarget[];
  fadeMs?: number;
  overlay?: "feed-row" | "pin-drag";
  /** Desk framing, in the still's css px: zoomed so this box shows whole, the window moved so the stage edge cuts no
   *  word, the stage filled (walkFrame.ts frameView). Absent = the framing of the previous cue on the same still, or
   *  the whole still. */
  cam?: Rect;
  /** Close view (phones, portrait tablets, small landscape stages): the WHOLE unit(s) this step must show, in the
   *  still's css px; a list of unit lists is alternatives, biggest first (walkFrame.ts frameClose). Absent = the
   *  previous cue's on the same still. A new framing on the same still is a camera move; a new still crossfades. */
  close?: readonly (readonly Rect[])[];
}
export interface WalkData extends StillsWalkthroughData {
  cues: readonly WalkCue[];
  /** One line per step, sent to the window's caption slot. No numbers, no amounts. */
  captions: readonly string[];
  /** The desk stills' common size. */
  deskAspect: { w: number; h: number };
  /** The coded overlays, in the still's css px (desk) and the phone crop's. */
  feedRow?: { still: number; desk: Rect; phone?: Rect };
  pinDrag?: { still: number; from: Rect; to: Rect; initials: string; look: { bg: string; border: string; color: string; bed: string } };
  /** Per still id: form controls whose text the capture did not record as words (a select's value, an input's text or
   *  placeholder). The framing treats each as one word the stage edge must not cut, and the probe checks them too. */
  solids?: Readonly<Record<string, readonly Rect[]>>;
  /** The phone sheet frames the DESK still in close views (a product with no narrow layout of its own, or a film that must click between pages). */
  phoneUsesDesk?: boolean;
  /** On a phone the cues from `from` up to (not including) `to` ms are left out and every later cue (and the end) comes
   *  `to - from` ms sooner: desk pointer tours a phone's close view cannot show, so it would only hold the same view. */
  phoneSkip?: { from: number; to: number };
}

const still = (id: keyof typeof S, alt: string): Still => {
  const s = S[id] as Shot;
  const desk = { src: s.desk.src, width: s.desk.css.w, height: s.desk.css.h };
  return { id, desk, phone: desk, alt };
};

/** The point the drawn arrow's tip goes to: the left part of a wide element, the centre of a small one. */
const at = (r: Rect | undefined, click = false): CursorTarget | undefined =>
  r ? { x: Math.round(r.x + Math.min(r.w, 140) / 2), y: Math.round(r.y + r.h / 2), click } : undefined;

const T = (id: keyof typeof S, k: string): Rect | undefined => (S[id].targets as Record<string, Rect>)[k];

const ORDER = ["dashboard", "feed-before", "feed", "qr", "partners", "partner", "orders", "commissions"] as const;
const I = Object.fromEntries(ORDER.map((id, i) => [id, i])) as Record<(typeof ORDER)[number], number>;

// Framings (css px of the 1440 x 900 still). Desk (`cam`): the part each step is about, not the sidebar. Close views
// (`close`, see WalkCue): the whole unit(s) a stranger must see, biggest first.
const CAM = {
  dashboard: { x: 230, y: 80, w: 1170, h: 600 },
  feed: { x: 640, y: 20, w: 760, h: 420 },
  qr: { x: 230, y: 380, w: 1170, h: 520 },
  partners: { x: 230, y: 120, w: 1170, h: 560 },
  partner: { x: 230, y: 20, w: 1170, h: 600 },
  orders: { x: 240, y: 30, w: 1160, h: 640 },
  commissions: { x: 230, y: 30, w: 1170, h: 600 },
};
type Units = readonly (readonly Rect[])[];
const R = (x: number, y: number, w: number, h: number): Rect => ({ x, y, w, h });
const CL: Record<string, Units> = {
  // Dashboard. Only the left of the page has tiles in both rows (right of x 627 the second row is empty page), so a close
  // view opens there: a tablet on the first three tiles and the two under them, a phone on the 2 x 2 block of whole
  // tiles under the review banner, a 320 phone on the Partners active tile.
  // (Every dashboard window starts right of the dark sidebar, which ends at x 224.)
  kpiA: [[{ ...R(257, 179, 562, 307), left: 30 }], [{ ...R(257, 179, 370, 307), left: 30 }], [{ ...R(257, 179, 178, 307), left: 30 }], [{ ...R(257, 179, 178, 147), left: 30, above: 14 }]],
  // Then the camera moves down to the daily scans and leads chart (a tablet already shows it, and stays).
  kpiB: [[{ ...R(257, 179, 562, 307), left: 30 }], [{ ...R(257, 338, 370, 400), left: 30 }], [{ ...R(257, 506, 290, 220), left: 30 }]],
  // The Live feed card: time and what happened, row by row.
  // (A 320 phone cannot read time and event together: it shows the events, each whole.)
  // (A tablet's window stops in the gap before the feed card: left of it are the dashboard's charts, cut.)
  feed: [[{ ...R(947, 25, 446, 600), left: 17 }], [{ ...R(947, 25, 446, 330), left: 17 }], [{ ...R(955, 75, 430, 260), left: 8 }], [R(1085, 75, 300, 250)]],
  // The sidebar's page list.
  nav: [[R(8, 175, 208, 452)], [R(8, 320, 208, 230)]],
  // QR Codes: the displays table with its Display and Holder columns, and the scans the caption talks about.
  qr: [[R(257, 578, 790, 320)], [R(257, 578, 300, 300)]],
  // Partners: the list with the course names; a tablet also shows their status and displays.
  partners: [[R(257, 360, 660, 320)], [R(262, 360, 225, 310)]],
  // One partner: the At a glance card (referral code, payout preference, scans and leads, each label with its value);
  // a smaller stage, the form's payout preference with the contact under it.
  // (The 320 view starts under the form card's header strip, whose title sits off to the left.)
  partner: [[R(947, 417, 446, 270), R(947, 133, 446, 262)], [R(960, 417, 420, 270)], [{ ...R(590, 195, 325, 230), above: 12 }]],
  // Orders: each sale with the course it is credited to (product, amount, partner); a tablet adds its commission.
  // (A 320 phone: each sale's amount and the course it is credited to.)
  orders: [[R(380, 100, 850, 590)], [R(478, 100, 370, 590)], [R(478, 100, 370, 300)], [R(620, 100, 225, 300)]],
  // Commissions: what is owed to each course, and the payout recorded by check. The column has empty page above and
  // below it: a tall phone holds the column a little closer (its edges in the cards' padding), in the middle of the stage.
  pay: [[R(947, 100, 446, 487)], [{ ...R(961, 100, 418, 487), place: "centre" }], [R(955, 155, 300, 280)]],
  // The last view: the whole column, owed and paid. A landscape stage too short for it ends on the second course's
  // payout row with the Payouts card; a 320 phone on the Owed, by partner card (its labels, amounts and buttons).
  paid: [[R(947, 100, 446, 487)], [{ ...R(961, 100, 418, 487), place: "centre" }], [R(955, 315, 430, 272)], [R(955, 100, 300, 330)]],
};
// The sidebar is the same on every still: the word boxes in each .words.json put its labels at x 48 and these y.
const NAV = { partners: 336, orders: 450, commissions: 488, qr: 526 };
const nav = (y: number, click = false): CursorTarget => ({ x: 64, y: Math.round(y + 8), click });
// A click on a page's name on a desk: the sidebar's page list and the left of the page it leaves, close enough to read
// (every edge of this window lands in a gap on every still the film clicks from).
const NAV_DESK: Rect = { x: 0, y: 160, w: 930, h: 600 };
const dot = (x: number, y: number, click = false): CursorTarget => ({ x, y, click });
// The payout row's "check" (where the last click lands), for the per-set pointers of the last view.
const CHECK: CursorTarget = at(T("commissions", "check"), true) ?? dot(1100, 545, true);

export const DUFFER_CC: WalkData = {
  stills: [
    still("dashboard", "The Command Center dashboard on demonstration data: partners, displays, scans today, visitors, leads and buy clicks."),
    still("feed-before", "The dashboard's Live feed on demonstration data: scans, page views and leads as they arrive from course displays."),
    still("feed", "The Live feed with a new scan at the top: a display at a partner course, its town, the phone it came from."),
    still("qr", "QR Codes on demonstration data: every display, the course that holds it, and its scans in the last seven and thirty days."),
    still("partners", "Partners on demonstration data: each course with its display, status, scans and leads."),
    still("partner", "One partner course's record on demonstration data: contact, referral code, payout preference by check, and its scans."),
    still("orders", "Orders on demonstration data: each sale, the course whose referral code it carried, and the commission it earned."),
    still("commissions", "Commissions on demonstration data: owed by course, a Record payout button, and a payout paid by check."),
  ],
  steps: ["Dashboard", "Live feed", "Displays", "Partners", "Orders", "Commissions"],
  captions: [
    "Today's scans, visitors, leads and buy clicks across every partner course.",
    "A golfer scans a course's display, and the scan lands in the live feed.",
    "Every display, the course that holds it, and how often it is scanned.",
    "Each partner course: its display, its scans and leads, and how it is paid.",
    "A sale made with a course's referral code earns that course its commission.",
    "What is owed to each course, and every payout recorded when the check goes out.",
  ],
  cues: [
    // Dashboard, then its live feed.
    { at: 0, still: I.dashboard, step: 0, cam: CAM.dashboard, close: CL.kpiA },
    { at: 900, still: I.dashboard, step: 0, cursor: dot(300, 246), closeCursor: [dot(690, 252), dot(520, 252), dot(330, 252)] },
    { at: 2400, still: I.dashboard, step: 0, cursor: at(T("dashboard", "scans"), true), closeCursor: [dot(690, 252), dot(470, 650), dot(420, 650)], close: CL.kpiB },
    { at: 4200, still: I["feed-before"], step: 1, cam: CAM.feed, close: CL.feed, cursor: dot(1110, 93) },
    { at: 6200, still: I.feed, step: 1, cam: CAM.feed, close: CL.feed, overlay: "feed-row", fadeMs: 280 },
    // Click "QR Codes" in the sidebar.
    { at: 9500, still: I.feed, step: 1, cursor: nav(NAV.qr), cam: NAV_DESK, close: CL.nav },
    { at: 10500, still: I.feed, step: 1, cursor: nav(NAV.qr, true) },
    { at: 11400, still: I.qr, step: 2, cam: CAM.qr, close: CL.qr, cursor: at(T("qr", "row")) },
    { at: 12800, still: I.qr, step: 2, cursor: at(T("qr", "row"), true) },
    { at: 14500, still: I.qr, step: 2, cursor: dot(900, 748), closeCursor: dot(380, 760) },
    // Click "Partners".
    { at: 17000, still: I.qr, step: 2, cursor: nav(NAV.partners), cam: NAV_DESK, close: CL.nav },
    { at: 18000, still: I.qr, step: 2, cursor: nav(NAV.partners, true) },
    { at: 18900, still: I.partners, step: 3, cam: CAM.partners, close: CL.partners, cursor: at(T("partners", "course")) },
    // Click a partner course's name: its record opens.
    { at: 20400, still: I.partners, step: 3, cursor: at(T("partners", "course"), true) },
    { at: 21300, still: I.partner, step: 3, cam: CAM.partner, close: CL.partner, cursor: at(T("partner", "scans")), closeCursor: [dot(1350, 565), dot(1350, 565), dot(660, 242)] },
    // Click "Orders".
    { at: 24000, still: I.partner, step: 3, cursor: nav(NAV.orders), cam: NAV_DESK, close: CL.nav },
    { at: 25000, still: I.partner, step: 3, cursor: nav(NAV.orders, true) },
    { at: 25900, still: I.orders, step: 4, cam: CAM.orders, close: CL.orders, cursor: dot(340, 586), closeCursor: dot(760, 170) },
    { at: 28000, still: I.orders, step: 4, cursor: at(T("orders", "owed")), closeCursor: dot(760, 231) },
    // Click "Commissions".
    { at: 30000, still: I.orders, step: 4, cursor: nav(NAV.commissions), cam: NAV_DESK, close: CL.nav },
    { at: 31000, still: I.orders, step: 4, cursor: nav(NAV.commissions, true) },
    { at: 31900, still: I.commissions, step: 5, cam: CAM.commissions, close: CL.pay, cursor: at(T("commissions", "pay")) },
    { at: 33800, still: I.commissions, step: 5, cursor: at(T("commissions", "pay"), true) },
    // (On a 320 phone the last view is the Owed card: the pointer rests on the payout it just recorded, Record payout.)
    { at: 35200, still: I.commissions, step: 5, close: CL.paid, cursor: at(T("commissions", "check"), true), closeCursor: [CHECK, CHECK, CHECK, dot(1116, 284, true)] },
  ],
  // The last cue rests for ~3 s, then the film is over and the control offers a replay.
  totalMs: 38500,
  manifest: ORDER.map((id) => S[id].desk.src.replace(/\.webp$/, ".words.json")),
  deskAspect: { w: 1440, h: 900 },
  feedRow: { still: I.feed, desk: T("feed", "row")! },
  solids: {
    partners: [R(273, 302, 288, 40), R(573, 302, 160, 40), R(745, 302, 144, 40), R(901, 302, 176, 40)],
    // The record's form: two columns of inputs, then the notes box.
    partner: [
      ...[222, 301, 381, 460, 540, 619, 699].flatMap((y) => [R(273, y, 310, 40), R(599, y, 310, 40)]),
      R(273, 778, 310, 40),
      R(273, 857, 636, 43),
    ],
    commissions: [R(273, 190, 288, 40)],
  },
  phoneUsesDesk: true,
};
