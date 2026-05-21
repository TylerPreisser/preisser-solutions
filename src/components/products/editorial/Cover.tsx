"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ProductData } from "@/types/product";

interface CoverProps {
  featured: ProductData;
  totalProducts: number;
  labsCount: number;
}

export function Cover({ featured, totalProducts, labsCount }: CoverProps) {
  const reduceMotion = useReducedMotion();
  const mainCount = totalProducts - labsCount;

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--ed-bg)" }}
      aria-label="Products catalog cover"
    >
      {/* Faint ruled grid background */}
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

      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "var(--ed-hairline)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-24 pt-32 lg:px-12 lg:pt-36">
        {/* Masthead row */}
        <motion.div
          className="mb-20 flex items-center justify-between"
          {...fadeUp(0.1)}
        >
          <span
            className="text-[11px] tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--ed-ink-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            PREISSER SOLUTIONS
          </span>
          <span
            className="text-[11px] tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--ed-ink-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            VOL.01 / 2026
          </span>
          <span
            className="text-[11px] tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--ed-ink-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            HAYS, KS
          </span>
        </motion.div>

        {/* Main cover layout: left third title + right third feature */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-12">
          {/* Left 2/3: Display headline */}
          <div className="lg:col-span-2">
            {/* Divider em-dash */}
            <motion.div {...fadeUp(0.15)}>
              <h1>
                <span
                  className="block leading-none tracking-tight"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 750,
                    fontStyle: "italic",
                    fontSize: "clamp(5rem, 18vw, 22rem)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.045em",
                    color: "var(--ed-ink)",
                    fontFeatureSettings: "'ss01', 'ss02'",
                  }}
                >
                  WORKS
                </span>
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.22)} className="my-8">
              <div
                className="h-px w-full max-w-xl"
                style={{ background: "var(--ed-ink)", opacity: 0.7 }}
                aria-hidden="true"
              />
            </motion.div>

            <motion.p
              {...fadeUp(0.28)}
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.75rem, 4vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "var(--ed-ink-secondary)",
                fontFeatureSettings: "'ss01', 'ss02'",
                maxWidth: "22ch",
              }}
            >
              A catalog of engineered capabilities.
            </motion.p>

            {/* Bottom colophon strip */}
            <motion.div
              {...fadeUp(0.35)}
              className="mt-16 border-t pt-6"
              style={{ borderColor: "var(--ed-hairline)" }}
            >
              <p
                className="text-[11px] tracking-[0.18em] uppercase"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  color: "var(--ed-ink-muted)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {mainCount} PRODUCTS &nbsp;+&nbsp; {labsCount} LABS &nbsp;+&nbsp; ONE OPEN CALL
              </p>
              <p
                className="mt-2 text-[11px] tracking-[0.14em]"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  color: "var(--ed-ink-muted)",
                }}
              >
                Edited by Tyler Preisser
              </p>
            </motion.div>
          </div>

          {/* Right 1/3: Featured product — MarCommand */}
          <motion.aside
            {...fadeUp(0.4)}
            className="hidden self-end lg:flex lg:flex-col"
          >
            <div
              className="border-t pt-8"
              style={{ borderColor: "var(--ed-ink)" }}
            >
              <p
                className="mb-6 text-[10px] uppercase tracking-[0.22em]"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  color: "var(--ed-ink-muted)",
                }}
              >
                Featured — Flagship
              </p>

              <p
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 600,
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                  color: "var(--ed-ink)",
                  fontFeatureSettings: "'ss01', 'ss02'",
                }}
              >
                {featured.name}
              </p>

              {featured.headlineMetric && (
                <div className="mt-6">
                  <span
                    className="block leading-none"
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontWeight: 800,
                      fontSize: "4.5rem",
                      color: "var(--ed-brand-blue)",
                      letterSpacing: "-0.04em",
                      fontFeatureSettings: "'ss01'",
                    }}
                  >
                    {featured.headlineMetric.value}
                  </span>
                  <span
                    className="mt-1 block text-[11px] uppercase tracking-[0.16em]"
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      color: "var(--ed-ink-muted)",
                    }}
                  >
                    {featured.headlineMetric.label}
                  </span>
                </div>
              )}

              <p
                className="mt-5 text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-newsreader), serif",
                  fontStyle: "italic",
                  color: "var(--ed-ink-secondary)",
                }}
              >
                {featured.tagline}
              </p>

              <Link
                href={`/products/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-2 transition-opacity duration-150 hover:opacity-60"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--ed-ink)",
                  textDecoration: "none",
                }}
              >
                Read entry →
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--ed-hairline)" }}
      />
    </section>
  );
}
