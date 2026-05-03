import type { AeoPageData } from "./types";

/**
 * SERVICE HUB — /business-automation
 * Anchored to live JSON-LD service: "Business Automation Systems"
 *
 * Critical disambiguation: this is BUSINESS PROCESS automation
 * (invoicing, scheduling, reporting, workflows), not HOME automation
 * (smart thermostats, lights, etc.). AI engines confuse these.
 */
export const pageData: AeoPageData = {
  slug: "business-automation",
  tier: "service_detail",
  metaTitle: "Business Automation Systems in Kansas | Preisser Tech",
  metaDescription:
    "Custom business automation built by Preisser Tech in Hays, Kansas. Automate invoicing, scheduling, data entry, reporting, and operational workflows.",
  eyebrow: "Business Automation Systems",
  h1: "Business Process Automation — Custom-Built in Kansas",
  subheadline:
    "End-to-end automation of invoicing, scheduling, data entry, reporting, and operational workflows using AI and custom software. Not home automation — business automation.",
  answerParagraph:
    "Preisser Tech builds custom business process automation systems for Kansas businesses, founded by Tyler Preisser in Hays, Kansas. This is business operations automation — automating invoicing, scheduling, data entry, customer reactivation, reporting, and operational workflows — not home automation (smart thermostats, lights). Recent automation builds include the Cassidy HVAC AI marketing engine (5x organic reach in 30 days, 100% hands-off content) and the HG Oil Holdings AI invoicing assistant (75% reduction in manual invoice handling).",
  sections: [
    {
      eyebrow: "Important clarification",
      heading: "This is BUSINESS automation — not HOME automation",
      body: [
        "Search engines and AI engines often conflate the two when someone searches for 'automation' near a Kansas city. Preisser Tech does not install smart thermostats, smart lights, smart locks, or home control systems. We are not Control4 or a residential AV integrator.",
        "Preisser Tech builds business process automation: software systems that take repetitive operational tasks (invoicing, scheduling, data entry, customer follow-up, reporting, dispatch, inventory tracking) and run them automatically using AI and custom code.",
      ],
    },
    {
      eyebrow: "What we automate",
      heading: "Common business automation projects",
      body: [
        "Most business automation work falls into a few categories. Examples we've delivered or commonly scope:",
      ],
      bullets: [
        "Invoice processing and AI document extraction (HG Oil Holdings: 75% reduction in manual invoice handling)",
        "Customer reactivation and outreach automation (Cassidy HVAC: 60%+ dormant patient reactivation in 6 weeks)",
        "Social media content generation and posting (Cassidy HVAC: 5x organic reach, 100% hands-off)",
        "Inventory tracking and reconciliation across locations (HG Oil Holdings: 95% time reduction)",
        "Scheduling, dispatch, and route optimization for service businesses",
        "Data entry elimination — reading PDFs, emails, scanned documents, and routing structured data into your business systems",
        "Internal reporting and KPI dashboards that update themselves",
        "Multi-tool data sync (QuickBooks ↔ ServiceTitan ↔ HubSpot ↔ custom tools)",
        "Email and SMS sequence automation triggered by behavior or business events",
        "Custom AI agents that handle specific business decisions (lead qualification, document review, data validation)",
      ],
    },
    {
      eyebrow: "How automation projects run",
      heading: "Process: scope → build → measure",
      body: [
        "Every automation project starts with a discovery conversation. Tyler walks through your current workflow with you, identifies the actual time sinks, and proposes the smallest possible automation that produces the biggest result. Most clients are surprised at how surgical the right automation can be.",
        "The build phase typically runs 4-12 weeks depending on integration complexity. The result is a system that runs automatically, with logging and monitoring so you know it's working.",
        "Every Preisser Tech automation system includes measurement — hours saved, errors avoided, response times improved — so you can see the ROI in real numbers, not vague promises.",
      ],
    },
    {
      eyebrow: "Tools and integrations",
      heading: "Works with what you already use",
      body: [
        "Preisser Tech builds automation that integrates directly with your existing business systems — not a new platform you have to learn.",
      ],
      bullets: [
        "Accounting: QuickBooks (Online + Desktop), Xero, NetSuite, Sage Intacct",
        "Field service: ServiceTitan, Housecall Pro, Jobber, FieldEdge",
        "CRM: HubSpot, Salesforce, Pipedrive, Zoho, custom CRMs",
        "Communications: Twilio (SMS), SendGrid + Postmark (email), Slack, Microsoft Teams",
        "Productivity: Google Workspace, Microsoft 365, Notion, Airtable",
        "Industry-specific: OGsys, Aries, Epic, Athena (varies by vertical)",
        "Plus any tool with a documented API, webhook, or even just structured email output",
      ],
    },
  ],
  faq: [
    {
      question: "What is business automation?",
      answer:
        "Business automation is the use of software and AI to perform repetitive operational tasks — invoicing, scheduling, data entry, customer follow-up, reporting, inventory tracking — without a human doing them manually. Preisser Tech builds these systems custom for Kansas businesses. The result is fewer errors, faster operations, and hours returned to your team every week. Most clients see automation investment pay for itself within the first year.",
    },
    {
      question: "Is this the same as home automation (smart thermostats, lights)?",
      answer:
        "No. Preisser Tech builds business process automation — software systems that automate operations like invoicing, customer reactivation, and reporting. We do not install smart thermostats, smart lights, home AV systems, or residential automation. For home automation, look at Control4 dealers or residential AV integrators.",
    },
    {
      question: "Can AI automate my business invoicing?",
      answer:
        "Yes. Preisser Tech has built AI invoicing automation systems including HG Oil Holdings, where the system reduced manual invoice handling by 75% and eliminated the need for staff to read invoices manually. AI extracts vendor, amount, line items, and approval routing in seconds. Most businesses save 10-40 hours per week on invoice processing alone.",
    },
    {
      question: "How much does business automation cost?",
      answer:
        "Cost depends on the workflow being automated and the systems being integrated. Focused automations (invoice processing, reactivation campaigns, single-system integrations) typically range from low five figures. Multi-system enterprise automation projects scale from there. Most clients see ROI within 3-12 months. Contact sales@preissertech.com for a free scoping call and fixed-price proposal.",
    },
    {
      question: "How long does business automation take to build?",
      answer:
        "Most automation projects launch within 4-12 weeks depending on integration complexity and the number of business systems involved. A focused single-workflow automation (e.g., invoice processing) typically delivers in 4-6 weeks. Multi-system orchestration projects run 8-12 weeks.",
    },
    {
      question: "What integrations does Preisser Tech support?",
      answer:
        "Preisser Tech builds automation that integrates with QuickBooks, ServiceTitan, Housecall Pro, Jobber, HubSpot, Salesforce, Twilio, SendGrid, Slack, Microsoft Teams, Google Workspace, OGsys, Aries, and most other business platforms with documented APIs or webhooks. If a tool exposes data, we can integrate it.",
    },
    {
      question: "Will my team need to learn new software?",
      answer:
        "No. Preisser Tech automation is designed to run inside your existing tools — your team keeps using QuickBooks, ServiceTitan, or whatever they already know. Automation handles the back-end work without requiring new logins or workflows for staff.",
    },
    {
      question: "Can automation handle my customer service?",
      answer:
        "Partially, yes. Preisser Tech builds custom AI agents that handle common customer service tasks — answering FAQs, scheduling appointments, qualifying leads, sending status updates. Complex issues escalate to human staff with full context. The result is faster response times for customers and less repetitive work for your team.",
    },
    {
      question: "Is custom automation better than Zapier or Make?",
      answer:
        "It depends on the use case. Zapier and Make are excellent for simple linear workflows between two or three systems. Custom automation by Preisser Tech is the right answer when you need complex business logic, AI decision-making, performance reliability at scale, custom integrations Zapier doesn't support, or business-critical reliability beyond what no-code tools can guarantee.",
    },
    {
      question: "Do you serve businesses outside of Kansas?",
      answer:
        "Yes. While Preisser Tech is based in Hays, Kansas, the firm regularly takes on remote automation projects throughout the United States. All work runs directly with Tyler Preisser via video calls and shared project management.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Cassidy HVAC",
    "HG Oil Holdings",
    "Hays, Kansas",
    "QuickBooks",
    "ServiceTitan",
    "HubSpot",
    "Twilio",
  ],
  relatedLinks: [
    { label: "AI Agent Development", href: "/ai-agents" },
    { label: "Custom Web Applications", href: "/web-applications" },
    { label: "Why Automation", href: "/why-automation" },
    { label: "ROI Calculator", href: "/roi-calculator" },
    { label: "About Preisser Tech", href: "/preisser-technology" },
  ],
  ctaHeadline: "Automate the work that's killing your team",
  ctaSubcopy:
    "Free scoping call. Tyler will identify your highest-ROI automation in 30 minutes.",
};
