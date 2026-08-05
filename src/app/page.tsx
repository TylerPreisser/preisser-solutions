import type { Metadata } from "next";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { ProofBar } from "@/components/home/proof-bar";
import { ValueStrip } from "@/components/home/value-strip";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCATION_REGIONS, LOCATIONS_BY_SLUG } from "@/data/locations";
import { siteConfig } from "@/data/site-config";

// Below-fold client components — code-split so their JS is deferred until
// after the critical above-fold content is interactive. `ssr: true` keeps
// the HTML in the SSG output (preserves SEO + avoids layout shift on paint),
// but the JS bundle for each component is fetched lazily by the browser.
const ServicePillars = dynamic(
  () => import("@/components/home/service-pillars").then((m) => m.ServicePillars),
  { ssr: true }
);
const WhyUs = dynamic(
  () => import("@/components/home/why-us").then((m) => m.WhyUs),
  { ssr: true }
);
const CaseStudies = dynamic(
  () => import("@/components/home/case-studies").then((m) => m.CaseStudies),
  { ssr: true }
);
const CtaSection = dynamic(
  () => import("@/components/home/cta-section").then((m) => m.CtaSection),
  { ssr: true }
);

// R-038 / R-039: homepage title + description sourced from siteConfig.meta so
// the layout default, JSON-LD, OG, and Twitter all stay in lockstep.
const HOMEPAGE_TITLE = siteConfig.meta.title;
const HOMEPAGE_DESCRIPTION = siteConfig.meta.description;

// Homepage metadata — bypasses the layout title template to avoid duplication.
export const metadata: Metadata = {
  title: {
    absolute: HOMEPAGE_TITLE,
  },
  description: HOMEPAGE_DESCRIPTION,
  alternates: {
    canonical: "https://preissersolutions.com/",
  },
  openGraph: {
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    url: "https://preissersolutions.com/",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: HOMEPAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    images: ["/images/og-image-v2.jpg"],
    creator: "@preissersolutions",
  },
};

// SiteNavigationElement JSON-LD — homepage only. Signals the 6 primary
// navigation hubs Google should promote as sitelinks. Emitted via the existing
// JsonLd helper so it lands in the same <script type="application/ld+json">
// pipeline as the rest of the structured-data graph.
const primaryNavSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://preissersolutions.com/#primary-nav",
  name: "Primary navigation",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Products",     url: "https://preissersolutions.com/products"     },
    { "@type": "SiteNavigationElement", position: 2, name: "Services",     url: "https://preissersolutions.com/services"     },
    { "@type": "SiteNavigationElement", position: 3, name: "Case Studies", url: "https://preissersolutions.com/case-studies" },
    { "@type": "SiteNavigationElement", position: 4, name: "Locations",    url: "https://preissersolutions.com/locations"    },
    { "@type": "SiteNavigationElement", position: 5, name: "About",        url: "https://preissersolutions.com/about"        },
    { "@type": "SiteNavigationElement", position: 6, name: "Contact",      url: "https://preissersolutions.com/contact"      },
  ],
};

// Ordered to lead with the three pillars (business software, business
// automation, AI integration). Every href here is an existing route — do not
// rename or remove one; validate-seo.mjs hardcodes the required route list.
const serviceLinks = [
  { href: "/web-applications", label: "Business software", description: "Admin dashboards, customer and member databases, client portals, internal tools." },
  { href: "/business-automation", label: "Business automation", description: "Registration to confirmation. Bill to categorized ledger. Form to CRM to follow-up." },
  { href: "/services/ai-automation", label: "AI integration", description: "AI that reads documents, classifies, and drafts — with a human gate on anything that matters." },
  { href: "/services/custom-websites", label: "Custom websites", description: "Custom-coded sites built in Next.js, React, and TypeScript." },
  { href: "/services/local-seo", label: "Local SEO", description: "Google Business Profile, local pack, citations, reviews, schema." },
  { href: "/services/ai-search-optimization", label: "AI search optimization", description: "Be cited by ChatGPT, Perplexity, Gemini, and Claude." },
];

function cleanLocationTitle(title: string) {
  return title.replace(/\s*\|\s*Preisser Solutions$/, "");
}

const serviceAreaGroups = LOCATION_REGIONS.map((region) => ({
  name: region.name,
  blurb: region.blurb,
  links: region.slugs
    .map((slug) => LOCATIONS_BY_SLUG[slug])
    .filter(Boolean)
    .map((location) => ({
      href: `/locations/${location.slug}`,
      label: cleanLocationTitle(location.metaTitle),
      description: location.hero.subheadline,
    })),
}));

function HomeLinkDropdown({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className="ps-home-link-details">
      <summary className="ps-home-link-details__summary">
        <span>
          <span className="ps-home-link-details__title">{title}</span>
          <span className="ps-home-link-details__desc">{summary}</span>
        </span>
        <span className="ps-home-link-details__icon" aria-hidden="true" />
      </summary>
      <div className="ps-home-link-details__content">{children}</div>
    </details>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={primaryNavSchema} />
      <Hero />
      {/* Company-descriptor sentence preserved as visually-hidden text so
          HTML-only AI crawlers (ChatGPT-User, Claude-User, OAI-SearchBot,
          PerplexityBot, Google-Extended, CCBot) still extract a clean
          company descriptor on the homepage. Same content lives in the
          hero subhead, meta description, Organization + LocalBusiness
          JSON-LD, llms.txt, llms-full.txt, and /about. */}
      <p className="ps-visually-hidden">
        Preisser Solutions is a Hays, Kansas-based custom software company: business software, business automation, and AI integration. We build the internal systems a business runs on — admin dashboards, customer and member databases, client portals, document pipelines, and the automations that connect them — purpose-built for how each business actually works, for small and mid-sized businesses in Kansas and beyond.
      </p>
      <ProofBar />
      <ValueStrip />
      <ServicePillars />
      <WhyUs />
      <CaseStudies />
      {/* Crawlable service + location link cluster — static HTML for crawlers + AI engines. */}
      <section
        aria-label="Services and locations"
        className="ps-home-link-cluster"
      >
        <div className="ps-home-link-cluster__inner">
          <div className="ps-home-link-cluster__header">
            <span className="ps-eyebrow ps-eyebrow--light">Explore</span>
            <h2 className="ps-section-heading ps-section-heading--light">
              Everything we do, one tap away
            </h2>
            <p className="ps-home-link-cluster__intro">
              Every service we offer and every market we build for. Open a panel
              to jump straight to what you need.
            </p>
          </div>
          <HomeLinkDropdown
            title="Services"
            summary="Business software, business automation, AI integration, websites, and search visibility."
          >
            <ul className="ps-home-link-grid">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="ps-home-link-item">
                    <span className="ps-home-link-item__label">{link.label}</span>
                    <span className="ps-home-link-item__desc">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </HomeLinkDropdown>

          <HomeLinkDropdown
            title="Service area"
            summary="Hays, northwest Kansas, and the regional markets we support from here."
          >
            <div className="ps-service-area-groups">
              {serviceAreaGroups.map((region) => (
                <section key={region.name} className="ps-service-area-group" aria-labelledby={`service-area-${region.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <div className="ps-service-area-group__header">
                    <h3 id={`service-area-${region.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                      {region.name}
                    </h3>
                    <p>{region.blurb}</p>
                  </div>
                  <ul className="ps-home-link-grid ps-home-link-grid--compact">
                    {region.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} prefetch={false} className="ps-home-link-item">
                          <span className="ps-home-link-item__label">{link.label}</span>
                          <span className="ps-home-link-item__desc">{link.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </HomeLinkDropdown>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
