import type { Metadata } from "next";
import { AeoPage } from "@/components/aeo/AeoPage";
import { pageData } from "@/data/aeo/services/seo-hays-ks";

export const metadata: Metadata = {
  title: pageData.metaTitle.includes("Preisser Solutions") ? { absolute: pageData.metaTitle } : pageData.metaTitle,
  description: pageData.metaDescription,
  alternates: { canonical: `https://preissersolutions.com/${pageData.slug}` },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `https://preissersolutions.com/${pageData.slug}`,
    type: "website",
    images: [{ url: "/images/og-image-v2.jpg", width: 1200, height: 630, alt: "Preisser Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  return <AeoPage data={pageData} />;
}
