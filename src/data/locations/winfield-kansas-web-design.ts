import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/winfield-kansas-web-design
 * Winfield, KS — Cowley County. South-central Kansas. US-77 / US-160 junction.
 */
export const locationData: LocationPageData = {
  slug: "winfield-kansas-web-design",
  city: "Winfield",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.240, lng: -96.961 },

  metaTitle: "Winfield, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Winfield, Kansas businesses: Kansas-based firm with fixed-price proposals and full code ownership.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Winfield, Kansas",
    h1: "Custom Websites and Software for Winfield Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Cowley County businesses at the US-77 and US-160 junction in south-central Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Winfield, Kansas, the county seat of Cowley County in south-central Kansas, approximately 50 miles south of Wichita on US-77. Winfield hosts Southwestern College and significant manufacturing and agricultural activity. Remote delivery with on-site travel available.",
  },

  nearbyAreas: [
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "50 mi N" },
    { name: "Arkansas City, KS", href: "/locations/arkansas-city-kansas-web-design", distanceLabel: "12 mi S" },
    { name: "Derby, KS", href: "/locations/derby-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "Wellington, KS", distanceLabel: "30 mi NW" },
    { name: "Caldwell, KS", distanceLabel: "30 mi SW" },
    { name: "Ponca City, OK", distanceLabel: "55 mi S" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "65 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "South-central Kansas context: Cowley County ag, manufacturing, and education businesses along US-77.",
    "Custom code with full ownership at launch. No SaaS platform dependency or recurring license.",
    "Remote delivery from Hays with on-site travel for projects of sufficient scope.",
  ],

  industriesServed: [
    "Manufacturing",
    "Agriculture",
    "Education",
    "Healthcare",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Winfield, Kansas?",
      answer:
        "Yes. Winfield is within the firm's south-central Kansas service area. Work is delivered remotely with on-site travel available.",
    },
    {
      question: "What county is Winfield in?",
      answer:
        "Winfield is the county seat of Cowley County in south-central Kansas, approximately 50 miles south of Wichita.",
    },
    {
      question: "What does Preisser Solutions build for Winfield businesses?",
      answer:
        "Custom web applications, dashboards, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you build a website for a Winfield manufacturer?",
      answer:
        "Yes. Custom websites and operational tools for manufacturing businesses are part of the standard service offering.",
    },
    {
      question: "Do you offer local SEO for Winfield, Kansas businesses?",
      answer:
        "Yes. Local SEO and AI-search visibility (citations on ChatGPT, Perplexity, and Google AI Overviews) are both offered.",
    },
    {
      question: "Is Preisser Solutions closer to Winfield or Wichita?",
      answer:
        "Preisser Solutions is headquartered in Hays. Winfield is approximately 175 miles southeast. Wichita is the nearest major city to Winfield, 50 miles north.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Winfield?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Cowley County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "wichita-kansas",
    "derby-kansas-web-design",
    "arkansas-city-kansas-web-design",
    "hutchinson-kansas-web-design",
  ],
};
