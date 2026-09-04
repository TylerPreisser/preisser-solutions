import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "norton-kansas-web-design",
  city: "Norton",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 39.836, lng: -99.893 },

  metaTitle: "Norton, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Norton, Kansas: built by a Hays-based firm serving the US-36 north corridor.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Norton, Kansas",
    h1: "Custom Software and Websites for Norton Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Norton County's agriculture, healthcare, and professional services operators along US-36.",
    answerParagraph:
      "Preisser Solutions serves Norton, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Norton County sits along the US-36 corridor, roughly 80 miles north of Hays, and serves as a regional hub for the northwest Kansas market. We deliver remotely and travel for in-person work on projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Phillipsburg, KS", href: "/locations/phillipsburg-kansas-web-design", distanceLabel: "25 mi E" },
    { name: "Oberlin, KS", distanceLabel: "45 mi W" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi S" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "80 mi S" },
    { name: "Smith Center, KS", distanceLabel: "55 mi E" },
    { name: "Stockton, KS", distanceLabel: "25 mi SE" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "65 mi SW" },
    { name: "Atwood, KS", distanceLabel: "35 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Northwest Kansas context built in: ag, healthcare, and county-seat professional services are all familiar operating environments.",
    "Custom code with full ownership transferred at launch. No subscription platform, no vendor dependency.",
    "Travel from Hays to Norton is routine for projects that warrant in-person scoping.",
  ],

  industriesServed: [
    "Agriculture",
    "Healthcare Practices",
    "Professional Services",
    "Trades",
    "Government & Civic",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Norton, Kansas?",
      answer:
        "Yes. Norton is within the firm's northwest Kansas service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Norton?",
      answer:
        "About 80 miles south via US-283 and US-36, roughly an hour and fifteen minutes. Travel for in-person work is treated as a standard part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Norton businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization for ag operators, healthcare practices, and county-seat professional services firms.",
    },
    {
      question: "Can Preisser Solutions build a custom website for a Norton healthcare practice?",
      answer:
        "Yes. Custom websites for healthcare practices (appointment-ready, HIPAA-aware architecture, local SEO optimized) are within the standard scope.",
    },
    {
      question: "Do you serve county-seat professional services firms along the US-36 corridor?",
      answer:
        "Yes. Law firms, financial advisors, insurance agencies, and other professional services operators in Norton County are well within the service area. Document automation and client portals are recurring builds for these verticals.",
    },
    {
      question: "What is the difference between Preisser Solutions and a regional Kansas marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Every engagement is scoped around custom code with full ownership, not templates, monthly retainers, or agency media buys.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Norton?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "phillipsburg-kansas-web-design", "hill-city-kansas-web-design", "western-kansas-web-design"],
};
