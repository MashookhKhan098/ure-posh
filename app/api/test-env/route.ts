import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Test Environment Variables ===')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasAnonKey: !!anonKey,
      hasServiceRoleKey: !!serviceRoleKey,
      url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
      anonKeyLength: anonKey ? anonKey.length : 0,
      serviceRoleKeyLength: serviceRoleKey ? serviceRoleKey.length : 0
    })
    
    return NextResponse.json({
      status: 'success',
      message: 'Environment variables check',
      environment: {
        hasUrl: !!supabaseUrl,
        hasAnonKey: !!anonKey,
        hasServiceRoleKey: !!serviceRoleKey,
        url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
        anonKeyLength: anonKey ? anonKey.length : 0,
        serviceRoleKeyLength: serviceRoleKey ? serviceRoleKey.length : 0
      }
    })
    
  } catch (error) {
    console.error('Test env error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Environment test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
