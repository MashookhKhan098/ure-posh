import { NextResponse } from 'next/server'
import { createClient } from '../../../utils/supabase/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('categories')
      .select('count')
      .limit(1)

    if (testError) {
      console.error('Database test error:', testError)
      return NextResponse.json({
        error: testError.message,
        details: testError,
        tables: 'Failed to query categories table'
      }, { status: 500 })
    }

    // Test articles table
    const { data: articlesData, error: articlesError } = await supabase
      .from('articles')
      .select('count')
      .limit(1)

    return NextResponse.json({
      success: true,
      categories: testData ? 'Working' : 'Failed',
      articles: articlesError ? articlesError.message : 'Working',
      message: 'Database connection successful'
    })

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json({
      error: 'Failed to test database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
