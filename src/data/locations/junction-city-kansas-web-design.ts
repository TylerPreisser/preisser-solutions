import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "junction-city-kansas-web-design",
  city: "Junction City",
  state: "Kansas",
  region: "Northeast Kansas",
  coordinates: { lat: 39.028, lng: -96.831 },

  metaTitle: "Web Design & Custom Software in Junction City, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Junction City, Kansas — built by a Hays-based firm for the Fort Riley market.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Junction City, Kansas",
    h1: "Custom Software and Websites for Junction City Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Geary County's Fort Riley-adjacent economy — a dense, underserved B2B market.",
    answerParagraph:
      "Preisser Solutions serves Junction City, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Junction City's economy is anchored by Fort Riley — one of the largest Army installations in the country — which drives a high-density mix of defense contractors, trades, retail, and professional services that consistently need custom operational tooling. Based in Hays, roughly 130 miles west, we deliver remotely and travel for projects of meaningful scope.",
  },

  nearbyAreas: [
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "15 mi E" },
    { name: "Abilene, KS", distanceLabel: "45 mi W" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "70 mi E" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "70 mi W" },
    { name: "Milford, KS", distanceLabel: "5 mi N" },
    { name: "Herington, KS", distanceLabel: "30 mi SE" },
    { name: "Fort Riley, KS", distanceLabel: "5 mi N" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "130 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Fort Riley adjacency creates a unique B2B environment — defense contractors, military-family services, and trades operators all have distinct operational software needs that standard templates don't address.",
    "Junction City is frequently overlooked by larger metro agencies. A Kansas-based firm that serves the full I-70 corridor fills a real gap in the local digital-services market.",
    "Custom code with full ownership. Defense-contractor and trades operators benefit from software that reflects their specific workflow rather than generalized SaaS assumptions.",
  ],

  industriesServed: [
    "Defense & Government Contracting",
    "Trades",
    "Retail & Hospitality",
    "Professional Services",
    "Healthcare",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Junction City, Kansas?",
      answer:
        "Yes. Junction City is within the firm's eastern Kansas service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings on projects of meaningful scope.",
    },
    {
      question: "How far is Hays from Junction City?",
      answer:
        "About 130 miles west via I-70, roughly an hour and fifty minutes. Travel for in-person work is a standard part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Junction City businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization. Fort Riley-adjacent businesses often need custom operational tools that standard platforms don't support.",
    },
    {
      question: "Can Preisser Solutions build software for a Junction City defense contractor or government services firm?",
      answer:
        "Yes. Custom document management, compliance tracking, reporting dashboards, and operational tools for government contractors and defense-adjacent businesses are within scope.",
    },
    {
      question: "Do you offer local SEO for Junction City trades and service businesses?",
      answer:
        "Yes. Trades operators and service businesses near Fort Riley benefit significantly from local SEO and AI-search optimization. The military-community market searches actively for local service providers.",
    },
    {
      question: "What makes Preisser Solutions a better choice than a Topeka or Manhattan agency for Junction City?",
      answer:
        "Custom-software and AI automation depth. Most regional agencies sell marketing retainers. Preisser Solutions builds operational tools, custom websites, and AI automation — the full stack of what Junction City businesses need.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Junction City?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["manhattan-kansas", "topeka-kansas", "salina-kansas", "hays-kansas"],
};
