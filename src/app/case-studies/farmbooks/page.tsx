import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { caseStudy } from "@/data/case-studies/farmbooks";

const url = `https://preissersolutions.com/case-studies/${caseStudy.slug}`;

// Dedicated share card, not the generic site card. Regenerate with
// `node scripts/generate-og-farmbooks.mjs` if the copy on it changes.
const ogImage = "/images/case-studies/farmbooks-og.jpg";

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
      { url: ogImage, width: 1200, height: 630, alt: caseStudy.h1 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: caseStudy.metaTitle,
    description: caseStudy.metaDescription,
    images: [ogImage],
  },
};

export default function Page() {
  return <CaseStudyPage data={caseStudy} />;
}
