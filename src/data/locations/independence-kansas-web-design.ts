import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/independence-kansas-web-design
 * Independence, KS — Montgomery County. Southeast Kansas. US-75 / US-160 junction.
 */
export const locationData: LocationPageData = {
  slug: "independence-kansas-web-design",
  city: "Independence",
  state: "Kansas",
  region: "Southeast Kansas",
  coordinates: { lat: 37.224, lng: -95.709 },

  metaTitle: "Web Design & Custom Software in Independence, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Independence, Kansas businesses — Kansas-based firm with fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Independence, Kansas",
    h1: "Custom Websites and Software for Independence Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Montgomery County businesses along US-75 and US-160 in southeast Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Independence, Kansas — the county seat of Montgomery County in southeast Kansas, approximately 100 miles east of Wichita. Independence Community College and manufacturing anchor the local economy. Remote delivery with on-site travel available.",
  },

  nearbyAreas: [
    { name: "Coffeyville, KS", href: "/locations/coffeyville-kansas-web-design", distanceLabel: "18 mi S" },
    { name: "Chanute, KS", href: "/locations/chanute-kansas-web-design", distanceLabel: "40 mi N" },
    { name: "Parsons, KS", href: "/locations/parsons-kansas-web-design", distanceLabel: "28 mi E" },
    { name: "Caney, KS", distanceLabel: "20 mi S" },
    { name: "Fredonia, KS", distanceLabel: "25 mi NW" },
    { name: "Bartlesville, OK", distanceLabel: "50 mi S" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "100 mi W" },
    { name: "Cherryvale, KS", distanceLabel: "12 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Southeast Kansas regional context — Montgomery County manufacturing, education, and ag operations.",
    "Custom code with full ownership at launch. No SaaS platform fees after handoff.",
    "Remote-first delivery with on-site travel available for projects requiring in-person collaboration.",
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
      question: "Does Preisser Solutions serve Independence, Kansas?",
      answer:
        "Yes. Independence is within the firm's southeast Kansas service area. All build work is delivered remotely with on-site travel available.",
    },
    {
      question: "What county is Independence, Kansas in?",
      answer:
        "Independence is the county seat of Montgomery County in southeast Kansas.",
    },
    {
      question: "What does Preisser Solutions build for Independence businesses?",
      answer:
        "Custom web applications, internal tools, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you build a website for an Independence manufacturing company?",
      answer:
        "Yes. Custom websites and operational tools for manufacturing businesses are a core offering.",
    },
    {
      question: "Do you offer local SEO for Independence, Kansas businesses?",
      answer:
        "Yes. Local SEO and AI-search visibility on ChatGPT, Perplexity, and Google AI Overviews are both offered.",
    },
    {
      question: "How does Preisser Solutions handle remote delivery for southeast Kansas clients?",
      answer:
        "All build work is delivered remotely with weekly progress previews. On-site scoping and milestone meetings are available for larger engagements.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Independence?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Montgomery County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "coffeyville-kansas-web-design",
    "chanute-kansas-web-design",
    "parsons-kansas-web-design",
    "wichita-kansas",
  ],
};
