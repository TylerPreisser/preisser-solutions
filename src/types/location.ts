// Location page data contract.
//
// Every /locations/[city] page reads a LocationPageData object and renders
// through src/components/location/LocationPage.tsx. The hub at /locations
// reads the same objects to build its geographic grid.
//
// Voice + privacy rules (enforced by content, not by type):
// - Company voice only — subject is "Preisser Solutions" or "we"
// - No "Tyler builds/walks/ships/personally codes" in body copy
// - No emoji, no exclamation marks, no marketing clichés
// - No dollar amounts in any string
// - No named third-party orgs we do not actually serve
// - Case studies only when there is a real geographic tie
// See docs/CANONICAL-PROJECTS.md and docs/WRITER-AGENT-PROMPT.md.

export type LocationServiceIcon =
  | "dashboard"
  | "automation"
  | "website"
  | "ai-agent"
  | "integration"
  | "seo"
  | "document";

export interface LocationServiceCard {
  icon: LocationServiceIcon;
  title: string;
  bullets: string[];   // 2–3 short, scannable bullets
  href?: string;       // optional link to a deeper service page
}

export interface LocationNearbyArea {
  name: string;
  href?: string;       // present if the area has its own /locations page
  distanceLabel?: string; // e.g. "28 mi E"
}

export interface LocationProcessStep {
  title: string;
  description: string;
}

export interface LocationCaseStudyCard {
  slug: string;            // matches /case-studies/[slug]
  clientDisplay: string;   // "Cassidy HVAC" or "An MGU within the Alliant Insurance ecosystem"
  headlineNumber: string;  // "60%+ reactivation"
  oneLine: string;
  category: string;
}

export interface LocationFaqItem {
  question: string;
  answer: string;
}

export interface LocationPageData {
  // ── Routing / SEO ───────────────────────────────────────────
  slug: string;            // e.g. "hays-kansas"
  city: string;            // "Hays"
  state: string;           // "Kansas"
  region?: string;         // "Western Kansas"
  coordinates?: { lat: number; lng: number };

  metaTitle: string;       // ≤ 60 chars
  metaDescription: string; // ≤ 155 chars

  datePublished?: string;  // ISO
  dateModified?: string;   // ISO

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    answerParagraph: string; // 50–90 words, AI-extraction optimized
  };

  // ── Sections ────────────────────────────────────────────────
  nearbyAreas: LocationNearbyArea[];

  serviceCards: LocationServiceCard[];

  process: LocationProcessStep[];

  caseStudies?: LocationCaseStudyCard[];

  whyLocal?: string[];

  industriesServed?: string[];

  faq: LocationFaqItem[];

  cta: {
    headline: string;
    subcopy: string;
    primaryButton: { label: string; href: string };
    secondaryLink?: { label: string; href: string };
  };

  relatedLocations?: string[]; // slugs of nearby /locations pages
}
