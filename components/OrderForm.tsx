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

    // Filter out empty competitor URLs
    const validCompetitorUrls = formData.competitorUrls.filter(url => url.trim() !== "");

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

  const handleCompetitorUrlChange = (index: number, value: string) => {
    const newUrls = [...formData.competitorUrls];
    newUrls[index] = value;
    setCompetitorUrls(newUrls);
    setFormData({ ...formData, competitorUrls: newUrls });
  };

  return (
    <section id="order-section" className="bg-white">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Request Your SEO Audit</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Pick a tier, choose any add-ons, and send your details. I&apos;ll confirm by email and start your audit.
        </p>

        <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ordering Temporarily Disabled</h3>
          <p className="text-gray-600">
            We are currently performing scheduled maintenance to improve our audit infrastructure. 
            Please check back later to place your order. Thank you for your patience!
          </p>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6 max-w-2xl mx-auto">
          No automated dashboards. Every audit is manually reviewed and delivered as a detailed PDF to your inbox.
        </p>
      </div>
    </section>
  );
}
