-- Create a new table named "writer" with username-based auth fields

-- Enable UUID generation (usually enabled on Supabase already)
create extension if not exists pgcrypto;

create table if not exists writer (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  full_name text not null,
  password_hash text not null,
  bio text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Optional: trigger to auto-update updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'writer_set_updated_at'
  ) then
    create trigger writer_set_updated_at
    before update on writer
    for each row execute function set_updated_at();
  end if;
end $$;


