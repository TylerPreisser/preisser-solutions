import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "case-studies/iron-and-oak-podcast",
  tier: "trust_faq",
  metaTitle: "Iron and Oak Podcast Case Study — Cinematic Media Brand | Preisser Tech",
  metaDescription:
    "Detailed case study: Preisser Tech built the Iron and Oak Podcast media brand from concept to launch — 134 pages, GSAP animations, dark/light mode, custom design system.",
  eyebrow: "Case Study",
  h1: "Iron and Oak Podcast — Cinematic Media Brand Build",
  subheadline:
    "How Preisser Tech built a full cinematic podcast platform from concept to launch — 134 pre-rendered pages, GSAP smooth scroll, custom design system.",
  answerParagraph:
    "Iron and Oak Podcast is a cinematic theology podcast hosted by Tyler Preisser and Lincoln Myers, exploring 109 deep questions across 12 episodes and 5 phases. Preisser Tech built the entire media brand from concept to launch — design system, 134 pre-rendered pages, GSAP-powered smooth scroll, dark/light mode, custom canvas effects, and full content architecture for episodes, questions, hosts, phases, and series. Founded by Tyler Preisser in Hays, Kansas, the build is a direct case study in premium custom media brand development using Next.js 16, React 19, GSAP, and Lenis smooth scroll on Cloudflare Pages.",
  sections: [
    {
      eyebrow: "The context",
      heading: "What Iron and Oak Podcast required",
      body: [
        "Iron and Oak is a podcast platform built around 12 episodes exploring foundational theology through 109 deep questions, organized into 5 phases. The brief: build a cinematic media brand that competes on craft with the best podcast websites in the country, ship 134 pre-rendered pages, support deep content navigation, and feel like a film, not a typical podcast site.",
      ],
    },
    {
      eyebrow: "What we built",
      heading: "The full Iron and Oak platform",
      body: [
        "Preisser Tech designed and built the entire site from scratch:",
      ],
      bullets: [
        "Custom design system with dark mode default, light mode toggle, and full typography hierarchy",
        "134 pre-rendered pages: home, episodes index, episode detail (×12), questions index, question detail (×109), series, hosts, and static pages",
        "GSAP + ScrollTrigger animations for cinematic scroll experiences",
        "Lenis smooth scroll integration with proper GSAP ticker sync (no jank)",
        "Custom canvas effects: gradient background, forge intro animation, iron sparks",
        "Page transitions via Framer Motion AnimatePresence",
        "Full content data architecture in TypeScript (12 episodes, 109 questions, 5 phases, 2 hosts)",
        "Static export to Cloudflare Pages — global edge distribution",
        "Full SEO and AEO foundation: schema.org markup, structured data for episodes and articles, sitemap with 134 URLs, IndexNow integration",
        "Mobile-first responsive design with reduced-motion support",
      ],
    },
    {
      eyebrow: "Tech stack",
      heading: "Technologies used",
      body: [
        "Iron and Oak is a direct example of the Preisser Tech custom website stack:",
      ],
      bullets: [
        "Next.js 16.2.1 (App Router) for static export and routing",
        "React 19.2.4 for component architecture",
        "TypeScript for full type safety",
        "Tailwind v4 for utility-first styling with CSS custom property tokens",
        "GSAP 3.14.2 + ScrollTrigger for scroll-driven animations",
        "Lenis 1.3.20 for smooth scroll",
        "Framer Motion v12 for page transitions",
        "Cloudflare Pages for edge CDN deployment",
      ],
    },
    {
      eyebrow: "Animation strategy",
      heading: "How the cinematic feel was achieved",
      body: [
        "The cinematic feel comes from disciplined animation engineering, not flashy effects:",
      ],
      bullets: [
        "GSAP + ScrollTrigger for scroll-driven animation only — never page transitions",
        "Framer Motion for page transitions and micro-interactions only — never scroll",
        "Lenis smooth scroll synced with GSAP ticker to prevent animation jank",
        "All effects respect prefers-reduced-motion: reduce",
        "Custom canvas effects (gradient mesh, forge intro, iron sparks) ship as standalone components",
        "No mixing of animation libraries on the same element",
      ],
    },
    {
      eyebrow: "Why it worked",
      heading: "What made the Iron and Oak build successful",
      body: [
        "Iron and Oak shipped on time, builds clean, and competes on craft with the best podcast websites because:",
      ],
      bullets: [
        "Custom-coded from scratch — no template platform constraining the cinematic vision",
        "Tyler personally coded every page — no junior associates, no agency handoff",
        "Strict animation discipline (GSAP for scroll, Framer Motion for transitions, never mix)",
        "Static export to Cloudflare Pages — every page pre-rendered, near-instant load globally",
        "Full data-driven architecture — episodes, questions, hosts all live in TypeScript data files",
        "Dark mode default with proper light mode support — a brand decision the build was engineered around",
      ],
    },
  ],
  faq: [
    {
      question: "Can Preisser Tech build a similar media brand for me?",
      answer:
        "Yes. The Iron and Oak playbook is portable — custom Next.js media brand with cinematic GSAP animations, full content architecture, and Cloudflare Pages deployment. Each engagement is custom-coded for the specific brand and content needs.",
    },
    {
      question: "How long did the Iron and Oak build take?",
      answer:
        "The full build (Phase 1 foundation through Phase 6 polish and deploy) ran across approximately 4-6 months. The phases included foundation, design system, content data, animations, all 134 pages, polish, and deployment.",
    },
    {
      question: "What's the URL?",
      answer:
        "The Iron and Oak Podcast site is the direct example of premium custom media brand development. Tyler Preisser is a co-host as well as the developer.",
    },
    {
      question: "How much does a similar build cost?",
      answer:
        "Custom media brand builds typically run in the mid-to-high five figures depending on page count, animation complexity, and content architecture. We provide a fixed-price proposal after a free scoping call.",
    },
    {
      question: "Why static export instead of a CMS?",
      answer:
        "Static export delivers near-instant page loads from edge CDN, has minimal hosting cost (Cloudflare Pages free tier), and eliminates the security and maintenance burden of a CMS. For media brands where content changes infrequently and performance matters, static export is the right architecture.",
    },
    {
      question: "Can you build a podcast platform with audio embedded?",
      answer:
        "Yes. Audio embedding via custom players, integration with podcast hosting (Buzzsprout, Transistor, Captivate), and analytics is standard. Iron and Oak's specific audio architecture is engagement-confidential.",
    },
    {
      question: "Will my brand have the same animation style?",
      answer:
        "No — animation style is custom per brand. Iron and Oak is cinematic and forge-themed because that fits the show. Your brand will have animations engineered for your aesthetic.",
    },
    {
      question: "How do I get a similar build for my media brand?",
      answer:
        "Email sales@preissertech.com or call +1-620-352-3296. Free 30-minute scoping call with Tyler personally.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Iron and Oak Podcast",
    "Preisser Tech",
    "Tyler Preisser",
    "Lincoln Myers",
    "Hays, Kansas",
    "Next.js",
    "React",
    "GSAP",
    "Lenis",
    "Cloudflare Pages",
  ],
  relatedLinks: [
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "All Case Studies", href: "/case-studies" },
    { label: "Cassidy HVAC Case Study", href: "/case-studies/cassidy-hvac" },
    { label: "Wife Supply Co Case Study", href: "/case-studies/wife-supply-co" },
  ],
  ctaHeadline: "Build a cinematic media brand from scratch",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll scope the build and send a fixed-price proposal.",
};
