"use client";

/**
 * ProductGrid — ONLY client component in the /products surface.
 *
 * Sole responsibility: hold the active filter string in state and write
 * data-active-category on the wrapper div so CSS can show/hide cards.
 *
 * ALL layout, card rendering, and SVG animations are server-rendered.
 * No Framer Motion. No AnimatePresence. No useEffect. No layout animations.
 * CSS handles filtering (hide/show via .products-grid[data-active-category]).
 * CSS handles SVG ring animations (pv-ring-outer, pv-ring-mid, pv-pulse-inner).
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductSummary, ProductCategory } from "@/types/product";
import { PRODUCT_CATEGORIES } from "@/data/products/constants";

interface Props {
  products: ProductSummary[];
}

const ALL_FILTER_LABELS = ["All", ...PRODUCT_CATEGORIES];

const MAIN_CATEGORIES: ProductCategory[] = [
  "Marketing & Growth",
  "Operations & Back-Office",
  "Sales & Customer Service",
  "Decision Intelligence",
  "Custom Builds",
];

interface CategoryMeta {
  description: string;
  accentColor: string;
}

const CATEGORY_META: Record<ProductCategory, CategoryMeta> = {
  "Marketing & Growth": {
    description: "Agents that find, attract, and re-engage customers.",
    accentColor: "#80E9FF",
  },
  "Operations & Back-Office": {
    description: "Agents that handle the work nobody wants to do manually.",
    accentColor: "#00D4AA",
  },
  "Sales & Customer Service": {
    description: "Agents that catch every inbound and route it intelligently.",
    accentColor: "#0D95E8",
  },
  "Decision Intelligence": {
    description: "Agents that analyze, forecast, and brief you.",
    accentColor: "#6B7FFF",
  },
  "Custom Builds": {
    description: "Bespoke agent engineering for your specific problem.",
    accentColor: "#94A3B8",
  },
};

/**
 * Map display category names to slug-form for data-active-category attribute.
 * Must match the CSS rules in globals.css.
 */
const CATEGORY_TO_SLUG: Record<string, string> = {
  "All":                      "all",
  "Marketing & Growth":       "marketing-growth",
  "Operations & Back-Office": "operations-back-office",
  "Sales & Customer Service": "sales-customer-service",
  "Decision Intelligence":    "decision-intelligence",
  "Custom Builds":            "custom-builds",
};

export function ProductGrid({ products }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const availableCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ALL_FILTER_LABELS.filter((f) => f === "All" || cats.has(f as ProductCategory));
  }, [products]);

  const activeCategorySlug = CATEGORY_TO_SLUG[activeFilter] ?? "all";
  const isFiltered = activeFilter !== "All";

  // For filtered view: get the subset to render
  const filteredProducts = useMemo(() => {
    if (!isFiltered) return products;
    return products.filter((p) => p.category === activeFilter);
  }, [products, activeFilter, isFiltered]);

  return (
    <div className="products-grid" data-active-category={activeCategorySlug}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--theme-section-switchable)" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#0D95E8] opacity-[0.12] blur-[120px]" />
          <div className="absolute top-40 -right-32 h-[420px] w-[420px] rounded-full bg-[#80E9FF] opacity-[0.08] blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#00D4AA] opacity-[0.06] blur-[100px]" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--theme-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--theme-text-primary) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <div className="ps-container relative pt-36 pb-14 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-20">
          {/* H1 */}
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.07] tracking-[-0.025em] sm:text-5xl md:text-6xl">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary) 30%, #80E9FF 100%)" }}
            >
              AI Agent Catalog
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            Sixteen AI agents we&apos;ve built for real clients. Pick one, scope it for your business, and ship it.
          </p>

          {/* Stats strip — 2 stats: agents count + pedigree */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 sm:mt-12">
            <div>
              <div
                className="bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
                style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
              >
                {products.length}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--theme-text-muted)" }}>
                Agents
              </div>
            </div>
            <div className="h-10 w-px self-end" style={{ background: "var(--theme-card-border)" }} />
            <div>
              <div
                className="bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
                style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
              >
                100%
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--theme-text-muted)" }}>
                From real builds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid + Filters ────────────────────────────────────── */}
      <section
        className="pb-28 pt-10"
        style={{ background: "var(--theme-section-alt)" }}
      >
        <div className="ps-container">
          {/* Filter chips
              Desktop (≥768px): flex-wrap centered row.
              Mobile (<768px): single horizontal scroll row with snap points.
              Touch targets min 44px tall (Apple HIG) via min-h on mobile.
              Scrollbar hidden via ps-chips-scroll class in globals.css. */}
          <div className="mb-10">
            <div className="ps-chips-wrapper">
              <div className="ps-chips-scroll">
                {availableCategories.map((f) => {
                  const active = f === activeFilter;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActiveFilter(f)}
                      className="ps-chip"
                      style={
                        active
                          ? {
                              borderColor: "var(--color-primary)",
                              background: "var(--color-primary)",
                              color: "#FFFFFF",
                              boxShadow: "0 8px 30px rgba(13,149,232,0.25)",
                            }
                          : {
                              borderColor: "var(--theme-card-border)",
                              background: "var(--theme-card-bg)",
                              color: "var(--theme-text-secondary)",
                            }
                      }
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── FILTERED VIEW — flat grid ── */}
          {isFiltered ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.slug} product={product} index={idx} />
              ))}
              {filteredProducts.length === 0 && (
                <div
                  className="col-span-full py-16 text-center text-base"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  No products in this category yet.
                </div>
              )}
            </div>
          ) : (
            /* ── ALL VIEW — grouped by category ── */
            <div className="space-y-20">
              {MAIN_CATEGORIES.map((cat) => {
                const catProducts = products.filter((p) => p.category === cat);
                if (catProducts.length === 0) return null;
                const meta = CATEGORY_META[cat];
                return (
                  <div key={cat}>
                    {/* Category header */}
                    <div
                      className="mb-8"
                      style={{ borderTop: "1px solid var(--theme-card-border)", paddingTop: "1.75rem" }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Accent bar */}
                        <div
                          className="mt-1 hidden shrink-0 sm:block"
                          style={{
                            width: "4px",
                            height: "48px",
                            borderRadius: "2px",
                            background: meta.accentColor,
                            opacity: 0.85,
                          }}
                        />
                        <div>
                          <div className="flex items-baseline gap-3">
                            <h2
                              className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl"
                              style={{ color: "var(--theme-text-primary)" }}
                            >
                              {cat}
                            </h2>
                            <span
                              className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
                              style={{ color: "var(--theme-text-muted)" }}
                            >
                              {catProducts.length} {catProducts.length === 1 ? "product" : "products"}
                            </span>
                          </div>
                          <p
                            className="mt-1 text-sm leading-relaxed"
                            style={{ color: "var(--theme-text-secondary)" }}
                          >
                            {meta.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cards */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {catProducts.map((product, idx) => (
                        <ProductCard
                          key={product.slug}
                          product={product}
                          index={products.indexOf(product)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Open Call CTA ─────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "var(--theme-section-switchable)" }}
      >
        <div className="ps-container">
          <div
            className="relative overflow-hidden rounded-2xl border px-8 py-10 sm:px-12 sm:py-14"
            style={{
              borderColor: "var(--theme-card-border)",
              background: "var(--theme-card-bg)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0D95E8] opacity-[0.08] blur-[80px]"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div
                  className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)" }}
                >
                  Custom Builds
                </div>
                <h2
                  className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  Don&apos;t see what you need?
                </h2>
                <p
                  className="mt-2 max-w-lg text-base leading-relaxed"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
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
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
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
