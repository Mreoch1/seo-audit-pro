import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { logger } from "@/lib/logger";
import { getClientIP } from "@/lib/rate-limit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover" as any, // Casting as any because types might be outdated
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "unknown";
  
  logger.info("Webhook endpoint called", { ip: clientIP, userAgent });
  
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    logger.warn("Webhook called without signature", { ip: clientIP });
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    logger.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    logger.info("Webhook signature verified", { eventType: event.type, ip: clientIP });
  } catch (err: any) {
    logger.error("Webhook signature verification failed", err, { ip: clientIP });
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    logger.info("Webhook received: checkout.session.completed", { 
      sessionId: (event.data.object as Stripe.Checkout.Session).id,
      ip: clientIP 
    });
    
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
      logger.warn("Webhook: No metadata found in session", { sessionId: session.id });
      return NextResponse.json({ received: true });
    }

    // Extract order details from metadata
    const {
      name,
      email,
      websiteUrl,
      tier,
      addOns,
      notes,
      totalPrice,
      extraPages,
      extraKeywords,
      whiteLabel,
      competitorUrls,
    } = metadata;

    // Tier name mapping
    const tierNames: Record<string, string> = {
      starter: "Starter",
      standard: "Standard",
      professional: "Professional",
      agency: "Agency",
    };

    // Tier delivery days mapping
    const tierDeliveryDays: Record<string, number> = {
      starter: 2,
      standard: 3,
      professional: 4,
      agency: 5,
    };

    // Add-on name mapping
    const addOnNames: Record<string, string> = {
      "white-label": "Blank Report (Unbranded)",
      "extra-pages": "Additional Pages",
      "competitor-report": "Competitor Gap Analysis",
      "schema-deep-dive": "Schema Deep-Dive",
      "extra-keywords": "Extra Keywords",
      "extra-competitors": "Additional Competitor",
      "extra-crawl-depth": "Extra Crawl Depth",
      "expedited": "24-Hour Expedited Report",
    };

    // Format add-ons list for email
    let addOnsList: string[] = [];
    try {
      addOnsList = JSON.parse(addOns || "[]");
    } catch {
      addOnsList = addOns ? [addOns] : [];
    }

    // Add quantities for extra pages/keywords
    const pages = parseInt(extraPages || "0");
    const keywords = parseInt(extraKeywords || "0");
    
    // Format add-ons with proper names and quantities
    const formattedAddOns = addOnsList.map((addOnId: string) => {
      const addOnName = addOnNames[addOnId] || addOnId.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
      
      if (addOnId === "extra-pages" && pages > 0) {
        return `${addOnName} (${pages} × 50 pages)`;
      }
      if (addOnId === "extra-keywords" && keywords > 0) {
        return `${addOnName} (${keywords} keyword${keywords > 1 ? "s" : ""})`;
      }
      return addOnName;
    });

    // Get formatted tier name
    const formattedTier = tierNames[tier] || tier.charAt(0).toUpperCase() + tier.slice(1);
    
    // Check if expedited add-on is selected
    const hasExpedited = addOnsList.includes("expedited");
    const deliveryDays = hasExpedited ? 1 : (tierDeliveryDays[tier] || 3);
    const deliveryText = hasExpedited ? "24 hours (expedited)" : `${deliveryDays} business day${deliveryDays > 1 ? "s" : ""}`;

    // Create email content
    const emailSubject = `🎯 New SEO Audit Order - ${formattedTier} Tier - ${websiteUrl}`;
    
    let emailBody = `Hello,

You have received a new SEO audit order:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Website URL: ${websiteUrl}
White Label: ${whiteLabel === "true" ? "Yes" : "No"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tier: ${formattedTier}
Expected Delivery: ${deliveryText}

Add-ons:`;

    if (formattedAddOns.length > 0) {
      formattedAddOns.forEach((addOn: string) => {
        emailBody += `\n  • ${addOn}`;
      });
    } else {
      emailBody += `\n  • None`;
    }

    // Add competitor URLs if provided
    if (competitorUrls && competitorUrls.trim()) {
      const competitorUrlsList = competitorUrls.split(',').filter((url: string) => url.trim());
      if (competitorUrlsList.length > 0) {
        emailBody += `\n\nCompetitor URLs:`;
        competitorUrlsList.forEach((url: string, index: number) => {
          emailBody += `\n  ${index + 1}. ${url.trim()}`;
        });
      }
    }

    emailBody += `\n\nTotal Price: $${totalPrice}`;

    if (notes && notes.trim()) {
      emailBody += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTES / SPECIAL REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${notes}`;
    }

    emailBody += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was sent from the SEO Audit Pro website via Stripe Webhook.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Send business owner notification email via Resend
    // Note: Stripe automatically sends receipt emails to customers when customer_email is set
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL || "contact@seoauditpro.com";
    // Use environment variable for from address, or fallback to a verified domain
    const FROM_EMAIL = process.env.FROM_EMAIL || "SEO Audit Pro <contact@seoauditpro.com>";

    if (!RESEND_API_KEY) {
      logger.warn("RESEND_API_KEY not set. Email not sent.", { sessionId: session.id });
      if (process.env.NODE_ENV === 'development') {
        logger.info("Order details (dev only)", { emailBody, sessionId: session.id });
      }
      return NextResponse.json({ received: true });
    }

    // Send business owner notification email
    logger.info("Preparing to send order notification email to business owner", { 
      to: TO_EMAIL, 
      from: FROM_EMAIL,
      sessionId: session.id 
    });

    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          reply_to: email, // Customer's email so you can reply directly
          subject: emailSubject,
          text: emailBody,
        }),
      });

      const emailResult = await emailResponse.json();

      if (emailResponse.ok) {
        logger.info("Order notification email sent to business owner", { 
          emailId: emailResult.id,
          to: TO_EMAIL,
          sessionId: session.id 
        });
      } else {
        logger.error("Failed to send email to business owner", new Error("Resend API error"), {
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          error: emailResult,
          to: TO_EMAIL,
          sessionId: session.id
        });
      }
    } catch (emailError: any) {
      logger.error("Failed to send email to business owner", emailError, { 
        to: TO_EMAIL,
        sessionId: session.id 
      });
    }
  }

  return NextResponse.json({ received: true });
}
