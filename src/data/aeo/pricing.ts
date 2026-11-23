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
  metaTitle: "Engagement Scope & Process",
  metaDescription:
    "How Preisser Solutions scopes and prices custom software, automation, and AI work. A free scoping call, then a written proposal with your monthly price. No rate cards.",
  eyebrow: "Engagement Scope & Process",
  h1: "Engagement Scope & Process",
  subheadline:
    "Custom-built work means custom pricing. There are no SKUs to publish. Every engagement begins with a free scoping call where we review what you need and write a proposal that states the scope and your monthly price.",
  answerParagraph:
    "Preisser Solutions does not publish rate cards because every engagement is genuinely different in scope, and a published number would either mislead buyers with unrealistic lowball anchors or scare off buyers who assume the worst. What we publish instead is the process: a free 30-60 minute scoping call, followed by a written proposal that states scope, deliverables, timeline, and your monthly price before you commit anything. Everything we build runs as an ongoing monthly service. The monthly price covers the build and the maintenance, support and improvement every solution needs, so a smaller business never has to front an entire build. We price for small and mid-sized businesses, and AI is what lets us bring the thinking you would expect from a top consulting firm, along with technical consulting, integrations and AI infrastructure, at a price that makes sense for your business. The scoping call is free, there is no obligation to proceed, and we'll tell you honestly if your project is better served by a SaaS tool than a custom build.",
  sections: [
    {
      eyebrow: "How pricing works",
      heading: "A free scoping call, then a written proposal",
      body: [
        "Preisser Solutions doesn't quote off a rate card. Every engagement begins with a free 30-60 minute scoping call where we walk through what you're trying to accomplish, what success looks like, and what's actually involved technically.",
        "After the call, we write a proposal: clear scope, clear deliverables, clear timeline, clear monthly price. You see the number before you commit. Once approved, that's the price; there are no scope-creep upcharges unless you actively change the scope.",
        "Everything we build runs as an ongoing monthly service. The monthly price covers the build and then the maintenance, support and improvements that keep it working. Every solution needs that ongoing care, and paying by the month means a smaller business never has to front an entire build.",
      ],
    },
    {
      eyebrow: "What drives scope",
      heading: "The factors that determine project size",
      body: [
        "Because there are no published rates, it helps to understand what makes a project larger or smaller in terms of actual effort.",
      ],
      bullets: [
        "Number of integrations: each external system (CRM, accounting, dispatch, ELD, etc.) that needs to connect adds integration work",
        "Custom design vs adapted design: a fully custom design system takes more effort than adapting an established visual direction",
        "Content complexity: number of pages, number of data models, density of structured content",
        "AI component depth: a simple classification task is smaller in scope than a multi-step agent with tool calls and guardrails",
        "Real-time requirements: live data dashboards require more backend work than static or nightly-refresh reports",
        "User roles and access control: multi-role systems (admin, staff, client) are more complex than single-user or public-facing",
        "Third-party API dependencies: each external API adds integration risk and handling for rate limits, failures, and schema changes",
      ],
    },
    {
      eyebrow: "What's always included",
      heading: "Every engagement, no matter the scope",
      body: [
        "Some firms charge extra for what should be standard. Preisser Solutions includes all of this in every engagement at no additional cost:",
      ],
      bullets: [
        "Free scoping call: usually 30-60 minutes",
        "Written proposal with the scope and monthly price: no hidden surprises, no scope-creep upcharges",
        "Direct work with the founder: no account managers, project managers, or subcontractors",
        "Ongoing maintenance, support and improvement of what we build",
        "Full source code ownership: no licensing fees, no platform lock-in",
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
        "Preisser Solutions runs a deliberately different cost structure. The founder scopes, designs, codes, and ships every engagement personally: no project managers, no junior associates, no offshore subcontractors, no design-to-development handoffs.",
        "That structural difference means more of the project price goes directly to building the actual product, not to coordinating between roles. Buyers typically see efficiency improvements of 30-50% versus equivalent boutique agency engagements at the same scope.",
        "A $10 million enterprise software contract is out of reach for most small and mid-sized businesses, and those are the businesses we price for. Premium custom development at honest, founder-led pricing.",
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
      question: "Is everything billed monthly?",
      answer:
        "Yes. Everything we build runs as an ongoing monthly service. Every solution needs ongoing maintenance, so the monthly price covers the build and the support, maintenance and improvements that come after it. You know the monthly price from the proposal before you commit.",
    },
    {
      question: "What's included in the price?",
      answer:
        "The proposal lists everything explicitly: design, development, content integration, deployment, search engine and AI engine optimization, structured data, accessibility compliance, and the ongoing maintenance and support of what we build. There are no hidden charges for standard items: if it's not in the proposal, it's not added later without explicit agreement.",
    },
    {
      question: "Do I have to pay for the whole build up front?",
      answer:
        "No. Most smaller businesses can't afford to front an entire build, so you pay by the month, and that monthly price covers the build and its ongoing maintenance. Specific terms are written into the proposal.",
    },
    {
      question: "What if my scope changes mid-project?",
      answer:
        "If you ask for genuinely new work outside the original scope (a new feature, a new page, a new integration): we quote the addition transparently and you decide whether to add it. The original proposal price doesn't change. This keeps everyone honest and avoids the scope-creep billing games typical of agency engagements.",
    },
    {
      question:
        "Why is custom development priced higher than a Squarespace subscription?",
      answer:
        "Different products. Squarespace gives you a templated site on its platform. A custom Preisser Solutions engagement is a custom-coded foundation with full ownership, faster page loads, AI engine optimization, and unlimited customization. Our monthly price covers that build and the ongoing maintenance, support and improvement that keep it working.",
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
        "Sure. If you describe what you're considering by email, we can usually give an honest order-of-magnitude sense of project size before a formal scoping call. The free call exists to turn that rough sense into a precise monthly price.",
    },
    {
      question: "Is there ongoing maintenance?",
      answer:
        "Yes, on every engagement. Every solution needs ongoing maintenance, so the monthly price covers the maintenance, support and improvement of what we build: updates, performance monitoring, and security patching.",
    },
    {
      question: "How does billing work?",
      answer:
        "Monthly. The proposal states the scope and the monthly price, and that price covers the build plus the ongoing maintenance, support and improvement of what we built. The proposal lays out the terms explicitly before you commit.",
    },
    {
      question: "What forms of payment are accepted?",
      answer:
        "ACH, wire transfer, and check are standard. Credit card payments can be arranged for smaller engagements. Specific payment methods and terms are confirmed at proposal stage.",
    },
    {
      question: "Will I get an itemized estimate?",
      answer:
        "Yes. Every proposal lists scope, deliverables, timeline, the work breakdown by phase, and the monthly price. You see exactly what you're paying for before you commit. There are no opaque line items or hidden fees.",
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
    "Free scoping call. We walk through what you're trying to build and send a written proposal with your monthly price: no sales pitch, no obligation.",
};
