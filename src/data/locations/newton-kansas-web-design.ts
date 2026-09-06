import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "newton-kansas-web-design",
  city: "Newton",
  state: "Kansas",
  region: "Central Kansas",
  coordinates: { lat: 38.047, lng: -97.345 },

  metaTitle: "Newton, KS Web Design & Software",
  metaDescription:
    "Custom software, web apps, and AI automation for Newton, Kansas: built by a Hays-based firm for the Harvey County manufacturing and healthcare market.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Newton, Kansas",
    h1: "Custom Software and Websites for Newton Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Harvey County's manufacturing and healthcare economy: 25 miles north of Wichita.",
    answerParagraph:
      "Preisser Solutions serves Newton, Kansas businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Newton anchors Harvey County's economy and sits in the transition zone between the Wichita metro and central Kansas agricultural markets. That mix of manufacturing supply-chain, healthcare, and trades creates diverse demand for custom operational tooling. Based in Hays (roughly 145 miles northwest): we deliver remotely and travel for projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "25 mi S" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "30 mi W" },
    { name: "McPherson, KS", href: "/locations/mcpherson-kansas-web-design", distanceLabel: "30 mi N" },
    { name: "Hesston, KS", distanceLabel: "10 mi N" },
    { name: "Halstead, KS", distanceLabel: "15 mi W" },
    { name: "Burrton, KS", distanceLabel: "15 mi NW" },
    { name: "Derby, KS", href: "/locations/derby-kansas-web-design", distanceLabel: "30 mi S" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "145 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Newton's manufacturing and healthcare economy needs custom internal tools and operational automation, not marketing agency retainers.",
    "Kansas-based at Kansas economics. Wichita-metro proximity does not mean Wichita-metro pricing.",
    "Custom code with full ownership at launch. Healthcare-adjacent builds follow proper architecture for data handling from the ground up.",
  ],

  industriesServed: [
    "Manufacturing",
    "Healthcare",
    "Trades",
    "Professional Services",
    "Distribution",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Newton, Kansas?",
      answer:
        "Yes. Newton is an active engagement market. The firm is based in Hays and travels for scoping and milestone meetings on projects of sufficient scope.",
    },
    {
      question: "How far is Hays from Newton?",
      answer:
        "About 145 miles northwest via I-135 and I-70, roughly two hours and fifteen minutes. Travel for in-person work is treated as a standard part of the engagement.",
    },
    {
      question: "What does Preisser Solutions build for Newton manufacturers?",
      answer:
        "Custom production dashboards, inventory systems, quality-tracking tools, AI document processing for purchase orders and invoices, and supplier data visibility. Harvey County's manufacturing base is a strong fit for internal-tooling engagements.",
    },
    {
      question: "Can Preisser Solutions build software for a Newton healthcare practice?",
      answer:
        "Yes. Custom patient intake automation, staff scheduling tools, document processing, and healthcare portals are within scope. Builds are architected with proper data handling practices from the start.",
    },
    {
      question: "Do you offer custom websites for Newton-area service businesses?",
      answer:
        "Yes. Custom marketing sites engineered for speed, conversion, and AI-search visibility are available as standalone builds or bundled with SEO optimization for Newton-area service businesses.",
    },
    {
      question: "What makes Preisser Solutions a better fit for Newton businesses than a Wichita agency?",
      answer:
        "Preisser Solutions is a custom-software and AI automation firm, not a marketing agency. For businesses that need internal tools, dashboards, or AI automation, that distinction matters more than geographic proximity.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Newton?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["wichita-kansas", "hutchinson-kansas-web-design", "mcpherson-kansas-web-design", "derby-kansas-web-design"],
};
