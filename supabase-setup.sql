-- Supabase के SQL Editor में एक बार चला दीजिए
create table if not exists public.wishes (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 30),
  message text not null check (char_length(message) between 1 and 150),
  created_at timestamptz not null default now()
);
alter table public.wishes enable row level security;
create policy "sab padh sakte hain" on public.wishes for select using (true);
create policy "sab likh sakte hain" on public.wishes for insert with check (true);
-- कोई मिटा या बदल नहीं सकता. गलत संदेश हटाने के लिए Supabase डैशबोर्ड की Table Editor में जाएं.
