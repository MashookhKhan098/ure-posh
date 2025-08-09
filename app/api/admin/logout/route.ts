import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value || 
                  req.headers.get('authorization')?.replace('Bearer ', '');

    // Clear the admin session cookie
    const response = NextResponse.json({ 
      success: true, 
      message: 'Logout successful' 
    });

    // Clear cookie
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
