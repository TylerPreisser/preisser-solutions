import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/automate-data-entry-small-business
 *
 * Canonical backing: #4 (HG Oil Holdings — AI Invoice Processing, 95% time
 * reduction, 75% accuracy improvement), #5 (Astrus Insurance — document parsing,
 * published anonymized as "MGU within the Alliant Insurance ecosystem"),
 * #6 (Sunrise Transportation — BOL/rate-confirmation parsing, published anonymized
 * as "Chicago-area bus transportation operator").
 * Reframed 2026-05-20: all quantified outcomes tied to canonical projects.
 * Removed pricing, Tyler name-drops, and deleted internal link to
 * quickbooks-servicetitan-dashboard (now deleted).
 */
export const pageData: AeoPageData = {
  slug: "use-cases/automate-data-entry-small-business",
  tier: "service_detail",
  metaTitle: "Automate Data Entry for SMBs",
  metaDescription:
    "Data entry automation that connects forms, spreadsheets, CRMs, invoices, and dashboards, with documented results from HG Oil Holdings and others.",
  eyebrow: "Automate Data Entry",
  h1: "Automate Data Entry Without Breaking Your Existing Workflow",
  subheadline:
    "If your team is re-entering the same information into two or three systems, the fix is rarely a new platform; it is a workflow that moves data between the platforms already in use.",
  answerParagraph:
    "When employees are spending hours on data entry between forms, spreadsheets, CRMs, and accounting tools, Preisser Solutions builds the automation that moves that data automatically. We connect the systems already in place, add validation and error handling so silent failures do not pile up, and deliver logging so the team knows when something needs review. Every workflow ships with documentation and a clear way for a person to step in when something looks off.",
  sections: [
    {
      eyebrow: "When data entry becomes a bottleneck",
      heading: "When data entry becomes a bottleneck",
      body: [
        "Data entry is easy to ignore until it is out of control. A bookkeeper copies invoice totals into a spreadsheet. A sales rep retypes form submissions into the CRM. An office manager transfers job details from a field service platform into QuickBooks. None of these tasks feel like much in isolation. Together they often consume one to two full days of staff time per week per person.",
        "Bottlenecks show up in recognizable ways: reports that are always stale because nobody has updated the spreadsheet; leads that go cold because they sit in a form inbox waiting to be entered; invoices that ship late because yesterday's jobs have not been recorded. And errors compound, a person re-entering the same vendor name 50 times will eventually type it wrong.",
        "Automation handles the movement of data quietly in the background. The job is not to remove the human; it is to remove the typing.",
      ],
    },
    {
      eyebrow: "Tasks that pay off fastest",
      heading: "Data entry tasks that pay off fastest from automation",
      body: [
        "The tasks that return the most from automation are the ones triggered by a clear event and producing a clear output. The builds Preisser Solutions ships most often.",
      ],
      bullets: [
        "Web form submissions into a CRM, with lead source and campaign data attached",
        "CRM contacts into a marketing list, segmented by tag, pipeline stage, or source",
        "Invoice line items into a job-cost spreadsheet or reporting dashboard",
        "Field service job notes from ServiceTitan or Housecall Pro into QuickBooks",
        "Vendor and customer records kept in sync across CRM, accounting, and email tools",
        "Time-tracking entries from field staff into payroll or job-costing software",
        "Survey or review responses into a reporting dashboard or alert channel",
        "PDF, Excel, or scanned documents parsed into structured records in a database",
      ],
    },
    {
      eyebrow: "How automation connects existing tools",
      heading: "How automation connects the tools already in place",
      body: [
        "The most common mistake is buying a new platform when the real problem is that existing platforms do not talk. Preisser Solutions builds connections between what is already in use.",
      ],
      bullets: [
        "CRMs: HubSpot, Salesforce, Pipedrive, Zoho, or a custom CRM built by Preisser Solutions",
        "Accounting: QuickBooks Online, QuickBooks Desktop, Xero, Sage",
        "Field service: ServiceTitan, Housecall Pro, Jobber",
        "Forms and surveys: Typeform, Jotform, Google Forms, Microsoft Forms",
        "Spreadsheets and databases: Google Sheets, Excel, Airtable, custom databases",
        "Email and messaging: Microsoft 365, Google Workspace, Slack, Teams",
        "Reporting: Looker Studio, Power BI, or a custom dashboard built for the client",
        "Workflow engines: n8n, Make, Zapier, or custom code where reliability requires it",
      ],
    },
    {
      eyebrow: "How to avoid automation that creates new problems",
      heading: "How to avoid automation that creates new problems",
      body: [
        "Automation built without structure produces duplicate records, silent failures, and broken reports that go unnoticed for weeks. The patterns that prevent this are simple but must be part of the build from the start.",
      ],
      bullets: [
        "Single source of truth: every record has one system that owns it; every other system reads from there",
        "Idempotent runs: a workflow that runs twice on the same input produces the same result, not a duplicate",
        "Logging: every automation logs what it processed, what it changed, and what errors it encountered",
        "Alerts: failures, exceptions, and unusual patterns notify a person; they do not disappear silently",
        "Human override: every workflow has a documented way to pause, correct, or restart manually",
        "Documentation: the team knows what runs, when, and where to look when something looks wrong",
      ],
    },
    {
      eyebrow: "Results from real builds",
      heading: "Documented results from real data entry automation builds",
      body: [
        "The numbers below come from published case studies. Every result traces to a real project.",
      ],
      bullets: [
        "HG Oil Holdings: back-office invoice handling time reduced by 75% after switching from manual data entry to AI-powered intake and extraction",
        "HG Oil Holdings: invoice handling accuracy improved by 75% after automation eliminated manual re-entry errors",
        "An MGU within the Alliant Insurance ecosystem: same data previously entered 3–5 times across Salesforce, Majesco/Coverall, pricing spreadsheets, and billing; reduced to a single structured extraction per submission",
        "A Chicago-area bus transportation operator: bill of lading and rate-confirmation parsing automated; weekly reconciliation dropped from a full day to a 15-minute exception queue",
      ],
    },
  ],
  faq: [
    {
      question: "Do I have to switch CRMs or accounting platforms?",
      answer:
        "No. Automation is built to connect to the platforms already in use. If the business is on HubSpot, QuickBooks, ServiceTitan, or something proprietary, Preisser Solutions connects to it. Switching platforms is rarely the right answer and will not be recommended unless there is a clear operational reason.",
    },
    {
      question: "What if the automation breaks?",
      answer:
        "Every workflow Preisser Solutions builds includes logging, error alerts, and a documented way for a person to step in. If a workflow fails, the right person is notified promptly, not when someone notices the report is stale a week later.",
    },
    {
      question: "Can automation work with paper or scanned documents?",
      answer:
        "Yes. OCR and AI extraction can be included in the workflow so paper invoices, scanned forms, or PDF reports are parsed into structured data the same way digital records are. The HG Oil Holdings build handled invoices in any format.",
    },
    {
      question: "How long does it take to ship a data entry automation?",
      answer:
        "Small workflows ship in two to four weeks. Projects that connect multiple systems and include validation logic typically run six to ten weeks from kickoff. Timeline is fixed in the proposal before work begins.",
    },
    {
      question: "What is the difference between this and Zapier?",
      answer:
        "Zapier and similar tools work well for simple one-step automations between popular apps. They struggle with workflows that need validation, custom matching logic, error handling, or connections to proprietary systems. Preisser Solutions uses Zapier or Make when they are the right tool and custom code when they are not. The recommendation is based on what the workflow actually requires.",
    },
    {
      question: "Who maintains the automation after it ships?",
      answer:
        "Preisser Solutions delivers source code, documentation, and admin access to the client at handoff. There is no vendor lock-in. Optional ongoing support is available for tuning, adding new triggers, or adapting the workflow as the business changes.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Hays, Kansas",
    "HG Oil Holdings",
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
    { label: "AI invoice processing", href: "/use-cases/ai-invoice-processing-small-business" },
    { label: "HG Oil Holdings case study", href: "/case-studies/hg-oil-inventory-system" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get your team out of the data entry weeds",
  ctaSubcopy:
    "Schedule a scoping call with Preisser Solutions. We will map where staff time is going today and send a fixed-scope proposal to automate the worst of it.",
};
