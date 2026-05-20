import type { LocationPageData } from "@/types/location";
import {
  HG_OIL_INVENTORY_CARD,
  HG_OIL_INVOICE_CARD,
  STANDARD_PROCESS,
  STANDARD_SERVICE_CARDS,
} from "./shared";

/**
 * /locations/russell-kansas-web-design
 * Russell, KS — HG Oil Holdings home market. Smoky Hills region.
 */
export const locationData: LocationPageData = {
  slug: "russell-kansas-web-design",
  city: "Russell",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.890, lng: -98.860 },

  metaTitle: "Web Design & Custom Software in Russell, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Russell, Kansas businesses — built by a nearby Hays-based firm.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Russell, Kansas",
    h1: "Custom Software and Websites for Russell Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Russell County operators along I-70 and US-281.",
    answerParagraph:
      "Preisser Solutions serves Russell, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays — roughly 28 miles west on I-70 — we deliver locally and remotely. Internal builds at HG Oil Holdings, headquartered in Russell, directly informed the firm's oilfield-services playbook.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "28 mi W" },
    { name: "Wilson, KS", distanceLabel: "15 mi E" },
    { name: "Ellsworth, KS", distanceLabel: "30 mi E" },
    { name: "La Crosse, KS", distanceLabel: "30 mi SW" },
    { name: "Lucas, KS", distanceLabel: "20 mi NE" },
    { name: "Plainville, KS", distanceLabel: "25 mi NW" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "30 mi S" },
    { name: "Bunker Hill, KS", distanceLabel: "10 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD, HG_OIL_INVOICE_CARD],

  whyLocal: [
    "Direct experience with Russell-based operators. HG Oil Holdings is headquartered in Russell — the inventory and AI invoice systems were built there.",
    "Hays is a 28-minute drive west. In-person scoping calls are routine.",
    "Custom code with full ownership transferred at launch. No proprietary platform.",
  ],

  industriesServed: [
    "Oilfield Services",
    "Agriculture",
    "Trades",
    "Professional Services",
    "Manufacturing",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Russell, Kansas?",
      answer:
        "Yes. Russell is one of the firm's closest markets — a 28-minute drive east of Hays on I-70. The HG Oil Holdings inventory platform and AI invoice processor were built for a Russell-headquartered operation.",
    },
    {
      question: "How far is Hays from Russell?",
      answer:
        "Twenty-eight miles east via I-70. In-person scoping is straightforward — it is a short drive in either direction.",
    },
    {
      question: "Can Preisser Solutions build a custom website for a Russell oilfield company?",
      answer:
        "Yes. Custom websites for oilfield services operators are part of the standard offering, and the firm has direct experience with the operating context through HG Oil Holdings.",
    },
    {
      question: "Do you build inventory systems for Russell-area operators?",
      answer:
        "Yes. Custom inventory platforms — multi-site counts, transfers, cost formulas, audit trails — are a documented capability with a verifiable case study at HG Oil Holdings.",
    },
    {
      question: "Do you offer AI invoice processing in Russell?",
      answer:
        "Yes. AI invoice processing is a packaged service offering, originally built for HG Oil Holdings and now generalized for any business drowning in manual invoice handling.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Russell marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites and local SEO are in scope when relevant, but the firm builds internal tools, dashboards, and AI agents as the primary offering.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Russell?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "great-bend-kansas", "wakeeney-kansas-web-design", "western-kansas-web-design"],
};
