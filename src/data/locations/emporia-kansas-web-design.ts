import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/emporia-kansas-web-design
 * Emporia, KS — Lyon County. Flint Hills. I-35 / US-50 crossroads.
 */
export const locationData: LocationPageData = {
  slug: "emporia-kansas-web-design",
  city: "Emporia",
  state: "Kansas",
  region: "Flint Hills",
  coordinates: { lat: 38.404, lng: -96.182 },

  metaTitle: "Emporia, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Emporia, Kansas businesses: built by a Kansas development firm with fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Emporia, Kansas",
    h1: "Custom Websites and Software for Emporia Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Lyon County businesses at the I-35 and US-50 corridor in the Flint Hills.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Emporia, Kansas, a Lyon County city of approximately 25,000 at the intersection of I-35 and US-50, gateway to the Flint Hills. Emporia is home to Emporia State University, significant healthcare, and regional manufacturing. Remote delivery with on-site travel available.",
  },

  nearbyAreas: [
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "55 mi N" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "90 mi SW" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "90 mi NW" },
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "75 mi NE" },
    { name: "Coffeyville, KS", distanceLabel: "90 mi SE" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "60 mi SW" },
    { name: "Burlington, KS", distanceLabel: "45 mi SE" },
    { name: "Council Grove, KS", distanceLabel: "30 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Flint Hills regional context: university community, healthcare, manufacturing, and ag operators along I-35.",
    "Custom code with full ownership at launch. No SaaS dependency or ongoing licensing.",
    "Fixed-price proposals ensure no scope creep. Cost agreed before work begins.",
  ],

  industriesServed: [
    "Education",
    "Healthcare",
    "Manufacturing",
    "Agriculture",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Emporia, Kansas?",
      answer:
        "Yes. Emporia is within the firm's Kansas service area. Build work is delivered remotely with on-site travel available for projects of sufficient scope.",
    },
    {
      question: "What is Emporia, Kansas known for economically?",
      answer:
        "Emporia is the county seat of Lyon County, home to Emporia State University, regional healthcare facilities, manufacturing operations, and agricultural services in the Flint Hills.",
    },
    {
      question: "What does Preisser Solutions build for Emporia businesses?",
      answer:
        "Custom web applications, dashboards, internal tools, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you build software for an Emporia healthcare provider?",
      answer:
        "Yes. Custom web applications, patient-facing portals, and operational tools for healthcare providers are within the firm's standard capability.",
    },
    {
      question: "Do you offer local SEO for Emporia businesses?",
      answer:
        "Yes. Local SEO (Google Business Profile, local pack, citations, schema markup), and AI-search visibility on ChatGPT, Perplexity, and Gemini are both offered.",
    },
    {
      question: "How far is Emporia from Hays?",
      answer:
        "Approximately 175 miles east of Hays via I-70 and I-135. Build work is delivered remotely; on-site travel is routine for larger engagements.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Emporia?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Lyon County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "topeka-kansas",
    "wichita-kansas",
    "newton-kansas-web-design",
    "manhattan-kansas",
  ],
};
