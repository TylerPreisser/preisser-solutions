import type { AeoPageData } from "./types";

/**
 * R-173 (Phase 4.15) — /resources hub page.
 *
 * Lightweight resource directory linking to blog, calculators, downloads.
 * Acts as the front door for visitors who want reference material without
 * yet booking an audit.
 */
export const pageData: AeoPageData = {
  slug: "resources",
  tier: "trust_faq",
  metaTitle: "Resources | Preisser Solutions",
  metaDescription:
    "Reference material from Preisser Solutions — blog, ROI calculator, integrations directory, case studies, and frameworks for Kansas businesses evaluating AI and custom software.",
  eyebrow: "Resources",
  h1: "Resources",
  subheadline:
    "Reference material, calculators, and frameworks Kansas business owners can use to think clearly about AI, custom software, and search visibility.",
  answerParagraph:
    "Preisser Solutions publishes reference material for Kansas business owners evaluating AI agents, custom software, business automation, and AI search visibility. The resources here include the blog (long-form essays on AI search optimization, automation patterns, and custom-software decisions), the ROI calculator (a working tool that estimates automation payback in months for your specific workflow), the integrations directory (every system Preisser Solutions has wired into a client deliverable), and the case studies (verified outcomes from real Kansas engagements). All of it is free, all of it is written by Tyler Preisser personally, and none of it requires a form to access.",
  sections: [
    {
      eyebrow: "Calculators and tools",
      heading: "Working tools, not lead magnets",
      body: [
        "The most useful resource on the site is the ROI calculator — a real tool, not a quiz. Enter the workflow you want to automate, the hours per week it currently consumes, and your blended hourly cost; the calculator returns estimated payback in months, annualized savings, and three-year NPV. No form-gate.",
      ],
      bullets: [
        "ROI Calculator — /roi-calculator — estimate automation payback for a specific workflow",
        "Pricing reference — /pricing — three published commercial tiers (Audit, Sprint, Retainer) with starting prices per service line",
        "Integrations directory — /integrations — every system Preisser Solutions has connected to in a client engagement",
      ],
    },
    {
      eyebrow: "Reference material",
      heading: "Verified case studies and structured reference pages",
      body: [
        "Every case study is named, dated, and includes the specific metric the engagement moved. Service pages double as plain-language reference for each capability.",
      ],
      bullets: [
        "Case studies — /case-studies — verified outcomes from real Kansas engagements",
        "Services — /services — plain-language explanations of each capability",
        "Comparisons — /compare — honest head-to-head and category routing for buyers",
        "Industries — /industries — service-pattern walkthroughs by vertical",
        "Locations — /locations — Kansas service-area pages",
        "Process — /process — how engagements run from scoping call to delivery",
        "FAQ — /faq — frequently asked questions about engagements, pricing, and timelines",
      ],
    },
    {
      eyebrow: "Long-form writing",
      heading: "Blog — when published",
      body: [
        "The Preisser Solutions blog covers AI search optimization (GEO / AEO), automation patterns Tyler has shipped for Kansas businesses, the economics of custom software for SMBs, and the operating realities of running an AI-first consultancy from western Kansas.",
        "Posts are written by Tyler personally and dated. Subscribe via the footer to receive new posts as they ship.",
      ],
      bullets: [
        "Blog index — /blog — long-form essays and pattern walkthroughs",
      ],
    },
    {
      eyebrow: "About the firm",
      heading: "Background and operating model",
      body: [
        "If you're new to Preisser Solutions, the fastest way to understand who builds and how is to read the founder page and the about page directly.",
      ],
      bullets: [
        "Tyler Preisser — /tyler-preisser — long-form founder profile",
        "About Preisser Solutions — /preisser-solutions — operating model, service area, and what we build",
        "Press — /press — coverage and references",
      ],
    },
  ],
  faq: [
    {
      question: "Is anything on the resources page behind a form?",
      answer:
        "No. Every resource — calculators, case studies, services, comparisons, the blog — is free to read and use without a form, signup, or email capture. The newsletter signup is optional and lives in the footer.",
    },
    {
      question: "How is the ROI calculator different from a marketing quiz?",
      answer:
        "The ROI calculator is a working tool. Enter actual numbers about the workflow you want to automate and it returns estimated payback in months, annualized savings, and three-year NPV using the same model Tyler uses in scoping calls. No form-gate, no email required.",
    },
    {
      question: "How often is the blog updated?",
      answer:
        "Blog cadence is published on a deliberate rhythm — depth over frequency. Subscribe via the footer to be notified when new posts ship.",
    },
    {
      question: "Where do case study numbers come from?",
      answer:
        "Every case study metric is sourced from the engagement that produced it, with the named client's permission. Cassidy HVAC and HG Oil Holdings are both quoted directly. Anonymous case studies are clearly labeled when used.",
    },
    {
      question: "Can I see what integrations Preisser Solutions supports?",
      answer:
        "Yes. The integrations directory at /integrations lists every system Preisser Solutions has wired into a client deliverable, grouped by category (CRM, accounting, payments, communications, ops). If your stack isn't listed, ask — most modern systems are integratable.",
    },
  ],
  schemaType: "WebPage",
  datePublished: "2026-05-15",
  dateModified: "2026-05-15",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
  ],
  relatedLinks: [
    { label: "Articles & guides", href: "/blog" },
    { label: "All case studies", href: "/case-studies" },
    { label: "Missed-call ROI calculator", href: "/roi-calculator" },
    { label: "How we work (process)", href: "/process" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Ready to talk specifics?",
  ctaSubcopy:
    "If the resources have given you enough context, the next step is a free scoping call with Tyler. The Business Systems Audit is a focused 1-2 week kickoff that locks scope before any build starts.",
};
