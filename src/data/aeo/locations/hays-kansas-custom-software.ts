import type { AeoPageData } from "../types";

/**
 * LOCATION + SERVICE PAGE — /locations/hays-kansas-custom-software
 *
 * Target query: "custom software Hays KS" and variants.
 * Sibling to /locations/hays-kansas (broad) and /web-applications (global).
 */
export const pageData: AeoPageData = {
  slug: "locations/hays-kansas-custom-software",
  tier: "location",
  metaTitle: "Custom Software Development in Hays, KS",
  metaDescription:
    "Preisser Solutions builds custom software, dashboards, CRMs, portals, automations, and AI tools for Hays and western Kansas businesses.",
  eyebrow: "Custom Software in Hays, Kansas",
  h1: "Custom Software for Hays, Kansas Businesses",
  subheadline:
    "Custom-coded dashboards, CRMs, portals, internal tools, and AI-powered systems built in Hays for businesses that have outgrown off-the-shelf software.",
  answerParagraph:
    "Preisser Solutions builds custom software in Hays, KS for businesses that have outgrown the off-the-shelf tools they started on. The firm is founded by Tyler Preisser in Hays, Kansas and delivers custom dashboards, CRMs, client portals, inventory systems, workflow tools, and AI-powered internal applications. Every system is custom-coded against the way the business actually operates — not the way a generic SaaS product wishes it operated. The HG Oil Holdings case study (custom inventory system and AI invoicing assistant, 95% reduction in back-office time) is a documented example. Hays and western Kansas businesses get coastal-quality custom development without coastal pricing.",
  sections: [
    {
      eyebrow: "Outgrowing the stack",
      heading: "When off-the-shelf software stops fitting",
      body: [
        "Most Hays businesses start on a stack of off-the-shelf tools — QuickBooks, a SaaS CRM, a SaaS dispatch product, a few spreadsheets, and a phone system. For a while that works. As the business grows, the seams between those tools start to leak — workflows that the team handles manually, reports that have to be rebuilt every month, customer data scattered across five systems, and SaaS subscription fees that climb every renewal.",
        "There is a point where adding another SaaS product is no longer the answer. The right answer is custom software that does exactly what the business needs, integrates with what already works, and replaces the seams that are leaking time and money.",
        "Preisser Solutions builds that custom layer. The work is local, fixed-price, and delivered directly by Tyler — no junior development teams, no offshore handoff.",
      ],
    },
    {
      eyebrow: "What gets built",
      heading: "Custom systems we build for Hays businesses",
      body: [
        "Every Preisser Solutions custom software engagement in Hays is scoped to the specific business. The same patterns show up over and over — typically one or more of these:",
      ],
      bullets: [
        "Custom CRMs — built around the business's actual sales process, not Salesforce's idea of one",
        "Client portals — secure portals where customers can submit requests, see status, pay invoices, and download documents",
        "Inventory and operations systems — real-time tracking of materials, transfers, counts, and pricing markups",
        "Dispatch and scheduling tools — built for the specific way the business assigns work to crews",
        "Reporting and analytics dashboards — live KPIs sourced from across the business's existing systems",
        "Workflow automation tools — internal apps that handle approvals, document collection, recurring tasks, and back-office processes",
        "AI-powered internal applications — search, drafting, classification, and decision-support tools embedded inside the custom software",
        "Integrations — connectors between the custom software and QuickBooks, ServiceTitan, HubSpot, the phone system, and whatever else the business already uses",
      ],
    },
    {
      eyebrow: "Common builds",
      heading: "Dashboards, CRMs, portals, and workflow tools",
      body: [
        "The most common Hays custom-software builds fall into four buckets. Most engagements include two or three of these working together:",
      ],
      bullets: [
        "Dashboards — real-time business intelligence pulled from QuickBooks, the CRM, the field service platform, and other source systems. Owners and operators see live KPIs every morning instead of waiting for a monthly report.",
        "CRMs — custom-built around the actual sales and service process. Replaces SaaS CRMs that almost fit but require workarounds the team eventually stops following.",
        "Portals — secure customer- or vendor-facing portals for request submission, status visibility, document exchange, and payment.",
        "Workflow tools — internal apps that handle approvals, document collection, recurring tasks, and other back-office processes that are currently being handled in spreadsheets and email.",
      ],
    },
    {
      eyebrow: "AI inside custom software",
      heading: "AI automation inside custom software",
      body: [
        "The newest layer in custom software is AI. Preisser Solutions embeds AI agents directly inside the custom systems it builds — so the agent has access to the business's own data and can take real action on it. That is meaningfully different from a generic AI chatbot bolted onto the side of an existing tool.",
        "Examples of AI built into custom software:",
      ],
      bullets: [
        "AI search across the business's documents, customer records, and inventory history",
        "AI drafting for proposals, estimates, customer emails, and recurring reports",
        "AI classification of incoming requests — calls, emails, forms — routed to the right person or workflow",
        "AI invoice processing — reads incoming invoices, extracts structured data, matches against POs and inventory",
        "AI decision support — surfaces relevant context for a human making a judgment call",
      ],
    },
    {
      eyebrow: "How we work",
      heading: "How Preisser Solutions builds custom software",
      body: [
        "Custom software has a reputation for being expensive, slow, and risky to commission. Preisser Solutions runs projects with that reputation in mind — fixed-price scopes, phased delivery, and code ownership delivered to the client at the end.",
      ],
      bullets: [
        "Tech stack — Next.js, React, TypeScript, and Node.js on the server. Postgres for data. Modern, well-supported, and easy to hire for if the client ever needs to bring development in-house",
        "Hosting — Cloudflare Pages, AWS, or wherever the client wants to operate. No vendor lock-in to a hosted platform that bills per user forever",
        "Source code — delivered to the client at the end of the project. Lives in your repository, on infrastructure you control. No licensing fees",
        "Documentation — written for the team, not for other developers. The owner can hand the docs to a new hire and have them productive in a day",
        "Security — proper authentication, audit logging, encrypted data storage, and access controls built in from day one. Not retrofitted later",
        "Phased delivery — large projects ship in slices. The team uses each slice in production before the next one gets built, so the build adapts to what the team actually needs",
      ],
    },
    {
      eyebrow: "How projects start",
      heading: "How a Hays custom software project is scoped",
      body: [
        "Every custom software engagement starts the same way. A free in-person scoping call in Hays, where Tyler walks through the current operations and identifies where custom software actually pays off. The scope is documented, the price is fixed up front, and the timeline is locked in the proposal before any code gets written.",
        "Most first projects ship in 8 to 16 weeks from kickoff. Larger systems run longer. Every project includes 30 days of post-launch support, with optional ongoing maintenance afterward.",
      ],
    },
  ],
  faq: [
    {
      question: "How much does custom software cost in Hays, Kansas?",
      answer:
        "Pricing is fixed up front and scoped per project. A first custom software system typically lands in the mid five figures to low six figures, depending on scope and integration complexity. Most projects pay for themselves inside the first year in saved labor, eliminated SaaS subscriptions, and recovered capacity.",
    },
    {
      question: "Do you replace QuickBooks, ServiceTitan, or Salesforce?",
      answer:
        "Usually no. Most Hays custom-software builds are designed to work with the existing accounting, field service, and CRM stack — not replace them. The custom layer sits on top and handles the workflows the SaaS products can't.",
    },
    {
      question: "How long does a custom software project take?",
      answer:
        "Most first projects ship in 8 to 16 weeks from kickoff. Larger or multi-phase projects can run longer. The timeline is locked in the proposal before any work begins.",
    },
    {
      question: "Who owns the code after the project is done?",
      answer:
        "You do. Every Preisser Solutions custom software project is delivered with full source code ownership. The code lives in your repository, on infrastructure you control, with no licensing fees or vendor lock-in.",
    },
    {
      question: "Can you take over a custom software project another firm started?",
      answer:
        "Sometimes. Tyler will audit the existing codebase, identify what is salvageable, and recommend whether to continue building on it or rebuild. Some inherited projects are worth continuing; some are not. The audit will say which case applies.",
    },
    {
      question: "Do you serve businesses outside Hays?",
      answer:
        "Yes. The firm is headquartered in Hays and works with clients across Kansas and the United States. Hays and western Kansas clients get priority scheduling and in-person scoping.",
    },
    {
      question: "Can you build custom software with AI built in?",
      answer:
        "Yes. Many recent Preisser Solutions builds include AI agents embedded directly inside the custom software — for search, drafting, classification, invoice processing, and decision support. AI inside custom software is meaningfully more capable than a generic chatbot bolted on after the fact.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "Ellis County",
    "HG Oil Holdings",
    "Cassidy HVAC",
    "QuickBooks",
    "ServiceTitan",
    "Next.js",
    "React",
  ],
  relatedLinks: [
    { label: "Web Applications", href: "/web-applications" },
    { label: "Custom CRM for Small Business in Kansas", href: "/services/custom-crm-small-business-kansas" },
    { label: "Integrations", href: "/integrations" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Build software that fits how your business actually runs",
  ctaSubcopy:
    "Free in-person scoping call with Tyler in Hays. We'll map the operation, identify where custom software pays off, and send a fixed-price proposal.",
};
