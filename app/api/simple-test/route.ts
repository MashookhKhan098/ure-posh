import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Simple Test API Route ===')
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    return NextResponse.json({
      status: 'success',
      message: 'Simple test passed',
      timestamp: new Date().toISOString(),
      environment: {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing'
      }
    })
    
  } catch (error) {
    console.error('Simple test error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Simple test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
