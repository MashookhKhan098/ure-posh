import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Check Table API Route ===')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing environment variables'
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    
    // Test 1: Try to check known tables instead of system queries
    console.log('Testing 1: Check known tables...')
    const knownTables = ['people', 'articles', 'writers', 'posters']
    const tableStatus: any = {}
    
    for (const tableName of knownTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          tableStatus[tableName] = { exists: false, error: error.message, code: error.code }
        } else {
          tableStatus[tableName] = { exists: true, count: data }
        }
      } catch (err) {
        tableStatus[tableName] = { exists: false, error: 'Query failed' }
      }
    }
    
    // Test 2: Try to query people table directly
    console.log('Testing 2: Query people table...')
    const { data: people, error: peopleError } = await supabase
      .from('people')
      .select('id, name, title')
      .limit(1)
    
    if (peopleError) {
      console.error('People query failed:', peopleError)
      
      return NextResponse.json({
        status: 'error',
        message: 'People table query failed',
        peopleError: peopleError.message,
        peopleCode: peopleError.code,
        tableStatus: tableStatus
      }, { status: 500 })
    }
    
    console.log('People query successful:', people)
    
    // Test 4: Get table count
    console.log('Testing 4: Get table count...')
    const { count, error: countError } = await supabase
      .from('people')
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      console.error('Count query failed:', countError)
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Table check completed',
      people: people,
      count: count,
      tableStatus: tableStatus
    })
    
  } catch (error) {
    console.error('Check table error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Check table failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
