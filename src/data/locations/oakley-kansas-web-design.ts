import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "oakley-kansas-web-design",
  city: "Oakley",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 39.129, lng: -100.852 },

  metaTitle: "Oakley, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Oakley, Kansas — built by a Hays-based firm for the I-70 truck-stop hub market.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Oakley, Kansas",
    h1: "Custom Software and Websites for Oakley Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Logan County's trucking, hospitality, and agriculture operators on I-70.",
    answerParagraph:
      "Preisser Solutions serves Oakley, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Positioned at one of western Kansas's busiest I-70 interchange hubs, Oakley operators face real digital-presence competition from passing traffic. Based in Hays — roughly 90 miles east — we deliver remotely and travel for projects of meaningful scope.",
  },

  nearbyAreas: [
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "30 mi E" },
    { name: "Goodland, KS", href: "/locations/goodland-kansas-web-design", distanceLabel: "70 mi W" },
    { name: "Scott City, KS", distanceLabel: "55 mi S" },
    { name: "Sharon Springs, KS", distanceLabel: "35 mi W" },
    { name: "Quinter, KS", distanceLabel: "30 mi E" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "55 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "65 mi NE" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "90 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Western Kansas firm that understands the trucking-hub economy of the Logan County I-70 corridor.",
    "Hospitality and fuel-stop operators along I-70 benefit from fast-loading, SEO-strong sites that capture transient and local searches.",
    "Custom code with full ownership — no proprietary platform, no ongoing license fees.",
  ],

  industriesServed: [
    "Trucking & Logistics",
    "Hospitality",
    "Agriculture",
    "Fuel & Convenience",
    "Trades",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Oakley, Kansas?",
      answer:
        "Yes. Oakley is within the firm's western Kansas service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings for projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Oakley?",
      answer:
        "About 90 miles east via I-70, roughly an hour and fifteen minutes. In-person scoping is practical for projects of meaningful scope.",
    },
    {
      question: "What does Preisser Solutions build for Oakley businesses?",
      answer:
        "Custom websites, web applications, AI automation, dashboards, and local search optimization. For I-70 corridor businesses this often includes fast-loading marketing sites engineered to rank for transient searches.",
    },
    {
      question: "Can Preisser Solutions build a website for an Oakley hospitality or fuel business?",
      answer:
        "Yes. Hospitality, fuel, and convenience operators that depend on I-70 traffic benefit significantly from custom websites with strong local and highway-corridor SEO.",
    },
    {
      question: "Do you offer local SEO for Oakley ag and trucking operators?",
      answer:
        "Yes. Local SEO and AI-search visibility — citations on Google AI Overviews, ChatGPT, Perplexity, and Gemini — are an explicit service line available to Logan County businesses.",
    },
    {
      question: "What is the difference between Preisser Solutions and a local Kansas web agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm, not a design agency. Every site is custom-coded from scratch with full ownership at launch — no themes, no page builders, no lock-in.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Oakley?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["colby-kansas-web-design", "hays-kansas", "goodland-kansas-web-design", "wakeeney-kansas-web-design"],
};
