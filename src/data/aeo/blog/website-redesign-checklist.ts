import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "blog/website-redesign-checklist",
  tier: "blog",
  datePublished: "2026-02-12",
  dateModified: "2026-05-15",
  metaTitle: "Website Redesign Checklist: Don't Skip These 8 Audits",
  metaDescription:
    "IA, content, schema, performance, accessibility, AI-readability — the audits to run before anyone writes a line of new design.",
  eyebrow: "Blog · Web Strategy",
  h1: "Website Redesign Checklist: Don't Skip These 8 Audits",
  subheadline:
    "Most redesigns fail because they start with design. Run these eight audits first and the design choices become obvious.",
  answerParagraph:
    "A website redesign should start with eight audits — not with mockups. The audits: information architecture, content inventory, Schema.org coverage, performance (Core Web Vitals), accessibility (WCAG), AI-readability (AEO), conversion funnel, and SEO baseline. Preisser Solutions in Hays, Kansas runs this audit suite on every redesign engagement. The output is a written diagnostic that tells you exactly what to keep, what to fix, and what to throw out before any new design work begins. Skipping the audits is why most redesigns produce a prettier site that performs worse than the old one.",
  sections: [
    {
      eyebrow: "Audit 1",
      heading: "Information architecture",
      body: [
        "Map the current site's URL structure and navigation. Identify dead-end pages, orphaned pages, and duplicate content. Map every URL to a clear user intent. Most small-business sites have 15-30% of their pages providing no value — these are candidates for removal, not redesign.",
      ],
    },
    {
      eyebrow: "Audit 2",
      heading: "Content inventory",
      body: [
        "Spreadsheet every page. Capture: URL, title, word count, last-updated date, organic traffic (Search Console), conversion contribution (GA4), AEO score (does it have an answer paragraph, FAQ, schema?). The output: keep, rewrite, merge, or delete decisions for every page.",
      ],
    },
    {
      eyebrow: "Audit 3",
      heading: "Schema.org coverage",
      body: [
        "What structured data does the current site emit? Most small-business sites emit none. Map what should be there: Organization, LocalBusiness, Service for each service page, Article/BlogPosting for blog posts, FAQPage for FAQ blocks, BreadcrumbList for navigation. Schema gaps are AEO blockers — fix during redesign.",
      ],
    },
    {
      eyebrow: "Audit 4",
      heading: "Core Web Vitals (performance)",
      body: [
        "Run Google PageSpeed Insights against the current top 10 pages by traffic. Capture LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), INP (Interaction to Next Paint). Targets:",
      ],
      bullets: [
        "LCP under 2.5 seconds on mobile.",
        "CLS under 0.1.",
        "INP under 200ms.",
        "Most small-business sites fail at least one. Fix during redesign.",
      ],
    },
    {
      eyebrow: "Audit 5",
      heading: "Accessibility (WCAG)",
      body: [
        "Run automated accessibility scans (axe DevTools, WAVE, Lighthouse). Capture violations. Most small-business sites have dozens — missing alt text, low contrast, missing form labels, keyboard traps. Beyond legal risk (Americans with Disabilities Act exposure), accessibility correlates strongly with general site quality and AEO performance.",
      ],
    },
    {
      eyebrow: "Audit 6",
      heading: "AI-readability (AEO baseline)",
      body: [
        "Does the site appear in ChatGPT, Perplexity, Google AI Overviews when you query relevant terms? Tools: AthenaHQ, Profound, manual queries. Capture which queries cite you and which don't. AEO gaps revealed here become content priorities post-redesign.",
      ],
    },
    {
      eyebrow: "Audit 7",
      heading: "Conversion funnel",
      body: [
        "Map every CTA on the site. Where does the user land? How many steps to conversion? What's the conversion rate on each step? Most small-business sites have inconsistent CTAs across pages, multiple conflicting offers, and unclear primary actions. Redesign is the moment to standardize.",
      ],
    },
    {
      eyebrow: "Audit 8",
      heading: "SEO baseline (rankings, backlinks, technical)",
      body: [
        "Capture current state: ranked keywords (Search Console + a tool like Ahrefs or Semrush), backlink profile, technical SEO issues (broken links, redirect chains, sitemap completeness, robots.txt). The redesign should preserve current SEO equity — every URL that ranks needs a plan (keep, redirect, or consolidate). Lost equity from a careless redesign can take 6-12 months to recover.",
      ],
    },
  ],
  faq: [
    {
      question: "How long do these audits take?",
      answer:
        "1-3 weeks depending on site size. For a typical small-business site (20-100 pages), the audit suite takes 5-10 business days and produces a 20-40 page written diagnostic.",
    },
    {
      question: "Can I skip the audits and just redesign?",
      answer:
        "You can. You'll spend three months redesigning and discover halfway through that some pages should have been deleted, some content should have been merged, and the new design doesn't account for the URLs Google currently ranks for. Skipping the audits is the most common reason redesigns fail.",
    },
    {
      question: "What does Preisser Solutions deliver from a redesign audit?",
      answer:
        "A written diagnostic covering all 8 audits, a page-by-page kill/keep/merge/rewrite map, a Schema.org coverage plan, a performance fix list, an accessibility fix list, and an AEO content priority list. Fixed price, typically delivered in 5-10 business days.",
    },
    {
      question: "Can we redesign in phases?",
      answer:
        "Yes, and that's often the right approach. Ship audit + Phase 1 (homepage + top 10 pages by traffic) first. Validate, measure, iterate. Ship Phase 2 (rest of the site) once Phase 1 is stable. Lower risk than a big-bang launch.",
    },
    {
      question: "What's the typical full redesign cost?",
      answer:
        "Audit + small-business redesign (20-50 pages, custom design, AEO-ready): $25,000-$60,000. Larger or more complex sites scope from there. Fixed-price after audit.",
    },
  ],
  schemaType: "BlogPosting",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Google Search Console",
    "Google PageSpeed Insights",
    "Lighthouse",
    "axe DevTools",
    "Ahrefs",
    "Semrush",
  ],
  relatedLinks: [
    { label: "Website Redesign Service", href: "/services/website-redesign" },
    { label: "Why Small Business Sites Don't Convert", href: "/blog/why-small-business-sites-dont-convert" },
    { label: "How To Build a Website for AI Search", href: "/blog/website-for-ai-search" },
    { label: "Custom Websites", href: "/custom-websites" },
  ],
  ctaHeadline: "Want a redesign audit?",
  ctaSubcopy:
    "Free 30-minute call. We'll scope an audit fixed-price and deliver in 5-10 business days.",
};
