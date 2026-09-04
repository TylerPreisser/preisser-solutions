import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/plainville-kansas-web-design
 * Plainville, KS — Rooks County. Northwest Kansas. US-183 / US-270 junction.
 */
export const locationData: LocationPageData = {
  slug: "plainville-kansas-web-design",
  city: "Plainville",
  state: "Kansas",
  region: "Northwest Kansas",
  coordinates: { lat: 39.234, lng: -99.299 },

  metaTitle: "Plainville, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Plainville, Kansas, a nearby Hays-based firm with fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Plainville, Kansas",
    h1: "Custom Websites and Software for Plainville Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Rooks County businesses along the US-183 and US-270 corridors in northwest Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Plainville, Kansas, the county seat of Rooks County in northwest Kansas, approximately 55 miles north of Hays on US-183. Agriculture, energy, and trades operations dominate the local economy. Remote delivery from Hays; on-site travel standard for meaningful engagements.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "55 mi S" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "35 mi SW" },
    { name: "Phillipsburg, KS", href: "/locations/phillipsburg-kansas-web-design", distanceLabel: "30 mi NE" },
    { name: "Norton, KS", href: "/locations/norton-kansas-web-design", distanceLabel: "55 mi NW" },
    { name: "Stockton, KS", distanceLabel: "25 mi NW" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "75 mi W" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "45 mi SW" },
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "50 mi S" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Northwest Kansas context: Rooks County ag, energy, and trades businesses along the US-183 corridor.",
    "Hays-based firm. Travel to Plainville is a short 55-mile drive. In-person scoping is practical.",
    "Custom code, fixed-price proposals, full ownership at launch.",
  ],

  industriesServed: [
    "Agriculture",
    "Energy",
    "Trades",
    "Healthcare",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Plainville, Kansas?",
      answer:
        "Yes. Plainville is 55 miles north of the Hays headquarters on US-183. It is one of the firm's closer service-area cities.",
    },
    {
      question: "What county is Plainville in?",
      answer:
        "Plainville is the county seat of Rooks County in northwest Kansas.",
    },
    {
      question: "What does Preisser Solutions build for Plainville businesses?",
      answer:
        "Custom web applications, dashboards, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you come to Plainville in person?",
      answer:
        "Yes. At 55 miles from Hays, on-site scoping and milestone meetings in Plainville are routine for projects of sufficient scope.",
    },
    {
      question: "Do you offer AI automation for Rooks County businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents are an explicit service line for small and mid-sized businesses in northwest Kansas.",
    },
    {
      question: "How does pricing work for Plainville projects?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and cost are agreed in writing before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Plainville?",
    subcopy:
      "Book a free scoping call. We will map your Rooks County operation and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hill-city-kansas-web-design",
    "phillipsburg-kansas-web-design",
    "norton-kansas-web-design",
  ],
};
