import type { Metadata } from "next";
import { RoiCalculatorPageClient } from "@/components/roi/RoiCalculatorPageClient";

// Title with template: "Estimate Automation ROI for Your Business | Preisser Solutions" = 57 chars ✓
export const metadata: Metadata = {
  title: "Estimate Automation ROI for Your Business",
  description:
    "Calculate how much time and money your business could save with custom automation. Enter your team size and roles — get an instant estimate from Preisser Solutions in Hays, Kansas.",
  alternates: {
    canonical: "https://preissersolutions.com/roi-calculator",
  },
  openGraph: {
    title: "Automation ROI Calculator | Estimate Your Annual Savings",
    description:
      "Calculate how much time and money your business could save with custom automation. Enter your team size and roles — get an instant estimate from Preisser Solutions in Hays, Kansas.",
    url: "https://preissersolutions.com/roi-calculator",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions — Automation ROI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation ROI Calculator | Estimate Your Annual Savings",
    description:
      "Calculate how much time and money your business could save with custom automation. Enter your team size and roles — get an instant estimate from Preisser Solutions in Hays, Kansas.",
    images: ["/images/og-image-v2.jpg"],
    creator: "Tyler Preisser",
  },
};

export default function RoiCalculatorPage() {
  return <RoiCalculatorPageClient />;
}
