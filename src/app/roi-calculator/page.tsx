import type { Metadata } from "next";
import { RoiCalculatorPageClient } from "@/components/roi/RoiCalculatorPageClient";

// Title with template: "Estimate Automation ROI for Your Business | Preisser Tech" = 57 chars ✓
export const metadata: Metadata = {
  title: "Estimate Automation ROI for Your Business",
  description:
    "Calculate how much time and money your business could save with custom automation. Enter your team size and roles — get an instant estimate from Preisser Tech in Hays, Kansas.",
  alternates: {
    canonical: "https://preissertech.com/roi-calculator",
  },
  openGraph: {
    title: "Automation ROI Calculator | Estimate Your Annual Savings",
    description:
      "Calculate how much time and money your business could save with custom automation. Enter your team size and roles — get an instant estimate from Preisser Tech in Hays, Kansas.",
    url: "https://preissertech.com/roi-calculator",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Tech — Automation ROI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation ROI Calculator | Estimate Your Annual Savings",
    description:
      "Calculate how much time and money your business could save with custom automation. Enter your team size and roles — get an instant estimate from Preisser Tech in Hays, Kansas.",
    images: ["/images/og-image-v2.jpg"],
    creator: "@preissertech",
  },
};

export default function RoiCalculatorPage() {
  return <RoiCalculatorPageClient />;
}
