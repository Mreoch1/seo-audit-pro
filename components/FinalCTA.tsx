"use client";

import Link from "next/link";

export default function FinalCTA() {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
      <div className="section-container text-center py-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Ready to Improve Your SEO?
        </h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Get your agency-grade SEO audit starting at just $19
        </p>
        <button
          onClick={scrollToOrder}
          className="btn-primary bg-accent-500 hover:bg-accent-600 text-gray-900 text-lg px-8 py-4"
        >
          Get Your SEO Audit
        </button>
        <p className="text-sm text-gray-300 mt-4">
          No subscriptions. No dashboards. Just actionable insights delivered as a professional PDF.
        </p>
      </div>
    </section>
  );
}

