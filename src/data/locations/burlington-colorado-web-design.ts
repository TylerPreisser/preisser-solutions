import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "burlington-colorado-web-design",
  city: "Burlington",
  state: "Colorado",
  region: "Border Markets",
  coordinates: { lat: 39.300, lng: -102.270 },

  metaTitle: "Web Design & Custom Software in Burlington, CO | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Burlington, Colorado — regional, remote-delivered service for the eastern Colorado I-70 ag belt.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Burlington, Colorado",
    h1: "Custom Software and Websites for Burlington Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Kit Carson County's agriculture and I-70 corridor economy — regional service, remotely delivered.",
    answerParagraph:
      "Preisser Solutions serves Burlington, Colorado businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Preisser Solutions is headquartered in Hays, Kansas — roughly 175 miles east on I-70. Burlington is the first meaningful city across the Kansas-Colorado border, sitting at the eastern end of the same high-plains agricultural and trucking corridor the firm serves across western Kansas. Engagements are remote-delivered with travel for material in-person milestones on projects of sufficient scope.",
  },

  nearbyAreas: [
    { name: "Goodland, KS", href: "/locations/goodland-kansas-web-design", distanceLabel: "35 mi E" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "90 mi E" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "175 mi E" },
    { name: "Limon, CO", distanceLabel: "75 mi W" },
    { name: "Lamar, CO", distanceLabel: "80 mi S" },
    { name: "Cheyenne Wells, CO", distanceLabel: "30 mi NW" },
    { name: "Idalia, CO", distanceLabel: "25 mi N" },
    { name: "Oakley, KS", href: "/locations/oakley-kansas-web-design", distanceLabel: "100 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a regional Kansas firm, not a local Burlington business. Engagements are remote-delivered, with travel for material milestones. That is the honest model for this market.",
    "Eastern Colorado's ag belt shares the same operating context as western Kansas — the same high-plains economy, the same underserved digital market, and the same need for practical custom software over template sites.",
    "Custom code with full ownership. No ongoing platform fees on production software.",
  ],

  industriesServed: [
    "Agriculture",
    "Trucking & Logistics",
    "Trades",
    "Hospitality",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Burlington, Colorado?",
      answer:
        "Yes, as a regional border-market. Preisser Solutions is based in Hays, Kansas, roughly 175 miles east on I-70. Engagements are remote-delivered with travel to Burlington for material milestones on projects of significant scope.",
    },
    {
      question: "How far is Hays from Burlington?",
      answer:
        "About 175 miles east via I-70, roughly two and a half hours. In-person visits are planned for scoping and key milestones — not routine check-ins.",
    },
    {
      question: "What does Preisser Solutions build for Burlington, Colorado businesses?",
      answer:
        "Custom web applications, operational tools, AI automation, custom websites, and local SEO optimization for agricultural operators, trucking companies, and trades businesses in Kit Carson County.",
    },
    {
      question: "Can Preisser Solutions build a custom website for a Burlington, CO ag operation?",
      answer:
        "Yes. Custom websites for agricultural businesses — engineered for local and regional search visibility — are a standard engagement. Eastern Colorado ag operators face the same low-competition digital landscape as western Kansas.",
    },
    {
      question: "Is there a Colorado business license requirement for software vendors?",
      answer:
        "No. Software and website development engagements are governed by contract. Preisser Solutions is a Kansas-based LLC operating under Kansas law that delivers remotely to clients in multiple states.",
    },
    {
      question: "What is the engagement model for a Burlington, CO project?",
      answer:
        "Scoping call, fixed-price written proposal with scope and milestones, remote build with weekly previews, in-person travel for material milestones, launch with full code ownership transferred, and 30 days of post-launch support.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Burlington?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["goodland-kansas-web-design", "hays-kansas", "colby-kansas-web-design", "north-platte-nebraska-web-design"],
};
