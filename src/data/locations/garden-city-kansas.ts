import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/garden-city-kansas
 * Southwest Kansas. Finney County.
 */
export const locationData: LocationPageData = {
  slug: "garden-city-kansas",
  city: "Garden City",
  state: "Kansas",
  region: "Southwest Kansas",
  coordinates: { lat: 37.972, lng: -100.873 },

  metaTitle: "Custom Software in Garden City, Kansas",
  metaDescription:
    "Custom software, AI automation, and custom websites for Garden City, Kansas businesses — based in Hays, KS, delivered statewide.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Garden City, Kansas",
    h1: "Custom Software for Garden City Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for southwest Kansas ag, energy, and operations.",
    answerParagraph:
      "Preisser Solutions serves Garden City, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays — roughly two and a half hours northeast on US-83 — we deliver remotely and travel for projects of sufficient scope. Custom code, full ownership, fixed-price proposals.",
  },

  nearbyAreas: [
    { name: "Holcomb, KS", distanceLabel: "8 mi W" },
    { name: "Dodge City, KS", href: "/locations/dodge-city-kansas", distanceLabel: "50 mi E" },
    { name: "Scott City, KS", distanceLabel: "40 mi N" },
    { name: "Liberal, KS", distanceLabel: "60 mi S" },
    { name: "Lakin, KS", distanceLabel: "20 mi W" },
    { name: "Ulysses, KS", distanceLabel: "30 mi SW" },
    { name: "Cimarron, KS", distanceLabel: "20 mi E" },
    { name: "Sublette, KS", distanceLabel: "30 mi SW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Western-Kansas firm that understands the operating context — ag, energy, distribution — without needing it explained over Zoom.",
    "Custom code with full ownership. Your repo, your infrastructure, no proprietary platform.",
    "Travel for in-person scoping and milestone meetings is standard for projects of meaningful scope.",
  ],

  industriesServed: [
    "Agriculture",
    "Food Processing",
    "Energy",
    "Distribution & Logistics",
    "Trades",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Garden City, Kansas?",
      answer:
        "Yes. Garden City and the surrounding Finney County market are within the firm's regular service region. Build work is delivered remotely, with travel for scoping and milestone meetings for projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Garden City?",
      answer:
        "About 150 miles, roughly two and a half hours via US-83. Travel for in-person work is treated as a normal part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Garden City businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization. Common engagements include workflow automation, inventory systems, and document processing for ag and logistics operators.",
    },
    {
      question: "Can Preisser Solutions build automation for a Garden City ag or food-processing operator?",
      answer:
        "Yes. Workflow automation, custom inventory, and AI document processing are recurring engagements. The HG Oil Holdings inventory platform is directly transferable to ag and food-processing inventory needs.",
    },
    {
      question: "Do you offer AI search and local SEO in Garden City?",
      answer:
        "Yes. Local SEO and AI-search visibility — citations on Google AI Overviews, ChatGPT, Perplexity, and Gemini — are an explicit service line.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Garden City marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Website and search work are scoped when in play, but the firm builds internal tools, dashboards, and AI agents as the primary offering.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Garden City?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "dodge-city-kansas", "colby-kansas-web-design", "western-kansas-web-design"],
};
