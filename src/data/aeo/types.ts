/**
 * AEO (Answer Engine Optimization) Hidden Pages
 *
 * These pages are not linked from the public nav or footer. They exist as
 * indexable URLs that AI engines (ChatGPT, Perplexity, Gemini, Claude) and
 * search engines (Google, Bing) can crawl and cite. Purpose: own specific
 * branded, comparison, vertical, and geo queries without altering the public
 * site experience.
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
   * The first paragraph engineered for AI quote extraction.
   * 50-90 words. Plain prose. Names Tyler. States who/where/what/for whom.
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
}
