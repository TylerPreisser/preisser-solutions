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
    w("Kendra", "Holtzclaw"),
    w("Lacey", "Mortell"),
    w("Shauna", "Pettibone"),
    w("Alicia", "Dorrance"),
    w("Corinne", "Vashaw"),
    w("Megan", "Strandquist"),
    w("Paige", "Lindholt"),
    w("Renee", "Oberlander"),
    w("Tara", "Weisgerber"),
    w("Hollie", "Carvell"),
    w("Danae", "Fairbrother"),
    w("Kristen", "Ahlgrimm"),
    w("Leah", "Sundgren"),
    w("Dawn", "Mettlach"),
    w("Joelle", "Brandvik"),
    w("Corrie", "Ashbaugh"),
  ],
  businesses: [],
  towns: [],
  domains: [],
  vocabulary: [
    "Women's", "Encounter", "Cabin", "Cabins", "Lower", "Upper", "Floor", "Left", "Right", "Full",
    "Server", "SERVER", "Invited", "Auto-fill", "Needs", "Launch", "Sandwich", "Turkey", "T-shirt",
    "Shirt", "Sign", "Print", "Printed", "Beds", "Bed", "Free", "Name", "Bunk", "AI",
  ],
  approved: [],
  assets: [],
};
