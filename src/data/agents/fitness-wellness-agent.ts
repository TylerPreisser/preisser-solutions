import type { AgentData } from "@/types/agent";

export const agent: AgentData = {
  slug: "fitness-wellness-agent",
  metaTitle: "Personalized Fitness & Wellness Agent | Preisser Solutions",
  metaDescription:
    "Analyzes body-composition data and current research to produce personalized lifting, nutrition, and weight-loss regimens. Proof of concept available for production scoping.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "Personalized Fitness & Wellness Agent",
  tagline:
    "Analyzes body-composition data and current research; produces personalized lifting, nutrition, and weight-loss regimens.",
  category: "Analysis & Decision Support",
  status: "proof-of-concept",
  industries: ["Health and wellness", "Personal coaching", "Consumer health technology"],

  h1: "A fitness and nutrition plan built from your actual data — not a generic program.",
  subheadline:
    "An AI agent that ingests body composition measurements, reviews current exercise and nutrition research, and generates a fully personalized lifting regimen, nutrition plan, and weight-loss strategy tailored to the individual's specific numbers.",
  oneLine:
    "Produces evidence-based, individualized fitness and nutrition regimens from body-composition data and current research.",

  whatItDoes: [
    "Generic fitness programs don't work as well as individualized ones because they can't account for the specific variables that actually drive outcomes: starting body composition, metabolic factors, training history, and the specific research findings most applicable to that individual's profile. Building a truly personalized program manually requires time and expertise that most people don't have access to.",
    "The Personalized Fitness and Wellness Agent starts with the individual's body composition data — weight, body fat percentage, lean mass, measurements — and supplements that with current research on training protocols, nutrition science, and weight-loss methodology. From that combined input, it produces three coordinated outputs: a lifting regimen with progression structure, a nutrition plan with macronutrient targets and timing, and a weight-loss strategy with expected trajectory.",
    "The agent demonstrates what AI personalization-at-scale can produce in any domain requiring individualized recommendations. The same framework that reads body composition data and generates fitness recommendations can be reconfigured for any input-to-recommendation workflow — client onboarding, product matching, service customization.",
  ],
  capabilities: [
    {
      title: "Body composition data analysis",
      description:
        "Ingests weight, body fat percentage, lean mass, and measurement data to establish the individual's baseline and inform program design.",
    },
    {
      title: "Current research integration",
      description:
        "Pulls and synthesizes current exercise science and nutrition research applicable to the individual's profile — not generic advice, but research-grounded guidance.",
    },
    {
      title: "Personalized lifting regimen generation",
      description:
        "Produces a structured lifting program with exercise selection, volume, frequency, and progression logic tailored to the individual's goals and starting point.",
    },
    {
      title: "Macronutrient and nutrition planning",
      description:
        "Generates caloric targets, macronutrient ratios, and meal timing guidance calibrated to the individual's body composition, training load, and weight-loss objective.",
    },
    {
      title: "Weight-loss trajectory modeling",
      description:
        "Projects expected weight and body composition change over time under the recommended program, giving the individual a realistic timeline rather than a generic promise.",
    },
    {
      title: "Adaptable personalization framework",
      description:
        "The underlying framework — ingest individual data, harvest relevant research, generate personalized recommendations — is extensible to any domain requiring scaled individualization.",
    },
  ],
  inputs: [
    { label: "Body composition measurements (weight, body fat %, lean mass)", format: "Manual entry / structured form" },
    { label: "Training history and current fitness level", format: "Questionnaire / structured intake" },
    { label: "Goals (weight loss, muscle gain, performance)", format: "Structured intake" },
    { label: "Dietary preferences and restrictions", format: "Structured intake" },
    { label: "Available training schedule and equipment", format: "Structured intake" },
  ],
  outputs: [
    { label: "Personalized lifting program with progression structure", format: "Structured document / PDF" },
    { label: "Nutrition plan with caloric and macronutrient targets", format: "Structured document / PDF" },
    { label: "Weight-loss strategy with trajectory projection", format: "Structured document" },
    { label: "Research citations supporting key recommendations", format: "Appended references" },
  ],
  howItWorks: [
    {
      step: "Data intake",
      description:
        "The individual inputs body composition measurements, training history, goals, dietary preferences, and schedule constraints through a structured intake form.",
    },
    {
      step: "Research synthesis",
      description:
        "The agent reviews current exercise science and nutrition research applicable to the individual's profile and goals, identifying the protocols with the strongest evidence basis.",
    },
    {
      step: "Program generation",
      description:
        "A lifting regimen, nutrition plan, and weight-loss strategy are generated together as a coordinated program — each element calibrated to the individual's specific data.",
    },
    {
      step: "Trajectory modeling",
      description:
        "Expected body composition change is projected over the program timeframe based on the individual's starting point and the recommended caloric deficit or surplus.",
    },
    {
      step: "Output delivery",
      description:
        "The complete program is delivered in a structured format with supporting research citations so the individual understands the rationale behind each recommendation.",
    },
  ],
  useCases: [
    "Use this when you want a fitness and nutrition program built from your actual body composition numbers rather than a generic 12-week template.",
    "Use this when you want research-backed recommendations rather than fitness influencer protocols — evidence-grounded guidance for your specific profile.",
    "Use this as a demonstration of the AI personalization-at-scale pattern — showing what individualized recommendations look like when produced by an AI agent rather than a human consultant.",
    "Use this when you're evaluating whether the personalization framework could apply to your own domain — client onboarding, product matching, or service customization at scale.",
  ],
  techStack: [
    "Claude Sonnet 4.5",
    "Research retrieval and synthesis layer",
    "Structured intake form",
    "Trajectory modeling engine",
    "Document generation pipeline",
  ],
  statusNote:
    "Currently a working proof-of-concept built for personal use; productizing on request.",
  relatedSlugs: [
    "gifting-recommendation-agent",
    "email-digest-agent",
    "robin-hiring-screener",
  ],
  cta: {
    heading: "Want this personalization framework for your domain?",
    subcopy:
      "Preisser Solutions can scope a production version of the fitness wellness agent or adapt the same personalization framework to your specific recommendation use case.",
    buttonLabel: "Discuss productizing this",
    buttonHref: "/contact?agent=fitness-wellness-agent",
  },
};
