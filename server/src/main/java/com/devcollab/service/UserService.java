package com.devcollab.service;

import com.devcollab.dto.request.UpdateUserRequest;
import com.devcollab.dto.response.UserResponse;
import com.devcollab.model.User;

import java.util.List;

/**
 * Service interface for user operations
 */
public interface UserService {

    /**
     * Get user by ID
     */
    UserResponse getUserById(Long id);

    /**
     * Get user entity by ID (for internal use)
     */
    User getUserEntityById(Long id);

    /**
     * Get user by email
     */
    UserResponse getUserByEmail(String email);

    /**
     * Update user profile
     */
    UserResponse updateUser(Long id, UpdateUserRequest request);

    /**
     * Delete/deactivate user
     */
    void deleteUser(Long id);

    /**
     * Get all active users
     */
    List<UserResponse> getAllActiveUsers();

    /**
     * Add skills to user from GitHub profile
     */
    UserResponse syncGitHubSkills(Long userId);

    /**
     * Parse user bio using AI and extract skills/interests
     */
    UserResponse enrichProfileWithAI(Long userId);
}
