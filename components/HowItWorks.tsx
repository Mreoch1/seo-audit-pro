export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Select Tier & Options",
      description: "Choose your audit depth (Starter, Standard, Professional, or Agency) and add any extras like competitor analysis. Need more than 200 pages? Contact us for Enterprise pricing.",
      icon: (
        <svg aria-hidden="true" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "I Execute the Deep Scan",
      description: "I manually initiate enterprise crawlers (Puppeteer/Lighthouse) to analyze security, JS rendering, and 100+ technical signals.",
      icon: (
        <svg aria-hidden="true" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "You Get the PDF Report",
      description: "You receive a branded PDF via email within 2-5 business days (based on tier) or 24 hours with expedited delivery. Report contains prioritized scores, fixes, and code snippets.",
      icon: (
        <svg aria-hidden="true" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      number: "4",
      title: "Fix & Improve",
      description: "Hand the report to your dev team or implement the step-by-step fixes yourself to boost your rankings.",
      icon: (
        <svg aria-hidden="true" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-gray-50">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">How It Works</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          No automated &quot;instant&quot; fluff. This is a comprehensive service where I use advanced tools to inspect your site structure, security, and content depth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary-50 rounded-full opacity-50"></div>
              <div className="relative z-10">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4 mx-auto">
                {step.icon}
              </div>
              <div className="text-center">
                  <div className="text-sm font-bold tracking-widest text-accent-600 mb-2 uppercase">Step {step.number}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
