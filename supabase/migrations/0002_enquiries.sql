-- F49: contact-form enquiries. Written by the public site's server action
-- via the service role (bypasses RLS); read back in the admin dashboard.
create table if not exists public.enquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  topic      text,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;

-- No public policies: only the service role (server action) inserts,
-- only authenticated admin users read.
drop policy if exists "enquiries_authenticated_read" on public.enquiries;
create policy "enquiries_authenticated_read"
  on public.enquiries for select
  to authenticated
  using (true);
