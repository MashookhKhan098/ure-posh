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

async function runMigration() {
  try {
    console.log('🚀 Starting writer status controls migration...')
    
    // Add writer status control fields
    console.log('📝 Adding status control fields to writer table...')
    
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE writer 
        ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
        ADD COLUMN IF NOT EXISTS status_updated_at timestamp with time zone DEFAULT now(),
        ADD COLUMN IF NOT EXISTS status_updated_by uuid REFERENCES auth.users(id);
      `
    })

    if (alterError) {
      console.error('❌ Error adding columns:', alterError)
      return
    }

    // Add index for better performance on status queries
    console.log('📊 Creating index for status queries...')
    
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_writer_is_active ON writer(is_active);
      `
    })

    if (indexError) {
      console.error('❌ Error creating index:', indexError)
      return
    }

    // Add comments for documentation
    console.log('📚 Adding column comments...')
    
    const { error: commentError } = await supabase.rpc('exec_sql', {
      sql: `
        COMMENT ON COLUMN writer.is_active IS 'Controls whether writer can access the system. False = paused by admin';
        COMMENT ON COLUMN writer.status_updated_at IS 'When the status was last changed';
        COMMENT ON COLUMN writer.status_updated_by IS 'Admin who last updated the status';
      `
    })

    if (commentError) {
      console.error('❌ Error adding comments:', commentError)
      return
    }

    console.log('✅ Migration completed successfully!')
    console.log('📋 Added fields:')
    console.log('   - is_active (boolean, default true)')
    console.log('   - status_updated_at (timestamp)')
    console.log('   - status_updated_by (uuid, references auth.users)')
    console.log('   - idx_writer_is_active (index)')
    
  } catch (error) {
    console.error('💥 Migration failed:', error)
  }
}

runMigration()
