import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

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
    
    // Test 1: Try to query known tables instead of system tables
    console.log('Testing table list...')
    
    const knownTables = ['people', 'articles', 'writers', 'posters']
    const tableStatus: any = {}
    
    for (const tableName of knownTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          tableStatus[tableName] = { exists: false, error: error.message }
        } else {
          tableStatus[tableName] = { exists: true, count: data }
        }
      } catch (err) {
        tableStatus[tableName] = { exists: false, error: 'Query failed' }
      }
    }
    
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
        tableStatus: tableStatus
      }, { status: 500 })
    }
    
    console.log('People query successful:', people)
    
    return NextResponse.json({
      status: 'success',
      message: 'All queries successful',
      people: people,
      tableStatus: tableStatus
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
