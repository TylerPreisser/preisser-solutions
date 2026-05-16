/**
 * Blog manifest.
 *
 * Lightweight metadata index for every blog post. Drives the /blog hub
 * listing and provides a single source of truth for slug → title/excerpt
 * lookups. Each post's full content lives in `./{slug}.ts` and is imported
 * directly by the route file at `src/app/blog/{slug}/page.tsx`.
 *
 * Order is reverse-chronological by datePublished (newest first).
 */
export interface BlogManifestEntry {
  slug: string;
  title: string;
  excerpt: string;
  datePublished: string;
  category: string;
}

export const blogManifest: BlogManifestEntry[] = [
  {
    slug: "what-is-ai-search-optimization",
    title: "What Is AI Search Optimization? (AEO / GEO Explained)",
    excerpt:
      "How AI Overviews, ChatGPT, Perplexity, and Claude pick which sources to cite — and the concrete page-level changes that move you into that citation set.",
    datePublished: "2026-05-15",
    category: "AI Search",
  },
  {
    slug: "aeo-vs-geo-vs-seo",
    title: "AEO vs GEO vs SEO: What's the Difference?",
    excerpt:
      "Three overlapping disciplines, one website. A practical breakdown of where they diverge and how to invest if you only have budget for one.",
    datePublished: "2026-05-12",
    category: "AI Search",
  },
  {
    slug: "what-is-llms-txt",
    title: "What Is llms.txt? A Plain-English Guide",
    excerpt:
      "The proposed standard for telling LLMs how to read your site, why it matters less than people think, and how to ship one that actually helps.",
    datePublished: "2026-05-10",
    category: "AI Search",
  },
  {
    slug: "website-for-ai-search",
    title: "How To Build a Website That AI Search Engines Understand",
    excerpt:
      "Twelve concrete on-page changes that move your pages from \"crawled\" to \"cited\" in ChatGPT, Perplexity, and Google AI Overviews.",
    datePublished: "2026-05-08",
    category: "AI Search",
  },
  {
    slug: "ai-automation-cost-kansas",
    title: "What Does AI Automation Actually Cost in Kansas?",
    excerpt:
      "Real ranges for missed-call follow-up, customer reactivation, AI invoicing, and custom CRM builds for Kansas small businesses — no \"contact us for pricing.\"",
    datePublished: "2026-05-05",
    category: "Pricing & ROI",
  },
  {
    slug: "missed-call-roi-calculator",
    title: "Missed-Call ROI: Why a $99/Month System Often Pays for Itself in Week 1",
    excerpt:
      "Worked example with real numbers. How many missed calls per week × close rate × average job value justifies a missed-call follow-up system.",
    datePublished: "2026-05-02",
    category: "Pricing & ROI",
  },
  {
    slug: "track-marketing-roi",
    title: "How To Track Marketing ROI Without Guessing",
    excerpt:
      "A practical attribution model for small businesses with no marketing team. Call tracking, UTMs, CRM source fields, and the one weekly review that holds it together.",
    datePublished: "2026-04-28",
    category: "Pricing & ROI",
  },
  {
    slug: "what-is-an-ai-native-website",
    title: "What Is an AI-Native Website?",
    excerpt:
      "Beyond a chatbot in the corner. The architectural choices that let your website think — and the ones that just look like they do.",
    datePublished: "2026-04-24",
    category: "AI Automation",
  },
  {
    slug: "what-is-ai-automation-for-small-businesses",
    title: "What Is AI Automation for Small Businesses?",
    excerpt:
      "The plain-English version. Use cases, what's worth building, what isn't, and how to spot vendors selling rebadged Zapier as \"AI.\"",
    datePublished: "2026-04-20",
    category: "AI Automation",
  },
  {
    slug: "ai-vs-traditional-workflow-automation",
    title: "AI Automation vs Traditional Workflow Automation (Zapier, Make)",
    excerpt:
      "When rules-based automation is the right answer, when you need an LLM in the loop, and how to combine them without burning money on tokens.",
    datePublished: "2026-04-15",
    category: "AI Automation",
  },
  {
    slug: "ai-without-replacing-staff-kansas",
    title: "How To Use AI Without Replacing Your Staff (Kansas Edition)",
    excerpt:
      "Augmentation, not replacement. A practical playbook for Kansas small businesses where the office manager already does seven jobs.",
    datePublished: "2026-04-10",
    category: "AI Automation",
  },
  {
    slug: "reactivate-old-leads",
    title: "How To Reactivate Old Leads (SMS + Email + CRM Playbook)",
    excerpt:
      "The exact reactivation sequence Preisser Solutions ships for HVAC, dental, veterinary, and trades operators — including the Cassidy HVAC 60% reactivation case.",
    datePublished: "2026-04-04",
    category: "AI Automation",
  },
  {
    slug: "best-automations-contractors",
    title: "The 5 Highest-ROI Automations for Contractors (HVAC, Plumbing, Roofing)",
    excerpt:
      "Missed-call follow-up, online booking, customer reactivation, review automation, and AI invoicing — ranked by payback period.",
    datePublished: "2026-03-28",
    category: "Industry Playbooks",
  },
  {
    slug: "best-automations-insurance",
    title: "The Best Automations for Independent Insurance Agencies",
    excerpt:
      "Quote workflow, renewal follow-up, claims status, and lead nurture — what worked in the Western Kansas insurance CRM build.",
    datePublished: "2026-03-21",
    category: "Industry Playbooks",
  },
  {
    slug: "best-automations-trucking",
    title: "The Best Automations for Trucking and Logistics Operators",
    excerpt:
      "Dispatch, driver communication, BOL/rate-con parsing, mileage tracking — lessons from the Kansas trucking ops automation build.",
    datePublished: "2026-03-14",
    category: "Industry Playbooks",
  },
  {
    slug: "local-seo-checklist-kansas",
    title: "Local SEO Checklist for Kansas Small Businesses (30+ Items)",
    excerpt:
      "Google Business Profile, citations, reviews, NAP consistency, schema, content, local backlinks, and Kansas-specific directories — in priority order.",
    datePublished: "2026-03-07",
    category: "Local SEO",
  },
  {
    slug: "gbp-optimization-guide",
    title: "Google Business Profile Optimization for Small Businesses",
    excerpt:
      "The fields that move the needle, the ones that don't, and the weekly maintenance routine that keeps GBP working in your favor.",
    datePublished: "2026-02-28",
    category: "Local SEO",
  },
  {
    slug: "when-to-build-custom-dashboard",
    title: "When To Build a Custom Dashboard (And When Not To)",
    excerpt:
      "A decision framework for when off-the-shelf BI fails. Reference the HG Oil Holdings build: 95% reduction in back-office logistics time.",
    datePublished: "2026-02-20",
    category: "Custom Builds",
  },
  {
    slug: "website-redesign-checklist",
    title: "Website Redesign Checklist: Don't Skip These 8 Audits",
    excerpt:
      "IA, content, schema, performance, accessibility, AI-readability — the audits to run before anyone writes a line of new design.",
    datePublished: "2026-02-12",
    category: "Web Strategy",
  },
  {
    slug: "why-small-business-sites-dont-convert",
    title: "Why Most Small Business Websites Don't Convert",
    excerpt:
      "Vague CTAs, slow load, no NAP, no proof, unclear offer. The five fixes that move conversion before you spend a dollar on ads.",
    datePublished: "2026-02-04",
    category: "Web Strategy",
  },
  {
    slug: "custom-crm-vs-hubspot-vs-salesforce",
    title: "Custom CRM vs HubSpot vs Salesforce: Which One Wins?",
    excerpt:
      "A three-way narrative comparison: ownership, cost curve, fit, switching pain. When custom wins, when it doesn't.",
    datePublished: "2025-12-15",
    category: "Custom Builds",
  },
];
