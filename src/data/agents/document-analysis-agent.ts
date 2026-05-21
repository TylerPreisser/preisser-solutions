import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "document-analysis-agent",
  metaTitle: "Document Analysis & Extraction Agent | Preisser Solutions",
  metaDescription:
    "Ingests any document type — PDF, Excel, Word, image — extracts structured fields, categorizes, and routes to downstream systems. Any format, any workflow.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Document Analysis & Extraction Agent",
  tagline:
    "Ingests any document type (PDF, Excel, Word, image), extracts structured fields, routes downstream.",
  category: "Operations & Back-Office",
  status: "deployable",
  industries: ["B2B services", "Insurance", "Logistics", "Professional services"],

  h1: "Any document in. Structured data out. Routed automatically.",
  subheadline:
    "An AI extraction pipeline that ingests PDFs, Excel files, Word documents, and scanned images, extracts defined fields into structured records, categorizes each document, and routes the output to any downstream system.",
  oneLine:
    "Universal document intake that extracts, categorizes, and routes structured data from any file format to any system.",

  whatItDoes: [
    "Every business has document ingestion as a recurring operational cost. Contracts arrive as PDFs. Reports come in Excel. Forms are scanned images. Permits and certificates are a mix of all three. Someone has to open each one, find the relevant fields, type them into another system, and route the document to the right place. Multiply that by hundreds or thousands of documents per month and the labor cost is significant.",
    "The Document Analysis and Extraction Agent handles the full pipeline. Documents arrive in any supported format — PDF, Excel, Word, scanned image — and the agent extracts the fields the business needs: dates, names, amounts, reference numbers, categories, and any other defined field. Each document is categorized automatically based on its content and type, date-stamped, and forwarded to the appropriate downstream system via API.",
    "The extraction schema is configurable per document type and per client. A business processing permits extracts different fields than a business processing contracts or a business processing financial reports. The agent is trained against each client's specific documents and downstream system requirements rather than operating against a generic template.",
  ],
  capabilities: [
    {
      title: "Multi-format document ingestion",
      description:
        "Accepts PDF, Excel, Word, scanned images, and email attachments — handling the full range of formats a business receives without pre-processing requirements.",
    },
    {
      title: "Configurable field extraction",
      description:
        "Extracts a defined set of fields per document type — dates, amounts, names, reference numbers, categories, and any business-specific fields — mapped to target system schemas.",
    },
    {
      title: "Automatic document categorization",
      description:
        "Classifies each incoming document by type and category based on content signals, routing it to the correct processing workflow without manual triage.",
    },
    {
      title: "Date-stamping and chain of custody",
      description:
        "Every document is date-stamped on ingestion with a full processing log — when it arrived, what was extracted, how it was classified, where it was sent.",
    },
    {
      title: "Downstream API routing",
      description:
        "Extracted records post to CRM, ERP, accounting, ticketing, or any system with an API connection — eliminating manual data entry at the destination.",
    },
    {
      title: "Exception queue for low-confidence extractions",
      description:
        "Documents where extraction confidence falls below the configured threshold are flagged and routed to a human review queue rather than auto-posted.",
    },
  ],
  inputs: [
    { label: "Documents in any format", format: "PDF / Excel / Word / scanned image / email attachment" },
    { label: "Field extraction schema per document type", format: "Configuration / JSON schema" },
    { label: "Document type classification rules", format: "Configuration" },
    { label: "Downstream system connection", format: "API / webhook / database" },
    { label: "Confidence threshold and exception routing rules", format: "Configuration" },
  ],
  outputs: [
    { label: "Structured extracted record per document", format: "JSON / CSV / database record" },
    { label: "Document classification and category tag", format: "Metadata field" },
    { label: "Downstream system record created or updated", format: "API write / CRM / ERP" },
    { label: "Processing log with extraction confidence scores", format: "Dashboard / CSV" },
    { label: "Exception queue for human review", format: "Dashboard / email notification" },
  ],
  howItWorks: [
    {
      step: "Document intake",
      description:
        "Documents arrive via upload, email forwarding, or API connection and are queued for processing — no manual sorting required.",
    },
    {
      step: "Classification",
      description:
        "The agent classifies each document by type using content signals, routing it to the appropriate extraction schema for that document category.",
    },
    {
      step: "Field extraction",
      description:
        "The configured fields are extracted from the document — amounts, dates, names, reference codes, and any domain-specific fields required by the target system.",
    },
    {
      step: "Confidence scoring and exception routing",
      description:
        "Each extraction is scored for confidence. High-confidence records proceed automatically; low-confidence records route to a human review queue.",
    },
    {
      step: "Downstream routing",
      description:
        "Approved records are posted to the target system via API — CRM, ERP, accounting, or any connected platform — with date-stamp and processing metadata attached.",
    },
  ],
  useCases: [
    "Use this when staff are manually entering data from incoming documents into a CRM or ERP and the volume has grown beyond what the team can keep up with.",
    "Use this when documents arrive in mixed formats from different sources and normalizing them before entry is a recurring bottleneck.",
    "Use this when a specific document type — contracts, permits, certificates, financial reports — represents a high-volume, repetitive extraction task that could be fully automated.",
    "Use this as the intake layer for a larger AI pipeline where structured data from documents feeds downstream processing agents.",
    "Use this when audit and compliance requirements mean you need a logged, traceable chain of custody from document receipt through data entry.",
  ],
  techStack: [
    "AI document extraction engine",
    "OCR pipeline",
    "Multi-format document parser",
    "API routing layer",
    "Confidence scoring engine",
    "Exception queue management",
  ],
  relatedSlugs: [
    "invoice-processing-agent",
    "bol-rate-confirmation-agent",
    "submission-processing-agent",
  ],
  cta: {
    heading: "Have a recurring document processing bottleneck?",
    subcopy:
      "Preisser Solutions configures extraction pipelines for your specific document types and target systems. The first conversation covers your document volume, formats, and where the data needs to go.",
    buttonLabel: "Scope this for my workflow",
    buttonHref: "/contact?agent=document-analysis-agent",
  },
};
