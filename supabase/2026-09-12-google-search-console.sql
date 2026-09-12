create table if not exists public.seo_integrations (
  provider text primary key,
  refresh_token text not null,
  property_uri text,
  permission_level text,
  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.seo_integrations enable row level security;

revoke all on table public.seo_integrations from anon, authenticated;

comment on table public.seo_integrations is
  'Server-only OAuth integration tokens used by Iraq Home Expo admin analytics. Accessed only with the Supabase service role.';
