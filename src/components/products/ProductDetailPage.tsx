"use client";

import { JsonLd } from "@/components/seo/JsonLd";
import { ProductDetailContent } from "@/components/products/ProductDetailContent";
import type { ProductData } from "@/types/product";

interface LinkedCaseStudy {
  slug: string;
  title: string;
  oneLine?: string;
  metric?: string;
}

interface ProductDetailPageProps {
  product: ProductData;
  relatedProducts: ProductData[];
  linkedCaseStudy?: LinkedCaseStudy | null;
}

export function ProductDetailPage({
  product,
  relatedProducts,
  linkedCaseStudy,
}: ProductDetailPageProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://preissersolutions.com/products/${product.slug}#service`,
    name: product.name,
    serviceType: product.category,
    description: product.metaDescription,
    url: `https://preissersolutions.com/products/${product.slug}`,
    category: product.category,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    provider: {
      "@type": "Organization",
      "@id": "https://preissersolutions.com/#organization",
      name: "Preisser Solutions",
      url: "https://preissersolutions.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: "https://preissersolutions.com/products",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `https://preissersolutions.com/products?category=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://preissersolutions.com/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <ProductDetailContent
        product={product}
        relatedProducts={relatedProducts}
        linkedCaseStudy={linkedCaseStudy}
      />
    </>
  );
}
