import type { Metadata } from "next";
import { RoiCalculatorPageClient } from "@/components/roi/RoiCalculatorPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

// Home > Automation ROI Calculator. Name matches the page title exactly, which
// is what Google's breadcrumb guidance asks for.
const breadcrumbSchema = buildBreadcrumbs([
  {
    name: "Automation ROI Calculator",
    url: "https://preissersolutions.com/roi-calculator",
  },
]);

// Title with template: "Automation ROI Calculator | Preisser Solutions" = 46 chars ✓
export const metadata: Metadata = {
  title: "Automation ROI Calculator",
  description:
    "Estimate the time and money custom automation could save your business. Enter your team size and roles for an instant annual savings figure.",
  alternates: {
    canonical: "https://preissersolutions.com/roi-calculator",
  },
  openGraph: {
    siteName: "Preisser Solutions",
    title: "Automation ROI Calculator | Estimate Your Annual Savings",
    description:
      "Estimate the time and money custom automation could save your business. Enter your team size and roles for an instant annual savings figure.",
    url: "https://preissersolutions.com/roi-calculator",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions Automation ROI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation ROI Calculator | Estimate Your Annual Savings",
    description:
      "Estimate the time and money custom automation could save your business. Enter your team size and roles for an instant annual savings figure.",
    images: ["/images/og-image-v2.jpg"],
    creator: "@preissersolutions",
  },
};

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <RoiCalculatorPageClient />
    </>
  );
}
