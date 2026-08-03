import type { Metadata } from "next";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { productSummaries } from "@/data/products";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

const url = "https://preissersolutions.com/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Production-grade AI products built from real client engagements — packaged capabilities you can deploy.",
  alternates: { canonical: url },
  openGraph: {
    title: "Products",
    description:
      "Production-grade AI products built from real client engagements — packaged capabilities you can deploy.",
    url,
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products",
    description:
      "Production-grade AI products built from real client engagements — packaged capabilities you can deploy.",
    images: ["/images/og-image-v2.jpg"],
  },
};

// Home > Products. The hub sat at depth 1 with no BreadcrumbList while every
// product detail page had one, so the trail broke at its own parent.
const breadcrumbSchema = buildBreadcrumbs([{ name: "Products", url }]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ProductCatalog products={productSummaries} />
    </>
  );
}
