/**
 * Schema.org JSON-LD helpers.
 *
 * Every function returns a PLAIN OBJECT (not JSX). Render it through
 * `<JsonLd data={...} />` in `src/components/seo/JsonLd.tsx`.
 *
 * The entity graph uses fragment @ids so engines can link the surfaces:
 *   ${url}/#organization
 *   ${url}/#localbusiness
 *   ${url}/#website
 *   ${url}/about#tyler-preisser
 *
 * These match (and intentionally do not re-fork) the canonical @ids used by
 * `src/app/layout.tsx` and `src/components/aeo/AeoPage.tsx` so cross-references
 * resolve correctly. The legacy layout.tsx uses `${url}/#tyler-preisser` as the
 * Person @id; we keep that exact string here as `PERSON_ID` so layout.tsx can
 * adopt these helpers without invalidating any prior `@id` references emitted
 * by AEO pages.
 */

import { seoSite } from "./site";
// Reuse the existing breadcrumb helper rather than duplicating it. The existing
// `buildBreadcrumbs` already prepends Home (position 1) automatically.
import { buildBreadcrumbs, type BreadcrumbItem } from "@/lib/breadcrumbs";

const URL = seoSite.url;

export const ORG_ID = `${URL}/#organization`;
export const LOCAL_BIZ_ID = `${URL}/#localbusiness`;
export const WEBSITE_ID = `${URL}/#website`;
// IMPORTANT: legacy layout.tsx emits Person at `${URL}/#tyler-preisser` and
// AEO `tyler-preisser` page reuses that exact @id. We retain that string so
// the refactor in layout.tsx is graph-identical.
export const PERSON_ID = `${URL}/#tyler-preisser`;
export const PERSON_PAGE_ID = `${URL}/about#tyler-preisser`;

// ---------------------------------------------------------------------------
// Organization (also typed as ProfessionalService)
// ---------------------------------------------------------------------------
export function organizationSchema() {
  const sameAs = [
    seoSite.social.linkedin,
    seoSite.social.facebook,
    seoSite.social.twitter,
    seoSite.social.github,
    seoSite.social.crunchbase,
    seoSite.social.tylerPreisser,
    seoSite.social.rsquaredai,
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: seoSite.name,
    legalName: seoSite.legalName,
    alternateName: [seoSite.name],
    url: seoSite.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${URL}/#logo`,
      url: `${URL}/images/ps-logo.png`,
      contentUrl: `${URL}/images/ps-logo.png`,
      width: 1024,
      height: 1024,
      caption:
        "Preisser Solutions logo — custom software, web apps, and AI automation in Hays, Kansas",
      name: "Preisser Solutions Logo",
    },
    image: `${URL}/images/ps-logo.png`,
    description: seoSite.description,
    slogan: "AI-powered marketing for Kansas",
    foundingDate: "2023",
    founder: { "@id": PERSON_ID },
    email: seoSite.email,
    telephone: seoSite.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: seoSite.city,
      addressLocality: seoSite.city,
      addressRegion: seoSite.regionCode,
      postalCode: seoSite.postalCode,
      addressCountry: seoSite.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seoSite.latitude,
      longitude: seoSite.longitude,
    },
    areaServed: [
      { "@type": "State", name: "Kansas" },
      { "@type": "AdministrativeArea", name: "Great Plains, United States" },
      ...seoSite.areaServed.map((name) => ({ "@type": "City", name })),
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: seoSite.phone,
        email: seoSite.email,
        contactType: "sales",
        availableLanguage: "English",
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        telephone: seoSite.phone,
        email: seoSite.email,
        contactType: "customer support",
        availableLanguage: "English",
        areaServed: "US",
      },
    ],
    sameAs,
    knowsAbout: [
      "AI strategy",
      "AI-native web development",
      "Generative engine optimization",
      "Answer engine optimization",
      "AI search optimization",
      "Retrieval-augmented generation",
      "Workflow automation",
      "Local SEO",
      "Google Business Profile optimization",
      "Dashboards",
      "Business intelligence",
      "Custom CRM",
      "Missed-call automation",
      "Google Ads Management",
      "Meta Ads Management",
      "MarCommand AI Marketing Intelligence",
      "Custom Software Development",
      "Custom Web Development",
      "Business Process Automation",
      "Lead Capture and Automation",
      "AI Agent Development",
      "Web Application Development",
      "Real-Time Business Dashboards",
      "Dashboard and Analytics Systems",
      "Marketing Automation",
      "E-commerce Development",
      "Small Business Software Solutions",
      "Digital Transformation for Kansas Businesses",
      "B2B Technology Consulting",
      "API Integration and Systems Architecture",
      "No-Code and Low-Code Alternatives",
    ],
    priceRange: "$$",
    potentialAction: [
      {
        "@type": "ScheduleAction",
        name: "Book a Business Systems Audit",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${URL}/contact`,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
      },
      {
        "@type": "AssessAction",
        name: "Calculate Automation ROI",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${URL}/roi-calculator`,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// LocalBusiness + ProfessionalService
// ---------------------------------------------------------------------------
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": LOCAL_BIZ_ID,
    name: seoSite.name,
    image: `${URL}/images/ps-logo.png`,
    url: seoSite.url,
    telephone: seoSite.phone,
    email: seoSite.email,
    description: seoSite.shortDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: seoSite.city,
      addressLocality: seoSite.city,
      addressRegion: seoSite.regionCode,
      postalCode: seoSite.postalCode,
      addressCountry: seoSite.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seoSite.latitude,
      longitude: seoSite.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: seoSite.priceRange,
    areaServed: [
      { "@type": "State", name: "Kansas" },
      ...seoSite.areaServed.map((name) => ({ "@type": "City", name })),
    ],
    makesOffer: seoSite.services.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        provider: { "@id": LOCAL_BIZ_ID },
      },
    })),
    sameAs: { "@id": ORG_ID },
  };
}

// ---------------------------------------------------------------------------
// WebSite
// ---------------------------------------------------------------------------
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: seoSite.url,
    name: seoSite.name,
    description: seoSite.shortDescription,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ---------------------------------------------------------------------------
// Person — Tyler Preisser
// ---------------------------------------------------------------------------
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: seoSite.founder,
    givenName: "Tyler",
    familyName: "Preisser",
    jobTitle: "Founder and Owner of Preisser Solutions",
    description:
      "Tyler Preisser is the founder of Preisser Solutions and Chief Product Officer of R Squared AI. Hays, Kansas native, 2025 Fort Hays State University graduate (Engineering Design and Technology), and AI/automation builder for Kansas small and mid-sized businesses.",
    disambiguatingDescription:
      "This Tyler Preisser is the founder of Preisser Solutions (preissersolutions.com), a custom software and AI consultancy in Hays, Kansas. He is the same Tyler Preisser featured in Hays Post articles about FHSU's Sky Sprayers, Hansen Hall, and other FHSU coverage. He is not affiliated with other individuals named Tyler Preisser unrelated to the Preisser Solutions custom software business.",
    worksFor: { "@id": ORG_ID },
    affiliation: {
      "@type": "Organization",
      name: "R Squared AI",
      url: seoSite.social.rsquaredai,
      roleName: "Chief Product Officer",
    },
    url: `${URL}/about`,
    email: seoSite.email,
    telephone: seoSite.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: seoSite.city,
      addressRegion: seoSite.regionCode,
      postalCode: seoSite.postalCode,
      addressCountry: seoSite.country,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Fort Hays State University",
      url: "https://www.fhsu.edu",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hays",
        addressRegion: "KS",
        addressCountry: "US",
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${URL}/images/tyler-preisser-headshot.jpg`,
      width: 1200,
      height: 1200,
      caption: "Tyler Preisser, founder of Preisser Solutions",
    },
    sameAs: [
      `${URL}/tyler-preisser`,
      seoSite.social.linkedinPersonal,
      "https://github.com/tylerpreisser",
      seoSite.social.tylerPreisser,
      seoSite.social.rsquaredai,
    ],
    knowsAbout: [
      "Custom Software Development",
      "Business Automation",
      "AI Agent Development",
      "Web Application Architecture",
      "Product Management",
      "Small Business Operations",
      "Digital Marketing Automation",
      "Kansas Business Ecosystem",
      "Engineering Design and Technology",
    ],
  };
}

// ---------------------------------------------------------------------------
// Service (per-page)
// ---------------------------------------------------------------------------
export interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
  serviceType?: string;
}

export function serviceSchema(input: ServiceSchemaInput) {
  const areas =
    input.areaServed && input.areaServed.length > 0
      ? input.areaServed
      : [...seoSite.areaServed];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${input.url}#service`,
    name: input.name,
    serviceType: input.serviceType ?? input.name,
    description: input.description,
    url: input.url,
    provider: { "@id": LOCAL_BIZ_ID },
    areaServed: [
      { "@type": "State", name: "Kansas" },
      ...areas.map((name) => ({ "@type": "City", name })),
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Small and mid-sized businesses",
    },
  };
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------
export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList — re-export of the existing helper to avoid duplication.
// `buildBreadcrumbs` automatically prepends Home (position 1).
// ---------------------------------------------------------------------------
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return buildBreadcrumbs(items);
}

// ---------------------------------------------------------------------------
// Article
// ---------------------------------------------------------------------------
export interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

export function articleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${input.url}#article`,
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.image ? input.image : `${URL}/images/og-image-v2.jpg`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}
