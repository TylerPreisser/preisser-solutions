import type { CaseStudyData } from "@/types/case-study";

// Canonical project #8 — Wife Supply Co.
// Tyler's own build. STATUS FLAG: do not claim paying customers / revenue / live
// commerce without confirming with Tyler. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "wife-supply-co",
  metaTitle: "Wife Supply Co — AI Gifting Platform",
  metaDescription:
    "Wife Supply Co: an AI-powered gifting platform built from concept to launch — custom AI gift-matching engine, custom commerce, brand-engineered design system.",
  datePublished: "2025-10-01",
  dateModified: "2026-05-20",

  category: "AI Integration • Commerce Platform",
  clientName: "Wife Supply Co",
  clientNameDisplay: "Wife Supply Co",
  industry: "AI commerce and gifting",

  h1: "Wife Supply Co — AI Gifting Platform, Concept to Launch",
  subheadline:
    "Custom AI gift-matching engine paired with a non-template commerce front end and a brand-engineered design system, deployed end-to-end.",
  oneLine: "AI gift-matching engine, custom commerce front end",

  headlineResults: [
    { value: "Custom", label: "AI gift-matching engine" },
    { value: "Non-template", label: "Commerce front end" },
    { value: "Brand-engineered", label: "Design system" },
    { value: "Concept → Launch", label: "Built end-to-end" },
  ],

  hub: {
    problem:
      "A gifting concept with no commerce stack, no brand and no recommendation logic — and a premise that only works if the matching actually understands what it is given.",
    built:
      "A gift-matching engine that turns stated preferences into specific products, running on a purpose-built commerce front end and a design system made for the product rather than pulled from a theme.",
    outcome: "A working gifting platform taken from concept to launch, engine, storefront and brand together",
  },

  before: {
    heading: "A concept, a thesis, no platform.",
    body: [
      "Wife Supply Co began as a concept: a gifting platform that uses AI to synthesize personalized recommendations from partner preferences. The premise required an AI recommendation engine that could actually understand input variables and translate them into specific products — not a generic filter UI dressed up to look smart.",
      "There was no commerce stack, no brand identity, no design system, and no recommendation logic in place. The build had to deliver all of it together as a coherent product.",
    ],
  },

  built: {
    heading: "An AI recommendation engine, a custom commerce front end, and a brand to carry it.",
    body: [
      "Preisser Solutions built a custom AI gift-matching engine that analyzes input preferences and generates personalized gift recommendations. The platform is not a Shopify theme — the entire commerce front end is custom, with conversion-optimized funnels engineered into the path from input to checkout.",
      "A brand-engineered design system holds the experience together. Typography, color, motion, and component patterns were designed for the product rather than pulled from a template library.",
    ],
  },

  specifications: {
    heading: "What the platform is built from.",
    bullets: [
      "Custom AI recommendation engine that analyzes partner preferences",
      "Custom (non-Shopify) commerce front end — fully owned codebase",
      "Conversion-optimized purchase funnels designed into the architecture",
      "Brand-engineered design system covering typography, color, motion, and components",
      "End-to-end build from concept through deployment",
      "Personalized recommendation surface adapts to input variables per session",
    ],
    subsections: [
      {
        title: "AI gift-matching engine",
        items: [
          "Input preference intake per session",
          "Synthesis of personalized recommendations from analyzed inputs",
          "Adaptable framework — extensible to additional input categories",
        ],
      },
      {
        title: "Commerce surface",
        items: [
          "Non-template commerce front end (no Shopify)",
          "Funnels engineered for conversion from recommendation to checkout",
          "Brand-engineered visual system applied across every surface",
        ],
      },
    ],
  },

  results: [
    {
      value: "Custom",
      label: "AI gift-matching engine shipped",
      context:
        "A custom AI gift-matching engine is in place — analyzing inputs and generating personalized recommendations.",
    },
    {
      value: "Non-template",
      label: "Commerce front end deployed",
      context:
        "The full commerce front end is custom-built (not Shopify, not a template), giving full control over the funnel architecture.",
    },
    {
      value: "Brand-engineered",
      label: "Design system",
      context:
        "Typography, color, motion, and component patterns were designed for the product — not pulled from a library.",
    },
    {
      value: "Concept → Launch",
      label: "Built end-to-end",
      context:
        "Engine, commerce, and brand were delivered as one engagement — from initial concept through public-facing deployment.",
    },
  ],

  techStack: [
    "Custom AI recommendation engine",
    "Custom commerce front end",
    "Conversion-optimized funnel architecture",
    "Brand-engineered design system",
    "End-to-end deployment pipeline",
  ],

  relatedSlugs: [
    "iron-and-oak-podcast",
    "cassidy-hvac-marketing-engine",
    "cassidy-hvac-reactivation",
  ],

  cta: {
    heading: "Have a product concept that needs an AI engine and a brand to carry it?",
    subcopy:
      "Preisser Solutions builds custom AI products end-to-end — engine, commerce, and brand together. Scoping begins with a conversation about your thesis and your audience.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },

  statusNote:
    "Build status reflects the platform as shipped to launch. Public commerce metrics are not published until independently confirmed.",
};
