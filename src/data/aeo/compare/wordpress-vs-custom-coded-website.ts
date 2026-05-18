import type { AeoPageData } from "../types";

/**
 * COMPARISON — /compare/wordpress-vs-custom-coded-website
 *
 * Buyer-helpful comparison between WordPress (self-hosted) and custom-coded
 * websites for small businesses. Honest about where WordPress works well and
 * where it becomes a maintenance and performance burden.
 */
export const pageData: AeoPageData = {
  slug: "compare/wordpress-vs-custom-coded-website",
  tier: "comparison",
  metaTitle: "WordPress vs Custom Coded Website",
  metaDescription:
    "Compare WordPress and custom-coded websites for small businesses, including SEO, security, page speed, editing, integrations, and long-term maintenance.",
  eyebrow: "Comparison",
  h1: "WordPress vs Custom Coded Website",
  subheadline:
    "Where WordPress is a strong fit, where it becomes messy, and when a custom-coded site is the cleaner long-term answer.",
  answerParagraph:
    "WordPress vs custom coded website is one of the most common decisions a small business faces when planning a serious web presence. WordPress is the dominant open-source content management system, powering a large share of the public web, with an enormous plugin and theme ecosystem and a familiar editor. A custom-coded website, built in a modern framework like Next.js, Astro, or SvelteKit, swaps plugins and themes for purpose-built code: faster pages, less surface area for security issues, deeper SEO control, and source-code ownership. WordPress is a strong fit for content-heavy sites and teams that already publish in it. Custom code is a stronger fit when speed, security, conversion, and AI-engine citation matter more than plugin convenience.",
  sections: [
    {
      eyebrow: "Quick comparison",
      heading: "WordPress vs custom-coded at a glance",
      body: [
        "WordPress and custom-coded sites are both serious tools — this isn't a template-vs-real-developer comparison. The question is which one fits the way the business will use the site for the next 3-5 years.",
        "WordPress shines when content is the product: blogs, magazines, knowledge bases, brochure sites that publish regularly. Custom code tends to shine when the site is the product: high-conversion marketing sites, web apps, complex calculators, member portals, AI-driven features.",
      ],
    },
    {
      eyebrow: "Where WordPress works well",
      heading: "Honest strengths of WordPress",
      body: [
        "There are real reasons WordPress is everywhere. The platform earns its share:",
      ],
      bullets: [
        "Mature editor — Gutenberg and the classic editor are familiar to a huge pool of writers and admins, which lowers the cost of publishing.",
        "Plugin ecosystem — almost any feature has a plugin: forms, SEO, caching, e-commerce (WooCommerce), memberships, multilingual, analytics.",
        "Theme marketplace — thousands of themes give a starting point for design, even if customization gets bumpy.",
        "Hosting options — managed WordPress hosts (Kinsta, WP Engine, Pressable) handle stack updates, backups, and security patches.",
        "Hireability — many freelancers and agencies can edit a WordPress site; you're not locked to a single developer.",
      ],
    },
    {
      eyebrow: "Where WordPress becomes messy",
      heading: "Common failure modes",
      body: [
        "WordPress earns its share, but it also accumulates problems in predictable ways:",
      ],
      bullets: [
        "Plugin sprawl — every feature is another plugin, each with its own update cadence, security risks, and conflicts. Many WordPress sites end up running 20-40 plugins.",
        "Performance — themes and plugins stack JavaScript and CSS on every page. Without serious caching and tuning, pages get slow as the site grows.",
        "Security maintenance — outdated WordPress, themes, or plugins are one of the most common attack vectors on the public web. Keeping a site safe takes ongoing attention.",
        "Theme lock-in — once a site is built on a heavy theme or page builder (Elementor, Divi, WPBakery), unwinding it later is expensive.",
        "Editor inconsistency — page builders and block editors layered together make content updates inconsistent and visually fragile.",
        "Schema and on-page SEO depth — possible but plugin-dependent (Yoast, RankMath); deep custom structured data fights the platform.",
      ],
    },
    {
      eyebrow: "When custom code wins",
      heading: "Where custom-coded sites have a clear edge",
      body: [
        "Custom-coded sites trade editor convenience for control. The wins show up here:",
      ],
      bullets: [
        "Page speed — sub-1-second loads on Cloudflare Pages or Vercel because the page only ships what it actually uses.",
        "Security — far less surface area than WordPress. No plugin auto-updates that can break the site overnight. No PHP runtime to patch.",
        "SEO depth — schema.org markup hand-engineered per page (Organization, LocalBusiness, Service, FAQPage, HowTo, BreadcrumbList) for both Google and AI engines.",
        "Conversion — exact control over layout, copy hierarchy, CTA placement, and funnel logic, without fighting a theme.",
        "Integrations — direct integration with CRMs, payment providers, AI APIs, custom databases, and internal systems without a plugin shim.",
        "Web apps — calculators, dashboards, portals, AI agents are first-class features instead of plugin bolt-ons.",
      ],
    },
    {
      eyebrow: "Security and maintenance",
      heading: "What each one costs to keep healthy",
      body: [
        "WordPress requires ongoing maintenance to stay secure: core updates, theme updates, plugin updates, PHP version updates, backups, malware scans. Most professional WordPress sites pay for a maintenance plan ($50-$300+/month) on top of hosting.",
        "Custom-coded sites have a different maintenance shape. No PHP runtime to patch. No plugin ecosystem to keep current. Updates are explicit and scheduled (framework upgrades, dependency bumps) rather than reactive. Hosting on Cloudflare Pages or Vercel is effectively zero-touch.",
        "Both need attention. The difference is the kind of attention — WordPress is reactive, custom is planned.",
      ],
    },
    {
      eyebrow: "SEO and AI search readiness",
      heading: "How each one performs in modern search",
      body: [
        "WordPress can rank well. With a fast theme, good caching, RankMath or Yoast, and disciplined content, plenty of WordPress sites compete on competitive terms. The plugin layer adds friction to deeper work like custom JSON-LD per page, but it's doable.",
        "Custom-coded sites are easier to engineer for AI-engine citation. ChatGPT, Perplexity, Gemini, and Claude lean heavily on clean structured data, named entities, FAQPage schema, and engineered first paragraphs. Custom code can hand-tune all of that per page without negotiating with a plugin's defaults.",
        "If AI search visibility is part of the strategy, custom code has less friction. If traditional SEO is enough, WordPress is competitive.",
      ],
    },
    {
      eyebrow: "Recommendation",
      heading: "How to actually decide",
      body: [
        "Choose WordPress when the business is content-first (regular blog, news, knowledge base), when non-technical editors need to publish frequently, or when a plugin handles a feature you don't want to build (e.g., WooCommerce for a basic store, BuddyPress for a community).",
        "Choose a custom-coded site when the site is a real revenue channel, when speed and conversion matter more than editor convenience, when integrations or AI features are core, or when you want a leaner long-term maintenance footprint.",
        "Hybrid is also valid — a custom-coded marketing site with a WordPress blog on a subdomain is a common pattern for content-heavy companies that want the best of both.",
      ],
    },
  ],
  faq: [
    {
      question: "Is WordPress still a good choice in 2026?",
      answer:
        "Yes — for content-heavy sites with non-technical editors. WordPress remains the most mature CMS by a wide margin. It's a weaker choice when the site is primarily a marketing or conversion engine and the team wants minimal ongoing maintenance.",
    },
    {
      question: "Is a custom-coded website more secure than WordPress?",
      answer:
        "Generally yes, because there's less surface area. No PHP runtime, no plugin ecosystem, no theme files that can be exploited. WordPress can be secured well, but it requires consistent maintenance; custom-coded sites are secure by default.",
    },
    {
      question: "Will a custom-coded site rank better than WordPress?",
      answer:
        "Not automatically. Rankings come from content, links, and technical health. Custom code makes the technical layer easier (fast pages, clean schema, hand-tuned on-page SEO), but a well-run WordPress site can compete. The bigger gap shows up in AI-engine citation, where custom code is easier to optimize.",
    },
    {
      question: "Can I keep blogging on WordPress and use custom code for the main site?",
      answer:
        "Yes. A common pattern is a fast custom-coded marketing site with the blog on a subdomain like blog.example.com running WordPress. Editors keep the editor they know, marketing pages stay fast and tuned for conversion.",
    },
    {
      question: "How hard is it to migrate from WordPress to a custom-coded site?",
      answer:
        "Doable in 4-8 weeks for most small business sites. Content is exported, URLs are redirected, integrations are rebuilt, and schema is engineered per page. The hardest parts are usually replicating page-builder layouts and re-implementing plugin features.",
    },
    {
      question: "What about page builders like Elementor or Divi?",
      answer:
        "Page builders make WordPress easier for non-developers but they ship a lot of CSS/JS and lock the design into the builder's runtime. Sites built on heavy builders are usually the slowest WordPress sites and the most painful to redesign later.",
    },
  ],
  schemaType: "Article",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "WordPress",
    "WooCommerce",
    "Yoast",
    "RankMath",
    "Elementor",
    "Next.js",
    "Astro",
    "Cloudflare Pages",
    "Hays, Kansas",
  ],
  relatedLinks: [
    { label: "Custom websites", href: "/services/custom-websites" },
    { label: "Premium web development in Kansas", href: "/premium-web-development-kansas" },
    { label: "Website migration service", href: "/services/website-migration" },
    { label: "Iron & Oak Podcast case study", href: "/case-studies/iron-and-oak-podcast" },
    { label: "WordPress vs custom", href: "/compare/wordpress-vs-custom" },
    { label: "Webflow vs custom-coded", href: "/compare/webflow-vs-custom-coded" },
    { label: "Website redesign checklist", href: "/blog/website-redesign-checklist" },
    { label: "Contact Preisser Solutions", href: "/contact" },
  ],
  ctaHeadline: "Considering a WordPress rebuild?",
  ctaSubcopy:
    "Free 30-minute call. Tyler will review the current site and tell you honestly whether WordPress, custom code, or a hybrid is the right next step.",
};
