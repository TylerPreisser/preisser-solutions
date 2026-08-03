import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/parsons-kansas-web-design
 * Parsons, KS — Labette County. Southeast Kansas. US-59 / US-400 junction.
 */
export const locationData: LocationPageData = {
  slug: "parsons-kansas-web-design",
  city: "Parsons",
  state: "Kansas",
  region: "Southeast Kansas",
  coordinates: { lat: 37.340, lng: -95.261 },

  metaTitle: "Parsons, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Parsons, Kansas businesses — fixed-price proposals from a Kansas-based development firm.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Parsons, Kansas",
    h1: "Custom Websites and Software for Parsons Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Labette County businesses at the US-59 and US-400 corridor in southeast Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Parsons, Kansas — a Labette County city of approximately 9,000 in southeast Kansas at the junction of US-59 and US-400. Manufacturing, healthcare, and agricultural operations anchor the local economy. Remote delivery with on-site travel for larger engagements.",
  },

  nearbyAreas: [
    { name: "Coffeyville, KS", href: "/locations/coffeyville-kansas-web-design", distanceLabel: "25 mi SW" },
    { name: "Independence, KS", distanceLabel: "28 mi W" },
    { name: "Chanute, KS", distanceLabel: "35 mi N" },
    { name: "Pittsburg, KS", href: "/locations/pittsburg-kansas-web-design", distanceLabel: "40 mi N" },
    { name: "Joplin, MO", distanceLabel: "55 mi NE" },
    { name: "Miami, OK", distanceLabel: "40 mi S" },
    { name: "Cherryvale, KS", distanceLabel: "18 mi NW" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "120 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Southeast Kansas industrial context — manufacturing, healthcare, and ag operations along US-59 and US-400.",
    "Custom code with full ownership at launch. No proprietary platform or SaaS dependency.",
    "Remote-first delivery with on-site travel for projects requiring in-person collaboration.",
  ],

  industriesServed: [
    "Manufacturing",
    "Healthcare",
    "Agriculture",
    "Trades",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Parsons, Kansas?",
      answer:
        "Yes. Parsons is within the firm's Kansas service area. All build work is delivered remotely with on-site travel available.",
    },
    {
      question: "What county is Parsons, Kansas in?",
      answer:
        "Parsons is in Labette County in southeast Kansas, near the junction of US-59 and US-400, roughly 25 miles north of the Oklahoma border.",
    },
    {
      question: "What does Preisser Solutions build for Parsons businesses?",
      answer:
        "Custom web applications, internal tools, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you build a website for a Parsons healthcare provider?",
      answer:
        "Yes. Custom websites and operational tools for healthcare providers are within the firm's standard capability.",
    },
    {
      question: "Do you offer local SEO for Parsons businesses?",
      answer:
        "Yes. Local SEO — Google Business Profile, local pack, citations, schema — and AI-search visibility are both explicit service lines.",
    },
    {
      question: "How far is Parsons from your Hays headquarters?",
      answer:
        "Approximately 215 miles southeast of Hays. All work is delivered remotely; on-site travel is available for larger engagements.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Parsons?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Labette County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "coffeyville-kansas-web-design",
    "wichita-kansas",
    "hutchinson-kansas-web-design",
    "newton-kansas-web-design",
  ],
};
