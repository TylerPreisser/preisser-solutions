import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "scott-city-kansas-web-design",
  city: "Scott City",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.474, lng: -100.906 },

  metaTitle: "Web Design & Custom Software in Scott City, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Scott City, Kansas — built by a Hays-based firm serving the ag and feedlot economy of Scott County.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Scott City, Kansas",
    h1: "Custom Software and Websites for Scott City Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Scott County's feedlot, row-crop, and ag-services economy in southwest Kansas.",
    answerParagraph:
      "Preisser Solutions serves Scott City, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Scott City is a Scott County hub with meaningful feedlot, irrigation, and row-crop infrastructure — operations that benefit from inventory systems, compliance tracking, and vendor-payment automation. Based in Hays, roughly 110 miles northeast, we deliver remotely and travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Oakley, KS", href: "/locations/oakley-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Garden City, KS", href: "/locations/garden-city-kansas", distanceLabel: "55 mi S" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "75 mi NE" },
    { name: "Liberal, KS", href: "/locations/liberal-kansas-web-design", distanceLabel: "100 mi SE" },
    { name: "Tribune, KS", distanceLabel: "45 mi SW" },
    { name: "Leoti, KS", distanceLabel: "30 mi S" },
    { name: "Dighton, KS", distanceLabel: "30 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "110 mi NE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Scott County's feedlot and irrigation economy requires software that understands water-rights tracking, cattle-cycle inventory, and compliance reporting — not generic templates.",
    "Custom code with full ownership at launch. Ag operations do not benefit from ongoing SaaS fees on software they depend on daily.",
    "Travel from Hays is practical for projects of sufficient scope; remote delivery is the standard operating model.",
  ],

  industriesServed: [
    "Feedlot & Livestock",
    "Row-Crop Agriculture",
    "Irrigation & Water",
    "Trades",
    "Ag Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Scott City, Kansas?",
      answer:
        "Yes. Scott City is within the firm's western Kansas service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings for projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Scott City?",
      answer:
        "About 110 miles northeast via US-83, roughly an hour and a half. Travel for in-person work is standard for projects of meaningful scope.",
    },
    {
      question: "What does Preisser Solutions build for Scott City businesses?",
      answer:
        "Custom web applications, inventory and tracking tools, dashboards, AI automation, custom websites, and local search optimization. Feedlot operators, row-crop farms, and ag-services businesses are core clients.",
    },
    {
      question: "Can Preisser Solutions build inventory and compliance tools for a Scott County feedlot?",
      answer:
        "Yes. Custom inventory platforms with cycle tracking, compliance reporting, and vendor-payment automation are proven builds. The HG Oil Holdings inventory system is a direct analogue for feedlot-scale data management.",
    },
    {
      question: "Do you offer local SEO for ag-services businesses in Scott City?",
      answer:
        "Yes. Local SEO and AI-search visibility — citations on Google AI Overviews, ChatGPT, Perplexity, and Gemini — are an explicit service line available to Scott County businesses.",
    },
    {
      question: "What is the difference between Preisser Solutions and a national ag-software vendor?",
      answer:
        "National ag-software vendors sell products. Preisser Solutions builds custom software matched exactly to your operation's workflows. Full code ownership at launch means you are not paying per-seat fees for software built on your data.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Scott City?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "garden-city-kansas", "oakley-kansas-web-design", "colby-kansas-web-design"],
};
