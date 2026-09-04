import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/dodge-city-kansas-web-design
 * Search-targeted variant. Same geography as /locations/dodge-city-kansas,
 * different query intent.
 */
export const locationData: LocationPageData = {
  slug: "dodge-city-kansas-web-design",
  city: "Dodge City",
  state: "Kansas",
  region: "Southwest Kansas",
  coordinates: { lat: 37.752, lng: -100.018 },

  metaTitle: "Web Design in Dodge City, Kansas",
  metaDescription:
    "Custom websites for Dodge City, Kansas businesses: fast, SEO-strong, AI-search ready. Built by a Hays-based firm.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Web Design in Dodge City, Kansas",
    h1: "Custom Web Design for Dodge City Businesses",
    subheadline:
      "Custom websites: engineered for performance, conversion, and AI search visibility.",
    answerParagraph:
      "Preisser Solutions builds custom websites for Dodge City, Kansas businesses: fast, conversion-engineered, and optimized for both Google and AI search. Based in Hays, roughly an hour and a half north on US-283. No templates. Custom code, fixed-price proposals, full ownership at launch.",
  },

  nearbyAreas: [
    { name: "Garden City, KS", href: "/locations/garden-city-kansas", distanceLabel: "50 mi W" },
    { name: "Liberal, KS", distanceLabel: "85 mi S" },
    { name: "Spearville, KS", distanceLabel: "20 mi E" },
    { name: "Cimarron, KS", distanceLabel: "20 mi W" },
    { name: "Greensburg, KS", distanceLabel: "45 mi E" },
    { name: "Jetmore, KS", distanceLabel: "35 mi N" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "90 mi N" },
    { name: "Bucklin, KS", distanceLabel: "20 mi SE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Western-Kansas firm that understands the audience and the market.",
    "Custom code, no templates: your site is engineered, not assembled.",
    "Built for AI search visibility: citations on Google AI Overviews, ChatGPT, Perplexity, and Gemini.",
  ],

  industriesServed: ["Agriculture", "Trades", "Energy", "Hospitality", "Professional Services"],

  faq: [
    {
      question: "Does Preisser Solutions build custom websites for Dodge City businesses?",
      answer:
        "Yes. Custom website builds are one of four primary service lines, available to Dodge City businesses and operators across southwest Kansas.",
    },
    {
      question: "What makes a Preisser Solutions website different from a Wix or Squarespace site?",
      answer:
        "Custom code with full ownership at launch: Next.js, React, TypeScript. Fast page loads, real SEO architecture, AI-search visibility, no platform lock-in.",
    },
    {
      question: "How long does a Dodge City website project take?",
      answer:
        "Typical custom marketing sites ship in four to eight weeks depending on scope. Timeline and milestones are written into the proposal.",
    },
    {
      question: "Do you handle SEO and AI search for Dodge City sites?",
      answer:
        "Yes. Local SEO and AI-search optimization are scoped as part of the website engagement or as a standalone service.",
    },
    {
      question: "How far is Hays from Dodge City?",
      answer:
        "About 90 miles via US-283: roughly an hour and a half. In-person scoping is available.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Dodge City marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites are scoped as part of broader engagements, with full code ownership and modern infrastructure.",
    },
  ],

  cta: {
    headline: "Ready for a website that earns its keep?",
    subcopy:
      "Book a free scoping call. We will map your goals and identify the right scope for your Dodge City site.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["dodge-city-kansas", "garden-city-kansas", "hays-kansas", "western-kansas-web-design"],
};
