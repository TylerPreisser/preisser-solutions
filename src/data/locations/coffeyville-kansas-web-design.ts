import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/coffeyville-kansas-web-design
 * Coffeyville, KS — Montgomery County. Southeast Kansas on the Verdigris River.
 */
export const locationData: LocationPageData = {
  slug: "coffeyville-kansas-web-design",
  city: "Coffeyville",
  state: "Kansas",
  region: "Southeast Kansas",
  coordinates: { lat: 37.037, lng: -95.616 },

  metaTitle: "Coffeyville, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Coffeyville, Kansas businesses: fixed-price proposals from a Kansas-based development firm.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Coffeyville, Kansas",
    h1: "Custom Websites and Software for Coffeyville Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Montgomery County businesses in the Verdigris River industrial corridor.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Coffeyville, Kansas, a Montgomery County city of approximately 9,000 in southeast Kansas, known for its refining, manufacturing, and agricultural industries near the Oklahoma border. Work is delivered remotely; on-site travel available for larger engagements.",
  },

  nearbyAreas: [
    { name: "Independence, KS", distanceLabel: "18 mi N" },
    { name: "Parsons, KS", distanceLabel: "25 mi NW" },
    { name: "Bartlesville, OK", distanceLabel: "35 mi S" },
    { name: "Chanute, KS", distanceLabel: "45 mi NW" },
    { name: "Caney, KS", distanceLabel: "15 mi SW" },
    { name: "Nowata, OK", distanceLabel: "20 mi S" },
    { name: "Cherryvale, KS", distanceLabel: "10 mi N" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "115 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Southeast Kansas industrial context: refining, manufacturing, and ag operations along US-166 and US-169.",
    "Custom code with full ownership transferred at launch. No ongoing platform licensing.",
    "Remote-first delivery with on-site travel for projects requiring in-person collaboration.",
  ],

  industriesServed: [
    "Manufacturing",
    "Refining & Energy",
    "Agriculture",
    "Trades",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Coffeyville, Kansas?",
      answer:
        "Yes. Coffeyville is within the firm's Kansas service area. All build work is delivered remotely, with on-site travel available for larger engagements.",
    },
    {
      question: "What county is Coffeyville in?",
      answer:
        "Coffeyville is located in Montgomery County, Kansas, in the southeast corner of the state near the Oklahoma border on the Verdigris River.",
    },
    {
      question: "What industries does Preisser Solutions serve in Coffeyville?",
      answer:
        "Manufacturing, refining, energy services, agriculture, trades, and professional services are the primary industries served in the Coffeyville area.",
    },
    {
      question: "Can you build an operational tool for a Coffeyville manufacturer?",
      answer:
        "Yes. Custom web applications, inventory tools, dashboards, and workflow automation for manufacturing and industrial operations are core offerings.",
    },
    {
      question: "Do you offer AI automation for Coffeyville businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents for back-office operations are an explicit service line.",
    },
    {
      question: "How far is Coffeyville from Hays?",
      answer:
        "Approximately 220 miles southeast of Hays via US-56 and US-400. Work is delivered remotely; on-site travel is standard for projects of sufficient scope.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Coffeyville?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your Montgomery County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "wichita-kansas",
    "hutchinson-kansas-web-design",
    "newton-kansas-web-design",
    "pratt-kansas-web-design",
  ],
};
