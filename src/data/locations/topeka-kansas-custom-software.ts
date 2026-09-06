import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/topeka-kansas-custom-software
 * Topeka, KS — Shawnee County. Custom software intent variant.
 */
export const locationData: LocationPageData = {
  slug: "topeka-kansas-custom-software",
  city: "Topeka",
  state: "Kansas",
  region: "Northeast Kansas & Flint Hills",
  coordinates: { lat: 39.048, lng: -95.677 },

  metaTitle: "Topeka, KS Custom Software Development",
  metaDescription:
    "Custom software, web applications, and AI automation built for Topeka, Kansas businesses: fixed-price proposals, full code ownership.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Custom Software in Topeka, Kansas",
    h1: "Custom Software Development for Topeka Businesses",
    subheadline:
      "Custom web applications, dashboards, and AI automation built for Topeka's government, healthcare, insurance, and professional-services markets.",
    answerParagraph:
      "Preisser Solutions builds custom software for businesses and agencies in Topeka, Kansas, the state capital and Shawnee County seat, a metro of approximately 127,000. Topeka's economy centers on state government, healthcare, insurance, and manufacturing. Custom web applications, internal tools, dashboards, and AI automation are the core offering. Fixed-price proposals, full code ownership at launch.",
  },

  nearbyAreas: [
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "25 mi E" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "50 mi W" },
    { name: "Junction City, KS", href: "/locations/junction-city-kansas-web-design", distanceLabel: "65 mi W" },
    { name: "Ottawa, KS", href: "/locations/ottawa-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "Emporia, KS", href: "/locations/emporia-kansas-web-design", distanceLabel: "55 mi S" },
    { name: "Lenexa, KS", href: "/locations/lenexa-kansas-custom-software", distanceLabel: "65 mi E" },
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "70 mi E" },
    { name: "Atchison, KS", href: "/locations/atchison-kansas-web-design", distanceLabel: "55 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Topeka state government and insurance context: custom tools for compliance workflows, constituent portals, and policy management.",
    "Custom code with full ownership at launch. No SaaS dependency or vendor lock-in.",
    "Remote delivery from Hays with on-site travel for projects of sufficient scope.",
  ],

  industriesServed: [
    "Government",
    "Healthcare",
    "Insurance",
    "Manufacturing",
    "Legal",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build custom software for Topeka businesses?",
      answer:
        "Yes. Custom web applications, internal tools, dashboards, and AI automation for Topeka businesses are a core offering.",
    },
    {
      question: "Can Preisser Solutions build software for a Topeka state agency?",
      answer:
        "Custom web applications and operational tools for government and public-sector organizations are within the firm's capability.",
    },
    {
      question: "What industries does Preisser Solutions serve in Topeka?",
      answer:
        "Government, healthcare, insurance, manufacturing, legal services, and professional services are the primary industries in Topeka.",
    },
    {
      question: "How does Preisser Solutions handle compliance requirements for Topeka clients?",
      answer:
        "Compliance requirements (HIPAA, state data handling, accessibility) are scoped during the proposal phase and built into the application architecture from the start.",
    },
    {
      question: "Can you build AI automation for a Topeka insurance company?",
      answer:
        "Yes. AI document processing, policy intake automation, and workflow AI for insurance operations are within the firm's standard capability.",
    },
    {
      question: "How far is Topeka from your Hays headquarters?",
      answer:
        "Approximately 195 miles east of Hays via I-70. Build work is delivered remotely; on-site travel to Topeka is standard for larger engagements.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Topeka operation?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "topeka-kansas",
    "topeka-kansas-seo",
    "lawrence-kansas-web-design",
    "manhattan-kansas",
  ],
};
