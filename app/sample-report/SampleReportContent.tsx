"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SampleReportContent() {
  const [pdfExists, setPdfExists] = useState(true);

  useEffect(() => {
    fetch("/sample-report.pdf", { method: "HEAD" })
      .then(res => {
        if (!res.ok) {
          setPdfExists(false);
        }
      })
      .catch(() => {
        setPdfExists(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">Sample SEO Audit Report</h1>
            <p className="text-xl text-gray-600 mb-8">
              See exactly what you&apos;ll receive with your SEO audit
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="heading-3 mb-6">What&apos;s Included in Your Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Overall SEO Score</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive score (0-100) plus category breakdowns for Technical, On-Page, Content, and Performance.
                </p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Priority Action Plan</h3>
                <p className="text-gray-600 text-sm">
                  Issues organized by severity (High/Medium/Low) with a week-by-week implementation timeline.
                </p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Page-Level Metrics</h3>
                <p className="text-gray-600 text-sm">
                  Detailed tables showing every page, its issues, word count, load time, and link structure.
                </p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Step-by-Step Fixes</h3>
                <p className="text-gray-600 text-sm">
                  Every issue includes specific instructions on how to fix it, with examples and best practices.
                </p>
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Report Highlights</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional PDF format - easy to share with your team</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Data-driven insights - no generic advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>White label option available - no branding if you prefer</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ready to implement - actionable recommendations for every issue</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Understanding Your SEO Audit Report</h3>
              <p className="text-gray-700 mb-4">
                Our SEO audit reports give you a clear picture of your website&apos;s search engine health. Each report starts with an executive summary. This shows your site&apos;s overall performance with a score from 0 to 100. You also get separate scores for Technical SEO, On-Page SEO, Content Quality, and Accessibility. Learn more about our <Link href="/#pricing" className="text-primary-600 hover:text-primary-700 underline">pricing tiers</Link> to see which audit level fits your needs.
              </p>
              <p className="text-gray-700 mb-4">
                The priority action plan sorts all issues by how important they are. High priority issues need immediate attention. Medium priority issues come next. Low priority issues can wait. The plan also includes a week-by-week timeline. This helps you fix problems in the right order. Each issue explains why it matters, which pages have the problem, and exactly how to fix it. Check out our <Link href="/#features-section" className="text-primary-600 hover:text-primary-700 underline">features page</Link> to see what else is included.
              </p>
              <p className="text-gray-700 mb-4">
                Page-level findings show details for every page we check. You&apos;ll see word count, load time, link structure, and specific problems. Performance metrics include Core Web Vitals from Google PageSpeed Insights. This helps you understand both technical performance and user experience. See how our <Link href="/#how-it-works" className="text-primary-600 hover:text-primary-700 underline">process works</Link> to understand how we gather this data.
              </p>
              <p className="text-gray-700 mb-4">
                The report includes competitor keyword gap analysis for Advanced tier orders. This shows keywords your competitors use that you don&apos;t. It also lists keywords you already target that competitors use. This helps you find new opportunities and see where you compete. <Link href="/#order-section" className="text-primary-600 hover:text-primary-700 underline">Order an Advanced tier audit</Link> to get this analysis included.
              </p>
              <p className="text-gray-700 mb-4">
                Schema markup analysis checks if your pages use structured data. Structured data helps search engines understand your content. This can improve how your pages appear in search results with rich snippets and enhanced listings. You can add schema markup as an add-on to any tier.
              </p>
              <p className="text-gray-700">
                Our reports work for everyone. Business owners can improve their search visibility. Marketing agencies get detailed reports for clients. Developers get clear instructions for implementing fixes. Every report provides actionable insights you can use right away. Ready to get started? <Link href="/#order-section" className="text-primary-600 hover:text-primary-700 underline">Order your SEO audit</Link> today or <Link href="/" className="text-primary-600 hover:text-primary-700 underline">return to the homepage</Link> to learn more.
              </p>
            </div>

            <div className="text-center">
              {!pdfExists && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> The sample PDF is currently being prepared. In the meantime, you can see a preview of the report structure above, or <a href="mailto:contact@seoauditpro.net" className="text-yellow-800 underline hover:text-yellow-900">contact us directly</a> to request a sample report.
                  </p>
                </div>
              )}

              {pdfExists ? (
                <>
                  <a
                    href="/sample-report.pdf"
                    download="SEO-Audit-Pro-Sample-Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg mb-4"
                    aria-label="Download sample SEO audit report PDF"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Sample Report (PDF)
                  </a>
                  <p className="text-sm text-gray-500 mb-6">
                    Click to download the full PDF report.
                  </p>
                </>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <p className="text-blue-800 mb-4">
                    <strong>Sample PDF Available Soon</strong>
                  </p>
                  <p className="text-blue-700 text-sm mb-4">
                    We&apos;re preparing a comprehensive sample report that demonstrates all the features and insights you&apos;ll receive with your SEO audit. The sample will include real examples of scores, action plans, and detailed recommendations.
                  </p>
                  <p className="text-blue-700 text-sm">
                    In the meantime, you can <a href="mailto:contact@seoauditpro.net" className="text-blue-800 underline hover:text-blue-900 font-semibold">contact us directly</a> to request a sample report or ask any questions about what&apos;s included.
                  </p>
                </div>
              )}

              <Link
                href="/#order-section"
                className="btn-secondary inline-block"
                aria-label="Order your SEO audit"
              >
                Order Your SEO Audit
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold" aria-label="Back to home page">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

