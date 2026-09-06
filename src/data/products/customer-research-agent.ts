import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "customer-research-agent",
  metaTitle: "Customer Research Agent",
  metaDescription:
    "Sub-agents scour the internet in parallel to research individual prospects and return enriched profiles ready for individualized outreach: in minutes, not hours.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Customer Research Agent",
  tagline:
    "Sub-agents scour the internet in parallel to research individual prospects, then return an enriched profile ready for individualized outreach.",
  category: "Marketing & Growth",
  status: "production",
  industries: ["B2B services", "Professional services", "Financial services", "Sales organizations"],

  h1: "Deep prospect research in minutes: not hours of manual lookup.",
  subheadline:
    "A multi-agent orchestration system that deploys parallel sub-agents to research individual prospects across the web, synthesizes findings into enriched profiles, and scores source credibility, so outreach is individualized, not generic.",
  oneLine:
    "Parallel sub-agents research individual prospects across the web and return enriched, source-scored profiles ready for individualized outreach.",

  whatItDoes: [
    "Personalized outreach requires knowing something real about the person you're reaching. Manual prospect research (LinkedIn, company site, Google, news search): takes 30-60 minutes per person and still misses signals scattered across sources a human wouldn't think to check. Most outreach skips the research step and sends generic messages. The Customer Research Agent makes individualized research fast enough to be practical at scale.",
    "The agent deploys a fleet of parallel sub-agents against a single prospect. Each sub-agent searches a different source category (professional profile, company news, recent activity, public statements, industry context, social signals), and returns structured findings. A synthesis layer aggregates the parallel results, scores each source for credibility, resolves conflicts between sources, and produces a unified enriched profile: current role, recent moves, areas of focus, likely priorities, and any signals relevant to the outreach context.",
    "The pattern was proven in the Elect Righteous research pipeline, which deploys the same parallel sub-agent architecture to research individuals across 15+ web source passes. For commercial use, the same architecture enriches CRM records for existing customers, qualifies inbound leads, and powers the individualized outreach layer for the Intelligent Outbound Sales product.",
  ],
  capabilities: [
    {
      title: "Parallel sub-agent deployment",
      description:
        "Multiple sub-agents research different source categories simultaneously: no sequential single-source lookup, parallel passes across professional, news, social, and industry sources.",
    },
    {
      title: "Source credibility scoring",
      description:
        "Each source is scored for credibility and recency before its findings enter the synthesized profile, high-confidence recent signals weighted over outdated or low-quality sources.",
    },
    {
      title: "Schema-validated profile output",
      description:
        "Research outputs conform to a defined profile schema (current role, company context, recent activity, areas of focus, signals): ready for downstream system integration.",
    },
    {
      title: "CRM record enrichment",
      description:
        "Enriched profiles write back to existing CRM records, upgrading sparse contact records with researched context for existing customers or leads.",
    },
    {
      title: "Inbound lead qualification",
      description:
        "Researches inbound leads immediately on capture: so the sales team receives a qualified, enriched record rather than a bare form submission.",
    },
    {
      title: "Outreach material generation",
      description:
        "Researched profile context feeds directly into hyper-personalized outreach generation: each message references something real about the prospect.",
    },
  ],
  inputs: [
    { label: "Prospect name and company", format: "CRM record / CSV / API" },
    { label: "Research context and target signal types", format: "Configuration" },
    { label: "Source categories to search", format: "Configuration" },
    { label: "CRM connection for record enrichment (optional)", format: "API / webhook" },
  ],
  outputs: [
    { label: "Enriched prospect profile with source citations", format: "JSON / CRM write-back" },
    { label: "Source credibility scores per finding", format: "Structured data" },
    { label: "Signals relevant to outreach context", format: "Structured profile section" },
    { label: "Updated CRM record with enriched fields", format: "CRM write-back" },
  ],
  howItWorks: [
    {
      step: "Prospect intake",
      description:
        "A prospect name and company enter the system: from a CRM record, a manual input, or an inbound lead capture trigger.",
    },
    {
      step: "Parallel sub-agent deployment",
      description:
        "Sub-agents deploy simultaneously across configured source categories: professional profile, company news, recent activity, social signals, industry context.",
    },
    {
      step: "Findings aggregation",
      description:
        "Each sub-agent returns its findings as structured data. The synthesis layer aggregates across all parallel results, resolving conflicts between sources.",
    },
    {
      step: "Source scoring and profile assembly",
      description:
        "Each finding is scored for credibility and recency. The final profile assembles from the highest-confidence signals across all source categories.",
    },
    {
      step: "Output delivery",
      description:
        "The enriched profile delivers as structured JSON, writes back to the CRM record, or feeds directly into the outreach generation layer.",
    },
  ],
  useCases: [
    "Use this when manual prospect research is a bottleneck: each qualified prospect requires 30-60 minutes of lookup before outreach can be personalized.",
    "Use this when your CRM contains sparse contact records and you want to enrich them with researched context without manual investigation.",
    "Use this when inbound leads arrive as bare form submissions and the sales team needs enriched context before the first conversation.",
    "Use this when outbound outreach is generic because the research step is too slow to do at scale.",
    "Use this as the upstream research layer feeding the Intelligent Outbound Sales product's personalized message generation.",
  ],
  techStack: [
    "Multi-agent orchestration",
    "Parallel sub-agent architecture",
    "Web search APIs",
    "Source-credibility scoring engine",
    "Schema-validated profile output",
    "CRM integration",
  ],
  relatedSlugs: [
    "outbound-sales-agent",
    "customer-reactivation-agent",
    "marcommand-engine",
  ],
  cta: {
    heading: "Want deep prospect research in minutes instead of hours?",
    subcopy:
      "Preisser Solutions builds customer research agents configured to your prospect profile and CRM stack. The first conversation covers your current research process and what individualized outreach would require.",
    buttonLabel: "Scope this for my team",
    buttonHref: "/contact?product=customer-research-agent",
  },
};
