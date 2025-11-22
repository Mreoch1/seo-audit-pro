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

// Helper function to validate domain format (must have valid TLD)
const isValidDomain = (domain: string): boolean => {
  if (!domain || domain.trim() === "") return true; // Empty is valid (optional field)
  const trimmed = domain.trim().toLowerCase();
  // Remove https:// if present for validation
  const cleanDomain = trimmed.replace(/^https?:\/\//, "");
  // Check for valid TLD pattern (e.g., .com, .net, .org, .io, .co.uk, etc.)
  const tldPattern = /\.[a-z]{2,}(\.[a-z]{2,})?$/i;
  // Also check for basic domain structure (at least one dot)
  return tldPattern.test(cleanDomain) && cleanDomain.includes(".");
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
  const [domainWarnings, setDomainWarnings] = useState<Record<string, boolean>>({});

  // Sync form with context whenever context changes
  useEffect(() => {
    const addOnsArray = Array.from(orderState.addOns);
    const hasExtraCompetitors = orderState.tier === "agency" && addOnsArray.includes("extra-competitors");
    const maxCompetitors = hasExtraCompetitors ? 4 : 3;
    
    // Ensure competitorUrls array has the right length
    let competitorUrls = [...orderState.competitorUrls];
    while (competitorUrls.length < maxCompetitors) {
      competitorUrls.push("");
    }
    // Trim to max if too long
    if (competitorUrls.length > maxCompetitors) {
      competitorUrls = competitorUrls.slice(0, maxCompetitors);
    }
    
    setFormData((prev) => ({
      ...prev,
      tier: orderState.tier,
      addOns: addOnsArray,
      extraPages: orderState.extraPages,
      extraKeywords: orderState.extraKeywords,
      whiteLabel: orderState.whiteLabel,
      competitorUrls: competitorUrls,
    }));
    
    // Update context if needed
    if (competitorUrls.length !== orderState.competitorUrls.length) {
      setCompetitorUrls(competitorUrls);
    }
  }, [orderState.tier, orderState.extraPages, orderState.extraKeywords, orderState.addOns, orderState.whiteLabel, orderState.competitorUrls, setCompetitorUrls]);

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
  const hasExtraCompetitors = formData.tier === "agency" && formData.addOns.includes("extra-competitors");
  const maxCompetitors = hasExtraCompetitors ? 4 : 3;

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
    // Ensure array is long enough
    const newUrls = [...formData.competitorUrls];
    while (newUrls.length <= index) {
      newUrls.push("");
    }
    newUrls[index] = value;
    setCompetitorUrls(newUrls);
    setFormData({ ...formData, competitorUrls: newUrls });
    
    // Validate domain format
    if (value.trim() !== "") {
      const isValid = isValidDomain(value);
      setDomainWarnings((prev) => ({ ...prev, [`competitor-${index}`]: !isValid }));
    } else {
      setDomainWarnings((prev) => {
        const newWarnings = { ...prev };
        delete newWarnings[`competitor-${index}`];
        return newWarnings;
      });
    }
  };

  const handleCompetitorUrlBlur = (index: number) => {
    // Add https:// when user leaves the field if it's missing
    const url = formData.competitorUrls[index] || "";
    if (url.trim() && !url.startsWith("http://") && !url.startsWith("https://")) {
      const newUrls = [...formData.competitorUrls];
      while (newUrls.length <= index) {
        newUrls.push("");
      }
      newUrls[index] = ensureHttps(url);
      setCompetitorUrls(newUrls);
      setFormData({ ...formData, competitorUrls: newUrls });
      
      // Validate domain format on blur
      const isValid = isValidDomain(newUrls[index]);
      setDomainWarnings((prev) => ({ ...prev, [`competitor-${index}`]: !isValid }));
    }
  };

  const handleWebsiteUrlChange = (value: string) => {
    setFormData({ ...formData, websiteUrl: value });
    
    // Validate domain format
    if (value.trim() !== "") {
      const isValid = isValidDomain(value);
      setDomainWarnings((prev) => ({ ...prev, website: !isValid }));
    } else {
      setDomainWarnings((prev) => {
        const newWarnings = { ...prev };
        delete newWarnings.website;
        return newWarnings;
      });
    }
  };

  const handleWebsiteUrlBlur = () => {
    if (formData.websiteUrl) {
      const url = ensureHttps(formData.websiteUrl);
      setFormData({ ...formData, websiteUrl: url });
      
      // Validate domain format
      const isValid = isValidDomain(url);
      setDomainWarnings((prev) => ({ ...prev, website: !isValid }));
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
                  className={`flex-1 px-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    domainWarnings.website ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="example.com"
              />
            </div>
            {domainWarnings.website && (
              <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Please enter a valid domain with a TLD (e.g., example.com, site.net, domain.org)
              </p>
            )}
            </div>

            {/* Competitor URLs - Show when competitor option is selected or Agency tier */}
            {showCompetitorFields && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {formData.tier === "agency" ? (
                    <>
                      Competitor URLs ({maxCompetitors} {hasExtraCompetitors ? "max" : "included"})
                      <span className="block text-xs font-normal text-gray-500 mt-1">
                        Enter up to {maxCompetitors} competitor websites for keyword gap analysis. Just type the domain (e.g., competitor.com)
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
                  {Array.from({ length: maxCompetitors }, (_, i) => i).map((index) => (
                    <div key={index}>
                      <div className="flex items-center">
                        <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                          https://
                        </span>
                        <input
                          type="text"
                          value={formData.competitorUrls[index]?.replace(/^https?:\/\//, "") || ""}
                          onChange={(e) => handleCompetitorUrlChange(index, e.target.value)}
                          onBlur={() => handleCompetitorUrlBlur(index)}
                          className={`flex-1 px-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm ${
                            domainWarnings[`competitor-${index}`] ? "border-red-300 bg-red-50" : "border-gray-300"
                          }`}
                          placeholder={`competitor${index + 1}.com`}
                        />
                      </div>
                      {domainWarnings[`competitor-${index}`] && (
                        <p className="mt-1 text-xs text-amber-600 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Please enter a valid domain with a TLD (e.g., competitor.com)
                        </p>
                      )}
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
