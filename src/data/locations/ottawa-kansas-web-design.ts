import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/ottawa-kansas-web-design
 * Ottawa, KS — Franklin County. Eastern Kansas, I-35 corridor.
 */
export const locationData: LocationPageData = {
  slug: "ottawa-kansas-web-design",
  city: "Ottawa",
  state: "Kansas",
  region: "Eastern Kansas",
  coordinates: { lat: 38.616, lng: -95.269 },

  metaTitle: "Ottawa, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Ottawa, Kansas businesses — fixed-price proposals from a Kansas-based development firm.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Ottawa, Kansas",
    h1: "Custom Websites and Software for Ottawa Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Franklin County businesses along the I-35 corridor in eastern Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Ottawa, Kansas — the county seat of Franklin County in eastern Kansas, approximately 60 miles southwest of Kansas City on I-35. Ottawa University and regional manufacturing anchor the local economy. Remote delivery with on-site travel available.",
  },

  nearbyAreas: [
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "30 mi NE" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "50 mi N" },
    { name: "Emporia, KS", href: "/locations/emporia-kansas-web-design", distanceLabel: "55 mi SW" },
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "50 mi NE" },
    { name: "Osawatomie, KS", distanceLabel: "30 mi E" },
    { name: "Garnett, KS", distanceLabel: "30 mi SE" },
    { name: "Paola, KS", distanceLabel: "35 mi E" },
    { name: "Burlington, KS", distanceLabel: "50 mi SW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Eastern Kansas I-35 corridor context — university community, manufacturing, and regional commerce.",
    "Full code ownership transferred at launch. No SaaS platform fees after handoff.",
    "Remote-first delivery with on-site travel for projects requiring in-person collaboration.",
  ],

  industriesServed: [
    "Education",
    "Manufacturing",
    "Agriculture",
    "Healthcare",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Ottawa, Kansas?",
      answer:
        "Yes. Ottawa is within the firm's eastern Kansas service area. Build work is delivered remotely with on-site travel available.",
    },
    {
      question: "What county is Ottawa, Kansas in?",
      answer:
        "Ottawa is the county seat of Franklin County, Kansas, located approximately 60 miles southwest of Kansas City on I-35.",
    },
    {
      question: "What does Preisser Solutions build for Ottawa businesses?",
      answer:
        "Custom web applications, dashboards, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you build a website for an Ottawa manufacturer?",
      answer:
        "Yes. Custom websites and operational tools for manufacturing businesses are part of the standard service offering.",
    },
    {
      question: "Do you offer AI automation for Ottawa, Kansas businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents for back-office operations are offered to businesses in Ottawa and Franklin County.",
    },
    {
      question: "How does Preisser Solutions price projects for Ottawa clients?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed in writing before work begins — no hourly billing, no open-ended retainers.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Ottawa?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Franklin County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "topeka-kansas",
    "lawrence-kansas-web-design",
    "emporia-kansas-web-design",
    "olathe-kansas-custom-software",
  ],
};
