import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "outbound-sales-agent",
  metaTitle: "Intelligent Outbound Sales | Preisser Solutions",
  metaDescription:
    "Researches prospects, drafts personalized cold outreach via email and SMS, and sequences follow-up automatically — tuned to one business's offer and voice.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Intelligent Outbound Sales",
  tagline:
    "Researches prospects, drafts personalized cold outreach, and sequences across email and SMS — tuned to one business's offer and voice.",
  category: "Revenue & Marketing",
  status: "deployable",
  industries: ["B2B services", "Professional services", "Sales organizations", "Field services"],

  h1: "Personalized cold outreach at scale — email and SMS, no phone calls.",
  subheadline:
    "An outbound sales agent that researches each prospect, drafts individualized cold outreach based on real signals, and sequences follow-up across email and SMS — all tuned to your specific offer and brand voice.",
  oneLine:
    "Researches prospects, drafts individualized outreach, and sequences email and SMS follow-up — not generic blasts, not phone calls.",

  whatItDoes: [
    "Most outbound sales fails because it's generic. A message that could be sent to anyone reads like it was sent to no one. The Intelligent Outbound Sales agent makes personalization at scale practical by using the Customer Research Agent as its upstream input — every outreach message is informed by real prospect research before a word is written.",
    "The agent sequences across email and SMS only — no phone calls, no cold calling, no voice dialing. This is an explicit design decision. Email and text are the channels where personalized, timing-aware outreach performs best without requiring live staff availability. The sequence is tuned to the business's specific offer and voice: what the business does, what problem it solves for the prospect's profile, and the language and tone of the brand. Reply classification detects positive responses, unsubscribes, and objections and routes each appropriately.",
    "The system connects upstream to the Customer Research Agent for prospect enrichment and downstream to email and Twilio SMS for delivery. Sequence logic, cadence, and message variants are all configurable. The agent learns from reply patterns and updates sequence performance data over time.",
  ],
  capabilities: [
    {
      title: "Prospect research integration",
      description:
        "Connects upstream to the Customer Research Agent to enrich each prospect with real signals before drafting — no outreach sends without researched context.",
    },
    {
      title: "Personalized cold outreach drafting",
      description:
        "Drafts individualized first-touch messages for each prospect based on their enriched profile — referencing something real rather than sending a mail-merged template.",
    },
    {
      title: "Email and SMS sequencing",
      description:
        "Sequences follow-up across email and SMS on configured cadences — no phone calls, no cold calling, no channels that require live staff availability.",
    },
    {
      title: "Reply classification",
      description:
        "Detects positive responses, objections, and unsubscribe signals in replies, routing each appropriately — positive replies to the sales team, unsubscribes to the suppression list.",
    },
    {
      title: "Offer and voice tuning",
      description:
        "Sequence and message copy are tuned to the business's specific offer, value proposition, and brand voice — not a generic outbound template applied to any business.",
    },
    {
      title: "Sequence performance tracking",
      description:
        "Tracks opens, clicks, replies, and conversion per sequence variant, surfacing what's working and informing copy and cadence improvements.",
    },
  ],
  inputs: [
    { label: "Prospect list with names and companies", format: "CRM / CSV / API" },
    { label: "Enriched prospect profiles (from Customer Research Agent)", format: "JSON / API" },
    { label: "Business offer, value proposition, and brand voice guidelines", format: "Document / configuration" },
    { label: "Email platform connection", format: "API credentials" },
    { label: "Twilio SMS connection", format: "API credentials" },
    { label: "Sequence cadence and variant configuration", format: "Configuration" },
  ],
  outputs: [
    { label: "Personalized first-touch outreach messages sent", format: "Email / SMS" },
    { label: "Sequence follow-up messages on configured cadence", format: "Email / SMS" },
    { label: "Reply classification and routing", format: "CRM update / team notification" },
    { label: "Suppression list updates for unsubscribes", format: "CRM / email platform" },
    { label: "Sequence performance report", format: "Dashboard / email report" },
  ],
  howItWorks: [
    {
      step: "Prospect enrichment",
      description:
        "Each prospect runs through the Customer Research Agent before the sequence begins — enriched profiles ensure every message is informed by real signals.",
    },
    {
      step: "First-touch message drafting",
      description:
        "The agent drafts a personalized first-touch message for each prospect based on their enriched profile and the configured offer and voice guidelines.",
    },
    {
      step: "First-touch send",
      description:
        "Messages deploy via the configured email or SMS channel on the configured schedule.",
    },
    {
      step: "Reply monitoring and classification",
      description:
        "Replies are monitored and classified — positive responses route to the sales team, unsubscribes update the suppression list, objections may trigger a configured objection-handling sequence.",
    },
    {
      step: "Sequence follow-up",
      description:
        "Non-responding prospects enter the follow-up sequence on the configured cadence, with each subsequent message adjusted based on prior engagement signals.",
    },
  ],
  useCases: [
    "Use this when outbound sales volume is limited by the time it takes to research prospects and write individualized messages manually.",
    "Use this when you want personalized outreach at a scale that would require a full SDR team to execute manually.",
    "Use this when email and SMS are the right outbound channels for your buyer profile and you want them sequenced and automated.",
    "Use this when reply classification and routing are currently manual — someone reading every reply and deciding what to do with it.",
    "Use this as the outreach execution layer downstream from the Customer Research Agent's enrichment output.",
  ],
  techStack: [
    "Customer Research Agent (upstream enrichment)",
    "Email platform API",
    "Twilio SMS",
    "Sequence orchestrator",
    "Reply classification engine",
    "CRM integration",
  ],
  relatedSlugs: [
    "customer-research-agent",
    "customer-reactivation-agent",
    "business-triage-agent",
  ],
  cta: {
    heading: "Want personalized outbound running without a full SDR team?",
    subcopy:
      "Preisser Solutions builds outbound sequences tuned to your offer, your buyer profile, and your voice. The first conversation covers your target prospect profile and your current outbound capacity.",
    buttonLabel: "Scope this for my team",
    buttonHref: "/contact?product=outbound-sales-agent",
  },
};
