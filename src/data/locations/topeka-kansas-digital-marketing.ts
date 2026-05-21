import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/topeka-kansas-digital-marketing
 * Topeka, KS — Digital marketing intent variant.
 */
export const locationData: LocationPageData = {
  slug: "topeka-kansas-digital-marketing",
  city: "Topeka",
  state: "Kansas",
  region: "Northeast Kansas & Flint Hills",
  coordinates: { lat: 39.048, lng: -95.677 },

  metaTitle: "Digital Marketing Services in Topeka, KS | Preisser Solutions",
  metaDescription:
    "Digital marketing built on custom code for Topeka, Kansas businesses — local SEO, AI automation, and web infrastructure.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Digital Marketing in Topeka, Kansas",
    h1: "Digital Marketing for Topeka Businesses — Built on Custom Code",
    subheadline:
      "Local SEO, AI-search visibility, and automated outreach workflows engineered for Topeka's government, healthcare, and professional-services markets.",
    answerParagraph:
      "Preisser Solutions delivers digital marketing infrastructure for businesses in Topeka, Kansas — the state capital and Shawnee County seat. Services include local SEO, AI-search optimization, custom websites built for conversion, and AI-powered marketing automation. All work is custom-coded — no page-builder platforms, no third-party marketing tools with recurring licensing fees.",
  },

  nearbyAreas: [
    { name: "Lawrence, KS", href: "/locations/lawrence-kansas-web-design", distanceLabel: "25 mi E" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "50 mi W" },
    { name: "Emporia, KS", href: "/locations/emporia-kansas-web-design", distanceLabel: "55 mi S" },
    { name: "Ottawa, KS", href: "/locations/ottawa-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "Olathe, KS", href: "/locations/olathe-kansas-custom-software", distanceLabel: "70 mi E" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi W" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "140 mi SW" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "195 mi W" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Topeka's government and healthcare sector demands digital marketing that complies with accessibility and data handling requirements — built right from the start.",
    "Preisser Solutions builds digital marketing infrastructure in code, not in marketing platforms that create vendor dependency.",
    "Fixed-price proposals with no open-ended retainers unless you request them.",
  ],

  industriesServed: [
    "Government",
    "Healthcare",
    "Insurance",
    "Legal",
    "Professional Services",
    "Nonprofit",
  ],

  faq: [
    {
      question: "What digital marketing services does Preisser Solutions offer in Topeka?",
      answer:
        "Local SEO, AI-search optimization, custom website development, and AI-powered marketing automation are the primary digital marketing services for Topeka businesses.",
    },
    {
      question: "How is Preisser Solutions different from a Topeka marketing agency?",
      answer:
        "Preisser Solutions is a custom-software firm. Every digital marketing deliverable is built in code — not assembled from marketing platforms with ongoing licensing fees.",
    },
    {
      question: "Does Preisser Solutions do paid advertising for Topeka businesses?",
      answer:
        "No. The firm specializes in organic search, AI-search visibility, and owned digital infrastructure — not paid media or ad management.",
    },
    {
      question: "Can Preisser Solutions build a government-compliant website for a Topeka agency?",
      answer:
        "Yes. Accessibility compliance (WCAG 2.1 AA), semantic HTML, and performance optimization are standard in every build.",
    },
    {
      question: "Can Preisser Solutions automate outreach for a Topeka professional services firm?",
      answer:
        "Yes. AI-powered lead qualification, follow-up sequences, and CRM integration are offered as part of the AI automation service line.",
    },
    {
      question: "How are Topeka digital marketing projects priced?",
      answer:
        "All projects use fixed-price proposals. Scope, deliverables, and cost are agreed before work begins — no surprises.",
    },
  ],

  cta: {
    headline: "Ready to build real digital marketing infrastructure in Topeka?",
    subcopy:
      "Book a free scoping call. We will audit your presence and identify the highest-leverage builds.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "topeka-kansas",
    "topeka-kansas-seo",
    "topeka-kansas-custom-software",
    "lawrence-kansas-web-design",
  ],
};
