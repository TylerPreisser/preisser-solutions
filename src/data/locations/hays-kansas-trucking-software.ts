import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS } from "./shared";
import type { LocationServiceCard } from "@/types/location";

/**
 * /locations/hays-kansas-trucking-software
 * Hays, KS — Ellis County. Trucking software industry × city combination.
 */

const TRUCKING_SERVICE_CARDS: LocationServiceCard[] = [
  {
    icon: "dashboard",
    title: "Fleet & Load Management Dashboard",
    bullets: [
      "Custom dashboards for load tracking, driver status, and fleet utilization",
      "Carrier and shipper relationship management",
      "Revenue and cost reporting per load and per driver",
    ],
    href: "/services",
  },
  {
    icon: "document",
    title: "AI Document Processing",
    bullets: [
      "AI-powered BOL, POD, and freight invoice intake",
      "Automated document routing and approval chains",
      "Eliminate manual data entry for dispatch paperwork",
    ],
    href: "/services",
  },
  {
    icon: "automation",
    title: "Dispatch & Driver Automation",
    bullets: [
      "Automated load assignment and driver notification workflows",
      "ELD and telematics data integration where APIs permit",
      "Compliance checklist automation for DOT requirements",
    ],
    href: "/services",
  },
  {
    icon: "website",
    title: "Carrier & Broker Website",
    bullets: [
      "Custom-coded trucking company and freight broker websites",
      "Load board integration and carrier qualification portals",
      "Built for local and regional search visibility",
    ],
    href: "/services",
  },
];

export const locationData: LocationPageData = {
  slug: "hays-kansas-trucking-software",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Trucking & Fleet Software in Hays, KS",
  metaDescription:
    "Custom trucking software, fleet dashboards, and AI document automation for carriers and freight brokers in Hays, Kansas.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Trucking Software in Hays, Kansas",
    h1: "Custom Software for Trucking and Freight Operations in Hays",
    subheadline:
      "Fleet management dashboards, AI document processing, dispatch automation, and websites for carriers and freight brokers in Hays and western Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom software for trucking and freight operations in Hays, Kansas — fleet management dashboards, AI-powered BOL and invoice processing, dispatch automation, and carrier websites. Hays sits at the I-70 corridor, a major east-west freight route through Kansas. We serve carriers, owner-operators, and freight brokers in the Hays and western Kansas trucking market.",
  },

  nearbyAreas: [
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "12 mi W" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SE" },
    { name: "Oakley, KS", href: "/locations/oakley-kansas-web-design", distanceLabel: "85 mi W" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "Russell, KS", distanceLabel: "35 mi E" },
  ],

  serviceCards: TRUCKING_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Hays is on I-70 — the primary east-west freight corridor through Kansas. We are local to the trucking market we serve.",
    "Custom trucking software built for actual dispatch and fleet operations — not generic CRM platforms repurposed for freight.",
    "Custom code with full ownership at launch. No per-truck or per-driver SaaS licensing after handoff.",
  ],

  industriesServed: [
    "Trucking & Freight",
    "Logistics",
    "Owner-Operators",
    "Freight Brokerage",
    "Agricultural Hauling",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build custom software for trucking companies in Hays?",
      answer:
        "Yes. Fleet management dashboards, AI document processing, dispatch automation, and carrier websites are all offered for trucking businesses in Hays and western Kansas.",
    },
    {
      question: "Can Preisser Solutions automate BOL and invoice processing for a Hays carrier?",
      answer:
        "Yes. AI-powered BOL, POD, and freight invoice intake — with automated routing and coding — is an explicit service line.",
    },
    {
      question: "What is a fleet management dashboard?",
      answer:
        "A custom web application that centralizes load status, driver location and availability, fleet utilization, and revenue per load in one view — replacing spreadsheets and manual reporting.",
    },
    {
      question: "Can Preisser Solutions build a website for a Hays trucking company?",
      answer:
        "Yes. Custom carrier and freight broker websites — including load board integration and carrier qualification portals — are within standard capability.",
    },
    {
      question: "Does Preisser Solutions work with owner-operators or only larger fleets?",
      answer:
        "Both. Software scope is sized to the operation. Owner-operators often benefit most from AI document processing; larger fleets from full fleet management dashboards.",
    },
    {
      question: "How does Preisser Solutions price trucking software projects?",
      answer:
        "All projects use fixed-price proposals. Scope, deliverables, and total cost are agreed before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Hays trucking operation?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hays-kansas-oil-gas-software",
    "hays-kansas-hvac-software",
    "colby-kansas-web-design",
  ],
};
