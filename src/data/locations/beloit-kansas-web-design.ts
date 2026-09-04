import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/beloit-kansas-web-design
 * Beloit, KS — Mitchell County. North-central Kansas on the Solomon River.
 */
export const locationData: LocationPageData = {
  slug: "beloit-kansas-web-design",
  city: "Beloit",
  state: "Kansas",
  region: "North-Central Kansas",
  coordinates: { lat: 39.454, lng: -98.106 },

  metaTitle: "Beloit, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Beloit, Kansas: built by a nearby Hays-based firm with fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Beloit, Kansas",
    h1: "Custom Websites and Software for Beloit Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for Mitchell County businesses along US-24 and the Solomon River corridor.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Beloit, Kansas, the county seat of Mitchell County in north-central Kansas, approximately 70 miles northeast of Hays via US-281. Agriculture, energy, and trades operators in the Solomon River valley are the primary market. Remote delivery, travel for in-person work.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "70 mi SW" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "65 mi SE" },
    { name: "Concordia, KS", distanceLabel: "40 mi NE" },
    { name: "Minneapolis, KS", distanceLabel: "35 mi SE" },
    { name: "Phillipsburg, KS", href: "/locations/phillipsburg-kansas-web-design", distanceLabel: "45 mi NW" },
    { name: "Mankato, KS", distanceLabel: "50 mi N" },
    { name: "Osborne, KS", distanceLabel: "20 mi W" },
    { name: "Glen Elder, KS", distanceLabel: "10 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "North-central Kansas context: agricultural operations, energy services, and local trades in the Solomon River valley.",
    "Custom code with full ownership at launch. No SaaS platform subscription required after handoff.",
    "Travel for in-person scoping from Hays is standard for projects of meaningful scope.",
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
      question: "Does Preisser Solutions serve Beloit, Kansas?",
      answer:
        "Yes. Beloit is within the firm's north-central Kansas service area, approximately 70 miles northeast of the Hays headquarters.",
    },
    {
      question: "What county is Beloit in?",
      answer:
        "Beloit is the county seat of Mitchell County, Kansas, situated on the Solomon River in north-central Kansas.",
    },
    {
      question: "What kind of software does Preisser Solutions build in Beloit?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, marketing websites, and local and AI-search optimization.",
    },
    {
      question: "Can you build a website for a Beloit ag operation?",
      answer:
        "Yes. Agricultural operators are a core market. Custom websites, operational tools, and AI-assisted document workflows for ag businesses are part of the standard offering.",
    },
    {
      question: "Do you offer SEO services in Beloit?",
      answer:
        "Yes. Local SEO (Google Business Profile, local pack, citations, schema markup), and AI-search citation visibility are both explicit service lines.",
    },
    {
      question: "How does remote delivery work for a Beloit project?",
      answer:
        "All build work is done remotely with weekly Friday previews. For projects of sufficient scope, on-site scoping and milestone meetings are standard.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Beloit?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Mitchell County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "phillipsburg-kansas-web-design",
    "salina-kansas",
    "norton-kansas-web-design",
  ],
};
