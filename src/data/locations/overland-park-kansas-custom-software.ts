import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "overland-park-kansas-custom-software",
  city: "Overland Park",
  state: "Kansas",
  region: "Kansas City Metro",
  coordinates: { lat: 38.982, lng: -94.669 },

  metaTitle: "Overland Park, KS Custom Software",
  metaDescription:
    "Custom software, business automation, and web applications for Overland Park, Kansas, built for the Johnson County professional services economy.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Overland Park, Kansas",
    h1: "Custom Software Development for Overland Park Businesses",
    subheadline:
      "Custom web applications, AI automation, and financial-services tooling for Johnson County's largest city: built at Kansas pricing, not coastal agency rates.",
    answerParagraph:
      "Preisser Solutions serves Overland Park, Kansas businesses with custom software, AI automation, custom web applications, dashboards, and local SEO and AI-search optimization. Overland Park is Kansas's largest city and the center of gravity for Johnson County's financial services, insurance, and corporate services economy. That concentration of professional-services and financial firms generates strong demand for custom document automation, client portals, and operational dashboards. Based in Hays, roughly 285 miles west, we deliver remotely and travel for projects of meaningful scope.",
  },

  nearbyAreas: [
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "10 mi SW" },
    { name: "Lenexa, KS", href: "/locations/lenexa-kansas-custom-software", distanceLabel: "8 mi W" },
    { name: "Kansas City, MO", distanceLabel: "15 mi N" },
    { name: "Leawood, KS", distanceLabel: "5 mi NE" },
    { name: "Shawnee, KS", distanceLabel: "10 mi NW" },
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "40 mi SW" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "65 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "285 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Overland Park's financial services and insurance sector needs custom client portals, compliance-document automation, and reporting dashboards: builds where engineering depth matters more than design trend.",
    "A Kansas-based firm structurally less expensive than a KC metro or national agency. The same engineering quality at costs built around a non-metro economics.",
    "Custom code with full ownership. Financial services clients benefit especially from owning the software that handles client data rather than embedding it in a third-party SaaS platform.",
  ],

  industriesServed: [
    "Financial Services",
    "Insurance",
    "Professional Services",
    "Corporate Technology",
    "Healthcare",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Overland Park, Kansas?",
      answer:
        "Yes. Overland Park is a Tier-1 engagement market. Build work is delivered remotely with travel for scoping and milestone meetings on projects of meaningful scope.",
    },
    {
      question: "How far is Hays from Overland Park?",
      answer:
        "About 285 miles east via I-70, roughly three hours and forty-five minutes. The firm travels for in-person scoping and milestone meetings as a standard part of significant engagements.",
    },
    {
      question: "What does Preisser Solutions build for Overland Park financial services firms?",
      answer:
        "Custom client portals, compliance-document automation, reporting dashboards, AI-powered document extraction, and operational workflow tools. Johnson County's financial and insurance density is well-matched to these builds.",
    },
    {
      question: "Can Preisser Solutions build AI automation for an Overland Park insurance or financial firm?",
      answer:
        "Yes. Document processing automation (extracting structured data from applications, contracts, and forms) is a production-ready capability well-suited to insurance and financial services workflows.",
    },
    {
      question: "Does Preisser Solutions build custom reporting dashboards for Overland Park corporate clients?",
      answer:
        "Yes. Role-based executive dashboards, operations visibility tools, and KPI reporting interfaces are core service offerings. Builds are deployed on modern infrastructure with full client ownership.",
    },
    {
      question: "How does Preisser Solutions compare to large KC metro software firms for Overland Park clients?",
      answer:
        "Structurally lower cost for the same engineering quality, full code ownership at launch, and a single decision-maker who writes the code and responds to calls. For mid-market builds, that model outperforms a large-agency team structure.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Overland Park?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["olathe-kansas-custom-software", "lenexa-kansas-custom-software", "topeka-kansas", "lawrence-kansas-web-design"],
};
