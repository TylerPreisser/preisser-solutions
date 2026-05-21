export type AgentCategory =
  | "Revenue & Marketing"
  | "Operations & Back-Office"
  | "Sales & Lead Capture"
  | "Analysis & Decision Support"
  | "Engineering & Infrastructure";

export type AgentStatus = "production" | "proof-of-concept" | "deployable";

export interface AgentCapability {
  title: string;       // 3-6 word headline
  description: string; // 1-2 sentences
}

export interface AgentIO {
  label: string;       // e.g. "Customer service history (CSV/CRM)"
  format?: string;     // e.g. "JSON", "PDF", "Webhook"
}

export interface AgentHowItWorksStep {
  step: string;        // 2-5 word label
  description: string; // 1-2 sentences
}

export interface AgentHeadlineMetric {
  value: string;       // e.g. "60%"
  label: string;       // e.g. "reactivation rate"
}

export interface AgentCTA {
  heading: string;
  subcopy: string;
  buttonLabel: string;
  buttonHref: string;  // default pattern: "/contact?agent=<slug>"
}

export interface AgentData {
  // Routing / SEO
  slug: string;
  metaTitle: string;        // ≤ 60 chars
  metaDescription: string;  // ≤ 155 chars
  datePublished?: string;
  dateModified?: string;

  // Identity
  name: string;
  tagline: string;          // 1 line for cards
  category: AgentCategory;
  status: AgentStatus;
  industries: string[];     // for cross-filter / context

  // Hero
  h1: string;
  subheadline: string;
  oneLine: string;          // shop card description
  headlineMetric?: AgentHeadlineMetric;

  // Body
  whatItDoes: string[];     // 1-3 paragraphs
  capabilities: AgentCapability[]; // 4-8 items
  inputs: AgentIO[];
  outputs: AgentIO[];
  howItWorks: AgentHowItWorksStep[]; // 3-6 steps
  useCases: string[];       // 3-6 bullets

  // Provenance
  techStack: string[];
  linkedCaseStudySlug?: string;

  // Closing
  relatedSlugs: string[];
  cta: AgentCTA;

  // Optional disclosure
  statusNote?: string;
}
