import type { LocationPageData } from "@/types/location";
import { IRON_AND_OAK_CARD, STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/hays-kansas-web-design
 * Web-design intent variant of the home market.
 */
export const locationData: LocationPageData = {
  slug: "hays-kansas-web-design",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Web Design in Hays, Kansas | Preisser Solutions",
  metaDescription:
    "Custom website design in Hays, Kansas — fast, SEO-strong, AI-search ready. Built locally by Preisser Solutions.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Web Design in Hays, Kansas",
    h1: "Custom Web Design for Hays Businesses",
    subheadline:
      "Custom websites — engineered for performance, conversion, and AI search visibility. Local team.",
    answerParagraph:
      "Preisser Solutions is a Hays, Kansas custom-software firm that builds custom websites for local businesses — fast, conversion-engineered, and optimized for both Google and AI search. No templates. Custom code, fixed-price proposals, full ownership at launch. In-person scoping calls available locally.",
  },

  nearbyAreas: [
    { name: "Russell, KS", distanceLabel: "28 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "50 mi E" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "37 mi W" },
    { name: "Plainville, KS", distanceLabel: "15 mi N" },
    { name: "Ellis, KS", distanceLabel: "15 mi W" },
    { name: "Hill City, KS", distanceLabel: "55 mi NW" },
    { name: "La Crosse, KS", distanceLabel: "40 mi SE" },
    { name: "Stockton, KS", distanceLabel: "40 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [IRON_AND_OAK_CARD],

  whyLocal: [
    "Local team — in-person scoping calls and downtown meetings are routine.",
    "Custom code, not templates — your site is engineered, not assembled.",
    "Built for AI search visibility, not just Google.",
  ],

  industriesServed: [
    "Trades",
    "Professional Services",
    "Oilfield Services",
    "Healthcare Practices",
    "Hospitality",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build custom websites in Hays?",
      answer:
        "Yes. Custom website design is one of four primary service lines, delivered locally to Hays businesses.",
    },
    {
      question: "What makes a Preisser Solutions site different from a Wix or Squarespace site?",
      answer:
        "Custom code with full ownership at launch — Next.js, React, TypeScript. Fast page loads, real SEO architecture, AI-search visibility, no platform lock-in.",
    },
    {
      question: "How long does a Hays website project take?",
      answer:
        "Typical custom marketing sites ship in four to eight weeks depending on scope. Timeline and milestones are written into the proposal.",
    },
    {
      question: "Do you handle SEO and AI search for Hays sites?",
      answer:
        "Yes. Local SEO and AI-search optimization are scoped as part of the website engagement or as a standalone service.",
    },
    {
      question: "Are you local to Hays?",
      answer:
        "Yes. The firm operates out of Hays full-time, with in-person scoping calls and meetings as standard.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Hays marketing agency?",
      answer:
        "Preisser Solutions is a custom-software firm. Websites are built with the same engineering discipline as the internal tools and AI automation work.",
    },
  ],

  cta: {
    headline: "Ready for a website that earns its keep?",
    subcopy:
      "Book a free scoping call. We will map your goals and identify the right scope for your Hays site.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "hays-kansas-web-development", "hays-kansas-web-applications", "hays-kansas-custom-software"],
};
