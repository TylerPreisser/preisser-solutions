import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Automate Your Business",
  description:
    "Why Kansas businesses automate repetitive work: fewer errors, freed-up staff, and growth without new headcount. The case for business automation.",
  alternates: {
    canonical: "https://preissersolutions.com/why-automation",
  },
  openGraph: {
    siteName: "Preisser Solutions",
    title: "Why Automate Your Business",
    description:
      "Why Kansas businesses automate repetitive work: fewer errors, freed-up staff, and growth without new headcount. The case for business automation.",
    url: "https://preissersolutions.com/why-automation",
    type: "website",
    images: [
      { url: "/images/og-image-v2.jpg", width: 1200, height: 630, alt: "Preisser Solutions" },
    ],
  },
};

export default function WhyAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
