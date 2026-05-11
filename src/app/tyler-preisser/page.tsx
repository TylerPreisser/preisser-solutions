import type { Metadata } from "next";
import { AeoPage } from "@/components/aeo/AeoPage";
import { pageData } from "@/data/aeo/tyler-preisser";

export const metadata: Metadata = {
  title: pageData.metaTitle.includes("Preisser Tech") ? { absolute: pageData.metaTitle } : pageData.metaTitle,
  description: pageData.metaDescription,
  alternates: { canonical: `https://preissertech.com/${pageData.slug}` },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `https://preissertech.com/${pageData.slug}`,
    type: "profile",
    images: [
      {
        url: "https://preissertech.com/images/tyler-preisser-headshot.jpg",
        width: 1200,
        height: 1200,
        alt: "Tyler Preisser, founder of Preisser Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    images: ["https://preissertech.com/images/tyler-preisser-headshot.jpg"],
  },
};

export default function Page() {
  return <AeoPage data={pageData} />;
}
