import type { CaseStudyData } from "@/types/case-study";

// Canonical project #7 — The Iron and Oak Podcast.
// Tyler's own build. Co-hosted with Lincoln Myers (publishable).
export const caseStudy: CaseStudyData = {
  slug: "iron-and-oak-podcast",
  metaTitle: "Iron and Oak: Cinematic Media Brand",
  metaDescription:
    "The Iron and Oak Podcast: a full cinematic media brand, 134 pre-rendered pages, custom design system, GSAP smooth scroll, and complete studio buildout.",
  datePublished: "2025-12-04",
  dateModified: "2026-05-20",

  category: "Business Software • Media Platform Build",
  clientName: "Iron and Oak Podcast",
  clientNameDisplay: "The Iron and Oak Podcast",
  industry: "Media and podcasting",

  h1: "The Iron and Oak Podcast: Cinematic Media Brand, Built End-to-End",
  subheadline:
    "Designed and built the full cinematic media brand from concept to launch: website, brand system, studio, distribution, and a thesis that drove every design decision.",
  oneLine: "134 pre-rendered pages, full cinematic media brand",

  headlineResults: [
    { value: "134", label: "Pre-rendered pages live" },
    { value: "12", label: "Episodes architected" },
    { value: "109", label: "Questions across 5 phases" },
    { value: "End-to-end", label: "Brand, web, studio, distribution" },
  ],

  hub: {
    problem:
      "A thesis and two co-hosts, with no website, no brand identity, no studio and no way to get an episode in front of anyone.",
    built:
      "The whole media platform: brand identity and design system, a 134-page site with every episode and question architected into it, the studio itself, and distribution across the major platforms.",
    outcome: "134 pre-rendered pages live, and a show that publishes on infrastructure it owns",
  },

  before: {
    heading: "A thesis, two co-hosts, and a blank slate.",
    body: [
      "Iron and Oak began as a concept co-hosted by Tyler Preisser and Lincoln Myers. There was no website, no brand identity, no studio, and no distribution infrastructure. The only fixed point was the thesis itself.",
      "That thesis: iron is the hard, forged material of conviction; oak is the organic, rooted material of growth. Duality drives every design decision. Every visual choice, every typographic pairing, every animation cue had to express both materials at once: without either becoming dominant.",
    ],
  },

  built: {
    heading: "Everything: brand, site, studio, distribution.",
    body: [
      "Preisser Solutions built the website, brand identity, logo, design system, studio setup, and distribution infrastructure across every major platform. The site was generated using a Claude Code multi-agent system prompt with research-backed architecture inspired by Stripe, Virgin Galactic, and Airbnb-tier visual quality.",
      "The build covers 134 pre-rendered pages, 12 episodes, and 109 questions arranged across five thematic phases. Dark and light modes ship together. Full GEO optimization is built in so the show is citable across AI search engines. The studio is wired with broadcast-grade equipment: Canon EOS R6 Mark II, four Shure SM7B microphones, RODECaster Pro II and RODECaster Video, and Sony MDR-7506 reference headphones.",
    ],
  },

  specifications: {
    heading: "Stack, content surface, and studio.",
    bullets: [
      "Next.js 16, React 19, TypeScript, GSAP, Lenis smooth scroll",
      "Cloudflare Pages deployment with static export",
      "134 pre-rendered pages across episodes, questions, phases, and supporting routes",
      "12 episodes, 109 questions, 5 thematic phases: complete content architecture",
      "Dark mode and light mode shipped together with a synchronized design system",
      "Full GEO optimization for AI search citation across major engines",
    ],
    subsections: [
      {
        title: "Web stack",
        items: [
          "Next.js 16 with React 19 and TypeScript",
          "GSAP and Lenis for cinematic smooth scrolling",
          "Custom design system inspired by Stripe, Virgin Galactic, and Airbnb",
          "Static export to Cloudflare Pages",
          "Built using a Claude Code multi-agent system prompt",
        ],
      },
      {
        title: "Content architecture",
        items: [
          "12 episodes anchored to the iron-and-oak thesis",
          "109 questions distributed across 5 thematic phases",
          "Speaker's reference card system",
          "Short-form video clip automation strategy",
        ],
      },
      {
        title: "Studio configuration",
        items: [
          "Canon EOS R6 Mark II primary camera",
          "4x Shure SM7B microphones",
          "RODECaster Pro II audio mixer",
          "RODECaster Video for visual switching",
          "Sony MDR-7506 reference headphones",
        ],
      },
    ],
  },

  results: [
    {
      value: "134",
      label: "Pre-rendered pages live",
      context:
        "A full content surface of 134 statically rendered pages went live at launch: episodes, questions, phases, and supporting routes.",
    },
    {
      value: "12",
      label: "Episodes architected end-to-end",
      context:
        "Twelve episodes were architected, designed, and integrated into the site at launch.",
    },
    {
      value: "109",
      label: "Questions structured across 5 phases",
      context:
        "One hundred and nine questions were organized across five thematic phases, building a navigable conversation map, not a flat feed.",
    },
    {
      value: "End-to-end",
      label: "Brand, site, studio, and distribution",
      context:
        "Everything from logo design through broadcast-grade studio buildout to distribution accounts across major platforms was delivered in one engagement.",
    },
  ],

  techStack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "GSAP",
    "Lenis smooth scroll",
    "Cloudflare Pages",
    "Claude Code multi-agent build",
    "GEO optimization",
  ],

  relatedSlugs: [
    "wife-supply-co",
    "cassidy-hvac-marketing-engine",
    "hg-oil-inventory-system",
  ],

  cta: {
    heading: "Need a brand and a site that look like Stripe and feel like a movie?",
    subcopy:
      "Preisser Solutions designs and builds full cinematic brand systems end-to-end, from logo to deployment. Scoping begins with a conversation about your thesis.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },
};
