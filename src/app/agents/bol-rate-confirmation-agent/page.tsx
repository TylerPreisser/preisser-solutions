import type { Metadata } from "next";
import { AgentDetailPage } from "@/components/agents/AgentDetailPage";
import { agent } from "@/data/agents/bol-rate-confirmation-agent";
import { getAgent } from "@/data/agents";
import { getCaseStudy } from "@/data/case-studies/index";

const url = `https://preissersolutions.com/agents/${agent.slug}`;

export const metadata: Metadata = {
  title: agent.metaTitle,
  description: agent.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    title: agent.metaTitle,
    description: agent.metaDescription,
    url,
    type: "website",
    images: [
      { url: "/images/og-image-v2.jpg", width: 1200, height: 630, alt: agent.h1 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: agent.metaTitle,
    description: agent.metaDescription,
    images: ["/images/og-image-v2.jpg"],
  },
};

export default function Page() {
  const relatedAgents = agent.relatedSlugs
    .map((slug) => getAgent(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const cs = agent.linkedCaseStudySlug ? getCaseStudy(agent.linkedCaseStudySlug) : null;
  const linkedCaseStudy = cs
    ? { slug: cs.slug, title: cs.h1, oneLine: cs.oneLine, metric: cs.headlineResults[0]?.value }
    : null;

  return (
    <AgentDetailPage
      agent={agent}
      relatedAgents={relatedAgents}
      linkedCaseStudy={linkedCaseStudy}
    />
  );
}
