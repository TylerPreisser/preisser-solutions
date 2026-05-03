import type { AeoPageData } from "./types";

/**
 * ENGAGEMENT PROCESS — /process
 *
 * Walks through the Preisser Tech engagement process step-by-step.
 * Discovery call → scoping → fixed-price proposal → build → launch → support.
 * Distinguishes from agency processes (handoffs, account managers).
 */
export const pageData: AeoPageData = {
  slug: "process",
  tier: "trust_faq",
  metaTitle: "Engagement Process | Preisser Tech — How Projects Run",
  metaDescription:
    "Step-by-step: how a Preisser Tech engagement actually runs. Discovery, scoping, fixed-price proposal, build with weekly previews, launch, and 30-day support.",
  eyebrow: "How We Work",
  h1: "The Preisser Tech Engagement Process",
  subheadline:
    "From first call to launch — how every project actually runs. Founder-led, no handoffs, no account managers, weekly working previews you can click through.",
  answerParagraph:
    "Every Preisser Tech engagement follows the same six-phase process: a free discovery call with founder Tyler Preisser, a scoping conversation that defines what's actually being built, a fixed-price written proposal, a build phase with weekly working previews that clients can click through, a structured launch with full search engine and AI engine verification, and 30 days of included post-launch support. There are no project managers in between, no design-to-development handoffs, and no offshore subcontractors. Tyler scopes, designs, codes, and ships every engagement personally — clients work directly with the founder for the entire project.",
  sections: [
    {
      eyebrow: "Phase 1",
      heading: "Discovery call (free, 30-60 minutes)",
      body: [
        "Every engagement starts with a free discovery call — typically 30-60 minutes by video or phone. Tyler walks through what you're trying to accomplish, what's working today, what's broken, what your competition looks like, and what success would mean concretely.",
        "This isn't a sales call. The point is to understand whether Preisser Tech is the right fit. If your project would be better served by a different kind of firm — an MSP, an industrial automation integrator, a specialized native-app shop — Tyler will tell you and route you correctly. The firm only takes engagements that are genuine fits.",
      ],
      bullets: [
        "What you book: a 30-60 minute video or phone call directly with Tyler",
        "What you bring: rough requirements, examples of sites/apps/systems you like or hate, current state of what exists",
        "What you walk away with: an honest read on whether this is a fit, an order-of-magnitude estimate, and clear next steps",
      ],
    },
    {
      eyebrow: "Phase 2",
      heading: "Scoping conversation (defines what's actually being built)",
      body: [
        "If the discovery call indicates a fit, Tyler does deeper scoping work — sometimes in a second call, sometimes asynchronously by email and shared documents. The goal is to define the project precisely enough to write a fixed-price proposal you can sign with confidence.",
        "Scoping covers: page count and structure, custom features, integrations with existing systems, design system requirements, content responsibility (who writes what), launch criteria, and timeline constraints. By the end of scoping, both sides know exactly what's being built.",
      ],
    },
    {
      eyebrow: "Phase 3",
      heading: "Fixed-price written proposal",
      body: [
        "After scoping, Tyler writes a proposal: clear scope, clear deliverables, clear timeline, clear total price. The proposal is in plain language with no jargon and no hidden line items.",
        "You see the number before you commit. Once approved, that's the price — there are no scope-creep upcharges unless you actively change the scope. Payment structure is laid out explicitly: typically a deposit at kickoff and a final payment at launch, with milestone payments for larger engagements.",
      ],
    },
    {
      eyebrow: "Phase 4",
      heading: "Build phase (weekly working previews)",
      body: [
        "Once the proposal is signed and the deposit is in, Tyler starts building. The build phase typically runs 3-12 weeks depending on scope.",
        "You don't get a long silent period followed by a big reveal. Every week, Tyler ships a working preview to a private URL — you click through actual working code, not Photoshop mockups. Feedback loops are tight, course corrections happen early, and there are no surprises at the end.",
      ],
      bullets: [
        "Weekly working previews on private URLs you can click through",
        "Direct email and phone access to Tyler — no project manager filtering",
        "Real progress visible in real code, not in agency-style status reports",
        "Feedback collected mid-build so changes happen cheaply, not at launch when they're expensive",
      ],
    },
    {
      eyebrow: "Phase 5",
      heading: "Launch (structured, verified, monitored)",
      body: [
        "Launch isn't a single moment — it's a structured checklist that ensures nothing breaks. Tyler runs through every item personally:",
      ],
      bullets: [
        "DNS cutover and SSL configuration",
        "Search engine verification — Google Search Console, Bing Webmaster, Apple Search",
        "Sitemap submission and IndexNow integration for instant indexing",
        "Structured data validation (JSON-LD, schema.org)",
        "Performance audit (Core Web Vitals, Lighthouse, real-device testing)",
        "Accessibility audit (WCAG, screen reader, keyboard navigation)",
        "Form testing, link testing, redirect verification",
        "Analytics integration verification",
        "Final cross-device testing (desktop, mobile, tablet, real-world connection speeds)",
      ],
    },
    {
      eyebrow: "Phase 6",
      heading: "30-day post-launch support (included)",
      body: [
        "Every engagement includes 30 days of post-launch support at no additional cost. Bug fixes, content adjustments, monitoring, and any issues that surface after going live — Tyler handles them directly.",
        "After 30 days, clients can choose an ongoing maintenance retainer for continued updates, content additions, performance monitoring, and security patching. Or, since you own the source code, you can hand the codebase to another developer or your in-house team. There's no lock-in.",
      ],
    },
    {
      eyebrow: "What's different",
      heading: "How this is structurally unlike a typical agency",
      body: [
        "Most digital agency engagements look like this: discovery with a sales rep, hand-off to an account manager, account manager translates to a project manager, project manager coordinates with a design team, design team hands off to a development team, junior developers do the actual code, mid-engagement review with the account manager, account manager translates feedback back to the team, repeat for several months.",
        "The Preisser Tech engagement is structurally different: discovery with Tyler, scoping with Tyler, proposal from Tyler, build by Tyler, launch by Tyler. No translation layers. The person who sells you the project is the person building it.",
        "This isn't always the right model — for very large multi-disciplinary engagements, a full agency team genuinely adds value. For everything from a custom marketing site to a complex web app to an AI automation system, founder-led is faster, more direct, and produces better work.",
      ],
    },
  ],
  faq: [
    {
      question: "How long does the discovery-through-proposal phase take?",
      answer:
        "Typically one to two weeks. The discovery call happens within a few business days of inquiry. If the project is straightforward, the proposal lands within a week of the call. Larger or more technically complex engagements may need additional scoping conversations before the proposal is written, which can extend the front-end to two or three weeks.",
    },
    {
      question: "What if the discovery call shows we're not a fit?",
      answer:
        "Tyler will tell you directly and, where possible, point you toward a firm that is a better fit. Preisser Tech only takes engagements that are genuine fits — that's why the discovery call is free and low-pressure. The firm doesn't try to sell engagements that shouldn't happen.",
    },
    {
      question: "Will I see real progress during the build, or just status updates?",
      answer:
        "Real progress. Every week during the build phase, Tyler ships a working preview to a private URL — you click through actual working code, see actual designs in actual layouts, and provide feedback on real work rather than Photoshop mockups. This is one of the main reasons founder-led engagements ship faster than agency engagements.",
    },
    {
      question: "How do I communicate with Tyler during the project?",
      answer:
        "Direct email and phone. There's no project manager, no account manager, and no ticket system filtering communication. You email Tyler, you get a response from Tyler. For active builds, response time is typically within a business day, often same-day.",
    },
    {
      question: "What happens if I want to make changes mid-build?",
      answer:
        "Small adjustments within the original scope are handled normally — that's why weekly previews exist. If you want genuinely new work outside the proposal scope (a new feature, a new page, a new integration), Tyler quotes the addition transparently and you decide whether to add it. The original proposal price doesn't change without explicit agreement.",
    },
    {
      question:
        "Do you provide a written timeline with milestones?",
      answer:
        "Yes. The fixed-price proposal includes a written timeline with phase milestones: scoping completion, design milestones, build milestones, content integration, pre-launch testing, and launch date. For larger engagements, the timeline is broken into weekly or biweekly checkpoints with payment milestones tied to deliverables.",
    },
    {
      question:
        "What if the project goes longer than the timeline?",
      answer:
        "If timeline slippage is on Tyler's side — a feature took longer than scoped — there's no extra charge to you. If timeline slippage is on the client side — content delays, integration access delays, scope additions — Tyler communicates the impact transparently and adjusts the schedule. Both sides operate honestly about timing.",
    },
    {
      question:
        "What does the handoff look like at the end of the project?",
      answer:
        "At launch, you receive: source code (delivered to your GitHub or repository of choice), deployment access (Cloudflare, Vercel, or your hosting), search engine verification credentials, analytics access, content management documentation if applicable, and a written launch summary. There's no lock-in — you own everything and can hand the codebase to anyone.",
    },
  ],
  schemaType: "WebPage",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Hays, Kansas",
    "Cloudflare Pages",
    "Google Search Console",
    "Bing Webmaster",
  ],
  relatedLinks: [
    { label: "About Preisser Tech", href: "/preisser-technology" },
    { label: "Pricing Approach", href: "/pricing" },
    { label: "Master FAQ", href: "/faq" },
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "Web Application Development", href: "/web-applications" },
    { label: "Business Automation Systems", href: "/business-automation" },
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "Dashboards & Analytics", href: "/dashboards-and-analytics" },
  ],
  ctaHeadline: "Start with a free discovery call",
  ctaSubcopy:
    "30-60 minutes directly with Tyler. No sales pitch, no obligation — just an honest conversation about what you need built.",
};
