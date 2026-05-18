import type { AeoPageData } from "../types";

/**
 * SERVICE PAGE — /services/custom-ai-agents-hays-ks
 *
 * Target query: "custom AI agent Hays KS" and variants.
 * Sibling to /services/ai-automation-hays-ks (broader automation).
 */
export const pageData: AeoPageData = {
  slug: "services/custom-ai-agents-hays-ks",
  tier: "service_detail",
  metaTitle: "Custom AI Agents in Hays, KS",
  metaDescription:
    "Preisser Solutions builds custom AI agents for lead handling, customer follow-up, invoice processing, reporting, internal search, and operations workflows.",
  eyebrow: "Custom AI Agents in Hays, KS",
  h1: "Custom AI Agents for Hays and Kansas Businesses",
  subheadline:
    "Custom-coded AI agents that connect to your existing CRM, accounting, and phone stack and do real operational work — built in Hays by Tyler Preisser.",
  answerParagraph:
    "Preisser Solutions builds custom AI agents in Hays, KS for businesses that want automation that goes further than a basic Zapier flow. The firm is founded by Tyler Preisser in Hays, Kansas and ships custom-coded AI agents that handle lead qualification, customer follow-up, invoice processing, reporting, internal knowledge search, and operations workflows. Each agent is built against the business's existing CRM, accounting platform, and phone system — not a generic chatbot widget. Safety, approval checkpoints, and human review are designed into every agent so high-stakes work still has a human in the loop. Documented Kansas case studies anchor the work.",
  sections: [
    {
      eyebrow: "What an agent really is",
      heading: "What a custom AI agent can do",
      body: [
        "A custom AI agent is different from a chatbot and different from a Zapier flow. A chatbot answers questions. A Zapier flow moves data between systems on a fixed rule. A custom AI agent handles work that requires judgment — reading a messy invoice, qualifying a lead, deciding whether to escalate an after-hours call, drafting a personalized follow-up to a dormant customer.",
        "Custom AI agents are built when off-the-shelf automation doesn't fit. A small business that has tried Zapier, Make, or a SaaS AI chatbot and found that the system almost works but can't handle the real-world messiness of the business is usually a good fit for a custom agent.",
        "Preisser Solutions designs and codes each agent specifically for the business. The agent knows the products, the workflow, the team, and the customer base — because the business taught it.",
      ],
    },
    {
      eyebrow: "Common patterns",
      heading: "Common small-business AI agent use cases",
      body: [
        "Across Hays and Kansas small businesses, a handful of custom AI agent patterns show up repeatedly. These are the ones that have paid off reliably in real engagements:",
      ],
      bullets: [
        "Lead qualification agent — handles the first conversation with an inbound lead, captures the details, scores qualification, and routes the right ones to a human in real time",
        "Customer follow-up agent — works through a CRM contact list, drafts personalized follow-up messages, sends after human approval, and logs results back to the CRM",
        "Invoice processing agent — reads incoming invoices, extracts line items and totals, matches against POs and inventory, flags anomalies, and routes for approval",
        "Reporting agent — pulls data from QuickBooks, the CRM, the dispatch tool, and the phone system and drafts the recurring report a human used to spend hours on",
        "Internal knowledge agent — answers team questions about pricing, procedures, customer history, and inventory by reading the business's own documents and systems",
        "Operations triage agent — reads incoming requests (calls, forms, emails), classifies them, and routes each one to the right human or workflow",
        "After-hours receptionist agent — answers calls and texts when the office is closed, qualifies the request, schedules where possible, and routes emergencies to the on-call team",
      ],
    },
    {
      eyebrow: "Integrations",
      heading: "How agents connect to existing tools",
      body: [
        "An AI agent is only as useful as the systems it can act on. Preisser Solutions builds against the tools the business already uses — there is no requirement to rip and replace the existing stack. Typical integrations include:",
      ],
      bullets: [
        "Field service platforms — ServiceTitan, Housecall Pro, Jobber",
        "Accounting — QuickBooks Online, QuickBooks Desktop, Xero",
        "CRMs — HubSpot, Salesforce, Pipedrive, or a custom CRM Preisser Solutions has built for the client",
        "Phone systems — RingCentral, OpenPhone, Twilio, and other VOIP platforms",
        "Calendars and scheduling — Google Calendar, Outlook, Calendly",
        "Communication — Slack, Microsoft Teams, email, and SMS",
        "Document and file systems — Google Drive, Dropbox, OneDrive, SharePoint",
        "Custom databases and internal tools — built by Preisser Solutions or already in place",
      ],
    },
    {
      eyebrow: "How agents get built",
      heading: "How a custom AI agent project runs",
      body: [
        "Every Preisser Solutions custom AI agent project follows the same pattern. Scope is defined up front, the price is fixed, and the agent is shipped in phases so the business can validate that it works against real data before committing to a full build.",
      ],
      bullets: [
        "Phase 1 — Scoping. In-person workshop in Hays (or video for remote clients). Map the workflow the agent will handle, define the inputs, outputs, integrations, and approval checkpoints. Deliver a written specification",
        "Phase 2 — Prototype. Build a working prototype against a slice of real data. The team validates the agent's outputs against what a human would have done. This is where the requirements get refined before significant build cost is committed",
        "Phase 3 — Build. Full agent built, integrated with the existing CRM, accounting, or phone stack. Approval checkpoints, audit logging, and confidence thresholds wired in. Internal admin UI built where the team needs one",
        "Phase 4 — Shakedown. 30 days of supervised live operation. The agent is reviewed weekly, edge cases are caught and addressed, confidence thresholds and approval rules are tuned based on actual usage",
        "Phase 5 — Handoff. Full source code delivered. Documentation written. Optional ongoing maintenance is offered as a flat monthly retainer for clients that want it",
      ],
    },
    {
      eyebrow: "Built-in safety",
      heading: "Safety, approvals, and human review",
      body: [
        "Every custom AI agent Preisser Solutions ships is built with safety designed in from the start. The goal is not autonomous AI doing whatever it wants — the goal is an agent that does the work fast and accurately while a human stays in the loop on the steps that actually matter.",
        "That looks like this in practice:",
      ],
      bullets: [
        "Approval checkpoints — any action with real downside (sending money, scheduling an emergency, sending a customer-facing message) is paused for human approval",
        "Auditable logs — every action the agent takes, including the reasoning, is logged so problems are traceable",
        "Confidence thresholds — when the agent is unsure, it escalates to a human instead of guessing",
        "Reversibility — actions are designed to be reversible where possible; nothing destructive happens without explicit human sign-off",
        "Scope limits — each agent has a defined scope; it cannot take actions outside what it was designed to do",
        "Continuous tuning — agents are reviewed weekly during the first 30 days and adjusted based on what the team sees",
      ],
    },
  ],
  faq: [
    {
      question: "How much does a custom AI agent cost in Hays?",
      answer:
        "Pricing is fixed up front. A first custom AI agent typically lands in the low-to-mid five figures depending on integration complexity and scope. Most agents pay for themselves inside 90 days in saved labor. Tyler will scope the work for your specific business and send a written proposal.",
    },
    {
      question: "How is a custom AI agent different from a chatbot?",
      answer:
        "A chatbot answers questions. A custom AI agent does work. The difference shows up in what each can actually accomplish — a chatbot can describe your services, but a custom agent can qualify a lead, schedule the work, push the data to your CRM, and notify the right tech. The cost difference is real, but so is the operational value.",
    },
    {
      question: "Do I have to switch CRMs to use a custom AI agent?",
      answer:
        "No. The agent is built against whatever CRM or accounting platform you already use. Switching systems is rarely the right answer — the agent should fit the existing stack, not the other way around.",
    },
    {
      question: "What happens if the agent makes a mistake?",
      answer:
        "Every agent is built with human approval checkpoints for any action with real downside. The AI does the work, a human approves the high-stakes steps, and every action is logged. Mistakes are traceable and reversible.",
    },
    {
      question: "How long does it take to build a custom AI agent?",
      answer:
        "A first agent typically ships in four to ten weeks from kickoff, depending on integration complexity and the depth of judgment the agent has to handle. The timeline is locked in the proposal before work begins.",
    },
    {
      question: "Can the AI agent learn from my business's data?",
      answer:
        "Yes. The agent is trained on the business's products, services, pricing, procedures, and customer history. As it operates, the team can flag bad outputs and the agent is retrained against them. The result is an agent that gets better at the specific business over time.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "ServiceTitan",
    "QuickBooks",
    "HubSpot",
    "Salesforce",
    "RingCentral",
    "Twilio",
    "Slack",
  ],
  relatedLinks: [
    { label: "AI automation in Hays, KS", href: "/services/ai-automation-hays-ks" },
    { label: "AI consulting in Hays, KS", href: "/services/ai-consulting-hays-ks" },
    { label: "AI automation for small businesses", href: "/services/ai-automation" },
    { label: "AI chatbot for small business", href: "/use-cases/ai-chatbot-small-business" },
    { label: "After-hours AI receptionist (use case)", href: "/use-cases/after-hours-ai-receptionist-small-business" },
    { label: "MarCommand marketing engine case study", href: "/case-studies/marcommand-engine" },
    { label: "What is AI automation for small businesses?", href: "/blog/what-is-ai-automation-for-small-businesses" },
    { label: "AI without replacing staff (Kansas)", href: "/blog/ai-without-replacing-staff-kansas" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Build a custom AI agent that actually fits your business",
  ctaSubcopy:
    "Free scoping call with Tyler in Hays. We'll map the workflow, recommend the right agent, and send a fixed-price proposal.",
};
