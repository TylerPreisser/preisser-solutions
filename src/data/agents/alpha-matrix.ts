import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "alpha-matrix",
  metaTitle: "Alpha Matrix — Multi-Agent Market Analysis | Preisser Solutions",
  metaDescription:
    "A self-evolving 6-agent stock analysis system: scanner, sentiment, quant, pattern, conviction, and portfolio. Learns from prediction accuracy after every run.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Alpha Matrix — Multi-Agent Market Analysis",
  tagline:
    "A self-evolving 6-agent stock-analysis system: scanner, sentiment, quant, pattern, conviction, portfolio.",
  category: "Analysis & Decision Support",
  status: "production",
  industries: ["Financial services", "Investment management", "Personal finance"],

  h1: "Six agents analyzing the market. The system evolves after every run.",
  subheadline:
    "Alpha Matrix runs a 6-phase pipeline across the entire US equity universe daily — scanning for signals, analyzing sentiment and quantitative data, matching historical patterns, scoring conviction, and producing a top-5 portfolio view — then updates its own scoring weights based on what actually worked.",
  oneLine:
    "A self-evolving 6-agent pipeline that scans the full US equity market daily and learns from prediction outcomes.",

  whatItDoes: [
    "Alpha Matrix is a self-evolving multi-agent stock analysis system built for daily pre-market execution. Six specialized agents operate in a defined sequence across the full US equity universe — not a curated watchlist, but a systematic scan that touches every meaningful signal category including volume anomalies, insider buying, institutional positioning, options flow, analyst changes, sector rotation, earnings catalysts, and sentiment.",
    "Each agent maintains a soul file — a persistent record of its learnings from previous runs, updated after every prediction resolves. When the system identifies what worked and what didn't, it writes those learnings back into the files that govern its next run. Conviction scoring weights shift based on measured accuracy. The system is honest about what it gets wrong.",
    "The pipeline runs in six phases: a learning phase that reads the prior day's outcomes before doing anything else, a 12-pass systematic scan, independent analysis by four specialized agents, weighted conviction scoring, portfolio strategy with position sizing, and an archival phase that logs every prediction for future accountability. The output is a clean morning brief on the desktop and a deep forensic internal log for system learning.",
  ],
  capabilities: [
    {
      title: "12-pass systematic market scanning",
      description:
        "Scans the full US equity universe across twelve distinct signal categories — volume, price movers, insider, institutional, options flow, analyst changes, sector rotation, earnings, technical setups, sentiment, full-market quantitative screen, and sector-by-sector deep dive.",
    },
    {
      title: "Parallel 4-agent independent analysis",
      description:
        "Sentiment Engine, Quant Analyzer, and Pattern Matcher agents analyze every flagged ticker independently before a Conviction Scorer synthesizes their outputs.",
    },
    {
      title: "Weighted conviction scoring",
      description:
        "A six-factor conviction matrix produces a score for each opportunity, with weights that update based on measured prediction accuracy across previous runs.",
    },
    {
      title: "Historical pattern matching",
      description:
        "The Pattern Matcher identifies historical analogs for each flagged setup and calculates win-rate distributions, providing base rates grounded in prior outcomes.",
    },
    {
      title: "Portfolio strategy with position sizing",
      description:
        "The Strategist agent applies portfolio constraints — position limits, sector concentration, daily risk thresholds — to produce a ranked top-5 with position sizing guidance.",
    },
    {
      title: "Self-evolving soul files",
      description:
        "Every agent's soul file updates after each run based on what resolved correctly and what didn't — the system's assumptions and weights shift with the evidence.",
    },
  ],
  inputs: [
    { label: "US equity market data", format: "Polygon.io / Alpha Vantage API" },
    { label: "SEC EDGAR filings (insider transactions)", format: "EDGAR API" },
    { label: "Options flow data", format: "Unusual Whales API" },
    { label: "News and analyst data", format: "NewsAPI / Finviz" },
    { label: "Social sentiment signals", format: "Reddit API / Stocktwits" },
    { label: "Prior run prediction log and soul files", format: "Internal markdown files" },
  ],
  outputs: [
    { label: "Daily morning brief with top-5 opportunities", format: "Markdown report (Desktop)" },
    { label: "Deep forensic internal learning log", format: "Markdown (memory/internal-log/)" },
    { label: "Updated soul files and scoring weights", format: "Internal markdown files" },
    { label: "Prediction log entry for accountability tracking", format: "CSV / markdown" },
    { label: "Daily journal entry with key learnings", format: "Markdown (memory/journal/)" },
  ],
  howItWorks: [
    {
      step: "Learn from prior outcomes",
      description:
        "Phase 0 reads the internal log and prediction history first — reviewing what resolved correctly and what didn't before any new analysis begins. Soul files and scoring weights update based on evidence.",
    },
    {
      step: "12-pass systematic scan",
      description:
        "Phase 1 runs twelve distinct scan passes across the full US equity universe, targeting 150–300+ tickers with anomalous signals across volume, insider, institutional, options, and catalyst categories.",
    },
    {
      step: "Independent 4-agent analysis",
      description:
        "Phase 2 runs Sentiment Engine, Quant Analyzer, and Pattern Matcher independently on every flagged ticker, producing separate assessments without cross-contamination.",
    },
    {
      step: "Conviction scoring",
      description:
        "Phase 3 applies the weighted conviction matrix across six factors, incorporating category modifiers and VIX-adjusted sizing guidance.",
    },
    {
      step: "Portfolio strategy and output",
      description:
        "Phase 4 selects the top-5 opportunities within portfolio constraints, produces the morning brief and full report, and Phase 5 logs all predictions for future accountability.",
    },
  ],
  useCases: [
    "Use this when you want a systematic pre-market analysis that covers the full US equity universe rather than a curated list of stocks you're already watching.",
    "Use this when you need conviction scoring that is evidence-based — weights that shift based on what has actually resolved correctly rather than on theoretical frameworks.",
    "Use this when you want historical pattern matching with documented base rates for each setup type rather than qualitative pattern recognition.",
    "Use this when you need portfolio-constraint-aware position sizing built into the output rather than as a separate calculation step.",
    "Use this as a learning system — one that gets more accurate over time as prediction outcomes feed back into the scoring weights and agent soul files.",
  ],
  techStack: [
    "Claude Sonnet 4.5",
    "Polygon.io",
    "Alpha Vantage",
    "SEC EDGAR API",
    "Unusual Whales",
    "Reddit API",
    "Multi-agent orchestration (Claude Code)",
  ],
  relatedSlugs: [
    "trend-behavioral-analysis-agent",
    "email-digest-agent",
    "agentic-coding-specialists",
  ],
  cta: {
    heading: "Want a market analysis system that learns from its own mistakes?",
    subcopy:
      "Alpha Matrix is built and deployable. Preisser Solutions can scope a version configured for your market focus, risk parameters, and brokerage integration.",
    buttonLabel: "Scope this for my use case",
    buttonHref: "/contact?agent=alpha-matrix",
  },
};
