import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "robin-hiring-screener",
  metaTitle: "Robin — AI Hiring Pre-Screener | Preisser Solutions",
  metaDescription:
    "Resume review and A/B/C stack ranking against weighted criteria. Apps Script + Google Sheets pipeline with automated decline emails. Built for R Squared AI hiring.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Robin — AI Hiring Pre-Screener",
  tagline:
    "Resume review and A/B/C stack ranking against weighted criteria; Apps Script + Sheets pipeline; auto-sent decline emails.",
  category: "Analysis & Decision Support",
  status: "production",
  industries: ["B2B services", "Technology", "Professional services"],

  h1: "Every applicant reviewed, ranked A/B/C, and triaged before a human reads a single resume.",
  subheadline:
    "Robin is an AI pre-screening agent that reviews resumes against weighted criteria, produces an A/B/C stack ranking, and triggers automated stage-appropriate decline emails — all before your hiring team spends a minute on triage.",
  oneLine:
    "AI hiring pre-screener that stack-ranks applicants A/B/C against weighted criteria before any human review.",

  whatItDoes: [
    "Hiring pipeline management has an invisible overhead cost that most organizations accept without measuring: the time spent reviewing applications that should have been triaged out in the first pass. For every strong candidate in a pipeline, there are typically 5–20 that don't fit the role — and someone has to read each resume to know which is which.",
    "Robin eliminates that first-pass review burden. When a new application arrives, Robin reads the resume against a set of weighted criteria specific to the open role — skills match, experience relevance, background fit, and any role-specific qualification signals. Every applicant receives an A, B, or C ranking with a rationale. A-tier candidates surface for immediate human review. B-tier candidates queue as a second look. C-tier candidates receive an automated decline email immediately.",
    "The full pipeline runs in Google Sheets with Apps Script automation. A 60-column master tracker covers the hiring funnel from application through three interview rounds. Three stage-appropriate decline email templates send automatically based on where in the process a candidate is released. Robin was built and deployed for R Squared AI's frontend developer hiring process — it's operational, not a concept.",
  ],
  capabilities: [
    {
      title: "Weighted criteria resume screening",
      description:
        "Reviews each resume against a configurable set of weighted criteria specific to the open role — skills, experience, background fit, and any hard requirements.",
    },
    {
      title: "A/B/C stack ranking with rationale",
      description:
        "Every applicant receives a tier assignment (A/B/C) and a written rationale explaining the scoring decision, so human reviewers have context not just a grade.",
    },
    {
      title: "60-column Google Sheets master tracker",
      description:
        "A complete hiring pipeline tracker covering application through three interview rounds — status, dates, scores, notes, and outcome all in one sheet.",
    },
    {
      title: "Automated stage-appropriate decline emails",
      description:
        "Three distinct decline email templates send automatically based on pipeline stage — application screen, first round, second round — with appropriate language for each.",
    },
    {
      title: "onEdit trigger automation",
      description:
        "Apps Script onEdit triggers automate status updates and date-stamping as candidates move through the pipeline — no manual record-keeping required.",
    },
    {
      title: "Invite template library",
      description:
        "Manual invite templates for first and second interview rounds are built into the workflow, with candidate context pre-populated from the tracker.",
    },
  ],
  inputs: [
    { label: "Applicant resumes", format: "PDF / Gusto / ATS integration" },
    { label: "Role-specific weighted criteria", format: "Configuration document" },
    { label: "Google Sheets tracker (or new sheet setup)", format: "Google Sheets" },
    { label: "Decline email copy per stage", format: "Email templates (3 stages)" },
    { label: "Notification preferences for A-tier surfacing", format: "Configuration" },
  ],
  outputs: [
    { label: "A/B/C tier assignment per applicant in the tracker", format: "Google Sheets cell" },
    { label: "Robin rationale written to tracker row", format: "Google Sheets cell" },
    { label: "Automated decline email sent to C-tier applicants", format: "Email (Apps Script)" },
    { label: "A-tier notification to hiring manager", format: "Email / Slack" },
    { label: "Pipeline status updated throughout funnel stages", format: "Google Sheets (onEdit trigger)" },
  ],
  howItWorks: [
    {
      step: "Application intake",
      description:
        "New applications arrive via the ATS, Gusto, or a direct intake form. Robin receives each application and begins screening immediately.",
    },
    {
      step: "Weighted criteria evaluation",
      description:
        "Robin evaluates the resume against the role's weighted criteria, scoring each dimension and producing an aggregate ranking signal.",
    },
    {
      step: "Tier assignment and rationale",
      description:
        "Every applicant receives an A, B, or C tier with a written rationale. The assignment and rationale write to the tracking sheet row for that applicant.",
    },
    {
      step: "Automated triage",
      description:
        "C-tier applicants receive a stage-appropriate decline email immediately via Apps Script. A-tier applicants trigger a hiring manager notification.",
    },
    {
      step: "Pipeline tracking",
      description:
        "As candidates move through subsequent rounds, onEdit triggers update status, date-stamp transitions, and keep the master tracker current without manual entry.",
    },
  ],
  useCases: [
    "Use this when an open role receives 50+ applications and reading every resume before triage is consuming a half day of the hiring team's time.",
    "Use this when inconsistent criteria application is causing qualified candidates to get missed or unqualified candidates to advance further than they should.",
    "Use this when decline communications are delayed or inconsistent — leaving declined candidates in limbo for days or weeks because no one has drafted the email.",
    "Use this when your hiring pipeline data is scattered across emails, spreadsheets, and memory — and the tracker doesn't reflect the actual state of every candidate.",
    "Use this when you want a logged, reviewable record of how every screening decision was made — with Robin's rationale available if a candidate questions their outcome.",
  ],
  techStack: [
    "Claude Sonnet 4.5",
    "Google Apps Script",
    "Google Sheets",
    "Gusto (ATS integration)",
    "Gmail (automated decline emails)",
  ],
  linkedCaseStudySlug: "hiring-pipeline-robin",
  relatedSlugs: [
    "lead-pipeline-agent",
    "email-digest-agent",
    "submission-processing-agent",
  ],
  cta: {
    heading: "Want every applicant triaged before your team reads a single resume?",
    subcopy:
      "Preisser Solutions deploys Robin for your open roles — configured to your criteria, your sheet structure, and your decline email standards. The first conversation covers the role and your current screening process.",
    buttonLabel: "Scope this for my hiring process",
    buttonHref: "/contact?agent=robin-hiring-screener",
  },
};
