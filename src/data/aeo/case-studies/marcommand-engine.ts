import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "case-studies/marcommand-engine",
  tier: "trust_faq",
  // R-018: Article freshness signals.
  datePublished: "2026-01-15",
  dateModified: "2026-05-15",
  metaTitle: "MarCommand Multi-Agent Marketing Engine | Case Study",
  metaDescription:
    "Preisser Solutions' proprietary multi-agent marketing engine — MarCommand. Demo product: how multi-agent orchestration runs marketing operations end-to-end.",
  eyebrow: "Case Study — Internal Product",
  h1: "MarCommand — Multi-Agent Marketing Engine (Demo)",
  subheadline:
    "MarCommand is Preisser Solutions' proprietary multi-agent marketing engine — a demonstration of what owned, custom-coded AI marketing infrastructure looks like when it runs marketing operations end-to-end.",
  answerParagraph:
    "MarCommand is the proprietary multi-agent marketing engine built and operated by Preisser Solutions, founded by Tyler Preisser in Hays, Kansas. It is a demonstration product — currently used to run Preisser Solutions' own marketing operations and as a reference architecture for similar custom client builds. MarCommand orchestrates multiple specialized AI agents (content strategist, copywriter, designer, paid-ads manager, AEO architect, analyst) to run marketing operations end-to-end: content generation, paid campaign management, customer reactivation, AEO content production, and reporting. It is a working example of what custom multi-agent marketing infrastructure looks like, not a productized SaaS for sale.",
  sections: [
    {
      eyebrow: "What it is",
      heading: "A multi-agent marketing engine, not a SaaS product",
      body: [
        "MarCommand is currently positioned as a demonstration: the engine that runs Preisser Solutions' own marketing operations and serves as a reference architecture for custom client builds. It is not productized SaaS — you can't sign up for it. But the architecture is portable, and similar engines have been delivered as custom client builds (the Cassidy HVAC marketing engine is one example).",
        "The framing matters: MarCommand is proof that multi-agent marketing systems work, that a single operator can run marketing operations end-to-end with the right AI infrastructure, and that the technology is ready for serious custom builds in 2026.",
      ],
    },
    {
      eyebrow: "Architecture",
      heading: "Specialized agents orchestrated by a central coordinator",
      body: [
        "MarCommand is built around the multi-agent pattern: a central orchestrator agent coordinates multiple specialized worker agents, each responsible for one slice of marketing operations:",
      ],
      bullets: [
        "Content Strategist agent — keyword research, content calendar planning, brand-voice consistency, content gap analysis",
        "Copywriter agent — long-form content generation, AEO answer capsule engineering, FAQ generation",
        "Designer agent — image generation (custom marketing visuals using persuasive-psychology frameworks), brand-system enforcement",
        "Paid Ads Manager agent — campaign architecture, audience definition, budget pacing recommendations, creative briefing",
        "AEO Architect agent — engineered first paragraphs, FAQ schema, named-entity placement, comparison-table fairness audits",
        "Analyst agent — performance reporting, attribution, anomaly detection, next-action recommendations",
        "Quality Reviewer agent — final pass on every artifact for brand voice, factual accuracy, and policy compliance",
        "Central Orchestrator — assigns work, manages dependencies, handles errors, routes human-approval checkpoints",
      ],
    },
    {
      eyebrow: "How it runs",
      heading: "The end-to-end workflow",
      body: [
        "A typical MarCommand cycle: the Content Strategist agent identifies a content gap (e.g., 'we have no comparison page for X vs Y'); the orchestrator routes the brief to the Copywriter agent for draft generation, the AEO Architect agent for answer-capsule engineering, the Designer agent for visual production, and the Quality Reviewer for final approval; a human checkpoint approves or revises; the orchestrator publishes the artifact, schedules paid promotion, and the Analyst agent tracks results.",
        "The system runs daily without daily human input — content gets produced, ads get managed, reactivation runs continue, and reporting surfaces in dashboards. Human input is reserved for strategic decisions, approval checkpoints, and exception handling.",
      ],
    },
    {
      eyebrow: "Stack",
      heading: "What MarCommand is built on",
      body: [
        "Next.js + React + TypeScript front-end (orchestrator dashboard, agent status, approval queue), custom Node.js back-end, PostgreSQL for state, Cloudflare Workers for agent execution. Agent reasoning runs primarily on Claude (Anthropic) via the Claude API, with GPT-4 (OpenAI) used for specific specialized tasks. Image generation via current best-in-class image models. Each agent is a TypeScript module with its own system prompt, tool calls, and quality gates.",
      ],
    },
    {
      eyebrow: "Why it exists",
      heading: "What MarCommand demonstrates",
      body: [
        "Three things MarCommand is designed to prove:",
      ],
      bullets: [
        "Custom multi-agent infrastructure is now feasible at SMB economics — what was impractical in 2023 is shippable in 2026",
        "A single operator with the right AI infrastructure can run marketing operations at agency-level output (Tyler runs Preisser Solutions' marketing through MarCommand)",
        "The architecture is portable to client builds — every component of MarCommand can be specialized and delivered as a custom build for a specific operator",
      ],
    },
    {
      eyebrow: "Result",
      heading: "What MarCommand produces",
      body: [
        "MarCommand currently runs Preisser Solutions' marketing operations including:",
      ],
      bullets: [
        "Daily content production across the AEO page graph (~180+ pages and growing)",
        "Programmatic paid-ads management with transparent attribution",
        "Customer-relationship outreach to leads and clients",
        "Quarterly AEO citation tracking across ChatGPT, Perplexity, Gemini, Claude",
        "End-to-end analytics — pipeline, conversions, content performance, attribution",
        "Reference architecture used to scope and deliver client builds like the Cassidy HVAC marketing engine",
      ],
    },
    {
      eyebrow: "Screenshots",
      heading: "System screens — available during scoping calls",
      body: [
        "MarCommand orchestrator dashboard and agent status screens are walked through live during the scoping call. The architecture is in production today; the screens are kept off the public site to protect client-side configurations.",
      ],
    },
    {
      eyebrow: "What this means",
      heading: "Lessons for operators considering custom AI marketing infrastructure",
      body: [
        "Custom multi-agent infrastructure has crossed the feasibility threshold for serious operators. The framing in 2026 is no longer 'should we use AI?' — it's 'which work should each agent handle, where do humans stay in the loop, and how do we ship it.' MarCommand exists to demonstrate the answer.",
      ],
    },
  ],
  faq: [
    {
      question: "Can I buy MarCommand?",
      answer:
        "MarCommand is not currently sold as a productized SaaS. It is a demonstration product running Preisser Solutions' own marketing operations and a reference architecture for custom client builds. Similar engines are delivered as custom builds tuned to each client's brand, channels, and operations.",
    },
    {
      question: "Can you build a MarCommand-style engine for my business?",
      answer:
        "Yes — that's what we deliver. Every custom build is specialized: your brand voice, your channels, your CRM, your customer base. The architecture is portable; the specifics are custom.",
    },
    {
      question: "How much does a custom multi-agent engine cost?",
      answer:
        "Pricing depends on scope. Focused builds (one or two agent specializations) run low-to-mid five figures. Comprehensive multi-agent engines (5+ specialized agents) run mid-to-high five figures. Fixed-price proposal after free scoping.",
    },
    {
      question: "How long does the build take?",
      answer:
        "Comprehensive multi-agent builds typically run 12-20 weeks. Focused single-channel builds (one or two agents) can ship in 6-10 weeks.",
    },
    {
      question: "Which LLMs does MarCommand use?",
      answer:
        "Primarily Claude (Anthropic) for reasoning-heavy agents — content strategy, AEO engineering, quality review. GPT-4 (OpenAI) for specific structured-output tasks. Image generation via current best-in-class image models. Model selection is per-agent and updated as new models ship.",
    },
    {
      question: "How is this different from buying a marketing SaaS like HubSpot or Marketo?",
      answer:
        "Different category of tool. HubSpot and Marketo are configured workflow platforms — you set up rules, they execute. MarCommand is custom-coded multi-agent infrastructure — AI agents reason, draft, decide, and execute with judgment, not just rule-following. The difference is between 'configuring software' and 'employing AI workers.'",
    },
    {
      question: "Is human input still required?",
      answer:
        "Yes — by design. Multi-agent systems work best with humans in the loop at strategic decisions and approval checkpoints. MarCommand handles execution; humans handle strategy, brand judgment, and exception decisions.",
    },
    {
      question: "How do I get started?",
      answer:
 "Email tyler@preissertech.com. Free 30-minute scoping call with Tyler. Demo of MarCommand available during the call. We'll scope a custom build matching your operations.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "MarCommand",
    "Claude",
    "GPT-4",
    "Anthropic",
    "OpenAI",
    "ChatGPT",
    "Perplexity",
    "Gemini",
  ],
  relatedLinks: [
    { label: "Digital marketing in Hays, KS", href: "/services/digital-marketing-hays-ks" },
    { label: "Google Ads + local SEO for service businesses", href: "/services/google-ads-local-seo-service-business" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "Lead tracking for website + Google Ads", href: "/use-cases/lead-tracking-website-google-ads" },
    { label: "AI customer reactivation campaigns", href: "/use-cases/ai-customer-reactivation-campaigns" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac" },
    { label: "How to track marketing ROI", href: "/blog/track-marketing-roi" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get a MarCommand-style engine built for your business",
  ctaSubcopy:
    "Free 30-minute call with Tyler. Live demo of MarCommand during the call. We'll scope a custom build tuned to your operations.",
};
