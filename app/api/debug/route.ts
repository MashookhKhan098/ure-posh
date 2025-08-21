import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Debug API Route ===')
    
    // Step 1: Check environment variables
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
    
    // Step 2: Create Supabase client
    console.log('Creating Supabase client...')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    console.log('Supabase client created successfully')
    
    // Step 3: Test basic query
    console.log('Testing basic query...')
    const { data, error } = await supabase
      .from('people')
      .select('id, name')
      .limit(1)
    
    if (error) {
      console.error('Supabase query error:', error)
      return NextResponse.json({
        status: 'error',
        message: 'Supabase query failed',
        error: error.message,
        code: error.code
      }, { status: 500 })
    }
    
    console.log('Query successful, data:', data)
    
    return NextResponse.json({
      status: 'success',
      message: 'All tests passed',
      data: data,
      environment: {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey
      }
    })
    
  } catch (error) {
    console.error('Debug API error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
