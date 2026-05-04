import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

// Title with template: "Contact Us — Start Your Kansas Tech Project | Preisser Tech" = 59 chars ✓
export const metadata: Metadata = {
  title: "Contact Us — Start Your Kansas Tech Project",
  description:
    "Get in touch with Tyler Preisser to discuss your custom website, web application, AI automation, or dashboard project. Based in Hays, Kansas. Fast response guaranteed.",
  alternates: {
    canonical: "https://preissertech.com/contact",
  },
  openGraph: {
    title: "Contact Preisser Tech | Start Your Custom Software Project",
    description:
      "Get in touch with Tyler Preisser to discuss your custom website, web application, AI automation, or dashboard project. Based in Hays, Kansas. Fast response guaranteed.",
    url: "https://preissertech.com/contact",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Preisser Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Preisser Tech | Start Your Custom Software Project",
    description:
      "Get in touch with Tyler Preisser to discuss your custom website, web application, AI automation, or dashboard project. Based in Hays, Kansas. Fast response guaranteed.",
    images: ["/images/og-image-v2.jpg"],
    creator: "@preissertech",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
