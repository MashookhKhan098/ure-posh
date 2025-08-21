import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Test Connection API Route ===')
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing'
    })
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing environment variables',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey
      }, { status: 500 })
    }
    
    // Just create the client without any queries
    console.log('Creating Supabase client...')
    const supabase = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client created successfully')
    
    // Test if we can access the client
    console.log('Testing client access...')
    const clientInfo = {
      supabaseUrl: supabase.supabaseUrl,
      hasAuth: !!supabase.auth,
      hasFrom: !!supabase.from
    }
    
    console.log('Client info:', clientInfo)
    
    return NextResponse.json({
      status: 'success',
      message: 'Supabase client created successfully',
      clientInfo: clientInfo,
      environment: {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing'
      }
    })
    
  } catch (error) {
    console.error('Test connection error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
