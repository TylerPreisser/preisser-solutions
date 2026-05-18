import type { Metadata } from "next";
import Link from "next/link";

// Custom 404 page.
//
// Per Tyler's directive (2026-05-11): ZERO restrictions on AI crawlers and
// agents across preissersolutions.com. Every page, every path. This includes the
// 404 page, which Next.js otherwise emits with `<meta name="robots" content="noindex">`
// by default. Exporting an explicit `metadata.robots` here overrides that
// default and makes the 404 fully indexable too.
//
// Indexable 404s are unusual but intentional here:
//   - Tyler wants MAXIMUM AI agent discoverability — even agents that
//     hit a stale URL should be able to read what we offer and follow
//     the links back to canonical pages.
//   - The HTTP status still signals not-found to Google; indexing is just
//     an AI-engine visibility maximization, not an SEO play.
//
// If this ever needs to be reverted to the standard `noindex` 404 pattern,
// switch `robots.index` back to `false` — but ONLY with Tyler's approval.
export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Preisser Solutions",
  },
  description:
    "The page you were looking for has moved or never existed. Browse Preisser Solutions's services, case studies, and contact options below.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://preissersolutions.com/",
  },
};

const QUICK_LINKS: Array<{ href: string; label: string }> = [
  { href: "/services", label: "All services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/tyler-preisser", label: "About Tyler" },
  { href: "/pricing", label: "Pricing" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-[var(--ps-color-dark,#0A1628)] px-6 py-24 text-[var(--ps-color-text-on-dark,#F0F0F0)]">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ps-color-primary,#0D95E8)]">
          404
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          This page took a wrong turn.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--ps-color-text-muted,#9CA3AF)]">
          The URL you followed has moved or never existed. Everything Preisser
          Solutions offers is one click away.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-[var(--ps-color-primary,#0D95E8)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--ps-color-primary-hover,#0B7BC0)]"
          >
            Back to homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Reach out
          </Link>
        </div>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--ps-color-text-muted,#9CA3AF)] underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
