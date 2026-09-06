import type { CaseStudyData } from "@/types/case-study";

// Canonical project #14 — AI Email Digest System.
// Internal, operational. Used daily by Preisser Solutions leadership.
// See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "ai-email-digest",
  metaTitle: "AI Email Digest System",
  metaDescription:
    "One briefing every morning. Every important email from the last 24 hours: summarized, prioritized, and ready for decisions. Operational internally.",
  datePublished: "2026-01-08",
  dateModified: "2026-05-20",

  category: "Internal Tool • Executive Productivity",
  clientName: "AI Email Digest",
  clientNameDisplay: "Internal: Operational",
  industry: "AI email summarization and executive productivity",

  h1: "AI Email Digest: One Morning Briefing, Every Decision Ready",
  subheadline:
    "An internal tool that runs daily at Preisser Solutions: every important email from the last 24 hours, summarized, classified, and delivered as a single morning briefing.",
  oneLine: "Daily briefing of every important email, summarized and prioritized",

  headlineResults: [
    { value: "1", label: "Briefing instead of 200 emails" },
    { value: "24h", label: "Window summarized every morning" },
    { value: "5", label: "Categories applied automatically" },
    { value: "Daily", label: "Operational at Preisser Solutions" },
  ],

  before: {
    heading: "200 unread, 30 that matter, and no way to tell which is which.",
    body: [
      "Executive inboxes do not sort themselves. A typical morning starts with a few hundred unread messages (invoices, contracts, deal threads, legal updates, internal ops, vendor newsletters, system noise), and the first hour of the day disappears into triage. The important emails are in there somewhere. So are the ones that can wait until next week.",
      "Before the digest existed, the only way to find the decisions waiting in the inbox was to read everything. That cost an hour every morning and still missed things. The fix was to put an AI between the inbox and the human.",
    ],
  },

  built: {
    heading: "An AI that reads the inbox so the human reads the digest.",
    body: [
      "The system connects to Gmail or Outlook, pulls every email from the last 24 hours, and runs each one through an AI summarization engine. Summaries are short (one or two lines per email), and each is tagged with a category: Invoices, Deals, Legal, Ops, or News. Low-signal mail is filtered out entirely.",
      "The output is a single HTML digest delivered every morning. Each summary line includes a deep link back to the source email so a one-tap action (reply, archive, or open) is always available. The system optionally delivers a PDF copy and posts to Slack for teams that prefer chat over email. The digest is operational and runs daily at Preisser Solutions.",
    ],
  },

  specifications: {
    heading: "How the digest runs.",
    bullets: [
      "Gmail and Outlook integration",
      "AI summarization engine: one or two lines per email",
      "Category classification: Invoices, Deals, Legal, Ops, News",
      "HTML digest with deep links back to each source email",
      "Optional PDF copy and Slack delivery",
      "Daily morning schedule, runs unattended",
    ],
    subsections: [
      {
        title: "What gets surfaced",
        items: [
          "Invoices: vendor bills, payment confirmations, billing changes",
          "Deals: active prospect threads, contract redlines, signature requests",
          "Legal: counsel correspondence, compliance updates",
          "Ops: internal team coordination, calendar shifts, vendor coordination",
          "News: relevant industry or market updates",
        ],
      },
      {
        title: "Delivery options",
        items: [
          "HTML email digest (default)",
          "PDF copy for archival",
          "Slack channel posting for team distribution",
          "Configurable cutoff times and category weights",
        ],
      },
    ],
  },

  results: [
    {
      value: "1",
      label: "Briefing instead of a triage session",
      context:
        "Mornings start with a single, prioritized briefing, not the full inbox.",
    },
    {
      value: "24h",
      label: "Email window summarized daily",
      context:
        "Every important email from the last 24 hours is summarized and categorized in the same delivery.",
    },
    {
      value: "5",
      label: "Categories applied automatically",
      context:
        "Invoices, Deals, Legal, Ops, and News are tagged on every message: no manual sorting required.",
    },
    {
      value: "Operational",
      label: "Running daily at Preisser Solutions",
      context:
        "The digest is in production internally and delivered every morning, the same pattern is replicable for any executive inbox.",
    },
  ],

  techStack: [
    "Claude API",
    "Gmail / Outlook integration",
    "AI summarization",
    "Category classification",
    "HTML digest generation",
    "PDF delivery",
    "Slack integration",
  ],

  relatedSlugs: [
    "after-hours-call-triage",
    "contact-form-crm-pipeline",
    "hiring-pipeline-robin",
  ],

  cta: {
    heading: "Want a daily executive briefing built for your inbox?",
    subcopy:
      "Preisser Solutions can deploy the same digest pattern against your Gmail or Outlook stack. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
