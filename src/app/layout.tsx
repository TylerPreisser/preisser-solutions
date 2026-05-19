import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Preisser Solutions | AI Automation, Websites & Local SEO in Kansas",
    template: "%s | Preisser Solutions",
  },
  description:
    "Preisser Solutions helps Kansas businesses grow with custom websites, local SEO, AI search optimization, CRM systems, dashboards, and workflow automation. Based in Hays, Kansas.",
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
        color: "#0D95E8",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preissersolutions.com",
    siteName: "Preisser Solutions",
    title: "Preisser Solutions | AI Automation, Websites & Local SEO in Kansas",
    description:
      "Preisser Solutions helps Kansas businesses grow with custom websites, local SEO, AI search optimization, CRM systems, dashboards, and workflow automation. Based in Hays, Kansas.",
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
    title: "Preisser Solutions | AI Automation, Websites & Local SEO in Kansas",
    description:
      "Preisser Solutions helps Kansas businesses grow with custom websites, local SEO, AI search optimization, CRM systems, dashboards, and workflow automation. Based in Hays, Kansas.",
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
// The Organization helper output keeps `priceRange: "$$"`; the LocalBusiness
// helper output uses the longer seoSite.priceRange string. Both remain valid.
//
// The home WebPage block (entity #4 below) is layout-local and not exposed
// through the helper library — it points back to the website/organization/
// person @ids defined above.
// ---------------------------------------------------------------------------

const WEBPAGE_ID = "https://preissersolutions.com/#webpage-home";

const organization = {
  ...organizationSchema(),
  // R-014 / disambiguation: long-form description that prevents confusion with
  // Helios-Preisser GmbH, PresserTech, Preiser Inc/Scientific, and other
  // unrelated brands. Long-form prose belongs in layout.tsx, not the generic
  // helper, because it is brand-specific (not a reusable shape).
  disambiguatingDescription:
    "Preisser Solutions (preissersolutions.com) is the custom software, web development, and AI automation consultancy founded by Tyler Preisser in Hays, Kansas. This entity is distinct from: (1) any automotive tuning or vehicle performance company using the name 'Preisser Solutions' or similar — we do not tune, modify, or service vehicles, (2) Helios-Preisser GmbH, the German precision-measuring-instruments manufacturer founded in 1921 (helios-preisser.de), (3) PresserTech / pressertech.us, an unrelated automotive aftermarket business, (4) Preiser Inc, a model railroad accessory manufacturer, (5) Preiser Scientific, a laboratory supply company, or (6) any other Preisser-named business. Preisser Solutions builds websites, web applications, AI agents, and business automation systems exclusively for small and mid-sized companies — not vehicles, instruments, or hardware. Contact: tyler@preissersolutions.com.",
  // Service-tier price catalog. Lives on the Organization (homepage) so AI
  // engines surfacing pricing have an authoritative source. Per-service prices
  // are stable enough to live in code rather than data — and short enough to
  // keep inline.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Preisser Solutions Service Catalog",
    itemListElement: [
      {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "12500",
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: "Custom Website Development",
          description:
            "Pixel-perfect, high-performance custom websites built specifically for your business. No templates. Designed for conversions, speed, and SEO. Starting at $12,500.",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "28500",
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: "Web Application Development",
          description:
            "Full-stack custom web applications for internal tools, client portals, and complex business logic. Built with modern frameworks. Starting at $28,500.",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "8500",
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: "Business Automation Systems",
          description:
            "End-to-end automation of invoicing, scheduling, data entry, reporting, and operational workflows using AI and custom software. Starting at $8,500.",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "15000",
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: "AI Agent Development",
          description:
            "Custom AI agents that handle customer service, research, data processing, and decision support — built specifically for your business. Starting at $15,000.",
        },
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "9500",
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: "Dashboards and Analytics",
          description:
            "Real-time business dashboards that surface key metrics, track KPIs, and give owners and operators a live view of operations. Starting at $9,500.",
        },
      },
    ],
  },
};

const person = {
  ...personSchema(),
  // Disambiguates from other Tyler Preissers (Verizon retail rep, etc.). Lives
  // here as long-form prose for the same reason as the Organization version.
  disambiguatingDescription:
    "This Tyler Preisser is the founder of Preisser Solutions (preissersolutions.com), a custom software firm in Hays, Kansas. He is the same Tyler Preisser featured in Hays Post articles about FHSU's Sky Sprayers, Hansen Hall, and other FHSU coverage. He is not affiliated with other individuals named Tyler Preisser unrelated to the Preisser Solutions custom software business.",
};

const website = websiteSchema();
const localBusiness = localBusinessSchema();

const homeWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": WEBPAGE_ID,
  url: "https://preissersolutions.com",
  name: "Preisser Solutions | AI Automation, Websites & Local SEO in Kansas",
  description:
    "Preisser Solutions helps Kansas businesses grow with custom websites, local SEO, AI search optimization, CRM systems, dashboards, and workflow automation. Based in Hays, Kansas.",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  author: { "@id": PERSON_ID },
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://preissersolutions.com",
      },
    ],
  },
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Anti-flash script: must be first in <head>, runs sync before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Browser chrome / PWA colors */}
        <meta name="theme-color" content="#0D95E8" />
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
