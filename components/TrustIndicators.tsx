export default function TrustIndicators() {
  return (
    <section className="bg-white border-y border-gray-200">
      <div className="section-container py-12">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
            Trusted by Businesses & Marketers
          </p>
          <p className="text-gray-600">
            Professional SEO audits for agencies, developers, and business owners
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
          <div className="text-gray-400 font-semibold text-sm">Business Owners</div>
          <div className="text-gray-400 font-semibold text-sm">Marketing Agencies</div>
          <div className="text-gray-400 font-semibold text-sm">Web Developers</div>
          <div className="text-gray-400 font-semibold text-sm">SEO Professionals</div>
        </div>
      </div>
    </section>
  );
}

