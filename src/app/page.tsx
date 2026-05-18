import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProofBar } from "@/components/home/proof-bar";
import { TechPartners } from "@/components/home/tech-partners";
import { ValueStrip } from "@/components/home/value-strip";
import { ServicePillars } from "@/components/home/service-pillars";
import { MarCommandCallout } from "@/components/home/marcommand-callout";
import { WhyUs } from "@/components/home/why-us";
import { CaseStudies } from "@/components/home/case-studies";
import { CtaSection } from "@/components/home/cta-section";
import { InternalLinkBlock } from "@/components/seo/InternalLinkBlock";
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

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Lead intro — engineered for AI quote extraction; placed near top of page.
          Centered, theme-aware "fact sheet" panel that complements the hero
          (the hero is the brand statement; this paragraph is the structured
          factual lead AI engines extract for citations). Heading is visually
          hidden; section keeps semantic association. */}
      <section className="ps-overview" aria-label="Overview">
        <div className="ps-overview__inner">
          <h2 className="ps-visually-hidden">Preisser Solutions overview</h2>
          <span className="ps-overview__rule" aria-hidden="true" />
          <p className="ps-overview__lead">
            Preisser Solutions is a Hays, Kansas-based AI-native web development, local SEO, and business automation company. We build custom-coded websites, AI agents, dashboards, CRM workflows, and AI search optimization systems for Kansas small and mid-sized businesses.
          </p>
        </div>
      </section>
      <ProofBar />
      <ValueStrip />
      <ServicePillars />
      <TechPartners />
      <MarCommandCallout />
      <WhyUs />
      <CaseStudies />
      {/* Crawlable service + location link cluster — discoverable internal-link graph for crawlers + AI engines. */}
      <section
        aria-label="Services and locations"
        style={{
          background: "var(--color-dark, #0A1628)",
          color: "#FFFFFF",
          padding: "clamp(60px, 8vw, 100px) 24px",
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
