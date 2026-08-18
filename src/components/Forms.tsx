"use client";

import Script from "next/script";
import { FormEvent, useState } from "react";

const professional = ["Importer", "Exporter", "Producer", "Wholesaler", "Retailer", "Interior Designer", "Purchasing Specialist", "Chain Store", "Designer", "Public-Sector Representative", "Press & Media", "Other"];
const sectors = ["Interiors", "Furniture & Home Furnishings", "Home Textiles", "Kitchen", "Bathroom & Cleaning", "Home Lighting & Electrical", "HVAC + R", "Digital, Safety & Security"];
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function Submit({ state, label }: { state: string; label: string }) {
  return <button className="button gold submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : label}<span>↗</span></button>;
}

function Turnstile({action}:{action:"visitor"|"exhibitor"|"contact"}) {
  if (!turnstileSiteKey) return null;
  return <div className="full turnstileWrap">
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
    <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" data-action={action} />
  </div>;
}

export function SmartForm({ type }: { type: "visitor" | "exhibitor" | "contact" }) {
  const [state, setState] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const current = e.currentTarget;
    const form = new FormData(current);
    const payload: Record<string, FormDataEntryValue | FormDataEntryValue[]> = Object.fromEntries(form.entries());
    if (type === "visitor") payload.sectors = form.getAll("sectors");
    payload.type = type;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(response.ok ? "sent" : "error");
      if (response.ok) current.reset();
      else (window as unknown as {turnstile?: {reset: () => void}}).turnstile?.reset();
    } catch {
      setState("error");
      (window as unknown as {turnstile?: {reset: () => void}}).turnstile?.reset();
    }
  }

  return <form className="smartForm" onSubmit={submit} noValidate={false}>
    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

    {type === "visitor" && <>
      <Field name="fullName" label="Full Name" required />
      <Field name="company" label="Company / Organization" />
      <Field name="jobTitle" label="Job Title" />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone / WhatsApp" type="tel" required />
      <Field name="country" label="Country" />
      <Field name="city" label="City" />
      <label>Professional Category<select name="professionalCategory" required><option value="">Select</option>{professional.map((x) => <option key={x}>{x}</option>)}</select></label>
      <fieldset className="full checkGroup"><legend>Sectors of Interest</legend>{sectors.map((x) => <label key={x}><input type="checkbox" name="sectors" value={x} /><span>{x}</span></label>)}</fieldset>
      <TextArea name="message" label="Additional Information" />
      <Consent text="I agree to be contacted regarding Iraq Home Expo." />
      <Turnstile action="visitor" />
      <Submit state={state} label="Register to Visit" />
    </>}

    {type === "exhibitor" && <>
      <label className="full participationType">Participation Type *<select name="participationType" required defaultValue=""><option value="" disabled>Select how you want to participate</option><option value="Exhibitor">Exhibitor</option><option value="Sponsor">Sponsor</option><option value="Exhibitor + Sponsor">Exhibitor + Sponsor</option></select></label>
      <Field name="companyName" label="Company Name" required />
      <Field name="contactPerson" label="Contact Person" required />
      <Field name="jobTitle" label="Job Title" />
      <Field name="email" label="Business Email" type="email" required />
      <Field name="phone" label="Phone / WhatsApp" type="tel" required />
      <Field name="country" label="Country" />
      <Field name="websiteUrl" label="Website" type="url" />
      <label className="full">Company / Product Sector<select name="sector" required><option value="">Select</option>{sectors.map((x) => <option key={x}>{x}</option>)}</select></label>
      <TextArea name="products" label="Products / Brands to Exhibit" />
      <TextArea name="message" label="Participation Requirements / Message" />
      <Consent text="I agree to be contacted regarding exhibiting at Iraq Home Expo." />
      <Turnstile action="exhibitor" />
      <Submit state={state} label="Submit Exhibitor Interest" />
    </>}

    {type === "contact" && <>
      <Field name="fullName" label="Full Name" required />
      <Field name="company" label="Company / Organization" />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone / WhatsApp" type="tel" />
      <Field name="subject" label="Subject" />
      <TextArea name="message" label="Message" required />
      <Consent text="I agree to be contacted regarding my enquiry." />
      <Turnstile action="contact" />
      <Submit state={state} label="Send Message" />
    </>}

    <div aria-live="polite" className="full">
      {state === "sent" && <p className="formNotice ok">Thank you. Your details have been received.</p>}
      {state === "error" && <p className="formNotice error">We couldn&apos;t send the form. Please try again or contact the team directly.</p>}
    </div>
  </form>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label>{label}{required && " *"}<input name={name} type={type} required={required} maxLength={type === "email" ? 254 : 180} /></label>;
}
function TextArea({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return <label className="full">{label}{required && " *"}<textarea name={name} rows={5} required={required} maxLength={4000} /></label>;
}
function Consent({ text }: { text: string }) {
  return <label className="full consent"><input type="checkbox" name="consent" value="yes" required /><span>{text}</span></label>;
}
