import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "lenexa-kansas-custom-software",
  city: "Lenexa",
  state: "Kansas",
  region: "Kansas City Metro",
  coordinates: { lat: 38.952, lng: -94.733 },

  metaTitle: "Lenexa, KS Custom Software Development",
  metaDescription:
    "Custom software, AI automation, and web applications for Lenexa, Kansas — built by a Kansas-based firm for the Johnson County logistics and distribution economy.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Lenexa, Kansas",
    h1: "Custom Software Development for Lenexa Businesses",
    subheadline:
      "Custom web applications, AI automation, and logistics-operations tooling for Lenexa's distribution and warehousing economy — engineered at Kansas rates.",
    answerParagraph:
      "Preisser Solutions serves Lenexa, Kansas businesses with custom software, AI automation, custom web applications, dashboards, and local SEO and AI-search optimization. Lenexa is a Johnson County logistics and distribution hub — one of the stronger warehouse and fulfillment concentrations in the greater KC metro. Custom inventory platforms, shipment-tracking tools, and warehouse-operations dashboards are recurring builds for operators in this market. Based in Hays, roughly 280 miles west, we deliver remotely and travel for projects of meaningful scope.",
  },

  nearbyAreas: [
    { name: "Overland Park, KS", href: "/locations/overland-park-kansas-custom-software", distanceLabel: "8 mi E" },
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "8 mi S" },
    { name: "Shawnee, KS", distanceLabel: "5 mi N" },
    { name: "Kansas City, KS", distanceLabel: "12 mi NE" },
    { name: "Kansas City, MO", distanceLabel: "18 mi NE" },
    { name: "Merriam, KS", distanceLabel: "5 mi NE" },
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "38 mi SW" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "280 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Lenexa's logistics and distribution operators need custom warehouse-management and shipment-tracking tools that off-the-shelf WMS products don't address at mid-market scale.",
    "Kansas-based at Kansas economics — structurally less expensive than a KC metro agency for the same engineering output.",
    "Custom code with full ownership at launch. Logistics operations running on custom software own a competitive advantage that SaaS platforms cannot provide.",
  ],

  industriesServed: [
    "Logistics & Distribution",
    "Warehousing",
    "Manufacturing",
    "Technology",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Lenexa, Kansas?",
      answer:
        "Yes. Lenexa is a Tier-2 engagement market within the Johnson County cluster. Build work is delivered remotely with travel for scoping and milestone meetings on projects of meaningful scope.",
    },
    {
      question: "How far is Hays from Lenexa?",
      answer:
        "About 280 miles east via I-70, roughly three hours and forty minutes. The firm travels for in-person work as a standard part of significant engagements.",
    },
    {
      question: "What does Preisser Solutions build for Lenexa logistics and distribution firms?",
      answer:
        "Custom warehouse-management dashboards, inventory tracking platforms, shipment-status tools, AI document processing for bills of lading and packing lists, and carrier-data integrations. Distribution operations are a well-matched vertical.",
    },
    {
      question: "Can Preisser Solutions build a custom inventory system for a Lenexa warehouse operator?",
      answer:
        "Yes. Custom inventory platforms — receiving, bin management, transfers, order fulfillment, and cost tracking — are a documented capability. The HG Oil Holdings inventory system is a direct analogue for warehouse-scale data management.",
    },
    {
      question: "Does Preisser Solutions build AI automation for Lenexa logistics companies?",
      answer:
        "Yes. AI document extraction for shipping documents, automated order routing, and workflow automation for fulfillment operations are all within scope.",
    },
    {
      question: "How does Preisser Solutions compare to enterprise WMS vendors for Lenexa operators?",
      answer:
        "Enterprise WMS platforms are built for the widest possible market. Custom software from Preisser Solutions is built for your specific operation, your specific workflows, and your specific data. You own it outright when it ships.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Lenexa?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["overland-park-kansas-custom-software", "olathe-kansas-custom-software", "lawrence-kansas-web-design", "topeka-kansas"],
};
