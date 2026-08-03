import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/atchison-kansas-web-design
 * Atchison, KS — Atchison County. Northeast Kansas, Missouri River.
 */
export const locationData: LocationPageData = {
  slug: "atchison-kansas-web-design",
  city: "Atchison",
  state: "Kansas",
  region: "Northeast Kansas",
  coordinates: { lat: 39.561, lng: -95.122 },

  metaTitle: "Atchison, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Atchison, Kansas businesses — built by a Kansas-based firm with fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Atchison, Kansas",
    h1: "Custom Websites and Software for Atchison Businesses",
    subheadline:
      "Web design, custom applications, and AI automation for Atchison County businesses along the Missouri River corridor.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, AI automation, and local SEO systems for businesses in Atchison, Kansas — an Atchison County community of roughly 10,000 on the Missouri River, historically significant as a rail and commerce hub. Based in Hays, we deliver remotely with on-site travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Leavenworth, KS", distanceLabel: "25 mi S" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "55 mi SW" },
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "60 mi S" },
    { name: "Kansas City, KS", distanceLabel: "50 mi S" },
    { name: "St. Joseph, MO", distanceLabel: "28 mi N" },
    { name: "Hiawatha, KS", distanceLabel: "35 mi NW" },
    { name: "Wathena, KS", distanceLabel: "12 mi N" },
    { name: "Horton, KS", distanceLabel: "25 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Deep familiarity with northeast Kansas business culture — manufacturing, logistics, and trades operators along US-73.",
    "Custom code with full ownership transferred at launch. No proprietary platform or ongoing licensing.",
    "Fixed-price proposals only. Scope, timeline, and cost agreed before a line of code is written.",
  ],

  industriesServed: [
    "Manufacturing",
    "Logistics",
    "Trades",
    "Education",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Atchison, Kansas?",
      answer:
        "Yes. Atchison is within the firm's Kansas service area. Work is delivered remotely with on-site travel available for projects of sufficient scope.",
    },
    {
      question: "What county is Atchison in?",
      answer:
        "Atchison is the county seat of Atchison County in northeast Kansas, situated on the Missouri River approximately 50 miles north of Kansas City.",
    },
    {
      question: "What does Preisser Solutions build for Atchison businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, marketing websites, and local search and AI-search optimization.",
    },
    {
      question: "Can you build a website for an Atchison manufacturing firm?",
      answer:
        "Yes. Custom websites and operational tools for manufacturing and logistics operations are part of the standard service offering.",
    },
    {
      question: "Do you offer local SEO services in Atchison?",
      answer:
        "Yes. Local SEO — Google Business Profile, local pack optimization, citations, schema markup — and AI-search visibility are both explicit service lines.",
    },
    {
      question: "How far is Atchison from your Hays headquarters?",
      answer:
        "Approximately 275 miles east of Hays. Build work is delivered remotely; on-site travel for milestone meetings is treated as a normal part of larger engagements.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Atchison?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your Atchison business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "topeka-kansas",
    "lawrence-kansas-web-design",
    "manhattan-kansas",
    "junction-city-kansas-web-design",
  ],
};
