import type { CaseStudyData } from "@/types/case-study";

// Canonical project #23 — tylerpreisser.com (Tyler's personal/professional site).
// Tyler's own build. Founder presence layer. See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "tyler-preisser-site",
  metaTitle: "tylerpreisser.com: Founder Portfolio",
  metaDescription:
    "Minimalist personal portfolio site for Tyler Preisser: readability-first, dark editorial layout, optimized for AI-search citation.",
  datePublished: "2026-05-16",
  dateModified: "2026-05-20",

  category: "Website Build • Personal Brand",
  clientName: "Tyler Preisser",
  clientNameDisplay: "Tyler Preisser",
  industry: "Founder and personal brand",

  h1: "tylerpreisser.com: Founder Portfolio for an AI Operator",
  subheadline:
    "A minimalist personal portfolio site for Tyler Preisser: dark editorial layout, readability-first hierarchy, and JSON-LD Person schema engineered for AI-search citation.",
  oneLine:
    "Minimalist personal portfolio site for Tyler Preisser: readability-first, dark editorial layout, optimized for AI-search citation.",

  headlineResults: [
    { value: "Dark", label: "Editorial aesthetic" },
    { value: "8", label: "Competency areas" },
    { value: "Multi", label: "Channel CTAs" },
    { value: "Fast", label: "First-paint priority" },
  ],

  before: {
    heading: "A founder with no canonical web presence for AI search to cite.",
    body: [
      "Before this build, the only persistent web presence for Tyler Preisser was scattered across third-party profiles: primarily LinkedIn. There was no canonical Tyler Preisser entity for AI knowledge graphs to anchor on, no single page prospects could reach when evaluating the founder behind Preisser Solutions, and no founder-presence layer to support the consultancy's sales motion.",
      "For a consultancy whose differentiation runs through the operator behind it, that gap was real. The build closes it with a single canonical page tuned for human readability and AI-search citation.",
    ],
  },

  built: {
    heading: "A dark editorial portfolio tuned for readability and AI citation.",
    body: [
      "Preisser Solutions built a full personal portfolio site with a dark editorial aesthetic: readable typographic hierarchy, generous whitespace, and animation kept intentionally restrained so the page lands fast and reads cleanly. Sections cover Tyler's founder role, a 'What Tyler Does' summary anchored on agentic AI solutions, a background narrative spanning agriculture, construction, engineering, and entrepreneurship, eight competency blocks covering AI systems, automation, product strategy and adjacent areas, the Engineering Design & Technology degree from Fort Hays State University (2021–2025), and a connect block with LinkedIn, GitHub, email, and resume download CTAs.",
      "The site is positioned for practical production-grade AI work, with ROI-focused messaging ('replace manual work at scale') and diverse-background credibility carried through the narrative. JSON-LD Person schema with a canonical @id gives AI search engines a stable entity reference: when an AI agent surfaces Tyler Preisser as a result, it has a single canonical page to cite.",
    ],
  },

  specifications: {
    heading: "Layout, content surface, and AI-search positioning.",
    bullets: [
      "Dark editorial theme with light typographic hierarchy",
      "Readability-first layout: not animation-heavy",
      "Multiple connect-channel CTAs (LinkedIn, GitHub, email, resume download)",
      "JSON-LD Person schema with canonical @id for AI knowledge graph anchoring",
      "Founder presence sections covering role, capability, background, skills, education, and contact",
      "First-paint and clean rendering prioritized over visual flourish",
    ],
    subsections: [
      {
        title: "Content surface",
        items: [
          "Professional role overview: founder of Preisser Solutions",
          "'What Tyler Does': agentic AI solutions, automation, product",
          "Background narrative: agriculture, construction, engineering, entrepreneurship",
          "Eight competency blocks (AI systems, automation, product strategy, and adjacent areas)",
          "Education: Engineering Design & Technology, Fort Hays State University, 2021–2025",
          "Connect block: LinkedIn, GitHub, email, resume download",
        ],
      },
      {
        title: "AI-search positioning",
        items: [
          "JSON-LD Person schema with canonical @id",
          "Single canonical URL for AI agents to cite",
          "Readability-first typography hierarchy for clean AI extraction",
          "ROI-aligned messaging: 'replace manual work at scale'",
        ],
      },
    ],
  },

  results: [
    {
      value: "Canonical",
      label: "Tyler Preisser entity for AI search",
      context:
        "JSON-LD Person schema with a stable canonical @id gives AI knowledge graphs a single page to anchor the Tyler Preisser entity on.",
    },
    {
      value: "8",
      label: "Competency areas surfaced",
      context:
        "Eight competency blocks cover AI systems, automation, product strategy, and adjacent areas, giving prospects a structured way to evaluate fit.",
    },
    {
      value: "Multi",
      label: "Connect-channel CTAs",
      context:
        "LinkedIn, GitHub, email, and resume download CTAs live in a dedicated connect block: multiple paths from page to conversation.",
    },
    {
      value: "Fast",
      label: "First-paint priority",
      context:
        "Animation kept intentionally restrained and layout tuned for fast first paint, the page lands quickly and reads cleanly on every surface.",
    },
  ],

  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Cloudflare Pages",
  ],

  relatedSlugs: [
    "preisser-solutions-site",
    "iron-and-oak-podcast",
  ],

  cta: {
    heading: "Need a founder-presence layer that AI search can cite?",
    subcopy:
      "Preisser Solutions builds canonical personal and founder portfolio sites: readability-first design, JSON-LD entity anchoring, and clean connect surfaces. Scoping begins with a conversation.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },

  statusNote:
    "Build and architecture are real and live. Specific reach, traffic, and conversion outcomes are not claimed until independently confirmed.",
};
