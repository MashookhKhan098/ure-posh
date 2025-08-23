-- Add field_allotted checkboxes to writer table
-- This replaces the single text field with multiple boolean fields for specific content areas

-- First, drop the existing field_allotted column if it exists
alter table if exists writer drop column if exists field_allotted;

-- Add new boolean columns for each field allotted option
alter table if exists writer
  add column if not exists company_updates boolean default false,
  add column if not exists compliance_legal_insights boolean default false,
  add column if not exists news_media_coverage boolean default false,
  add column if not exists newsletter_archive boolean default false,
  add column if not exists thought_leadership boolean default false,
  add column if not exists workplace_stories boolean default false,
  add column if not exists events_webinars boolean default false,
  add column if not exists international_regulatory_policy_watch boolean default false,
  add column if not exists united_kingdom_workplace boolean default false,
  add column if not exists us_workplace boolean default false;

-- Create an index for better query performance
create index if not exists idx_writer_field_allotted on writer (
  company_updates, compliance_legal_insights, news_media_coverage, 
  newsletter_archive, thought_leadership, workplace_stories, 
  events_webinars, international_regulatory_policy_watch, 
  united_kingdom_workplace, us_workplace
);

-- Add comment to document the purpose
comment on table writer is 'Writer table with field_allotted checkboxes for content area permissions';
