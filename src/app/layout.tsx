import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Preisser Tech",
    template: "%s | Preisser Tech",
  },
  description: "World-class tech for your business.",
  metadataBase: new URL("https://preissertech.com"),
  keywords: [
    "business automation Kansas",
    "custom websites Kansas",
    "web development Hays Kansas",
    "automation systems small business",
    "AI-powered business tools",
    "custom applications Kansas",
    "workflow automation",
    "Tyler Preisser",
    "Preisser Tech",
    "digital transformation Kansas",
    "custom software development",
    "business dashboards",
    "ROI automation calculator",
    "Hays Kansas web developer",
    "small business technology solutions",
  ],
  authors: [{ name: "Tyler Preisser", url: "https://preissertech.com/about" }],
  creator: "Tyler Preisser",
  publisher: "Preisser Tech",
  alternates: {
    canonical: "https://preissertech.com",
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
    url: "https://preissertech.com",
    siteName: "Preisser Tech",
    title: "Preisser Tech",
    description: "World-class tech for your business.",
    images: [
      {
        url: "/images/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Tech",
    description: "World-class tech for your business.",
    images: ["/images/og-image-v2.jpg"],
    creator: "@tylerpreisser",
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
// construct a complete knowledge graph for Preisser Tech.
//
// Entity IDs:
//   ORG_ID       — Organization / ProfessionalService
//   PERSON_ID    — Tyler Preisser (Person)
//   WEBSITE_ID   — WebSite
//   WEBPAGE_ID   — WebPage (homepage)
//   LOCAL_BIZ_ID — LocalBusiness
// ---------------------------------------------------------------------------

const ORG_ID = "https://preissertech.com/#organization";
const PERSON_ID = "https://preissertech.com/#tyler-preisser";
const WEBSITE_ID = "https://preissertech.com/#website";
const WEBPAGE_ID = "https://preissertech.com/#webpage-home";
const LOCAL_BIZ_ID = "https://preissertech.com/#local-business";

const structuredData = [
  // -------------------------------------------------------------------------
  // 1. Organization + ProfessionalService
  // -------------------------------------------------------------------------
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: "Preisser Tech",
    alternateName: ["Preisser Technology", "Preisser Tech"],
    legalName: "Preisser Tech",
    url: "https://preissertech.com",
    logo: {
      "@type": "ImageObject",
      "@id": "https://preissertech.com/#logo",
      url: "https://preissertech.com/images/ps-logo.png",
      contentUrl: "https://preissertech.com/images/ps-logo.png",
      width: 1024,
      height: 1024,
      caption: "Preisser Tech logo — custom software, web apps, and AI automation in Hays, Kansas",
      name: "Preisser Tech Logo",
    },
    image: "https://preissertech.com/images/ps-logo.png",
    description:
      "You show us the problem. We see the solution. Preisser Tech is a B2B custom software, web application, and AI automation consultancy — not automotive tuning, not hardware. We design and build custom websites, applications, AI agents, automations, and data visualizations from the ground up for small and mid-sized businesses across Kansas and the Great Plains. Based in Hays, Kansas. Founded by Tyler Preisser.",
    disambiguatingDescription:
      "Preisser Tech (preissertech.com) is the custom software, web development, and AI automation consultancy founded by Tyler Preisser in Hays, Kansas. This entity is distinct from: (1) any automotive tuning or vehicle performance company using the name 'Preisser Tech' or similar — we do not tune, modify, or service vehicles, (2) Helios-Preisser GmbH, the German precision-measuring-instruments manufacturer founded in 1921 (helios-preisser.de), (3) PresserTech / pressertech.us, an unrelated automotive aftermarket business, (4) Preiser Inc, a model railroad accessory manufacturer, (5) Preiser Scientific, a laboratory supply company, or (6) any other Preisser-named business. Preisser Tech builds websites, web applications, AI agents, and business automation systems exclusively for small and mid-sized companies — not vehicles, instruments, or hardware. Contact: sales@preissertech.com.",
    slogan:
      "Custom Software, Web Apps & AI Automation for Kansas Businesses — Not Automotive, Not Hardware",
    foundingDate: "2023",
    founder: { "@id": PERSON_ID },
    email: "sales@preissertech.com",
    telephone: "+16203523296",
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
    areaServed: [
      {
        "@type": "State",
        name: "Kansas",
      },
      {
        "@type": "AdministrativeArea",
        name: "Great Plains, United States",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+16203523296",
        email: "sales@preissertech.com",
        contactType: "sales",
        availableLanguage: "English",
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        telephone: "+16203523296",
        email: "sales@preissertech.com",
        contactType: "customer support",
        availableLanguage: "English",
        areaServed: "US",
      },
    ],
    // NOTE: LinkedIn and Facebook pages do not exist yet at these canonical URLs.
    // Set in advance — once Tyler creates/renames the pages, the Knowledge Graph
    // entity will link correctly without a redeploy.
    // LinkedIn: create /company/preissertech from scratch
    // Facebook: rename existing /preissersolutions → preissertech via Page Settings
    // Twitter/X: claim @preissertech at x.com before squatters do
    sameAs: [
      "https://www.linkedin.com/company/preissertech",
      "https://www.facebook.com/preissertech",
      "https://x.com/preissertech",
      "https://github.com/tylerpreisser",
    ],
    knowsAbout: [
      "Custom Software Development",
      "Custom Web Development",
      "Business Process Automation",
      "AI Agent Development",
      "Web Application Development",
      "Real-Time Business Dashboards",
      "Dashboard and Analytics Systems",
      "Marketing Automation",
      "E-commerce Development",
      "Workflow Automation",
      "Small Business Software Solutions",
      "Digital Transformation for Kansas Businesses",
      "B2B Technology Consulting",
      "API Integration and Systems Architecture",
      "No-Code and Low-Code Alternatives",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Preisser Tech Service Catalog",
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
              "Pixel-perfect, high-performance custom websites built from scratch. No templates. Designed for conversions, speed, and SEO. Starting at $12,500.",
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
  },

  // -------------------------------------------------------------------------
  // 2. Person — Tyler Preisser
  // -------------------------------------------------------------------------
  // Includes disambiguatingDescription to distinguish from other Tyler Preissers
  // (a Verizon retail rep, an FHSU Sky Sprayers student, etc.) — the founder of
  // Preisser Tech is Tyler Preisser, Hays-based custom software / AI builder.
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
      "Tyler Preisser is the founder and sole technical lead of Preisser Tech, a Hays, Kansas custom software and AI development consultancy. He is a Fort Hays State University graduate and Hays native who personally codes every client engagement.",
    disambiguatingDescription:
      "This Tyler Preisser is the founder of Preisser Tech (preissertech.com), a custom software firm in Hays, Kansas. He is the same Tyler Preisser featured in Hays Post articles about FHSU's Sky Sprayers, Hansen Hall, and other FHSU coverage. He is not affiliated with other individuals named Tyler Preisser unrelated to the Preisser Tech custom software business.",
    worksFor: { "@id": ORG_ID },
    url: "https://preissertech.com/about",
    email: "sales@preissertech.com",
    telephone: "+16203523296",
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
    sameAs: [
      "https://www.linkedin.com/in/tylerpreisser",
      "https://github.com/tylerpreisser",
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
    url: "https://preissertech.com",
    name: "Preisser Tech",
    description:
      "Custom websites, web applications, AI automation systems, and dashboards for businesses across Kansas.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://preissertech.com/?q={search_term_string}",
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
    url: "https://preissertech.com",
    name: "Preisser Tech | We Build Websites, Apps & Automations for Kansas Businesses",
    description:
      "You show us the problem. We see the solution. Preisser Tech designs and builds custom websites, applications, AI, automations, and visualizations from the ground up for your business. 22+ projects delivered from Hays, Kansas by Tyler Preisser.",
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
          item: "https://preissertech.com",
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
    name: "Preisser Tech",
    image: "https://preissertech.com/images/ps-logo.png",
    url: "https://preissertech.com",
    telephone: "+16203523296",
    email: "sales@preissertech.com",
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
          title="Preisser Tech"
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
      </body>
    </html>
  );
}
