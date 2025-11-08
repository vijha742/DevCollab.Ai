package com.devcollab.dto.request;

import com.devcollab.model.Project;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

/**
 * Request DTO for updating an existing project
 */
@Data
public class UpdateProjectRequest {

    private String title;

    private String description;

    private Project.ProjectStatus status;

    private Set<Long> requiredSkillIds;

    private Set<String> tags;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer maxTeamSize;

    private String repositoryUrl;

    private Boolean isOpen;
}
