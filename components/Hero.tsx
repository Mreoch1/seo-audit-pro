"use client";

import Link from "next/link";

export default function Hero() {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white" aria-label="Hero section">
      <div className="section-container text-center">
        <h1 className="heading-1 text-white mb-6">
          Professional SEO Audit Service
          <br />
          <span className="text-accent-400">Enterprise-Grade Deep Analysis Starting at $19</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Get a comprehensive 100+ point inspection including Technical SEO, Core Web Vitals, Security Headers, and Content Depth. Delivered as a white-label PDF.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={scrollToOrder}
            className="btn-primary bg-accent-500 hover:bg-accent-600 text-gray-900 text-lg px-8 py-4 shadow-lg shadow-accent-500/20"
          >
            Start Your Audit
          </button>
          <Link
            href="/sample-report"
            className="bg-white/10 hover:bg-white/20 text-white border-2 border-white hover:border-white font-semibold rounded-lg transition-colors duration-200 text-lg px-8 py-4 inline-block text-center"
          >
            View Sample Report
          </Link>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Puppeteer & Lighthouse Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Core Web Vitals Check</span>
          </div>
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Agency-Ready White Label</span>
          </div>
        </div>
      </div>
    </section>
  );
}
