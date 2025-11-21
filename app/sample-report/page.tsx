import type { Metadata } from "next";
import SampleReportContent from "./SampleReportContent";

export const metadata: Metadata = {
  title: "Sample SEO Audit Report - See What You'll Get",
  description: "View a sample SEO audit report to see exactly what you'll receive: overall scores, category breakdowns, prioritized action plans, and detailed page-level metrics.",
  keywords: ["sample SEO audit", "SEO audit example", "SEO report sample", "SEO audit preview"],
  openGraph: {
    title: "Sample SEO Audit Report - SEO Audit Pro",
    description: "View a sample SEO audit report to see exactly what you'll receive with your order.",
    url: "https://seoauditpro.netlify.app/sample-report",
  },
  alternates: {
    canonical: "https://seoauditpro.netlify.app/sample-report",
  },
};

export default function SampleReportPage() {
  return <SampleReportContent />;
}

