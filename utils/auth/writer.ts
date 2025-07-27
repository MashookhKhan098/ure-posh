import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface WriterAuthData {
  writer_id: string;
  username: string;
  email: string;
  role: string;
  exp?: number;
}

export function verifyWriterAuth(request: NextRequest): WriterAuthData | null {
  try {
    const token = request.cookies.get('writer_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '') ||
                  request.headers.get('x-writer-token');

    if (!token) {
      return null;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as WriterAuthData;
    
    // Check if token is expired
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Writer auth verification failed:', error);
    return null;
  }
}

export function getWriterIdFromHeaders(request: NextRequest): string | null {
  return request.headers.get('x-writer-id');
}

export function getWriterUsernameFromHeaders(request: NextRequest): string | null {
  return request.headers.get('x-writer-username');
}

export function getWriterRoleFromHeaders(request: NextRequest): string | null {
  return request.headers.get('x-writer-role');
} 