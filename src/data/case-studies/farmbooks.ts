import type { CaseStudyData } from "@/types/case-study";

// FarmBooks — flagship AI Integration + Business Automation platform.
// Photograph a farm bill, get Schedule-F-ready books. Live at farm-books.com
// (Next.js 15 PWA on Cloudflare Workers) backed by a Python FastAPI extraction
// engine on Azure Container Apps with Cosmos DB.
//
// SOURCE OF CLAIMS: the FarmBooks value brief,
// docs/deliverables/farmbooks-value-brief-SOURCE.md in the FarmBooks repo —
// an evidence-cited capability inventory with a 13-item do-not-claim list.
// Every sentence below traces to a SHIPPED entry in it. Do not add a claim
// from anywhere else, and specifically never: an extraction accuracy
// percentage (no such number exists), an offline mode, a dark mode, a CSV or
// PDF export, a live-synced workbook in the customer's own tenant, a
// one-click bulk document export, a printed Schedule F line number, or
// auto-emailed landowner invoices. The reference client is only ever "a live
// three-farm operation" — never a name. Per src/types/case-study.ts, no
// dollar amounts appear here, so the measured error figures stay on the
// FarmBooks site and out of this file.
export const caseStudy: CaseStudyData = {
  slug: "farmbooks",
  metaTitle: "FarmBooks: Bills to Schedule-F Books",
  metaDescription:
    "Photograph a farm bill and get Schedule-F-ready books. The line amounts have to equal the printed total within two cents, or a person looks at it first.",
  datePublished: "2026-07-20",
  dateModified: "2026-08-27",

  category: "AI Integration • Business Automation",
  clientName: "FarmBooks",
  clientNameDisplay: "FarmBooks",
  industry: "Farm bookkeeping and Schedule F accounting",

  h1: "FarmBooks: Photograph a Bill, Get Schedule-F-Ready Books",
  subheadline:
    "The line amounts have to equal the bill's printed total within two cents before anything is allowed to post, and every bill stays a draft until a person submits it.",
  oneLine: "Photograph a farm bill; deterministic checks turn it into Schedule-F-ready books",

  liveLink: {
    label: "See it live at farm-books.com",
    href: "https://farm-books.com",
  },

  headlineResults: [
    { value: "Two cents", label: "Tolerance the line amounts must meet against the printed total" },
    { value: "0", label: "Uncategorized lines across 893 in a live three-farm operation" },
    { value: "530", label: "Vendor shorthand entries translated, printed original kept" },
    { value: "101 bills", label: "One crop year, read and booked without retyping a line" },
  ],

  hub: {
    problem:
      "A three-farm operation kept its books in a hand-typed spreadsheet, where a subtotal that did not reach far enough, a paste block that landed twice, and one bill filed under two vendors all stayed hidden until the year would not reconcile.",
    built:
      "Photograph a bill and the line amounts must equal the printed total within two cents before anything posts; a 530-entry dictionary translates vendor shorthand while keeping the printed original beside it, and every bill stays a draft until a person submits it.",
    outcome: "Books where every amount opens the bill it came from",
  },

  before: {
    heading: "A spreadsheet cannot check its own arithmetic.",
    body: [
      "Farm bookkeeping runs on paper that does not cooperate: co-op tickets, dealer parts invoices, chemical and seed bills, fuel statements, each with its own layout, and each one needing to be split across fields, entities, and IRS Schedule F categories before it means anything at tax time. The default tool is a spreadsheet and a bookkeeper retyping every line by hand.",
      "The failure modes are not exotic. They are the ordinary ones of any spreadsheet kept by a busy person: a hand-typed SUM that does not reach far enough, a paste block that lands twice, one delivery billed once and counted on two sheets. When we imported a live three-farm operation's existing hand-kept workbook, all three were sitting in it, and they are still true of that source file today. Nothing in the spreadsheet was ever going to find them.",
    ],
  },

  built: {
    heading: "Deterministic checks around every number, and a person at every uncertain moment.",
    body: [
      "A bill arrives however it actually arrives: emailed as a PDF, mailed as a statement, or photographed in the cab, sideways and badly lit. Photographs are straightened before they are read, and a multi-page bill is put back together by proving the math: a continuation page is matched to its parent by checking the page's line total against the printed subtotal, so the same arithmetic that proves the pages belong together proves they are in the right order. Vendor identification works cheapest-signal-first, and a layout it has never seen falls back to a generic profile and a human look rather than a guess.",
      "Then the arithmetic conscience the spreadsheet never had. The line amounts must equal the printed total within two cents or the bill is held for a person. If a line disappears between processing stages, the system raises an error instead of posting a quietly smaller bill. Non-billable footer rows are stripped with a running count, so an audit can prove nothing real was discarded. A re-sent bill is caught on identity (same vendor and total inside a short window, or a matching vendor document number), not on file bytes.",
      "Understanding what was bought is a translation problem, and we treated it as one. A 530-entry dictionary turns co-op shorthand into plain English and keeps the exact printed text beside it, always reachable, because a prettier description must never be able to move a dollar figure. Categorization resolves in order: the farm's own confirmed corrections first, then that deterministic dictionary weighted by vendor context, then a single batched model call for anything still unresolved, locked to a 26-category taxonomy and never free-form. The Schedule F line is always re-derived from the category and never accepted from the model. Across 893 ledger lines from 101 bills in one crop year at a live three-farm operation, zero came out uncategorized.",
      "Nothing posts itself when anything is uncertain, and uncertainty here is boolean rather than a percentage: certain, or it needs a person's eyes. A self-reported confidence score was deliberately removed, because a made-up score is not something a set of books should lean on. A handwritten quantity is always routed to review no matter how clean the read looks. An overlay that highlighted the exact spot on the image was built and then turned off after it once drew the box around the wrong product line, on the judgment that a confident pointer that is wrong is worse than no pointer. Every bill lands as a draft, and the money moves when a person presses submit.",
      "What makes the result defensible is the record. Every field is stored as a printed-value and translated-value pair, so from any amount in the app you open the original bill it came from and read the exact words the vendor printed. Every change (assigning a field, changing a category, splitting, cost-sharing, confirming, submitting): writes an audit row carrying who, when, the previous value and the new value, inside the same transaction as the change itself. The history cannot drift from the data, because the system refuses to record one without the other.",
    ],
  },

  specifications: {
    heading: "How a bill becomes a ledger line that holds up.",
    bullets: [
      "Add a bill by photograph or email; sideways, crumpled, and multi-page bills are handled as they arrive",
      "Continuation pages are matched to their parent bill by checking the page total against the printed subtotal",
      "Line amounts must equal the printed total within two cents, or the bill is held for a person",
      "A line that vanishes between processing stages raises an error instead of posting a smaller bill",
      "Non-billable footer rows are stripped with a running count, so nothing real is discarded silently",
      "A 530-entry dictionary translates vendor shorthand and keeps the exact printed text beside it",
      "Categories resolve from the farm's own confirmed corrections, then the dictionary, then one batched model call locked to 26 categories",
      "The Schedule F line is always re-derived from the category, never accepted from the model",
      "Handwritten quantities always route to a person and are never auto-posted",
      "Every bill lands as a draft; the money moves when a person presses submit",
      "Splitting a line across fields is acreage-weighted and cent-exact, and stops rather than invent a ratio for a field with no acreage on file",
      "Corrections become durable, farm-specific mappings applied to every later bill from that vendor",
    ],
    subsections: [
      {
        title: "Guardrails",
        items: [
          "Arithmetic validation on every bill, within two cents of the printed total",
          "Cross-stage line check, so no bill can post quietly smaller than it was",
          "Confidence is boolean by design: certain, or it needs a person's eyes; no percentage score",
          "A highlight-the-spot overlay was built and deliberately turned off after it once boxed the wrong line",
          "Split shares are proven three times: at allocation, before the write, and by re-reading after it",
          "3,345 automated tests on the extraction engine, 2,081 on the web app",
        ],
      },
      {
        title: "The record and the workbook",
        items: [
          "Every field kept as a printed-value and translated-value pair",
          "From any amount in the app, open the original bill image it came from",
          "The audit row is written inside the same transaction as the change, so history cannot drift from data",
          "Who changed what, when, and both the previous and the new value, on every bill",
          "One-click .xlsx workbook: a month summary plus a ledger per farm, grouped by field",
          "Rollups are live Excel formulas rather than pasted values, so the file stays correct when a figure is edited",
          "Category names map one-to-one onto Schedule F lines",
        ],
      },
    ],
  },

  results: [
    {
      value: "Two cents",
      label: "Arithmetic tolerance before a bill is held",
      context:
        "The line amounts must equal the printed total within two cents, or the bill waits for a person instead of posting.",
    },
    {
      value: "0",
      label: "Uncategorized lines out of 893",
      context:
        "Across 101 bills in one crop year at a live three-farm operation, every ledger line resolved to a tax category.",
    },
    {
      value: "85 fields",
      label: "Across three farms kept cleanly apart under one login",
      context:
        "Each operation carries its own fields and its own learned corrections, so a correction on one farm does not bleed into another.",
    },
    {
      value: "3,345 / 2,081",
      label: "Automated tests, extraction engine and web app",
      context:
        "The guardrails are pinned by tests, including one named for the rule that unmarking a lease never re-books money already posted.",
    },
  ],

  techStack: [
    "Python FastAPI",
    "Azure Container Apps",
    "Cosmos DB",
    "Azure Blob Storage",
    "Vision document extraction",
    "Next.js 15",
    "React 19",
    "Cloudflare Workers",
    "PWA",
    "Excel workbook generation",
  ],

  relatedSlugs: ["hg-oil-ai-invoice-processing", "hg-oil-inventory-system", "alliant-mgu-insurance"],

  cta: {
    heading: "Buried in farm bills at tax time?",
    subcopy:
      "Preisser Solutions builds document systems that check their own arithmetic before anything posts. Scoping begins with a conversation about your bills and your books.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
