import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS } from "./shared";
import { HG_OIL_INVENTORY_CARD } from "./shared";
import type { LocationServiceCard } from "@/types/location";

/**
 * /locations/hays-kansas-hvac-software
 * Hays, KS — Ellis County. HVAC software industry × city combination.
 */

const HVAC_SERVICE_CARDS: LocationServiceCard[] = [
  {
    icon: "dashboard",
    title: "HVAC Job Management Software",
    bullets: [
      "Custom dashboards for service tickets, technician scheduling, and job status",
      "Customer history, equipment records, and maintenance schedules in one place",
      "Mobile-friendly — technicians can update jobs in the field",
    ],
    href: "/services",
  },
  {
    icon: "automation",
    title: "AI Dispatch & Workflow Automation",
    bullets: [
      "AI-powered dispatch routing and technician assignment",
      "Automated service reminders, follow-up sequences, and review requests",
      "Document processing — proposals, invoices, warranty forms",
    ],
    href: "/services",
  },
  {
    icon: "website",
    title: "HVAC Website & Local SEO",
    bullets: [
      "Custom-coded websites built for local service-area visibility",
      "Google Business Profile optimization and local pack strategy",
      "AI-search optimization to be cited by ChatGPT and Perplexity",
    ],
    href: "/services",
  },
  {
    icon: "integration",
    title: "QuickBooks & Parts Integration",
    bullets: [
      "Sync jobs and invoices with QuickBooks automatically",
      "Parts inventory tracking and reorder alerts",
      "Connect to supplier catalogs and pricing feeds",
    ],
    href: "/services",
  },
];

export const locationData: LocationPageData = {
  slug: "hays-kansas-hvac-software",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "HVAC Software & Web Design in Hays, KS",
  metaDescription:
    "Custom HVAC software, job management dashboards, and AI automation for HVAC businesses in Hays, Kansas — built by a local firm.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "HVAC Software in Hays, Kansas",
    h1: "Custom Software for Hays HVAC Businesses",
    subheadline:
      "Job management dashboards, AI dispatch automation, and websites built specifically for HVAC contractors in Hays and western Kansas.",
    answerParagraph:
      "Preisser Solutions builds custom software for HVAC businesses in Hays, Kansas — job management dashboards, technician scheduling tools, AI-powered dispatch automation, customer history portals, and marketing websites. Based in Hays, we serve Ellis County and the surrounding western Kansas HVAC market with remote delivery and in-person availability.",
  },

  nearbyAreas: [
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "12 mi W" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SE" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "Russell, KS", distanceLabel: "35 mi E" },
    { name: "Plainville, KS", href: "/locations/plainville-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W" },
  ],

  serviceCards: HVAC_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD],

  whyLocal: [
    "We are headquartered in Hays and serve the local HVAC market directly. In-person scoping and site visits are practical.",
    "HVAC software built for actual field-service operations — not generic CRM platforms that require workarounds.",
    "Custom code with full ownership transferred at launch. No monthly software subscription after handoff.",
  ],

  industriesServed: [
    "HVAC",
    "Plumbing",
    "Electrical",
    "Field Services",
    "Trades",
  ],

  faq: [
    {
      question: "What custom software does Preisser Solutions build for HVAC businesses in Hays?",
      answer:
        "Job management dashboards, technician scheduling systems, customer history portals, AI dispatch automation, QuickBooks integration, and marketing websites are all within the standard offering for HVAC businesses.",
    },
    {
      question: "Can Preisser Solutions build a job management app for a Hays HVAC contractor?",
      answer:
        "Yes. Custom job management web applications — service tickets, technician assignment, equipment records, job status — are built for HVAC contractors in Hays.",
    },
    {
      question: "Does Preisser Solutions offer AI automation for HVAC dispatching?",
      answer:
        "Yes. AI-powered dispatch routing, technician assignment, and automated service reminders and follow-ups are offered to HVAC businesses.",
    },
    {
      question: "Can you build a website and SEO for a Hays HVAC company?",
      answer:
        "Yes. Custom websites built for HVAC local search — Google Business Profile, local pack, schema markup, and AI-search visibility — are an explicit service line.",
    },
    {
      question: "How much does custom HVAC software cost?",
      answer:
        "All projects use fixed-price proposals. Scope, deliverables, and total cost are agreed before work begins. Custom software for a small HVAC operation typically scopes at a fraction of the cost of off-the-shelf platforms over a 3-year horizon.",
    },
    {
      question: "Does Preisser Solutions serve HVAC businesses outside of Hays?",
      answer:
        "Yes. HVAC software and websites are offered across the western Kansas service area — Ellis, Salina, Great Bend, and surrounding markets.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Hays HVAC business?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hays-kansas-oil-gas-software",
    "hays-kansas-seo",
    "great-bend-kansas-web-design",
  ],
};
