import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Preisser Solutions. Tell us what you need built, fixed, or improved — no commitment, no sales pitch. Based in Hays, Kansas, serving businesses statewide.",
  alternates: {
    canonical: "https://preissersolutions.com/contact",
  },
  openGraph: {
    title: "Contact | Preisser Solutions",
    description:
      "Start a project with Preisser Solutions. Tell us what you need built, fixed, or improved — no commitment, no sales pitch. Based in Hays, Kansas, serving businesses statewide.",
    url: "https://preissersolutions.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
