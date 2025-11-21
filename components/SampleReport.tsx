"use client";

import Link from "next/link";

export default function SampleReport() {
  const features = [
    {
      title: "Clear SEO score and category breakdown",
      description: "Get an overall score plus individual scores for Technical, On-Page, Content, and Performance.",
      icon: "📊",
    },
    {
      title: "Priority action plan by severity and week",
      description: "Every issue is prioritized by severity and organized into a week-by-week implementation plan.",
      icon: "📅",
    },
    {
      title: "Page-level metrics with issues and fixes",
      description: "Detailed tables showing every page, its issues, and step-by-step instructions to fix them.",
      icon: "📋",
    },
  ];

  return (
    <section className="bg-gray-50">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Sample Report</h2>
        <p className="text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          See what you&apos;ll get in your professional PDF report
        </p>
        
        {/* PDF Preview Mockup */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
            {/* Browser Window Mockup */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 bg-white rounded px-4 py-1.5 text-sm text-gray-500 ml-4">
                sample-report.pdf
              </div>
            </div>
            
            {/* PDF Preview Content */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12">
              <div className="max-w-2xl mx-auto">
                {/* PDF Header */}
                <div className="text-center mb-8 pb-8 border-b-2 border-primary-200">
                  <h3 className="text-3xl font-bold text-primary-900 mb-2">SEO AUDIT PRO</h3>
                  <p className="text-gray-600">SEO Site Audit Report</p>
                </div>
                
                {/* Sample Content Blocks */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900">Overall Performance</h4>
                      <div className="text-3xl font-bold text-primary-600">80/100</div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Technical SEO</div>
                        <div className="font-semibold text-gray-900">85/100</div>
                      </div>
                      <div>
                        <div className="text-gray-500">On-Page SEO</div>
                        <div className="font-semibold text-gray-900">75/100</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Content Quality</div>
                        <div className="font-semibold text-gray-900">100/100</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Accessibility</div>
                        <div className="font-semibold text-gray-900">62/100</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-3">Priority Action Plan</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">HIGH</span>
                        <span className="text-gray-700">Week 1: Fix missing alt attributes (16 images)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">MEDIUM</span>
                        <span className="text-gray-700">Week 2: Add Identity Schema markup</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">MEDIUM</span>
                        <span className="text-gray-700">Week 3: Optimize meta descriptions (5 pages)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-3">Page-Level Metrics</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Homepage</span>
                        <span>2 issues • 3,245 words • 3.2s load</span>
                      </div>
                      <div className="flex justify-between">
                        <span>About Page</span>
                        <span>1 issue • 1,892 words • 2.8s load</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Services Page</span>
                        <span>3 issues • 2,156 words • 3.5s load</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Report Link */}
        <div className="text-center">
          <Link
            href="/sample-report"
            className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Full Sample Report
          </Link>
          <p className="text-sm text-gray-500 mt-3">Download the complete PDF to see all features</p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

