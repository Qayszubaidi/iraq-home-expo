-- Iraq Home Expo form leads
-- Run this once in Supabase SQL Editor.

create table if not exists public.form_leads (
  id uuid primary key default gen_random_uuid(),
  form_type text not null check (form_type in ('visitor','exhibitor','contact')),
  status text not null default 'new' check (status in ('new','contacted','archived')),
  name text,
  company text,
  email text not null,
  phone text,
  country text,
  subject text,
  participation_type text,
  data jsonb not null default '{}'::jsonb,
  email_sent boolean not null default false,
  delivery_error text,
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists form_leads_created_at_idx on public.form_leads (created_at desc);
create index if not exists form_leads_status_idx on public.form_leads (status);
create index if not exists form_leads_type_idx on public.form_leads (form_type);
create index if not exists form_leads_email_idx on public.form_leads (lower(email));

alter table public.form_leads enable row level security;

grant select, update, delete on public.form_leads to authenticated;

drop policy if exists "admins read leads" on public.form_leads;
create policy "admins read leads" on public.form_leads
for select to authenticated
using (public.is_ihe_admin());

drop policy if exists "admins update leads" on public.form_leads;
create policy "admins update leads" on public.form_leads
for update to authenticated
using (public.is_ihe_admin())
with check (public.is_ihe_admin());

drop policy if exists "admins delete leads" on public.form_leads;
create policy "admins delete leads" on public.form_leads
for delete to authenticated
using (public.is_ihe_admin());

-- No anon insert policy is created.
-- Public forms are stored server-side using the Supabase service-role key.
