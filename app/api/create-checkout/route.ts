import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { validateEmail, validateURL, validateName, validateTier, validateNotes, validatePrice, sanitizeString } from "@/lib/validation";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
});

const tierPrices: Record<string, { name: string; price: number }> = {
  starter: { name: "Starter - Essential SEO Audit", price: 19 },
  standard: { name: "Standard - Complete Site Analysis", price: 39 },
  professional: { name: "Professional - Deep-Dive Analysis", price: 59 },
  agency: { name: "Agency / Enterprise - Full Competitive Suite", price: 99 },
};

const addOnPrices: Record<string, { name: string; price: number }> = {
  "white-label": { name: "Blank Report (Unbranded)", price: 10 },
  "extra-pages": { name: "Additional Pages (50 pages)", price: 5 },
  "extra-keywords": { name: "Extra Keywords", price: 1 },
  "schema-deep-dive": { name: "Schema Markup Deep-Dive", price: 15 },
  "competitor-report": { name: "Competitor Gap Analysis", price: 15 },
  "extra-competitors": { name: "Additional Competitors", price: 10 },
  "extra-crawl-depth": { name: "Extra Crawl Depth", price: 15 },
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 10 requests per minute per IP
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP, 10, 60000);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          }
        }
      );
    }

    // Check if Stripe secret key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Stripe configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const body = await request.json();
    let { name, email, websiteUrl, tier, addOns, totalPrice, notes, extraPages, extraKeywords, whiteLabel, competitorUrls } = body;

    // Sanitize all string inputs
    name = sanitizeString(name || '', 100);
    email = sanitizeString(email || '', 254);
    websiteUrl = sanitizeString(websiteUrl || '', 2048);
    tier = sanitizeString(tier || '', 50);
    notes = sanitizeString(notes || '', 2000);

    // Validate required fields with proper validation functions
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      );
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      );
    }

    const urlValidation = validateURL(websiteUrl);
    if (!urlValidation.valid) {
      return NextResponse.json(
        { error: urlValidation.error },
        { status: 400 }
      );
    }

    const tierValidation = validateTier(tier);
    if (!tierValidation.valid) {
      return NextResponse.json(
        { error: tierValidation.error },
        { status: 400 }
      );
    }

    const notesValidation = validateNotes(notes);
    if (!notesValidation.valid) {
      return NextResponse.json(
        { error: notesValidation.error },
        { status: 400 }
      );
    }

    // Sanitize and validate competitor URLs
    const validCompetitorUrls: string[] = [];
    if (Array.isArray(competitorUrls)) {
      for (const url of competitorUrls) {
        if (typeof url === 'string' && url.trim() !== '') {
          const sanitizedUrl = sanitizeString(url, 2048);
          const compUrlValidation = validateURL(sanitizedUrl);
          if (compUrlValidation.valid) {
            validCompetitorUrls.push(sanitizedUrl);
          }
        }
      }
    }

    // Validate price (prevent manipulation)
    const priceNum = typeof totalPrice === 'number' ? totalPrice : parseFloat(totalPrice);
    if (isNaN(priceNum) || priceNum < 19 || priceNum > 1000) {
      return NextResponse.json(
        { error: "Invalid price" },
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
    // Skip add-ons that are included in the selected tier
    if (Array.isArray(addOns) && addOns.length > 0) {
      for (const addOnId of addOns) {
        // Skip white-label if Agency tier (included free)
        if (addOnId === "white-label" && tier === "agency") {
          continue;
        }
        // Skip competitor-report if Agency tier (3 competitors included)
        if (addOnId === "competitor-report" && tier === "agency") {
          continue;
        }
        // Skip extra-keywords if Agency tier (unlimited included)
        if (addOnId === "extra-keywords" && tier === "agency") {
          continue;
        }
        // Skip schema-deep-dive if not Starter tier (not available)
        if (addOnId === "schema-deep-dive" && tier !== "starter") {
          continue;
        }
        // Skip competitor-report if not Starter/Standard (not available)
        if (addOnId === "competitor-report" && (tier === "professional" || tier === "agency")) {
          continue;
        }
        // Skip extra-competitors and extra-crawl-depth if not Agency tier
        if ((addOnId === "extra-competitors" || addOnId === "extra-crawl-depth") && tier !== "agency") {
          continue;
        }
        // Skip extra-pages if Agency tier (unlimited pages)
        if (addOnId === "extra-pages" && tier === "agency") {
          continue;
        }
        
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

    // Note: White label is now a paid add-on ($10) unless Agency tier (included free)
    // It's already handled in the add-ons loop above

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
        competitorUrls: validCompetitorUrls.join(','),
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
