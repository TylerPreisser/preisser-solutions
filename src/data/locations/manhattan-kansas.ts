import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/manhattan-kansas
 * Flint Hills. Riley County.
 */
export const locationData: LocationPageData = {
  slug: "manhattan-kansas",
  city: "Manhattan",
  state: "Kansas",
  region: "Flint Hills",
  coordinates: { lat: 39.184, lng: -96.572 },

  metaTitle: "Custom Software in Manhattan, Kansas | Preisser Solutions",
  metaDescription:
    "Custom software, AI automation, and custom websites for Manhattan, Kansas businesses — based in Hays, KS, delivered statewide.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Manhattan, Kansas",
    h1: "Custom Software for Manhattan Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for the Flint Hills region — built remotely, in person when scope warrants it.",
    answerParagraph:
      "Preisser Solutions serves Manhattan, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays — roughly three hours west on I-70 — we deliver remotely and travel for projects of sufficient scope. Fixed-price proposals, custom code, full ownership.",
  },

  nearbyAreas: [
    { name: "Junction City, KS", href: "/locations/junction-city-kansas-web-design", distanceLabel: "15 mi W" },
    { name: "Wamego, KS", distanceLabel: "15 mi E" },
    { name: "St. George, KS", distanceLabel: "10 mi E" },
    { name: "Westmoreland, KS", distanceLabel: "25 mi N" },
    { name: "Council Grove, KS", distanceLabel: "45 mi S" },
    { name: "Abilene, KS", distanceLabel: "60 mi W" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "60 mi E" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "80 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Kansas-based, working at Kansas economics — not a coastal agency on coastal time zones.",
    "Custom code with full ownership transferred at launch. No proprietary platform.",
    "Travel for in-person scoping and milestone meetings is standard for projects of meaningful scope.",
  ],

  industriesServed: [
    "Professional Services",
    "Agriculture",
    "Healthcare",
    "Manufacturing",
    "Hospitality",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Manhattan, Kansas?",
      answer:
        "Yes. Manhattan-area engagements are routine. The firm is based in Hays and travels east on I-70 for scoping and milestone meetings; build work is delivered remotely on weekly working previews.",
    },
    {
      question: "How far is Hays from Manhattan?",
      answer:
        "Approximately 175 miles, about two and a half hours east via I-70. Travel for in-person work is part of the engagement, not a separate line item.",
    },
    {
      question: "What does Preisser Solutions build for Manhattan businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization. Common engagements include document processing, workflow automation, and ops dashboards.",
    },
    {
      question: "Can Preisser Solutions automate workflows for a Manhattan ag operator?",
      answer:
        "Yes. Workflow automation, document processing, and operational dashboards are recurring engagements for ag operators and the supplier network around them.",
    },
    {
      question: "Do you build dashboards for Manhattan-area operators?",
      answer:
        "Yes. Real-time business dashboards are a core service line. Role-based views for executives, operators, and field teams are standard scope.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Manhattan marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm, not a marketing agency. Website and local-search work are in scope when relevant; the firm's center of gravity is internal tooling and AI automation.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Manhattan?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "topeka-kansas", "salina-kansas", "wichita-kansas"],
};
