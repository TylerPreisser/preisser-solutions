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
    default: "Preisser Solutions | AI-Powered Business Technology for Kansas Businesses",
    template: "%s | Preisser Solutions",
  },
  description:
    "Preisser Solutions builds, fixes, and automates business technology for companies across Kansas. Custom AI automation, system integration, web development, and more. Work directly with Tyler Preisser.",
  metadataBase: new URL("https://preissersolutions.com"),
  keywords:
    "AI automation Kansas, business automation Hays Kansas, system integration, custom web development Kansas, digital marketing automation, Tyler Preisser",
  authors: [{ name: "Tyler Preisser" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preissersolutions.com",
    siteName: "Preisser Solutions",
    title: "Preisser Solutions | AI-Powered Business Technology for Kansas Businesses",
    description:
      "Preisser Solutions builds, fixes, and automates business technology for companies across Kansas. Work directly with Tyler Preisser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Solutions | AI-Powered Business Technology",
    description:
      "Custom AI automation, system integration, and web development for Kansas businesses. Work directly with Tyler Preisser.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
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
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
