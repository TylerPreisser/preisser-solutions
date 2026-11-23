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
export type Rect = { x: number; y: number; w: number; h: number; grow?: number };

/** What a walkthrough needs beyond the shared data shape: overlay boxes, step captions, framings. */
export interface WalkCue {
  at: number;
  still: number;
  step: number;
  cursor?: CursorTarget;
  /** Unused since both films frame the desk still on a phone; kept for a product with its own narrow stills. */
  phoneCursor?: CursorTarget;
  fadeMs?: number;
  overlay?: "feed-row" | "pin-drag";
  /** The framing, in the desk still's css px: zoomed so this box shows whole, the window moved so the stage
   *  edge cuts no word, the stage filled (walkFrame.ts). Absent = the framing of the previous cue on the same
   *  still, or the whole still. A new framing is a crossfade, never a pan. */
  cam?: Rect;
  /** The same on the phone sheet: a close window, about 0.85x or more. Absent = `cam`. */
  phoneCam?: Rect;
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
  /** The phone sheet frames the DESK still through `phoneCam` (a product with no narrow layout of its own, or a film that must click between pages). */
  phoneUsesDesk?: boolean;
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

// Framings (css px of the 1440 x 900 still): the part each step is about, not the sidebar. The phone sheet shows a
// close window onto the same still (see the file head) and a step wider than one window pans window to window.
const CAM = {
  dashboard: { x: 230, y: 80, w: 1170, h: 600 },
  feed: { x: 640, y: 20, w: 760, h: 420 },
  qr: { x: 230, y: 380, w: 1170, h: 520 },
  partners: { x: 230, y: 120, w: 1170, h: 560 },
  partner: { x: 230, y: 20, w: 1170, h: 600 },
  orders: { x: 240, y: 30, w: 1160, h: 640 },
  commissions: { x: 230, y: 30, w: 1170, h: 600 },
};
const PH = {
  kpiA: { x: 255, y: 20, w: 350, h: 290 },
  kpiB: { x: 645, y: 180, w: 350, h: 130 },
  feed: { x: 1080, y: 25, w: 310, h: 260 },
  qr: { x: 262, y: 680, w: 310, h: 100 },
  qrScans: { x: 810, y: 680, w: 330, h: 100 },
  partners: { x: 255, y: 440, w: 350, h: 220 },
  partner: { x: 955, y: 420, w: 370, h: 290 },
  ordersLeft: { x: 262, y: 560, w: 360, h: 200 },
  ordersRight: { x: 980, y: 560, w: 340, h: 200 },
  pay: { x: 950, y: 150, w: 310, h: 230 },
  paid: { x: 945, y: 460, w: 320, h: 130 },
};
// The sidebar is the same on every still: the word boxes in each .words.json put its labels at x 48 and these y.
const NAV = { partners: 336, orders: 450, commissions: 488, qr: 526 };
const nav = (y: number, click = false): CursorTarget => ({ x: 64, y: Math.round(y + 8), click });
// A click on a page's name: the whole screen on a desk (the sidebar and the page it leaves, so nothing is cut); on a
// phone a close view of the sidebar alone (x 0-236: the gap before the page's own words begins at x 248).
const NAV_DESK: Rect = { x: 0, y: 10, w: 1440, h: 860 };
const navPhone = (y: number): Rect => ({ x: 0, y: Math.max(0, Math.round(y) - 110), w: 236, h: 220 });
const dot = (x: number, y: number, click = false): CursorTarget => ({ x, y, click });

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
    { at: 0, still: I.dashboard, step: 0, cam: CAM.dashboard, phoneCam: PH.kpiA },
    { at: 900, still: I.dashboard, step: 0, cursor: dot(300, 246) },
    { at: 2400, still: I.dashboard, step: 0, cursor: at(T("dashboard", "scans"), true), phoneCam: PH.kpiB },
    { at: 4200, still: I["feed-before"], step: 1, cam: CAM.feed, phoneCam: PH.feed, cursor: dot(1110, 93) },
    { at: 6200, still: I.feed, step: 1, cam: CAM.feed, phoneCam: PH.feed, overlay: "feed-row", fadeMs: 280 },
    // Click "QR Codes" in the sidebar.
    { at: 9500, still: I.feed, step: 1, cursor: nav(NAV.qr), cam: NAV_DESK, phoneCam: navPhone(NAV.qr) },
    { at: 10500, still: I.feed, step: 1, cursor: nav(NAV.qr, true) },
    { at: 11400, still: I.qr, step: 2, cam: CAM.qr, phoneCam: PH.qr, cursor: at(T("qr", "row")) },
    { at: 12800, still: I.qr, step: 2, cursor: at(T("qr", "row"), true) },
    { at: 14500, still: I.qr, step: 2, phoneCam: PH.qrScans, cursor: dot(900, 748) },
    // Click "Partners".
    { at: 17000, still: I.qr, step: 2, cursor: nav(NAV.partners), cam: NAV_DESK, phoneCam: navPhone(NAV.partners) },
    { at: 18000, still: I.qr, step: 2, cursor: nav(NAV.partners, true) },
    { at: 18900, still: I.partners, step: 3, cam: CAM.partners, phoneCam: PH.partners, cursor: at(T("partners", "course")) },
    // Click a partner course's name: its record opens.
    { at: 20400, still: I.partners, step: 3, cursor: at(T("partners", "course"), true) },
    { at: 21300, still: I.partner, step: 3, cam: CAM.partner, phoneCam: PH.partner, cursor: at(T("partner", "scans")) },
    // Click "Orders".
    { at: 24000, still: I.partner, step: 3, cursor: nav(NAV.orders), cam: NAV_DESK, phoneCam: navPhone(NAV.orders) },
    { at: 25000, still: I.partner, step: 3, cursor: nav(NAV.orders, true) },
    { at: 25900, still: I.orders, step: 4, cam: CAM.orders, phoneCam: PH.ordersLeft, cursor: dot(340, 586) },
    { at: 28000, still: I.orders, step: 4, phoneCam: PH.ordersRight, cursor: at(T("orders", "owed")) },
    // Click "Commissions".
    { at: 30000, still: I.orders, step: 4, cursor: nav(NAV.commissions), cam: NAV_DESK, phoneCam: navPhone(NAV.commissions) },
    { at: 31000, still: I.orders, step: 4, cursor: nav(NAV.commissions, true) },
    { at: 31900, still: I.commissions, step: 5, cam: CAM.commissions, phoneCam: PH.pay, cursor: at(T("commissions", "pay")) },
    { at: 33800, still: I.commissions, step: 5, cursor: at(T("commissions", "pay"), true) },
    { at: 35200, still: I.commissions, step: 5, phoneCam: PH.paid, cursor: at(T("commissions", "check"), true) },
  ],
  // The last cue rests for ~3 s, then the film is over and the control offers a replay.
  totalMs: 38500,
  // No script, reduced motion and the privacy probe see the live feed with its newest scan.
  ssrStill: I.feed,
  manifest: ORDER.map((id) => S[id].desk.src.replace(/\.webp$/, ".words.json")),
  deskAspect: { w: 1440, h: 900 },
  feedRow: { still: I.feed, desk: T("feed", "row")! },
  phoneUsesDesk: true,
};
