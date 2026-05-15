import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description:
    "Estimate how much time and money business automation could save your Kansas company each year. Select your roles, adjust headcount and compensation, and see your potential savings.",
  alternates: {
    canonical: "https://preissersolutions.com/roi-calculator",
  },
  openGraph: {
    title: "ROI Calculator | Preisser Solutions",
    description:
      "Estimate how much time and money business automation could save your Kansas company each year. Select your roles, adjust headcount and compensation, and see your potential savings.",
    url: "https://preissersolutions.com/roi-calculator",
  },
};

export default function RoiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
