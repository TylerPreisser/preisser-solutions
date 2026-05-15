import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Get a Free Hays Visibility Audit",
  description:
    "Request a free Hays Visibility Audit from Preisser Solutions. Review Google visibility, website conversion, reviews, competitors, and lead follow-up.",
  alternates: {
    canonical: "https://preissersolutions.com/contact",
  },
  openGraph: {
    title: "Get a Free Hays Visibility Audit | Preisser Solutions",
    description:
      "Request a free Hays Visibility Audit from Preisser Solutions. Review Google visibility, website conversion, reviews, competitors, and lead follow-up.",
    url: "https://preissersolutions.com/contact",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Get a Free Hays Visibility Audit from Preisser Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Free Hays Visibility Audit | Preisser Solutions",
    description:
      "Request a free Hays Visibility Audit from Preisser Solutions. Review Google visibility, website conversion, reviews, competitors, and lead follow-up.",
    images: ["/images/og-image-v2.jpg"],
    creator: "Tyler Preisser",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
