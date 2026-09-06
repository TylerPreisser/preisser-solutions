import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/ai-automation-cost-kansas",
  tier: "blog",
  datePublished: "2026-05-05",
  dateModified: "2026-05-20",
  metaTitle: "AI Automation Scope for Kansas SMBs",
  metaDescription:
    "What makes an AI automation project larger or smaller in terms of effort, the scope drivers Kansas small businesses should understand before starting.",
  eyebrow: "Blog · AI Automation",
  h1: "What Drives AI Automation Project Scope in Kansas?",
  subheadline:
    "Understanding scope before you start. The factors that make an automation project simple versus complex, without a single dollar figure.",
  answerParagraph:
    "AI automation projects for Kansas small businesses vary enormously in scope depending on what needs to be built. Off-the-shelf SaaS automations (missed-call follow-up, basic email sequences) are quick to deploy and require minimal custom work. Custom-built single-system automations (like the customer reactivation engine Preisser Solutions built for Cassidy HVAC or the AI invoicing assistant for HG Oil Holdings): involve integration design, custom code, testing, and monitoring. Full custom platforms and CRMs sit at the top of the complexity range. The key drivers of scope are: how many systems need to integrate, whether the task requires AI judgment or just rules-based routing, and whether a productized SaaS solution already exists that fits the workflow.",
  sections: [
    {
      eyebrow: "Why we explain scope drivers",
      heading: "Understanding scope before starting a call",
      body: [
        "Walk through any Kansas automation vendor's experience. Every pricing page says 'contact us for a custom quote.' Every consultant gates even ballpark conversations behind a discovery call. The result: buyers can't build even a rough mental model of project scale without burning half a day on sales calls.",
        "We explain scope drivers because understanding what makes a project larger or smaller helps you come into the conversation with an honest sense of what you need, and whether a productized SaaS tool might already solve it without any custom development.",
      ],
    },
    {
      eyebrow: "Tier 1",
      heading: "Off-the-shelf SaaS automations: quick setup, no custom development",
      body: [
        "These are productized systems that exist specifically to solve common small-business problems. Examples: missed-call text-back, basic email autoresponders, review request automation, basic appointment booking. No custom development needed.",
      ],
      bullets: [
        "Missed-call text-back (CallRail, OpenPhone, GoHighLevel): ready to use, minimal configuration.",
        "Review request automation (BirdEye, Podium, NiceJob): productized, configure and launch.",
        "Basic email automation (Mailchimp, ActiveCampaign): templates exist for common sequences.",
        "Appointment booking (Calendly, Acuity): low configuration overhead.",
        "Setup time: typically 2-8 hours, no code required.",
      ],
      subsections: [
        {
          heading: "When this is the right answer",
          body: [
            "If the problem is well-defined and well-trodden (someone has built productized software for it): SaaS is almost always the right starting point. We help clients pick the right tool and stand it up. We don't build custom when productized fits.",
          ],
        },
      ],
    },
    {
      eyebrow: "Tier 2",
      heading: "Custom single-system automations: moderate scope",
      body: [
        "These are systems that don't exist as productized SaaS, or where the productized version doesn't fit the operational reality. Custom-coded against your existing CRM or operations stack.",
      ],
      bullets: [
        "Customer reactivation engine (like the Cassidy HVAC build: 60%+ reactivation): scope driven by CRM integration depth, message personalization requirements, reply handling logic.",
        "AI invoicing assistant (like HG Oil Holdings: 75% reduction in manual handling): scope driven by document variety, extraction complexity, target system integration.",
        "AI marketing engine (content + visuals + posting, hands-off): scope driven by content types, platform integrations, approval workflows.",
        "BOL/document parsing automation (trucking, logistics): scope driven by document format variance, target system complexity.",
        "Build time: typically 4-8 weeks.",
      ],
    },
    {
      eyebrow: "Tier 3",
      heading: "Custom platforms and CRMs: highest scope",
      body: [
        "Full business-system builds. Custom CRM, custom inventory management, custom dispatch/operations layer. These replace generic SaaS that doesn't fit the specific workflow.",
      ],
      bullets: [
        "Custom CRM (insurance, healthcare, niche service): scope driven by number of workflows, user roles, integration endpoints.",
        "Custom inventory + AI invoicing (HG Oil Holdings scope): scope driven by data sources, real-time requirements, reporting depth.",
        "Custom dispatch + ops automation (trucking, logistics): scope driven by fleet size, system integrations, compliance requirements.",
        "Multi-agent AI platform (MarCommand scope): highest complexity (multiple coordinated agents, approval workflows, observability).",
        "Build time: typically 8-20 weeks.",
      ],
    },
    {
      eyebrow: "The key scope drivers",
      heading: "What makes a project larger or smaller",
      body: [
        "Independent of tier, these are the factors that determine how much work is actually involved:",
      ],
      bullets: [
        "Number of integrations: each external system adds integration work, error handling, and testing surface area.",
        "AI judgment vs rules-based routing: tasks requiring LLM judgment are more complex than deterministic rules.",
        "Document/data variety: uniform inputs (always the same format) are simpler than varied inputs (many formats, many sources).",
        "Reply handling and escalation: systems that need to read and route human replies are more complex than one-way sends.",
        "Approval workflows: systems with human-in-the-loop approval steps (human reviews before AI sends) add complexity.",
        "Real-time vs batch: real-time processing is more demanding than nightly batch jobs.",
        "Existing productized options: if a SaaS product already does it, the custom scope is near zero.",
      ],
    },
    {
      eyebrow: "ROI",
      heading: "What pays back fastest",
      body: [
        "Of the systems above, the highest-ROI / fastest-payback patterns are:",
      ],
      bullets: [
        "Missed-call text-back: typically pays back quickly for any service business doing meaningful ticket volume.",
        "Customer reactivation: Cassidy HVAC saw 60%+ dormant reactivation in 6 weeks. Every reactivated customer is recovered annual revenue.",
        "AI invoicing: HG Oil Holdings saw 75% reduction in manual handling time, freeing one office person for higher-value work.",
        "Custom dashboards: HG Oil Holdings saw 95% reduction in back-office logistics time after a custom inventory dashboard.",
      ],
    },
  ],
  faq: [
    {
      question: "Why don't you publish prices?",
      answer:
        "Because two projects that look the same on paper can have a 5x difference in actual scope depending on integrations, data variety, and workflow complexity. A published number would either be misleadingly low or unnecessarily scary. The free scoping call exists to give an accurate, specific number based on your actual situation.",
    },
    {
      question: "Are there setup fees, license fees, or hidden costs?",
      answer:
        "No hidden costs from us. We quote a fixed price and that price is the price. Third-party costs (Twilio for SMS, OpenAI API tokens, SaaS subscriptions) get itemized in writing: paid directly by you to those vendors, no markup.",
    },
    {
      question: "What if my project is very large in scope?",
      answer:
        "We scope these in phases, with each phase delivering working software. No large black-box builds with no deliverables until the end.",
    },
    {
      question: "Do you do small diagnostic engagements?",
      answer:
        "Yes, a Business Systems Audit is a good starting point for a Kansas business owner who wants clarity on where the opportunities are before committing to a build. Contact tyler@preissersolutions.com to discuss.",
    },
    {
      question: "How do I get a scope estimate on my specific project?",
      answer:
        "Email tyler@preissersolutions.com. Free 30-minute call. We'll map your situation against these tiers and give a fixed-price proposal in writing.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Cassidy HVAC",
    "HG Oil Holdings",
    "Hays, Kansas",
    "Twilio",
    "OpenAI",
  ],
  relatedLinks: [
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "AI automation in Hays, KS", href: "/services/ai-automation-hays-ks" },
    { label: "Engagement scope & process", href: "/pricing" },
    { label: "Missed-call ROI calculator", href: "/roi-calculator" },
    { label: "Cassidy HVAC case study", href: "/case-studies/cassidy-hvac-reactivation" },
    { label: "HG Oil Holdings case study", href: "/case-studies/hg-oil-inventory-system" },
    { label: "AI vs traditional workflow automation", href: "/blog/ai-vs-traditional-workflow-automation" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Want a scoped estimate on your project?",
  ctaSubcopy:
    "Free 30-minute scoping call. We'll map your situation and send a fixed-price proposal.",
};
