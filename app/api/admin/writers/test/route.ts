import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Writers API is working',
    timestamp: new Date().toISOString(),
    writers: [
      {
        id: 'test-1',
        name: 'Test Writer 1',
        username: 'test1',
        status: 'Active',
        joinDate: '2025-08-21',
        postsCount: 5
      },
      {
        id: 'test-2', 
        name: 'Test Writer 2',
        username: 'test2',
        status: 'Active',
        joinDate: '2025-08-20',
        postsCount: 3
      }
    ]
  })
}
