import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "bol-rate-confirmation-agent",
  metaTitle: "BOL & Rate-Confirmation Parsing Agent | Preisser Solutions",
  metaDescription:
    "Extracts structured data from bills of lading and broker rate-confirmation PDFs; routes parsed records to dispatch and back-office automatically.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "BOL & Rate-Confirmation Parsing Agent",
  tagline:
    "Extracts structured data from bills of lading and broker rate-confirmation PDFs; routes to dispatch and back-office.",
  category: "Operations & Back-Office",
  status: "production",
  industries: ["Logistics", "Commercial transportation", "Trucking and freight"],

  h1: "Bills of lading and rate confirmations — structured and routed in seconds.",
  subheadline:
    "An AI parsing pipeline that reads broker rate-confirmation PDFs and bills of lading in any format, extracts load details, rates, and carrier data, and routes structured records to dispatch and back-office systems automatically.",
  oneLine:
    "Eliminates manual BOL and rate-confirmation data entry by extracting and routing structured load data in seconds.",

  whatItDoes: [
    "In transportation and logistics operations, bills of lading and broker rate confirmations represent a constant high-volume document processing task. Every load generates at least one of each — and they arrive in different formats from different brokers and carriers, each with their own layout for the same underlying data. Manual processing means someone reads each document, extracts the relevant fields, enters them into dispatch and accounting systems, and files the original.",
    "The BOL and Rate-Confirmation Parsing Agent automates that extraction entirely. Rate-confirmation PDFs from brokers — regardless of format — are parsed for load details: origin, destination, rate, broker name, carrier assignment, pickup and delivery windows, accessorial charges, and reference numbers. Bills of lading are parsed for shipment confirmation data: shipper, consignee, commodity, weight, piece count, and freight class. Both document types route their structured data to dispatch and back-office systems automatically.",
    "The system was built and deployed for a Chicago-area bus transportation operator as part of a broader back-office automation engagement, where it contributed to a weekly reconciliation reduction from a full day to a 15-minute exception queue. The same parsing architecture applies to any trucking, freight, or transportation operation processing BOLs and rate confirmations at volume.",
  ],
  capabilities: [
    {
      title: "Multi-format rate-confirmation parsing",
      description:
        "Reads broker rate-confirmation PDFs from any brokerage format — no template required — and extracts load details, rates, accessorials, and reference numbers.",
    },
    {
      title: "Bill of lading extraction",
      description:
        "Parses BOL documents for shipment data: shipper, consignee, commodity, weight, piece count, freight class, and carrier identifiers.",
    },
    {
      title: "Dispatch system routing",
      description:
        "Routes extracted load records directly to the dispatch system — creating or updating load entries without manual re-entry.",
    },
    {
      title: "Back-office accounting integration",
      description:
        "Sends rate and carrier data to the accounting system so payable and receivable records are created at the same time the load is dispatched.",
    },
    {
      title: "Discrepancy and anomaly flagging",
      description:
        "Detects rate discrepancies between confirmation and BOL, missing required fields, and carrier data mismatches — flagging them for review before they become reconciliation problems.",
    },
    {
      title: "Reconciliation audit trail",
      description:
        "Maintains a timestamped log of every document processed, every field extracted, and every routing action taken — reducing weekly reconciliation to exception review only.",
    },
  ],
  inputs: [
    { label: "Broker rate-confirmation PDFs", format: "PDF (any broker format)" },
    { label: "Bills of lading", format: "PDF / scanned image" },
    { label: "Dispatch system connection", format: "API / webhook" },
    { label: "Accounting system connection", format: "API / integration" },
    { label: "Reference number and carrier master data", format: "CSV / system export" },
  ],
  outputs: [
    { label: "Structured load record in dispatch system", format: "Dispatch platform write-back" },
    { label: "Payable/receivable record in accounting system", format: "Accounting platform write-back" },
    { label: "Anomaly and discrepancy alert", format: "Email / Slack notification" },
    { label: "Full processing log per document", format: "Dashboard / CSV export" },
    { label: "Exception queue for manual review", format: "Dashboard / email" },
  ],
  howItWorks: [
    {
      step: "Document intake",
      description:
        "Rate confirmations and BOLs arrive via email forwarding, upload, or direct integration with a TMS or document inbox.",
    },
    {
      step: "Document type classification",
      description:
        "The agent classifies each incoming document as a rate confirmation or bill of lading and routes it to the appropriate extraction workflow.",
    },
    {
      step: "Structured data extraction",
      description:
        "The relevant fields are extracted from each document type: rates, load details, and reference data from confirmations; shipment data from BOLs.",
    },
    {
      step: "Anomaly detection",
      description:
        "The system checks extracted data against expected ranges and cross-references between confirmation and BOL — flagging discrepancies before routing.",
    },
    {
      step: "Dispatch and back-office routing",
      description:
        "Clean records route automatically to the dispatch system and accounting platform. Flagged records go to the exception queue for human review.",
    },
  ],
  useCases: [
    "Use this when back-office staff are manually entering rate confirmation data into dispatch or accounting systems and volume is growing faster than headcount.",
    "Use this when weekly reconciliation involves manually matching BOLs to rate confirmations and the process consumes a full day or more.",
    "Use this when broker rate confirmations arrive in dozens of different formats and normalizing them before entry adds hours of processing time.",
    "Use this when load data discrepancies between confirmations and BOLs are creating accounting errors that require time-consuming correction.",
    "Use this as the document processing layer in a broader transportation back-office automation stack.",
  ],
  techStack: [
    "AI document extraction engine",
    "OCR pipeline",
    "PDF parsing engine",
    "Dispatch system integration",
    "Accounting platform integration",
    "Anomaly detection logic",
  ],
  linkedCaseStudySlug: "chicago-bus-operator",
  relatedSlugs: [
    "document-analysis-agent",
    "invoice-processing-agent",
    "inventory-operations-agent",
  ],
  cta: {
    heading: "Want BOL and rate-confirmation processing off your team's plate?",
    subcopy:
      "Preisser Solutions builds parsing pipelines configured for your broker formats, dispatch system, and accounting stack. The first conversation covers your document volume and your current reconciliation process.",
    buttonLabel: "Scope this for my operation",
    buttonHref: "/contact?agent=bol-rate-confirmation-agent",
  },
};
