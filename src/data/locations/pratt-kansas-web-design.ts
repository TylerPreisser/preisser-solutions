import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "pratt-kansas-web-design",
  city: "Pratt",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 37.643, lng: -98.737 },

  metaTitle: "Pratt, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Pratt, Kansas: built by a Hays-based firm for the US-54 hub market.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Pratt, Kansas",
    h1: "Custom Software and Websites for Pratt Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Pratt County's agriculture, energy services, and trades economy at the US-54 crossroads.",
    answerParagraph:
      "Preisser Solutions serves Pratt, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Pratt County sits at the junction of US-54 and US-281, serving as a south-central Kansas hub for the surrounding ag and energy corridor. Based in Hays (roughly 110 miles north): we deliver remotely and travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "50 mi N" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "70 mi NE" },
    { name: "Liberal, KS", href: "/locations/liberal-kansas-web-design", distanceLabel: "100 mi W" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "60 mi NE" },
    { name: "Stafford, KS", distanceLabel: "20 mi N" },
    { name: "Kingman, KS", distanceLabel: "35 mi E" },
    { name: "Medicine Lodge, KS", distanceLabel: "35 mi S" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "110 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Pratt County's ag and energy-services economy is familiar operating territory: no orientation required to understand the context of a custom grain-marketing tool or field-service management app.",
    "South-central Kansas is underserved digitally. A custom website with proper local SEO can achieve dominant local visibility quickly.",
    "Custom code with full ownership at launch. No recurring license fees on production software.",
  ],

  industriesServed: [
    "Agriculture",
    "Energy Services",
    "Trades",
    "Professional Services",
    "Hospitality",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Pratt, Kansas?",
      answer:
        "Yes. Pratt is within the firm's south-central Kansas service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings for projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Pratt?",
      answer:
        "About 110 miles north via US-281, roughly an hour and a half. Travel for in-person work is standard for projects of meaningful scope.",
    },
    {
      question: "What does Preisser Solutions build for Pratt businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization for ag operators, energy-services businesses, and trades firms along the US-54 corridor.",
    },
    {
      question: "Can Preisser Solutions build a custom website for a Pratt ag-services operator?",
      answer:
        "Yes. Custom websites for ag-services businesses (built for speed, conversion, and AI-search visibility) are a standard engagement. Local SEO and AI-search citations are available as part of the same scope.",
    },
    {
      question: "Do you offer AI automation for Pratt-area energy services businesses?",
      answer:
        "Yes. Energy-services operators benefit from custom field-reporting tools, invoice processing automation, and compliance-document management. These are recurring builds for the ag and energy corridor.",
    },
    {
      question: "What makes Preisser Solutions suited for a smaller market like Pratt?",
      answer:
        "Fixed-price proposals scaled to engagement complexity, full code ownership, and no ongoing platform dependency. Smaller markets get the same quality build as larger clients, scoped appropriately.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Pratt?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["great-bend-kansas", "wichita-kansas", "hutchinson-kansas-web-design", "hays-kansas"],
};
