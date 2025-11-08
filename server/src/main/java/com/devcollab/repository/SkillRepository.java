package com.devcollab.repository;

import com.devcollab.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Skill entity
 */
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByName(String name);

    boolean existsByName(String name);

    List<Skill> findByCategory(Skill.SkillCategory category);

    List<Skill> findByNameContainingIgnoreCase(String name);
}
