"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProductVisual } from "@/components/products/ProductVisual";
import type { ProductData, ProductStatus } from "@/types/product";

interface Props {
  product: ProductData;
  index: number;
}

const STATUS_CONFIG: Record<ProductStatus, { label: string; color: string; dot: string }> = {
  production:           { label: "LIVE",  color: "#00D4AA", dot: "#00D4AA" },
  deployable:           { label: "READY", color: "#0D95E8", dot: "#0D95E8" },
  "proof-of-concept":   { label: "LAB",   color: "#80E9FF", dot: "#80E9FF" },
  service:              { label: "SVC",   color: "#94A3B8", dot: "#94A3B8" },
};

export function ProductCard({ product, index }: Props) {
  const reduceMotion = useReducedMotion();
  const status = STATUS_CONFIG[product.status];

  return (
    <motion.div
      layout
      layoutId={`product-card-${product.slug}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        opacity:  { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        y:        { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        delay: Math.min(index * 0.05, 0.35),
      }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(13,149,232,0.18)]"
        style={{
          borderColor: "var(--theme-card-border)",
          background: "var(--theme-result-card-bg)",
        }}
        aria-label={`${product.name} — ${product.tagline}`}
      >
        {/* ── Visual area (top 200px) ── */}
        <div
          className="relative overflow-hidden"
          style={{ height: "200px", flexShrink: 0 }}
        >
          <ProductVisual
            slug={product.slug}
            category={product.category}
            size="card"
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Status pill overlaid on visual */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
              style={{
                background: "rgba(10,22,40,0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${status.dot}40`,
                color: status.color,
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: status.dot }}
              />
              {status.label}
            </span>
          </div>
        </div>

        {/* ── Meta area (bottom) ── */}
        <div className="flex flex-1 flex-col p-5">
          {/* Category eyebrow */}
          <div
            className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            {product.category}
          </div>

          {/* Product name */}
          <h3
            className="mb-2 text-[15px] font-semibold leading-snug transition-colors duration-200 group-hover:text-[#80E9FF]"
            style={{ color: "var(--theme-text-primary)" }}
          >
            {product.name}
          </h3>

          {/* Tagline — 2-line clamp */}
          <p
            className="flex-1 text-[13px] leading-relaxed line-clamp-2"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {product.tagline}
          </p>

          {/* Headline metric */}
          {product.headlineMetric && (
            <div
              className="mt-3 flex items-baseline gap-1.5 border-t pt-3"
              style={{ borderColor: "var(--theme-card-border)" }}
            >
              <span
                className="text-xl font-bold leading-none tracking-tight"
                style={{ color: "var(--color-primary)" }}
              >
                {product.headlineMetric.value}
              </span>
              <span
                className="text-[11px] leading-tight"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {product.headlineMetric.label}
              </span>
            </div>
          )}

          {/* Learn more affordance */}
          <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-[#0D95E8] transition-all duration-200 group-hover:gap-2 group-hover:text-[#80E9FF]">
            Learn more
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Hover border glow overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(128,233,255,0.2)",
          }}
        />
      </Link>
    </motion.div>
  );
}
