// NWKS Encounter "Admin": the real administration panel, captured as stills and clicked through
// (design-spec-r2 §6.3). Run locally on the repo's own demo seed with every man, town and church
// swapped for the invented NWKS roster in src/data/demos/invented/nwks-encounter.ts
// (scripts/capture-nwks-admin.mjs). Demonstration data: no one on these screens is a real person.
//
// Left out on purpose: Email (a local "not set up" banner), Lookout AI (no key locally), Org Sheet
// and Master schedule (the seed has no teams).
import type { CursorTarget, Still } from "../types";
import type { WalkCue, WalkData } from "./duffer-cc";
import { NWKS_ADMIN_SHOTS as S } from "./nwks-admin-stills";

type Rect = { x: number; y: number; w: number; h: number };
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

// Framings (css px of the 1440 x 900 desk still). Desk: the board or list, not the sidebar.
// Phone: the admin has no narrow layout, so the sheet frames a ~420 px column of the desk still.
const DESK = {
  dashboard: { x: 240, y: 20, w: 1180, h: 620 },
  board: { x: 245, y: 20, w: 980, h: 540 },
  list: { x: 240, y: 20, w: 1190, h: 600 },
  badges: { x: 240, y: 140, w: 1170, h: 600 },
  labels: { x: 240, y: 150, w: 900, h: 520 },
};
const PHONE = {
  dashboard: { x: 245, y: 20, w: 420, h: 690 },
  board: { x: 250, y: 20, w: 420, h: 680 },
  filters: { x: 905, y: 130, w: 420, h: 690 },
  names: { x: 245, y: 130, w: 420, h: 690 },
  sheet: { x: 245, y: 150, w: 420, h: 700 },
  jobs: { x: 1010, y: 60, w: 410, h: 600 },
  // The sheet itself: a page of name labels, each with its cabin.
  label: { x: 238, y: 255, w: 360, h: 560 },
};
// The Attendees card's label: two cards left of First-timers' (the six cards sit on a 197 px pitch).
const ft = T("dashboard", "firstTimers");
const attendeesCard = ft ? { ...ft, x: ft.x - 2 * 197 } : undefined;

const cues: WalkCue[] = [
  { at: 0, still: I.dashboard, step: 0, cam: DESK.dashboard, phoneCam: PHONE.dashboard },
  { at: 1200, still: I.dashboard, step: 0, cursor: at(attendeesCard, true) },
  { at: 5000, still: I["cabins-before"], step: 1, cursor: at(T("cabins-before", "rerun")), cam: DESK.board, phoneCam: PHONE.board },
  { at: 6400, still: I["cabins-before"], step: 1, cursor: at(T("cabins-before", "rerun"), true) },
  // The one longer fade: the beds filling is the point.
  { at: 8000, still: I.cabins, step: 2, fadeMs: 400, cam: DESK.board, phoneCam: PHONE.board },
  // One man is dragged from Cabin 1 to Cabin 3 (coded over the still), then the real board after the move.
  { at: 11000, still: I.cabins, step: 2, overlay: "pin-drag" },
  { at: 12000, still: I["cabins-moved"], step: 2, fadeMs: 200, cam: DESK.board, phoneCam: PHONE.board },
  { at: 14000, still: I.attendees, step: 3, cursor: at(T("attendees", "notPaid")), cam: DESK.list, phoneCam: PHONE.filters },
  { at: 15200, still: I.attendees, step: 3, cursor: at(T("attendees", "notPaid"), true) },
  // Narrowed: on the phone the frame moves from the filter to the men it left.
  { at: 15600, still: I["attendees-unpaid"], step: 3, cam: DESK.list, phoneCam: PHONE.names },
  { at: 19000, still: I.badges, step: 4, cursor: at(T("badges", "sheet")), cam: DESK.badges, phoneCam: PHONE.sheet },
  // The job cards sit in the same place on both stills.
  { at: 24600, still: I.badges, step: 4, cursor: at(T("labels", "labels")), phoneCam: PHONE.jobs },
  { at: 25800, still: I.badges, step: 4, cursor: at(T("labels", "labels"), true) },
  { at: 26100, still: I.labels, step: 5, cam: DESK.labels, phoneCam: PHONE.label },
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
  totalMs: 34000,
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
