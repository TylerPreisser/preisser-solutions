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
  // The COI story's cast (ADR-0022 §4; coi-engine-flow.md section 6): the
  // vendor's owner and his insurance agent. Invented.
  people: [
    { id: "hg-coi-dale", first: "Dale", last: "Wenberg", checked: PENDING },
    { id: "hg-coi-marcy", first: "Marcy", last: "Tillotson", checked: PENDING },
  ],
  businesses: [
    // The COI story (src/data/showcase/scenes/hg-coi.ts): the vendor, its
    // agency and the two insurers printed on its certificate.
    { id: "prairie-dog-pumping", name: "Prairie Dog Pumping, LLC", aliases: ["Prairie Dog Pumping"], checked: PENDING },
    { id: "smoky-valley-insurance", name: "Smoky Valley Insurance", checked: PENDING },
    { id: "larkspur-ridge-casualty", name: "Larkspur Ridge Casualty Company", checked: PENDING },
    { id: "ninebark-mutual", name: "Ninebark Mutual Insurance Company", checked: PENDING },
    // Vendor insurance (COI): vendors and the one insurance agency.
    { id: "chalk-bluff-hot-oil", name: "Chalk Bluff Hot Oil", checked: PENDING },
    { id: "ironweed-water-hauling", name: "Ironweed Water Hauling", checked: PENDING },
    { id: "red-cedar-roustabout", name: "Red Cedar Roustabout", checked: PENDING },
    { id: "buckbrush-pipe-supply", name: "Buckbrush Pipe & Supply", checked: PENDING },
    { id: "quarry-hill-welding", name: "Quarry Hill Welding", checked: PENDING },
    { id: "marlowe-prairie-insurance-group", name: "Marlowe Prairie Insurance Group", checked: PENDING },
    // Saltwater close (SWD): disposal operators.
    { id: "cedar-draw-disposal", name: "Cedar Draw Disposal", checked: PENDING },
    { id: "kettle-creek-water", name: "Kettle Creek Water Services", checked: PENDING },
    { id: "sandhill-injection", name: "Sandhill Injection", checked: PENDING },
    { id: "low-ridge-disposal", name: "Low Ridge Disposal", checked: PENDING },
    { id: "thornbush-water", name: "Thornbush Water Services", checked: PENDING },
    { id: "copper-flats-disposal", name: "Copper Flats Disposal", checked: PENDING },
  ],
  towns: [
    // Copied from the NWKS set, where both were web-checked clear (2026-09-28).
    { id: "hg-aldervale", name: "Aldervale", checked: "invented; web-checked clear for the NWKS set 2026-09-28" },
    { id: "hg-emberton", name: "Emberton", checked: "invented; web-checked clear for the NWKS set 2026-09-28" },
    // The certificate holder's address is a placeholder on purpose: the
    // scene never prints HG Oil's real mailing address (lead brief 2026-11-03).
    { id: "hg-anytown", name: "Anytown", checked: "generic placeholder town, used so the holder block shows no real address" },
  ],
  domains: [
    { id: "hg-coi-mailbox", domain: "hgoil.example" },
    { id: "hg-coi-vendor", domain: "prairiedogpumping.example" },
    { id: "hg-coi-agency", domain: "smokyvalley.example" },
  ],
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
    "Asking", "Certificates", "Confirmed", "Down", "General", "Matches", "Ready", "Tie",
    // "A/P" splits into "A" and "P"; the sheet's spreadsheet tab mark is an "X".
    "P", "X",
    // The COI story (src/data/showcase/scenes/hg-coi.ts): its step titles,
    // controls, mail-client and panel words, the avatar initials of its
    // invented cast and of the signature (Dale Wenberg, Marcy Tillotson,
    // Tyler Preisser), and the generic address parts on the certificate.
    "About", "Accepted", "Answers", "Asked", "Asks", "Best", "Build", "Cc", "Checked", "Dates",
    "Ended", "Endorsements", "Filed", "Finds", "Form", "Highlighted", "I", "Insurers", "Invoiced",
    "Keeps", "Last", "Meaning", "Never", "Oil", "Operations", "Passed", "Per", "Please", "Policies",
    "Previous", "Quoted", "Re", "Readable", "Reads", "Remarks", "Reminder", "Still", "Thanks",
    "Umbrella", "Verdict", "Written", "AM", "PM", "DW", "MT", "TP", "KS", "PO", "County", "Road",
    "Main", "St", "W", "Box", "Files", "Follows",
    // The Vendor Insurance scene (ADR-0025 §2): its step names, controls and
    // checklist words, and the "M" of "$1M".
    "Arrives", "Good", "Play", "Effective", "Expires", "M",
    // The printed ACORD 25 (2016/03) form's own labels and fine print, and the
    // invented policy and certificate numbers typed on it.
    "ABOVE", "ACCIDENT", "ACCORDANCE", "ADDL", "ADDRESS", "ADV", "AFFIRMATIVELY", "AFFORDED",
    "AFFORDING", "AGG", "AGGREGATE", "ALTER", "AMEND", "APPLIES", "AS", "AUTHORIZED", "AUTOMOBILE",
    "AUTOS", "B", "BA", "BE", "BEEN", "BELOW", "BETWEEN", "BODILY", "C", "CANCELLATION", "CANCELLED",
    "CERTIFY", "CL2510417", "CL2611052", "CLAIMS", "COMBINED", "COMMERCIAL", "COMP", "COMPENSATION",
    "CONDITION", "CONDITIONS", "CONFERS", "CONSTITUTE", "CONTRACT", "CORPORATION", "COVERAGE",
    "COVERAGES", "CPP", "CU", "D", "DAMAGE", "DD", "DED", "DELIVERED", "DESCRIBED", "DESCRIPTION",
    "DISEASE", "DOCUMENT", "DOES", "E", "E.L", "EFF", "EMPLOYEE", "EMPLOYERS", "ER", "EXCESS",
    "EXCLUDED", "EXCLUSIONS", "EXECUTIVE", "EXP", "EXPIRATION", "EXTEND", "Ext", "F", "FAX", "GEN'L",
    "HAVE", "HEREIN", "HIRED", "IMPORTANT", "INDICATED", "INFORMATION", "INJURY", "INSD", "INSR",
    "INSURANCE", "INSURER", "IS", "ISSUED", "ISSUING", "JECT", "LIAB", "LIABILITY", "LIMIT", "LIMITS",
    "LISTED", "LOC", "LOCATIONS", "LTR", "MADE", "MATTER", "MED", "MEMBER", "MM", "Mandatory", "N",
    "NAIC", "NAME", "NAMED", "NEGATIVELY", "NH", "NON", "NOTICE", "NOTWITHSTANDING", "NUMBER", "OCCUR",
    "OCCURRENCE", "OFFICER", "OP", "OPERATIONS", "OTH", "OWNED", "PARTNER", "PER", "PERIOD", "PERSONAL",
    "PERTAIN", "PHONE", "POLICIES", "PREMISES", "PRO", "PRODUCTS", "PROPERTY", "PROPRIETOR",
    "PROVISIONS", "REDUCED", "RENTED", "REPRESENTATIVE", "REQUIREMENT", "RESPECT", "RETENTION",
    "REVISION", "RIGHTS", "S", "SCHEDULED", "SHOULD", "SHOWN", "SINGLE", "STATUTE", "SUBR",
    "SUBROGATION", "SUCH", "TERM", "TERMS", "THEREOF", "TYPE", "UMBRELLA", "UPON", "VEHICLES",
    "WAIVED", "WC", "WILL", "WVD", "Y", "YYYY",
  ],
  approved: [
    { name: "HG Oil Holdings", source: "docs/CANONICAL-PROJECTS.md: HG Oil Holdings, full name publishable" },
    { name: "HG Oil", source: "docs/CANONICAL-PROJECTS.md: HG Oil Holdings, full name publishable" },
    // The COI emails are signed as the engine signs them (coiRules.js:78-79).
    { name: "Tyler Preisser", source: "docs/CANONICAL-PROJECTS.md:27: Tyler Preisser, founder" },
  ],
  // The Vendor Insurance scene's certificate (scripts/render-acord.mjs): the
  // Acord25 component drawn with the invented data in
  // src/data/showcase/scenes/hg-vendor.ts (every name on it is registered above).
  assets: [
    { path: "/images/demos/hg-oil/acord25-prairie-dog.png", provenance: "scripts/render-acord.mjs: Acord25.tsx + hg-vendor.ts VENDOR_CERT, invented data only" },
    { path: "/images/demos/hg-oil/acord25-prairie-dog-thumb.webp", provenance: "scripts/render-acord.mjs: the same render, 408 x 528" },
  ],
};
