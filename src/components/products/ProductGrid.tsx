"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductVisual } from "@/components/products/ProductVisual";
import type { ProductData, ProductCategory } from "@/types/product";
import { PRODUCT_CATEGORIES } from "@/data/products";

interface Props {
  products: ProductData[];
}

// Filter labels — "All" + each category + "Labs" if not already present
const ALL_FILTER_LABELS = ["All", ...PRODUCT_CATEGORIES];

// Category order for grouped display (Labs handled separately below)
const MAIN_CATEGORIES: ProductCategory[] = [
  "Revenue & Marketing",
  "Operations & Back-Office",
  "Sales & Lead Capture",
  "Intelligence & Decision Support",
  "Flagship Platforms",
  "Custom & Infrastructure",
];

const CATEGORY_SHORT: Record<ProductCategory, string> = {
  "Revenue & Marketing":            "REVENUE & MARKETING",
  "Operations & Back-Office":       "OPERATIONS & BACK-OFFICE",
  "Sales & Lead Capture":           "SALES & LEAD CAPTURE",
  "Intelligence & Decision Support":"INTELLIGENCE & DECISION SUPPORT",
  "Flagship Platforms":             "FLAGSHIP PLATFORMS",
  "Custom & Infrastructure":        "CUSTOM & INFRASTRUCTURE",
  Labs:                             "LABS",
};

export function ProductGrid({ products }: Props) {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const labsProducts = useMemo(() => products.filter((p) => p.category === "Labs"), [products]);
  const mainProducts = useMemo(() => products.filter((p) => p.category !== "Labs"), [products]);

  // When a category filter is active, flatten to a single visible list
  // When "All", group by category for the section headers
  const isFiltered = activeFilter !== "All";

  const filteredMain = useMemo(() => {
    if (!isFiltered) return mainProducts;
    return mainProducts.filter((p) => p.category === activeFilter);
  }, [mainProducts, activeFilter, isFiltered]);

  const filteredLabs = useMemo(() => {
    if (activeFilter === "All" || activeFilter === "Labs") return labsProducts;
    return [];
  }, [labsProducts, activeFilter]);

  // Flat list for animating individual cards when filtered
  const flatFiltered = useMemo(() => {
    if (!isFiltered) return [];
    return [...filteredMain, ...(activeFilter === "Labs" ? labsProducts : [])];
  }, [isFiltered, filteredMain, labsProducts, activeFilter]);

  // Available categories (only show chip if products exist in it)
  const availableCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ALL_FILTER_LABELS.filter((f) => f === "All" || cats.has(f as ProductCategory));
  }, [products]);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--theme-section-switchable)" }}
      >
        {/* Ambient glow blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#0D95E8] opacity-[0.12] blur-[120px]" />
          <div className="absolute top-40 -right-32 h-[420px] w-[420px] rounded-full bg-[#80E9FF] opacity-[0.08] blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#00D4AA] opacity-[0.06] blur-[100px]" />
        </div>

        {/* Grid overlay */}
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
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{
                border: "1px solid var(--theme-card-border)",
                background: "var(--theme-card-bg)",
                color: "var(--color-primary)",
              }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0D95E8]" />
              Products
            </div>

            {/* H1 */}
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.07] tracking-[-0.025em] sm:text-5xl md:text-6xl">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary) 30%, #80E9FF 100%)" }}
              >
                Engineered capabilities.
              </span>
            </h1>

            {/* Subhead */}
            <p
              className="mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Sixteen production-grade AI agents, built from real engagements. Pick one and scope it for your business.
            </p>

            {/* Stats strip */}
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 sm:mt-12">
              <div>
                <div
                  className="bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  {mainProducts.length + labsProducts.length}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--theme-text-muted)" }}>
                  Products
                </div>
              </div>
              <div className="h-10 w-px self-end" style={{ background: "var(--theme-card-border)" }} />
              <div>
                <div
                  className="bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--theme-text-primary), #80E9FF)" }}
                >
                  {MAIN_CATEGORIES.length}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--theme-text-muted)" }}>
                  Categories
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
          </motion.div>
        </div>
      </section>

      {/* ── Grid + Filters ────────────────────────────────────── */}
      <section
        className="pb-28 pt-10"
        style={{ background: "var(--theme-section-alt)" }}
      >
        <div className="ps-container">
          {/* Filter chips */}
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {availableCategories.map((f) => {
              const active = f === activeFilter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className="inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150"
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

          {/* ── FILTERED VIEW — flat grid ── */}
          {isFiltered ? (
            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {flatFiltered.map((product, idx) => (
                  <ProductCard key={product.slug} product={product} index={idx} />
                ))}
              </AnimatePresence>
              {flatFiltered.length === 0 && (
                <div
                  className="col-span-full py-16 text-center text-base"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  No products in this category yet.
                </div>
              )}
            </motion.div>
          ) : (
            /* ── ALL VIEW — grouped by category ── */
            <div className="space-y-16">
              {MAIN_CATEGORIES.map((cat) => {
                const catProducts = mainProducts.filter((p) => p.category === cat);
                if (catProducts.length === 0) return null;
                return (
                  <div key={cat}>
                    {/* Category header */}
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
                        style={{ color: "var(--theme-text-muted)" }}
                      >
                        {CATEGORY_SHORT[cat]} &middot; {catProducts.length} {catProducts.length === 1 ? "PRODUCT" : "PRODUCTS"}
                      </div>
                      <div className="h-px flex-1" style={{ background: "var(--theme-card-border)" }} />
                    </div>

                    {/* Cards */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {catProducts.map((product, idx) => (
                        <ProductCard
                          key={product.slug}
                          product={product}
                          index={mainProducts.indexOf(product)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* ── Labs appendix ── */}
              {labsProducts.length > 0 && (
                <div>
                  {/* Labs divider */}
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      APPENDIX — LABS &middot; {labsProducts.length} {labsProducts.length === 1 ? "ITEM" : "ITEMS"}
                    </div>
                    <div className="h-px flex-1" style={{ background: "var(--theme-card-border)" }} />
                  </div>

                  {/* Labs description */}
                  <p
                    className="mb-7 max-w-xl text-[13px] leading-relaxed"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    Experimental builds — architected and functional, not yet hardened for production deployment.
                  </p>

                  {/* Labs cards (slightly smaller, dashed treatment) */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {labsProducts.map((product, idx) => (
                      <ProductCard
                        key={product.slug}
                        product={product}
                        index={mainProducts.length + idx}
                      />
                    ))}
                  </div>
                </div>
              )}
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
            {/* Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0D95E8] opacity-[0.08] blur-[80px]"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div
                  className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: "var(--theme-text-muted)" }}
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
