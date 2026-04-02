import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Preisser Solutions | Your Ai Business Experts",
    template: "%s | Preisser Solutions",
  },
  description:
    "Preisser Solutions builds custom internal ecosystems to eliminate business headaches, reduce overhead, and streamline operations—remotely, 24/7, directly at your site.",
  metadataBase: new URL("https://preissersolutions.com"),
  keywords:
    "custom automation systems, AI-powered solutions, automated assistants, back office automation, administrative automation, business process optimization, workflow automation, Kansas business automation",
  authors: [{ name: "Preisser Solutions" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preissersolutions.com",
    siteName: "Preisser Solutions",
    title: "Preisser Solutions | Your Ai Business Experts",
    description:
      "Custom internal ecosystems that eliminate manual processes, deliver real-time visibility, and free leadership to grow—remotely, 24/7.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preisser Solutions | Your Ai Business Experts",
    description:
      "Streamline operations, automate invoices, and gain real-time visibility—so you can scale without the stress.",
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
