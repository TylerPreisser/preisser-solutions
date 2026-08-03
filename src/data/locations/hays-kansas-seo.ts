import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";
import { HG_OIL_INVENTORY_CARD, HG_OIL_INVOICE_CARD } from "./shared";

/**
 * /locations/hays-kansas-seo
 * Hays, KS — Ellis County. SEO / AI search intent variant.
 */
export const locationData: LocationPageData = {
  slug: "hays-kansas-seo",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Local SEO & AI Search in Hays, KS",
  metaDescription:
    "Local SEO and AI search optimization in Hays, Kansas — get your business found on Google, ChatGPT, Perplexity, and Gemini.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "SEO & AI Search in Hays, Kansas",
    h1: "Local SEO and AI Search Optimization in Hays",
    subheadline:
      "Get found on Google, Google AI Overviews, ChatGPT, Perplexity, and Gemini — local SEO and AI-search optimization for Hays, Kansas businesses.",
    answerParagraph:
      "Preisser Solutions is headquartered in Hays, Kansas and delivers local SEO and AI-search optimization for Hays businesses and Ellis County operators. Services include Google Business Profile optimization, local pack strategy, citation building, schema markup, and AI-search citation engineering — so your Hays business is cited when AI answer engines respond to questions about your industry.",
  },

  nearbyAreas: [
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "12 mi W" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SE" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "Russell, KS", distanceLabel: "35 mi E" },
    { name: "Plainville, KS", href: "/locations/plainville-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD, HG_OIL_INVOICE_CARD],

  whyLocal: [
    "Preisser Solutions is headquartered in Hays. We are local to Ellis County — not a remote agency guessing at the market.",
    "AI-search visibility is a newer discipline than traditional SEO, and it is the primary growth area for local search in 2025-2026.",
    "SEO infrastructure is built in code — schema markup, structured data, content architecture — not in plugins.",
  ],

  industriesServed: [
    "Oil & Gas",
    "Agriculture",
    "Healthcare",
    "Trades",
    "Professional Services",
    "Higher Education",
  ],

  faq: [
    {
      question: "What is local SEO for a Hays, Kansas business?",
      answer:
        "Local SEO is the practice of optimizing your online presence so your business appears in Google's local pack, map results, and AI Overviews when people in Hays search for your services. It includes Google Business Profile, citations, schema markup, and on-site optimization.",
    },
    {
      question: "What is AI search optimization for Hays businesses?",
      answer:
        "AI search optimization means engineering your website and content so ChatGPT, Perplexity, Gemini, and Google AI Overviews cite your business when answering questions about your industry in Hays. It requires different techniques than traditional Google SEO.",
    },
    {
      question: "Does Preisser Solutions offer local SEO in Hays, Kansas?",
      answer:
        "Yes. Preisser Solutions is headquartered in Hays. Local SEO for Hays and Ellis County businesses is an explicit service line.",
    },
    {
      question: "How competitive is local SEO in Hays?",
      answer:
        "Hays is a regional hub for western Kansas — healthcare, oil and gas, education, and trades businesses all compete for local search presence. AI-search optimization is still an early-mover opportunity.",
    },
    {
      question: "Can Preisser Solutions get a Hays business cited by ChatGPT?",
      answer:
        "Yes. AI-search citation engineering — the technical and content work required to be cited by ChatGPT, Perplexity, and Gemini — is an explicit service. We have engineered this for our own site and for client properties.",
    },
    {
      question: "Does Preisser Solutions handle Google Business Profile for Hays clients?",
      answer:
        "Yes. Google Business Profile optimization — categories, attributes, posts, Q&A, review strategy, photo strategy — is part of every local SEO engagement.",
    },
  ],

  cta: {
    headline: "Ready to dominate local search in Hays?",
    subcopy:
      "Book a free scoping call. We will audit your current search presence and map a path to Google and AI-search visibility.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hays-kansas-digital-marketing",
    "salina-kansas-seo",
    "great-bend-kansas-digital-marketing",
  ],
};
