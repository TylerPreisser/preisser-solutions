import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/lawrence-kansas-custom-software
 * Lawrence, KS — Douglas County. Custom software intent variant.
 */
export const locationData: LocationPageData = {
  slug: "lawrence-kansas-custom-software",
  city: "Lawrence",
  state: "Kansas",
  region: "Eastern Kansas",
  coordinates: { lat: 38.971, lng: -95.235 },

  metaTitle: "Lawrence, KS Custom Software",
  metaDescription:
    "Custom software, web applications, and AI automation built for Lawrence, Kansas businesses — fixed-price proposals, full code ownership.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Custom Software in Lawrence, Kansas",
    h1: "Custom Software Development for Lawrence Businesses",
    subheadline:
      "Custom web applications, dashboards, and AI automation built for Lawrence's University of Kansas community, startups, and professional-services market.",
    answerParagraph:
      "Preisser Solutions builds custom software for businesses in Lawrence, Kansas — a Douglas County city of approximately 95,000 and home to the University of Kansas. Lawrence's economy features education, healthcare, technology startups, and creative industries. Custom web applications, internal tools, research portals, and AI automation are the core offering. Fixed-price proposals, full code ownership at launch.",
  },

  nearbyAreas: [
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "25 mi W" },
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "35 mi E" },
    { name: "Overland Park, KS", href: "/locations/overland-park-kansas-custom-software", distanceLabel: "40 mi E" },
    { name: "Ottawa, KS", href: "/locations/ottawa-kansas-web-design", distanceLabel: "30 mi S" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "75 mi W" },
    { name: "Emporia, KS", href: "/locations/emporia-kansas-web-design", distanceLabel: "75 mi S" },
    { name: "Atchison, KS", href: "/locations/atchison-kansas-web-design", distanceLabel: "60 mi N" },
    { name: "Lenexa, KS", href: "/locations/lenexa-kansas-custom-software", distanceLabel: "35 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Lawrence's KU community and startup ecosystem creates demand for custom tools — portals, dashboards, research applications.",
    "Custom code with full ownership at launch. No SaaS dependency or vendor lock-in after handoff.",
    "Remote delivery from Hays with on-site travel for projects of sufficient scope.",
  ],

  industriesServed: [
    "Higher Education",
    "Technology & Startups",
    "Healthcare",
    "Creative Industries",
    "Professional Services",
    "Nonprofit",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build custom software for Lawrence, Kansas businesses?",
      answer:
        "Yes. Custom web applications, internal tools, dashboards, and AI automation for Lawrence businesses are a core offering.",
    },
    {
      question: "Can you build tools for University of Kansas vendors or technology partners?",
      answer:
        "Yes. Web applications, data portals, and operational tools for university-adjacent businesses and contractors are within standard capability.",
    },
    {
      question: "What industries does Preisser Solutions serve in Lawrence, Kansas?",
      answer:
        "Higher education, technology startups, healthcare, creative industries, professional services, and nonprofits are the primary markets in Lawrence.",
    },
    {
      question: "Can Preisser Solutions build AI automation for a Lawrence technology startup?",
      answer:
        "Yes. AI workflow automation, document processing, and AI agents are offered to technology companies and startups in Lawrence.",
    },
    {
      question: "How does Preisser Solutions deliver custom software to Lawrence clients remotely?",
      answer:
        "All build work is delivered remotely with weekly Friday previews. On-site travel to Lawrence (195 miles from Hays) is available for larger engagements.",
    },
    {
      question: "What is the typical project timeline for a Lawrence custom software build?",
      answer:
        "Most custom web applications take 4-12 weeks depending on scope. Scope, timeline, and cost are all agreed in a fixed-price proposal before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Lawrence operation?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "lawrence-kansas-web-design",
    "topeka-kansas",
    "olathe-kansas-custom-software",
    "overland-park-kansas-custom-software",
  ],
};
