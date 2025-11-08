package com.devcollab.dto.request;

import com.devcollab.model.Match;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * Request DTO for responding to a match request
 */
@Data
public class MatchResponseRequest {

    @NotNull(message = "Status is required")
    private Match.MatchStatus status;

    private String message;
}
