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
    default: "Preisser Solutions | Custom Websites, Apps, AI Automation & Dashboards | Hays, Kansas",
    template: "%s | Preisser Solutions",
  },
  description:
    "You show us the problem. We see the solution. Preisser Solutions designs and builds custom websites, applications, AI, automations, and visualizations from the ground up for your business. 22+ projects delivered from Hays, Kansas by Tyler Preisser. No templates, no subcontractors.",
  metadataBase: new URL("https://preissersolutions.com"),
  keywords: [
    "business automation Kansas",
    "custom websites Kansas",
    "web development Hays Kansas",
    "automation systems small business",
    "AI-powered business tools",
    "custom applications Kansas",
    "workflow automation",
    "Tyler Preisser",
    "Preisser Solutions",
    "digital transformation Kansas",
    "custom software development",
    "business dashboards",
    "ROI automation calculator",
    "Hays Kansas web developer",
    "small business technology solutions",
  ],
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
      { url: "/favicon.ico" },
      { url: "/images/ps-logo.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preissersolutions.com",
    siteName: "Preisser Solutions",
    title: "Preisser Solutions | Custom Websites, Apps, AI Automation & Dashboards | Hays, Kansas",
    description:
      "You show us the problem. We see the solution. Custom websites, applications, AI, automations, and visualizations — built from the ground up for your business by Tyler Preisser in Hays, KS.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Preisser Solutions — Custom Websites, Apps & Automations for Kansas Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Solutions | Custom Websites, Apps, AI Automation & Dashboards | Hays, Kansas",
    description:
      "You show us the problem. We see the solution. Custom websites, applications, AI, automations, and visualizations from the ground up. 22+ projects. Hays, KS.",
    images: ["/images/og-image.jpg"],
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
    legalName: "Preisser Solutions",
    url: "https://preissersolutions.com",
    logo: {
      "@type": "ImageObject",
      url: "https://preissersolutions.com/images/ps-logo.png",
      width: 512,
      height: 512,
    },
    image: "https://preissersolutions.com/images/ps-logo.png",
    description:
      "You show us the problem. We see the solution. Preisser Solutions designs and builds custom websites, applications, AI, automations, and visualizations from the ground up for businesses across Kansas and the Great Plains. Based in Hays, Kansas. Founded by Tyler Preisser.",
    slogan: "We Build Websites, Apps & Automations for Kansas Businesses",
    foundingDate: "2023",
    founder: { "@id": PERSON_ID },
    email: "sales@preissersolutions.com",
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
        email: "sales@preissersolutions.com",
        contactType: "sales",
        availableLanguage: "English",
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        telephone: "+16203523296",
        email: "sales@preissersolutions.com",
        contactType: "customer support",
        availableLanguage: "English",
        areaServed: "US",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/preissersolutions",
      "https://www.facebook.com/preissersolutions",
      "https://github.com/preissersolutions",
    ],
    knowsAbout: [
      "Custom Web Development",
      "Business Process Automation",
      "AI Agent Development",
      "Web Application Development",
      "Dashboard and Analytics Systems",
      "Marketing Automation",
      "E-commerce Development",
      "Workflow Automation",
      "Small Business Software",
      "Digital Transformation for Kansas Businesses",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Preisser Solutions Service Catalog",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Website Development",
            description:
              "Pixel-perfect, high-performance custom websites built from scratch. No templates. Designed for conversions, speed, and SEO.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Application Development",
            description:
              "Full-stack custom web applications for internal tools, client portals, and complex business logic. Built with modern frameworks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Automation Systems",
            description:
              "End-to-end automation of invoicing, scheduling, data entry, reporting, and operational workflows using AI and custom software.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Agent Development",
            description:
              "Custom AI agents that handle customer service, research, data processing, and decision support — built specifically for your business.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dashboards and Analytics",
            description:
              "Real-time business dashboards that surface key metrics, track KPIs, and give owners and operators a live view of operations.",
          },
        },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // 2. Person — Tyler Preisser
  // -------------------------------------------------------------------------
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Tyler Preisser",
    givenName: "Tyler",
    familyName: "Preisser",
    jobTitle: "Founder & Owner",
    worksFor: { "@id": ORG_ID },
    url: "https://preissersolutions.com/about",
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
    url: "https://preissersolutions.com",
    name: "Preisser Solutions",
    description:
      "Custom websites, web applications, AI automation systems, and dashboards for businesses across Kansas.",
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
    name: "Preisser Solutions | We Build Websites, Apps & Automations for Kansas Businesses",
    description:
      "You show us the problem. We see the solution. Preisser Solutions designs and builds custom websites, applications, AI, automations, and visualizations from the ground up for your business. 22+ projects delivered from Hays, Kansas by Tyler Preisser.",
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
    telephone: "+16203523296",
    email: "sales@preissersolutions.com",
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
  // 6. FAQPage — 15 questions covering key buyer intent searches
  // -------------------------------------------------------------------------
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Preisser Solutions do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Preisser Solutions is a custom software and business automation consultancy based in Hays, Kansas. We design and build custom websites, web applications, AI-powered automation systems, real-time business dashboards, and marketing automation pipelines for small and mid-sized businesses across Kansas. Every project is built from scratch — no page builders, no templates — and you work directly with Tyler Preisser, the founder, throughout the entire engagement.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a custom website cost in Kansas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom website pricing at Preisser Solutions depends on scope and complexity. A professional marketing site for a Kansas small business typically starts in the low thousands and scales based on the number of pages, custom features, and integrations required. Unlike agencies that charge for project managers and overhead, Preisser Solutions keeps costs efficient because you work directly with Tyler — the person doing the actual work. Contact us at sales@preissersolutions.com for a free project estimate tailored to your specific needs.",
        },
      },
      {
        "@type": "Question",
        name: "Can AI automate my business invoicing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Preisser Solutions builds custom AI automation systems that handle invoicing, payment reminders, purchase order processing, and accounts receivable workflows without manual intervention. For Kansas businesses that currently spend hours each week generating and tracking invoices, these systems can reduce that time to near zero. We integrate with your existing accounting tools or build a new system from scratch — whichever fits your operation better. Reach out to discuss your specific invoicing workflow.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a custom web application?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Timeline for a custom web application at Preisser Solutions varies based on complexity. A focused internal tool or client portal can often be delivered in four to eight weeks. More complex applications with custom databases, third-party integrations, and multi-role user systems typically run eight to sixteen weeks. Because Tyler Preisser handles development directly without layers of project handoffs, Preisser Solutions moves significantly faster than traditional agencies for comparable quality and scope.",
        },
      },
      {
        "@type": "Question",
        name: "What is business automation and how can it help my company?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Business automation is the use of software and AI to perform repetitive tasks — scheduling, data entry, report generation, follow-up emails, inventory tracking, and more — without a human doing them manually. Preisser Solutions specializes in designing and building these systems for Kansas businesses of all sizes. The result is fewer errors, faster operations, and hours returned to your team every week. Most clients see their automation investment pay for itself within the first year through labor savings and reduced mistakes.",
        },
      },
      {
        "@type": "Question",
        name: "Do you build AI agents for businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Preisser Solutions builds custom AI agents tailored to specific business needs — customer service bots that handle inquiries around the clock, research agents that compile competitive intelligence, data processing agents that extract and structure information from documents, and decision-support agents that surface recommendations based on your business data. Every AI agent we build is trained on your specific context and integrated directly into your existing workflows, not a generic off-the-shelf chatbot.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a template website and a custom website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A template website is built on a pre-made design — tools like Squarespace, Wix, or a WordPress theme — where every business looks similar and you are constrained by what the template allows. A custom website built by Preisser Solutions is designed and coded from scratch to match your brand, your goals, and your audience. Custom sites load faster, rank better in Google, convert visitors at higher rates, and can include any feature or integration your business requires. For Kansas businesses that compete seriously in their market, custom is the right investment.",
        },
      },
      {
        "@type": "Question",
        name: "How can dashboards improve my business operations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A real-time business dashboard built by Preisser Solutions gives you a live view of the metrics that matter most — revenue, leads, inventory, production rates, employee performance, or anything else specific to your operation. Instead of pulling reports manually or waiting for end-of-week summaries, you see what is happening right now. Kansas business owners who use dashboards make faster decisions, catch problems earlier, and spend less time compiling data. We build dashboards that connect to your existing data sources and update automatically.",
        },
      },
      {
        "@type": "Question",
        name: "What marketing automation does Preisser Solutions offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Preisser Solutions builds marketing automation systems that handle lead capture, follow-up email sequences, SMS campaigns, CRM updates, and reporting — all running automatically based on triggers you define. For Kansas businesses, this means your marketing keeps working even when you are focused on operations. We integrate with common platforms like HubSpot, Mailchimp, and ActiveCampaign, or build fully custom pipelines if your needs go beyond what those tools offer. Automated marketing consistently drives more revenue per marketing dollar than manual campaigns.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with businesses outside of Kansas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. While Preisser Solutions is based in Hays, Kansas, we work with businesses throughout the United States. All engagements are conducted remotely — video calls, shared project management, and direct communication with Tyler Preisser. Our roots are in the Kansas business community and we have deep familiarity with the challenges and opportunities facing Great Plains businesses, but our services and capabilities extend to any market across the country.",
        },
      },
      {
        "@type": "Question",
        name: "What makes AI-first development faster than traditional development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI-first development at Preisser Solutions means using AI tools to accelerate code generation, testing, debugging, and documentation — without sacrificing quality or introducing technical debt. Tyler Preisser applies AI as a force multiplier across every stage of the build process, which compresses timelines by thirty to fifty percent compared to traditional development approaches. Kansas businesses get production-quality software in weeks rather than months, and the savings in development time are passed through as more competitive project pricing.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know if I need custom software or if an off-the-shelf tool will work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Off-the-shelf software is a great starting point for generic needs. The signal that you need custom software is when you find yourself working around the tool — using spreadsheets to compensate for what it cannot do, paying for features you do not need, or watching your team waste time on manual steps the tool should handle automatically. Preisser Solutions offers free consultations to help Kansas business owners evaluate whether a custom build is actually the right investment, or whether a better-configured existing tool solves the problem at lower cost.",
        },
      },
      {
        "@type": "Question",
        name: "Can you fix or rebuild my existing broken website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Preisser Solutions regularly takes over broken, outdated, or underperforming websites from Kansas businesses. We start by auditing what exists — performance issues, SEO problems, broken functionality, outdated design — and then recommend either a targeted repair or a full rebuild depending on the root cause. If your current site is costing you leads because of slow load times, poor mobile experience, or a design that no longer reflects your business, we can fix that. Contact us at sales@preissersolutions.com for a free site audit.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does Preisser Solutions work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Preisser Solutions works across a wide range of industries common in Kansas and the Great Plains — agriculture, construction, aviation, oil and gas, retail, professional services, healthcare, and more. Tyler Preisser's background spans farming operations, aviation services, and technology startups, which gives Preisser Solutions practical fluency with the operational realities of diverse industries. We adapt our technical approach to the specific workflows, compliance needs, and customer expectations of each sector we work in.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started with Preisser Solutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Getting started with Preisser Solutions is straightforward. Reach out via email at sales@preissersolutions.com or call +1-620-352-3296. Tyler Preisser will personally respond to schedule a free discovery call where you describe what you are trying to build or fix. From there, we scope the project, align on timeline and budget, and send a proposal. There is no obligation and no sales pressure — just a direct conversation about whether Preisser Solutions is the right fit for your project.",
        },
      },
    ],
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
        {/* JSON-LD Structured Data — Organization, Person, WebSite, WebPage, LocalBusiness, FAQPage */}
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
