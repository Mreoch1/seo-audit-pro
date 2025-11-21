"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What do I get with the audit?",
    answer: "A professional PDF report with overall SEO score, category breakdowns (Technical, On-Page, Content, Performance), prioritized action plan by week and severity, detailed page-level metrics, and step-by-step fix instructions for every issue.",
  },
  {
    question: "How long does it take?",
    answer: "Standard delivery: 3-5 business days. Need it fast? Add the 24-hour Fast Delivery option. Delivery time depends on your tier (number of pages) and site complexity.",
  },
  {
    question: "Will you implement the fixes for me?",
    answer: "The audit is a diagnostic service. You&apos;ll receive a detailed PDF with all issues and how to fix them. Implement changes yourself or share the report with your developer or SEO team.",
  },
  {
    question: "Is this using the same kind of checks as SEMrush / Ahrefs / SEOptimer?",
    answer: "Similar foundation, but deeper. I use real crawling with JavaScript rendering (Puppeteer), not just shallow HTML scans. Plus unique features like LLM Readability Analysis and a more personalized, actionable report format.",
  },
  {
    question: "Do you use AI? How?",
    answer: "AI assists with readability insights and report explanations. All data comes from real crawls, Google PageSpeed Insights API, and manual technical checks. The analysis is data-driven, not AI-generated guesses.",
  },
  {
    question: "What if I need more pages than my tier allows?",
    answer: "Add the Extra Pages add-on ($5 per page) to audit additional pages beyond your tier limit. Specify the quantity when placing your order.",
  },
  {
    question: "Can I get a competitor analysis?",
    answer: "Yes! The Advanced tier includes competitor keyword gap analysis. You can also add it as an add-on to Starter or Standard tiers for $20.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white text-gray-700 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

