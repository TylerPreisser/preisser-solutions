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

/**
 * R-096 — explicit pricing tier shape for /pricing.
 *
 * Renders as a 3-column tier card grid in AeoPage when present. Used so the
 * pricing page can present "Audit / Sprint / Retainer" as the three primary
 * commercial offers without being buried inside paragraph copy.
 */
export interface PricingTier {
  /** Tier label, e.g. "Tier 1: Business Systems Audit" */
  name: string;
  /** One-line price summary, e.g. "$1,500 - $3,500" */
  priceRange: string;
  /** Plain-language tagline shown under the name */
  tagline: string;
  /** Deliverables shown as a bulleted list */
  deliverables: string[];
  /** Who this tier is for */
  useCase: string;
  /** Approved CTA label + href */
  cta: { label: string; href: string };
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
  schemaType: "WebPage" | "Service" | "Article" | "BlogPosting" | "FAQPage" | "Organization" | "Person" | "ProfessionalService" | "AboutPage";
  /** Optional named entities mentioned on page (for citation graphs) */
  namedEntities?: string[];
  /** Optional related/internal links to render at the bottom */
  relatedLinks?: { label: string; href: string }[];
  /**
   * R-018: ISO-8601 date the page (or the underlying case study / article)
   * was first published. Required for `schemaType: "Article"` pages so
   * Google AI Overviews can attach E-E-A-T freshness signals; optional for
   * Service / WebPage types.
   */
  datePublished?: string;
  /**
   * R-018: ISO-8601 date of the most recent meaningful content edit.
   * Bump whenever the page substantively changes — AI engines re-rank stale
   * citations against fresher equivalents.
   */
  dateModified?: string;
  /**
   * Wave B: optional Schema.org Review block — attributed to a NAMED client
   * organization as `author`. AeoPage emits a `Review` JSON-LD when present.
   * Used on case-study pages where the client outcome is verifiable.
   *
   * IMPORTANT: do NOT use this to fabricate testimonials. The reviewBody
   * must be a factual outcome statement that mirrors verified content in
   * the page's `answerParagraph` / `sections`. Do NOT emit `AggregateRating`
   * — Google requires 3+ genuine user reviews and synthetic ratings are a
   * policy violation.
   */
  review?: {
    /** Paraphrased outcome statement sourced from existing page content. */
    reviewBody: string;
    /** 1-5; 5 for verified client engagements. */
    ratingValue: number;
    /** Named client as the author. */
    authorName: string;
    /** Organization (named company) or Person (individual). */
    authorType: "Organization" | "Person";
    /**
     * The service / product being reviewed. Defaults to "Preisser Solutions"
     * if omitted. Used in the Review's `itemReviewed.name`.
     */
    itemReviewedName?: string;
  };
  /**
   * Wave B: optional Schema.org HowTo block — emitted as `HowTo` JSON-LD
   * when present. Used on step-based blog posts (checklists, guides). The
   * step content should mirror existing section content; do not invent
   * steps.
   */
  howTo?: {
    name: string;
    description: string;
    steps: Array<{ name: string; text: string }>;
  };
  /** Final CTA copy */
  ctaHeadline: string;
  ctaSubcopy: string;
  /**
   * R-096 — optional pricing tier cards. When present (typically on /pricing),
   * AeoPage renders a 3-tier card grid between the answer paragraph and the
   * body sections. Omit on every other AEO page.
   */
  tiers?: PricingTier[];
  /**
   * R-095 — optional override for the final CTA button. When present,
   * AeoPage's bottom CTA renders this label/href in place of the default
   * "Reach out". Use for service-specific pages where a different approved
   * CTA better matches the page topic.
   */
  primaryCta?: { label: string; href: string };
  /** Tier label for organization */
  tier: "brand_defense" | "service_detail" | "industry" | "location" | "comparison" | "aeo_seo" | "trust_faq" | "blog";
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
