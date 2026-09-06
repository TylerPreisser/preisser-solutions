/**
 * SEO adapter for `siteConfig` (src/data/site-config.ts).
 *
 * This is NOT a duplicate source of truth — it re-maps fields from the canonical
 * `siteConfig` into the shape the schema/metadata helpers expect, and adds
 * SEO-only fields (areaServed, services, postalCode, etc.) that
 * have no home on the marketing-facing siteConfig.
 *
 * Rule: any field that already exists on siteConfig is pulled through — never
 * redefined here. Only SEO-specific extras (geographic area, service catalog
 * for makesOffer) are introduced.
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
    "Preisser Solutions is a founder-led custom business software, automation, and AI integration company based in Hays, Kansas.",
  shortDescription:
    "Custom business software, workflow automation, and AI integration: admin dashboards, databases, and document pipelines for Kansas businesses.",
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
    "Business Software",
    "Admin Dashboards & Business Intelligence",
    "Custom Databases & Client Portals",
    "Business Automation",
    "Document Processing Pipelines",
    "AI Integration",
    "Document Extraction & Classification",
    "Custom Web Applications",
    "Custom CRM Systems",
    "API Integrations",
  ] as const,
  social: siteConfig.social,
} as const;

export type SeoSite = typeof seoSite;
