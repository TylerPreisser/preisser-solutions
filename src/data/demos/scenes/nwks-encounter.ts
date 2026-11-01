// src/data/demos/scenes/nwks-encounter.ts — sample data for the NWKS Encounter
// showcase scene (a Women's Encounter sign-up finds its bed). Pure data.
//
// Every woman is INVENTED and registered in
// src/data/demos/invented/nwks-encounter-beds.ts (web-checked, deny-list
// checked); never a real attendee, server or leader. Launch points are the
// case study's invented towns, never the real ones. Shapes follow the real
// bed board (~/.claude/agent-reports/nwks-wow-brief-2026-11-01.md sections 2,
// 3, 5): "Needs a bed" grouped by launch point, chips Server / Invited by /
// Lower bunk, cabins of two ten-bed sides (Lower 1-5, Upper 1-5) plus floor
// mattresses, a Full bed tag on a non-twin lower, Auto-fill, and the printed
// cabin map with the footer "Left n of 10 · Right n of 10 · n on the floor".
import { person, town } from "../_invented";

export type Slot = { side: "left" | "right"; bed: string } | { side: "floor"; bed: "Floor" };

export interface Sleeper {
  id: string;
  name: string;
  first: string;
  town: string;
  server?: boolean;
  lower?: boolean;
  invitedBy?: string;
  slot: Slot;
}

const P = (id: string) => person(id);
const T = (id: string) => town(id).name;

const L = (bed: string): Slot => ({ side: "left", bed });
const R = (bed: string): Slot => ({ side: "right", bed });

const rows: readonly [string, string, Slot, { server?: boolean; lower?: boolean; invitedBy?: string }?][] = [
  ["nwf-brynn-delacourt", "emberton", L("Lower 1"), { lower: true, invitedBy: "nwf-shauna-pettibone" }],
  ["nwf-tessa-ammerling", "emberton", L("Upper 1")],
  ["nwf-kendra-holtzclaw", "aldervale", L("Lower 2"), { lower: true }],
  ["nwf-lacey-mortell", "aldervale", L("Upper 2")],
  ["nwf-shauna-pettibone", "emberton", L("Lower 3"), { server: true }],
  ["nwf-alicia-dorrance", "tollerton", L("Upper 3")],
  ["nwf-corinne-vashaw", "tollerton", L("Lower 4")],
  ["nwf-megan-strandquist", "emberton", L("Upper 4")],
  ["nwf-paige-lindholt", "fallowfield", R("Lower 1"), { lower: true }],
  ["nwf-renee-oberlander", "fallowfield", R("Upper 1")],
  ["nwf-tara-weisgerber", "aldervale", R("Lower 2")],
  ["nwf-hollie-carvell", "kestrel-bend", R("Upper 2")],
  ["nwf-danae-fairbrother", "tollerton", R("Lower 3"), { server: true }],
  ["nwf-kristen-ahlgrimm", "kestrel-bend", R("Upper 3")],
  ["nwf-leah-sundgren", "fallowfield", R("Lower 4"), { lower: true }],
  ["nwf-dawn-mettlach", "emberton", R("Upper 4")],
  ["nwf-joelle-brandvik", "aldervale", R("Lower 5"), { server: true }],
  ["nwf-corrie-ashbaugh", "tollerton", { side: "floor", bed: "Floor" }],
];

export const sleepers: readonly Sleeper[] = rows.map(([pid, tid, slot, o]) => {
  const p = P(pid);
  return {
    id: pid,
    name: p.full,
    first: p.first,
    town: T(tid),
    server: o?.server,
    lower: o?.lower,
    invitedBy: o?.invitedBy ? P(o.invitedBy).full : undefined,
    slot,
  };
});

/** The sign-up that types itself is the first sleeper. */
export const signup = {
  who: sleepers[0],
  sandwich: "Turkey, lettuce-wrapped unwich",
  shirt: "M",
} as const;

export const bedCounts = {
  left: sleepers.filter((s) => s.slot.side === "left").length,
  right: sleepers.filter((s) => s.slot.side === "right").length,
  floor: sleepers.filter((s) => s.slot.side === "floor").length,
};
if (bedCounts.left !== 8 || bedCounts.right !== 9 || bedCounts.floor !== 1) {
  throw new Error("[nwks scene] Cabin 1 must end Left 8 of 10 · Right 9 of 10 · 1 on the floor");
}
for (const s of sleepers) {
  if (s.lower && !(s.slot.side !== "floor" && s.slot.bed.startsWith("Lower"))) throw new Error(`[nwks scene] ${s.id} asked for a lower bunk`);
}

export const BEDS = ["Lower 1", "Upper 1", "Lower 2", "Upper 2", "Lower 3", "Upper 3", "Lower 4", "Upper 4", "Lower 5", "Upper 5"] as const;

/** Launch points in the order the list groups them, with a count each. */
export const launchPoints = (() => {
  const m = new Map<string, number>();
  for (const s of sleepers) m.set(s.town, (m.get(s.town) ?? 0) + 1);
  return [...m.entries()].map(([name, n]) => ({ name, n }));
})();

export const bedsCaptions = [
  "The sign-up asks the questions only your camp needs.",
  "The sign-up asks the questions only your camp needs.",
  "Each sign-up lands in the list of who still needs a bed.",
  "Auto-fill puts all 18 in beds and keeps every lower-bunk request.",
  "Then the cabin map prints, one page per building.",
] as const;

export const bedsCues = [250, 3100, 5000, 9200] as const;

export const bedsSummary =
  "Demonstration: the NWKS Women's Encounter bed board. A sign-up form fills in a launch point, a sandwich choice, a shirt size and a lower-bunk request, " +
  "the new sign-up joins 17 others in the list of who needs a bed, Auto-fill places all 18 in Cabin 1 with every lower-bunk request on a lower bed, " +
  "and the cabin map prints: Left 8 of 10, Right 9 of 10, 1 on the floor.";
