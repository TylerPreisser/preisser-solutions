"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProductData } from "@/types/product";
import { SpreadTemplateA } from "./SpreadTemplateA";
import { SpreadTemplateB } from "./SpreadTemplateB";
import { SpreadTemplateC } from "./SpreadTemplateC";

export type SpreadTemplate = "A" | "B" | "C";

interface SpreadProps {
  product: ProductData;
  template: SpreadTemplate;
  pageNumber: number;
  spreadIndex: number;
}

export function Spread({ product, template, pageNumber, spreadIndex }: SpreadProps) {
  const reduceMotion = useReducedMotion();
  const pageStr = `pg.${String(pageNumber).padStart(2, "0")}`;

  return (
    <section
      id={`product-${product.slug}`}
      className="relative"
      style={{
        background: spreadIndex % 2 === 0 ? "var(--ed-bg)" : "var(--ed-surface)",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}
      aria-label={product.name}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {template === "A" && (
          <SpreadTemplateA product={product} pageNumber={pageStr} />
        )}
        {template === "B" && (
          <SpreadTemplateB product={product} pageNumber={pageStr} spreadIndex={spreadIndex} />
        )}
        {template === "C" && (
          <SpreadTemplateC product={product} pageNumber={pageStr} />
        )}
      </motion.div>
    </section>
  );
}
