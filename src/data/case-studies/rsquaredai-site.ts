import type { CaseStudyData } from "@/types/case-study";

// Canonical project #24 — rsquaredai.com (R Squared AI corporate site).
// Built by Tyler Preisser as part of his CPO role at R Squared AI.
// See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "rsquaredai-site",
  metaTitle: "rsquaredai.com — Enterprise SaaS Marketing Site",
  metaDescription:
    "Corporate website for R Squared AI's agentic CRM platform — dark-mode B2B marketing site with platform showcase, industry verticals, and enterprise positioning.",
  datePublished: "2026-05-16",
  dateModified: "2026-05-20",

  category: "Website Build • B2B SaaS",
  clientName: "R Squared AI",
  clientNameDisplay: "R Squared AI",
  industry: "Agentic AI for CRM and sales operations",

  h1: "rsquaredai.com — Enterprise SaaS Marketing Site for an AI Agent Platform",
  subheadline:
    "Corporate website for R Squared AI's agentic CRM platform — a clean dark-mode B2B marketing site with platform showcase, industry verticals, deployment process, and team bios.",
  oneLine:
    "Corporate website for R Squared AI's agentic CRM platform — clean dark-mode B2B marketing site with platform showcase, industry verticals, and enterprise positioning.",

  headlineResults: [
    { value: "6", label: "Platform capabilities" },
    { value: "3", label: "Industry verticals" },
    { value: "6–8 wk", label: "Deployment claim" },
    { value: "Enterprise", label: "Sales motion" },
  ],

  before: {
    heading: "A new category that needed enterprise-credibility marketing.",
    body: [
      "Agentic AI for sales is a new category. R Squared AI's positioning — production-grade AI agents that solve the 'CRM graveyard' problem for enterprise sales organizations — required a marketing surface that could carry that pitch into insurance, private equity, and manufacturing buying processes without looking like another generic AI startup landing page.",
      "The site had to do three jobs at once: explain a new platform category clearly, showcase six distinct platform capabilities without flattening them into one paragraph, and project enterprise-credibility for security-conscious buyers evaluating an agent platform on their data layer.",
    ],
  },

  built: {
    heading: "A full corporate marketing site for an agentic CRM platform.",
    body: [
      "Built by Tyler Preisser as part of his CPO role at R Squared AI, the site is a full corporate marketing surface for the agentic CRM platform. Six platform capability sections — Pipeline Intelligence (deal health scoring), Expansion & Cross-Sell (whitespace identification), Sales Enablement (automatic call logging), Orchestrated Intelligence (a unified data layer), Stack Integration (Salesforce, Dynamics 365, HubSpot, Power BI, Snowflake), and Compliance & Audit (full logging and explainable AI) — anchor the platform showcase.",
      "Three industry vertical pages target the platform's primary buyers: insurance, private equity, and manufacturing. A scrolling narrative threads the story together — platform capabilities, then industry verticals, then results and case studies, then the deployment process, then team bios, then newsletter signup. The visual system runs on modern typography hierarchy, generous whitespace, and a clean dark/light minimalist aesthetic.",
      "Distinctive positioning claims live on-site and support the enterprise sales motion: 6–8 weeks discovery to production, zero rip-and-replace migrations, full audit trails with explainable AI, no data replication to vendor servers, and a team of operators rather than consultants.",
    ],
  },

  specifications: {
    heading: "Platform showcase, vertical pages, and enterprise positioning.",
    bullets: [
      "Clean dark/light minimalist aesthetic with scrolling narrative",
      "Modern typography hierarchy with generous whitespace",
      "Six platform capability sections — Pipeline Intelligence, Expansion & Cross-Sell, Sales Enablement, Orchestrated Intelligence, Stack Integration, Compliance & Audit",
      "Three industry verticals — insurance, private equity, manufacturing",
      "Site structure — Platform → Industries → Results → Deployment → Team → Newsletter",
      "Enterprise-integration showcase covering Salesforce, Dynamics 365, HubSpot, Power BI, Snowflake, and Slack",
    ],
    subsections: [
      {
        title: "Platform capabilities surfaced",
        items: [
          "Pipeline Intelligence — deal health scoring",
          "Expansion & Cross-Sell — whitespace identification",
          "Sales Enablement — automatic call logging",
          "Orchestrated Intelligence — unified data layer across the stack",
          "Stack Integration — Salesforce, Dynamics 365, HubSpot, Power BI, Snowflake",
          "Compliance & Audit — full logging and explainable AI",
        ],
      },
      {
        title: "Positioning claims supporting the sales motion",
        items: [
          "6–8 weeks discovery to production",
          "Zero rip-and-replace migrations",
          "Full audit trails with explainable AI",
          "No data replication to vendor servers",
          "Team of operators, not consultants",
        ],
      },
      {
        title: "Industry verticals targeted",
        items: [
          "Insurance",
          "Private equity",
          "Manufacturing",
        ],
      },
    ],
  },

  results: [
    {
      value: "6",
      label: "Platform capabilities articulated",
      context:
        "Six distinct platform capability sections — Pipeline Intelligence, Expansion & Cross-Sell, Sales Enablement, Orchestrated Intelligence, Stack Integration, and Compliance & Audit — anchor the platform showcase.",
    },
    {
      value: "3",
      label: "Industry verticals targeted",
      context:
        "Insurance, private equity, and manufacturing each get a dedicated vertical page to carry the platform pitch into specific buying processes.",
    },
    {
      value: "6–8 wk",
      label: "Deployment claim surfaced",
      context:
        "The 6–8 weeks discovery-to-production claim is visible on-site as part of the enterprise positioning, alongside zero rip-and-replace migrations and full audit trails.",
    },
    {
      value: "Enterprise",
      label: "Sales motion supported",
      context:
        "Modern typography, generous whitespace, enterprise-integration showcase, and compliance/audit messaging combine to support an enterprise sales motion targeting insurance, PE, and manufacturing buyers.",
    },
  ],

  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Modern hosting",
  ],

  relatedSlugs: [
    "preisser-solutions-site",
    "tyler-preisser-site",
    "alliant-mgu-insurance",
  ],

  cta: {
    heading: "Need an enterprise SaaS marketing site that carries a new category?",
    subcopy:
      "Preisser Solutions builds corporate marketing surfaces for platform companies — capability showcases, vertical pages, and enterprise positioning. Scoping begins with a conversation.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },

  statusNote:
    "Built by Tyler Preisser as part of his CPO role at R Squared AI. Build and architecture are real and live. Specific lead, conversion, and pipeline outcomes are not claimed until independently confirmed.",
};
