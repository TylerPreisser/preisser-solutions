import type { CaseStudyData } from "@/types/case-study";

// Canonical project #21 — Query Dominance Agent System (SEO/GEO).
// Internal Preisser Solutions platform. Deployable for clients.
// See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "query-dominance",
  metaTitle: "Query Dominance Agent System",
  metaDescription:
    "A 10-agent, 6-phase autonomous system for dominating Google and AI search in a local market. Built for Preisser Solutions; deployable for clients.",
  datePublished: "2026-03-26",
  dateModified: "2026-05-20",

  category: "Internal Platform • AI Architecture",
  clientName: "Query Dominance",
  clientNameDisplay: "Internal — Preisser Solutions SEO/GEO",
  industry: "Multi-agent SEO and GEO platform",

  h1: "Query Dominance — 10 Agents, 6 Phases, One Market Owned",
  subheadline:
    "An autonomous 10-agent system that maps a local market, predicts queries, observes SERPs and AI engines, identifies competitor gaps, engineers content and distribution, and delivers a 90-day plan.",
  oneLine: "10 agents across 6 phases — full local-market SEO and GEO ownership",

  headlineResults: [
    { value: "10", label: "Specialized agents across the system" },
    { value: "6", label: "Phases from map to delivery" },
    { value: "2K–10K", label: "Queries mined per market" },
    { value: "90-day", label: "Executable plan as output" },
  ],

  before: {
    heading: "Two search engines now matter — Google and AI. Most strategies handle one.",
    body: [
      "Local SEO used to mean Google. It now means Google plus the AI search engines that increasingly answer queries directly: ChatGPT, Claude, Perplexity, Google AI Overviews. Winning one is not enough. A business needs to be the cited source in AI answers and the top result in classic SERPs at the same time, and the work to do both at scale is more than a content calendar can handle.",
      "Query Dominance is Preisser Solutions' own SEO/GEO platform — a 10-agent system that runs the entire pipeline from market mapping to a 90-day execution plan. The system is used internally for Preisser Solutions' own SEO/GEO and is deployable for clients.",
    ],
  },

  built: {
    heading: "Ten agents across six phases, end-to-end pipeline.",
    body: [
      "Phase 1 (Map): the Geo Cartographer maps the geographic market and the Persona Architect builds the persona set. Phase 2 (Predict): the Query Miner generates a query corpus of 2,000 to 10,000 rows tuned to the market and personas. Phase 3 (Observe): the SERP Investigator and AI Engine Investigator capture how the market currently looks across Google and the major AI engines. Phase 4 (Identify): the Competitor Scout maps the competitive landscape and the Gap Analyst identifies the opportunities.",
      "Phase 5 (Engineer): the Content Strategist and Distribution Strategist convert the gaps into specific content briefs and a distribution plan. Phase 6 (Deliver): the Synthesis Reporter assembles the full output — geo.json, personas.json, query_corpus.csv, SERP snapshots, AI answer captures, competitor map, opportunities CSV, content briefs, distribution plan, executive summary, 90-day plan, and a tracker. The system runs end-to-end with no human in the middle of the pipeline.",
    ],
  },

  specifications: {
    heading: "Pipeline architecture.",
    bullets: [
      "10 specialized agents across 6 phases",
      "End-to-end autonomous pipeline — map through delivery",
      "Query corpus of 2,000 to 10,000 rows per market",
      "Captures both classic SERP and AI engine answers",
      "Produces an executable 90-day plan, not just a report",
    ],
    subsections: [
      {
        title: "The six phases",
        items: [
          "P1 Map — Geo Cartographer, Persona Architect",
          "P2 Predict — Query Miner",
          "P3 Observe — SERP Investigator, AI Engine Investigator",
          "P4 Identify — Competitor Scout, Gap Analyst",
          "P5 Engineer — Content Strategist, Distribution Strategist",
          "P6 Deliver — Synthesis Reporter",
        ],
      },
      {
        title: "Output artifacts",
        items: [
          "geo.json and personas.json",
          "query_corpus.csv (2,000–10,000 rows)",
          "serp_snapshots/ and ai_answers/",
          "competitors.json and opportunities.csv",
          "content_briefs/ and distribution_plan.md",
          "executive_summary.md, 90_day_plan.md, tracker.csv",
        ],
      },
    ],
  },

  results: [
    {
      value: "10",
      label: "Specialized agents across the system",
      context:
        "Each phase has dedicated agents — mapping, prediction, observation, identification, engineering, and delivery — coordinated end-to-end.",
    },
    {
      value: "6",
      label: "Phases from market map to executable plan",
      context:
        "The full pipeline moves from geographic mapping through query mining, SERP observation, competitor analysis, content engineering, and synthesis.",
    },
    {
      value: "2K–10K",
      label: "Queries mined per market",
      context:
        "The Query Miner generates a query corpus of two thousand to ten thousand rows tuned to the market and personas.",
    },
    {
      value: "Both engines",
      label: "Classic SERP and AI engine coverage",
      context:
        "Output captures how the market currently looks in classic Google SERPs and across the major AI search engines.",
    },
  ],

  techStack: [
    "Claude API",
    "Multi-agent orchestration",
    "SERP scraping",
    "AI engine query capture",
    "Geographic data",
    "Persona modeling",
    "Content brief generation",
  ],

  relatedSlugs: [
    "marcommand",
    "agentic-coding-specialists",
    "alpha-matrix",
  ],

  cta: {
    heading: "Want a 10-agent system mapping and owning your market?",
    subcopy:
      "Preisser Solutions can deploy Query Dominance for your local market — map, mine, observe, identify gaps, and ship a 90-day plan. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
