export default function Testimonials() {
  const testimonials = [
    {
      quote: "The audit was clearer than anything I've ever gotten from a big SEO tool. I knew exactly which fixes to prioritize.",
      name: "Jordan T.",
      role: "Owner, local service business",
    },
    {
      quote: "The PDF broke everything down by week, which made it easy to hand off to my developer.",
      name: "Alex R.",
      role: "Marketing lead, SaaS startup",
    },
    {
      quote: "I used the recommendations to fix a handful of issues and already see better organic visibility.",
      name: "Sam K.",
      role: "Freelance web developer",
    },
  ];

  return (
    <section id="testimonials" className="bg-gray-50">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">What clients say</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Here&apos;s the kind of feedback SEO Audit Pro aims for. Replace these with real client reviews as they come in.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-primary-400 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6 italic">&quot;{testimonial.quote}&quot;</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500">
          *Testimonials shown are illustrative examples. Replace with real client feedback as it becomes available.
        </p>
      </div>
    </section>
  );
}

