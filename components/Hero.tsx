"use client";

import Link from "next/link";

export default function Hero() {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white" aria-label="Hero section">
      <div className="section-container text-center">
        <h1 className="heading-1 text-white mb-6">
          Professional SEO Audit Service
          <br />
          <span className="text-accent-400">Agency-Grade Reports Starting at $19</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Get an agency-grade SEO audit with clear scores, prioritized fixes, and a step-by-step action plan. You send your URL — I do the rest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={scrollToOrder}
            className="btn-primary bg-accent-500 hover:bg-accent-600 text-gray-900 text-lg px-8 py-4"
          >
            Get Your SEO Audit
          </button>
          <Link
            href="/sample-report"
            className="bg-white/10 hover:bg-white/20 text-white border-2 border-white hover:border-white font-semibold rounded-lg transition-colors duration-200 text-lg px-8 py-4 inline-block text-center"
          >
            View Sample Report
          </Link>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Built with Next.js, Puppeteer & Google PageSpeed Insights
          </div>
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Ideal for business owners, marketers, and developers
          </div>
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            White label option available - perfect for agencies
          </div>
        </div>
      </div>
    </section>
  );
}

