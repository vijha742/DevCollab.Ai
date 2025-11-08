package com.devcollab.service;

import com.devcollab.dto.request.CreateProjectRequest;
import com.devcollab.dto.request.UpdateProjectRequest;
import com.devcollab.dto.response.ProjectResponse;

import java.util.List;

/**
 * Service interface for project operations
 */
public interface ProjectService {

    /**
     * Create a new project
     */
    ProjectResponse createProject(Long userId, CreateProjectRequest request);

    /**
     * Get project by ID
     */
    ProjectResponse getProjectById(Long id);

    /**
     * Update project
     */
    ProjectResponse updateProject(Long projectId, Long userId, UpdateProjectRequest request);

    /**
     * Delete project
     */
    void deleteProject(Long projectId, Long userId);

    /**
     * Get all projects by creator
     */
    List<ProjectResponse> getProjectsByCreator(Long userId);

    /**
     * Get all open projects
     */
    List<ProjectResponse> getAllOpenProjects();

    /**
     * Get projects accepting team members
     */
    List<ProjectResponse> getProjectsAcceptingMembers();

    /**
     * Add team member to project
     */
    ProjectResponse addTeamMember(Long projectId, Long userId, Long memberUserId);

    /**
     * Remove team member from project
     */
    ProjectResponse removeTeamMember(Long projectId, Long userId, Long memberUserId);

    /**
     * Search projects by skills
     */
    List<ProjectResponse> searchProjectsBySkills(List<Long> skillIds);
}
