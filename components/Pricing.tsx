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
}

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Mini SEO Audit",
    price: 19,
    pages: "Up to 3 pages",
    features: [
      "Technical overview",
      "Titles, meta, H1/H2",
      "Basic content & alt tag check",
      "Quick scan / key issues",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Full SEO Audit",
    price: 29,
    pages: "Up to 20 pages",
    features: [
      "Everything in Starter, plus:",
      "Deeper technical analysis",
      "Schema markup check",
      "Detailed page audit table",
      "More content & internal links analysis",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "SEO Audit + Competitor",
    price: 39,
    pages: "Up to 50 pages",
    features: [
      "Everything in Standard, plus:",
      "Competitor keyword gap analysis",
      "LLM Readability report",
      "Extended image alt analysis",
    ],
  },
];

const addOns: AddOn[] = [
  {
    id: "fast-delivery",
    name: "Fast Delivery (24h turnaround)",
    description: "Get your audit delivered within 24 hours",
    price: 10,
  },
  {
    id: "extra-pages",
    name: "Extra Pages",
    description: "+ $5 per page beyond tier limit",
    price: 5,
    unit: "per page",
  },
  {
    id: "extra-keywords",
    name: "Extra Keywords Researched",
    description: "+ $1 per keyword for competitor analysis",
    price: 1,
    unit: "per keyword",
  },
  {
    id: "schema-deep-dive",
    name: "Schema Markup Deep-Dive",
    description: "Extended schema analysis and recommendations",
    price: 15,
  },
  {
    id: "competitor-report",
    name: "Competitor Keyword Gap Report",
    description: "Detailed competitor analysis (if not in tier)",
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
    <section className="bg-gray-50">
      <div className="section-container">
        <h2 className="heading-2 text-center mb-4">Pricing</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Choose the tier that fits your needs. All audits include a professional PDF report with prioritized action plans.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-lg p-6 border-2 transition-all cursor-pointer ${
                selectedTier === tier.id
                  ? "border-primary-600 shadow-lg scale-105"
                  : "border-gray-200 hover:border-primary-300"
              }`}
              onClick={() => setTier(tier.id)}
            >
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tier.subtitle}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">${tier.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{tier.pages}</p>
              </div>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {selectedTier === tier.id && (
                <div className="text-center">
                  <div className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Selected
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
          <h3 className="heading-3 mb-4">Add-Ons</h3>
          
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
                    <div className="font-semibold text-gray-900">White Label Report (No Branding)</div>
                    <div className="text-sm text-gray-600">Receive a report without SEO Audit Pro branding - perfect for agencies or white-label services</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">Free</div>
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
                    <div className="mt-2">
                      <input
                        type="number"
                        min="1"
                        value={extraPages}
                        onChange={(e) => setExtraPages(parseInt(e.target.value) || 1)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-600">pages</span>
                    </div>
                  )}
                  {addOn.id === "extra-keywords" && selectedAddOns.has(addOn.id) && (
                    <div className="mt-2">
                      <input
                        type="number"
                        min="1"
                        value={extraKeywords}
                        onChange={(e) => setExtraKeywords(parseInt(e.target.value) || 1)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-600">keywords</span>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-600 text-white rounded-lg p-6 text-center">
          <div className="text-sm mb-2">Total Price</div>
          <div className="text-5xl font-bold mb-2">${calculateTotal()}</div>
          <div className="text-sm opacity-90">
            {currentTier.name} Tier (${currentTier.price})
            {selectedAddOns.size > 0 && ` + ${selectedAddOns.size} add-on${selectedAddOns.size > 1 ? "s" : ""}`}
          </div>
        </div>
      </div>
    </section>
  );
}

