import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS } from "./shared";
import type { LocationServiceCard } from "@/types/location";

/**
 * /locations/hays-kansas-healthcare-software
 * Hays, KS — Ellis County. Healthcare software industry × city combination.
 */

const HEALTHCARE_SERVICE_CARDS: LocationServiceCard[] = [
  {
    icon: "dashboard",
    title: "Healthcare Operations Dashboard",
    bullets: [
      "Custom dashboards for patient flow, scheduling, and staff operations",
      "Integration with existing EHR systems where data access permits",
      "Administrative reporting for practice management teams",
    ],
    href: "/services",
  },
  {
    icon: "automation",
    title: "Healthcare Workflow Automation",
    bullets: [
      "Automate intake, referral workflows, and follow-up communications",
      "AI document processing for forms, records, and billing",
      "Reduce administrative burden on clinical staff",
    ],
    href: "/services",
  },
  {
    icon: "website",
    title: "Healthcare Website & SEO",
    bullets: [
      "Custom-coded websites built for patient acquisition and local search",
      "HIPAA-conscious build practices: no third-party trackers on patient-facing forms",
      "AI-search optimization to appear in provider-recommendation queries",
    ],
    href: "/services",
  },
  {
    icon: "document",
    title: "Patient Communication Tools",
    bullets: [
      "Automated appointment reminders and follow-up sequences",
      "Secure patient intake forms and document collection",
      "Post-visit review request automation",
    ],
    href: "/services",
  },
];

export const locationData: LocationPageData = {
  slug: "hays-kansas-healthcare-software",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Healthcare Software in Hays, KS",
  metaDescription:
    "Custom healthcare software, patient portals, and workflow automation for providers in Hays, Kansas: built by a local firm.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Healthcare Software in Hays, Kansas",
    h1: "Custom Software for Healthcare Providers in Hays",
    subheadline:
      "Operations dashboards, workflow automation, patient communication tools, and websites for healthcare providers in Hays and the surrounding western Kansas region.",
    answerParagraph:
      "Preisser Solutions builds custom software for healthcare providers in Hays, Kansas: HaysMed (Hays Medical Center) is the regional hospital, and a significant number of specialist clinics, dental practices, mental health providers, and home health agencies serve Ellis County and the surrounding region. Services include operations dashboards, workflow automation, patient intake tools, and local SEO for patient acquisition. All builds follow HIPAA-conscious development practices.",
  },

  nearbyAreas: [
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "12 mi W" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SE" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W" },
    { name: "Russell, KS", distanceLabel: "35 mi E" },
    { name: "Plainville, KS", href: "/locations/plainville-kansas-web-design", distanceLabel: "55 mi N" },
  ],

  serviceCards: HEALTHCARE_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Hays is the healthcare hub for western Kansas: HaysMed serves a 25-county regional catchment. We are local to this market.",
    "HIPAA-conscious development practices are built into every patient-facing deliverable, not added as an afterthought.",
    "Custom code with full ownership at launch. No recurring SaaS platform fees for patient-facing tools.",
  ],

  industriesServed: [
    "Healthcare",
    "Dental",
    "Mental Health",
    "Home Health",
    "Medical Billing",
    "Clinics & Specialist Practices",
  ],

  faq: [
    {
      question: "Does Preisser Solutions build healthcare software in Hays?",
      answer:
        "Yes. Healthcare operations dashboards, workflow automation, patient communication tools, and HIPAA-conscious websites are all within the standard offering for Hays providers.",
    },
    {
      question: "What does HIPAA-conscious development mean?",
      answer:
        "We avoid third-party trackers on patient-facing pages, handle form submissions securely, and scope data handling requirements during the proposal phase. We are not a covered entity, but we build with data minimization and security in mind.",
    },
    {
      question: "Can Preisser Solutions build a patient intake form for a Hays clinic?",
      answer:
        "Yes. Secure patient intake forms and document collection tools (designed with HIPAA considerations) are within standard capability.",
    },
    {
      question: "Does Preisser Solutions offer local SEO for Hays healthcare providers?",
      answer:
        "Yes. Local SEO for medical practices (Google Business Profile, local pack, schema markup for healthcare providers, and AI-search visibility) is an explicit service.",
    },
    {
      question: "Can Preisser Solutions automate appointment reminders for a Hays practice?",
      answer:
        "Yes. Automated appointment reminder sequences via email and SMS, and post-visit review requests, are part of the patient communication automation offering.",
    },
    {
      question: "How does Preisser Solutions price healthcare software projects?",
      answer:
        "All projects use fixed-price proposals. Scope, deliverables, and total cost are agreed before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your Hays healthcare practice?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hays-kansas-seo",
    "hays-kansas-insurance-software",
    "great-bend-kansas-web-design",
  ],
};
