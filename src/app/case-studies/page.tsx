import type { Metadata } from "next";
import { CaseStudiesHub } from "@/components/case-study/CaseStudiesHub";
import { caseStudySummaries } from "@/data/case-studies/index";

const url = "https://preissersolutions.com/case-studies";

export const metadata: Metadata = {
  title: "Case Studies — Preisser Solutions",
  description:
    "Named-client outcomes from Preisser Solutions — HVAC reactivation, oil and gas operations, insurance AI, transportation dashboards, media brands, and AI commerce.",
  alternates: { canonical: url },
  openGraph: {
    title: "Case Studies — Preisser Solutions",
    description:
      "What was broken, what we built, and what changed — real engagements across farming, oil and gas, insurance, transportation, HVAC, ministry, and media.",
    url,
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Preisser Solutions",
    description:
      "What was broken, what we built, and what changed — real engagements from Preisser Solutions.",
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  return <CaseStudiesHub caseStudies={caseStudySummaries} />;
}
