import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

// Title with template: "Contact | Preisser Solutions" = 28 chars — clean,
// direct, unambiguous for Google's sitelink ranker. The old marketing-y title
// ("Start Your Kansas Tech Project") was confusing the sitelink algorithm.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Preisser Solutions for AI automation, custom software, and SEO in Hays, Kansas.",
  alternates: {
    canonical: "https://preissersolutions.com/contact",
  },
  openGraph: {
    siteName: "Preisser Solutions",
    title: "Contact Preisser Solutions | Start Your Custom Software Project",
    description:
      "Get in touch with Tyler Preisser to discuss your custom website, web application, AI automation, or dashboard project. Based in Hays, Kansas. Fast response guaranteed.",
    url: "https://preissersolutions.com/contact",
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Preisser Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Preisser Solutions | Start Your Custom Software Project",
    description:
      "Get in touch with Tyler Preisser to discuss your custom website, web application, AI automation, or dashboard project. Based in Hays, Kansas. Fast response guaranteed.",
    images: ["/images/og-image-v2.jpg"],
    creator: "@preissersolutions",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
