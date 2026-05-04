import type { Metadata } from "next";
import { AeoPage } from "@/components/aeo/AeoPage";
import { pageData } from "@/data/aeo/locations/russell-kansas";

export const metadata: Metadata = {
  title: pageData.metaTitle.includes("Preisser Tech") ? { absolute: pageData.metaTitle } : pageData.metaTitle,
  description: pageData.metaDescription,
  alternates: { canonical: `https://preissertech.com/${pageData.slug}` },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `https://preissertech.com/${pageData.slug}`,
    type: "website",
    images: [{ url: "/images/og-image-v2.jpg", width: 1200, height: 630, alt: "Preisser Tech" }],
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
