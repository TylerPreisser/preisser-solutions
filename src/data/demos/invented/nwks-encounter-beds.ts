// src/data/demos/invented/nwks-encounter-beds.ts
// Invented women for the NWKS Encounter showcase bed-board scene ONLY (scope
// nwks-encounter, alongside the case study's own set). Pure data:
// tests/demo-privacy.probe.mjs imports this file directly. No runtime imports.
//
// Invented in this lane, never lifted from any seed, fixture or screenshot.
// Checks, 2026-11-01 (showcase-scenes lane): every name was checked against
// the private deny list (no hit). The web check is OWED: Bing html returned no
// results at all, DuckDuckGo answered twice (a known-real control hit, and one
// first pick turned out to be a real person and was dropped) and then blocked,
// and Bing RSS ignores the quotes (a known-real control came back clear). A
// check that cannot fail was not counted. Each name needs "<name>" Kansas
// searched before this set ships; `checked` says so until then.
// Round 7 (2026-11-01): four names were swapped because they sounded like
// real people or a notorious case: the first sign-up's inviter (it read as the
// real Women's Encounter admin) became Maren Kittredge, and the other three
// became Greta, Haverkamp and Ostrander (the old spellings are not kept here).
// The new names were checked against the deny list and the names in the NWKS
// memory notes: no exact hit and no sound-alike.
// Round 9 (2026-11-01): two common first names that a Women's Encounter
// reader could pause on were swapped for Sadie and Thea, which appear nowhere
// in the deny list, the private Women's Encounter files or the NWKS notes
// (the same search does find the two names they replace).
import type { InventedSet } from "../_invented";

const PENDING =
  'deny list: no hit (2026-11-01). Web check OWED: search engines rate-limited this PC on 2026-11-01; search "<full name>" Kansas before shipping';

const w = (first: string, last: string) => ({
  id: `nwf-${first}-${last}`.toLowerCase(),
  first,
  last,
  checked: PENDING,
});

export const invented: InventedSet = {
  scope: "nwks-encounter",
  people: [
    w("Brynn", "Delacourt"),
    w("Tessa", "Ammerling"),
    w("Kendra", "Ostrander"),
    w("Lacey", "Mortell"),
    w("Maren", "Kittredge"),
    w("Alicia", "Dorrance"),
    w("Corinne", "Vashaw"),
    w("Megan", "Strandquist"),
    w("Paige", "Lindholt"),
    w("Sadie", "Oberlander"),
    w("Tara", "Weisgerber"),
    w("Hollie", "Carvell"),
    w("Greta", "Fairbrother"),
    w("Thea", "Ahlgrimm"),
    w("Leah", "Sundgren"),
    w("Dawn", "Mettlach"),
    w("Joelle", "Haverkamp"),
    w("Corrie", "Ashbaugh"),
  ],
  businesses: [],
  towns: [],
  domains: [],
  vocabulary: [
    "Women's", "Encounter", "Cabin", "Cabins", "Lower", "Upper", "Floor", "Left", "Right", "Full",
    "Server", "SERVER", "Invited", "Auto-fill", "Needs", "Launch", "Sandwich", "Turkey", "T-shirt",
    "Shirt", "Sign", "Print", "Printed", "Beds", "Bed", "Free", "Name", "Bunk", "AI",
    // "Auto-fill" and "T-shirt" split on the hyphen; "Women's" loses its "'s".
    "Auto", "Custom", "Need", "T", "Women",
    // The phone board's short bed names (L1 = Lower 1) and the printed map's U / L / F (Upper, Lower, Full).
    "L1", "L2", "L3", "L4", "L5", "U1", "U2", "U3", "U4", "U5", "U", "L", "F", "None", "needed", "nobody", "No", "one", "floor",
  ],
  approved: [],
  assets: [],
};
