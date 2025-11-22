"use client";

import { useOrder } from "@/contexts/OrderContext";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
  includedIn?: string[]; // Tiers that already include this
  availableIn?: string[]; // Tiers where this add-on is available
}

interface Tier {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  pages: string;
  features: string[];
  highlight?: boolean;
}

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Essential SEO Audit",
    price: 19,
    pages: "Up to 50 pages",
    features: [
      "Deep Crawl & JavaScript Rendering",
      "Core Web Vitals Analysis",
      "Technical SEO Audit",
      "On-Page SEO Report",
      "Content Quality & Readability",
      "Accessibility Checks",
      "Local SEO Signals (Basic)",
      "Schema Detection",
      "Broken Links & Redirect Chains",
      "Internal Linking Overview",
      "Branded PDF Report",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Complete Site Analysis",
    price: 39,
    pages: "Up to 200 pages",
    features: [
      "Everything in Starter, plus:",
      "Advanced Local SEO Analysis",
      "Full Schema Validation",
      "Mobile Responsiveness Diagnostics",
      "Thin Content & Duplicate Detection",
      "Keyword Extraction (NLP)",
      "Readability Diagnostics",
      "Security Checks (HTTPS, HSTS)",
      "Platform Detection",
      "Automated Fix Recommendations",
    ],
    highlight: true,
  },
  {
    id: "professional",
    name: "Professional",
    subtitle: "Deep-Dive Analysis",
    price: 59,
    pages: "Up to 500 pages",
    features: [
      "Everything in Standard, plus:",
      "Multi-level Internal Link Mapping",
      "Crawl Diagnostics & Insights",
      "Enhanced Accessibility (WCAG)",
      "Full Keyword Opportunity Mapping",
      "Detailed Content Structure Map",
      "JS/CSS Payload Analysis",
      "Core Web Vitals Opportunity Report",
      "Priority Fix Action Plan",
    ],
  },
  {
    id: "agency",
    name: "Agency / Enterprise",
    subtitle: "Full Competitive Suite",
    price: 99,
    pages: "Unlimited Pages",
    features: [
      "Everything in Professional, plus:",
      "Unlimited Keywords",
      "3 Competitor Crawls & Gap Analysis",
      "Full Local SEO Suite",
      "Social Signals Audit",
      "JS Rendering Diagnostics",
      "Full Internal Link Graph",
      "Orphan Page Detection",
      "Duplicate URL Cleaning",
      "Blank Report Included (Free)",
    ],
  },
];

const addOns: AddOn[] = [
  {
    id: "white-label",
    name: "Blank Report (Unbranded)",
    description: "Remove SEO Audit Pro branding - Perfect for agencies",
    price: 10,
    availableIn: ["starter", "standard", "professional"],
    includedIn: ["agency"], // Free in Agency tier
  },
  {
    id: "extra-pages",
    name: "Additional Pages",
    description: "Add 50 more pages to your crawl",
    price: 5,
    unit: "per 50 pages",
    availableIn: ["starter", "standard", "professional"],
  },
  {
    id: "competitor-report",
    name: "Competitor Gap Analysis",
    description: "Keyword gap & competitive strategy report",
    price: 15,
    availableIn: ["starter", "standard"],
    includedIn: ["agency"], // Included in Agency tier (3 competitors)
  },
  {
    id: "schema-deep-dive",
    name: "Schema Deep-Dive",
    description: "Detailed structured data validation & recommendations",
    price: 15,
    availableIn: ["starter"], // Only available for Starter
  },
  {
    id: "extra-keywords",
    name: "Extra Keywords",
    description: "Additional keyword analysis & research",
    price: 1,
    unit: "per keyword",
    availableIn: ["starter", "standard", "professional"],
    includedIn: ["agency"], // Unlimited in Agency
  },
  {
    id: "extra-competitors",
    name: "Additional Competitors",
    description: "Add more competitor websites to analysis (Agency tier only)",
    price: 10,
    unit: "per competitor",
    availableIn: ["agency"],
  },
  {
    id: "extra-crawl-depth",
    name: "Extra Crawl Depth",
    description: "Increase crawl depth for complex sites (Agency tier only)",
    price: 15,
    availableIn: ["agency"],
  },
];

export default function Pricing() {
  const { orderState, setTier, toggleAddOn, setExtraPages, setExtraKeywords, setWhiteLabel } = useOrder();
  const selectedTier = orderState.tier;
  const selectedAddOns = orderState.addOns;
  const extraPages = orderState.extraPages;
  const extraKeywords = orderState.extraKeywords;

  const currentTier = tiers.find((t) => t.id === selectedTier)!;

  // Filter add-ons based on tier availability
  const getAvailableAddOns = () => {
    return addOns.filter((addOn) => {
      // If included in tier, show it but disabled
      if (addOn.includedIn?.includes(selectedTier)) {
        return true;
      }
      // If has availableIn, check if current tier is in the list
      if (addOn.availableIn) {
        return addOn.availableIn.includes(selectedTier);
      }
      // If no restrictions, show it
      return true;
    });
  };

  // Check if current selection would be better as a higher tier
  const getBetterTierSuggestion = () => {
    if (selectedTier === "agency") return null;
    
    // Calculate current total using the same logic as calculateTotal()
    const currentTotal = calculateTotal();
    
    // Check if Agency tier would be better
    if (selectedTier !== "agency") {
      const agencyTier = tiers.find(t => t.id === "agency")!;
      let agencyTotal = agencyTier.price;
      
      // Recalculate for Agency tier - only add add-ons that:
      // 1. Are available in Agency tier
      // 2. Are NOT included in Agency tier
      selectedAddOns.forEach((addOnId) => {
        const addOn = addOns.find((a) => a.id === addOnId);
        if (!addOn) return;
        
        // Skip add-ons included in Agency (white-label, competitor-report, extra-keywords)
        if (addOn.includedIn?.includes("agency")) {
          return; // These are free in Agency
        }
        
        // Skip add-ons not available in Agency
        if (addOn.availableIn && !addOn.availableIn.includes("agency")) {
          return;
        }
        
        // Skip extra-pages (unlimited in Agency)
        if (addOn.id === "extra-pages") {
          return; // Unlimited pages in Agency
        }
        
        // Add add-ons that are available and chargeable in Agency
        if (addOn.id === "extra-competitors" || addOn.id === "extra-crawl-depth") {
          agencyTotal += addOn.price;
        }
        // Note: extra-keywords is unlimited in Agency, so we don't charge for it
      });
      
      // Suggest Agency if it's same price or cheaper, or within $25
      if (agencyTotal <= currentTotal + 25) {
        return {
          tier: "agency",
          currentTotal,
          suggestedTotal: agencyTotal,
          savings: currentTotal - agencyTotal,
        };
      }
    }
    
    // Check if Professional would be better than Standard + add-ons
    if (selectedTier === "standard" && selectedAddOns.size > 0) {
      const professionalTier = tiers.find(t => t.id === "professional")!;
      let professionalTotal = professionalTier.price;
      
      selectedAddOns.forEach((addOnId) => {
        const addOn = addOns.find((a) => a.id === addOnId);
        if (!addOn) return;
        
        // Skip competitor-report (not available in Professional)
        if (addOnId === "competitor-report") return;
        
        // Skip add-ons not available in Professional
        if (addOn.availableIn && !addOn.availableIn.includes("professional")) {
          return;
        }
        
        // Add chargeable add-ons
        if (addOn.id === "extra-pages") {
          professionalTotal += addOn.price * extraPages;
        } else if (addOn.id === "extra-keywords") {
          professionalTotal += addOn.price * extraKeywords;
        } else if (addOn.id === "white-label") {
          professionalTotal += addOn.price;
        }
      });
      
      // Suggest Professional if it's same price or cheaper
      if (professionalTotal <= currentTotal) {
        return {
          tier: "professional",
          currentTotal,
          suggestedTotal: professionalTotal,
          savings: currentTotal - professionalTotal,
        };
      }
    }
    
    return null;
  };

  const suggestion = getBetterTierSuggestion();

  const calculateTotal = () => {
    let total = currentTier.price;
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) {
        // Skip add-ons that are already included in the selected tier
        if (addOn.includedIn?.includes(selectedTier)) {
          return; // Don't charge for add-ons included in tier
        }
        // Skip if not available in current tier
        if (addOn.availableIn && !addOn.availableIn.includes(selectedTier)) {
          return;
        }
        if (addOn.id === "extra-pages") {
          total += addOn.price * extraPages;
        } else if (addOn.id === "extra-keywords") {
          total += addOn.price * extraKeywords;
        } else if (addOn.id === "extra-competitors") {
          // This will be handled separately if needed
          total += addOn.price;
        } else {
          total += addOn.price;
        }
      }
    });
    return total;
  };

  // Count only chargeable add-ons (exclude included ones and unavailable ones)
  const getChargeableAddOnCount = () => {
    let count = 0;
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) {
        // Don't count add-ons that are included in the tier
        if (addOn.includedIn?.includes(selectedTier)) {
          return;
        }
        // Don't count add-ons not available in current tier
        if (addOn.availableIn && !addOn.availableIn.includes(selectedTier)) {
          return;
        }
        // Count this add-on (quantities like extra-pages/extra-keywords count as 1 add-on)
        count++;
      }
    });
    return count;
  };

  const handleAddOnToggle = (addOnId: string) => {
    toggleAddOn(addOnId);
  };

  const availableAddOns = getAvailableAddOns();

  return (
    <section id="pricing" className="bg-gray-50">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Professional SEO audits starting at just $19. No monthly fees, no subscriptions. Choose the tier that fits your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-lg p-6 border-2 transition-all cursor-pointer relative flex flex-col ${
                selectedTier === tier.id
                  ? "border-primary-600 shadow-lg scale-105 z-10"
                  : "border-gray-200 hover:border-primary-300"
              }`}
              onClick={() => setTier(tier.id)}
            >
              {tier.highlight && selectedTier !== tier.id && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tier.subtitle}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">${tier.price}</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                  {tier.pages}
                </p>
              </div>
              
              <ul className="space-y-2 mb-8 flex-grow text-sm">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto text-center">
                 <button 
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    selectedTier === tier.id 
                      ? "bg-primary-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedTier === tier.id ? "Selected" : "Select Tier"}
                </button>
                </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
          <h3 className="heading-3 mb-4">Customize Your Audit</h3>
          
          <div className="space-y-4">
            {availableAddOns.map((addOn) => {
              const isIncluded = addOn.includedIn?.includes(selectedTier);
              const isChecked = selectedAddOns.has(addOn.id);
              const isAvailable = !addOn.availableIn || addOn.availableIn.includes(selectedTier);
              
              // Special handling for white-label checkbox
              if (addOn.id === "white-label") {
                return (
                  <div key={addOn.id} className="flex items-start gap-4 pb-4 border-b border-gray-200">
                    <input
                      type="checkbox"
                      id={addOn.id}
                      checked={isIncluded ? true : orderState.whiteLabel}
                      onChange={(e) => {
                        if (!isIncluded) {
                          setWhiteLabel(e.target.checked);
                          if (e.target.checked) {
                            toggleAddOn(addOn.id);
                          } else {
                            toggleAddOn(addOn.id);
                          }
                        }
                      }}
                      disabled={isIncluded}
                      className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label htmlFor={addOn.id} className={`flex-1 ${isIncluded ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {addOn.name}
                            {isIncluded && (
                              <span className="ml-2 text-xs font-normal text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                Included in {selectedTier === "agency" ? "Agency" : ""} tier
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{addOn.description}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${isIncluded ? "text-green-600 line-through" : "text-gray-900"}`}>
                            {isIncluded ? "Free" : `$${addOn.price}`}
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                );
              }
              
              return (
                <div key={addOn.id} className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id={addOn.id}
                    checked={isChecked}
                    onChange={() => handleAddOnToggle(addOn.id)}
                    disabled={isIncluded || !isAvailable}
                    className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label htmlFor={addOn.id} className={`flex-1 ${isIncluded || !isAvailable ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {addOn.name}
                          {isIncluded && (
                            <span className="ml-2 text-xs font-normal text-green-600 bg-green-50 px-2 py-0.5 rounded">
                              Included in {selectedTier === "agency" ? "Agency" : ""} tier
                            </span>
                          )}
                          {!isAvailable && !isIncluded && (
                            <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                              Not available in {currentTier.name} tier
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{addOn.description}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${isIncluded ? "text-green-600 line-through" : "text-gray-900"}`}>
                          {isIncluded ? "Free" : `$${addOn.price}`}
                          {!isIncluded && addOn.unit && ` ${addOn.unit}`}
                        </div>
                      </div>
                    </div>
                    {addOn.id === "extra-pages" && isChecked && !isIncluded && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          value={extraPages}
                          onChange={(e) => setExtraPages(parseInt(e.target.value) || 1)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-sm text-gray-600">× 50 pages</span>
                      </div>
                    )}
                    {addOn.id === "extra-keywords" && isChecked && !isIncluded && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          value={extraKeywords}
                          onChange={(e) => setExtraKeywords(parseInt(e.target.value) || 1)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-sm text-gray-600">keywords</span>
                      </div>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Suggestion Banner */}
        {suggestion && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">Better Value Available</h4>
                <p className="text-sm text-blue-800 mb-2">
                  You&apos;re selecting {currentTier.name} tier (${suggestion.currentTotal}). 
                  The <strong>{suggestion.tier === "agency" ? "Agency" : "Professional"} tier</strong> includes more features for ${suggestion.suggestedTotal}.
                  {suggestion.savings > 0 && ` You&apos;ll save $${suggestion.savings}!`}
                </p>
                <button
                  onClick={() => {
                    // Remove add-ons that are included in the suggested tier
                    if (selectedAddOns.has("competitor-report") && suggestion.tier === "agency") {
                      toggleAddOn("competitor-report");
                    }
                    if (selectedAddOns.has("white-label") && suggestion.tier === "agency") {
                      toggleAddOn("white-label");
                      setWhiteLabel(false);
                    }
                    setTier(suggestion.tier);
                  }}
                  className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline"
                >
                  Upgrade to {suggestion.tier === "agency" ? "Agency" : "Professional"} Tier →
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="sticky bottom-4 z-20 shadow-xl bg-primary-600 text-white rounded-lg p-4 sm:p-6 text-center transform transition-transform">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="text-left">
               <div className="text-sm opacity-90">Total Estimated Price</div>
               <div className="text-3xl font-bold">${calculateTotal()}</div>
            </div>
            <div className="text-left flex-1 px-4 border-l border-primary-500 hidden sm:block">
              <div className="text-sm opacity-90">
                 {currentTier.name} Tier included. 
                 {(() => {
                   const chargeableCount = getChargeableAddOnCount();
                   return chargeableCount > 0 && ` + ${chargeableCount} add-on${chargeableCount > 1 ? "s" : ""}.`;
                 })()}
              </div>
              {orderState.whiteLabel && selectedTier !== "agency" && <div className="text-xs font-semibold text-accent-200">White Label Enabled</div>}
            </div>
            <button 
              onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-700 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Proceed to Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
