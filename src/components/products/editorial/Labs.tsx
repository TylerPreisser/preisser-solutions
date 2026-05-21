"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ProductData } from "@/types/product";

interface LabsProps {
  products: ProductData[];
}

export function Labs({ products }: LabsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-28 md:py-36"
      style={{ background: "var(--ed-bg)" }}
      id="labs"
      aria-label="Labs — work in progress"
    >
      {/* Heavy top hairline */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{ background: "var(--ed-ink)", opacity: 0.6 }}
      />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--ed-ink-muted)",
            }}
          >
            APPENDIX A — THE LABS
          </span>
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            lineHeight: 1.25,
            color: "var(--ed-ink-secondary)",
            fontFeatureSettings: "'ss01', 'ss02'",
          }}
        >
          Work in progress. Two specimens, currently incubating.
        </motion.p>

        {/* Side-by-side lab cards */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {products.map((lab, i) => (
            <motion.div
              key={lab.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t pt-8"
              style={{ borderColor: "var(--ed-hairline)" }}
            >
              {/* Breathing dot indicator */}
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full ed-pulse"
                  style={{ background: "var(--ed-mint)" }}
                  aria-label="In progress"
                />
                <span
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    color: "var(--ed-ink-muted)",
                  }}
                >
                  Incubating
                </span>
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--ed-ink)",
                  fontFeatureSettings: "'ss01', 'ss02'",
                }}
              >
                <Link
                  href={`/products/${lab.slug}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  className="hover:opacity-70 transition-opacity duration-200"
                >
                  {lab.name}
                </Link>
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-newsreader), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--ed-ink-secondary)",
                }}
              >
                {lab.tagline}
              </p>

              <Link
                href="/contact?inquiry=labs"
                className="mt-6 inline-flex items-center transition-opacity duration-150 hover:opacity-60"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--ed-ink-muted)",
                  textDecoration: "none",
                }}
              >
                Want this finished sooner? Tell us. →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
