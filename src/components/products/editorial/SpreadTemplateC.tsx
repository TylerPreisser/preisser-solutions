"use client";

import Link from "next/link";
import type { ProductData } from "@/types/product";
import { StatusPill } from "./StatusPill";

interface SpreadTemplateCProps {
  product: ProductData;
  pageNumber: string;
}

export function SpreadTemplateC({ product, pageNumber }: SpreadTemplateCProps) {
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
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        {/* Left: sticky technical sheet */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {/* Oversized page number */}
          <div
            className="mb-4 leading-none"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontWeight: 100,
              fontSize: "clamp(5rem, 10vw, 8rem)",
              color: "var(--ed-ink-muted)",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
            aria-hidden="true"
          >
            {pageNumber.replace("pg.", "")}
          </div>

          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 500,
              fontStyle: "italic",
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
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

          {/* Technical specs */}
          <div className="space-y-0">
            {[
              { key: "Category", val: product.category },
              { key: "Status", val: product.status },
              { key: "Inputs", val: String(product.inputs.length) },
              { key: "Outputs", val: String(product.outputs.length) },
              { key: "Capabilities", val: String(product.capabilities.length) },
              { key: "Tech items", val: String(product.techStack.length) },
            ].map(({ key, val }) => (
              <div
                key={key}
                className="flex items-baseline justify-between gap-4 border-b py-2"
                style={{ borderColor: "var(--ed-hairline)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ed-ink-muted)",
                  }}
                >
                  {key}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "11px",
                    color: "var(--ed-ink-secondary)",
                    fontVariantNumeric: "tabular-nums",
                    textAlign: "right",
                  }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Tech list */}
          {product.techStack.length > 0 && (
            <div className="mt-5">
              <p
                className="mb-2 text-[10px] uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono), monospace", color: "var(--ed-ink-muted)" }}
              >
                Stack
              </p>
              <div className="flex flex-wrap gap-1">
                {product.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-sm border px-2 py-0.5 text-[10px]"
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      borderColor: "var(--ed-hairline)",
                      color: "var(--ed-ink-secondary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: article flow */}
        <div>
          {/* Body */}
          {firstParagraph && (
            <p
              className="ed-drop-cap text-base leading-relaxed sm:text-[17px]"
              style={{
                fontFamily: "var(--font-newsreader), serif",
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
                fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                lineHeight: 1.65,
                color: "var(--ed-ink-secondary)",
              }}
            >
              {para}
            </p>
          ))}

          {/* How it works */}
          {product.howItWorks.length > 0 && (
            <div
              className="mt-10 border-t pt-8"
              style={{ borderColor: "var(--ed-hairline)" }}
            >
              <p
                className="mb-6 text-[10px] uppercase tracking-[0.22em]"
                style={{ fontFamily: "var(--font-mono), monospace", color: "var(--ed-ink-muted)" }}
              >
                How it works
              </p>
              <ol>
                {product.howItWorks.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-5 border-b py-4 last:border-b-0"
                    style={{ borderColor: "var(--ed-hairline)" }}
                  >
                    <span
                      className="shrink-0 pt-0.5"
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "10px",
                        color: "var(--ed-ink-muted)",
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p
                        className="mb-1 text-sm font-medium"
                        style={{
                          fontFamily: "var(--font-newsreader), serif",
                          fontWeight: 500,
                          color: "var(--ed-ink)",
                        }}
                      >
                        {step.step}
                      </p>
                      <p
                        className="text-[13px] leading-relaxed"
                        style={{
                          fontFamily: "var(--font-newsreader), serif",
                          color: "var(--ed-ink-secondary)",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Byline */}
          <div
            className="mt-8 border-t pt-5"
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
              Full entry →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
