import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/pittsburg-kansas-web-design
 * Pittsburg, KS — Crawford County. Southeast Kansas. US-69 corridor.
 */
export const locationData: LocationPageData = {
  slug: "pittsburg-kansas-web-design",
  city: "Pittsburg",
  state: "Kansas",
  region: "Southeast Kansas",
  coordinates: { lat: 37.411, lng: -94.705 },

  metaTitle: "Pittsburg, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Pittsburg, Kansas: built by a Kansas development firm with fixed-price proposals and full code ownership.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Pittsburg, Kansas",
    h1: "Custom Websites and Software for Pittsburg Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Crawford County businesses along the US-69 corridor in southeast Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Pittsburg, Kansas, the largest city in Crawford County in southeast Kansas, home to Pittsburg State University and approximately 20,000 residents. The local economy centers on manufacturing, education, and healthcare along the US-69 corridor near the Missouri and Oklahoma borders. Remote delivery, on-site travel available.",
  },

  nearbyAreas: [
    { name: "Joplin, MO", distanceLabel: "22 mi E" },
    { name: "Chanute, KS", href: "/locations/chanute-kansas-web-design", distanceLabel: "45 mi NW" },
    { name: "Parsons, KS", href: "/locations/parsons-kansas-web-design", distanceLabel: "40 mi SW" },
    { name: "Columbus, KS", distanceLabel: "25 mi S" },
    { name: "Fort Scott, KS", distanceLabel: "55 mi N" },
    { name: "Carthage, MO", distanceLabel: "30 mi NE" },
    { name: "Coffeyville, KS", href: "/locations/coffeyville-kansas-web-design", distanceLabel: "55 mi SW" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "150 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Southeast Kansas university-city context: PSU, manufacturing, and healthcare operators in the four-state area.",
    "Custom code with full ownership at launch. No SaaS platform or vendor dependency after handoff.",
    "Remote-first delivery with on-site travel for engagements requiring in-person collaboration.",
  ],

  industriesServed: [
    "Education",
    "Manufacturing",
    "Healthcare",
    "Trades",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Pittsburg, Kansas?",
      answer:
        "Yes. Pittsburg is within the firm's Kansas service area. All build work is delivered remotely with on-site travel available.",
    },
    {
      question: "What is Pittsburg, Kansas known for?",
      answer:
        "Pittsburg is home to Pittsburg State University and is the largest city in Crawford County, a regional hub for manufacturing, healthcare, and commerce in the four-state area.",
    },
    {
      question: "What does Preisser Solutions build for Pittsburg businesses?",
      answer:
        "Custom web applications, dashboards, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you build software for a Pittsburg State University vendor or partner?",
      answer:
        "Yes. Web applications, portals, and operational tools for education-adjacent businesses and contractors are within the firm's capability.",
    },
    {
      question: "Do you offer local SEO for Pittsburg, Kansas businesses?",
      answer:
        "Yes. Local SEO and AI-search citation visibility (being cited by ChatGPT, Perplexity, Gemini, and Google AI Overviews) are both offered.",
    },
    {
      question: "How far is Pittsburg from Hays?",
      answer:
        "Approximately 290 miles southeast of Hays. All work is delivered remotely; on-site travel is standard for larger projects.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Pittsburg?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Crawford County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "chanute-kansas-web-design",
    "parsons-kansas-web-design",
    "coffeyville-kansas-web-design",
    "wichita-kansas",
  ],
};
