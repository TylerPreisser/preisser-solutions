import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "smith-center-kansas-web-design",
  city: "Smith Center",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 39.778, lng: -98.797 },

  metaTitle: "Web Design & Custom Software in Smith Center, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Smith Center, Kansas — built by a Hays-based firm for the wheat-belt county seat.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Smith Center, Kansas",
    h1: "Custom Software and Websites for Smith Center Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Smith County's wheat-belt agriculture, trades, and county-seat professional services.",
    answerParagraph:
      "Preisser Solutions serves Smith Center, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Smith Center is the Smith County seat on the Nebraska border — a regional hub for a sprawling wheat-production market that is traditionally underserved digitally. Based in Hays, roughly 95 miles southwest, we deliver remotely and travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Phillipsburg, KS", href: "/locations/phillipsburg-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Norton, KS", href: "/locations/norton-kansas-web-design", distanceLabel: "55 mi NW" },
    { name: "Concordia, KS", href: "/locations/concordia-kansas-web-design", distanceLabel: "45 mi SE" },
    { name: "Beloit, KS", distanceLabel: "40 mi SE" },
    { name: "Mankato, KS", distanceLabel: "35 mi E" },
    { name: "Lebanon, KS", distanceLabel: "20 mi S" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "95 mi SW" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "65 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Deep-plains wheat belt and livestock context — no need to explain how a custom dryer-management system or grain accounting tool needs to work.",
    "Smith County operators often deal with thin digital-vendor markets. Custom code from Hays fills the gap without resorting to national template providers.",
    "Full code ownership at launch means no recurring license fees eating into tight ag margins.",
  ],

  industriesServed: [
    "Wheat & Grain Production",
    "Livestock",
    "Trades",
    "Professional Services",
    "Healthcare Practices",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Smith Center, Kansas?",
      answer:
        "Yes. Smith Center is within the firm's northern Kansas service area. Build work is delivered remotely with travel for in-person scoping on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Smith Center?",
      answer:
        "About 95 miles southwest via US-281 and US-36, roughly an hour and a half. In-person scoping is practical for projects of meaningful scope.",
    },
    {
      question: "What does Preisser Solutions build for Smith Center businesses?",
      answer:
        "Custom web applications, operational tools, dashboards, AI automation, custom websites, and local SEO optimization for ag operators, trades, and professional services firms along the Nebraska border.",
    },
    {
      question: "Can Preisser Solutions build custom tools for a Smith Center grain operation?",
      answer:
        "Yes. Custom inventory platforms, bin-management tools, delivery scheduling, and vendor-payment automation are builds well-suited to grain and crop production businesses.",
    },
    {
      question: "Is digital marketing different for wheat-belt markets like Smith County?",
      answer:
        "Somewhat. Rural county-seat markets require hyper-local content and AI-search citations that surface for regional queries. Local SEO and AI-search optimization are available as a standalone service or bundled with a website build.",
    },
    {
      question: "What makes Preisser Solutions suited for rural Kansas markets?",
      answer:
        "We build to Kansas economics, not coastal rate cards. Fixed-price proposals, custom code, and full ownership mean no surprises and no ongoing dependency on our team after launch.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Smith Center?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "phillipsburg-kansas-web-design", "concordia-kansas-web-design", "norton-kansas-web-design"],
};
