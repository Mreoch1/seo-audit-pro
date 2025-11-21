import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, websiteUrl, tier, addOns, totalPrice, notes } = body;

    // Validate required fields
    if (!name || !email || !websiteUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format add-ons list for email
    const addOnsList = Array.isArray(addOns) && addOns.length > 0
      ? addOns.map((addOn: string) => {
          if (addOn.includes("Extra Pages")) {
            return addOn;
          }
          if (addOn.includes("Extra Keywords")) {
            return addOn;
          }
          return addOn.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
        })
      : [];

    // Create email content
    const emailSubject = `SEO Audit Request – ${tier} – ${websiteUrl}`;
    
    let emailBody = `Hello,

You have received a new SEO audit request:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
Website URL: ${websiteUrl}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tier: ${tier.charAt(0).toUpperCase() + tier.slice(1)}

Add-ons:`;

    if (addOnsList.length > 0) {
      addOnsList.forEach((addOn: string) => {
        emailBody += `\n  • ${addOn}`;
      });
    } else {
      emailBody += `\n  • None`;
    }

    emailBody += `\n\nTotal Price: $${totalPrice}`;

    if (notes && notes.trim()) {
      emailBody += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTES / SPECIAL REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${notes}`;
    }

    emailBody += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was sent from the SEO Audit Pro website.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Send email using Resend API
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL || "contact@seoauditpro.com";

    if (!RESEND_API_KEY) {
      // Fallback: log to console in development
      console.log("=== SEO AUDIT REQUEST ===");
      console.log(emailBody);
      console.log("========================");
      
      return NextResponse.json(
        { 
          success: true, 
          message: "Request received (logged to console - set RESEND_API_KEY for email delivery)" 
        },
        { status: 200 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SEO Audit Pro <contact@seoauditpro.com>",
        to: TO_EMAIL,
        reply_to: email,
        subject: emailSubject,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Request submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

