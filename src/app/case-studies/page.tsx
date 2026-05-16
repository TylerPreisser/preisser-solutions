import type { Metadata } from "next";
import { AeoPage } from "@/components/aeo/AeoPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageData } from "@/data/aeo/case-studies/index";

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

// R-section-6 — ItemList schema covering every published case study.
// The 4 directive-named individual case-study routes (cassidy-hvac-customer-reactivation,
// hg-oil-operations-automation, iron-and-oak-custom-website, wife-supply-ai-commerce) do
// not exist as separate canonical routes here — the existing canonical slugs (cassidy-hvac,
// hg-oil-holdings, iron-and-oak-podcast, wife-supply-co) are kept as the canonical URLs.
// Phase 3f handles any new slug aliases. ItemList below references the canonical slugs.
const caseStudiesItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://preissersolutions.com/case-studies#itemlist",
  name: "Preisser Solutions case studies",
  itemListOrder: "https://schema.org/ItemListUnordered",
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      url: "https://preissersolutions.com/case-studies/cassidy-hvac",
      name: "Cassidy HVAC — AI Marketing Engine + Customer Reactivation",
    },
    {
      "@type": "ListItem",
      position: 2,
      url: "https://preissersolutions.com/case-studies/hg-oil-holdings",
      name: "HG Oil Holdings — Inventory Management + AI Invoicing",
    },
    {
      "@type": "ListItem",
      position: 3,
      url: "https://preissersolutions.com/case-studies/iron-and-oak-podcast",
      name: "Iron and Oak Podcast — Custom Cinematic Media Website",
    },
    {
      "@type": "ListItem",
      position: 4,
      url: "https://preissersolutions.com/case-studies/wife-supply-co",
      name: "Wife Supply Co — AI Commerce Platform",
    },
    {
      "@type": "ListItem",
      position: 5,
      url: "https://preissersolutions.com/case-studies/astrus-insurance",
      name: "Western Kansas Insurance Agency — Custom CRM",
    },
    {
      "@type": "ListItem",
      position: 6,
      url: "https://preissersolutions.com/case-studies/sunrise-transportation",
      name: "Kansas Trucking Operator — Ops Automation",
    },
    {
      "@type": "ListItem",
      position: 7,
      url: "https://preissersolutions.com/case-studies/customer-reactivation",
      name: "Customer Reactivation Engine — Playbook",
    },
    {
      "@type": "ListItem",
      position: 8,
      url: "https://preissersolutions.com/case-studies/marcommand-engine",
      name: "MarCommand — Multi-Agent Marketing Engine",
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={caseStudiesItemList} />
      <AeoPage data={pageData} />
    </>
  );
}
