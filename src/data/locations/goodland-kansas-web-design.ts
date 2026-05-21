import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "goodland-kansas-web-design",
  city: "Goodland",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 39.352, lng: -101.711 },

  metaTitle: "Web Design & Custom Software in Goodland, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Goodland, Kansas — built by a Hays-based firm serving the I-70 western terminus.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Goodland, Kansas",
    h1: "Custom Software and Websites for Goodland Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Sherman County ag, trucking, and trades operators at the western end of I-70.",
    answerParagraph:
      "Preisser Solutions serves Goodland, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays — roughly 160 miles east on I-70 — we deliver remotely and travel for projects of meaningful scope. Custom code, fixed-price proposals, full ownership at launch.",
  },

  nearbyAreas: [
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "55 mi E" },
    { name: "Oakley, KS", href: "/locations/oakley-kansas-web-design", distanceLabel: "70 mi E" },
    { name: "Burlington, CO", href: "/locations/burlington-colorado-web-design", distanceLabel: "35 mi W" },
    { name: "St. Francis, KS", distanceLabel: "45 mi N" },
    { name: "Tribune, KS", distanceLabel: "70 mi S" },
    { name: "Sharon Springs, KS", distanceLabel: "30 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "160 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "95 mi SE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Western Kansas firm that understands the agricultural, trucking, and energy operating context of Sherman County.",
    "Custom code with full ownership at launch — no templates, no platform lock-in.",
    "Travel for in-person scoping and milestone meetings is standard for projects of sufficient scope.",
  ],

  industriesServed: [
    "Agriculture",
    "Trucking & Logistics",
    "Trades",
    "Hospitality",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Goodland, Kansas?",
      answer:
        "Yes. Goodland is within the firm's regional service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Goodland?",
      answer:
        "About 160 miles east via I-70, roughly two hours and fifteen minutes. Travel for in-person work is treated as a standard part of the engagement, not a special arrangement.",
    },
    {
      question: "What does Preisser Solutions build for Goodland businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization for ag operators, trucking companies, and trades businesses.",
    },
    {
      question: "Can Preisser Solutions build a website for a Goodland trucking company?",
      answer:
        "Yes. Custom websites and operational tools for trucking and logistics operators are a documented service. Load-tracking interfaces, driver portals, and customer-facing quote tools are all within scope.",
    },
    {
      question: "Do you serve ag operations along the I-70 corridor near Goodland?",
      answer:
        "Yes. Agricultural businesses along the western Kansas I-70 corridor are a core vertical. Custom inventory platforms, field reporting tools, and vendor-management automation are recurring builds.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Kansas marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Website and local-search work are in scope when relevant; the primary offering is custom internal tooling, dashboards, and automation.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Goodland?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["colby-kansas-web-design", "hays-kansas", "oakley-kansas-web-design", "burlington-colorado-web-design"],
};
