export default function Features() {
  const featureGroups = [
    {
      title: "Deep Technical Analysis",
      icon: "⚙️",
      features: [
        "Security (SSL, HSTS, CSP Headers)",
        "Server Config (HTTP/2, HTTP/3, Compression)",
        "Core Web Vitals (LCP, FID, CLS)",
        "JavaScript Execution & Rendering",
        "Status Codes & Redirect Chains",
      ],
    },
    {
      title: "On-Page Optimization",
      icon: "📄",
      features: [
        "Title Tag & Meta Description optimization",
        "Heading Structure (H1-H6) hierarchy",
        "Internal Linking & Anchor Text",
        "Image Alt Text quality check",
        "Canonical tags & Duplicate content",
      ],
    },
    {
      title: "Content Quality",
      icon: "✍️",
      features: [
        "Readability Scores (Flesch Reading Ease)",
        "Keyword Density & Distribution",
        "Content Depth & Freshness",
        "Thin Content Detection",
        "Semantic Keyword Analysis",
      ],
    },
    {
      title: "Site-Wide Health",
      icon: "🏥",
      features: [
        "Robots.txt & Sitemap validation",
        "Broken Internal/External Links",
        "Mobile Responsiveness check",
        "Social Media Tags (Open Graph/Twitter)",
        "404 Error Detection",
      ],
    },
    {
      title: "Advanced Insights",
      icon: "🚀",
      features: [
        "Competitor Keyword Gap Analysis",
        "Schema Markup Validation",
        "Page Speed & Performance Metrics",
        "Accessibility (ARIA, Contrast) check",
        "White Label Reports (Agency Ready)",
      ],
    },
    {
      title: "Actionable Reports",
      icon: "📊",
      features: [
        "0-100 Scoring System",
        "Prioritized Fix Instructions",
        "Code Snippets for Implementation",
        "Executive Summary for Clients",
        "Delivered as Professional PDF",
      ],
    },
  ];

  return (
    <section id="features-section" className="bg-white">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Comprehensive SEO Analysis</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Our enterprise-grade audits cover over 100+ checkpoints across technical infrastructure, on-page elements, content quality, and performance. <a href="/sample-report" className="text-primary-600 hover:text-primary-700 underline">View a sample report</a> to see the depth of our analysis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureGroups.map((group, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-primary-300 transition-colors">
              <div className="text-4xl mb-4">{group.icon}</div>
              <h3 className="heading-3 mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              No Generic Advice
            </p>
            <p className="text-gray-700">
              Every issue includes specific, step-by-step fix instructions tailored to your site's technology stack.
            </p>
          </div>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Agency-Ready White Label
            </p>
            <p className="text-gray-700">
              Perfect for agencies. We can deliver unbranded reports you can present directly to your clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
