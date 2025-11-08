package com.devcollab.mapper;

import com.devcollab.dto.response.MatchResponse;
import com.devcollab.model.Match;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Mapper for Match entity and DTOs
 */
@Component
@RequiredArgsConstructor
public class MatchMapper {

    private final UserMapper userMapper;
    private final ProjectMapper projectMapper;

    public MatchResponse toResponse(Match match) {
        if (match == null) {
            return null;
        }

        MatchResponse response = new MatchResponse();
        response.setId(match.getId());
        response.setRequester(userMapper.toResponse(match.getRequester()));
        response.setRecipient(userMapper.toResponse(match.getRecipient()));
        
        if (match.getProject() != null) {
            response.setProject(projectMapper.toResponse(match.getProject()));
        }
        
        response.setMatchScore(match.getMatchScore());
        response.setMatchExplanation(match.getMatchExplanation());
        response.setStatus(match.getStatus());
        response.setMessage(match.getMessage());
        response.setCreatedAt(match.getCreatedAt());
        response.setUpdatedAt(match.getUpdatedAt());
        response.setRespondedAt(match.getRespondedAt());

        return response;
    }
}
