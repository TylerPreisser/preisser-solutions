import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "marcommand-engine",
  metaTitle: "MarCommand Marketing Engine | Preisser Solutions",
  metaDescription:
    "An 8-agent marketing system: content, copy, design, paid, AEO, analyst, QA, and orchestrator. The AI engine powering the Preisser Solutions marketing service.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "MarCommand — Multi-Channel Marketing Engine",
  tagline:
    "An 8-agent marketing system: content, copy, design, paid, AEO, analyst, QA, orchestrator.",
  category: "Flagship Platforms",
  status: "production",
  industries: ["B2B services", "Field services", "Local retail", "Professional services"],

  h1: "Eight specialized agents running your marketing — end to end.",
  subheadline:
    "MarCommand ingests every channel you run, scores each by actual dollar ROI, and coordinates eight specialized AI agents across content strategy, copywriting, design, paid ads, AI search optimization, analytics, QA, and orchestration.",
  oneLine:
    "The multi-agent marketing engine that coordinates eight AI specialists across every channel your business runs.",

  whatItDoes: [
    "MarCommand is the proprietary multi-agent marketing engine behind Preisser Solutions' marketing service offering. Clients never log in or see the engine — they see the output. It's designed this way deliberately: the sophistication sits inside the system, not in a dashboard a client has to learn.",
    "The engine ingests every active marketing channel — Google Ads, Meta, TikTok, YouTube, LinkedIn, MailChimp, Local Service Ads, geofencing, and organic — and scores each by actual dollar ROI rather than vanity metrics. From that scoring, eight specialized agents produce coordinated action: a Content Strategist determines what to create and when, a Copywriter generates persuasion-psychology-aware copy, a Designer produces custom visuals, a Paid Ads Manager handles budget allocation and bid strategy, an AEO Agent optimizes for AI search citation, an Analyst tracks performance and calculates ROI by channel, a Quality Reviewer gates everything before it goes live, and a Central Orchestrator coordinates all of them.",
    "Optional auto-execution lets the engine make routine adjustments — budget shifts, creative swaps, posting — within configurable client guardrails. Everything that requires approval goes through a review step. The engine surfaces daily reallocation recommendations with projected lift so decision-making requires only a read and a confirm.",
  ],
  capabilities: [
    {
      title: "Cross-channel ROI scoring",
      description:
        "Ingests data from every active channel and scores each by actual dollar ROI — not impressions or clicks — to surface where budget should move.",
    },
    {
      title: "Coordinated 8-agent execution",
      description:
        "Eight specialized agents operate in parallel and in sequence: content strategy, copy, design, paid ads, AEO, analytics, QA, and orchestration.",
    },
    {
      title: "AI search optimization (AEO)",
      description:
        "A dedicated agent optimizes content and page architecture to appear in AI engine citations (ChatGPT, Perplexity, Google AI Overviews) alongside traditional search.",
    },
    {
      title: "Paid ads management",
      description:
        "Handles budget allocation, bid strategy, and creative testing across Google, Meta, TikTok, LinkedIn, and Local Service Ads — with performance tracking per channel.",
    },
    {
      title: "Daily reallocation recommendations",
      description:
        "Surfaces daily recommendations with projected lift so the client or account lead can approve budget moves with full context in under five minutes.",
    },
    {
      title: "Optional auto-execution",
      description:
        "Routine adjustments — budget shifts, creative promotions, post publishing — can execute automatically within client-defined guardrails.",
    },
    {
      title: "QA gate before publishing",
      description:
        "Every piece of content and every paid creative passes through a Quality Reviewer agent before going live, catching errors, off-brand language, and policy violations.",
    },
  ],
  inputs: [
    { label: "Ad account access (Google, Meta, TikTok, LinkedIn, LSA)", format: "API credentials" },
    { label: "CRM and email platform access (MailChimp or equivalent)", format: "API credentials" },
    { label: "Historical channel performance data", format: "Platform export / API" },
    { label: "Brand voice, visual guidelines, and content restrictions", format: "Document" },
    { label: "Client guardrails and auto-execution limits", format: "Configuration" },
  ],
  outputs: [
    { label: "Published organic content across active platforms", format: "Platform APIs" },
    { label: "Paid ad creative and campaign adjustments", format: "Ad platform APIs" },
    { label: "Daily reallocation recommendation report", format: "Dashboard / email" },
    { label: "Channel-by-channel ROI breakdown", format: "Dashboard / report" },
    { label: "Weekly performance summary with projected next-period lift", format: "Email report" },
  ],
  howItWorks: [
    {
      step: "Channel data ingestion",
      description:
        "The Analyst agent pulls performance data from every connected channel and calculates ROI per dollar spent, surfacing where budget is working and where it isn't.",
    },
    {
      step: "Strategic prioritization",
      description:
        "The Content Strategist and Central Orchestrator set the week's priorities — what content to create, which channels to emphasize, which campaigns need attention.",
    },
    {
      step: "Parallel content creation",
      description:
        "Copywriter, Designer, and AEO agents produce assets in parallel against the strategic brief — copy, visuals, and search-optimized content moving simultaneously.",
    },
    {
      step: "QA and approval gate",
      description:
        "All creative and copy passes through the Quality Reviewer before any execution. Items requiring client approval are routed for confirmation.",
    },
    {
      step: "Execution and monitoring",
      description:
        "Approved content publishes, paid adjustments execute, and the Analyst agent logs results. The cycle repeats with updated performance data the next day.",
    },
  ],
  useCases: [
    "Use this when your marketing operation spans 4+ channels and no one has a clear view of which channel is actually producing revenue versus which is spending budget on impressions.",
    "Use this when you're running Google, Meta, and organic content but each channel is managed by a different person with no coordination between them.",
    "Use this when you want AI-search visibility (ChatGPT, Perplexity) in addition to traditional Google rankings — AEO is a distinct optimization discipline from SEO.",
    "Use this when you need daily marketing execution but don't have the headcount to staff a full marketing team across every discipline.",
    "Use this when your current agency or in-house team produces content and campaigns on a weekly or monthly cycle and you need a daily execution cadence.",
  ],
  techStack: [
    "Claude Sonnet 4.5",
    "Google Ads API",
    "Meta Ads API",
    "MailChimp API",
    "AI image generation",
    "AEO optimization engine",
    "Multi-agent orchestration layer",
  ],
  relatedSlugs: [
    "social-marketing-agent",
    "customer-reactivation-agent",
    "customer-research-agent",
  ],
  cta: {
    heading: "Want the full marketing engine running for your business?",
    subcopy:
      "Preisser Solutions deploys MarCommand as a managed service — you see the output, the engine runs in the background. The first conversation covers your channels and your current results.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?product=marcommand-engine",
  },
};
