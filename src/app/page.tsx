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
    absolute: "Preisser Tech | AI Picks You First. Built in Kansas.",
  },
  description:
    "We custom-code your website onto servers designed for AI agents, get you indexed on every AI registry, and use AI to organically maximize your AI presence. Nobody else in Kansas is doing this. Built in Hays, Kansas by Tyler Preisser.",
  alternates: {
    canonical: "https://preissertech.com/",
  },
  openGraph: {
    title: "Preisser Tech | AI Picks You First. Built in Kansas.",
    description:
      "We custom-code your website onto servers designed for AI agents, get you indexed on every AI registry, and use AI to organically maximize your AI presence. Nobody else in Kansas is doing this. Built in Hays, Kansas by Tyler Preisser.",
    url: "https://preissertech.com/",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Tech | AI Picks You First. Built in Kansas.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Tech | AI Picks You First. Built in Kansas.",
    description:
      "We custom-code your website onto servers designed for AI agents, get you indexed on every AI registry, and use AI to organically maximize your AI presence. Nobody else in Kansas is doing this. Built in Hays, Kansas by Tyler Preisser.",
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
      <MarCommandCallout />
      <TechPartners />
      <WhyUs />
      <CaseStudies />
      <CtaSection />
    </>
  );
}
