import type { Metadata } from "next";
import Link from "next/link";

// Custom 404 page. Keep this noindex so crawlers focus on canonical pages.
export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Preisser Solutions",
  },
  description:
    "The page you were looking for has moved or never existed. Browse Preisser Solutions's services, case studies, and contact options below.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
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
  { href: "/marketing-agency-hays-ks", label: "Hays marketing" },
  { href: "/locations/hays-kansas", label: "Hays service area" },
  { href: "/resources", label: "Resources" },
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
            href="/contact?offer=hays-visibility-audit"
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Get a Free Hays Visibility Audit
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
