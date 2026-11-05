// src/data/demos/invented/duffer-command-center.ts
// The Duffer Golf "Command Center" stills and the QR story (design-spec-r2 §6.2, §6.4, §3.5).
// Same scope as duffer-golf.ts, so the Duffer page may draw these too. Pure data: the privacy probe
// imports this file directly. No runtime imports.
//
// The captured panel's own fixtures named dealers, shops, people and towns that were never checked
// (and one real dealer): scripts/capture-duffer-cc.mjs swaps every one, by position, for the names
// below and in duffer-golf.ts. tests/demo-privacy.probe.mjs reads each still's words manifest
// against this allowlist and the private deny list (spec §7.2 #18).
import type { InventedSet } from "../_invented";

const REUSED =
  "reused from src/data/demos/invented/nwks-encounter.ts (the 48-man roster, web-checked by the team lead " +
  '2026-09-28: "<full name> Kansas", CLEAR); an invented person, here a partner course\'s contact';
const COMPOSED =
  "composed of a town already checked in duffer-golf.ts (2026-10-31 Bing exact-phrase, no Kansas place or course) " +
  "and a generic word; not separately web-checked";

export const invented: InventedSet = {
  scope: "duffer-golf",
  people: [
    { id: "dcc-hal-wendorf", first: "Hal", last: "Wendorf", checked: REUSED },
    { id: "dcc-marty-ostrand", first: "Marty", last: "Ostrand", checked: REUSED },
    { id: "dcc-len-kessinger", first: "Len", last: "Kessinger", checked: REUSED },
    { id: "dcc-owen-stricklin", first: "Owen", last: "Stricklin", checked: REUSED },
    { id: "dcc-pete-harwell", first: "Pete", last: "Harwell", checked: REUSED },
  ],
  businesses: [
    { id: "dcc-osgood-bend-cc", name: "Osgood Bend Country Club", checked: COMPOSED },
    { id: "dcc-brannick-range", name: "Brannick Driving Range", checked: COMPOSED },
    { id: "dcc-tull-prairie-supply", name: "Tull Prairie Golf Supply", checked: COMPOSED },
    { id: "dcc-brannick-supply", name: "Brannick Golf Supply", checked: COMPOSED },
  ],
  towns: [],
  domains: [
    { id: "dcc-duffer", domain: "duffer.example" },
    { id: "dcc-sumac", domain: "sumachollow.example" },
    { id: "dcc-cottonwood", domain: "lonecottonwood.example" },
    { id: "dcc-wheatgrass", domain: "wheatgrasspines.example" },
    { id: "dcc-osgood", domain: "osgoodbendcc.example" },
    { id: "dcc-brannick", domain: "brannickrange.example" },
  ],
  // The Command Center's own labels, as its stills draw them (panel bundle on its fixtures), and the
  // QR story's. None is a person, a business or a place.
  vocabulary: [
    "Outreach", "Golf", "Commission", "Check", "Simulator", "Enclosure", "Electronics", "Engaged", "Driving",
    "Contact", "Active", "Updated", "Record", "Payout", "Payouts", "Notes", "Needs", "Day", "Daily", "Top",
    "Road", "Retired", "Range", "Prefers", "Placed", "Pays", "Paused", "Owed", "Manage", "Head", "Download",
    "Distinct", "Dealer", "Country", "Conversion", "Clubhouse", "Club", "Change", "Address", "Actions", "ZIP",
    "Website", "Void", "Visits", "Times", "Text", "State", "Sort", "Sold", "Slug", "Since", "Signup", "Signed",
    "Show", "Search", "Sales", "SVG", "PNG", "Routed", "Release", "Refunded", "Referral", "Reassign", "Product",
    "Printed", "Printable", "Preview", "Phone", "Overridden", "Order", "Newest", "Name", "Link", "Kind",
    "Joined", "Holder", "Fix", "Facility", "Evidence", "Edit", "Credited", "Create", "Correct", "Copy",
    "Clawback", "Claimed", "City", "Choose", "Business", "Awaiting", "Windows", "Supply", "Paid", "Scanned",
    // Order references (DG-0001) and the QR story's referral code.
    "DG", "SUMAC",
    // The duffergolf.net hero the QR story's phone opens (Duffer's own published copy).
    "FULL", "GOLF", "BAY", "GARAGE", "AGAIN",
  ],
  approved: [],
  assets: [],
};
