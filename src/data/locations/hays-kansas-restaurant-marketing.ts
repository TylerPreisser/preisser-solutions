import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS } from "./shared";
import type { LocationServiceCard } from "@/types/location";

/**
 * /locations/hays-kansas-restaurant-marketing
 * Hays, KS — Ellis County. Restaurant marketing industry × city combination.
 */

const RESTAURANT_SERVICE_CARDS: LocationServiceCard[] = [
  {
    icon: "website",
    title: "Restaurant Website",
    bullets: [
      "Custom-coded restaurant website with online menu, hours, and CTAs",
      "Built for mobile-first — the majority of restaurant searches are on mobile",
      "Schema markup that displays star ratings and hours in Google search results",
    ],
    href: "/services",
  },
  {
    icon: "seo",
    title: "Restaurant Local SEO & AI Search",
    bullets: [
      "Google Business Profile optimization — categories, photos, reviews, posts",
      "Appear in Google's local pack when people search 'restaurants near me' in Hays",
      "AI-search optimization to be cited by ChatGPT and Perplexity food queries",
    ],
    href: "/services",
  },
  {
    icon: "automation",
    title: "Review & Reputation Automation",
    bullets: [
      "Automated review request sequences sent after a guest visit",
      "Centralized dashboard to monitor and respond to reviews",
      "Alert system for negative review triage",
    ],
    href: "/services",
  },
  {
    icon: "dashboard",
    title: "Online Ordering & Reservation Tools",
    bullets: [
      "Custom online ordering pages without third-party commission fees",
      "Reservation widget integrated into your site",
      "Email and SMS collection for your own marketing list",
    ],
    href: "/services",
  },
];

export const locationData: LocationPageData = {
  slug: "hays-kansas-restaurant-marketing",
  city: "Hays",
  state: "Kansas",
  region: "Western Kansas",
  coordinates: { lat: 38.879, lng: -99.327 },

  metaTitle: "Restaurant Marketing & Websites in Hays, KS | Preisser Solutions",
  metaDescription:
    "Restaurant websites, local SEO, and AI-powered review automation for restaurants in Hays, Kansas — built by a local firm.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Restaurant Marketing in Hays, Kansas",
    h1: "Restaurant Marketing and Websites for Hays Businesses",
    subheadline:
      "Custom restaurant websites, local SEO, Google Business Profile optimization, and automated review management for restaurants in Hays, Kansas.",
    answerParagraph:
      "Preisser Solutions builds restaurant marketing systems for Hays, Kansas — custom websites, Google Business Profile optimization, local search visibility, and AI-powered review automation for restaurants and food-service businesses in Ellis County. Based in Hays, we are local to the market and available for in-person consultation.",
  },

  nearbyAreas: [
    { name: "Ellis, KS", href: "/locations/ellis-kansas-web-design", distanceLabel: "12 mi W" },
    { name: "WaKeeney, KS", href: "/locations/wakeeney-kansas-web-design", distanceLabel: "35 mi W" },
    { name: "Colby, KS", href: "/locations/colby-kansas-web-design", distanceLabel: "120 mi W" },
    { name: "Great Bend, KS", href: "/locations/great-bend-kansas", distanceLabel: "65 mi SE" },
    { name: "Salina, KS", href: "/locations/salina-kansas", distanceLabel: "100 mi E" },
    { name: "Hill City, KS", href: "/locations/hill-city-kansas-web-design", distanceLabel: "45 mi N" },
    { name: "Russell, KS", distanceLabel: "35 mi E" },
    { name: "Plainville, KS", href: "/locations/plainville-kansas-web-design", distanceLabel: "55 mi N" },
  ],

  serviceCards: RESTAURANT_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "We are headquartered in Hays and know the local restaurant market — the Fort Hays State student base, the I-70 traveler traffic, and the local dining community.",
    "Restaurant SEO and local search require real implementation, not just a claimed Google Business Profile.",
    "Custom code with full ownership. No third-party ordering platform commissions after launch.",
  ],

  industriesServed: [
    "Restaurants",
    "Food & Beverage",
    "Cafes & Coffee",
    "Bars & Nightlife",
    "Catering",
  ],

  faq: [
    {
      question: "Does Preisser Solutions offer marketing for restaurants in Hays?",
      answer:
        "Yes. Restaurant websites, local SEO, Google Business Profile optimization, and automated review management are all offered for Hays restaurant businesses.",
    },
    {
      question: "What does local SEO do for a Hays restaurant?",
      answer:
        "Local SEO makes your restaurant appear in Google's local pack — the map results — when people search 'restaurants near me' or specific cuisine types in Hays. It also optimizes your Google Business Profile for maximum visibility.",
    },
    {
      question: "Can Preisser Solutions help a Hays restaurant get more Google reviews?",
      answer:
        "Yes. Automated review request sequences — sent via email or SMS after a guest visit — are an explicit service. Review count and recency are the strongest factors in Google local pack rankings.",
    },
    {
      question: "Does Preisser Solutions build online ordering systems for restaurants?",
      answer:
        "Yes. Custom online ordering pages — without third-party commission fees — are within standard capability.",
    },
    {
      question: "Can Preisser Solutions help a Hays restaurant appear in AI search results?",
      answer:
        "Yes. AI-search optimization — being cited by ChatGPT and Perplexity when users ask for restaurant recommendations in Hays — is an explicit service.",
    },
    {
      question: "How does Preisser Solutions price restaurant marketing?",
      answer:
        "All projects use fixed-price proposals. Website builds and SEO infrastructure are priced as one-time projects. Ongoing retainers for monthly SEO work are optional.",
    },
  ],

  cta: {
    headline: "Ready to fill more tables in Hays?",
    subcopy:
      "Book a free scoping call. We will audit your current search presence and map a path to more visibility.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "hays-kansas",
    "hays-kansas-seo",
    "hays-kansas-digital-marketing",
    "great-bend-kansas-digital-marketing",
  ],
};
