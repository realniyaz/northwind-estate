import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone)." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Northwind Leads <onboarding@resend.dev>",
      to: ["realtyfmleads@gmail.com"],
      subject: `New Lead Inquiry: ${name} - Northwind Estate (northwind22d.com)`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A; background-color: #FBF9F5; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #1C3D2F; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">New Lead Received - Northwind Wellness Residences</h2>
          <p>You have received a new inquiry from the landing page (<a href="https://northwind22d.com" target="_blank">northwind22d.com</a>):</p>
          <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #E2E8F0; font-weight: bold; width: 120px;">Full Name:</td>
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
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #64748B;">This lead was automatically dispatched via the Northwind Estate web application lead system.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}