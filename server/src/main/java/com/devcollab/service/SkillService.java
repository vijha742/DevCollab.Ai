package com.devcollab.service;

import com.devcollab.dto.response.SkillResponse;
import com.devcollab.model.Skill;

import java.util.List;
import java.util.Set;

/**
 * Service interface for skill operations
 */
public interface SkillService {

    /**
     * Get all skills
     */
    List<SkillResponse> getAllSkills();

    /**
     * Get skill by ID
     */
    SkillResponse getSkillById(Long id);

    /**
     * Get skill entity by ID (for internal use)
     */
    Skill getSkillEntityById(Long id);

    /**
     * Get skills by category
     */
    List<SkillResponse> getSkillsByCategory(Skill.SkillCategory category);

    /**
     * Search skills by name
     */
    List<SkillResponse> searchSkills(String query);

    /**
     * Create a new skill
     */
    SkillResponse createSkill(String name, Skill.SkillCategory category, String description);

    /**
     * Get or create skills from a set of names
     */
    Set<Skill> getOrCreateSkills(Set<String> skillNames);
}
