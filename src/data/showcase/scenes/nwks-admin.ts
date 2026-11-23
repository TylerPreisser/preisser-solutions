// NWKS Encounter "Admin": the real administration panel, captured as stills and clicked through
// (design-spec-r2 §6.3). Run locally on the repo's own demo seed with every man, town and church
// swapped for the invented NWKS roster in src/data/demos/invented/nwks-encounter.ts
// (scripts/capture-nwks-admin.mjs). Demonstration data: no one on these screens is a real person.
//
// Left out on purpose: Email (a local "not set up" banner), Lookout AI (no key locally), Org Sheet
// and Master schedule (the seed has no teams).
import type { CursorTarget, Still } from "../types";
import type { Rect, WalkCue, WalkData } from "./duffer-cc";
import { NWKS_ADMIN_SHOTS as S } from "./nwks-admin-stills";

type Id = "dashboard" | "cabins-before" | "cabins" | "cabins-moved" | "attendees" | "attendees-unpaid" | "badges" | "labels";
type Shot = { desk: { src: string; css: { w: number; h: number } }; targets: Record<string, Rect> };
const shot = (id: Id) => S[id] as unknown as Shot;

const still = (id: Id, alt: string): Still => {
  const s = shot(id);
  const desk = { src: s.desk.src, width: s.desk.css.w, height: s.desk.css.h };
  // No narrow layout: the phone sheet frames the desk still (phoneUsesDesk, phoneCam).
  return { id, desk, phone: desk, alt };
};
const at = (r: Rect | undefined, click = false): CursorTarget | undefined =>
  r ? { x: Math.round(r.x + Math.min(r.w, 140) / 2), y: Math.round(r.y + r.h / 2), click } : undefined;
const T = (id: Id, k: string) => shot(id).targets[k];

const ORDER: readonly Id[] = ["dashboard", "cabins-before", "cabins", "cabins-moved", "attendees", "attendees-unpaid", "badges", "labels"];
const I = Object.fromEntries(ORDER.map((id, i) => [id, i])) as Record<Id, number>;
const drag = S.drag;

// Framings (css px of the 1440 x 900 desk still). Each is the part of the screen a step is about; the scene
// (walkFrame.ts) zooms so the whole box shows, moves the window so its edge cuts no word, and fills the stage.
// Desk: the board or list, not the sidebar. Phone: the admin has no narrow layout, so the sheet shows a close
// window (a ~400 px column, about 0.85x) onto the desk still, and a step that is wider than one window pans
// from window to window (a new framing crossfades).
const DESK = {
  dashboard: { x: 240, y: 20, w: 1180, h: 620 },
  board: { x: 245, y: 20, w: 980, h: 540 },
  list: { x: 240, y: 20, w: 1190, h: 600 },
  badges: { x: 240, y: 140, w: 1170, h: 600 },
  labels: { x: 240, y: 150, w: 900, h: 520 },
};
const PHONE = {
  // Dashboard: the header and first two figures, then the middle two, then the last two.
  dashA: { x: 255, y: 60, w: 340, h: 290 },
  dashB: { x: 650, y: 200, w: 350, h: 110 },
  dashC: { x: 1040, y: 200, w: 350, h: 110 },
  // Cabins: the buttons row (the click), then one cabin's bunks close up (the pins' initials are 8 px type on the
  // desk still, so this view is zoomed ~1.3x) and the window Cabin 1 and Cabin 3 share for the drag.
  rerun: { x: 275, y: 0, w: 350, h: 130 },
  board: { x: 252, y: 214, w: 230, h: 226 },
  names: { x: 255, y: 20, w: 380, h: 300 },
  unpaid: { x: 262, y: 110, w: 250, h: 300 },
  filters: { x: 915, y: 130, w: 340, h: 90 },
  // Badges & Tags: the page's own words and its three job cards; below them is print-size artwork that no phone can read.
  badges: { x: 230, y: 90, w: 280, h: 230, grow: 20 },
  jobs: { x: 840, y: 150, w: 340, h: 100, grow: 20 },
  label: { x: 245, y: 250, w: 250, h: 100, grow: 20 },
};
// The sidebar is the same on every still, so a click on a page's name is a click on the real nav item: the word
// boxes in each still's .words.json put "Dashboard", "Attendees", "Cabins" and "Badges & Tags" at x 48 and these y.
const NAV = { attendees: 328.5, cabins: 664.5, badges: 778.5 };
const nav = (y: number, click = false): CursorTarget => ({ x: 64, y: Math.round(y + 8), click });
// A click on a page's name: the whole screen on a desk (the sidebar and the page it leaves, so nothing is cut; it
// ends above the sidebar's last line, which the capture's own edge would cut); on a phone a close view of the
// sidebar alone (x 0-236: the gap before the page's own words begins at x 248).
const NAV_DESK: Rect = { x: 0, y: 10, w: 1440, h: 850 };
const navPhone = (y: number): Rect => ({ x: 0, y: Math.min(Math.max(0, Math.round(y) - 110), 900 - 220), w: 236, h: 220 });
const dot = (x: number, y: number, click = false): CursorTarget => ({ x, y, click });
const ft = T("dashboard", "firstTimers");

const cues: WalkCue[] = [
  // Dashboard: the figures, window by window on a phone.
  { at: 0, still: I.dashboard, step: 0, cam: DESK.dashboard, phoneCam: PHONE.dashA },
  { at: 900, still: I.dashboard, step: 0, cursor: dot(300, 262) },
  { at: 2600, still: I.dashboard, step: 0, cursor: dot(ft ? ft.x + 30 : 694, 262), phoneCam: PHONE.dashB },
  { at: 4300, still: I.dashboard, step: 0, cursor: dot(1100, 262), phoneCam: PHONE.dashC },
  // Click "Cabins" in the sidebar.
  { at: 6000, still: I.dashboard, step: 0, cursor: nav(NAV.cabins), cam: NAV_DESK, phoneCam: navPhone(NAV.cabins) },
  { at: 7000, still: I.dashboard, step: 0, cursor: nav(NAV.cabins, true) },
  { at: 7900, still: I["cabins-before"], step: 1, cursor: at(T("cabins-before", "rerun")), cam: DESK.board, phoneCam: PHONE.rerun },
  { at: 9300, still: I["cabins-before"], step: 1, cursor: at(T("cabins-before", "rerun"), true) },
  // The one longer fade: the beds filling is the point.
  { at: 10300, still: I.cabins, step: 2, fadeMs: 400, cursor: dot(330, 262), cam: DESK.board, phoneCam: PHONE.board },
  // One man is dragged from Cabin 1 to Cabin 3 (coded over the still), then the real board after the move.
  { at: 12800, still: I.cabins, step: 2, overlay: "pin-drag" },
  { at: 14000, still: I["cabins-moved"], step: 2, fadeMs: 200, cam: DESK.board, phoneCam: PHONE.board },
  // Click "Attendees".
  { at: 16500, still: I["cabins-moved"], step: 2, cursor: nav(NAV.attendees), cam: NAV_DESK, phoneCam: navPhone(NAV.attendees) },
  { at: 17400, still: I["cabins-moved"], step: 2, cursor: nav(NAV.attendees, true) },
  { at: 18300, still: I.attendees, step: 3, cursor: dot(340, 226), cam: DESK.list, phoneCam: PHONE.names },
  { at: 20300, still: I.attendees, step: 3, cursor: at(T("attendees", "notPaid")), phoneCam: PHONE.filters },
  { at: 21400, still: I.attendees, step: 3, cursor: at(T("attendees", "notPaid"), true) },
  // Narrowed: on the phone the frame moves from the filter to the men it left.
  { at: 22300, still: I["attendees-unpaid"], step: 3, cursor: dot(340, 226), cam: DESK.list, phoneCam: PHONE.unpaid },
  // Click "Badges & Tags".
  { at: 25000, still: I["attendees-unpaid"], step: 3, cursor: nav(NAV.badges), cam: NAV_DESK, phoneCam: navPhone(NAV.badges) },
  { at: 26000, still: I["attendees-unpaid"], step: 3, cursor: nav(NAV.badges, true) },
  { at: 26900, still: I.badges, step: 4, cursor: dot(330, 188), cam: DESK.badges, phoneCam: PHONE.badges },
  // The job cards sit in the same place on both stills; click "Luggage labels".
  { at: 29200, still: I.badges, step: 4, cursor: at(T("labels", "labels")), phoneCam: PHONE.jobs },
  { at: 30500, still: I.badges, step: 4, cursor: at(T("labels", "labels"), true) },
  { at: 31300, still: I.labels, step: 5, cursor: dot(340, 278), cam: DESK.labels, phoneCam: PHONE.label },
];

export const NWKS_ADMIN: WalkData = {
  stills: [
    still("dashboard", "The admin dashboard on demonstration data: attendees, servers, first-timers, payment and attendee depth."),
    still("cabins-before", "The Cabins board before the plan: six cabins drawn from above, every bed empty, everyone waiting in the pool."),
    still("cabins", "The Cabins board after the plan: initials pins in the bunks, cabins filled by town, everyone with a bed."),
    still("cabins-moved", "The Cabins board after one man is dragged from one cabin to another."),
    still("attendees", "The attendee list on demonstration data: names, first-time and returning chips, letters, town and shirt size."),
    still("attendees-unpaid", "The attendee list filtered to the men who have not paid yet."),
    still("badges", "Badges and Tags: a sheet of attendee badges with each man's first name and cabin, and the badge's two faces."),
    still("labels", "Luggage labels: a sheet of labels with each man's name and cabin, two per man."),
  ],
  steps: ["Dashboard", "Cabins", "Placed", "Attendees", "Badges", "Labels"],
  captions: [
    "The weekend at a glance: attendees, servers, first-timers, and who needs a decision.",
    "Before the plan: every confirmed man is waiting for a bed.",
    "The plan places every man by town, and anyone can be dragged to another bed.",
    "The attendee list, narrowed to the men who have not paid yet.",
    "Badges print from the roster with each man's cabin. Nobody types a name.",
    "Luggage labels come from the same roster and the same cabins.",
  ],
  cues,
  // The last cue rests for ~4 s, then the film is over and the control offers a replay.
  totalMs: 36000,
  // Spec §6.3: no script and reduced motion show the cabins after the plan.
  ssrStill: I.cabins,
  manifest: ORDER.map((id) => shot(id).desk.src.replace(/\.webp$/, ".words.json")),
  deskAspect: { w: 1440, h: 900 },
  phoneUsesDesk: true,
  pinDrag: {
    still: I.cabins,
    from: drag.from,
    to: { ...drag.from, x: drag.landed.x, y: drag.landed.y },
    initials: drag.initials,
    look: drag.look,
  },
};
