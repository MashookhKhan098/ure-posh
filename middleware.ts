import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect writer dashboard routes
  if (pathname.startsWith('/writer/dashboard')) {
    const token = request.cookies.get('writer_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/writer/login', request.url));
    }

    try {
      await jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch (error) {
      // Invalid or expired token, redirect to login
      const response = NextResponse.redirect(new URL('/writer/login', request.url));
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

  // Protect admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch (error) {
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

  // If already authenticated, prevent accessing admin login
  if (pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      try {
        await jwtVerify(token, secretKey)
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (e) {
        // fallthrough to show login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/writer/dashboard/:path*',
    '/admin/:path*'
  ],
}; 