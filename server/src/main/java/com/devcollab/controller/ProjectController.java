package com.devcollab.controller;

import com.devcollab.dto.request.CreateProjectRequest;
import com.devcollab.dto.request.UpdateProjectRequest;
import com.devcollab.dto.response.ApiResponse;
import com.devcollab.dto.response.ProjectResponse;
import com.devcollab.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for project management endpoints
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Slf4j
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectResponse>> createProject(
            @Valid @RequestBody CreateProjectRequest request,
            Authentication authentication) {
        log.info("Create project request");
        // In a real implementation, extract userId from authentication
        Long userId = 1L; // Placeholder
        ProjectResponse project = projectService.createProject(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Project created successfully", project));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProjectById(@PathVariable Long id) {
        log.info("Get project request for ID: {}", id);
        ProjectResponse project = projectService.getProjectById(id);
        return ResponseEntity.ok(ApiResponse.success(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> updateProject(
            @PathVariable Long id,
            @RequestBody UpdateProjectRequest request,
            Authentication authentication) {
        log.info("Update project request for ID: {}", id);
        Long userId = 1L; // Placeholder
        ProjectResponse project = projectService.updateProject(id, userId, request);
        return ResponseEntity.ok(ApiResponse.success("Project updated successfully", project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(
            @PathVariable Long id,
            Authentication authentication) {
        log.info("Delete project request for ID: {}", id);
        Long userId = 1L; // Placeholder
        projectService.deleteProject(id, userId);
        return ResponseEntity.ok(ApiResponse.success("Project deleted successfully", null));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getProjectsByCreator(@PathVariable Long userId) {
        log.info("Get projects by creator request for user ID: {}", userId);
        List<ProjectResponse> projects = projectService.getProjectsByCreator(userId);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/open")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getAllOpenProjects() {
        log.info("Get all open projects request");
        List<ProjectResponse> projects = projectService.getAllOpenProjects();
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/accepting-members")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getProjectsAcceptingMembers() {
        log.info("Get projects accepting members request");
        List<ProjectResponse> projects = projectService.getProjectsAcceptingMembers();
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @PostMapping("/{projectId}/members/{memberId}")
    public ResponseEntity<ApiResponse<ProjectResponse>> addTeamMember(
            @PathVariable Long projectId,
            @PathVariable Long memberId,
            Authentication authentication) {
        log.info("Add team member request for project ID: {} and member ID: {}", projectId, memberId);
        Long userId = 1L; // Placeholder
        ProjectResponse project = projectService.addTeamMember(projectId, userId, memberId);
        return ResponseEntity.ok(ApiResponse.success("Team member added successfully", project));
    }

    @DeleteMapping("/{projectId}/members/{memberId}")
    public ResponseEntity<ApiResponse<ProjectResponse>> removeTeamMember(
            @PathVariable Long projectId,
            @PathVariable Long memberId,
            Authentication authentication) {
        log.info("Remove team member request for project ID: {} and member ID: {}", projectId, memberId);
        Long userId = 1L; // Placeholder
        ProjectResponse project = projectService.removeTeamMember(projectId, userId, memberId);
        return ResponseEntity.ok(ApiResponse.success("Team member removed successfully", project));
    }
}
