import type { Metadata } from "next";
import { CaseStudiesCatalog } from "@/components/case-study/CaseStudiesCatalog";
import type { CaseStudySummary } from "@/components/case-study/CaseStudiesCatalog";
import { JsonLd } from "@/components/seo/JsonLd";
import { caseStudies } from "@/data/case-studies/index";

const url = "https://preissersolutions.com/case-studies";

export const metadata: Metadata = {
  title: "Case Studies — Preisser Solutions",
  description:
    "Real Preisser Solutions case studies: AI automation, custom software, dashboards, websites, AI document processing, and internal agent systems.",
  alternates: { canonical: url },
  openGraph: {
    title: "Case Studies — Preisser Solutions",
    description:
      "Real client and internal case studies from Preisser Solutions, organized by category with direct links to every full case study.",
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
      "Real client and internal case studies from Preisser Solutions.",
    images: ["/images/og-image-v2.jpg"],
  },
};

function toCaseStudySummary(): CaseStudySummary[] {
  return caseStudies.map((study) => ({
    slug: study.slug,
    category: study.category,
    group: study.category.split("•")[0].trim(),
    clientNameDisplay: study.clientNameDisplay,
    h1: study.h1,
    oneLine: study.oneLine,
    industry: study.industry,
    metric: study.headlineResults[0],
  }));
}

export default function Page() {
  const summaries = toCaseStudySummary();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: "Case Studies — Preisser Solutions",
    description:
      "Real Preisser Solutions case studies across AI automation, custom software, AI document processing, dashboards, websites, internal platforms, and custom agent builds.",
    inLanguage: "en-US",
    isPartOf: { "@id": "https://preissersolutions.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: summaries.length,
      itemListElement: summaries.map((study, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${url}/${study.slug}`,
        name: study.h1,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Are the Preisser Solutions case studies real?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The case-study catalog contains real client engagements, internal Preisser Solutions platforms, capability builds, proofs of concept, and website builds. Named clients are named where consented; confidential work is described by industry and operating model.",
        },
      },
      {
        "@type": "Question",
        name: "Does this page preserve AEO and GEO signals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The page keeps canonical metadata, CollectionPage schema, FAQ schema, breadcrumb schema, and crawlable links to every full case-study page.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://preissersolutions.com" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[collectionSchema, faqSchema, breadcrumbSchema]} />
      <CaseStudiesCatalog caseStudies={summaries} />
    </>
  );
}
