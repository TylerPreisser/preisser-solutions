import type { CaseStudyData } from "@/types/case-study";

// Canonical project #13 — Custom AI Fitness & Wellness Agent.
// Internal proof of concept. No client outcomes claimed.
// See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "ai-fitness-wellness-agent",
  metaTitle: "Custom AI Fitness & Wellness Agent",
  metaDescription:
    "Proof-of-concept AI agent that analyzes body composition data, harvests current research, and produces fully personalized lifting and nutrition regimens.",
  datePublished: "2026-04-02",
  dateModified: "2026-05-20",

  category: "Proof of Concept • Custom AI Agent",
  clientName: "AI Fitness & Wellness Agent",
  clientNameDisplay: "Internal Proof of Concept",
  industry: "Custom AI agent and personalization engine",

  h1: "Custom AI Fitness Agent: What a Personalization Engine Looks Like",
  subheadline:
    "An internal proof-of-concept agent that analyzes body composition data, harvests current research, and produces fully personalized lifting, nutrition, and weight-loss regimens.",
  oneLine: "Personalized regimens generated from body composition data and current research",

  headlineResults: [
    { value: "Body comp", label: "Data intake per individual" },
    { value: "Live", label: "Research harvesting for each plan" },
    { value: "Personalized", label: "Lifting, nutrition, and weight loss outputs" },
    { value: "Any domain", label: "Pattern adapts beyond fitness" },
  ],

  before: {
    heading: "Personalization at scale is the hard problem for any business.",
    body: [
      "Almost every service business eventually hits the same wall: clients want personalization, but personalization requires expertise per client, and expertise per client does not scale. A financial advisor cannot rewrite every plan weekly. A nutritionist cannot research the latest study for every client. A trainer cannot redesign every program. The market has settled for templates because the alternative is too expensive.",
      "Custom AI agents change that equation. They ingest a client's data, pull the latest research, and produce a plan tuned to that specific person: at a cost that lets a business actually offer it as a service. Preisser Solutions built a fitness and wellness agent as the proof of concept for that pattern.",
    ],
  },

  built: {
    heading: "An agent that reads the data, reads the research, and writes the plan.",
    body: [
      "The agent takes body composition data as input: weight, body fat percentage, lean mass, and goal metrics. It then harvests current research relevant to the individual's profile and goals (recent training studies, nutrition meta-analyses, supplement efficacy data) and synthesizes a fully personalized regimen: lifting program, nutrition plan, and weight-loss strategy.",
      "The point is not the fitness output. The point is the pattern. The same agent framework can be repointed at any domain that needs personalization at scale: a financial advisor's portfolio agent, an insurance broker's coverage agent, a nutritionist's meal-plan agent, a trainer's program agent. The data inputs and research sources change. The architecture does not.",
    ],
  },

  specifications: {
    heading: "Agent architecture.",
    bullets: [
      "Body composition data intake per individual",
      "AI research harvesting from current literature",
      "Personalized lifting program generation",
      "Personalized nutrition and weight-loss plan generation",
      "Adaptable framework for any domain requiring scaled personalization",
    ],
    subsections: [
      {
        title: "What this proves out",
        items: [
          "AI agents can produce expert-level personalization without a human reviewing every plan",
          "Research harvesting can be wired into the generation step, not bolted on later",
          "The architecture is domain-agnostic: fitness is one application",
          "Cost-per-plan is low enough to make the offer commercially viable",
        ],
      },
      {
        title: "Example adjacent domains",
        items: [
          "Financial advisor → portfolio personalization agent",
          "Nutritionist → meal-plan generation agent",
          "Personal trainer → program-design agent",
          "Insurance agent → coverage-recommendation agent",
        ],
      },
    ],
  },

  results: [
    {
      value: "Body comp",
      label: "Personal data intake",
      context:
        "Each generated plan starts from the individual's specific body composition data, not a generic template.",
    },
    {
      value: "Live",
      label: "Research harvesting per plan",
      context:
        "The agent harvests current research relevant to the goal and profile before generating recommendations.",
    },
    {
      value: "Full plan",
      label: "Lifting, nutrition, and weight loss outputs",
      context:
        "Output is a fully formed regimen (lifting program, nutrition plan, and weight-loss strategy), not a list of suggestions.",
    },
    {
      value: "Any domain",
      label: "Adaptable framework",
      context:
        "The same architecture re-applies to any domain that needs personalized output at scale: finance, nutrition, training, insurance, and more.",
    },
  ],

  techStack: [
    "Claude API",
    "Research harvesting pipeline",
    "Personalization engine",
    "Body composition schema",
    "Domain-adaptable framework",
  ],

  relatedSlugs: [
    "ai-trend-behavioral-analysis",
    "agentic-coding-specialists",
    "custom-local-ai-models",
  ],

  cta: {
    heading: "Need scaled personalization for your business?",
    subcopy:
      "Preisser Solutions builds custom AI agents tuned to your domain: financial planning, nutrition, training, insurance, or anywhere personalization is the offer. Free 30-minute scoping call.",
    buttonLabel: "Schedule a call",
    buttonHref: "/contact",
  },
};
