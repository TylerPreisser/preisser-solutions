import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "customer-reactivation-agent",
  metaTitle: "Customer Reactivation Agent | Preisser Solutions",
  metaDescription:
    "AI-powered SMS and email engine that cleans dormant customer lists, segments by service history, and runs hyper-personalized outreach daily — 60%+ reactivation rate.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Customer Reactivation Agent",
  tagline:
    "Cleans dormant lists, segments, and runs hyper-personalized SMS + email outreach daily.",
  category: "Revenue & Marketing",
  status: "production",
  industries: ["HVAC services", "Field services", "Home services", "B2B services"],

  h1: "Reactivate your dormant customers — automatically.",
  subheadline:
    "An AI engine that scrubs broken customer data, segments records by service history and equipment age, and runs personalized outreach across SMS and email every day without staff input.",
  oneLine:
    "Turns a dormant customer list into a daily revenue channel through AI-personalized SMS and email outreach.",
  headlineMetric: {
    value: "60%+",
    label: "dormant customer reactivation rate",
  },

  whatItDoes: [
    "Most businesses are sitting on tens of thousands of dormant customer records — scattered across dispatch systems, CRMs, and spreadsheets, with broken contact data that makes them unusable. The Customer Reactivation Agent starts by cleaning that data: extracting usable records from multiple source systems, deduplicating, and enriching with the context that makes outreach relevant.",
    "Once the data is clean, the agent segments customers into cohorts by service history, equipment age, seasonal context, and behavioral signals. Every outreach message is crafted against that context — not a generic blast, but a message that references the specific service the customer received and the reason returning now makes sense for them.",
    "The agent runs on a daily autonomous schedule. It splits-tests message variants automatically, promotes winners, logs every response and booking back to the CRM, and handles opt-outs cleanly. Staff involvement after deployment is zero.",
  ],
  capabilities: [
    {
      title: "Multi-source data cleaning",
      description:
        "Scrubs and reconciles dormant customer records from dispatch systems, CRMs, and spreadsheets into a single clean, segmented dataset.",
    },
    {
      title: "Behavioral segmentation",
      description:
        "Groups customers by service history, equipment type and age, seasonal timing, and past engagement patterns to determine message relevance.",
    },
    {
      title: "Hyper-personalized outreach",
      description:
        "Generates individualized SMS and email messages for each customer cohort, referencing specific service history and contextually timed prompts.",
    },
    {
      title: "Dual-channel delivery",
      description:
        "Sends through both SMS and email simultaneously, with per-customer channel selection based on historical response data.",
    },
    {
      title: "Automated A/B split testing",
      description:
        "Runs multiple message variants concurrently, tracks response rates, and automatically promotes the best-performing versions.",
    },
    {
      title: "CRM round-trip integration",
      description:
        "Writes every reply, booking, opt-out, and response outcome back to the CRM so the customer record is always current.",
    },
    {
      title: "Daily autonomous execution",
      description:
        "Runs on a configured schedule with no staff involvement post-deployment — no daily queue to manage, no sends to approve.",
    },
  ],
  inputs: [
    { label: "Dormant customer records", format: "CSV / CRM export" },
    { label: "Service history data", format: "CSV / dispatch system export" },
    { label: "Equipment or asset records", format: "CSV / CRM field" },
    { label: "CRM system connection", format: "API / webhook" },
    { label: "Approved message templates and brand voice guidelines", format: "Document" },
  ],
  outputs: [
    { label: "Personalized SMS messages sent per customer", format: "SMS gateway" },
    { label: "Personalized email sends per customer", format: "Email automation platform" },
    { label: "CRM records updated with response outcomes", format: "CRM write-back" },
    { label: "A/B test performance report", format: "Dashboard / report" },
    { label: "Opt-out and deliverability log", format: "CSV / CRM field" },
  ],
  howItWorks: [
    {
      step: "Ingest and clean",
      description:
        "The agent pulls dormant customer records from all available source systems, deduplicates entries, repairs broken contact data, and produces a clean segmented dataset.",
    },
    {
      step: "Segment by context",
      description:
        "Customers are grouped into cohorts by service history, equipment age, seasonal timing, and behavioral signals that determine why and when outreach is relevant.",
    },
    {
      step: "Generate personalized messages",
      description:
        "For each cohort and individual record, the agent crafts an outreach message referencing the customer's specific service context — not a template blast.",
    },
    {
      step: "Send and split-test",
      description:
        "Messages deploy across SMS and email, with multiple variants tested concurrently. The agent tracks opens, clicks, responses, and bookings.",
    },
    {
      step: "Log outcomes and iterate",
      description:
        "Every outcome — response, booking, opt-out, no-response — writes back to the CRM. Winners are promoted; losing variants are retired. The cycle repeats daily.",
    },
  ],
  useCases: [
    "Use this when your business has 1,000+ dormant customer records that haven't been contacted in 12+ months and no automated process for reaching them.",
    "Use this when your office staff are spending hours per week on manual reminder calls and follow-up emails that could be fully automated.",
    "Use this when you're running seasonal businesses (HVAC, landscaping, pest control) that have predictable reactivation windows and time-sensitive prompts.",
    "Use this when you have multi-system data fragmentation preventing consistent outreach — dispatch in one system, contacts in another, service notes in a third.",
    "Use this when you want A/B-tested, performance-tracked messaging without a dedicated marketing operations team.",
  ],
  techStack: [
    "AI personalization engine",
    "SMS gateway (Twilio)",
    "Email automation platform",
    "CRM integration",
    "A/B testing harness",
    "Data cleansing pipeline",
  ],
  linkedCaseStudySlug: "cassidy-hvac-reactivation",
  relatedSlugs: [
    "social-marketing-agent",
    "marcommand-engine",
    "lead-pipeline-agent",
  ],
  cta: {
    heading: "Want this agent running against your customer list?",
    subcopy:
      "Preisser Solutions scopes reactivation engines from existing data in days. The first conversation is a review of your list and your systems — no commitment.",
    buttonLabel: "Scope this for my business",
    buttonHref: "/contact?agent=customer-reactivation-agent",
  },
};
