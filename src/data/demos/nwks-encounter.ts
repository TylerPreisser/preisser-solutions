// src/data/demos/nwks-encounter.ts — the NWKS Encounter Proof Stage fixture
// and script (ADR-0017). Every person, town and date is invented and
// registered in src/data/demos/invented/nwks-encounter.ts. No count here is
// read from the live database; every number the screens draw is a `.length`
// or `.filter(...).length` of the arrays below, never a typed literal.
//
// The 48-man roster and its team placements are reused from the approved
// concept strip (strip-nwks/fixture.js revision 3, spec-NW.md §3): it is
// already handoff-grep-clean and the strip's own "step" numbering (0 history,
// 1 F1, 2 F8, 3 F10, 4 F9) is kept, shifted by one to match this kit's
// 1-indexed `data-stage-step`.
import { defineStages } from "./_define";
import { person, town, domain } from "./_invented";

// ── Teams ───────────────────────────────────────────────────────────────
export interface Team {
  id: string;
  code: string;
  name: string;
  job: string | null;
  hue: number; // index into --nw-org-team-<n>
  trade: boolean; // F8: a trade team is filled from its own men first
}

export const TEAMS: readonly Team[] = [
  { id: "t1", code: "1", name: "PRAYER TEAM 1", job: "SUPPLIES & LOGISTICS", hue: 0, trade: true },
  { id: "t2", code: "2", name: "PRAYER TEAM 2", job: "REGISTRATION", hue: 1, trade: false },
  { id: "t3", code: "3", name: "PRAYER TEAM 3", job: "TECH & VENUE", hue: 2, trade: true },
  { id: "t4", code: "4", name: "PRAYER TEAM 4", job: "TEACHING & SPECIAL PRAYER", hue: 3, trade: false },
  { id: "t6", code: "6", name: "PRAYER TEAM 6", job: "SPECIAL OPS", hue: 4, trade: true },
  { id: "fd", code: "FOOD", name: "FOOD TEAM", job: null, hue: 5, trade: true },
  { id: "5a", code: "5A", name: "PRAYER TEAM 5A", job: "NOURISHMENT", hue: 6, trade: false },
  { id: "5b", code: "5B", name: "PRAYER TEAM 5B", job: "NOURISHMENT", hue: 7, trade: false },
  { id: "5c", code: "5C", name: "PRAYER TEAM 5C", job: "NOURISHMENT", hue: 0, trade: false },
];

// ── The 48-man draft ────────────────────────────────────────────────────
export interface Server {
  personId: string;
  teamId: string;
  captain: boolean;
  /** 1 history/pre-existing, 2 F1, 3 F8, 4 F10, 5 F9: which step placed him. */
  step: 1 | 2 | 3 | 4 | 5;
  /** How many past sheets show him serving, for the tenure band. Invented; not a handoff figure. */
  timesServed: number;
}

// [personId, teamId, step, captain, timesServed]
const RAW: readonly [string, string, 1 | 2 | 3 | 4 | 5, boolean, number][] = [
  ["srv-hal-wendorf", "t1", 1, true, 11], ["srv-marty-ostrand", "t1", 2, false, 6], ["srv-len-kessinger", "t1", 2, false, 5],
  ["srv-duane-ruhlman", "t1", 2, false, 4], ["srv-carl-bettenhaus", "t1", 3, false, 7], ["srv-owen-stricklin", "t1", 3, false, 3],
  ["srv-pete-harwell", "t1", 4, false, 2],
  ["srv-curt-abernethy", "t2", 1, true, 9], ["srv-glen-tolliver", "t2", 2, false, 5], ["srv-roy-kasselman", "t2", 2, false, 3],
  ["srv-wes-dunmore", "t2", 4, false, 2], ["srv-ray-pollart", "t2", 4, false, 2],
  ["srv-rory-vantine", "t3", 3, false, 8], ["srv-theo-marchetti", "t3", 3, false, 5],
  ["srv-dale-fenwright", "t4", 1, true, 12], ["srv-ned-carrow", "t4", 2, false, 6], ["srv-stan-ebberts", "t4", 2, false, 4],
  ["srv-lyle-brandvold", "t4", 4, false, 2],
  ["srv-mitch-kolander", "t6", 1, true, 10], ["srv-bert-sandquist", "t6", 2, false, 7], ["srv-vic-hallum", "t6", 2, false, 6],
  ["srv-jed-morrow", "t6", 2, false, 4], ["srv-earl-tunstall", "t6", 2, false, 3], ["srv-frank-ostberg", "t6", 3, false, 6],
  ["srv-neil-castellan", "t6", 3, false, 5],
  ["srv-arlo-penner", "fd", 1, true, 13], ["srv-sam-whitcomb", "fd", 3, false, 9], ["srv-gary-lindqvist", "fd", 3, false, 6],
  ["srv-ken-ridgeley", "5a", 1, true, 8], ["srv-tyson-graber", "5a", 5, false, 0], ["srv-blake-heinen", "5a", 5, false, 0],
  ["srv-cody-ambrust", "5a", 5, false, 1], ["srv-luke-spangler", "5a", 5, false, 0], ["srv-drew-ostermann", "5a", 5, false, 0],
  ["srv-kyle-barrington", "5a", 5, false, 1],
  ["srv-ross-deegan", "5b", 1, true, 7], ["srv-gus-pemberdahl", "5b", 5, false, 1], ["srv-jace-wolfram", "5b", 5, false, 0],
  ["srv-brent-oakes", "5b", 5, false, 0], ["srv-evan-tully", "5b", 5, false, 1], ["srv-nate-corbell", "5b", 5, false, 0],
  ["srv-colt-ravenscroft", "5b", 5, false, 0],
  ["srv-walt-hensler", "5c", 1, true, 9], ["srv-trent-vossler", "5c", 5, false, 0], ["srv-jonah-pruett", "5c", 5, false, 0],
  ["srv-reid-castner", "5c", 5, false, 1], ["srv-micah-olander", "5c", 5, false, 0], ["srv-dean-farquhar", "5c", 5, false, 0],
];

export const SERVERS: readonly Server[] = RAW.map(([personId, teamId, step, captain, timesServed]) => ({
  personId,
  teamId,
  step,
  captain,
  timesServed,
}));

if (SERVERS.length !== 48) {
  throw new Error(`[nwks-encounter] the org sheet story needs 48 servers, got ${SERVERS.length}`);
}
for (const t of TEAMS) {
  if (SERVERS.filter((s) => s.teamId === t.id).length === 0) {
    throw new Error(`[nwks-encounter] team "${t.id}" has no server assigned`);
  }
}
{
  const seen = new Set<string>();
  for (const s of SERVERS) {
    if (seen.has(s.personId)) throw new Error(`[nwks-encounter] server "${s.personId}" is on the draft twice`);
    seen.add(s.personId);
  }
}

export function serverName(s: Server): string {
  return person(s.personId).full;
}

// ── The Org Sheet read, one rule at a time (critic-NW B4, strip frames 03-10) ──
// The page's own voice ("Preisser speaks"): each rule's F-code and its own
// wording, then one qualitative line about THIS demonstration draft. No
// measured fact, no count from the handoff or the live history (ADR-0017 §4).
export interface OrgRuleHead {
  /** Steps (0..6, the kit's `data-track-step`) this headline shows at. */
  at: readonly number[];
  kicker: string;
  tag: string;
  title: string;
  gloss: string;
}
export const ORG_RULE_HEADS: readonly OrgRuleHead[] = [
  {
    at: [0, 1],
    kicker: "One rule at a time",
    tag: "History",
    title: "It reads the ministry\u2019s past sheets before it places anyone.",
    gloss: "The captains the ministry named are already on the sheet. The engine never proposes one.",
  },
  { at: [2], kicker: "Rule 1 of the 4 shown", tag: "F1", title: "Keep a returning server where they were.", gloss: "A returning server stays where he served last time." },
  {
    at: [3],
    kicker: "Rule 2 of the 4 shown",
    tag: "F8",
    title: "A team that is a trade keeps its own men.",
    gloss: "A trade team is filled from its own men before anyone new is placed there.",
  },
  { at: [4], kicker: "Rule 3 of the 4 shown", tag: "F10", title: "Size is the mode, not the median.", gloss: "Team size follows what the years show, not an average." },
  {
    at: [5],
    kicker: "Rule 4 of the 4 shown",
    tag: "F9",
    title: "A new server only goes where new servers go.",
    gloss: "First-timers land on the meal shifts, the teams that have always taken new men.",
  },
  {
    at: [6],
    kicker: "Then it checks",
    tag: "Check",
    title: "The system checks its own sheet.",
    gloss: "Two spellings, one likely man: listed for a person to settle, never merged on its own.",
  },
];
/** The resting headline (strip frame 07): the four rules on one line. */
export const ORG_END_HEAD = {
  title: "Every man placed. No trade team broken.",
  rules: [
    { tag: "F1", text: "stays where he served" },
    { tag: "F8", text: "trades keep their men" },
    { tag: "F10", text: "size follows the years" },
    { tag: "F9", text: "new men where new men go" },
  ],
} as const;

/** Every count below is a filter over the invented 48; nothing is typed. */
export const orgSheet = {
  /** Servers on a team once step k has landed (k = 0..6). */
  placedBy(k: number) {
    return SERVERS.filter((s) => s.step <= k).length;
  },
  waitingAt(k: number) {
    return SERVERS.length - this.placedBy(k);
  },
  laneCountAt(teamId: string, k: number) {
    return SERVERS.filter((s) => s.teamId === teamId && s.step <= k).length;
  },
  /** The lane step k touched most (ties: the lane it fills the largest share of, then board order). */
  laneFor(k: number): string {
    const dup = SERVERS.find((s) => s.personId === "srv-gus-pemberdahl") as Server;
    if (k >= 6) return dup.teamId;
    const step = Math.max(1, k);
    let best = TEAMS[0].id;
    let bestN = -1;
    let bestShare = -1;
    for (const t of TEAMS) {
      const n = SERVERS.filter((s) => s.teamId === t.id && s.step === step).length;
      const share = n / SERVERS.filter((s) => s.teamId === t.id).length;
      if (n > bestN || (n === bestN && share > bestShare)) {
        best = t.id;
        bestN = n;
        bestShare = share;
      }
    }
    return best;
  },
  /** Lanes a step placed anyone on. */
  touchedAt(k: number) {
    return TEAMS.filter((t) => SERVERS.some((s) => s.teamId === t.id && s.step === k)).map((t) => t.id);
  },
};
if (orgSheet.waitingAt(5) !== 0) throw new Error("[nwks-encounter] the four rules must place every server by step 5");

// ── Attendees ───────────────────────────────────────────────────────────
export type AttendeeStatus = "registered" | "waitlist-pending" | "waitlist-position" | "waitlist-offered" | "dropped";

export interface Attendee {
  personId: string;
  townId: string;
  status: AttendeeStatus;
  paid: boolean;
  shirtSize: "S" | "M" | "L" | "XL";
  /** 0 = first-timer. */
  timesAttended: number;
  /** What the person self-reported when re-registering, vs. `timesAttended` on record. */
  selfReportedTimes?: number;
  inviterId?: string; // a Server personId
  daysWaiting?: number;
  waitlistPosition?: number;
  reasonForReturning?: string;
  droppedReason?: string;
  /** A drop on a person who had already paid: the warning row (spec-NW.md §2.2). */
  wasAlreadyPaid?: boolean;
}

export const ATTENDEES: readonly Attendee[] = [
  // Registered (7)
  { personId: "att-grant-ashwell", townId: "aldervale", status: "registered", paid: true, shirtSize: "L", timesAttended: 3, inviterId: "srv-hal-wendorf" },
  { personId: "att-miles-cordero", townId: "kestrel-bend", status: "registered", paid: true, shirtSize: "M", timesAttended: 0, inviterId: "srv-curt-abernethy" },
  { personId: "att-grant-petracek", townId: "tollerton", status: "registered", paid: true, shirtSize: "XL", timesAttended: 1, inviterId: "srv-arlo-penner" },
  { personId: "att-owen-bratcher", townId: "emberton", status: "registered", paid: false, shirtSize: "M" as const, timesAttended: 2 },
  { personId: "att-silas-kanaly", townId: "fallowfield", status: "registered", paid: true, shirtSize: "L", timesAttended: 0, inviterId: "srv-ken-ridgeley" },
  { personId: "att-perry-wooldridge", townId: "birchwood-corners", status: "registered", paid: true, shirtSize: "S", timesAttended: 4 },
  { personId: "att-nolan-ferrick", townId: "aldervale", status: "registered", paid: true, shirtSize: "M", timesAttended: 1, inviterId: "srv-dale-fenwright" },
  // Waitlisted (3)
  {
    personId: "att-denny-aldous",
    townId: "kestrel-bend",
    status: "waitlist-pending",
    paid: false,
    shirtSize: "L",
    timesAttended: 2,
    selfReportedTimes: 3,
    daysWaiting: 4,
    reasonForReturning: "Came the last two years and would like to bring his son this time.",
  },
  {
    personId: "att-hollis-vantrease",
    townId: "tollerton",
    status: "waitlist-position",
    paid: false,
    shirtSize: "M",
    timesAttended: 0,
    daysWaiting: 6,
    waitlistPosition: 2,
    reasonForReturning: "First time; a friend from town invited him.",
  },
  {
    personId: "att-emmett-sorenson",
    townId: "emberton",
    status: "waitlist-offered",
    paid: false,
    shirtSize: "L",
    timesAttended: 1,
    daysWaiting: 9,
    reasonForReturning: "Missed last year and wants back in if a seat opens.",
  },
  // Dropped (2)
  {
    personId: "att-barrett-lindeman",
    townId: "fallowfield",
    status: "dropped",
    paid: true,
    shirtSize: "XL",
    timesAttended: 5,
    droppedReason: "A work conflict came up after he had already paid.",
    wasAlreadyPaid: true,
  },
  {
    personId: "att-corwin-haskell",
    townId: "birchwood-corners",
    status: "dropped",
    paid: false,
    shirtSize: "M",
    timesAttended: 0,
    droppedReason: "Changed his mind before paying.",
  },
];

if (ATTENDEES.length < 12) throw new Error("[nwks-encounter] the roster story needs at least 12 attendees");
if (!ATTENDEES.some((a) => a.status === "registered")) throw new Error("[nwks-encounter] no registered attendee");
if (!ATTENDEES.some((a) => a.status.startsWith("waitlist"))) throw new Error("[nwks-encounter] no waitlisted attendee");
if (!ATTENDEES.some((a) => a.status === "dropped")) throw new Error("[nwks-encounter] no dropped attendee");

export function attendeeName(a: Attendee): string {
  return person(a.personId).full;
}
export function attendeeTown(a: Attendee): string {
  return town(a.townId).name;
}

// ── Dashboard derivations ───────────────────────────────────────────────
export const dashboard = {
  get attendeeCount() {
    return ATTENDEES.filter((a) => a.status !== "dropped").length;
  },
  get serverCount() {
    return SERVERS.length;
  },
  get firstTimers() {
    return ATTENDEES.filter((a) => a.status !== "dropped" && a.timesAttended === 0).length;
  },
  get dropped() {
    return ATTENDEES.filter((a) => a.status === "dropped").length;
  },
  get needsDecision() {
    return ATTENDEES.filter((a) => a.status === "waitlist-pending").length;
  },
  get paidByCard() {
    return ATTENDEES.filter((a) => a.status !== "dropped" && a.paid).length;
  },
  get paidCashCheck() {
    return 0; // this demonstration draft has no cash/check rows
  },
  get unpaid() {
    return ATTENDEES.filter((a) => a.status !== "dropped" && !a.paid).length;
  },
  get byTown() {
    const ids = Array.from(new Set(ATTENDEES.filter((a) => a.status !== "dropped").map((a) => a.townId)));
    return ids
      .map((id) => ({ id, name: town(id).name, count: ATTENDEES.filter((a) => a.status !== "dropped" && a.townId === id).length }))
      .sort((x, y) => y.count - x.count);
  },
  get shirtSizes() {
    const order: Attendee["shirtSize"][] = ["S", "M", "L", "XL"];
    return order.map((size) => ({ size, count: ATTENDEES.filter((a) => a.status !== "dropped" && a.shirtSize === size).length }));
  },
  get depthBuckets() {
    // Oldest-attendance-first: 4+, 2-3, 1, 0 (first-timer).
    const buckets = [
      { label: "4 or more times", count: ATTENDEES.filter((a) => a.status !== "dropped" && a.timesAttended >= 4).length },
      { label: "2 to 3 times", count: ATTENDEES.filter((a) => a.status !== "dropped" && a.timesAttended >= 2 && a.timesAttended <= 3).length },
      { label: "Once before", count: ATTENDEES.filter((a) => a.status !== "dropped" && a.timesAttended === 1).length },
      { label: "First time", count: ATTENDEES.filter((a) => a.status !== "dropped" && a.timesAttended === 0).length },
    ];
    return buckets;
  },
  get recentRegistrations() {
    return ATTENDEES.filter((a) => a.status === "registered").slice(0, 4);
  },
};

// ── Cabins ──────────────────────────────────────────────────────────────
// One cabin, two sides of 10 beds (matches the real per-side template,
// spec-NW.md §2.4), a stage simplification from the real 6-cabin/144-bed
// board, stated in SOURCE.md. A small waiting pool of unplaced people.
export const CABIN_SIDE_CAPACITY = 10;

interface CabinResident {
  kind: "attendee" | "server";
  id: string; // personId
  side: "L" | "R";
}

const REGISTERED_ATTENDEES = ATTENDEES.filter((a) => a.status === "registered").map((a) => a.personId);
const CAPTAIN_SERVERS = SERVERS.filter((s) => s.captain).map((s) => s.personId);
const EXTRA_SERVERS = SERVERS.filter((s) => !s.captain)
  .slice(0, 6)
  .map((s) => s.personId);

// The two "still to place" servers (review finding 7): at REST the story is
// already over, so they are SEATED like everyone else (side R, making it
// 10/10) — the end frame must not contradict its own "everyone has a bed"
// line. CabinsTab.tsx renders them a second time as a transient
// `data-stage-until="4"` chip in the "Still to place" panel, visible only
// while the track is animating and before step 4, per the kit's own
// before/after swap-cell convention; that chip is never part of the resting
// DOM, so there is no double-counting at rest, only during the demonstrated
// drag.
export const CABIN_LATE_IDS: readonly string[] = ["srv-glen-tolliver", "srv-roy-kasselman"];

export const CABIN_RESIDENTS: readonly CabinResident[] = [
  ...REGISTERED_ATTENDEES.slice(0, 4).map((id, i): CabinResident => ({ kind: "attendee", id, side: i % 2 === 0 ? "L" : "R" })),
  ...CAPTAIN_SERVERS.slice(0, 4).map((id, i): CabinResident => ({ kind: "server", id, side: i % 2 === 0 ? "L" : "R" })),
  ...REGISTERED_ATTENDEES.slice(4, 7).map((id, i): CabinResident => ({ kind: "attendee", id, side: (i + 4) % 2 === 0 ? "L" : "R" })),
  ...EXTRA_SERVERS.slice(0, 6).map((id, i): CabinResident => ({ kind: "server", id, side: (i + 4) % 2 === 0 ? "L" : "R" })),
  ...CABIN_LATE_IDS.map((id): CabinResident => ({ kind: "server", id, side: "R" })),
];

{
  const seen = new Set<string>();
  for (const r of CABIN_RESIDENTS) {
    if (seen.has(r.id)) throw new Error(`[nwks-encounter] cabin resident "${r.id}" is seated twice`);
    seen.add(r.id);
  }
}

export function cabinResidentName(r: CabinResident): string {
  return r.kind === "attendee" ? attendeeName(ATTENDEES.find((a) => a.personId === r.id) as Attendee) : person(r.id).full;
}

export const cabins = {
  /** Everyone with a bed at rest, including the two late arrivals. */
  get placed() {
    return CABIN_RESIDENTS.length;
  },
  sideResidents(side: "L" | "R") {
    return CABIN_RESIDENTS.filter((r) => r.side === side);
  },
  get totalBeds() {
    return CABIN_SIDE_CAPACITY * 2;
  },
  /** Real, distinct figure (review finding 7): attendees whose seat is not
   * yet confirmed — separate from the cabin-seating story above, so the
   * readiness line never contradicts the board underneath it. */
  get stillPendingConfirmation() {
    return ATTENDEES.filter((a) => a.status === "waitlist-pending").length;
  },
};

// Can fail: a side over capacity, unlike the old `placed + stillToPlace >
// totalBeds` tautology (review finding 7's "replace the invariant").
for (const side of ["L", "R"] as const) {
  if (cabins.sideResidents(side).length > CABIN_SIDE_CAPACITY) {
    throw new Error(`[nwks-encounter] cabin side "${side}" has more people than beds`);
  }
}
if (cabins.placed > cabins.totalBeds) {
  throw new Error("[nwks-encounter] the cabin fixture seats more people than the board has beds");
}

// ── Email ───────────────────────────────────────────────────────────────
export const EMAIL_SENDER = `office@${domain("campmail")}`;
export const EMAIL_TEMPLATES = [
  { id: "launch-details", group: "BEFORE THE WEEKEND", label: "Launch-point details", manual: true },
  { id: "packing-list", group: "BEFORE THE WEEKEND", label: "What to bring", manual: true },
  { id: "welcome", group: "AUTOMATED", label: "Registration confirmed", manual: false },
  { id: "offer", group: "AUTOMATED", label: "A seat opened up", manual: false },
] as const;

export const email = {
  get manualCount() {
    return EMAIL_TEMPLATES.filter((t) => t.manual).length;
  },
  get automatedCount() {
    return EMAIL_TEMPLATES.filter((t) => !t.manual).length;
  },
  /** The servers who invited an attendee registered from one of these towns. */
  serversFor(townIds: readonly string[]) {
    return SERVERS.filter((s) => ATTENDEES.some((a) => a.status !== "dropped" && a.inviterId === s.personId && townIds.includes(a.townId)));
  },
  /** The (non-dropped) attendees registered from one of these towns. */
  attendeesFor(townIds: readonly string[]) {
    return ATTENDEES.filter((a) => a.status !== "dropped" && townIds.includes(a.townId));
  },
  /** Who this send reaches (review finding 6: this used to read 0 for
   * Everyone and Attendees; every audience is now a real `.length` of the
   * fixture, never a typed literal). "Servers · one launch point," narrowed
   * to a small nonzero count (spec-NW.md §3). */
  audienceCount(who: "Everyone" | "Attendees" | "Servers", townIds: readonly string[]) {
    if (who === "Servers") return this.serversFor(townIds).length;
    if (who === "Attendees") return this.attendeesFor(townIds).length;
    return this.serversFor(townIds).length + this.attendeesFor(townIds).length;
  },
};
const EMAIL_DEMO_TOWN = "aldervale";
if (email.audienceCount("Servers", [EMAIL_DEMO_TOWN]) === 0) {
  throw new Error("[nwks-encounter] the email audience demo needs at least one server matching the demo town");
}

// ── Lookout AI ──────────────────────────────────────────────────────────
export const lookout = {
  resolvedQuestion: `Where's ${person("srv-hal-wendorf").full}'s launch point?`,
  get resolvedAnswer() {
    // Servers do not carry a town in this fixture; the resolved-lookup demo
    // answers from an attendee he invited, which is what the real feature
    // would trace through (his invite), not a server-side town field.
    const invitee = ATTENDEES.find((a) => a.inviterId === "srv-hal-wendorf");
    return invitee ? `${town(invitee.townId).name}.` : "Not on record.";
  },
  ambiguousQuestion: "Where's Grant's launch point?",
  get ambiguousCandidates() {
    return ATTENDEES.filter((a) => person(a.personId).first === "Grant").map((a) => ({
      name: attendeeName(a),
      town: attendeeTown(a),
    }));
  },
};
if (lookout.ambiguousCandidates.length < 2) {
  throw new Error("[nwks-encounter] the Lookout ambiguous turn needs two candidates sharing a first name");
}

// ── The stage script ────────────────────────────────────────────────────
export const stages = defineStages([
  {
    shape: "beats",
    id: "admin-panel",
    title: "The administration panel, recreated",
    kicker: "Six tabs, one system. Tap any of them, or take the tour.",
    skin: "nwks-mens",
    narration: {
      label: "Recreation · demonstration data",
      description:
        "A recreation of the NWKS Encounter administration panel: the dashboard, the attendee " +
        "roster and waitlist, the volunteer team sheet, the cabin board, the email workbench, and " +
        "the Lookout AI assistant, drawn in the panel's own colours. Every name, town, date and " +
        "message shown is invented for this demonstration.",
    },
    beats: [
      {
        kind: "screen",
        id: "panel",
        caption: "Registration to roster, one system: Men's Encounter 2027.",
        chrome: "NWKS Admin · Men's Encounter 2027",
        tabs: [
          {
            id: "dashboard",
            label: "Dashboard",
            description: "The dashboard: sign-up status, attendee counts, payment, launch locations and shirt sizes.",
            before: {
              caption:
                "Sign-ups ran on a WordPress site pointed at Google Forms, and a full weekend stopped taking " +
                "people; the waitlist was worked by telephone.",
            },
            tourCaption: "One screen answers 'how full are we, and who is coming from where.'",
            steps: [
              { caption: "Sign-up status: Attendee sign-ups full, server sign-ups open." },
              { caption: "The stat cards count up: attendees, servers, first-timers, dropped." },
              { caption: "Attendee depth fills in, oldest-attendance-first." },
              { caption: "By launch location: town by town, tallest last." },
            ],
          },
          {
            id: "attendees",
            label: "Attendees",
            description: "The attendee roster: registered, wait list and dropped, with a two-click drop confirm.",
            before: {
              caption: "Everything after the form was retyped by hand, and a full weekend turned men away by phone.",
            },
            tourCaption: "A waitlist that works itself, and a drop that never loses the paper trail.",
            steps: [
              { caption: "The registered list fills in, row by row." },
              { caption: "A drop: reason box opens, then Confirm drop." },
              { caption: "Switch to Wait List: one pending review, one true wait-list row." },
              { caption: "Give the seat: the offered row's status updates." },
            ],
          },
          {
            id: "org-sheet",
            label: "Org Sheet",
            description: "The volunteer team board: teams drafted from the ministry's own history, and a duplicate-name check.",
            before: {
              caption: "The volunteer team sheet was a workbook re-typed each cycle, names hand-keyed into a spare column.",
            },
            // No year count: how many past sheets the ministry has is a fact
            // about the live history, never published (ADR-0017 §3).
            tourCaption: "The ministry's own past sheets, drafting this year's teams before anyone touches it.",
            steps: [
              { caption: "It reads the ministry's past sheets before it places anyone." },
              { caption: "A returning server stays where he served last time." },
              { caption: "A trade team is filled from its own men before anyone new." },
              { caption: "Team size follows what the years show, not an average." },
              { caption: "First-timers land on the meal shifts, not the trades." },
              { caption: "The system checks its own sheet: two spellings, one man." },
            ],
          },
          {
            id: "cabins",
            label: "Cabins",
            description: "The cabin board: one cabin recreated to scale, with a still-to-place pool and a drag move.",
            before: {
              caption: "Room assignments were one hundred percent manual: a spreadsheet rebuilt from scratch every cycle.",
            },
            tourCaption: "A camp seen from above: drag anyone, from a bed to another bed.",
            steps: [
              { caption: "It starts from an empty cabin, before anyone is placed." },
              { caption: "The board drafts on arrival: beds fill in." },
              { caption: "Still to place: a small remainder waits." },
              { caption: "One move, by hand: a chip lifts, then lands." },
              { caption: "Everyone has a bed." },
            ],
          },
          {
            id: "email",
            label: "Email",
            description: "The email workbench: templates, the letter, and who this send reaches.",
            before: {
              caption: "Launch-point details were personally emailed to every sign-up, one to two days apart, by hand.",
            },
            tourCaption: "One letter, merged per reader, sent to exactly who it should reach.",
            steps: [
              { caption: "A template is picked; the letter populates." },
              { caption: "Insert field: a merge token renders as a pill." },
              { caption: "Narrowed to servers, one launch point; the count updates." },
              { caption: "Send to this audience: a confirmation follows." },
            ],
          },
          {
            id: "lookout",
            label: "Lookout",
            description: "Lookout AI: a plain question about anyone on the roster, with ambiguous names offered as chips.",
            tourCaption: "Ask a plain question about anyone on the roster.",
            steps: [
              { caption: "A question is typed and sent." },
              { caption: "A brief trace shows what it checked." },
              { caption: "The answer streams in as prose." },
              { caption: "One name is ambiguous: two chips, unselected." },
            ],
          },
        ],
      },
    ],
  },
]);
