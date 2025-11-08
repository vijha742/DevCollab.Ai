package com.devcollab.dto.request;

import com.devcollab.model.User;
import lombok.Data;

import java.util.Set;

/**
 * Request DTO for updating user profile
 */
@Data
public class UpdateUserRequest {

    private String fullName;

    private String bio;

    private String githubUsername;

    private String linkedinUrl;

    private User.ExperienceLevel experienceLevel;

    private String timezone;

    private Integer hoursPerWeek;

    private Set<String> interests;

    private Set<Long> skillIds;
}
