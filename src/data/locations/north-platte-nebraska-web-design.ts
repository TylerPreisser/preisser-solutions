import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

export const locationData: LocationPageData = {
  slug: "north-platte-nebraska-web-design",
  city: "North Platte",
  state: "Nebraska",
  region: "Border Markets",
  coordinates: { lat: 41.124, lng: -100.765 },

  metaTitle: "Web Design & Custom Software in North Platte, NE | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for North Platte, Nebraska — regional, remote-delivered service with travel for significant engagements.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving North Platte, Nebraska",
    h1: "Custom Software and Websites for North Platte Businesses",
    subheadline:
      "Custom web apps, AI automation, and websites for Lincoln County's rail, ag, and trucking economy — regional, remote-delivered service.",
    answerParagraph:
      "Preisser Solutions serves North Platte, Nebraska businesses with custom software, AI automation, custom websites, dashboards, and local SEO and AI-search optimization. Preisser Solutions is headquartered in Hays, Kansas — roughly 200 miles south. Engagements for North Platte businesses are delivered remotely, with travel for material in-person milestones on projects of significant scope. North Platte's Union Pacific rail hub and agricultural processing infrastructure generate real demand for custom operational tooling that remote-delivered custom software addresses well.",
  },

  nearbyAreas: [
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "200 mi S" },
    { name: "Goodland, KS", href: "/locations/goodland-kansas-web-design", distanceLabel: "130 mi S" },
    { name: "Ogallala, NE", distanceLabel: "55 mi W" },
    { name: "Kearney, NE", distanceLabel: "80 mi E" },
    { name: "McCook, NE", distanceLabel: "75 mi SE" },
    { name: "Lexington, NE", distanceLabel: "60 mi E" },
    { name: "Imperial, NE", distanceLabel: "55 mi SW" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "145 mi S" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a regional Kansas firm, not a local North Platte business. Engagements are remote-delivered with travel for material milestones. That is the honest model for this market.",
    "North Platte's rail and ag-processing economy operates at a scale where custom operational tooling — inventory systems, compliance dashboards, AI document processing — outperforms what regional Nebraska agencies typically offer.",
    "Custom code with full ownership at launch. No ongoing platform dependency.",
  ],

  industriesServed: [
    "Rail & Transportation",
    "Agriculture",
    "Trucking & Logistics",
    "Trades",
    "Professional Services",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve North Platte, Nebraska?",
      answer:
        "Yes, as a regional remote-delivery market. Preisser Solutions is based in Hays, Kansas, roughly 200 miles south. Engagements are delivered remotely, with travel for material in-person milestones on projects of significant scope.",
    },
    {
      question: "How far is Hays from North Platte?",
      answer:
        "About 200 miles south via US-83, roughly three hours. In-person visits are planned for scoping and significant milestones, not as routine check-ins.",
    },
    {
      question: "What does Preisser Solutions build for North Platte businesses?",
      answer:
        "Custom web applications, operational dashboards, AI document processing, custom websites, and local SEO optimization for rail, ag, trucking, and professional services operators.",
    },
    {
      question: "Can Preisser Solutions build custom tools for a North Platte rail or logistics operation?",
      answer:
        "Yes. Custom operational dashboards, shipment-tracking tools, compliance reporting, and AI document processing for bills of lading and freight documents are well within scope for rail-adjacent and logistics businesses.",
    },
    {
      question: "Is there a Nebraska-licensed or locally incorporated requirement for software engagements?",
      answer:
        "No. Software engagements are governed by contract, not business-address licensing. Preisser Solutions is a Kansas-based LLC that delivers remotely to clients across multiple states.",
    },
    {
      question: "What is the remote-delivery model for a North Platte engagement?",
      answer:
        "Scoping call, fixed-price written proposal, weekly working previews during build, a travel visit for material milestones where in-person adds value, launch with full code ownership, and 30 days of post-launch support.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in North Platte?",
    subcopy:
      "Book a free scoping call. We will map your operations and identify the highest-leverage build for your business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: ["hays-kansas", "goodland-kansas-web-design", "colby-kansas-web-design", "burlington-colorado-web-design"],
};
