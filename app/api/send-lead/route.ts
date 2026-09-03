import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, countryCode, planType, service, message } = body;

    // 1. Core Validation Guard Checks
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone)." },
        { status: 400 }
      );
    }

    // 2. Format Mobile and Timestamps for LeadRat
    const cleanedMobile = phone.replace(/\D/g, "").slice(-10);
    const fullPhoneNumber = `${countryCode || "+91"} ${phone}`;

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const submittedDate = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${String(now.getFullYear()).slice(-2)}`;
    const submittedTime = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    // 3. PUSH LEAD TO LEADRAT CRM (Array Payload Format)
    try {
      await fetch("https://connect.leadrat.com/api/v1/integration/Website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": "YTBlMzgxODItZWU0NC00M2I1LThhNDQtZWVlOTg3M2I0ZmFl",
        },
        body: JSON.stringify([
          {
            name: name,
            mobile: cleanedMobile,
            email: email,
            countryCode: countryCode ? countryCode.replace("+", "") : "91",
            project: "Northwind Estate",
            property: "Apartment",
            propertyType: planType || service || "Wellness Residences",
            notes: `Lead Source: Northwind Estate Landing Page (northwind22d.com). Typology/Service: ${planType || service || "General Enquiry"}. Message: ${message || "N/A"}`,
            submittedDate: submittedDate,
            submittedTime: submittedTime,
            subsource: "Website Direct",
            leadStatus: "New",
          },
        ]),
      });
    } catch (crmError) {
      // Failsafe: Log CRM error so Resend email dispatch continues uninterrupted
      console.error("LeadRat CRM Integration Error:", crmError);
    }

    // 4. DISPATCH RESEND LEAD NOTIFICATION EMAIL
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable.");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const recipientEmail = process.env.LEAD_RECIPIENT_EMAIL || "realtyfmleads@gmail.com";

    const data = await resend.emails.send({
      from: "Northwind Leads <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `New Lead Inquiry: ${name} - Northwind Estate (northwind22d.com)`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A; background-color: #FBF9F5; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #1C3D2F; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">New Lead Received - Northwind Wellness Residences</h2>
          <p>You have received a new inquiry from the landing page (<a href="https://northwind22d.com" target="_blank">northwind22d.com</a>):</p>
          <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold; width: 140px;">Full Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;"><a href="tel:${fullPhoneNumber}">${fullPhoneNumber}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Email Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Enquiry Context:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${planType || service || "General Enquiry"}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">User Message:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${message}</td>
            </tr>` : ""}
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #64748B;">This lead was automatically dispatched to LeadRat CRM and via the Northwind Estate web application lead system.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Lead Processing Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}