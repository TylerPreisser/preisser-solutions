import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/dodge-city-kansas-seo
 * Dodge City, KS — Ford County. Southwest Kansas. SEO intent variant.
 */
export const locationData: LocationPageData = {
  slug: "dodge-city-kansas-seo",
  city: "Dodge City",
  state: "Kansas",
  region: "Southwest Kansas",
  coordinates: { lat: 37.752, lng: -100.017 },

  metaTitle: "SEO & AI Search in Dodge City, KS",
  metaDescription:
    "Local SEO and AI search optimization for Dodge City, Kansas businesses — get found on Google, ChatGPT, Perplexity, and Gemini.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "SEO & AI Search in Dodge City, Kansas",
    h1: "Local SEO and AI Search Optimization for Dodge City",
    subheadline:
      "Local SEO and AI-search optimization for Dodge City, Kansas businesses — get found on Google and cited by ChatGPT, Perplexity, and Gemini.",
    answerParagraph:
      "Preisser Solutions delivers local SEO and AI-search optimization for businesses in Dodge City, Kansas — the county seat of Ford County in southwest Kansas, a regional hub of approximately 27,000 anchored by beef processing, agriculture, and tourism along US-50 and US-283. Services include Google Business Profile optimization, citation building, schema markup, and AI-search citation engineering for the Dodge City and southwest Kansas market.",
  },

  nearbyAreas: [
    { name: "Garden City, KS", href: "/locations/garden-city-kansas", distanceLabel: "52 mi W" },
    { name: "Liberal, KS", href: "/locations/liberal-kansas-web-design", distanceLabel: "100 mi SW" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "65 mi E" },
    { name: "Kinsley, KS", distanceLabel: "40 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "90 mi NE" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "130 mi NE" },
    { name: "Cimarron, KS", distanceLabel: "25 mi W" },
    { name: "Greensburg, KS", distanceLabel: "50 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Dodge City's beef processing and tourism industries create distinct local search demand — the right SEO strategy captures it.",
    "AI-search optimization is an early-mover opportunity for Dodge City businesses — most are not yet optimized for ChatGPT citations.",
    "SEO infrastructure built in code — not in WordPress plugins that break on updates.",
  ],

  industriesServed: [
    "Agriculture",
    "Food Processing",
    "Tourism & Hospitality",
    "Trades",
    "Professional Services",
    "Healthcare",
  ],

  faq: [
    {
      question: "Does Preisser Solutions offer local SEO for Dodge City, Kansas?",
      answer:
        "Yes. Local SEO — Google Business Profile, local pack, citations, schema markup — and AI-search citation engineering are both offered for Dodge City businesses.",
    },
    {
      question: "What industries in Dodge City benefit most from local SEO?",
      answer:
        "Tourism, hospitality, healthcare, and trades businesses in Dodge City see the strongest ROI from local SEO investments.",
    },
    {
      question: "How does AI search optimization help a Dodge City business?",
      answer:
        "AI search optimization means engineering your website so ChatGPT, Perplexity, and Google AI Overviews cite your Dodge City business when users ask about your industry.",
    },
    {
      question: "Does Preisser Solutions handle Google Business Profile for Dodge City?",
      answer:
        "Yes. Google Business Profile optimization — categories, attributes, posts, Q&A, review strategy — is part of every local SEO engagement.",
    },
    {
      question: "Can Preisser Solutions optimize a Dodge City tourism business for search?",
      answer:
        "Yes. Tourism and hospitality SEO — including local pack, review strategy, schema markup, and AI-search visibility — is within standard capability.",
    },
    {
      question: "How does Preisser Solutions price SEO for Dodge City clients?",
      answer:
        "Initial SEO builds use fixed-price proposals. Ongoing work is scoped as optional retainers — never required.",
    },
  ],

  cta: {
    headline: "Ready to dominate local search in Dodge City?",
    subcopy:
      "Book a free scoping call. We will audit your current search presence and map a path to Google and AI-search visibility.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "dodge-city-kansas",
    "dodge-city-kansas-web-design",
    "garden-city-kansas-seo",
    "great-bend-kansas",
  ],
};
