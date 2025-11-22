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

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderState, setOrderState] = useState<OrderState>({
    tier: "standard",
    addOns: new Set<string>(),
    extraPages: 0,
    extraKeywords: 0,
    whiteLabel: false,
    competitorUrls: ["", "", ""],
  });

  const setTier = (tier: string) => {
    setOrderState((prev) => ({ ...prev, tier }));
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
          // Reset competitor URLs if add-on is removed AND tier is not advanced
          if (prev.tier !== "advanced") {
             return { ...prev, addOns: newAddOns, competitorUrls: ["", "", ""] };
          }
        }
        return { ...prev, addOns: newAddOns };
      } else {
        newAddOns.add(addOnId);
        // Auto-set to 1 when checked
        if (addOnId === "extra-pages") {
          return { ...prev, addOns: newAddOns, extraPages: 1 };
        } else if (addOnId === "extra-keywords") {
          return { ...prev, addOns: newAddOns, extraKeywords: 1 };
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
    setOrderState((prev) => ({ ...prev, whiteLabel }));
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
