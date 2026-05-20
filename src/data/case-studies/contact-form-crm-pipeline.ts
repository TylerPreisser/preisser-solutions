import type { CaseStudyData } from "@/types/case-study";

// Canonical project #20 — Contact Form → CRM → AI Pipeline.
// Built for R Squared AI. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "contact-form-crm-pipeline",
  metaTitle: "Contact Form to CRM AI Pipeline | Preisser Solutions",
  metaDescription:
    "End-to-end automated lead pipeline built for R Squared AI: Typeform, Attio, Zapier, OpenAI scoring, Slack notification. Zero manual steps.",
  datePublished: "2026-02-25",
  dateModified: "2026-05-20",

  category: "Internal Tool • System Integration",
  clientName: "Contact Form CRM Pipeline",
  clientNameDisplay: "Internal — R Squared AI",
  industry: "Lead pipeline automation and CRM integration",

  h1: "Contact Form → CRM → AI Pipeline — Built for R Squared AI",
  subheadline:
    "End-to-end automated lead pipeline. Form submission to qualified-lead notification with zero manual steps. Typeform, Attio, Zapier, OpenAI, and Slack wired into one flow.",
  oneLine: "End-to-end automated lead pipeline, zero manual steps",

  headlineResults: [
    { value: "0", label: "Manual steps in the pipeline" },
    { value: "Real-time", label: "Slack notification on qualified leads" },
    { value: "AI", label: "Lead qualification and scoring" },
    { value: "Form to CRM", label: "Fully automated handoff" },
  ],

  before: {
    heading: "Form submissions waiting on someone to copy them into the CRM.",
    body: [
      "The default lead pipeline at most service businesses looks like this: a contact form fires, someone gets an email, someone else copies the entry into the CRM, someone scores it manually, and someone routes it to the right person. Each step is a place where the lead waits. By the time a qualified lead reaches the right human, the moment has often passed.",
      "R Squared AI needed a pipeline that turned a form submission into a routed, scored, CRM-tracked lead automatically — fast enough that the right human could respond while the lead was still warm.",
    ],
  },

  built: {
    heading: "Typeform, Attio, Zapier, OpenAI, and Slack — one flow, no manual hops.",
    body: [
      "Preisser Solutions built the pipeline end-to-end. Typeform handles intake. Zapier orchestrates the handoff: every submission creates an Attio CRM record with the form fields mapped to CRM properties, and an OpenAI step scores and qualifies the lead against R Squared AI's criteria. A Slack notification fires in real time when a qualified lead lands so the right person can respond immediately.",
      "The architecture is replicable. The same Typeform → Attio → Zapier → OpenAI → Slack pattern works for any service business that runs inbound leads through a CRM and wants AI-graded triage before a human responds.",
    ],
  },

  specifications: {
    heading: "Pipeline architecture.",
    bullets: [
      "Typeform intake — form fields mapped to CRM properties",
      "Attio CRM — every submission creates a record automatically",
      "Zapier orchestration — handles the full handoff with no manual steps",
      "OpenAI step — lead qualification and scoring against R Squared AI's criteria",
      "Slack notification — real-time alert on qualified leads",
    ],
    subsections: [
      {
        title: "Flow",
        items: [
          "1. Lead submits Typeform",
          "2. Zapier receives webhook and creates Attio CRM record",
          "3. OpenAI step scores and qualifies the lead",
          "4. Qualification result writes back to the CRM record",
          "5. Slack notification fires for qualified leads in real time",
        ],
      },
      {
        title: "Why the pattern is replicable",
        items: [
          "Every component is API-driven and tool-agnostic",
          "CRM target can be swapped (Attio, HubSpot, Salesforce, custom)",
          "Scoring rubric is tuned per business",
          "Notification surface can be Slack, email, SMS, or all three",
        ],
      },
    ],
  },

  results: [
    {
      value: "0",
      label: "Manual steps from form to qualified lead",
      context:
        "Every step from form submission to CRM record to qualification to notification runs automatically — no human in the loop until the response.",
    },
    {
      value: "Real-time",
      label: "Slack notification on qualified leads",
      context:
        "Qualified leads fire a Slack notification the moment scoring completes, so the right human can respond while the lead is still warm.",
    },
    {
      value: "AI-scored",
      label: "Every lead qualified before notification",
      context:
        "OpenAI applies R Squared AI's qualification rubric to every submission before anyone gets pinged.",
    },
    {
      value: "Replicable",
      label: "Same pattern fits any inbound lead funnel",
      context:
        "The Typeform → Attio → Zapier → OpenAI → Slack architecture re-applies to any service business with an inbound CRM.",
    },
  ],

  techStack: [
    "Typeform",
    "Attio",
    "Zapier",
    "OpenAI",
    "Slack",
  ],

  relatedSlugs: [
    "hiring-pipeline-robin",
    "after-hours-call-triage",
    "ai-email-digest",
  ],

  cta: {
    heading: "Want every contact-form lead routed, scored, and announced in real time?",
    subcopy:
      "Preisser Solutions can build the same pipeline pattern against your CRM and notification stack. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
