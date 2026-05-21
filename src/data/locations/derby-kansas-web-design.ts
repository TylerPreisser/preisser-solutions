import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "derby-kansas-web-design",
  city: "Derby",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.548, lng: -97.263 },

  metaTitle: "Web Design & Custom Software in Derby, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Derby, Kansas — built by a Hays-based firm for the Wichita south-suburb market.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Derby, Kansas",
    h1: "Custom Software and Websites for Derby Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Derby's growing south-Wichita suburban economy — trades, professional services, and retail in Sedgwick County.",
    answerParagraph:
      "Preisser Solutions serves Derby, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Derby is a fast-growing Wichita suburb of 25,000 with strong trades, professional services, and retail density. Businesses here benefit from the same custom software and AI automation capability as the Wichita market, at a market-specific price point. Based in Hays, roughly 195 miles northwest, we deliver remotely and travel for projects of meaningful scope.",
  },

  nearbyAreas: [
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "10 mi N" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "30 mi N" },
    { name: "Mulvane, KS", distanceLabel: "10 mi S" },
    { name: "Andover, KS", distanceLabel: "15 mi NE" },
    { name: "Rose Hill, KS", distanceLabel: "12 mi SE" },
    { name: "El Dorado, KS", distanceLabel: "25 mi E" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "55 mi NW" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "195 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Derby's trades and service businesses benefit from custom websites and AI automation built to the Sedgwick County market — not generic templates that rank poorly for local Wichita-suburb searches.",
    "A Kansas-based firm at Kansas economics. Derby businesses get the same engineering quality as the Wichita market without the overhead of a large Wichita agency.",
    "Custom code with full ownership at launch. No ongoing platform fees.",
  ],

  industriesServed: [
    "Trades",
    "Professional Services",
    "Retail & Hospitality",
    "Healthcare Practices",
    "Real Estate & Property",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Derby, Kansas?",
      answer:
        "Yes. Derby is within the south-Wichita service area. Build work is delivered remotely with travel for in-person scoping and milestone meetings on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Derby?",
      answer:
        "About 195 miles northwest via I-135 and I-70, roughly three hours. Travel for in-person work is standard for projects of meaningful scope.",
    },
    {
      question: "What does Preisser Solutions build for Derby businesses?",
      answer:
        "Custom web applications, internal tools, dashboards, AI automation, custom websites, and local SEO and AI-search optimization for trades, professional services, and retail operators in south Wichita.",
    },
    {
      question: "Can Preisser Solutions build a custom website for a Derby trades or service business?",
      answer:
        "Yes. Custom websites engineered for local SEO and AI-search visibility are the most common build for Derby-area service businesses. Fast-loading, conversion-optimized, no templates.",
    },
    {
      question: "Do you offer AI automation for Derby-area small businesses?",
      answer:
        "Yes. Customer reactivation automation, scheduling tools, invoice processing, and workflow routing are packaged capabilities available to Derby businesses of any size.",
    },
    {
      question: "What makes Preisser Solutions different for a Derby suburb business versus a Wichita agency?",
      answer:
        "Custom-software depth and full code ownership. Most local agencies sell design and media; Preisser Solutions builds the operational systems and websites that generate long-term competitive advantage.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Derby?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["wichita-kansas", "hutchinson-kansas-web-design", "newton-kansas-web-design", "hays-kansas"],
};
