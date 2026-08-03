import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/dodge-city-kansas
 * Southwest Kansas. Ford County.
 */
export const locationData: LocationPageData = {
  slug: "dodge-city-kansas",
  city: "Dodge City",
  state: "Kansas",
  region: "Southwest Kansas",
  coordinates: { lat: 37.752, lng: -100.018 },

  metaTitle: "Custom Software in Dodge City, Kansas",
  metaDescription:
    "Custom software, AI automation, and custom websites for Dodge City, Kansas businesses — based in Hays, KS, delivered statewide.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Dodge City, Kansas",
    h1: "Custom Software for Dodge City Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for southwest Kansas operators along US-50 and US-283.",
    answerParagraph:
      "Preisser Solutions serves Dodge City, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays — roughly an hour and a half north on US-283 — we deliver remotely and travel for projects of sufficient scope. Fixed-price proposals, custom code, full ownership.",
  },

  nearbyAreas: [
    { name: "Garden City, KS", href: "/locations/garden-city-kansas", distanceLabel: "50 mi W" },
    { name: "Liberal, KS", distanceLabel: "85 mi S" },
    { name: "Spearville, KS", distanceLabel: "20 mi E" },
    { name: "Cimarron, KS", distanceLabel: "20 mi W" },
    { name: "Bucklin, KS", distanceLabel: "20 mi SE" },
    { name: "Jetmore, KS", distanceLabel: "35 mi N" },
    { name: "Greensburg, KS", distanceLabel: "45 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "90 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Western-Kansas firm that understands the working day for ag, energy, and distribution operators in this region.",
    "Custom code with full ownership transferred at launch — your repo, your infrastructure.",
    "Travel for in-person scoping and milestone meetings is standard for projects of meaningful scope.",
  ],

  industriesServed: [
    "Agriculture",
    "Food Processing",
    "Energy",
    "Trades",
    "Distribution & Logistics",
    "Hospitality",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Dodge City, Kansas?",
      answer:
        "Yes. Dodge City and the surrounding Ford County market are within the firm's regular service region. Build work is delivered remotely with travel for in-person scoping and milestone meetings.",
    },
    {
      question: "How far is Hays from Dodge City?",
      answer:
        "About 90 miles, roughly an hour and a half south via US-283. Travel for in-person work is treated as a normal part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Dodge City businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization. Common engagements include inventory systems, workflow automation, and document processing.",
    },
    {
      question: "Can Preisser Solutions automate operations for a Dodge City ag or food-processing operator?",
      answer:
        "Yes. Workflow automation, custom inventory, and AI document processing are recurring engagements. The HG Oil Holdings inventory platform is a directly applicable reference build.",
    },
    {
      question: "Do you offer AI invoice processing in Dodge City?",
      answer:
        "Yes. AI invoice processing is a packaged service offering. The engine extracts vendor, line items, totals, and GL codes from any invoice format, trained on each client's vendor data.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Dodge City marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites and AI search are in scope when relevant, but the firm's center of gravity is internal tooling and automation pipelines.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Dodge City?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "garden-city-kansas", "great-bend-kansas", "western-kansas-web-design"],
};
