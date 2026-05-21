import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "ai-digital-receptionist",
  metaTitle: "AI Digital Receptionist | Preisser Solutions",
  metaDescription:
    "Reads every email and transcribed phone call, remembers everything across conversations, auto-responds to common asks, and delivers a morning digest of the last 24 hours.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "AI Digital Receptionist",
  tagline:
    "Reads every email and phone call, remembers everything, answers anything.",
  category: "Sales & Customer Service",
  status: "deployable",
  industries: ["B2B services", "Professional services", "Consulting", "Executive productivity"],

  h1: "Every email and phone call read, remembered, and ready to answer.",
  subheadline:
    "An AI receptionist that ingests email and transcribed phone calls, maintains persistent memory across all conversations, auto-responds to common asks, and delivers a morning digest of the last 24 hours — so you always know what came in and what it means.",
  oneLine:
    "Persistent AI memory across email and phone — every conversation indexed, auto-responses handled, daily digest delivered.",

  whatItDoes: [
    "Email volume and phone call volume at any busy business create the same problem: important threads get buried, commitments get forgotten, and staff arrive each morning without a clear picture of what came in overnight. The AI Digital Receptionist solves this with persistent memory across both channels.",
    "The agent ingests email via Gmail or Outlook API and phone calls via transcription integration. Every conversation is indexed and remembered — not just summarized and discarded, but retained in a searchable memory layer. Auto-response handles the common asks that don't require a human decision: appointment confirmations, standard information requests, operating hours, pricing tiers. Priority routing flags high-urgency items for immediate human attention.",
    "An ask-anything chat interface lets you retrieve any past conversation, commitment, or decision instantly — 'What did the Cassidy client say about invoicing last week?' or 'Has anyone called about the HVAC job in Hays?' get answered from memory without inbox archaeology. Every morning, a digest of the last 24 hours lands — what came in, what was auto-responded to, what's waiting for a human reply.",
  ],
  capabilities: [
    {
      title: "Email and phone-call intake",
      description:
        "Ingests Gmail and Outlook email plus transcribed phone calls through a single intake layer — both channels feed the same memory and response system.",
    },
    {
      title: "Transcription integration",
      description:
        "Phone calls are transcribed in real time or post-call and indexed into the same memory layer as email — voice conversations become searchable records.",
    },
    {
      title: "Persistent conversation memory",
      description:
        "All conversations are retained in a persistent memory layer — not summarized into oblivion, but indexed for retrieval so past threads stay accessible.",
    },
    {
      title: "Auto-respond to common asks",
      description:
        "Handles routine inbound automatically — appointment confirmations, standard information requests, FAQs — without requiring a human response every time.",
    },
    {
      title: "Priority routing",
      description:
        "Identifies high-urgency inbound items and surfaces them immediately rather than letting them wait in a queue alongside low-priority messages.",
    },
    {
      title: "Ask-anything chat interface",
      description:
        "Natural-language chat lets you retrieve any past conversation, decision, or commitment from memory — faster than inbox search, works across both channels.",
    },
    {
      title: "Daily digest of last 24 hours",
      description:
        "A morning brief summarizes what came in over the last 24 hours, what was auto-handled, and what's waiting for a human decision.",
    },
  ],
  inputs: [
    { label: "Gmail or Outlook inbox connection", format: "Gmail API / Microsoft Graph API" },
    { label: "Phone call transcription feed", format: "Twilio / VoIP transcription API" },
    { label: "Auto-response rules and templates", format: "Configuration" },
    { label: "Priority routing rules", format: "Configuration" },
    { label: "Digest delivery preferences", format: "Configuration" },
  ],
  outputs: [
    { label: "Auto-responses sent to routine inbound", format: "Email / SMS" },
    { label: "Priority alerts for high-urgency items", format: "SMS / Slack / email" },
    { label: "Searchable conversation memory index", format: "Internal database" },
    { label: "Ask-anything chat responses from memory", format: "Chat interface" },
    { label: "Morning digest of last 24 hours", format: "HTML email / Slack" },
  ],
  howItWorks: [
    {
      step: "Channel intake",
      description:
        "Email arrives via API connection; phone calls are transcribed and ingested through the voice integration. Both channels feed the same processing pipeline.",
    },
    {
      step: "Memory indexing",
      description:
        "Every inbound item is indexed into persistent memory — participants, topics, commitments, dates, and context all retained for later retrieval.",
    },
    {
      step: "Classification and routing",
      description:
        "Each item is classified: auto-respond candidates are handled immediately; priority items are flagged and surfaced; everything else queues for human review.",
    },
    {
      step: "Auto-response execution",
      description:
        "Auto-respond items receive an immediate reply based on configured templates and response rules — no human touch required for routine asks.",
    },
    {
      step: "Digest assembly and delivery",
      description:
        "Every morning, the agent assembles a digest of the last 24 hours — what came in, what was handled, what needs attention — and delivers it before the workday starts.",
    },
  ],
  useCases: [
    "Use this when inbound email volume has grown to the point where important threads are regularly being missed or responded to late.",
    "Use this when phone call commitments are being forgotten because there's no system capturing what was said and what was promised.",
    "Use this when you want a consistent morning brief that covers all channels without requiring staff to manually compile it.",
    "Use this when routine inbound (appointment confirmations, FAQs, standard information requests) is consuming staff time that should go to higher-value work.",
    "Use this when you need the ability to instantly retrieve any past conversation or commitment without hunting through email archives.",
  ],
  techStack: [
    "Gmail API / Microsoft Graph API",
    "Twilio / VoIP transcription integration",
    "Persistent memory layer",
    "AI classification and routing engine",
    "HTML email generation",
    "Chat interface for memory retrieval",
  ],
  linkedCaseStudySlug: "ai-email-digest",
  relatedSlugs: [
    "business-triage-agent",
    "business-forecast-agent",
    "customer-reactivation-agent",
  ],
  cta: {
    heading: "Want every email and phone call read, remembered, and ready to answer?",
    subcopy:
      "Preisser Solutions configures the AI Digital Receptionist for your inbox, your call stack, and your auto-response rules. The first conversation covers your current volume and what's slipping through.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?product=ai-digital-receptionist",
  },
};
