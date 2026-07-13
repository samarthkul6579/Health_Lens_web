import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "HealthLens | AI-Powered Health Report Intelligence & Tracker",
    template: "%s | HealthLens",
  },
  description:
    "Understand your medical reports with HealthLens. Upload PDFs or images to get clear explanations, metrics tracking, health trends, and doctor questions securely.",
  keywords: [
    "AI medical report analyzer",
    "understand medical reports",
    "health report analysis app",
    "medical report tracker",
    "AI health assistant",
    "compare medical reports",
    "personal health record vault",
  ],
  authors: [{ name: "HealthLens Team" }],
  creator: "HealthLens Inc.",
  metadataBase: new URL("https://healthlens-preview.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://healthlens-preview.vercel.app",
    title: "HealthLens - Understand Your Medical Reports with AI",
    description:
      "Get clear summaries, identify out-of-range values, track trends, and organize your family's reports securely in one dashboard.",
    siteName: "HealthLens",
    images: [
      {
        url: "/images/generated/hero_dashboard_mockup.png",
        width: 1200,
        height: 630,
        alt: "HealthLens Dashboard Mockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthLens - AI Medical Report Analyzer",
    description: "Understand. Track. Improve. Live Better. Your AI-powered health companion.",
    images: ["/images/generated/hero_dashboard_mockup.png"],
    creator: "@healthlens",
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
  // JSON-LD structured data for rich search engine results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HealthLens",
    "url": "https://healthlens-preview.vercel.app",
    "description": "AI-powered health companion to understand and track medical reports.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "iOS, Android, Web",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
    },
    "featureList": [
      "AI medical report analysis",
      "abnormal value identification",
      "long-term metric comparison and tracking",
      "AI health assistant chat",
      "doctor preparation question generation",
    ],
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-pale text-text-primary">
        <Navbar />
        <main className="flex-grow flex flex-col relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
