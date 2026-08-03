import type { LocationPageData } from "@/types/location";
import { STANDARD_PROCESS, STANDARD_SERVICE_CARDS } from "./shared";

/**
 * /locations/lincoln-nebraska-web-design
 * Lincoln, NE — Lancaster County. Border-state market.
 */
export const locationData: LocationPageData = {
  slug: "lincoln-nebraska-web-design",
  city: "Lincoln",
  state: "Nebraska",
  region: "Border Markets",
  coordinates: { lat: 40.813, lng: -96.703 },

  metaTitle: "Lincoln, NE Web Design & Software",
  metaDescription:
    "Custom websites, web apps, and AI automation for Lincoln, Nebraska businesses — Kansas-based firm delivering remotely to Lincoln's university and ag markets.",

  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  hero: {
    eyebrow: "Serving Lincoln, Nebraska",
    h1: "Custom Websites and Software for Lincoln Businesses",
    subheadline:
      "Custom web design, web applications, and AI automation for Lincoln's university, government, agriculture, and technology markets — delivered remotely by a Kansas-based firm.",
    answerParagraph:
      "Preisser Solutions is a Kansas-based custom software firm serving Lincoln, Nebraska businesses remotely, with on-site travel for material engagements. Lincoln is a Lancaster County city of approximately 295,000, the state capital, and home to the University of Nebraska-Lincoln. Technology, government, agriculture, healthcare, and insurance anchor the local economy. Fixed-price proposals, full code ownership at launch.",
  },

  nearbyAreas: [
    { name: "Omaha, NE", href: "/locations/omaha-nebraska-web-design", distanceLabel: "55 mi NE" },
    { name: "Manhattan, KS", href: "/locations/manhattan-kansas", distanceLabel: "145 mi S" },
    { name: "Beatrice, NE", distanceLabel: "40 mi S" },
    { name: "Hastings, NE", distanceLabel: "100 mi W" },
    { name: "Kansas City, MO", href: "/locations/kansas-city-missouri-custom-software", distanceLabel: "200 mi SE" },
    { name: "Topeka, KS", href: "/locations/topeka-kansas", distanceLabel: "160 mi S" },
    { name: "Grand Island, NE", distanceLabel: "95 mi W" },
    { name: "Hays, KS", href: "/locations/hays-kansas", distanceLabel: "300 mi S" },
  ],

  serviceCards: STANDARD_SERVICE_CARDS,
  process: STANDARD_PROCESS,

  whyLocal: [
    "Preisser Solutions is a Kansas-based firm serving Lincoln and the greater Nebraska market remotely, with on-site travel for material engagements.",
    "Lincoln's university and government context creates demand for custom tools — portals, dashboards, operational web applications.",
    "Custom code with full ownership at launch. No SaaS dependency or vendor lock-in.",
  ],

  industriesServed: [
    "Higher Education",
    "Government",
    "Agriculture",
    "Insurance",
    "Healthcare",
    "Technology",
  ],

  faq: [
    {
      question: "Does Preisser Solutions serve Lincoln, Nebraska businesses?",
      answer:
        "Yes. Preisser Solutions is a Kansas-based firm serving Lincoln businesses remotely, with on-site travel available for larger engagements.",
    },
    {
      question: "What industries does Preisser Solutions serve in Lincoln?",
      answer:
        "Higher education, government, agriculture, insurance, healthcare, and technology are the primary industries in Lincoln.",
    },
    {
      question: "Can Preisser Solutions build tools for University of Nebraska-Lincoln vendors?",
      answer:
        "Yes. Web applications, data portals, and operational tools for university-adjacent businesses are within standard capability.",
    },
    {
      question: "How does remote delivery work for Lincoln clients?",
      answer:
        "All build work is delivered remotely with weekly Friday previews. For larger engagements, on-site travel to Lincoln is a normal part of the project.",
    },
    {
      question: "Does Preisser Solutions offer AI automation for Lincoln businesses?",
      answer:
        "Yes. AI document processing, workflow automation, and AI agents are offered to Lincoln businesses.",
    },
    {
      question: "What is the pricing model for Lincoln projects?",
      answer:
        "All projects use fixed-price proposals. Scope, timeline, and total cost are agreed before work begins.",
    },
  ],

  cta: {
    headline: "Ready to build something that works in Lincoln?",
    subcopy:
      "Book a free scoping call. We will map your workflows and identify the highest-leverage build.",
    primaryButton: { label: "Start a project", href: "/contact" },
    secondaryLink: { label: "See case studies", href: "/case-studies" },
  },

  relatedLocations: [
    "omaha-nebraska-web-design",
    "manhattan-kansas",
    "topeka-kansas",
    "hays-kansas",
  ],
};
