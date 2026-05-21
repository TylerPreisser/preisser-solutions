import type { LocationPageData } from "@/types/location";
import {
  HG_OIL_INVENTORY_CARD,
  HG_OIL_INVOICE_CARD,
  STANDARD_PROCESS,
  STANDARD_SERVICE_CARDS,
} from "./shared";

/**
 * /locations/hays-kansas-custom-software
 */
export const locationData: LocationPageData = {
  slug: "hays-kansas-custom-software",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Custom Software in Hays, Kansas | Preisser Solutions",
  metaDescription:
    "Custom software development in Hays, Kansas — purpose-built for the way your operation works.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Custom Software in Hays, Kansas",
    h1: "Custom Software Development for Hays Businesses",
    subheadline:
      "Software built around how your operation actually works — not the other way around.",
    answerParagraph:
      "Preisser Solutions is a Hays, Kansas custom-software firm building purpose-built software for local businesses. Internal tools, dashboards, custom CRMs, AI agents, automation pipelines. Modern stack — Next.js, React, TypeScript, Node, Python. Fixed-price proposals, full code ownership transferred at launch.",
  },

  nearbyAreas: [
    { name: "Russell, KS", distanceLabel: "28 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "50 mi E" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "37 mi W" },
    { name: "Plainville, KS", distanceLabel: "15 mi N" },
    { name: "Ellis, KS", distanceLabel: "15 mi W" },
    { name: "Hill City, KS", distanceLabel: "55 mi NW" },
    { name: "La Crosse, KS", distanceLabel: "40 mi SE" },
    { name: "Stockton, KS", distanceLabel: "40 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD, HG_OIL_INVOICE_CARD],

  whyLocal: [
    "Direct experience building operator-side software in western Kansas — HG Oil Holdings is a documented example.",
    "Local team — in-person scoping calls and site visits are routine.",
    "Modern stack, full code ownership, no platform lock-in.",
  ],

  industriesServed: ["Oilfield Services", "Trades", "Professional Services", "Manufacturing", "Healthcare Practices"],

  faq: [
    {
      question: "What is custom software, exactly?",
      answer:
        "Software built from scratch for a specific operation — internal tools, dashboards, CRMs, agents, automation pipelines. Not SaaS, not a template, not a configuration of someone else's product.",
    },
    {
      question: "When does it make sense to build custom software?",
      answer:
        "When the available off-the-shelf tools force you to change how your business operates, or when the cost of inefficiency from those tools exceeds the cost of a purpose-built system.",
    },
    {
      question: "What does a typical Preisser Solutions engagement look like?",
      answer:
        "Free scoping call → fixed-price proposal → weekly build sprints with Friday previews → launch with full code ownership → thirty days of post-launch support included.",
    },
    {
      question: "What technology stack do you use?",
      answer:
        "Next.js, React, TypeScript, Tailwind, Node, and Python. Deployed on modern edge infrastructure when it fits, full server infrastructure when it does not.",
    },
    {
      question: "Do I own the code when the project ships?",
      answer:
        "Yes. Full code ownership is transferred at launch — your repo, your infrastructure, no proprietary platform.",
    },
    {
      question: "Are you local to Hays?",
      answer:
        "Yes. The firm operates out of Hays full-time, with in-person scoping calls and site visits as standard.",
    },
  ],

  cta: {
    headline: "Ready to build software around your operation?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "hays-kansas-web-applications", "hays-kansas-web-development", "hays-kansas-web-design"],
};
