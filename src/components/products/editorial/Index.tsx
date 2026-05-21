"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProductData, ProductCategory } from "@/types/product";

const CATEGORIES: ProductCategory[] = [
  "Revenue & Marketing",
  "Operations & Back-Office",
  "Sales & Lead Capture",
  "Intelligence & Decision Support",
  "Flagship Platforms",
  "Custom & Infrastructure",
];

const STATUS_LABELS: Record<string, string> = {
  production: "Production",
  deployable: "Deployable",
  "proof-of-concept": "Lab",
  service: "Service",
};

interface IndexProps {
  products: ProductData[];
}

export function Index({ products }: IndexProps) {
  const reduceMotion = useReducedMotion();

  // Only non-labs in the main index
  const mainProducts = products.filter((p) => p.category !== "Labs");

  // Assign page numbers (starts at pg.04, increments by 2)
  const pageMap: Record<string, string> = {};
  mainProducts.forEach((p, i) => {
    pageMap[p.slug] = `pg.${String(4 + i * 2).padStart(2, "0")}`;
  });

  return (
    <section
      className="relative py-28 md:py-36"
      style={{ background: "var(--ed-surface)" }}
      id="catalog-index"
      aria-label="Product catalog index"
    >
      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "var(--ed-hairline)" }}
      />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section eyebrow */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3"
        >
          <span
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: "var(--ed-ink-muted)",
            }}
          >
            01 — INDEX
          </span>
        </motion.div>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "var(--ed-ink)",
            fontFeatureSettings: "'ss01', 'ss02'",
          }}
        >
          The Index
        </motion.h2>

        {/* TOC grouped by category */}
        {CATEGORIES.map((category, catIdx) => {
          const catProducts = mainProducts.filter((p) => p.category === category);
          if (catProducts.length === 0) return null;

          return (
            <div key={category} className={catIdx > 0 ? "mt-12" : ""}>
              {/* Category header */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mb-4 pb-2 border-b"
                style={{ borderColor: "var(--ed-hairline)" }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.24em]"
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    color: "var(--ed-ink-muted)",
                  }}
                >
                  {category}
                </span>
              </motion.div>

              {/* Entries */}
              {catProducts.map((product, productIdx) => {
                const entryNum = String(mainProducts.indexOf(product) + 1).padStart(2, "0");
                const pageNum = pageMap[product.slug];

                return (
                  <motion.div
                    key={product.slug}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.45,
                      delay: productIdx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={`#product-${product.slug}`}
                      className="group flex items-baseline gap-5 py-4 transition-none"
                      style={{ textDecoration: "none" }}
                      aria-label={`Navigate to ${product.name}`}
                    >
                      {/* Number */}
                      <span
                        className="shrink-0 w-12 leading-none"
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: "clamp(18px, 2.5vw, 26px)",
                          color: "var(--ed-ink-muted)",
                          fontVariantNumeric: "tabular-nums",
                          fontWeight: 400,
                        }}
                      >
                        {entryNum}
                      </span>

                      {/* Name + meta */}
                      <div className="flex-1 min-w-0">
                        <span
                          className="block leading-tight transition-all duration-200 group-hover:translate-x-2"
                          style={{
                            fontFamily: "var(--font-newsreader), serif",
                            fontWeight: 500,
                            fontSize: "clamp(16px, 2vw, 22px)",
                            color: "var(--ed-ink)",
                          }}
                        >
                          {product.name}
                        </span>
                        <span
                          className="mt-0.5 block text-[11px] uppercase tracking-[0.14em] transition-opacity duration-200 group-hover:opacity-60"
                          style={{
                            fontFamily: "var(--font-mono), monospace",
                            color: "var(--ed-ink-secondary)",
                          }}
                        >
                          {STATUS_LABELS[product.status] ?? product.status}
                        </span>
                      </div>

                      {/* Page number */}
                      <span
                        className="shrink-0 transition-opacity duration-200 group-hover:opacity-60"
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: "12px",
                          color: "var(--ed-ink-muted)",
                          fontVariantNumeric: "tabular-nums",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {pageNum}
                      </span>
                    </a>

                    {/* Entry hairline */}
                    <div
                      className="h-px w-full"
                      style={{ background: "var(--ed-hairline)" }}
                      aria-hidden="true"
                    />
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
