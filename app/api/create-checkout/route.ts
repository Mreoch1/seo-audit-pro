import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
});

const tierPrices: Record<string, { name: string; price: number }> = {
  starter: { name: "Starter - Mini SEO Audit", price: 19 },
  standard: { name: "Standard - Full SEO Audit", price: 29 },
  advanced: { name: "Advanced - SEO Audit + Competitor", price: 39 },
};

const addOnPrices: Record<string, { name: string; price: number }> = {
  "fast-delivery": { name: "Fast Delivery (24h turnaround)", price: 10 },
  "extra-pages": { name: "Extra Pages", price: 5 },
  "extra-keywords": { name: "Extra Keywords Researched", price: 1 },
  "schema-deep-dive": { name: "Schema Markup Deep-Dive", price: 15 },
  "competitor-report": { name: "Competitor Keyword Gap Report", price: 20 },
};

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe secret key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Stripe configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, websiteUrl, tier, addOns, totalPrice, notes, extraPages, extraKeywords, whiteLabel } = body;

    // Validate required fields
    if (!name || !email || !websiteUrl || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate that we have at least one line item
    if (!tier) {
      return NextResponse.json(
        { error: "Please select a tier" },
        { status: 400 }
      );
    }

    // Build itemized line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // Add tier as first line item
    const tierInfo = tierPrices[tier] || tierPrices.standard;
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: tierInfo.name,
          description: `SEO Audit for ${websiteUrl}`,
        },
        unit_amount: Math.round(tierInfo.price * 100),
      },
      quantity: 1,
    });

    // Add each add-on as separate line items
    if (Array.isArray(addOns) && addOns.length > 0) {
      for (const addOnId of addOns) {
        if (addOnId === "extra-pages") {
          const pages = parseInt(extraPages?.toString() || "1");
          if (pages > 0) {
            const addOnInfo = addOnPrices["extra-pages"];
            lineItems.push({
              price_data: {
                currency: "usd",
                product_data: {
                  name: `${addOnInfo.name} (${pages} page${pages > 1 ? "s" : ""})`,
                },
                unit_amount: Math.round(addOnInfo.price * 100),
              },
              quantity: pages,
            });
          }
        } else if (addOnId === "extra-keywords") {
          const keywords = parseInt(extraKeywords?.toString() || "1");
          if (keywords > 0) {
            const addOnInfo = addOnPrices["extra-keywords"];
            lineItems.push({
              price_data: {
                currency: "usd",
                product_data: {
                  name: `${addOnInfo.name} (${keywords} keyword${keywords > 1 ? "s" : ""})`,
                },
                unit_amount: Math.round(addOnInfo.price * 100),
              },
              quantity: keywords,
            });
          }
        } else {
          // Other add-ons
          const addOnInfo = addOnPrices[addOnId];
          if (addOnInfo) {
            lineItems.push({
              price_data: {
                currency: "usd",
                product_data: {
                  name: addOnInfo.name,
                },
                unit_amount: Math.round(addOnInfo.price * 100),
              },
              quantity: 1,
            });
          }
        }
      }
    }

    // Add white label option if selected (free, but shown for clarity)
    if (whiteLabel) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "White Label Report (No Branding)",
            description: "Receive a report without SEO Audit Pro branding",
          },
          unit_amount: 0, // Free
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout Session with itemized line items
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}#order-section`,
      customer_email: email,
      metadata: {
        name,
        email,
        websiteUrl,
        tier,
        addOns: JSON.stringify(addOns),
        notes: notes || "",
        totalPrice: totalPrice.toString(),
        extraPages: (extraPages || 0).toString(),
        extraKeywords: (extraKeywords || 0).toString(),
        whiteLabel: (whiteLabel || false).toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session", details: error.toString() },
      { status: 500 }
    );
  }
}

