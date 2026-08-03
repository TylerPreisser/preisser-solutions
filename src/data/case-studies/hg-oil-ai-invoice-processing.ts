import type { CaseStudyData } from "@/types/case-study";

// Canonical project #4 — HG Oil Holdings AI Invoice Processing Assistant.
// Real. Built while Tyler was VP of Operations at HG Oil Holdings.
export const caseStudy: CaseStudyData = {
  slug: "hg-oil-ai-invoice-processing",
  metaTitle: "HG Oil Holdings — AI Invoice Processing",
  metaDescription:
    "An AI document assistant that cut HG Oil Holdings' manual invoice handling by 75% and prevented the need for an additional admin hire.",
  datePublished: "2024-06-10",
  dateModified: "2026-05-20",

  category: "AI Integration • Back-Office Automation",
  clientName: "HG Oil Holdings",
  clientNameDisplay: "HG Oil Holdings",
  industry: "Oil and gas back-office operations",

  h1: "HG Oil Holdings — 75% Less Manual Invoice Handling",
  subheadline:
    "An AI assistant trained on the company's vendor data and approval workflows extracts, categorizes, and routes any invoice format in seconds.",
  oneLine: "75% reduction in manual invoice handling time",

  headlineResults: [
    { value: "75%", label: "Manual invoice time eliminated" },
    { value: "40+ hrs/wk", label: "Staff hours redirected" },
    { value: "0", label: "Additional admin hires needed" },
    { value: "Any format", label: "Document ingestion" },
  ],

  hub: {
    problem:
      "Office staff spent 40+ hours a week reading invoices, coding line items to cost centers and chasing approvals, and the volume was growing past what the team could absorb.",
    built:
      "An assistant trained on the company's own vendors, GL codes and approval chains that reads an invoice in any format, extracts the line items, flags anomalies and routes it to the right approver.",
    outcome: "75% less manual invoice handling, and the extra admin hire was never needed",
  },

  before: {
    heading: "Office staff spending 40+ hours a week reading invoices.",
    body: [
      "Before the build, office staff at HG Oil Holdings were spending 40+ hours per week manually reading invoices, categorizing line items, dispersing them to the right cost centers, and chasing down approvals.",
      "Invoice volume was growing beyond what existing staff could absorb. The next step was hiring another admin — pure overhead in a function that was already a bottleneck.",
    ],
  },

  built: {
    heading: "An AI trained on the company's vendors, approvals, and financial structure.",
    body: [
      "Preisser Solutions built an AI assistant trained on HG Oil Holdings' vendor data, approval workflows, and financial structure. Staff upload an invoice — any format — and the system extracts vendor info, line items, totals, and GL codes in seconds.",
      "From there, the assistant categorizes the expense, flags anomalies, and routes the invoice through the right approval chain. Staff time on manual reading and data extraction dropped to near zero, freeing the team for higher-priority work and removing the need to hire.",
    ],
  },

  specifications: {
    heading: "How invoices flow through the system.",
    bullets: [
      "AI extraction engine trained on the company's vendor data and approval workflows",
      "Accepts any invoice format — PDF, scanned image, Word, Excel, email attachments",
      "Extracts vendor, line items, totals, and GL codes in seconds",
      "Auto-categorizes expenses against the company's financial structure",
      "Anomaly flagging on unusual amounts, vendors, or line items",
      "Approval routing automation — invoices land with the right approver",
    ],
    subsections: [
      {
        title: "Extraction surface",
        items: [
          "Vendor identification across known and new vendors",
          "Line-item parsing with quantities, prices, and descriptions",
          "Total, subtotal, and tax extraction",
          "GL code assignment via learned mappings",
        ],
      },
      {
        title: "Operational handoffs",
        items: [
          "Auto-categorization against the company's chart of accounts",
          "Anomaly flagging — out-of-pattern amounts, vendor mismatches",
          "Approval routing based on amount thresholds and cost centers",
          "Exception queue surfaces low-confidence extractions for human review",
        ],
      },
    ],
  },

  results: [
    {
      value: "75%",
      label: "Reduction in manual invoice handling time",
      context:
        "Time spent on manual invoice handling dropped by 75% across the back-office team.",
    },
    {
      value: "100%",
      label: "Manual reading eliminated",
      context:
        "Manual reading and data extraction was eliminated entirely — staff no longer key invoices by hand.",
    },
    {
      value: "0",
      label: "Additional admin hires required",
      context:
        "The additional administrative hire that would otherwise have been required to keep up with volume was prevented.",
    },
    {
      value: "40+ hrs/wk",
      label: "Staff time freed for higher-priority work",
      context:
        "Over 40 hours per week of back-office staff time was redirected from invoice processing to higher-value operational work.",
    },
  ],

  techStack: [
    "AI document extraction",
    "Vendor-aware training set",
    "Approval routing engine",
    "Anomaly detection",
    "GL-code learned mapping",
    "Exception queue for human review",
  ],

  relatedSlugs: [
    "hg-oil-inventory-system",
    "alliant-mgu-insurance",
    "cassidy-hvac-reactivation",
  ],

  cta: {
    heading: "Drowning in invoices and about to hire another admin?",
    subcopy:
      "Preisser Solutions builds AI document processing systems trained on your vendors and your approval chain. Scoping begins with a conversation about your volume and your accounting stack.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
