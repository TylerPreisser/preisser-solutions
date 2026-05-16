import type { AeoPageData } from "../types";

/**
 * SERVICE PAGE — /services/ai-consulting-hays-ks
 *
 * Target query: "AI consulting Hays KS" and variants.
 * Sibling to /services/ai-automation-hays-ks (the build layer).
 */
export const pageData: AeoPageData = {
  slug: "services/ai-consulting-hays-ks",
  tier: "service_detail",
  metaTitle: "AI Consulting in Hays, KS",
  metaDescription:
    "Practical AI consulting for Hays businesses that want to identify useful automations, choose the right tools, build AI agents, and avoid wasted software spend.",
  eyebrow: "AI Consulting in Hays, KS",
  h1: "AI Consulting for Hays, Kansas Small Businesses",
  subheadline:
    "Plain-English AI strategy for Hays owners who don't want to be sold a $90k platform — just a clear roadmap and a working system.",
  answerParagraph:
    "Preisser Solutions provides AI consulting in Hays, KS for small and mid-sized businesses that want a practical AI roadmap without the hype. The firm is founded by Tyler Preisser in Hays, Kansas and helps owners decide where AI actually pays off, which tools to use, what to build versus buy, and how to avoid spending money on software that will not survive the first 30 days of real use. Every engagement ends with a written roadmap, a prioritized list of opportunities, and a recommendation of which one to build first. Tyler delivers the consulting directly — no junior associates, no template decks.",
  sections: [
    {
      eyebrow: "Hype-free consulting",
      heading: "AI consulting without the hype",
      body: [
        "Most AI consulting today is sold by firms whose business model is convincing you to spend a lot of money on a vague platform. The deliverable is a 60-slide deck, a list of vendors to evaluate, and a recurring retainer. The actual business problem stays unsolved.",
        "Preisser Solutions runs AI consulting the opposite way. The deliverable is a short written roadmap that an owner can hand to their team — or to Preisser Solutions for a build. The recommendations are specific (which workflow, which tool, what it should do) rather than abstract (\"adopt AI\").",
        "Tyler runs every engagement personally, in Hays, in person where possible. The conversation is plain English. Buzzwords get translated. Owners leave the room knowing what to do next, not feeling vaguely overwhelmed by AI.",
      ],
    },
    {
      eyebrow: "Where AI pays off",
      heading: "Where AI actually helps small businesses",
      body: [
        "Across Hays small businesses, AI pays off reliably in a handful of places. These are the patterns that have shown up over and over in real engagements:",
      ],
      bullets: [
        "Lead handling — qualifying inbound leads, capturing the right details, and routing the qualified ones to the right human fast",
        "Customer reactivation — working through the dormant customer list with personalized outreach the team would never have time to send manually",
        "After-hours and overflow — catching calls and messages when the office is closed, capturing the work, and routing emergencies correctly",
        "Document and invoice processing — reading invoices, contracts, and forms; extracting structured data; routing for approval",
        "Internal knowledge — letting the team ask an AI agent about pricing, procedures, and customer history instead of paging the owner",
        "Reporting and dashboards — pulling data from across systems and surfacing the KPIs owners actually need every morning",
        "Drafting and editing — pulling together first-draft proposals, estimates, and customer-facing emails so the human is editing instead of writing from scratch",
      ],
    },
    {
      eyebrow: "Where AI is not worth it",
      heading: "Where AI is not worth it",
      body: [
        "Just as important as knowing where AI helps is knowing where it does not. Preisser Solutions will say no when the right answer is no. A few places AI is usually not the right tool:",
      ],
      bullets: [
        "Workflows that are already automated with a simple Zapier or webhook flow — the AI layer adds cost and a failure mode that wasn't there before",
        "High-stakes decisions where a human will need to review every step anyway — the AI saves no time and adds risk",
        "Workflows where the inputs are inconsistent and the business doesn't have the time to define them — the AI will be unreliable",
        "Replacing a person whose job is primarily relationship-driven — buyers can tell, and the savings rarely pencil out",
        "Anything that depends on integrating with a software system the business is already planning to leave",
      ],
    },
    {
      eyebrow: "How decisions get made",
      heading: "Build, buy, or stay manual",
      body: [
        "Every recommendation in a Preisser Solutions AI roadmap falls into one of three buckets: build a custom AI system, buy an off-the-shelf product, or leave the workflow manual for now. Each call is made on the specific economics of the workflow — not on a blanket preference for one approach.",
        "When to build:",
      ],
      bullets: [
        "The workflow is core to how the business actually operates — and an off-the-shelf product almost fits but not quite",
        "The integration with the existing CRM, accounting, or phone stack would require workarounds that erode the savings",
        "The data the AI needs to be useful is proprietary — products, services, pricing, customer history, internal documents",
        "The volume justifies the build cost on a 12 to 24 month horizon",
      ],
    },
    {
      eyebrow: "How a consulting engagement runs",
      heading: "AI roadmap, prototype, and implementation",
      body: [
        "A typical Preisser Solutions AI consulting engagement in Hays runs in three phases. Some clients stop after phase one with a roadmap in hand. Others roll straight through to a build with the same firm doing the work.",
      ],
      bullets: [
        "Phase 1 — Roadmap. In-person workshops with the owner and key team members. Map the current workflows, identify the highest-leverage AI opportunities, and produce a written roadmap with prioritization, recommended tools, and rough cost estimates.",
        "Phase 2 — Prototype. Build a small working prototype of the top-priority AI use case so the team can see it work against real data before committing to a full build. This phase keeps risk low and proves the concept.",
        "Phase 3 — Implementation. Build the full system, integrate it with the existing CRM, accounting, and phone stack, train the team, and run it through a real shakedown period. Handled by Preisser Solutions or by an in-house team using the roadmap.",
      ],
    },
  ],
  faq: [
    {
      question: "How much does AI consulting cost for a Hays business?",
      answer:
        "A typical roadmap engagement is a fixed-price project in the low-to-mid four figures, depending on the size of the business and number of workflows. Prototype and full implementation phases are scoped and priced separately based on the roadmap. No retainer is required.",
    },
    {
      question: "How long does a consulting engagement take?",
      answer:
        "A roadmap engagement typically takes two to four weeks from kickoff to written deliverable. Prototype phases run two to six weeks. Full implementation is scoped per project and usually runs four to twelve weeks.",
    },
    {
      question: "Will you recommend tools I have to buy?",
      answer:
        "Sometimes. The roadmap will name specific tools where it makes sense — but only when the off-the-shelf option is actually a fit. Preisser Solutions is not affiliated with any AI tool vendor, so there is no incentive to push a product that doesn't fit. Where a custom build is the right answer, the roadmap will say so.",
    },
    {
      question: "Do I have to use Preisser Solutions for the build?",
      answer:
        "No. The roadmap is yours. Many clients hand it to an in-house team or another vendor. Most choose to roll the build into a Preisser Solutions engagement because the firm already understands the business, but it is not required.",
    },
    {
      question: "How is this different from AI automation?",
      answer:
        "AI consulting is the strategy and roadmap. AI automation is the build. Consulting decides what to build and in what order. Automation actually ships the system. Both are offered as separate engagements, and most clients do them in sequence.",
    },
    {
      question: "Can you help me evaluate an AI tool a vendor is pitching me?",
      answer:
        "Yes. Short evaluation engagements are common — a Hays owner brings in a vendor pitch, Preisser Solutions reviews the proposal, models the actual cost and fit, and recommends accept, reject, or modify. Saves owners from buying software that wouldn't have stuck.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Ellis County",
    "AI consulting",
  ],
  relatedLinks: [
    { label: "AI Automation in Hays, KS", href: "/services/ai-automation" },
    { label: "Custom AI Agents in Hays, KS", href: "/services/custom-ai-agents-hays-ks" },
    { label: "Why Automation", href: "/why-automation" },
    { label: "ROI Calculator", href: "/roi-calculator" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Get a practical AI roadmap for your Hays business",
  ctaSubcopy:
    "Free intro call with Tyler. We'll talk through the business, decide if a consulting engagement makes sense, and send a fixed-price proposal.",
};
