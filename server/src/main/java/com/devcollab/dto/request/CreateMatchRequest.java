package com.devcollab.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * Request DTO for creating a match/connection request
 */
@Data
public class CreateMatchRequest {

    @NotNull(message = "Recipient user ID is required")
    private Long recipientUserId;

    private Long projectId;

    private String message;
}
