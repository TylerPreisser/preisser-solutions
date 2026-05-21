import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "hill-city-kansas-web-design",
  city: "Hill City",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 39.367, lng: -99.837 },

  metaTitle: "Web Design & Custom Software in Hill City, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Hill City, Kansas — built by a Hays-based firm 55 miles northwest.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Hill City, Kansas",
    h1: "Custom Software and Websites for Hill City Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Graham County's agriculture, energy, and trades operators in northwest Kansas.",
    answerParagraph:
      "Preisser Solutions serves Hill City, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Hill City sits at the Graham County seat in northwest Kansas, about 55 miles from Hays headquarters. That proximity makes in-person scoping practical and delivery straightforward. Custom code, fixed-price proposals, full ownership at launch.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "55 mi SE" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "30 mi S" },
    { name: "Phillipsburg, KS", href: "/locations/phillipsburg-kansas-web-design", distanceLabel: "35 mi NE" },
    { name: "Norton, KS", href: "/locations/norton-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "65 mi W" },
    { name: "Oakley, KS", href: "/locations/oakley-kansas-web-design", distanceLabel: "65 mi SW" },
    { name: "Stockton, KS", distanceLabel: "20 mi E" },
    { name: "Plainville, KS", distanceLabel: "22 mi SE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Hill City is 55 miles from Hays headquarters — closer than many in-market engagements. Travel for scoping and milestone meetings is a straightforward half-hour drive.",
    "Graham County's ag and energy context is deeply familiar — no onboarding required to understand your operating environment.",
    "Custom code with full ownership at launch. No platform dependency, no recurring build fees.",
  ],

  industriesServed: [
    "Agriculture",
    "Oil & Gas",
    "Trades",
    "Professional Services",
    "Hospitality",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Hill City, Kansas?",
      answer:
        "Yes. Hill City is within the firm's immediate service radius — 55 miles northwest of the Hays headquarters. In-person scoping and milestone visits are practical for any project size.",
    },
    {
      question: "How far is Hays from Hill City?",
      answer:
        "About 55 miles southeast via US-183, roughly 45 minutes. This is one of the closer regional markets, making in-person engagement unusually accessible.",
    },
    {
      question: "What does Preisser Solutions build for Hill City businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization for ag operators, oil and gas businesses, and trades firms.",
    },
    {
      question: "Can Preisser Solutions build tools for a Hill City oilfield or ag operation?",
      answer:
        "Yes. Graham County has both energy and agricultural operations. Custom inventory platforms, dispatch tools, document-processing automation, and operational dashboards are all within scope.",
    },
    {
      question: "Does Hill City get good local SEO results with a custom website?",
      answer:
        "Small markets like Hill City often have low digital competition, meaning a well-built custom site with proper local SEO and AI-search optimization can achieve dominant visibility quickly.",
    },
    {
      question: "What makes Preisser Solutions different for northwest Kansas businesses?",
      answer:
        "Proximity, fixed pricing, and full code ownership. Being 55 miles away means we show up. Fixed-price proposals mean no scope creep. Full ownership at launch means you are never locked in.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Hill City?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "wakeeney-kansas-web-design", "phillipsburg-kansas-web-design", "norton-kansas-web-design"],
};
