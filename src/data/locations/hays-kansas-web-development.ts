import type { LocationPageData } from "@/types/location";
import {
  HG_OIL_INVENTORY_CARD,
  IRON_AND_OAK_CARD,
  STANDARD_PROCESS,
  STANDARD_SERVICE_CARDS,
} from "./shared";

/**
 * /locations/hays-kansas-web-development
 */
export const locationData: LocationPageData = {
  slug: "hays-kansas-web-development",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Web Development in Hays, Kansas",
  metaDescription:
    "Custom web development for Hays, Kansas businesses — modern code, full ownership, no templates.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Web Development in Hays, Kansas",
    h1: "Custom Web Development for Hays Businesses",
    subheadline:
      "Full-stack web development — modern frameworks, fast infrastructure, full code ownership.",
    answerParagraph:
      "Preisser Solutions is a Hays, Kansas custom-software firm delivering full-stack web development to local businesses. Next.js, React, and TypeScript on modern edge infrastructure. Custom code, no templates, fixed-price proposals, full code ownership transferred at launch.",
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

  caseStudies: [HG_OIL_INVENTORY_CARD, IRON_AND_OAK_CARD],

  whyLocal: [
    "Local team — in-person scoping calls and milestone meetings are routine.",
    "Modern stack — Next.js, React, TypeScript, deployed on edge infrastructure.",
    "Full code ownership at launch. Your repo, your infrastructure, no lock-in.",
  ],

  industriesServed: ["Oilfield Services", "Trades", "Professional Services", "Manufacturing", "Hospitality"],

  faq: [
    {
      question: "What does web development mean at Preisser Solutions?",
      answer:
        "Full-stack custom code — not site-builder configuration. Next.js, React, TypeScript, with custom back-end logic where the project needs it.",
    },
    {
      question: "Does Preisser Solutions build full-stack web applications?",
      answer:
        "Yes. Custom web applications — internal tools, dashboards, custom CRMs — are a core service line. HG Oil Holdings' inventory platform is a documented example.",
    },
    {
      question: "What technology stack do you use?",
      answer:
        "Next.js, React, TypeScript, and Tailwind on the front end; Node and Python on the back end as needed; GSAP and Framer Motion for motion design.",
    },
    {
      question: "Do you build for static export or full server-side apps?",
      answer:
        "Both. Marketing sites are often static-exported for speed and cost; internal applications use full server-side logic when the workflow requires it.",
    },
    {
      question: "Do I own the code when the project ships?",
      answer:
        "Yes. Full code ownership is transferred at launch — your repo, your infrastructure, no proprietary platform.",
    },
    {
      question: "Are you local to Hays?",
      answer:
        "Yes. The firm operates out of Hays full-time, with in-person scoping calls and meetings as standard.",
    },
  ],

  cta: {
    headline: "Ready to build something serious in Hays?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "hays-kansas-web-design", "hays-kansas-web-applications", "hays-kansas-custom-software"],
};
