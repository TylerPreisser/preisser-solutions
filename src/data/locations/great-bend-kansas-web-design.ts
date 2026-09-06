import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/great-bend-kansas-web-design
 */
export const locationData: LocationPageData = {
  slug: "great-bend-kansas-web-design",
  city: "Great Bend",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.364, lng: -98.765 },

  metaTitle: "Web Design in Great Bend, Kansas",
  metaDescription:
    "Custom websites for Great Bend, Kansas businesses: fast, SEO-strong, AI-search ready. Built by a nearby Hays-based firm.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Web Design in Great Bend, Kansas",
    h1: "Custom Web Design for Great Bend Businesses",
    subheadline:
      "Custom websites: engineered for performance, conversion, and AI search visibility.",
    answerParagraph:
      "Preisser Solutions builds custom websites for Great Bend, Kansas businesses: fast, conversion-engineered, and optimized for both Google and AI search. Based in Hays, roughly an hour west on US-281. No templates. Custom code, fixed-price proposals, full ownership at launch.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "50 mi NW" },
    { name: "Hoisington, KS", distanceLabel: "10 mi N" },
    { name: "Larned, KS", distanceLabel: "20 mi SW" },
    { name: "Lyons, KS", distanceLabel: "30 mi E" },
    { name: "Russell, KS", distanceLabel: "30 mi N" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "55 mi E" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "Ellinwood, KS", distanceLabel: "10 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Hays-based firm an hour away on US-281. In-person scoping is straightforward.",
    "Custom code, not templates: your site is engineered, not assembled.",
    "Built for AI search visibility: citations on Google AI Overviews, ChatGPT, Perplexity, and Gemini.",
  ],

  industriesServed: ["Oilfield Services", "Agriculture", "Trades", "Manufacturing", "Hospitality"],

  faq: [
    {
      question: "Does Preisser Solutions build custom websites for Great Bend businesses?",
      answer:
        "Yes. Custom website builds are one of four primary service lines, available to Great Bend businesses and operators across central Kansas.",
    },
    {
      question: "What makes a Preisser Solutions site different from a templated site?",
      answer:
        "Custom code with full ownership at launch: Next.js, React, TypeScript. Fast page loads, real SEO architecture, AI-search visibility, no platform lock-in.",
    },
    {
      question: "How long does a Great Bend website project take?",
      answer:
        "Typical custom marketing sites ship in four to eight weeks depending on scope. Timeline and milestones are written into the proposal.",
    },
    {
      question: "Do you handle SEO and AI search for Great Bend sites?",
      answer:
        "Yes. Local SEO and AI-search optimization are scoped as part of the website engagement or as a standalone service.",
    },
    {
      question: "How far is Hays from Great Bend?",
      answer:
        "About 50 miles via US-281: roughly an hour. In-person scoping is routine.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Great Bend marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites and AI-search work are in scope when relevant, with full code ownership and modern infrastructure.",
    },
  ],

  cta: {
    headline: "Ready for a website that earns its keep?",
    subcopy:
      "Book a free scoping call. We will map your goals and identify the right scope for your Great Bend site.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["great-bend-kansas", "hays-kansas", "salina-kansas", "western-kansas-web-design"],
};
