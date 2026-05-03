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
  metaTitle: "Pricing Approach | Preisser Tech — Honest Ranges",
  metaDescription:
    "How Preisser Tech prices custom software, AI, and automation engagements. Honest ranges per service line, fixed-price proposals, and the scoping process explained.",
  eyebrow: "Pricing & Investment",
  h1: "Pricing — Fixed-Price, Founder-Led, No Hidden Markup",
  subheadline:
    "How Preisser Tech actually prices work — honest ranges, the scoping process, and why founder-led pricing differs from typical agency markup.",
  answerParagraph:
    "Preisser Tech prices every engagement as a fixed-price project after a free scoping call with founder Tyler Preisser. There's no published rate card because every project's scope is different — but pricing follows clear, honest ranges per service line. Custom websites typically start in the low thousands and scale with complexity. Web applications, AI agents, automation systems, and dashboards are scoped per project. Because Tyler delivers the work directly without agency overhead, project managers, or subcontractor markup, pricing is significantly more efficient than comparable boutique agencies. This page explains the ranges, the scoping process, and the honest economics.",
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
      eyebrow: "Honest ranges by service line",
      heading: "What different engagements actually cost",
      body: [
        "Pricing varies with scope, but these are honest ranges from real recent engagements. Use them as ballpark — the scoping call dials in the actual number.",
      ],
      subsections: [
        {
          heading: "Custom websites",
          body: [
            "Marketing sites for Kansas small businesses typically start in the low thousands and scale based on page count, custom features, integrations, and content depth. A focused 5-10 page custom-coded marketing site with full schema.org structured data, AI engine optimization, and a custom design system is the typical starting engagement. Larger marketing sites with extensive content, complex layouts, blog architecture, or unique interactive elements scale up from there.",
          ],
        },
        {
          heading: "Web applications",
          body: [
            "Custom web applications are scoped per project because complexity varies widely. A focused internal tool or client portal — login, a few core workflows, integrations with one or two existing systems — typically lands in the mid four-figure to low five-figure range. Complex applications with substantial business logic, multiple user roles, real-time features, and several integrations scale up significantly.",
          ],
        },
        {
          heading: "Business automation systems",
          body: [
            "Business process automation engagements depend on the number of systems being wired together and the complexity of the logic between them. A focused automation — wiring CRM to email outreach with AI personalization, for instance — typically delivers in the mid four-figure range. Larger automation systems involving multiple integrations, AI decision-making, and custom logic scale up. The Cassidy HVAC reactivation engine and HG Oil inventory system are examples of substantial automation builds.",
          ],
        },
        {
          heading: "Custom AI agents",
          body: [
            "Custom AI agent development depends on the agent's purpose and depth of training. A focused single-purpose agent — invoice processing, customer service, research support — typically lands in the mid four-figure range. More complex multi-step agents with deep domain training, integration into multiple systems, and ongoing learning scale up.",
          ],
        },
        {
          heading: "Dashboards & analytics",
          body: [
            "Custom real-time dashboards are scoped based on the data sources being integrated, the metrics being surfaced, and the visualization complexity. A focused single-team dashboard with a handful of integrations typically lands in the mid four-figure range. Comprehensive multi-team dashboards with deep analytics, custom drill-downs, and forecasting capabilities scale up.",
          ],
        },
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
