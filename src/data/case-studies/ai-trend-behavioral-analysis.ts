import type { CaseStudyData } from "@/types/case-study";

// Canonical project #19 — AI Trend & Behavioral Analysis.
// Capability. The analytical backbone behind Alpha Matrix and MarCommand.
// See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "ai-trend-behavioral-analysis",
  metaTitle: "AI Trend & Behavioral Analysis | Preisser Solutions",
  metaDescription:
    "AI models that calculate economic trends and map psychological behavior patterns — the analytical backbone behind Alpha Matrix and MarCommand.",
  datePublished: "2026-04-14",
  dateModified: "2026-05-20",

  category: "Capability • AI Research",
  clientName: "AI Trend & Behavioral Analysis",
  clientNameDisplay: "Capability",
  industry: "AI trend modeling and behavioral analysis",

  h1: "AI Trend & Behavioral Analysis — Patterns No Manual Review Can Find",
  subheadline:
    "AI models that calculate economic trends and map psychological behavior patterns by processing market signals, consumer data, and behavioral indicators at scale.",
  oneLine: "Economic trends and behavioral patterns surfaced from raw signal volume",

  headlineResults: [
    { value: "Predictive", label: "Pattern identification at scale" },
    { value: "Multi-signal", label: "Market, consumer, behavioral inputs" },
    { value: "Configurable", label: "Adapts to any domain" },
    { value: "Backbone", label: "Powers Alpha Matrix and MarCommand internally" },
  ],

  before: {
    heading: "The interesting patterns are below the resolution of manual review.",
    body: [
      "Manual trend analysis can surface the obvious — a spike in sales, a shift in sentiment, a quarter-over-quarter movement. What it cannot surface are the patterns hiding in correlations between signals: a subtle change in behavioral indicators that historically precedes a market move, a consumer-data shift that maps to a known psychological pattern, an economic indicator combination that has only happened a handful of times.",
      "AI is built for that resolution. It can process market signals, consumer data, and behavioral indicators across volumes that no human analyst can review, and surface the patterns that emerge from those correlations.",
    ],
  },

  built: {
    heading: "Models built to find the patterns, configurable per domain.",
    body: [
      "Preisser Solutions builds AI trend and behavioral analysis models tuned to specific analytical questions. The system processes market signals, consumer behavioral data, and external indicators, then identifies predictive patterns — including the ones that only become visible after the correlations are computed across enough signal volume.",
      "This capability is the analytical backbone behind Alpha Matrix (multi-agent stock analysis) and MarCommand (multi-agent marketing engine). The same models can be configured for adjacent domains: retail demand modeling, churn prediction, customer behavioral segmentation, market-entry analysis, or any other question where the answer lives in patterns across high-volume signals.",
    ],
  },

  specifications: {
    heading: "Capability surface.",
    bullets: [
      "Market signal processing at scale",
      "Consumer behavioral data analysis",
      "Predictive pattern identification across signal correlations",
      "Configurable per domain and analytical question",
      "Underlies internal Preisser Solutions platforms (Alpha Matrix, MarCommand)",
    ],
    subsections: [
      {
        title: "Signal categories",
        items: [
          "Market signals — price, volume, volatility, options flow",
          "Consumer behavioral signals — engagement, conversion, attention",
          "External economic indicators — macro data, sentiment, social trends",
          "Domain-specific signals depending on the question",
        ],
      },
      {
        title: "Adjacent applications",
        items: [
          "Retail demand modeling",
          "Churn prediction and customer behavioral segmentation",
          "Market-entry and competitive positioning analysis",
          "Marketing channel performance attribution",
        ],
      },
    ],
  },

  results: [
    {
      value: "Predictive",
      label: "Pattern identification at scale",
      context:
        "Models surface predictive patterns that emerge from correlations across high-volume signals — patterns below the resolution of manual review.",
    },
    {
      value: "Multi-signal",
      label: "Market, consumer, behavioral inputs",
      context:
        "The capability processes market signals, consumer behavioral data, and external indicators in the same models.",
    },
    {
      value: "Configurable",
      label: "Adapts to any analytical domain",
      context:
        "Models are configurable per domain and analytical question — retail demand, churn, market entry, marketing attribution, and more.",
    },
    {
      value: "Internal proof",
      label: "Powers Alpha Matrix and MarCommand",
      context:
        "The same analytical backbone underpins two internal Preisser Solutions platforms, demonstrating the pattern across very different domains.",
    },
  ],

  techStack: [
    "Claude API",
    "Multi-signal correlation",
    "Predictive modeling",
    "Behavioral analysis",
    "Domain configuration layer",
  ],

  relatedSlugs: [
    "alpha-matrix",
    "marcommand",
    "custom-local-ai-models",
  ],

  cta: {
    heading: "Have a question only a pattern engine can answer?",
    subcopy:
      "Preisser Solutions builds trend and behavioral models tuned to your specific analytical question. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
