import type { LocationPageData } from "@/types/location";
import {
  HG_OIL_INVENTORY_CARD,
  IRON_AND_OAK_CARD,
  STANDARD_PROCESS,
  STANDARD_SERVICE_CARDS,
} from "./shared";

/**
 * /locations/western-kansas-web-design
 * Regional roll-up page for the western half of Kansas.
 */
export const locationData: LocationPageData = {
  slug: "western-kansas-web-design",
  city: "Western Kansas",
  state: "Kansas",
  region: "Western Kansas",

  metaTitle: "Web Design Across Western Kansas",
  metaDescription:
    "Custom websites, web apps, and AI automation for western Kansas businesses — based in Hays, KS.",

  datePublished: "2026-05-20",
  dateModified: "2026-05-20",

  hero: {
    eyebrow: "Serving Western Kansas",
    h1: "Custom Web Design Across Western Kansas",
    subheadline:
      "Custom websites, web apps, and AI automation for the western half of the state — built locally in Hays.",
    answerParagraph:
      "Preisser Solutions is a custom-software firm based in Hays, Kansas, serving businesses across western Kansas with custom websites, web applications, AI automation, dashboards, and local SEO and AI-search optimization. In-person scoping calls and milestone meetings are standard for operators along the I-70 corridor and surrounding counties. Custom code, full ownership at launch.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "HQ" },
    { name: "Russell, KS", distanceLabel: "28 mi E of Hays" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "50 mi E of Hays" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "37 mi W of Hays" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W of Hays" },
    { name: "Garden City, KS", href: "/locations/garden-city-kansas", distanceLabel: "150 mi SW of Hays" },
    { name: "Dodge City, KS", href: "/locations/dodge-city-kansas", distanceLabel: "90 mi S of Hays" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "95 mi E of Hays" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  caseStudies: [HG_OIL_INVENTORY_CARD, IRON_AND_OAK_CARD],

  whyLocal: [
    "Headquartered in Hays — the only custom-software firm in the region with a documented portfolio of western-Kansas operator-side builds.",
    "Travel for in-person scoping and milestone meetings is built into the operating model, not billed extra.",
    "Custom code with full ownership transferred at launch. No proprietary platform.",
  ],

  industriesServed: [
    "Oilfield Services",
    "Agriculture",
    "Trades",
    "Energy",
    "Manufacturing",
    "Professional Services",
    "Hospitality",
  ],

  faq: [
    {
      question: "Where in western Kansas does Preisser Solutions work?",
      answer:
        "Hays is the headquarters. Active service area includes Ellis, Russell, Barton, Trego, Thomas, Finney, Ford, and surrounding counties. Travel for in-person work is standard for projects of meaningful scope.",
    },
    {
      question: "What does Preisser Solutions build for western Kansas businesses?",
      answer:
        "Custom web applications, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Internal builds at HG Oil Holdings inform the playbook for operator-side software.",
    },
    {
      question: "Do you serve oilfield services operators across western Kansas?",
      answer:
        "Yes. Western Kansas oil and gas is a core vertical, with documented internal builds at HG Oil Holdings — inventory management and AI invoice processing — that directly inform engagements for other operators in the region.",
    },
    {
      question: "Can Preisser Solutions help a small ag operation in western Kansas?",
      answer:
        "Yes. Custom websites, AI automation, and workflow tools are scoped to the size and budget of the operation. Fixed-price proposals mean there are no surprises.",
    },
    {
      question: "Do you offer AI search and SEO for western Kansas businesses?",
      answer:
        "Yes. Local SEO and AI-search visibility — citations on Google AI Overviews, ChatGPT, Perplexity, and Gemini — are an explicit service line, available alongside or independent of a custom website engagement.",
    },
    {
      question: "What is the difference between Preisser Solutions and a coastal agency?",
      answer:
        "Preisser Solutions is based in western Kansas and works at the cost structure of the region. The portfolio includes operator-side builds in industries the region actually runs on.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in western Kansas?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "great-bend-kansas",
    "wakeeney-kansas-web-design",
    "colby-kansas-web-design",
    "garden-city-kansas",
    "dodge-city-kansas",
    "salina-kansas",
  ],
};
