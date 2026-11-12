import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = { name?: string; email?: string; message?: string; company?: string; website?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]);

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields.
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const company = (body.company ?? "").trim().slice(0, 120);
  const message = (body.message ?? "").trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please provide your name, a valid email and a message (10+ characters)." }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No email provider configured: the client falls back to the visitor's mail app.
    return NextResponse.json({ ok: false, fallback: "mailto", error: "Email delivery is not configured on this deployment." }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL || "craja62002@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio inquiry from ${name}${company ? ` (${company})` : ""}`,
        html: `<p><strong>Name:</strong> ${esc(name)}</p><p><strong>Email:</strong> ${esc(email)}</p>${company ? `<p><strong>Company:</strong> ${esc(company)}</p>` : ""}<p style="white-space:pre-wrap">${esc(message)}</p>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, fallback: "mailto", error: "The message could not be sent right now." }, { status: 502 });
  }
}
