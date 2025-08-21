import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    // Test basic connection
    const { data, error } = await supabase
      .from('people')
      .select('count')
      .limit(1)
    
    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: error.message,
        details: 'The people table might not exist yet'
      }, { status: 500 })
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      tableExists: true,
      data: data
    })
    
  } catch (error) {
    console.error('Test DB error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
