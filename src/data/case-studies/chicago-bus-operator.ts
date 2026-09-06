import type { CaseStudyData } from "@/types/case-study";

// Canonical project #6 — anonymized per privacy rules.
// DO NOT name the company, personnel, or SOW value.
export const caseStudy: CaseStudyData = {
  slug: "chicago-bus-operator",
  metaTitle: "Bus Operator: Ops Automation & BI",
  metaDescription:
    "A Chicago-area bus operator cut weekly reconciliation from a full day to a 15-minute exception queue with five Power BI dashboards plus AI ops automation.",
  datePublished: "2026-03-15",
  dateModified: "2026-05-20",

  category: "Business Software • Dashboards and Reporting",
  clientName: "Anonymized Chicago bus operator",
  clientNameDisplay: "A Chicago-area bus transportation operator",
  industry: "Commercial passenger transportation",

  h1: "Five Power BI Dashboards + Ops Automation for a Bus Operator",
  subheadline:
    "Workforce, revenue, safety, goals, and routes: plus AI BOL parsing, rate-confirmation parsing, and back-office reconciliation automation.",
  oneLine: "Reconciliation: full day to a 15-minute exception queue",

  headlineResults: [
    { value: "1 day → 15 min", label: "Weekly reconciliation time" },
    { value: "~1 FTE", label: "Admin work eliminated" },
    { value: "5", label: "Power BI dashboards delivered" },
    { value: "Real-time", label: "Load-level profitability" },
  ],

  hub: {
    problem:
      "There was no live view of financials or operations across branches, load-level profitability did not exist as a number anyone could look up, and weekly reconciliation ate a full day of admin time.",
    built:
      "Five operational dashboards covering workforce, revenue, safety, goals and routes, sitting on an automated back-office layer that parses bills of lading and rate confirmations and reconciles the week.",
    outcome: "A full day of weekly reconciliation became a 15-minute exception queue, about one full-time role of admin work",
  },

  before: {
    heading: "No real-time visibility into financials, operations, or load-level profit.",
    body: [
      "Before the engagement, the operator had no real-time visibility into financials or operations across branches. Load-level profitability did not exist as a number anyone could look up. Manual reconciliation consumed full days of admin time every week.",
      "Decisions had to wait on month-end reports. The principal could not see (in any given moment): which routes, branches, or customer accounts were actually making money.",
    ],
  },

  built: {
    heading: "Five dashboards and an AI back-office layer that runs in real time.",
    body: [
      "Tyler Preisser and Tim Wright designed and built five Power BI dashboards covering workforce planning, revenue and EBITDA, safety, fiscal-year goals, and route operations between late 2025 and March 2026.",
      "Underneath the dashboards, the team built an AI back-office layer: automated bill-of-lading parsing, rate-confirmation parsing, dispatch workflow support, and back-office reconciliation. Weekly reconciliation dropped from a full day to a 15-minute exception queue, and the principal gained the first real-time load-level profitability view the company had ever had.",
    ],
  },

  specifications: {
    heading: "The five dashboards and the automation layer.",
    bullets: [
      "Workforce Planning: CDL and non-CDL driver counts, payroll data, branch-level staffing",
      "Revenue and EBITDA: branch comparison, gross profit, budget vs. actual, YoY trending",
      "Safety Scorecard: safety metrics rolled up across operations",
      "FY26 Goals Tracking: goal progress visualization for the leadership team",
      "Routes and Runs: EZRoute data, trip counts, vehicle assignments, CPS school district codes",
      "AI BOL parsing + AI rate-confirmation parsing + back-office reconciliation automation",
    ],
    subsections: [
      {
        title: "Workforce Planning dashboard",
        items: [
          "CDL and non-CDL driver counts per branch",
          "Payroll data integrated for staffing decisions",
          "Branch-level staffing rolled up weekly",
        ],
      },
      {
        title: "Revenue and EBITDA dashboard",
        items: [
          "Branch-to-branch comparison",
          "Gross profit and percent difference views",
          "Budget vs. actual variance tracking",
          "Year-over-year trending",
        ],
      },
      {
        title: "Routes and Runs dashboard",
        items: [
          "Route data sourced from EZRoute",
          "Trip counts and vehicle assignments per route",
          "School district code (CPS code) tracking",
          "Operational view tied back to revenue/EBITDA",
        ],
      },
      {
        title: "Back-office automation",
        items: [
          "AI BOL (bill-of-lading) parsing pipeline",
          "AI rate-confirmation parsing",
          "Dispatch workflow support automation",
          "Back-office reconciliation reduced to an exception queue",
        ],
      },
    ],
  },

  results: [
    {
      value: "1 day → 15 min",
      label: "Weekly reconciliation time",
      context:
        "Weekly reconciliation moved from a full administrative day to a 15-minute exception-queue review.",
    },
    {
      value: "~1 FTE",
      label: "Of admin work eliminated",
      context:
        "Approximately one full-time admin role's worth of recurring work was eliminated across the back office.",
    },
    {
      value: "Real-time",
      label: "Load-level profitability visibility",
      context:
        "The principal gained the first real-time, load-level profitability view the operation had ever produced.",
    },
    {
      value: "5",
      label: "Power BI dashboards live",
      context:
        "Five dashboards covering workforce, revenue, safety, FY26 goals, and routes are running against live data.",
    },
  ],

  techStack: [
    "Power BI",
    "Azure data pipeline",
    "AI BOL parser",
    "AI rate-confirmation parser",
    "EZRoute integration",
    "Dispatch workflow automation",
    "Back-office reconciliation engine",
  ],

  relatedSlugs: [
    "alliant-mgu-insurance",
    "hg-oil-inventory-system",
    "hg-oil-ai-invoice-processing",
  ],

  cta: {
    heading: "Need real-time operational visibility your spreadsheets can't deliver?",
    subcopy:
      "Preisser Solutions builds dashboard suites plus the AI back-office automation that feeds them. Scoping begins with a conversation about your sources and your decisions.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
