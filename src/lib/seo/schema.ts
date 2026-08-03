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

/**
 * Company-owned profiles. Every entry traces to `src/data/site-config.ts` —
 * nothing here is hand-typed, so a handle change is a one-file edit.
 *
 * Shared by the Organization AND LocalBusiness nodes: they describe the same
 * real-world business, and `sameAs` is how an engine reconciles the two.
 */
const ORG_SAME_AS = [
  seoSite.social.linkedin,
  seoSite.social.facebook,
  seoSite.social.twitter,
  seoSite.social.github,
  seoSite.social.crunchbase,
  seoSite.social.tylerPreisser,
];

/**
 * Compact service area for Services nested inside an Offer. The full 15-city
 * list lives on the LocalBusiness/Organization node; repeating it inside every
 * nested Offer would multiply the payload on all 234 pages for no added signal.
 */
const OFFER_AREA_SERVED = [
  { "@type": "State", name: "Kansas" },
  { "@type": "City", name: "Hays, Kansas" },
];

// ---------------------------------------------------------------------------
// Organization (also typed as ProfessionalService)
// ---------------------------------------------------------------------------
export function organizationSchema() {
  const sameAs = ORG_SAME_AS;

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
        "Preisser Solutions logo — custom business software, business automation, and AI integration in Hays, Kansas",
      name: "Preisser Solutions Logo",
    },
    image: `${URL}/images/ps-logo.png`,
    description: seoSite.description,
    slogan: "Business Software. Business Automation. AI Integration.",
    foundingDate: "2023",
    founder: { "@id": PERSON_ID },
    email: seoSite.email,
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
        email: seoSite.email,
        contactType: "sales",
        availableLanguage: "English",
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        email: seoSite.email,
        contactType: "customer support",
        availableLanguage: "English",
        areaServed: "US",
      },
    ],
    sameAs,
    // Topical expertise, deduplicated and aligned to the three pillars
    // (Business Software / Business Automation / AI Integration). The prior
    // list carried four near-identical "dashboard" entries plus retired
    // marketing-era topics (missed-call automation, no-code alternatives),
    // which reads as keyword stuffing rather than a knowledge signal.
    knowsAbout: [
      "Custom business software",
      "Admin dashboards",
      "Customer and member databases",
      "Client portals and internal tools",
      "Business process automation",
      "Workflow automation",
      "Document processing pipelines",
      "Document extraction and classification",
      "AI integration",
      "Human-in-the-loop AI review workflows",
      "AI-native web development",
      "Custom CRM systems",
      "Web application development",
      "API integration and systems architecture",
      "Business intelligence and reporting dashboards",
      "Software for Kansas small and mid-sized businesses",
      "B2B technology consulting",
    ],
    potentialAction: [
      {
        "@type": "ScheduleAction",
        name: "Reach out",
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
    email: seoSite.email,
    description: seoSite.shortDescription,
    slogan: "Business Software. Business Automation. AI Integration.",
    founder: { "@id": PERSON_ID },
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
    areaServed: [
      { "@type": "State", name: "Kansas" },
      ...seoSite.areaServed.map((name) => ({ "@type": "City", name })),
    ],
    // `provider` + `areaServed` only. A `serviceType` identical to `name`
    // carries no information, and `availability: InStock` is inventory
    // vocabulary that means nothing for consulting work — both would just add
    // bytes to a JSON-LD payload that already runs ~20 KB per page.
    makesOffer: seoSite.services.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        provider: { "@id": LOCAL_BIZ_ID },
        areaServed: OFFER_AREA_SERVED,
      },
    })),
    // `sameAs` takes URLs, never a node reference — the previous
    // `{ "@id": ORG_ID }` was invalid and gave engines nothing to resolve.
    // The Organization and LocalBusiness nodes describe one business, so they
    // carry the identical profile list; that is what reconciles them.
    sameAs: ORG_SAME_AS,
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
      "Tyler Preisser is the founder of Preisser Solutions. Hays, Kansas native, 2025 Fort Hays State University graduate (Engineering Design and Technology), and the builder behind the custom business software, automation, and AI integrations Preisser Solutions ships for Kansas small and mid-sized businesses.",
    disambiguatingDescription:
      "This Tyler Preisser is the founder of Preisser Solutions (preissersolutions.com), a custom business software, automation, and AI integration consultancy in Hays, Kansas. He is the same Tyler Preisser featured in Hays Post articles about FHSU's Sky Sprayers, Hansen Hall, and other FHSU coverage. He is not affiliated with other individuals named Tyler Preisser unrelated to the Preisser Solutions custom software business.",
    worksFor: { "@id": ORG_ID },
    url: `${URL}/about`,
    email: seoSite.email,
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
    // Personal profiles only, and every entry traces to `site-config.ts`.
    // A hardcoded `https://github.com/tylerpreisser` used to sit here; it is
    // not in site-config and could not be verified, so it is gone — an
    // unresolvable `sameAs` weakens the whole array.
    sameAs: [
      `${URL}/tyler-preisser`,
      seoSite.social.linkedinPersonal,
      seoSite.social.tylerPreisser,
    ],
    knowsAbout: [
      "Custom business software",
      "Admin dashboards",
      "Customer and member databases",
      "Business automation",
      "Workflow automation",
      "Document processing pipelines",
      "AI integration",
      "Web application architecture",
      "Small business operations",
      "Kansas business ecosystem",
      "Engineering design and technology",
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
