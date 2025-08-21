import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Test Query API Route ===')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing environment variables'
      }, { status: 500 })
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test 1: Try to list all tables
    console.log('Testing table list...')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (tablesError) {
      console.error('Tables query error:', tablesError)
      return NextResponse.json({
        status: 'error',
        message: 'Cannot access information_schema',
        error: tablesError.message,
        code: tablesError.code
      }, { status: 500 })
    }
    
    console.log('Available tables:', tables)
    
    // Test 2: Try to query people table
    console.log('Testing people table query...')
    const { data: people, error: peopleError } = await supabase
      .from('people')
      .select('id, name')
      .limit(1)
    
    if (peopleError) {
      console.error('People query error:', peopleError)
      return NextResponse.json({
        status: 'error',
        message: 'People table query failed',
        error: peopleError.message,
        code: peopleError.code,
        details: peopleError.details,
        hint: peopleError.hint,
        availableTables: tables?.map(t => t.table_name) || []
      }, { status: 500 })
    }
    
    console.log('People query successful:', people)
    
    return NextResponse.json({
      status: 'success',
      message: 'All queries successful',
      people: people,
      availableTables: tables?.map(t => t.table_name) || []
    })
    
  } catch (error) {
    console.error('Test query error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Query test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
