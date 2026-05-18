/**
 * /site-map — HTML sitemap (companion to /sitemap.xml).
 *
 * Built data-driven: enumerates the AEO data directories at build time via
 * `readdirSync` and reads each `pageData.h1` / `metaTitle` for the link label.
 * Adding a new `.ts` data file to `src/data/aeo/{services,industries,...}` is
 * the only thing required to surface it here.
 *
 * Route: `/site-map`. Next.js reserves `/sitemap.xml` for the dynamic XML
 * sitemap, so this HTML index lives at `/site-map`. Google/Bing read both.
 *
 * Server component, fully static, theme-aware via `--color-*` tokens.
 */

import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import type { AeoPageData } from "@/data/aeo/types";

const PAGE_URL = "https://preissersolutions.com/site-map";

export const metadata: Metadata = {
  title: "Site map — Preisser Solutions",
  description:
    "Complete index of every page on preissersolutions.com — services, industries, use cases, case studies, comparisons, blog, insights, and locations.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Site map — Preisser Solutions",
    description:
      "Every page on preissersolutions.com, organized by category.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Site map — Preisser Solutions",
    description:
      "Every page on preissersolutions.com, organized by category.",
    images: ["/images/og-image-v2.jpg"],
  },
};

// ---------------------------------------------------------------------------
// Build-time data-file enumeration. Server component → Node APIs work during
// `next build` (static export). No client bundle impact.
// ---------------------------------------------------------------------------
type SiteMapLink = { href: string; label: string };

function readAeoDir(
  subdir: string,
  routePrefix: string,
): SiteMapLink[] {
  const dir = path.join(process.cwd(), "src/data/aeo", subdir);
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const links: SiteMapLink[] = [];
  for (const file of entries) {
    if (!file.endsWith(".ts")) continue;
    // Skip TS index / manifest files — they are aggregators, not pages.
    if (file === "index.ts" || file === "manifest.ts") continue;
    const slug = file.replace(/\.ts$/, "");

    // Read the file as text and extract h1 / metaTitle for the link label.
    // Using a regex avoids dynamic `require()` and keeps the page a pure
    // server component compatible with the static export bundler.
    let label = slug;
    try {
      const src = fs.readFileSync(path.join(dir, file), "utf8");
      const h1Match = src.match(/h1:\s*"((?:[^"\\]|\\.)*)"/);
      const titleMatch = src.match(/metaTitle:\s*"((?:[^"\\]|\\.)*)"/);
      const raw = (h1Match?.[1] ?? titleMatch?.[1] ?? slug).replace(
        /\\"/g,
        '"',
      );
      // Trim trailing " | Preisser Solutions" suffix from metaTitle fallback.
      label = raw.replace(/\s*[|—]\s*Preisser Solutions.*$/i, "").trim();
    } catch {
      label = slug;
    }

    links.push({ href: `${routePrefix}/${slug}`, label });
  }

  // Stable alphabetical order by label.
  links.sort((a, b) => a.label.localeCompare(b.label));
  return links;
}

const services = readAeoDir("services", "/services");
const industries = readAeoDir("industries", "/industries");
const useCases = readAeoDir("use-cases", "/use-cases");
const caseStudies = readAeoDir("case-studies", "/case-studies");
const compare = readAeoDir("compare", "/compare");
const blog = readAeoDir("blog", "/blog");
const insights = readAeoDir("insights", "/insights");
const locations = readAeoDir("locations", "/locations");

// Curated "Other" set — top-level pages outside the AEO category folders.
const other: SiteMapLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
  { href: "/roi-calculator", label: "ROI Calculator" },
  { href: "/why-automation", label: "Why Automation" },
  { href: "/integrations", label: "Integrations" },
  { href: "/business-automation", label: "Business Automation" },
  { href: "/web-applications", label: "Web Applications" },
  { href: "/ai-agents", label: "AI Agents" },
  { href: "/dashboards-and-analytics", label: "Dashboards and Analytics" },
  { href: "/products", label: "Products" },
  { href: "/resources", label: "Resources" },
  { href: "/press", label: "Press" },
  { href: "/tyler-preisser", label: "Tyler Preisser" },
  { href: "/preisser-solutions", label: "Preisser Solutions" },
  {
    href: "/premium-web-development-kansas",
    label: "Premium Web Development Kansas",
  },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

// Section descriptors drive both the rendered output AND the
// CollectionPage JSON-LD hasPart graph.
const sections: Array<{ id: string; heading: string; hub?: SiteMapLink; links: SiteMapLink[] }> = [
  { id: "services", heading: "Services", hub: { href: "/services", label: "All services" }, links: services },
  { id: "industries", heading: "Industries", hub: { href: "/industries", label: "All industries" }, links: industries },
  { id: "use-cases", heading: "Use cases", hub: { href: "/use-cases", label: "All use cases" }, links: useCases },
  { id: "case-studies", heading: "Case studies", hub: { href: "/case-studies", label: "All case studies" }, links: caseStudies },
  { id: "compare", heading: "Comparisons", links: compare },
  { id: "blog", heading: "Blog", hub: { href: "/blog", label: "All blog posts" }, links: blog },
  { id: "insights", heading: "Insights", links: insights },
  { id: "locations", heading: "Locations", links: locations },
  { id: "other", heading: "Other", links: other },
];

// JSON-LD CollectionPage describing the index.
const totalLinks =
  other.length +
  sections
    .filter((s) => s.id !== "other")
    .reduce((sum, s) => sum + s.links.length + (s.hub ? 1 : 0), 0);

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#main`,
  url: PAGE_URL,
  name: "Site map — Preisser Solutions",
  description:
    "Complete index of every page on preissersolutions.com, organized by category.",
  inLanguage: "en-US",
  isPartOf: { "@id": "https://preissersolutions.com/#website" },
  about: { "@id": "https://preissersolutions.com/#organization" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: totalLinks,
    itemListElement: sections.flatMap((section, sIdx) => {
      const items: Record<string, unknown>[] = [];
      if (section.hub) {
        items.push({
          "@type": "ListItem",
          position: sIdx * 1000 + 1,
          name: section.hub.label,
          url: `https://preissersolutions.com${section.hub.href}`,
        });
      }
      section.links.forEach((link, lIdx) => {
        items.push({
          "@type": "ListItem",
          position: sIdx * 1000 + lIdx + 2,
          name: link.label,
          url: `https://preissersolutions.com${link.href}`,
        });
      });
      return items;
    }),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://preissersolutions.com",
    },
    { "@type": "ListItem", position: 2, name: "Site map", item: PAGE_URL },
  ],
};

// Suppress the unused-import warning on AeoPageData — we type-check the
// readAeoDir extraction against the canonical shape conceptually but do
// not instantiate the full pageData here.
type _Unused = AeoPageData;

export default function SiteMapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionSchema, breadcrumbSchema]),
        }}
      />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-dark, #0A1628)",
          color: "var(--color-text-dark-primary, #FFFFFF)",
          padding: "clamp(80px, 12vw, 140px) 24px clamp(48px, 8vw, 72px)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-cyan, #80E9FF)",
              marginBottom: 16,
            }}
          >
            Site map
          </div>
          <h1
            className="aeo-h1"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              margin: "0 0 24px",
              color: "#FFFFFF",
            }}
          >
            Every page on preissersolutions.com
          </h1>
          <p
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.3125rem)",
              lineHeight: 1.5,
              color: "var(--color-text-dark-secondary, #94A3B8)",
              maxWidth: 720,
              margin: 0,
            }}
          >
            A complete index of every page on preissersolutions.com, organized
            by category. Companion to the machine-readable{" "}
            <a
              href="/sitemap.xml"
              style={{ color: "var(--color-primary, #0D95E8)", textDecoration: "underline" }}
            >
              /sitemap.xml
            </a>{" "}
            for crawlers.
          </p>
        </div>
      </section>

      {/* ── SECTIONS ──────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-light, #F6F9FC)",
          padding: "clamp(48px, 8vw, 96px) 24px",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 32,
            }}
          >
            {sections.map((section) => (
              <nav
                key={section.id}
                aria-labelledby={`site-map-${section.id}-heading`}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--color-border-light, #E2E8F0)",
                  borderRadius: 16,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  boxShadow: "0 2px 12px rgba(10, 22, 40, 0.04)",
                }}
              >
                <h2
                  id={`site-map-${section.id}-heading`}
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    margin: 0,
                    color: "var(--color-text-light-primary, #0A1628)",
                  }}
                >
                  {section.heading}
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--color-text-light-muted, #94A3B8)",
                    }}
                    aria-hidden="true"
                  >
                    ({(section.hub ? 1 : 0) + section.links.length})
                  </span>
                </h2>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {section.hub && (
                    <li>
                      <Link
                        href={section.hub.href}
                        style={{
                          color: "var(--color-primary, #0D95E8)",
                          fontWeight: 600,
                          textDecoration: "none",
                          fontSize: 15,
                          lineHeight: 1.5,
                        }}
                      >
                        {section.hub.label} →
                      </Link>
                    </li>
                  )}
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          color: "var(--color-text-light-primary, #0A1628)",
                          textDecoration: "none",
                          fontSize: 15,
                          lineHeight: 1.5,
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-dark, #0A1628)",
          color: "#FFFFFF",
          padding: "clamp(60px, 8vw, 96px) 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
              color: "#FFFFFF",
            }}
          >
            Looking for something specific?
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--color-text-dark-secondary, #94A3B8)",
              margin: "0 0 24px",
            }}
          >
            Email Tyler directly. Free 30-minute scoping call. Fixed-price
            proposal within a week.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "var(--color-primary, #0D95E8)",
              color: "#FFFFFF",
              textDecoration: "none",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "0 4px 12px rgba(13, 149, 232, 0.35)",
            }}
          >
            Reach out
          </Link>
        </div>
      </section>
    </>
  );
}
