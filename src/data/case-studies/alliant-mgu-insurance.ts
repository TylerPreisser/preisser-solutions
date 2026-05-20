import type { CaseStudyData } from "@/types/case-study";

// Canonical project #5 — anonymized per privacy rules.
// "An MGU within the Alliant Insurance ecosystem. Delivered through R Squared AI."
// DO NOT name the company or personnel.
export const caseStudy: CaseStudyData = {
  slug: "alliant-mgu-insurance",
  metaTitle: "AI Submission Processing — MGU Insurance",
  metaDescription:
    "An MGU within the Alliant Insurance ecosystem ran dual-model AI on broker submissions — zero missed renewals in the first six months.",
  datePublished: "2025-08-12",
  dateModified: "2026-05-20",

  category: "Custom CRM • AI Document Processing • Insurance",
  clientName: "Anonymized MGU client",
  clientNameDisplay: "An MGU within the Alliant Insurance ecosystem",
  industry: "Insurance — managing general underwriting",

  h1: "Dual-Model AI Submission Processing for a Multi-Carrier MGU",
  subheadline:
    "An end-to-end pipeline that reads 7–15 documents per broker submission, validates with Claude Opus and GPT cross-validation, and auto-populates Salesforce records.",
  oneLine: "Zero missed renewals in first 6 months",

  headlineResults: [
    { value: "0", label: "Missed renewals in first 6 months" },
    { value: "<30 min", label: "Monthly commission reconciliation" },
    { value: "~2,500/yr", label: "Submissions scaled without new headcount" },
    { value: "0.90", label: "Dual-model confidence threshold" },
  ],

  before: {
    heading: "The same data entered 3–5 times across disconnected systems.",
    body: [
      "An MGU within the Alliant Insurance ecosystem was running ~1,700 submissions per year across workers' comp, general liability, commercial auto, and excess liability. The same data was being entered 3 to 5 times — across Salesforce, Majesco/Coverall, Chubb's systems, Excel pricing models, and Epic billing.",
      "With two new carrier markets coming online (AXA XL and Everest) alongside the existing Chubb relationship, the operation needed to scale to roughly 2,500 submissions per year without adding headcount. Approximately 70% of submissions were getting declined at various stages, and the principal had no real-time visibility into the book.",
    ],
  },

  built: {
    heading: "Salesforce → AI extraction → cross-validation → Cosmos DB → Salesforce.",
    body: [
      "Delivered through R Squared AI, Preisser Solutions architected and led delivery of an AI-powered submission processing pipeline. Broker submissions arrive via email intake, get classified by document type, and feed into an AI extraction layer mapped to a JSON schema aligned to Salesforce objects.",
      "Two AI models cross-validate every extraction. Claude Opus runs as the primary extractor; GPT runs as the cross-validation engine. Any field falling below a 0.90 confidence threshold triggers the second model. Cross-document validation catches inconsistencies. Results land in Cosmos DB, then PubSub-sync back to Salesforce, with a custom human-in-the-loop review surface for low-confidence items.",
    ],
  },

  specifications: {
    heading: "Architecture and surface area.",
    bullets: [
      "Salesforce → PubSub → Azure AI Foundry → Cosmos DB → Salesforce data flow",
      "Claude Opus as primary extractor; GPT as cross-validation model",
      "0.90 confidence threshold triggers secondary-model validation on weak fields",
      "Cross-document validation flags inconsistencies between submission documents",
      "Custom Salesforce objects model submissions, lines of business, and quotes",
      "Human-in-the-loop review surface built directly into Salesforce for exceptions",
    ],
    subsections: [
      {
        title: "Document types ingested",
        items: [
          "ACORD 125, 126, 127, 137, 130, 131",
          "Vehicle schedules (Excel)",
          "Loss runs (PDF and Excel across 40–50 carrier formats)",
          "Financial documents and broker narratives",
        ],
      },
      {
        title: "Custom Salesforce objects",
        items: [
          "Submission — the master submission record per broker package",
          "Line of Business — line-level data per submission",
          "LOB Quote — line-of-business quote tracking",
          "Submission Quote — submission-level quote rollup",
          "Submission Communication — broker correspondence log",
        ],
      },
      {
        title: "Lines of business in scope",
        items: [
          "Workers' compensation",
          "General liability",
          "Commercial auto",
          "Umbrella and excess liability",
        ],
      },
    ],
  },

  results: [
    {
      value: "0",
      label: "Missed renewals in the first 6 months",
      context:
        "Zero renewal slipped through in the first six months of the pipeline operating in production.",
    },
    {
      value: "<30 min",
      label: "Monthly commission reconciliation",
      context:
        "Commission reconciliation moved from a multi-day process to under 30 minutes per month.",
    },
    {
      value: "Real-time",
      label: "Book visibility for the principal",
      context:
        "The principal gained real-time visibility into the book — replacing rear-view reporting with a live view of every submission, quote, and bind.",
    },
    {
      value: "~2,500/yr",
      label: "Submissions scaled without new headcount",
      context:
        "The operation scaled toward ~2,500 submissions per year — across three carrier markets — without adding administrative headcount.",
    },
  ],

  techStack: [
    "Salesforce (custom objects)",
    "Azure AI Foundry",
    "Claude Opus",
    "GPT (cross-validation)",
    "Cosmos DB",
    "PubSub",
    "Majesco / Coverall integration",
    "Epic billing integration",
  ],

  relatedSlugs: [
    "chicago-bus-operator",
    "hg-oil-ai-invoice-processing",
    "cassidy-hvac-reactivation",
  ],

  cta: {
    heading: "Need to scale document-heavy operations without adding headcount?",
    subcopy:
      "Preisser Solutions architects AI document pipelines that read, validate, and route at the speed required to scale. Scoping begins with a conversation about your volume and your systems.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
