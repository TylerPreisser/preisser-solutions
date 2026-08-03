import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "hutchinson-kansas-web-design",
  city: "Hutchinson",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.061, lng: -97.929 },

  metaTitle: "Hutchinson, KS Web Design & Software",
  metaDescription:
    "Custom software, web apps, and AI automation for Hutchinson, Kansas — built by a Hays-based firm for the Reno County B2B market.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Hutchinson, Kansas",
    h1: "Custom Software and Websites for Hutchinson Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Reno County's manufacturing, energy, and professional services economy — one of the densest B2B markets in central Kansas.",
    answerParagraph:
      "Preisser Solutions serves Hutchinson, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. At 40,000 people, Hutchinson is one of the larger cities in central Kansas with real manufacturing density, salt mining, and agricultural processing that generate ongoing demand for custom operational tooling. Based in Hays — roughly 130 miles northwest — we deliver remotely and travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "50 mi SE" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "30 mi E" },
    { name: "McPherson, KS", href: "/locations/mcpherson-kansas-web-design", distanceLabel: "35 mi N" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "60 mi SW" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "55 mi W" },
    { name: "Sterling, KS", distanceLabel: "30 mi W" },
    { name: "Lyons, KS", distanceLabel: "25 mi NW" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "130 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Hutchinson's manufacturing and salt-mining sector creates demand for custom inventory systems, ops dashboards, and AI document processing that national SaaS vendors do not cover well.",
    "A Kansas-based firm working at Kansas economics — not a coastal agency charging coastal rates for Reno County projects.",
    "Custom code with full ownership at launch. No per-seat SaaS fees on software that runs your core operations.",
  ],

  industriesServed: [
    "Manufacturing",
    "Salt & Mining",
    "Agricultural Processing",
    "Professional Services",
    "Healthcare",
    "Distribution",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Hutchinson, Kansas?",
      answer:
        "Yes. Hutchinson is a regular Tier-2 engagement market. The firm is based in Hays, roughly 130 miles northwest, and travels for scoping and milestone meetings on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Hutchinson?",
      answer:
        "About 130 miles northwest via US-50 and US-56, roughly two hours. Travel for in-person work is treated as a normal part of engagements of sufficient scope.",
    },
    {
      question: "What does Preisser Solutions build for Hutchinson manufacturers and distributors?",
      answer:
        "Custom web applications, production dashboards, inventory systems, AI document processing, supplier scorecards, and ops automation. Hutchinson's manufacturing density generates strong demand for internal-tooling builds.",
    },
    {
      question: "Can Preisser Solutions automate invoice and document processing for a Hutchinson business?",
      answer:
        "Yes. AI document processing — extracting vendors, line items, totals, and GL codes from invoices and routing for approval — is a packaged, production-ready capability.",
    },
    {
      question: "Does Preisser Solutions serve healthcare and professional services in Hutchinson?",
      answer:
        "Yes. Healthcare practices, law firms, financial advisors, and insurance agencies in Hutchinson regularly need client intake automation, document workflows, and custom portals that off-the-shelf tools do not handle well.",
    },
    {
      question: "What is the difference between Preisser Solutions and a Wichita-market agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm, not a marketing agency. Where Wichita agencies optimize ad spend, we build the internal tools and websites that generate the pipeline in the first place.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Hutchinson?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["wichita-kansas", "great-bend-kansas", "mcpherson-kansas-web-design", "newton-kansas-web-design"],
};
