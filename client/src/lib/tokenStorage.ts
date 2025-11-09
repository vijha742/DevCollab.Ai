/**
 * Utility for managing authentication tokens in the browser
 */

export interface TokenData {
    accessToken: string;
    refreshToken: string;
    userId: number;
    email: string;
    fullName: string;
}

export class TokenStorage {
    private static ACCESS_TOKEN_KEY = 'access_token';
    private static REFRESH_TOKEN_KEY = 'refresh_token';
    private static USER_DATA_KEY = 'user_data';

    /**
     * Check if code is running in browser
     */
    private static isBrowser(): boolean {
        return typeof window !== 'undefined';
    }

    /**
     * Store authentication tokens and user data
     */
    static setTokens(data: TokenData): void {
        if (!this.isBrowser()) return;

        localStorage.setItem(this.ACCESS_TOKEN_KEY, data.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, data.refreshToken);
        localStorage.setItem(this.USER_DATA_KEY, JSON.stringify({
            userId: data.userId,
            email: data.email,
            fullName: data.fullName,
        }));
    }

    /**
     * Get access token
     */
    static getAccessToken(): string | null {
        if (!this.isBrowser()) return null;
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    /**
     * Get refresh token
     */
    static getRefreshToken(): string | null {
        if (!this.isBrowser()) return null;
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    /**
     * Get stored user data
     */
    static getUserData(): { userId: number; email: string; fullName: string } | null {
        if (!this.isBrowser()) return null;

        const data = localStorage.getItem(this.USER_DATA_KEY);
        if (!data) return null;

        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Failed to parse user data:', error);
            return null;
        }
    }

    /**
     * Check if user is authenticated
     */
    static isAuthenticated(): boolean {
        return this.getAccessToken() !== null;
    }

    /**
     * Clear all authentication data
     */
    static clearTokens(): void {
        if (!this.isBrowser()) return;

        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_DATA_KEY);
    }

    /**
     * Update access token (used after refresh)
     */
    static updateAccessToken(accessToken: string): void {
        if (!this.isBrowser()) return;
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    }
}
