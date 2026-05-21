import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/arkansas-city-kansas-web-design
 * Arkansas City, KS — Cowley County. South-central Kansas. Oklahoma border.
 */
export const locationData: LocationPageData = {
  slug: "arkansas-city-kansas-web-design",
  city: "Arkansas City",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.062, lng: -97.037 },

  metaTitle: "Web Design & Custom Software in Arkansas City, KS | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Arkansas City, Kansas — Kansas-based development firm with fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Arkansas City, Kansas",
    h1: "Custom Websites and Software for Arkansas City Businesses",
    subheadline:
      "Web design, AI automation, and custom applications for businesses in Arkansas City — Cowley County's second-largest city on the Oklahoma border.",
    answerParagraph:
      "Preisser Solutions builds custom websites, web applications, dashboards, and AI automation for businesses in Arkansas City, Kansas — a Cowley County city of approximately 11,000 on the Oklahoma border, 60 miles south of Wichita. The local economy centers on manufacturing, oil and gas services, and agriculture. Remote delivery with on-site travel available for larger projects.",
  },

  nearbyAreas: [
    { name: "Winfield, KS", href: "/locations/winfield-kansas-web-design", distanceLabel: "12 mi N" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "60 mi N" },
    { name: "Ponca City, OK", distanceLabel: "40 mi S" },
    { name: "Wellington, KS", distanceLabel: "35 mi NW" },
    { name: "Caldwell, KS", distanceLabel: "20 mi W" },
    { name: "Derby, KS", href: "/locations/derby-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Blackwell, OK", distanceLabel: "30 mi S" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "75 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Southern Cowley County border-market context — oil and gas services, manufacturing, and ag along US-77.",
    "Custom code with full ownership transferred at launch. No SaaS platform or vendor dependency.",
    "Remote-first delivery with on-site travel available for projects requiring in-person work.",
  ],

  industriesServed: [
    "Oil & Gas Services",
    "Manufacturing",
    "Agriculture",
    "Trades",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Arkansas City, Kansas?",
      answer:
        "Yes. Arkansas City is within the firm's south-central Kansas service area. Build work is delivered remotely with on-site travel available.",
    },
    {
      question: "What county is Arkansas City in?",
      answer:
        "Arkansas City is in Cowley County, Kansas, on the Oklahoma border approximately 60 miles south of Wichita.",
    },
    {
      question: "What industries does Preisser Solutions serve in Arkansas City?",
      answer:
        "Oil and gas services, manufacturing, agriculture, trades, and professional services are the primary industries served.",
    },
    {
      question: "Can you build a website for an Arkansas City oil and gas services company?",
      answer:
        "Yes. Custom websites and operational tools for oil and gas services operators are within the firm's standard capability.",
    },
    {
      question: "Do you offer AI automation for Arkansas City businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents for back-office operations are offered to businesses in Arkansas City.",
    },
    {
      question: "How does Preisser Solutions price projects?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins — no open-ended retainers.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Arkansas City?",
    subcopy:
      "Book a free scoping call. We will identify the highest-leverage build for your Cowley County business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "winfield-kansas-web-design",
    "wichita-kansas",
    "derby-kansas-web-design",
    "hutchinson-kansas-web-design",
  ],
};
