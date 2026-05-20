/**
 * /products — DELETED 2026-05-20
 *
 * Preisser Solutions is a custom-build consultancy with no productized SKUs
 * for sale. The former "AI Receptionist Starter" and "AI-Native Website Launch"
 * SKU framing has been removed per canonical project inventory guidance.
 *
 * Cloudflare Pages _redirects handles the 301 before this static file is served:
 *   /products → /services  (301)
 *   /products/ → /services  (301)
 *
 * This file exists only so `next build` does not error on a missing page.tsx.
 * The meta-refresh below is a belt-and-suspenders fallback for the rare case
 * the CDN redirect is bypassed.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redirecting… | Preisser Solutions",
  robots: { index: false, follow: false },
};

export default function ProductsRedirectPage() {
  return (
    <html lang="en">
      <head>
        {/* Belt-and-suspenders: CDN _redirects fires first; this is a fallback. */}
        <meta httpEquiv="refresh" content="0; url=/services" />
        <link rel="canonical" href="https://preissersolutions.com/services" />
      </head>
      <body>
        <p>
          This page has moved. <a href="/services">View all services.</a>
        </p>
      </body>
    </html>
  );
}
