import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "business-forecast-agent",
  metaTitle: "Business Forecast Agent | Preisser Solutions",
  metaDescription:
    "Learns your entire company's existence — QuickBooks, CRM, calendar, operational data — then forecasts revenue, cash, hiring, and capacity with scenario modeling.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Business Forecast Agent",
  tagline:
    "Learns your entire company's existence — QuickBooks, CRM, calendar, operational data — then forecasts revenue, cash, hiring, and capacity.",
  category: "Intelligence & Decision Support",
  status: "deployable",
  industries: ["B2B services", "Professional services", "Field services", "Small and mid-sized business"],

  h1: "Revenue, cash, hiring, and capacity — forecasted from the data your business already has.",
  subheadline:
    "An AI forecasting agent that ingests your full operational picture — QuickBooks, CRM, calendar, job data — and produces revenue forecasts, cash flow projections, hiring timelines, and capacity models with scenario what-if analysis.",
  oneLine:
    "Multi-source ingest → time-series forecasting → scenario what-if modeling across revenue, cash, hiring, and capacity.",

  whatItDoes: [
    "Most small businesses don't have a real forecast — they have a spreadsheet with last year's numbers extended forward by a percentage. That produces a straight line when the actual business moves in curves, and it misses the signals already sitting in your systems: your CRM tells you pipeline velocity, your QuickBooks tells you cash burn rate, your calendar tells you capacity utilization, your job data tells you which services have seasonal demand patterns.",
    "The Business Forecast Agent ingests across all of those sources and builds a unified operational picture of the business. Time-series models run against the historical data to produce forward projections: revenue by service line and channel, cash position with a configurable look-ahead window, hiring and headcount requirements given current growth trajectory, and capacity utilization against service delivery constraints.",
    "Scenario modeling lets you ask what-if questions against the forecast: what happens to cash if the top client churns? What does hiring one technician do to capacity and margin? What's the break-even on a new service line at current pipeline velocity? Answers come from the model, not from gut instinct — and they update as the underlying data changes.",
  ],
  capabilities: [
    {
      title: "Multi-source data ingest",
      description:
        "Connects to QuickBooks, CRM, calendar, and operational data sources to build a unified picture of the business's historical and current state.",
    },
    {
      title: "Revenue forecasting",
      description:
        "Time-series models project revenue by service line, channel, and customer segment — accounting for seasonal patterns, pipeline velocity, and trend direction.",
    },
    {
      title: "Cash flow projection",
      description:
        "Projects cash position forward with a configurable look-ahead window, incorporating receivables timing, payables cadence, and operational expenses.",
    },
    {
      title: "Hiring and headcount modeling",
      description:
        "Calculates staffing requirements under current and projected growth trajectories, identifying when hiring decisions are needed before capacity becomes a constraint.",
    },
    {
      title: "Capacity utilization modeling",
      description:
        "Models service delivery capacity against projected demand, surfacing bottlenecks before they affect delivery quality or growth.",
    },
    {
      title: "Scenario what-if analysis",
      description:
        "Runs configurable scenarios against the baseline forecast — client churn, new hire, service line addition, pricing change — and quantifies the impact on each forecast dimension.",
    },
  ],
  inputs: [
    { label: "QuickBooks or accounting system data", format: "QuickBooks API / accounting system export" },
    { label: "CRM pipeline and customer data", format: "CRM API / CSV export" },
    { label: "Calendar and scheduling data", format: "Google Calendar / Outlook API" },
    { label: "Operational job and service data", format: "Dispatch system / CSV" },
    { label: "Forecast parameters and scenario definitions", format: "Configuration" },
  ],
  outputs: [
    { label: "Revenue forecast by service line and channel", format: "Dashboard / report" },
    { label: "Cash flow projection with look-ahead window", format: "Dashboard / report" },
    { label: "Hiring timeline and headcount requirements", format: "Report / dashboard" },
    { label: "Capacity utilization model with constraint alerts", format: "Dashboard / report" },
    { label: "Scenario what-if analysis results", format: "Dashboard / report" },
  ],
  howItWorks: [
    {
      step: "Multi-source data ingestion",
      description:
        "The agent connects to configured data sources and ingests historical operational data — financial, CRM, calendar, and job records — to build the baseline model.",
    },
    {
      step: "Pattern identification",
      description:
        "Time-series analysis identifies seasonal patterns, trend directions, and leading indicators across each data source — the signals that drive the forward projections.",
    },
    {
      step: "Forecast model generation",
      description:
        "Revenue, cash, hiring, and capacity models generate from the identified patterns, producing forward projections across each dimension.",
    },
    {
      step: "Scenario modeling",
      description:
        "Configured scenarios run against the baseline — each what-if quantifies its impact on the forecast dimensions so decisions have a numerical basis.",
    },
    {
      step: "Dashboard delivery and refresh",
      description:
        "Forecasts surface in the dashboard and refresh as underlying data updates — the picture stays current without manual model maintenance.",
    },
  ],
  useCases: [
    "Use this when revenue planning is based on last year's actuals extended by a guess, rather than on the signals already in your systems.",
    "Use this when cash flow surprises happen because the business doesn't have a forward projection — only a rearview of what already happened.",
    "Use this when hiring decisions are reactive — made after the constraint is already affecting delivery — rather than triggered by the forecast.",
    "Use this when you want to model the impact of a major decision (new client, new hire, new service line) before committing, not after.",
    "Use this when growth is outpacing the current informal planning process and the business needs a system that scales with it.",
  ],
  techStack: [
    "Multi-source data ingest layer",
    "Time-series forecasting models",
    "Scenario modeling engine",
    "QuickBooks API",
    "CRM API integration",
    "Dashboard surface",
  ],
  relatedSlugs: [
    "ai-bookkeeper",
    "ai-digital-receptionist",
    "compliance-agent",
  ],
  cta: {
    heading: "Want revenue, cash, and capacity forecasted from your actual data?",
    subcopy:
      "Preisser Solutions builds business forecast agents trained on your operational data sources. The first conversation covers what you're trying to predict and what systems currently hold the relevant data.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?product=business-forecast-agent",
  },
};
