import type { CaseStudyData } from "@/types/case-study";

// Canonical project #22 — preissersolutions.com (this site itself).
// Preisser Solutions' own build. Eats own dog food.
// See docs/CANONICAL-PROJECTS.md.
export const caseStudy: CaseStudyData = {
  slug: "preisser-solutions-site",
  metaTitle: "preissersolutions.com — AI-Search Build",
  metaDescription:
    "Custom-coded Next.js 15 marketing platform with an 8,800-line design system, AI-native architecture, and 164 statically-rendered pages.",
  datePublished: "2026-05-16",
  dateModified: "2026-05-20",

  category: "Website Build • AI Search Optimization",
  clientName: "Preisser Solutions",
  clientNameDisplay: "Preisser Solutions",
  industry: "Custom software and AI consultancy",

  h1: "preissersolutions.com — 164 Pages, Custom Next.js, Built for AI Search",
  subheadline:
    "A bespoke marketing and AI-search platform for Preisser Solutions itself — Next.js 15, an 8,800-line custom design system, AI-native infrastructure, and 164 statically-rendered pages.",
  oneLine:
    "Custom-coded Next.js 15 marketing platform with 8,800-line design system, AI-native architecture, and 164 statically-rendered pages.",

  headlineResults: [
    { value: "164", label: "Pages shipped" },
    { value: "8.8k", label: "Lines design system CSS" },
    { value: "100%", label: "AI-citation ready" },
    { value: "0", label: "Templates used" },
  ],

  before: {
    heading: "Generic agency-template marketing pages that did not differentiate.",
    body: [
      "Before this build, the Preisser Solutions web surface was the same kind of generic agency template that every consultancy ends up with — pages that look like every other page, no AI-search infrastructure, no honest case-study layer, and no way for AI agents to cite the work cleanly.",
      "For a consultancy whose pitch is building production-grade custom software, that surface was actively undermining the offer. The rebuild treated the site as a first-class engineering artifact and as the company's most public proof of capability.",
    ],
  },

  built: {
    heading: "A full custom build — design system, components, and AI-native infrastructure.",
    body: [
      "Preisser Solutions built the site end-to-end on Next.js 15, React 19, and TypeScript, with Tailwind v4 layered over an 8,800-line custom design system that uses CSS cascade layers, HDS tokens, and bespoke component utilities. GSAP 3.12.7 (single registration through `lib/gsap.ts`) and Framer Motion 12 handle animations. The output ships as a static export to Cloudflare Pages with edge middleware for canonicalization.",
      "Two component systems carry the design language. The CaseStudyPage component (714 lines) drives every case-study route with a radial-glow hero, glass metric chips, gradient-text numbers, and GSAP scroll-stagger reveals. The LocationPage component drives the geographic surface with a city-led hero, nearby-towns chip grid, service cards, and a process timeline.",
      "AI-native infrastructure is layered on top of the marketing surface. `llms.txt` and `llms-full.txt` are served at the edge for AI agents. A JSON-LD schema graph wires Organization, Person, LocalBusiness, WebPage, BreadcrumbList, FAQPage, and Article entities together. Agent discovery endpoints live at `/.well-known/agent-card.json` and `/.well-known/mcp/server-card.json`. Content-signal headers (`ai-train=yes, search=yes, ai-input=yes`) and a fully open X-Robots-Tag complete the citation surface.",
    ],
  },

  specifications: {
    heading: "Stack, scale, and AI-native surface.",
    bullets: [
      "Next.js 15 + React 19 + TypeScript with strict mode",
      "Tailwind v4 over an 8,800-line custom design system (CSS cascade layers, HDS tokens)",
      "GSAP 3.12.7 (single registration) + Framer Motion 12 for animation",
      "Static export to Cloudflare Pages with edge middleware canonicalization",
      "~164 statically-rendered URLs in sitemap across services, case studies, locations, industries, blog, comparisons, insights, and use-cases",
      "AI-native infrastructure: llms.txt, llms-full.txt, agent discovery endpoints, JSON-LD schema graph",
    ],
    subsections: [
      {
        title: "Component systems",
        items: [
          "CaseStudyPage (714 lines) — radial-glow hero, glass metric chips, gradient-text numbers, GSAP scroll-stagger",
          "LocationPage — geographic hero, nearby-towns chip grid, service cards, process timeline",
          "Bespoke design tokens for color, motion, and spacing — no template libraries",
          "Cascade-layered CSS architecture for predictable specificity",
        ],
      },
      {
        title: "AI-native infrastructure",
        items: [
          "llms.txt and llms-full.txt served at the edge for AI agents",
          "JSON-LD schema graph (Organization, Person, LocalBusiness, WebPage, BreadcrumbList, FAQPage, Article)",
          "Agent discovery endpoints at /.well-known/agent-card.json and /.well-known/mcp/server-card.json",
          "Content-signal headers: ai-train=yes, search=yes, ai-input=yes",
          "X-Robots-Tag fully open for AI search",
        ],
      },
      {
        title: "Content surface",
        items: [
          "~164 statically-rendered URLs at build time",
          "21+ case-study detail pages with consistent data contract",
          "21 location pages plus a hub",
          "8 industry pages reframed in capability-only language",
          "Blog, comparison, insight, and use-case routes",
          "Zero fabricated organization claims, zero pricing site-wide",
        ],
      },
    ],
  },

  results: [
    {
      value: "164",
      label: "Statically-rendered URLs shipped",
      context:
        "Roughly 164 URLs go out as static HTML at build time — services, case studies, locations, industries, blog, comparisons, insights, and use-cases.",
    },
    {
      value: "8.8k",
      label: "Lines of custom design system CSS",
      context:
        "An 8,800-line globals.css built on Tailwind v4 cascade layers and HDS tokens drives the visual language — no template framework, no UI kit.",
    },
    {
      value: "100%",
      label: "AI-citation ready",
      context:
        "Every page ships with llms.txt visibility, JSON-LD schema connections, agent discovery endpoints, and content-signal headers so AI search engines can cite the work cleanly.",
    },
    {
      value: "0",
      label: "Templates used",
      context:
        "Zero off-the-shelf themes, UI kits, or page templates. Every component — including the case-study and location systems — was authored for this site.",
    },
  ],

  techStack: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Tailwind v4",
    "GSAP 3.12",
    "Framer Motion 12",
    "Cloudflare Pages",
    "Cloudflare Workers",
  ],

  relatedSlugs: [
    "iron-and-oak-podcast",
    "tyler-preisser-site",
  ],

  cta: {
    heading: "Need a marketing site that is also an engineering artifact?",
    subcopy:
      "Preisser Solutions builds custom marketing platforms end-to-end — design system, component architecture, AI-native infrastructure. Scoping begins with a conversation.",
    buttonLabel: "Start a scoping conversation",
    buttonHref: "/contact",
  },

  statusNote:
    "Build, architecture, and AI-native infrastructure are real and live. Specific marketing outcomes (traffic, lead volume, ranking positions) are not claimed until independently confirmed.",
};
