package com.devcollab.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * Request DTO for OAuth2 registration/login (Auth0, Google, GitHub)
 */
@Data
public class OAuth2RegisterRequest {

    // Email is optional for GitHub users who don't have public email
    @Email(message = "Email must be valid")
    private String email;

    private String fullName;

    @NotBlank(message = "Provider is required")
    private String provider; // "google", "github", "auth0"

    @NotBlank(message = "Provider ID is required")
    private String providerId; // Unique ID from the OAuth provider

    private String profilePicture;

    // Username is required for GitHub users who don't have public email
    private String username;

    private String githubUsername;

    private Boolean emailVerified = false;
}
