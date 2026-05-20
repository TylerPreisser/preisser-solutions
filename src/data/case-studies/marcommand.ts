import type { CaseStudyData } from "@/types/case-study";

// Canonical project #9 — MarCommand Multi-Agent Marketing Engine.
// Internal Preisser Solutions tool. Powers the marketing service offering.
// Clients never log in. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "marcommand",
  metaTitle: "MarCommand — Multi-Agent Marketing Engine",
  metaDescription:
    "MarCommand is the proprietary 8-agent marketing engine behind every Preisser Solutions engagement — channels, copy, creative, and ROI in one pipeline.",
  datePublished: "2026-02-01",
  dateModified: "2026-05-20",

  category: "Internal Platform • AI Architecture",
  clientName: "MarCommand",
  clientNameDisplay: "Internal — Preisser Solutions Marketing Engine",
  industry: "Multi-agent marketing automation",

  h1: "MarCommand — 8 Specialized Agents Running Marketing End to End",
  subheadline:
    "The proprietary multi-agent engine behind the Preisser Solutions marketing service — eight agents ingest every channel, score ROI in dollars, and surface daily reallocations.",
  oneLine: "8 agents orchestrated end-to-end across every marketing channel",

  headlineResults: [
    { value: "8", label: "Specialized agents in the pipeline" },
    { value: "All", label: "Channels ingested in one engine" },
    { value: "Daily", label: "ROI scoring and reallocation" },
    { value: "0", label: "Client logins required" },
  ],

  before: {
    heading: "Marketing operations that needed an engine, not another dashboard.",
    body: [
      "Before MarCommand existed, marketing for service businesses meant stitching together a content calendar, a copywriter, a designer, a paid-media manager, and a reporting layer — each with their own tools, their own cadence, and their own definition of success.",
      "Reports came monthly. Reallocation happened quarterly. The lag between a campaign starting to lose money and someone noticing was measured in weeks. Preisser Solutions needed an internal engine that could absorb every channel, score performance against actual dollar ROI, and surface daily reallocation calls without waiting for a human to compile a deck.",
    ],
  },

  built: {
    heading: "Eight agents, one orchestrator, every channel in scope.",
    body: [
      "MarCommand ingests Google Ads, Meta, TikTok, YouTube, LinkedIn, MailChimp, Local Service Ads, geofencing, and organic — every channel a client runs — and scores each one by actual dollar ROI. Eight specialized agents coordinate under a central orchestrator: a Content Strategist decides what to create and when, a Copywriter generates persuasion-aware copy, a Designer produces visuals, a Paid Ads Manager runs budget and bid strategy, an AEO Agent optimizes for AI search citation, an Analyst tracks performance and calculates ROI by channel, a Quality Reviewer gates anything before it goes live, and the Central Orchestrator coordinates everything end-to-end.",
      "MarCommand is not a SaaS product. Clients never log in. The engine sits behind the marketing service offering — clients pay for output, not for tooling. Optional auto-execution within client guardrails turns the daily reallocation recommendations into live changes. A dashboard mockup is integrated into the preissersolutions.com homepage so prospects can see what the engine produces without ever needing access to it.",
    ],
  },

  specifications: {
    heading: "How the engine is wired.",
    bullets: [
      "Eight specialized agents under a central orchestrator",
      "Ingests Google Ads, Meta, TikTok, YouTube, LinkedIn, MailChimp, LSA, geofencing, organic",
      "Daily dollar-ROI scoring per channel with projected lift on reallocation",
      "Optional auto-execution within client-defined guardrails",
      "QA gate runs before any output goes live",
      "Internal-only — clients never log in, never see the tool",
    ],
    subsections: [
      {
        title: "The eight agents",
        items: [
          "Content Strategist — decides what to create and when",
          "Copywriter — persuasion-psychology-aware copy generation",
          "Designer — custom marketing visuals",
          "Paid Ads Manager — budget allocation, bidding, creative testing",
          "AEO Agent — Answer Engine Optimization for AI search citation",
          "Analyst — performance tracking, trends, ROI by channel",
          "Quality Reviewer — QA gate before publishing",
          "Central Orchestrator — coordinates the full pipeline",
        ],
      },
      {
        title: "Operational model",
        items: [
          "Daily reallocation recommendations with projected lift",
          "Client guardrails define what the engine may auto-execute",
          "Dashboard mockup integrated into the preissersolutions.com homepage",
          "Engine is service-layer infrastructure, never a productized SaaS",
        ],
      },
    ],
  },

  results: [
    {
      value: "8",
      label: "Specialized agents under one orchestrator",
      context:
        "Eight purpose-built agents coordinate under a central orchestrator — content strategy, copy, design, paid media, AEO, analytics, QA, and orchestration.",
    },
    {
      value: "All channels",
      label: "Ingested into a single engine",
      context:
        "Google Ads, Meta, TikTok, YouTube, LinkedIn, MailChimp, LSA, geofencing, and organic all flow into one ROI-scoring pipeline.",
    },
    {
      value: "Daily",
      label: "ROI scoring and reallocation",
      context:
        "Channel performance is scored daily in actual dollars and surfaced as concrete reallocation recommendations with projected lift.",
    },
    {
      value: "0",
      label: "Client logins required",
      context:
        "MarCommand is the engine behind the service. Clients receive output and outcomes — they never touch the tool.",
    },
  ],

  techStack: [
    "Multi-agent orchestration",
    "Claude API",
    "GPT-4",
    "Next.js",
    "TypeScript",
    "Paid-media APIs",
    "AEO instrumentation",
    "Analytics pipeline",
  ],

  relatedSlugs: [
    "query-dominance",
    "agentic-coding-specialists",
    "cassidy-hvac-marketing-engine",
  ],

  cta: {
    heading: "Want a multi-agent marketing engine running your channels?",
    subcopy:
      "Preisser Solutions runs MarCommand as the engine behind every marketing engagement. Free 30-minute scoping call to map your channels and operations.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
