import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/manhattan-kansas-seo
 * Manhattan, KS — Riley County. SEO / AI search intent variant.
 */
export const locationData: LocationPageData = {
  slug: "manhattan-kansas-seo",
  city: "Manhattan",
  state: "Kansas",
  region: "Northeast Kansas & Flint Hills",
  coordinates: { lat: 39.183, lng: -96.572 },

  metaTitle: "SEO & AI Search in Manhattan, KS",
  metaDescription:
    "Local SEO and AI search optimization for Manhattan, Kansas businesses: get found on Google, ChatGPT, Perplexity, and Gemini.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "SEO & AI Search in Manhattan, Kansas",
    h1: "Local SEO and AI Search Optimization for Manhattan",
    subheadline:
      "Get found on Google, Google AI Overviews, ChatGPT, Perplexity, and Gemini: local SEO and AI-search optimization for Manhattan, Kansas businesses.",
    answerParagraph:
      "Preisser Solutions delivers local SEO and AI-search optimization for businesses in Manhattan, Kansas, a Riley County city of 55,000, home to Kansas State University and Fort Riley. Services include Google Business Profile optimization, local pack strategy, citation building, schema markup, and AI-search citation engineering for the Manhattan-Aggieville and broader Riley County market.",
  },

  nearbyAreas: [
    { name: "Junction City, KS", href: "/locations/junction-city-kansas-web-design", distanceLabel: "25 mi E" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "55 mi W" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "50 mi E" },
    { name: "Abilene, KS", distanceLabel: "45 mi W" },
    { name: "Emporia, KS", href: "/locations/emporia-kansas-web-design", distanceLabel: "90 mi SE" },
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "75 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "130 mi W" },
    { name: "Concordia, KS", distanceLabel: "65 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Manhattan's KSU community creates unique local search demand: restaurants, retail, services, and tech firms all compete for student and faculty attention.",
    "AI-search visibility is an early-mover opportunity in Manhattan; most businesses have not yet optimized for ChatGPT or Perplexity citations.",
    "SEO infrastructure built in code, not in plugins or marketing platforms.",
  ],

  industriesServed: [
    "Food & Beverage",
    "Retail",
    "Healthcare",
    "Professional Services",
    "Technology",
    "Education-Adjacent",
  ],

  faq: [
    {
      question: "Does Preisser Solutions offer local SEO for Manhattan, Kansas businesses?",
      answer:
        "Yes. Local SEO (Google Business Profile, local pack, citations, schema markup), and AI-search citation engineering are both offered for Manhattan businesses.",
    },
    {
      question: "How competitive is local SEO in Manhattan, Kansas?",
      answer:
        "Manhattan is a university city with active local search demand, especially for food, retail, and services targeting KSU students and staff. AI-search is still an early-mover opportunity.",
    },
    {
      question: "What is AI search optimization for a Manhattan business?",
      answer:
        "AI search optimization means engineering your content and site so ChatGPT, Perplexity, Gemini, and Google AI Overviews cite your business when users ask questions about your industry in Manhattan.",
    },
    {
      question: "Can Preisser Solutions improve Google rankings for a Manhattan restaurant?",
      answer:
        "Local SEO for restaurants (Google Business Profile, local pack, reviews strategy, schema markup) is within standard capability.",
    },
    {
      question: "Does Preisser Solutions help Manhattan businesses appear in AI Overviews?",
      answer:
        "Yes. Google AI Overview citation engineering is an explicit part of every AI-search optimization engagement.",
    },
    {
      question: "How does Preisser Solutions price SEO for Manhattan clients?",
      answer:
        "Initial SEO builds use fixed-price proposals. Ongoing work is scoped as optional retainers, never required.",
    },
  ],

  cta: {
    headline: "Ready to dominate local search in Manhattan?",
    subcopy:
      "Book a free scoping call. We will audit your current presence and map a path to Google and AI-search visibility.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "manhattan-kansas",
    "manhattan-kansas-custom-software",
    "salina-kansas-seo",
    "junction-city-kansas-web-design",
  ],
};
