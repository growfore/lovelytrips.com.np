import { z } from "zod";

import { siteConfig } from "@/lib/siteConfig";

const emailSchema = z.object({
  replyTo: z.string().email().optional(),
  subject: z.string().trim().min(1).max(200),
  text: z.string().trim().min(1).max(20_000),
  html: z.string().max(100_000).optional(),
});

export async function POST(request: Request) {
  const parsed = emailSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ message: "Invalid email request" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return Response.json({ message: "Email service is unavailable" }, { status: 500 });
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "lovelytrips.com.np/1.0",
      },
      body: JSON.stringify({
        from: "noreply@tripeleven.com",
        to: [siteConfig.email],
        reply_to: parsed.data.replyTo,
        subject: parsed.data.subject,
        text: parsed.data.text,
        html: parsed.data.html,
      }),
    });
  } catch (error) {
    console.error("Resend request failed", error);
    return Response.json({ message: "Failed to send email" }, { status: 502 });
  }

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    console.error("Resend email failed", response.status, result);
    return Response.json({ message: "Failed to send email" }, { status: 502 });
  }

  return Response.json({ id: result?.id });
}
