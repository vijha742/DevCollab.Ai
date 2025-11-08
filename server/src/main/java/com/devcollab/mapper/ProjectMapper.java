package com.devcollab.mapper;

import com.devcollab.dto.response.ProjectResponse;
import com.devcollab.model.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

/**
 * Mapper for Project entity and DTOs
 */
@Component
@RequiredArgsConstructor
public class ProjectMapper {

    private final UserMapper userMapper;
    private final SkillMapper skillMapper;

    public ProjectResponse toResponse(Project project) {
        if (project == null) {
            return null;
        }

        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setTitle(project.getTitle());
        response.setDescription(project.getDescription());
        response.setCreator(userMapper.toResponse(project.getCreator()));
        response.setProjectType(project.getProjectType());
        response.setStatus(project.getStatus());
        response.setStartDate(project.getStartDate());
        response.setEndDate(project.getEndDate());
        response.setMaxTeamSize(project.getMaxTeamSize());
        response.setCurrentTeamSize(project.getCurrentTeamSize());
        response.setTags(project.getTags());
        response.setRepositoryUrl(project.getRepositoryUrl());
        response.setIsOpen(project.getIsOpen());
        response.setCreatedAt(project.getCreatedAt());
        response.setUpdatedAt(project.getUpdatedAt());

        if (project.getRequiredSkills() != null) {
            response.setRequiredSkills(project.getRequiredSkills().stream()
                    .map(skillMapper::toResponse)
                    .collect(Collectors.toSet()));
        }

        return response;
    }
}
