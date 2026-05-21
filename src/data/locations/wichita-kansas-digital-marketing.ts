import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/wichita-kansas-digital-marketing
 * Wichita, KS — Digital marketing intent variant.
 */
export const locationData: LocationPageData = {
  slug: "wichita-kansas-digital-marketing",
  city: "Wichita",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.692, lng: -97.330 },

  metaTitle: "Digital Marketing Services in Wichita, KS | Preisser Solutions",
  metaDescription:
    "Digital marketing built on custom code for Wichita, Kansas businesses — local SEO, AI automation, and web infrastructure done right.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Digital Marketing in Wichita, Kansas",
    h1: "Digital Marketing for Wichita Businesses — Built on Custom Code",
    subheadline:
      "Local SEO, AI-search visibility, and automated outreach workflows engineered for Wichita's competitive marketplace — not templated, not outsourced.",
    answerParagraph:
      "Preisser Solutions delivers digital marketing infrastructure for businesses in Wichita, Kansas — Kansas's largest market, a Sedgwick County metro of 397,000. Services include local SEO, AI-search optimization, custom websites engineered for conversion, and AI-powered marketing automation. Every deliverable is built on custom code — no page-builder templates, no third-party marketing platforms with licensing dependencies.",
  },

  nearbyAreas: [
    { name: "Derby, KS", href: "/locations/derby-kansas-web-design", distanceLabel: "12 mi SE" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "40 mi NW" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "25 mi N" },
    { name: "Winfield, KS", href: "/locations/winfield-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "80 mi W" },
    { name: "McPherson, KS", href: "/locations/mcpherson-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "90 mi N" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "200 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Wichita's competitive digital landscape rewards firms that build infrastructure — not firms that rent marketing tools.",
    "Preisser Solutions engineers marketing systems: custom-coded sites, schema, AI automation, and citation architecture.",
    "Fixed-price proposals. No ongoing retainers unless you want them. You own every asset we build.",
  ],

  industriesServed: [
    "Aerospace & Aviation",
    "Healthcare",
    "Manufacturing",
    "Financial Services",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "What digital marketing services does Preisser Solutions offer in Wichita?",
      answer:
        "Local SEO, AI-search optimization, custom website development, and AI-powered marketing automation are the primary digital marketing services offered for Wichita businesses.",
    },
    {
      question: "How is Preisser Solutions different from a Wichita marketing agency?",
      answer:
        "Preisser Solutions is a custom-software firm. Every digital marketing deliverable — websites, SEO infrastructure, automation — is built in code, not assembled from third-party marketing platforms.",
    },
    {
      question: "Does Preisser Solutions do paid advertising for Wichita businesses?",
      answer:
        "No. The firm specializes in organic search, AI-search visibility, and owned digital infrastructure — not paid media management.",
    },
    {
      question: "Can Preisser Solutions automate follow-up and lead nurturing for a Wichita business?",
      answer:
        "Yes. AI-powered marketing automation — lead qualification, follow-up sequences, CRM integration — is an explicit service line.",
    },
    {
      question: "Does Preisser Solutions serve Wichita's healthcare and aerospace sectors?",
      answer:
        "Yes. Healthcare and aerospace/manufacturing are two of the largest markets in Wichita and both are within the firm's standard capability.",
    },
    {
      question: "How does Preisser Solutions price digital marketing engagements?",
      answer:
        "All engagements use fixed-price proposals. Scope, deliverables, and cost are agreed before work begins. No open-ended monthly retainers unless you specifically request them.",
    },
  ],

  cta: {
    headline: "Ready to build real digital marketing infrastructure in Wichita?",
    subcopy:
      "Book a free scoping call. We will audit your current presence and identify the highest-leverage builds for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "wichita-kansas",
    "wichita-kansas-seo",
    "wichita-kansas-custom-software",
    "hutchinson-kansas-web-design",
  ],
};
