import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/ai-invoice-processing-small-business
 *
 * Canonical backing: #4 (HG Oil Holdings — AI Invoice Processing Assistant),
 * #11 (AI Invoice Processing generalized pattern).
 * Reframed 2026-05-20: all quantified outcomes tied to HG Oil. Removed pricing,
 * Tyler name-drops, and capability overclaiming.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/ai-invoice-processing-small-business",
  tier: "service_detail",
  metaTitle: "AI Invoice Processing for SMBs",
  metaDescription:
    "Preisser Solutions builds AI invoice processing systems for small businesses — with HG Oil Holdings as the documented example: 75% reduction in manual handling time.",
  eyebrow: "AI Invoice Processing",
  h1: "AI Invoice Processing for Small Businesses",
  subheadline:
    "Manual invoice processing is slow, error-prone, and expensive at any volume. Preisser Solutions builds custom AI invoice processing systems that extract, match, validate, and route invoices — with a human approver before any payment leaves.",
  answerParagraph:
    "AI invoice processing for small business is the use of AI to read incoming invoices, extract structured data — vendor, invoice number, line items, totals, due dates, GL codes — match the invoice against existing records, flag anomalies, route it for approval, and post it to the accounting system. Preisser Solutions builds these systems for small and mid-sized businesses. The HG Oil Holdings build is the documented example: a custom AI invoice assistant that eliminated manual invoice reading, reduced back-office handling time by 75%, and prevented additional administrative headcount — with every payment still gated by a human approver.",
  sections: [
    {
      eyebrow: "The cost of manual invoice processing",
      heading: "The real cost of processing invoices by hand",
      body: [
        "Most small businesses handle invoice processing the same way: someone reads the invoice, types the relevant fields into QuickBooks or a similar system, matches it against the purchase order if one exists, routes it for approval, and files it. The work is slow, error-prone, and easy to fall behind on.",
        "The cost is real even at modest volumes. At 50 invoices per week, at five to ten minutes each including routing, that is four to eight hours of staff time every week — 200 to 400 hours per year. At 200 invoices per week the number compounds quickly.",
        "Hidden costs are worse: late payments that miss early-pay discounts, duplicate payments that slip through reconciliation, vendor disputes when an invoice gets lost in an inbox, and approval bottlenecks when the right person is out of office. AI invoice processing addresses all of these without requiring the business to change its accounting platform.",
      ],
    },
    {
      eyebrow: "What AI handles",
      heading: "What AI can handle in invoice processing",
      body: [
        "AI is well-suited to the parts of invoice processing that are repetitive, structured, and easy to verify. The parts that map cleanly to AI today.",
      ],
      bullets: [
        "Intake — receiving invoices from email, vendor portals, EDI feeds, or scanned paper",
        "Data extraction — reading vendor name, invoice number, date, due date, line items, quantities, unit prices, totals, and tax",
        "Format normalization — converting every vendor's format into a single consistent internal record",
        "Matching — finding the corresponding purchase order, vendor record, and inventory items in the accounting system",
        "Validation — flagging totals that do not match line items, out-of-range pricing, or duplicate invoices",
        "Categorization — assigning the right GL account, department, or project based on the invoice and historical patterns",
        "Routing — sending the invoice to the right approver based on amount, vendor, or department rules",
        "Reporting — maintaining live aging reports, exception logs, and vendor analytics without manual report-building",
      ],
    },
    {
      eyebrow: "Where humans stay in the loop",
      heading: "Where human approval must stay in the loop",
      body: [
        "AI invoice processing works because it is paired with human approval at the steps that carry real downside. The system Preisser Solutions builds keeps people in the loop on anything that matters.",
      ],
      bullets: [
        "Final payment approval — every invoice gets a human sign-off before payment is released, with the AI's extracted data and confidence indicators shown alongside for review",
        "Anomaly review — invoices flagged as duplicates, mismatched totals, or out-of-pattern amounts are reviewed by a person before any action is taken",
        "New vendor onboarding — new vendors are added by a person, not the automation, to prevent fraud",
        "Approval thresholds — invoices above a defined dollar amount require additional human review regardless of AI confidence",
        "Audit trail — every action the system takes is logged with source documents attached so any decision is traceable",
      ],
    },
    {
      eyebrow: "HG Oil Holdings — documented results",
      heading: "HG Oil Holdings — the documented reference for this build",
      body: [
        "The HG Oil Holdings AI invoice processing system is the published reference for this pattern. The results from that build.",
      ],
      bullets: [
        "75% reduction in manual invoice handling time — staff shifted from data entry to exception review and approval",
        "Eliminated manual reading and data extraction entirely — the AI reads and structures every invoice on intake",
        "Prevented additional administrative hire as invoice volume grew beyond what existing staff could absorb manually",
        "Staff freed to focus on higher-priority work rather than re-entering vendor names and line items",
        "Every payment still gated by a human approver — AI handled extraction and routing, not payment authorization",
      ],
    },
    {
      eyebrow: "Example workflow",
      heading: "What a typical AI invoice processing workflow looks like",
      body: [
        "The exact steps are tailored to each business, but the pattern is consistent across builds.",
      ],
      bullets: [
        "Invoice arrives by email, vendor portal, or scanned paper — the system picks it up automatically",
        "AI extracts vendor, invoice number, dates, line items, totals, and tax into structured fields",
        "The system matches the invoice against the corresponding PO, vendor record, and accounting entries",
        "Duplicates, math mismatches, pricing anomalies, and missing fields are flagged for human review",
        "The invoice is categorized to the right account, department, or project based on history",
        "The right approver receives the invoice with extracted data, confidence indicators, and any flags",
        "The approver reviews, edits if needed, and approves — the system then posts to the accounting platform",
        "Live aging reports, exception logs, and vendor analytics are maintained automatically",
      ],
    },
    {
      eyebrow: "Systems this connects with",
      heading: "Accounting systems and tools this integrates with",
      body: [
        "Custom AI invoice processing built by Preisser Solutions integrates with the systems the business already uses. No requirement to switch accounting platforms.",
      ],
      bullets: [
        "Accounting — QuickBooks Online, QuickBooks Desktop, Xero, NetSuite, Sage",
        "Email and document intake — Microsoft 365, Google Workspace, vendor portals, EDI feeds",
        "Approval routing — Slack, Microsoft Teams, email, or a custom approval interface built by Preisser Solutions",
        "Inventory and PO systems — ServiceTitan, Housecall Pro, Jobber, or a custom inventory system (as in the HG Oil Holdings build)",
        "Document storage — Google Drive, Dropbox, OneDrive, SharePoint",
        "Reporting — Looker Studio, Power BI, or a custom dashboard Preisser Solutions builds for the client",
      ],
    },
  ],
  faq: [
    {
      question: "Do I have to switch from QuickBooks?",
      answer:
        "No. The system is built to integrate with QuickBooks Online, QuickBooks Desktop, Xero, NetSuite, or whatever accounting platform is already in use. Switching platforms is rarely the right answer.",
    },
    {
      question: "What if the AI extracts the wrong data from an invoice?",
      answer:
        "Every invoice is routed to a human approver before payment is released. The approver sees the extracted data, confidence indicators, and any flags. Approvers can edit fields or reject the invoice. Mistakes are caught at approval, not after payment.",
    },
    {
      question: "Will AI invoice processing replace the bookkeeper?",
      answer:
        "No. The bookkeeper or AP clerk shifts from data entry to exception handling, approval review, and analytics. The HG Oil Holdings build freed staff for higher-priority work without replacing anyone.",
    },
    {
      question: "How long does it take to roll out?",
      answer:
        "Most first systems ship in six to ten weeks from kickoff, including integrations with the accounting system, document intake setup, and approval routing. The first 30 days of live operation include a tuning period where the system is reviewed against real invoices and adjusted.",
    },
    {
      question: "Is AI invoice processing secure?",
      answer:
        "Yes, when built correctly. Preisser Solutions builds these systems with proper authentication, audit logging, encrypted data storage, and access controls. The system is hosted on infrastructure the client controls, and source code is delivered to the client at handoff.",
    },
    {
      question: "What is the difference between AI invoice processing and OCR?",
      answer:
        "OCR reads text from an image. AI invoice processing uses OCR plus AI to extract structured fields, understand line items, match against existing records, validate, categorize, and route. OCR produces a text dump; AI invoice processing produces an accounting-ready, approved transaction.",
    },
    {
      question: "What types of invoice formats does this handle?",
      answer:
        "Any format — PDF, Excel, Word, image scans, EDI, and most vendor portal exports. The extraction layer is trained on the specific vendor set for each client and improves as it processes more invoices.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Hays, Kansas",
    "HG Oil Holdings",
    "QuickBooks",
    "Xero",
    "NetSuite",
    "Sage",
  ],
  relatedLinks: [
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "Business automation systems", href: "/business-automation" },
    { label: "Automate data entry", href: "/use-cases/automate-data-entry-small-business" },
    { label: "HG Oil Holdings case study", href: "/case-studies/hg-oil-inventory-system" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get the time back your team spends on invoices",
  ctaSubcopy:
    "Schedule a scoping call with Preisser Solutions. We will review the current AP workflow, identify where AI produces the best return, and send a fixed-scope proposal.",
};
