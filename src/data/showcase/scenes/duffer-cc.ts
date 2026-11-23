// Duffer Golf "Command Center": the real panel, captured as stills and clicked through like a
// screen recording (design-spec-r2 §6.2). The stills are the panel's own screens rendered on its
// test fixtures with every course, dealer, person and town swapped for the invented Duffer set
// (scripts/capture-duffer-cc.mjs). Demonstration data: no figure here is Duffer's.
//
// Commission: the panel's flat seed rate, paid by check (spec §3.5); nothing pays out by itself.
import type { CursorTarget, Still, StillsWalkthroughData } from "../types";
import { DUFFER_CC_SHOTS as S } from "./duffer-cc-stills";

type Shot = { desk: { src: string; width: number; height: number; css: { w: number; h: number } }; phone: { src: string; width: number; height: number; css: { w: number; h: number } } };
export type Rect = { x: number; y: number; w: number; h: number };

/** What a walkthrough needs beyond the shared data shape: phone cursor targets, overlay boxes, step captions. */
export interface WalkCue {
  at: number;
  still: number;
  step: number;
  cursor?: CursorTarget;
  /** The same target on the phone crop; absent = no cursor on phone for this cue. */
  phoneCursor?: CursorTarget;
  fadeMs?: number;
  overlay?: "feed-row" | "pin-drag";
  /** The framing, in the desk still's css px: the stage is filled and zoomed so this box shows
   *  whole (never below "cover"). Absent = the framing of the previous cue on the same still, or
   *  the still's top-left at cover. A new framing is a crossfade, never a pan. */
  cam?: Rect;
  /** The same on the phone sheet (in the still the phone shows). */
  phoneCam?: Rect;
}
export interface WalkData extends StillsWalkthroughData {
  cues: readonly WalkCue[];
  /** One line per step, sent to the window's caption slot. No numbers, no amounts. */
  captions: readonly string[];
  /** Phone stills taller than the stage are clipped with a fade; desk stills share one aspect. */
  deskAspect: { w: number; h: number };
  /** The coded overlays, in the still's css px (desk) and the phone crop's. */
  feedRow?: { still: number; desk: Rect; phone?: Rect };
  pinDrag?: { still: number; from: Rect; to: Rect; initials: string; look: { bg: string; border: string; color: string; bed: string } };
  /** The phone sheet frames the DESK still through `phoneCam` (a product with no narrow layout of its own). */
  phoneUsesDesk?: boolean;
}

const still = (id: keyof typeof S, alt: string): Still => {
  const s = S[id] as Shot;
  return {
    id,
    desk: { src: s.desk.src, width: s.desk.css.w, height: s.desk.css.h },
    phone: { src: s.phone.src, width: s.phone.css.w, height: s.phone.css.h },
    alt,
  };
};

/** The point the drawn arrow's tip goes to: the left part of a wide element, the centre of a small one. */
const at = (r: Rect | undefined, click = false): CursorTarget | undefined =>
  r ? { x: Math.round(r.x + Math.min(r.w, 140) / 2), y: Math.round(r.y + r.h / 2), click } : undefined;

const T = (id: keyof typeof S, k: string): Rect | undefined => (S[id].targets as Record<string, Rect>)[k];
const P = (id: keyof typeof S, k: string): Rect | undefined => (S[id].phoneTargets as Record<string, Rect>)[k];

const ORDER = ["dashboard", "feed-before", "feed", "qr", "partners", "partner", "orders", "commissions"] as const;
const I = Object.fromEntries(ORDER.map((id, i) => [id, i])) as Record<(typeof ORDER)[number], number>;

// Desk framings (css px of the 1440 x 900 still): the part each step is about, not the sidebar.
// The phone sheet shows the panel's own narrow layout, so it needs none.
const CAM = {
  dashboard: { x: 230, y: 80, w: 1170, h: 600 },
  feed: { x: 640, y: 20, w: 760, h: 420 },
  qr: { x: 230, y: 380, w: 1170, h: 520 },
  partners: { x: 230, y: 120, w: 1170, h: 560 },
  partner: { x: 230, y: 20, w: 1170, h: 600 },
  orders: { x: 240, y: 30, w: 1160, h: 640 },
  commissions: { x: 230, y: 30, w: 1170, h: 600 },
};

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
    { at: 0, still: I.dashboard, step: 0, cam: CAM.dashboard },
    { at: 1400, still: I.dashboard, step: 0, cursor: at(T("dashboard", "scans"), true), phoneCursor: at(P("dashboard", "scans"), true) },
    { at: 5000, still: I["feed-before"], step: 1, cam: CAM.feed, cursor: at(T("feed-before", "row")), phoneCursor: at(P("feed-before", "row")) },
    { at: 7000, still: I.feed, step: 1, cam: CAM.feed, overlay: "feed-row", fadeMs: 280 },
    { at: 11000, still: I.qr, step: 2, cam: CAM.qr, cursor: at(T("qr", "row")), phoneCursor: at(P("qr", "row")) },
    { at: 12400, still: I.qr, step: 2, cursor: at(T("qr", "row"), true), phoneCursor: at(P("qr", "row"), true) },
    { at: 16000, still: I.partners, step: 3, cam: CAM.partners, cursor: at(T("partners", "course")), phoneCursor: at(P("partners", "course")) },
    { at: 17200, still: I.partners, step: 3, cursor: at(T("partners", "course"), true), phoneCursor: at(P("partners", "course"), true) },
    { at: 17700, still: I.partner, step: 3, cam: CAM.partner, cursor: at(T("partner", "scans")) },
    { at: 22000, still: I.orders, step: 4, cam: CAM.orders, cursor: at(T("orders", "owed")) },
    { at: 23400, still: I.orders, step: 4, cursor: at(T("orders", "owed"), true) },
    { at: 28000, still: I.commissions, step: 5, cam: CAM.commissions, cursor: at(T("commissions", "pay")) },
    { at: 29400, still: I.commissions, step: 5, cursor: at(T("commissions", "pay"), true) },
    { at: 31000, still: I.commissions, step: 5, cursor: at(T("commissions", "check"), true) },
  ],
  totalMs: 34000,
  // No script, reduced motion and the privacy probe see the live feed with its newest scan.
  ssrStill: I.feed,
  manifest: ORDER.flatMap((id) => [S[id].desk.src.replace(/\.webp$/, ".words.json"), S[id].phone.src.replace(/\.webp$/, ".words.json")]),
  deskAspect: { w: 1440, h: 900 },
  feedRow: { still: I.feed, desk: T("feed", "row")!, phone: P("feed", "row") },
};
