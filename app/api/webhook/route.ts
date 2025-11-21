import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  console.log("📥 Webhook endpoint called");
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.error("❌ No Stripe signature in request");
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    console.error("❌ STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("✅ Webhook signature verified. Event type:", event.type);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    console.log("✅ Webhook received: checkout.session.completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    console.log("Session metadata:", JSON.stringify(metadata, null, 2));

    if (!metadata) {
      console.warn("⚠️ No metadata in session, cannot send email");
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
    const TO_EMAIL = process.env.TO_EMAIL || "Mreoch82@hotmail.com";

    console.log("📧 Preparing to send email...");
    console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);
    console.log("TO_EMAIL:", TO_EMAIL);

    if (RESEND_API_KEY) {
      try {
        console.log("📤 Sending email via Resend API...");
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
            body: JSON.stringify({
              from: "SEO Audit Pro <onboarding@resend.dev>",
              to: [TO_EMAIL], // Resend requires array format
              reply_to: email,
              subject: emailSubject,
              text: emailBody,
            }),
        });

        const emailResult = await emailResponse.json();
        
        console.log("📧 Resend API Response Status:", emailResponse.status);
        console.log("📧 Resend API Response:", JSON.stringify(emailResult, null, 2));
        
        if (emailResponse.ok) {
          console.log("✅ Order confirmation email sent successfully to:", TO_EMAIL);
          console.log("✅ Email ID:", emailResult.id);
        } else {
          console.error("❌ Failed to send email. Resend API error:");
          console.error("Status:", emailResponse.status);
          console.error("Error details:", JSON.stringify(emailResult, null, 2));
        }
      } catch (emailError: any) {
        console.error("❌ Failed to send email (network/parsing error):");
        console.error("Error:", emailError.message);
        console.error("Stack:", emailError.stack);
      }
    } else {
      console.log("⚠️ RESEND_API_KEY not set in environment variables!");
      console.log("⚠️ Email not sent. Check your .env.local file.");
      console.log("=== SEO AUDIT REQUEST (PAID) ===");
      console.log(emailBody);
      console.log("================================");
    }
  }

  return NextResponse.json({ received: true });
}

