import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { caseStudy } from "@/data/case-studies/nwks-encounter";

// Canonical URL matches the data file's slug.
//
// This route was a 301 to /case-studies between 2026-08-03 and this commit,
// pulled with C3 Studio when neither was finished. The redirect is gone from
// public/_redirects and the slug is off the sitemap exclusion list, because the
// engagement shipped: both Encounters now run registration and administration
// on it, live on the ministry's own domain since the 2026-08-19 cutover.
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
