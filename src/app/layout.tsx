import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
    default: "Preisser Solutions | Hays KS Marketing, Websites, SEO & AI Automation",
    template: "%s | Preisser Solutions",
  },
  description:
    "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, and AI automation.",
  metadataBase: new URL("https://preissersolutions.com"),
  keywords: [
    "marketing agency Hays KS",
    "digital marketing Hays KS",
    "local SEO Hays KS",
    "Google Business Profile optimization Hays KS",
    "web design Hays KS",
    "Google Ads Hays KS",
    "AI automation Hays KS",
    "Tyler Preisser",
    "Preisser Solutions",
    "Northwest Kansas marketing",
  ],
  authors: [{ name: "Tyler Preisser", url: "https://preissersolutions.com/tyler-preisser" }],
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
    title: "Preisser Solutions | Hays KS Marketing, Websites, SEO & AI Automation",
    description:
      "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, and AI automation.",
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
    title: "Preisser Solutions | Hays KS Marketing, Websites, SEO & AI Automation",
    description:
      "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, and AI automation.",
    images: ["/images/og-image-v2.jpg"],
    creator: "@tylerpreisser",
  },
  verification: {
    yandex: "9f19081f7abbbb70",
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
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
// ---------------------------------------------------------------------------

const ORG_ID = "https://preissersolutions.com/#organization";
const PERSON_ID = "https://preissersolutions.com/#tyler-preisser";
const WEBSITE_ID = "https://preissersolutions.com/#website";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: "Preisser Solutions",
    legalName: "Preisser Solutions",
    url: "https://preissersolutions.com",
    logo: {
      "@type": "ImageObject",
      "@id": "https://preissersolutions.com/#logo",
      url: "https://preissersolutions.com/images/ps-logo.png",
      contentUrl: "https://preissersolutions.com/images/ps-logo.png",
      width: 1024,
      height: 1024,
      caption: "Preisser Solutions logo",
      name: "Preisser Solutions Logo",
    },
    image: "https://preissersolutions.com/images/ps-logo.png",
    description:
      "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, social media marketing, and AI automation.",
    disambiguatingDescription:
      "Preisser Solutions is a Hays, Kansas marketing, website, local SEO, Google Ads, and AI automation company owned by Tyler Preisser. It is not an automotive tuning, hardware, measuring-instrument, model railroad, or laboratory supply company.",
    slogan: "Hays KS marketing, websites, SEO, Google Ads, and AI automation",
    foundingDate: "2023",
    founder: { "@id": PERSON_ID },
    email: "sales@preissersolutions.com",
    telephone: "+16203523296",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hays",
      addressRegion: "KS",
      postalCode: "67601",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Hays, Kansas" },
      { "@type": "AdministrativeArea", name: "Ellis County, Kansas" },
      { "@type": "AdministrativeArea", name: "Northwest Kansas" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+16203523296",
        email: "sales@preissersolutions.com",
        contactType: "sales",
        availableLanguage: "English",
        areaServed: ["Hays, Kansas", "Ellis County, Kansas", "Northwest Kansas"],
      },
    ],
    knowsAbout: [
      "Marketing Strategy for Local Businesses",
      "Local SEO",
      "Google Business Profile Optimization",
      "Google Ads Management",
      "Web Design",
      "Landing Page Design",
      "Review Generation Systems",
      "Social Media Marketing",
      "AI Automation",
      "Missed-Call Text-Back",
      "Lead Follow-Up Automation",
      "CRM Workflow Automation",
      "Conversion Tracking",
    ],
    priceRange: "$$",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Tyler Preisser",
    givenName: "Tyler",
    familyName: "Preisser",
    jobTitle: "Founder & Owner",
    description:
      "Tyler Preisser is the founder and owner of Preisser Solutions, a Hays, Kansas company helping local businesses improve websites, Google visibility, lead tracking, and AI-powered follow-up.",
    worksFor: { "@id": ORG_ID },
    url: "https://preissersolutions.com/tyler-preisser",
    email: "sales@preissersolutions.com",
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
    image: {
      "@type": "ImageObject",
      url: "https://preissersolutions.com/images/tyler-preisser-headshot.jpg",
      width: 1200,
      height: 1200,
      caption: "Tyler Preisser, founder of Preisser Solutions",
    },
    sameAs: [
      "https://preissersolutions.com/tyler-preisser",
      "https://www.linkedin.com/in/tylerpreisser",
      "https://github.com/tylerpreisser",
    ],
    knowsAbout: [
      "Local SEO",
      "Google Business Profile Optimization",
      "Google Ads",
      "Web Design",
      "AI Automation",
      "CRM Workflow Automation",
      "Conversion Tracking",
      "Kansas Business Ecosystem",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: "https://preissersolutions.com",
    name: "Preisser Solutions",
    description:
      "Preisser Solutions helps Hays and Northwest Kansas businesses get more calls, bookings, and customers through websites, local SEO, Google Ads, review systems, and AI automation.",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  },
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
        <meta name="theme-color" content="#0B7BC0" />
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
        {/* JSON-LD Structured Data — Organization/ProfessionalService, Person, and WebSite. Page-specific schema is emitted by each route. */}
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
