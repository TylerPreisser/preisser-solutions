import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";

// Below-fold client components — code-split so their JS is deferred until
// after the critical above-fold content is interactive. `ssr: true` keeps
// the HTML in the SSG output (preserves SEO + avoids layout shift on paint),
// but the JS bundle for each component is fetched lazily by the browser.
const ServicePillars = dynamic(
  () => import("@/components/home/service-pillars").then((m) => m.ServicePillars),
  { ssr: true }
);
// The MarCommand live surface. Sits directly below the services section, which
// is where the owner asked for it. Its own stage owns the animation, the
// reduced-motion end state and the pause control.
const MarCommandLive = dynamic(
  () =>
    import("@/components/home/marcommand-live").then((m) => m.MarCommandLive),
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

// SiteNavigationElement JSON-LD — homepage only. Emitted via the existing
// JsonLd helper so it lands in the same <script type="application/ld+json">
// pipeline as the rest of the structured-data graph.
//
// TRIMMED 6 -> 3 on 2026-09-04 (accessibility/QA audit). This list previously
// advertised /services, /case-studies and /about as primary navigation. It
// measured ZERO links to any of them in the built homepage:
//
//   grep -o 'href="/services"'     out/index.html | wc -l  -> 0
//   grep -o 'href="/case-studies"' out/index.html | wc -l  -> 0
//   grep -o 'href="/about"'        out/index.html | wc -l  -> 0
//
// (`href="#case-studies"` is an in-page anchor to the carousel, and
// /case-studies/alpha-matrix is a child card link — neither reaches the hub.)
// The header is deliberately logo + theme toggle + "Reach out" (header.tsx),
// so there is no nav menu for these to live in. Declaring navigation that does
// not exist is a factual misstatement in structured data, so the list now
// names only what the page actually links.
//
// The three removed pages are NOT orphaned site-wide: all remain in the
// 232-URL sitemap. Do NOT "fix" this by building a nav menu — that is a
// product decision nobody has made. If a real nav ships, restore them here in
// the same commit.
const primaryNavSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://preissersolutions.com/#primary-nav",
  name: "Primary navigation",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Products",  url: "https://preissersolutions.com/products"  },
    { "@type": "SiteNavigationElement", position: 2, name: "Locations", url: "https://preissersolutions.com/locations" },
    { "@type": "SiteNavigationElement", position: 3, name: "Contact",   url: "https://preissersolutions.com/contact"   },
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
        Preisser Solutions is a Hays, Kansas-based custom software company: business software, business automation, and AI integration. We build the internal systems a business runs on (admin dashboards, customer and member databases, client portals, document pipelines, and the automations that connect them), purpose-built for how each business actually works, for small and mid-sized businesses in Kansas and beyond.
      </p>
      {/* <Capabilities> stood here from 2026-09-03 to 2026-09-04. It was
          itself the replacement for <ProofBar> and <ValueStrip>, two infinite
          marquees the owner called tacky. Deleted on the owner's call; its
          three load-bearing assets were relocated first, not dropped:
            - the three pillar hub links (/web-applications,
              /business-automation, /services/ai-automation) are now the FIRST
              serviceTile of their matching pillar in <ServicePillars>, which
              keeps each one a real <a> in the server-rendered HTML via
              PillarCrawlerContent;
            - "22+ Kansas SMB projects delivered" is appended to the
              .ps-services-intro paragraph in <ServicePillars>;
            - "Client & member portals" survives as the widened serviceTile
              title "Client & Member Portals, Booking & Intake".
          Do not reinstate a capabilities section without reading that list —
          re-adding one would duplicate all three. */}
      <ServicePillars />
      <MarCommandLive />
      <WhyUs />
      <CaseStudies />
      {/* The websites + marketing band stood here until 2026-09-04. It is gone
          per ADR-0006: its six destinations now live as bento cards in the
          pillar grid, which is where the owner asked for them ("the websites
          and marketing section should be a bento card up there beuatiful like
          th eothers"). Do not reinstate a band — ADR-0006 decision 1 removed
          the standalone section deliberately, not by oversight. */}
      {/* The "Everything we do, one tap away" <details> link cluster used to
          live here. Removed 2026-09-03 on the owner's call: "the everythign we
          do one tap away is i also wish that wasnt there tbh unless it is
          winning for us on seo type stuff It destroys the vibe."

          It was not winning. Measured on the built page before removal, it
          emitted 83 distinct links — 77 of them to /locations/* — out of 119
          internal links on the whole homepage. Nothing is orphaned by the
          deletion: /locations is a real hub page (out/locations.html, in the
          232-URL sitemap) that links all 77 location pages, so the silo moves
          from depth-1 to depth-2 via the new footer link rather than being
          cut off. The three destinations the cluster uniquely linked
          (/web-applications, /business-automation, /services/ai-automation —
          each had exactly ONE homepage link, and it was this one) moved into
          <Capabilities> on 2026-09-03, and then — when <Capabilities> was
          itself deleted on 2026-09-04 — into <ServicePillars> serviceTiles,
          where they live now. The other three service links it carried are
          carried by the websites/marketing bento cards in the same component
          (ADR-0006, ADR-0007).

          Deliberately NOT claimed here: any effect on AI-engine citation from
          collapsed vs. visible markup. The research found no credible evidence
          in either direction. The honest falsifier is Search Console
          impressions for /locations/* over the next 4-8 weeks. */}
      <CtaSection />
    </>
  );
}
