package com.devcollab.repository;

import com.devcollab.model.Project;
import com.devcollab.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Project entity
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByCreator(User creator);

    List<Project> findByCreatorId(Long creatorId);

    List<Project> findByIsOpenTrue();

    List<Project> findByProjectType(Project.ProjectType projectType);

    List<Project> findByStatus(Project.ProjectStatus status);

    @Query("SELECT p FROM Project p WHERE p.isOpen = true AND p.status = :status")
    List<Project> findOpenProjectsByStatus(@Param("status") Project.ProjectStatus status);

    @Query("SELECT p FROM Project p JOIN p.requiredSkills s WHERE s.id IN :skillIds AND p.isOpen = true")
    List<Project> findByRequiredSkillIds(@Param("skillIds") List<Long> skillIds);

    @Query("SELECT p FROM Project p JOIN p.teamMembers tm WHERE tm.id = :userId")
    List<Project> findProjectsByTeamMemberId(@Param("userId") Long userId);

    @Query("SELECT p FROM Project p WHERE p.isOpen = true AND p.currentTeamSize < p.maxTeamSize")
    List<Project> findProjectsAcceptingMembers();
}
