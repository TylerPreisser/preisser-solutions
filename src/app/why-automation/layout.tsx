import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Automate Your Business",
  description:
    "Discover why Kansas businesses are automating repetitive work — reduce errors, free your team, and scale without adding headcount. The case for business automation, explained.",
  alternates: {
    canonical: "https://preissertech.com/why-automation",
  },
  openGraph: {
    title: "Why Automate Your Business | Preisser Technology",
    description:
      "Discover why Kansas businesses are automating repetitive work — reduce errors, free your team, and scale without adding headcount. The case for business automation, explained.",
    url: "https://preissertech.com/why-automation",
  },
};

export default function WhyAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
