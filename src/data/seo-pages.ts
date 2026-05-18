/**
 * SEO pages registry — DOCUMENTATION + RECONCILIATION SOURCE, not the sitemap.
 *
 * The authoritative sitemap generator is `scripts/generate-sitemap.mjs`, which
 * file-walks the static `out/` directory after `next build` and emits
 * `out/sitemap.xml`. That tool is the source of truth for what is actually
 * deployed.
 *
 * This file is what we INTEND the SEO surface to look like. The Phase 4
 * validation script reconciles this list against the actual sitemap to flag:
 *   1. Pages we planned but never shipped (drift / missing pages)
 *   2. Pages we shipped that aren't tracked here (untracked routes)
 *
 * Phases that follow Phase 1 add the actual page routes; URLs listed here that
 * do not yet exist will 404 until those phases land. That is expected.
 */

export type SeoPageType =
  | "core"
  | "service"
  | "location"
  | "service-location"
  | "industry"
  | "use-case"
  | "compare"
  | "case-study"
  | "insight"
  | "ai-page";

export interface SeoPage {
  /** Path beginning with `/`. */
  path: string;
  /** Human-readable label used in internal link rendering / docs. */
  title: string;
  /** Category for grouping and validation. */
  type: SeoPageType;
  /** Which phase ships this page. Phase 1 = exists pre-rewrite. */
  phase: 1 | 2 | 3 | 4 | 5;
  /** Set true to exclude this URL from sitemap reconciliation. */
  skipReconcile?: boolean;
}

export const seoPages: SeoPage[] = [
  // ---------- Core -----------------------------------------------------------
  { path: "/", title: "Home", type: "core", phase: 1 },
  { path: "/about", title: "About", type: "core", phase: 1 },
  { path: "/contact", title: "Contact", type: "core", phase: 1 },
  { path: "/case-studies", title: "Case Studies", type: "core", phase: 1 },
  { path: "/process", title: "Process", type: "core", phase: 1 },
  { path: "/pricing", title: "Pricing", type: "core", phase: 1 },
  { path: "/faq", title: "FAQ", type: "core", phase: 1 },
  { path: "/roi-calculator", title: "ROI Calculator", type: "core", phase: 1 },
  { path: "/why-automation", title: "Why Automation", type: "core", phase: 1 },
  { path: "/blog", title: "Blog and Insights", type: "core", phase: 1 },
  { path: "/press", title: "Press", type: "core", phase: 1 },
  { path: "/site-map", title: "Site map (HTML)", type: "core", phase: 1 },
  { path: "/tyler-preisser", title: "Tyler Preisser (founder)", type: "ai-page", phase: 1 },
  { path: "/preisser-solutions", title: "Preisser Solutions (brand)", type: "ai-page", phase: 1 },
  { path: "/premium-web-development-kansas", title: "Premium Web Development Kansas", type: "ai-page", phase: 1 },

  // ---------- Top-level services --------------------------------------------
  { path: "/services", title: "All Services", type: "service", phase: 1 },
  { path: "/services/custom-websites", title: "Custom Website Development", type: "service", phase: 2 },
  { path: "/services/local-seo", title: "Local SEO", type: "service", phase: 2 },
  { path: "/services/ai-search-optimization", title: "AI Search Optimization", type: "service", phase: 1 },
  { path: "/services/ai-automation", title: "AI Automation", type: "service", phase: 2 },
  { path: "/business-automation", title: "Business Automation", type: "service", phase: 1 },
  { path: "/web-applications", title: "Custom Web Applications", type: "service", phase: 1 },
  { path: "/integrations", title: "Integrations and APIs", type: "service", phase: 1 },
  { path: "/ai-agents", title: "AI Agents", type: "service", phase: 1 },
  { path: "/custom-websites", title: "Custom Websites (alias)", type: "service", phase: 1 },
  { path: "/dashboards-and-analytics", title: "Dashboards and Analytics", type: "service", phase: 1 },
  { path: "/services/custom-crm", title: "Custom CRM", type: "service", phase: 1 },
  { path: "/services/ai-customer-service", title: "AI Customer Service", type: "service", phase: 1 },
  { path: "/services/ai-invoicing", title: "AI Invoicing", type: "service", phase: 1 },
  { path: "/services/api-integration", title: "API Integration", type: "service", phase: 1 },
  { path: "/services/client-portal", title: "Client Portal", type: "service", phase: 1 },
  { path: "/services/conversion-optimization", title: "Conversion Optimization", type: "service", phase: 1 },
  { path: "/services/website-migration", title: "Website Migration", type: "service", phase: 1 },
  { path: "/services/website-redesign", title: "Website Redesign", type: "service", phase: 1 },

  // ---------- Locations ------------------------------------------------------
  { path: "/locations", title: "All Locations", type: "location", phase: 1 },
  { path: "/locations/hays-kansas", title: "Hays, Kansas", type: "location", phase: 1 },
  { path: "/locations/wichita-kansas", title: "Wichita, Kansas", type: "location", phase: 1 },
  { path: "/locations/topeka-kansas", title: "Topeka, Kansas", type: "location", phase: 1 },
  { path: "/locations/salina-kansas", title: "Salina, Kansas", type: "location", phase: 1 },
  { path: "/locations/manhattan-kansas", title: "Manhattan, Kansas", type: "location", phase: 1 },
  { path: "/locations/garden-city-kansas", title: "Garden City, Kansas", type: "location", phase: 1 },
  { path: "/locations/dodge-city-kansas", title: "Dodge City, Kansas", type: "location", phase: 1 },
  { path: "/locations/great-bend-kansas", title: "Great Bend, Kansas", type: "location", phase: 1 },

  // ---------- Service-location combos ---------------------------------------
  { path: "/local-seo/hays-kansas", title: "Local SEO in Hays, Kansas", type: "service-location", phase: 3 },
  { path: "/local-seo/wichita-kansas", title: "Local SEO in Wichita, Kansas", type: "service-location", phase: 3 },
  { path: "/local-seo/topeka-kansas", title: "Local SEO in Topeka, Kansas", type: "service-location", phase: 3 },
  { path: "/custom-websites/hays-kansas", title: "Custom Websites in Hays, Kansas", type: "service-location", phase: 3 },

  // ---------- Industries -----------------------------------------------------
  { path: "/industries", title: "All Industries", type: "industry", phase: 1 },
  { path: "/industries/hvac", title: "HVAC", type: "industry", phase: 1 },
  { path: "/industries/oil-gas", title: "Oil and Gas", type: "industry", phase: 1 },
  { path: "/industries/healthcare", title: "Healthcare", type: "industry", phase: 1 },
  { path: "/industries/construction", title: "Construction", type: "industry", phase: 1 },
  { path: "/industries/real-estate", title: "Real Estate", type: "industry", phase: 1 },
  { path: "/industries/manufacturing", title: "Manufacturing", type: "industry", phase: 1 },
  { path: "/industries/agriculture", title: "Agriculture", type: "industry", phase: 1 },
  { path: "/industries/dental", title: "Dental", type: "industry", phase: 1 },
  { path: "/industries/veterinary", title: "Veterinary", type: "industry", phase: 1 },
  { path: "/industries/plumbing", title: "Plumbing", type: "industry", phase: 1 },
  { path: "/industries/electrical", title: "Electrical", type: "industry", phase: 1 },
  { path: "/industries/roofing", title: "Roofing", type: "industry", phase: 1 },
  { path: "/industries/landscaping", title: "Landscaping", type: "industry", phase: 1 },
  { path: "/industries/restaurants", title: "Restaurants", type: "industry", phase: 1 },
  { path: "/industries/retail", title: "Retail", type: "industry", phase: 1 },
  { path: "/industries/pest-control", title: "Pest Control", type: "industry", phase: 1 },
  { path: "/industries/garage-door", title: "Garage Door", type: "industry", phase: 1 },
  { path: "/industries/auto-service", title: "Auto Service", type: "industry", phase: 1 },
  { path: "/industries/insurance-financial", title: "Insurance and Financial", type: "industry", phase: 1 },
  { path: "/industries/trucking-logistics", title: "Trucking and Logistics", type: "industry", phase: 1 },
  { path: "/industries/hvac-local-seo-kansas", title: "HVAC Local SEO in Kansas", type: "industry", phase: 3 },

  // ---------- Use cases (Phase 3c) ------------------------------------------
  { path: "/use-cases/missed-call-text-back", title: "Missed-call Text-back Automation", type: "use-case", phase: 3 },
  { path: "/use-cases/lead-routing", title: "AI Lead Routing", type: "use-case", phase: 3 },
  { path: "/use-cases/after-hours-triage", title: "After-hours Call Triage", type: "use-case", phase: 3 },
  { path: "/use-cases/customer-reactivation", title: "AI Customer Reactivation", type: "use-case", phase: 3 },
  { path: "/use-cases/invoice-processing", title: "AI Invoice Processing", type: "use-case", phase: 3 },
  { path: "/use-cases/inventory-management", title: "Automated Inventory Management", type: "use-case", phase: 3 },
  { path: "/use-cases/review-generation", title: "Automated Review Generation", type: "use-case", phase: 3 },
  { path: "/use-cases/hiring-pipeline", title: "Hiring Pipeline with AI Screener", type: "use-case", phase: 3 },

  // ---------- Insights / blog (Phase 3d) ------------------------------------
  { path: "/blog/answer-engine-optimization-kansas", title: "Answer Engine Optimization for Kansas Businesses", type: "insight", phase: 3 },
  { path: "/blog/generative-engine-optimization-guide", title: "Generative Engine Optimization Guide", type: "insight", phase: 3 },
  { path: "/blog/local-seo-kansas-2026", title: "Local SEO in Kansas — 2026 Playbook", type: "insight", phase: 3 },
  { path: "/blog/ai-automation-roi-smb", title: "How to Calculate AI Automation ROI for SMBs", type: "insight", phase: 3 },
  { path: "/blog/custom-crm-vs-hubspot", title: "Custom CRM vs HubSpot", type: "insight", phase: 3 },
  { path: "/blog/llms-txt-explained", title: "llms.txt Explained", type: "insight", phase: 3 },
  { path: "/blog/ai-search-citations-strategy", title: "How AI Search Citations Actually Work", type: "insight", phase: 3 },

  // ---------- Compare pages (selection) -------------------------------------
  { path: "/compare/bubble-vs-custom-coded", title: "Bubble vs Custom-Coded", type: "compare", phase: 1 },
  { path: "/compare/flutterflow-vs-custom-coded", title: "FlutterFlow vs Custom-Coded", type: "compare", phase: 1 },
  { path: "/compare/hubspot-vs-custom-crm", title: "HubSpot vs Custom CRM", type: "compare", phase: 1 },
  { path: "/compare/make-com-vs-custom-automation", title: "Make.com vs Custom Automation", type: "compare", phase: 1 },
  { path: "/compare/salesforce-vs-custom-crm", title: "Salesforce vs Custom CRM", type: "compare", phase: 1 },
  { path: "/compare/shopify-vs-custom-ecommerce", title: "Shopify vs Custom Ecommerce", type: "compare", phase: 1 },
  { path: "/compare/squarespace-vs-custom", title: "Squarespace vs Custom", type: "compare", phase: 1 },
  { path: "/compare/webflow-vs-custom-coded", title: "Webflow vs Custom-Coded", type: "compare", phase: 1 },
  { path: "/compare/wix-vs-custom", title: "Wix vs Custom", type: "compare", phase: 1 },
  { path: "/compare/wordpress-vs-custom-coded-website", title: "WordPress vs Custom-Coded Website", type: "compare", phase: 1 },
  { path: "/compare/zapier-vs-custom-automation-small-business", title: "Zapier vs Custom Automation for Small Business", type: "compare", phase: 1 },

  // ---------- Case studies (Phase 3f) ---------------------------------------
  { path: "/case-studies/cassidy-hvac", title: "Cassidy HVAC", type: "case-study", phase: 3 },
  { path: "/case-studies/hg-oil-holdings", title: "HG Oil Holdings", type: "case-study", phase: 3 },
  { path: "/case-studies/iron-and-oak-podcast", title: "The Iron and Oak Podcast", type: "case-study", phase: 3 },
  { path: "/case-studies/wife-supply-co", title: "Wife Supply Co", type: "case-study", phase: 3 },
];
