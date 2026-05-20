import type { CaseStudyData } from "@/types/case-study";

// Canonical project #11 — AI Invoice Processing Platform (generalized HG Oil pattern).
// Capability backed by real HG Oil Holdings deployment.
// See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "ai-invoice-processing-platform",
  metaTitle: "AI Invoice Processing Platform | Preisser Solutions",
  metaDescription:
    "The AI invoice engine that cut HG Oil Holdings' manual handling 75%, packaged as a repeatable platform for any business format or accounting stack.",
  datePublished: "2026-03-18",
  dateModified: "2026-05-20",

  category: "Capability • AI Document Processing",
  clientName: "AI Invoice Processing Platform",
  clientNameDisplay: "Capability — proven at HG Oil Holdings",
  industry: "AI invoice processing and back-office automation",

  h1: "AI Invoice Processing — Proven at HG Oil, Generalized for Any Business",
  subheadline:
    "The same AI assistant that cut manual invoice handling 75% at HG Oil Holdings — abstracted as a repeatable platform that adapts to your vendors, your approval chain, and your accounting system.",
  oneLine: "75% reduction in manual handling — proven at HG Oil Holdings",

  headlineResults: [
    { value: "75%", label: "Manual handling time eliminated at HG Oil" },
    { value: "Any format", label: "PDF, image, Word, Excel, email ingestion" },
    { value: "Any stack", label: "QuickBooks, Sage, NetSuite, and others" },
    { value: "1", label: "Admin hire prevented at HG Oil" },
  ],

  before: {
    heading: "Office staff burning 40+ hours a week reading paper.",
    body: [
      "Manual invoice processing eats real time. Office staff spend hours every week reading vendor invoices, hand-keying line items, categorizing expenses against the chart of accounts, and chasing down approvals. The growth path looks like one more admin hire — and then another.",
      "At HG Oil Holdings, this pattern hit a breaking point. Staff were spending 40+ hours per week on invoice handling and the volume kept climbing. Rather than hire, Preisser Solutions built an AI assistant trained on the company's vendors and approval workflows. That build now serves as the reference architecture for a generalized platform — same engine, customized per client.",
    ],
  },

  built: {
    heading: "A platform pattern that adapts to your stack, not the other way around.",
    body: [
      "The platform accepts any invoice format — PDF, scanned image, Word, Excel, or email attachment — and an AI extraction engine trained on the client's specific vendor data extracts vendor info, line items, totals, and GL codes in seconds. The engine learns the client's chart of accounts and assigns expenses automatically.",
      "From there, the system flags anomalies (out-of-pattern amounts, unfamiliar vendors, line items outside historical norms) and routes invoices through the right approval chain based on amount thresholds and cost centers. A human-review queue surfaces only the low-confidence extractions. The platform connects to QuickBooks, Sage, NetSuite, or whatever accounting system the client runs — the integration adapts to the client's stack rather than forcing the client to change tools.",
    ],
  },

  specifications: {
    heading: "Platform capabilities.",
    bullets: [
      "AI extraction trained per client on their vendor data and approval workflows",
      "Accepts any invoice format — PDF, scanned image, Word, Excel, email attachment",
      "Extracts vendor, line items, totals, and GL codes in seconds",
      "Auto-categorization against the client's chart of accounts",
      "Anomaly flagging on amounts, vendors, and line items",
      "Approval routing automation by amount threshold and cost center",
      "Integrates with QuickBooks, Sage, NetSuite, and other accounting platforms",
    ],
    subsections: [
      {
        title: "Extraction surface",
        items: [
          "Vendor identification across known and new vendors",
          "Line-item parsing with quantities, prices, and descriptions",
          "Total, subtotal, and tax extraction",
          "GL code assignment via learned client-specific mappings",
        ],
      },
      {
        title: "Client adaptation",
        items: [
          "Training set built from the client's historical invoices",
          "Approval chain configured to client policies",
          "Anomaly thresholds tuned to client patterns",
          "Exception queue surfaces low-confidence items for human review",
        ],
      },
    ],
  },

  results: [
    {
      value: "75%",
      label: "Manual invoice handling time eliminated at HG Oil",
      context:
        "The HG Oil Holdings deployment cut manual invoice handling 75% across the back-office team — proof of the underlying pattern.",
    },
    {
      value: "Any format",
      label: "Invoice ingestion across formats",
      context:
        "The platform handles PDF, scanned image, Word, Excel, and email attachments — extraction does not require a standardized format.",
    },
    {
      value: "Any stack",
      label: "Accounting system flexibility",
      context:
        "Integrations adapt to QuickBooks, Sage, NetSuite, or whatever the client already runs.",
    },
    {
      value: "0",
      label: "Additional admin hires required at HG Oil",
      context:
        "At HG Oil Holdings, the additional administrative hire that would otherwise have been needed to keep up with invoice volume was prevented.",
    },
  ],

  techStack: [
    "AI document extraction",
    "Vendor-aware training",
    "Approval routing engine",
    "Anomaly detection",
    "GL-code learned mappings",
    "QuickBooks / Sage / NetSuite integrations",
    "Exception review queue",
  ],

  relatedSlugs: [
    "hg-oil-ai-invoice-processing",
    "ai-document-analysis",
    "after-hours-call-triage",
  ],

  cta: {
    heading: "Drowning in invoices and about to hire another admin?",
    subcopy:
      "Preisser Solutions deploys the same invoice processing engine proven at HG Oil, customized for your vendors and accounting stack. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
