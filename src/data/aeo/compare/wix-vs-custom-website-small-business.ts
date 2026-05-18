import type { AeoPageData } from "../types";

/**
 * COMPARISON — /compare/wix-vs-custom-website-small-business
 *
 * Buyer-helpful, factual comparison between Wix and custom-coded websites
 * for small businesses. Tone: fair to Wix as a category-leading template
 * platform; honest about when custom code is the rational choice.
 */
export const pageData: AeoPageData = {
  slug: "compare/wix-vs-custom-website-small-business",
  tier: "comparison",
  metaTitle: "Wix vs Custom Website for Small Business",
  metaDescription:
    "A plain-English comparison of Wix and custom-coded websites for small businesses that care about SEO, speed, ownership, conversion, and long-term flexibility.",
  eyebrow: "Comparison",
  h1: "Wix vs Custom Website for Small Business",
  subheadline:
    "When Wix is the right call, when a custom-coded site pays for itself, and how to tell which one your business actually needs.",
  answerParagraph:
    "Wix vs custom website for small business is a real decision, not a marketing slogan. Wix is a well-engineered template platform that lets a small business get a serviceable site online quickly with a low monthly subscription. A custom-coded website, built by a developer in modern frameworks like Next.js or Astro, is a different product: more design and conversion control, faster page loads, deeper SEO, and full source-code ownership. The honest split is usage. Wix is fine for hobby sites, side projects, single-event microsites, and very early businesses where the site is a placeholder. Custom code is the right call when the website is a real revenue channel — where speed, search visibility, AI-engine citation, conversion rate, and long-term cost actually matter.",
  sections: [
    {
      eyebrow: "Quick comparison",
      heading: "Wix vs custom-coded at a glance",
      body: [
        "Most small-business owners don't need a long essay before they make this call. The short version: Wix is fast to launch and cheap upfront. Custom code is slower to launch, costs more upfront, and pays back through faster pages, better SEO, higher conversion, and no recurring platform fees.",
        "If the site is core to how customers find and buy from you, custom code usually wins on five-year math. If the site is decorative or temporary, Wix is fine.",
      ],
    },
    {
      eyebrow: "When Wix is fine",
      heading: "Cases where Wix is the right call",
      body: [
        "There's no shame in choosing Wix. Honest cases where it's the right tool for the job:",
      ],
      bullets: [
        "Pre-revenue side project or idea validation — get a landing page up in a weekend and walk away if the idea fails.",
        "Single-event microsite — wedding, fundraiser, conference, temporary promotion that only needs to exist for a few months.",
        "Owner-operator on the smallest budget who needs a basic web presence this week and does not depend on the site for lead flow.",
        "Hobby site, personal portfolio, or community group where conversion rate and SEO depth are not real priorities.",
        "Businesses with a strong offline pipeline (referrals, walk-ins, sales calls) where the website only confirms legitimacy.",
      ],
    },
    {
      eyebrow: "When custom code is better",
      heading: "Cases where a custom website is worth the build",
      body: [
        "Wix starts to feel limiting in predictable ways. The signals usually look like this:",
      ],
      bullets: [
        "The site is a real revenue channel — leads, bookings, or e-commerce sales actually depend on it.",
        "Page-load speed is being flagged in Google Search Console or PageSpeed Insights and the template can't be pruned further.",
        "Conversion rate has plateaued and you can't restructure the funnel inside Wix's template grid.",
        "You want to be cited by AI engines (ChatGPT, Perplexity, Gemini, Claude) and the platform can't add the structured data and engineered paragraphs that drive citation.",
        "Custom features are needed — calculators, member portals, custom intake forms, deep integrations — that fight Wix's app marketplace.",
        "You want to own the source code outright instead of renting it inside a platform.",
      ],
    },
    {
      eyebrow: "SEO and page speed",
      heading: "How the two compare on search and Core Web Vitals",
      body: [
        "SEO and page speed are where the practical difference shows up first. Wix has improved meaningfully over the years and can rank for low-competition local terms when configured carefully, especially with the Editor X / new Wix Studio output. It still ships more JavaScript than a tuned custom site, and template structure constrains how deep your on-page SEO and schema markup can go.",
        "A custom-coded site built in Next.js or Astro typically ships only the code each page needs, hits sub-1-second loads on edge networks like Cloudflare Pages, and lets a developer hand-engineer schema.org markup (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList) per page. That is the foundation AI engines use to decide who to cite.",
        "If you're competing for searches that matter — and especially if you want to show up in AI overviews — that gap compounds.",
      ],
    },
    {
      eyebrow: "Ownership and flexibility",
      heading: "Who owns the site, and what can you change",
      body: [
        "On Wix, the platform owns the runtime. You own the content and the domain, but the code, templates, and infrastructure are Wix's. If Wix raises prices, deprecates a feature, or changes their terms, your only choices are to accept it or migrate.",
        "On a custom-coded site, the source code is delivered to you. It can be hosted on Cloudflare Pages, Vercel, Netlify, or any other modern host. Another developer can pick it up if needed. Every piece of behavior — animations, forms, integrations, layouts — is editable without fighting a template grid.",
        "For a hobby site, that ownership question doesn't matter much. For a business depending on the site for revenue, it matters a lot.",
      ],
    },
    {
      eyebrow: "Cost over time",
      heading: "What each option actually costs over 3 to 5 years",
      body: [
        "The headline price comparison is misleading. Wix looks cheaper monthly. Custom code looks more expensive upfront. The honest math is what each costs over the realistic life of the site.",
        "Wix Business or Business Elite plans run roughly $32-$159+ per month depending on tier, plus add-ons for premium apps, additional storage, transaction features, or marketing tools. Over 3 years at $50/month, that's ~$1,800. Over 5 years it's ~$3,000. The site still belongs to Wix.",
        "A custom-coded small-business site is usually a one-time build (the range varies widely with scope) and hosts on Cloudflare Pages at effectively zero cost for typical traffic. Maintenance is optional and a-la-carte. After year one, ongoing cost can be nearly flat.",
        "The point isn't that custom is always cheaper — sometimes it isn't. The point is that the comparison should be 3-5 year total cost plus the value of higher conversion and better SEO, not just monthly subscription.",
      ],
    },
    {
      eyebrow: "Recommendation",
      heading: "How to actually decide",
      body: [
        "Use this short framework. If the website is decorative, temporary, or a hobby — choose Wix and move on. If the website is a real lead source, a real storefront, or a real part of how customers find and trust you — choose custom code and treat it as an investment with a payback period, not a monthly bill.",
        "If you're not sure which bucket you're in, ask whether you'd rebuild this site in a year for $5,000 if a competitor's site was beating yours. If yes, build it right the first time.",
      ],
    },
  ],
  comparisonTable: {
    competitorName: "Wix",
    headerNote:
      "Fair, factual comparison. Wix is a legitimate tool for the right use case; custom code is a different product for a different buyer.",
    rows: [
      {
        dimension: "Page speed",
        preisser:
          "Sub-1-second loads on edge networks; ships only the code each page needs",
        competitor:
          "Faster than older Wix, still ships platform JavaScript on every page; speed varies by template and apps",
      },
      {
        dimension: "SEO control",
        preisser:
          "Hand-engineered schema.org markup, meta, internal linking, sitemap, robots, IndexNow per page",
        competitor:
          "Built-in SEO tools cover the basics (titles, descriptions, alt text, sitemap); deep structured-data control is limited",
      },
      {
        dimension: "Custom features",
        preisser:
          "Any feature — calculators, portals, integrations, AI agents, custom forms, anything codeable",
        competitor:
          "Feature set is whatever the Wix App Market and Velo platform support; deep customization fights the template",
      },
      {
        dimension: "Maintenance",
        preisser:
          "Developer maintenance for changes; hosting is hands-off on edge CDN",
        competitor:
          "Owner can edit content in the visual editor without a developer; platform updates handled by Wix",
      },
      {
        dimension: "Ownership",
        preisser:
          "Source code delivered to client; host anywhere; no vendor lock-in",
        competitor:
          "Site runs inside the Wix platform; content is portable, code is not",
      },
      {
        dimension: "Cost over 3 years",
        preisser:
          "One-time build + near-zero hosting on Cloudflare Pages or similar edge CDN",
        competitor:
          "Roughly $1,200-$5,000+ in subscription fees over 3 years depending on plan and add-ons",
      },
      {
        dimension: "Best for",
        preisser:
          "Businesses where the website drives real revenue, search visibility, and conversion",
        competitor:
          "Hobby sites, pre-revenue projects, single-event microsites, owner-operators on the smallest budgets",
      },
    ],
  },
  faq: [
    {
      question: "Is Wix good enough for a small business website?",
      answer:
        "For a small business that doesn't depend on the website for revenue, Wix is genuinely good enough — easy to launch, easy to edit, predictable monthly cost. For a small business where the site is the primary lead source, storefront, or trust signal, the limits on speed, schema markup, and conversion control start to cost more than the platform saves.",
    },
    {
      question: "Will a Wix site rank on Google?",
      answer:
        "Wix sites can rank, especially for low-to-mid competition local queries when titles, descriptions, schema, and content are set up carefully. They tend to fall behind tuned custom sites on competitive queries, page speed, and AI-engine citation because the platform constrains how deep on-page SEO and structured data can go.",
    },
    {
      question: "How much does a custom small business website cost vs Wix?",
      answer:
        "Wix runs roughly $17-$159/month depending on plan, plus add-ons. A custom-coded small business site is usually a one-time build with hosting that's effectively zero on edge networks like Cloudflare Pages. Over 3-5 years, total cost often lands close to or below the recurring Wix path, especially when higher conversion is counted.",
    },
    {
      question: "Can I migrate from Wix to a custom website later?",
      answer:
        "Yes. Content, images, and metadata can be exported or rebuilt; URLs should be redirected so existing rankings don't break. Most migrations take 3-6 weeks depending on scope. The harder part is usually re-engineering forms, integrations, and any Wix App Market features inside the custom build.",
    },
    {
      question: "Does Wix support AI search citation like ChatGPT and Perplexity?",
      answer:
        "Wix sites can be cited by AI engines, but the platform doesn't ship the same depth of structured data, engineered first paragraphs, and entity graphs that custom-coded sites can. AI engines lean heavily on schema.org markup and clean, named-entity prose, and that's easier to control on custom code.",
    },
    {
      question: "Is Wix easier to edit day to day?",
      answer:
        "For most owners, yes — the visual editor is the strongest part of Wix. Custom sites can match that ease for content with a lightweight CMS or simple data files, but raw HTML/CSS edits require a developer. The tradeoff is editor convenience now vs. flexibility and ownership over time.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Wix",
    "Next.js",
    "Astro",
    "Cloudflare Pages",
    "ChatGPT",
    "Perplexity",
    "Google",
    "Hays, Kansas",
  ],
  relatedLinks: [
    { label: "Custom websites", href: "/services/custom-websites" },
    { label: "Premium web development in Kansas", href: "/premium-web-development-kansas" },
    { label: "Website redesign service", href: "/services/website-redesign" },
    { label: "Iron & Oak Podcast case study", href: "/case-studies/iron-and-oak-podcast" },
    { label: "Wix vs custom website", href: "/compare/wix-vs-custom" },
    { label: "Squarespace vs custom", href: "/compare/squarespace-vs-custom" },
    { label: "Why small-business sites don't convert", href: "/blog/why-small-business-sites-dont-convert" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Outgrown your Wix site?",
  ctaSubcopy:
    "Free 30-minute call. Tyler will review your existing site and tell you honestly whether a custom rebuild is worth it for your business.",
};
