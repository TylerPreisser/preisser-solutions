import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "lead-pipeline-agent",
  metaTitle: "Lead Pipeline Agent | Preisser Solutions",
  metaDescription:
    "Typeform to Attio to OpenAI scoring to Slack. End-to-end automated lead qualification with zero manual steps from form submission to qualified-lead notification.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Lead Pipeline Agent",
  tagline:
    "Typeform to Attio to OpenAI scoring to Slack. End-to-end automated lead qualification with zero manual steps.",
  category: "Sales & Lead Capture",
  status: "production",
  industries: ["B2B services", "Professional services", "Consulting", "SaaS"],

  h1: "Form submission to qualified lead in seconds — zero manual steps.",
  subheadline:
    "An end-to-end automated pipeline that takes every contact form submission from intake through CRM record creation, AI qualification scoring, and real-time Slack notification — before a human sees the lead.",
  oneLine:
    "Eliminates manual lead triage by automating the path from form submission to AI-scored CRM record to Slack notification.",

  whatItDoes: [
    "The default lead pipeline in most service businesses involves someone getting an email, copying the lead into a CRM, scoring it manually, and deciding who to notify. Each step is a place where the lead waits — and the longer a lead waits uncontacted, the lower the conversion rate becomes.",
    "The Lead Pipeline Agent eliminates every manual step in that chain. A prospect submits a form and everything that follows is automated: the CRM record is created, the lead is scored by AI against the business's qualification criteria, the score and rationale are written back to the CRM record, and the right person receives a Slack notification with everything they need to respond immediately.",
    "The architecture was built for R Squared AI's inbound sales operation using Typeform, Attio, Zapier, and OpenAI. The same pattern is configurable for any business's form stack, CRM, and notification preferences — with the scoring rubric tuned to each client's specific qualification criteria. The moment a qualified lead arrives, the right person knows.",
  ],
  capabilities: [
    {
      title: "Automated CRM record creation",
      description:
        "Every form submission creates a CRM record immediately with all form fields mapped to CRM properties — no manual copy-paste, no lost submissions.",
    },
    {
      title: "AI lead qualification and scoring",
      description:
        "An AI step evaluates each lead against the business's specific qualification rubric, producing a score and a rationale before any human sees the record.",
    },
    {
      title: "Qualification score write-back",
      description:
        "The AI score and rationale write directly to the CRM record so every person who accesses the lead sees the same qualification context.",
    },
    {
      title: "Real-time Slack notification",
      description:
        "A Slack notification fires the moment a qualified lead completes scoring, delivering the lead details and score to the right channel or person in real time.",
    },
    {
      title: "Configurable qualification rubric",
      description:
        "The scoring criteria are specific to the business — industry, company size, intent signals, budget indicators — not a generic lead score model.",
    },
    {
      title: "Multi-notification surface support",
      description:
        "Notification delivery can be configured for Slack, email, SMS, or any combination — routing qualified leads to the right surface for the team's workflow.",
    },
  ],
  inputs: [
    { label: "Contact form submissions", format: "Typeform webhook / form API" },
    { label: "Lead qualification criteria", format: "Configuration document" },
    { label: "CRM connection (Attio, HubSpot, Salesforce, or equivalent)", format: "API / Zapier" },
    { label: "Slack workspace and channel configuration", format: "Slack API / webhook" },
    { label: "Field mapping: form fields to CRM properties", format: "Configuration" },
  ],
  outputs: [
    { label: "CRM record with all form fields populated", format: "CRM platform (Attio / HubSpot / Salesforce)" },
    { label: "AI qualification score and rationale written to CRM record", format: "CRM field" },
    { label: "Real-time Slack notification for qualified leads", format: "Slack message" },
    { label: "Disqualified leads logged to CRM without notification", format: "CRM record" },
    { label: "Full audit log of every submission processed", format: "Zapier / CRM log" },
  ],
  howItWorks: [
    {
      step: "Form submission received",
      description:
        "A prospect submits the contact form. The webhook fires immediately — the pipeline begins without any human involvement.",
    },
    {
      step: "CRM record created",
      description:
        "All form fields are mapped to CRM properties and a new lead record is created instantly — no waiting, no manual entry.",
    },
    {
      step: "AI qualification",
      description:
        "The AI scoring step evaluates the lead against the configured rubric — company type, intent signals, stated need, and fit criteria — producing a score and a rationale.",
    },
    {
      step: "Score written back",
      description:
        "The qualification score and rationale are written back to the CRM record so the full context is visible to anyone who accesses the lead.",
    },
    {
      step: "Notification routing",
      description:
        "Qualified leads trigger a real-time Slack notification with lead details, score, and rationale. The right person can respond while the lead is still warm.",
    },
  ],
  useCases: [
    "Use this when contact form leads are waiting in an email inbox for hours before someone manually enters them into the CRM.",
    "Use this when lead qualification is inconsistent across the sales team — different people score the same lead differently based on personal judgment.",
    "Use this when lead response time is too slow — qualified prospects are going unanswered for hours while someone is in meetings or unavailable.",
    "Use this when you want AI-graded qualification data in the CRM record before the sales conversation, so the first call starts with context rather than cold research.",
    "Use this as the intake layer for a larger sales automation stack — the output feeds follow-up sequences, routing to specific reps, and pipeline stage assignment.",
  ],
  techStack: [
    "Typeform",
    "Attio",
    "Zapier",
    "OpenAI",
    "Slack",
    "CRM API integration",
  ],
  linkedCaseStudySlug: "contact-form-crm-pipeline",
  relatedSlugs: [
    "after-hours-call-triage",
    "submission-processing-agent",
    "robin-hiring-screener",
  ],
  cta: {
    heading: "Want qualified leads routed to the right person the moment they arrive?",
    subcopy:
      "Preisser Solutions builds the end-to-end pipeline configured for your form stack, CRM, and qualification criteria. The first conversation covers your current lead process and where the delays are.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?agent=lead-pipeline-agent",
  },
};
