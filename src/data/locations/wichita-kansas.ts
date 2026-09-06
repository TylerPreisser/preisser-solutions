import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/wichita-kansas
 * Largest metro served. South-central Kansas.
 */
export const locationData: LocationPageData = {
  slug: "wichita-kansas",
  city: "Wichita",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.687, lng: -97.330 },

  metaTitle: "Custom Software in Wichita, Kansas",
  metaDescription:
    "Custom software, AI automation, and custom websites for Wichita, Kansas businesses: based in Hays, KS, delivered remotely or in person.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Wichita, Kansas",
    h1: "Custom Software for Wichita Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for the largest economy in Kansas: built by a Kansas-based firm.",
    answerParagraph:
      "Preisser Solutions serves Wichita, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Headquartered in Hays (roughly three hours west by car): we deliver remotely and travel for projects of sufficient scope. Custom code, full ownership, fixed-price proposals.",
  },

  nearbyAreas: [
    { name: "Derby, KS", href: "/locations/derby-kansas-web-design", distanceLabel: "10 mi S" },
    { name: "Andover, KS", distanceLabel: "10 mi E" },
    { name: "Bel Aire, KS", distanceLabel: "8 mi NE" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "25 mi N" },
    { name: "El Dorado, KS", distanceLabel: "30 mi E" },
    { name: "Augusta, KS", distanceLabel: "20 mi E" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "50 mi NW" },
    { name: "Park City, KS", distanceLabel: "8 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "We are Kansas-based, not coastal. Engagements are scoped against the cost structure of the market, not against Denver or Austin rates.",
    "Travel to Wichita for scoping calls and milestone meetings is standard for projects of meaningful scope.",
    "Custom code with full ownership transferred at launch: no proprietary platform, no vendor lock-in.",
  ],

  industriesServed: [
    "Manufacturing",
    "Aerospace Suppliers",
    "Healthcare",
    "Professional Services",
    "Financial Services",
    "Energy",
    "Logistics",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Wichita, Kansas?",
      answer:
        "Yes. Wichita-area engagements are routine. The firm is based in Hays and travels down I-135 for scoping and milestone meetings as standard practice; the bulk of build work is delivered remotely on weekly working previews.",
    },
    {
      question: "How far is Hays from Wichita?",
      answer:
        "Roughly 190 miles, about three hours via I-135 and I-70. Travel for in-person work is treated as a normal part of the engagement, not a billable line item.",
    },
    {
      question: "What kind of custom software does Preisser Solutions build for Wichita companies?",
      answer:
        "Custom web applications, internal tools, dashboards, and AI automation for manufacturing, professional services, healthcare, and financial services operators. Specific examples include RFQ automation, supplier scorecards, document processing, and ops dashboards.",
    },
    {
      question: "Can Preisser Solutions build dashboards for Wichita manufacturers?",
      answer:
        "Yes. Real-time business dashboards are a core service. Common views include production, on-time delivery, RFQ pipeline, and supplier performance: all role-based, deployed on fast modern infrastructure.",
    },
    {
      question: "Do you offer local SEO and AI search optimization for Wichita businesses?",
      answer:
        "Yes. Local SEO and AI-search visibility (citations on ChatGPT, Perplexity, Gemini, and Google AI Overviews) are an explicit service line. Schema, content architecture, and review-signal work are scoped as a single engagement.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Wichita-based marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm, not a marketing agency. We can deliver website and local-search work as part of a broader engagement, but the firm's center of gravity is internal tooling and AI automation.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Wichita?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "salina-kansas",
    "topeka-kansas",
    "manhattan-kansas",
  ],
};
