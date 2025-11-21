import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { logger } from "@/lib/logger";
import { getClientIP } from "@/lib/rate-limit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
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
    } = metadata;

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
    
    // Update add-ons list with quantities
    addOnsList = addOnsList.map((addOn: string) => {
      if (addOn.toLowerCase().includes("extra pages") && pages > 0) {
        return `Extra Pages (${pages} page${pages > 1 ? "s" : ""})`;
      }
      if (addOn.toLowerCase().includes("extra keywords") && keywords > 0) {
        return `Extra Keywords (${keywords} keyword${keywords > 1 ? "s" : ""})`;
      }
      return addOn;
    });

    const formattedAddOns = addOnsList.length > 0
      ? addOnsList.map((addOn: string) => {
          if (addOn.includes("Extra Pages")) return addOn;
          if (addOn.includes("Extra Keywords")) return addOn;
          return addOn.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
        })
      : [];

    // Create email content
    const emailSubject = `SEO Audit Request – ${tier} – ${websiteUrl} [PAID]`;
    
    let emailBody = `Hello,

You have received a new SEO audit request (PAYMENT RECEIVED):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Website URL: ${websiteUrl}
Payment: ✅ PAID ($${totalPrice})

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tier: ${tier.charAt(0).toUpperCase() + tier.slice(1)}

Add-ons:`;

    if (formattedAddOns.length > 0) {
      formattedAddOns.forEach((addOn: string) => {
        emailBody += `\n  • ${addOn}`;
      });
    } else {
      emailBody += `\n  • None`;
    }

    emailBody += `\n\nTotal Price: $${totalPrice}`;

    // Add report type
    const reportType = whiteLabel === "true" ? "White Label (No Branding)" : "Branded (SEO Audit Pro)";
    emailBody += `\n\nReport Type: ${reportType}`;

    if (notes && notes.trim()) {
      emailBody += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTES / SPECIAL REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${notes}`;
    }

    emailBody += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stripe Session ID: ${session.id}
This email was sent from the SEO Audit Pro website.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Send email using Resend API
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL || "mreoch82@hotmail.com";

    logger.info("Preparing to send order notification email", { 
      to: TO_EMAIL, 
      sessionId: session.id 
    });

    if (RESEND_API_KEY) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "SEO Audit Pro <onboarding@resend.dev>",
            to: TO_EMAIL,
            reply_to: email,
            subject: emailSubject,
            text: emailBody,
          }),
        });

        const emailResult = await emailResponse.json();

        if (emailResponse.ok) {
          logger.info("Order confirmation email sent successfully", { 
            emailId: emailResult.id,
            to: TO_EMAIL,
            sessionId: session.id 
          });
        } else {
          logger.error("Failed to send email", new Error("Resend API error"), {
            status: emailResponse.status,
            error: emailResult,
            sessionId: session.id
          });
        }
      } catch (emailError: any) {
        logger.error("Failed to send email", emailError, { sessionId: session.id });
      }
    } else {
      logger.warn("RESEND_API_KEY not set. Email not sent.", { sessionId: session.id });
      // In development, log to console
      if (process.env.NODE_ENV === 'development') {
        logger.info("Order details (dev only)", { emailBody, sessionId: session.id });
      }
    }
  }

  return NextResponse.json({ received: true });
}

