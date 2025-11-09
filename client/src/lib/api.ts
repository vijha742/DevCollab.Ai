/**
 * API client for communicating with the backend server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// ============== Type Definitions ==============

// Enums
export type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type ProjectType = 'WEB_APPLICATION' | 'MOBILE_APP' | 'DESKTOP_APP' | 'GAME' |
    'DATA_SCIENCE' | 'MACHINE_LEARNING' | 'DEVOPS' | 'BLOCKCHAIN' | 'OTHER';
export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
export type MatchStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
export type SkillCategory = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'MOBILE' |
    'DESIGN' | 'DATA_SCIENCE' | 'MACHINE_LEARNING' | 'CLOUD' | 'OTHER';

// Request DTOs
export interface OAuth2RegisterRequest {
    email: string;
    fullName: string;
    provider: 'google' | 'github' | 'auth0';
    providerId: string;
    profilePicture?: string;
    githubUsername?: string;
    emailVerified?: boolean;
}

export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
    githubUsername?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface GitHubCodeRequest {
    code: string;
}

export interface UpdateUserRequest {
    fullName?: string;
    bio?: string;
    githubUsername?: string;
    linkedinUrl?: string;
    experienceLevel?: ExperienceLevel;
    timezone?: string;
    hoursPerWeek?: number;
    interests?: string[];
    skillIds?: number[];
}

export interface CreateProjectRequest {
    title: string;
    description: string;
    projectType: ProjectType;
    requiredSkillIds?: number[];
    tags?: string[];
    startDate?: string;
    endDate?: string;
    maxTeamSize?: number;
    repositoryUrl?: string;
}

export interface UpdateProjectRequest {
    title?: string;
    description?: string;
    status?: ProjectStatus;
    requiredSkillIds?: number[];
    tags?: string[];
    startDate?: string;
    endDate?: string;
    maxTeamSize?: number;
    repositoryUrl?: string;
    isOpen?: boolean;
}

export interface CreateMatchRequest {
    recipientUserId: number;
    projectId?: number;
    message?: string;
}

export interface MatchResponseRequest {
    status: MatchStatus;
    message?: string;
}

export interface FindMatchesRequest {
    skillIds?: number[];
    interests?: string[];
    experienceLevel?: ExperienceLevel;
    minHoursPerWeek?: number;
    projectId?: number;
    limit?: number;
}

// Response DTOs
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: number;
    email: string;
    fullName: string;
}

export interface SkillResponse {
    id: number;
    name: string;
    category: SkillCategory;
    description?: string;
}

export interface UserResponse {
    id: number;
    email: string;
    fullName: string;
    bio?: string;
    githubUsername?: string;
    linkedinUrl?: string;
    timezone?: string;
    hoursPerWeek?: number;
    experienceLevel?: ExperienceLevel;
    interests?: string[];
    skills?: SkillResponse[];
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProjectResponse {
    id: number;
    title: string;
    description: string;
    creator: UserResponse;
    requiredSkills?: SkillResponse[];
    projectType: ProjectType;
    status: ProjectStatus;
    startDate?: string;
    endDate?: string;
    maxTeamSize?: number;
    currentTeamSize?: number;
    tags?: string[];
    repositoryUrl?: string;
    isOpen?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface MatchResponse {
    id: number;
    requester: UserResponse;
    recipient: UserResponse;
    project?: ProjectResponse;
    matchScore?: number;
    matchExplanation?: string;
    status: MatchStatus;
    message?: string;
    createdAt?: string;
    updatedAt?: string;
    respondedAt?: string;
}

export interface MatchSuggestionResponse {
    user: UserResponse;
    matchScore: number;
    matchExplanation?: string;
    commonSkillsCount?: number;
    commonInterestsCount?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// ============== API Client Class ==============

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

    // ============== Auth Controller Methods ==============

    /**
     * Register a new user with email/password
     */
    async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<ApiResponse<AuthResponse>>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * Login with email/password
     */
    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<ApiResponse<AuthResponse>>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
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
     * Exchange GitHub OAuth code for access token
     */
    async exchangeGitHubCode(code: string): Promise<ApiResponse<string>> {
        return this.request<ApiResponse<string>>('/auth/github/exchange', {
            method: 'POST',
            body: JSON.stringify({ code }),
        });
    }

    /**
     * Test auth endpoint
     */
    async testAuth(): Promise<string> {
        return this.request<string>('/auth/test', {
            method: 'GET',
        });
    }

    // ============== User Controller Methods ==============

    /**
     * Get user by ID
     */
    async getUserById(id: number): Promise<ApiResponse<UserResponse>> {
        return this.request<ApiResponse<UserResponse>>(`/users/${id}`, {
            method: 'GET',
        });
    }

    /**
     * Get user by email
     */
    async getUserByEmail(email: string): Promise<ApiResponse<UserResponse>> {
        return this.request<ApiResponse<UserResponse>>(`/users/email/${encodeURIComponent(email)}`, {
            method: 'GET',
        });
    }

    /**
     * Get current authenticated user profile
     */
    async getCurrentUser(): Promise<ApiResponse<UserResponse>> {
        return this.request<ApiResponse<UserResponse>>('/users/me', {
            method: 'GET',
        });
    }

    /**
     * Update user profile
     */
    async updateUser(id: number, data: UpdateUserRequest): Promise<ApiResponse<UserResponse>> {
        return this.request<ApiResponse<UserResponse>>(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    /**
     * Delete user
     */
    async deleteUser(id: number): Promise<ApiResponse<null>> {
        return this.request<ApiResponse<null>>(`/users/${id}`, {
            method: 'DELETE',
        });
    }

    /**
     * Get all active users
     */
    async getAllActiveUsers(): Promise<ApiResponse<UserResponse[]>> {
        return this.request<ApiResponse<UserResponse[]>>('/users', {
            method: 'GET',
        });
    }

    /**
     * Sync GitHub skills for a user
     */
    async syncGitHubSkills(userId: number): Promise<ApiResponse<UserResponse>> {
        return this.request<ApiResponse<UserResponse>>(`/users/${userId}/sync-github`, {
            method: 'POST',
        });
    }

    /**
     * Enrich user profile with AI
     */
    async enrichProfile(userId: number): Promise<ApiResponse<UserResponse>> {
        return this.request<ApiResponse<UserResponse>>(`/users/${userId}/enrich-profile`, {
            method: 'POST',
        });
    }

    // ============== Project Controller Methods ==============

    /**
     * Create a new project
     */
    async createProject(data: CreateProjectRequest): Promise<ApiResponse<ProjectResponse>> {
        return this.request<ApiResponse<ProjectResponse>>('/projects', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * Get project by ID
     */
    async getProjectById(id: number): Promise<ApiResponse<ProjectResponse>> {
        return this.request<ApiResponse<ProjectResponse>>(`/projects/${id}`, {
            method: 'GET',
        });
    }

    /**
     * Update project
     */
    async updateProject(id: number, data: UpdateProjectRequest): Promise<ApiResponse<ProjectResponse>> {
        return this.request<ApiResponse<ProjectResponse>>(`/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    /**
     * Delete project
     */
    async deleteProject(id: number): Promise<ApiResponse<null>> {
        return this.request<ApiResponse<null>>(`/projects/${id}`, {
            method: 'DELETE',
        });
    }

    /**
     * Get projects by creator user ID
     */
    async getProjectsByCreator(userId: number): Promise<ApiResponse<ProjectResponse[]>> {
        return this.request<ApiResponse<ProjectResponse[]>>(`/projects/user/${userId}`, {
            method: 'GET',
        });
    }

    /**
     * Get all open projects
     */
    async getAllOpenProjects(): Promise<ApiResponse<ProjectResponse[]>> {
        return this.request<ApiResponse<ProjectResponse[]>>('/projects/open', {
            method: 'GET',
        });
    }

    /**
     * Get projects accepting members
     */
    async getProjectsAcceptingMembers(): Promise<ApiResponse<ProjectResponse[]>> {
        return this.request<ApiResponse<ProjectResponse[]>>('/projects/accepting-members', {
            method: 'GET',
        });
    }

    /**
     * Add team member to project
     */
    async addTeamMember(projectId: number, memberId: number): Promise<ApiResponse<ProjectResponse>> {
        return this.request<ApiResponse<ProjectResponse>>(`/projects/${projectId}/members/${memberId}`, {
            method: 'POST',
        });
    }

    /**
     * Remove team member from project
     */
    async removeTeamMember(projectId: number, memberId: number): Promise<ApiResponse<ProjectResponse>> {
        return this.request<ApiResponse<ProjectResponse>>(`/projects/${projectId}/members/${memberId}`, {
            method: 'DELETE',
        });
    }

    // ============== Match Controller Methods ==============

    /**
     * Create a match request
     */
    async createMatch(data: CreateMatchRequest): Promise<ApiResponse<MatchResponse>> {
        return this.request<ApiResponse<MatchResponse>>('/matches', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * Respond to a match request
     */
    async respondToMatch(matchId: number, data: MatchResponseRequest): Promise<ApiResponse<MatchResponse>> {
        return this.request<ApiResponse<MatchResponse>>(`/matches/${matchId}/respond`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    /**
     * Get match by ID
     */
    async getMatchById(id: number): Promise<ApiResponse<MatchResponse>> {
        return this.request<ApiResponse<MatchResponse>>(`/matches/${id}`, {
            method: 'GET',
        });
    }

    /**
     * Get received match requests
     */
    async getReceivedMatches(): Promise<ApiResponse<MatchResponse[]>> {
        return this.request<ApiResponse<MatchResponse[]>>('/matches/received', {
            method: 'GET',
        });
    }

    /**
     * Get sent match requests
     */
    async getSentMatches(): Promise<ApiResponse<MatchResponse[]>> {
        return this.request<ApiResponse<MatchResponse[]>>('/matches/sent', {
            method: 'GET',
        });
    }

    /**
     * Get pending match requests
     */
    async getPendingMatches(): Promise<ApiResponse<MatchResponse[]>> {
        return this.request<ApiResponse<MatchResponse[]>>('/matches/pending', {
            method: 'GET',
        });
    }

    /**
     * Find potential matches based on criteria
     */
    async findPotentialMatches(data: FindMatchesRequest): Promise<ApiResponse<MatchSuggestionResponse[]>> {
        return this.request<ApiResponse<MatchSuggestionResponse[]>>('/matches/find', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * Calculate match score between two users
     */
    async calculateMatchScore(userId1: number, userId2: number): Promise<ApiResponse<number>> {
        return this.request<ApiResponse<number>>(`/matches/score/${userId1}/${userId2}`, {
            method: 'GET',
        });
    }

    // ============== Skill Controller Methods ==============

    /**
     * Get all skills
     */
    async getAllSkills(): Promise<ApiResponse<SkillResponse[]>> {
        return this.request<ApiResponse<SkillResponse[]>>('/skills', {
            method: 'GET',
        });
    }

    /**
     * Get skill by ID
     */
    async getSkillById(id: number): Promise<ApiResponse<SkillResponse>> {
        return this.request<ApiResponse<SkillResponse>>(`/skills/${id}`, {
            method: 'GET',
        });
    }

    /**
     * Get skills by category
     */
    async getSkillsByCategory(category: SkillCategory): Promise<ApiResponse<SkillResponse[]>> {
        return this.request<ApiResponse<SkillResponse[]>>(`/skills/category/${category}`, {
            method: 'GET',
        });
    }

    /**
     * Search skills by query
     */
    async searchSkills(query: string): Promise<ApiResponse<SkillResponse[]>> {
        return this.request<ApiResponse<SkillResponse[]>>(`/skills/search?query=${encodeURIComponent(query)}`, {
            method: 'GET',
        });
    }

    /**
     * Create a new skill
     */
    async createSkill(name: string, category: SkillCategory, description?: string): Promise<ApiResponse<SkillResponse>> {
        const params = new URLSearchParams({ name, category });
        if (description) {
            params.append('description', description);
        }
        return this.request<ApiResponse<SkillResponse>>(`/skills?${params.toString()}`, {
            method: 'POST',
        });
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
