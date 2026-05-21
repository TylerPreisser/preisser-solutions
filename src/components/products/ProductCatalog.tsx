"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductData, ProductCategory } from "@/types/product";

interface ProductCatalogProps {
  products: ProductData[];
}

const ALL_CATEGORIES: ProductCategory[] = [
  "Revenue & Marketing",
  "Operations & Back-Office",
  "Sales & Lead Capture",
  "Intelligence & Decision Support",
  "Flagship Platforms",
  "Custom & Infrastructure",
  "Labs",
];

type FilterValue = ProductCategory | "All";

export function ProductCatalog({ products }: ProductCatalogProps) {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter((p) => p.category === activeFilter);
  }, [products, activeFilter]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://preissersolutions.com/products#collection",
    url: "https://preissersolutions.com/products",
    name: "Product Catalog — Preisser Solutions",
    description:
      "Production-grade AI products built from real client engagements. Each product is a packaged capability — scope it for your business and deploy.",
    inLanguage: "en-US",
    isPartOf: { "@id": "https://preissersolutions.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://preissersolutions.com/products/${p.slug}`,
        name: p.name,
      })),
    },
  };

  return (
    <div>
      <JsonLd data={collectionSchema} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--theme-bg-primary)" }}
      >
        {/* Ambient gradient blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <div
            className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[140px]"
            style={{ background: "#0D95E8", opacity: 0.15 }}
          />
          <div
            className="absolute top-48 -right-32 h-[480px] w-[480px] rounded-full blur-[120px]"
            style={{ background: "#00D4AA", opacity: 0.08 }}
          />
        </div>

        {/* Subtle grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <div className="ps-container relative pt-40 pb-24 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-36">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow chip */}
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em]"
              style={{
                borderColor: "rgba(128,233,255,0.18)",
                background: "rgba(128,233,255,0.06)",
                color: "#80E9FF",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#80E9FF" }}
              />
              Product Catalog
            </div>

            {/* H1 */}
            <h1
              className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-6xl md:text-7xl"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Products you can deploy.
            </h1>

            {/* Subheadline */}
            <p
              className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Production-grade products built from real client engagements. Each one is a packaged
              capability — pick one, scope it for your business, and deploy.
            </p>

            {/* Stat strip */}
            <div className="mt-16 flex flex-wrap items-end gap-x-12 gap-y-6 md:mt-20">
              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #ffffff 0%, #80E9FF 100%)",
                  }}
                >
                  {products.length}
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Available products
                </div>
              </div>

              <div
                className="h-12 w-px self-end"
                style={{ background: "var(--theme-border)" }}
              />

              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #ffffff 0%, #80E9FF 100%)",
                  }}
                >
                  {ALL_CATEGORIES.length}
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Capability categories
                </div>
              </div>

              <div
                className="h-12 w-px self-end"
                style={{ background: "var(--theme-border)" }}
              />

              <div>
                <div
                  className="bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #ffffff 0%, #80E9FF 100%)",
                  }}
                >
                  100%
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-[0.14em]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  From real builds
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filters + Grid ────────────────────────────────── */}
      <section
        className="relative pb-32 pt-20 md:pt-24"
        style={{ background: "var(--theme-section-alt)" }}
      >
        <div className="ps-container">
          {/* Filter heading */}
          <div
            className="mb-3 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Filter by category
          </div>

          {/* Filter chips */}
          <div className="mb-12 flex flex-wrap items-center gap-2">
            {(["All", ...ALL_CATEGORIES] as FilterValue[]).map((f) => {
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
                          background: "var(--theme-text-primary)",
                          borderColor: "var(--theme-text-primary)",
                          color: "var(--theme-bg-primary)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
                        }
                      : {
                          background: "var(--theme-card-bg)",
                          borderColor: "var(--theme-card-border)",
                          color: "var(--theme-text-secondary)",
                        }
                  }
                  aria-pressed={active}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(i * 0.05, 0.35),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProductCard product={product} accentIndex={i} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="mx-auto max-w-md py-16 text-center"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              No products match this filter yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
