import type { LocationPageData } from "@/types/location";
import {
  HG_OIL_INVENTORY_CARD,
  STANDARD_PROCESS,
  STANDARD_SERVICE_CARDS,
} from "./shared";

/**
 * /locations/wakeeney-kansas-web-design
 * WaKeeney, KS — Trego County. I-70 corridor.
 */
export const locationData: LocationPageData = {
  slug: "wakeeney-kansas-web-design",
  city: "WaKeeney",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 39.026, lng: -99.881 },

  metaTitle: "WaKeeney, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for WaKeeney, Kansas: built by a nearby Hays-based firm.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving WaKeeney, Kansas",
    h1: "Custom Software and Websites for WaKeeney Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Trego County operators along I-70 in western Kansas.",
    answerParagraph:
      "Preisser Solutions serves WaKeeney, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays (roughly 37 miles east on I-70): we deliver locally and remotely. Custom code, fixed-price proposals, full ownership.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "37 mi E" },
    { name: "Ellis, KS", distanceLabel: "22 mi E" },
    { name: "Quinter, KS", distanceLabel: "25 mi W" },
    { name: "Ogallah, KS", distanceLabel: "10 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "30 mi N" },
    { name: "Ransom, KS", distanceLabel: "30 mi S" },
    { name: "Trego Center, KS", distanceLabel: "5 mi N" },
    { name: "Collyer, KS", distanceLabel: "13 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD],

  whyLocal: [
    "Hays is a 37-mile drive east on I-70: in-person scoping is straightforward.",
    "We understand the western-Kansas operating context for ag, oilfield, and trades businesses.",
    "Custom code with full ownership transferred at launch. No proprietary platform.",
  ],

  industriesServed: [
    "Agriculture",
    "Oilfield Services",
    "Trades",
    "Professional Services",
    "Hospitality",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve WaKeeney, Kansas?",
      answer:
        "Yes. WaKeeney is within the firm's primary service radius: 37 miles west of Hays on I-70. In-person scoping is straightforward.",
    },
    {
      question: "How far is Hays from WaKeeney?",
      answer:
        "About 37 miles east via I-70: roughly 35 minutes. Travel for in-person work is treated as part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for WaKeeney businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization.",
    },
    {
      question: "Can Preisser Solutions build a custom website for a WaKeeney ag operator?",
      answer:
        "Yes. Custom websites and operational tools for ag operators are part of the standard offering.",
    },
    {
      question: "Do you offer AI invoice processing in WaKeeney?",
      answer:
        "Yes. AI invoice processing is a packaged service offering: the engine extracts vendor, line items, and GL codes from any invoice format and routes for approval.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Kansas marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites and local SEO are scoped when in play, but the firm builds internal tools and automation as the primary offering.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in WaKeeney?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "ellis-kansas-web-design", "colby-kansas-web-design", "western-kansas-web-design"],
};
