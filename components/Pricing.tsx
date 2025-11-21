"use client";

import { useOrder } from "@/contexts/OrderContext";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
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
    subtitle: "Quick Health Check",
    price: 19,
    pages: "Up to 3 pages",
    features: [
      "Crawl Depth: 2 levels",
      "Delivery: 1 Day",
      "Title & Meta Optimization",
      "Heading (H1-H3) Analysis",
      "Image Alt Text Check",
      "Basic Technical Check",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Full Site Audit",
    price: 29,
    pages: "Up to 20 pages",
    features: [
      "Everything in Starter, plus:",
      "Crawl Depth: 3 levels",
      "5 Keywords Analyzed",
      "Schema Markup Analysis",
      "Core Web Vitals & Perf.",
      "Full Technical Check",
    ],
    highlight: true,
  },
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "Enterprise & Competitive",
    price: 39,
    pages: "Up to 50 pages",
    features: [
      "Everything in Standard, plus:",
      "Crawl Depth: 5 levels",
      "10 Keywords Analyzed",
      "Competitor Gap Analysis",
      "Enhanced Content Audit",
      "Adv. Technical Checks",
    ],
  },
];

const addOns: AddOn[] = [
  {
    id: "fast-delivery",
    name: "Fast Delivery (24h)",
    description: "Priority processing (Standard/Advanced tiers)",
    price: 10,
  },
  {
    id: "extra-pages",
    name: "Extra Pages",
    description: "+ $5 per additional page scan",
    price: 5,
    unit: "per page",
  },
  {
    id: "extra-keywords",
    name: "Extra Keywords",
    description: "Additional keyword analysis",
    price: 1,
    unit: "per keyword",
  },
  {
    id: "schema-deep-dive",
    name: "Schema Deep-Dive",
    description: "Detailed structured data validation",
    price: 15,
  },
  {
    id: "competitor-report",
    name: "Competitor Analysis",
    description: "Keyword gap & strategy report",
    price: 20,
  },
];

export default function Pricing() {
  const { orderState, setTier, toggleAddOn, setExtraPages, setExtraKeywords, setWhiteLabel } = useOrder();
  const selectedTier = orderState.tier;
  const selectedAddOns = orderState.addOns;
  const extraPages = orderState.extraPages;
  const extraKeywords = orderState.extraKeywords;

  const currentTier = tiers.find((t) => t.id === selectedTier)!;

  const calculateTotal = () => {
    let total = currentTier.price;
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) {
        if (addOn.id === "extra-pages") {
          total += addOn.price * extraPages;
        } else if (addOn.id === "extra-keywords") {
          total += addOn.price * extraKeywords;
        } else {
          total += addOn.price;
        }
      }
    });
    return total;
  };

  return (
    <section id="pricing" className="bg-gray-50">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Professional SEO audits starting at just $19. No monthly fees, no subscriptions. Just high-impact data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
              
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
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
          
          {/* White Label Option (Free) */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="white-label"
                checked={orderState.whiteLabel}
                onChange={(e) => setWhiteLabel(e.target.checked)}
                className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="white-label" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">White Label Report</div>
                    <div className="text-sm text-gray-600">Remove SEO Audit Pro branding (Perfect for agencies)</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">Free</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            {addOns.map((addOn) => (
              <div key={addOn.id} className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id={addOn.id}
                  checked={selectedAddOns.has(addOn.id)}
                  onChange={() => toggleAddOn(addOn.id)}
                  className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor={addOn.id} className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{addOn.name}</div>
                      <div className="text-sm text-gray-600">{addOn.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${addOn.price}
                        {addOn.unit && ` ${addOn.unit}`}
                      </div>
                    </div>
                  </div>
                  {addOn.id === "extra-pages" && selectedAddOns.has(addOn.id) && (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={extraPages}
                        onChange={(e) => setExtraPages(parseInt(e.target.value) || 1)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-sm text-gray-600">pages</span>
                    </div>
                  )}
                  {addOn.id === "extra-keywords" && selectedAddOns.has(addOn.id) && (
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
            ))}
          </div>
        </div>

        <div className="sticky bottom-4 z-20 shadow-xl bg-primary-600 text-white rounded-lg p-4 sm:p-6 text-center transform transition-transform">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="text-left">
               <div className="text-sm opacity-90">Total Estimated Price</div>
               <div className="text-3xl font-bold">${calculateTotal()}</div>
            </div>
            <div className="text-left flex-1 px-4 border-l border-primary-500 hidden sm:block">
              <div className="text-sm opacity-90">
                 {currentTier.name} Tier included. 
                 {selectedAddOns.size > 0 && ` + ${selectedAddOns.size} add-on${selectedAddOns.size > 1 ? "s" : ""}.`}
              </div>
              {orderState.whiteLabel && <div className="text-xs font-semibold text-accent-200">White Label Enabled</div>}
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
