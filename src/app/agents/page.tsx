import type { Metadata } from "next";
import { AgentShop } from "@/components/agents/AgentShop";
import { agents } from "@/data/agents";

const url = "https://preissersolutions.com/agents";

export const metadata: Metadata = {
  title: "Agents | Preisser Solutions",
  description:
    "Production-grade AI agents built from real client engagements — packaged capabilities you can deploy.",
  alternates: { canonical: url },
  openGraph: {
    title: "Agents | Preisser Solutions",
    description:
      "Production-grade AI agents built from real client engagements — packaged capabilities you can deploy.",
    url,
    type: "website",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agents | Preisser Solutions",
    description:
      "Production-grade AI agents built from real client engagements — packaged capabilities you can deploy.",
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  return <AgentShop agents={agents} />;
}
