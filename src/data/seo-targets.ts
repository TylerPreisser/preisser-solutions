/**
 * SEO target queries — the 50 master queries this site is being built to win.
 *
 * Source of truth for Phase 2 (top-priority new pages) and Phase 3 (regional /
 * service-location / use-case / insight / compare / case-study pages). Each
 * target is mapped to the page that should rank for it (`targetSlug`) and
 * tracked for current coverage status.
 *
 * Volume is reported as a relative tier (High / Medium / Low / Emerging)
 * rather than absolute numbers — exact monthly volume drifts and the tier is
 * what actually drives prioritization.
 */

export type Intent = "transactional" | "informational" | "navigational" | "commercial";
export type TargetFormat =
  | "service-page"
  | "service-location-page"
  | "location-page"
  | "industry-page"
  | "use-case-page"
  | "insight-article"
  | "compare-page"
  | "case-study"
  | "ai-page";
export type RelativeVolume = "high" | "medium" | "low" | "emerging";
export type Coverage = "covered" | "partial" | "missing";

export interface SeoTarget {
  rank: number;
  query: string;
  intent: Intent;
  relativeVolume: RelativeVolume;
  targetFormat: TargetFormat;
  /** The canonical page that should rank for this query (root-relative). */
  targetSlug: string;
  coverage: Coverage;
  /** Primary competitor currently ranking for this query, if known. */
  competitor: string;
}

export const seoTargets: SeoTarget[] = [
  // ---------------------------- HIGH ----------------------------------------
  { rank: 1, query: "web design hays kansas", intent: "commercial", relativeVolume: "high", targetFormat: "service-location-page", targetSlug: "/custom-websites/hays-kansas", coverage: "missing", competitor: "Imagemakers, CSG Media" },
  { rank: 2, query: "ai automation kansas", intent: "commercial", relativeVolume: "high", targetFormat: "service-page", targetSlug: "/services/ai-automation", coverage: "missing", competitor: "Akeratos, Adams Brown" },
  { rank: 3, query: "local seo kansas", intent: "commercial", relativeVolume: "high", targetFormat: "service-page", targetSlug: "/services/local-seo", coverage: "missing", competitor: "Lost Highway Media, Pluto Sites" },
  { rank: 4, query: "ai search optimization", intent: "commercial", relativeVolume: "high", targetFormat: "service-page", targetSlug: "/services/ai-search-optimization", coverage: "covered", competitor: "national GEO agencies" },
  { rank: 5, query: "custom website developer kansas", intent: "commercial", relativeVolume: "high", targetFormat: "service-page", targetSlug: "/services/custom-websites", coverage: "missing", competitor: "Imagemakers, Toucan Design" },
  { rank: 6, query: "answer engine optimization", intent: "informational", relativeVolume: "high", targetFormat: "insight-article", targetSlug: "/blog/answer-engine-optimization-kansas", coverage: "missing", competitor: "national AEO blogs" },
  { rank: 7, query: "generative engine optimization", intent: "informational", relativeVolume: "high", targetFormat: "insight-article", targetSlug: "/blog/generative-engine-optimization-guide", coverage: "missing", competitor: "Search Engine Land, GEO Labs" },
  { rank: 8, query: "ai consultant kansas", intent: "commercial", relativeVolume: "high", targetFormat: "service-page", targetSlug: "/services/ai-automation", coverage: "missing", competitor: "Akeratos, regional consultants" },
  { rank: 9, query: "business automation kansas", intent: "commercial", relativeVolume: "high", targetFormat: "service-page", targetSlug: "/business-automation", coverage: "partial", competitor: "Adams Brown, Akeratos" },
  { rank: 10, query: "custom crm developer kansas", intent: "commercial", relativeVolume: "high", targetFormat: "service-page", targetSlug: "/services/custom-crm", coverage: "partial", competitor: "Salesforce partners" },
  { rank: 11, query: "web design wichita", intent: "commercial", relativeVolume: "high", targetFormat: "service-location-page", targetSlug: "/custom-websites/wichita-kansas", coverage: "missing", competitor: "Toucan Design, CSG Media" },
  { rank: 12, query: "web design topeka", intent: "commercial", relativeVolume: "high", targetFormat: "service-location-page", targetSlug: "/local-seo/topeka-kansas", coverage: "missing", competitor: "KC Web Designer" },

  // ---------------------------- MEDIUM --------------------------------------
  { rank: 13, query: "local seo wichita", intent: "commercial", relativeVolume: "medium", targetFormat: "service-location-page", targetSlug: "/local-seo/wichita-kansas", coverage: "missing", competitor: "Lost Highway Media" },
  { rank: 14, query: "local seo topeka", intent: "commercial", relativeVolume: "medium", targetFormat: "service-location-page", targetSlug: "/local-seo/topeka-kansas", coverage: "missing", competitor: "regional firms" },
  { rank: 15, query: "local seo hays kansas", intent: "commercial", relativeVolume: "medium", targetFormat: "service-location-page", targetSlug: "/local-seo/hays-kansas", coverage: "missing", competitor: "local firms" },
  { rank: 16, query: "hvac local seo kansas", intent: "commercial", relativeVolume: "medium", targetFormat: "industry-page", targetSlug: "/industries/hvac-local-seo-kansas", coverage: "missing", competitor: "Service Direct, national HVAC marketers" },
  { rank: 17, query: "ai automation small business", intent: "commercial", relativeVolume: "medium", targetFormat: "service-page", targetSlug: "/services/ai-automation", coverage: "missing", competitor: "Zapier, Make" },
  { rank: 18, query: "google business profile optimization kansas", intent: "commercial", relativeVolume: "medium", targetFormat: "service-page", targetSlug: "/services/local-seo", coverage: "missing", competitor: "local SEO firms" },
  { rank: 19, query: "missed call text back automation", intent: "commercial", relativeVolume: "medium", targetFormat: "use-case-page", targetSlug: "/use-cases/missed-call-text-back", coverage: "missing", competitor: "GoHighLevel, Service Direct" },
  { rank: 20, query: "ai customer reactivation", intent: "commercial", relativeVolume: "medium", targetFormat: "use-case-page", targetSlug: "/use-cases/customer-reactivation", coverage: "missing", competitor: "GoHighLevel, Podium" },
  { rank: 21, query: "ai lead routing", intent: "commercial", relativeVolume: "medium", targetFormat: "use-case-page", targetSlug: "/use-cases/lead-routing", coverage: "missing", competitor: "HubSpot, Salesforce" },
  { rank: 22, query: "after hours call triage", intent: "commercial", relativeVolume: "medium", targetFormat: "use-case-page", targetSlug: "/use-cases/after-hours-triage", coverage: "missing", competitor: "AnswerForce, Ruby" },
  { rank: 23, query: "ai invoice processing", intent: "commercial", relativeVolume: "medium", targetFormat: "use-case-page", targetSlug: "/use-cases/invoice-processing", coverage: "missing", competitor: "Bill.com, AvidXchange" },
  { rank: 24, query: "automated inventory management", intent: "commercial", relativeVolume: "medium", targetFormat: "use-case-page", targetSlug: "/use-cases/inventory-management", coverage: "missing", competitor: "Fishbowl, Cin7" },
  { rank: 25, query: "automated google review generation", intent: "commercial", relativeVolume: "medium", targetFormat: "use-case-page", targetSlug: "/use-cases/review-generation", coverage: "missing", competitor: "Podium, Birdeye" },
  { rank: 26, query: "ai hiring pipeline", intent: "commercial", relativeVolume: "medium", targetFormat: "use-case-page", targetSlug: "/use-cases/hiring-pipeline", coverage: "missing", competitor: "Workable, Greenhouse" },
  { rank: 27, query: "next.js web developer kansas", intent: "commercial", relativeVolume: "medium", targetFormat: "service-page", targetSlug: "/services/custom-websites", coverage: "missing", competitor: "national freelance directories" },
  { rank: 28, query: "salesforce vs custom crm", intent: "commercial", relativeVolume: "medium", targetFormat: "compare-page", targetSlug: "/compare/salesforce-vs-custom-crm", coverage: "covered", competitor: "G2, Capterra" },
  { rank: 29, query: "hubspot vs custom crm", intent: "commercial", relativeVolume: "medium", targetFormat: "compare-page", targetSlug: "/compare/hubspot-vs-custom-crm", coverage: "covered", competitor: "G2, Capterra" },
  { rank: 30, query: "webflow vs custom code", intent: "commercial", relativeVolume: "medium", targetFormat: "compare-page", targetSlug: "/compare/webflow-vs-custom-coded", coverage: "covered", competitor: "Webflow docs, Reddit" },
  { rank: 31, query: "wordpress vs custom code", intent: "commercial", relativeVolume: "medium", targetFormat: "compare-page", targetSlug: "/compare/wordpress-vs-custom", coverage: "covered", competitor: "WP Beginner" },
  { rank: 32, query: "wix vs custom code", intent: "commercial", relativeVolume: "medium", targetFormat: "compare-page", targetSlug: "/compare/wix-vs-custom", coverage: "covered", competitor: "Wix blog" },
  { rank: 33, query: "shopify vs custom ecommerce", intent: "commercial", relativeVolume: "medium", targetFormat: "compare-page", targetSlug: "/compare/shopify-vs-custom-ecommerce", coverage: "covered", competitor: "Shopify blog" },
  { rank: 34, query: "make.com vs custom automation", intent: "commercial", relativeVolume: "medium", targetFormat: "compare-page", targetSlug: "/compare/make-com-vs-custom-automation", coverage: "covered", competitor: "Make blog, Reddit" },
  { rank: 35, query: "zapier vs custom automation", intent: "commercial", relativeVolume: "medium", targetFormat: "compare-page", targetSlug: "/compare/zapier-vs-custom-automation", coverage: "covered", competitor: "Zapier blog" },

  // ---------------------------- LOW -----------------------------------------
  { rank: 36, query: "local seo for hvac contractors", intent: "informational", relativeVolume: "low", targetFormat: "industry-page", targetSlug: "/industries/hvac", coverage: "covered", competitor: "ServiceTitan, Housecall Pro" },
  { rank: 37, query: "ai automation for oil and gas", intent: "informational", relativeVolume: "low", targetFormat: "industry-page", targetSlug: "/industries/oil-gas", coverage: "covered", competitor: "industry-specific consultancies" },
  { rank: 38, query: "ai automation for healthcare practice", intent: "informational", relativeVolume: "low", targetFormat: "industry-page", targetSlug: "/industries/healthcare", coverage: "covered", competitor: "Athenahealth, Tebra" },
  { rank: 39, query: "ai automation for construction", intent: "informational", relativeVolume: "low", targetFormat: "industry-page", targetSlug: "/industries/construction", coverage: "covered", competitor: "Procore, Buildertrend" },
  { rank: 40, query: "ai automation for real estate", intent: "informational", relativeVolume: "low", targetFormat: "industry-page", targetSlug: "/industries/real-estate", coverage: "covered", competitor: "Real Geeks, Follow Up Boss" },
  { rank: 41, query: "ai automation for manufacturing", intent: "informational", relativeVolume: "low", targetFormat: "industry-page", targetSlug: "/industries/manufacturing", coverage: "covered", competitor: "industry consultancies" },
  { rank: 42, query: "local seo case study hvac", intent: "commercial", relativeVolume: "low", targetFormat: "case-study", targetSlug: "/case-studies/cassidy-hvac", coverage: "missing", competitor: "ServiceTitan case studies" },
  { rank: 43, query: "ai invoice processing case study oil gas", intent: "commercial", relativeVolume: "low", targetFormat: "case-study", targetSlug: "/case-studies/hg-oil-holdings", coverage: "missing", competitor: "Bill.com case studies" },
  { rank: 44, query: "podcast website case study", intent: "commercial", relativeVolume: "low", targetFormat: "case-study", targetSlug: "/case-studies/iron-and-oak-podcast", coverage: "missing", competitor: "Buzzsprout, Transistor" },
  { rank: 45, query: "ai shopping assistant case study", intent: "commercial", relativeVolume: "low", targetFormat: "case-study", targetSlug: "/case-studies/wife-supply-co", coverage: "missing", competitor: "Klarna, Shopify Magic" },

  // ---------------------------- EMERGING ------------------------------------
  { rank: 46, query: "llms.txt explained", intent: "informational", relativeVolume: "emerging", targetFormat: "insight-article", targetSlug: "/blog/llms-txt-explained", coverage: "missing", competitor: "early AEO blogs" },
  { rank: 47, query: "how to rank in chatgpt", intent: "informational", relativeVolume: "emerging", targetFormat: "insight-article", targetSlug: "/blog/ai-search-citations-strategy", coverage: "missing", competitor: "Search Engine Land, Backlinko" },
  { rank: 48, query: "how to rank in perplexity", intent: "informational", relativeVolume: "emerging", targetFormat: "insight-article", targetSlug: "/blog/ai-search-citations-strategy", coverage: "missing", competitor: "Perplexity blog" },
  { rank: 49, query: "ai automation roi smb", intent: "informational", relativeVolume: "emerging", targetFormat: "insight-article", targetSlug: "/blog/ai-automation-roi-smb", coverage: "missing", competitor: "McKinsey, Gartner" },
  { rank: 50, query: "custom crm vs hubspot for small business", intent: "informational", relativeVolume: "emerging", targetFormat: "insight-article", targetSlug: "/blog/custom-crm-vs-hubspot", coverage: "missing", competitor: "HubSpot blog, G2" },
];
