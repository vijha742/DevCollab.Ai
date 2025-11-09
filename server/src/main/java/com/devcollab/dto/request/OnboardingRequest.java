package com.devcollab.dto.request;

import com.devcollab.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

/**
 * Request DTO for user onboarding process
 */
@Data
public class OnboardingRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Bio is required")
    private String bio;

    @NotNull(message = "Experience level is required")
    private User.ExperienceLevel experienceLevel;

    private String githubUsername;

    private String linkedinUrl;

    private String profilePicture;

    private String timezone;

    private Integer hoursPerWeek;

    @NotNull(message = "At least one interest is required")
    private Set<String> interests;

    private Set<String> skillNames;  // Skill names instead of IDs for easier frontend integration

    private Set<Long> skillIds;  // Alternative: skill IDs if already known
}
