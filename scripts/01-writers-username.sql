-- Ensure writer_profiles has a username field and unique constraint
alter table if exists writer_profiles
  add column if not exists username text;

update writer_profiles
set username = coalesce(username, split_part(email, '@', 1))
where username is null;

do $$
begin
  begin
    alter table writer_profiles add constraint writer_profiles_username_key unique (username);
  exception when duplicate_object then null;
  end;
end$$;


