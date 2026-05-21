"use client";

import Link from "next/link";
import type { ProductData } from "@/types/product";
import { StatusPill } from "./StatusPill";

interface SpreadTemplateAProps {
  product: ProductData;
  pageNumber: string;
}

export function SpreadTemplateA({ product, pageNumber }: SpreadTemplateAProps) {
  const firstParagraph = product.whatItDoes[0] ?? "";
  const restParagraphs = product.whatItDoes.slice(1);

  return (
    <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
      {/* Label row above */}
      <div
        className="mb-8 flex items-center gap-6 border-t pt-6"
        style={{ borderColor: "var(--ed-hairline)" }}
      >
        <span
          className="text-[11px] tracking-[0.18em] uppercase"
          style={{
            fontFamily: "var(--font-mono), monospace",
            color: "var(--ed-ink-muted)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {pageNumber}
        </span>
        <span
          className="text-[11px] tracking-[0.14em] uppercase"
          style={{
            fontFamily: "var(--font-mono), monospace",
            color: "var(--ed-ink-muted)",
          }}
        >
          {product.category}
        </span>
        <StatusPill status={product.status} />
      </div>

      {/* Product name */}
      <h2
        style={{
          fontFamily: "var(--font-fraunces), serif",
          fontWeight: 600,
          fontStyle: "italic",
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.035em",
          color: "var(--ed-ink)",
          fontFeatureSettings: "'ss01', 'ss02'",
          maxWidth: "18ch",
        }}
      >
        <Link
          href={`/products/${product.slug}`}
          style={{ color: "inherit", textDecoration: "none" }}
          className="hover:opacity-70 transition-opacity duration-200"
        >
          {product.name}
        </Link>
      </h2>

      {/* Tagline */}
      <p
        className="mt-5"
        style={{
          fontFamily: "var(--font-newsreader), serif",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
          lineHeight: 1.35,
          color: "var(--ed-ink-secondary)",
          maxWidth: "60ch",
        }}
      >
        {product.tagline}
      </p>

      {/* Metadata strip */}
      <div
        className="mt-6 flex flex-wrap items-center gap-6 border-t border-b py-3"
        style={{ borderColor: "var(--ed-hairline)" }}
      >
        {[
          { count: product.inputs.length, label: "INPUTS" },
          { count: product.outputs.length, label: "OUTPUTS" },
          { count: product.capabilities.length, label: "CAPABILITIES" },
          { count: product.techStack.length, label: "TECH" },
        ].map(({ count, label }) => (
          <span
            key={label}
            className="text-[11px] tracking-[0.14em] uppercase"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--ed-ink-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span style={{ color: "var(--ed-ink-secondary)" }}>{String(count).padStart(2, "0")}</span>
            &nbsp;{label}
          </span>
        ))}
      </div>

      {/* Body: 2-col on desktop */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
        {/* Left: body text with drop-cap on first para */}
        <div>
          {firstParagraph && (
            <p
              className="ed-drop-cap text-base leading-relaxed sm:text-[17px]"
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "var(--ed-ink-secondary)",
              }}
            >
              {firstParagraph}
            </p>
          )}
          {restParagraphs.map((para, i) => (
            <p
              key={i}
              className="mt-5 text-base leading-relaxed sm:text-[17px]"
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "var(--ed-ink-secondary)",
              }}
            >
              {para}
            </p>
          ))}

          {/* Byline row */}
          <div
            className="mt-8 border-t pt-5"
            style={{ borderColor: "var(--ed-hairline)" }}
          >
            {product.linkedCaseStudySlug ? (
              <Link
                href={`/case-studies/${product.linkedCaseStudySlug}`}
                className="transition-opacity duration-150 hover:opacity-60"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--ed-ink-muted)",
                  textDecoration: "none",
                }}
              >
                Linked engagement: {product.linkedCaseStudySlug.replace(/-/g, " ")} →
              </Link>
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--ed-ink-muted)",
                  textTransform: "uppercase",
                }}
              >
                New work &middot; No linked engagement
              </span>
            )}
          </div>
        </div>

        {/* Right: technical sidebar */}
        <aside>
          {/* Headline metric pullquote */}
          {product.headlineMetric && (
            <div
              className="mb-8 border-l-4 pl-5"
              style={{ borderColor: "var(--ed-brand-blue)" }}
            >
              <span
                className="block leading-none"
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 800,
                  fontSize: "clamp(3rem, 7vw, 5rem)",
                  color: "var(--ed-brand-blue)",
                  letterSpacing: "-0.04em",
                  fontFeatureSettings: "'ss01'",
                }}
              >
                {product.headlineMetric.value}
              </span>
              <span
                className="mt-1.5 block text-[10px] uppercase tracking-[0.18em]"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  color: "var(--ed-ink-muted)",
                }}
              >
                {product.headlineMetric.label}
              </span>
            </div>
          )}

          {/* Inputs */}
          {product.inputs.length > 0 && (
            <div className="mb-6">
              <p
                className="mb-2 text-[10px] uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono), monospace", color: "var(--ed-ink-muted)" }}
              >
                Inputs
              </p>
              <ul className="space-y-1.5">
                {product.inputs.map((inp, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "11px",
                      color: "var(--ed-ink-secondary)",
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ color: "var(--ed-ink-muted)", flexShrink: 0 }}>→</span>
                    <span>{inp.label}{inp.format && <span style={{ color: "var(--ed-ink-muted)" }}> · {inp.format}</span>}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack chips */}
          {product.techStack.length > 0 && (
            <div>
              <p
                className="mb-2 text-[10px] uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono), monospace", color: "var(--ed-ink-muted)" }}
              >
                Tech
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-sm border px-2 py-0.5 text-[10px]"
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      borderColor: "var(--ed-hairline)",
                      color: "var(--ed-ink-secondary)",
                      background: "transparent",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link
              href={`/products/${product.slug}`}
              className="transition-opacity duration-150 hover:opacity-60"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--ed-ink)",
                textDecoration: "none",
              }}
            >
              Full entry →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
