import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  personSchema,
  ORG_ID,
  PERSON_ID,
  WEBSITE_ID,
} from "@/lib/seo/schema";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  // Only weights actually used in the codebase: 500 (font-medium) and 600
  // (font-semibold). 400 kept as a safe baseline. 100-300 and 700-800 dropped
  // to eliminate 5 unnecessary font-file round-trips.
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Business Software, Automation & AI | Preisser Solutions",
    template: "%s | Preisser Solutions",
  },
  description:
    "Preisser Solutions builds custom business software, automation, and AI integrations for Kansas businesses — dashboards, databases, and document pipelines.",
  metadataBase: new URL("https://preissersolutions.com"),
  // NOTE: `keywords` meta intentionally omitted. Google explicitly ignores it,
  // and Bing treats stuffed keyword meta as a spam signal. Topical relevance is
  // signaled instead via JSON-LD `knowsAbout`, heading structure, and body copy.
  authors: [{ name: "Tyler Preisser", url: "https://preissersolutions.com/about" }],
  creator: "Tyler Preisser",
  publisher: "Preisser Solutions",
  alternates: {
    canonical: "https://preissersolutions.com",
  },
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#1590FF",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preissersolutions.com",
    siteName: "Preisser Solutions",
    title: "Business Software, Automation & AI | Preisser Solutions",
    description:
      "Preisser Solutions builds custom business software, automation, and AI integrations for Kansas businesses — dashboards, databases, and document pipelines.",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Software, Automation & AI | Preisser Solutions",
    description:
      "Preisser Solutions builds custom business software, automation, and AI integrations for Kansas businesses — dashboards, databases, and document pipelines.",
    images: ["/images/og-image-v2.jpg"],
    creator: "@tylerpreisser",
  },
  verification: {
    yandex: "9f19081f7abbbb70",
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
    },
  },
};

// Inline script: runs synchronously before first paint to prevent theme flash.
// Reads localStorage preference, falls back to system prefers-color-scheme,
// defaults to dark if neither is set. Sets data-theme on <html>.
const themeInitScript = `(function(){
  try {
    var stored = sessionStorage.getItem('ps-theme');
    var theme;
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 'light';
    } else {
      theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.backgroundColor = theme === 'light' ? '#F6F9FC' : '#0A1628';
  } catch(e) {}
})();`;

// ---------------------------------------------------------------------------
// JSON-LD Structured Data
// ---------------------------------------------------------------------------
// All entities are cross-linked via @id references so search engines can
// construct a complete knowledge graph for Preisser Solutions.
//
// Helpers from `src/lib/seo/schema.ts` produce Organization, LocalBusiness,
// WebSite, and Person. We extend the Organization with two layout-specific
// fields the helper intentionally does not own:
//   - disambiguatingDescription (deep disambiguation prose, long-form)
//   - hasOfferCatalog (priced Offer catalog of marketing service tiers)
// Neither the Organization nor LocalBusiness helpers include priceRange —
// that field has been intentionally removed from all schema output.
//
// The home WebPage block (entity #4 below) is layout-local and not exposed
// through the helper library — it points back to the website/organization/
// person @ids defined above.
//
// KNOWN LIMITATION: the root layout renders on every route, so this home
// WebPage node ships on all 234 pages rather than only on `/`. It is a stable
// @id describing one entity, so engines dedupe it rather than mis-attribute
// it — but the correct home is `src/app/page.tsx`. Moving it there is a
// homepage-owned change, tracked, not done here.
//
// `speakable` is deliberately NOT on this node for the same reason: a
// cssSelector evaluated from the root layout would assert homepage speakable
// content on 233 pages that do not have it.
// ---------------------------------------------------------------------------

const WEBPAGE_ID = "https://preissersolutions.com/#webpage-home";

// Service area for the three pillar Offers below. Kept to two nodes on
// purpose — see the note on `makesOffer`.
const PILLAR_AREA_SERVED = [
  { "@type": "State", name: "Kansas" },
  { "@type": "City", name: "Hays, Kansas" },
];

const organization = {
  ...organizationSchema(),
  // R-014 / disambiguation: long-form description that prevents confusion with
  // Helios-Preisser GmbH, PresserTech, Preiser Inc/Scientific, and other
  // unrelated brands. Long-form prose belongs in layout.tsx, not the generic
  // helper, because it is brand-specific (not a reusable shape).
  disambiguatingDescription:
    "Preisser Solutions (preissersolutions.com) is the custom business software, automation, and AI integration consultancy founded by Tyler Preisser in Hays, Kansas. This entity is distinct from: (1) any automotive tuning or vehicle performance company using the name 'Preisser Solutions' or similar — we do not tune, modify, or service vehicles, (2) Helios-Preisser GmbH, the German precision-measuring-instruments manufacturer founded in 1921 (helios-preisser.de), (3) PresserTech / pressertech.us, an unrelated automotive aftermarket business, (4) Preiser Inc, a model railroad accessory manufacturer, (5) Preiser Scientific, a laboratory supply company, or (6) any other Preisser-named business. Preisser Solutions builds admin dashboards, customer and member databases, document-processing pipelines, and the automations and AI integrations that connect them, exclusively for small and mid-sized companies — not vehicles, instruments, or hardware. Contact: tyler@preissersolutions.com.",
  // Service-tier price catalog. Lives on the Organization (homepage) so AI
  // engines surfacing pricing have an authoritative source. Per-service prices
  // are stable enough to live in code rather than data — and short enough to
  // keep inline.
  // Each nested Service carries `provider` and `areaServed`. Without them a
  // Service node is incomplete: an engine reading the Offer has no way to tell
  // who performs the work or where, and it will not attach the Service to this
  // Organization. `PILLAR_AREA_SERVED` is deliberately the compact two-node
  // form — the full 15-city list already sits on the LocalBusiness node, and
  // repeating it three more times multiplies payload on all 234 pages for no
  // added signal.
  makesOffer: [
    {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: "Business Software",
        serviceType: "Custom business software development",
        description:
          "Admin dashboards, customer and member databases, client portals, and internal tools — the platform your team actually logs into, built for how your business works.",
        provider: { "@id": ORG_ID },
        areaServed: PILLAR_AREA_SERVED,
      },
    },
    {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: "Business Automation",
        serviceType: "Business process automation",
        description:
          "Workflow automation for document pipelines, scheduled jobs, notifications and confirmations, and the system integrations that connect them — the work that happens without anyone doing it.",
        provider: { "@id": ORG_ID },
        areaServed: PILLAR_AREA_SERVED,
      },
    },
    {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: "AI Integration",
        serviceType: "AI integration",
        description:
          "AI put exactly where it earns its place: reading and classifying documents, drafting with a human approval gate, and joining an existing workflow — never replacing judgment on anything that matters.",
        provider: { "@id": ORG_ID },
        areaServed: PILLAR_AREA_SERVED,
      },
    },
  ],
};

const person = {
  ...personSchema(),
  // Disambiguates from other Tyler Preissers (Verizon retail rep, etc.). Lives
  // here as long-form prose for the same reason as the Organization version.
  disambiguatingDescription:
    "This Tyler Preisser is the founder of Preisser Solutions (preissersolutions.com), a custom business software, automation, and AI integration firm in Hays, Kansas. He is the same Tyler Preisser featured in Hays Post articles about FHSU's Sky Sprayers, Hansen Hall, and other FHSU coverage. He is not affiliated with other individuals named Tyler Preisser unrelated to the Preisser Solutions custom software business.",
};

const website = websiteSchema();
const localBusiness = localBusinessSchema();

const homeWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": WEBPAGE_ID,
  url: "https://preissersolutions.com",
  name: "Business Software, Automation & AI | Preisser Solutions",
  description:
    "Preisser Solutions builds custom business software, automation, and AI integrations for Kansas businesses — dashboards, databases, and document pipelines.",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  author: { "@id": PERSON_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
  // No `breadcrumb` here. A single-item BreadcrumbList ("Home") is what
  // Google's own docs call unnecessary, and because this block is emitted from
  // the root layout it was shipping on all 234 pages — 233 stray
  // BreadcrumbList nodes competing with each page's real trail.
};

const structuredData = [
  organization,
  person,
  website,
  homeWebPage,
  localBusiness,
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-flash script: must be first in <head>, runs sync before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Browser chrome / PWA colors */}
        <meta name="theme-color" content="#1590FF" />
        {/* Windows tile / IE11 */}
        <meta name="msapplication-TileColor" content="#0A1628" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* Geographic targeting */}
        <meta name="geo.region" content="US-KS" />
        <meta name="geo.placename" content="Hays, Kansas" />
        <meta name="geo.position" content="38.8794;-99.3268" />
        <meta name="ICBM" content="38.8794, -99.3268" />
        {/* RSS autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Preisser Solutions"
          href="/feed.xml"
        />
        {/* JSON-LD Structured Data — Organization, Person, WebSite, WebPage, LocalBusiness. FAQPage emitted per-page via AeoPage to avoid duplicates. */}
        <JsonLd data={structuredData} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="ps-skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Script src="/agent-tools.js" strategy="afterInteractive" />
        {/* MarCommand first-party telemetry (client "Preisser Solutions", site 1).
            The write key is PUBLIC BY DESIGN — it ships in browser JavaScript on
            every page, so it is not a secret (see siteConfig.ts in marcommand). It is
            origin-locked: the collector rejects any beacon whose Origin is not on the
            site's allowed_origins ("rejected:forged_origin"), and it rotates in one
            call (POST /telemetry/sites/1/rotate). NEXT_PUBLIC_MC_WRITE_KEY overrides
            it with no code change.
            Contract: docs/phases/INSTALL-CONTRACT-telemetry.md */}
        <Script
          src="https://marcommand.tylerpreisser.workers.dev/mc.js"
          strategy="afterInteractive"
          data-mc-key={process.env.NEXT_PUBLIC_MC_WRITE_KEY ?? "mcw_jHsUyqYDp3pcH4z5d9MdnX_CQYAwTW5V"}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
