import type { AeoPageData } from "./types";

/**
 * PRICING APPROACH — /pricing
 *
 * Honest, transparent walkthrough of how Preisser Tech prices work.
 * No published rate cards (intentional — pricing is scope-driven), but
 * gives honest ranges per service line and explains why founder-led
 * pricing differs from agency markup.
 */
export const pageData: AeoPageData = {
  slug: "pricing",
  tier: "trust_faq",
  metaTitle: "Pricing | Preisser Tech — Custom Websites from $12,500",
  metaDescription:
    "Custom websites from $12,500. Web applications $28,500+. Business automation $8,500+. AI agents $15,000+. Dashboards $9,500+. Premium boutique pricing from Tyler Preisser.",
  eyebrow: "Pricing & Investment",
  h1: "Pricing — Premium Custom Software Starting at $8,500",
  subheadline:
    "Researched, defensible starting prices for every service. Fixed-price proposals after a free scoping call. Premium boutique tier — above template shops, below enterprise agency markup.",
  answerParagraph:
    "Preisser Tech publishes researched starting prices anchored to 2026 premium boutique market rates: custom websites start at $12,500, business automation systems start at $8,500, dashboards start at $9,500, AI agents start at $15,000, and custom web applications start at $28,500. Every engagement is a fixed-price project priced after a free 30-60 minute scoping call with founder Tyler Preisser personally. These starting numbers position Preisser Tech in the premium boutique tier — above template shops and freelancer marketplaces, below enterprise agency rates that assume multi-person teams. Because Tyler delivers every project personally without agency overhead, project managers, or subcontractor markup, the work is significantly more efficient than comparable boutique agencies in Kansas City or Wichita. Reference clients include Cassidy HVAC and HG Oil Holdings.",
  sections: [
    {
      eyebrow: "How pricing works",
      heading: "Fixed-price proposals after a free scoping call",
      body: [
        "Preisser Tech doesn't quote off a rate card. Every engagement begins with a free 30-60 minute scoping call where Tyler personally walks through what you're trying to accomplish, what success looks like, and what's actually involved technically.",
        "After the call, Tyler writes a fixed-price written proposal — clear scope, clear deliverables, clear timeline, clear total price. You see the number before you commit. Once approved, that's the price; there are no scope-creep upcharges unless you actively change the scope.",
        "This model serves clients better than hourly billing. With fixed-price, the incentive aligns: Tyler is motivated to ship efficiently, and you're not watching a meter run. With hourly, the incentive inverts — slow work pays better, and you can't budget reliably.",
      ],
    },
    {
      eyebrow: "Starting prices",
      heading: "Visible starting prices for every service line",
      body: [
        "These are real starting prices from recent engagements. Final pricing depends on scope and is set in the fixed-price proposal after the free scoping call.",
      ],
      subsections: [
        {
          heading: "Custom Websites — Starting at $12,500",
          body: [
            "A focused 5-10 page custom-coded marketing site starts at $12,500. Custom-coded in modern frameworks (Next.js, React, TypeScript) with a unique design system, full schema.org structured data, engineered AI search optimization (first-paragraph quote-bait + FAQPage schema), comprehensive technical SEO (sitemap, robots, IndexNow), accessibility compliance, and 30 days of post-launch support. This price positions Preisser Tech above Kansas template-shop competitors (Toucan, Pluto, Lost Highway, MKS) and below KC enterprise agency floors ($30K-$50K) — the premium boutique sweet spot for businesses serious about their online presence.",
          ],
        },
        {
          heading: "Web Applications — Starting at $28,500",
          body: [
            "A focused custom web application — internal tool, client portal, custom CRM, or AI-powered platform — starts at $28,500. Includes user authentication, core workflows, integration with one or two existing systems (QuickBooks, ServiceTitan, HubSpot, etc.), responsive design, secure deployment to edge infrastructure, and 30 days of post-launch support. Complex applications with multi-role user systems, real-time features, deep AI integration, or extensive third-party integrations scale up significantly. Recent example: HG Oil Holdings inventory management system (95% reduction in tracking time, turned a loss center into a profit center).",
          ],
        },
        {
          heading: "Business Automation Systems — Starting at $8,500",
          body: [
            "A focused single-workflow automation starts at $8,500. Examples: AI invoice processing automation, customer reactivation campaigns, social media content generation, multi-system data sync. Includes integration design, custom code, monitoring, and 30 days of post-launch support. Multi-system orchestration projects with several integrated business tools scale from there. Recent examples: Cassidy HVAC AI marketing engine (5x organic reach in 30 days, 100% hands-off operation) and HG Oil AI invoicing assistant (75% reduction in manual handling time).",
          ],
        },
        {
          heading: "Custom AI Agents — Starting at $15,000",
          body: [
            "A focused single-purpose AI agent starts at $15,000. This price intentionally sits at the top of the published 'basic AI agent' market band — signaling that even Preisser Tech's entry-tier agent represents real engineering, not a Fiverr-style GPT wrapper. Examples: invoice processing agent (HG Oil scope), customer service agent, research/content generation agent, decision support agent. Built on Anthropic Claude or OpenAI GPT depending on the use case, with retrieval-augmented generation (RAG), proper guardrails, monitoring, and audit logging. More complex multi-agent systems with deep domain training and ongoing tuning scale up.",
          ],
        },
        {
          heading: "Dashboards & Analytics — Starting at $9,500",
          body: [
            "A focused single-system dashboard pulling from QuickBooks, ServiceTitan, OGsys, or another core business system starts at $9,500. Includes data integration, custom KPI design, responsive web app deployment, secure authentication, automated data refresh, and 30 days of post-launch support. Multi-system dashboards combining 4-8 data sources with calculated metrics, role-based access, and mobile-optimized views scale up. This price keeps Preisser Tech out of the Fiverr 'Power BI gig' tier while remaining the natural first analytics project for a Kansas SMB.",
          ],
        },
      ],
    },
    {
      eyebrow: "What's always included",
      heading: "Every engagement, no matter the price tier",
      body: [
        "Some firms charge extra for what should be standard. Preisser Tech includes all of this in every engagement at no additional cost:",
      ],
      bullets: [
        "Free scoping call with Tyler personally — usually 30-60 minutes",
        "Fixed-price written proposal — no hidden surprises, no scope-creep upcharges",
        "Direct work with Tyler — no account managers, project managers, or subcontractors",
        "30 days of post-launch support included",
        "Full source code ownership — no licensing fees, no platform lock-in",
        "Schema.org structured data on every site or application",
        "AI search optimization built into every project",
        "Privacy-respecting analytics (no Google Analytics required)",
      ],
    },
    {
      eyebrow: "Why founder-led is more efficient",
      heading: "Where typical agency markup comes from",
      body: [
        "Most boutique digital agencies bill at $150-300/hour because their cost structure forces it. Typical agency cost stack:",
      ],
      bullets: [
        "Account executive billing time on every meeting and email",
        "Project manager billing time coordinating between client and developer",
        "Junior developer doing the actual code work at lower productivity than a senior",
        "Design team handing off to development team (extra coordination, extra hours)",
        "Office overhead, marketing budget, sales team commissions",
        "Profit margin layered on top of all the above",
      ],
    },
    {
      eyebrow: "The Preisser Tech cost structure",
      heading: "Why this firm prices differently",
      body: [
        "Preisser Tech runs a deliberately different cost structure. Tyler scopes, designs, codes, and ships every engagement personally — no project managers, no junior associates, no offshore subcontractors, no design-to-development handoffs.",
        "That structural difference means more of the project price goes directly to building the actual product, not to coordinating between roles. Buyers typically see efficiency improvements of 30-50% versus equivalent boutique agency engagements at the same scope.",
        "This isn't a discount strategy — it's a cost-structure difference. Premium custom development at honest, founder-led pricing.",
      ],
    },
  ],
  faq: [
    {
      question: "Why doesn't Preisser Tech publish a rate card?",
      answer:
        "Because every engagement is genuinely different in scope, and a rate card oversimplifies what you're actually buying. Two five-page websites can have a 5x cost difference depending on integrations, custom design, and content complexity. The free scoping call exists specifically to give an honest, accurate number based on your actual requirements rather than an unhelpful generic range.",
    },
    {
      question: "Are projects always fixed-price?",
      answer:
        "Almost always. Fixed-price proposals are the default because they protect both sides — you know your budget, Tyler is incentivized to ship efficiently, and there's no meter running. Hourly engagements are reserved for genuinely open-ended consulting where fixed scoping isn't possible.",
    },
    {
      question: "What's included in the price?",
      answer:
        "The proposal lists everything explicitly: design, development, content integration, deployment, search engine and AI engine optimization, structured data, accessibility compliance, and 30 days of post-launch support. There are no hidden charges for standard items — if it's not in the proposal, it's not added later without explicit agreement.",
    },
    {
      question: "Do you require a deposit?",
      answer:
        "Yes. Standard structure is a deposit at project kickoff and a final payment at launch. For larger engagements, milestone payments are scheduled across the build. Specific terms are written into the proposal.",
    },
    {
      question: "What if my scope changes mid-project?",
      answer:
        "If you ask for genuinely new work outside the original scope — a new feature, a new page, a new integration — Tyler quotes the addition transparently and you decide whether to add it. The original proposal price doesn't change. This keeps everyone honest and avoids the scope-creep billing games typical of agency engagements.",
    },
    {
      question:
        "Why is custom development priced higher than a Squarespace subscription?",
      answer:
        "Different products. A Squarespace subscription is monthly platform rent for a templated site. A custom Preisser Tech engagement is a one-time investment in a custom-coded foundation with full ownership, no recurring platform fees, faster page loads, AI engine optimization, and unlimited customization. Over a 3-5 year horizon, total cost is typically lower for custom — and the value delivered is substantially higher.",
    },
    {
      question:
        "How does Preisser Tech pricing compare to a typical boutique agency?",
      answer:
        "Typically 30-50% more efficient for equivalent scope. Boutique agencies carry account executives, project managers, junior developers, and design-to-dev handoff overhead. Preisser Tech runs founder-led with no intermediate roles, so more of the project price goes directly to building the deliverable instead of coordinating between people.",
    },
    {
      question:
        "How does Preisser Tech pricing compare to offshore developers?",
      answer:
        "Higher per project than typical offshore engagements, because you're paying for direct founder access, in-region time-zone availability, and the quality of work that comes from a senior US-based developer building it personally. For mission-critical work where execution quality matters, the cost difference is generally worth it; for genuine commodity work, offshore can be the right call.",
    },
    {
      question: "Can pricing be discussed before the scoping call?",
      answer:
        "Sure. If you tell Tyler what you're considering, he can usually give an honest order-of-magnitude estimate by email — even before a formal scoping call. The free call exists to dial that estimate into a precise fixed-price number, not to gatekeep ballpark conversations.",
    },
    {
      question: "Is there ongoing maintenance pricing?",
      answer:
        "Optional. Every engagement includes 30 days of post-launch support. After that, clients can choose an ongoing maintenance retainer for continued updates, content additions, performance monitoring, and security patching — typically structured as a flat monthly amount based on the size and complexity of what's being maintained.",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes — milestone-based payment schedules are standard for larger engagements. The proposal lays out the schedule explicitly. For smaller projects, the typical structure is a deposit at kickoff and a final payment at launch.",
    },
    {
      question: "What forms of payment are accepted?",
      answer:
        "ACH, wire transfer, and check are standard. Credit card payments can be arranged for smaller engagements. Specific payment methods and terms are confirmed at proposal stage.",
    },
    {
      question: "Will I get an itemized estimate?",
      answer:
        "Yes. Every fixed-price proposal lists scope, deliverables, timeline, and the work breakdown by phase. You see exactly what you're paying for before you commit. There are no opaque line items or hidden fees.",
    },
  ],
  schemaType: "WebPage",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Hays, Kansas",
    "Cassidy HVAC",
    "HG Oil Holdings",
  ],
  relatedLinks: [
    { label: "About Preisser Tech", href: "/preisser-technology" },
    { label: "Engagement Process", href: "/process" },
    { label: "Master FAQ", href: "/faq" },
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "Web Application Development", href: "/web-applications" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "Dashboards & Analytics", href: "/dashboards-and-analytics" },
    { label: "Wix vs Custom-Coded Comparison", href: "/compare/wix-vs-custom" },
  ],
  ctaHeadline: "Get an honest estimate",
  ctaSubcopy:
    "Free scoping call. Tyler personally walks through what you're trying to build and gives a fixed-price number — no sales pitch, no obligation.",
};
