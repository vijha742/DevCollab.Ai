package com.devcollab.dto.response;

import com.devcollab.model.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * Response DTO for project information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {

    private Long id;
    private String title;
    private String description;
    private UserResponse creator;
    private Set<SkillResponse> requiredSkills;
    private Project.ProjectType projectType;
    private Project.ProjectStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer maxTeamSize;
    private Integer currentTeamSize;
    private Set<String> tags;
    private String repositoryUrl;
    private Boolean isOpen;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
