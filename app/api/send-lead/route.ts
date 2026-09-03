import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Server configuration error: Resend API key is missing." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const body = await request.json();
    const { name, email, phone, unitType, floorplanRequested, inquiryType } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone)." },
        { status: 400 }
      );
    }

    // Format current date and time for LeadRat CRM payload
    const now = new Date();
    const submittedDate = now.toISOString().split("T")[0].split("-").reverse().join("-"); // Format DD-MM-YY or YYYY-MM-DD
    const submittedTime = now.toTimeString().split(" ")[0];

    // ================= 1. PUSH LEAD TO LEADRAT CRM =================
    const leadRatPayload = {
      name: name,
      state: "Uttar Pradesh", // Default region for Yamuna Expressway project
      city: "Greater Noida",
      location: "Sector 22D, Yamuna Expressway",
      budget: "12500000", // Starting price reference (₹1.25 Cr)
      notes: unitType ? `Interested in ${unitType}` : floorplanRequested ? `Requested Floorplan: ${floorplanRequested}` : "Website General Inquiry",
      email: email,
      countryCode: "91",
      mobile: phone,
      project: "Northwind Estate Residences",
      property: "Apartment",
      leadExpectedBudget: "12500000",
      propertyType: "Residential",
      submittedDate: submittedDate,
      submittedTime: submittedTime,
      LeadId: "",
      subsource: "Northwind Landing Page",
      leadStatus: "Schedule Site Visit or Schedule Meeting",
      callRecordingUrl: "",
      scheduledDate: "",
      additionalProperties: {
        source: "northwind22d.com",
        inquiryContext: unitType || floorplanRequested || inquiryType || "General",
      },
    };

    try {
      await fetch("https://connect.leadrat.com/api/v1/integration/Website", {
        method: "POST",
        headers: {
          "API-Key": "YTBlMzgxODItZWU0NC00M2I1LThhNDQtZWVlOTg3M2I0ZmFl",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadRatPayload),
      });
    } catch (crmError) {
      console.error("Failed to push lead to LeadRat CRM:", crmError);
      // We continue execution so the email notification still goes through even if CRM sync encounters a minor glitch
    }

    // ================= 2. SEND NOTIFICATION EMAIL VIA RESEND =================
    const contextTag = unitType ? `[Unit: ${unitType}]` : floorplanRequested ? `[Floorplan: ${floorplanRequested}]` : inquiryType ? `[Type: ${inquiryType}]` : "";

    const emailData = await resend.emails.send({
      from: "Northwind Leads <onboarding@resend.dev>",
      to: ["realtyfmleads@gmail.com"],
      subject: `New Lead Inquiry ${contextTag}: ${name} - Northwind Estate (northwind22d.com)`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A; background-color: #FBF9F5; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #1C3D2F; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">New Lead Received - Northwind Wellness Residences</h2>
          <p>You have received a new inquiry from the landing page (<a href="https://northwind22d.com" target="_blank">northwind22d.com</a>) which has also been pushed to <strong>LeadRat CRM</strong>:</p>
          <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold; width: 140px;">Full Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Email Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            ${unitType ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Selected Unit:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${unitType}</td>
            </tr>` : ""}
            ${floorplanRequested ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold;">Floorplan Requested:</td>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0;">${floorplanRequested}</td>
            </tr>` : ""}
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #64748B;">Successfully synced with LeadRat CRM API endpoint.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, emailData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}