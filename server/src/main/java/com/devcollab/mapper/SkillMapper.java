package com.devcollab.mapper;

import com.devcollab.dto.response.SkillResponse;
import com.devcollab.model.Skill;
import org.springframework.stereotype.Component;

/**
 * Mapper for Skill entity and DTOs
 */
@Component
public class SkillMapper {

    public SkillResponse toResponse(Skill skill) {
        if (skill == null) {
            return null;
        }

        SkillResponse response = new SkillResponse();
        response.setId(skill.getId());
        response.setName(skill.getName());
        response.setCategory(skill.getCategory());
        response.setDescription(skill.getDescription());

        return response;
    }
}
