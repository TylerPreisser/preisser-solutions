import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/tulsa-oklahoma-web-design
 * Tulsa, OK — Tulsa County. Border-state market.
 */
export const locationData: LocationPageData = {
  slug: "tulsa-oklahoma-web-design",
  city: "Tulsa",
  state: "Oklahoma",
  region: "Border Markets",
  coordinates: { lat: 36.154, lng: -95.993 },

  metaTitle: "Tulsa, OK Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Tulsa, Oklahoma businesses — Kansas-based firm delivering remotely to Tulsa's energy and healthcare markets.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Tulsa, Oklahoma",
    h1: "Custom Websites and Software for Tulsa Businesses",
    subheadline:
      "Custom web design, web applications, and AI automation for Tulsa's energy, healthcare, and professional-services markets — delivered remotely by a Kansas-based firm.",
    answerParagraph:
      "Preisser Solutions is a Kansas-based custom software and web development firm serving Tulsa, Oklahoma businesses. Tulsa is a Tulsa County metro of approximately 413,000, anchored by energy (oil and gas), aerospace, healthcare, and finance. All work is delivered remotely, with on-site travel to Tulsa for material engagements.",
  },

  nearbyAreas: [
    { name: "Oklahoma City, OK", href: "/locations/oklahoma-city-oklahoma-custom-software", distanceLabel: "100 mi SW" },
    { name: "Coffeyville, KS", href: "/locations/coffeyville-kansas-web-design", distanceLabel: "60 mi N" },
    { name: "Bartlesville, OK", distanceLabel: "45 mi N" },
    { name: "Wichita, KS", href: "/locations/wichita-kansas", distanceLabel: "120 mi N" },
    { name: "Broken Arrow, OK", distanceLabel: "15 mi SE" },
    { name: "Owasso, OK", distanceLabel: "15 mi N" },
    { name: "Claremore, OK", distanceLabel: "25 mi NE" },
    { name: "Joplin, MO", distanceLabel: "80 mi NE" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a Kansas-based firm serving Tulsa and the northeast Oklahoma market remotely, with on-site travel for material engagements.",
    "Tulsa's energy and aerospace sectors require custom tools — not generic web templates.",
    "Custom code with full ownership at launch. No SaaS dependency or vendor lock-in.",
  ],

  industriesServed: [
    "Energy & Oil Services",
    "Aerospace",
    "Healthcare",
    "Finance",
    "Professional Services",
    "Manufacturing",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Tulsa, Oklahoma businesses?",
      answer:
        "Yes. Preisser Solutions is a Kansas-based firm that serves Tulsa and the northeast Oklahoma market remotely, with on-site travel available for larger engagements.",
    },
    {
      question: "What industries does Preisser Solutions serve in Tulsa?",
      answer:
        "Energy, oil and gas services, aerospace, healthcare, finance, and professional services are the primary industries served in the Tulsa market.",
    },
    {
      question: "Can Preisser Solutions build a website for a Tulsa energy company?",
      answer:
        "Yes. Custom websites and operational tools for energy sector businesses in Tulsa are within the firm's standard capability.",
    },
    {
      question: "How does remote delivery work for Tulsa clients?",
      answer:
        "All build work is delivered remotely with weekly Friday previews. For larger engagements, on-site travel to Tulsa is a normal part of the project.",
    },
    {
      question: "Does Preisser Solutions offer AI automation for Tulsa businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents are offered to Tulsa businesses.",
    },
    {
      question: "What is the pricing model for Tulsa projects?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Tulsa?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build for your Tulsa operation.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "oklahoma-city-oklahoma-custom-software",
    "wichita-kansas",
    "coffeyville-kansas-web-design",
    "hays-kansas",
  ],
};
