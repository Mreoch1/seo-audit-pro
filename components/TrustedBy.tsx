export default function TrustedBy() {
  const categories = [
    "Agencies & Consultants",
    "Local Service Businesses",
    "SaaS & Startups",
    "E-commerce Stores",
  ];

  return (
    <section id="trusted-by" className="bg-white">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Trusted by teams who care about SEO</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          I work with solo founders, agencies, and in-house teams across SaaS, local services, and e-commerce—no spammy tactics, just clear audits and actionable fixes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors shadow-sm"
            >
              <p className="text-gray-900 font-semibold">{category}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500">
          *Categories shown are examples. Logos and names are placeholders, not endorsements.
        </p>
      </div>
    </section>
  );
}

