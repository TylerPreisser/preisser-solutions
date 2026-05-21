import type { Metadata } from "next";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { product } from "@/data/products/social-marketing-agent";
import { getProduct } from "@/data/products";
import { getCaseStudy } from "@/data/case-studies/index";

const url = `https://preissersolutions.com/products/${product.slug}`;

export const metadata: Metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    title: product.metaTitle,
    description: product.metaDescription,
    url,
    type: "website",
    images: [
      { url: "/images/og-image-v2.jpg", width: 1200, height: 630, alt: product.h1 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: product.metaTitle,
    description: product.metaDescription,
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  const relatedProducts = product.relatedSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const cs = product.linkedCaseStudySlug ? getCaseStudy(product.linkedCaseStudySlug) : null;
  const linkedCaseStudy = cs
    ? { slug: cs.slug, title: cs.h1, oneLine: cs.oneLine, metric: cs.headlineResults[0]?.value }
    : null;

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
      linkedCaseStudy={linkedCaseStudy}
    />
  );
}
