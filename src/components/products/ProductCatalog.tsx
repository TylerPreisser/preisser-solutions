"use client";

import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { ProductData } from "@/types/product";

interface ProductCatalogProps {
  products: ProductData[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
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
    <>
      <JsonLd data={collectionSchema} />
      <ProductGrid products={products} />
    </>
  );
}
