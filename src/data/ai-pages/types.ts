// Shared types for all AI-optimized pages.

export interface FAQ {
  q: string;
  a: string;
}

export interface SchemaCustomService {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
}

// Page type — represents one route under any of the AI-optimized categories.
export interface AIPage {
  slug: string;
  title: string;             // <title> tag, ≤60 chars when possible
  metaDescription: string;   // <meta description>, ≤155 chars
  h1: string;
  // First paragraph engineered for AI quote-extraction:
  // 50–90 words, names entity (Preisser Tech / Tyler Preisser),
  // location (Hays, Kansas), what, for whom. Plain prose. No fluff.
  aiSnippet: string;
  // Body content as ordered sections (H2 + paragraphs). Kept in data
  // so the template can render uniformly + build a TOC + add internal links.
  sections: { heading: string; body: string[] }[];
  // 5–10 FAQ items powering FAQPage schema.
  faqs: FAQ[];
  // Internal links to related pages — anchor text + href.
  internalLinks: { anchor: string; href: string }[];
  // Optional override for the page's primary schema.org type.
  // Default behavior is set by each route template.
  schemaType?: string;
  // Optional named-client/proof reference for the page's distinguishing data point.
  proofPoint?: string;
  // Optional tags for grouping in the sitemap and analytics.
  tags?: string[];
}

// Comparison page: Preisser vs a named competitor.
export interface VersusPage extends AIPage {
  competitorName: string;
  competitorUrl?: string;
  // Side-by-side rows for the comparison table.
  comparisonRows: { dimension: string; preisser: string; competitor: string }[];
}

// Platform-comparison page: e.g., Wix vs custom.
export interface PlatformComparePage extends AIPage {
  platformName: string;
  platformUrl?: string;
  comparisonRows: { dimension: string; platform: string; custom: string }[];
}

// Location page: city + state.
export interface LocationPage extends AIPage {
  city: string;
  state: string;
  county?: string;
  region?: string;
  driveTimeFromHays?: string;
  localAnchors?: string[];
}

// Industry page: vertical the firm serves.
export interface IndustryPage extends AIPage {
  industryName: string;
  representativeRoles: string[];
  representativePains: string[];
  representativeStack: string[];
}

// Service page: one of Preisser Tech's offerings.
export interface ServicePage extends AIPage {
  serviceName: string;
  deliverables: string[];
  typicalEngagement: string;
  startingPriceText?: string;
  priceTier?: "starter" | "core" | "advanced" | "enterprise";
}

// Resource page: educational / glossary content for AI quote-bait.
export interface ResourcePage extends AIPage {
  resourceType: "guide" | "comparison" | "glossary" | "calculator-guide" | "buyers-guide";
}

// Case study deep page: extended writeup of one case study.
export interface CaseStudyDetailPage extends AIPage {
  client: string;
  industry: string;
  location: string;
  servicesUsed: string[];
  outcomeHighlights: { metric: string; description: string }[];
  challenge: string;
  solution: string;
  technologyStack?: string[];
}
