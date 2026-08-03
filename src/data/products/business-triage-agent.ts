import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "business-triage-agent",
  metaTitle: "Business Triage Agent",
  metaDescription:
    "Ingests website forms, Google reviews, SMS, phone calls, and email — classifies each by urgency, routes urgent items to on-call staff in real time, queues the rest.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Business Triage Agent",
  tagline:
    "All customer touchpoints, classified by urgency and routed to the right person in real time.",
  category: "Sales & Customer Service",
  status: "deployable",
  industries: ["HVAC services", "Field services", "Home services", "B2B services", "Local retail"],

  h1: "Every inbound touchpoint caught, classified, and routed — automatically.",
  subheadline:
    "An AI triage system that ingests across all channels — website forms, Google reviews, text messages, phone calls, emails — classifies each by urgency, and routes to the right person or queue in real time.",
  oneLine:
    "Ingests every inbound touchpoint across all channels, classifies urgency, and routes to on-call staff or a managed queue.",

  whatItDoes: [
    "Most businesses are losing inbound from too many directions at once. A Google review goes unresponded to for days. An after-hours SMS sits in an inbox. A contact form submission reaches a generic email nobody checks. A phone call after hours goes to voicemail. Each channel has its own missed-response problem, and no single person or process is watching all of them.",
    "The Business Triage Agent ingests across ALL channels — website form submissions, Google review posts, inbound SMS, inbound phone calls (transcribed), inbound emails. Each item is classified by urgency using AI: a broken furnace call is not the same as a quote request, and a one-star Google review is not the same as a product question. Urgent items route to on-call staff immediately via SMS or Slack with full context from the original touchpoint. Non-urgent items queue in a dashboard for next-business-day follow-up.",
    "An optional app or web UI surfaces the full triage queue with status, channel, urgency tier, and response history. Auto-response templates can acknowledge the customer immediately regardless of channel. Daily digest summarizes overnight volume for staff arriving in the morning. Supports multi-business configurations for operators managing more than one location.",
  ],
  capabilities: [
    {
      title: "Cross-channel ingest",
      description:
        "Receives touchpoints from website forms, Google reviews, inbound SMS, transcribed phone calls, and email through a single intake layer.",
    },
    {
      title: "AI urgency classification",
      description:
        "Evaluates each item for urgency based on content signals — service type, sentiment, channel, and language — and assigns a priority tier that drives routing.",
    },
    {
      title: "Intelligent routing rules per channel",
      description:
        "Applies different routing logic per channel — a Google review may trigger a response workflow while an urgent SMS triggers an on-call page.",
    },
    {
      title: "On-call staff escalation",
      description:
        "Routes urgent items immediately to designated on-call staff via SMS, Slack, or phone escalation with full context from the original touchpoint.",
    },
    {
      title: "Dashboard UI for triage queue",
      description:
        "Optional web interface surfaces the full queue with urgency tier, channel, contact data, and response status — replacing inbox-hunting across multiple platforms.",
    },
    {
      title: "Auto-response templates",
      description:
        "Sends immediate acknowledgment responses to customers by channel, confirming receipt and setting expectations — reducing the silence that drives customers to competitors.",
    },
    {
      title: "Multi-business support",
      description:
        "Supports operators managing multiple locations or business units with per-business routing rules and separate queues.",
    },
  ],
  inputs: [
    { label: "Website form webhook", format: "Webhook / form API" },
    { label: "Google Business Profile review notifications", format: "Google API" },
    { label: "Inbound SMS inbox connection", format: "Twilio / VoIP API" },
    { label: "Inbound phone calls (for transcription)", format: "Twilio / VoIP integration" },
    { label: "Inbound email connection", format: "IMAP / API" },
    { label: "Urgency classification criteria", format: "Configuration" },
    { label: "On-call contact roster and escalation rules", format: "Configuration" },
  ],
  outputs: [
    { label: "Urgent routing notification to on-call staff", format: "SMS / Slack / phone escalation" },
    { label: "Priority-tagged dashboard queue items", format: "Web UI / API" },
    { label: "Auto-response acknowledgment to customer", format: "SMS / email / review reply" },
    { label: "Daily digest of overnight volume", format: "Email / Slack" },
    { label: "Interaction log with urgency tiers and timestamps", format: "Dashboard / CSV" },
  ],
  howItWorks: [
    {
      step: "Multi-channel intake",
      description:
        "The agent monitors all configured channels — forms, reviews, SMS, calls, email — and routes every inbound item through a single classification layer.",
    },
    {
      step: "Urgency classification",
      description:
        "AI evaluates each item against configured urgency criteria, assigning a priority tier: urgent, standard, or informational.",
    },
    {
      step: "Immediate customer acknowledgment",
      description:
        "An auto-response goes to the customer by channel confirming receipt and setting response timing expectations.",
    },
    {
      step: "Routing and escalation",
      description:
        "Urgent items route immediately to on-call staff with full context. Non-urgent items enter the dashboard queue for next-business-day handling.",
    },
    {
      step: "Digest and reporting",
      description:
        "All interactions are logged. A morning digest compiles overnight volume with status and priority summary for staff arriving at the start of the day.",
    },
  ],
  useCases: [
    "Use this when your team is missing inbound from too many channels — forms, reviews, texts, calls, and email all creating separate blind spots.",
    "Use this when after-hours coverage is inconsistent — some nights urgent items get caught, some nights they don't.",
    "Use this when urgent leads sit in inboxes for hours before anyone responds and you know competitors are calling them back first.",
    "Use this when on-call staff are being paged for everything because there's no classification layer in front of the escalation.",
    "Use this when you want a logged, centralized record of every inbound touchpoint across all channels.",
  ],
  techStack: [
    "Twilio (voice and SMS)",
    "AI urgency classification engine",
    "Google Business Profile API",
    "Email integration (IMAP / API)",
    "Web form webhook integration",
    "Slack / SMS escalation routing",
    "Dashboard UI",
  ],
  relatedSlugs: [
    "ai-digital-receptionist",
    "customer-reactivation-agent",
    "outbound-sales-agent",
  ],
  cta: {
    heading: "Want every inbound touchpoint caught and classified automatically?",
    subcopy:
      "Preisser Solutions configures the triage agent across your channel stack and on-call structure. The first conversation covers where inbound is currently slipping through.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?product=business-triage-agent",
  },
};
