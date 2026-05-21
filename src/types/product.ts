export type ProductCategory =
  | "Marketing & Growth"
  | "Operations & Back-Office"
  | "Sales & Customer Service"
  | "Decision Intelligence"
  | "Custom Builds";

export type ProductStatus = "production" | "proof-of-concept" | "deployable" | "service";

export interface ProductCapability {
  title: string;       // 3-6 word headline
  description: string; // 1-2 sentences
}

export interface ProductIO {
  label: string;       // e.g. "Customer service history (CSV/CRM)"
  format?: string;     // e.g. "JSON", "PDF", "Webhook"
}

export interface ProductHowItWorksStep {
  step: string;        // 2-5 word label
  description: string; // 1-2 sentences
}

export interface ProductHeadlineMetric {
  value: string;       // e.g. "60%"
  label: string;       // e.g. "reactivation rate"
}

export interface ProductCTA {
  heading: string;
  subcopy: string;
  buttonLabel: string;
  buttonHref: string;  // default pattern: "/contact?product=<slug>"
}

/**
 * Lightweight projection of ProductData — only the fields rendered by the
 * product grid / catalog. Serialised into the hydration payload instead of
 * the full ProductData, which cuts the /products JS chunk by ~65-70%.
 */
export interface ProductSummary {
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  status: ProductStatus;
  headlineMetric?: ProductHeadlineMetric;
}

export interface ProductData {
  // Routing / SEO
  slug: string;
  metaTitle: string;        // ≤ 60 chars
  metaDescription: string;  // ≤ 155 chars
  datePublished?: string;
  dateModified?: string;

  // Identity
  name: string;
  tagline: string;          // 1 line for cards
  category: ProductCategory;
  status: ProductStatus;
  industries: string[];     // for cross-filter / context

  // Hero
  h1: string;
  subheadline: string;
  oneLine: string;          // shop card description
  headlineMetric?: ProductHeadlineMetric;

  // Body
  whatItDoes: string[];     // 1-3 paragraphs
  capabilities: ProductCapability[]; // 4-8 items
  inputs: ProductIO[];
  outputs: ProductIO[];
  howItWorks: ProductHowItWorksStep[]; // 3-6 steps
  useCases: string[];       // 3-6 bullets

  // Provenance
  techStack: string[];
  linkedCaseStudySlug?: string;

  // Closing
  relatedSlugs: string[];
  cta: ProductCTA;

  // Optional disclosure
  statusNote?: string;
}
