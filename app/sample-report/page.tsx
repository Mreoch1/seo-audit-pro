import type { Metadata } from "next";
import SampleReportContent from "./SampleReportContent";

export const metadata: Metadata = {
  title: "Sample SEO Audit Report",
  description: "View a sample SEO audit report with overall scores, category breakdowns, prioritized action plans, and detailed page-level metrics. See exactly what you'll receive with your order.",
  keywords: ["sample SEO audit", "SEO audit example", "SEO report sample", "SEO audit preview"],
  openGraph: {
    title: "Sample SEO Audit Report - SEO Audit Pro",
    description: "View a sample SEO audit report to see exactly what you'll receive with your order. Includes scores, action plans, and detailed recommendations.",
    url: "https://seoauditpro.net/sample-report",
  },
  alternates: {
    canonical: "https://seoauditpro.net/sample-report",
  },
};

export default function SampleReportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sample SEO Audit Report",
            description: "View a sample SEO audit report to see exactly what you'll receive with your SEO audit order.",
            url: "https://seoauditpro.net/sample-report",
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What's included in the SEO audit report?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Each report includes an overall SEO score (0-100), category breakdowns for Technical SEO, On-Page SEO, Content Quality, and Performance, a prioritized action plan organized by week and severity, detailed page-level metrics, and step-by-step instructions to fix every issue found.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What format is the report delivered in?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Reports are delivered as professional PDF files that are easy to share with your team, developers, or SEO consultants. The PDF format ensures consistent formatting and easy printing if needed.",
                  },
                },
              ],
            },
          }),
        }}
      />
      <SampleReportContent />
    </>
  );
}

