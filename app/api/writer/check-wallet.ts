import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { address } = await req.json();
  if (!address) {
    return NextResponse.json({ allowed: false }, { status: 400 });
  }
  // Simple check for demo purposes
  const allowed = address && address.length > 0;
  return NextResponse.json({ allowed });
} 