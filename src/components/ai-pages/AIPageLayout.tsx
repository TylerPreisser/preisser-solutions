import Link from "next/link";
import type { AIPage, FAQ } from "@/data/ai-pages/types";
import { StructuredData, ORG_REF, PERSON_REF } from "./StructuredData";

interface AIPageLayoutProps {
  page: AIPage;
  // Optional Schema.org payloads built by the route template.
  // Always pass FAQPage schema if the page has FAQs.
  extraSchema?: object[];
  // Optional eyebrow label (e.g., "Service" / "Industry" / "Location").
  eyebrow?: string;
  // Optional sidebar / aside contents (e.g., comparison table, table of contents).
  aside?: React.ReactNode;
  // Page tags rendered as breadcrumbs.
  breadcrumbs?: { label: string; href: string }[];
}

function buildFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function AIPageLayout({
  page,
  extraSchema = [],
  eyebrow,
  aside,
  breadcrumbs,
}: AIPageLayoutProps) {
  const schemas: object[] = [...extraSchema];
  if (page.faqs && page.faqs.length > 0) schemas.push(buildFAQSchema(page.faqs));

  return (
    <article className="ps-ai-page">
      <StructuredData data={schemas} />

      <header className="ps-ai-page__header">
        <div className="ps-ai-page__container">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="ps-ai-breadcrumbs">
              <ol>
                {breadcrumbs.map((b, i) => (
                  <li key={b.href}>
                    <Link href={b.href}>{b.label}</Link>
                    {i < breadcrumbs.length - 1 && <span aria-hidden="true"> / </span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <p className="ps-ai-eyebrow">{eyebrow}</p>}
          <h1 className="ps-ai-h1">{page.h1}</h1>
          <p className="ps-ai-snippet">{page.aiSnippet}</p>
        </div>
      </header>

      <div className="ps-ai-page__body">
        <div className="ps-ai-page__container ps-ai-grid">
          <div className="ps-ai-content">
            {page.sections.map((section) => (
              <section key={section.heading} className="ps-ai-section">
                <h2>{section.heading}</h2>
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}

            {page.faqs && page.faqs.length > 0 && (
              <section className="ps-ai-faqs" aria-labelledby="faq-heading">
                <h2 id="faq-heading">Frequently Asked Questions</h2>
                <dl>
                  {page.faqs.map((f, i) => (
                    <div key={i} className="ps-ai-faq">
                      <dt>{f.q}</dt>
                      <dd>{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {page.internalLinks && page.internalLinks.length > 0 && (
              <section className="ps-ai-related" aria-labelledby="related-heading">
                <h2 id="related-heading">Related</h2>
                <ul>
                  {page.internalLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.anchor}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="ps-ai-cta">
              <h2>Ready to start?</h2>
              <p>
                We build websites, apps, automation systems, AI agents, and dashboards from
                scratch — for businesses across Kansas and beyond. Tell Tyler what you need
                built or fixed and get a direct response.
              </p>
              <Link href="/contact" className="ps-btn ps-btn-primary">
                Start a Project
              </Link>
            </section>
          </div>

          {aside && <aside className="ps-ai-aside">{aside}</aside>}
        </div>
      </div>
    </article>
  );
}

// Helper used by route templates that don't pass extraSchema.
export { ORG_REF, PERSON_REF };
