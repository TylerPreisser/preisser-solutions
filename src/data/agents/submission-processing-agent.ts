import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "submission-processing-agent",
  metaTitle: "Insurance Submission Processing Agent | Preisser Solutions",
  metaDescription:
    "Dual-model AI extraction across ACORD forms, loss runs, and schedules. Salesforce-integrated. Zero missed renewals in first six months for a multi-carrier MGU.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Insurance Submission Processing Agent",
  tagline:
    "Dual-model extraction across ACORD docs, loss runs, and schedules; Salesforce-integrated.",
  category: "Sales & Lead Capture",
  status: "production",
  industries: ["Insurance — managing general underwriting", "Insurance broking"],

  h1: "Every broker submission read, extracted, and in Salesforce — automatically.",
  subheadline:
    "An AI pipeline that processes broker insurance submissions across ACORD forms, loss runs, vehicle schedules, and financial documents using dual-model cross-validation, then populates Salesforce records without manual entry.",
  oneLine:
    "Reads 7–15 documents per broker submission with dual-model AI validation and auto-populates Salesforce records.",
  headlineMetric: {
    value: "0",
    label: "missed renewals in first six months",
  },

  whatItDoes: [
    "Insurance submissions are among the highest-volume, highest-complexity document processing tasks in any MGU or MGA operation. A single broker submission arrives as 7–15 documents — ACORD forms, loss runs, vehicle schedules, financial statements, broker narratives — and the same data from those documents gets entered 3–5 times across disconnected systems. Every manual entry is a potential error, and every duplicate entry is time that isn't being spent on underwriting.",
    "The Insurance Submission Processing Agent replaces that entire manual entry chain with a structured AI pipeline. Documents arrive via email intake, get classified by type, and feed into an AI extraction layer mapped to a JSON schema aligned to Salesforce objects. Claude Opus runs as the primary extraction model. For any field falling below a 0.90 confidence threshold, a second model cross-validates — producing dual-model certainty before any data is committed to the record.",
    "The architecture was delivered for an MGU within the Alliant Insurance ecosystem through R Squared AI, handling workers' comp, general liability, commercial auto, and umbrella/excess liability across multiple carrier markets. In the first six months of production, zero renewals were missed. Commission reconciliation dropped to under 30 minutes per month. The principal gained real-time book visibility that had never existed before.",
  ],
  capabilities: [
    {
      title: "Multi-document submission ingestion",
      description:
        "Receives 7–15 document broker submissions via email intake, classifies each document type automatically, and feeds them to the appropriate extraction workflow.",
    },
    {
      title: "Dual-model cross-validation",
      description:
        "Claude Opus runs as the primary extractor; a second model cross-validates every field below 0.90 confidence before any data commits to Salesforce.",
    },
    {
      title: "ACORD form extraction",
      description:
        "Reads ACORD 125, 126, 127, 130, 131, and 137 forms with full field mapping to the custom Salesforce submission object schema.",
    },
    {
      title: "Loss run parsing",
      description:
        "Processes loss run documents across 40+ carrier formats — PDF and Excel — extracting structured loss history for each line of business.",
    },
    {
      title: "Vehicle schedule and financial document processing",
      description:
        "Extracts structured data from vehicle schedule spreadsheets and financial documents across varying layouts and formats.",
    },
    {
      title: "Salesforce auto-population",
      description:
        "Extracted records flow through Cosmos DB and PubSub to populate custom Salesforce objects for submissions, lines of business, and quotes without manual entry.",
    },
    {
      title: "Human-in-the-loop review for exceptions",
      description:
        "Low-confidence items surface in a custom Salesforce review interface where underwriters can confirm or correct extractions before records are finalized.",
    },
  ],
  inputs: [
    { label: "Broker submissions via email intake", format: "Email / API" },
    { label: "ACORD forms (125, 126, 127, 130, 131, 137)", format: "PDF" },
    { label: "Loss run documents", format: "PDF / Excel (40+ carrier formats)" },
    { label: "Vehicle schedules", format: "Excel" },
    { label: "Financial documents and broker narratives", format: "PDF / Word" },
    { label: "Salesforce org and custom object schema", format: "API / Salesforce connected app" },
  ],
  outputs: [
    { label: "Salesforce Submission record populated", format: "Salesforce object (Astrus_Submission__c pattern)" },
    { label: "Line of Business records per submission", format: "Salesforce related object" },
    { label: "Quote records per line", format: "Salesforce related object" },
    { label: "Submission Communication log", format: "Salesforce related object" },
    { label: "Exception queue for human review in Salesforce", format: "Custom Salesforce interface" },
    { label: "Processing log with confidence scores per field", format: "Cosmos DB / dashboard" },
  ],
  howItWorks: [
    {
      step: "Email intake and document classification",
      description:
        "The submission arrives via email. Each attached document is classified by type — ACORD form number, loss run, schedule, narrative — before extraction begins.",
    },
    {
      step: "Primary AI extraction",
      description:
        "Claude Opus extracts all configured fields from each document type, producing a structured JSON record mapped to the Salesforce object schema.",
    },
    {
      step: "Dual-model confidence validation",
      description:
        "Every extracted field is scored for confidence. Fields below 0.90 trigger a second model cross-validation pass before the data is accepted.",
    },
    {
      step: "Cross-document validation",
      description:
        "Extracted data is cross-referenced across the submission's multiple documents to catch inconsistencies — a named insured that differs between the ACORD and the loss run, for example.",
    },
    {
      step: "Cosmos DB staging and Salesforce sync",
      description:
        "Validated records stage in Cosmos DB and sync back to Salesforce via PubSub. Low-confidence items surface in the human review queue rather than committing automatically.",
    },
  ],
  useCases: [
    "Use this when your underwriting team is spending a significant portion of the workday on manual data entry from broker submissions instead of on underwriting decisions.",
    "Use this when the same submission data is being re-entered across multiple systems — CRM, pricing model, billing — and errors in entry create downstream reconciliation problems.",
    "Use this when submission volume is scaling (new carrier markets, new lines) faster than administrative headcount can grow.",
    "Use this when renewal tracking is manual and the risk of a missed renewal represents meaningful revenue exposure.",
    "Use this when real-time book visibility — current submissions, quotes in flight, bound business — doesn't exist because the data is stuck in document form.",
  ],
  techStack: [
    "Claude Opus",
    "GPT (cross-validation)",
    "Azure AI Foundry",
    "Salesforce (custom objects)",
    "Cosmos DB",
    "PubSub",
    "Majesco / Coverall integration",
  ],
  linkedCaseStudySlug: "alliant-mgu-insurance",
  relatedSlugs: [
    "document-analysis-agent",
    "bol-rate-confirmation-agent",
    "lead-pipeline-agent",
  ],
  cta: {
    heading: "Need to scale submission volume without scaling headcount?",
    subcopy:
      "Preisser Solutions architects AI submission pipelines for insurance operations — from email intake through Salesforce population. The first conversation covers your current submission volume and your system architecture.",
    buttonLabel: "Scope this for my operation",
    buttonHref: "/contact?agent=submission-processing-agent",
  },
};
