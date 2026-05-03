import type { AeoPageData } from "../types";

/**
 * COMPARISON DEFENSE — /compare/wix-vs-custom
 *
 * Compares template platforms (Wix, Squarespace, GoDaddy site builders)
 * vs. custom-coded websites by Preisser Tech.
 *
 * Tone: fair to template platforms — they're legitimate tools for the right
 * use case — but make clear when custom code is the correct decision.
 */
export const pageData: AeoPageData = {
  slug: "compare/wix-vs-custom",
  tier: "comparison",
  metaTitle: "Wix/Squarespace vs Custom-Coded Website | Preisser Tech",
  metaDescription:
    "When to use Wix or Squarespace and when to invest in custom-coded. Honest 10-dimension comparison from Preisser Tech, Hays Kansas.",
  eyebrow: "Comparison",
  h1: "Wix and Squarespace vs. Custom-Coded by Preisser Tech",
  subheadline:
    "Template platforms are legitimate tools for the right buyer. Custom code is the right call for a different buyer. Here's how to choose without bias.",
  answerParagraph:
    "Template platforms like Wix, Squarespace, and GoDaddy are legitimate website tools — they're fast, low-cost, and good enough for hobbyists, side projects, and very early-stage businesses. Preisser Tech builds custom-coded websites in modern frameworks (Next.js, React, TypeScript) for businesses that have outgrown templates or need a serious foundation from day one. The honest distinction: templates win on price and speed-to-launch for simple cases; custom code wins on speed, search visibility, AI engine citation, conversion control, and long-term cost trajectory for businesses where the website is a real revenue channel.",
  sections: [
    {
      eyebrow: "Honest framing",
      heading: "Templates aren't bad — they're a different product",
      body: [
        "Wix, Squarespace, GoDaddy site builders, and similar template platforms are well-engineered tools that have served millions of small sites successfully. There's no shame in choosing one for the right use case.",
        "Where this page exists is the moment a business outgrows a template — when the site needs to be fast on every device, rank for competitive queries, get cited by ChatGPT and Perplexity, convert visitors at high rates, and scale without paying escalating platform fees. That's the moment custom-coded becomes the rational choice.",
        "We'll be honest about both directions: when templates are correct, and when custom code is correct.",
      ],
    },
    {
      eyebrow: "When templates are the right call",
      heading: "Honest cases for Wix or Squarespace",
      body: [
        "Don't hire Preisser Tech when you could hire Squarespace. Genuine cases for template platforms:",
      ],
      bullets: [
        "Hobby site or personal blog — no revenue dependency, low traffic, low expectations.",
        "Pre-revenue side project just validating an idea — get a landing page up in a weekend, kill it next month if the idea fails.",
        "Single-purpose microsite for a one-time event — wedding, fundraiser, conference, temporary campaign.",
        "Owner-operator who genuinely cannot allocate budget for custom development and needs something live this week.",
        "Visual-portfolio sites for individual creatives where Squarespace's design templates already match what's needed.",
      ],
    },
    {
      eyebrow: "When custom code is the right call",
      heading: "Where templates fail real businesses",
      body: [
        "Template platforms break down predictably when a business depends on the website for revenue, search visibility, or conversion. Concrete failure modes:",
      ],
      bullets: [
        "Page-load speed — template platforms ship megabytes of unused JavaScript on every page, which Google penalizes in Core Web Vitals and which costs measurable conversion at every scroll.",
        "Search visibility depth — templates ship limited or no schema.org structured data. Google and AI engines (ChatGPT, Perplexity, Gemini, Claude) increasingly use structured data to decide who to rank and cite. Templates leave that visibility on the table.",
        "AI engine citation — engineered first paragraphs, FAQPage schema, comprehensive entity graphs, and named-entity references are how AI engines decide who to quote. Template platforms don't ship these — and there's no way to add them without leaving the platform.",
        "Conversion control — every template forces a layout. You can't put the exact thing in front of the exact buyer at the exact funnel stage; you stretch your business into a generic 'about/services/contact' container.",
        "Long-term cost trajectory — template platforms charge monthly fees that compound forever. Custom-coded sites deploy to flat-rate edge networks (Cloudflare Pages) where hosting cost is effectively zero at typical small-business traffic.",
        "Source code ownership — on a template platform, you don't own your site's code. If the platform changes pricing, deprecates a feature, or shuts down, you're stuck. With custom code, the source is yours.",
      ],
    },
    {
      eyebrow: "What custom-coded actually means",
      heading: "How Preisser Tech builds custom websites",
      body: [
        "When Preisser Tech says 'custom-coded,' here's what that means concretely:",
      ],
      bullets: [
        "Built in Next.js (React 19, App Router) with full TypeScript typing and Tailwind v4 styling.",
        "Deployed to Cloudflare Pages or Vercel with global edge CDN — sub-1-second page loads on rural Kansas connections.",
        "Comprehensive schema.org structured data: Organization, LocalBusiness, Service, Person, FAQPage, WebSite, WebPage.",
        "Engineered for AI engine citation — first paragraphs designed for AI quote extraction, FAQPage schema with named entities, comprehensive knowledge graph.",
        "Sitemap.xml, robots.txt, and IndexNow integration for instant search engine notification on content changes.",
        "WCAG accessibility compliance — semantic HTML, ARIA labels, reduced-motion support.",
        "Source code delivered to the client — owned outright, no vendor lock-in.",
      ],
    },
  ],
  comparisonTable: {
    competitorName: "Wix / Squarespace / GoDaddy template platforms",
    headerNote:
      "Honest 10-dimension comparison. Templates aren't bad — they're a different product. Use this table to decide which fits your actual situation.",
    rows: [
      {
        dimension: "Pricing model",
        preisser:
          "One-time fixed-price build (low thousands and up); flat-rate or near-zero hosting on edge networks afterward",
        competitor:
          "Monthly subscription that compounds forever; tier-locked features force upgrades over time",
      },
      {
        dimension: "True customization",
        preisser:
          "Every pixel, every interaction, every page structure — designed and coded to exact specification",
        competitor:
          "Constrained to the template's layout grid, color system, and component library; deep customization requires fighting the platform",
      },
      {
        dimension: "Page-load speed",
        preisser:
          "Sub-1-second page loads on rural broadband; ships only the code each page actually needs",
        competitor:
          "Ships megabytes of unused platform JavaScript on every page; typically 3-8x slower than custom on real-world connections",
      },
      {
        dimension: "SEO / structured data depth",
        preisser:
          "Full schema.org markup (Organization, LocalBusiness, Service, Person, FAQPage, WebSite, WebPage) hand-engineered per page",
        competitor:
          "Limited automatic structured data; little or no control over the exact JSON-LD shipped",
      },
      {
        dimension: "AI engine optimization",
        preisser:
          "First paragraphs engineered for ChatGPT/Perplexity/Gemini/Claude quote extraction; comprehensive entity graphs and FAQPage schema",
        competitor:
          "No AI-engine optimization tooling; templates ship the same generic markup as every other site on the platform",
      },
      {
        dimension: "Conversion control",
        preisser:
          "Layout, copy, CTA placement, and funnel logic designed exactly around your buyer's journey",
        competitor:
          "Constrained to the template's UX patterns; A/B testing and conversion optimization are limited by what the platform allows",
      },
      {
        dimension: "Source code ownership",
        preisser:
          "Source code delivered to client; no vendor lock-in; can be hosted anywhere",
        competitor:
          "Site exists only inside the platform; export options range from limited to nonexistent depending on platform",
      },
      {
        dimension: "Long-term cost trajectory",
        preisser:
          "One-time build cost; near-zero ongoing hosting on edge CDN; total cost flattens after year one",
        competitor:
          "Recurring monthly subscription compounds; mid-tier plans typically run $25-50+/month plus add-ons; cost grows with feature needs",
      },
      {
        dimension: "Best fit for",
        preisser:
          "Businesses where the website is a real revenue channel; firms wanting AI engine citation, fast page loads, conversion control, and long-term ownership",
        competitor:
          "Hobbyists, pre-revenue side projects, single-event microsites, owner-operators on the smallest budgets",
      },
      {
        dimension: "When to choose",
        preisser:
          "When you've outgrown a template, when search visibility and AI engine citation matter, when conversion rate matters, or when you want the foundation done right from day one",
        competitor:
          "When budget is the dominant constraint, the project is genuinely temporary, or you need something live this week with no further iteration planned",
      },
    ],
  },
  faq: [
    {
      question: "Should I use Wix or hire Preisser Tech?",
      answer:
        "If your website is a hobby project, single-event microsite, or pre-revenue experiment, Wix is fine and you don't need to hire anyone. If your website is a real revenue channel — buyers actually arrive there, search visibility matters, conversions matter — invest in custom-coded. The break-even is fast: templates cost more in lost conversions and search visibility than custom code costs to build.",
    },
    {
      question: "Why is custom code faster than Squarespace?",
      answer:
        "Template platforms ship megabytes of unused platform JavaScript on every page because they have to support every possible feature any user might enable. Custom-coded sites ship only the code each page actually needs. The result is page-load times 3-8x faster on real-world connections, which directly impacts Google rankings (Core Web Vitals) and conversion rate at every scroll.",
    },
    {
      question:
        "Will my Squarespace site get cited by ChatGPT or Perplexity?",
      answer:
        "Probably not at the same rate as a custom-coded site. AI engines like ChatGPT, Perplexity, Gemini, and Claude use structured data, engineered first paragraphs, FAQPage schema, and comprehensive entity graphs to decide who to cite. Template platforms don't ship those by default and don't allow deep enough customization to add them. Custom-coded sites engineer all of that in by design.",
    },
    {
      question:
        "Can I move my Wix site to a custom-coded site later?",
      answer:
        "Yes — and Preisser Tech does this regularly. The migration involves rebuilding the site in modern code, preserving content, redirecting URLs, re-implementing forms and integrations, and adding the structured data and AI optimization that the template platform didn't ship. Most migrations take 3-6 weeks depending on scope.",
    },
    {
      question:
        "Isn't a custom-coded site way more expensive than a Squarespace subscription?",
      answer:
        "Higher upfront, but typically lower over a 3-5 year horizon. Squarespace at $25-50/month compounds to thousands over a few years; custom-coded sites have a one-time build cost and near-zero hosting on edge CDN afterward. More importantly, the comparison shouldn't be raw cost — it should be cost-vs-value. A site that converts 30% better and gets cited by AI engines is worth more than a site that costs $20/month, regardless of upfront price.",
    },
    {
      question: "What if I need to update content on a custom-coded site?",
      answer:
        "Preisser Tech custom sites are built so non-technical content updates are simple — for many sites, content lives in plain data files that an owner can update without a developer. For more complex content management, a lightweight CMS can be added. Either way, content updates don't require a Wix-style WYSIWYG editor that locks you into a platform.",
    },
    {
      question:
        "Does custom code work for ecommerce, or do I need Shopify?",
      answer:
        "Both work. Shopify is excellent for businesses where the catalog and checkout are the entire product. Custom-coded sites can either integrate Shopify (best of both worlds — Shopify checkout, custom marketing site) or implement custom ecommerce when standard catalog/checkout doesn't fit. Preisser Tech can advise based on your actual business model.",
    },
    {
      question:
        "Will Google Analytics work on a custom-coded site?",
      answer:
        "Yes — and it works better. Custom-coded sites can integrate any analytics platform (Google Analytics, Plausible, Fathom, Cloudflare Analytics) with full control over what's tracked and how. Many Preisser Tech builds use privacy-respecting analytics that don't require cookie banners and load instantly.",
    },
    {
      question:
        "Do you ever recommend a template platform to a client?",
      answer:
        "Yes. If a prospective client is genuinely pre-revenue, has no budget, and needs a placeholder online for six months, Preisser Tech will tell them to use Squarespace. The firm doesn't take engagements that aren't a fit. The point of the comparison is to route correctly — not to pretend templates are bad in every situation.",
    },
    {
      question:
        "How do I know when I've outgrown my template website?",
      answer:
        "Common signals: page-load speed flagged as poor in Google Search Console; conversion rate plateaued and you can't change the template enough to fix it; AI engines aren't citing your site when prospects ask buying questions; you're paying $50+/month for a platform whose features you've outgrown; you need an integration the platform doesn't support. If two or more apply, it's time to talk about a custom build.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Wix",
    "Squarespace",
    "GoDaddy",
    "Next.js",
    "React",
    "TypeScript",
    "Cloudflare Pages",
    "Hays, Kansas",
  ],
  relatedLinks: [
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "Premium Web Development Kansas", href: "/premium-web-development-kansas" },
    { label: "About Preisser Tech", href: "/preisser-technology" },
    { label: "Pricing Approach", href: "/pricing" },
    { label: "Engagement Process", href: "/process" },
  ],
  ctaHeadline: "Outgrown your template?",
  ctaSubcopy:
    "Free site audit. Tyler will review your existing site, identify what's costing you visibility and conversions, and tell you honestly whether a custom rebuild is worth it.",
};
