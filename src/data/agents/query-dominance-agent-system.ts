import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "query-dominance-agent-system",
  metaTitle: "Query Dominance Agent System | Preisser Solutions",
  metaDescription:
    "A 10-agent, 6-phase autonomous system for dominating Google and AI-engine search in a local market — used to build preissersolutions.com itself.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Query Dominance Agent System",
  tagline:
    "A 10-agent, 6-phase autonomous system for dominating Google + AI-engine search in a local market.",
  category: "Revenue & Marketing",
  status: "production",
  industries: ["B2B services", "Professional services", "Local services", "Consulting"],

  h1: "Own every relevant search query in your market — on Google and in AI.",
  subheadline:
    "A 10-agent pipeline that maps your geography and buyer personas, mines thousands of queries, analyzes SERP and AI-engine citations, identifies gaps, and produces a complete content and distribution plan for total local search dominance.",
  oneLine:
    "Ten specialized agents that map, analyze, and build a complete search dominance strategy for a local market.",

  whatItDoes: [
    "Search dominance in 2026 requires winning in two separate environments: traditional Google results and AI engine citations — ChatGPT, Perplexity, Google AI Overviews, and every other system that surfaces information in response to queries. The Query Dominance Agent System was built to pursue both simultaneously.",
    "The system runs six phases across ten specialized agents. It starts by mapping the geography and constructing detailed buyer personas with explicit intent signals. From there, it mines a corpus of 2,000–10,000 queries, captures SERP snapshots and AI-engine responses for the most important ones, identifies every competitor ranking for those queries, and surfaces the gap opportunities — queries where the market has weak content that can be displaced.",
    "The output isn't a report with recommendations. It's a complete operational package: content briefs, a distribution plan, an executive summary, a 90-day execution tracker, and all raw data files. The system was built for Preisser Solutions' own search strategy and is deployable for any client operating in a defined local market.",
  ],
  capabilities: [
    {
      title: "Geographic and persona mapping",
      description:
        "Maps the full geographic territory and constructs buyer personas with explicit intent signals — what each persona is searching for, at what stage, and what they need to read to convert.",
    },
    {
      title: "Large-scale query corpus mining",
      description:
        "Mines 2,000–10,000 queries specific to the market — not sampled keywords, but a complete capture of the query landscape the business needs to own.",
    },
    {
      title: "SERP and AI-engine analysis",
      description:
        "Captures live SERP snapshots and AI-engine citations (ChatGPT, Perplexity, Google AI Overviews) for priority queries to understand the actual competitive landscape.",
    },
    {
      title: "Competitor gap identification",
      description:
        "Maps every competitor ranking for priority queries and identifies gap opportunities — queries with weak competitive content that can be displaced.",
    },
    {
      title: "Content brief production",
      description:
        "Generates a prioritized set of content briefs targeted at the identified gap opportunities, with clear guidance on angle, structure, and optimization targets.",
    },
    {
      title: "Distribution strategy design",
      description:
        "Produces a distribution plan that maps content to the channels and formats most likely to produce citations and rankings for each query cluster.",
    },
    {
      title: "90-day execution tracker",
      description:
        "Outputs a structured tracker covering the full execution sequence — what to build, when, in what order — to reach dominance within the 90-day planning window.",
    },
  ],
  inputs: [
    { label: "Target geography and market definition", format: "Configuration" },
    { label: "Primary service categories and buyer types", format: "Configuration" },
    { label: "Existing website and content inventory", format: "URL / sitemap" },
    { label: "Competitor domain list (optional)", format: "CSV / configuration" },
    { label: "Search and AI-engine access tokens", format: "API credentials" },
  ],
  outputs: [
    { label: "geo.json — geographic coverage map", format: "JSON" },
    { label: "personas.json — buyer personas with intent signals", format: "JSON" },
    { label: "query_corpus.csv — 2K–10K row query database", format: "CSV" },
    { label: "SERP and AI-engine snapshots per priority query", format: "Structured files" },
    { label: "competitors.json — competitor ranking data", format: "JSON" },
    { label: "opportunities.csv — prioritized gap analysis", format: "CSV" },
    { label: "content_briefs/ — one brief per gap opportunity", format: "Markdown documents" },
    { label: "distribution_plan.md — channel and format strategy", format: "Document" },
    { label: "executive_summary.md + 90_day_plan.md", format: "Documents" },
  ],
  howItWorks: [
    {
      step: "Map geography and personas",
      description:
        "The Geo Cartographer and Persona Architect agents define the territory and construct buyer personas with explicit intent signals, establishing the foundation for query research.",
    },
    {
      step: "Mine the query corpus",
      description:
        "The Query Miner agent builds a 2,000–10,000 row query corpus spanning every relevant topic, format, and intent signal for the defined market.",
    },
    {
      step: "Observe SERP and AI engines",
      description:
        "The SERP Investigator and AI Engine Investigator agents capture live rankings and citation data for priority queries across both traditional search and AI engine surfaces.",
    },
    {
      step: "Identify competitors and gaps",
      description:
        "The Competitor Scout and Gap Analyst agents map who is ranking for each query cluster and where the content gaps are — the opportunities that can be displaced.",
    },
    {
      step: "Engineer content and distribution",
      description:
        "The Content Strategist and Distribution Strategist agents produce prioritized content briefs and a distribution plan targeting the highest-leverage gap opportunities.",
    },
    {
      step: "Synthesize and deliver",
      description:
        "The Synthesis Reporter agent packages all outputs — executive summary, 90-day plan, data files, briefs — into a complete operational package ready for execution.",
    },
  ],
  useCases: [
    "Use this when you're entering a local market and need to understand the full query landscape before investing in content or paid search.",
    "Use this when your existing SEO is producing rankings but no AI-engine citations — two distinct optimization problems that require different content architecture.",
    "Use this when you need a data-driven content roadmap rather than a keyword list — full briefs, prioritization, and a sequenced execution tracker.",
    "Use this when a competitor dominates your core queries and you need a systematic gap analysis to find the entry points they're leaving exposed.",
    "Use this when you want to build AI search visibility (ChatGPT, Perplexity, Google AI Overviews) in a specific local market before competitors understand what's happening.",
  ],
  techStack: [
    "Claude Sonnet 4.5",
    "Search API (SerpAPI / Brave Search)",
    "AI engine query layer",
    "Multi-agent orchestration",
    "Geographic data processing",
    "Query mining pipeline",
  ],
  relatedSlugs: [
    "marcommand-engine",
    "social-marketing-agent",
    "agentic-coding-specialists",
  ],
  cta: {
    heading: "Want a complete map of your local search landscape?",
    subcopy:
      "Preisser Solutions runs the Query Dominance system against your market and delivers the full output package — corpus, gap analysis, content briefs, and 90-day tracker.",
    buttonLabel: "Scope this for my market",
    buttonHref: "/contact?agent=query-dominance-agent-system",
  },
};
