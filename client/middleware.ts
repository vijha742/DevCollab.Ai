import { NextRequest, NextResponse } from 'next/server';

// Simple middleware for now - let pages handle their own auth checks
export default function middleware(req: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ['/onboarding/:path*', '/dashboard/:path*', '/Team/:path*']
};