import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/wichita-kansas-custom-software
 * Wichita, KS — Sedgwick County. Custom software intent variant.
 */
export const locationData: LocationPageData = {
  slug: "wichita-kansas-custom-software",
  city: "Wichita",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.692, lng: -97.330 },

  metaTitle: "Wichita, KS Custom Software Development",
  metaDescription:
    "Custom software, web applications, and AI automation built for Wichita, Kansas businesses: fixed-price proposals, full code ownership.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Custom Software in Wichita, Kansas",
    h1: "Custom Software Development for Wichita Businesses",
    subheadline:
      "Custom web applications, dashboards, internal tools, and AI automation built for Wichita's aerospace, manufacturing, healthcare, and professional-services markets.",
    answerParagraph:
      "Preisser Solutions builds custom software for businesses in Wichita, Kansas, a Sedgwick County metro of approximately 397,000 and Kansas's largest city, anchored by aviation and aerospace manufacturing (Spirit AeroSystems, Textron Aviation, Bombardier Learjet), healthcare, and professional services. Custom web applications, operational tools, dashboards, and AI automation are the core offering. Fixed-price proposals, full code ownership at launch.",
  },

  nearbyAreas: [
    { name: "Derby, KS", href: "/locations/derby-kansas-web-design", distanceLabel: "12 mi SE" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "40 mi NW" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "25 mi N" },
    { name: "El Dorado, KS", distanceLabel: "30 mi E" },
    { name: "Winfield, KS", href: "/locations/winfield-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "Arkansas City, KS", href: "/locations/arkansas-city-kansas-web-design", distanceLabel: "60 mi S" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "200 mi NW" },
    { name: "Liberal, KS", href: "/locations/liberal-kansas-web-design", distanceLabel: "165 mi SW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Wichita aerospace and manufacturing context: capability in custom tools for production, inventory, and operational workflows.",
    "Custom code with full ownership at launch. No SaaS platform or per-seat licensing after handoff.",
    "Remote delivery from Hays with on-site travel for projects of sufficient scope.",
  ],

  industriesServed: [
    "Aerospace & Aviation",
    "Manufacturing",
    "Healthcare",
    "Financial Services",
    "Professional Services",
    "Logistics",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build custom software for Wichita businesses?",
      answer:
        "Yes. Custom web applications, internal tools, dashboards, and AI automation for Wichita businesses are the core offering.",
    },
    {
      question: "What industries does Preisser Solutions serve in Wichita?",
      answer:
        "Aerospace, manufacturing, healthcare, financial services, logistics, and professional services are the primary industries served in the Wichita market.",
    },
    {
      question: "Can you build an internal tool for a Wichita aerospace supplier?",
      answer:
        "Yes. Custom web applications for production tracking, inventory management, and operational workflows are within the firm's standard capability.",
    },
    {
      question: "What is the difference between a custom software firm and a Wichita marketing agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm. Websites and local search are scoped when in play; the primary product is internal tools and automation.",
    },
    {
      question: "How does Preisser Solutions deliver projects in Wichita remotely?",
      answer:
        "All build work is delivered remotely with weekly Friday previews. On-site travel to Wichita for scoping and milestones is standard for larger engagements.",
    },
    {
      question: "What is the typical engagement model for a Wichita custom software project?",
      answer:
        "Fixed-price proposal with defined scope, timeline, and milestones. Full code ownership transferred at launch. Thirty-day post-launch support included.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Wichita operation?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "wichita-kansas",
    "wichita-kansas-seo",
    "derby-kansas-web-design",
    "hutchinson-kansas-web-design",
  ],
};
