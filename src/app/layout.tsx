import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Cartograph — The Knowledge Resolution Platform for SaaS Companies",
    template: "%s | Cartograph",
  },
  description:
    "Your documentation already has the answers. Cartograph makes sure people actually find them. The Knowledge Resolution Platform for SaaS Companies.",
  metadataBase: new URL("https://aicartograph.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicartograph.com",
    siteName: "Cartograph",
    title: "Cartograph — The Knowledge Resolution Platform for SaaS Companies",
    description:
      "Your documentation already has the answers. Cartograph makes sure people actually find them.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartograph — The Knowledge Resolution Platform",
    description:
      "Your documentation already has the answers. Cartograph makes sure people actually find them.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
