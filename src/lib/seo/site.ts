/**
 * SEO adapter for `siteConfig` (src/data/site-config.ts).
 *
 * This is NOT a duplicate source of truth — it re-maps fields from the canonical
 * `siteConfig` into the shape the schema/metadata helpers expect, and adds
 * SEO-only fields (areaServed, services, priceRange, postalCode, etc.) that
 * have no home on the marketing-facing siteConfig.
 *
 * Rule: any field that already exists on siteConfig is pulled through — never
 * redefined here. Only SEO-specific extras (geographic area, service catalog
 * for makesOffer, price range string for LocalBusiness) are introduced.
 */

import { siteConfig } from "@/data/site-config";

export const seoSite = {
  name: siteConfig.name,
  legalName: siteConfig.name,
  founder: siteConfig.founder.name,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  city: "Hays",
  region: "Kansas",
  regionCode: "KS",
  postalCode: "67601",
  country: "US",
  latitude: 38.8794,
  longitude: -99.3268,
  description:
    "Preisser Solutions is a founder-led AI-native web development, local SEO, custom software, and business automation company based in Hays, Kansas.",
  shortDescription:
    "AI automation, custom websites, local SEO, web apps, dashboards, and AI search optimization for Kansas small businesses.",
  priceRange:
    "Audits from $1,500; implementation sprints from $5,000; retainers from $3,500/month",
  // Geographic markets explicitly served. Used by LocalBusiness.areaServed
  // and as a discoverability hint for AI engines listing geographic coverage.
  areaServed: [
    "Hays, Kansas",
    "Ellis County, Kansas",
    "Russell, Kansas",
    "Great Bend, Kansas",
    "WaKeeney, Kansas",
    "Colby, Kansas",
    "Dodge City, Kansas",
    "Salina, Kansas",
    "Manhattan, Kansas",
    "Garden City, Kansas",
    "Wichita, Kansas",
    "Topeka, Kansas",
    "Kansas City, Kansas",
    "Western Kansas",
    "Central Kansas",
  ] as const,
  // Top-level service categories. Used by LocalBusiness.makesOffer and as
  // discoverability hints for AI agents listing capabilities.
  services: [
    "AI Automation",
    "Custom Website Development",
    "Local SEO",
    "AI Search Optimization",
    "Business Automation",
    "Custom Web Applications",
    "Custom CRM Systems",
    "Dashboards and Business Intelligence",
    "Digital Marketing Systems",
    "API Integrations",
  ] as const,
  social: siteConfig.social,
} as const;

export type SeoSite = typeof seoSite;
