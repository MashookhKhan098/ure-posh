import { NextRequest, NextResponse } from 'next/server';
import { createWriterAdminClient } from '@/utils/supabase/writer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mark this route as dynamic since it uses request headers
export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { 
          error: 'Username and password are required',
          details: 'Please provide both username and password to login'
        },
        { status: 400 }
      );
    }

    const supabase = createWriterAdminClient();

    // Find writer by username or email
    const { data: writer, error } = await supabase
      .from('writer_profiles')
      .select('*')
      .or(`username.eq.${username},email.eq.${username}`)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Database error during login:', error);
      return NextResponse.json(
        { 
          error: 'Database connection error',
          details: 'Unable to verify credentials. Please try again later.'
        },
        { status: 500 }
      );
    }

    if (!writer) {
      console.log('Writer not found:', username);
      return NextResponse.json(
        { 
          error: 'Account not found',
          details: 'No writer account found with this username or email. Please check your credentials or contact your administrator.'
        },
        { status: 401 }
      );
    }

    if (!writer.is_active) {
      console.log('Inactive writer account:', username);
      return NextResponse.json(
        { 
          error: 'Account deactivated',
          details: 'This writer account has been deactivated. Please contact your administrator for assistance.'
        },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, writer.password_hash);
    if (!isValidPassword) {
      console.log('Invalid password for writer:', username);
      return NextResponse.json(
        { 
          error: 'Invalid password',
          details: 'The password you entered is incorrect. Please check your password and try again.'
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const tokenPayload = {
      writer_id: writer.writer_id,
      username: writer.username,
      email: writer.email,
      role: 'writer',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET);

    // Generate session token for database tracking
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours

    // Store session in database
    const { error: sessionError } = await supabase
      .from('writer_sessions')
      .insert({
        writer_id: writer.writer_id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown'
      });

    if (sessionError) {
      console.error('Session creation error:', sessionError);
      // Don't fail the login if session creation fails, just log it
    }

    // Update last login
    await supabase
      .from('writer_profiles')
      .update({ 
        last_login: new Date().toISOString(),
        login_count: (writer.login_count || 0) + 1
      })
      .eq('writer_id', writer.writer_id);

    // Return writer data (without sensitive information)
    const { password_hash, ...writerData } = writer;

    // Set HTTP-only cookie for additional security
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token: token,
      writer: writerData
    });

    // Set secure cookie
    response.cookies.set('writer_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Writer login error:', error);
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { 
          error: 'Invalid request format',
          details: 'Please ensure you are sending valid JSON data'
        },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message?.includes('Missing Supabase')) {
      return NextResponse.json(
        { 
          error: 'Configuration error',
          details: 'Database connection not configured. Please contact your administrator.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('writer_token')?.value || 
                  req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 400 }
      );
    }

    const supabase = createWriterAdminClient();

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // Remove session from database
      await supabase
        .from('writer_sessions')
        .delete()
        .eq('writer_id', decoded.writer_id);

    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    });

    // Clear cookie
    response.cookies.set('writer_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Writer logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 