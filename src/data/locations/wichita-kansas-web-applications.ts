import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/wichita-kansas-web-applications
 * Wichita, KS — Web applications intent variant.
 */
export const locationData: LocationPageData = {
  slug: "wichita-kansas-web-applications",
  city: "Wichita",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.692, lng: -97.330 },

  metaTitle: "Web Applications in Wichita, KS",
  metaDescription:
    "Custom web applications — dashboards, internal tools, client portals, CRMs — built for Wichita, Kansas businesses. Fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Web Applications in Wichita, Kansas",
    h1: "Custom Web Applications for Wichita Businesses",
    subheadline:
      "Dashboards, internal tools, client portals, and custom CRMs purpose-built for Wichita's aerospace, manufacturing, and healthcare operations.",
    answerParagraph:
      "Preisser Solutions builds custom web applications for businesses in Wichita, Kansas — internal tools, operational dashboards, client portals, and custom CRMs engineered for the specific workflows of Wichita's dominant industries: aerospace and aviation supply chain, manufacturing, healthcare, and financial services. Full code ownership, fixed-price proposals, modern stack.",
  },

  nearbyAreas: [
    { name: "Derby, KS", href: "/locations/derby-kansas-web-design", distanceLabel: "12 mi SE" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "40 mi NW" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "25 mi N" },
    { name: "McPherson, KS", href: "/locations/mcpherson-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "El Dorado, KS", distanceLabel: "30 mi E" },
    { name: "Winfield, KS", href: "/locations/winfield-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "90 mi N" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "200 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Wichita aerospace and manufacturing operations need custom web tools — not off-the-shelf software that doesn't fit the workflow.",
    "Every application is built in Next.js, React, and TypeScript. Full code ownership transferred at launch.",
    "Fixed-price proposals ensure no scope creep. Milestones visible to you every Friday.",
  ],

  industriesServed: [
    "Aerospace & Aviation",
    "Manufacturing",
    "Healthcare",
    "Financial Services",
    "Logistics",
    "Professional Services",
  ],

  faq: [
    {
      question: "What kinds of web applications does Preisser Solutions build for Wichita businesses?",
      answer:
        "Internal tools, operational dashboards, inventory and production tracking systems, client portals, custom CRMs, and AI-powered workflow automation.",
    },
    {
      question: "Can Preisser Solutions build a web app for a Wichita aerospace supplier?",
      answer:
        "Yes. Custom web applications for production tracking, parts inventory, and supplier portal use cases in aerospace are within the firm's capability.",
    },
    {
      question: "How long does a custom web application take to build?",
      answer:
        "Most custom web applications take 4-12 weeks depending on scope. Scope, timeline, and cost are all agreed in a fixed-price proposal before work begins.",
    },
    {
      question: "Do Wichita businesses own the code after the project is done?",
      answer:
        "Yes. Full code ownership is transferred at launch. The codebase is yours — deployable to your infrastructure, modifiable by any developer.",
    },
    {
      question: "Does Preisser Solutions build web apps for Wichita healthcare providers?",
      answer:
        "Yes. Custom web applications, patient-facing portals, and operational tools for healthcare providers are within standard capability.",
    },
    {
      question: "Can you integrate a custom Wichita web app with existing systems?",
      answer:
        "Yes. Integration with existing databases, ERPs, CRMs, and third-party APIs is standard. All integrations are scoped and priced up front.",
    },
  ],

  cta: {
    headline: "Ready to build a custom web application in Wichita?",
    subcopy:
      "Book a free scoping call. We will map your workflow and spec a fixed-price proposal.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "wichita-kansas",
    "wichita-kansas-custom-software",
    "derby-kansas-web-design",
    "hutchinson-kansas-web-design",
  ],
};
