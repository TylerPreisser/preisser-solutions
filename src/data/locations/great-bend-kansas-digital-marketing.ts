import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/great-bend-kansas-digital-marketing
 * Search-targeted variant — digital marketing intent.
 */
export const locationData: LocationPageData = {
  slug: "great-bend-kansas-digital-marketing",
  city: "Great Bend",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.364, lng: -98.765 },

  metaTitle: "Digital Marketing in Great Bend, KS",
  metaDescription:
    "Local SEO, AI-search optimization, and custom websites for Great Bend, Kansas — built by a nearby Hays-based firm.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Digital Marketing in Great Bend, Kansas",
    h1: "Digital Marketing for Great Bend Businesses",
    subheadline:
      "Local SEO, AI-search visibility, and custom marketing sites — engineered to actually move the needle.",
    answerParagraph:
      "Preisser Solutions delivers local SEO, AI-search optimization, and custom websites for Great Bend, Kansas businesses. Based in Hays, an hour west on US-281. The firm's marketing engine layers schema architecture, citation work, content engineering, and AI-search optimization on top of fast custom websites. No retainer-forever billing.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "50 mi NW" },
    { name: "Hoisington, KS", distanceLabel: "10 mi N" },
    { name: "Larned, KS", distanceLabel: "20 mi SW" },
    { name: "Lyons, KS", distanceLabel: "30 mi E" },
    { name: "Russell, KS", distanceLabel: "30 mi N" },
    { name: "Hutchinson, KS", distanceLabel: "55 mi E" },
    { name: "Pratt, KS", distanceLabel: "50 mi S" },
    { name: "Ellinwood, KS", distanceLabel: "10 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Hays-based firm an hour away on US-281 — local context built into every campaign.",
    "Engineered for both Google search and the AI-search ecosystem (ChatGPT, Perplexity, Gemini, Google AI Overviews).",
    "Fixed-price scoping, no retainer-forever billing.",
  ],

  industriesServed: ["Oilfield Services", "Agriculture", "Trades", "Hospitality", "Professional Services"],

  faq: [
    {
      question: "Does Preisser Solutions offer digital marketing in Great Bend?",
      answer:
        "Yes. Local SEO, AI-search optimization, and custom marketing websites are explicit service lines for Great Bend businesses.",
    },
    {
      question: "What is AI search optimization?",
      answer:
        "Engineering a site, content, schema, and citation footprint so AI engines — ChatGPT, Perplexity, Gemini, Google AI Overviews — cite it when users ask relevant questions.",
    },
    {
      question: "How do you measure SEO results?",
      answer:
        "Citation tracking on AI engines, Google rank positions, organic traffic, and lead volume — all reported on a monthly cadence.",
    },
    {
      question: "How long does SEO take to show results?",
      answer:
        "Local search visibility often moves within sixty to ninety days for well-engineered sites. AI-search citations can move faster when schema and content architecture are correct.",
    },
    {
      question: "Do you handle paid ads too?",
      answer:
        "The primary offering is organic search and AI-search visibility. Paid ads can be scoped on a case-by-case basis when they make sense alongside the build.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Great Bend marketing agency?",
      answer:
        "Preisser Solutions is a custom-software firm that includes AI-search and SEO as part of the build. Marketing is engineered into the website, not retrofitted on top of a template.",
    },
  ],

  cta: {
    headline: "Ready to actually get found in Great Bend?",
    subcopy:
      "Book a free scoping call. We will audit your current visibility and identify the highest-leverage moves.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["great-bend-kansas", "great-bend-kansas-web-design", "hays-kansas", "wichita-kansas"],
};
