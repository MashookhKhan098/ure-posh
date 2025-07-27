import { createClient } from '@supabase/supabase-js'

// Writer database configuration - use main Supabase database
const writerSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const writerSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const writerSupabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if environment variables are properly configured
const isConfigured = writerSupabaseUrl && writerSupabaseAnonKey && writerSupabaseServiceKey

if (!isConfigured) {
  console.warn('⚠️  Supabase environment variables are missing. Please set up your .env.local file with:')
  console.warn('   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co')
  console.warn('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
  console.warn('   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key')
  console.warn('   Get these from: https://supabase.com → Settings → API')
}

// Writer client for client-side operations
export const createWriterClient = () => {
  if (!writerSupabaseUrl || !writerSupabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. Get these from https://supabase.com → Settings → API')
  }
  
  return createClient(writerSupabaseUrl, writerSupabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

// Writer admin client for server-side operations
export const createWriterAdminClient = () => {
  if (!writerSupabaseUrl || !writerSupabaseServiceKey) {
    throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. Get these from https://supabase.com → Settings → API')
  }
  
  return createClient(writerSupabaseUrl, writerSupabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Writer server client for server-side operations with user context
export const createWriterServerClient = () => {
  if (!writerSupabaseUrl || !writerSupabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. Get these from https://supabase.com → Settings → API')
  }
  
  return createClient(writerSupabaseUrl, writerSupabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
} 