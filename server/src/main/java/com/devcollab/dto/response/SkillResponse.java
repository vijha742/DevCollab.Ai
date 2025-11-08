package com.devcollab.dto.response;

import com.devcollab.model.Skill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for skill information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillResponse {

    private Long id;
    private String name;
    private Skill.SkillCategory category;
    private String description;
}
