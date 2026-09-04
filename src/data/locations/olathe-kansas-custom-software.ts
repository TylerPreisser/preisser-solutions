import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "olathe-kansas-custom-software",
  city: "Olathe",
  state: "Kansas",
  region: "Kansas City Metro",
  coordinates: { lat: 38.884, lng: -94.820 },

  metaTitle: "Olathe, KS Custom Software Development",
  metaDescription:
    "Custom software, AI automation, and web applications for Olathe, Kansas: built by a Kansas-based firm for the Johnson County manufacturing and healthcare market.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Olathe, Kansas",
    h1: "Custom Software Development for Olathe Businesses",
    subheadline:
      "Custom web applications, AI automation, and operational dashboards for Olathe's manufacturing and healthcare economy: built at Kansas pricing, not KC metro agency rates.",
    answerParagraph:
      "Preisser Solutions serves Olathe, Kansas businesses with custom software, AI automation, custom web applications, dashboards, and local SEO and AI-search optimization. Olathe is Johnson County's industrial anchor: a 145,000-person city with a strong manufacturing, distribution, and healthcare base that generates persistent demand for custom operational tooling. Based in Hays, roughly 280 miles west, we deliver remotely and travel for projects of meaningful scope.",
  },

  nearbyAreas: [
    { name: "Overland Park, KS", href: "/locations/overland-park-kansas-custom-software", distanceLabel: "10 mi NE" },
    { name: "Lenexa, KS", href: "/locations/lenexa-kansas-custom-software", distanceLabel: "8 mi N" },
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "30 mi W" },
    { name: "Kansas City, MO", distanceLabel: "22 mi NE" },
    { name: "Gardner, KS", distanceLabel: "12 mi SW" },
    { name: "Shawnee, KS", distanceLabel: "12 mi N" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "60 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "280 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Olathe's manufacturing and healthcare operations need custom internal tools, not the marketing retainers that Johnson County agencies typically sell.",
    "A Kansas-based firm at Kansas economics. Custom software from Hays is structurally less expensive than a KC metro agency on the same scope, with the same engineering quality.",
    "Custom code with full ownership. Johnson County businesses with any proprietary IP or operational data benefit significantly from full-ownership software vs. SaaS lock-in.",
  ],

  industriesServed: [
    "Manufacturing",
    "Healthcare",
    "Distribution & Logistics",
    "Professional Services",
    "Technology",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Olathe, Kansas?",
      answer:
        "Yes. Olathe is a Tier-1 engagement market. Build work is delivered remotely with travel to Olathe for in-person scoping and milestone meetings on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Olathe?",
      answer:
        "About 280 miles east via I-70, roughly three hours and forty minutes. The firm travels for scoping and milestone meetings as a standard part of significant engagements.",
    },
    {
      question: "What does Preisser Solutions build for Olathe manufacturers and distributors?",
      answer:
        "Custom web applications, production and ops dashboards, inventory management systems, AI document processing for purchase orders and invoices, and supplier data integrations. Olathe's manufacturing density is a strong match for internal-tooling engagements.",
    },
    {
      question: "Can Preisser Solutions build custom healthcare software for Olathe-based practices?",
      answer:
        "Yes. Patient intake automation, clinical workflow tools, staff scheduling systems, and document processing are within scope. Healthcare builds are architected with proper data handling from the ground up.",
    },
    {
      question: "Does Preisser Solutions compete with KC metro custom-software firms?",
      answer:
        "Yes, on the specific builds. For manufacturing dashboards, AI automation, and custom web applications, the firm delivers the same engineering quality at a structurally lower rate because it operates from Hays, not the metro.",
    },
    {
      question: "What is the engagement model for an Olathe custom-software project?",
      answer:
        "Scoping call, fixed-price written proposal with scope and milestones, weekly working previews during build sprints, launch with full code ownership transferred, and 30 days of post-launch support included.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Olathe?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["overland-park-kansas-custom-software", "lenexa-kansas-custom-software", "lawrence-kansas-web-design", "topeka-kansas"],
};
