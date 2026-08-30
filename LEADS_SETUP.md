# Iraq Home Expo Leads Setup

The admin dashboard now includes **07 · Leads**.

## One-time Supabase step

Run this migration in Supabase SQL Editor:

`supabase/2026-08-30-form-leads.sql`

This creates the private `form_leads` table and admin-only RLS policies.

## What is stored

After a public form passes validation and Turnstile, the server records the lead in Supabase and then sends the existing email notification.

Lead types:
- Visitor registration
- Exhibitor / Sponsor enquiry
- Contact enquiry

The dashboard supports:
- Search and filters
- New / Contacted / Archived statuses
- Lead detail drawer
- Email / Call shortcuts
- Email-delivery status
- CSV export

Public visitors cannot read or write the leads table directly. Form inserts use the existing server-side `SUPABASE_SERVICE_ROLE_KEY`; admin reads/updates use the authenticated admin session and RLS.

## Existing historical submissions

Only submissions received after this feature is deployed are automatically stored. Existing emails previously received are not backfilled into Supabase.
