import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS } from "./shared";
import type { LocationServiceCard } from "@/types/location";

/**
 * /locations/hays-kansas-insurance-software
 * Hays, KS — Ellis County. Insurance software industry × city combination.
 */

const INSURANCE_SERVICE_CARDS: LocationServiceCard[] = [
  {
    icon: "dashboard",
    title: "Agency Management Dashboard",
    bullets: [
      "Custom dashboards for policy tracking, renewals, and client status",
      "Pipeline and commission reporting for producer teams",
      "Carrier relationship and appetite tracking",
    ],
    href: "/services",
  },
  {
    icon: "automation",
    title: "AI Policy & Document Automation",
    bullets: [
      "AI-powered policy intake, change request routing, and renewal workflows",
      "Automated document processing for ACORD forms and certificates",
      "Eliminate manual data entry across carrier portals",
    ],
    href: "/services",
  },
  {
    icon: "website",
    title: "Insurance Agency Website & SEO",
    bullets: [
      "Custom-coded agency websites built for local search and lead generation",
      "Quote request forms with CRM integration",
      "AI-search optimization to be cited in insurance recommendation queries",
    ],
    href: "/services",
  },
  {
    icon: "document",
    title: "Client Communication Tools",
    bullets: [
      "Automated renewal reminder sequences and coverage review workflows",
      "Digital certificate delivery and tracking",
      "Post-service review request automation",
    ],
    href: "/services",
  },
];

export const locationData: LocationPageData = {
  slug: "hays-kansas-insurance-software",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Insurance Agency Software in Hays, KS",
  metaDescription:
    "Custom insurance agency software, policy dashboards, and AI document automation for insurance businesses in Hays, Kansas.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Insurance Software in Hays, Kansas",
    h1: "Custom Software for Insurance Agencies in Hays",
    subheadline:
      "Agency management dashboards, AI policy and document automation, renewal workflows, and websites for insurance agencies in Hays and western Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom software for insurance agencies in Hays, Kansas: agency management dashboards, AI-powered ACORD form processing, policy renewal workflows, certificate delivery automation, and agent websites. Hays is the regional commercial center for western Kansas with a significant insurance industry serving agricultural, energy, and commercial markets. Based locally, available for in-person consultation.",
  },

  nearbyAreas: [
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "12 mi W" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SE" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Plainville, KS", href: "/locations/plainville-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Russell, KS", distanceLabel: "35 mi E" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W" },
  ],

  serviceCards: INSURANCE_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "We are headquartered in Hays and serve the local insurance market directly. In-person scoping is practical.",
    "Insurance agencies have high-volume, repetitive document workflows: exactly the work AI automation is built for.",
    "Custom code with full ownership at launch. No per-user AMS licensing after handoff.",
  ],

  industriesServed: [
    "Property & Casualty Insurance",
    "Crop & Agricultural Insurance",
    "Life & Health Insurance",
    "Commercial Insurance",
    "Independent Agencies",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build software for insurance agencies in Hays?",
      answer:
        "Yes. Agency management dashboards, AI document processing, renewal automation, and agency websites are all offered for insurance businesses in Hays.",
    },
    {
      question: "Can Preisser Solutions automate ACORD form processing for a Hays agency?",
      answer:
        "Yes. AI-powered intake, extraction, and routing for ACORD forms, certificates of insurance, and policy change requests is an explicit service.",
    },
    {
      question: "Can you build a custom agency management dashboard?",
      answer:
        "Yes. Custom web applications for policy tracking, renewal pipelines, commission reporting, and carrier management are within standard capability.",
    },
    {
      question: "Does Preisser Solutions build websites for Hays insurance agencies?",
      answer:
        "Yes. Custom-coded agency websites with quote request forms, local SEO, and AI-search optimization are offered.",
    },
    {
      question: "Does Preisser Solutions specialize in crop and agricultural insurance software?",
      answer:
        "Crop insurance is a significant line in western Kansas. Custom tools for crop policy workflows, multi-peril tracking, and producer portals are within the firm's capability.",
    },
    {
      question: "How does Preisser Solutions price insurance software projects?",
      answer:
        "All projects use fixed-price proposals. Scope, deliverables, and total cost are agreed before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Hays insurance agency?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hays-kansas-healthcare-software",
    "hays-kansas-seo",
    "great-bend-kansas-web-design",
  ],
};
