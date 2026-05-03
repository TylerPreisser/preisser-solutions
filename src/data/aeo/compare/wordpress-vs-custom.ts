import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "compare/wordpress-vs-custom",
  tier: "comparison",
  metaTitle: "WordPress vs Custom Website | Preisser Tech",
  metaDescription:
    "Honest comparison: WordPress vs custom-coded websites by Preisser Tech. Speed, security, SEO, maintenance burden, and total cost compared.",
  eyebrow: "Comparison",
  h1: "WordPress vs. Custom Website",
  subheadline:
    "WordPress runs 40%+ of the web. Custom code is faster, more secure, and easier to maintain. Here's where each wins.",
  answerParagraph:
    "WordPress is the dominant website platform for small-to-mid-market businesses, with thousands of themes, plugins, and a deep ecosystem. Custom-coded websites by Preisser Tech are built from scratch in Next.js, React, and TypeScript by founder Tyler Preisser in Hays, Kansas. WordPress wins on ecosystem and content publishing flexibility. Custom wins on speed, security, AI search citation, maintenance burden, and total long-term cost.",
  sections: [
    {
      eyebrow: "Quick read",
      heading: "If you're choosing between the two",
      body: [
        "WordPress is the right answer when you need a content-heavy site with multiple authors, you have specific plugin requirements that depend on the WordPress ecosystem, or you have an existing WordPress investment with custom theme work.",
        "Custom-coded websites are the right answer when speed, security, and maintenance burden matter — which is most marketing sites for serious businesses. WordPress sites accumulate 20+ plugins, security issues, and constant maintenance overhead. Custom code doesn't.",
      ],
    },
    {
      eyebrow: "What WordPress does well",
      heading: "Genuine strengths of WordPress",
      body: [
        "WordPress has 20+ years of investment and an enormous ecosystem:",
      ],
      bullets: [
        "Largest plugin ecosystem of any web platform",
        "Strong content publishing for blogs and multi-author teams",
        "Massive theme marketplace",
        "Familiar interface for content editors",
        "WooCommerce for basic e-commerce",
        "Headless WordPress is a credible architecture for content-heavy sites",
      ],
    },
    {
      eyebrow: "Where custom wins",
      heading: "What custom-coded sites do that WordPress doesn't",
      body: [
        "WordPress has predictable failure modes — that's where custom code wins:",
      ],
      bullets: [
        "Speed — custom sites load 3-8x faster than typical WordPress installations",
        "Security — every WordPress plugin is a potential vulnerability; custom code has a smaller attack surface",
        "Maintenance burden — WordPress requires plugin updates, core updates, security patches, backup management; custom code on Cloudflare Pages doesn't",
        "Hosting cost — WordPress requires PHP hosting that scales with traffic; custom code on Cloudflare Pages is free or near-free",
        "AI search optimization — WordPress doesn't ship engineered first paragraphs or comprehensive FAQ schema by default",
        "Long-term ownership — custom code outlasts plugin abandonments and theme deprecations",
      ],
    },
  ],
  comparisonTable: {
    competitorName: "WordPress",
    headerNote:
      "Honest, fair comparison. WordPress is the right call for content-heavy sites with multiple authors. Custom code wins for marketing sites where speed and maintenance matter.",
    rows: [
      { dimension: "Type", preisser: "Custom-coded website in Next.js, React, TypeScript", competitor: "PHP-based CMS with theme + plugin architecture" },
      { dimension: "Best for", preisser: "Marketing sites, conversion-focused sites, modern web apps", competitor: "Content-heavy sites with multiple authors, blogs, news sites" },
      { dimension: "Speed", preisser: "Sub-1-second page loads on rural broadband", competitor: "2-6 second loads typical; depends heavily on plugins and hosting" },
      { dimension: "Security", preisser: "Smaller attack surface; static site has no PHP, no database vulnerabilities", competitor: "Each plugin is a potential vulnerability; constant security patches required" },
      { dimension: "Maintenance burden", preisser: "Minimal — code doesn't need WordPress-style ongoing patches", competitor: "Significant — plugin updates, core updates, security patches, backups" },
      { dimension: "SEO foundation", preisser: "Full schema.org markup, FAQ schema, AI search optimization built in", competitor: "Yoast or RankMath required; structured data limited to plugin capability" },
      { dimension: "AI search optimization", preisser: "Engineered first paragraphs, named entities, comprehensive FAQ schema", competitor: "Possible with manual content engineering; not default" },
      { dimension: "Hosting cost", preisser: "Free or minimal on Cloudflare Pages edge CDN", competitor: "PHP hosting required; $20-$200/month typical for managed WordPress" },
      { dimension: "Plugin ecosystem", preisser: "No plugins; features built directly", competitor: "Largest plugin ecosystem of any platform" },
      { dimension: "Content editing", preisser: "Custom CMS or headless CMS (Sanity, Contentful) integration", competitor: "WordPress admin — familiar to most content editors" },
    ],
  },
  faq: [
    {
      question: "Should I use WordPress or custom?",
      answer:
        "If you need a content-heavy site with multiple authors and the WordPress ecosystem fits your specific plugin needs, WordPress works. For most marketing sites where speed, security, and conversion matter, custom code is the better long-term play.",
    },
    {
      question: "Is WordPress bad for SEO?",
      answer:
        "Not inherently — well-built WordPress sites can rank fine. The issues are speed (most WordPress sites are slow due to plugin bloat), security (vulnerabilities can hurt rankings), and the fact that comprehensive structured data requires careful plugin configuration that most sites skip.",
    },
    {
      question: "Why are WordPress sites so slow?",
      answer:
        "Most WordPress sites accumulate 15-30 plugins, each loading their own JavaScript and CSS. Page builders like Elementor and Divi add significant overhead. The result is megabytes of unused code shipping on every page load.",
    },
    {
      question: "Can I migrate from WordPress to custom?",
      answer:
        "Yes. WordPress-to-Next.js migrations are common — usually because the existing WordPress site has speed, security, or maintenance problems. Preisser Tech preserves SEO equity and content through proper redirects and migration.",
    },
    {
      question: "What about headless WordPress?",
      answer:
        "Headless WordPress (WordPress backend + custom Next.js front end) is a credible architecture for content-heavy sites that want WordPress's editor with custom front-end performance. We build headless WordPress when content publishing flexibility matters more than removing WordPress entirely.",
    },
    {
      question: "How much does a custom site cost vs. WordPress?",
      answer:
        "WordPress sites typically cost $5k-$25k for design + theme + plugin configuration. Custom-coded sites typically run low-to-mid five figures one-time. Long-term, custom is significantly more efficient because of lower hosting and maintenance costs.",
    },
    {
      question: "What if I have an existing WordPress site I love?",
      answer:
        "Keep it. We don't push migration when the existing site is working. We only migrate when WordPress has become a liability — slow, insecure, or constantly broken.",
    },
  ],
  schemaType: "Article",
  namedEntities: ["Preisser Tech", "Tyler Preisser", "WordPress", "Hays, Kansas", "Next.js", "Cloudflare Pages"],
  relatedLinks: [
    { label: "Squarespace vs Custom", href: "/compare/squarespace-vs-custom" },
    { label: "Webflow vs Custom Coded", href: "/compare/webflow-vs-custom-coded" },
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "Website Migration", href: "/services/website-migration" },
  ],
  ctaHeadline: "Need help deciding between WordPress and custom?",
  ctaSubcopy:
    "Free 30-minute call with Tyler. We'll honestly assess your situation.",
};
