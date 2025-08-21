-- Complete People Table Setup
-- This script will create the table from scratch and handle all conflicts

-- Step 1: Drop the table if it exists (this will also drop all policies)
DROP TABLE IF EXISTS people CASCADE;

-- Step 2: Create the people table
CREATE TABLE people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Information
  name text NOT NULL,
  title text NOT NULL,
  specialization text NOT NULL,
  description text NOT NULL,
  detailed_description text,
  
  -- Professional Details
  experience text NOT NULL, -- e.g., "10+ years"
  category text NOT NULL, -- e.g., "legal", "finance", "psychology"
  status text NOT NULL DEFAULT 'standard', -- e.g., "standard", "premium"
  verified boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  availability text NOT NULL DEFAULT 'Available', -- e.g., "Available", "Busy"
  
  -- Contact Information
  email text NOT NULL,
  phone text,
  location text NOT NULL,
  website text,
  linkedin text,
  
  -- Performance Metrics
  rating decimal(3,2) DEFAULT 0.0,
  review_count integer DEFAULT 0,
  projects integer DEFAULT 0,
  completion_rate integer DEFAULT 0,
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
  expertise jsonb DEFAULT '[]'::jsonb, -- Array of expertise areas
  languages jsonb DEFAULT '[]'::jsonb, -- Array of spoken languages
  education jsonb DEFAULT '[]'::jsonb, -- Array of education objects
  certifications jsonb DEFAULT '[]'::jsonb, -- Array of certifications
  skills jsonb DEFAULT '[]'::jsonb, -- Array of skill objects with levels
  testimonials jsonb DEFAULT '[]'::jsonb, -- Array of testimonial objects
  recent_projects jsonb DEFAULT '[]'::jsonb, -- Array of project objects
  achievements jsonb DEFAULT '[]'::jsonb, -- Array of achievements
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Step 3: Create indexes for better performance
CREATE INDEX idx_people_category ON people(category);
CREATE INDEX idx_people_status ON people(status);
CREATE INDEX idx_people_verified ON people(verified);
CREATE INDEX idx_people_featured ON people(featured);
CREATE INDEX idx_people_availability ON people(availability);
CREATE INDEX idx_people_rating ON people(rating DESC);
CREATE INDEX idx_people_experience ON people(experience);
CREATE INDEX idx_people_name ON people(name);

-- Create GIN indexes for JSONB columns for efficient querying
CREATE INDEX idx_people_expertise_gin ON people USING gin(expertise);
CREATE INDEX idx_people_languages_gin ON people USING gin(languages);
CREATE INDEX idx_people_skills_gin ON people USING gin(skills);

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies
-- Allow public read access to all people
CREATE POLICY "Allow public read access to people" ON people
  FOR SELECT USING (true);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Allow authenticated users to insert people" ON people
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow admin users to update any profile
CREATE POLICY "Allow admin users to update people" ON people
  FOR UPDATE USING (auth.role() = 'service_role');

-- Allow admin users to delete any profile
CREATE POLICY "Allow admin users to delete people" ON people
  FOR DELETE USING (auth.role() = 'service_role');

-- Step 6: Insert sample data
INSERT INTO people (
  name, title, specialization, description, detailed_description,
  experience, category, status, verified, featured, availability,
  email, phone, location, website, linkedin,
  rating, review_count, projects, completion_rate, response_time,
  hourly_rate, monthly_rate, project_rate,
  icon_name, color_gradient, accent_color,
  expertise, languages, education, certifications, skills, testimonials, recent_projects, achievements
) VALUES 
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
  '[{"id": 1, "client": "TechCorp Solutions", "feedback": "Exceptional expertise in POSH implementation. Made the entire process seamless.", "rating": 5, "date": "2024-01-15", "projectType": "POSH Implementation"}]',
  '[{"title": "POSH Policy Implementation", "client": "Tech Solutions Ltd", "duration": "3 months", "status": "Completed"}]',
  '["Top 10 Corporate Lawyers in Delhi - 2023", "Excellence in POSH Implementation Award", "Best Legal Advisor - Startup Category"]'
),
(
  'CA Priya Sharma',
  'Chartered Accountant & Financial Advisor',
  'Financial Planning & Tax Advisory',
  'Experienced CA specializing in financial planning, tax optimization, and business advisory services.',
  'CA Priya Sharma brings over 8 years of expertise in financial planning and tax advisory. She has helped numerous businesses optimize their financial strategies and individuals plan their investments effectively.',
  '8+ years',
  'finance',
  'premium',
  true,
  false,
  'Available',
  'priya.sharma@ureposh.com',
  '+91 98765 43211',
  'Mumbai, India',
  'www.priyasharma.com',
  'linkedin.com/in/priyasharma',
  4.8,
  156,
  134,
  96,
  '4 hours',
  '₹4,500',
  '₹1,25,000',
  '₹20,000',
  'Calculator',
  'from-blue-500 to-cyan-600',
  'blue',
  '["Financial Planning", "Tax Advisory", "Business Advisory", "Investment Planning", "Audit & Compliance"]',
  '["English", "Hindi", "Marathi"]',
  '[{"degree": "Chartered Accountant", "institution": "Institute of Chartered Accountants of India", "year": "2016"}]',
  '["Certified Financial Planner", "Tax Consultant", "Business Advisor"]',
  '[{"name": "Financial Planning", "level": 92}, {"name": "Tax Advisory", "level": 95}, {"name": "Business Advisory", "level": 88}]',
  '[{"id": 2, "client": "StartupXYZ", "feedback": "Excellent financial guidance that helped us scale efficiently.", "rating": 5, "date": "2024-01-10", "projectType": "Financial Planning"}]',
  '[{"title": "Financial Restructuring", "client": "Tech Startup", "duration": "2 months", "status": "Completed"}]',
  '["Best Financial Advisor - 2023", "Excellence in Tax Planning Award"]'
);

-- Step 7: Verify the setup
SELECT 
  'Table created successfully' as status,
  COUNT(*) as total_records
FROM people;

-- Show the created policies
SELECT 
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'people';
