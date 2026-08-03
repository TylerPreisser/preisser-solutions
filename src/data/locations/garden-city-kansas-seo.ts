import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/garden-city-kansas-seo
 * Garden City, KS — Finney County. SEO intent variant.
 */
export const locationData: LocationPageData = {
  slug: "garden-city-kansas-seo",
  city: "Garden City",
  state: "Kansas",
  region: "Southwest Kansas",
  coordinates: { lat: 37.972, lng: -100.873 },

  metaTitle: "SEO & AI Search in Garden City, KS",
  metaDescription:
    "Local SEO and AI search optimization for Garden City, Kansas businesses — get found on Google, ChatGPT, Perplexity, and Gemini.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "SEO & AI Search in Garden City, Kansas",
    h1: "Local SEO and AI Search Optimization for Garden City",
    subheadline:
      "Local SEO and AI-search optimization for Garden City, Kansas businesses — get found on Google and cited by ChatGPT, Perplexity, and Gemini.",
    answerParagraph:
      "Preisser Solutions delivers local SEO and AI-search optimization for businesses in Garden City, Kansas — the county seat of Finney County in southwest Kansas, a diverse regional hub of approximately 27,000 anchored by beef processing and agriculture. Services include Google Business Profile optimization, citation building, schema markup, and AI-search citation engineering for the Garden City and southwest Kansas market.",
  },

  nearbyAreas: [
    { name: "Dodge City, KS", href: "/locations/dodge-city-kansas", distanceLabel: "52 mi E" },
    { name: "Liberal, KS", href: "/locations/liberal-kansas-web-design", distanceLabel: "75 mi S" },
    { name: "Lakin, KS", distanceLabel: "20 mi W" },
    { name: "Scott City, KS", distanceLabel: "40 mi N" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "90 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "115 mi NE" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "165 mi NE" },
    { name: "Dodge City SEO", href: "/locations/dodge-city-kansas-seo", distanceLabel: "52 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Garden City's diverse, multilingual market requires local SEO that reaches both English and Spanish-language searchers.",
    "AI-search optimization is an early-mover opportunity in southwest Kansas — most local businesses are not yet optimized for ChatGPT citations.",
    "SEO infrastructure built in code — schema markup, structured data, content architecture — not in WordPress plugins.",
  ],

  industriesServed: [
    "Agriculture",
    "Food Processing",
    "Healthcare",
    "Trades",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions offer local SEO for Garden City, Kansas?",
      answer:
        "Yes. Local SEO — Google Business Profile, local pack, citations, schema markup — and AI-search citation engineering are both offered for Garden City businesses.",
    },
    {
      question: "What is AI search optimization for a Garden City business?",
      answer:
        "AI search optimization means engineering your website so ChatGPT, Perplexity, Gemini, and Google AI Overviews cite your business when users ask about your industry in Garden City.",
    },
    {
      question: "Can Preisser Solutions optimize a Garden City business for Spanish-language search?",
      answer:
        "Multilingual SEO — including Spanish-language content strategy, hreflang tags, and Google Business Profile localization — is within the firm's capability.",
    },
    {
      question: "How competitive is local SEO in Garden City?",
      answer:
        "Garden City is a regional hub for southwest Kansas. Healthcare, trades, and food-service businesses see competitive local search demand. AI-search is still an early-mover opportunity.",
    },
    {
      question: "Does Preisser Solutions handle Google Business Profile for Garden City?",
      answer:
        "Yes. Google Business Profile optimization is part of every local SEO engagement.",
    },
    {
      question: "How does Preisser Solutions price SEO for Garden City clients?",
      answer:
        "Initial SEO builds use fixed-price proposals. Ongoing work is scoped as optional retainers — never required.",
    },
  ],

  cta: {
    headline: "Ready to dominate local search in Garden City?",
    subcopy:
      "Book a free scoping call. We will audit your current search presence and map a path to Google and AI-search visibility.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "garden-city-kansas",
    "garden-city-kansas-web-design",
    "dodge-city-kansas-seo",
    "liberal-kansas-web-design",
  ],
};
