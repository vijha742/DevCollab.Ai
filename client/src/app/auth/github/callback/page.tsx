'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';

export default function GitHubCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const handleCallback = async () => {
            // Check for errors from GitHub
            const error = searchParams.get('error');
            const errorDescription = searchParams.get('error_description');

            if (error) {
                setStatus('error');
                setErrorMessage(errorDescription || 'GitHub authentication was denied or failed');
                setTimeout(() => {
                    router.push('/auth/login?error=github_auth_failed');
                }, 3000);
                return;
            }

            // Get the authorization code
            const code = searchParams.get('code');

            if (!code) {
                setStatus('error');
                setErrorMessage('No authorization code received from GitHub');
                setTimeout(() => {
                    router.push('/auth/login?error=no_code');
                }, 3000);
                return;
            }

            try {
                // Exchange code for tokens and authenticate with backend
                await authService.loginWithGitHub(code);

                setStatus('success');

                // Check if user needs to complete onboarding
                const redirectPath = authService.needsOnboarding() ? '/onboarding' : '/dashboard';

                // Redirect after brief success message
                setTimeout(() => {
                    router.push(redirectPath);
                }, 1500);
            } catch (err: any) {
                console.error('GitHub authentication error:', err);
                setStatus('error');
                setErrorMessage(err.message || 'Failed to authenticate with GitHub');

                setTimeout(() => {
                    router.push('/auth/login?error=auth_failed');
                }, 3000);
            }
        };

        handleCallback();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                {status === 'loading' && (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Authenticating with GitHub...</h2>
                        <p className="text-gray-600">Please wait while we complete your sign-in</p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-4">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-green-100 p-4">
                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
                        <p className="text-gray-600">You've been authenticated with GitHub</p>
                        <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-red-100 p-4">
                                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Authentication Failed</h2>
                        <p className="text-gray-600">{errorMessage}</p>
                        <p className="text-sm text-gray-500">Redirecting back to login...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
