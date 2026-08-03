import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "lawrence-kansas-web-design",
  city: "Lawrence",
  state: "Kansas",
  region: "Northeast Kansas",
  coordinates: { lat: 38.972, lng: -95.235 },

  metaTitle: "Lawrence, KS Web Design & Software",
  metaDescription:
    "Custom software, web apps, and AI automation for Lawrence, Kansas — built by a Kansas-based firm for the Douglas County college-town economy.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Lawrence, Kansas",
    h1: "Custom Software and Websites for Lawrence Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Lawrence's technology-forward, KU-adjacent business community — built by a Kansas firm.",
    answerParagraph:
      "Preisser Solutions serves Lawrence, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Lawrence is Douglas County's economic anchor and home to the University of Kansas — a market with unusually high digital sophistication and strong demand for custom applications, startup tooling, and AI automation. Based in Hays, roughly 230 miles west, we deliver remotely and travel for projects of meaningful scope.",
  },

  nearbyAreas: [
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "25 mi W" },
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "30 mi E" },
    { name: "Kansas City, KS", distanceLabel: "40 mi E" },
    { name: "Overland Park, KS", href: "/locations/overland-park-kansas-custom-software", distanceLabel: "35 mi E" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "85 mi W" },
    { name: "Ottawa, KS", distanceLabel: "35 mi SE" },
    { name: "Baldwin City, KS", distanceLabel: "15 mi S" },
    { name: "Eudora, KS", distanceLabel: "8 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Lawrence has a tech-forward business community driven by KU startup culture and a high concentration of digital-native service firms. Custom software is the right tool for that market.",
    "A Kansas-based firm at Kansas economics — not a Kansas City agency charging metro rates for Lawrence projects.",
    "Custom code with full ownership at launch. Especially important for software tied to KU-adjacent intellectual work or startup infrastructure.",
  ],

  industriesServed: [
    "Technology & Startups",
    "Professional Services",
    "Healthcare",
    "Retail & Hospitality",
    "Education & Research",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Lawrence, Kansas?",
      answer:
        "Yes. Lawrence is a Tier-1 market. Engagements are delivered remotely with travel for in-person scoping and milestone meetings on projects of meaningful scope.",
    },
    {
      question: "How far is Hays from Lawrence?",
      answer:
        "Approximately 230 miles east via I-70, roughly three hours. The firm travels for scoping and milestone meetings as a standard part of engagements of sufficient scope.",
    },
    {
      question: "What does Preisser Solutions build for Lawrence businesses?",
      answer:
        "Custom web applications, AI automation, startup MVPs, operational dashboards, custom websites, and local SEO and AI-search optimization for technology firms, professional services, and healthcare operators in Douglas County.",
    },
    {
      question: "Can Preisser Solutions build a custom app for a Lawrence startup or KU-adjacent business?",
      answer:
        "Yes. Startup MVP builds, internal tools, and early-stage product engineering are well within scope. Fixed-price proposals make cost predictable for pre-revenue or early-growth businesses.",
    },
    {
      question: "Do you serve law firms and professional services operators in Lawrence?",
      answer:
        "Yes. Document automation, client intake, workflow routing, and custom client portals are recurring builds for Lawrence-area professional services firms with a more digitally sophisticated client base.",
    },
    {
      question: "What distinguishes Preisser Solutions from Lawrence-area web agencies?",
      answer:
        "Custom-software and AI automation depth. Local agencies optimize design; Preisser Solutions builds the systems underneath. If the engagement requires real engineering, that is the distinction that matters.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Lawrence?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["topeka-kansas", "manhattan-kansas", "olathe-kansas-custom-software", "overland-park-kansas-custom-software"],
};
