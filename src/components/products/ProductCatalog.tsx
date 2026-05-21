"use client";

import { JsonLd } from "@/components/seo/JsonLd";
import { Cover } from "@/components/products/editorial/Cover";
import { Index } from "@/components/products/editorial/Index";
import { Spread } from "@/components/products/editorial/Spread";
import type { SpreadTemplate } from "@/components/products/editorial/Spread";
import { Labs } from "@/components/products/editorial/Labs";
import { Colophon } from "@/components/products/editorial/Colophon";
import type { ProductData } from "@/types/product";

interface ProductCatalogProps {
  products: ProductData[];
}

// Rotating template assignment: A=1,4,7,10,13,16 | B=2,5,8,11,14 | C=3,6,9,12,15
const TEMPLATE_CYCLE: SpreadTemplate[] = ["A", "B", "C"];

// Featured product: MarCommand (flagship)
const FEATURED_SLUG = "marcommand-engine";

export function ProductCatalog({ products }: ProductCatalogProps) {
  const labsProducts = products.filter((p) => p.category === "Labs");
  const mainProducts = products.filter((p) => p.category !== "Labs");

  const featured = products.find((p) => p.slug === FEATURED_SLUG) ?? mainProducts[0];

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
    <div className="products-editorial">
      <JsonLd data={collectionSchema} />

      {/* Section 1 — Cover */}
      <Cover
        featured={featured}
        totalProducts={products.length}
        labsCount={labsProducts.length}
      />

      {/* Section 2 — Index (TOC) */}
      <Index products={products} />

      {/* Section 3 — The Spreads */}
      {mainProducts.map((product, i) => {
        const template = TEMPLATE_CYCLE[i % 3];
        // Page numbers: start at 4, increment by 2
        const pageNumber = 4 + i * 2;

        return (
          <Spread
            key={product.slug}
            product={product}
            template={template}
            pageNumber={pageNumber}
            spreadIndex={i}
          />
        );
      })}

      {/* Section 4 — Labs */}
      {labsProducts.length > 0 && <Labs products={labsProducts} />}

      {/* Section 5 — Colophon / Open Call */}
      <Colophon />
    </div>
  );
}
