package com.devcollab.service;

import com.devcollab.dto.request.LoginRequest;
import com.devcollab.dto.request.OAuth2RegisterRequest;
import com.devcollab.dto.request.RegisterRequest;
import com.devcollab.dto.response.AuthResponse;

/**
 * Service interface for authentication operations
 */
public interface AuthService {

    /**
     * Register a new user
     */
    AuthResponse register(RegisterRequest request);

    /**
     * Register or login user via OAuth2 (Auth0, Google, GitHub)
     */
    AuthResponse registerWithOAuth(OAuth2RegisterRequest request);

    /**
     * Authenticate user and generate tokens
     */
    AuthResponse login(LoginRequest request);

    /**
     * Refresh access token using refresh token
     */
    AuthResponse refreshToken(String refreshToken);

    /**
     * Logout user and invalidate tokens
     */
    void logout(Long userId);
    
    /**
     * Exchange GitHub OAuth code for access token
     */
    String exchangeGitHubCode(String code);
}
