import type { LocationPageData } from "@/types/location";
import {
  HG_OIL_INVENTORY_CARD,
  IRON_AND_OAK_CARD,
  STANDARD_PROCESS,
  STANDARD_SERVICE_CARDS,
} from "./shared";

/**
 * /locations/hays-kansas
 * Headquarters market. Highest priority. Anchored to Ellis County and the
 * I-70 / US-183 corridor across western Kansas.
 */
export const locationData: LocationPageData = {
  slug: "hays-kansas",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Custom Software in Hays, Kansas",
  metaDescription:
    "Preisser Solutions is a Hays, Kansas custom software and AI automation firm. Web apps, automation, websites, and local AI search.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Headquartered in Hays, Kansas",
    h1: "Custom Software for Hays Businesses",
    subheadline:
      "Custom web apps, AI automation, websites, and dashboards: built locally and shipped with full code ownership.",
    answerParagraph:
      "Preisser Solutions is a custom software and AI automation firm based in Hays, Kansas, serving businesses across western Kansas and remotely nationwide. We build custom web applications, AI automation, custom websites, dashboards, and local SEO and AI-search optimization for owner-operators who have outgrown off-the-shelf tools. Fixed-price engagements, full code ownership, no vendor lock-in.",
  },

  nearbyAreas: [
    { name: "Russell, KS", distanceLabel: "28 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "50 mi E" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "37 mi W" },
    { name: "Plainville, KS", distanceLabel: "15 mi N" },
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "15 mi W" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "55 mi NW" },
    { name: "La Crosse, KS", distanceLabel: "40 mi SE" },
    { name: "Stockton, KS", distanceLabel: "40 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD, IRON_AND_OAK_CARD],

  whyLocal: [
    "Scoping calls happen in person. Site visits across western Kansas are not a billable expense flown in from elsewhere.",
    "We understand what the working day looks like for an oilfield operator, a trades owner, and a professional-services principal in this region; that context is in every build decision.",
    "Communication moves at the speed of a phone call. Decisions are made by the same person who writes the code.",
  ],

  industriesServed: [
    "Oilfield Services",
    "Trades",
    "Professional Services",
    "Manufacturing",
    "Hospitality",
    "Healthcare Practices",
    "Agriculture",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Hays, Kansas?",
      answer:
        "Yes. Hays is the home market. Preisser Solutions is headquartered in Hays and delivers custom software, AI automation, websites, and local search optimization to businesses across Ellis County and the broader western Kansas region.",
    },
    {
      question: "Is Preisser Solutions actually local to Hays?",
      answer:
        "Yes. The firm operates out of Hays full-time. In-person scoping calls, downtown coffee meetings, and site visits across the region are standard practice, not a special arrangement.",
    },
    {
      question: "What does Preisser Solutions build for Hays businesses?",
      answer:
        "Custom web applications, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Every project is custom-coded from scratch: no templates, no offshore work.",
    },
    {
      question: "Can Preisser Solutions automate back-office workflows for a Hays small business?",
      answer:
        "Yes. Business automation is a core service line. Common engagements include invoice processing, scheduling, customer reactivation, inventory tracking, and document workflows.",
    },
    {
      question: "Does Preisser Solutions serve oil and gas operations in western Kansas?",
      answer:
        "Yes. Western Kansas oil and gas is a core vertical. Internal builds at HG Oil Holdings (inventory management and AI invoice processing): directly informed the playbook for operator-side software.",
    },
    {
      question: "How fast can a Hays project start?",
      answer:
        "Most engagements move from first call to signed proposal within a week, with kickoff shortly after. Local proximity means scoping can happen in person on your schedule.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Hays marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm, not a marketing agency. We build the systems that run businesses (internal tools, dashboards, AI agents, automation pipelines), and we own the website and local-search work end to end when that is in scope.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Hays?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas-custom-software",
    "hays-kansas-web-applications",
    "hays-kansas-web-development",
    "hays-kansas-web-design",
    "great-bend-kansas",
    "wakeeney-kansas-web-design",
    "wichita-kansas",
    "salina-kansas",
    "western-kansas-web-design",
  ],
};
