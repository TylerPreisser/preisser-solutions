import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "ai-bookkeeper",
  metaTitle: "AI Bookkeeper",
  metaDescription:
    "Analyzes financial data, categorizes transactions with AI, detects anomalies, and posts to QuickBooks, Sage Intacct, or Xero: monthly close prep automated.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "AI Bookkeeper",
  tagline:
    "Analyzes financial data and posts it to your system.",
  category: "Operations & Back-Office",
  status: "production",
  industries: ["Professional services", "B2B services", "Field services", "Small and mid-sized business"],

  h1: "Your books updated automatically: categorized, reconciled, and ready to close.",
  subheadline:
    "An AI bookkeeping engine that categorizes transactions, detects anomalies, prepares monthly close packages, and posts directly to QuickBooks, Sage Intacct, or Xero: without manual data entry.",
  oneLine:
    "AI-powered transaction categorization, anomaly detection, and multi-system export: books maintained without manual entry.",

  whatItDoes: [
    "Bookkeeping is one of the highest-cost, lowest-value administrative tasks in any business. Transactions need to be categorized, reconciled against bank records, reviewed for anomalies, and compiled into close packages: none of which requires human judgment in the straightforward cases, but all of which consumes hours every month.",
    "The AI Bookkeeper ingests transaction data from connected accounts and applies an AI categorization engine trained on the business's chart of accounts, vendor history, and transaction patterns. Standard transactions categorize automatically. Anomalies (transactions outside expected vendor ranges, duplicate entries, unrecognized payees) are flagged for human review before posting. Monthly close packages assemble automatically: categorized transactions, reconciliation summary, flagged items, and export-ready files for the accounting system.",
    "The system connects to QuickBooks Online, Sage Intacct, and Xero for direct posting. It produces a full audit trail of every categorization decision and every exception reviewed. The engagement that proved the pattern was a full AI bookkeeping build for Sheri Hoble CPA: 457 test scenarios, production-ready, and deployable to any business managing significant transaction volume.",
  ],
  capabilities: [
    {
      title: "Transaction categorization",
      description:
        "Applies AI to classify every transaction against the business's chart of accounts: trained on vendor history and transaction patterns, not generic categories.",
    },
    {
      title: "Anomaly detection",
      description:
        "Identifies transactions outside expected vendor ranges, duplicate entries, unrecognized payees, and other anomalies before they enter the accounting system.",
    },
    {
      title: "Monthly close preparation",
      description:
        "Assembles monthly close packages automatically: categorized transactions, reconciliation summary, flagged exceptions, and export-ready files.",
    },
    {
      title: "Multi-system export",
      description:
        "Posts directly to QuickBooks Online, Sage Intacct, or Xero: no manual data entry, no CSV import, no format conversion required.",
    },
    {
      title: "Audit trail",
      description:
        "Every categorization decision and every flagged exception is logged with timestamp, rule applied, and outcome: full traceability for review or audit.",
    },
    {
      title: "Human-in-the-loop review queue",
      description:
        "Anomalies and low-confidence categorizations surface in a review queue for confirmation before posting, keeping human judgment in the loop on edge cases.",
    },
  ],
  inputs: [
    { label: "Bank and credit account transaction feeds", format: "Plaid / bank API / CSV import" },
    { label: "Chart of accounts", format: "CSV / accounting system export" },
    { label: "Vendor roster and historical categorization", format: "CSV / accounting system export" },
    { label: "Accounting system connection", format: "QuickBooks / Sage Intacct / Xero API" },
  ],
  outputs: [
    { label: "Categorized transaction records", format: "Accounting system write-back" },
    { label: "Anomaly flagging queue for human review", format: "Dashboard / email" },
    { label: "Monthly close package", format: "PDF / CSV / accounting system export" },
    { label: "Reconciliation summary", format: "Report / dashboard" },
    { label: "Audit trail of all categorization decisions", format: "Database / CSV export" },
  ],
  howItWorks: [
    {
      step: "Transaction ingestion",
      description:
        "Transactions flow in from connected bank and credit accounts via API or scheduled import, daily or on-demand.",
    },
    {
      step: "AI categorization",
      description:
        "Each transaction is classified against the chart of accounts using the AI categorization engine trained on the business's vendor history and patterns.",
    },
    {
      step: "Anomaly detection",
      description:
        "Transactions outside expected parameters are flagged before posting: duplicate entries, unrecognized payees, and out-of-range amounts route to the review queue.",
    },
    {
      step: "Human review of exceptions",
      description:
        "Flagged items surface in the review interface for human confirmation or correction before any data enters the accounting system.",
    },
    {
      step: "Accounting system posting",
      description:
        "Approved categorizations post directly to the connected accounting platform. Monthly close packages assemble automatically at the configured close date.",
    },
  ],
  useCases: [
    "Use this when transaction volume has grown to the point where manual categorization is consuming 10+ hours per month.",
    "Use this when month-end close is a manual marathon because transactions haven't been categorized consistently throughout the month.",
    "Use this when categorization errors are creating reconciliation problems that take additional time to investigate and fix.",
    "Use this when you want a bookkeeping layer that detects anomalies before they become accounting problems rather than after.",
    "Use this when the business uses QuickBooks, Sage Intacct, or Xero and wants AI-assisted categorization feeding directly into the existing system.",
  ],
  techStack: [
    "AI categorization engine",
    "Transaction anomaly detection",
    "QuickBooks Online API",
    "Sage Intacct API",
    "Xero API",
    "Ledger reconciliation engine",
  ],
  relatedSlugs: [
    "invoice-processing-agent",
    "business-forecast-agent",
    "compliance-agent",
  ],
  cta: {
    heading: "Want your books maintained without manual data entry?",
    subcopy:
      "Preisser Solutions builds AI bookkeeping engines trained on your chart of accounts, vendor history, and accounting system. The first conversation covers your current transaction volume and your accounting stack.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?product=ai-bookkeeper",
  },
};
