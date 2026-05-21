import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProofBar } from "@/components/home/proof-bar";
import { TechPartners } from "@/components/home/tech-partners";
import { ValueStrip } from "@/components/home/value-strip";
import { ServicePillars } from "@/components/home/service-pillars";
import { MarCommandCallout } from "@/components/home/marcommand-callout";
import { WhyUs } from "@/components/home/why-us";
import { CtaSection } from "@/components/home/cta-section";
import { InternalLinkBlock } from "@/components/seo/InternalLinkBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";

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
        Preisser Solutions is a Hays, Kansas-based AI-native web development, local SEO, and business automation company. We build custom-coded websites, AI agents, dashboards, CRM workflows, and AI search optimization systems for Kansas small and mid-sized businesses.
      </p>
      <ProofBar />
      <ValueStrip />
      <ServicePillars />
      <TechPartners />
      <MarCommandCallout />
      <WhyUs />
      {/* Crawlable service + location link cluster — discoverable internal-link graph for crawlers + AI engines. */}
      <section
        aria-label="Services and locations"
        style={{
          background: "var(--theme-section-alt)",
          color: "var(--theme-text-primary)",
          padding: "clamp(60px, 8vw, 100px) 24px",
          transition: "background 300ms ease, color 300ms ease",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          {/* Hub link for /services — body anchor so Google weights it above nav */}
          <div style={{ marginBottom: "0.75rem" }}>
            <a
              href="/services"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-primary)",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              Our services &rarr;
            </a>
          </div>
          <InternalLinkBlock
            title="Services"
            columns={3}
            links={[
              { href: "/services/custom-websites", label: "Custom websites", description: "Custom-coded sites built in Next.js, React, and TypeScript." },
              { href: "/services/local-seo", label: "Local SEO", description: "Google Business Profile, local pack, citations, reviews, schema." },
              { href: "/services/ai-automation", label: "AI automation", description: "Custom AI agents, invoicing, reactivation, lead qualification." },
              { href: "/services/ai-search-optimization", label: "AI search optimization", description: "Be cited by ChatGPT, Perplexity, Gemini, and Claude." },
              { href: "/web-applications", label: "Web applications", description: "Internal tools, client portals, custom CRMs, dashboards." },
              { href: "/business-automation", label: "Business automation", description: "Automate invoicing, data entry, follow-up, and reporting." },
            ]}
          />
          {/* Hub link for /locations — body anchor so Google weights it above nav */}
          <div style={{ marginBottom: "0.75rem", marginTop: "2rem" }}>
            <a
              href="/locations"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-primary)",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              All service areas &rarr;
            </a>
          </div>
          <InternalLinkBlock
            title="Service area"
            columns={3}
            links={[
              { href: "/locations/hays-kansas", label: "Hays, Kansas", description: "Headquarters. Full service stack delivered locally." },
              { href: "/locations/hays-kansas-web-design", label: "Hays web design", description: "Custom website design for Hays, KS businesses." },
              { href: "/locations/western-kansas-web-design", label: "Western Kansas web design", description: "Web design across western Kansas." },
              { href: "/locations/great-bend-kansas-web-design", label: "Great Bend web design", description: "Custom websites for Great Bend, KS." },
              { href: "/locations/salina-kansas-web-design", label: "Salina web design", description: "Custom websites for Salina, KS." },
            ]}
          />
          {/* About body link — Google weights in-body links higher than nav */}
          <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border-dark)" }}>
            <a
              href="/about"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "var(--theme-text-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid currentColor",
                paddingBottom: "1px",
              }}
            >
              About Preisser Solutions &rarr;
            </a>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
