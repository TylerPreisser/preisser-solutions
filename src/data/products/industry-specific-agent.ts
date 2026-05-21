import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "industry-specific-agent",
  metaTitle: "Industry-Specific Agent | Preisser Solutions",
  metaDescription:
    "Agents built for the document flow, regulatory shape, and downstream systems of a single industry. Insurance is the worked example — zero missed renewals in six months.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Industry-Specific Agent",
  tagline:
    "Agents built for the document flow, regulatory shape, and downstream systems of a single industry. Insurance is the worked example.",
  category: "Sales & Lead Capture",
  status: "production",
  industries: ["Insurance — managing general underwriting", "Insurance broking", "Logistics", "Healthcare", "Legal", "Manufacturing"],

  h1: "Some industries don't need a generic AI agent. They need one built for their documents, their systems, and their compliance posture.",
  subheadline:
    "Industry-specific agents built from the ground up for one industry's document flow, regulatory requirements, and downstream system integrations. The insurance submission processing pipeline is the worked example.",
  oneLine:
    "Industry-tuned agents designed around one industry's document types, compliance requirements, and system integrations — not generic AI applied generically.",
  headlineMetric: {
    value: "0",
    label: "missed renewals in first six months",
  },

  whatItDoes: [
    "Some industries don't need a generic AI agent. They need one that knows the documents, the carriers, the compliance posture, and the systems of their industry. A general-purpose extraction model applied to insurance submissions, legal filings, healthcare records, or logistics manifests without industry-specific tuning produces unreliable results — because the document formats, confidence requirements, and downstream system integrations are all industry-specific.",
    "The insurance submission processing pipeline is the worked example. Broker submissions arrive as 7–15 documents: ACORD forms (125, 126, 127, 130, 131, 137), loss runs, vehicle schedules, financial statements, and broker narratives. The agent classifies each document type, extracts structured data using dual-model cross-validation (Claude Opus primary; second model fires on any field below 0.90 confidence), and populates Salesforce records without manual entry. The architecture was delivered for an MGU within the Alliant Insurance ecosystem through R Squared AI. In the first six months of production, zero renewals were missed.",
    "The same pattern applies to logistics (BOL and rate confirmation parsing), healthcare (clinical document extraction and coding), legal (contract review and clause extraction), and manufacturing (specification and compliance document processing). Preisser Solutions scopes industry-specific agent builds from scratch — designed around the document types, regulatory requirements, and downstream systems of one industry.",
  ],
  capabilities: [
    {
      title: "Industry document classification",
      description:
        "Classifies each incoming document by type before extraction begins — ACORD form number, loss run format, financial document, schedule — so the right extraction model fires on the right document.",
    },
    {
      title: "Dual-model cross-validation",
      description:
        "Primary extraction model runs first; a second model cross-validates every field below the confidence threshold before any data commits to the downstream system.",
    },
    {
      title: "ACORD form extraction (insurance)",
      description:
        "Full field extraction from ACORD 125, 126, 127, 130, 131, and 137 forms mapped to the client's Salesforce or CRM object schema.",
    },
    {
      title: "Loss run parsing",
      description:
        "Processes loss run documents across 40+ carrier formats in PDF and Excel, extracting structured loss history per line of business.",
    },
    {
      title: "Carrier and system API forwarding",
      description:
        "Extracted and validated records flow to downstream carrier APIs, CRM systems (Salesforce), or underwriting platforms — replacing manual re-entry.",
    },
    {
      title: "Human-in-the-loop exception handling",
      description:
        "Low-confidence items surface in a review interface for human confirmation before the record is finalized — keeping the agent in the workflow without removing human judgment.",
    },
    {
      title: "Industry-tuned confidence thresholds",
      description:
        "Confidence requirements are calibrated to the industry's accuracy standards — financial document extraction for insurance carries different thresholds than logistics manifests.",
    },
  ],
  inputs: [
    { label: "Broker submissions or industry documents via email intake", format: "Email / API" },
    { label: "ACORD forms (insurance)", format: "PDF" },
    { label: "Loss run documents", format: "PDF / Excel" },
    { label: "Vehicle schedules, financial documents, carrier narratives", format: "PDF / Excel / Word" },
    { label: "CRM or downstream system schema", format: "API / connected app" },
  ],
  outputs: [
    { label: "Populated CRM or system records", format: "Salesforce / API write-back" },
    { label: "Exception queue for human review", format: "Custom interface / dashboard" },
    { label: "Processing log with confidence scores per field", format: "Database / dashboard" },
    { label: "Renewal and follow-up alerts", format: "Email / Slack" },
  ],
  howItWorks: [
    {
      step: "Document intake and classification",
      description:
        "Industry documents arrive via email or API. Each document is classified by type before extraction begins — wrong classification triggers wrong extraction.",
    },
    {
      step: "Primary AI extraction",
      description:
        "The primary model extracts all configured fields from each document type, producing a structured record mapped to the downstream system schema.",
    },
    {
      step: "Dual-model confidence validation",
      description:
        "Every extracted field is scored for confidence. Fields below the threshold trigger a second model cross-validation pass before the data is accepted.",
    },
    {
      step: "Cross-document validation",
      description:
        "Extracted data is cross-referenced across the submission's multiple documents — a named insured that differs between the ACORD and the loss run gets flagged.",
    },
    {
      step: "System population and exception routing",
      description:
        "Validated records post to the downstream system. Low-confidence items route to the human review interface rather than committing automatically.",
    },
  ],
  useCases: [
    "Use this when your industry's document processing requires accuracy standards that general-purpose AI extraction doesn't meet without industry-specific tuning.",
    "Use this when the same data from incoming documents is being manually re-entered across multiple systems — and errors in that re-entry create downstream reconciliation problems.",
    "Use this when document volume is scaling faster than administrative headcount can absorb.",
    "Use this when renewal tracking or compliance deadlines are managed manually and missed events represent meaningful revenue or regulatory exposure.",
    "Use this when real-time visibility into your pipeline — submissions in flight, renewals due, quotes pending — doesn't exist because the data is stuck in document form.",
  ],
  techStack: [
    "Claude Opus",
    "GPT (cross-validation)",
    "Azure AI Foundry",
    "Salesforce (custom objects)",
    "Cosmos DB",
    "PubSub",
    "Carrier API integrations (Majesco, Chubb, Coverall)",
  ],
  linkedCaseStudySlug: "alliant-mgu-insurance",
  relatedSlugs: [
    "compliance-agent",
    "business-triage-agent",
    "custom-agent-development",
  ],
  cta: {
    heading: "Need an agent built for your industry's actual document flow?",
    subcopy:
      "Preisser Solutions architects industry-specific agent pipelines from document intake through system population. The first conversation covers your document types, your accuracy requirements, and your downstream systems.",
    buttonLabel: "Scope this for my operation",
    buttonHref: "/contact?product=industry-specific-agent",
  },
};
