-- Iraq Home Expo private CMS schema
-- Run this once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_ihe_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.admin_users where user_id=auth.uid());
$$;

create table if not exists public.cms_pages (
  key text primary key,
  label text not null,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.cms_page_drafts (like public.cms_pages including all);

create table if not exists public.cms_sectors (
  slug text primary key,
  label text not null,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.cms_sector_drafts (like public.cms_sectors including all);

create table if not exists public.cms_settings (
  key text primary key,
  label text not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.cms_settings_drafts (like public.cms_settings including all);
create table if not exists public.cms_private_settings (like public.cms_settings including all);
create table if not exists public.cms_private_settings_drafts (like public.cms_settings including all);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  path text not null unique,
  public_url text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_page_drafts enable row level security;
alter table public.cms_sectors enable row level security;
alter table public.cms_sector_drafts enable row level security;
alter table public.cms_settings enable row level security;
alter table public.cms_settings_drafts enable row level security;
alter table public.cms_private_settings enable row level security;
alter table public.cms_private_settings_drafts enable row level security;
alter table public.media_assets enable row level security;

grant select on public.cms_pages, public.cms_sectors, public.cms_settings to anon, authenticated;
grant all on public.cms_pages, public.cms_page_drafts, public.cms_sectors, public.cms_sector_drafts, public.cms_settings, public.cms_settings_drafts, public.cms_private_settings, public.cms_private_settings_drafts, public.media_assets to authenticated;
revoke all on function public.is_ihe_admin() from public;
grant execute on function public.is_ihe_admin() to authenticated;

-- Public website can only read PUBLISHED public content.
create policy "public read published pages" on public.cms_pages for select using (true);
create policy "public read published sectors" on public.cms_sectors for select using (true);
create policy "public read published settings" on public.cms_settings for select using (true);

-- Admins can manage published content.
create policy "admins manage pages" on public.cms_pages for all using (public.is_ihe_admin()) with check (public.is_ihe_admin());
create policy "admins manage sectors" on public.cms_sectors for all using (public.is_ihe_admin()) with check (public.is_ihe_admin());
create policy "admins manage settings" on public.cms_settings for all using (public.is_ihe_admin()) with check (public.is_ihe_admin());

-- Drafts/private settings never have anonymous read policies.
create policy "admins manage page drafts" on public.cms_page_drafts for all using (public.is_ihe_admin()) with check (public.is_ihe_admin());
create policy "admins manage sector drafts" on public.cms_sector_drafts for all using (public.is_ihe_admin()) with check (public.is_ihe_admin());
create policy "admins manage settings drafts" on public.cms_settings_drafts for all using (public.is_ihe_admin()) with check (public.is_ihe_admin());
create policy "admins manage private settings" on public.cms_private_settings for all using (public.is_ihe_admin()) with check (public.is_ihe_admin());
create policy "admins manage private drafts" on public.cms_private_settings_drafts for all using (public.is_ihe_admin()) with check (public.is_ihe_admin());
create policy "admins read media" on public.media_assets for select using (public.is_ihe_admin());
create policy "admins insert media" on public.media_assets for insert with check (public.is_ihe_admin());
create policy "admins update media" on public.media_assets for update using (public.is_ihe_admin()) with check (public.is_ihe_admin());
create policy "admins delete media" on public.media_assets for delete using (public.is_ihe_admin());

-- Public image bucket. Upload/delete is still restricted to authenticated admins through storage policies.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('site-media','site-media',true,10485760,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public=true,file_size_limit=10485760,allowed_mime_types=array['image/jpeg','image/png','image/webp','image/gif'];

create policy "admins upload site media" on storage.objects for insert to authenticated
with check (bucket_id='site-media' and public.is_ihe_admin());
create policy "admins update site media" on storage.objects for update to authenticated
using (bucket_id='site-media' and public.is_ihe_admin()) with check (bucket_id='site-media' and public.is_ihe_admin());
create policy "admins delete site media" on storage.objects for delete to authenticated
using (bucket_id='site-media' and public.is_ihe_admin());

-- AFTER creating your admin account in Supabase Authentication -> Users,
-- replace the UUID below with that user's UUID and run the INSERT separately:
-- insert into public.admin_users(user_id) values ('YOUR-AUTH-USER-UUID');
