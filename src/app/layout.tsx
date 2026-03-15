import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export const metadata: Metadata = {
  title: {
    default: "aiCartograph — Knowledge Resolution Platform for SaaS Companies",
    template: "%s | aiCartograph",
  },
  description:
    "Every answer. Everywhere. The moment it matters. aiCartograph makes organizational knowledge resolve problems for everyone who depends on it.",
  metadataBase: new URL("https://aicartograph.com"),
  keywords: [
    "knowledge resolution",
    "knowledge management",
    "SaaS knowledge platform",
    "AI knowledge base",
    "enterprise knowledge resolution",
    "knowledge health",
    "cross-source synthesis",
    "organizational knowledge",
    "aiCartograph",
    "knowledge resolution platform",
  ],
  authors: [{ name: "aiCartograph" }],
  creator: "aiCartograph",
  publisher: "aiCartograph",
  alternates: {
    canonical: "https://aicartograph.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicartograph.com",
    siteName: "aiCartograph",
    title: "aiCartograph — Knowledge Resolution Platform for SaaS Companies",
    description:
      "Every answer. Everywhere. The moment it matters. Make knowledge work, not just exist. aiCartograph resolves organizational knowledge for every team.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "aiCartograph - Knowledge Resolution Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "aiCartograph — Knowledge Resolution Platform",
    description:
      "Every answer. Everywhere. The moment it matters. Make knowledge work, not just exist.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  verification: {},
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "aiCartograph",
  applicationCategory: "BusinessApplication",
  description:
    "Knowledge Resolution Platform for SaaS Companies. Every answer. Everywhere. The moment it matters.",
  url: "https://aicartograph.com",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier available. Paid plans from $200/month.",
  },
  creator: {
    "@type": "Organization",
    name: "aiCartograph",
    url: "https://aicartograph.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://aicartograph.com" />
      </head>
      <body className="antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
