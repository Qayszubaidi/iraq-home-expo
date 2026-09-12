"use client";

const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const TOKEN_KEY = "ihe_admin_session";

type Session = { access_token: string; refresh_token: string; expires_at: number; user?: { email?: string } };

function assertConfigured() {
  if (!baseUrl || !publishableKey) throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as Session; } catch { return null; }
}

function saveSession(payload: any) {
  const session: Session = {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
    expires_at: Date.now() + Number(payload.expires_in ?? 3600) * 1000,
    user: payload.user,
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
  return session;
}

export async function signIn(email: string, password: string) {
  assertConfigured();
  const response = await fetch(`${baseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: publishableKey!, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload?.msg || payload?.error_description || "Unable to sign in.");
  return saveSession(payload);
}

export function signOut() { if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY); }

async function refreshSession(session: Session) {
  const response = await fetch(`${baseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: publishableKey!, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });
  const payload = await response.json();
  if (!response.ok) { signOut(); throw new Error("Your admin session expired. Please sign in again."); }
  return saveSession(payload);
}

async function authSession() {
  assertConfigured();
  let session = getSession();
  if (!session) throw new Error("Not signed in.");
  if (Date.now() > session.expires_at - 60_000) session = await refreshSession(session);
  return session;
}

export async function getAdminAccessToken() {
  const session = await authSession();
  return session.access_token;
}

export async function adminRest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const session = await authSession();
  const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: publishableKey!,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
  });
  if (!response.ok) {
    const body = await response.text();
    if (response.status === 401 || response.status === 403) throw new Error("Admin access denied. Check the admin_users table and your login.");
    throw new Error(body || `Request failed (${response.status})`);
  }
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}

export async function uploadMedia(file: File) {
  const session = await authSession();
  const safe = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safe}`;
  const response = await fetch(`${baseUrl}/storage/v1/object/site-media/${path}`, {
    method: "POST",
    headers: {
      apikey: publishableKey!,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: file,
  });
  if (!response.ok) throw new Error(await response.text());
  const publicUrl = `${baseUrl}/storage/v1/object/public/site-media/${path}`;
  await adminRest("media_assets", {
    method: "POST",
    body: JSON.stringify({ name: file.name, path, public_url: publicUrl, mime_type: file.type, size_bytes: file.size }),
  });
  return publicUrl;
}
