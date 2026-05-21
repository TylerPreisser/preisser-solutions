import type { Metadata } from "next";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

// layout.tsx only provides the breadcrumb JSON-LD for this route.
// Canonical title + description are set in page.tsx metadata (which takes
// precedence over layout metadata in Next.js App Router).
export const metadata: Metadata = {
  alternates: {
    canonical: "https://preissersolutions.com/contact",
  },
};

// R-016: BreadcrumbList JSON-LD for non-home page.
const breadcrumbSchema = buildBreadcrumbs([
  { name: "Contact", url: "https://preissersolutions.com/contact" },
]);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
