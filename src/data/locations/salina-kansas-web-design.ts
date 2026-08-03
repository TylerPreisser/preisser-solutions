import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/salina-kansas-web-design
 */
export const locationData: LocationPageData = {
  slug: "salina-kansas-web-design",
  city: "Salina",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.840, lng: -97.611 },

  metaTitle: "Web Design in Salina, Kansas",
  metaDescription:
    "Custom websites for Salina, Kansas businesses — fast, SEO-strong, AI-search ready. Built by a Hays-based firm.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Web Design in Salina, Kansas",
    h1: "Custom Web Design for Salina Businesses",
    subheadline:
      "Custom websites — engineered for performance, conversion, and AI search visibility.",
    answerParagraph:
      "Preisser Solutions builds custom websites for Salina, Kansas businesses — fast, conversion-engineered, and optimized for both Google and AI search. Based in Hays, an hour and a half west on I-70. No templates. Custom code, fixed-price proposals, full ownership at launch.",
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
    "Hays-based firm an easy drive west on I-70. In-person scoping is standard.",
    "Custom code, not templates — your site is engineered, not assembled.",
    "Built for AI search visibility — citations on Google AI Overviews, ChatGPT, Perplexity, and Gemini.",
  ],

  industriesServed: ["Manufacturing", "Agriculture", "Distribution & Logistics", "Trades", "Professional Services"],

  faq: [
    {
      question: "Does Preisser Solutions build custom websites for Salina businesses?",
      answer:
        "Yes. Custom website builds are one of four primary service lines, available to Salina businesses and operators across central Kansas.",
    },
    {
      question: "What makes a Preisser Solutions site different from a templated site?",
      answer:
        "Custom code with full ownership at launch — Next.js, React, TypeScript. Fast page loads, real SEO architecture, AI-search visibility, no platform lock-in.",
    },
    {
      question: "How long does a Salina website project take?",
      answer:
        "Typical custom marketing sites ship in four to eight weeks depending on scope. Timeline and milestones are written into the proposal.",
    },
    {
      question: "Do you handle SEO and AI search for Salina sites?",
      answer:
        "Yes. Local SEO and AI-search optimization are scoped as part of the website engagement or as a standalone service.",
    },
    {
      question: "How far is Hays from Salina?",
      answer:
        "About 95 miles via I-70 — roughly an hour and a half. In-person scoping is straightforward.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Salina marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites are scoped as part of broader engagements, with full code ownership and modern infrastructure.",
    },
  ],

  cta: {
    headline: "Ready for a website that earns its keep?",
    subcopy:
      "Book a free scoping call. We will map your goals and identify the right scope for your Salina site.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["salina-kansas", "hays-kansas", "manhattan-kansas", "wichita-kansas"],
};
