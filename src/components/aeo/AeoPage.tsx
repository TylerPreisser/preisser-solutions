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
  const url = `https://preissertech.com/${data.slug}`;

  // ---- JSON-LD: WebPage / Service / Article + FAQPage --------------
  // If the page itself is schemaType=FAQPage (e.g. /faq), don't emit a
  // separate WebPage-style block with @type=FAQPage — the dedicated faqSchema
  // below covers it. Otherwise we'd emit two FAQPage blocks per Google's
  // structured-data validator.
  const pageSchemaType = data.schemaType === "FAQPage" ? "WebPage" : data.schemaType;
  const pageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": pageSchemaType,
    "@id": `${url}#main`,
    url,
    name: data.h1,
    headline: data.h1,
    description: data.metaDescription,
    isPartOf: { "@id": "https://preissertech.com/#website" },
    about: { "@id": "https://preissertech.com/#organization" },
    inLanguage: "en-US",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://preissertech.com" },
      { "@type": "ListItem", position: 2, name: data.h1, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageSchema, faqSchema, breadcrumbSchema]),
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--color-dark, #0A1628)",
          color: "var(--color-text-dark-primary, #FFFFFF)",
          padding: "clamp(80px, 12vw, 140px) 24px clamp(60px, 10vw, 100px)",
          position: "relative",
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
            {data.eyebrow}
          </div>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              margin: "0 0 24px",
              color: "#FFFFFF",
            }}
          >
            {data.h1}
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
            {data.subheadline}
          </p>
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
          <p
            style={{
              fontSize: "clamp(1.125rem, 1.75vw, 1.375rem)",
              lineHeight: 1.6,
              color: "var(--color-text-light-primary, #0A1628)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            {data.answerParagraph}
          </p>
        </div>
      </section>

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
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--color-primary, #0D95E8)",
                    marginBottom: 12,
                  }}
                >
                  {section.eyebrow}
                </div>
              )}
              <h2
                style={{
                  fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  margin: "0 0 20px",
                  color: "var(--color-text-light-primary, #0A1628)",
                }}
              >
                {section.heading}
              </h2>
              {section.body.map((p, j) => (
                <p
                  key={j}
                  style={{
                    fontSize: 17,
                    lineHeight: 1.65,
                    color: "var(--color-text-light-secondary, #475569)",
                    margin: "0 0 16px",
                  }}
                >
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul
                  style={{
                    margin: "0 0 16px",
                    paddingLeft: 24,
                    color: "var(--color-text-light-secondary, #475569)",
                    fontSize: 17,
                    lineHeight: 1.65,
                  }}
                >
                  {section.bullets.map((b, k) => (
                    <li key={k} style={{ marginBottom: 8 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.subsections?.map((sub, k) => (
                <div key={k} style={{ marginTop: 32 }}>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      lineHeight: 1.3,
                      margin: "0 0 12px",
                      color: "var(--color-text-light-primary, #0A1628)",
                    }}
                  >
                    {sub.heading}
                  </h3>
                  {sub.body.map((p, m) => (
                    <p
                      key={m}
                      style={{
                        fontSize: 17,
                        lineHeight: 1.65,
                        color: "var(--color-text-light-secondary, #475569)",
                        margin: "0 0 12px",
                      }}
                    >
                      {p}
                    </p>
                  ))}
                  {sub.bullets && (
                    <ul
                      style={{
                        margin: "8px 0 0",
                        paddingLeft: 24,
                        color: "var(--color-text-light-secondary, #475569)",
                        fontSize: 17,
                        lineHeight: 1.65,
                      }}
                    >
                      {sub.bullets.map((b, n) => (
                        <li key={n} style={{ marginBottom: 6 }}>
                          {b}
                        </li>
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
            <h2
              style={{
                fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
                fontWeight: 700,
                margin: "0 0 12px",
                color: "var(--color-text-light-primary, #0A1628)",
              }}
            >
              Preisser Tech vs {data.comparisonTable.competitorName}
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
                    <th style={{ padding: "16px", textAlign: "left", fontWeight: 600 }}>Preisser Tech</th>
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
          <h2
            style={{
              fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
              fontWeight: 700,
              margin: "0 0 32px",
              color: "var(--color-text-light-primary, #0A1628)",
            }}
          >
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
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "var(--color-text-light-primary, #0A1628)",
                margin: "0 0 16px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Related
            </h2>
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
          <h2
            style={{
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
              color: "#FFFFFF",
            }}
          >
            {data.ctaHeadline}
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--color-text-dark-secondary, #94A3B8)",
              margin: "0 0 32px",
            }}
          >
            {data.ctaSubcopy}
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
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
