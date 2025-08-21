-- Create a comprehensive people/team members table
-- Based on the structure from the people page cards

-- Enable UUID generation (usually enabled on Supabase already)
create extension if not exists pgcrypto;

-- Create the people table
create table if not exists people (
  id uuid primary key default gen_random_uuid(),
  
  -- Basic Information
  name text not null,
  title text not null,
  specialization text not null,
  description text not null,
  detailed_description text,
  
  -- Professional Details
  experience text not null, -- e.g., "10+ years"
  category text not null, -- e.g., "legal", "finance", "psychology"
  status text not null default 'standard', -- e.g., "standard", "premium"
  verified boolean not null default false,
  featured boolean not null default false,
  availability text not null default 'Available', -- e.g., "Available", "Busy"
  
  -- Contact Information
  email text not null,
  phone text,
  location text not null,
  website text,
  linkedin text,
  
  -- Performance Metrics
  rating decimal(3,2) default 0.0,
  review_count integer default 0,
  projects integer default 0,
  completion_rate integer default 0,
  response_time text, -- e.g., "2 hours"
  
  -- Pricing
  hourly_rate text, -- e.g., "₹5,000"
  monthly_rate text, -- e.g., "₹1,50,000"
  project_rate text, -- e.g., "₹25,000"
  
  -- Visual/UI Properties
  icon_name text, -- e.g., "Scale", "Calculator", "GraduationCap"
  color_gradient text, -- e.g., "from-pink-500 to-rose-600"
  accent_color text, -- e.g., "pink"
  image_url text,
  cover_image_url text,
  
  -- Arrays (stored as JSONB for flexibility)
  expertise jsonb default '[]'::jsonb, -- Array of expertise areas
  languages jsonb default '[]'::jsonb, -- Array of spoken languages
  education jsonb default '[]'::jsonb, -- Array of education objects
  certifications jsonb default '[]'::jsonb, -- Array of certifications
  skills jsonb default '[]'::jsonb, -- Array of skill objects with levels
  testimonials jsonb default '[]'::jsonb, -- Array of testimonial objects
  recent_projects jsonb default '[]'::jsonb, -- Array of project objects
  achievements jsonb default '[]'::jsonb, -- Array of achievements
  
  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create indexes for better performance
create index if not exists idx_people_category on people(category);
create index if not exists idx_people_status on people(status);
create index if not exists idx_people_verified on people(verified);
create index if not exists idx_people_featured on people(featured);
create index if not exists idx_people_availability on people(availability);
create index if not exists idx_people_rating on people(rating desc);
create index if not exists idx_people_experience on people(experience);
create index if not exists idx_people_name on people(name);

-- Create GIN indexes for JSONB columns for efficient querying
create index if not exists idx_people_expertise_gin on people using gin(expertise);
create index if not exists idx_people_languages_gin on people using gin(languages);
create index if not exists idx_people_skills_gin on people using gin(skills);

-- Enable Row Level Security (RLS)
alter table people enable row level security;

-- Create RLS policies
-- Allow public read access to all people
create policy "Allow public read access to people" on people
  for select using (true);

-- Allow authenticated users to insert their own profile
create policy "Allow authenticated users to insert people" on people
  for insert with check (auth.role() = 'authenticated');

-- Allow users to update their own profile (if we add user_id later)
-- create policy "Allow users to update own profile" on people
--   for update using (auth.uid() = user_id);

-- Allow admin users to update any profile
create policy "Allow admin users to update people" on people
  for update using (auth.role() = 'service_role');

-- Allow admin users to delete profiles
create policy "Allow admin users to delete people" on people
  for delete using (auth.role() = 'service_role');

-- Trigger to auto-update updated_at
create or replace function set_people_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'people_set_updated_at'
  ) then
    create trigger people_set_updated_at
    before update on people
    for each row execute function set_people_updated_at();
  end if;
end $$;

-- Insert sample data based on the people page
insert into people (
  name, title, specialization, description, detailed_description,
  experience, category, status, verified, featured, availability,
  email, phone, location, website, linkedin,
  rating, review_count, projects, completion_rate, response_time,
  hourly_rate, monthly_rate, project_rate,
  icon_name, color_gradient, accent_color,
  expertise, languages, education, certifications, skills, testimonials, recent_projects, achievements
) values 
(
  'CS Anchal Chopra',
  'Company Secretary & Legal Expert',
  'Corporate Law & Compliance',
  'Expert in corporate governance and legal compliance with extensive experience in POSH implementation and workplace safety regulations.',
  'With over a decade of experience in corporate law and compliance, CS Anchal Chopra has established herself as a leading authority in POSH implementation and workplace safety. Her comprehensive approach combines legal expertise with practical implementation strategies, helping organizations create safer, more inclusive work environments.',
  '10+ years',
  'legal',
  'premium',
  true,
  true,
  'Available',
  'anchal.chopra@ureposh.com',
  '+91 98765 43210',
  'New Delhi, India',
  'www.anchalchopra.com',
  'linkedin.com/in/anchalchopra',
  4.9,
  187,
  156,
  98,
  '2 hours',
  '₹5,000',
  '₹1,50,000',
  '₹25,000',
  'Scale',
  'from-pink-500 to-rose-600',
  'pink',
  '["Corporate Governance", "Legal Compliance", "POSH Implementation", "Risk Management", "Company Law", "Regulatory Advisory"]',
  '["English", "Hindi", "Punjabi"]',
  '[{"degree": "Company Secretary", "institution": "Institute of Company Secretaries of India", "year": "2012"}, {"degree": "LLB", "institution": "Delhi University", "year": "2010"}]',
  '["Certified POSH Trainer", "Corporate Governance Expert", "Risk Management Professional"]',
  '[{"name": "Corporate Law", "level": 95}, {"name": "POSH Compliance", "level": 98}, {"name": "Risk Management", "level": 90}, {"name": "Training & Development", "level": 92}]',
  '[{"id": 1, "client": "TechCorp Solutions", "feedback": "Exceptional expertise in POSH implementation. Made the entire process seamless.", "rating": 5, "date": "2024-01-15", "projectType": "POSH Implementation"}, {"id": 2, "client": "Global Manufacturing", "feedback": "Professional approach and deep knowledge of corporate compliance.", "rating": 5, "date": "2023-12-20", "projectType": "Compliance Audit"}, {"id": 3, "client": "StartupHub India", "feedback": "Outstanding legal guidance and support throughout our compliance journey.", "rating": 5, "date": "2023-11-10", "projectType": "Legal Advisory"}]',
  '[{"title": "POSH Policy Implementation", "client": "Tech Solutions Ltd", "duration": "3 months", "status": "Completed"}, {"title": "Corporate Governance Review", "client": "Manufacturing Corp", "duration": "2 months", "status": "In Progress"}]',
  '["Top 10 Corporate Lawyers in Delhi - 2023", "Excellence in POSH Implementation Award", "Best Legal Advisor - Startup Category"]'
),
(
  'CA Shweta Gupta',
  'Chartered Accountant & Financial Advisor',
  'Financial Compliance & Risk Management',
  'Specialized in financial compliance and risk assessment for workplace safety programs with expertise in audit management and strategic financial planning.',
  'CA Shweta Gupta brings comprehensive financial expertise to workplace safety and compliance programs. Her analytical approach to risk assessment and financial planning ensures organizations can implement effective POSH programs while maintaining fiscal responsibility.',
  '8+ years',
  'finance',
  'standard',
  true,
  false,
  'Available',
  'shweta.gupta@ureposh.com',
  '+91 98765 43211',
  'Mumbai, India',
  'www.shwetaguptaca.com',
  'linkedin.com/in/shwetaguptaca',
  4.8,
  134,
  112,
  96,
  '3 hours',
  '₹4,500',
  '₹1,20,000',
  '₹20,000',
  'Calculator',
  'from-rose-500 to-pink-600',
  'rose',
  '["Financial Compliance", "Risk Assessment", "Audit Management", "Strategic Planning", "Tax Advisory", "Financial Reporting"]',
  '["English", "Hindi", "Marathi"]',
  '[{"degree": "Chartered Accountant", "institution": "Institute of Chartered Accountants of India", "year": "2015"}, {"degree": "B.Com", "institution": "Mumbai University", "year": "2013"}]',
  '["Certified Risk Management Professional", "Financial Planning Expert", "Audit Specialist"]',
  '[{"name": "Financial Analysis", "level": 94}, {"name": "Risk Assessment", "level": 91}, {"name": "Audit Management", "level": 88}, {"name": "Compliance Reporting", "level": 93}]',
  '[{"id": 1, "client": "Financial Services Corp", "feedback": "Outstanding financial compliance expertise. Helped optimize our budget significantly.", "rating": 5, "date": "2024-01-10", "projectType": "Financial Audit"}, {"id": 2, "client": "Investment Group", "feedback": "Excellent risk assessment and strategic financial planning.", "rating": 5, "date": "2023-12-15", "projectType": "Risk Management"}]',
  '[{"title": "Financial Compliance Audit", "client": "Banking Solutions", "duration": "4 months", "status": "Completed"}, {"title": "Risk Assessment Framework", "client": "Insurance Corp", "duration": "2 months", "status": "In Progress"}]',
  '["Best CA in Financial Compliance - 2023", "Excellence in Risk Management Award", "Top Financial Advisor - Mumbai"]'
),
(
  'Adv. Shringarika Tyagi',
  'Legal Academic & Gender Justice Expert',
  'POSH Law & Policy Research',
  'UGC-NET qualified legal academic pursuing Ph.D. in Law, specializing in gender justice and POSH compliance with extensive research background.',
  'Adv. Shringarika Tyagi combines academic excellence with practical legal expertise in gender justice and POSH law. Her research-driven approach to policy development and implementation has helped shape modern workplace safety standards across various industries.',
  '12+ years',
  'legal',
  'premium',
  true,
  true,
  'Available',
  'shringarika.tyagi@ureposh.com',
  '+91 98765 43212',
  'Delhi, India',
  'www.shringarikatyagi.com',
  'linkedin.com/in/shringarikatyagi',
  4.9,
  203,
  178,
  99,
  '1 hour',
  '₹6,000',
  '₹1,80,000',
  '₹30,000',
  'GraduationCap',
  'from-fuchsia-500 to-purple-600',
  'fuchsia',
  '["POSH Law", "Gender Justice", "Policy Research", "Legal Education", "Academic Research", "Constitutional Law"]',
  '["English", "Hindi", "Sanskrit"]',
  '[{"degree": "Ph.D. in Law (Pursuing)", "institution": "Jawaharlal Nehru University", "year": "2024"}, {"degree": "LLM", "institution": "Delhi University", "year": "2012"}, {"degree": "LLB", "institution": "Delhi University", "year": "2010"}]',
  '["UGC-NET Qualified", "Gender Justice Expert", "POSH Law Specialist", "Constitutional Law Expert"]',
  '[{"name": "POSH Law", "level": 98}, {"name": "Gender Justice", "level": 96}, {"name": "Policy Research", "level": 94}, {"name": "Legal Training", "level": 95}]',
  '[{"id": 1, "client": "Government Think Tank", "feedback": "Exceptional research capabilities and deep understanding of gender justice issues.", "rating": 5, "date": "2024-01-20", "projectType": "Policy Research"}, {"id": 2, "client": "Legal Education Institute", "feedback": "Outstanding academic expertise and practical implementation knowledge.", "rating": 5, "date": "2023-12-25", "projectType": "Legal Training"}]',
  '[{"title": "POSH Policy Framework Development", "client": "Government Agency", "duration": "6 months", "status": "Completed"}, {"title": "Gender Justice Research Study", "client": "Academic Institution", "duration": "8 months", "status": "In Progress"}]',
  '["Best Research Paper on Gender Justice - 2023", "Excellence in Legal Education Award", "Top POSH Law Expert - India"]'
),
(
  'CA Sarvagya Goyal',
  'Chartered Accountant & Audit Specialist',
  'Compliance Auditing & Process Optimization',
  'Expert in compliance auditing and financial oversight for organizational safety programs with focus on process optimization and quality assurance.',
  'CA Sarvagya Goyal specializes in creating robust audit frameworks for workplace safety programs. His systematic approach to compliance auditing ensures organizations maintain the highest standards while optimizing operational efficiency.',
  '7+ years',
  'finance',
  'standard',
  true,
  false,
  'Available',
  'sarvagya.goyal@ureposh.com',
  '+91 98765 43213',
  'Bangalore, India',
  'www.sarvagyagoyal.com',
  'linkedin.com/in/sarvagyagoyal',
  4.7,
  98,
  89,
  94,
  '4 hours',
  '₹4,000',
  '₹1,00,000',
  '₹18,000',
  'Calculator',
  'from-pink-400 to-rose-500',
  'pink',
  '["Compliance Auditing", "Financial Oversight", "Process Optimization", "Quality Assurance", "Internal Controls", "Risk Assessment"]',
  '["English", "Hindi", "Kannada"]',
  '[{"degree": "Chartered Accountant", "institution": "Institute of Chartered Accountants of India", "year": "2016"}, {"degree": "B.Com", "institution": "Bangalore University", "year": "2014"}]',
  '["Certified Internal Auditor", "Process Optimization Expert", "Quality Assurance Specialist"]',
  '[{"name": "Audit Management", "level": 92}, {"name": "Compliance Review", "level": 89}, {"name": "Process Optimization", "level": 87}, {"name": "Quality Assurance", "level": 85}]',
  '[{"id": 1, "client": "Manufacturing Group", "feedback": "Excellent audit capabilities and attention to detail in compliance matters.", "rating": 5, "date": "2024-01-05", "projectType": "Compliance Audit"}]',
  '[{"title": "Internal Audit Framework", "client": "Tech Company", "duration": "3 months", "status": "Completed"}]',
  '["Best Auditor - Bangalore Chapter", "Excellence in Process Optimization"]'
),
(
  'Adv. Pradeep Kumar',
  'Legal Advisor & Litigation Expert',
  'Employment Law & Dispute Resolution',
  'Experienced in employment law and workplace dispute resolution with focus on harassment cases and legal counseling.',
  'Adv. Pradeep Kumar brings extensive litigation experience to workplace dispute resolution. His expertise in employment law and mediation has helped numerous organizations resolve complex harassment cases while maintaining workplace harmony.',
  '15+ years',
  'legal',
  'premium',
  true,
  false,
  'Busy',
  'pradeep.kumar@ureposh.com',
  '+91 98765 43214',
  'Chennai, India',
  'www.pradeepkumarlaw.com',
  'linkedin.com/in/pradeepkumarlaw',
  4.8,
  245,
  198,
  97,
  '6 hours',
  '₹7,000',
  '₹2,00,000',
  '₹35,000',
  'Scale',
  'from-rose-400 to-pink-500',
  'rose',
  '["Employment Law", "Dispute Resolution", "Litigation", "Legal Counseling", "Contract Law", "Labor Relations"]',
  '["English", "Hindi", "Tamil"]',
  '[{"degree": "LLM", "institution": "Madras University", "year": "2010"}, {"degree": "LLB", "institution": "Madras University", "year": "2008"}]',
  '["Employment Law Expert", "Certified Mediator", "Litigation Specialist"]',
  '[{"name": "Employment Law", "level": 96}, {"name": "Dispute Resolution", "level": 94}, {"name": "Litigation", "level": 93}, {"name": "Legal Counseling", "level": 91}]',
  '[{"id": 1, "client": "Corporate Legal Dept", "feedback": "Outstanding litigation skills and deep knowledge of employment law.", "rating": 5, "date": "2024-01-12", "projectType": "Employment Dispute"}]',
  '[{"title": "Employment Dispute Resolution", "client": "Large Corporation", "duration": "4 months", "status": "Completed"}]',
  '["Top Employment Lawyer - Chennai", "Excellence in Dispute Resolution"]'
),
(
  'Dr. Meera Sharma',
  'Organizational Psychologist & HR Consultant',
  'Workplace Psychology & Behavioral Training',
  'Specialized in workplace psychology, behavioral training, and creating psychologically safe work environments with expertise in trauma-informed approaches.',
  'Dr. Meera Sharma combines clinical psychology expertise with organizational development to create psychologically safe workplaces. Her trauma-informed approach to workplace training has transformed organizational cultures across various industries.',
  '9+ years',
  'psychology',
  'standard',
  true,
  false,
  'Available',
  'meera.sharma@ureposh.com',
  '+91 98765 43215',
  'Pune, India',
  'www.meerasharma.com',
  'linkedin.com/in/meerasharma',
  4.9,
  156,
  134,
  97,
  '3 hours',
  '₹5,500',
  '₹1,40,000',
  '₹28,000',
  'Brain',
  'from-pink-300 to-rose-400',
  'pink',
  '["Workplace Psychology", "Behavioral Training", "Trauma-Informed Care", "Employee Wellness", "Conflict Resolution", "Leadership Development"]',
  '["English", "Hindi", "Marathi"]',
  '[{"degree": "Ph.D. in Psychology", "institution": "Pune University", "year": "2015"}, {"degree": "M.A. Psychology", "institution": "Pune University", "year": "2012"}]',
  '["Licensed Clinical Psychologist", "Trauma-Informed Care Specialist", "Organizational Development Expert"]',
  '[{"name": "Workplace Psychology", "level": 96}, {"name": "Behavioral Training", "level": 94}, {"name": "Trauma-Informed Care", "level": 92}, {"name": "Employee Wellness", "level": 90}]',
  '[{"id": 1, "client": "Tech Startup", "feedback": "Exceptional understanding of workplace psychology and employee wellness.", "rating": 5, "date": "2024-01-08", "projectType": "Workplace Psychology"}]',
  '[{"title": "Employee Wellness Program", "client": "Software Company", "duration": "5 months", "status": "In Progress"}]',
  '["Best Organizational Psychologist - Pune", "Excellence in Employee Wellness"]'
);

-- Create a view for easier querying with computed fields
create or replace view people_view as
select 
  *,
  case 
    when rating >= 4.8 then 'excellent'
    when rating >= 4.5 then 'very_good'
    when rating >= 4.0 then 'good'
    else 'average'
  end as rating_category,
  case 
    when experience ~ '^(\d+)\+' then 
      cast(substring(experience from '^(\d+)') as integer)
    else 0
  end as experience_years,
  case 
    when featured = true then 'featured'
    when verified = true then 'verified'
    else 'standard'
  end as member_type
from people;

-- Create a function to search people by various criteria
create or replace function search_people(
  search_term text default null,
  category_filter text default null,
  status_filter text default null,
  availability_filter text default null,
  min_rating decimal default null,
  min_experience integer default null,
  expertise_filter text[] default null
)
returns table (
  id uuid,
  name text,
  title text,
  specialization text,
  description text,
  experience text,
  category text,
  status text,
  verified boolean,
  featured boolean,
  availability text,
  rating decimal,
  review_count integer,
  projects integer,
  completion_rate integer,
  response_time text,
  hourly_rate text,
  monthly_rate text,
  project_rate text,
  icon_name text,
  color_gradient text,
  accent_color text,
  image_url text,
  cover_image_url text,
  expertise jsonb,
  languages jsonb,
  education jsonb,
  certifications jsonb,
  skills jsonb,
  testimonials jsonb,
  recent_projects jsonb,
  achievements jsonb,
  created_at timestamptz,
  updated_at timestamptz
) as $$
begin
  return query
  select p.*
  from people p
  where 
    (search_term is null or 
     p.name ilike '%' || search_term || '%' or
     p.title ilike '%' || search_term || '%' or
     p.specialization ilike '%' || search_term || '%' or
     p.expertise::text ilike '%' || search_term || '%')
    and (category_filter is null or p.category = category_filter)
    and (status_filter is null or p.status = status_filter)
    and (availability_filter is null or p.availability = availability_filter)
    and (min_rating is null or p.rating >= min_rating)
    and (min_experience is null or 
         cast(substring(p.experience from '^(\d+)') as integer) >= min_experience)
    and (expertise_filter is null or 
         exists (
           select 1 
           from jsonb_array_elements_text(p.expertise) as exp
           where exp = any(expertise_filter)
         ))
  order by 
    p.featured desc,
    p.rating desc,
    p.review_count desc;
end;
$$ language plpgsql;
