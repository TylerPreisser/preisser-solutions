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
      {/* Products catalog — prominent editorial CTA, first section under the fold */}
      <section
        aria-label="Product catalog"
        style={{
          background: "var(--theme-section-alt)",
          color: "var(--theme-text-primary)",
          padding: "clamp(72px, 10vw, 120px) 24px",
          transition: "background 300ms ease, color 300ms ease",
        }}
      >
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-cyan)",
              marginBottom: "1.25rem",
            }}
          >
            The Catalog
          </span>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "0 0 1.25rem",
              color: "var(--theme-text-primary)",
            }}
          >
            Capabilities, productized.
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.1875rem)",
              lineHeight: 1.7,
              color: "var(--theme-text-secondary)",
              margin: "0 0 2rem",
              maxWidth: 600,
            }}
          >
            A catalog of agents and systems built from real engagements. Pick one, scope it for your business, ship in weeks.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.625rem",
              marginBottom: "2.5rem",
            }}
          >
            {[
              "16 production-grade products",
              "5 categories",
              "Case studies inline",
            ].map((chip) => (
              <span
                key={chip}
                style={{
                  display: "inline-block",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: "var(--theme-text-secondary)",
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--color-border-dark)",
                  borderRadius: "9999px",
                  padding: "0.3125rem 0.875rem",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem" }}>
            <a
              href="/products"
              className="ps-btn ps-btn-primary"
              style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
            >
              Browse the catalog &rarr;
            </a>
            <a
              href="/about"
              style={{
                fontSize: "0.9375rem",
                color: "var(--theme-text-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid currentColor",
                paddingBottom: "1px",
                transition: "color 200ms ease",
              }}
            >
              Or read about how we build them &rarr;
            </a>
          </div>
        </div>
      </section>
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
      {/* Case studies — slim closing strip, full grid lives at /case-studies */}
      <section
        aria-label="Case studies"
        style={{
          background: "var(--theme-section-switchable)",
          color: "var(--theme-text-primary)",
          padding: "clamp(64px, 8vw, 96px) 24px",
          transition: "background 300ms ease, color 300ms ease",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              marginBottom: "1.25rem",
            }}
          >
            Real projects, real results
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 1rem",
              color: "var(--theme-text-primary)",
            }}
          >
            Every product built from a real engagement.
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              lineHeight: 1.7,
              color: "var(--theme-text-secondary)",
              margin: "0 0 2rem",
              maxWidth: 520,
            }}
          >
            Every product in our catalog is built from a real engagement. Read the full stories below.
          </p>
          <a
            href="/case-studies"
            className="ps-btn ps-btn-primary"
            style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
          >
            See all case studies &rarr;
          </a>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
