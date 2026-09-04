import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "invoice-processing-agent",
  metaTitle: "AI Invoice Processing Agent",
  metaDescription:
    "AI document processor that extracts vendor, line items, and GL codes from any invoice format and auto-routes for approval: 75% reduction in manual handling time.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "AI Invoice Processing Agent",
  tagline:
    "Extracts vendor, line items, and GL codes from any invoice format; auto-routes for approval.",
  category: "Operations & Back-Office",
  status: "production",
  industries: ["Oil and gas", "Field services", "B2B services", "Industrial operations"],

  h1: "Stop reading invoices manually. Let the agent extract, categorize, and route them.",
  subheadline:
    "An AI processing engine that accepts any invoice format, extracts vendor information, line items, totals, and GL codes in seconds, flags anomalies, and routes automatically for approval.",
  oneLine:
    "Eliminates manual invoice reading and data entry: any format accepted, GL codes auto-assigned, approval routing automated.",
  headlineMetric: {
    value: "75%",
    label: "reduction in manual invoice handling time",
  },

  whatItDoes: [
    "Manual invoice processing is one of the highest-cost administrative tasks in any operations-heavy business. Staff spend hours reading invoices, transcribing line items, assigning GL codes, and routing for approval: all of it repetitive, all of it error-prone, and all of it growing in volume without a natural ceiling.",
    "The AI Invoice Processing Agent eliminates the reading and transcription steps entirely. Staff upload an invoice (in any format: PDF, scan, email attachment, Excel), and the system extracts the complete structured record: vendor identity, all line items, subtotals, taxes, totals, and the appropriate GL code for each line. The system is trained on the client's specific vendor roster and approval workflows, so the GL assignments and routing logic reflect the business's actual chart of accounts, not generic categories.",
    "Anomalies (duplicate invoices, amounts outside expected ranges, unrecognized vendors) are flagged for human review. Everything else routes automatically. The system was built and proven at HG Oil Holdings, where it reduced manual invoice handling time by 75% and eliminated the need for an additional administrative hire. The same pattern deploys to any business running significant invoice volume.",
  ],
  capabilities: [
    {
      title: "Any-format invoice ingestion",
      description:
        "Accepts PDF, scanned image, email attachment, Excel, and Word formats: no manual pre-processing or format normalization required.",
    },
    {
      title: "Structured data extraction",
      description:
        "Extracts vendor identity, all line items, quantities, unit prices, subtotals, taxes, totals, and reference numbers from every invoice.",
    },
    {
      title: "GL code auto-assignment",
      description:
        "Assigns GL codes to each line item based on the client's specific chart of accounts and vendor history: trained on actual accounting structure, not generic categories.",
    },
    {
      title: "Anomaly detection and flagging",
      description:
        "Identifies duplicate invoices, amounts outside vendor-specific expected ranges, unrecognized vendors, and other anomalies before routing.",
    },
    {
      title: "Automated approval routing",
      description:
        "Routes each processed invoice to the correct approver based on amount thresholds, department, and vendor type, following the client's actual approval chain.",
    },
    {
      title: "Accounting system integration",
      description:
        "Writes processed and approved invoices to QuickBooks, Sage, NetSuite, or other accounting platforms, eliminating manual data entry entirely.",
    },
  ],
  inputs: [
    { label: "Invoices in any format", format: "PDF / image / Excel / email attachment" },
    { label: "Vendor roster and payment history", format: "CSV / accounting system export" },
    { label: "Chart of accounts and GL code structure", format: "CSV / accounting system export" },
    { label: "Approval workflow rules and thresholds", format: "Configuration document" },
    { label: "Accounting system connection", format: "API / integration" },
  ],
  outputs: [
    { label: "Structured invoice record (vendor, line items, totals, GL codes)", format: "JSON / accounting system record" },
    { label: "Approval routing notification to correct approver", format: "Email / Slack" },
    { label: "Anomaly alert for flagged invoices", format: "Email / dashboard" },
    { label: "Approved invoice posted to accounting system", format: "Accounting platform write-back" },
    { label: "Processing log and exception queue", format: "Dashboard / CSV export" },
  ],
  howItWorks: [
    {
      step: "Invoice intake",
      description:
        "Staff upload an invoice or the system receives it directly via email forwarding or API connection: any format is accepted.",
    },
    {
      step: "AI extraction",
      description:
        "The agent reads the invoice and extracts the complete structured record: vendor, all line items, quantities, prices, totals, and reference numbers.",
    },
    {
      step: "GL code assignment",
      description:
        "Each line item is matched to the appropriate GL code from the client's chart of accounts, using vendor history and line item category signals.",
    },
    {
      step: "Anomaly check and routing",
      description:
        "The system checks for anomalies against expected vendor patterns and invoice history. Clean invoices route to the appropriate approver automatically; flagged invoices go to a human review queue.",
    },
    {
      step: "Posting on approval",
      description:
        "Once approved, the structured invoice record posts directly to the accounting system: no manual data entry required.",
    },
  ],
  useCases: [
    "Use this when staff are spending 20+ hours per week manually reading, categorizing, and routing invoices and volume is growing.",
    "Use this when you're facing a hiring decision for additional administrative capacity driven primarily by invoice processing workload.",
    "Use this when duplicate invoices or data entry errors are creating reconciliation problems in your accounting system.",
    "Use this when invoices arrive in multiple formats from different vendor systems and manual normalization is a bottleneck.",
    "Use this when your approval routing is inconsistent, the right person doesn't always see the right invoice at the right time.",
  ],
  techStack: [
    "AI document extraction engine",
    "OCR pipeline",
    "GL code classification model",
    "QuickBooks / Sage / NetSuite integration",
    "Approval workflow engine",
    "Anomaly detection logic",
  ],
  linkedCaseStudySlug: "hg-oil-ai-invoice-processing",
  relatedSlugs: [
    "intelligent-inventory-monitoring",
    "ai-bookkeeper",
    "compliance-agent",
  ],
  cta: {
    heading: "Want invoice processing to stop consuming your team's time?",
    subcopy:
      "Preisser Solutions builds AI invoice processors trained on your vendor roster, GL structure, and approval chain. The first conversation covers your current volume and your accounting stack.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?product=invoice-processing-agent",
  },
};
