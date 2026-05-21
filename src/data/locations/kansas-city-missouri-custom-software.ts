import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/kansas-city-missouri-custom-software
 * Kansas City, MO — Jackson County. Border-state market. Custom software intent.
 */
export const locationData: LocationPageData = {
  slug: "kansas-city-missouri-custom-software",
  city: "Kansas City",
  state: "Missouri",
  region: "Border Markets",
  coordinates: { lat: 39.099, lng: -94.578 },

  metaTitle: "Custom Software Development in Kansas City, MO | Preisser Solutions",
  metaDescription:
    "Custom software and AI automation for Kansas City, Missouri businesses — Kansas-based firm serving the KC metro with fixed-price proposals.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Kansas City, Missouri",
    h1: "Custom Software for Kansas City Businesses",
    subheadline:
      "Custom web applications, dashboards, and AI automation for Kansas City's logistics, healthcare, financial services, and technology markets — delivered remotely by a Kansas-based firm.",
    answerParagraph:
      "Preisser Solutions is a Kansas-based custom software firm serving Kansas City, Missouri businesses remotely. Kansas City is a Jackson County metro of approximately 500,000 in the city proper, anchored by logistics, healthcare, financial services, manufacturing, and technology. All work is delivered remotely, with on-site travel to KC for material engagements. Fixed-price proposals, full code ownership at launch.",
  },

  nearbyAreas: [
    { name: "Overland Park, KS", href: "/locations/overland-park-kansas-custom-software", distanceLabel: "15 mi SW" },
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "20 mi SW" },
    { name: "Lenexa, KS", href: "/locations/lenexa-kansas-custom-software", distanceLabel: "18 mi SW" },
    { name: "Independence, MO", distanceLabel: "12 mi E" },
    { name: "Lee's Summit, MO", distanceLabel: "20 mi SE" },
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "40 mi W" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "65 mi W" },
    { name: "Atchison, KS", href: "/locations/atchison-kansas-web-design", distanceLabel: "50 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a Kansas-based firm serving Kansas City, MO and the broader KC metro remotely, with on-site travel for material engagements.",
    "Kansas City's logistics and finance sectors require custom tools — not generic web platforms.",
    "Custom code with full ownership at launch. No SaaS dependency or vendor lock-in.",
  ],

  industriesServed: [
    "Logistics & Transportation",
    "Healthcare",
    "Financial Services",
    "Manufacturing",
    "Technology",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Kansas City, Missouri businesses?",
      answer:
        "Yes. Preisser Solutions is a Kansas-based firm serving the Kansas City metro — both the Missouri and Kansas sides — remotely, with on-site travel for larger engagements.",
    },
    {
      question: "What industries does Preisser Solutions serve in Kansas City?",
      answer:
        "Logistics, healthcare, financial services, manufacturing, technology, and professional services are the primary industries in the KC metro.",
    },
    {
      question: "Can Preisser Solutions build custom software for a Kansas City logistics company?",
      answer:
        "Yes. Custom web applications, operational dashboards, and workflow automation for logistics and transportation businesses are within standard capability.",
    },
    {
      question: "How does remote delivery work for Kansas City clients?",
      answer:
        "All build work is delivered remotely with weekly Friday previews. For larger engagements, on-site travel to Kansas City is a normal part of the project.",
    },
    {
      question: "Does Preisser Solutions offer AI automation for Kansas City businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents for back-office operations are offered to Kansas City businesses.",
    },
    {
      question: "What is the pricing model for Kansas City projects?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins — no open-ended retainers.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Kansas City operation?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "overland-park-kansas-custom-software",
    "olathe-kansas-custom-software",
    "lenexa-kansas-custom-software",
    "topeka-kansas",
  ],
};
