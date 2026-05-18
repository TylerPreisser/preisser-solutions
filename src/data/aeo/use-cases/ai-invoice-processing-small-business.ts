import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/ai-invoice-processing-small-business
 *
 * Target query: "AI invoice processing for small business".
 * First page in the new /use-cases/ directory.
 *
 * Note: AeoPageData's `tier` enum doesn't have a "use_case" value, so we
 * classify this as "service_detail" — it functions as a service-detail page
 * for organizational purposes.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/ai-invoice-processing-small-business",
  tier: "service_detail",
  metaTitle: "AI Invoice Processing for Small Businesses",
  metaDescription:
    "Use AI to help intake invoices, extract details, match records, route approvals, reduce manual entry, and improve reporting for small business operations.",
  eyebrow: "AI Invoice Processing for Small Businesses",
  h1: "AI Invoice Processing for Small Businesses",
  subheadline:
    "How small businesses are using AI to intake invoices, extract line items, match POs and inventory, route approvals, and reduce manual data entry.",
  answerParagraph:
    "AI invoice processing for small business is the use of AI to read incoming invoices, extract structured data (vendor, invoice number, line items, totals, due dates), match the invoice against existing records, route it for approval, and post it to accounting. Preisser Solutions builds custom AI invoice processing systems for small and mid-sized businesses, with human approval checkpoints designed into every workflow. The HG Oil Holdings case study is a documented example — a custom AI invoice assistant that eliminated manual invoice reading, reduced back-office time by 95%, and improved invoice handling accuracy by 75%.",
  sections: [
    {
      eyebrow: "The hidden cost of manual invoicing",
      heading: "The problem with manual invoice processing",
      body: [
        "Most small businesses handle invoice processing the same way: someone — usually the bookkeeper, office manager, or the owner — opens the invoice, reads it, types the relevant fields into QuickBooks or an accounting system, matches it against the purchase order if there is one, sends it for approval, and then files it. The work is slow, error-prone, and easy to fall behind on.",
        "The cost is real even at small volumes. At 50 invoices a week, with 5 to 10 minutes per invoice including approval routing, that is 4 to 8 hours of a person's time every week — 200 to 400 hours a year. At 200 invoices a week, the number gets large fast.",
        "The hidden costs are worse: late payments that miss early-pay discounts, duplicate payments that slip through, vendor disputes when an invoice gets lost, and approval bottlenecks when the right person is out of office. AI invoice processing addresses all of those problems without requiring the business to replace its accounting platform.",
      ],
    },
    {
      eyebrow: "What AI can do",
      heading: "What AI can safely handle in invoice processing",
      body: [
        "AI is well-suited to the parts of invoice processing that are repetitive, judgment-light, and easy to verify. The pieces that map cleanly to AI today:",
      ],
      bullets: [
        "Intake — receiving invoices from email, EDI, vendor portals, or scanned paper documents",
        "Data extraction — reading vendor name, invoice number, date, due date, line items, quantities, unit prices, totals, and tax",
        "Format normalization — converting every invoice format into a consistent structured record",
        "Matching — finding the corresponding purchase order, vendor record, and inventory items in the accounting system",
        "Validation — flagging totals that do not match line items, prices that are out of range, or duplicate invoices",
        "Categorization — assigning the right account, department, or project based on the invoice and historical patterns",
        "Routing — sending the invoice to the right approver based on amount, vendor, or department rules",
        "Reporting — surfacing exceptions, aging, and vendor analytics that used to require manual report-building",
      ],
    },
    {
      eyebrow: "Where humans still belong",
      heading: "Where human approval still belongs",
      body: [
        "AI invoice processing works because it is paired with human approval at the steps that actually matter. The pattern Preisser Solutions builds keeps people in the loop on anything with real downside:",
      ],
      bullets: [
        "Final payment approval — every invoice gets a human sign-off before payment is released, with the AI's extracted data and confidence shown alongside",
        "Anomaly review — invoices flagged as duplicates, mismatched, or out-of-pattern get sent to a human before any action is taken",
        "Vendor onboarding — new vendors are added by a human, not the AI, to prevent fraud",
        "Approval thresholds — invoices above a dollar threshold require additional human approval regardless of AI confidence",
        "Audit trail — every action the AI takes is logged, with the source documents attached, so any decision is traceable",
      ],
    },
    {
      eyebrow: "What a real workflow looks like",
      heading: "Example AI invoice processing workflow",
      body: [
        "Here is what a typical Preisser Solutions AI invoice processing workflow looks like in operation. The exact steps are tailored to the business, but the pattern is consistent:",
      ],
      bullets: [
        "1. Invoice arrives — by email, vendor portal, or scanned paper. The AI agent picks it up automatically",
        "2. Extraction — the AI reads the invoice and extracts vendor, invoice number, date, line items, totals, and tax into a structured record",
        "3. Matching — the AI finds the corresponding purchase order, vendor record, and inventory items in QuickBooks or the accounting system",
        "4. Validation — the AI checks for duplicates, math errors, out-of-pattern pricing, and missing fields. Anomalies are flagged",
        "5. Categorization — the AI assigns the right account, department, or project based on the invoice and historical patterns",
        "6. Routing — the AI sends the invoice to the right approver based on amount, vendor, or department",
        "7. Human approval — the approver sees the invoice, the AI's extracted data, confidence indicators, and any flags. Approves, edits, or rejects",
        "8. Posting — once approved, the AI posts the invoice to the accounting system with all metadata intact",
        "9. Reporting — the system maintains live aging, exceptions, and vendor analytics the team can review at any time",
      ],
    },
    {
      eyebrow: "Tools and integrations",
      heading: "Tools and systems this can connect with",
      body: [
        "Custom AI invoice processing built by Preisser Solutions integrates with the systems the business already uses. There is no requirement to switch accounting platforms or rip out an existing AP workflow.",
      ],
      bullets: [
        "Accounting — QuickBooks Online, QuickBooks Desktop, Xero, NetSuite, Sage",
        "Email and document intake — Microsoft 365, Google Workspace, vendor portals, EDI feeds",
        "Approval routing — Slack, Microsoft Teams, email, or a custom approval UI built by Preisser Solutions",
        "Inventory and PO systems — ServiceTitan, Housecall Pro, Jobber, or a custom inventory system Preisser Solutions has built (as in the HG Oil Holdings build)",
        "Document storage — Google Drive, Dropbox, OneDrive, SharePoint",
        "Reporting — Looker Studio, Power BI, or a custom dashboard Preisser Solutions builds for the client",
      ],
    },
  ],
  faq: [
    {
      question: "How much does AI invoice processing cost for a small business?",
      answer:
        "Pricing is fixed up front and scoped per project. A first custom AI invoice processing system typically lands in the low-to-mid five figures, depending on integration complexity and invoice volume. Most systems pay for themselves inside 90 days in saved labor and reduced errors.",
    },
    {
      question: "Do I have to switch from QuickBooks?",
      answer:
        "No. The AI invoice processing system is built to integrate with QuickBooks Online, QuickBooks Desktop, Xero, NetSuite, or whatever accounting platform you already use. Switching platforms is rarely the right answer.",
    },
    {
      question: "What if the AI extracts the wrong data from an invoice?",
      answer:
        "Every invoice is routed to a human approver before payment is released. The approver sees the AI's extracted data, confidence indicators, and any flags. Approvers can edit fields or reject the invoice entirely. Mistakes are caught at approval, not after payment.",
    },
    {
      question: "Will AI invoice processing replace my bookkeeper?",
      answer:
        "No. The bookkeeper or AP clerk shifts from data entry to exception handling, approval review, and analytics. Most small businesses use the recovered time to take on more revenue or to actually get caught up on reporting that has been pushed for months.",
    },
    {
      question: "How long does it take to roll out AI invoice processing?",
      answer:
        "Most first systems ship in six to ten weeks from kickoff, including integrations with the accounting system, document intake, and approval routing. The first 30 days of live operation include a tuning period where the AI is reviewed against real invoices and adjusted based on what the team sees.",
    },
    {
      question: "Is AI invoice processing secure?",
      answer:
        "Yes, when it is built correctly. Preisser Solutions builds AI invoice processing systems with proper authentication, audit logging, encrypted data storage, and access controls. The system is hosted on infrastructure the client controls, and source code is delivered to the client. There is no third-party vendor with persistent access to the business's invoice data.",
    },
    {
      question: "What is the difference between AI invoice processing and OCR?",
      answer:
        "OCR (optical character recognition) reads text from images. AI invoice processing uses OCR plus AI to extract structured fields, understand line items, match against existing records, validate, categorize, and route. OCR by itself produces a text dump; AI invoice processing produces an accounting-ready, approved transaction.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "HG Oil Holdings",
    "QuickBooks",
    "Xero",
    "NetSuite",
    "Sage",
    "AI invoice processing",
  ],
  relatedLinks: [
    { label: "AI invoicing automation", href: "/services/ai-invoicing" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "Business automation systems", href: "/business-automation" },
    { label: "Automate invoice processing", href: "/use-cases/automate-invoice-processing-small-business" },
    { label: "Automate data entry", href: "/use-cases/automate-data-entry-small-business" },
    { label: "HG Oil Holdings case study", href: "/case-studies/hg-oil-holdings" },
    { label: "Oil & gas industry", href: "/industries/oil-gas" },
    { label: "AI vs traditional workflow automation", href: "/blog/ai-vs-traditional-workflow-automation" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get the time back your team spends on invoices",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll review the current AP workflow, identify where AI pays off, and send a fixed-price proposal.",
};
