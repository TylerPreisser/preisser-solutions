import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/colorado-springs-colorado-web-design
 * Colorado Springs, CO — El Paso County. Border-state market.
 */
export const locationData: LocationPageData = {
  slug: "colorado-springs-colorado-web-design",
  city: "Colorado Springs",
  state: "Colorado",
  region: "Border Markets",
  coordinates: { lat: 38.833, lng: -104.821 },

  metaTitle: "Web Design & Custom Software in Colorado Springs, CO | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Colorado Springs businesses — Kansas-based firm delivering remotely to the Front Range.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Colorado Springs, Colorado",
    h1: "Custom Websites and Software for Colorado Springs Businesses",
    subheadline:
      "Custom web design, web applications, and AI automation for Colorado Springs' military, technology, healthcare, and professional-services markets.",
    answerParagraph:
      "Preisser Solutions is a Kansas-based custom software and web development firm serving Colorado Springs, Colorado businesses remotely, with on-site travel for material engagements. Colorado Springs is an El Paso County city of approximately 478,000, anchored by military installations (Peterson SFB, Fort Carson, NORAD/NORTHCOM, Schriever SFB), technology, healthcare, and outdoor industries. Fixed-price proposals, full code ownership.",
  },

  nearbyAreas: [
    { name: "Denver, CO", href: "/locations/denver-colorado-web-design", distanceLabel: "70 mi N" },
    { name: "Pueblo, CO", distanceLabel: "40 mi S" },
    { name: "Castle Rock, CO", distanceLabel: "30 mi N" },
    { name: "Monument, CO", distanceLabel: "15 mi N" },
    { name: "Fountain, CO", distanceLabel: "10 mi S" },
    { name: "Woodland Park, CO", distanceLabel: "20 mi W" },
    { name: "Lamar, CO", distanceLabel: "150 mi SE" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "345 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a Kansas-based firm serving Colorado Springs and the Front Range remotely, with on-site travel for material engagements.",
    "Colorado Springs' defense and technology sectors require custom tools — not page-builder websites or generic SaaS applications.",
    "Custom code with full ownership at launch. No vendor lock-in.",
  ],

  industriesServed: [
    "Defense & Military",
    "Technology",
    "Healthcare",
    "Aerospace",
    "Professional Services",
    "Outdoor & Recreation",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Colorado Springs businesses?",
      answer:
        "Yes. Preisser Solutions is a Kansas-based firm serving Colorado Springs businesses remotely, with on-site travel available for larger engagements.",
    },
    {
      question: "Can Preisser Solutions work with defense contractors in Colorado Springs?",
      answer:
        "Yes. Custom web applications, internal tools, and operational dashboards for defense-adjacent contractors are within standard capability.",
    },
    {
      question: "What industries does Preisser Solutions serve in Colorado Springs?",
      answer:
        "Defense and military, technology, healthcare, aerospace, professional services, and outdoor/recreation are the primary industries.",
    },
    {
      question: "How does remote delivery work for Colorado Springs clients?",
      answer:
        "All build work is delivered remotely with weekly previews. For projects of sufficient scope, on-site travel to Colorado Springs is a normal part of the engagement.",
    },
    {
      question: "Does Preisser Solutions offer AI automation for Colorado Springs businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents for back-office operations are offered.",
    },
    {
      question: "What is the pricing model for Colorado Springs projects?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Colorado Springs?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Front Range business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "denver-colorado-web-design",
    "wichita-kansas",
    "hays-kansas",
    "oklahoma-city-oklahoma-custom-software",
  ],
};
