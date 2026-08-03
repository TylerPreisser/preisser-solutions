import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS } from "./shared";
import { HG_OIL_INVENTORY_CARD, HG_OIL_INVOICE_CARD } from "./shared";
import type { LocationServiceCard } from "@/types/location";

/**
 * /locations/hays-kansas-oil-gas-software
 * Hays, KS — Ellis County. Oil & gas software industry × city combination.
 */

const OIL_GAS_SERVICE_CARDS: LocationServiceCard[] = [
  {
    icon: "dashboard",
    title: "Oil & Gas Operations Dashboard",
    bullets: [
      "Centralized inventory, production, and field-operations tracking",
      "Custom lease management and well status dashboards",
      "Real-time data views for field supervisors and back-office teams",
    ],
    href: "/services",
  },
  {
    icon: "document",
    title: "AI Invoice & Document Processing",
    bullets: [
      "AI-powered invoice intake, validation, and routing",
      "Automated vendor payment workflows and coding",
      "Eliminate manual data entry for field tickets and AFEs",
    ],
    href: "/services",
  },
  {
    icon: "automation",
    title: "Workflow Automation",
    bullets: [
      "Automate approval chains, compliance checklists, and reporting",
      "Connect field data to back-office accounting systems",
      "Reduce manual back-office hours per week",
    ],
    href: "/services",
  },
  {
    icon: "website",
    title: "Oil & Gas Company Website",
    bullets: [
      "Custom-coded operator and service-company websites",
      "Investor and regulatory document portals",
      "Built for AI-search visibility in the oil and gas sector",
    ],
    href: "/services",
  },
];

export const locationData: LocationPageData = {
  slug: "hays-kansas-oil-gas-software",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Oil & Gas Software in Hays, KS",
  metaDescription:
    "Custom oil and gas software, dashboards, and AI automation for operators in Hays and Ellis County, Kansas — built by a local firm.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Oil & Gas Software in Hays, Kansas",
    h1: "Custom Software for Oil and Gas Operations in Hays",
    subheadline:
      "Inventory dashboards, AI invoice processing, lease management tools, and workflow automation for oil and gas operators in Hays and Ellis County.",
    answerParagraph:
      "Preisser Solutions builds custom software for oil and gas operators in Hays, Kansas — the Ellis County seat, a hub for western Kansas oil and gas production. Services include centralized inventory and operations dashboards, AI-powered invoice processing and document automation, lease management portals, and field-to-back-office workflow tools. Based in Hays, we have direct knowledge of the western Kansas energy market.",
  },

  nearbyAreas: [
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "12 mi W" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SE" },
    { name: "Russell, KS", distanceLabel: "35 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "Plainville, KS", href: "/locations/plainville-kansas-web-design", distanceLabel: "55 mi N" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W" },
    { name: "Dodge City, KS", href: "/locations/dodge-city-kansas", distanceLabel: "130 mi SW" },
  ],

  serviceCards: OIL_GAS_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD, HG_OIL_INVOICE_CARD],

  whyLocal: [
    "Preisser Solutions is headquartered in Hays — Ellis County oil and gas operations are not a remote abstraction for this firm.",
    "We have built inventory and AI invoice-processing systems for a western Kansas oil operator. That work is referenced in our case studies.",
    "Custom code with full ownership. No per-seat software licensing or recurring SaaS fees after launch.",
  ],

  industriesServed: [
    "Oil & Gas",
    "Energy Services",
    "Field Services",
    "Oilfield Equipment",
    "Exploration",
  ],

  faq: [
    {
      question: "What custom software does Preisser Solutions build for oil and gas operators in Hays?",
      answer:
        "Centralized inventory dashboards, AI invoice processing, lease management portals, field-to-back-office workflow automation, and company websites are all within the standard offering.",
    },
    {
      question: "Does Preisser Solutions have experience with oil and gas software?",
      answer:
        "Yes. We built a centralized inventory platform and an AI invoice processing system for a western Kansas oil operator — both are documented case studies on this site.",
    },
    {
      question: "Can Preisser Solutions automate invoice processing for a Hays oil company?",
      answer:
        "Yes. AI-powered invoice intake, validation, vendor coding, and routing are an explicit service line. We have deployed this for an Ellis County operator.",
    },
    {
      question: "Can you build a lease management or production tracking tool?",
      answer:
        "Yes. Custom web applications for lease records, well status, production data, and field-supervisor dashboards are within standard capability.",
    },
    {
      question: "Does Preisser Solutions build websites for oil and gas companies in Hays?",
      answer:
        "Yes. Custom-coded websites for operators, service companies, and equipment dealers — including investor portals and regulatory document management — are offered.",
    },
    {
      question: "How does Preisser Solutions price oil and gas software projects?",
      answer:
        "All projects use fixed-price proposals. Scope, deliverables, and total cost are agreed before work begins. No open-ended retainers.",
    },
  ],

  cta: {
    headline: "Ready to build custom software for your oil and gas operation?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "Read the case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hays-kansas-hvac-software",
    "hays-kansas-trucking-software",
    "great-bend-kansas-web-design",
  ],
};
