const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const categories = [
  {
    name: 'Company Updates',
    slug: 'company-updates',
    color: '#3B82F6',
    description: 'Latest updates and news from companies'
  },
  {
    name: 'Compliance & Legal Insights',
    slug: 'compliance-legal-insights',
    color: '#10B981',
    description: 'Legal compliance and regulatory insights'
  },
  {
    name: 'News & Media Coverage',
    slug: 'news-media-coverage',
    color: '#F59E0B',
    description: 'Media coverage and news analysis'
  },
  {
    name: 'Newsletter Archive',
    slug: 'newsletter-archive',
    color: '#8B5CF6',
    description: 'Archived newsletters and communications'
  },
  {
    name: 'Thought Leadership',
    slug: 'thought-leadership',
    color: '#EF4444',
    description: 'Expert insights and thought leadership content'
  },
  {
    name: 'Workplace Stories',
    slug: 'workplace-stories',
    color: '#06B6D4',
    description: 'Stories and experiences from the workplace'
  },
  {
    name: 'Events & Webinars',
    slug: 'events-webinars',
    color: '#84CC16',
    description: 'Upcoming events and webinar information'
  },
  {
    name: 'International Regulatory & Policy Watch',
    slug: 'international-regulatory-policy-watch',
    color: '#F97316',
    description: 'International regulatory updates and policy monitoring'
  },
  {
    name: 'United Kingdom Workplace',
    slug: 'united-kingdom-workplace',
    color: '#EC4899',
    description: 'UK-specific workplace news and regulations'
  },
  {
    name: 'US Workplace',
    slug: 'us-workplace',
    color: '#6366F1',
    description: 'US-specific workplace news and regulations'
  }
]

async function setupCategories() {
  try {
    console.log('🚀 Setting up categories...')
    
    // First, check if categories table exists
    const { data: existingCategories, error: fetchError } = await supabase
      .from('categories')
      .select('*')
    
    if (fetchError) {
      console.error('❌ Error checking categories table:', fetchError)
      console.log('📝 Creating categories table...')
      
      // Create the categories table if it doesn't exist
      const { error: createTableError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS categories (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name VARCHAR NOT NULL,
            slug VARCHAR UNIQUE NOT NULL,
            color VARCHAR DEFAULT '#EC4899',
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      })
      
      if (createTableError) {
        console.error('❌ Error creating categories table:', createTableError)
        return
      }
    }
    
    // Insert categories
    console.log('📝 Inserting categories...')
    
    for (const category of categories) {
      const { data, error } = await supabase
        .from('categories')
        .upsert([category], { onConflict: 'slug' })
        .select()
      
      if (error) {
        console.error(`❌ Error inserting category ${category.name}:`, error)
      } else {
        console.log(`✅ Category "${category.name}" ${data.length > 0 ? 'updated' : 'created'}`)
      }
    }
    
    // Verify categories were created
    const { data: finalCategories, error: verifyError } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (verifyError) {
      console.error('❌ Error verifying categories:', verifyError)
    } else {
      console.log('✅ Categories setup completed!')
      console.log(`📊 Total categories: ${finalCategories.length}`)
      console.log('📋 Categories:')
      finalCategories.forEach(cat => {
        console.log(`   - ${cat.name} (${cat.slug})`)
      })
    }
    
  } catch (error) {
    console.error('💥 Setup failed:', error)
  }
}

setupCategories()
