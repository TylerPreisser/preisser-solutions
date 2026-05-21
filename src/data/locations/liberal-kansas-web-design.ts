import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "liberal-kansas-web-design",
  city: "Liberal",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.043, lng: -100.921 },

  metaTitle: "Web Design & Custom Software in Liberal, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Liberal, Kansas — built by a Hays-based firm for the southwest Kansas ag and meatpacking hub.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Liberal, Kansas",
    h1: "Custom Software and Websites for Liberal Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Seward County's agriculture, meatpacking, and energy-corridor economy near the Oklahoma border.",
    answerParagraph:
      "Preisser Solutions serves Liberal, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Liberal is the southwest Kansas Tier-2 hub — a 19,000-person city on the Oklahoma border with significant ag-processing, feedlot, and natural gas infrastructure. Operations of that scale generate strong demand for custom operational tooling and AI automation. Based in Hays, roughly 200 miles northeast, we deliver remotely and travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Garden City, KS", href: "/locations/garden-city-kansas", distanceLabel: "85 mi NE" },
    { name: "Dodge City, KS", href: "/locations/dodge-city-kansas", distanceLabel: "100 mi NE" },
    { name: "Scott City, KS", href: "/locations/scott-city-kansas-web-design", distanceLabel: "100 mi N" },
    { name: "Guymon, OK", distanceLabel: "45 mi S" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "100 mi E" },
    { name: "Hugoton, KS", distanceLabel: "35 mi E" },
    { name: "Hooker, OK", distanceLabel: "55 mi S" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "200 mi NE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Liberal's meatpacking and ag-processing sector requires operational software matched to the specific data structures of high-volume processing — compliance records, labor scheduling, and yield tracking.",
    "Southwest Kansas is chronically underserved by digital vendors. A nearby Kansas firm with real engineering depth fills a gap that national templates never address adequately.",
    "Custom code with full ownership. Large ag-processing operations should not depend on third-party SaaS for mission-critical workflows.",
  ],

  industriesServed: [
    "Meatpacking & Food Processing",
    "Agriculture",
    "Natural Gas & Energy",
    "Trades",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Liberal, Kansas?",
      answer:
        "Yes. Liberal is within the firm's southwestern Kansas service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings for projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Liberal?",
      answer:
        "About 200 miles northeast via US-83, roughly two hours and forty-five minutes. Travel for in-person work is standard for meaningful engagements.",
    },
    {
      question: "What does Preisser Solutions build for Liberal businesses?",
      answer:
        "Custom operational tools for ag-processing and meatpacking operations — compliance tracking, labor scheduling, yield reporting, and vendor-payment automation — as well as custom websites and local SEO for service businesses.",
    },
    {
      question: "Can Preisser Solutions build compliance and processing tools for a Liberal meatpacking operation?",
      answer:
        "Yes. Custom compliance-record systems, USDA reporting tools, yield-tracking dashboards, and supplier-payment automation are all within scope. High-volume processing operations are a well-matched vertical.",
    },
    {
      question: "Do you serve natural gas and energy operators near Liberal?",
      answer:
        "Yes. Natural gas infrastructure operators in the southwest Kansas Hugoton basin need custom field-reporting, compliance documentation, and ops monitoring. These builds match the oilfield tooling the firm has shipped.",
    },
    {
      question: "What makes Preisser Solutions a better choice than a national software vendor for Liberal ag-processing businesses?",
      answer:
        "A national vendor sells you their product. Preisser Solutions builds yours. Custom code matched to your operation's workflows, full ownership at launch, and no per-seat fee eating into processing margins.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Liberal?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["garden-city-kansas", "dodge-city-kansas", "pratt-kansas-web-design", "hays-kansas"],
};
