import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/denver-colorado-web-design
 * Denver, CO — Denver County. Border-state market.
 */
export const locationData: LocationPageData = {
  slug: "denver-colorado-web-design",
  city: "Denver",
  state: "Colorado",
  region: "Border Markets",
  coordinates: { lat: 39.739, lng: -104.984 },

  metaTitle: "Web Design & Custom Software in Denver, CO | Preisser Solutions",
  metaDescription:
    "Custom websites, web apps, and AI automation for Denver, Colorado businesses — Kansas-based firm delivering remotely to Denver's tech and energy markets.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Denver, Colorado",
    h1: "Custom Websites and Software for Denver Businesses",
    subheadline:
      "Custom web design, web applications, and AI automation for Denver's technology, energy, aerospace, and professional-services markets — delivered remotely by a Kansas-based firm.",
    answerParagraph:
      "Preisser Solutions is a Kansas-based custom software and web development firm serving Denver, Colorado businesses remotely, with on-site travel to the Front Range for material engagements. Denver is a Denver County metro of approximately 715,000 and a regional hub for technology, aerospace, energy, and outdoor industries. Fixed-price proposals, full code ownership at launch.",
  },

  nearbyAreas: [
    { name: "Colorado Springs, CO", href: "/locations/colorado-springs-colorado-web-design", distanceLabel: "70 mi S" },
    { name: "Boulder, CO", distanceLabel: "30 mi NW" },
    { name: "Fort Collins, CO", distanceLabel: "65 mi N" },
    { name: "Aurora, CO", distanceLabel: "15 mi E" },
    { name: "Lakewood, CO", distanceLabel: "10 mi W" },
    { name: "Pueblo, CO", distanceLabel: "110 mi S" },
    { name: "Cheyenne, WY", distanceLabel: "100 mi N" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "375 mi E" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a Kansas-based firm serving Denver and Front Range businesses remotely, with on-site travel for material engagements.",
    "Denver's technology and startup ecosystem has strong demand for custom-coded web applications and AI automation.",
    "Custom code with full ownership at launch. No SaaS dependency or vendor lock-in.",
  ],

  industriesServed: [
    "Technology & Startups",
    "Aerospace & Defense",
    "Energy",
    "Healthcare",
    "Professional Services",
    "Outdoor & Recreation",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Denver, Colorado businesses?",
      answer:
        "Yes. Preisser Solutions is a Kansas-based firm serving Denver and Front Range businesses remotely, with on-site travel to Denver for material engagements.",
    },
    {
      question: "Why would a Denver business hire a Kansas-based development firm?",
      answer:
        "Preisser Solutions offers custom-coded web applications and AI automation at fixed prices, with full code ownership at launch. The geographic location of the firm does not affect code quality — and the fixed-price model and code ownership terms are often more favorable than Denver-market agencies.",
    },
    {
      question: "What industries does Preisser Solutions serve in Denver?",
      answer:
        "Technology startups, aerospace, energy, healthcare, professional services, and outdoor/recreation businesses are the primary industries in the Denver market.",
    },
    {
      question: "Can Preisser Solutions build a custom web app for a Denver tech startup?",
      answer:
        "Yes. Custom web applications, internal tools, and AI automation for technology companies are a core offering.",
    },
    {
      question: "How does remote delivery work for Denver clients?",
      answer:
        "All build work is delivered remotely with weekly Friday previews. For projects of sufficient scope, on-site travel to Denver is a normal part of the engagement.",
    },
    {
      question: "What is the pricing model for Denver projects?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins — no open-ended retainers.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Denver?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build for your Front Range business.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "colorado-springs-colorado-web-design",
    "wichita-kansas",
    "hays-kansas",
    "omaha-nebraska-web-design",
  ],
};
