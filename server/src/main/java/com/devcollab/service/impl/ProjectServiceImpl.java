package com.devcollab.service.impl;

import com.devcollab.dto.request.CreateProjectRequest;
import com.devcollab.dto.request.UpdateProjectRequest;
import com.devcollab.dto.response.ProjectResponse;
import com.devcollab.exception.ForbiddenException;
import com.devcollab.exception.ResourceNotFoundException;
import com.devcollab.mapper.ProjectMapper;
import com.devcollab.model.Project;
import com.devcollab.model.Skill;
import com.devcollab.model.User;
import com.devcollab.repository.ProjectRepository;
import com.devcollab.service.ProjectService;
import com.devcollab.service.SkillService;
import com.devcollab.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Implementation of ProjectService
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final SkillService skillService;
    private final ProjectMapper projectMapper;

    @Override
    public ProjectResponse createProject(Long userId, CreateProjectRequest request) {
        log.info("Creating new project for user ID: {}", userId);

        User creator = userService.getUserEntityById(userId);

        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setCreator(creator);
        project.setProjectType(request.getProjectType());
        project.setStatus(Project.ProjectStatus.PLANNING);
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());
        project.setMaxTeamSize(request.getMaxTeamSize());
        project.setCurrentTeamSize(1);
        project.setRepositoryUrl(request.getRepositoryUrl());

        if (request.getRequiredSkillIds() != null) {
            Set<Skill> skills = request.getRequiredSkillIds().stream()
                    .map(skillService::getSkillEntityById)
                    .collect(Collectors.toSet());
            project.setRequiredSkills(skills);
        }

        if (request.getTags() != null) {
            project.setTags(request.getTags());
        }

        Project savedProject = projectRepository.save(project);
        log.info("Project created successfully with ID: {}", savedProject.getId());
        return projectMapper.toResponse(savedProject);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        log.info("Fetching project with ID: {}", id);
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with ID: " + id));
        return projectMapper.toResponse(project);
    }

    @Override
    public ProjectResponse updateProject(Long projectId, Long userId, UpdateProjectRequest request) {
        log.info("Updating project ID: {} by user ID: {}", projectId, userId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with ID: " + projectId));

        if (!project.getCreator().getId().equals(userId)) {
            throw new ForbiddenException("You are not authorized to update this project");
        }

        if (request.getTitle() != null) {
            project.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            project.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            project.setStatus(request.getStatus());
        }
        if (request.getStartDate() != null) {
            project.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            project.setEndDate(request.getEndDate());
        }
        if (request.getMaxTeamSize() != null) {
            project.setMaxTeamSize(request.getMaxTeamSize());
        }
        if (request.getRepositoryUrl() != null) {
            project.setRepositoryUrl(request.getRepositoryUrl());
        }
        if (request.getIsOpen() != null) {
            project.setIsOpen(request.getIsOpen());
        }
        if (request.getRequiredSkillIds() != null) {
            Set<Skill> skills = request.getRequiredSkillIds().stream()
                    .map(skillService::getSkillEntityById)
                    .collect(Collectors.toSet());
            project.setRequiredSkills(skills);
        }
        if (request.getTags() != null) {
            project.setTags(request.getTags());
        }

        Project updatedProject = projectRepository.save(project);
        log.info("Project updated successfully");
        return projectMapper.toResponse(updatedProject);
    }

    @Override
    public void deleteProject(Long projectId, Long userId) {
        log.info("Deleting project ID: {} by user ID: {}", projectId, userId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with ID: " + projectId));

        if (!project.getCreator().getId().equals(userId)) {
            throw new ForbiddenException("You are not authorized to delete this project");
        }

        projectRepository.delete(project);
        log.info("Project deleted successfully");
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getProjectsByCreator(Long userId) {
        log.info("Fetching projects by creator ID: {}", userId);
        return projectRepository.findByCreatorId(userId).stream()
                .map(projectMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllOpenProjects() {
        log.info("Fetching all open projects");
        return projectRepository.findByIsOpenTrue().stream()
                .map(projectMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getProjectsAcceptingMembers() {
        log.info("Fetching projects accepting members");
        return projectRepository.findProjectsAcceptingMembers().stream()
                .map(projectMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponse addTeamMember(Long projectId, Long userId, Long memberUserId) {
        log.info("Adding team member {} to project {}", memberUserId, projectId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with ID: " + projectId));

        User member = userService.getUserEntityById(memberUserId);

        if (project.getTeamMembers() == null) {
            project.setTeamMembers(new HashSet<>());
        }

        project.getTeamMembers().add(member);
        project.setCurrentTeamSize(project.getTeamMembers().size() + 1);

        Project updatedProject = projectRepository.save(project);
        return projectMapper.toResponse(updatedProject);
    }

    @Override
    public ProjectResponse removeTeamMember(Long projectId, Long userId, Long memberUserId) {
        log.info("Removing team member {} from project {}", memberUserId, projectId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with ID: " + projectId));

        User member = userService.getUserEntityById(memberUserId);

        if (project.getTeamMembers() != null) {
            project.getTeamMembers().remove(member);
            project.setCurrentTeamSize(project.getTeamMembers().size() + 1);
        }

        Project updatedProject = projectRepository.save(project);
        return projectMapper.toResponse(updatedProject);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> searchProjectsBySkills(List<Long> skillIds) {
        log.info("Searching projects by skills");
        return projectRepository.findByRequiredSkillIds(skillIds).stream()
                .map(projectMapper::toResponse)
                .collect(Collectors.toList());
    }
}
