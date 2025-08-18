-- Add extra fields to writer table

alter table if exists writer
  add column if not exists field_allotted text,
  add column if not exists expertise text,
  add column if not exists phone text;


