/**
 * Auth0 Dynamic Route Handler
 * 
 * This handles Auth0 authentication routes including:
 * - /api/auth/login
 * - /api/auth/logout
 * - /api/auth/callback
 * 
 * The Auth0 SDK middleware automatically handles these routes.
 * After successful authentication, use the useBackendAuth hook
 * to sync with the backend server.
 * 
 * User profile is served at /api/auth/me
 */

import { auth0 } from '@/lib/auth0';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // The Auth0Client.middleware() method automatically handles all auth routes
  return await auth0.middleware(req);
}

export async function POST(req: NextRequest) {
  // Handle POST requests (e.g., logout with CSRF token)
  return await auth0.middleware(req);
}
