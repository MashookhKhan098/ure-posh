import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect writer routes
  if (pathname.startsWith('/writer') && pathname !== '/writer') {
    const token = request.cookies.get('writer_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // Redirect to writer login page
      return NextResponse.redirect(new URL('/writer', request.url));
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        // Token expired, redirect to login
        const response = NextResponse.redirect(new URL('/writer', request.url));
        response.cookies.set('writer_token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 0,
          path: '/'
        });
        return response;
      }

      // Add writer info to headers for API routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-writer-id', decoded.writer_id);
      requestHeaders.set('x-writer-username', decoded.username);
      requestHeaders.set('x-writer-role', decoded.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      console.error('Token verification failed:', error);
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/writer', request.url));
      response.cookies.set('writer_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      });
      return response;
    }
  }

  // Protect writer API routes (but allow /users endpoint for login page and posts for testing)
  if (pathname.startsWith('/api/writer') && !pathname.includes('/auth') && !pathname.includes('/users') && !pathname.includes('/posts')) {
    const token = request.cookies.get('writer_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }

      // Add writer info to headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-writer-id', decoded.writer_id);
      requestHeaders.set('x-writer-username', decoded.username);
      requestHeaders.set('x-writer-role', decoded.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      console.error('API token verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/writer/:path*',
    '/api/writer/:path*'
  ],
}; 