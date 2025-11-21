import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://seoauditpro.net"),
  title: {
    default: "SEO Audit Pro - Agency-Grade SEO Audits Without the Agency Price",
    template: "%s | SEO Audit Pro",
  },
  description: "Get a professional, data-driven SEO audit with clear scores, prioritized fixes, and step-by-step action plans. Starting at $19. Trusted by businesses and agencies worldwide.",
  keywords: [
    "SEO audit",
    "SEO analysis",
    "website audit",
    "SEO checker",
    "technical SEO",
    "on-page SEO",
    "SEO report",
    "SEO audit tool",
    "affordable SEO audit",
    "professional SEO audit",
    "SEO audit service",
    "website SEO analysis",
    "SEO audit report",
    "SEO audit pricing",
    "SEO audit tool",
  ],
  authors: [{ name: "SEO Audit Pro" }],
  creator: "SEO Audit Pro",
  publisher: "SEO Audit Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seoauditpro.net",
    siteName: "SEO Audit Pro",
    title: "SEO Audit Pro - Agency-Grade SEO Audits Without the Agency Price",
    description: "Get a professional, data-driven SEO audit with clear scores, prioritized fixes, and step-by-step action plans. Starting at $19.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEO Audit Pro - Professional SEO Audit Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Audit Pro - Agency-Grade SEO Audits",
    description: "Get a professional, data-driven SEO audit with clear scores, prioritized fixes, and step-by-step action plans. Starting at $19.",
    images: ["/og-image.jpg"],
    creator: "@seoauditpro",
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
  alternates: {
    canonical: "https://seoauditpro.net",
  },
  category: "SEO Services",
  classification: "Business",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://seoauditpro.net" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="application-name" content="SEO Audit Pro" />
        <meta name="apple-mobile-web-app-title" content="SEO Audit Pro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "SEO Audit Pro",
              description: "Professional SEO audit service providing data-driven website analysis with clear scores, prioritized fixes, and actionable recommendations.",
              url: "https://seoauditpro.net",
              logo: "https://seoauditpro.net/logo.png",
              image: "https://seoauditpro.net/og-image.jpg",
              priceRange: "$19-$199",
              areaServed: "Worldwide",
              serviceType: "SEO Audit",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: "19",
                priceValidUntil: "2025-12-31",
                availability: "https://schema.org/InStock",
                url: "https://seoauditpro.net",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SEO Audit Pro",
              url: "https://seoauditpro.net",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://seoauditpro.netlify.app/?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SEO Audit Pro",
              url: "https://seoauditpro.net",
              logo: "https://seoauditpro.netlify.app/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "mreoch82@hotmail.com",
                contactType: "Customer Service",
                areaServed: "Worldwide",
                availableLanguage: "English",
              },
              sameAs: [
                "https://twitter.com/seoauditpro",
                "https://linkedin.com/company/seoauditpro",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What do I get with the audit?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You receive a professional PDF report with an overall SEO score, category breakdowns (Technical, On-Page, Content, Performance), a prioritized action plan organized by week and severity, detailed page-level metrics, and step-by-step instructions to fix every issue found.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long does it take?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Standard delivery: 3-5 business days. Need it fast? Add the 24-hour Fast Delivery option.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will you implement the fixes for me?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, the audit is a diagnostic service. You'll receive a detailed PDF with all issues and how to fix them. Implement changes yourself or share the report with your developer/SEO team.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

