"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function Colophon() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-28 md:py-36"
      style={{ background: "var(--ed-surface)" }}
      id="commission"
      aria-label="Commission a custom work"
    >
      {/* Heavy top hairline */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{ background: "var(--ed-ink)", opacity: 0.6 }}
      />

      <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-12">
        {/* Appendix label */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--ed-ink-muted)",
            }}
          >
            APPENDIX B — COMMISSION A WORK
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ed-ink-muted)",
          }}
        >
          Custom builds
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8"
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--ed-ink)",
            fontFeatureSettings: "'ss01', 'ss02'",
            maxWidth: "22ch",
          }}
        >
          Have a problem we haven&apos;t packaged yet?
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-12"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            lineHeight: 1.5,
            color: "var(--ed-ink-secondary)",
            maxWidth: "52ch",
          }}
        >
          The most interesting agents come from the weirdest asks. Bring us what you can&apos;t find in this catalog.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/contact?inquiry=custom-product"
            className="inline-flex items-center gap-2 border px-8 py-4 transition-all duration-200 hover:opacity-70"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontWeight: 500,
              fontStyle: "italic",
              fontSize: "1.1rem",
              letterSpacing: "-0.01em",
              color: "var(--ed-surface)",
              background: "var(--ed-ink)",
              borderColor: "var(--ed-ink)",
              fontFeatureSettings: "'ss01'",
            }}
          >
            Send us the brief →
          </Link>
        </motion.div>

        {/* Catalog colophon */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 border-t pt-8"
          style={{
            borderColor: "var(--ed-hairline)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ed-ink-muted)",
          }}
        >
          Catalog Vol.01 &middot; Compiled 2026-05 &middot; Hays, Kansas
        </motion.p>
      </div>
    </section>
  );
}
