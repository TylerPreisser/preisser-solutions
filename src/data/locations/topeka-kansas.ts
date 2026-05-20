import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/topeka-kansas
 * State capital. I-70 / I-35 corridor reach.
 */
export const locationData: LocationPageData = {
  slug: "topeka-kansas",
  city: "Topeka",
  state: "Kansas",
  region: "Northeast Kansas",
  coordinates: { lat: 39.048, lng: -95.677 },

  metaTitle: "Custom Software in Topeka, Kansas | Preisser Solutions",
  metaDescription:
    "Custom software, AI automation, and custom websites for Topeka, Kansas businesses — based in Hays, KS, delivered statewide.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Topeka, Kansas",
    h1: "Custom Software for Topeka Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Topeka's professional services, healthcare, and operations economy.",
    answerParagraph:
      "Preisser Solutions serves Topeka, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays, roughly three hours west on I-70, we deliver remotely and travel for projects of sufficient scope. Fixed-price proposals, custom code, full ownership.",
  },

  nearbyAreas: [
    { name: "Lawrence, KS", distanceLabel: "25 mi E" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "60 mi W" },
    { name: "Holton, KS", distanceLabel: "30 mi N" },
    { name: "Hiawatha, KS", distanceLabel: "70 mi NE" },
    { name: "Ottawa, KS", distanceLabel: "55 mi SE" },
    { name: "Emporia, KS", distanceLabel: "70 mi SW" },
    { name: "Junction City, KS", distanceLabel: "70 mi W" },
    { name: "Atchison, KS", distanceLabel: "55 mi NE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "A Kansas-based firm working at Kansas economics — not a coastal agency working on coastal time zones.",
    "Custom code with full ownership transferred at launch. No proprietary platform behind the work.",
    "Travel for in-person scoping and milestone meetings is standard practice for Topeka engagements.",
  ],

  industriesServed: [
    "Professional Services",
    "Healthcare",
    "Financial Services",
    "Manufacturing",
    "Utilities",
    "Logistics",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Topeka, Kansas?",
      answer:
        "Yes. Topeka-area engagements are routine. The firm is based in Hays and travels east on I-70 for scoping and milestone meetings; build work is delivered remotely on weekly working previews.",
    },
    {
      question: "How far is Hays from Topeka?",
      answer:
        "Approximately 230 miles, about three hours east via I-70. Travel for in-person work is part of the engagement, not a separate line item.",
    },
    {
      question: "What does Preisser Solutions build for Topeka businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, websites, and local search optimization. Common engagements include document processing, workflow automation, and ops dashboards.",
    },
    {
      question: "Can Preisser Solutions help with AI document processing for Topeka professional services firms?",
      answer:
        "Yes. AI document processing — extracting structured data from invoices, contracts, forms, permits, and reports — is a packaged service offering and one of the most-shipped builds.",
    },
    {
      question: "Do you build custom dashboards for Topeka operators?",
      answer:
        "Yes. Real-time business dashboards are a core service. Role-based views for executives, operators, and field teams are standard scope.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Topeka marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites and AI-search work are delivered when they are in scope, but the firm's center of gravity is internal tooling and automation pipelines.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Topeka?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "manhattan-kansas", "salina-kansas", "wichita-kansas"],
};
