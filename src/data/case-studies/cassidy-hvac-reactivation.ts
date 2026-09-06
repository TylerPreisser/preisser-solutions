import type { CaseStudyData } from "@/types/case-study";

// Canonical project #1 — Cassidy HVAC AI Customer Reactivation Engine.
// Named client with consent. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "cassidy-hvac-reactivation",
  metaTitle: "Cassidy HVAC: 60%+ Reactivation",
  metaDescription:
    "Cassidy HVAC reactivated 60%+ of dormant customers in 6 weeks through an AI-powered SMS and email outreach engine built by Preisser Solutions.",
  datePublished: "2024-09-15",
  dateModified: "2026-05-20",

  category: "Business Automation • Revenue Recovery",
  clientName: "Cassidy HVAC",
  clientNameDisplay: "Cassidy HVAC",
  industry: "HVAC services",

  h1: "Cassidy HVAC: 60%+ Customer Reactivation in 6 Weeks",
  subheadline:
    "AI-powered SMS and email outreach engine that scrubbed 43K+ broken customer records, segmented by service history, and ran daily without staff input.",
  oneLine: "60%+ dormant customer reactivation in 6 weeks",

  headlineResults: [
    { value: "60%+", label: "Dormant customers reactivated" },
    { value: "45%+", label: "Booking conversion lift" },
    { value: "10+ hrs/wk", label: "Staff time recovered" },
    { value: "100%", label: "Promotional messaging automated" },
  ],

  hub: {
    problem:
      "Tens of thousands of dormant customer records sat scattered and broken across several systems, and the only outreach was whatever the office staff found time to send by hand.",
    built:
      "An outreach engine that cleans and segments the customer data, writes each message from that customer's service history, equipment age and season, and sends by SMS and email on its own daily schedule.",
    outcome: "60%+ of dormant customers reactivated in six weeks, with staff sending nothing by hand",
  },

  before: {
    heading: "Tens of thousands of dormant records nobody had time to call.",
    body: [
      "Cassidy HVAC was sitting on tens of thousands of dormant customer records. The data was scattered, broken, and unusable across multiple systems: service histories in one place, contact information in another, equipment notes somewhere else entirely.",
      "Office staff sent occasional reminders manually. The cadence was inconsistent. There was no tracking, no segmentation, and no way to measure whether outreach was even reaching the right customers. Every dormant record represented potential lost revenue on tune-ups, maintenance plans, callbacks, and referrals, and the list kept growing.",
    ],
  },

  built: {
    heading: "An AI engine that cleans the data, writes the message, and sends it daily.",
    body: [
      "Preisser Solutions built an AI-powered SMS and email outreach engine. The system first uses AI to scrub through broken dispatch data across multiple internal systems, cleaning and segmenting 43,000+ dormant customer records into usable cohorts.",
      "Once the data is clean, the engine crafts hyper-personalized messages for each customer based on service history, equipment age, and seasonal context: then sends them through dual SMS and email channels. The system runs daily without human input, auto-splits tests for higher response rates, and feeds every outcome back into the CRM.",
    ],
  },

  specifications: {
    heading: "How the system runs.",
    bullets: [
      "Dual-channel outreach (SMS and email) with channel selection per-customer",
      "AI personalization on service history, equipment type and age, seasonal timing, and behavioral triggers",
      "Automated A/B split testing across message variants for higher response rates",
      "Daily autonomous execution with zero staff involvement post-deployment",
      "Full CRM integration: outcomes feed back into customer records",
      "Cleaned and segmented 43,000+ broken dormant records across multiple internal systems",
    ],
    subsections: [
      {
        title: "Personalization variables",
        items: [
          "Service history per customer (most recent visit, recurring services)",
          "Equipment type and age (HVAC system year, replacement cadence)",
          "Seasonal timing (tune-up windows, peak-demand cycles)",
          "Behavioral triggers (no-response follow-ups, click-throughs)",
        ],
      },
      {
        title: "Operational profile",
        items: [
          "Zero staff time required after launch",
          "Daily automated send schedule with cooldowns per customer",
          "A/B variant testing runs automatically; winners promoted",
          "CRM round-trip: every reply, booking, or opt-out is logged",
        ],
      },
    ],
  },

  results: [
    {
      value: "60%+",
      label: "Dormant customer reactivation in 6 weeks",
      context:
        "Over 60% of previously inactive customers re-engaged with Cassidy HVAC within the first six weeks of the engine going live.",
    },
    {
      value: "45%+",
      label: "Booking conversion lift",
      context:
        "Booking conversion rate on reactivated customers rose 45%+ versus the prior manual outreach baseline.",
    },
    {
      value: "10+ hrs/wk",
      label: "Office staff time recovered",
      context:
        "Office staff time spent on manual follow-ups, reminders, and confirmations dropped by 10 or more hours per week.",
    },
    {
      value: "100%",
      label: "Automation of promotional messaging",
      context:
        "All promotional and reminder messaging moved to automated execution: no daily staff intervention required.",
    },
  ],

  techStack: [
    "AI personalization engine",
    "SMS gateway",
    "Email automation",
    "CRM integration",
    "A/B testing harness",
    "Data cleansing pipeline",
  ],

  relatedSlugs: [
    "cassidy-hvac-marketing-engine",
    "hg-oil-ai-invoice-processing",
    "alliant-mgu-insurance",
  ],

  cta: {
    heading: "Have a dormant customer list draining revenue?",
    subcopy:
      "Preisser Solutions can scope an AI reactivation engine for your business: clean the data, segment the list, and run hyper-personalized outreach on autopilot.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
