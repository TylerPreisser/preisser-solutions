// src/data/demos/invented/nwks-admin.ts
// The NWKS Encounter admin stills (design-spec-r2 §6.3, §6.5). Same scope as nwks-encounter.ts, so the
// NWKS page may draw these too. Pure data: the privacy probe imports this file directly. No runtime imports.
//
// scripts/capture-nwks-admin.mjs seeds the admin's local database with the invented roster and towns
// from nwks-encounter.ts (by position), so the stills hold no new people or places. What is listed
// here is the admin's own interface vocabulary as its stills draw it, and the roster's initials on
// the cabin board's pins. tests/demo-privacy.probe.mjs reads each still's words manifest against
// this allowlist and the private deny list (spec §7.2 #18).
import type { InventedSet } from "../_invented";

export const invented: InventedSet = {
  scope: "nwks-encounter",
  people: [],
  businesses: [],
  towns: [],
  domains: [],
  vocabulary: [
    // Navigation, buttons and headings of the admin.
    "Badges", "Labels", "Tags", "TAGS", "Forms", "Web", "Page", "Editor", "Search", "Edit", "Undo", "Close",
    "Closes", "Download", "Options", "Start", "Pick", "Try", "Rebuild", "Rerunning", "Showing", "Viewing",
    "Fewest", "Confirmed", "Interest", "Express", "Reaching", "Produced", "Testimonies", "Teachings",
    // The weekend's own words: the season, the men's weekend, the lodge and its team captains.
    "Fall", "Men", "MEN", "Lodge", "Captains",
    // Print sheets: the label stock (a product line, not a person), shirt sizes, the bag tag.
    "Avery", "SKU", "XXL", "XXXL", "Tear", "LANYARDS", "BAG", "BLACK",
    // The admin truncates a long town to "Kestrel Be..." / "Birchwood ...": halves of invented towns.
    "Kestrel", "Birchwood", "Be",
    // Initials on the cabin board's pins, from the invented roster in nwks-encounter.ts.
    "BH", "BL", "CA", "CB", "CH", "DA", "DO", "DR", "ES", "GA", "GP", "GT", "HV", "HW", "LK", "LS", "MC",
    "MO", "NF", "OB", "OS", "PH", "PW", "RK", "SR",
  ],
  approved: [],
  assets: [],
};
