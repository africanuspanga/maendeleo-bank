-- Maendeleo Bank PLC — website CMS schema
-- 0001_init.sql — tables, triggers, row-level security, storage bucket.
-- Safe to re-run: every statement is idempotent.

-- ---------------------------------------------------------------------------
-- updated_at trigger function (shared by all content tables)
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- forex_rates — Treasury rates.
-- CONTRACT: the public site's forex widget (lib/rates.ts) reads exactly these
-- columns. Do not rename the table or its columns.
-- ---------------------------------------------------------------------------
create table if not exists public.forex_rates (
  id         uuid primary key default gen_random_uuid(),
  currency   text not null,
  label      text not null,
  buy        numeric not null default 0,
  sell       numeric not null default 0,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_forex_rates_updated_at on public.forex_rates;
create trigger set_forex_rates_updated_at
  before update on public.forex_rates
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- news
-- ---------------------------------------------------------------------------
create table if not exists public.news (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  title_sw     text,
  excerpt      text,
  body         text,
  image_url    text,
  published_at timestamptz,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists set_news_updated_at on public.news;
create trigger set_news_updated_at
  before update on public.news
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- careers
-- ---------------------------------------------------------------------------
create table if not exists public.careers (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  location    text,
  type        text,
  deadline    date,
  description text,
  pdf_url     text,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists set_careers_updated_at on public.careers;
create trigger set_careers_updated_at
  before update on public.careers
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- tenders
-- ---------------------------------------------------------------------------
create table if not exists public.tenders (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  reference   text,
  deadline    date,
  description text,
  pdf_url     text,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists set_tenders_updated_at on public.tenders;
create trigger set_tenders_updated_at
  before update on public.tenders
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- reports — investor relations documents
-- ---------------------------------------------------------------------------
create table if not exists public.reports (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  category     text not null check (category in ('annual-report', 'agm-book', 'financial-statement', 'disclosure')),
  year         integer,
  file_url     text,
  published_at timestamptz,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists set_reports_updated_at on public.reports;
create trigger set_reports_updated_at
  before update on public.reports
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- site_content — key/value store for hero copy, announcement bar, hours,
-- contact details. `value` is jsonb (string, object, …).
-- ---------------------------------------------------------------------------
create table if not exists public.site_content (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row-level security
-- Read:  public may read published content (forex_rates and site_content are
--        always public — the forex widget and site chrome read them).
-- Write: any authenticated user (admin editors) may insert/update/delete.
-- ---------------------------------------------------------------------------
alter table public.forex_rates  enable row level security;
alter table public.news         enable row level security;
alter table public.careers      enable row level security;
alter table public.tenders      enable row level security;
alter table public.reports      enable row level security;
alter table public.site_content enable row level security;

-- forex_rates: fully public read
drop policy if exists "forex_rates_public_read" on public.forex_rates;
create policy "forex_rates_public_read"
  on public.forex_rates for select
  to anon, authenticated
  using (true);

drop policy if exists "forex_rates_authenticated_write" on public.forex_rates;
create policy "forex_rates_authenticated_write"
  on public.forex_rates for all
  to authenticated
  using (true) with check (true);

-- news: public reads published rows only
drop policy if exists "news_public_read" on public.news;
create policy "news_public_read"
  on public.news for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "news_authenticated_write" on public.news;
create policy "news_authenticated_write"
  on public.news for all
  to authenticated
  using (true) with check (true);

-- careers
drop policy if exists "careers_public_read" on public.careers;
create policy "careers_public_read"
  on public.careers for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "careers_authenticated_write" on public.careers;
create policy "careers_authenticated_write"
  on public.careers for all
  to authenticated
  using (true) with check (true);

-- tenders
drop policy if exists "tenders_public_read" on public.tenders;
create policy "tenders_public_read"
  on public.tenders for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "tenders_authenticated_write" on public.tenders;
create policy "tenders_authenticated_write"
  on public.tenders for all
  to authenticated
  using (true) with check (true);

-- reports
drop policy if exists "reports_public_read" on public.reports;
create policy "reports_public_read"
  on public.reports for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "reports_authenticated_write" on public.reports;
create policy "reports_authenticated_write"
  on public.reports for all
  to authenticated
  using (true) with check (true);

-- site_content: fully public read
drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read"
  on public.site_content for select
  to anon, authenticated
  using (true);

drop policy if exists "site_content_authenticated_write" on public.site_content;
create policy "site_content_authenticated_write"
  on public.site_content for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage: public `media` bucket for news images and PDF uploads.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'media');

drop policy if exists "media_authenticated_insert" on storage.objects;
create policy "media_authenticated_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "media_authenticated_update" on storage.objects;
create policy "media_authenticated_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists "media_authenticated_delete" on storage.objects;
create policy "media_authenticated_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
