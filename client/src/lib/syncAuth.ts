/**
 * Utility to sync Auth0 user with backend server
 */

import { apiClient, OAuth2RegisterRequest } from './api';
import { TokenStorage } from './tokenStorage';

export interface Auth0User {
    sub: string;
    name: string;
    email: string;
    picture?: string;
    email_verified?: boolean;
    nickname?: string;
}

/**
 * Sync Auth0 authenticated user with backend
 * This should be called after successful Auth0 login on the client side
 */
export async function syncWithBackend(user: Auth0User): Promise<boolean> {
    try {
        // Determine provider from the Auth0 sub
        let provider: 'auth0' | 'google' | 'github' = 'auth0';
        if (user.sub?.startsWith('google-oauth2|')) {
            provider = 'google';
        } else if (user.sub?.startsWith('github|')) {
            provider = 'github';
        }

        // Prepare OAuth registration data for backend
        const oauthData: OAuth2RegisterRequest = {
            email: user.email,
            fullName: user.name || user.email,
            provider: provider,
            providerId: user.sub,
            profilePicture: user.picture,
            githubUsername: provider === 'github' ? user.nickname : undefined,
            emailVerified: user.email_verified || false,
        };

        // Send to backend to get JWT tokens
        const response = await apiClient.registerWithOAuth(oauthData);

        if (response.success && response.data) {
            // Store backend JWT tokens
            TokenStorage.setTokens({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                userId: response.data.userId,
                email: response.data.email,
                fullName: response.data.fullName,
            });

            console.log('Successfully synced with backend');
            return true;
        }

        return false;
    } catch (error) {
        console.error('Failed to sync with backend:', error);
        return false;
    }
}

/**
 * Check if user needs to sync with backend
 */
export function needsBackendSync(): boolean {
    return !TokenStorage.isAuthenticated();
}
