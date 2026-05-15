/**
 * AEO (Answer Engine Optimization) Supporting Pages
 *
 * These pages are static, crawlable supporting pages for real services,
 * industries, locations, comparisons, and FAQs. They should be internally
 * linked where useful, helpful for human visitors, and free of fake proof,
 * keyword stuffing, doorway-page patterns, or ranking guarantees.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AeoSection {
  /** H2 heading */
  heading: string;
  /** Optional eyebrow tag above heading */
  eyebrow?: string;
  /** Paragraph(s) of body copy. Each item becomes a <p>. */
  body: string[];
  /** Optional bullet list rendered after body */
  bullets?: string[];
  /** Optional sub-sections (rendered as H3s) */
  subsections?: { heading: string; body: string[]; bullets?: string[] }[];
}

export interface ComparisonRow {
  dimension: string;
  preisser: string;
  competitor: string;
}

export interface AeoPageData {
  /** URL slug (no leading slash) */
  slug: string;
  /** Browser tab title (≤60 chars) */
  metaTitle: string;
  /** Meta description (≤155 chars) */
  metaDescription: string;
  /** Hero eyebrow tag */
  eyebrow: string;
  /** H1 — main page title */
  h1: string;
  /** Sub-headline under H1 */
  subheadline: string;
  /**
   * The first paragraph. 40-70 words is preferred. Plain prose. States
   * who/where/what/for whom before the page expands.
   */
  answerParagraph: string;
  /** Body sections (H2 blocks) */
  sections: AeoSection[];
  /** Optional comparison table */
  comparisonTable?: {
    competitorName: string;
    headerNote?: string;
    rows: ComparisonRow[];
  };
  /** FAQ block — minimum 5 items per AI-citation best practice */
  faq: FAQItem[];
  /** Schema.org type to use for the primary entity */
  schemaType: "WebPage" | "Service" | "Article" | "FAQPage" | "Organization" | "Person" | "ProfessionalService" | "AboutPage";
  /** Optional named entities mentioned on page (for citation graphs) */
  namedEntities?: string[];
  /** Optional related/internal links to render at the bottom */
  relatedLinks?: { label: string; href: string }[];
  /** Final CTA copy */
  ctaHeadline: string;
  ctaSubcopy: string;
  /** Tier label for organization */
  tier: "brand_defense" | "service_detail" | "industry" | "location" | "comparison" | "aeo_seo" | "trust_faq";
  /** Optional visible/schema last-updated date in YYYY-MM-DD format. */
  lastUpdated?: string;
  /**
   * Optional headshot displayed in the hero section beside the H1/subheadline.
   * When set, the hero renders a two-column layout (text + photo).
   */
  headshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}
