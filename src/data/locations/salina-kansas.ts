import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/salina-kansas
 * Central Kansas. I-70 / I-135 intersection.
 */
export const locationData: LocationPageData = {
  slug: "salina-kansas",
  city: "Salina",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.840, lng: -97.611 },

  metaTitle: "Custom Software in Salina, Kansas",
  metaDescription:
    "Custom software, AI automation, and custom websites for Salina, Kansas businesses — based in Hays, KS, delivered statewide.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Salina, Kansas",
    h1: "Custom Software for Salina Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for central Kansas — at the I-70 and I-135 crossroads.",
    answerParagraph:
      "Preisser Solutions serves Salina, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Based in Hays — roughly an hour and a half west on I-70 — we deliver remotely and travel for projects of sufficient scope. Custom code, fixed-price proposals, full ownership.",
  },

  nearbyAreas: [
    { name: "Abilene, KS", distanceLabel: "25 mi E" },
    { name: "McPherson, KS", href: "/locations/mcpherson-kansas-web-design", distanceLabel: "25 mi S" },
    { name: "Lindsborg, KS", distanceLabel: "20 mi S" },
    { name: "Concordia, KS", distanceLabel: "55 mi NW" },
    { name: "Ellsworth, KS", distanceLabel: "35 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "95 mi W" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SW" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "80 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Hays-based firm a quick drive west on I-70. Travel for in-person scoping and milestone meetings is standard.",
    "Custom code with full ownership transferred at launch — no proprietary platform, no lock-in.",
    "Built to the cost structure of central Kansas, not coastal markets.",
  ],

  industriesServed: [
    "Manufacturing",
    "Agriculture",
    "Distribution & Logistics",
    "Professional Services",
    "Healthcare",
    "Trades",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Salina, Kansas?",
      answer:
        "Yes. Salina is a regular travel market — roughly 95 miles east of the Hays headquarters on I-70. In-person scoping calls and milestone meetings are standard for Salina-area engagements.",
    },
    {
      question: "How far is Hays from Salina?",
      answer:
        "About 95 miles, around an hour and a half via I-70. Travel is treated as a normal part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Salina businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, websites, and local search optimization. Common engagements include document processing, workflow automation, and ops dashboards for manufacturing and distribution operators.",
    },
    {
      question: "Can Preisser Solutions build inventory systems for a Salina manufacturer?",
      answer:
        "Yes. Custom inventory platforms are a documented capability. The HG Oil Holdings inventory build — centralized counts, transfers, cost formulas — is directly transferable to a Salina manufacturing or distribution operation.",
    },
    {
      question: "Do you offer AI document processing for Salina-area businesses?",
      answer:
        "Yes. AI document processing — invoice handling, contract extraction, permit data — is a packaged service offering trained on each client's vendor data and approval workflows.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Salina marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm, not a marketing agency. Website and AI-search work are in scope when relevant; the firm's center of gravity is internal tooling and automation.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Salina?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "great-bend-kansas", "manhattan-kansas", "wichita-kansas"],
};
