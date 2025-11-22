"use client";

import { useState, FormEvent, useEffect } from "react";
import { useOrder } from "@/contexts/OrderContext";

interface FormData {
  name: string;
  email: string;
  websiteUrl: string;
  tier: string;
  addOns: string[];
  notes: string;
  extraPages: number;
  extraKeywords: number;
  whiteLabel: boolean;
  competitorUrls: string[];
}

const tierPrices: Record<string, number> = {
  starter: 19,
  standard: 39,
  professional: 59,
  agency: 99,
};

const addOnPrices: Record<string, number> = {
  "white-label": 10,
  "extra-pages": 5,
  "extra-keywords": 1,
  "schema-deep-dive": 15,
  "competitor-report": 15,
  "extra-competitors": 10,
  "extra-crawl-depth": 15,
};

// Helper function to ensure URL has https:// prefix
const ensureHttps = (url: string): string => {
  if (!url || url.trim() === "") return url;
  const trimmed = url.trim();
  // If it already has http:// or https://, return as is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  // Otherwise, add https://
  return `https://${trimmed}`;
};

export default function OrderForm() {
  const { orderState, setTier, toggleAddOn, setExtraPages, setExtraKeywords, setWhiteLabel, setCompetitorUrls } = useOrder();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    websiteUrl: "",
    tier: "standard",
    addOns: [],
    notes: "",
    extraPages: 0,
    extraKeywords: 0,
    whiteLabel: false,
    competitorUrls: ["", "", ""],
  });

  // Sync form with context whenever context changes
  useEffect(() => {
    const addOnsArray = Array.from(orderState.addOns);
    setFormData((prev) => ({
      ...prev,
      tier: orderState.tier,
      addOns: addOnsArray,
      extraPages: orderState.extraPages,
      extraKeywords: orderState.extraKeywords,
      whiteLabel: orderState.whiteLabel,
      competitorUrls: orderState.competitorUrls,
    }));
  }, [orderState.tier, orderState.extraPages, orderState.extraKeywords, orderState.addOns, orderState.whiteLabel, orderState.competitorUrls]);

  const calculateTotal = () => {
    let total = tierPrices[formData.tier] || 39;
    formData.addOns.forEach((addOnId) => {
      // Skip add-ons that are included in the selected tier
      if (addOnId === "white-label" && formData.tier === "agency") {
        return; // Included free in Agency tier
      }
      if (addOnId === "competitor-report" && formData.tier === "agency") {
        return; // 3 competitors included in Agency tier
      }
      if (addOnId === "extra-keywords" && formData.tier === "agency") {
        return; // Unlimited keywords in Agency tier
      }
      if (addOnId === "extra-pages" && formData.tier === "agency") {
        return; // Unlimited pages in Agency tier
      }
      // Skip schema-deep-dive if not Starter tier
      if (addOnId === "schema-deep-dive" && formData.tier !== "starter") {
        return;
      }
      // Skip competitor-report if not Starter/Standard
      if (addOnId === "competitor-report" && (formData.tier === "professional" || formData.tier === "agency")) {
        return;
      }
      // Skip extra-competitors and extra-crawl-depth if not Agency
      if ((addOnId === "extra-competitors" || addOnId === "extra-crawl-depth") && formData.tier !== "agency") {
        return;
      }
      
      if (addOnId === "extra-pages") {
        total += addOnPrices["extra-pages"] * formData.extraPages;
      } else if (addOnId === "extra-keywords") {
        total += addOnPrices["extra-keywords"] * formData.extraKeywords;
      } else {
        total += addOnPrices[addOnId] || 0;
      }
    });
    return total;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const showCompetitorFields = formData.tier === "agency" || formData.addOns.includes("competitor-report");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const totalPrice = calculateTotal();

    // Ensure website URL has https:// prefix
    const websiteUrlWithHttps = ensureHttps(formData.websiteUrl);

    // Filter out empty competitor URLs and ensure they have https:// prefix
    const validCompetitorUrls = formData.competitorUrls
      .filter(url => url.trim() !== "")
      .map(url => ensureHttps(url));

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          websiteUrl: websiteUrlWithHttps,
          tier: formData.tier,
          addOns: formData.addOns, // Pass IDs directly
          totalPrice,
          notes: formData.notes,
          extraPages: formData.extraPages,
          extraKeywords: formData.extraKeywords,
          whiteLabel: formData.whiteLabel,
          competitorUrls: validCompetitorUrls,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to create checkout session. Please try again.",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
      setIsSubmitting(false);
    }
  };

  const handleWebsiteUrlChange = (value: string) => {
    setFormData({ ...formData, websiteUrl: value });
  };

  const handleWebsiteUrlBlur = () => {
    // Add https:// when user leaves the field if it's missing
    if (formData.websiteUrl.trim() && !formData.websiteUrl.startsWith("http://") && !formData.websiteUrl.startsWith("https://")) {
      setFormData({ ...formData, websiteUrl: ensureHttps(formData.websiteUrl) });
    }
  };

  const handleCompetitorUrlChange = (index: number, value: string) => {
    const newUrls = [...formData.competitorUrls];
    newUrls[index] = value;
    setCompetitorUrls(newUrls);
    setFormData({ ...formData, competitorUrls: newUrls });
  };

  const handleCompetitorUrlBlur = (index: number) => {
    // Add https:// when user leaves the field if it's missing
    const url = formData.competitorUrls[index];
    if (url.trim() && !url.startsWith("http://") && !url.startsWith("https://")) {
      const newUrls = [...formData.competitorUrls];
      newUrls[index] = ensureHttps(url);
      setCompetitorUrls(newUrls);
      setFormData({ ...formData, competitorUrls: newUrls });
    }
  };

  return (
    <section id="order-form" className="bg-white">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Request Your SEO Audit</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Pick a tier, choose any add-ons, and send your details. I&apos;ll confirm by email and start your audit.
        </p>

        <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="john@example.com"
              />
            </div>

            {/* Website URL Field */}
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                Website URL to Audit <span className="text-red-500">*</span>
                <span className="block text-xs font-normal text-gray-500 mt-1">
                  Just type the domain (e.g., example.com) - we&apos;ll add https:// automatically
                </span>
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                  https://
                </span>
                <input
                  type="text"
                  id="websiteUrl"
                  required
                  value={formData.websiteUrl.replace(/^https?:\/\//, "")}
                  onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                  onBlur={handleWebsiteUrlBlur}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="example.com"
                />
              </div>
            </div>

            {/* Competitor URLs - Show when competitor option is selected or Agency tier */}
            {showCompetitorFields && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {formData.tier === "agency" ? (
                    <>
                      Competitor URLs (3 included)
                      <span className="block text-xs font-normal text-gray-500 mt-1">
                        Enter up to 3 competitor websites for keyword gap analysis. Just type the domain (e.g., competitor.com)
                      </span>
                    </>
                  ) : (
                    <>
                      Competitor URLs (Optional)
                      <span className="block text-xs font-normal text-gray-500 mt-1">
                        Enter up to 3 competitor websites for the keyword gap analysis. Just type the domain (e.g., competitor.com)
                      </span>
                    </>
                  )}
                </label>
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="flex items-center">
                      <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                        https://
                      </span>
                      <input
                        type="text"
                        value={formData.competitorUrls[index]?.replace(/^https?:\/\//, "") || ""}
                        onChange={(e) => handleCompetitorUrlChange(index, e.target.value)}
                        onBlur={() => handleCompetitorUrlBlur(index)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        placeholder={`competitor${index + 1}.com`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Field */}
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any specific areas you'd like us to focus on..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : `Proceed to Payment ($${calculateTotal()})`}
            </button>

            {/* Error Message */}
            {submitStatus.type === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6 max-w-2xl mx-auto">
          No automated dashboards. Every audit is manually reviewed and delivered as a detailed PDF to your inbox.
        </p>
      </div>
    </section>
  );
}
