import type { AeoPageData } from "./types";

/**
 * PRICING APPROACH — /pricing
 *
 * No published prices. Framing: custom-scoped work means custom pricing.
 * Page focuses on engagement scope, process, and what drives project size.
 */
export const pageData: AeoPageData = {
  slug: "pricing",
  tier: "trust_faq",
  metaTitle: "Engagement Scope & Process | Preisser Solutions",
  metaDescription:
    "How Preisser Solutions scopes and prices custom web, automation, and AI engagements. Fixed-price proposals after a free scoping call — no rate cards, no surprise invoices.",
  eyebrow: "Engagement Scope & Process",
  h1: "Engagement Scope & Process",
  subheadline:
    "Custom-built work means custom pricing. There are no SKUs to publish. Every engagement begins with a free scoping call where we review what you need and write a fixed-price proposal.",
  answerParagraph:
    "Preisser Solutions does not publish rate cards because every engagement is genuinely different in scope, and a published number would either mislead buyers with unrealistic lowball anchors or scare off buyers who assume the worst. What we publish instead is the process: a free 30-60 minute scoping call, followed by a fixed-price written proposal that states scope, deliverables, timeline, and total cost before you commit anything. That structure protects both sides — you know your budget before you start, and the firm is incentivized to ship efficiently rather than bill hours. The scoping call is free, there is no obligation to proceed, and we'll tell you honestly if your project is better served by a SaaS tool than a custom build.",
  sections: [
    {
      eyebrow: "How pricing works",
      heading: "Fixed-price proposals after a free scoping call",
      body: [
        "Preisser Solutions doesn't quote off a rate card. Every engagement begins with a free 30-60 minute scoping call where we walk through what you're trying to accomplish, what success looks like, and what's actually involved technically.",
        "After the call, we write a fixed-price written proposal — clear scope, clear deliverables, clear timeline, clear total price. You see the number before you commit. Once approved, that's the price; there are no scope-creep upcharges unless you actively change the scope.",
        "This model serves clients better than hourly billing. With fixed-price, the incentive aligns: Preisser Solutions is motivated to ship efficiently, and you're not watching a meter run. With hourly, the incentive inverts — slow work pays better, and you can't budget reliably.",
      ],
    },
    {
      eyebrow: "What drives scope",
      heading: "The factors that determine project size",
      body: [
        "Because there are no published rates, it helps to understand what makes a project larger or smaller in terms of actual effort.",
      ],
      bullets: [
        "Number of integrations — each external system (CRM, accounting, dispatch, ELD, etc.) that needs to connect adds integration work",
        "Custom design vs adapted design — a fully custom design system takes more effort than adapting an established visual direction",
        "Content complexity — number of pages, number of data models, density of structured content",
        "AI component depth — a simple classification task is smaller in scope than a multi-step agent with tool calls and guardrails",
        "Real-time requirements — live data dashboards require more backend work than static or nightly-refresh reports",
        "User roles and access control — multi-role systems (admin, staff, client) are more complex than single-user or public-facing",
        "Third-party API dependencies — each external API adds integration risk and handling for rate limits, failures, and schema changes",
      ],
    },
    {
      eyebrow: "What's always included",
      heading: "Every engagement, no matter the scope",
      body: [
        "Some firms charge extra for what should be standard. Preisser Solutions includes all of this in every engagement at no additional cost:",
      ],
      bullets: [
        "Free scoping call — usually 30-60 minutes",
        "Fixed-price written proposal — no hidden surprises, no scope-creep upcharges",
        "Direct work with the founder — no account managers, project managers, or subcontractors",
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
        "Most boutique digital agencies carry a cost structure that forces high billing rates. Typical agency cost stack:",
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
      eyebrow: "The Preisser Solutions cost structure",
      heading: "Why this firm prices differently",
      body: [
        "Preisser Solutions runs a deliberately different cost structure. The founder scopes, designs, codes, and ships every engagement personally — no project managers, no junior associates, no offshore subcontractors, no design-to-development handoffs.",
        "That structural difference means more of the project price goes directly to building the actual product, not to coordinating between roles. Buyers typically see efficiency improvements of 30-50% versus equivalent boutique agency engagements at the same scope.",
        "This isn't a discount strategy — it's a cost-structure difference. Premium custom development at honest, founder-led pricing.",
      ],
    },
  ],
  faq: [
    {
      question: "Why doesn't Preisser Solutions publish a rate card?",
      answer:
        "Because every engagement is genuinely different in scope, and a rate card oversimplifies what you're actually buying. Two five-page websites can have a 5x cost difference depending on integrations, custom design, and content complexity. The free scoping call exists specifically to give an honest, accurate number based on your actual requirements rather than an unhelpful generic range.",
    },
    {
      question: "Are projects always fixed-price?",
      answer:
        "Almost always. Fixed-price proposals are the default because they protect both sides — you know your budget, Preisser Solutions is incentivized to ship efficiently, and there's no meter running. Hourly engagements are reserved for genuinely open-ended consulting where fixed scoping isn't possible.",
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
        "If you ask for genuinely new work outside the original scope — a new feature, a new page, a new integration — we quote the addition transparently and you decide whether to add it. The original proposal price doesn't change. This keeps everyone honest and avoids the scope-creep billing games typical of agency engagements.",
    },
    {
      question:
        "Why is custom development priced higher than a Squarespace subscription?",
      answer:
        "Different products. A Squarespace subscription is monthly platform rent for a templated site. A custom Preisser Solutions engagement is a one-time investment in a custom-coded foundation with full ownership, no recurring platform fees, faster page loads, AI engine optimization, and unlimited customization. Over a 3-5 year horizon, total cost is typically lower for custom — and the value delivered is substantially higher.",
    },
    {
      question:
        "How does Preisser Solutions compare to a typical boutique agency?",
      answer:
        "Typically 30-50% more efficient for equivalent scope. Boutique agencies carry account executives, project managers, junior developers, and design-to-dev handoff overhead. Preisser Solutions runs founder-led with no intermediate roles, so more of the project price goes directly to building the deliverable instead of coordinating between people.",
    },
    {
      question:
        "How does Preisser Solutions compare to offshore developers?",
      answer:
        "Higher per project than typical offshore engagements, because you're paying for direct founder access, in-region time-zone availability, and the quality of work that comes from a senior US-based developer building it personally. For mission-critical work where execution quality matters, the cost difference is generally worth it; for genuine commodity work, offshore can be the right call.",
    },
    {
      question: "Can we discuss scope before the scoping call?",
      answer:
        "Sure. If you describe what you're considering by email, we can usually give an honest order-of-magnitude sense of project size before a formal scoping call. The free call exists to turn that rough sense into a precise fixed-price number, not to gatekeep the conversation.",
    },
    {
      question: "Is there ongoing maintenance?",
      answer:
        "Optional. Every engagement includes 30 days of post-launch support. After that, clients can choose an ongoing maintenance retainer for continued updates, content additions, performance monitoring, and security patching — structured as a flat monthly amount based on the size and complexity of what's being maintained.",
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
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Cassidy HVAC",
    "HG Oil Holdings",
  ],
  relatedLinks: [
    { label: "How we work (process)", href: "/process" },
    { label: "All services", href: "/services" },
    { label: "All case studies", href: "/case-studies" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "Custom websites", href: "/services/custom-websites" },
    { label: "Tyler Preisser bio", href: "/tyler-preisser" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get an honest scope estimate",
  ctaSubcopy:
    "Free scoping call. We walk through what you're trying to build and give a fixed-price proposal — no sales pitch, no obligation.",
};
