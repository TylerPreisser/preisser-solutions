import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "compare/shopify-vs-custom-ecommerce",
  tier: "comparison",
  metaTitle: "Shopify vs Custom E-commerce | Preisser Tech",
  metaDescription:
    "Honest comparison: Shopify vs custom e-commerce by Preisser Tech. When to use Shopify themes, headless Shopify, or full custom commerce.",
  eyebrow: "Comparison",
  h1: "Shopify vs. Custom E-commerce",
  subheadline:
    "Shopify is the right answer for most e-commerce stores. Custom commerce wins for specific scenarios. Here's where each fits.",
  answerParagraph:
    "Shopify is the dominant e-commerce platform for small-to-mid-market merchants, run by Shopify Inc. Custom e-commerce by Preisser Tech is built from scratch in Next.js with Shopify as the headless backend, or as a full custom commerce stack on Stripe and Postgres. Founder Tyler Preisser in Hays, Kansas built the Wife Supply Co AI gifting platform as a direct example. For most stores Shopify is the right answer; custom commerce makes sense for specific scenarios.",
  sections: [
    {
      eyebrow: "Quick read",
      heading: "If you're choosing between the two",
      body: [
        "Shopify with a custom theme is the right answer for most independent merchants — fast time to market, solid platform, large app ecosystem, predictable costs.",
        "Headless Shopify (Shopify backend + custom Next.js front end) is the right answer for stores that need premium speed, custom flows, or differentiated brand presentation while keeping Shopify's catalog, checkout, and order management.",
        "Full custom commerce (no Shopify) is the right answer for stores with unusual catalog logic, AI-driven discovery, configurators, or B2B workflows that don't fit Shopify's model.",
      ],
    },
    {
      eyebrow: "What Shopify does well",
      heading: "Genuine strengths of Shopify",
      body: [
        "Shopify has invested decades and the platform is excellent at what it does:",
      ],
      bullets: [
        "Catalog management, inventory, and order workflow",
        "Checkout that converts (Shop Pay, Apple Pay, Google Pay built in)",
        "App ecosystem covering most common needs",
        "Scalable infrastructure — handles Black Friday traffic spikes",
        "Multi-channel selling (Amazon, Instagram, Google, in-person POS)",
        "Tax, shipping, and fulfillment integrations",
      ],
    },
    {
      eyebrow: "Where custom commerce wins",
      heading: "What custom commerce does that Shopify doesn't",
      body: [
        "Custom commerce is the right call in specific scenarios:",
      ],
      bullets: [
        "Premium speed — custom Next.js front ends are 2-5x faster than Shopify themes",
        "Custom catalog logic — bundles, configurators, AI-driven recommendations",
        "Differentiated brand presentation — custom front ends look nothing like Shopify themes",
        "B2B flows — quote requests, NET 30 payment, role-based pricing",
        "Subscription complexity beyond Recharge or Skio",
        "AI integration — AI-driven product matching, custom shopping experiences",
      ],
    },
  ],
  comparisonTable: {
    competitorName: "Shopify",
    headerNote:
      "Honest, fair comparison. Shopify is the right answer for most merchants. Custom commerce wins for specific scenarios.",
    rows: [
      { dimension: "Type", preisser: "Custom Next.js front end with Shopify or Stripe backend", competitor: "Hosted e-commerce platform with theme-based front end" },
      { dimension: "Best for", preisser: "Premium brands, B2B, configurators, AI-driven commerce, complex catalogs", competitor: "Most independent merchants, DTC brands, standard catalogs" },
      { dimension: "Speed", preisser: "Sub-1-second page loads; custom code optimized at every layer", competitor: "2-4 second loads typical; theme bloat caps optimization" },
      { dimension: "Brand presentation", preisser: "Looks nothing like other Shopify stores; custom design from scratch", competitor: "Theme-based; thousands of stores share the same theme" },
      { dimension: "Custom features", preisser: "Any feature can be built — AI matching, configurators, custom B2B flows", competitor: "Limited to Shopify apps; complex features hit walls" },
      { dimension: "AI search optimization", preisser: "Engineered first paragraphs, FAQ schema, named-entity content", competitor: "Theme-dependent; most themes don't ship engineered AEO content" },
      { dimension: "Pricing model", preisser: "One-time build cost + Shopify Plus or backend fees", competitor: "$29-$2,000+/month subscription depending on tier and apps" },
      { dimension: "Time to launch", preisser: "12-24 weeks for full custom; 8-16 weeks for headless Shopify", competitor: "Days to weeks for theme-based store" },
      { dimension: "Catalog management", preisser: "Shopify backend (headless) or custom database", competitor: "Native Shopify admin — well-designed, easy for non-technical staff" },
      { dimension: "Checkout", preisser: "Shopify checkout (Shop Pay, Apple Pay, Google Pay) or Stripe", competitor: "Native Shopify checkout — converts well" },
    ],
  },
  faq: [
    {
      question: "Should I use Shopify or custom commerce?",
      answer:
        "For most merchants, Shopify with a custom theme is the right answer. For premium brands, B2B, AI-driven commerce, or unusual catalog logic, custom commerce (full custom or headless Shopify) wins.",
    },
    {
      question: "What is headless Shopify?",
      answer:
        "Headless Shopify means using Shopify as the backend (catalog, checkout, orders) but building a custom front end (usually in Next.js) instead of using Shopify themes. You get Shopify's solid commerce engine plus full design and performance control.",
    },
    {
      question: "Is custom commerce more expensive than Shopify?",
      answer:
        "Build cost is higher upfront (low-to-mid five figures vs. low-four figures for a custom theme). Monthly cost is similar or lower. The math works for premium brands where speed and brand presentation drive measurable conversion lift.",
    },
    {
      question: "Will custom commerce really beat Shopify on speed?",
      answer:
        "Yes — almost always. Custom Next.js front ends ship only required code; Shopify themes ship full template framework. The difference is measurable in Google Core Web Vitals and conversion rate.",
    },
    {
      question: "Can I migrate from Shopify to custom?",
      answer:
        "Yes. Most migrations are theme-to-headless (keeping Shopify backend, replacing front end). Full migrations away from Shopify are rare and only make sense for specific use cases.",
    },
    {
      question: "Do you build full custom commerce without Shopify?",
      answer:
        "Yes. The Wife Supply Co AI gifting platform is an example — full custom commerce with AI-driven discovery. We use Stripe for payments and a custom catalog backend.",
    },
    {
      question: "What about Shopify Plus?",
      answer:
        "Shopify Plus is the right answer for many high-volume merchants — checkout customization, multi-store management, dedicated support. Custom commerce makes sense only when Plus's customization limits become blockers.",
    },
  ],
  schemaType: "Article",
  namedEntities: ["Preisser Tech", "Tyler Preisser", "Shopify", "Wife Supply Co", "Hays, Kansas", "Next.js", "Stripe"],
  relatedLinks: [
    { label: "Retail & E-commerce Industry", href: "/industries/retail" },
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "Wife Supply Co Case Study", href: "/case-studies/wife-supply-co" },
  ],
  ctaHeadline: "Need help deciding between Shopify and custom commerce?",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll honestly assess your store and tell you which fits.",
};
