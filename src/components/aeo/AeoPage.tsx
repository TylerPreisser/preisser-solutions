import Link from "next/link";
import type { AeoPageData } from "@/data/aeo/types";

/**
 * Shared layout for AI-optimized hidden pages.
 *
 * Renders a consistent visual structure that mirrors the public site
 * (dark hero → light content sections → dark CTA) while embedding the
 * full AEO payload: answer paragraph, structured sections, FAQ block,
 * JSON-LD schema, internal links.
 *
 * Pages using this template are server-rendered, fully static, and
 * indexable. They share the existing Header/Footer from the root layout.
 */
export function AeoPage({ data }: { data: AeoPageData }) {
  const url = `https://preissersolutions.com/${data.slug}`;

  // ---- JSON-LD: WebPage / Service / Article + FAQPage --------------
  // If the page itself is schemaType=FAQPage (e.g. /faq), don't emit a
  // separate WebPage-style block with @type=FAQPage — the dedicated faqSchema
  // below covers it. Otherwise we'd emit two FAQPage blocks per Google's
  // structured-data validator.
  const pageSchemaType = data.schemaType === "FAQPage" ? "WebPage" : data.schemaType;

  // Base fields shared across all schema types.
  //
  // R-058 (Phase 4.6) — when the AEO page IS the canonical Person entity
  // (`/tyler-preisser`), use the canonical PERSON_ID so the Person schema
  // emitted here merges with the Person block in `src/app/layout.tsx` rather
  // than creating a second, duplicate Person entity in the graph.
  const isCanonicalPerson =
    pageSchemaType === "Person" && data.slug === "tyler-preisser";
  const schemaId = isCanonicalPerson
    ? "https://preissersolutions.com/#tyler-preisser"
    : `${url}#main`;

  const pageSchemaBase: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": pageSchemaType,
    "@id": schemaId,
    url,
    name: data.h1,
    description: data.metaDescription,
    inLanguage: "en-US",
  };

  // Service-specific enrichment: provider, serviceType, areaServed
  // Per Schema.org + AI Agent Behavior Reference: Service schema requires
  // provider (linked to Organization), serviceType, and areaServed for
  // Perplexity and Google AI Overviews to cite confidently.
  const serviceFields: Record<string, unknown> =
    pageSchemaType === "Service"
      ? {
          provider: { "@id": "https://preissersolutions.com/#organization" },
          serviceType: data.h1,
          areaServed: [
            { "@type": "State", name: "Kansas" },
            { "@type": "AdministrativeArea", name: "Great Plains, United States" },
          ],
          audience: {
            "@type": "BusinessAudience",
            audienceType: "Small and mid-sized businesses",
          },
          isRelatedTo: { "@id": "https://preissersolutions.com/#organization" },
        }
      : {};

  // Article / BlogPosting enrichment: author, datePublished, publisher, headline
  // Required for Google AI Overviews to cite Article- and BlogPosting-type pages
  // with E-E-A-T signals. BlogPosting is a Schema.org subtype of Article and
  // accepts the same fields; we treat them identically here.
  // R-018: datePublished / dateModified are read from the data file when present
  // so each case study / blog post can claim its own freshness window. Falls
  // back to a conservative default so the schema is never invalid.
  const isArticleLike = pageSchemaType === "Article" || pageSchemaType === "BlogPosting";
  const articleFields: Record<string, unknown> = isArticleLike
    ? {
        headline: data.h1,
        author: { "@id": "https://preissersolutions.com/#tyler-preisser" },
        publisher: { "@id": "https://preissersolutions.com/#organization" },
        datePublished: data.datePublished ?? "2026-05-04",
        dateModified: data.dateModified ?? data.datePublished ?? "2026-05-04",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": "https://preissersolutions.com/#website" },
        about: { "@id": "https://preissersolutions.com/#organization" },
      }
    : {};

  // WebPage-specific enrichment
  const webPageFields: Record<string, unknown> =
    pageSchemaType !== "Service" && !isArticleLike
      ? {
          headline: data.h1,
          isPartOf: { "@id": "https://preissersolutions.com/#website" },
          about: { "@id": "https://preissersolutions.com/#organization" },
        }
      : {};

  const pageSchema: Record<string, unknown> = {
    ...pageSchemaBase,
    ...serviceFields,
    ...articleFields,
    ...webPageFields,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: data.faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://preissersolutions.com" },
      { "@type": "ListItem", position: 2, name: data.h1, item: url },
    ],
  };

  // Wave B — optional Review schema (case-study pages with a named client).
  // Attribution stays with the NAMED CLIENT as the author. We deliberately
  // omit AggregateRating; that requires 3+ genuine reviews per Google policy.
  const reviewSchema = data.review
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        "@id": `${url}#review`,
        itemReviewed: {
          "@type": "Service",
          name: data.review.itemReviewedName ?? data.h1,
          provider: { "@id": "https://preissersolutions.com/#organization" },
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: data.review.ratingValue,
          bestRating: 5,
        },
        reviewBody: data.review.reviewBody,
        author: { "@type": data.review.authorType, name: data.review.authorName },
        datePublished: data.datePublished,
        publisher: { "@id": "https://preissersolutions.com/#organization" },
      }
    : null;

  // Wave B — optional HowTo schema for step-based blog posts.
  const howToSchema = data.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: data.howTo.name,
        description: data.howTo.description,
        step: data.howTo.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  const schemaBlocks: Record<string, unknown>[] = [
    pageSchema,
    faqSchema,
    breadcrumbSchema,
  ];
  if (reviewSchema) schemaBlocks.push(reviewSchema);
  if (howToSchema) schemaBlocks.push(howToSchema);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaBlocks),
        }}
      />

      {/* Responsive style for hero layout — only needed when headshot is present */}
      {data.headshot && (
        <style>{`
          @media (max-width: 600px) {
            .aeo-hero-inner {
              flex-direction: column-reverse !important;
              align-items: flex-start !important;
            }
            .aeo-hero-headshot {
              width: clamp(96px, 28vw, 140px) !important;
              height: clamp(96px, 28vw, 140px) !important;
            }
          }
        `}</style>
      )}

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-dark, #0A1628)",
          color: "var(--color-text-dark-primary, #FFFFFF)",
          padding: "clamp(80px, 12vw, 140px) 24px clamp(60px, 10vw, 100px)",
          position: "relative",
        }}
      >
        <div
          className="aeo-hero-inner"
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "clamp(40px, 6vw, 80px)",
          }}
        >
          {/* Text column */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <div className="aeo-eyebrow">{data.eyebrow}</div>
            <h1 className="aeo-h1">{data.h1}</h1>
            <p className="aeo-subheadline">{data.subheadline}</p>
          </div>

          {/* Headshot — only rendered when data.headshot is present */}
          {data.headshot && (
            <div
              className="aeo-hero-headshot"
              style={{
                flexShrink: 0,
                width: "clamp(160px, 20vw, 260px)",
                height: "clamp(160px, 20vw, 260px)",
              }}
            >
              <img
                src={data.headshot.src}
                alt={data.headshot.alt}
                width={data.headshot.width}
                height={data.headshot.height}
                loading="eager"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "3px solid rgba(13, 149, 232, 0.5)",
                  boxShadow: "0 0 0 6px rgba(13, 149, 232, 0.12), 0 20px 60px rgba(0, 0, 0, 0.5)",
                  display: "block",
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ── ANSWER PARAGRAPH (AI quote-bait) ─────────────────────── */}
      <section
        style={{
          background: "var(--color-light, #F6F9FC)",
          padding: "clamp(60px, 8vw, 100px) 24px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p className="aeo-answer">{data.answerParagraph}</p>
        </div>
      </section>

      {/* ── PRICING TIERS (R-096) ────────────────────────────────── */}
      {data.tiers && data.tiers.length > 0 && (
        <section
          style={{
            background: "#FFFFFF",
            padding: "clamp(60px, 8vw, 100px) 24px",
            borderTop: "1px solid var(--color-border-light, #E2E8F0)",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <h2 className="aeo-h2 aeo-h2--center">
              Three ways to work with Preisser Solutions
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {data.tiers.map((tier, i) => (
                <div
                  key={i}
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
                  <div>
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: 1.25,
                        margin: "0 0 8px",
                        color: "var(--color-text-light-primary, #0A1628)",
                      }}
                    >
                      {tier.name}
                    </h3>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--color-primary, #0D95E8)",
                        marginBottom: 8,
                      }}
                    >
                      {tier.priceRange}
                    </div>
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: "var(--color-text-light-secondary, #475569)",
                        margin: 0,
                      }}
                    >
                      {tier.tagline}
                    </p>
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {tier.deliverables.map((d, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: 15,
                          lineHeight: 1.5,
                          color: "var(--color-text-light-primary, #0A1628)",
                          paddingLeft: 18,
                          position: "relative",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 8,
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            background: "var(--color-primary, #0D95E8)",
                          }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--color-text-light-secondary, #475569)",
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    {tier.useCase}
                  </p>
                  <Link
                    href={tier.cta.href}
                    style={{
                      marginTop: "auto",
                      display: "inline-block",
                      padding: "12px 20px",
                      background: "var(--color-primary, #0D95E8)",
                      color: "#FFFFFF",
                      textDecoration: "none",
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    {tier.cta.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BODY SECTIONS ────────────────────────────────────────── */}
      <article
        style={{
          background: "#FFFFFF",
          padding: "clamp(60px, 8vw, 100px) 24px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {data.sections.map((section, i) => (
            <section
              key={i}
              style={{ marginBottom: i < data.sections.length - 1 ? 64 : 0 }}
            >
              {section.eyebrow && (
                <div className="aeo-eyebrow aeo-eyebrow--light">
                  {section.eyebrow}
                </div>
              )}
              <h2 className="aeo-h2">{section.heading}</h2>
              {section.body.map((p, j) => (
                <p key={j} className="aeo-body-p">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="aeo-bullets">
                  {section.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
              {section.subsections?.map((sub, k) => (
                <div key={k} style={{ marginTop: 32 }}>
                  <h3 className="aeo-h3">{sub.heading}</h3>
                  {sub.body.map((p, m) => (
                    <p key={m} className="aeo-body-p">
                      {p}
                    </p>
                  ))}
                  {sub.bullets && (
                    <ul className="aeo-bullets aeo-bullets--sub">
                      {sub.bullets.map((b, n) => (
                        <li key={n}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>
      </article>

      {/* ── COMPARISON TABLE (optional) ──────────────────────────── */}
      {data.comparisonTable && (
        <section
          style={{
            background: "var(--color-light, #F6F9FC)",
            padding: "clamp(60px, 8vw, 100px) 24px",
          }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 className="aeo-h2" style={{ marginBottom: 12 }}>
              Preisser Solutions vs {data.comparisonTable.competitorName}
            </h2>
            {data.comparisonTable.headerNote && (
              <p
                style={{
                  fontSize: 16,
                  color: "var(--color-text-light-secondary, #475569)",
                  margin: "0 0 32px",
                  maxWidth: 720,
                }}
              >
                {data.comparisonTable.headerNote}
              </p>
            )}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#FFFFFF",
                  border: "1px solid var(--color-border-light, #E2E8F0)",
                  borderRadius: 12,
                  overflow: "hidden",
                  fontSize: 15,
                }}
              >
                <thead>
                  <tr style={{ background: "var(--color-dark, #0A1628)", color: "#FFFFFF" }}>
                    <th style={{ padding: "16px", textAlign: "left", fontWeight: 600 }}>Dimension</th>
                    <th style={{ padding: "16px", textAlign: "left", fontWeight: 600 }}>Preisser Solutions</th>
                    <th style={{ padding: "16px", textAlign: "left", fontWeight: 600 }}>
                      {data.comparisonTable.competitorName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparisonTable.rows.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom:
                          i < (data.comparisonTable?.rows.length ?? 0) - 1
                            ? "1px solid var(--color-border-light, #E2E8F0)"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: 16,
                          fontWeight: 600,
                          color: "var(--color-text-light-primary, #0A1628)",
                          verticalAlign: "top",
                          width: "25%",
                        }}
                      >
                        {row.dimension}
                      </td>
                      <td
                        style={{
                          padding: 16,
                          color: "var(--color-text-light-secondary, #475569)",
                          verticalAlign: "top",
                        }}
                      >
                        {row.preisser}
                      </td>
                      <td
                        style={{
                          padding: 16,
                          color: "var(--color-text-light-muted, #94A3B8)",
                          verticalAlign: "top",
                        }}
                      >
                        {row.competitor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "clamp(60px, 8vw, 100px) 24px",
          borderTop: "1px solid var(--color-border-light, #E2E8F0)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 className="aeo-h2" style={{ marginBottom: 32 }}>
            Frequently Asked Questions
          </h2>
          <div>
            {data.faq.map((item, i) => (
              <details
                key={i}
                style={{
                  borderBottom: "1px solid var(--color-border-light, #E2E8F0)",
                  padding: "20px 0",
                }}
              >
                <summary
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--color-text-light-primary, #0A1628)",
                    cursor: "pointer",
                    listStyle: "none",
                  }}
                >
                  {item.question}
                </summary>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "var(--color-text-light-secondary, #475569)",
                    margin: "12px 0 0",
                  }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED LINKS ────────────────────────────────────────── */}
      {data.relatedLinks && data.relatedLinks.length > 0 && (
        <section
          style={{
            background: "var(--color-light, #F6F9FC)",
            padding: "clamp(40px, 6vw, 64px) 24px",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 className="aeo-related-heading">Related</h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {data.relatedLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    style={{
                      display: "inline-block",
                      padding: "10px 18px",
                      background: "#FFFFFF",
                      border: "1px solid var(--color-border-light, #E2E8F0)",
                      borderRadius: 999,
                      color: "var(--color-primary, #0D95E8)",
                      textDecoration: "none",
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-dark, #0A1628)",
          color: "#FFFFFF",
          padding: "clamp(80px, 10vw, 120px) 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 className="aeo-cta-headline">{data.ctaHeadline}</h2>
          <p className="aeo-cta-subcopy">{data.ctaSubcopy}</p>
          <Link
            href={data.primaryCta?.href ?? "/contact"}
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
            {data.primaryCta?.label ?? "Reach out"}
          </Link>
        </div>
      </section>
    </>
  );
}
