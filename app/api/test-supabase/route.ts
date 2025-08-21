import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Test Supabase API Route ===')
    
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
    
    // Create regular Supabase client (not SSR)
    console.log('Creating regular Supabase client...')
    const supabase = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client created successfully')
    
    // Test basic query
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
      message: 'Supabase connection successful',
      data: data,
      count: data?.length || 0
    })
    
  } catch (error) {
    console.error('Test Supabase error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
