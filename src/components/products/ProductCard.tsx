/**
 * ProductCard — Pure server component. No "use client", no Framer Motion.
 *
 * Hover effects are CSS-only (:hover + transition).
 * Stagger fade-in on initial load is CSS-only via --card-index custom property
 * and animation-delay in globals.css (.product-card).
 * Category filtering is CSS-only via data-category attribute on the root div
 * and .products-grid[data-active-category="..."] rules in globals.css.
 */

import Link from "next/link";
import { ProductVisual } from "@/components/products/ProductVisual";
import type { ProductSummary, ProductStatus, ProductCategory } from "@/types/product";

interface Props {
  product: ProductSummary;
  /** Card index within its visible set — drives CSS animation stagger delay */
  index: number;
}

/**
 * These stay the vivid brand colours on purpose.
 *
 * The status pill is painted on `rgba(10,22,40,0.75)` — a dark translucent
 * chip over the card visual — in BOTH themes, so these light values are the
 * high-contrast choice here. Do not "fix" them to the darkened
 * --theme-accent-text tokens: those are for text on a light surface, and on
 * this dark pill they would be the low-contrast option.
 */
const STATUS_CONFIG: Record<ProductStatus, { label: string; color: string; dot: string }> = {
  production:           { label: "LIVE",  color: "#00D4AA", dot: "#00D4AA" },
  deployable:           { label: "READY", color: "#1590FF", dot: "#1590FF" },
  "proof-of-concept":   { label: "LAB",   color: "#80E9FF", dot: "#80E9FF" },
  service:              { label: "SVC",   color: "#94A3B8", dot: "#94A3B8" },
};

/**
 * Map display category names to slug-form for data-category attribute.
 * Must match the values used in .products-grid CSS filter rules in globals.css.
 */
const CATEGORY_SLUG: Record<ProductCategory, string> = {
  "Marketing & Growth":       "marketing-growth",
  "Operations & Back-Office": "operations-back-office",
  "Sales & Customer Service": "sales-customer-service",
  "Decision Intelligence":    "decision-intelligence",
  "Custom Builds":            "custom-builds",
};

export function ProductCard({ product, index }: Props) {
  const status = STATUS_CONFIG[product.status];
  const categorySlug = CATEGORY_SLUG[product.category];
  // Cap stagger delay at 10 cards so late items don't wait forever
  const staggerDelay = Math.min(index * 40, 400);

  return (
    <div
      className="product-card"
      data-category={categorySlug}
      style={{ "--card-index": index, animationDelay: `${staggerDelay}ms` } as React.CSSProperties}
    >
      <Link
        href={`/products/${product.slug}`}
        prefetch={false}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(21,144,255,0.18)]"
        style={{
          borderColor: "var(--theme-card-border)",
          background: "var(--theme-result-card-bg)",
        }}
        aria-label={`${product.name} ${product.tagline}`}
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
                // 0.95, not 0.75. At 0.75 this pill composites to ~#47505E over
                // a light card, where READY (#1590FF) is 2.52:1 and SVC is
                // 3.18:1. Near-opaque also makes the badge legible over ANY
                // product artwork behind it rather than only the light ones.
                background: "rgba(10,22,40,0.95)",
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
            className="mb-2 text-[15px] font-semibold leading-snug transition-colors duration-200 group-hover:[color:var(--theme-accent-text)]"
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
                style={{ color: "var(--theme-accent-text)" }}
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
          <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium [color:var(--theme-accent-text)] transition-all duration-200 group-hover:gap-2 group-hover:[color:var(--theme-accent-text)]">
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
    </div>
  );
}
