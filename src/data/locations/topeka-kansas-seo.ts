import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/topeka-kansas-seo
 * Topeka, KS — SEO / AI search intent variant.
 */
export const locationData: LocationPageData = {
  slug: "topeka-kansas-seo",
  city: "Topeka",
  state: "Kansas",
  region: "Northeast Kansas & Flint Hills",
  coordinates: { lat: 39.048, lng: -95.677 },

  metaTitle: "SEO & AI Search in Topeka, KS",
  metaDescription:
    "Local SEO and AI search optimization for Topeka, Kansas businesses: get found on Google, ChatGPT, Perplexity, and Gemini.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "SEO & AI Search in Topeka, Kansas",
    h1: "Local SEO and AI Search Optimization for Topeka",
    subheadline:
      "Get found on Google, Google AI Overviews, ChatGPT, Perplexity, and Gemini: local SEO and AI-search optimization for Topeka businesses.",
    answerParagraph:
      "Preisser Solutions delivers local SEO and AI-search optimization for businesses in Topeka, Kansas, the state capital and Shawnee County seat, a metro of approximately 127,000. Services include Google Business Profile optimization, local pack strategy, citation building, schema markup, and AI-search citation engineering, so your Topeka business is cited when AI answer engines respond to questions about your industry.",
  },

  nearbyAreas: [
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "25 mi E" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "50 mi W" },
    { name: "Emporia, KS", href: "/locations/emporia-kansas-web-design", distanceLabel: "55 mi S" },
    { name: "Ottawa, KS", href: "/locations/ottawa-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "70 mi E" },
    { name: "Atchison, KS", href: "/locations/atchison-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "195 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Topeka's government and healthcare sector creates high-value local search demand, the right SEO strategy captures it.",
    "AI-search visibility is distinct from traditional SEO and requires engineering, not just content publishing.",
    "Preisser Solutions builds SEO infrastructure in code, not configured through plugins that can break on an update.",
  ],

  industriesServed: [
    "Government",
    "Healthcare",
    "Insurance",
    "Legal",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions offer local SEO for Topeka businesses?",
      answer:
        "Yes. Local SEO (Google Business Profile, local pack optimization, citation building, schema markup), and AI-search citation engineering are both offered for Topeka businesses.",
    },
    {
      question: "What is AI search optimization for Topeka businesses?",
      answer:
        "AI search optimization means making your Topeka business the source that ChatGPT, Perplexity, Gemini, and Google AI Overviews cite when users ask about your industry. It requires different techniques than traditional Google SEO.",
    },
    {
      question: "How competitive is local SEO in Topeka?",
      answer:
        "Topeka is a mid-sized state capital. Healthcare, legal, and government-adjacent services see competitive local search demand. AI-search optimization is still an early-mover opportunity in most Topeka categories.",
    },
    {
      question: "Can Preisser Solutions get a Topeka healthcare provider ranked on Google?",
      answer:
        "Local SEO for healthcare providers is within standard capability, including Google Business Profile, local pack, schema markup, and compliance-aware content strategy.",
    },
    {
      question: "Does Preisser Solutions handle Google Business Profile for Topeka?",
      answer:
        "Yes. Google Business Profile optimization (categories, attributes, posts, Q&A, review strategy) is part of every local SEO engagement.",
    },
    {
      question: "How does Preisser Solutions price SEO for Topeka clients?",
      answer:
        "Initial SEO builds use fixed-price proposals. Ongoing work is scoped separately as optional retainers, never required.",
    },
  ],

  cta: {
    headline: "Ready to dominate local search in Topeka?",
    subcopy:
      "Book a free scoping call. We will audit your current search presence and map a path to Google and AI-search visibility.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "topeka-kansas",
    "topeka-kansas-custom-software",
    "salina-kansas-seo",
    "hays-kansas",
  ],
};
