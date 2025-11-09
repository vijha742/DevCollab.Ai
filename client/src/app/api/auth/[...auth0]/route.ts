/**
 * Auth0 Dynamic Route Handler
 * 
 * This handles Auth0 authentication routes including:
 * - /api/auth/login
 * - /api/auth/logout  
 * - /api/auth/callback
 */

import { auth0 } from '@/lib/auth0';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // Let Auth0 handle all routes normally
  return await auth0.middleware(req);
}

export async function POST(req: NextRequest) {
  // Handle POST requests (e.g., logout with CSRF token)
  return await auth0.middleware(req);
}
