import { NextRequest, NextResponse } from 'next/server';
import { isAdminWallet } from '../../../../utils/walletAuth';

export async function POST(req: NextRequest) {
  const { address } = await req.json();
  if (!address) {
    return NextResponse.json({ allowed: false }, { status: 400 });
  }
  const allowed = isAdminWallet(address);
  return NextResponse.json({ allowed });
} 