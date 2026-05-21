import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/great-bend-kansas
 * Central Kansas. Barton County.
 */
export const locationData: LocationPageData = {
  slug: "great-bend-kansas",
  city: "Great Bend",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.364, lng: -98.765 },

  metaTitle: "Custom Software in Great Bend, Kansas | Preisser Solutions",
  metaDescription:
    "Custom software, AI automation, and custom websites for Great Bend, Kansas businesses — based in Hays, KS, delivered locally.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Great Bend, Kansas",
    h1: "Custom Software for Great Bend Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Barton County operators across ag, oil and gas, and trades.",
    answerParagraph:
      "Preisser Solutions serves Great Bend, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays — roughly an hour east on US-281 — we deliver locally and remotely. Custom code, fixed-price proposals, full ownership at launch.",
  },

  nearbyAreas: [
    { name: "Hoisington, KS", distanceLabel: "10 mi N" },
    { name: "Larned, KS", distanceLabel: "20 mi SW" },
    { name: "Lyons, KS", distanceLabel: "30 mi E" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "55 mi E" },
    { name: "Russell, KS", distanceLabel: "30 mi N" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "Ellinwood, KS", distanceLabel: "10 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "50 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Hays-based firm an hour away on US-281. In-person scoping calls are routine, not a special request.",
    "We understand the ag, oilfield, and trades operating context of central Kansas without having it explained.",
    "Custom code with full ownership transferred at launch. No proprietary platform.",
  ],

  industriesServed: [
    "Oilfield Services",
    "Agriculture",
    "Trades",
    "Manufacturing",
    "Professional Services",
    "Healthcare Practices",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Great Bend, Kansas?",
      answer:
        "Yes. Great Bend is within the firm's primary service radius — roughly 50 miles east of Hays on US-281. In-person scoping and milestone meetings are standard.",
    },
    {
      question: "How far is Hays from Great Bend?",
      answer:
        "About 50 miles, roughly an hour east via US-281. Travel for in-person work is treated as a normal part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Great Bend businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization. Common engagements include inventory systems, document processing, and workflow automation.",
    },
    {
      question: "Can Preisser Solutions build software for a Great Bend oilfield services operator?",
      answer:
        "Yes. Western and central Kansas oilfield services is a core vertical. Inventory, dispatch, and back-office automation are recurring engagements, informed by internal builds at HG Oil Holdings.",
    },
    {
      question: "Do you offer AI invoice processing in Great Bend?",
      answer:
        "Yes. AI invoice processing is a packaged service offering — the engine extracts vendor, line items, totals, and GL codes from any invoice format and routes for approval.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Great Bend marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Website and AI-search work are scoped when in play, but the firm's center of gravity is internal tooling and automation.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Great Bend?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "salina-kansas", "western-kansas-web-design", "wakeeney-kansas-web-design"],
};
