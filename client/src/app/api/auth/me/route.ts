/**
 * Auth0 User Profile Endpoint
 * 
 * This endpoint returns the current user's session data
 * Required by the Auth0 useUser() hook
 */

import { auth0 } from '@/lib/auth0';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // Get the session from Auth0
        const session = await auth0.getSession(req);

        if (!session || !session.user) {
            // Return 204 No Content if not authenticated
            return new NextResponse(null, { status: 204 });
        }

        // Return the user data
        return NextResponse.json(session.user);
    } catch (error) {
        console.error('Error getting user session:', error);
        return new NextResponse(null, { status: 204 });
    }
}
