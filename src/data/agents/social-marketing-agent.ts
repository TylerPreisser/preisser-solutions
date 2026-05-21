import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "social-marketing-agent",
  metaTitle: "Autonomous Social Marketing Agent | Preisser Solutions",
  metaDescription:
    "AI agent that scrapes local market trends, generates persuasion-aware copy and visuals, and publishes to Facebook and Instagram daily — 5x organic reach in 30 days.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Autonomous Social Marketing Agent",
  tagline:
    "Scrapes local trends, generates copy + visuals, publishes to Facebook and Instagram daily.",
  category: "Revenue & Marketing",
  status: "production",
  industries: ["HVAC services", "Field services", "Home services", "Local retail"],

  h1: "Replace your marketing agency with an agent that runs daily.",
  subheadline:
    "An AI-powered social media engine that monitors trending content in your local market, generates custom visuals and copy built on persuasion psychology, and publishes to Facebook and Instagram every day — no staff time required.",
  oneLine:
    "Replaces outsourced social media management with a daily AI engine that knows your market.",
  headlineMetric: {
    value: "5x",
    label: "organic reach increase in 30 days",
  },

  whatItDoes: [
    "Most small businesses either outsource social media to agencies producing generic content with no measurable results, or they let it go dark entirely when the owner runs out of time. The Autonomous Social Marketing Agent replaces both outcomes with a daily publishing engine that actually understands the market.",
    "The agent starts with a trend-scraping module: it monitors what's performing in the business's specific local market and service category. That intelligence feeds directly into content creation — the copy and visual assets are generated against what's actually resonating with the audience, not against a generic content calendar.",
    "Visual generation uses persuasion-psychology principles — emotional triggers, authority signals, social proof structures — rather than template design. The result is content that earns engagement rather than getting scrolled past. Once generated, posts publish to Facebook and Instagram on a configured schedule. An optional owner email approval gate can be added for any business that wants a review step before publishing.",
  ],
  capabilities: [
    {
      title: "Local market trend scraping",
      description:
        "Monitors trending content and topics specific to the business's local market and service category to inform what content gets created.",
    },
    {
      title: "Persuasion-aware copy generation",
      description:
        "Writes post copy engineered around psychological engagement principles — emotional relevance, authority, social proof — rather than filler text.",
    },
    {
      title: "AI visual asset creation",
      description:
        "Generates custom marketing visuals for each post rather than reusing templates, maintaining freshness across a daily publishing cadence.",
    },
    {
      title: "Dual-platform publishing",
      description:
        "Publishes to Facebook and Instagram on a configured schedule with platform-appropriate formatting and dimensions.",
    },
    {
      title: "Optional email approval gate",
      description:
        "An optional workflow step delivers each day's content to the owner for review before publishing — configurable as always-on or selectively triggered.",
    },
    {
      title: "Performance and engagement tracking",
      description:
        "Monitors post-level reach, engagement, and inbound activity to inform future content decisions and trend prioritization.",
    },
  ],
  inputs: [
    { label: "Business name, location, and service category", format: "Configuration" },
    { label: "Brand voice guidelines and approved visual style", format: "Document / configuration" },
    { label: "Facebook and Instagram account access", format: "API credentials" },
    { label: "Historical post performance data (optional)", format: "Social platform export" },
    { label: "Content approval preferences", format: "Configuration" },
  ],
  outputs: [
    { label: "Daily posts published to Facebook", format: "Facebook publishing API" },
    { label: "Daily posts published to Instagram", format: "Instagram publishing API" },
    { label: "Approval-queue emails with draft content (optional)", format: "Email" },
    { label: "Weekly engagement summary", format: "Email report / dashboard" },
    { label: "Trend signals driving content decisions", format: "Internal log" },
  ],
  howItWorks: [
    {
      step: "Trend intelligence gathering",
      description:
        "The agent scrapes trending content in the business's local market and service category each day, identifying what formats, topics, and tones are getting engagement.",
    },
    {
      step: "Content brief generation",
      description:
        "Based on trend signals and the business's brand voice, the agent produces a content brief for each post — topic, angle, copy direction, and visual treatment.",
    },
    {
      step: "Copy and visual creation",
      description:
        "Post copy and a custom visual asset are generated against the brief, applying persuasion-psychology principles to maximize organic reach.",
    },
    {
      step: "Review or auto-publish",
      description:
        "If the approval gate is enabled, content routes to the owner via email. Otherwise, it publishes directly on the configured schedule.",
    },
    {
      step: "Performance logging",
      description:
        "Engagement data from each post feeds back into the trend model, improving future content decisions over time.",
    },
  ],
  useCases: [
    "Use this when you're paying an external marketing agency and the content they produce is generic, disconnected from your market, and producing no measurable results.",
    "Use this when social media has gone dark on your business accounts because no one has time to manage it consistently.",
    "Use this when your business has a local market where trending content (seasonal events, weather, local news) drives engagement that generic national content misses.",
    "Use this when you need a daily publishing cadence but can't justify hiring a full-time social media coordinator.",
    "Use this when you want content that reflects your actual service category and local context — not a template calendar designed for a national franchise brand.",
  ],
  techStack: [
    "AI trend-scraping module",
    "AI copy generation",
    "AI visual generation",
    "Facebook Graph API",
    "Instagram Publishing API",
    "Email approval workflow",
  ],
  linkedCaseStudySlug: "cassidy-hvac-marketing-engine",
  relatedSlugs: [
    "customer-reactivation-agent",
    "marcommand-engine",
    "query-dominance-agent-system",
  ],
  cta: {
    heading: "Ready to replace your agency with something that actually posts daily?",
    subcopy:
      "Preisser Solutions builds and configures the social marketing engine for your market and brand. The first conversation covers your current state and what daily publishing would look like.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?agent=social-marketing-agent",
  },
};
