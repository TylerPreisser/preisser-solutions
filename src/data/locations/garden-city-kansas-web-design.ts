import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/garden-city-kansas-web-design
 * Garden City, KS — Finney County. Southwest Kansas. Web design intent variant.
 */
export const locationData: LocationPageData = {
  slug: "garden-city-kansas-web-design",
  city: "Garden City",
  state: "Kansas",
  region: "Southwest Kansas",
  coordinates: { lat: 37.972, lng: -100.873 },

  metaTitle: "Web Design & Custom Software in Garden City, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Garden City, Kansas — built by a nearby Kansas firm with fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Web Design in Garden City, Kansas",
    h1: "Custom Websites and Software for Garden City Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Finney County businesses in the Garden City agricultural and processing corridor.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Garden City, Kansas — the county seat of Finney County in southwest Kansas, a regional hub of approximately 27,000 anchored by beef processing, agriculture, and a diverse population along US-50 and US-83. Remote delivery with on-site travel available.",
  },

  nearbyAreas: [
    { name: "Dodge City, KS", href: "/locations/dodge-city-kansas", distanceLabel: "52 mi E" },
    { name: "Liberal, KS", href: "/locations/liberal-kansas-web-design", distanceLabel: "75 mi S" },
    { name: "Lakin, KS", distanceLabel: "20 mi W" },
    { name: "Scott City, KS", distanceLabel: "40 mi N" },
    { name: "Ulysses, KS", distanceLabel: "60 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "165 mi NE" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "90 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "115 mi NE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Southwest Kansas ag and processing context — Garden City's diverse, fast-growing economy includes beef processing, irrigation, and a significant multilingual business community.",
    "Custom code with full ownership at launch. No SaaS platform dependency after handoff.",
    "Remote delivery from Hays with on-site travel for projects of sufficient scope.",
  ],

  industriesServed: [
    "Agriculture",
    "Food Processing",
    "Energy",
    "Healthcare",
    "Trades",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build websites for Garden City, Kansas businesses?",
      answer:
        "Yes. Garden City is within the firm's southwest Kansas service area. Custom websites, web applications, and AI automation are offered.",
    },
    {
      question: "What industries does Preisser Solutions serve in Garden City?",
      answer:
        "Agriculture, food processing, energy, healthcare, trades, and professional services are the primary industries served in the Garden City market.",
    },
    {
      question: "Can Preisser Solutions build a website in Spanish for a Garden City business?",
      answer:
        "Multilingual website builds — including Spanish-language versions — are within the firm's capability for Garden City's diverse market.",
    },
    {
      question: "Can you build a website for a Garden City beef processing supplier?",
      answer:
        "Yes. Custom websites and operational tools for food processing and agricultural supply chain businesses are within standard capability.",
    },
    {
      question: "Do you offer local SEO for Garden City, Kansas?",
      answer:
        "Yes. Local SEO and AI-search visibility are both offered for Garden City businesses.",
    },
    {
      question: "How far is Garden City from your Hays headquarters?",
      answer:
        "Approximately 165 miles southwest of Hays. Build work is delivered remotely; on-site travel is available for larger engagements.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Garden City?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Finney County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "garden-city-kansas",
    "garden-city-kansas-seo",
    "dodge-city-kansas",
    "liberal-kansas-web-design",
  ],
};
