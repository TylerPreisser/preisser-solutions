import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/automate-data-entry-small-business
 *
 * Target query: "employees wasting time on data entry" — small businesses
 * pushing information between CRMs, spreadsheets, forms, and accounting.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/automate-data-entry-small-business",
  tier: "service_detail",
  metaTitle: "Automate Data Entry for Small Businesses",
  metaDescription:
    "Preisser Solutions builds data entry automation for small businesses that need to move information between forms, spreadsheets, CRMs, invoices, and dashboards.",
  eyebrow: "Automate Data Entry for Small Businesses",
  h1: "Automate Data Entry Without Breaking Your Existing Workflow",
  subheadline:
    "If you have employees wasting time on data entry between forms, spreadsheets, and your CRM, automation is the cleanest fix.",
  answerParagraph:
    "When you have employees wasting time on data entry, the answer is usually not a new platform — it is a workflow that moves data between the platforms you already use. Preisser Solutions builds custom data entry automation for small businesses in Kansas and beyond. We connect forms, spreadsheets, CRMs, invoicing tools, and dashboards so the same information stops getting retyped four times. Every workflow ships with logging, validation, and a clear way for a human to step in when something looks off.",
  sections: [
    {
      eyebrow: "When data entry becomes a bottleneck",
      heading: "When data entry becomes a bottleneck",
      body: [
        "Data entry is one of the easiest tasks to ignore until it gets out of control. A bookkeeper copies invoice totals into a spreadsheet. A sales rep retypes form submissions into the CRM. An office manager moves job details from one job-management system into QuickBooks. None of these tasks feel like much in isolation. Together they often consume one to two full days of staff time per week per person.",
        "Bottlenecks show up in predictable ways. Reports lag because nobody has updated the spreadsheet. Leads get cold because they sit in a form inbox waiting to be entered into the CRM. Invoices ship late because the office manager has not caught up on the data entry from yesterday's jobs. Errors creep in because a person typing the same vendor name 50 times will eventually type it wrong.",
        "Automation handles all of that quietly in the background. The job is not to remove the human — it is to remove the typing.",
      ],
    },
    {
      eyebrow: "Common tasks to automate",
      heading: "Common data entry tasks to automate",
      body: [
        "The data entry tasks that pay off fastest from automation tend to be the ones that happen on a clear trigger and produce a clear output. A short list of what Preisser Solutions builds most often.",
      ],
      bullets: [
        "Web form submissions into a CRM, with lead source and campaign attached",
        "CRM contacts into a marketing list, segmented by tag, stage, or source",
        "Invoice line items into a job-cost spreadsheet or reporting dashboard",
        "Field service job notes from ServiceTitan or Housecall Pro into QuickBooks",
        "Vendor and customer records kept in sync across the CRM, accounting, and email tools",
        "Time-tracking entries into payroll software",
        "Survey or review responses into a reporting dashboard or alert channel",
        "PDF reports parsed into structured records in a database or spreadsheet",
      ],
    },
    {
      eyebrow: "How automation connects your tools",
      heading: "How automation connects your existing tools",
      body: [
        "The mistake most small businesses make with automation is buying a new platform when the real problem is that the existing platforms do not talk. Preisser Solutions almost always uses what is already in place.",
      ],
      bullets: [
        "CRMs — HubSpot, Salesforce, Pipedrive, Zoho, or a custom CRM built by Preisser Solutions",
        "Accounting — QuickBooks Online, QuickBooks Desktop, Xero, Sage",
        "Field service — ServiceTitan, Housecall Pro, Jobber",
        "Forms and surveys — Typeform, Jotform, Google Forms, Microsoft Forms",
        "Spreadsheets — Google Sheets, Excel, Airtable",
        "Email and chat — Microsoft 365, Google Workspace, Slack, Teams",
        "Reporting — Looker Studio, Power BI, or a custom dashboard built for the client",
        "Workflow engines — n8n, Make, Zapier, or custom code where reliability matters",
      ],
    },
    {
      eyebrow: "How to avoid messy automation",
      heading: "How to avoid messy automation that creates new problems",
      body: [
        "Automation done poorly produces duplicate records, broken reports, and silent failures that go unnoticed for weeks. The patterns that prevent it are not complicated, but they have to be built in from the start.",
      ],
      bullets: [
        "Single source of truth — every record has one system that owns it, and every other system reads from there",
        "Idempotent runs — a workflow that runs twice on the same input produces the same result, not a duplicate",
        "Logging — every automation logs what it did, what input it received, and what it changed",
        "Alerts — failures, exceptions, and unusual patterns go to a human, not into a void",
        "Human override — every workflow has a documented way for a person to step in and correct or pause it",
        "Documentation — the team knows what runs, when, and where to look when something is wrong",
      ],
    },
    {
      eyebrow: "ROI examples",
      heading: "ROI examples from real automation projects",
      body: [
        "Documented results from Preisser Solutions automation builds. These are the public, verifiable numbers from current case studies.",
      ],
      bullets: [
        "HG Oil Holdings — back-office invoice handling time reduced by 95% after switching from manual data entry to automated intake and extraction",
        "HG Oil Holdings — invoice handling accuracy improved by 75% after automation eliminated retyping errors",
        "Cassidy HVAC — 60% of dormant customers reactivated through an automated follow-up workflow, with a 45% lift in service bookings",
        "Typical pattern — five to fifteen hours per week per person recovered, depending on how much manual data movement is in the workflow today",
      ],
    },
  ],
  faq: [
    {
      question: "How much does data entry automation cost?",
      answer:
        "Pricing is fixed up front and scoped per project. A small first automation typically lands in the low five figures. The total depends on how many systems need to connect and how much logic the workflow needs. Most automations pay for themselves inside 90 days in saved labor.",
    },
    {
      question: "Do I have to switch CRMs or accounting platforms?",
      answer:
        "No. Automation is built to connect to the platforms you already use. If you are on HubSpot, QuickBooks, ServiceTitan, or something custom, we connect to it. Switching platforms is rarely the right move.",
    },
    {
      question: "What if the automation breaks?",
      answer:
        "Every automation we build includes logging, error alerts, and a documented way for a person to step in. If a workflow fails, the right person gets notified within minutes — not when someone notices the report is stale a week later.",
    },
    {
      question: "Can automation work with paper or scanned documents?",
      answer:
        "Yes. We can include OCR and AI extraction in the workflow so paper invoices, scanned forms, or PDF reports get parsed into structured data the same way digital records do.",
    },
    {
      question: "How long does it take to ship a data entry automation?",
      answer:
        "Small workflows ship in two to four weeks. Larger projects that connect multiple systems and include validation logic typically run six to ten weeks from kickoff. We commit to a fixed timeline in the proposal.",
    },
    {
      question: "What is the difference between this and Zapier?",
      answer:
        "Zapier and similar tools work well for simple one-step automations. They struggle with workflows that need validation, error handling, custom logic, or complex matching. Preisser Solutions uses Zapier or Make when they are the right tool, and custom code when they are not. The recommendation is based on what the workflow actually needs.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "HG Oil Holdings",
    "Cassidy HVAC",
    "QuickBooks",
    "HubSpot",
    "ServiceTitan",
    "n8n",
    "Zapier",
  ],
  relatedLinks: [
    { label: "Business automation systems", href: "/business-automation" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "API integration service", href: "/services/api-integration" },
    { label: "Automate invoice processing", href: "/use-cases/automate-invoice-processing-small-business" },
    { label: "QuickBooks + ServiceTitan dashboard", href: "/use-cases/quickbooks-servicetitan-dashboard" },
    { label: "HG Oil Holdings case study", href: "/case-studies/hg-oil-holdings" },
    { label: "AI vs traditional workflow automation", href: "/blog/ai-vs-traditional-workflow-automation" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get your team out of the data entry weeds",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll map where time is going today and send a fixed-price proposal to automate the worst of it.",
};
