import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const secretKey = new TextEncoder().encode(JWT_SECRET);

async function verifyJwt(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secretKey);
  return payload;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // Redirect to admin login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify JWT token (Edge-compatible)
      const decoded = await verifyJwt(token);
      
      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        // Token expired, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.set('admin_token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 0,
          path: '/'
        });
        return response;
      }

      // Add admin info to headers for API routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-admin-id', String(decoded.userId || ''));
      requestHeaders.set('x-admin-username', String(decoded.username || ''));
      requestHeaders.set('x-admin-role', String(decoded.role || ''));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      console.error('Admin token verification failed:', error);
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.set('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      });
      return response;
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin') && !pathname.includes('/login')) {
    const token = request.cookies.get('admin_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      // Verify JWT token (Edge-compatible)
      const decoded = await verifyJwt(token);
      
      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }

      // Add admin info to headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-admin-id', String(decoded.userId || ''));
      requestHeaders.set('x-admin-username', String(decoded.username || ''));
      requestHeaders.set('x-admin-role', String(decoded.role || ''));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      console.error('Admin API token verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  // Protect writer routes
  if (pathname.startsWith('/writer') && pathname !== '/writer') {
    const token = request.cookies.get('writer_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // Redirect to writer login page
      return NextResponse.redirect(new URL('/writer', request.url));
    }

    try {
      // Verify JWT token (Edge-compatible)
      const decoded = await verifyJwt(token);
      
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
      requestHeaders.set('x-writer-id', String(decoded.writer_id || ''));
      requestHeaders.set('x-writer-username', String(decoded.username || ''));
      requestHeaders.set('x-writer-role', String(decoded.role || ''));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      console.error('Writer token verification failed:', error);
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
      // Verify JWT token (Edge-compatible)
      const decoded = await verifyJwt(token);
      
      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }

      // Add writer info to headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-writer-id', String(decoded.writer_id || ''));
      requestHeaders.set('x-writer-username', String(decoded.username || ''));
      requestHeaders.set('x-writer-role', String(decoded.role || ''));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      console.error('Writer API token verification failed:', error);
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
    '/admin/:path*',
    '/api/admin/:path*',
    '/writer/:path*',
    '/api/writer/:path*'
  ],
}; 