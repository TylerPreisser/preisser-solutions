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
      "Real engagements, real outcomes. Eight publishable case studies spanning HVAC, oil and gas, insurance, transportation, media, and AI commerce.",
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
      "Real engagements, real outcomes. Eight publishable case studies from Preisser Solutions.",
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  return <CaseStudiesHub caseStudies={caseStudySummaries} />;
}
