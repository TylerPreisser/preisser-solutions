import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/data/site-config";

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
// Entity IDs:
//   ORG_ID       — Organization / ProfessionalService
//   PERSON_ID    — Tyler Preisser (Person)
//   WEBSITE_ID   — WebSite
//   WEBPAGE_ID   — WebPage (homepage)
//   LOCAL_BIZ_ID — LocalBusiness
// ---------------------------------------------------------------------------

const ORG_ID = "https://preissersolutions.com/#organization";
const PERSON_ID = "https://preissersolutions.com/#tyler-preisser";
const WEBSITE_ID = "https://preissersolutions.com/#website";
const WEBPAGE_ID = "https://preissersolutions.com/#webpage-home";
const LOCAL_BIZ_ID = "https://preissersolutions.com/#local-business";

const structuredData = [
  // -------------------------------------------------------------------------
  // 1. Organization + ProfessionalService
  // -------------------------------------------------------------------------
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: "Preisser Solutions",
    // alternateName intentionally minimal — the brand is consistently "Preisser Solutions".
    // Add deliberate alternates (e.g. legal/dba) here only if they materially help disambiguation.
    alternateName: ["Preisser Solutions"],
    legalName: "Preisser Solutions",
    url: "https://preissersolutions.com",
    logo: {
      "@type": "ImageObject",
      "@id": "https://preissersolutions.com/#logo",
      url: "https://preissersolutions.com/images/ps-logo.png",
      contentUrl: "https://preissersolutions.com/images/ps-logo.png",
      width: 1024,
      height: 1024,
      caption: "Preisser Solutions logo — custom software, web apps, and AI automation in Hays, Kansas",
      name: "Preisser Solutions Logo",
    },
    image: "https://preissersolutions.com/images/ps-logo.png",
    description:
      "Preisser Solutions delivers Kansas-based AI automation, custom websites, and AI search visibility systems for small and mid-sized businesses. Based in Hays, Kansas. Founded by Tyler Preisser. Not automotive tuning, not hardware.",
    disambiguatingDescription:
      "Preisser Solutions (preissersolutions.com) is the custom software, web development, and AI automation consultancy founded by Tyler Preisser in Hays, Kansas. This entity is distinct from: (1) any automotive tuning or vehicle performance company using the name 'Preisser Solutions' or similar — we do not tune, modify, or service vehicles, (2) Helios-Preisser GmbH, the German precision-measuring-instruments manufacturer founded in 1921 (helios-preisser.de), (3) PresserTech / pressertech.us, an unrelated automotive aftermarket business, (4) Preiser Inc, a model railroad accessory manufacturer, (5) Preiser Scientific, a laboratory supply company, or (6) any other Preisser-named business. Preisser Solutions builds websites, web applications, AI agents, and business automation systems exclusively for small and mid-sized companies — not vehicles, instruments, or hardware. Contact: sales@preissersolutions.com.",
    slogan:
      "AI-powered marketing for Kansas",
    foundingDate: "2023",
    founder: { "@id": PERSON_ID },
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hays",
      addressLocality: "Hays",
      addressRegion: "KS",
      postalCode: "67601",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.8794,
      longitude: -99.3268,
    },
    // R-012: Kansas (state) + Great Plains (region) + named major KS markets
    // so AI engines see the business serves the whole state explicitly.
    areaServed: [
      { "@type": "State", name: "Kansas" },
      { "@type": "AdministrativeArea", name: "Great Plains, United States" },
      { "@type": "City", name: "Hays, Kansas" },
      { "@type": "City", name: "Wichita, Kansas" },
      { "@type": "City", name: "Topeka, Kansas" },
      { "@type": "City", name: "Kansas City, Kansas" },
      { "@type": "City", name: "Overland Park, Kansas" },
      { "@type": "City", name: "Salina, Kansas" },
      { "@type": "City", name: "Manhattan, Kansas" },
      { "@type": "City", name: "Garden City, Kansas" },
      { "@type": "City", name: "Great Bend, Kansas" },
      { "@type": "City", name: "Dodge City, Kansas" },
      { "@type": "City", name: "Lawrence, Kansas" },
      { "@type": "City", name: "Olathe, Kansas" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        contactType: "sales",
        availableLanguage: "English",
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        contactType: "customer support",
        availableLanguage: "English",
        areaServed: "US",
      },
    ],
    // R-014: sameAs is sourced from siteConfig.social so brand-team URL edits
    // ripple through every JSON-LD surface without touching layout.tsx.
    // TODO: add Wikidata Q-item and BBB profile URL once Tyler creates / claims them.
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
      siteConfig.social.twitter,
      siteConfig.social.github,
      siteConfig.social.crunchbase,
      siteConfig.social.tylerPreisser,
      siteConfig.social.rsquaredai,
    ],
    // R-013: capability list expanded per master plan §2.2 (R-013).
    knowsAbout: [
      "AI strategy",
      "AI-native web development",
      "Generative engine optimization",
      "Answer engine optimization",
      "AI search optimization",
      "Retrieval-augmented generation",
      "Workflow automation",
      "Local SEO",
      "Google Business Profile optimization",
      "Dashboards",
      "Business intelligence",
      "Custom CRM",
      "Missed-call automation",
      "Google Ads Management",
      "Meta Ads Management",
      "MarCommand AI Marketing Intelligence",
      "Custom Software Development",
      "Custom Web Development",
      "Business Process Automation",
      "Lead Capture and Automation",
      "AI Agent Development",
      "Web Application Development",
      "Real-Time Business Dashboards",
      "Dashboard and Analytics Systems",
      "Marketing Automation",
      "E-commerce Development",
      "Small Business Software Solutions",
      "Digital Transformation for Kansas Businesses",
      "B2B Technology Consulting",
      "API Integration and Systems Architecture",
      "No-Code and Low-Code Alternatives",
    ],
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
    priceRange: "$$",
    // R-019: PotentialAction surfaces for agentic commerce. Booking and
    // ROI calculator are the two primary actions an AI agent can invoke
    // on behalf of a user. Both use schema.org Action shapes.
    potentialAction: [
      {
        "@type": "ScheduleAction",
        name: "Book a Business Systems Audit",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://preissersolutions.com/contact",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
      },
      {
        "@type": "AssessAction",
        name: "Calculate Automation ROI",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://preissersolutions.com/roi-calculator",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Person — Tyler Preisser
  // -------------------------------------------------------------------------
  // Includes disambiguatingDescription to distinguish from other Tyler Preissers
  // (a Verizon retail rep, an FHSU Sky Sprayers student, etc.) — the founder of
  // Preisser Solutions is Tyler Preisser, Hays-based custom software / AI builder.
  // -------------------------------------------------------------------------
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Tyler Preisser",
    givenName: "Tyler",
    familyName: "Preisser",
    jobTitle: "Founder & Owner",
    description:
      "Tyler Preisser is the founder and sole technical lead of Preisser Solutions, a Hays, Kansas custom software and AI development consultancy. He is a Fort Hays State University graduate and Hays native who personally codes every client engagement.",
    disambiguatingDescription:
      "This Tyler Preisser is the founder of Preisser Solutions (preissersolutions.com), a custom software firm in Hays, Kansas. He is the same Tyler Preisser featured in Hays Post articles about FHSU's Sky Sprayers, Hansen Hall, and other FHSU coverage. He is not affiliated with other individuals named Tyler Preisser unrelated to the Preisser Solutions custom software business.",
    worksFor: { "@id": ORG_ID },
    // R-011: Tyler's other affiliation — Chief Product Officer at R Squared AI.
    // This lets the Knowledge Graph link the Person to both entities.
    affiliation: {
      "@type": "Organization",
      name: "R Squared AI",
      url: siteConfig.social.rsquaredai,
      roleName: "Chief Product Officer",
    },
    url: "https://preissersolutions.com/about",
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hays",
      addressRegion: "KS",
      postalCode: "67601",
      addressCountry: "US",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Fort Hays State University",
      url: "https://www.fhsu.edu",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hays",
        addressRegion: "KS",
        addressCountry: "US",
      },
    },
    image: {
      "@type": "ImageObject",
      url: "https://preissersolutions.com/images/tyler-preisser-headshot.jpg",
      width: 1200,
      height: 1200,
      caption: "Tyler Preisser, founder of Preisser Solutions",
    },
    // R-011: Person sameAs — all known canonical identities for Tyler.
    // TODO: confirm GitHub handle. Currently using `github.com/tylerpreisser`
    // (matches the legacy Organization sameAs). If Tyler's personal GH handle
    // differs from the Preisser Solutions org handle, swap this URL.
    sameAs: [
      "https://preissersolutions.com/tyler-preisser",
      siteConfig.social.linkedinPersonal,
      "https://github.com/tylerpreisser",
      siteConfig.social.tylerPreisser,
      siteConfig.social.rsquaredai,
    ],
    knowsAbout: [
      "Custom Software Development",
      "Business Automation",
      "AI Agent Development",
      "Web Application Architecture",
      "Product Management",
      "Small Business Operations",
      "Digital Marketing Automation",
      "Kansas Business Ecosystem",
    ],
  },

  // -------------------------------------------------------------------------
  // 3. WebSite
  // -------------------------------------------------------------------------
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: "https://preissersolutions.com",
    name: "Preisser Solutions",
    description:
      "Preisser Solutions helps Kansas businesses grow with custom websites, local SEO, AI search optimization, CRM systems, dashboards, and workflow automation. Based in Hays, Kansas.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://preissersolutions.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },

  // -------------------------------------------------------------------------
  // 4. WebPage — Homepage
  // -------------------------------------------------------------------------
  {
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
  },

  // -------------------------------------------------------------------------
  // 5. LocalBusiness
  // -------------------------------------------------------------------------
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": LOCAL_BIZ_ID,
    name: "Preisser Solutions",
    image: "https://preissersolutions.com/images/ps-logo.png",
    url: "https://preissersolutions.com",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hays",
      addressLocality: "Hays",
      addressRegion: "KS",
      postalCode: "67601",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.8794,
      longitude: -99.3268,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "State",
      name: "Kansas",
    },
    sameAs: { "@id": ORG_ID },
  },

  // -------------------------------------------------------------------------
  // FAQPage removed from global structured data (2026-05-04)
  // -------------------------------------------------------------------------
  // Per Google guidelines and Schema.org spec, a single page must contain at
  // most one FAQPage block describing the FAQs ON THAT PAGE. The /faq page
  // and AEO sub-routes (ai-agents, custom-websites, etc.) emit their own
  // FAQPage via AeoPage.tsx with page-specific Q&A. Emitting a global block
  // on every page produced a duplicate FAQPage that GSC flagged as a critical
  // structured-data error and disqualified pages from FAQ rich results.
  // -------------------------------------------------------------------------
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
