import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/chanute-kansas-web-design
 * Chanute, KS — Neosho County. Southeast Kansas. US-169 / US-39 junction.
 */
export const locationData: LocationPageData = {
  slug: "chanute-kansas-web-design",
  city: "Chanute",
  state: "Kansas",
  region: "Southeast Kansas",
  coordinates: { lat: 37.679, lng: -95.457 },

  metaTitle: "Web Design & Custom Software in Chanute, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Chanute, Kansas businesses — Kansas-based firm with fixed-price proposals and full code ownership.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Chanute, Kansas",
    h1: "Custom Websites and Software for Chanute Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Neosho County businesses along US-169 in southeast Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Chanute, Kansas — the county seat of Neosho County in southeast Kansas, approximately 100 miles southeast of Wichita on US-169. Neosho County College and regional manufacturing anchor the local economy. Remote delivery with on-site travel available.",
  },

  nearbyAreas: [
    { name: "Pittsburg, KS", href: "/locations/pittsburg-kansas-web-design", distanceLabel: "45 mi SE" },
    { name: "Parsons, KS", href: "/locations/parsons-kansas-web-design", distanceLabel: "35 mi S" },
    { name: "Independence, KS", distanceLabel: "40 mi SW" },
    { name: "Iola, KS", distanceLabel: "25 mi N" },
    { name: "Coffeyville, KS", href: "/locations/coffeyville-kansas-web-design", distanceLabel: "45 mi S" },
    { name: "Yates Center, KS", distanceLabel: "40 mi NW" },
    { name: "Humboldt, KS", distanceLabel: "20 mi N" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "100 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Southeast Kansas context — Neosho County manufacturing, education, and agriculture along US-169.",
    "Custom code with full ownership at launch. No proprietary platform or ongoing licensing.",
    "Remote-first delivery with on-site travel for projects requiring in-person collaboration.",
  ],

  industriesServed: [
    "Manufacturing",
    "Education",
    "Agriculture",
    "Healthcare",
    "Trades",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Chanute, Kansas?",
      answer:
        "Yes. Chanute is within the firm's Kansas service area. All work is delivered remotely with on-site travel available for larger engagements.",
    },
    {
      question: "What county is Chanute in?",
      answer:
        "Chanute is the county seat of Neosho County in southeast Kansas, on US-169 approximately 100 miles southeast of Wichita.",
    },
    {
      question: "What does Preisser Solutions build for Chanute businesses?",
      answer:
        "Custom web applications, dashboards, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you build a website for a Chanute manufacturer?",
      answer:
        "Yes. Custom websites and operational tools for manufacturing businesses are a core part of the service offering.",
    },
    {
      question: "Do you offer local SEO for Chanute businesses?",
      answer:
        "Yes. Local SEO — Google Business Profile, local pack, citations, schema — and AI-search visibility are both explicit service lines.",
    },
    {
      question: "How far is Chanute from Hays?",
      answer:
        "Approximately 225 miles southeast of Hays. Build work is delivered remotely; on-site travel is available for larger projects.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Chanute?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Neosho County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "pittsburg-kansas-web-design",
    "parsons-kansas-web-design",
    "coffeyville-kansas-web-design",
    "wichita-kansas",
  ],
};
