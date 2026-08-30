# Iraq Home Expo Admin Dashboard

The dashboard is available at `/admin` and is intentionally limited to this website.

## 1. Create Supabase project
Create a Supabase project, then open **SQL Editor** and run:

`supabase/iraq-home-expo-admin.sql`

## 2. Create the admin user
In Supabase: **Authentication -> Users -> Add user**. Create the administrator email/password.
Copy that user's UUID and run in SQL Editor:

```sql
insert into public.admin_users(user_id) values ('PASTE-USER-UUID-HERE');
```

Only users in `admin_users` can read drafts, publish, change private form recipients, or upload media.

## 3. Add Vercel environment variables
Get these from Supabase **Project Settings / Connect**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR-PUBLISHABLE-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never expose it with `NEXT_PUBLIC_` and never commit it.

Keep your existing SMTP / Turnstile variables unchanged.

## 4. Redeploy
Redeploy Vercel after adding environment variables.
Then open:

`https://www.iraqhomeexpo.com/admin/login`

## What V1 controls
- Home hero
- Standard page heroes: About, Why Iraq, Sectors, Visit, Exhibit, Sponsor, Contact, Register
- Eight sector card images, hero images, summaries and categories
- Event/contact/social settings in Header, Footer and Contact
- Media uploads to Supabase Storage
- Private visitor/contact and exhibitor/sponsor recipient lists
- Draft / Publish separation

The layout, CSS and component structure remain in Git and cannot be edited from the CMS.

## Resilience
If Supabase is temporarily unavailable or not configured, the public site continues using its existing hard-coded content and images.
