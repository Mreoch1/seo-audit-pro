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
              Don&apos;t settle for generic automated stats. See the depth of a manually-verified enterprise audit.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="heading-3 mb-6">Inside Your Report: The &quot;Action Plan&quot; Page</h2>
            <p className="text-gray-600 mb-8">
              Every report includes a <strong>Prioritized Action Plan</strong> like the one below. It translates technical data into a clear checklist for your dev team.
            </p>

            {/* Detailed Action Plan Preview */}
            <div className="bg-white border border-gray-300 shadow-sm mb-10 overflow-hidden rounded">
               {/* Header simulating PDF page */}
               <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Action Plan • Page 3</span>
                 <span className="text-xs text-gray-400">seo-audit-pro-report.pdf</span>
               </div>
               
               <div className="p-6 md:p-10">
                 <div className="mb-8">
                   <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">1. Critical Priority Fixes</h3>
                   <p className="text-sm text-gray-600 mb-4">These issues are actively hurting your rankings or security. Fix immediately.</p>
                   
                   <table className="w-full text-sm text-left text-gray-600 border-collapse">
                     <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
                       <tr>
                         <th className="px-4 py-3 border border-gray-200">Issue</th>
                         <th className="px-4 py-3 border border-gray-200">Technical Detail</th>
                         <th className="px-4 py-3 border border-gray-200 w-24 text-center">Effort</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr>
                         <td className="px-4 py-3 border border-gray-200 font-semibold text-red-600">HTTP/2 Not Enabled</td>
                         <td className="px-4 py-3 border border-gray-200">
                           Server is using HTTP/1.1. HTTP/2 multiplexing is required for LCP performance.
                           <div className="mt-1 font-mono text-xs bg-gray-100 p-1 rounded">Action: Update Nginx config `listen 443 ssl http2;`</div>
                         </td>
                         <td className="px-4 py-3 border border-gray-200 text-center">Low</td>
                       </tr>
                       <tr>
                         <td className="px-4 py-3 border border-gray-200 font-semibold text-red-600">Missing Canonical Tags</td>
                         <td className="px-4 py-3 border border-gray-200">
                           5 pages (including Homepage) lack self-referencing canonicals, risking duplicate content penalties.
                         </td>
                         <td className="px-4 py-3 border border-gray-200 text-center">Low</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>

                 <div className="mb-8">
                   <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">2. High Priority Fixes</h3>
                   <p className="text-sm text-gray-600 mb-4">Optimizations that will yield significant ranking improvements.</p>
                   
                   <table className="w-full text-sm text-left text-gray-600 border-collapse">
                     <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs">
                       <tr>
                         <th className="px-4 py-3 border border-gray-200">Issue</th>
                         <th className="px-4 py-3 border border-gray-200">Technical Detail</th>
                         <th className="px-4 py-3 border border-gray-200 w-24 text-center">Effort</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr>
                         <td className="px-4 py-3 border border-gray-200 font-semibold text-orange-600">Unoptimized Images (LCP)</td>
                         <td className="px-4 py-3 border border-gray-200">
                           Hero image `hero-bg.png` is 2.4MB. 
                           <div className="mt-1 font-mono text-xs bg-gray-100 p-1 rounded">Action: Convert to WebP/AVIF & Resize to max 1920px.</div>
                         </td>
                         <td className="px-4 py-3 border border-gray-200 text-center">Med</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Full 30+ Page Report</h3>
                <p className="text-gray-600 text-sm">
                  Beyond the action plan, you get deep dives into Schema, Competitor Gaps, and Content Depth.
                </p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Code-Level Specifics</h3>
                <p className="text-gray-600 text-sm">
                  We don&apos;t just say &quot;Fix it.&quot; We give you the exact Nginx config, HTML tag, or CSS change needed.
                </p>
              </div>
            </div>

            <div className="text-center">
              {!pdfExists && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> The sample PDF is currently being updated. <a href="mailto:contact@seoauditpro.net" className="text-yellow-800 underline hover:text-yellow-900">Contact us</a> for a direct copy.
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
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Full Sample PDF
                  </a>
                  <p className="text-sm text-gray-500 mb-6">
                    Includes full technical breakdown & competitor analysis example.
                  </p>
                </>
              ) : null}

              <Link
                href="/#order-section"
                className="btn-secondary inline-block"
              >
                Order Your Own Audit
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
