import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "ellis-kansas-web-design",
  city: "Ellis",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.934, lng: -99.556 },

  metaTitle: "Ellis, KS Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Ellis, Kansas — built locally by the Hays-based firm 15 miles east in Ellis County.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Ellis, Kansas",
    h1: "Custom Software and Websites for Ellis Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Ellis County businesses — from the same firm headquartered 15 miles east in Hays.",
    answerParagraph:
      "Preisser Solutions serves Ellis, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Ellis is in Ellis County — the same county as the Hays headquarters. That means in-person scoping is never an issue, local market context is deeply familiar, and the firm's reference cases are built from the same regional economy. Custom code, fixed-price proposals, full ownership.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "15 mi E" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "22 mi W" },
    { name: "Russell, KS", distanceLabel: "40 mi E" },
    { name: "Plainville, KS", distanceLabel: "25 mi N" },
    { name: "La Crosse, KS", distanceLabel: "30 mi SE" },
    { name: "Victoria, KS", distanceLabel: "8 mi E" },
    { name: "Gorham, KS", distanceLabel: "15 mi SE" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "50 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Ellis is in Ellis County — the same county as the Hays headquarters. No firm in Kansas is closer or more familiar with the local operating environment.",
    "In-person scoping and milestone visits are a 15-minute drive, not a travel expense.",
    "Custom code with full ownership at launch. No platform dependency on the firm after delivery.",
  ],

  industriesServed: [
    "Trades",
    "Agriculture",
    "Manufacturing",
    "Professional Services",
    "Hospitality",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Ellis, Kansas?",
      answer:
        "Yes. Ellis is in Ellis County, the same county as Hays headquarters. It is the closest market to the firm and is served as a primary-radius client.",
    },
    {
      question: "How far is the Preisser Solutions office from Ellis?",
      answer:
        "About 15 miles east via I-70, roughly 15 minutes. Ellis County businesses are essentially on-site clients — in-person scoping is a quick drive, not a scheduled travel day.",
    },
    {
      question: "What does Preisser Solutions build for Ellis businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local search optimization for trades, manufacturing, ag, and professional services operators.",
    },
    {
      question: "Can a small Ellis business afford custom software?",
      answer:
        "Fixed-price proposals are scoped to match the size and complexity of the engagement. Many Ellis-area projects are straightforward website and local-SEO builds that are priced accordingly.",
    },
    {
      question: "What industries does Preisser Solutions serve in Ellis County?",
      answer:
        "Trades, manufacturing, agriculture, professional services, hospitality, and oilfield services. Ellis County's economy maps exactly to the industries the firm built its playbook around.",
    },
    {
      question: "What is the difference between Preisser Solutions and a national template website vendor?",
      answer:
        "Custom code from scratch, full ownership at launch, and a single engineer who understands your business and answers the phone. No templates, no offshore build teams, no ongoing platform fees.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Ellis?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "wakeeney-kansas-web-design", "western-kansas-web-design", "hill-city-kansas-web-design"],
};
