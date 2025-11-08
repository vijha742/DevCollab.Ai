package com.devcollab.dto.request;

import com.devcollab.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

/**
 * Request DTO for user registration
 */
@Data
public class RegisterRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Full name is required")
    private String fullName;

    private String bio;

    private String githubUsername;

    private String linkedinUrl;

    @NotNull(message = "Experience level is required")
    private User.ExperienceLevel experienceLevel;

    private String timezone;

    private Integer hoursPerWeek;

    private Set<String> interests;
}
