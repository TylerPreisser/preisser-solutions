import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Preisser Solutions — Custom Business Automation",
    template: "%s | Preisser Solutions",
  },
  description:
    "Your partner in custom business automation. We build tailored systems that boost productivity, enhance accuracy, and scale with your business.",
  metadataBase: new URL("https://preissersolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preissersolutions.com",
    siteName: "Preisser Solutions",
    title: "Preisser Solutions — Custom Business Automation",
    description:
      "Your partner in custom business automation. We build tailored systems that boost productivity, enhance accuracy, and scale with your business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Solutions — Custom Business Automation",
    description:
      "Your partner in custom business automation. We build tailored systems that boost productivity, enhance accuracy, and scale with your business.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
