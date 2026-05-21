import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "email-digest-agent",
  metaTitle: "AI Email Digest Agent | Preisser Solutions",
  metaDescription:
    "One morning briefing: summarizes the last 24 hours of important email, categorizes by topic, and links to source threads. Gmail and Outlook supported.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "AI Email Digest Agent",
  tagline:
    "One morning briefing: summarizes the last 24 hours of important email, categorizes by topic, links sources.",
  category: "Analysis & Decision Support",
  status: "deployable",
  industries: ["B2B services", "Professional services", "Consulting", "Executive productivity"],

  h1: "Everything important from the last 24 hours of email — in one morning brief.",
  subheadline:
    "An AI agent that reads your inbox, identifies what matters, summarizes it by category, and delivers one clean morning briefing — so you start the day knowing what requires attention instead of digging through an inbox to find it.",
  oneLine:
    "Converts 24 hours of inbox volume into a single prioritized briefing with category summaries and source links.",

  whatItDoes: [
    "Email volume at any senior level is a daily productivity tax. The important messages — client replies, deal updates, legal notices, financial alerts — are buried in the same stream as newsletters, automated notifications, and low-priority threads. Getting through the inbox first thing in the morning is a 30-60 minute exercise in sorting before any actual work can begin.",
    "The AI Email Digest Agent converts that sorting task into a single three-minute read. Every morning, it scans the past 24 hours of email, identifies what's substantive and what's noise, and produces a categorized digest: Invoices and Finance, Deals and Opportunities, Legal and Compliance, Operations, News and Intelligence. Each category contains a crisp summary with a deep link to the original thread so you can go directly to what you need.",
    "The digest delivers via HTML email by default, with optional PDF and Slack delivery. The agent is non-destructive — it reads but does not move, archive, or reply to any email. It handles Gmail and Outlook. Configuration lets you tune what counts as important per category and what domains or senders to deprioritize.",
  ],
  capabilities: [
    {
      title: "24-hour inbox scan",
      description:
        "Reads all email from the past 24 hours across the configured inbox, identifying substantive messages and filtering out automated notifications and low-priority threads.",
    },
    {
      title: "Category classification",
      description:
        "Groups messages into functional categories — Invoices and Finance, Deals and Opportunities, Legal, Operations, News — based on content signals rather than folder assignments.",
    },
    {
      title: "AI summarization per thread",
      description:
        "Summarizes each important thread at the level of what decision or action it requires — not a word-for-word transcription, but the information needed to respond or act.",
    },
    {
      title: "Deep link to source threads",
      description:
        "Every summary includes a direct link back to the original email thread so clicking through takes you directly to the conversation without inbox navigation.",
    },
    {
      title: "Priority flagging",
      description:
        "Identifies emails requiring a response or action today versus those that are informational, surfacing time-sensitive items at the top of the digest.",
    },
    {
      title: "Multi-format delivery",
      description:
        "Delivers the digest as an HTML email by default, with optional PDF export and Slack delivery for teams that prefer a specific information surface.",
    },
  ],
  inputs: [
    { label: "Gmail or Outlook inbox access", format: "Gmail API / Microsoft Graph API" },
    { label: "Category classification preferences", format: "Configuration" },
    { label: "Priority sender and domain rules", format: "Configuration" },
    { label: "Digest delivery preferences (email, Slack, PDF)", format: "Configuration" },
  ],
  outputs: [
    { label: "Morning email digest with categorized summaries", format: "HTML email" },
    { label: "Priority action items highlighted", format: "HTML digest section" },
    { label: "Deep links to original threads per summary", format: "Gmail / Outlook thread links" },
    { label: "Optional Slack delivery of digest", format: "Slack message" },
    { label: "Optional PDF export of digest", format: "PDF" },
  ],
  howItWorks: [
    {
      step: "Inbox scan on schedule",
      description:
        "The agent runs on a configured morning schedule, scanning all email received in the past 24 hours across the connected inbox.",
    },
    {
      step: "Significance filtering",
      description:
        "Each message is assessed for significance — filtering out automated notifications, newsletters, and low-priority threads to focus summarization on what matters.",
    },
    {
      step: "Category assignment and summarization",
      description:
        "Substantive messages are categorized and summarized at the thread level — capturing the decision or action required, not just the message content.",
    },
    {
      step: "Priority flagging",
      description:
        "Items requiring same-day response or action are identified and surfaced at the top of the digest ahead of informational items.",
    },
    {
      step: "Digest assembly and delivery",
      description:
        "The categorized digest assembles with deep links to source threads and delivers via the configured channels before the workday begins.",
    },
  ],
  useCases: [
    "Use this when your inbox volume has grown to the point where the first 30-60 minutes of each day is spent sorting email rather than doing work.",
    "Use this when important messages are regularly getting buried and you're discovering time-sensitive items hours after they arrived.",
    "Use this when you need a consistent morning intelligence brief that covers deals, finances, legal, and operations without requiring you to read every thread individually.",
    "Use this when you're managing multiple projects or client relationships and need a daily summary of what changed across all of them overnight.",
    "Use this when you want a non-destructive email analysis layer — something that reads and summarizes without taking any action on your inbox.",
  ],
  techStack: [
    "Gmail API / Microsoft Graph API",
    "AI summarization engine",
    "Category classification model",
    "HTML email generation",
    "Slack API (optional)",
    "PDF generation (optional)",
  ],
  relatedSlugs: [
    "alpha-matrix",
    "trend-behavioral-analysis-agent",
    "robin-hiring-screener",
  ],
  cta: {
    heading: "Want every morning to start with a full inbox brief instead of inbox sorting?",
    subcopy:
      "Preisser Solutions configures the email digest agent for your inbox, categories, and delivery preferences. The first conversation covers your current email volume and what matters most.",
    buttonLabel: "Scope this for my workflow",
    buttonHref: "/contact?agent=email-digest-agent",
  },
};
