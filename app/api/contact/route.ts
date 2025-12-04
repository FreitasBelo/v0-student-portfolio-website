import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // If SendGrid is configured, send an email. Otherwise log the submission.
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL;

    if (SENDGRID_API_KEY && CONTACT_TO_EMAIL) {
      const sgPayload = {
        personalizations: [
          {
            to: [{ email: CONTACT_TO_EMAIL }],
            subject: `Website contact from ${name}`,
          },
        ],
        from: { email, name },
        content: [
          {
            type: "text/plain",
            value: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          },
        ],
      };

      const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sgPayload),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        // eslint-disable-next-line no-console
        console.error("SendGrid error:", resp.status, text);
        return NextResponse.json({ error: "Failed to deliver message" }, { status: 502 });
      }

      return NextResponse.json({ ok: true, message: "Message sent" });
    }

    // Fallback: log to server console and return informational response
    // eslint-disable-next-line no-console
    console.log("Contact form submission (delivery disabled):", { name, email, message });
    return NextResponse.json({ ok: true, message: "Message received (delivery not configured)." });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("Error in /api/contact:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
