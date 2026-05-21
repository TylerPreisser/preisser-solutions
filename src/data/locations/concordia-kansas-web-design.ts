import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "concordia-kansas-web-design",
  city: "Concordia",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 39.571, lng: -97.662 },

  metaTitle: "Web Design & Custom Software in Concordia, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Concordia, Kansas — built by a Hays-based firm serving the US-81 north-central corridor.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Concordia, Kansas",
    h1: "Custom Software and Websites for Concordia Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Cloud County's agriculture, healthcare, and professional services economy along the US-81 corridor.",
    answerParagraph:
      "Preisser Solutions serves Concordia, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Concordia is the Cloud County seat and a US-81 hub that bridges the north-central Kansas agricultural belt with the I-70 corridor markets. Based in Hays — roughly 110 miles southwest — we deliver remotely and travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "55 mi S" },
    { name: "Smith Center, KS", href: "/locations/smith-center-kansas-web-design", distanceLabel: "45 mi W" },
    { name: "Beloit, KS", distanceLabel: "30 mi SE" },
    { name: "Mankato, KS", distanceLabel: "40 mi W" },
    { name: "Superior, NE", distanceLabel: "35 mi N" },
    { name: "Belleville, KS", distanceLabel: "30 mi NE" },
    { name: "Osborne, KS", distanceLabel: "35 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "110 mi SW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "North-central Kansas county-seat context — wheat, cattle, and the healthcare and professional-services ecosystem that runs alongside — is a familiar operating environment.",
    "US-81 corridor communities are often underserved by digital vendors that focus on metro markets. Custom code from a nearby Kansas firm fills the gap.",
    "Custom code with full ownership at launch. No ongoing platform fees on software that runs your core operations.",
  ],

  industriesServed: [
    "Agriculture",
    "Healthcare",
    "Professional Services",
    "Trades",
    "Education & Civic",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Concordia, Kansas?",
      answer:
        "Yes. Concordia is within the firm's north-central Kansas service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Concordia?",
      answer:
        "About 110 miles southwest via US-281 and US-24, roughly an hour and forty minutes. Travel for in-person work is treated as a standard part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Concordia businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization for agricultural operators, healthcare practices, and county-seat professional services firms.",
    },
    {
      question: "Can Preisser Solutions build a custom website for a Concordia healthcare practice?",
      answer:
        "Yes. Custom healthcare practice sites — appointment-ready, HIPAA-aware architecture, strong local and AI-search optimization — are a standard service offering.",
    },
    {
      question: "Do you offer document automation for Cloud County professional services firms?",
      answer:
        "Yes. AI document extraction and workflow routing for law offices, financial advisors, and insurance agencies along the US-81 corridor are recurring builds.",
    },
    {
      question: "How does Preisser Solutions compare to national template vendors for rural Kansas markets?",
      answer:
        "Custom code from scratch, full ownership, and a fixed price scoped to the engagement. No recurring platform fees and no offshore build team — a single engineer who knows the market.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Concordia?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["salina-kansas", "hays-kansas", "smith-center-kansas-web-design", "manhattan-kansas"],
};
