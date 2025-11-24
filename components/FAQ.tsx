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
    answer: "Delivery time varies by tier: Starter (2 days), Standard (3 days), Professional (4 days), Agency (5 days). Need it faster? Add the 24-Hour Expedited Report add-on for an extra $15 to receive your report within 24 business hours.",
  },
  {
    question: "Will you implement the fixes for me?",
    answer: "The audit is a diagnostic service. You'll receive a detailed PDF with all issues and instructions on how to fix them. You can implement the changes yourself or share the report with your developer or SEO team.",
  },
  {
    question: "Is this using the same kind of checks as SEMrush / Ahrefs / SEOptimer?",
    answer: "It builds on a similar foundation, but goes deeper. I use real crawling with JavaScript rendering (Puppeteer), not just shallow HTML scans. Plus, it includes unique features like LLM Readability Analysis and a more personalized, actionable report format.",
  },
  {
    question: "Do you use AI? How?",
    answer: "AI assists with readability insights and report explanations. All data comes from real crawls, Google PageSpeed Insights API, and manual technical checks. The analysis is data-driven, not AI-generated guesses.",
  },
  {
    question: "What if I need more pages than my tier allows?",
    answer: "Add the Additional Pages add-on ($5 per 50 pages) to audit more pages beyond your tier limit. Specify the quantity when placing your order.",
  },
  {
    question: "Can I get a competitor analysis?",
    answer: "Yes! The Agency tier includes 3 competitor keyword gap analyses. You can also add competitor analysis as an add-on to Starter or Standard tiers for $15.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-12">
          <span className="gradient-text">Frequently Asked Questions</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="group border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 transition-all duration-300 hover:shadow-lg">
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary-600" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gradient-to-br from-primary-50/50 to-white text-gray-700 border-t-2 border-primary-200 animate-slide-up">
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

