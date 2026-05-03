import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Preisser Tech. Tell us what you need built, fixed, or improved — no commitment, no sales pitch. Based in Hays, Kansas, serving businesses statewide.",
  alternates: {
    canonical: "https://preissertech.com/contact",
  },
  openGraph: {
    title: "Contact | Preisser Tech",
    description:
      "Start a project with Preisser Tech. Tell us what you need built, fixed, or improved — no commitment, no sales pitch. Based in Hays, Kansas, serving businesses statewide.",
    url: "https://preissertech.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
