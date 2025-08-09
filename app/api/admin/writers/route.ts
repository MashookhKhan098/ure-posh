import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();

    const { data: writerProfiles, error } = await supabase
      .from('writer_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching writer_profiles:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({
      users: [],
      writerProfiles: writerProfiles || [],
    });
  } catch (error) {
    console.error('Writers API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { 
      name, 
      email, 
      password, 
      username,
      fullName,
      specialization,
      experienceLevel,
      role = 'writer' 
    } = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Username fallback and normalization
    const normalizedUsername = (username && String(username).trim()) || String(name).toLowerCase().replace(/[^a-z0-9_]/g, '_');

    // Password minimum length
    if (String(password).length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Ensure unique username/email
    const [{ data: existingByUsername }, { data: existingByEmail }] = await Promise.all([
      supabase.from('writer_profiles').select('writer_id').eq('username', normalizedUsername).maybeSingle(),
      supabase.from('writer_profiles').select('writer_id').eq('email', email.toLowerCase()).maybeSingle(),
    ]);

    if (existingByUsername) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }
    if (existingByEmail) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert writer profile
    const insertPayload: any = {
      username: normalizedUsername,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      full_name: fullName || name,
      expertise: specialization || 'General',
      experience_level: experienceLevel || 'Beginner',
      is_active: true,
      is_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: createdProfile, error: insertError } = await supabase
      .from('writer_profiles')
      .insert(insertPayload)
      .select('*')
      .single();

    if (insertError) {
      console.error('Insert writer_profile error:', insertError);
      return NextResponse.json({ error: 'Failed to create writer' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      writerProfile: createdProfile,
      message: 'Writer profile created successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('Create writer API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 