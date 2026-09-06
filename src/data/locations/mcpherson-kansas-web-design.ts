import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "mcpherson-kansas-web-design",
  city: "McPherson",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.371, lng: -97.664 },

  metaTitle: "McPherson, KS Web Design & Software",
  metaDescription:
    "Custom software, web apps, and AI automation for McPherson, Kansas: built by a Hays-based firm for the I-135 refining and manufacturing corridor.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving McPherson, Kansas",
    h1: "Custom Software and Websites for McPherson Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for McPherson County's refining, manufacturing, and professional services economy on the I-135 corridor.",
    answerParagraph:
      "Preisser Solutions serves McPherson, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. McPherson's refining and manufacturing base (including one of the largest refinery operations in the central Plains): generates strong demand for operational dashboards, process-documentation tools, and supply-chain automation. Based in Hays, roughly 105 miles northwest, we deliver remotely and travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "25 mi N" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "35 mi S" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "30 mi S" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "55 mi S" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "55 mi W" },
    { name: "Lyons, KS", distanceLabel: "30 mi W" },
    { name: "Hillsboro, KS", distanceLabel: "25 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "105 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "McPherson's refining and manufacturing sector demands custom software built around operational reality, not generic ERP modules poorly adapted to mid-size production environments.",
    "A Kansas-based firm at Kansas economics. Refinery and manufacturing builds are priced for the market, not the metro.",
    "Custom code with full ownership at launch. No vendor lock-in on software that production operations depend on daily.",
  ],

  industriesServed: [
    "Refining & Petrochemical",
    "Manufacturing",
    "Distribution",
    "Professional Services",
    "Agriculture",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve McPherson, Kansas?",
      answer:
        "Yes. McPherson is a regular engagement market on the I-135 corridor. The firm is based in Hays, roughly 105 miles northwest, and travels for in-person scoping and milestone meetings on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from McPherson?",
      answer:
        "About 105 miles northwest via I-135 and I-70, roughly an hour and a half. Travel for in-person work is treated as a standard part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for McPherson manufacturers and refiners?",
      answer:
        "Custom production dashboards, ops-monitoring tools, inventory systems, AI document processing for purchase orders and invoices, and supplier data integrations. McPherson's industrial density makes operational tooling the highest-leverage build for most clients.",
    },
    {
      question: "Can Preisser Solutions build custom dashboards for a McPherson refinery operation?",
      answer:
        "Yes. Real-time production dashboards with role-based views (executives, plant operators, procurement) are a core service line and one of the most-shipped build types.",
    },
    {
      question: "Does Preisser Solutions serve McPherson manufacturers needing supply-chain visibility?",
      answer:
        "Yes. Custom supplier scorecards, delivery-performance tracking, and vendor-management tools are within scope for manufacturing operations with multi-supplier procurement.",
    },
    {
      question: "How does Preisser Solutions pricing compare to national software vendors for McPherson businesses?",
      answer:
        "Fixed-price custom builds are typically more cost-effective over a two-year horizon than per-seat SaaS fees on software that does not fit the operation. Full ownership means you stop paying the day the project closes.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in McPherson?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["salina-kansas", "hutchinson-kansas-web-design", "wichita-kansas", "newton-kansas-web-design"],
};
