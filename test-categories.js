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

async function testCategories() {
  try {
    console.log('🔍 Testing categories...')
    
    // Test direct database access
    console.log('📊 Fetching categories from database...')
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('❌ Database error:', error)
      return
    }
    
    console.log(`✅ Found ${categories.length} categories in database:`)
    categories.forEach(cat => {
      console.log(`   - ${cat.name} (ID: ${cat.id}, Slug: ${cat.slug})`)
    })
    
    // Test API endpoint
    console.log('\n🌐 Testing categories API endpoint...')
    try {
      const response = await fetch('http://localhost:3000/api/categories')
      if (response.ok) {
        const apiData = await response.json()
        console.log('✅ API endpoint working:', apiData)
      } else {
        console.error('❌ API endpoint error:', response.status, response.statusText)
      }
    } catch (apiError) {
      console.error('❌ API request failed:', apiError.message)
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error)
  }
}

testCategories()
