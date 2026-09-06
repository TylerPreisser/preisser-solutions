import type { LocationPageData } from "@/types/location";
import {
  HG_OIL_INVENTORY_CARD,
  HG_OIL_INVOICE_CARD,
  STANDARD_PROCESS,
  STANDARD_SERVICE_CARDS,
} from "./shared";

/**
 * /locations/hays-kansas-web-applications
 */
export const locationData: LocationPageData = {
  slug: "hays-kansas-web-applications",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Web Applications in Hays, Kansas",
  metaDescription:
    "Custom web applications for Hays, Kansas businesses: dashboards, internal tools, custom CRMs. Built locally.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Web Applications in Hays, Kansas",
    h1: "Custom Web Applications for Hays Businesses",
    subheadline:
      "Dashboards, internal tools, custom CRMs: purpose-built for the way your operation actually works.",
    answerParagraph:
      "Preisser Solutions is a Hays, Kansas custom-software firm that builds full-stack web applications for local businesses: internal tools, dashboards, custom CRMs, and ops platforms. Next.js, React, and TypeScript on modern infrastructure. Fixed-price proposals, full code ownership at launch.",
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
    "Direct experience building operator-side applications, HG Oil Holdings' inventory platform and AI invoice processor are documented examples.",
    "Local team: in-person scoping calls and site visits are routine.",
    "Modern stack, full code ownership at launch, no platform lock-in.",
  ],

  industriesServed: ["Oilfield Services", "Trades", "Professional Services", "Manufacturing", "Healthcare Practices"],

  faq: [
    {
      question: "What kind of web applications does Preisser Solutions build?",
      answer:
        "Internal tools, dashboards, custom CRMs, ops platforms, and AI agents. The HG Oil Holdings inventory platform is a representative example.",
    },
    {
      question: "Do you build for non-technical operators?",
      answer:
        "Yes. The applications are designed for the people who actually run the operation (field crews, office staff, owners), not for engineers.",
    },
    {
      question: "What technology stack do you use?",
      answer:
        "Next.js, React, TypeScript, and Tailwind on the front end; Node and Python on the back end as needed.",
    },
    {
      question: "Do I own the code when the project ships?",
      answer:
        "Yes. Full code ownership transferred at launch: your repo, your infrastructure, no proprietary platform.",
    },
    {
      question: "Do you build AI agents as part of these applications?",
      answer:
        "Yes. AI agents (document processing, decision support, customer service) are routinely embedded into the broader application.",
    },
    {
      question: "Are you local to Hays?",
      answer:
        "Yes. The firm operates out of Hays full-time, with in-person scoping calls and meetings as standard.",
    },
  ],

  cta: {
    headline: "Ready to build the application your operation actually needs?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "hays-kansas-custom-software", "hays-kansas-web-development", "hays-kansas-web-design"],
};
