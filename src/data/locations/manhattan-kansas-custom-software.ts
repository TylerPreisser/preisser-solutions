import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/manhattan-kansas-custom-software
 * Manhattan, KS — Riley County. Custom software intent variant.
 */
export const locationData: LocationPageData = {
  slug: "manhattan-kansas-custom-software",
  city: "Manhattan",
  state: "Kansas",
  region: "Northeast Kansas & Flint Hills",
  coordinates: { lat: 39.183, lng: -96.572 },

  metaTitle: "Manhattan, KS Custom Software",
  metaDescription:
    "Custom software, web applications, and AI automation built for Manhattan, Kansas businesses: fixed-price proposals, full code ownership.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Custom Software in Manhattan, Kansas",
    h1: "Custom Software Development for Manhattan Businesses",
    subheadline:
      "Custom web applications, dashboards, and AI automation built for Manhattan's university, agribusiness, defense, and professional-services markets.",
    answerParagraph:
      "Preisser Solutions builds custom software for businesses in Manhattan, Kansas, a Riley County city of approximately 55,000 and home to Kansas State University, Fort Riley, and a significant agribusiness and technology sector. Custom web applications, internal tools, research-facing portals, and AI automation are the core offering. Fixed-price proposals, full code ownership at launch.",
  },

  nearbyAreas: [
    { name: "Junction City, KS", href: "/locations/junction-city-kansas-web-design", distanceLabel: "25 mi E" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "50 mi E" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "55 mi W" },
    { name: "Emporia, KS", href: "/locations/emporia-kansas-web-design", distanceLabel: "90 mi SE" },
    { name: "Abilene, KS", distanceLabel: "45 mi W" },
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "75 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "130 mi W" },
    { name: "Concordia, KS", distanceLabel: "65 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Manhattan's KSU and Fort Riley context: custom tools for research operations, agribusiness workflows, and defense-adjacent contractors.",
    "Custom code with full ownership at launch. No SaaS platform or vendor dependency after handoff.",
    "Remote delivery from Hays with on-site travel for projects of sufficient scope.",
  ],

  industriesServed: [
    "Higher Education",
    "Agribusiness",
    "Defense",
    "Healthcare",
    "Technology",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build custom software for Manhattan, Kansas businesses?",
      answer:
        "Yes. Custom web applications, internal tools, dashboards, and AI automation for Manhattan businesses are a core offering.",
    },
    {
      question: "Can you build tools for Kansas State University vendors or technology partners?",
      answer:
        "Yes. Web applications, data portals, and operational tools for university-adjacent businesses and contractors are within standard capability.",
    },
    {
      question: "What industries does Preisser Solutions serve in Manhattan, Kansas?",
      answer:
        "Higher education, agribusiness, defense-adjacent businesses, healthcare, technology startups, and professional services.",
    },
    {
      question: "Can you build AI automation for a Manhattan agribusiness operation?",
      answer:
        "Yes. AI document processing, workflow automation, and data tools for agribusiness operations are an explicit service line.",
    },
    {
      question: "How does Preisser Solutions deliver custom software to Manhattan clients?",
      answer:
        "Build work is delivered remotely with weekly Friday previews. On-site travel to Manhattan from Hays (130 miles) is standard for larger engagements.",
    },
    {
      question: "How does Preisser Solutions price custom software for Manhattan clients?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Manhattan operation?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "manhattan-kansas",
    "manhattan-kansas-seo",
    "junction-city-kansas-web-design",
    "salina-kansas",
  ],
};
