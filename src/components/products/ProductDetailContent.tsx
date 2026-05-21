"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProductVisual } from "@/components/products/ProductVisual";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductData, ProductStatus } from "@/types/product";

interface LinkedCaseStudy {
  slug: string;
  title: string;
  oneLine?: string;
  metric?: string;
}

interface Props {
  product: ProductData;
  relatedProducts: ProductData[];
  linkedCaseStudy?: LinkedCaseStudy | null;
}

const STATUS_CONFIG: Record<ProductStatus, { label: string; color: string; dot: string }> = {
  production:           { label: "LIVE",  color: "#00D4AA", dot: "#00D4AA" },
  deployable:           { label: "READY", color: "#0D95E8", dot: "#0D95E8" },
  "proof-of-concept":   { label: "LAB",   color: "#80E9FF", dot: "#80E9FF" },
  service:              { label: "SVC",   color: "#94A3B8", dot: "#94A3B8" },
};

export function ProductDetailContent({ product, relatedProducts, linkedCaseStudy }: Props) {
  const reduceMotion = useReducedMotion();
  const status = STATUS_CONFIG[product.status];

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--theme-section-switchable)" }}
      >
        {/* Ambient glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#0D95E8] opacity-[0.1] blur-[120px]" />
          <div className="absolute top-40 -right-20 h-[400px] w-[400px] rounded-full bg-[#80E9FF] opacity-[0.07] blur-[100px]" />
        </div>

        <div className="ps-container relative pt-36 pb-16 lg:pt-44 lg:pb-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20"
          >
            {/* Left: Visual + identity */}
            <div>
              {/* Category + Status */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
                  style={{
                    borderColor: "var(--theme-card-border)",
                    background: "var(--theme-card-bg)",
                    color: "var(--color-primary)",
                  }}
                >
                  {product.category}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em]"
                  style={{
                    background: "var(--theme-card-bg)",
                    border: `1px solid ${status.dot}40`,
                    color: status.color,
                  }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: status.dot }} />
                  {status.label}
                </span>
              </div>

              {/* H1 */}
              <h1 className="mb-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] sm:text-4xl md:text-5xl">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary) 40%, #80E9FF 100%)" }}
                >
                  {product.h1}
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className="mb-6 text-pretty text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                {product.subheadline}
              </p>

              {/* Headline metric */}
              {product.headlineMetric && (
                <div
                  className="mb-8 inline-flex items-baseline gap-2 rounded-xl border px-5 py-3"
                  style={{
                    borderColor: "rgba(13,149,232,0.2)",
                    background: "rgba(13,149,232,0.06)",
                  }}
                >
                  <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--color-primary)" }}>
                    {product.headlineMetric.value}
                  </span>
                  <span className="text-sm" style={{ color: "var(--theme-text-secondary)" }}>
                    {product.headlineMetric.label}
                  </span>
                </div>
              )}

              {/* Visual */}
              <div
                className="overflow-hidden rounded-2xl border"
                style={{
                  borderColor: "var(--theme-card-border)",
                  height: "280px",
                }}
              >
                <ProductVisual
                  slug={product.slug}
                  category={product.category}
                  size="hero"
                  className="h-full w-full"
                />
              </div>
            </div>

            {/* Right: CTAs + case study + industries */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              {/* Primary CTA */}
              <div
                className="rounded-2xl border p-6"
                style={{
                  borderColor: "var(--theme-card-border)",
                  background: "var(--theme-card-bg)",
                }}
              >
                <h2
                  className="mb-2 text-lg font-semibold leading-snug"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {product.cta.heading}
                </h2>
                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  {product.cta.subcopy}
                </p>
                <Link
                  href={product.cta.buttonHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(13,149,232,0.3)]"
                  style={{ background: "var(--color-primary)" }}
                >
                  {product.cta.buttonLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Linked case study */}
              {linkedCaseStudy && (
                <Link
                  href={`/case-studies/${linkedCaseStudy.slug}`}
                  className="group rounded-2xl border p-5 transition-all duration-200 hover:border-[#0D95E8]/30 hover:shadow-[0_12px_30px_-8px_rgba(13,149,232,0.12)]"
                  style={{
                    borderColor: "var(--theme-card-border)",
                    background: "var(--theme-card-bg)",
                  }}
                >
                  <div className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--theme-text-muted)" }}>
                    Case Study
                  </div>
                  {linkedCaseStudy.metric && (
                    <div
                      className="mb-1 text-2xl font-bold tracking-tight"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {linkedCaseStudy.metric}
                    </div>
                  )}
                  <div className="text-[15px] font-semibold leading-snug" style={{ color: "var(--theme-text-primary)" }}>
                    {linkedCaseStudy.title}
                  </div>
                  {linkedCaseStudy.oneLine && (
                    <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                      {linkedCaseStudy.oneLine}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[#0D95E8] transition-all duration-200 group-hover:gap-2 group-hover:text-[#80E9FF]">
                    Read the full case study
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )}

              {/* Industries */}
              {product.industries.length > 0 && (
                <div
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: "var(--theme-card-border)",
                    background: "var(--theme-card-bg)",
                  }}
                >
                  <div className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--theme-text-muted)" }}>
                    Industries
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.industries.map((ind) => (
                      <span
                        key={ind}
                        className="rounded-full border px-3 py-1 text-[12px] font-medium"
                        style={{
                          borderColor: "var(--theme-card-border)",
                          background: "var(--theme-bg-card)",
                          color: "var(--theme-text-secondary)",
                        }}
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body sections ─────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "var(--theme-section-alt)" }}
      >
        <div className="ps-container">
          <div className="mx-auto max-w-3xl">

            {/* What it does */}
            <div className="mb-16">
              <SectionEyebrow>What it does</SectionEyebrow>
              <div className="space-y-5">
                {product.whatItDoes.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed sm:text-[17px]" style={{ color: "var(--theme-text-secondary)" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="mb-16">
              <SectionEyebrow>Capabilities</SectionEyebrow>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.capabilities.map((cap) => (
                  <div
                    key={cap.title}
                    className="rounded-xl border p-5"
                    style={{
                      borderColor: "var(--theme-card-border)",
                      background: "var(--theme-card-bg)",
                    }}
                  >
                    <div
                      className="mb-2 text-[13px] font-semibold uppercase tracking-[0.06em]"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {cap.title}
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="mb-16">
              <SectionEyebrow>How it works</SectionEyebrow>
              <ol className="space-y-6">
                {product.howItWorks.map((step, i) => (
                  <li key={step.step} className="flex gap-5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold"
                      style={{
                        borderColor: "rgba(13,149,232,0.3)",
                        background: "rgba(13,149,232,0.08)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div className="mb-1 text-[14px] font-semibold capitalize" style={{ color: "var(--theme-text-primary)" }}>
                        {step.step}
                      </div>
                      <p className="text-[13px] leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Inputs / Outputs */}
            <div className="mb-16">
              <SectionEyebrow>Inputs &amp; Outputs</SectionEyebrow>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Inputs */}
                <div
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--theme-card-border)", background: "var(--theme-card-bg)" }}
                >
                  <div className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--theme-text-muted)" }}>
                    Inputs
                  </div>
                  <ul className="space-y-3">
                    {product.inputs.map((inp) => (
                      <li key={inp.label} className="flex items-start justify-between gap-3">
                        <span className="text-[13px] leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                          {inp.label}
                        </span>
                        {inp.format && (
                          <span
                            className="shrink-0 rounded border px-2 py-0.5 font-mono text-[10px]"
                            style={{
                              borderColor: "var(--theme-card-border)",
                              background: "var(--theme-bg-card)",
                              color: "var(--theme-text-muted)",
                            }}
                          >
                            {inp.format}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outputs */}
                <div
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--theme-card-border)", background: "var(--theme-card-bg)" }}
                >
                  <div className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--theme-text-muted)" }}>
                    Outputs
                  </div>
                  <ul className="space-y-3">
                    {product.outputs.map((out) => (
                      <li key={out.label} className="flex items-start justify-between gap-3">
                        <span className="text-[13px] leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                          {out.label}
                        </span>
                        {out.format && (
                          <span
                            className="shrink-0 rounded border px-2 py-0.5 font-mono text-[10px]"
                            style={{
                              borderColor: "var(--theme-card-border)",
                              background: "var(--theme-bg-card)",
                              color: "var(--theme-text-muted)",
                            }}
                          >
                            {out.format}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Use cases */}
            <div className="mb-16">
              <SectionEyebrow>Use cases</SectionEyebrow>
              <ul className="space-y-3">
                {product.useCases.map((uc, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--color-primary)" }}
                    />
                    <span className="text-[14px] leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                      {uc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="mb-0">
              <SectionEyebrow>Tech stack</SectionEyebrow>
              <div className="flex flex-wrap gap-2">
                {product.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border px-3.5 py-1.5 font-mono text-[12px] font-medium"
                    style={{
                      borderColor: "var(--theme-card-border)",
                      background: "var(--theme-card-bg)",
                      color: "var(--theme-text-secondary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Related products ─────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section
          className="py-20"
          style={{ background: "var(--theme-section-switchable)" }}
        >
          <div className="ps-container">
            <div className="mb-8 flex items-center gap-4">
              <div
                className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Related Products
              </div>
              <div className="h-px flex-1" style={{ background: "var(--theme-card-border)" }} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((rp, idx) => (
                <ProductCard key={rp.slug} product={rp} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "var(--theme-section-alt)" }}
      >
        <div className="ps-container">
          <div
            className="relative overflow-hidden rounded-2xl border px-8 py-10 sm:px-12 sm:py-14"
            style={{
              borderColor: "var(--theme-card-border)",
              background: "var(--theme-card-bg)",
            }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0D95E8] opacity-[0.08] blur-[80px]" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--theme-text-muted)" }}>
                  Custom Builds
                </div>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl" style={{ color: "var(--theme-text-primary)" }}>
                  Don&apos;t see what you need?
                </h2>
                <p className="mt-2 max-w-lg text-base leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                  Every listed product started as a custom engagement. If your problem isn&apos;t covered, describe it — Preisser Solutions scopes and builds to spec.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/contact?inquiry=custom-product"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(13,149,232,0.3)]"
                  style={{ background: "var(--color-primary)" }}
                >
                  Send us the brief
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Section heading helper ─────────────────────────────────────────────────
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-6 text-xl font-semibold leading-snug tracking-tight sm:text-2xl"
      style={{ color: "var(--theme-text-primary)" }}
    >
      {children}
    </h2>
  );
}
