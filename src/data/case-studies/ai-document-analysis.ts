import type { CaseStudyData } from "@/types/case-study";

// Canonical project #12 — AI Document Analysis & Data Extraction.
// Built. Generalized capability. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "ai-document-analysis",
  metaTitle: "AI Document Analysis & Data Extraction",
  metaDescription:
    "Automation workflows that ingest invoices, contracts, forms, reports, and permits — extract structured data, categorize, and forward to downstream systems.",
  datePublished: "2026-03-22",
  dateModified: "2026-05-20",

  category: "Capability • AI Automation",
  clientName: "AI Document Analysis",
  clientNameDisplay: "Capability",
  industry: "AI document analysis and data extraction",

  h1: "AI Document Analysis — Any Document In, Structured Data Out",
  subheadline:
    "Automation workflows that ingest any document type — invoices, contracts, forms, reports, permits — extract structured data, categorize, date-stamp, and forward to downstream systems.",
  oneLine: "Any document in, structured data out, downstream systems updated",

  headlineResults: [
    { value: "Any type", label: "PDF, Excel, Word, image ingestion" },
    { value: "Structured", label: "Field extraction per document type" },
    { value: "Auto", label: "Categorization and date-stamping" },
    { value: "API", label: "Routing to CRM, accounting, ERP" },
  ],

  before: {
    heading: "Documents arrive, then sit. Staff key them in by hand.",
    body: [
      "Every business runs on documents — invoices, contracts, signed forms, inspection reports, permits, regulatory filings, work orders. Most of those documents arrive as PDFs, scanned images, Excel files, or Word docs, and most are read by a human who then types the same information into a CRM, an ERP, or an accounting system.",
      "This is the slowest, most error-prone work in the back office. It does not have to be done by a human. AI document analysis turns the pile into structured data — categorized, dated, and routed — without anyone keying it twice.",
    ],
  },

  built: {
    heading: "A workflow per document type, sharing one extraction engine.",
    body: [
      "Preisser Solutions builds AI document analysis workflows tuned to each business's document mix. The system ingests documents in any format — PDF, Excel, Word, scanned image — runs field extraction against the schema for that document type, auto-categorizes the document, and date-stamps it for audit history.",
      "From there, the workflow routes the extracted data to whatever downstream system the business runs: CRM, accounting platform, ERP, or a custom internal database. Anomalous extractions queue for a human reviewer. The build pattern is the same as the invoice processing platform — purposefully generalized so the same engine handles contracts, claims, permits, or any other structured document the business needs to process.",
    ],
  },

  specifications: {
    heading: "Workflow capabilities.",
    bullets: [
      "Multi-format ingestion — PDF, Excel, Word, scanned image, email attachment",
      "AI-powered field extraction tuned per document type",
      "Auto-categorization based on document content",
      "Date-stamping for audit history",
      "API routing to downstream CRM, accounting, ERP, or custom databases",
      "Exception queue for low-confidence extractions",
    ],
    subsections: [
      {
        title: "Document types covered",
        items: [
          "Invoices and purchase orders",
          "Contracts and signed forms",
          "Inspection reports and permits",
          "Regulatory filings",
          "Work orders and dispatch tickets",
          "Claims, applications, and submission packets",
        ],
      },
      {
        title: "Downstream integration",
        items: [
          "CRM systems (Salesforce, HubSpot, Attio, custom)",
          "Accounting platforms (QuickBooks, Sage, NetSuite)",
          "ERP systems and custom databases",
          "Webhook-based routing for arbitrary endpoints",
        ],
      },
    ],
  },

  results: [
    {
      value: "Any type",
      label: "Multi-format document ingestion",
      context:
        "PDFs, Excel files, Word documents, scanned images, and email attachments are all valid inputs.",
    },
    {
      value: "Structured",
      label: "Field extraction tuned per document",
      context:
        "Extraction schemas are tuned per document type so the output is structured data, not free text.",
    },
    {
      value: "Auto",
      label: "Categorization and date-stamping",
      context:
        "Each document is categorized by content and date-stamped for downstream audit and reporting.",
    },
    {
      value: "API",
      label: "Routing to downstream systems",
      context:
        "Extracted data is delivered to the business's CRM, accounting platform, ERP, or custom database via API.",
    },
  ],

  techStack: [
    "AI document extraction",
    "Multi-format ingestion",
    "Schema-tuned extraction",
    "Auto-categorization",
    "Webhook routing",
    "CRM / ERP / accounting integration",
    "Exception review queue",
  ],

  relatedSlugs: [
    "ai-invoice-processing-platform",
    "after-hours-call-triage",
    "ai-trend-behavioral-analysis",
  ],

  cta: {
    heading: "Have a pile of documents nobody has time to key in?",
    subcopy:
      "Preisser Solutions builds document analysis workflows tuned to your document mix and downstream systems. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
