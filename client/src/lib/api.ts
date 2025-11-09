/**
 * API client for communicating with the backend server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface OAuth2RegisterRequest {
    email: string;
    fullName: string;
    provider: 'google' | 'github' | 'auth0';
    providerId: string;
    profilePicture?: string;
    githubUsername?: string;
    emailVerified?: boolean;
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

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Make authenticated request to the backend
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        // Get access token from localStorage
        const accessToken = typeof window !== 'undefined'
            ? localStorage.getItem('access_token')
            : null;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        // Add authorization header if token exists
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: 'An error occurred',
            }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Register or login user via OAuth2 (Auth0, Google, GitHub)
     */
    async registerWithOAuth(data: OAuth2RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<ApiResponse<AuthResponse>>('/auth/oauth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
        return this.request<ApiResponse<AuthResponse>>(
            `/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`,
            {
                method: 'POST',
            }
        );
    }

    /**
     * Logout user
     */
    async logout(userId: number): Promise<ApiResponse<null>> {
        return this.request<ApiResponse<null>>(
            `/auth/logout?userId=${userId}`,
            {
                method: 'POST',
            }
        );
    }

    /**
     * Get current user profile
     */
    async getCurrentUser(): Promise<any> {
        return this.request('/users/me', {
            method: 'GET',
        });
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
