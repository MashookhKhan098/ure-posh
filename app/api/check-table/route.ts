import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
    
    // Test 1: Try to list all tables in public schema
    console.log('Testing 1: List all tables...')
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_tables')
    
    if (tablesError) {
      console.log('RPC get_tables failed, trying direct query...')
      // Try direct SQL query
      const { data: directTables, error: directError } = await supabase
        .from('pg_tables')
        .select('schemaname, tablename')
        .eq('schemaname', 'public')
      
      if (directError) {
        console.error('Direct query also failed:', directError)
        return NextResponse.json({
          status: 'error',
          message: 'Cannot access database schema',
          error: directError.message,
          code: directError.code
        }, { status: 500 })
      }
      
      console.log('Direct query successful, tables:', directTables)
    } else {
      console.log('RPC successful, tables:', tables)
    }
    
    // Test 2: Try to query people table directly
    console.log('Testing 2: Query people table...')
    const { data: people, error: peopleError } = await supabase
      .from('people')
      .select('id, name, title')
      .limit(1)
    
    if (peopleError) {
      console.error('People query failed:', peopleError)
      
      // Test 3: Try to check if table exists using different approach
      console.log('Testing 3: Check table existence...')
      const { data: tableCheck, error: checkError } = await supabase
        .rpc('check_table_exists', { table_name: 'people' })
      
      return NextResponse.json({
        status: 'error',
        message: 'People table query failed',
        peopleError: peopleError.message,
        peopleCode: peopleError.code,
        tableCheck: tableCheck,
        checkError: checkError?.message
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
      tables: tables || 'RPC not available'
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
