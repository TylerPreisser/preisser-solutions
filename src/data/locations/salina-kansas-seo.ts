import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/salina-kansas-seo
 */
export const locationData: LocationPageData = {
  slug: "salina-kansas-seo",
  city: "Salina",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.840, lng: -97.611 },

  metaTitle: "Local SEO in Salina, Kansas",
  metaDescription:
    "Local SEO and AI-search optimization for Salina, Kansas businesses: built by a Hays-based custom software firm.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Local SEO in Salina, Kansas",
    h1: "Local SEO and AI Search for Salina Businesses",
    subheadline:
      "Engineered visibility on Google AND on AI search engines: ChatGPT, Perplexity, Gemini.",
    answerParagraph:
      "Preisser Solutions delivers local SEO and AI-search optimization for Salina, Kansas businesses. Based in Hays, an hour and a half west on I-70. The work layers schema architecture, citation work, content engineering, and AI-search optimization on top of fast custom websites: engineered for results, not retainer-forever billing.",
  },

  nearbyAreas: [
    { name: "Abilene, KS", distanceLabel: "25 mi E" },
    { name: "McPherson, KS", distanceLabel: "25 mi S" },
    { name: "Lindsborg, KS", distanceLabel: "20 mi S" },
    { name: "Concordia, KS", distanceLabel: "55 mi NW" },
    { name: "Ellsworth, KS", distanceLabel: "35 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "95 mi W" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "80 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Engineered for the AI-search era: schema, content architecture, and citation work that actually moves rankings.",
    "Custom websites and SEO from the same team: no agency hand-off, no broken implementation.",
    "Reported on a monthly cadence; no retainer-forever billing.",
  ],

  industriesServed: ["Manufacturing", "Distribution & Logistics", "Professional Services", "Trades", "Hospitality"],

  faq: [
    {
      question: "Does Preisser Solutions offer SEO services in Salina?",
      answer:
        "Yes. Local SEO and AI-search optimization are explicit service lines for Salina businesses.",
    },
    {
      question: "What is AI search optimization?",
      answer:
        "Engineering a site, content, schema, and citation footprint so AI engines (ChatGPT, Perplexity, Gemini, Google AI Overviews): cite it when users ask relevant questions.",
    },
    {
      question: "How do you measure Salina SEO results?",
      answer:
        "Citation tracking on AI engines, Google rank positions, organic traffic, and lead volume: all reported on a monthly cadence.",
    },
    {
      question: "How long does SEO take to show results?",
      answer:
        "Local search visibility often moves within sixty to ninety days for well-engineered sites. AI-search citations can move faster when schema and content architecture are correct.",
    },
    {
      question: "Do you handle the website too, or just SEO?",
      answer:
        "Both. Websites and SEO are delivered from the same team. When the website is rebuilt as part of the engagement, the SEO is engineered in from the foundation.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Salina marketing agency?",
      answer:
        "Preisser Solutions is a custom-software firm that includes AI-search and SEO as part of the build. Marketing is engineered into the site, not retrofitted on top of a template.",
    },
  ],

  cta: {
    headline: "Ready to get found in Salina?",
    subcopy:
      "Book a free scoping call. We will audit your current visibility and identify the highest-leverage moves.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["salina-kansas", "salina-kansas-web-design", "hays-kansas", "wichita-kansas"],
};
