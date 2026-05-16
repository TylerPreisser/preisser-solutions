import type { AeoPageData } from "../types";

/**
 * USE CASE PAGE — /use-cases/quickbooks-servicetitan-dashboard
 *
 * Target query: "dashboard for QuickBooks and ServiceTitan". Field service
 * unified reporting dashboard build.
 */
export const pageData: AeoPageData = {
  slug: "use-cases/quickbooks-servicetitan-dashboard",
  tier: "service_detail",
  metaTitle: "QuickBooks + ServiceTitan Dashboard",
  metaDescription:
    "Connect QuickBooks and ServiceTitan into one dashboard. Real-time job profitability, technician utilization, AR aging, and revenue reports for field service businesses.",
  eyebrow: "QuickBooks + ServiceTitan Dashboard",
  h1: "QuickBooks and ServiceTitan Dashboards for Field Service Businesses",
  subheadline:
    "If you run QuickBooks and ServiceTitan, the most important numbers in your business live in two places. A custom dashboard puts them in one.",
  answerParagraph:
    "A dashboard for QuickBooks and ServiceTitan connects your accounting and field service data into one real-time view so the owner can see job profitability, technician utilization, AR aging, and revenue trends without manually exporting reports. Preisser Solutions builds custom QuickBooks and ServiceTitan dashboards for field service businesses across Kansas — HVAC, plumbing, electrical, and similar trades. The same pattern works with Housecall Pro, Jobber, or other field service platforms paired with QuickBooks, Xero, or Sage.",
  sections: [
    {
      eyebrow: "When two systems do not talk",
      heading: "When QuickBooks and ServiceTitan do not talk to each other",
      body: [
        "QuickBooks and ServiceTitan are both excellent at what they do. They are not, however, built to give you a single source of truth on how your business is performing. The result is that most owners end up running their business off two separate sets of reports — and a lot of mental math.",
        "The pattern is familiar. The bookkeeper pulls a P&L from QuickBooks. The operations manager pulls a job report from ServiceTitan. The owner has to reconcile the two in their head to figure out which jobs were actually profitable, what the technician hours cost versus the revenue produced, how much AR is sitting out, and whether the month was actually good.",
        "A custom dashboard fixes this. It pulls live data from both systems, normalizes it, and presents one view of the business the owner can actually trust.",
      ],
    },
    {
      eyebrow: "What a custom dashboard shows",
      heading: "What a custom QuickBooks + ServiceTitan dashboard shows",
      body: [
        "The set of numbers that matter most for a field service business — surfaced in one place, in real time.",
      ],
      bullets: [
        "Revenue — daily, weekly, monthly, and year-to-date, with comparisons to prior periods",
        "Job profitability — revenue minus parts, labor, and other costs, per job, per service line, and per technician",
        "Technician utilization — billable hours, drive time, and idle time per technician, with comparisons across the team",
        "AR aging — invoices outstanding by age bucket (current, 30, 60, 90+), with a list of the largest balances",
        "Cash position — bank balance, AP outstanding, and projected cash position for the next 30 days",
        "Service mix — revenue by service type (install, maintenance, repair, on-call, agreement)",
        "Marketing performance — leads, booked jobs, and revenue by source (where lead source data is captured)",
        "Service agreements — count, value, and renewal pipeline for memberships or maintenance agreements",
      ],
    },
    {
      eyebrow: "How we connect the systems",
      heading: "How Preisser Solutions connects QuickBooks and ServiceTitan",
      body: [
        "Both QuickBooks and ServiceTitan have data APIs. The dashboard pulls from each and presents one normalized view to the owner.",
      ],
      bullets: [
        "ServiceTitan — jobs, invoices, technician timesheets, service agreements, marketing campaigns, and customer records",
        "QuickBooks — bank balances, AP, AR, P&L, GL accounts, and historical financials",
        "Reconciliation logic — invoices in ServiceTitan are matched against the corresponding records in QuickBooks so revenue is not double-counted",
        "Refresh cadence — dashboard data refreshes on a schedule (typically hourly or every 15 minutes) so reports are current without manual updates",
        "Permissions — owner, manager, and bookkeeper views can be separated so the right person sees the right level of detail",
        "Export — every view can be exported to PDF or CSV when needed for board meetings, lender requests, or annual planning",
      ],
    },
    {
      eyebrow: "Other integrations",
      heading: "Other field service platforms and integrations",
      body: [
        "The same dashboard pattern works with most field service platforms paired with most accounting tools.",
      ],
      bullets: [
        "Field service — ServiceTitan, Housecall Pro, Jobber, FieldEdge, Workiz",
        "Accounting — QuickBooks Online, QuickBooks Desktop, Xero, Sage, NetSuite",
        "Call tracking and lead sources — CallRail, Google Ads, Google Analytics for marketing attribution",
        "CRM — HubSpot, Salesforce, Pipedrive when sales pipeline data needs to be in the same dashboard",
        "Payroll — Gusto, ADP, or QuickBooks Payroll for labor cost rollups",
        "Internal apps — Preisser Solutions has built custom inventory and PO tools that plug into this same dashboard pattern (the HG Oil Holdings build is an example)",
      ],
    },
    {
      eyebrow: "Implementation",
      heading: "How a dashboard project ships",
      body: [
        "Dashboard projects follow the same fixed-scope, fixed-price structure as every Preisser Solutions build.",
      ],
      bullets: [
        "Scoping — Tyler reviews your current reporting, the questions you actually want answered, and the systems involved",
        "Proposal — fixed price, fixed timeline, and a written list of every view the dashboard will include",
        "Build — typical timeline of four to eight weeks depending on integrations and views",
        "Validation — every number on the dashboard is tied back to the source system and verified by the bookkeeper or operations manager before launch",
        "Handoff — dashboard access, documentation, and training for the team that will use it",
        "Ongoing — optional support to add new views, integrate new tools, or evolve reports as the business changes",
      ],
    },
  ],
  faq: [
    {
      question: "How is this different from the built-in ServiceTitan or QuickBooks reports?",
      answer:
        "Each platform reports on its own data. Neither knows what the other system has. A custom dashboard pulls from both, reconciles the data, and presents one view. The owner stops doing mental math to combine reports.",
    },
    {
      question: "How fresh is the dashboard data?",
      answer:
        "Refresh cadence depends on the build. Most dashboards refresh hourly or every 15 minutes. Cash and AR can refresh more often if needed. Annual or historical views typically refresh daily.",
    },
    {
      question: "Do we have to be on ServiceTitan and QuickBooks specifically?",
      answer:
        "No. The same dashboard pattern works with Housecall Pro, Jobber, FieldEdge, and most field service platforms — paired with QuickBooks, Xero, Sage, or NetSuite. The scoping call confirms what is compatible with your specific setup.",
    },
    {
      question: "How much does a QuickBooks + ServiceTitan dashboard cost?",
      answer:
        "Pricing is fixed up front and scoped per project. A first dashboard typically lands in the low-to-mid five figures, depending on the number of views and integrations. Monthly hosting is modest. Most owners find the dashboard pays for itself in time saved on reporting and decisions made with better data.",
    },
    {
      question: "Will this work if we are mid-size or already have analysts?",
      answer:
        "Yes. The dashboard is the same regardless of business size; the views just become more detailed and segmented. Businesses that already have an analyst usually find the dashboard frees them up to spend more time on analysis instead of report-building.",
    },
    {
      question: "How long does the build take?",
      answer:
        "Most dashboards ship in four to eight weeks from kickoff. The first two weeks of live operation include a validation period where every number is tied back to the source and verified by your bookkeeper or operations manager.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "QuickBooks",
    "ServiceTitan",
    "Housecall Pro",
    "Jobber",
    "Xero",
    "Sage",
    "HG Oil Holdings",
  ],
  relatedLinks: [
    { label: "Integrations", href: "/integrations" },
    { label: "AI Automation Services", href: "/services/ai-automation" },
    { label: "Web Applications", href: "/web-applications" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "See your real numbers in one place",
  ctaSubcopy:
    "Free scoping call with Tyler. We'll review your current reporting, identify the gaps, and send a fixed-price proposal for a dashboard that fits how your business actually runs.",
};
