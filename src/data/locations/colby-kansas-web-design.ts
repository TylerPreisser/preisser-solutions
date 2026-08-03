import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/colby-kansas-web-design
 * Colby, KS — Thomas County. Far western Kansas.
 */
export const locationData: LocationPageData = {
  slug: "colby-kansas-web-design",
  city: "Colby",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 39.395, lng: -101.052 },

  metaTitle: "Colby, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Colby, Kansas — built by a nearby Hays-based firm.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Colby, Kansas",
    h1: "Custom Software and Websites for Colby Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Thomas County operators along the I-70 corridor.",
    answerParagraph:
      "Preisser Solutions serves Colby, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays, roughly two hours east on I-70, we deliver remotely and travel for projects of sufficient scope. Custom code, fixed-price proposals, full ownership.",
  },

  nearbyAreas: [
    { name: "Goodland, KS", href: "/locations/goodland-kansas-web-design", distanceLabel: "55 mi W" },
    { name: "Oakley, KS", href: "/locations/oakley-kansas-web-design", distanceLabel: "30 mi E" },
    { name: "Quinter, KS", distanceLabel: "55 mi E" },
    { name: "Hoxie, KS", distanceLabel: "35 mi N" },
    { name: "Atwood, KS", distanceLabel: "40 mi NW" },
    { name: "Rexford, KS", distanceLabel: "20 mi N" },
    { name: "Brewster, KS", distanceLabel: "20 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "120 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Western-Kansas firm that understands the operating context for far-western ag, energy, and trades businesses.",
    "Custom code with full ownership transferred at launch. No proprietary platform.",
    "Travel for in-person scoping and milestone meetings is standard for projects of meaningful scope.",
  ],

  industriesServed: [
    "Agriculture",
    "Energy",
    "Trades",
    "Hospitality",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Colby, Kansas?",
      answer:
        "Yes. Colby is within the firm's regional service area. Build work is delivered remotely, with travel for in-person scoping and milestone meetings for projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Colby?",
      answer:
        "About 120 miles east via I-70, roughly two hours. Travel for in-person work is treated as a normal part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Colby businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization.",
    },
    {
      question: "Can Preisser Solutions build a custom website for a Colby ag operator?",
      answer:
        "Yes. Custom websites and operational tools for ag operators are part of the standard offering.",
    },
    {
      question: "Do you offer local SEO and AI search in Colby?",
      answer:
        "Yes. Local SEO and AI-search visibility — citations on Google AI Overviews, ChatGPT, Perplexity, and Gemini — are an explicit service line.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Kansas marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites and local search are scoped when in play; the firm builds internal tools and automation as the primary offering.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Colby?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "wakeeney-kansas-web-design", "garden-city-kansas", "western-kansas-web-design"],
};
