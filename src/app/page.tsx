import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TechPartners } from "@/components/home/tech-partners";
import { ValueStrip } from "@/components/home/value-strip";
import { ServicePillars } from "@/components/home/service-pillars";
import { WhyUs } from "@/components/home/why-us";
import { CaseStudies } from "@/components/home/case-studies";
import { CtaSection } from "@/components/home/cta-section";

// Homepage metadata — bypasses the layout title template to avoid duplication.
// Title: 55 chars — within Bing/Google optimal 50-60 range.
export const metadata: Metadata = {
  title: {
    absolute: "Preisser Tech | Custom Software & AI Automation, Kansas",
  },
  description:
    "Custom websites, web applications, AI automation, and real-time business dashboards built specifically for small and mid-sized companies in Kansas. Founded by Tyler Preisser, Hays, KS.",
  alternates: {
    canonical: "https://preissertech.com/",
  },
  openGraph: {
    title: "Preisser Tech | Custom Software & AI Automation, Kansas",
    description:
      "Custom websites, web applications, AI automation, and real-time business dashboards built specifically for small and mid-sized companies in Kansas. Founded by Tyler Preisser, Hays, KS.",
    url: "https://preissertech.com/",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Tech | Custom Software & AI Automation, Kansas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Tech | Custom Software & AI Automation, Kansas",
    description:
      "Custom websites, web applications, AI automation, and real-time business dashboards built specifically for small and mid-sized companies in Kansas. Founded by Tyler Preisser, Hays, KS.",
    images: ["/images/og-image-v2.jpg"],
    creator: "@preissertech",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <ServicePillars />
      <TechPartners />
      <WhyUs />
      <CaseStudies />
      <CtaSection />
    </>
  );
}
