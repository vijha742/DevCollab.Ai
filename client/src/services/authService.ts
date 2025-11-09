/**
 * Authentication service for handling email-password and GitHub OAuth login
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    fullName: string;
    experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
}

export interface GitHubUser {
    login: string;
    id: number;
    email?: string | null;
    avatar_url?: string;
    name?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: number;
    email: string;
    fullName: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

class AuthService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    /**
     * Register with email and password
     */
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await fetch(`${this.baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Registration failed' }));
            throw new Error(error.message || 'Registration failed');
        }

        const result: ApiResponse<AuthResponse> = await response.json();
        this.saveTokens(result.data);
        return result.data;
    }

    /**
     * Login with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${this.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Login failed' }));
            throw new Error(error.message || 'Invalid credentials');
        }

        const result: ApiResponse<AuthResponse> = await response.json();
        this.saveTokens(result.data);
        return result.data;
    }

    /**
     * Login with GitHub OAuth
     * This handles the complete GitHub OAuth flow with email fallback
     */
    async loginWithGitHub(code: string): Promise<AuthResponse> {
        try {
            // Step 1: Exchange code for GitHub access token via our backend
            const tokenResponse = await fetch(`${this.baseUrl}/auth/github/exchange`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!tokenResponse.ok) {
                throw new Error('Failed to exchange GitHub code');
            }

            const tokenResult: ApiResponse<string> = await tokenResponse.json();
            const githubAccessToken = tokenResult.data;

            // Step 2: Get user info from GitHub
            const userResponse = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `Bearer ${githubAccessToken}`,
                    'Accept': 'application/json',
                },
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch GitHub user info');
            }

            const githubUser: GitHubUser = await userResponse.json();
            let email = githubUser.email;

            // Step 3: If email is not public, try to get it from GitHub emails endpoint
            if (!email) {
                try {
                    const emailsResponse = await fetch('https://api.github.com/user/emails', {
                        headers: {
                            'Authorization': `Bearer ${githubAccessToken}`,
                            'Accept': 'application/json',
                        },
                    });

                    if (emailsResponse.ok) {
                        const emails: Array<{ email: string; primary: boolean; verified: boolean }> =
                            await emailsResponse.json();

                        // Find primary verified email, or first verified email, or just first email
                        const primaryEmail = emails.find(e => e.primary && e.verified);
                        const verifiedEmail = emails.find(e => e.verified);
                        const firstEmail = emails[0];

                        email = primaryEmail?.email || verifiedEmail?.email || firstEmail?.email;
                    }
                } catch (error) {
                    console.warn('Could not fetch GitHub emails:', error);
                    // Email will remain undefined - backend will generate placeholder
                }
            }

            // Step 4: Register/Login with our backend
            const authResponse = await fetch(`${this.baseUrl}/auth/oauth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email || undefined,
                    fullName: githubUser.name || githubUser.login,
                    provider: 'github',
                    providerId: githubUser.id.toString(),
                    profilePicture: githubUser.avatar_url,
                    username: githubUser.login,
                    githubUsername: githubUser.login,
                    emailVerified: !!email,
                }),
            });

            if (!authResponse.ok) {
                const error = await authResponse.json().catch(() => ({ message: 'Authentication failed' }));
                throw new Error(error.message || 'Failed to authenticate with backend');
            }

            const result: ApiResponse<AuthResponse> = await authResponse.json();
            this.saveTokens(result.data);
            return result.data;
        } catch (error) {
            console.error('GitHub login error:', error);
            throw error instanceof Error ? error : new Error('Failed to login with GitHub');
        }
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        const userId = this.getUserId();
        if (userId) {
            try {
                await fetch(`${this.baseUrl}/auth/logout?userId=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.getAccessToken()}`,
                    },
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }

        this.clearTokens();
    }

    /**
     * Refresh access token
     */
    async refreshAccessToken(): Promise<AuthResponse> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${this.baseUrl}/auth/refresh?refreshToken=${refreshToken}`, {
            method: 'POST',
        });

        if (!response.ok) {
            this.clearTokens();
            throw new Error('Failed to refresh token');
        }

        const result: ApiResponse<AuthResponse> = await response.json();
        this.saveTokens(result.data);
        return result.data;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }

    /**
     * Get access token
     */
    getAccessToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('access_token');
    }

    /**
     * Get refresh token
     */
    private getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('refresh_token');
    }

    /**
     * Get user ID
     */
    private getUserId(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('user_id');
    }

    /**
     * Get current user info
     */
    getCurrentUser(): { userId: number; email: string; fullName: string } | null {
        if (typeof window === 'undefined') return null;

        const userId = localStorage.getItem('user_id');
        const email = localStorage.getItem('user_email');
        const fullName = localStorage.getItem('user_full_name');

        if (!userId || !email || !fullName) return null;

        return {
            userId: parseInt(userId),
            email,
            fullName,
        };
    }

    /**
     * Save authentication tokens and user info
     */
    private saveTokens(authResponse: AuthResponse): void {
        if (typeof window === 'undefined') return;

        localStorage.setItem('access_token', authResponse.accessToken);
        localStorage.setItem('refresh_token', authResponse.refreshToken);
        localStorage.setItem('user_id', authResponse.userId.toString());
        localStorage.setItem('user_email', authResponse.email);
        localStorage.setItem('user_full_name', authResponse.fullName);
    }

    /**
     * Clear all authentication data
     */
    private clearTokens(): void {
        if (typeof window === 'undefined') return;

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_full_name');
    }
}

export const authService = new AuthService();
