import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { caseStudy } from "@/data/case-studies/tyler-preisser-site";

const url = `https://preissersolutions.com/case-studies/${caseStudy.slug}`;

export const metadata: Metadata = {
  title: caseStudy.metaTitle,
  description: caseStudy.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    siteName: "Preisser Solutions",
    title: caseStudy.metaTitle,
    description: caseStudy.metaDescription,
    url,
    type: "article",
    publishedTime: caseStudy.datePublished,
    modifiedTime: caseStudy.dateModified,
    images: [
      { url: "/images/og-image-v2.jpg", width: 1200, height: 630, alt: caseStudy.h1 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: caseStudy.metaTitle,
    description: caseStudy.metaDescription,
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  return <CaseStudyPage data={caseStudy} />;
}
