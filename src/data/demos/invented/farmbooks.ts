// src/data/demos/invented/farmbooks.ts
// Invented names for /case-studies/farmbooks ONLY (ADR-0016 §5). Pure data:
// tests/demo-privacy.probe.mjs imports this file directly. No runtime imports.
//
// This is a Preisser Solutions page about FarmBooks, a real, named client (approved
// below, not invented). Everything ELSE a reader sees inside the stage — the farm,
// every vendor name, every field name — is invented and searched before being
// registered, per the process at src/data/demos/_invented.ts.
//
// The nine vendor renames and the farm name were checked by the lead 2026-09-28
// (WebSearch, exact-phrase queries) and are FINAL — see
// ~/.claude/agent-reports/ps-showcase-initiative/spec-FB.md §5a for the full
// candidate history (rejected names, why). Field/place names below are not
// businesses or towns; they are generic land-parcel names in the style the
// product's own workbook uses ("Home Quarter", "Creek Bottom", …), registered
// here under `towns` only because that is the closest shape this registry has
// for a short, capitalised place-like phrase — the probe treats every category
// identically as a phrase to allow, so the mis-fit label costs nothing.
import type { InventedSet } from "../_invented";

export const invented: InventedSet = {
  scope: "farmbooks",
  people: [],
  businesses: [
    {
      id: "coyote-draw-farms",
      name: "Coyote Draw Farms",
      aliases: [],
      checked:
        "2026-09-28 web: no Kansas or US farm operation by this name found. Replaces the placeholder farm name " +
        "used in FarmBooks' own showcase, which the lead's check found collides with a real Salina KS CSA " +
        "(never repeated here or on the private deny list). A second candidate was considered and rejected as " +
        "too close to a different real Kansas farm; full candidate history in spec-FB.md §5a (outside this repo).",
    },
    {
      id: "prairie-general-farm-supply",
      name: "Prairie General Farm Supply",
      aliases: [],
      checked:
        "2026-09-28 web: no business of this exact name found (only a differently-worded farm-supply business " +
        "in MN). This is the vendor name printed on the photographed sample bill (public/samples/fuel-ticket-" +
        "photo.jpg in the FarmBooks repo, sha 8cbbbb4) and was already invented before this transplant; kept " +
        "and re-cleared here rather than renamed, because the photograph's own pixels print it and cannot be " +
        "relabeled.",
    },
    {
      id: "cutbank-ag-supply",
      name: "Cutbank Ag Supply",
      aliases: [],
      checked: "2026-09-28 web: no Kansas farm-supply business by this name found. Replaces a real, findable co-op-family name; see spec-FB.md §5a.",
    },
    {
      id: "sagebrook-coop",
      name: "Sagebrook Co-op",
      aliases: [],
      checked: "2026-09-28 web: no Kansas co-op by this name found. Replaces a real, findable co-op name; see spec-FB.md §5a.",
    },
    {
      id: "loess-ridge-ag-solutions",
      name: "Loess Ridge Ag Solutions",
      aliases: [],
      checked:
        "2026-09-28 web: no Kansas ag-solutions business by this name found. Replaces a real, findable ag-solutions company name; see spec-FB.md §5a.",
    },
    {
      id: "dry-fork-coop",
      name: "Dry Fork Co-op",
      aliases: [],
      checked:
        "2026-09-28 web: no Kansas co-op by this name found (a first-choice candidate was rejected as too close " +
        "to a real Sterling KS co-op). Replaces a real, findable Kansas co-op name; see spec-FB.md §5a.",
    },
    {
      id: "switchgrass-agri-enterprises",
      name: "Switchgrass Agri-Enterprises",
      aliases: [],
      checked:
        "2026-09-28 web: no Kansas business by this name found (a first-choice candidate was rejected as too " +
        "close to a real Emporia KS farm-supply business). Replaces a real, findable agri-enterprises name; see spec-FB.md §5a.",
    },
    {
      id: "homestead-rural-energy",
      name: "Homestead Rural Energy",
      aliases: [],
      checked: "2026-09-28 web: clear, kept as first proposed. Replaces a real, findable Kansas rural-energy company name; see spec-FB.md §5a.",
    },
    {
      id: "shortgrass-mutual-insurance",
      name: "Shortgrass Mutual Insurance",
      aliases: [],
      checked:
        "2026-09-28 web: no Kansas insurer by this name found (a first-choice candidate was rejected as a real " +
        "insurer in IL and MN). Replaces a real, findable Kansas farm-insurer name; see spec-FB.md §5a.",
    },
    {
      id: "ironrow-equipment",
      name: "Ironrow Equipment",
      aliases: [],
      checked: "2026-09-28 web: clear. Replaces a real, findable equipment-dealer name; see spec-FB.md §5a.",
    },
    {
      id: "furrowline-equipment-finance",
      name: "Furrowline Equipment Finance",
      aliases: [],
      checked:
        "2026-09-28 web: no business by this name found (a first-choice candidate was rejected as a real, " +
        "differently-named equipment company). Replaces a real, findable equipment-finance brand name; see spec-FB.md §5a.",
    },
  ],
  towns: [
    { id: "home-quarter", name: "Home Quarter", checked: "generic invented field name, not a place search" },
    { id: "creek-bottom", name: "Creek Bottom", checked: "generic invented field name, not a place search" },
    { id: "east-half", name: "East Half", checked: "generic invented field name, not a place search" },
    { id: "north-80", name: "North 80", checked: "generic invented field name, not a place search" },
    { id: "shop-and-yard", name: "Shop & Yard", checked: "generic invented field name, not a place search" },
    { id: "general-expenses", name: "General Expenses", checked: "generic invented ledger bucket, not a place search" },
    {
      id: "sundown-quarter",
      name: "Sundown Quarter",
      checked:
        "generic invented field name, in the sibling fields' own style (Home Quarter, East Half, North 80). " +
        "Replaces a section-township-range legal land description with a highway reference that appeared in " +
        "FarmBooks' own showcase source; no such string, and no highway reference, appears here (that exact " +
        "string is on the private deny list).",
    },
  ],
  domains: [],
  vocabulary: [
    // Canonical Schedule-F category words this scene's copy uses that are not already in
    // tests/demo-privacy/common-words.txt. Real, generic accounting/agriculture vocabulary —
    // never a client identifier.
    "Oil",
    "Lime",
    "Chemicals",
    "Maintenance",
    "Utilities",
    "Irrigation",
    "Custom",
    "Hire",
    "Insurance",
    "Interest",
    "Freight",
    "Trucking",
    "Supplies",
    "Co",
    "Diesel",
    "Herbicide",
    "Hydraulic",
    "Fluid",
    "Corn",
    "Tractor",
    "Grange",
    // Scene-local proper nouns and vocabulary that name no real, third-party entity.
    "Prairie",
    "General",
    "Farm",
    "Supply",
    // Ordinary sentence-initial or printed-bill words the copy in this stage uses; none name a
    // person, business or place. Registered here (rather than the shared common-words.txt, which
    // this lane does not edit) so a capitalised, generic English word doesn't read as an unknown name.
    "Light",
    "Enough",
    "Frame",
    "Focus",
    "Sharp",
    "Where",
    "GAL",
    "BAGS",
    "MIX",
    "JUG",
    "TICKET",
    "Difference",
    "CPA",
    "Add",
    "Anhydrous",
    "Dry",
    "Sum",
    "Off",
    "Billed",
    "Delivery",
    "Already",
    "Exports",
    "Documents",
    "Matches",
    "Plants",
    "Tailgate",
  ],
  approved: [
    {
      name: "FarmBooks",
      source: "src/data/case-studies/farmbooks.ts clientName, the real, named client this case study is about",
    },
    { name: "Schedule F", source: "the real IRS tax schedule this product's categories map onto; a public term of art" },
  ],
  assets: [
    {
      path: "/images/demos/farmbooks/fuel-ticket-photo.jpg",
      provenance:
        "Farm Invoice Processing System/web/public/samples/fuel-ticket-photo.jpg @8cbbbb4, a photograph the " +
        "FarmBooks team staged of an invented bill (invented vendor, invented amounts) on a truck tailgate. " +
        "Copied byte-for-byte, not re-rendered. Two things print in its pixels that are not otherwise repeated " +
        "in this scene's markup: a placeholder payer name and a small invented account number, and a short line " +
        "of garbled, evidently AI-generation-artifact text near the bottom. All three are pre-existing in the " +
        "source photograph; see SOURCE.md.",
    },
  ],
};
