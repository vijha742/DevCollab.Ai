package com.devcollab.dto.response;

import com.devcollab.model.Match;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for match information
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchResponse {

    private Long id;
    private UserResponse requester;
    private UserResponse recipient;
    private ProjectResponse project;
    private Double matchScore;
    private String matchExplanation;
    private Match.MatchStatus status;
    private String message;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime respondedAt;
}
