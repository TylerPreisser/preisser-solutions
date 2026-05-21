"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ProductData } from "@/types/product";
import { StatusPill } from "./StatusPill";

interface LinkedCaseStudy {
  slug: string;
  title: string;
  oneLine?: string;
  metric?: string;
}

interface DetailSpreadProps {
  product: ProductData;
  relatedProducts: ProductData[];
  linkedCaseStudy?: LinkedCaseStudy | null;
}

const fadeUp = (delay: number, reduceMotion: boolean | null) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      };

export function DetailSpread({ product, relatedProducts, linkedCaseStudy }: DetailSpreadProps) {
  const reduceMotion = useReducedMotion();
  const firstParagraph = product.whatItDoes[0] ?? "";
  const restParagraphs = product.whatItDoes.slice(1);

  return (
    <article>
      {/* ── 1. Hero Spread ─────────────────────────────────── */}
      <section
        className="relative pb-20 pt-32 md:pb-28 md:pt-40"
        style={{ background: "var(--ed-bg)" }}
        aria-label={`${product.name} — hero`}
      >
        {/* Faint grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--ed-grid) 1px, transparent 1px),
              linear-gradient(90deg, var(--ed-grid) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          {/* Breadcrumb */}
          <motion.nav
            {...fadeUp(0.0, reduceMotion)}
            className="mb-8 flex items-center gap-2 text-[11px]"
            aria-label="Breadcrumb"
            style={{
              fontFamily: "var(--font-mono), monospace",
              letterSpacing: "0.08em",
              color: "var(--ed-ink-muted)",
            }}
          >
            <Link
              href="/products"
              className="hover:opacity-60 transition-opacity duration-150"
              style={{ color: "var(--ed-ink-muted)", textDecoration: "none" }}
            >
              Products
            </Link>
            <span aria-hidden="true"> / </span>
            <span style={{ color: "var(--ed-ink-muted)" }}>{product.category}</span>
            <span aria-hidden="true"> / </span>
            <span style={{ color: "var(--ed-ink)" }}>{product.name}</span>
          </motion.nav>

          {/* Status + category row */}
          <motion.div
            {...fadeUp(0.05, reduceMotion)}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span
              className="text-[11px] uppercase tracking-[0.14em]"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "var(--ed-ink-muted)",
              }}
            >
              {product.category}
            </span>
            <StatusPill status={product.status} />
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.1, reduceMotion)}
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 650,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              color: "var(--ed-ink)",
              fontFeatureSettings: "'ss01', 'ss02'",
              maxWidth: "20ch",
            }}
          >
            {product.h1}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.16, reduceMotion)}
            className="mt-6"
            style={{
              fontFamily: "var(--font-newsreader), serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              lineHeight: 1.4,
              color: "var(--ed-ink-secondary)",
              maxWidth: "60ch",
            }}
          >
            {product.subheadline}
          </motion.p>

          {/* Metadata strip */}
          <motion.div
            {...fadeUp(0.2, reduceMotion)}
            className="mt-8 flex flex-wrap items-center gap-6 border-t border-b py-3"
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
          </motion.div>

          {/* Body + sidebar */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
            {/* Left: body */}
            <motion.div {...fadeUp(0.25, reduceMotion)}>
              {firstParagraph && (
                <p
                  className="ed-drop-cap"
                  style={{
                    fontFamily: "var(--font-newsreader), serif",
                    fontWeight: 400,
                    fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
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
                    fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                    lineHeight: 1.65,
                    color: "var(--ed-ink-secondary)",
                  }}
                >
                  {para}
                </p>
              ))}

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={product.cta.buttonHref}
                  className="inline-flex items-center gap-2 border px-6 py-3 text-sm font-medium transition-all duration-200 hover:opacity-70"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    color: "var(--ed-surface)",
                    background: "var(--ed-ink)",
                    borderColor: "var(--ed-ink)",
                    fontFeatureSettings: "'ss01'",
                  }}
                >
                  {product.cta.buttonLabel} →
                </Link>
                {linkedCaseStudy && (
                  <Link
                    href={`/case-studies/${linkedCaseStudy.slug}`}
                    className="inline-flex items-center gap-2 border px-6 py-3 text-sm transition-all duration-200 hover:opacity-70"
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: "var(--ed-ink)",
                      background: "transparent",
                      borderColor: "var(--ed-hairline)",
                    }}
                  >
                    See the case study →
                  </Link>
                )}
              </div>

              {product.statusNote && (
                <div
                  className="mt-6 border-l-2 pl-4 text-sm"
                  style={{
                    borderColor: "var(--ed-ink-muted)",
                    fontFamily: "var(--font-newsreader), serif",
                    fontStyle: "italic",
                    color: "var(--ed-ink-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {product.statusNote}
                </div>
              )}
            </motion.div>

            {/* Right: sidebar */}
            <motion.aside {...fadeUp(0.3, reduceMotion)}>
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

              {product.techStack.length > 0 && (
                <div className="mb-6">
                  <p
                    className="mb-2 text-[10px] uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-mono), monospace", color: "var(--ed-ink-muted)" }}
                  >
                    Tech stack
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
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ── 2. Capabilities ────────────────────────────────── */}
      {product.capabilities.length > 0 && (
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--ed-surface)" }}
          aria-label="Capabilities"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <h2
              className="mb-10 border-b pb-4"
              style={{
                borderColor: "var(--ed-hairline)",
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--ed-ink)",
                letterSpacing: "-0.02em",
                fontFeatureSettings: "'ss01', 'ss02'",
              }}
            >
              Capabilities
            </h2>
            <ol>
              {product.capabilities.map((cap, i) => (
                <li
                  key={i}
                  className="flex gap-6 border-b py-5 last:border-b-0"
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
                      className="mb-1.5"
                      style={{
                        fontFamily: "var(--font-newsreader), serif",
                        fontWeight: 500,
                        fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                        color: "var(--ed-ink)",
                      }}
                    >
                      {cap.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-newsreader), serif",
                        fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                        lineHeight: 1.6,
                        color: "var(--ed-ink-secondary)",
                      }}
                    >
                      {cap.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── 3. How it works ────────────────────────────────── */}
      {product.howItWorks.length > 0 && (
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--ed-bg)" }}
          aria-label="How it works"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <h2
              className="mb-10 border-b pb-4"
              style={{
                borderColor: "var(--ed-hairline)",
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--ed-ink)",
                letterSpacing: "-0.02em",
                fontFeatureSettings: "'ss01', 'ss02'",
              }}
            >
              How it works
            </h2>
            <ol>
              {product.howItWorks.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-6 border-b py-6 last:border-b-0"
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
                      className="mb-2"
                      style={{
                        fontFamily: "var(--font-newsreader), serif",
                        fontWeight: 500,
                        fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                        color: "var(--ed-ink)",
                      }}
                    >
                      {step.step}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-newsreader), serif",
                        fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                        lineHeight: 1.65,
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
        </section>
      )}

      {/* ── 4. Inputs / Outputs ────────────────────────────── */}
      {(product.inputs.length > 0 || product.outputs.length > 0) && (
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--ed-surface)" }}
          aria-label="Inputs and outputs"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <h2
              className="mb-10 border-b pb-4"
              style={{
                borderColor: "var(--ed-hairline)",
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--ed-ink)",
                letterSpacing: "-0.02em",
                fontFeatureSettings: "'ss01', 'ss02'",
              }}
            >
              Inputs &amp; Outputs
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
              {product.inputs.length > 0 && (
                <div>
                  <p
                    className="mb-5 text-[10px] uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-mono), monospace", color: "var(--ed-ink-muted)" }}
                  >
                    What it takes in
                  </p>
                  <ul className="space-y-0">
                    {product.inputs.map((inp, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between gap-4 border-b py-3 last:border-b-0"
                        style={{ borderColor: "var(--ed-hairline)" }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-newsreader), serif",
                            fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                            color: "var(--ed-ink)",
                            lineHeight: 1.4,
                          }}
                        >
                          {inp.label}
                        </span>
                        {inp.format && (
                          <span
                            className="shrink-0 rounded-sm border px-2 py-0.5 text-[10px]"
                            style={{
                              fontFamily: "var(--font-mono), monospace",
                              borderColor: "var(--ed-hairline)",
                              color: "var(--ed-ink-muted)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {inp.format}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.outputs.length > 0 && (
                <div>
                  <p
                    className="mb-5 text-[10px] uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-mono), monospace", color: "var(--ed-ink-muted)" }}
                  >
                    What it sends out
                  </p>
                  <ul className="space-y-0">
                    {product.outputs.map((out, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between gap-4 border-b py-3 last:border-b-0"
                        style={{ borderColor: "var(--ed-hairline)" }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-newsreader), serif",
                            fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                            color: "var(--ed-ink)",
                            lineHeight: 1.4,
                          }}
                        >
                          {out.label}
                        </span>
                        {out.format && (
                          <span
                            className="shrink-0 rounded-sm border px-2 py-0.5 text-[10px]"
                            style={{
                              fontFamily: "var(--font-mono), monospace",
                              borderColor: "var(--ed-hairline)",
                              color: "var(--ed-ink-muted)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {out.format}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Use cases ───────────────────────────────────── */}
      {product.useCases.length > 0 && (
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--ed-bg)" }}
          aria-label="Use cases"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <h2
              className="mb-10 border-b pb-4"
              style={{
                borderColor: "var(--ed-hairline)",
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--ed-ink)",
                letterSpacing: "-0.02em",
                fontFeatureSettings: "'ss01', 'ss02'",
              }}
            >
              Use cases
            </h2>
            <ul className="space-y-0">
              {product.useCases.map((uc, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-4 border-b py-4 last:border-b-0"
                  style={{ borderColor: "var(--ed-hairline)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "11px",
                      color: "var(--ed-ink-muted)",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                      lineHeight: 1.5,
                      color: "var(--ed-ink-secondary)",
                      fontFeatureSettings: "'ss01'",
                    }}
                  >
                    {uc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 6. Linked case study ───────────────────────────── */}
      {linkedCaseStudy && (
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--ed-surface)" }}
          aria-label="Linked engagement"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <h2
              className="mb-8 border-b pb-4"
              style={{
                borderColor: "var(--ed-hairline)",
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--ed-ink)",
                letterSpacing: "-0.02em",
                fontFeatureSettings: "'ss01', 'ss02'",
              }}
            >
              Linked engagement
            </h2>
            <Link
              href={`/case-studies/${linkedCaseStudy.slug}`}
              className="group flex max-w-2xl flex-col gap-3 border p-8 transition-opacity duration-200 hover:opacity-70"
              style={{
                borderColor: "var(--ed-hairline)",
                background: "var(--ed-bg)",
                textDecoration: "none",
              }}
            >
              {linkedCaseStudy.metric && (
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 800,
                    fontSize: "3rem",
                    color: "var(--ed-brand-blue)",
                    letterSpacing: "-0.04em",
                    fontFeatureSettings: "'ss01'",
                  }}
                >
                  {linkedCaseStudy.metric}
                </span>
              )}
              <h3
                style={{
                  fontFamily: "var(--font-newsreader), serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  color: "var(--ed-ink)",
                  lineHeight: 1.3,
                }}
              >
                {linkedCaseStudy.title}
              </h3>
              {linkedCaseStudy.oneLine && (
                <p
                  style={{
                    fontFamily: "var(--font-newsreader), serif",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    color: "var(--ed-ink-secondary)",
                  }}
                >
                  {linkedCaseStudy.oneLine}
                </p>
              )}
              <span
                className="mt-2"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--ed-ink-muted)",
                }}
              >
                Read the full case study →
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ── 7. Related works ───────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section
          className="py-20 md:py-28"
          style={{ background: "var(--ed-bg)" }}
          aria-label="Related works"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
            <h2
              className="mb-10 border-b pb-4"
              style={{
                borderColor: "var(--ed-hairline)",
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--ed-ink)",
                letterSpacing: "-0.02em",
                fontFeatureSettings: "'ss01', 'ss02'",
              }}
            >
              Related works
            </h2>
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((related, i) => (
                <Link
                  key={related.slug}
                  href={`/products/${related.slug}`}
                  className="block border-r p-6 transition-opacity duration-200 hover:opacity-70 last:border-r-0"
                  style={{
                    borderColor: "var(--ed-hairline)",
                    textDecoration: "none",
                  }}
                >
                  <p
                    className="mb-2"
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                      color: "var(--ed-ink)",
                      lineHeight: 1.2,
                      fontFeatureSettings: "'ss01'",
                    }}
                  >
                    {related.name}
                  </p>
                  <p
                    className="mb-3 text-[13px] leading-relaxed"
                    style={{
                      fontFamily: "var(--font-newsreader), serif",
                      fontStyle: "italic",
                      color: "var(--ed-ink-secondary)",
                    }}
                  >
                    {related.tagline}
                  </p>
                  <span
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      color: "var(--ed-ink-muted)",
                    }}
                  >
                    {related.category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. Closing CTA strip ───────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--ed-surface)" }}
        aria-label="Call to action"
      >
        <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-12">
          <h2
            className="mx-auto mb-5"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 500,
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--ed-ink)",
              fontFeatureSettings: "'ss01', 'ss02'",
              maxWidth: "30ch",
            }}
          >
            {product.cta.heading}
          </h2>
          <p
            className="mx-auto mb-8"
            style={{
              fontFamily: "var(--font-newsreader), serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              lineHeight: 1.5,
              color: "var(--ed-ink-secondary)",
              maxWidth: "52ch",
            }}
          >
            {product.cta.subcopy}
          </p>
          <Link
            href={product.cta.buttonHref}
            className="inline-flex items-center gap-2 border px-8 py-4 transition-all duration-200 hover:opacity-70"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "var(--ed-surface)",
              background: "var(--ed-ink)",
              borderColor: "var(--ed-ink)",
              fontFeatureSettings: "'ss01'",
            }}
          >
            {product.cta.buttonLabel} →
          </Link>
        </div>
      </section>
    </article>
  );
}
