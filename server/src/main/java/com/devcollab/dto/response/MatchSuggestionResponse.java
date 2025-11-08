package com.devcollab.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for potential match suggestions
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchSuggestionResponse {

    private UserResponse user;
    private Double matchScore;
    private String matchExplanation;
    private Integer commonSkillsCount;
    private Integer commonInterestsCount;
}
