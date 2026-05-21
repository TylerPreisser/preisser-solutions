"use client";

import Link from "next/link";
import type { ProductData } from "@/types/product";
import { StatusPill } from "./StatusPill";

interface SpreadTemplateBProps {
  product: ProductData;
  pageNumber: string;
  spreadIndex: number;
}

export function SpreadTemplateB({ product, pageNumber, spreadIndex }: SpreadTemplateBProps) {
  const firstParagraph = product.whatItDoes[0] ?? "";
  const restParagraphs = product.whatItDoes.slice(1);

  return (
    <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
      {/* Label row */}
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
        <span
          className="ml-auto text-[10px] uppercase tracking-[0.18em]"
          style={{
            fontFamily: "var(--font-mono), monospace",
            color: "var(--ed-ink-muted)",
          }}
        >
          Spread {String(spreadIndex).padStart(2, "0")}
        </span>
      </div>

      {/* Centered product name */}
      <div className="mx-auto max-w-[880px] text-center">
        <h2
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "var(--ed-ink)",
            fontFeatureSettings: "'ss01', 'ss02'",
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

        {/* Epigraph */}
        <p
          className="mx-auto mt-6"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            lineHeight: 1.4,
            color: "var(--ed-ink-secondary)",
            maxWidth: "50ch",
          }}
        >
          {product.tagline}
        </p>

        {/* Lede paragraph with drop-cap */}
        <div
          className="mt-10 border-t pt-8 text-left"
          style={{ borderColor: "var(--ed-hairline)" }}
        >
          {firstParagraph && (
            <p
              className="ed-drop-cap"
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
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
              className="mt-5"
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                lineHeight: 1.65,
                color: "var(--ed-ink-secondary)",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Capabilities grid */}
        {product.capabilities.length > 0 && (
          <div
            className="mt-12 grid grid-cols-1 gap-0 border-t sm:grid-cols-3"
            style={{ borderColor: "var(--ed-hairline)" }}
          >
            {product.capabilities.slice(0, 3).map((cap, i) => (
              <div
                key={i}
                className="border-b p-6 text-left last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                style={{ borderColor: "var(--ed-hairline)" }}
              >
                <p
                  className="mb-2 text-sm font-medium leading-snug"
                  style={{
                    fontFamily: "var(--font-newsreader), serif",
                    fontWeight: 500,
                    color: "var(--ed-ink)",
                  }}
                >
                  {cap.title}
                </p>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{
                    fontFamily: "var(--font-newsreader), serif",
                    color: "var(--ed-ink-secondary)",
                  }}
                >
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Headline metric pullquote */}
        {product.headlineMetric && (
          <div
            className="mt-10 border-t pt-8"
            style={{ borderColor: "var(--ed-hairline)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.05,
                color: "var(--ed-ink)",
                letterSpacing: "-0.03em",
                fontFeatureSettings: "'ss01', 'ss02'",
              }}
            >
              &ldquo;{product.headlineMetric.value} {product.headlineMetric.label}&rdquo;
            </p>
          </div>
        )}

        {/* Byline */}
        <div
          className="mt-8 border-t pt-5 text-left"
          style={{ borderColor: "var(--ed-hairline)" }}
        >
          <Link
            href={`/products/${product.slug}`}
            className="transition-opacity duration-150 hover:opacity-60"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--ed-ink-muted)",
              textDecoration: "none",
            }}
          >
            Full entry → {product.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
