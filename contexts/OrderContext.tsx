"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface OrderState {
  tier: string;
  addOns: Set<string>;
  extraPages: number;
  extraKeywords: number;
  whiteLabel: boolean;
  competitorUrls: string[];
}

interface OrderContextType {
  orderState: OrderState;
  setTier: (tier: string) => void;
  toggleAddOn: (addOnId: string) => void;
  setExtraPages: (pages: number) => void;
  setExtraKeywords: (keywords: number) => void;
  setWhiteLabel: (whiteLabel: boolean) => void;
  setCompetitorUrls: (urls: string[]) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Define add-on availability by tier
const addOnAvailability: Record<string, string[]> = {
  "white-label": ["starter", "standard", "professional"], // Included free in agency
  "extra-pages": ["starter", "standard", "professional"], // Unlimited in agency
  "competitor-report": ["starter", "standard"], // Included in agency
  "schema-deep-dive": ["starter"], // Only available in starter
  "extra-keywords": ["starter", "standard", "professional"], // Unlimited in agency
  "extra-competitors": ["agency"], // Only agency
  "extra-crawl-depth": ["agency"], // Only agency
};

// Define which add-ons are included in which tiers
const includedInTier: Record<string, string[]> = {
  "white-label": ["agency"],
  "competitor-report": ["agency"],
  "extra-keywords": ["agency"],
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderState, setOrderState] = useState<OrderState>({
    tier: "standard",
    addOns: new Set<string>(),
    extraPages: 0,
    extraKeywords: 0,
    whiteLabel: false,
    competitorUrls: ["", "", ""],
  });

  const setTier = (newTier: string) => {
    setOrderState((prev) => {
      const newAddOns = new Set<string>();
      let newExtraPages = prev.extraPages;
      let newExtraKeywords = prev.extraKeywords;
      let newWhiteLabel = prev.whiteLabel;
      let newCompetitorUrls = prev.competitorUrls;

      // Filter add-ons to only keep those available in the new tier
      prev.addOns.forEach((addOnId) => {
        const isIncluded = includedInTier[addOnId]?.includes(newTier);
        const isAvailable = addOnAvailability[addOnId]?.includes(newTier) || !addOnAvailability[addOnId];
        
        // Keep add-on if it's included in the new tier (will be free) or available as an add-on
        if (isIncluded || isAvailable) {
          newAddOns.add(addOnId);
        } else {
          // Remove add-on and reset related state
          if (addOnId === "extra-pages") {
            newExtraPages = 0;
          } else if (addOnId === "extra-keywords") {
            newExtraKeywords = 0;
          } else if (addOnId === "competitor-report") {
            // Only reset competitor URLs if not included in new tier
            if (!isIncluded) {
              newCompetitorUrls = ["", "", ""];
            }
          } else if (addOnId === "white-label") {
            // If white-label is included in new tier, uncheck the checkbox
            if (isIncluded) {
              newWhiteLabel = false;
            }
          }
        }
      });

      // Handle white-label checkbox state
      // If Agency tier, white-label is included (free), so uncheck the checkbox
      if (newTier === "agency" && newWhiteLabel) {
        newWhiteLabel = false;
      }

      return {
        ...prev,
        tier: newTier,
        addOns: newAddOns,
        extraPages: newExtraPages,
        extraKeywords: newExtraKeywords,
        whiteLabel: newWhiteLabel,
        competitorUrls: newCompetitorUrls,
      };
    });
  };

  const toggleAddOn = (addOnId: string) => {
    setOrderState((prev) => {
      const newAddOns = new Set(prev.addOns);
      if (newAddOns.has(addOnId)) {
        newAddOns.delete(addOnId);
        // Reset quantities when unchecked
        if (addOnId === "extra-pages") {
          return { ...prev, addOns: newAddOns, extraPages: 0 };
        } else if (addOnId === "extra-keywords") {
          return { ...prev, addOns: newAddOns, extraKeywords: 0 };
        } else if (addOnId === "competitor-report") {
          // Reset competitor URLs if add-on is removed AND tier is not agency
          if (prev.tier !== "agency") {
             return { ...prev, addOns: newAddOns, competitorUrls: ["", "", ""] };
          }
        } else if (addOnId === "white-label") {
          return { ...prev, addOns: newAddOns, whiteLabel: false };
        }
        return { ...prev, addOns: newAddOns };
      } else {
        newAddOns.add(addOnId);
        // Auto-set to 1 when checked
        if (addOnId === "extra-pages") {
          return { ...prev, addOns: newAddOns, extraPages: 1 };
        } else if (addOnId === "extra-keywords") {
          return { ...prev, addOns: newAddOns, extraKeywords: 1 };
        } else if (addOnId === "white-label") {
          return { ...prev, addOns: newAddOns, whiteLabel: true };
        }
        return { ...prev, addOns: newAddOns };
      }
    });
  };

  const setExtraPages = (pages: number) => {
    setOrderState((prev) => ({ ...prev, extraPages: Math.max(1, pages) }));
  };

  const setExtraKeywords = (keywords: number) => {
    setOrderState((prev) => ({ ...prev, extraKeywords: Math.max(1, keywords) }));
  };

  const setWhiteLabel = (whiteLabel: boolean) => {
    setOrderState((prev) => {
      const newAddOns = new Set(prev.addOns);
      if (whiteLabel) {
        newAddOns.add("white-label");
      } else {
        newAddOns.delete("white-label");
      }
      return { ...prev, whiteLabel, addOns: newAddOns };
    });
  };

  const setCompetitorUrls = (urls: string[]) => {
    setOrderState((prev) => ({ ...prev, competitorUrls: urls }));
  };

  return (
    <OrderContext.Provider
      value={{
        orderState,
        setTier,
        toggleAddOn,
        setExtraPages,
        setExtraKeywords,
        setWhiteLabel,
        setCompetitorUrls,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
