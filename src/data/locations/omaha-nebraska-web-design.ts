import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/omaha-nebraska-web-design
 * Omaha, NE — Douglas County. Border-state market.
 */
export const locationData: LocationPageData = {
  slug: "omaha-nebraska-web-design",
  city: "Omaha",
  state: "Nebraska",
  region: "Border Markets",
  coordinates: { lat: 41.257, lng: -95.995 },

  metaTitle: "Omaha, NE Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Omaha, Nebraska businesses: Kansas-based firm delivering remotely to Omaha's finance and agriculture markets.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Omaha, Nebraska",
    h1: "Custom Websites and Software for Omaha Businesses",
    subheadline:
      "Custom web design, web applications, and AI automation for Omaha's finance, insurance, agriculture, and technology markets: delivered remotely by a Kansas-based firm.",
    answerParagraph:
      "Preisser Solutions is a Kansas-based custom software firm serving Omaha, Nebraska businesses remotely, with on-site travel for material engagements. Omaha is a Douglas County metro of approximately 480,000, anchored by finance and insurance (Berkshire Hathaway, Union Pacific headquarters), telecommunications, agriculture, and healthcare. Fixed-price proposals, full code ownership at launch.",
  },

  nearbyAreas: [
    { name: "Lincoln, NE", href: "/locations/lincoln-nebraska-web-design", distanceLabel: "55 mi SW" },
    { name: "Council Bluffs, IA", distanceLabel: "5 mi E" },
    { name: "Bellevue, NE", distanceLabel: "10 mi S" },
    { name: "Papillion, NE", distanceLabel: "12 mi S" },
    { name: "Fremont, NE", distanceLabel: "35 mi NW" },
    { name: "Kansas City, MO", href: "/locations/kansas-city-missouri-custom-software", distanceLabel: "160 mi S" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "195 mi S" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "330 mi S" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a Kansas-based firm serving Omaha and the greater Nebraska market remotely, with on-site travel for material engagements.",
    "Omaha's finance and ag industries require custom tools, not generic web platforms.",
    "Custom code with full ownership at launch. No SaaS dependency or vendor lock-in.",
  ],

  industriesServed: [
    "Finance & Insurance",
    "Agriculture",
    "Healthcare",
    "Technology",
    "Logistics",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Omaha, Nebraska businesses?",
      answer:
        "Yes. Preisser Solutions is a Kansas-based firm serving Omaha businesses remotely, with on-site travel available for larger engagements.",
    },
    {
      question: "What industries does Preisser Solutions serve in Omaha?",
      answer:
        "Finance, insurance, agriculture, healthcare, technology, and logistics are the primary industries served in the Omaha market.",
    },
    {
      question: "Can Preisser Solutions build custom software for an Omaha financial services firm?",
      answer:
        "Yes. Custom web applications, internal tools, and dashboards for financial services businesses are within standard capability.",
    },
    {
      question: "How does remote delivery work for Omaha clients?",
      answer:
        "All build work is delivered remotely with weekly Friday previews. For larger engagements, on-site travel to Omaha is a normal part of the project.",
    },
    {
      question: "Does Preisser Solutions offer AI automation for Omaha businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents are offered to Omaha businesses.",
    },
    {
      question: "What is the pricing model for Omaha projects?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Omaha?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "lincoln-nebraska-web-design",
    "kansas-city-missouri-custom-software",
    "manhattan-kansas",
    "hays-kansas",
  ],
};
