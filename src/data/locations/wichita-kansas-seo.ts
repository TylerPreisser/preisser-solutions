import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/wichita-kansas-seo
 * Wichita, KS — SEO / AI search intent variant.
 */
export const locationData: LocationPageData = {
  slug: "wichita-kansas-seo",
  city: "Wichita",
  state: "Kansas",
  region: "South-Central Kansas",
  coordinates: { lat: 37.692, lng: -97.330 },

  metaTitle: "SEO & AI Search Optimization in Wichita, KS | Preisser Solutions",
  metaDescription:
    "Local SEO and AI search optimization for Wichita, Kansas businesses — get found on Google, ChatGPT, Perplexity, and Gemini.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "SEO & AI Search in Wichita, Kansas",
    h1: "Local SEO and AI Search Optimization for Wichita",
    subheadline:
      "Get found on Google, Google AI Overviews, ChatGPT, Perplexity, and Gemini — local SEO and AI-search optimization for Wichita businesses.",
    answerParagraph:
      "Preisser Solutions delivers local SEO and AI-search optimization for businesses in Wichita, Kansas — Kansas's largest metro, a Sedgwick County market of 397,000. Services include Google Business Profile optimization, local pack strategy, citation building, schema markup, and AI-search citation engineering so your business is cited when ChatGPT, Perplexity, Gemini, and Google AI Overviews answer questions about your industry in Wichita.",
  },

  nearbyAreas: [
    { name: "Derby, KS", href: "/locations/derby-kansas-web-design", distanceLabel: "12 mi SE" },
    { name: "Hutchinson, KS", href: "/locations/hutchinson-kansas-web-design", distanceLabel: "40 mi NW" },
    { name: "Newton, KS", href: "/locations/newton-kansas-web-design", distanceLabel: "25 mi N" },
    { name: "Winfield, KS", href: "/locations/winfield-kansas-web-design", distanceLabel: "50 mi S" },
    { name: "El Dorado, KS", distanceLabel: "30 mi E" },
    { name: "Arkansas City, KS", href: "/locations/arkansas-city-kansas-web-design", distanceLabel: "60 mi S" },
    { name: "Pratt, KS", href: "/locations/pratt-kansas-web-design", distanceLabel: "80 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "200 mi NW" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Wichita is a competitive market — aerospace, healthcare, and professional services firms all compete for local search real estate.",
    "AI-search visibility is a separate discipline from traditional SEO. Preisser Solutions engineers both simultaneously.",
    "Schema markup, content architecture, and authoritative internal linking are implemented as code — not as plugin configurations.",
  ],

  industriesServed: [
    "Aerospace & Aviation",
    "Healthcare",
    "Manufacturing",
    "Financial Services",
    "Professional Services",
    "Retail",
  ],

  faq: [
    {
      question: "What is local SEO and why does it matter for Wichita businesses?",
      answer:
        "Local SEO is the practice of optimizing your online presence so your business appears in Google's local pack, map results, and AI Overviews when people search for your services in Wichita. It matters because the majority of local purchase decisions begin with a search.",
    },
    {
      question: "What is AI search optimization for Wichita businesses?",
      answer:
        "AI search optimization means engineering your website and content so that ChatGPT, Perplexity, Gemini, and Google AI Overviews cite your business when answering questions about your industry in Wichita. It requires different techniques than traditional SEO.",
    },
    {
      question: "Does Preisser Solutions offer local SEO for Wichita?",
      answer:
        "Yes. Local SEO — Google Business Profile, local pack, citations, schema markup — and AI-search citation engineering are both explicit service lines for Wichita businesses.",
    },
    {
      question: "How competitive is SEO in the Wichita market?",
      answer:
        "Wichita is Kansas's largest market. Competition for local search real estate is meaningful in aerospace, healthcare, financial services, and professional services — but most competitors are not yet optimized for AI search.",
    },
    {
      question: "Can Preisser Solutions help a Wichita business rank on ChatGPT?",
      answer:
        "Yes. AI-search citation engineering — the technical and content work required to be cited by ChatGPT, Perplexity, and Gemini — is an explicit service. ChatGPT does not have a traditional ranking; it cites authoritative sources, which requires different optimization.",
    },
    {
      question: "Does Preisser Solutions build websites as part of Wichita SEO engagements?",
      answer:
        "Typically yes. The highest-leverage SEO improvements require control over site architecture, schema markup, and page content — which is easiest when we also build or rebuild the site.",
    },
  ],

  cta: {
    headline: "Ready to dominate search in Wichita?",
    subcopy:
      "Book a free scoping call. We will audit your current search presence and map a path to Google and AI-search visibility.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "wichita-kansas",
    "wichita-kansas-custom-software",
    "salina-kansas-seo",
    "hays-kansas",
  ],
};
