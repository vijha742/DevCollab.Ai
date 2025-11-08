package com.devcollab.dto.request;

import com.devcollab.model.User;
import lombok.Data;

import java.util.Set;

/**
 * Request DTO for finding potential matches
 */
@Data
public class FindMatchesRequest {

    private Set<Long> skillIds;

    private Set<String> interests;

    private User.ExperienceLevel experienceLevel;

    // private String timezone;

    private Integer minHoursPerWeek;

    private Long projectId;

    private Integer limit = 10;
}
