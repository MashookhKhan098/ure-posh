const { createClient } = require('@supabase/supabase-js')

// Load environment variables manually
const supabaseUrl = 'https://vewlslufctaslcpobnev.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZld2xzbHVmY3Rhc2xjcG9ibmV2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTM1NDA3MSwiZXhwIjoyMDcwOTMwMDcxfQ.NunspL2fv0L9GtEH-dbFi2WgCX8nZxC2kAllMGeP-Z0'

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
})

async function createPostersTable() {
  try {
    console.log('Creating posters table...')
    
    // Create table using raw SQL
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    })
    
    if (createError) {
      console.error('Error creating table:', createError)
    } else {
      console.log('✅ Posters table created successfully')
    }
    
    // Test the table by trying to select from it
    const { data, error: testError } = await supabase
      .from('posters')
      .select('*')
      .limit(1)
    
    if (testError) {
      console.error('Error testing table:', testError)
      
      // If table doesn't exist, let's try direct SQL execution
      console.log('Trying direct SQL approach...')
      
      const { data: directData, error: directError } = await supabase
        .rpc('exec_sql', {
          sql: `
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
          `
        })
      
      if (directError) {
        console.error('Direct SQL also failed:', directError)
      } else {
        console.log('✅ Table created with direct SQL')
      }
      
    } else {
      console.log('✅ Table test successful')
      console.log('Sample data:', data)
    }
    
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

createPostersTable()
