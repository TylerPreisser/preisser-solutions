import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";
import { ProofBar } from "@/components/home/proof-bar";
import { ValueStrip } from "@/components/home/value-strip";
import { InternalLinkBlock } from "@/components/seo/InternalLinkBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";

// Below-fold client components — code-split so their JS is deferred until
// after the critical above-fold content is interactive. `ssr: true` keeps
// the HTML in the SSG output (preserves SEO + avoids layout shift on paint),
// but the JS bundle for each component is fetched lazily by the browser.
const TechPartners = dynamic(
  () => import("@/components/home/tech-partners").then((m) => m.TechPartners),
  { ssr: true }
);
const ServicePillars = dynamic(
  () => import("@/components/home/service-pillars").then((m) => m.ServicePillars),
  { ssr: true }
);
const MarCommandCallout = dynamic(
  () => import("@/components/home/marcommand-callout").then((m) => m.MarCommandCallout),
  { ssr: true }
);
const WhyUs = dynamic(
  () => import("@/components/home/why-us").then((m) => m.WhyUs),
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
        </div>
      </section>
      <CtaSection />
    </>
  );
}
