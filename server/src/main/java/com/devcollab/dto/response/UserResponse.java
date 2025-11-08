package com.devcollab.dto.response;

import com.devcollab.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Response DTO for user information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String email;
    private String fullName;
    private String bio;
    private String githubUsername;
    private String linkedinUrl;
    private String timezone;
    private Integer hoursPerWeek;
    private User.ExperienceLevel experienceLevel;
    private Set<String> interests;
    private Set<SkillResponse> skills;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
