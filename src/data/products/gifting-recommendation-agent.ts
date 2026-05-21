import type { ProductData } from "@/types/product";

export const product: ProductData = {
  slug: "gifting-recommendation-agent",
  metaTitle: "AI Gifting Recommendation Agent | Preisser Solutions",
  metaDescription:
    "Synthesizes partner preferences into personalized gift recommendations through a custom AI matching engine. Built and deployed as Wife Supply Co.",
  datePublished: "2026-05-21",
  dateModified: "2026-05-21",

  name: "AI Gifting Recommendation Agent",
  tagline:
    "Synthesizes partner preferences into personalized gift recommendations through a custom matching engine.",
  category: "Labs",
  status: "proof-of-concept",
  industries: ["AI commerce and gifting", "Consumer technology", "E-commerce"],

  h1: "Personalized gift recommendations from a machine that actually understands the inputs.",
  subheadline:
    "An AI recommendation engine that synthesizes individual preference signals into genuinely personalized gift suggestions — not a filter UI dressed up as AI, but a matching system that interprets what the input data means.",
  oneLine:
    "Custom AI matching engine that turns preference inputs into personalized gift recommendations per session.",

  whatItDoes: [
    "Generic gift recommendations fail for the same reason generic fitness plans fail: they don't account for the specific variables that determine whether a recommendation is actually good for the individual. A gifting engine that presents the same rotating inventory to every user regardless of input signals isn't doing personalization — it's doing merchandising with an AI label.",
    "The AI Gifting Recommendation Agent is built differently. Users input preference signals about the recipient — personality traits, interests, past gifts that landed well, past gifts that didn't, occasion context, and any specific constraints. The AI matching engine interprets those signals together rather than filtering against a tag database, producing recommendations that reflect the actual synthesis of the input.",
    "The engine was built and deployed as Wife Supply Co — a gifting platform for personalized recommendations through a custom commerce front end. The matching architecture is not Shopify's recommendation engine and not a tag-filter system. It's a custom AI layer that reads preference inputs and reasons about what would actually resonate.",
  ],
  capabilities: [
    {
      title: "Preference signal intake",
      description:
        "Collects multi-dimensional preference signals per session — personality, interests, occasion, past successes and failures — through a structured intake that captures the nuance filtering can't.",
    },
    {
      title: "AI preference synthesis",
      description:
        "Interprets the full set of input signals together rather than matching against individual tags — reasoning about what a recipient would actually value given the composite picture.",
    },
    {
      title: "Personalized recommendation generation",
      description:
        "Produces a curated, ranked set of gift recommendations with rationale for each — explaining why each suggestion fits the input signals.",
    },
    {
      title: "Per-session adaptation",
      description:
        "Every session produces a distinct set of recommendations calibrated to that session's inputs — the same engine produces different outputs for different preference profiles.",
    },
    {
      title: "Custom commerce integration",
      description:
        "Recommendations connect to a non-template commerce front end with conversion-optimized funnels engineered into the path from recommendation to checkout.",
    },
    {
      title: "Extensible matching framework",
      description:
        "The preference-synthesis-to-recommendation pattern adapts to any domain where individualized recommendation requires more than tag filtering — product matching, service curation, content recommendation.",
    },
  ],
  inputs: [
    { label: "Recipient preference signals (personality, interests, occasion)", format: "Structured intake form" },
    { label: "Past gift success and failure history (optional)", format: "Form input" },
    { label: "Budget and constraint parameters", format: "Form input" },
    { label: "Product catalog with relevant metadata", format: "JSON / CSV / API" },
  ],
  outputs: [
    { label: "Ranked personalized gift recommendations per session", format: "Commerce UI / JSON" },
    { label: "Recommendation rationale per suggestion", format: "Display copy / structured data" },
    { label: "Commerce funnel entry from recommendation to checkout", format: "Commerce platform" },
  ],
  howItWorks: [
    {
      step: "Preference signal collection",
      description:
        "The user inputs preference signals through the structured intake — personality markers, interests, occasion context, and any constraints that bound the recommendation space.",
    },
    {
      step: "Signal synthesis",
      description:
        "The AI matching engine interprets the full input set together, reasoning about what product attributes and categories would resonate with the specific preference profile — not filtering, synthesizing.",
    },
    {
      step: "Recommendation generation",
      description:
        "A ranked, curated set of recommendations is produced with a rationale for each — the engine explains why each suggestion fits, making the output trustworthy rather than opaque.",
    },
    {
      step: "Commerce funnel entry",
      description:
        "Recommendations surface in the commerce interface with conversion-optimized paths from each suggestion to the purchase decision.",
    },
  ],
  useCases: [
    "Use this when your product catalog is large enough that recommendation quality is the primary driver of conversion — and current filtering or recommendation logic isn't personalized enough to perform.",
    "Use this when preference inputs from customers are available but being underused — the signal is there, but the matching engine isn't sophisticated enough to make use of it.",
    "Use this as a demonstration of the AI recommendation pattern for any stakeholder evaluating whether personalized AI recommendations could apply to their product or service catalog.",
    "Use this when you want to build a commerce experience where the recommendation layer is a genuine differentiator rather than a standard filter interface.",
  ],
  techStack: [
    "Custom AI recommendation engine",
    "Custom commerce front end",
    "Conversion-optimized funnel architecture",
    "Preference signal intake system",
    "Brand-engineered design system",
  ],
  linkedCaseStudySlug: "wife-supply-co",
  statusNote:
    "Currently a working proof-of-concept; in user testing.",
  relatedSlugs: [
    "fitness-wellness-agent",
    "social-marketing-agent",
    "customer-research-agent",
  ],
  cta: {
    heading: "Want a recommendation engine that actually uses the preference signals?",
    subcopy:
      "Preisser Solutions can scope a production version of this matching engine for your catalog and customer profile. The first conversation covers your recommendation use case and current conversion gaps.",
    buttonLabel: "Discuss productizing this",
    buttonHref: "/contact?product=gifting-recommendation-agent",
  },
};
