"use client";

import Link from "next/link";

export default function SampleReport() {
  const features = [
    {
      title: "Executive Summary & Score",
      description: "Instantly understand your site's health with a clear 0-100 score and high-level breakdown.",
      icon: "📊",
    },
    {
      title: "Prioritized Fix Roadmap",
      description: "Know exactly what to tackle first. Issues are ranked by impact (Critical, High, Medium).",
      icon: "🚦",
    },
    {
      title: "Developer-Ready Instructions",
      description: "Specific code snippets and technical details your dev team can implement immediately.",
      icon: "💻",
    },
  ];

  return (
    <section className="bg-gray-50">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Real Sample Report</h2>
        <p className="text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          We don&apos;t hide behind generic advice. Here is an example of the <strong>Prioritized Action Plan</strong> page you&apos;ll receive—clear, actionable, and ranked by impact.
        </p>
        
        {/* PDF Preview Mockup - High Fidelity Action Plan */}
        <div className="mb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
            {/* Browser Window Header */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 bg-white rounded px-4 py-1.5 text-sm text-gray-500 ml-4 flex justify-between items-center">
                <span>seo-audit-action-plan.pdf</span>
                <span className="text-xs text-gray-400">Page 3 of 12</span>
              </div>
            </div>
            
            {/* PDF Page Content - Action Plan */}
            <div className="bg-white p-8 md:p-16 text-gray-800 font-sans">
              {/* Report Header */}
              <div className="flex justify-between items-end border-b-2 border-gray-900 pb-4 mb-8">
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-wider text-gray-900">Prioritized Action Plan</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Technical & On-Page Fixes</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-400">SEO AUDIT PRO</div>
                  <div className="text-xs text-gray-400">Nov 21, 2025</div>
                    </div>
                  </div>
                  
              {/* Critical Issues Table */}
              <div className="mb-10">
                <h4 className="flex items-center gap-3 text-lg font-bold text-red-700 mb-4 bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  CRITICAL PRIORITY (Immediate Fixes)
                </h4>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Issue</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Impact & Recommendation</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/6">Difficulty</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 align-top">
                          <span className="font-semibold text-gray-900">Missing HSTS Header</span>
                          <div className="text-xs text-gray-500 mt-1">Security / Technical</div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800 font-medium mb-1">Enforce HTTPS security</p>
                          <p className="text-sm text-gray-600 mb-2">Your server is missing the <code>Strict-Transport-Security</code> header. This is a critical security signal for Google.</p>
                          <div className="bg-gray-50 p-2 rounded border border-gray-200 font-mono text-xs text-gray-700">
                            Strict-Transport-Security: max-age=31536000; includeSubDomains
                      </div>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Easy
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 align-top">
                          <span className="font-semibold text-gray-900">Core Web Vitals (LCP)</span>
                          <div className="text-xs text-gray-500 mt-1">Performance</div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800 font-medium mb-1">LCP is 4.2s (Target: &lt;2.5s)</p>
                          <p className="text-sm text-gray-600">Large hero image <code>banner-main.jpg</code> is not preloaded and lacks explicit width/height.</p>
                          <p className="text-sm text-blue-600 mt-1 font-medium">Action: Convert to WebP & add <code>&lt;link rel=&quot;preload&quot;&gt;</code></p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Medium
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                    </div>
                  </div>
                  
              {/* High Priority Issues Table */}
              <div>
                <h4 className="flex items-center gap-3 text-lg font-bold text-orange-700 mb-4 bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  HIGH PRIORITY (Fix This Week)
                </h4>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Issue</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Impact & Recommendation</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/6">Difficulty</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 align-top">
                          <span className="font-semibold text-gray-900">Multiple H1 Tags</span>
                          <div className="text-xs text-gray-500 mt-1">On-Page SEO</div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800 font-medium mb-1">Confusing page structure</p>
                          <p className="text-sm text-gray-600">Homepage contains 3 &lt;h1&gt; tags. Search engines expect exactly one main heading per page.</p>
                          <p className="text-sm text-blue-600 mt-1 font-medium">Action: Change secondary headings to &lt;h2&gt;</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Easy
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* PDF Footer */}
              <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between text-xs text-gray-400">
                <span>Confidential Audit Report</span>
                <span>Page 3</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
