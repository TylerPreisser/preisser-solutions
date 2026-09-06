import type { CaseStudyData } from "@/types/case-study";

// Canonical project #17 — Alpha Matrix Multi-Agent Stock Analysis.
// Internal Preisser Solutions platform. Tyler's personal trading platform.
// See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "alpha-matrix",
  metaTitle: "Alpha Matrix: Stock Analysis System",
  metaDescription:
    "A self-evolving 6-agent AI system for daily stock analysis. Each agent maintains a soul file that evolves based on prediction accuracy.",
  datePublished: "2026-03-08",
  dateModified: "2026-05-20",

  category: "Internal Platform • AI Architecture",
  clientName: "Alpha Matrix",
  clientNameDisplay: "Internal Platform",
  industry: "Multi-agent financial analysis and autonomous pipelines",

  h1: "Alpha Matrix: A Self-Evolving 6-Agent Stock Analysis Platform",
  subheadline:
    "Six specialized agents run a daily pipeline against the entire US equity universe. Each agent maintains a soul file that evolves based on prediction accuracy.",
  oneLine: "6 agents, daily pipeline, self-evolving soul files per agent",

  headlineResults: [
    { value: "6", label: "Specialized agents in the pipeline" },
    { value: "Daily", label: "Full pipeline run cadence" },
    { value: "Soul files", label: "Per-agent evolution based on accuracy" },
    { value: "US equity", label: "Universe scanned each morning" },
  ],

  before: {
    heading: "A daily research workflow that wanted to be a pipeline.",
    body: [
      "Tyler built Alpha Matrix as an internal platform: a daily pipeline against the US equity universe with one rule: every agent has to learn from its own track record. Pre-existing tools generate analysis, but they do not remember what worked and what didn't. They produce confident output every morning regardless of whether yesterday's confident output was right.",
      "Alpha Matrix is built around a different assumption. Every prediction gets logged. Every outcome gets resolved. Every agent's soul file is updated based on what its calls actually did. The system gets better at noticing what it is bad at, and gets honest about it.",
    ],
  },

  built: {
    heading: "Six specialized agents, one daily pipeline, persistent soul files.",
    body: [
      "Tyler built this internal trading platform as a six-agent pipeline. A Scanner walks the entire US equity universe pre-market and flags anomalous signals. A Sentiment Engine analyzes Reddit, news, analyst data, and social perception. A Quant Analyzer ingests price, fundamentals, and options data. A Pattern Matcher correlates historical analogs with the scanner, sentiment, and quant outputs. A Conviction Scorer synthesizes everything into confidence ratings with trade theses. A Portfolio Strategist applies position sizing, risk management, and a daily top-five output.",
      "Data flows from Polygon.io, Alpha Vantage, SEC EDGAR, FRED, Reddit, NewsAPI, Finviz, Unusual Whales, Google Trends, and Stocktwits. Every prediction the system makes is logged. Outcomes are resolved against the prediction log. Each agent's soul file gets rewritten based on what worked: winners get reinforced, losers get demoted. The architecture pattern is what makes the platform worth talking about: the same self-evolving multi-agent design re-applies to any analytical domain that produces predictions and resolves outcomes.",
    ],
  },

  specifications: {
    heading: "Pipeline architecture.",
    bullets: [
      "Six specialized agents run sequentially in a daily pipeline",
      "Each agent maintains a soul file that evolves based on prediction accuracy",
      "Predictions are logged; outcomes are resolved against the log",
      "Conviction matrix weights are adjusted run-over-run based on signal performance",
      "Output: daily top-five categories with trade theses and risk framing",
    ],
    subsections: [
      {
        title: "The six agents",
        items: [
          "Scanner: pre-market scan of the US equity universe, flags anomalous signals",
          "Sentiment Engine: Reddit, news, analyst data, social perception",
          "Quant Analyzer: price, fundamentals, options data",
          "Pattern Matcher: historical analogs, correlates scanner + sentiment + quant",
          "Conviction Scorer: synthesizes into confidence rating with trade theses",
          "Portfolio Strategist: position sizing, risk, daily top-five categories",
        ],
      },
      {
        title: "Data sources",
        items: [
          "Polygon.io, market data",
          "Alpha Vantage: equity fundamentals and intraday",
          "SEC EDGAR: filings",
          "FRED: macro economic indicators",
          "Reddit API and NewsAPI: sentiment inputs",
          "Finviz, Unusual Whales: options and screener data",
          "Google Trends and Stocktwits: behavioral signals",
        ],
      },
    ],
  },

  results: [
    {
      value: "6",
      label: "Specialized agents in the pipeline",
      context:
        "Scanner, Sentiment, Quant, Pattern, Conviction, and Strategist run in sequence every day against the US equity universe.",
    },
    {
      value: "Daily",
      label: "Full pipeline cadence",
      context:
        "The full pipeline runs on a daily cadence: pre-market scan through post-market archival and learning.",
    },
    {
      value: "Soul files",
      label: "Per-agent evolution",
      context:
        "Each agent maintains a persistent soul file rewritten based on prediction accuracy: winners reinforced, losers demoted.",
    },
    {
      value: "10+ sources",
      label: "Data sources orchestrated",
      context:
        "Polygon.io, Alpha Vantage, SEC EDGAR, FRED, Reddit, NewsAPI, Finviz, Unusual Whales, Google Trends, and Stocktwits feed the pipeline.",
    },
  ],

  techStack: [
    "Claude API",
    "Multi-agent orchestration",
    "Polygon.io",
    "Alpha Vantage",
    "SEC EDGAR",
    "FRED",
    "Reddit API",
    "NewsAPI",
    "Finviz",
    "Unusual Whales",
    "Google Trends",
    "Stocktwits",
  ],

  relatedSlugs: [
    "agentic-coding-specialists",
    "marcommand",
    "ai-trend-behavioral-analysis",
  ],

  cta: {
    heading: "Need a self-evolving multi-agent pipeline for your domain?",
    subcopy:
      "Preisser Solutions builds the same multi-agent architecture pattern for any analytical domain that produces predictions and resolves outcomes. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
