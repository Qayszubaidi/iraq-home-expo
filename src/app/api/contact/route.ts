import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;
type FormType = "visitor" | "exhibitor" | "contact";
const buckets = new Map<string, { count: number; resetAt: number }>();

const esc = (value: unknown) =>
  String(value ?? "").replace(/[<>&"']/g, (char) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" }[char]!),
  );
const label = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
const clean = (value: unknown, max = 1500) => String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
const validEmail = (value: string) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value) && !/[\r\n]/.test(value);
const parseRecipients = (value: string | undefined, defaults: string[]) => {
  const list = (value || "").split(",").map((item) => item.trim()).filter(validEmail);
  return list.length ? [...new Set(list)] : defaults;
};
const ipFor = (req: NextRequest) => (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0].trim();

function rateLimited(ip: string) {
  const now = Date.now();
  if (buckets.size > 1000) {
    for (const [key, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(key);
  }
  const current = buckets.get(ip);
  if (!current || current.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

async function verifyTurnstile(token: string, ip: string, action: FormType) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean; hostname?: string; action?: string };
  if (result.success !== true || result.action !== action) return false;

  const expectedHosts = new Set<string>();
  try {
    if (process.env.NEXT_PUBLIC_SITE_URL) expectedHosts.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname);
  } catch {}
  if (process.env.VERCEL_URL) expectedHosts.add(process.env.VERCEL_URL);

  if (process.env.NODE_ENV === "production" && expectedHosts.size && result.hostname && !expectedHosts.has(result.hostname)) return false;
  return true;
}

const fieldsByType = {
  visitor: ["fullName", "company", "jobTitle", "email", "phone", "country", "city", "professionalCategory", "sectors", "message", "consent"],
  exhibitor: ["participationType", "companyName", "contactPerson", "jobTitle", "email", "phone", "country", "websiteUrl", "sector", "products", "message", "consent"],
  contact: ["fullName", "company", "email", "phone", "subject", "message", "consent"],
} as const;


export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ error: "Unsupported request" }, { status: 415 });
    }
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 64_000) return NextResponse.json({ error: "Request too large" }, { status: 413 });

    const origin = req.headers.get("origin")?.replace(/\/$/, "");
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ""),
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    ].filter(Boolean) as string[];
    if (process.env.NODE_ENV === "production" && origin && allowedOrigins.length && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
    }

    const ip = ipFor(req);
    if (rateLimited(ip)) return NextResponse.json({ error: "Too many submissions. Please try again shortly." }, { status: 429 });

    const raw = (await req.json()) as Record<string, unknown>;
    if (raw.website) return NextResponse.json({ ok: true });
    const type = clean(raw.type, 20) as FormType;
    if (!(type in fieldsByType)) return NextResponse.json({ error: "Invalid form" }, { status: 400 });

    const email = clean(raw.email, 254).toLowerCase();
    if (!validEmail(email)) return NextResponse.json({ error: "Valid email required" }, { status: 400 });

    if (type === "visitor" && (!clean(raw.fullName, 120) || !clean(raw.phone, 60))) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    if (type === "exhibitor") {
      const participationType = clean(raw.participationType, 40);
      if (!["Exhibitor", "Sponsor", "Exhibitor + Sponsor"].includes(participationType)) return NextResponse.json({ error: "Participation type is required" }, { status: 400 });
      if (!clean(raw.companyName, 160) || !clean(raw.contactPerson, 120) || !clean(raw.phone, 60)) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }
    if (type === "contact" && (!clean(raw.fullName, 120) || !clean(raw.message, 4000))) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    if (clean(raw.consent, 10) !== "yes") return NextResponse.json({ error: "Consent is required" }, { status: 400 });

    const turnstileToken = clean(raw["cf-turnstile-response"], 2048);
    if (!(await verifyTurnstile(turnstileToken, ip, type))) {
      return NextResponse.json({ error: "Anti-spam verification failed" }, { status: 403 });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) return NextResponse.json({ error: "Mail service is not configured" }, { status: 503 });

    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
      connectionTimeout: 12_000,
      greetingTimeout: 12_000,
      socketTimeout: 20_000,
    });

    const recipients = type === "exhibitor"
      ? parseRecipients(process.env.SALES_TO, ["sales@iraqhomeexpo.com", "qayszubaidi@gmail.com"])
      : parseRecipients(process.env.CONTACT_TO, ["info@iraqhomeexpo.com", "qayszubaidi@gmail.com"]);

    const contactSubject = clean(raw.subject, 120).replace(/[\r\n]+/g, " ");
    const title = type === "visitor"
      ? "New Visitor Registration — Iraq Home Expo 2027"
      : type === "exhibitor"
        ? `${clean(raw.participationType, 40) === "Sponsor" ? "New Sponsor Enquiry" : clean(raw.participationType, 40) === "Exhibitor + Sponsor" ? "New Exhibitor + Sponsor Enquiry" : "New Exhibitor Registration"} — Iraq Home Expo 2027`
        : `New Contact Enquiry — Iraq Home Expo 2027${contactSubject ? ` — ${contactSubject}` : ""}`;

    const allowed = fieldsByType[type];
    const entries = allowed
      .filter((key) => raw[key] !== undefined)
      .map((key) => [key, Array.isArray(raw[key]) ? (raw[key] as unknown[]).map((item) => clean(item, 200)).slice(0, 20) : clean(raw[key], key === "message" || key === "products" ? 4000 : 500)] as const);

    const rows = entries.map(([key, value]) =>
      `<tr><td style="padding:10px;border-bottom:1px solid #e7e1d7;width:34%"><strong>${esc(label(key))}</strong></td><td style="padding:10px;border-bottom:1px solid #e7e1d7">${esc(Array.isArray(value) ? value.join(", ") : value)}</td></tr>`,
    ).join("");

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "Iraq Home Expo <website@iraqhomeexpo.com>",
      to: recipients,
      replyTo: email,
      subject: title,
      html: `<div style="font-family:Arial,sans-serif;color:#231f20;max-width:760px"><div style="background:#005251;color:#fff;padding:24px"><h2 style="margin:0">${esc(title)}</h2></div><table style="border-collapse:collapse;width:100%;background:#fff">${rows}</table><p style="font-size:12px;color:#777">Submitted via iraqhomeexpo.com</p></div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Form submission failed", error);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
