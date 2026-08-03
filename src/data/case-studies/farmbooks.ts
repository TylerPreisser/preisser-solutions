import type { CaseStudyData } from "@/types/case-study";

// FarmBooks — flagship AI Integration + Business Automation platform.
// Photograph a farm bill, get Schedule-F-ready books. Live at farm-books.com
// (Next.js 15 PWA on Cloudflare Workers) backed by a Python FastAPI extraction
// engine on Azure Container Apps with Cosmos DB. Numbers sourced from
// docs/plans/2026-08-02-three-pillar-reposition.md §9 — do not add figures
// beyond that list, and never state an extraction accuracy percentage.
export const caseStudy: CaseStudyData = {
  slug: "farmbooks",
  metaTitle: "FarmBooks — Schedule-F-Ready Books From a Photo",
  metaDescription:
    "Photograph a farm bill and get Schedule-F-ready books. Vision and OCR read every bill independently, cross-check each other, and route disagreements to a human.",
  datePublished: "2026-07-20",
  dateModified: "2026-08-02",

  category: "AI Integration • Business Automation",
  clientName: "FarmBooks",
  clientNameDisplay: "FarmBooks",
  industry: "Farm bookkeeping and Schedule F accounting",

  h1: "FarmBooks — Photograph a Bill, Get Schedule-F-Ready Books",
  subheadline:
    "Two independent reads of every bill — OCR and vision — have to agree on each section's total, or a human sees the disagreement instead of a silently dropped line.",
  oneLine: "Photograph a farm bill; two independent reads cross-check it into Schedule-F-ready books",

  headlineResults: [
    { value: "No retyping", label: "A photographed bill becomes a Schedule-F-ready entry" },
    { value: "$92.57", label: "Line the vision read recovered that OCR alone had dropped" },
    { value: "Every bill", label: "Cross-checked by two independent reads before it posts" },
    { value: "Always", label: "Handwritten bills routed to human review" },
  ],

  hub: {
    problem:
      "A farm bookkeeper retyped every co-op, dealer, chemical and fuel bill by hand, and a mis-keyed or dropped line only surfaced months later when the books would not reconcile.",
    built:
      "Photograph a bill and two independent reads have to agree on every section total before anything posts; allocation to field, entity and Schedule F category follows, and anything uncertain waits in a review queue.",
    outcome: "Tax-season bookkeeping without retyping a single bill",
  },

  before: {
    heading: "A farm bookkeeper retyping every co-op and dealer bill by hand.",
    body: [
      "Farm bookkeeping runs on paper that doesn't cooperate: co-op grain tickets, dealer parts invoices, chemical and seed bills, fuel statements, each with its own layout, and each one needing to be split across fields, entities, and IRS Schedule F categories before it means anything at tax time. The default tool is a spreadsheet and a bookkeeper retyping every line by hand.",
      "That retyping is where lines get missed. A bill with several sections and subtotals is easy to mis-key or drop a line from, and nothing catches it until the books don't reconcile — usually months later, at tax time, when tracing the error back to its source bill is its own project.",
    ],
  },

  built: {
    heading: "Two independent reads of every bill, checked against each other before anything posts.",
    body: [
      "FarmBooks starts with a photo or an upload. The bill goes through a layout/OCR extraction pass and a separate vision read at the same time, co-equally — neither is treated as the fallback for the other. Vendor detection, line-item extraction, and allocation to the right farm field and entity follow, then IRS Schedule F categorization, then a review queue for anything the system isn't confident about.",
      "The two reads are required to independently agree on each section's printed total. When they don't, the discrepancy surfaces for a human instead of a line silently vanishing into the ledger — in testing, the vision read recovered a $92.57 line that OCR alone had dropped. Handwritten bills skip auto-posting entirely and always land in the review queue. When a bookkeeper corrects a field or category assignment, that correction becomes a durable alias, so the same vendor resolves itself automatically the next time it shows up.",
      "Every bill also gets a plain-English one-line summary, and the equipment roster is inferred from VIN and serial numbers found on repair bills rather than asked for up front. One login covers multiple farms, each scoped to its own learning, so a correction on one farm doesn't bleed into another's aliases. Output is a formula-driven .xlsx — a Month Summary and a Ledger tab with live SUMIF rollups — with two-way sync to a real SharePoint workbook, where a human's edit always wins over an engine write.",
    ],
  },

  specifications: {
    heading: "How a bill moves from photo to posted ledger.",
    bullets: [
      "Upload or photograph a bill; OCR/layout extraction and a separate vision read run co-equally",
      "The two reads must independently agree on each section's total, or the discrepancy surfaces for review",
      "Vendor detection, line-item extraction, and allocation to farm field and entity",
      "IRS Schedule F categorization, with a review queue for anything uncertain",
      "Handwritten bills always route to human review — never auto-posted",
      "Bookkeeper corrections become durable aliases so the same vendor resolves itself next time",
      "Plain-English one-line summary generated for every bill",
      "Equipment roster inferred from VIN/serial numbers found on repair bills",
      "One login, multiple farms, each scoped to its own learning",
    ],
    subsections: [
      {
        title: "Extraction and reconciliation",
        items: [
          "OCR/layout extraction pass and an independent vision pass, co-equal",
          "Cross-check on each section's total before anything posts",
          "Discrepancies surface to a human review queue instead of dropping silently",
          "Vendor code aliasing learned from bookkeeper corrections",
        ],
      },
      {
        title: "Output and sync",
        items: [
          "Formula-driven .xlsx: Month Summary and Ledger tabs with live SUMIF rollups",
          "Two-way sync to a live SharePoint workbook",
          "Human edits in the workbook always win over engine writes",
          "Python FastAPI extraction engine on Azure Container Apps with Cosmos DB",
          "Next.js 15 / React 19 PWA on Cloudflare Workers",
        ],
      },
    ],
  },

  results: [
    {
      value: "2 independent reads",
      label: "OCR and vision cross-check every bill",
      context:
        "Neither read is a fallback for the other — both have to agree on each section's total before a bill is trusted.",
    },
    {
      value: "$92.57",
      label: "Line recovered by the vision read alone",
      context:
        "In testing, OCR alone dropped a line that the independent vision read caught, which is the failure mode the cross-check exists to catch.",
    },
    {
      value: "1,069 / 505",
      label: "Engine and web tests",
      context:
        "1,069 Python engine tests collected and 505 web tests passing across 59 files, run against a corpus of 23 photographed real bills.",
    },
    {
      value: "Always",
      label: "Handwritten bills go to a human",
      context:
        "No handwritten bill is ever auto-posted — it always routes to the review queue.",
    },
  ],

  techStack: [
    "Python FastAPI",
    "Azure Container Apps",
    "Cosmos DB",
    "OCR/layout extraction",
    "Vision model extraction",
    "Next.js 15",
    "React 19",
    "Cloudflare Workers",
    "PWA",
    "SharePoint two-way sync",
  ],

  relatedSlugs: ["hg-oil-ai-invoice-processing", "hg-oil-inventory-system", "alliant-mgu-insurance"],

  cta: {
    heading: "Buried in farm bills at tax time?",
    subcopy:
      "Preisser Solutions builds document-extraction systems that check their own work before anything posts. Scoping begins with a conversation about your bills and your books.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
