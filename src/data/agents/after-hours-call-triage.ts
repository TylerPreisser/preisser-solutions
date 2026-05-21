import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "after-hours-call-triage",
  metaTitle: "After-Hours Call Triage Agent | Preisser Solutions",
  metaDescription:
    "Catches off-hours calls, texts, and form submits; classifies urgency; auto-responds via SMS; routes urgent items to on-call staff. Zero leads lost overnight.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "After-Hours Call Triage Agent",
  tagline:
    "Catches off-hours calls, texts, and form submits; classifies urgency; auto-responds; routes urgent items to on-call staff.",
  category: "Sales & Lead Capture",
  status: "deployable",
  industries: ["HVAC services", "Field services", "Home services", "B2B services"],

  h1: "Every after-hours lead caught, classified, and responded to — automatically.",
  subheadline:
    "An AI triage system that receives every off-hours call, text, and contact form submission, assesses urgency, auto-responds to the customer via SMS, logs the interaction, and routes urgent items directly to on-call staff.",
  oneLine:
    "Ensures zero leads or urgent requests fall through overnight with AI urgency classification and automatic routing.",

  whatItDoes: [
    "Service businesses lose leads every day to after-hours gaps. A customer calls at 7pm with a broken HVAC system and gets a voicemail — so they call the next name on Google. A form submission comes in at midnight and sits unanswered until morning — by which time the prospect has moved on. The problem isn't the hours; it's the absence of any response at all.",
    "The After-Hours Call Triage Agent fills that gap. Every call, text, and form submission that arrives outside business hours is immediately received and processed. The AI assesses urgency based on the content: a broken furnace in January is different from a quote request for next spring. High-urgency items go directly to the on-call line. The customer receives an automated SMS response immediately, regardless of how the inquiry arrived — confirming receipt and setting expectations.",
    "Non-urgent inquiries queue for the next business day along with a morning digest for staff. Every interaction is logged to the CRM with the urgency classification, contact information, and the nature of the inquiry. Nothing falls through. Nothing waits unacknowledged.",
  ],
  capabilities: [
    {
      title: "Multi-channel inquiry capture",
      description:
        "Receives after-hours inquiries from voice calls, SMS messages, and web contact form submissions through a single intake layer.",
    },
    {
      title: "AI urgency classification",
      description:
        "Evaluates each inquiry for urgency based on content signals — service type, language, and context — and assigns a priority tier that drives routing.",
    },
    {
      title: "Immediate SMS auto-response",
      description:
        "Sends an immediate SMS response to every customer, regardless of how they reached out, confirming receipt and setting expectations on response timing.",
    },
    {
      title: "On-call routing for urgent items",
      description:
        "Routes urgent inquiries immediately to on-call staff via SMS, phone escalation, or Slack — with full context from the original inquiry.",
    },
    {
      title: "CRM logging and documentation",
      description:
        "Logs every interaction to the CRM with urgency classification, contact data, inquiry summary, and timestamp — nothing exits the system without a record.",
    },
    {
      title: "Morning digest for non-urgent queue",
      description:
        "Compiles all non-urgent after-hours inquiries into a morning digest delivered to staff at the start of business, ready for follow-up.",
    },
  ],
  inputs: [
    { label: "Business phone number (VoIP or Twilio integration)", format: "Phone / API" },
    { label: "SMS inbox connection", format: "Twilio / VoIP API" },
    { label: "Web contact form webhook", format: "Webhook / form API" },
    { label: "Urgency classification criteria for the business type", format: "Configuration" },
    { label: "On-call contact roster and escalation rules", format: "Configuration" },
    { label: "CRM connection for logging", format: "API / webhook" },
  ],
  outputs: [
    { label: "Automated SMS response to customer", format: "SMS (Twilio)" },
    { label: "Urgent routing notification to on-call staff", format: "SMS / Slack / phone escalation" },
    { label: "CRM record with inquiry classification and contact data", format: "CRM write-back" },
    { label: "Morning digest of non-urgent inquiries", format: "Email / Slack" },
    { label: "Interaction log with urgency tiers and timestamps", format: "Dashboard / CSV" },
  ],
  howItWorks: [
    {
      step: "Inquiry intake",
      description:
        "The agent receives every after-hours contact — inbound call, SMS message, or form submission — through configured intake channels.",
    },
    {
      step: "Urgency classification",
      description:
        "AI evaluates the inquiry content against configured urgency criteria for the business type, assigning a priority tier: urgent, standard, or informational.",
    },
    {
      step: "Customer acknowledgment",
      description:
        "An immediate SMS response goes to the customer confirming their inquiry was received and indicating when they can expect a response.",
    },
    {
      step: "Urgent routing",
      description:
        "If the inquiry meets the urgent threshold, it routes immediately to on-call staff with full context — who called, what they said, when.",
    },
    {
      step: "Logging and digest",
      description:
        "Every interaction is logged to the CRM. Non-urgent items queue in the morning digest. Staff arrive to a complete record of every overnight inquiry.",
    },
  ],
  useCases: [
    "Use this when customers are calling after hours, getting voicemail, and calling a competitor instead of waiting for a callback.",
    "Use this when you have a true 24/7 urgency profile — HVAC failures, plumbing emergencies, security issues — where after-hours response determines whether you keep the customer.",
    "Use this when contact form submissions are sitting in an inbox overnight and prospects have already moved on by the time staff respond in the morning.",
    "Use this when your on-call staff are being paged for everything — including non-urgent items — because there's no classification layer in front of the escalation.",
    "Use this when you want a logged, CRM-tracked record of every after-hours inquiry to understand your overnight lead volume and response performance.",
  ],
  techStack: [
    "Twilio (voice and SMS)",
    "AI urgency classification engine",
    "CRM integration (API)",
    "Web form webhook integration",
    "Slack / SMS escalation routing",
  ],
  relatedSlugs: [
    "lead-pipeline-agent",
    "customer-reactivation-agent",
    "submission-processing-agent",
  ],
  cta: {
    heading: "Want every after-hours inquiry caught and responded to automatically?",
    subcopy:
      "Preisser Solutions configures the triage agent against your phone system, form stack, and CRM. The first conversation covers your current after-hours gap and your on-call structure.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?agent=after-hours-call-triage",
  },
};
