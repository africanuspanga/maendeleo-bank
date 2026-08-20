# Supabase setup — Maendeleo Bank PLC website CMS

The site's admin/CMS (`/admin`) runs on Supabase (Postgres + Auth + Storage).
Until it is connected, every admin page renders a setup screen and the public
site is unaffected.

## Go live in 5 steps

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is fine).
2. **Run the schema**: open the project's **SQL Editor** and run the full
   contents of `supabase/migrations/0001_init.sql`.
3. **Run the seed**: in the SQL Editor, run the full contents of
   `supabase/seed.sql` (forex rates, hero copy, 8 news items, 21 investor
   reports). Both files are idempotent.
4. **Set env vars** in `.env.local` (Project Settings → API):
   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — `anon` `public` key
   - `SUPABASE_SERVICE_ROLE_KEY` — `service_role` key (reserved; not required
     for the admin to work — writes go through the authenticated user + RLS)
5. **Create the first admin user**: Authentication → Users → *Add user*
   (email + password, *Auto Confirm User* on). Then restart the dev server
   and sign in at `/admin/login`.

## What the migration creates

| Object | Purpose |
|---|---|
| `forex_rates` | Treasury buy/sell rates — **contract with the public forex widget (`lib/rates.ts`); do not rename columns** |
| `news` | News & events posts (EN/SW titles, slug, publish status) |
| `careers` | Job vacancies with deadline + PDF |
| `tenders` | Procurement notices with reference + deadline + PDF |
| `reports` | Investor documents (annual reports, AGM books, financial statements, disclosures) |
| `site_content` | Key/jsonb store for hero copy, announcement bar, hours, contact block |
| `media` storage bucket | Public bucket for image/PDF uploads (public read, authenticated write) |

## Security model

- RLS is enabled on every table. Anonymous users can only `select` published
  content (plus `forex_rates` and `site_content`, which power public pages).
- All writes require the `authenticated` role — i.e. a signed-in admin user.
- The service-role key bypasses RLS and must never be exposed to the browser;
  the current admin code does not use it.

## Optional: Supabase CLI

If you prefer the CLI, `supabase link` + `supabase db push` picks up
`supabase/migrations/`, and `supabase db reset` also applies `seed.sql`.
