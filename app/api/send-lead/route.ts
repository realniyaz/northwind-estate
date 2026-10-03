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
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const submittedDate = `${day}-${month}-${year}`;
    const submittedTime = now.toTimeString().split(" ")[0];

    // ================= 1. PUSH LEAD TO LEADRAT CRM =================
    const leadRatPayload = {
      name: name,
      state: "Uttar Pradesh",
      city: "Greater Noida",
      location: "Prime Growth Corridor, NCR",
      budget: "18500000", // Starting reference ₹1.85 Cr Onwards
      notes: unitType ? `Interested in ${unitType}` : floorplanRequested ? `Requested Floorplan: ${floorplanRequested}` : "Website General Inquiry",
      email: email,
      countryCode: "91",
      mobile: phone,
      project: "Hero Properties Residences",
      property: "Apartment",
      leadExpectedBudget: "18500000",
      propertyType: "Residential",
      submittedDate: submittedDate,
      submittedTime: submittedTime,
      LeadId: "",
      subsource: "Hero Properties Landing Page",
      leadStatus: "Schedule Site Visit or Schedule Meeting",
      callRecordingUrl: "",
      scheduledDate: "",
      additionalProperties: {
        source: "hero-properties",
        inquiryContext: unitType || floorplanRequested || inquiryType || "General",
      },
    };

    let crmResponseStatus = null;
    let crmResponseBody = null;

    try {
      const crmRes = await fetch("https://connect.leadrat.com/api/v1/integration/Website", {
        method: "POST",
        headers: {
          "API-Key": "ZjMyMjMwOWYtZDk5My00ZjI1LWE3OWMtMzNmODc3MzlmYzZk",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([leadRatPayload]),
      });

      crmResponseStatus = crmRes.status;
      crmResponseBody = await crmRes.text();
    } catch (crmError: any) {
      console.error("Failed to push lead to LeadRat CRM:", crmError);
      crmResponseBody = crmError.message || "CRM Connection Failed";
    }

    // ================= 2. SEND NOTIFICATION EMAIL VIA RESEND =================
    const contextTag = unitType ? `[Unit: ${unitType}]` : floorplanRequested ? `[Floorplan: ${floorplanRequested}]` : inquiryType ? `[Type: ${inquiryType}]` : "";

    const emailData = await resend.emails.send({
      from: "Hero Properties Leads <onboarding@resend.dev>",
      to: ["realtyfmleads@gmail.com"],
      subject: `New Lead Inquiry ${contextTag}: ${name} - Hero Properties`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A; background-color: #FBF9F5; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #1C3D2F; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">New Lead Received - Hero Properties Residences</h2>
          <p>You have received a new inquiry from the landing page:</p>
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
          <p style="margin-top: 20px; font-size: 12px; color: #64748B;">Lead synced with LeadRat CRM (Status: ${crmResponseStatus || 'N/A'})</p>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      emailData, 
      leadRatSync: {
        status: crmResponseStatus,
        response: crmResponseBody
      } 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}