import type { Metadata } from "next";
import { AeoPage } from "@/components/aeo/AeoPage";
import { pageData } from "@/data/aeo/tyler-preisser";

export const metadata: Metadata = {
  title: pageData.metaTitle.includes("Preisser Solutions") ? { absolute: pageData.metaTitle } : pageData.metaTitle,
  description: pageData.metaDescription,
  alternates: { canonical: `https://preissersolutions.com/${pageData.slug}` },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `https://preissersolutions.com/${pageData.slug}`,
    type: "profile",
    images: [
      {
        url: "https://preissersolutions.com/images/tyler-preisser-headshot.jpg",
        width: 1200,
        height: 1200,
        alt: "Tyler Preisser, founder of Preisser Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    images: ["https://preissersolutions.com/images/tyler-preisser-headshot.jpg"],
  },
};

export default function Page() {
  return <AeoPage data={pageData} />;
}
