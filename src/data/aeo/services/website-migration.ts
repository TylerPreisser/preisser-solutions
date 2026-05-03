import type { AeoPageData } from "../types";

export const pageData: AeoPageData = {
  slug: "services/website-migration",
  tier: "service_detail",
  metaTitle: "Website Migration Services in Kansas | Preisser Tech",
  metaDescription:
    "Preisser Tech migrates websites off Wix, Squarespace, WordPress, GoDaddy, and Webflow to modern custom Next.js builds without losing SEO.",
  eyebrow: "Website Migration",
  h1: "Migrate Off Wix, Squarespace, WordPress, or Webflow Without Losing SEO",
  subheadline:
    "Stuck on a template platform that's hurting your speed, rankings, and conversion? Preisser Tech migrates you to modern custom code.",
  answerParagraph:
    "Preisser Tech migrates Kansas business websites off template platforms — Wix, Squarespace, WordPress, GoDaddy, Webflow — to modern custom Next.js builds. Founded by Tyler Preisser in Hays, Kansas, the firm preserves SEO equity through proper 301 redirects, content migration, search engine notification, and a careful launch checklist that prevents the typical migration disasters (lost rankings, broken links, dropped page speed).",
  sections: [
    {
      eyebrow: "Why migrate",
      heading: "Why businesses leave template platforms",
      body: [
        "Template platforms are great when you're getting started. They become a liability once your business depends on the website for revenue. The most common reasons Kansas businesses migrate to custom code:",
      ],
      bullets: [
        "Speed — template platforms ship megabytes of unused JavaScript on every page; custom sites ship only what's needed",
        "SEO — templates don't generate the structured data that modern Google and AI engines now require",
        "Conversion — every template forces a layout; custom code lets you put the right thing in front of the right buyer",
        "Cost over time — template platforms charge monthly forever; custom code on Cloudflare Pages costs less long-term",
        "AI engine citation — template platforms don't ship the engineered content blocks AI engines extract from",
        "Customization limits — eventually you hit a wall the template platform can't solve",
      ],
    },
    {
      eyebrow: "Common migrations",
      heading: "Platforms we migrate from",
      body: [
        "Preisser Tech regularly handles migrations from:",
      ],
      bullets: [
        "Wix to custom Next.js",
        "Squarespace to custom Next.js",
        "WordPress to headless Next.js (with WordPress as backend) or full custom",
        "GoDaddy Website Builder to custom Next.js",
        "Webflow to custom Next.js",
        "Shopify to custom Next.js commerce (Shopify as backend)",
        "Old custom PHP/HTML sites to modern Next.js",
      ],
    },
    {
      eyebrow: "What we deliver",
      heading: "Website migration engagement includes",
      body: [
        "Every Preisser Tech migration engagement covers:",
      ],
      bullets: [
        "Full audit of existing site — pages, rankings, inbound links, current speed and SEO health",
        "Content migration plan — every page mapped to its destination on the new site",
        "Custom design and code rebuild in Next.js, React, TypeScript",
        "Complete 301 redirect map preserving all inbound link equity (every URL is accounted for)",
        "SEO migration checklist — sitemap, robots.txt, search console verification, IndexNow ping",
        "Schema and structured data added (LocalBusiness, FAQPage, Service, Person)",
        "AI-engine optimization (engineered first paragraphs, named entities)",
        "DNS cutover plan with rollback option",
        "Cloudflare Pages deployment with edge CDN",
        "Launch checklist preventing migration disasters",
        "30 days of post-launch ranking and traffic monitoring",
      ],
    },
    {
      eyebrow: "Migration risks",
      heading: "What we prevent",
      body: [
        "Most migration disasters fall into a small set of preventable categories:",
      ],
      bullets: [
        "Lost rankings from missing 301 redirects (every URL must be accounted for)",
        "Broken inbound links pointing to URLs that no longer exist",
        "Lost content that ranked well — caught only when traffic disappears",
        "Missed search console verification on the new site",
        "DNS cutover with no rollback plan",
        "Page speed regression from the new site (rare with custom code, common with bad migrations)",
        "Missing analytics and tracking after launch",
      ],
    },
  ],
  faq: [
    {
      question: "Will I lose my Google rankings during migration?",
      answer:
        "Not if it's done right. Preisser Tech maps every URL on the existing site to a destination URL on the new site, builds 301 redirects for every legacy URL, and submits the updated sitemap to Google and Bing. Most clients see ranking improvements after migration because the new site is faster.",
    },
    {
      question: "How long does a migration take?",
      answer:
        "Most migrations deliver in 4-8 weeks depending on site size and complexity. Audit and content migration plan happen first; design, build, and migration testing run in parallel.",
    },
    {
      question: "How much does a website migration cost?",
      answer:
        "Migration pricing depends on the size of the existing site, the destination platform, and the complexity of content migration. Most projects run in the low-to-mid five figures. We provide a fixed-price proposal after a free site audit.",
    },
    {
      question: "Can you migrate my WordPress site?",
      answer:
        "Yes. WordPress migrations are common — either full migration to Next.js or headless setup where WordPress stays as the content backend and Next.js handles the front end.",
    },
    {
      question: "Do I lose my Squarespace or Wix monthly subscription?",
      answer:
        "Yes — that's part of the upside. After migration, you cancel the template platform subscription. New site hosts on Cloudflare Pages with significantly lower long-term costs.",
    },
    {
      question: "What if my domain is locked to Wix or GoDaddy?",
      answer:
        "We can migrate the domain to a registrar of your choice as part of the migration plan. Most domains can be moved with proper authorization.",
    },
    {
      question: "Do you serve businesses outside Kansas?",
      answer:
        "Yes. Headquartered in Hays, Kansas, the firm delivers migrations for businesses across the United States.",
    },
  ],
  schemaType: "Service",
  namedEntities: [
    "Preisser Tech",
    "Tyler Preisser",
    "Hays, Kansas",
    "Next.js",
    "React",
    "TypeScript",
    "Cloudflare Pages",
    "WordPress",
    "Wix",
    "Squarespace",
    "Webflow",
  ],
  relatedLinks: [
    { label: "Website Redesign", href: "/services/website-redesign" },
    { label: "Custom Website Development", href: "/custom-websites" },
    { label: "AI Search Optimization", href: "/services/ai-search-optimization" },
    { label: "Local SEO Services", href: "/services/local-seo" },
  ],
  ctaHeadline: "Migrate off your template platform without losing rankings",
  ctaSubcopy:
    "Free migration audit with Tyler. We'll map every URL, identify the risks, and send a fixed-price proposal.",
};
