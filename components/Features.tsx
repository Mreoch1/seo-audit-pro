export default function Features() {
  const featureGroups = [
    {
      title: "Technical SEO",
      icon: "⚙️",
      features: [
        "HTTP/2 / HTTP/3 detection",
        "Compression (GZIP/Brotli)",
        "robots.txt & sitemap checks",
        "Status codes & broken pages",
        "Schema markup & identity schema",
      ],
    },
    {
      title: "On-Page SEO",
      icon: "📄",
      features: [
        "Page titles (missing, duplicate, too short/long)",
        "Meta descriptions (missing, duplicate, too short/long)",
        "H1/H2/H3 structure (missing/multiple H1)",
        "Canonical tags",
      ],
    },
    {
      title: "Content & Accessibility",
      icon: "✍️",
      features: [
        "Word count & thin content detection",
        "Content depth signal",
        "Image ALT attributes",
        "Basic mobile/viewport checks",
      ],
    },
    {
      title: "Performance & Core Web Vitals",
      icon: "⚡",
      features: [
        "LCP, FCP, CLS, INP, TTFB",
        "Top PageSpeed opportunities with potential savings",
        "Real crawling with JS rendering (Puppeteer)",
      ],
    },
    {
      title: "Unique Extras",
      icon: "🚀",
      features: [
        "LLM Readability Analysis (initial vs rendered HTML)",
        "Real competitor keyword gap analysis",
        "Identity Schema validation",
        "Consolidated issue list with affected pages",
        "White label option - no branding (perfect for agencies)",
      ],
    },
  ];

  return (
    <section id="features-section" className="bg-white">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">What&apos;s Included</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Every audit includes comprehensive checks across technical SEO, on-page optimization, content quality, and performance metrics.
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
              No fluff, no generic advice
            </p>
            <p className="text-gray-700">
              Every report is data-driven and actionable, with specific fixes for every issue found.
            </p>
          </div>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              White Label Available
            </p>
            <p className="text-gray-700">
              Perfect for agencies and resellers. Get reports without any branding - completely white label at no extra cost.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

