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
  // No narrow layout: close views frame the desk still (phoneUsesDesk, `close`).
  return { id, desk, phone: desk, alt };
};
const at = (r: Rect | undefined, click = false): CursorTarget | undefined =>
  r ? { x: Math.round(r.x + Math.min(r.w, 140) / 2), y: Math.round(r.y + r.h / 2), click } : undefined;
const T = (id: Id, k: string) => shot(id).targets[k];

const ORDER: readonly Id[] = ["dashboard", "cabins-before", "cabins", "cabins-moved", "attendees", "attendees-unpaid", "badges", "labels"];
const I = Object.fromEntries(ORDER.map((id, i) => [id, i])) as Record<Id, number>;
const drag = S.drag;

// Framings (css px of the 1440 x 900 desk still). Desk (`cam`): the part of the screen a step is about; the scene
// (walkFrame.ts frameView) zooms so the whole box shows, moves the window so its edge cuts no word, and fills the stage.
// Close views (`close`: phones, portrait tablets, small landscape stages; walkFrame.ts frameClose): the admin has no
// narrow layout, so each step names the WHOLE unit(s) a stranger must see (a card, a list with its names, a nav group),
// biggest first; the stage takes the first it can show whole, readable and filling the stage. A new framing on the
// same still is a camera move; a new still is a crossfade.
const DESK = {
  dashboard: { x: 240, y: 20, w: 1180, h: 620 },
  board: { x: 245, y: 20, w: 980, h: 540 },
  list: { x: 240, y: 20, w: 1190, h: 600 },
  badges: { x: 240, y: 140, w: 1170, h: 600 },
  // (Wide enough for the whole label-stock select: a window edge through it would cut its text.)
  labels: { x: 240, y: 150, w: 1150, h: 520 },
};
type Units = readonly (readonly Rect[])[];
const R = (x: number, y: number, w: number, h: number): Rect => ({ x, y, w, h });
/** A unit framed for a camera pass (see Rect.pass). */
const P = (x: number, y: number, w: number, h: number): Rect => ({ x, y, w, h, pass: true });
const CLOSE: Record<string, Units> = {
  // Dashboard: the first four figures (attendees, servers, first-timers, dropped) on a tablet; on a phone the first
  // two with the payment card under them, then the next two.
  dashA: [[R(249, 210, 772, 117)], [R(249, 210, 378, 117), R(249, 345, 378, 388)], [R(249, 210, 378, 117)], [R(249, 210, 180, 117)]],
  dashB: [[R(644, 210, 772, 117)], [R(644, 210, 377, 117), R(664, 677, 250, 35)], [R(644, 210, 377, 117)], [R(644, 210, 180, 117)]],
  // The sidebar's groups: THE PEOPLE (Attendees) and THE WEEKEND (Cabins ... Badges & Tags).
  people: [[R(8, 298, 208, 132)]],
  weekend: [[R(8, 636, 208, 166)]],
  weekendPass: [[P(8, 636, 208, 166)]],
  // Cabins before the plan: the men waiting in the pool, then the Rerun button with the empty cabins under it.
  pool: [[R(249, 165, 727, 600)], [R(686, 180, 290, 575)], [R(686, 180, 290, 300)], [R(695, 245, 200, 230)]],
  rerun: [[R(248, 20, 560, 100), R(249, 165, 423, 390)], [P(248, 85, 233, 35), R(249, 165, 423, 190)], [P(248, 85, 233, 35), R(249, 165, 222, 190)], [P(248, 85, 233, 35)]],
  // After the plan: the rooms the men landed in (Cabin 1 and Cabin 3, where the drag goes), names and counts.
  board: [[R(249, 165, 727, 590)], [R(258, 170, 206, 180), R(258, 372, 206, 180)], [R(258, 170, 206, 180)]],
  // Attendees: the list with its names; the filter that narrows it; the narrowed list with its count.
  // (The filter row is a band of selects no narrow window can cross, so a phone's list view starts under it.)
  // A phone shows each row's name, chips, email and phone: the only line clear of every row's words is just past the
  // phone numbers (x ~621-628, the first row's runs past it), so the list starts at the second row, names at the edge.
  // (A 320 phone: rows 4 to 6, whose emails all end before x 517 and whose phones start after it.)
  names: [[R(248, 20, 560, 540)], [R(313, 275, 200, 380)], [R(313, 275, 200, 220)], [R(313, 425, 200, 190)]],
  filter: [[P(915, 143, 110, 37)]],
  unpaid: [[R(248, 20, 560, 540)], [R(248, 198, 406, 20), R(313, 237, 200, 300)], [R(313, 237, 200, 300)], [R(313, 237, 200, 220)]],
  // Badges & Tags: one badge, both faces (the payoff, large type), else its front face; the Luggage labels job card.
  // (Above the badge card is empty page and the job cards; under it, the sheet's select and the card's empty bottom: a
  // stage too tall for the faces to fill shows the unit alone, its window held between the card's top and the select.)
  badge: [[{ ...R(849, 314, 490, 216), above: 4, grow: 45 }], [{ ...R(849, 314, 212, 216), above: 4, grow: 45 }]],
  // (The click on Luggage labels is a pass: the camera pulls back to the job cards over the badge, the pointer clicks.)
  jobs: [[P(849, 157, 550, 373)]],
  // Luggage labels, the last view: the label card whole, the label with the sheet it prints on ("Avery 5160 ..."), else
  // (a phone, where that select alone is wider than the stage can show readably) the label itself. Either way the
  // window is held to the card: above it are empty page and the job cards, under it the card's empty bottom.
  label: [[{ ...R(849, 314, 534, 210), above: 4, grow: 8 }], [{ ...R(849, 314, 250, 134), above: 4, grow: 18 }]],
};
// The sidebar is the same on every still, so a click on a page's name is a click on the real nav item: the word
// boxes in each still's .words.json put "Dashboard", "Attendees", "Cabins" and "Badges & Tags" at x 48 and these y.
const NAV = { attendees: 328.5, cabins: 664.5, badges: 778.5 };
const nav = (y: number, click = false): CursorTarget => ({ x: 64, y: Math.round(y + 8), click });
// A click on a page's name on a desk: the sidebar and the left of the page it leaves, close enough to read.
const navDesk = (y: number): Rect => ({ x: 0, y: Math.min(Math.max(10, Math.round(y) - 420), 900 - 610), w: 1100, h: 600 });
const dot = (x: number, y: number, click = false): CursorTarget => ({ x, y, click });
const ft = T("dashboard", "firstTimers");

const cues: WalkCue[] = [
  // Dashboard: the figures; a close view moves from the first two to the next two.
  { at: 0, still: I.dashboard, step: 0, cam: DESK.dashboard, close: CLOSE.dashA },
  { at: 900, still: I.dashboard, step: 0, cursor: dot(300, 262) },
  { at: 2600, still: I.dashboard, step: 0, cursor: dot(ft ? ft.x + 30 : 694, 262), close: CLOSE.dashB },
  { at: 4300, still: I.dashboard, step: 0, cursor: dot(1100, 262), closeCursor: dot(880, 280) },
  // Click "Cabins" in the sidebar.
  { at: 6000, still: I.dashboard, step: 0, cursor: nav(NAV.cabins), cam: navDesk(NAV.cabins), close: CLOSE.weekend },
  { at: 7000, still: I.dashboard, step: 0, cursor: nav(NAV.cabins, true) },
  // Before the plan: the waiting men, then the Rerun button is clicked.
  { at: 7900, still: I["cabins-before"], step: 1, cursor: dot(760, 268), cam: DESK.board, close: CLOSE.pool },
  { at: 9600, still: I["cabins-before"], step: 1, cursor: at(T("cabins-before", "rerun"), true), close: CLOSE.rerun },
  // The one longer fade: the beds filling is the point.
  { at: 10700, still: I.cabins, step: 2, fadeMs: 400, cursor: dot(330, 262), cam: DESK.board, close: CLOSE.board },
  // One man is dragged from Cabin 1 to Cabin 3 (coded over the still), then the real board after the move.
  { at: 13200, still: I.cabins, step: 2, overlay: "pin-drag" },
  { at: 14400, still: I["cabins-moved"], step: 2, fadeMs: 200, cam: DESK.board, close: CLOSE.board },
  // Click "Attendees".
  { at: 16900, still: I["cabins-moved"], step: 2, cursor: nav(NAV.attendees), cam: navDesk(NAV.attendees), close: CLOSE.people },
  { at: 17800, still: I["cabins-moved"], step: 2, cursor: nav(NAV.attendees, true) },
  { at: 18700, still: I.attendees, step: 3, cursor: dot(340, 226), closeCursor: [dot(360, 300), dot(360, 300), dot(360, 300), dot(360, 448)], cam: DESK.list, close: CLOSE.names },
  // The filter: a close view travels to it with the pointer, and the click narrows the list.
  { at: 20900, still: I.attendees, step: 3, cursor: at(T("attendees", "notPaid"), true), close: CLOSE.filter },
  // Narrowed: the frame comes back to the men it left.
  { at: 22000, still: I["attendees-unpaid"], step: 3, cursor: dot(340, 266), closeCursor: dot(360, 266), cam: DESK.list, close: CLOSE.unpaid },
  // Click "Badges & Tags": a pass (no window on a portrait tablet holds the sidebar and this list's ragged rows cleanly).
  { at: 24700, still: I["attendees-unpaid"], step: 3, cursor: nav(NAV.badges, true), cam: navDesk(NAV.badges), close: CLOSE.weekendPass },
  { at: 25700, still: I.badges, step: 4, cursor: dot(330, 188), closeCursor: dot(1010, 470), cam: DESK.badges, close: CLOSE.badge },
  // The job cards sit in the same place on both stills; click "Luggage labels".
  { at: 28500, still: I.badges, step: 4, cursor: at(T("labels", "labels"), true), close: CLOSE.jobs },
  { at: 29600, still: I.labels, step: 5, cursor: dot(340, 278), closeCursor: dot(1000, 420), cam: DESK.labels, close: CLOSE.label },
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
  totalMs: 34600,
  // Spec §6.3: no script and reduced motion show the cabins after the plan.
  ssrStill: I.cabins,
  manifest: ORDER.map((id) => shot(id).desk.src.replace(/\.webp$/, ".words.json")),
  deskAspect: { w: 1440, h: 900 },
  phoneUsesDesk: true,
  // The sidebar's encounter picker on every still, and the pages' search boxes and selects (see WalkData.solids).
  solids: Object.fromEntries(
    ORDER.map((id) => {
      const own: Partial<Record<Id, Rect[]>> = {
        "cabins-before": [R(700, 212, 30, 26), R(736, 212, 144, 26)],
        cabins: [R(700, 198, 30, 26), R(736, 198, 144, 26)],
        "cabins-moved": [R(700, 198, 30, 26), R(736, 198, 144, 26)],
        attendees: [R(249, 143, 254, 37), R(516, 143, 192, 37), R(721, 143, 180, 37)],
        "attendees-unpaid": [R(249, 143, 254, 37), R(516, 143, 192, 37), R(721, 143, 180, 37)],
        badges: [R(849, 598, 534, 37)],
        labels: [R(849, 487, 534, 37)],
      };
      return [id, [R(12, 155, 200, 38), ...(own[id] ?? [])]];
    }),
  ),
  pinDrag: {
    still: I.cabins,
    from: drag.from,
    to: { ...drag.from, x: drag.landed.x, y: drag.landed.y },
    initials: drag.initials,
    look: drag.look,
  },
};
