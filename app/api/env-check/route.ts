import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 
      `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...` : 
      'Missing',
    nodeEnv: process.env.NODE_ENV,
    hasCookies: typeof cookies !== 'undefined'
  }

  return NextResponse.json({
    environment: envVars,
    message: 'Environment variables check'
  })
}
