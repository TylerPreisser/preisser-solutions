import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TechPartners } from "@/components/home/tech-partners";
import { ValueStrip } from "@/components/home/value-strip";
import { ServicePillars } from "@/components/home/service-pillars";
import { MarCommandCallout } from "@/components/home/marcommand-callout";
import { WhyUs } from "@/components/home/why-us";
import { CaseStudies } from "@/components/home/case-studies";
import { CtaSection } from "@/components/home/cta-section";

// Homepage metadata — bypasses the layout title template to avoid duplication.
// Title: 52 chars — within Bing/Google optimal 50-60 range.
export const metadata: Metadata = {
  title: {
    absolute: "Preisser Solutions | Hays KS Marketing, Websites, SEO & AI Automation",
  },
  description:
    "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, and AI automation.",
  alternates: {
    canonical: "https://preissersolutions.com/",
  },
  openGraph: {
    title: "Preisser Solutions | Hays KS Marketing, Websites, SEO & AI Automation",
    description:
      "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, and AI automation.",
    url: "https://preissersolutions.com/",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions | Hays KS Marketing, Websites, SEO & AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Solutions | Hays KS Marketing, Websites, SEO & AI Automation",
    description:
      "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, and AI automation.",
    images: ["/images/og-image-v2.jpg"],
    creator: "Tyler Preisser",
  },
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://preissersolutions.com/#webpage-home",
  url: "https://preissersolutions.com/",
  name: "Preisser Solutions | Hays KS Marketing, Websites, SEO & AI Automation",
  description:
    "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, and AI automation.",
  isPartOf: { "@id": "https://preissersolutions.com/#website" },
  about: { "@id": "https://preissersolutions.com/#organization" },
  author: { "@id": "https://preissersolutions.com/#tyler-preisser" },
  publisher: { "@id": "https://preissersolutions.com/#organization" },
  inLanguage: "en-US",
  dateModified: "2026-05-14",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://preissersolutions.com/",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <Hero />
      <ValueStrip />
      <ServicePillars />
      <TechPartners />
      <MarCommandCallout />
      <WhyUs />
      <CaseStudies />
      <CtaSection />
    </>
  );
}
