import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "phillipsburg-kansas-web-design",
  city: "Phillipsburg",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 39.748, lng: -99.318 },

  metaTitle: "Phillipsburg, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Phillipsburg, Kansas: built by a Hays-based firm serving the US-36 and US-183 junction.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Phillipsburg, Kansas",
    h1: "Custom Software and Websites for Phillipsburg Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Phillips County operators at the crossroads of US-36 and US-183 in north-central Kansas.",
    answerParagraph:
      "Preisser Solutions serves Phillipsburg, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Phillipsburg sits at a key north-central Kansas highway junction roughly 70 miles north of Hays. We deliver remotely and travel for in-person work on projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Norton, KS", href: "/locations/norton-kansas-web-design", distanceLabel: "25 mi W" },
    // Smith Center has no location page. Previously linked to
    // /locations/smith-center-kansas-web-design, which 301s to the regional
    // /locations/western-kansas-web-design — so the anchor "Smith Center, KS"
    // landed on a page about Western Kansas generally. Dropping the href
    // instead of repointing it follows this array's own established pattern
    // (see "Stockton, KS" below, which is listed with no href for the same
    // reason). Keeps the geographic signal, removes the misleading link.
    { name: "Smith Center, KS", distanceLabel: "35 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "35 mi SW" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "70 mi S" },
    { name: "Stockton, KS", distanceLabel: "20 mi SE" },
    { name: "Plainville, KS", distanceLabel: "30 mi S" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "80 mi W" },
    { name: "Russell, KS", distanceLabel: "60 mi SE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "North-central Kansas context (wheat, cattle, and the county-seat professional services that support them) is already built into how we scope and build.",
    "Custom code with full ownership transferred at launch. No recurring platform fees.",
    "Hays is a straightforward 70-mile drive south, making in-person scoping practical for meaningful engagements.",
  ],

  industriesServed: [
    "Agriculture",
    "Trades",
    "Professional Services",
    "Healthcare Practices",
    "Livestock & Feed",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Phillipsburg, Kansas?",
      answer:
        "Yes. Phillipsburg is within the firm's north-central Kansas service area. Build work is delivered remotely with travel for in-person scoping on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Phillipsburg?",
      answer:
        "About 70 miles south via US-183, roughly 55 minutes. In-person scoping is practical for projects of meaningful scope.",
    },
    {
      question: "What does Preisser Solutions build for Phillipsburg businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization for ag operators, trades, and professional services firms.",
    },
    {
      question: "Can Preisser Solutions build workflow tools for Phillips County ag operations?",
      answer:
        "Yes. Field reporting, inventory tracking, vendor-payment automation, and operational dashboards are recurring builds for agricultural businesses in the region.",
    },
    {
      question: "Do you offer AI automation for Phillipsburg professional services firms?",
      answer:
        "Yes. Document extraction, client intake automation, and workflow routing are packaged capabilities well-suited to county-seat law offices, insurance agencies, and financial advisors.",
    },
    {
      question: "What makes Preisser Solutions different from other web design vendors in Kansas?",
      answer:
        "Custom code from scratch, full ownership at launch, and a fixed-price engagement model. No themes, no proprietary builders, and no ongoing license fees on the work we deliver.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Phillipsburg?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "norton-kansas-web-design", "western-kansas-web-design", "hill-city-kansas-web-design"],
};
