import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryAgent from "@/components/sections/QueryAgent";

export const metadata: Metadata = {
  title: {
    default: "aiCartograph — Knowledge Resolution Platform for SaaS Companies",
    template: "%s | aiCartograph",
  },
  description:
    "Every answer. Everywhere. The moment it matters. aiCartograph makes organizational knowledge work, not just exist.",
  metadataBase: new URL("https://aicartograph.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicartograph.com",
    siteName: "aiCartograph",
    title: "aiCartograph — Knowledge Resolution Platform for SaaS Companies",
    description:
      "Every answer. Everywhere. The moment it matters. Make knowledge work, not just exist.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "aiCartograph — Knowledge Resolution Platform",
    description:
      "Every answer. Everywhere. The moment it matters.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/aiCartograph_icon_final.svg",
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
        <QueryAgent />
      </body>
    </html>
  );
}
