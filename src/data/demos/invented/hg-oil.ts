// src/data/demos/invented/hg-oil.ts
// Invented names for the HG Oil showcase scenes (vendor insurance and the
// saltwater close) ONLY. Pure data: tests/demo-privacy.probe.mjs imports this
// file directly. No runtime imports.
//
// Checks, 2026-11-01 (showcase-scenes lane): every name was checked against
// the private deny list (no hit). The web check is OWED: Bing html returned no
// results at all, DuckDuckGo answered twice (a known-real control hit, and one
// first pick turned out to be a real person and was dropped) and then blocked,
// and Bing RSS ignores the quotes (a known-real control came back clear). A
// check that cannot fail was not counted. Each name needs "<name>" Kansas
// searched before this set ships; `checked` says so until then.
import type { InventedSet } from "../_invented";

const PENDING =
  'deny list: no hit (2026-11-01). Web check OWED: search engines rate-limited this PC on 2026-11-01; search "<name>" Kansas before shipping';

export const invented: InventedSet = {
  scope: "hg-oil",
  people: [],
  businesses: [
    // Vendor insurance (COI): vendors and the one insurance agency.
    { id: "chalk-bluff-hot-oil", name: "Chalk Bluff Hot Oil", checked: PENDING },
    { id: "ironweed-water-hauling", name: "Ironweed Water Hauling", checked: PENDING },
    { id: "red-cedar-roustabout", name: "Red Cedar Roustabout", checked: PENDING },
    { id: "buckbrush-pipe-supply", name: "Buckbrush Pipe & Supply", checked: PENDING },
    { id: "quarry-hill-welding", name: "Quarry Hill Welding", checked: PENDING },
    { id: "plainsview-insurance-group", name: "Plainsview Insurance Group", checked: PENDING },
    // Saltwater close (SWD): disposal operators.
    { id: "cedar-draw-disposal", name: "Cedar Draw Disposal", checked: PENDING },
    { id: "kettle-creek-water", name: "Kettle Creek Water Services", checked: PENDING },
    { id: "sandhill-injection", name: "Sandhill Injection", checked: PENDING },
    { id: "low-ridge-disposal", name: "Low Ridge Disposal", checked: PENDING },
    { id: "thornbush-water", name: "Thornbush Water Services", checked: PENDING },
    { id: "copper-flats-disposal", name: "Copper Flats Disposal", checked: PENDING },
  ],
  towns: [],
  domains: [],
  // Capitalised UI and industry words these scenes print; none names a person,
  // business or place.
  vocabulary: [
    "HG", "AI", "COI", "SWD", "BPD", "ACORD", "LLC", "GL", "AP", "PDF", "PDFs", "PAY",
    "WP1026", "Lease", "Vendor", "Vendors", "Covered", "Expiring", "Needs", "Run", "Tie-out",
    "Told", "Paid", "Delta", "Held", "Statement", "Statements", "Controller", "Accounting",
    "Certificate", "Insured", "Producer", "Holder", "Auto", "Workers", "Statutory", "Yes",
    "Additional", "Policy", "Mar", "October", "Attached", "Found", "Contact", "Mark", "Ask",
    "Annual", "Read", "Backup", "Month", "Water", "Figures", "Days", "Rate", "Fixed", "Min",
    "Barrels", "Invoice", "Invoices", "Says", "Not", "Searching", "Inbox", "Package", "Agent",
    "Subject", "Hi", "We're", "Could", "Thank", "Automation", "Close", "Sheet", "Field",
  ],
  approved: [
    { name: "HG Oil Holdings", source: "docs/CANONICAL-PROJECTS.md: HG Oil Holdings, full name publishable" },
    { name: "HG Oil", source: "docs/CANONICAL-PROJECTS.md: HG Oil Holdings, full name publishable" },
  ],
  assets: [],
};
