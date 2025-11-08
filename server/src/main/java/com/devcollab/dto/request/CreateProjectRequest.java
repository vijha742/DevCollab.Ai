package com.devcollab.dto.request;

import com.devcollab.model.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

/**
 * Request DTO for creating a new project
 */
@Data
public class CreateProjectRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Project type is required")
    private Project.ProjectType projectType;

    private Set<Long> requiredSkillIds;

    private Set<String> tags;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer maxTeamSize;

    private String repositoryUrl;
}
