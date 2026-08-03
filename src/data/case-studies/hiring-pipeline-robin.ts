import type { CaseStudyData } from "@/types/case-study";

// Canonical project #15 — Hiring Pipeline & AI Pre-Screener "Robin".
// Internal hiring automation pattern. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "hiring-pipeline-robin",
  metaTitle: "Hiring Pipeline & AI Pre-Screener Robin",
  metaDescription:
    "Google Sheets + Apps Script hiring pipeline with an AI pre-screener called Robin that stack-ranks resumes A/B/C before a human looks.",
  datePublished: "2026-02-18",
  dateModified: "2026-05-20",

  category: "Internal Tool • AI Agent",
  clientName: "Hiring Pipeline Robin",
  clientNameDisplay: "Internal — Hiring Automation",
  industry: "Recruiting and hiring automation",

  h1: "Hiring Pipeline & Robin — AI Pre-Screening System",
  subheadline:
    "A complete Google Sheets and Apps Script hiring pipeline with an AI agent called Robin that stack-ranks resumes A/B/C against weighted criteria.",
  oneLine: "60-column tracker plus Robin AI pre-screener",

  headlineResults: [
    { value: "60", label: "Columns covering the full pipeline" },
    { value: "A/B/C", label: "Robin's resume ranking output" },
    { value: "3", label: "Auto-sent decline email templates" },
    { value: "3", label: "Interview rounds tracked" },
  ],

  before: {
    heading: "Inbound resumes piling up, no consistent way to evaluate.",
    body: [
      "A hiring process was generating inbound applications faster than the team could evaluate them with consistency. Resumes lived in Gusto. Status updates lived in someone's head. Decline emails were written one at a time. There was no shared scoreboard for who was where in the funnel and no shared lens for what made a strong candidate.",
      "What was needed: a single tracker covering every stage from application to offer, a consistent evaluation lens applied before a human spent time, and automation to handle the mechanical parts (status updates, decline emails, date stamps) so people could focus on the interviews that mattered.",
    ],
  },

  built: {
    heading: "A 60-column tracker with an AI pre-screener at the top of the funnel.",
    body: [
      "Preisser Solutions built the full pipeline in Google Sheets with Apps Script automation. The master tracker is 60 columns wide and covers the entire hiring funnel — application intake, resume review, three interview rounds, references, and offer status. Apps Script handles automated decline emails (three stage-specific templates), status updates, and date-stamping on every state change.",
      "Robin is the AI agent at the front of the pipeline. Robin reviews resumes in Gusto and stack-ranks candidates A, B, or C against weighted hiring criteria before a human ever looks. The combination of Robin and the tracker means the team spends time on the candidates most likely to move forward — not on triaging the full inbox.",
    ],
  },

  specifications: {
    heading: "Pipeline architecture.",
    bullets: [
      "Google Sheets master tracker with 60 columns covering the full funnel",
      "Apps Script onEdit trigger automation",
      "Robin AI pre-screener — stack-ranks resumes A/B/C against weighted criteria",
      "Three auto-sent stage-specific decline email templates",
      "Two manual invite email templates for interview rounds",
      "Automatic status updates and date-stamping on every state change",
    ],
    subsections: [
      {
        title: "Stages tracked",
        items: [
          "Inbound application and resume review",
          "Robin pre-screen rank (A / B / C)",
          "Interview round 1",
          "Interview round 2",
          "Interview round 3",
          "References, offer, and final status",
        ],
      },
      {
        title: "Automation surface",
        items: [
          "Three decline email templates — application, post-interview, and post-final",
          "Two invite templates for interview round coordination",
          "onEdit triggers update statuses and timestamps automatically",
          "Robin reviews Gusto resumes and writes the rank back to the tracker",
        ],
      },
    ],
  },

  results: [
    {
      value: "60",
      label: "Columns covering every stage",
      context:
        "The master tracker captures every state from inbound application through references and offer in a single sheet.",
    },
    {
      value: "A/B/C",
      label: "Robin's stack-ranking output",
      context:
        "Robin reviews resumes in Gusto and assigns each candidate A, B, or C against the weighted hiring criteria before a human reviews.",
    },
    {
      value: "3",
      label: "Decline email templates auto-sent",
      context:
        "Application, post-interview, and post-final decline emails fire automatically from Apps Script based on state changes.",
    },
    {
      value: "Deployed",
      label: "In use as a hiring workflow",
      context:
        "The same pattern is replicable for any role family: one tracker, one scoring rubric, and one automation layer.",
    },
  ],

  techStack: [
    "Google Sheets",
    "Google Apps Script",
    "Gusto integration",
    "Claude API",
    "AI pre-screening agent",
    "Email template automation",
    "onEdit triggers",
  ],

  relatedSlugs: [
    "contact-form-crm-pipeline",
    "ai-email-digest",
    "agentic-coding-specialists",
  ],

  cta: {
    heading: "Want an AI pre-screener at the top of your hiring funnel?",
    subcopy:
      "Preisser Solutions can deploy a Robin-style hiring pipeline for any role family — tracker, automations, and AI pre-screen included. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
