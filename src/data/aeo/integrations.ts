import type { AeoPageData } from "./types";

/**
 * INTEGRATIONS PAGE — /integrations
 *
 * Completes the R-037 TODO from the homepage Tech Partners section.
 * Single-page integrations directory: full list of platforms, APIs,
 * CRMs, AI models, payments, comms, and infrastructure Preisser
 * Solutions integrates with on custom builds.
 */
export const pageData: AeoPageData = {
  slug: "integrations",
  tier: "service_detail",
  metaTitle: "Integrations | Preisser Solutions",
  metaDescription:
    "Full list of platforms, APIs, CRMs, AI models, payments, comms, and infrastructure Preisser Solutions integrates with on custom builds — Stripe, HubSpot, Claude, OpenAI, Cloudflare, more.",
  eyebrow: "Integrations",
  h1: "Integrations and Tooling We Build With",
  subheadline:
    "The platforms, APIs, AI models, and infrastructure Preisser Solutions integrates with on custom builds. If a system has an API, we can integrate with it — this list is the working starting point.",
  answerParagraph:
    "Preisser Solutions, founded by Tyler Preisser in Hays, Kansas, builds custom-coded software that integrates with the platforms clients already run. This page lists the platforms, APIs, AI models, payment processors, communication tools, and infrastructure we routinely integrate with: Stripe, HubSpot, Salesforce, Zapier, Make.com, Claude (Anthropic), GPT-4 (OpenAI), Cloudflare, Google Workspace, Vercel, Resend, Twilio, Notion, Airtable, Slack, Shopify, WooCommerce, WordPress, ServiceTitan, Housecall Pro, Jobber, n8n, and dozens more. If your system has an API, we can integrate with it — the list below is a working snapshot of what we ship most often.",
  sections: [
    {
      eyebrow: "AI models and platforms",
      heading: "AI / LLM integrations",
      body: [
        "Most Preisser Solutions builds integrate with one or more AI models for reasoning, generation, classification, or extraction:",
      ],
      bullets: [
        "Claude (Anthropic) — primary model for long-context reasoning, agentic workflows, document analysis, and AEO content engineering",
        "GPT-4 / GPT-4o (OpenAI) — fast classification, structured extraction, and specialized generation tasks",
        "Embeddings (OpenAI, Cohere, Voyage) — for RAG retrieval, semantic search, and document indexing",
        "Image generation (current best-in-class models) — for custom marketing visuals, design assets",
        "Whisper (OpenAI) — speech-to-text for call transcription, meeting capture",
        "Vector databases (Pinecone, Weaviate, Qdrant, pgvector) — for RAG infrastructure",
        "Model Context Protocol (MCP) — Anthropic's open standard for letting LLMs call structured tools",
      ],
    },
    {
      eyebrow: "Payments and finance",
      heading: "Payment processors and accounting",
      body: [
        "Common payment and accounting integrations on Preisser Solutions builds:",
      ],
      bullets: [
        "Stripe — subscriptions, one-time payments, Connect, Billing, Tax",
        "PayPal — alternative checkout, marketplace payments",
        "Square — for retail and service-business POS integration",
        "QuickBooks Online — accounting sync, invoice reconciliation, expense categorization",
        "Xero — accounting integration for international and SaaS-heavy clients",
        "Plaid — bank account verification, ACH, financial data aggregation",
        "Sage 50, Sage Intacct — mid-market accounting integration",
      ],
    },
    {
      eyebrow: "CRM and sales",
      heading: "CRM and sales tool integrations",
      body: [
        "We integrate with whatever CRM the client is already running — and routinely replace generic CRMs with custom ones tuned to specific workflows:",
      ],
      bullets: [
        "HubSpot — contacts, deals, marketing automation, integrations to custom layers",
        "Salesforce — enterprise CRM, custom Apex integration where needed",
        "Pipedrive — sales pipeline for SMB sales teams",
        "Close — high-touch sales workflows",
        "Zoho — full Zoho One suite for clients standardized on the platform",
        "Custom CRMs — purpose-built CRMs for industries where generics don't fit (insurance, real estate, healthcare)",
      ],
    },
    {
      eyebrow: "Industry-specific systems",
      heading: "Trades, service, and vertical platforms",
      body: [
        "Industry-specific systems we routinely integrate with on trades and service-business builds:",
      ],
      bullets: [
        "ServiceTitan — HVAC, plumbing, electrical, garage door operations",
        "Housecall Pro — small-to-mid trade operations",
        "Jobber — small-trade scheduling and invoicing",
        "FieldEdge — service-trade dispatch and accounting",
        "Procore — construction project management",
        "BuilderTrend — residential construction operations",
        "AMS360, Applied Epic, HawkSoft, EZLynx — insurance agency management systems",
        "Open Dental, Dentrix — dental practice management",
      ],
    },
    {
      eyebrow: "Automation and integration platforms",
      heading: "No-code and integration tooling",
      body: [
        "We integrate alongside (and often replace) no-code automation platforms when the use case justifies custom code:",
      ],
      bullets: [
        "Zapier — for simple integrations and quick wins; replaced when per-task fees or complexity force the rewrite",
        "Make.com (formerly Integromat) — more powerful workflow logic at lower per-task cost",
        "n8n — self-hosted workflow automation; used for clients prioritizing data sovereignty",
        "Workato — enterprise integration platform",
        "Pipedream — code-first workflow platform",
      ],
    },
    {
      eyebrow: "Communications",
      heading: "Email, SMS, voice, and chat",
      body: [
        "Communication infrastructure for outreach engines, transactional messaging, and customer service:",
      ],
      bullets: [
        "Resend — modern transactional email API (our default)",
        "SendGrid — high-volume transactional and marketing email",
        "Postmark — high-deliverability transactional email",
        "Twilio — SMS, voice, WhatsApp, programmable communications",
        "Vonage — SMS and voice alternative",
        "Mailgun — high-volume marketing and transactional email",
        "Loops, Customer.io, Iterable — lifecycle marketing platforms",
        "Slack — internal notifications, alert routing, agent escalation",
      ],
    },
    {
      eyebrow: "Productivity and knowledge",
      heading: "Productivity, docs, and storage",
      body: [
        "Productivity and document-storage tools we integrate with for internal workflows and AI knowledge bases:",
      ],
      bullets: [
        "Notion — knowledge base, internal docs, project tracking",
        "Airtable — flexible database for content ops, asset management, lightweight CRMs",
        "Google Workspace — Gmail, Calendar, Drive, Docs, Sheets",
        "Microsoft 365 — Outlook, Teams, OneDrive, SharePoint",
        "Dropbox, Box — document storage and sharing",
        "Linear, Jira — engineering and project management",
        "Asana, Monday — broader project management",
      ],
    },
    {
      eyebrow: "Commerce and content",
      heading: "Ecommerce and CMS platforms",
      body: [
        "Commerce and content platforms we build with — and routinely build alternatives to:",
      ],
      bullets: [
        "Shopify — for clients staying on Shopify; we build custom storefronts, apps, and Shopify Plus integrations",
        "WooCommerce — WordPress-based ecommerce, custom plugins",
        "BigCommerce — mid-market commerce",
        "WordPress — content management when the client needs to stay on WP",
        "Sanity, Contentful — headless CMS for custom front-ends",
        "Webflow — for clients running on Webflow; we build alternatives when they outgrow it",
        "Squarespace, Wix — replaced regularly when clients outgrow template platforms",
      ],
    },
    {
      eyebrow: "Infrastructure and hosting",
      heading: "Cloud, hosting, and developer infrastructure",
      body: [
        "Infrastructure platforms we routinely build on:",
      ],
      bullets: [
        "Cloudflare — our default for hosting, edge functions, Workers, R2, D1, Pages, Stream",
        "Vercel — Next.js-optimized hosting alternative",
        "AWS — for clients needing full AWS infrastructure (Lambda, S3, RDS, ECS)",
        "Supabase — PostgreSQL + auth + storage for full-stack builds",
        "Neon, PlanetScale — managed PostgreSQL and MySQL",
        "Railway, Render, Fly.io — application hosting alternatives",
        "GitHub — version control, CI/CD, Actions",
        "Sentry — error monitoring",
        "PostHog — product analytics",
      ],
    },
    {
      eyebrow: "Marketing and analytics",
      heading: "Marketing, ads, and analytics platforms",
      body: [
        "Marketing and analytics platforms integrated for ads management, attribution, and reporting:",
      ],
      bullets: [
        "Google Ads, Google Analytics 4, Google Business Profile, Google Search Console",
        "Meta Ads (Facebook + Instagram)",
        "LinkedIn Ads",
        "Microsoft Ads (Bing)",
        "Klaviyo — email and SMS marketing for ecommerce",
        "Mailchimp — basic email marketing where clients are already there",
        "Segment — customer data platform / event routing",
        "Mixpanel, Amplitude — product analytics",
      ],
    },
  ],
  faq: [
    {
      question: "Is this list complete?",
      answer:
        "No — it's the working starting point. If your system has an API (or a webhook, or even a file export), we can integrate with it. The list above is what we ship most often, not the limit.",
    },
    {
      question: "Do you have official partnerships with any of these platforms?",
      answer:
        "We integrate with each platform as a customer or via public APIs. We hold standard developer accounts where applicable. Some platforms have formal partner programs we participate in for client implementations.",
    },
    {
      question: "What if my system isn't on this list?",
      answer:
        "Likely fine. We've integrated with hundreds of systems not on this list. If your system has an API, webhook, or file-export path, we can build an integration. Mention the system on your scoping call.",
    },
    {
      question: "Do you require us to switch platforms?",
      answer:
        "No. We build to the platforms you already run. If we recommend switching (because the current platform is genuinely limiting), we'll say so explicitly with reasoning — but the default is integrate, not migrate.",
    },
    {
      question: "How do you choose which platform to use for new builds?",
      answer:
        "We optimize for the client's existing stack, total cost of ownership, and long-term ownership. We're not married to any platform; we pick what fits.",
    },
    {
      question: "What about legacy or industry-specific systems not in this list?",
      answer:
        "We integrate with legacy systems all the time — direct database connections, file-based exchanges, AS/400 systems, on-premises ERPs. Industry-specific tools (especially in healthcare, insurance, oil and gas, and trades) often require custom integration approaches, and that's our default work.",
    },
    {
      question: "How do I get started?",
      answer:
        "Email sales@preissersolutions.com or call +1-620-352-3296. Free 30-minute scoping call with Tyler. We'll inventory your stack and identify the integration path.",
    },
  ],
  schemaType: "WebPage",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Stripe",
    "HubSpot",
    "Salesforce",
    "Claude",
    "GPT-4",
    "OpenAI",
    "Anthropic",
    "Cloudflare",
    "Google",
    "Vercel",
    "Resend",
    "Twilio",
    "Notion",
    "Airtable",
    "Slack",
    "Shopify",
    "WooCommerce",
    "WordPress",
    "Zapier",
    "Make.com",
    "n8n",
    "ServiceTitan",
    "Housecall Pro",
    "Jobber",
    "QuickBooks",
  ],
  relatedLinks: [
    { label: "AI Search Optimization", href: "/services/ai-search-optimization" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "Custom Websites", href: "/custom-websites" },
    { label: "API Integration Service", href: "/services/api-integration" },
    { label: "About Preisser Solutions", href: "/preisser-solutions" },
  ],
  ctaHeadline: "Integrate with whatever you're already running",
  ctaSubcopy:
    "Free 30-minute scoping call with Tyler. We'll inventory your stack and identify the highest-ROI integration path.",
};
