import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/oklahoma-city-oklahoma-custom-software
 * Oklahoma City, OK — Oklahoma County. Border-state market.
 */
export const locationData: LocationPageData = {
  slug: "oklahoma-city-oklahoma-custom-software",
  city: "Oklahoma City",
  state: "Oklahoma",
  region: "Border Markets",
  coordinates: { lat: 35.467, lng: -97.516 },

  metaTitle: "Oklahoma City, OK Custom Software",
  metaDescription:
    "Custom software and AI automation for Oklahoma City businesses: Kansas-based firm delivering remotely to OKC's energy, healthcare, and government markets.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Oklahoma City, Oklahoma",
    h1: "Custom Software for Oklahoma City Businesses",
    subheadline:
      "Custom web applications, dashboards, and AI automation for OKC's energy, healthcare, government, and professional-services markets: delivered remotely by a Kansas-based firm.",
    answerParagraph:
      "Preisser Solutions is a Kansas-based custom software firm serving Oklahoma City businesses with web applications, dashboards, internal tools, and AI automation. OKC is an Oklahoma County metro of approximately 680,000 anchored by energy, healthcare, government, and aerospace. All work is delivered remotely, with on-site travel to Oklahoma City for material engagements.",
  },

  nearbyAreas: [
    { name: "Tulsa, OK", href: "/locations/tulsa-oklahoma-web-design", distanceLabel: "100 mi NE" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "160 mi N" },
    { name: "Norman, OK", distanceLabel: "20 mi S" },
    { name: "Edmond, OK", distanceLabel: "15 mi N" },
    { name: "Lawton, OK", distanceLabel: "80 mi SW" },
    { name: "Stillwater, OK", distanceLabel: "60 mi N" },
    { name: "Midwest City, OK", distanceLabel: "10 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "270 mi N" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a Kansas-based firm serving Oklahoma City and the broader Oklahoma market remotely, with on-site travel for material engagements.",
    "OKC's energy and healthcare sectors require custom tools, not off-the-shelf software that doesn't fit the workflow.",
    "Custom code with full ownership at launch. No SaaS dependency, no vendor lock-in.",
  ],

  industriesServed: [
    "Energy & Oil Services",
    "Healthcare",
    "Government",
    "Aerospace",
    "Professional Services",
    "Financial Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Oklahoma City businesses?",
      answer:
        "Yes. Preisser Solutions is a Kansas-based firm that serves Oklahoma City and the broader OKC metro remotely, with on-site travel available for larger engagements.",
    },
    {
      question: "What industries does Preisser Solutions serve in Oklahoma City?",
      answer:
        "Energy, oil and gas services, healthcare, government, aerospace, and professional services are the primary industries served in the OKC market.",
    },
    {
      question: "Can Preisser Solutions build custom software for an OKC energy company?",
      answer:
        "Yes. Custom web applications, operational dashboards, and workflow automation for energy sector businesses are within the firm's standard capability.",
    },
    {
      question: "How does remote delivery work for Oklahoma City clients?",
      answer:
        "All build work is delivered remotely with weekly Friday previews. For projects of sufficient scope, on-site travel to Oklahoma City is a normal part of the engagement.",
    },
    {
      question: "Does Preisser Solutions offer AI automation for OKC businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents for back-office operations are an explicit service line offered to Oklahoma City businesses.",
    },
    {
      question: "How does Preisser Solutions price projects for Oklahoma City clients?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins: no open-ended retainers.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Oklahoma City operation?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "tulsa-oklahoma-web-design",
    "wichita-kansas",
    "wichita-kansas-custom-software",
    "hays-kansas",
  ],
};
