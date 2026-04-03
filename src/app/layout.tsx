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
    default: "Preisser Solutions | We Build Websites, Apps & Automations for Kansas Businesses",
    template: "%s | Preisser Solutions",
  },
  description:
    "Preisser Solutions builds websites, applications, automation systems, dashboards, and more for businesses across Kansas. Custom-built. AI-powered speed. Work directly with Tyler Preisser.",
  metadataBase: new URL("https://preissersolutions.com"),
  keywords:
    "websites Kansas, custom applications, business automation Hays Kansas, automation systems, web development Kansas, digital marketing automation, Tyler Preisser",
  authors: [{ name: "Tyler Preisser" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preissersolutions.com",
    siteName: "Preisser Solutions",
    title: "Preisser Solutions | We Build Websites, Apps & Automations for Kansas Businesses",
    description:
      "Preisser Solutions builds websites, applications, automation systems, dashboards, and more for businesses across Kansas. Work directly with Tyler Preisser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Solutions | We Build Websites, Apps & Automations for Kansas Businesses",
    description:
      "Custom-built websites, apps, and automation systems for Kansas businesses. Work directly with Tyler Preisser.",
  },
};

// Inline script: runs synchronously before first paint to prevent theme flash.
// Reads localStorage preference, falls back to system prefers-color-scheme,
// defaults to dark if neither is set. Sets data-theme on <html>.
const themeInitScript = `(function(){
  try {
    var stored = localStorage.getItem('ps-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // Default: no attribute = dark mode (CSS :root = dark)
  } catch(e) {}
})();`;

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
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
