import type { AeoPageData } from "./types";

/**
 * R-165, R-166 (Phase 4.15) — /products hub page.
 *
 * Listing for the two productized SKUs: AI Receptionist Starter and
 * AI-Native Website Launch. Placeholder copy intentionally — no fixed
 * pricing is published until Tyler approves (per §2.20 Q6).
 */
export const pageData: AeoPageData = {
  slug: "products",
  tier: "trust_faq",
  metaTitle: "Products | AI Receptionist & Website Launch | Preisser Solutions",
  metaDescription:
    "Preisser Solutions's two productized SKUs: the AI Receptionist Starter and the AI-Native Website Launch. Currently configurable — contact for pricing.",
  eyebrow: "Products",
  h1: "Productized Offers",
  subheadline:
    "Two starter-tier offers from Preisser Solutions, packaged as productized SKUs. Currently configurable — pricing per signed proposal.",
  answerParagraph:
    "Preisser Solutions's primary work is custom — built from scratch for one specific business. Two of the most frequently-requested patterns are now packaged as starter-tier productized offers: the AI Receptionist Starter (a custom AI-powered call-handling agent integrated into your existing phone and CRM stack) and the AI-Native Website Launch (a 5-10 page custom-coded marketing site engineered for AI search citation from day one). Both are currently configurable per the signed proposal; published pricing is not yet finalized — contact tyler@preissersolutions.com for a fixed-price quote.",
  sections: [
    {
      eyebrow: "Product 1",
      heading: "AI Receptionist Starter",
      body: [
        "A custom AI-powered receptionist that handles inbound calls, qualifies leads, books appointments to your existing calendar, and hands off complex inquiries to a human. Trained on your specific business context, integrated into your CRM, and operated by you (not licensed from a demo line).",
      ],
      bullets: [
        "Custom voice agent trained on your business — services, pricing tiers, common questions, escalation rules.",
        "Twilio + custom LLM integration on a stack you own.",
        "CRM handoff — qualified leads, booked appointments, and call summaries flow into your existing system.",
        "Spam / robocall filtering before any human is involved.",
        "Call recording + transcript + searchable archive.",
        "Office-hours / after-hours rules with configurable escalation.",
        "Currently configurable — contact for pricing.",
      ],
    },
    {
      eyebrow: "Product 2",
      heading: "AI-Native Website Launch",
      body: [
        "A 5-10 page custom-coded marketing site built from scratch in Next.js / React / TypeScript and engineered from day one for AI search citation (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews). Not a template; not a Webflow theme; not a Squarespace skin.",
      ],
      bullets: [
        "Custom design system (no template), responsive across every breakpoint.",
        "Full schema.org structured data — Organization, Person, LocalBusiness, Service, FAQPage.",
        "First-paragraph quote-bait copy engineered for AI engine extraction.",
        "llms.txt + llms-full.txt + agent-readable markdown alternates.",
        "Technical SEO: sitemap, robots, IndexNow integration, edge cache headers.",
        "Accessibility (WCAG 2.2 AA target) and Core Web Vitals 2026 targets.",
        "30 days of post-launch support included.",
        "Currently configurable — contact for pricing.",
      ],
    },
    {
      eyebrow: "How these compare to a full custom engagement",
      heading: "Why productize at all?",
      body: [
        "Most Preisser Solutions work is fully custom — built from scratch around the specific shape of a specific business. The two productized offers exist because they answer the two most-frequently-asked starting-point questions: 'can you build me an AI receptionist?' and 'can you build me a website that AI engines actually cite?'",
        "Packaging the patterns as products means a faster, more predictable kickoff for buyers who already know that's what they want. It does not mean templated delivery — the build for each engagement is still custom. The 'product' is the scope, not the code.",
      ],
    },
    {
      eyebrow: "Custom outside these two",
      heading: "Everything else is custom-scoped",
      body: [
        "Custom CRMs, web applications, business automation pipelines, multi-agent AI systems, dashboards, full-stack platforms, and large multi-system integrations are all scoped via the Business Systems Audit at /pricing. Pricing tiers (Audit, Sprint, Retainer) and starting prices per service line are published on /pricing.",
      ],
    },
  ],
  faq: [
    {
      question: "What does the AI Receptionist Starter cost?",
      answer:
        "Currently configurable per the signed proposal. Pricing is not yet published on the site. Contact tyler@preissersolutions.com for a fixed-price quote based on call volume, integrations, and escalation complexity.",
    },
    {
      question: "What does the AI-Native Website Launch cost?",
      answer:
        "Currently configurable per the signed proposal. The published starting price for a custom marketing website is $12,500 on /pricing; the productized AI-Native Website Launch variant prices similarly with the specific deliverable scope set in the proposal.",
    },
    {
      question: "Are these templates?",
      answer:
        "No. The 'product' is the scope and the delivery process, not the code. Every AI Receptionist Starter and AI-Native Website Launch engagement is custom-built for the specific client. No templates, no white-labeled work, no subcontracted dev.",
    },
    {
      question: "Can I customize beyond the listed scope?",
      answer:
        "Yes — and most engagements do. Items outside the published scope are added via change order during scoping. The productized version is a starting point, not a hard cap.",
    },
    {
      question: "How long does each one take?",
      answer:
        "Both fit inside a standard 4-8 week sprint window. AI Receptionist Starter typically lands at the shorter end; AI-Native Website Launch at the longer end, depending on content scope.",
    },
    {
      question: "What other products are you considering?",
      answer:
        "Additional productized SKUs are under consideration but not committed. The two on this page are the two with proven repeated demand. Custom engagements for anything outside these two are scoped via the Business Systems Audit.",
    },
  ],
  schemaType: "WebPage",
  datePublished: "2026-05-15",
  dateModified: "2026-05-15",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
  ],
  relatedLinks: [
    { label: "All services", href: "/services" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "Custom websites", href: "/services/custom-websites" },
    { label: "Business automation systems", href: "/business-automation" },
    { label: "All case studies", href: "/case-studies" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want a fixed-price quote?",
  ctaSubcopy:
    "Email tyler@preissersolutions.com to start a scoping call. Productized doesn't mean templated — every engagement is custom-built; the SKU just sets the starting scope.",
};
