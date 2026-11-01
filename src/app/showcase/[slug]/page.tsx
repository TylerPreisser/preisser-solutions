import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import { ShowcaseTour } from "@/components/showcase/ShowcaseTour";
import { showcaseList, showcases, type ShowcaseSlug } from "@/data/showcase";
import "@/components/showcase/showcase.css";

// One static page per product with a public site we built AND a command center
// (ADR-0020). Duffer Golf and Hays Academy first.
export const dynamicParams = false;

export function generateStaticParams() {
  return showcaseList.map((s) => ({ slug: s.slug }));
}

const BASE = "https://preissersolutions.com";

function get(slug: string) {
  return (showcases as Record<string, (typeof showcases)[ShowcaseSlug] | undefined>)[slug];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const show = get(slug);
  if (!show) return {};
  const url = `${BASE}/showcase/${show.slug}`;
  return {
    title: show.metaTitle,
    description: show.metaDescription,
    alternates: { canonical: url },
    openGraph: { siteName: "Preisser Solutions", title: show.metaTitle, description: show.metaDescription, url, type: "article" },
    twitter: { card: "summary_large_image", title: show.metaTitle, description: show.metaDescription },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const show = get(slug);
  if (!show) notFound();
  const url = `${BASE}/showcase/${show.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: show.metaTitle,
    description: show.metaDescription,
    url,
    about: { "@type": "Organization", name: show.name, url: show.liveUrl },
    publisher: { "@type": "Organization", name: "Preisser Solutions", url: BASE },
  };
  const crumbs = buildBreadcrumbs([
    { name: "Case Studies", url: `${BASE}/case-studies` },
    { name: show.name, url },
  ]);

  return (
    <article className="sc-root sc-page">
      <JsonLd data={[schema, crumbs]} />
      <ShowcaseTour show={show}>
        <header className="sc-hero">
          <p className="sc-eyebrow">Our work</p>
          <h1>{show.h1}</h1>
          <p className="sc-hero__lede">{show.lede}</p>
          <div className="sc-foot">
            <a className="sc-live" href={show.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit {show.liveLabel}
              <span className="ps-visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </header>
      </ShowcaseTour>

      <section className="sc-end" aria-labelledby="sc-end-title">
        <h2 id="sc-end-title">Want one of these for your business?</h2>
        <p>Tell me what your week looks like. I&apos;ll show you what we&apos;d build.</p>
        <a className="sc-cta" href="/contact">
          Reach out
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>
    </article>
  );
}
