import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";
import { HG_OIL_INVENTORY_CARD, HG_OIL_INVOICE_CARD } from "./shared";

/**
 * /locations/hays-kansas-digital-marketing
 * Hays, KS — Ellis County. Digital marketing intent variant.
 */
export const locationData: LocationPageData = {
  slug: "hays-kansas-digital-marketing",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Digital Marketing Services in Hays, KS",
  metaDescription:
    "Digital marketing built on custom code for Hays, Kansas businesses: local SEO, AI automation, and web infrastructure.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Digital Marketing in Hays, Kansas",
    h1: "Digital Marketing for Hays Businesses: Built on Custom Code",
    subheadline:
      "Local SEO, AI-search visibility, and automated outreach workflows engineered for Hays, Kansas businesses, not templated, not outsourced.",
    answerParagraph:
      "Preisser Solutions is headquartered in Hays, Kansas and builds digital marketing infrastructure for Ellis County businesses. Services include local SEO, AI-search optimization, custom websites built for conversion, and AI-powered marketing automation. Every deliverable is built on custom code: no page-builder templates, no third-party marketing platforms with recurring licensing fees.",
  },

  nearbyAreas: [
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "12 mi W" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi E" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SE" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "Plainville, KS", href: "/locations/plainville-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Russell, KS", distanceLabel: "35 mi E" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD, HG_OIL_INVOICE_CARD],

  whyLocal: [
    "Hays is Preisser Solutions' home market. Local digital marketing context is not guesswork; it is direct knowledge.",
    "Digital marketing infrastructure built in code means no recurring platform licensing and no vendor lock-in.",
    "Fixed-price proposals. No open-ended retainers unless you specifically request them.",
  ],

  industriesServed: [
    "Oil & Gas",
    "Agriculture",
    "Healthcare",
    "Trades",
    "Higher Education",
    "Professional Services",
  ],

  faq: [
    {
      question: "What digital marketing services does Preisser Solutions offer in Hays?",
      answer:
        "Local SEO, AI-search optimization, custom website development, and AI-powered marketing automation are the primary digital marketing services for Hays businesses.",
    },
    {
      question: "Does Preisser Solutions do paid advertising for Hays businesses?",
      answer:
        "No. The firm specializes in organic search, AI-search visibility, and owned digital infrastructure, not paid media management.",
    },
    {
      question: "How is Preisser Solutions different from a Hays marketing agency?",
      answer:
        "Preisser Solutions is a custom-software firm. Every digital marketing deliverable is built in code, not assembled from marketing platforms with ongoing licensing.",
    },
    {
      question: "Can Preisser Solutions automate marketing workflows for a Hays business?",
      answer:
        "Yes. AI-powered lead qualification, follow-up sequences, and CRM integration are offered as part of the AI automation service line.",
    },
    {
      question: "Can Preisser Solutions build a conversion-optimized website for a Hays business?",
      answer:
        "Yes. Custom websites built for conversion (clear CTAs, fast load, strong schema markup, mobile-first) are a core deliverable.",
    },
    {
      question: "How are digital marketing projects priced in Hays?",
      answer:
        "All projects use fixed-price proposals. Scope, deliverables, and cost are agreed before work begins: no surprises.",
    },
  ],

  cta: {
    headline: "Ready to build real digital marketing infrastructure in Hays?",
    subcopy:
      "Book a free scoping call. We will audit your current presence and identify the highest-leverage builds.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hays-kansas-seo",
    "great-bend-kansas-digital-marketing",
    "salina-kansas-seo",
  ],
};
