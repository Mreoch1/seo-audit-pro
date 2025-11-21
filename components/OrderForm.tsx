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
}

const tierPrices: Record<string, number> = {
  starter: 19,
  standard: 29,
  advanced: 39,
};

const addOnPrices: Record<string, number> = {
  "fast-delivery": 10,
  "extra-pages": 5,
  "extra-keywords": 1,
  "schema-deep-dive": 15,
  "competitor-report": 20,
};

export default function OrderForm() {
  const { orderState, setTier, toggleAddOn, setExtraPages, setExtraKeywords, setWhiteLabel } = useOrder();
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
    }));
  }, [orderState.tier, orderState.extraPages, orderState.extraKeywords, orderState.addOns, orderState.whiteLabel]);

  const calculateTotal = () => {
    let total = tierPrices[formData.tier] || 29;
    formData.addOns.forEach((addOnId) => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const totalPrice = calculateTotal();

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          websiteUrl: formData.websiteUrl,
          tier: formData.tier,
          addOns: formData.addOns, // Pass IDs directly
          totalPrice,
          notes: formData.notes,
          extraPages: formData.extraPages,
          extraKeywords: formData.extraKeywords,
          whiteLabel: formData.whiteLabel,
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

  return (
    <section id="order-section" className="bg-white">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Request Your SEO Audit</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Pick a tier, choose any add-ons, and send your details. I&apos;ll confirm by email and start your audit.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8 border border-gray-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="websiteUrl"
                required
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="tier" className="block text-sm font-semibold text-gray-700 mb-2">
                Tier
              </label>
              <select
                id="tier"
                value={formData.tier}
                onChange={(e) => {
                  setTier(e.target.value);
                  setFormData({ ...formData, tier: e.target.value });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="starter">Starter - $19 (Up to 3 pages)</option>
                <option value="standard">Standard - $29 (Up to 20 pages)</option>
                <option value="advanced">Advanced - $39 (Up to 50 pages)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add-ons (optional)
              </label>
              <div className="space-y-3">
                {[
                  { id: "fast-delivery", label: "Fast Delivery (24h turnaround)", price: 10 },
                  { id: "schema-deep-dive", label: "Schema Markup Deep-Dive", price: 15 },
                  { id: "competitor-report", label: "Competitor Keyword Gap Report", price: 20 },
                ].map((addOn) => (
                  <label key={addOn.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.addOns.includes(addOn.id)}
                      onChange={(e) => {
                        toggleAddOn(addOn.id);
                        if (e.target.checked) {
                          setFormData({ ...formData, addOns: [...formData.addOns, addOn.id] });
                        } else {
                          setFormData({ ...formData, addOns: formData.addOns.filter((id) => id !== addOn.id) });
                        }
                      }}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-gray-700">{addOn.label} - ${addOn.price}</span>
                  </label>
                ))}
                <div className="border-t border-gray-300 pt-3">
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={formData.addOns.includes("extra-pages")}
                      onChange={(e) => {
                        toggleAddOn("extra-pages");
                        if (e.target.checked) {
                          setFormData({ ...formData, addOns: [...formData.addOns, "extra-pages"], extraPages: 1 });
                        } else {
                          setFormData({ ...formData, addOns: formData.addOns.filter((id) => id !== "extra-pages"), extraPages: 0 });
                        }
                      }}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-gray-700">Extra Pages - $5 per page</span>
                  </label>
                  {formData.addOns.includes("extra-pages") && (
                    <div className="ml-7">
                      <input
                        type="number"
                        min="1"
                        value={formData.extraPages}
                        onChange={(e) => {
                          const value = Math.max(1, parseInt(e.target.value) || 1);
                          setExtraPages(value);
                          setFormData({ ...formData, extraPages: value });
                        }}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-600">pages</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={formData.addOns.includes("extra-keywords")}
                      onChange={(e) => {
                        toggleAddOn("extra-keywords");
                        if (e.target.checked) {
                          setFormData({ ...formData, addOns: [...formData.addOns, "extra-keywords"], extraKeywords: 1 });
                        } else {
                          setFormData({ ...formData, addOns: formData.addOns.filter((id) => id !== "extra-keywords"), extraKeywords: 0 });
                        }
                      }}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-gray-700">Extra Keywords Researched - $1 per keyword</span>
                  </label>
                  {formData.addOns.includes("extra-keywords") && (
                    <div className="ml-7">
                      <input
                        type="number"
                        min="1"
                        value={formData.extraKeywords}
                        onChange={(e) => {
                          const value = Math.max(1, parseInt(e.target.value) || 1);
                          setExtraKeywords(value);
                          setFormData({ ...formData, extraKeywords: value });
                        }}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-600">keywords</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Report Options
              </label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.whiteLabel}
                    onChange={(e) => {
                      setWhiteLabel(e.target.checked);
                      setFormData({ ...formData, whiteLabel: e.target.checked });
                    }}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">White Label Report (No Branding)</span>
                    <p className="text-sm text-gray-600">Receive a report without SEO Audit Pro branding</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Price:</span>
                <span className="text-2xl font-bold text-primary-600">${calculateTotal()}</span>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                Notes or Special Requests
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any specific areas you&apos;d like me to focus on, or questions you have..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Proceed to Checkout"}
            </button>
            
            {submitStatus.type && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6 max-w-2xl mx-auto">
          No automated dashboards. Every audit is manually reviewed and delivered as a detailed PDF to your inbox.
        </p>
      </div>
    </section>
  );
}

