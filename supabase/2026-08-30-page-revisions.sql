-- Iraq Home Expo CMS: page revision history
-- Run once in Supabase SQL Editor. Safe to run again.

create table if not exists public.cms_page_revisions (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  label text not null,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists cms_page_revisions_key_created_idx
  on public.cms_page_revisions(key, created_at desc);

alter table public.cms_page_revisions enable row level security;
grant select, insert, delete on public.cms_page_revisions to authenticated;

drop policy if exists "admins read page revisions" on public.cms_page_revisions;
create policy "admins read page revisions" on public.cms_page_revisions
  for select using (public.is_ihe_admin());

drop policy if exists "admins insert page revisions" on public.cms_page_revisions;
create policy "admins insert page revisions" on public.cms_page_revisions
  for insert with check (public.is_ihe_admin());

drop policy if exists "admins delete page revisions" on public.cms_page_revisions;
create policy "admins delete page revisions" on public.cms_page_revisions
  for delete using (public.is_ihe_admin());
