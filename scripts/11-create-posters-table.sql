-- Create posters table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.posters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posters_category ON public.posters(category);
CREATE INDEX IF NOT EXISTS idx_posters_status ON public.posters(status);
CREATE INDEX IF NOT EXISTS idx_posters_featured ON public.posters(featured);
CREATE INDEX IF NOT EXISTS idx_posters_created_at ON public.posters(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.posters ENABLE ROW LEVEL SECURITY;

-- Allow all users to read posters
CREATE POLICY IF NOT EXISTS "Allow read access to posters" ON public.posters
    FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete posters (admin functionality)
CREATE POLICY IF NOT EXISTS "Allow insert access to posters" ON public.posters
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Allow update access to posters" ON public.posters
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Allow delete access to posters" ON public.posters
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_posters_updated_at ON public.posters;
CREATE TRIGGER update_posters_updated_at
    BEFORE UPDATE ON public.posters
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data if table is empty
INSERT INTO public.posters (title, description, image_url, category, tags, price, featured) 
SELECT 
    'POSH Policy Template',
    'Comprehensive POSH policy template for workplace safety',
    '/placeholder-poster.jpg',
    'policy',
    ARRAY['posh', 'policy', 'workplace'],
    99.99,
    true
WHERE NOT EXISTS (SELECT 1 FROM public.posters LIMIT 1);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.posters TO authenticated;
GRANT SELECT ON public.posters TO anon;
