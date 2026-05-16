import type { Metadata } from "next";
import Link from "next/link";
import { AeoPage } from "@/components/aeo/AeoPage";
import { pageData } from "@/data/aeo/blog/index";
import { blogManifest } from "@/data/aeo/blog/manifest";

export const metadata: Metadata = {
  title: pageData.metaTitle.includes("Preisser Solutions") ? { absolute: pageData.metaTitle } : pageData.metaTitle,
  description: pageData.metaDescription,
  alternates: { canonical: `https://preissersolutions.com/${pageData.slug}` },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `https://preissersolutions.com/${pageData.slug}`,
    type: "website",
    images: [{ url: "/images/og-image-v2.jpg", width: 1200, height: 630, alt: "Preisser Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    images: ["/images/og-image-v2.jpg"],
  },
};

/**
 * /blog hub.
 *
 * Renders the standard AeoPage shell (hero / answer paragraph / sections /
 * FAQ / CTA) plus a custom post-listing grid between the FAQ and the CTA
 * that surfaces every post from the manifest. We inject the grid by
 * wrapping AeoPage with a sibling section — AeoPage doesn't know about
 * the listing, but they render in document order so the visual flow is
 * intact.
 */
export default function Page() {
  return (
    <>
      <AeoPage data={pageData} />
      <section
        style={{
          background: "#FFFFFF",
          padding: "clamp(60px, 8vw, 100px) 24px",
          borderTop: "1px solid var(--color-border-light, #E2E8F0)",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
              color: "var(--color-text-light-primary, #0A1628)",
            }}
          >
            All posts
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--color-text-light-secondary, #475569)",
              margin: "0 0 40px",
            }}
          >
            {blogManifest.length} posts, organized by topic. Newest first.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {blogManifest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "#FFFFFF",
                  border: "1px solid var(--color-border-light, #E2E8F0)",
                  borderRadius: 16,
                  padding: 24,
                  color: "inherit",
                  boxShadow: "0 2px 12px rgba(10, 22, 40, 0.04)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--color-primary, #0D95E8)",
                    marginBottom: 12,
                  }}
                >
                  {post.category}
                </div>
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    margin: "0 0 12px",
                    color: "var(--color-text-light-primary, #0A1628)",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--color-text-light-secondary, #475569)",
                    margin: "0 0 16px",
                  }}
                >
                  {post.excerpt}
                </p>
                <time
                  dateTime={post.datePublished}
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-light-muted, #94A3B8)",
                  }}
                >
                  {new Date(post.datePublished).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
