import type { Metadata } from "next";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { products } from "@/data/products";

const url = "https://preissersolutions.com/products";

export const metadata: Metadata = {
  title: "Products | Preisser Solutions",
  description:
    "Production-grade AI products built from real client engagements — packaged capabilities you can deploy.",
  alternates: { canonical: url },
  openGraph: {
    title: "Products | Preisser Solutions",
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
    title: "Products | Preisser Solutions",
    description:
      "Production-grade AI products built from real client engagements — packaged capabilities you can deploy.",
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  return <ProductCatalog products={products} />;
}
