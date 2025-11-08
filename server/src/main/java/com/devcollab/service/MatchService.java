package com.devcollab.service;

import com.devcollab.dto.request.CreateMatchRequest;
import com.devcollab.dto.request.FindMatchesRequest;
import com.devcollab.dto.request.MatchResponseRequest;
import com.devcollab.dto.response.MatchResponse;
import com.devcollab.dto.response.MatchSuggestionResponse;

import java.util.List;

/**
 * Service interface for matching operations
 */
public interface MatchService {

    /**
     * Create a match request
     */
    MatchResponse createMatch(Long userId, CreateMatchRequest request);

    /**
     * Respond to a match request
     */
    MatchResponse respondToMatch(Long matchId, Long userId, MatchResponseRequest request);

    /**
     * Get match by ID
     */
    MatchResponse getMatchById(Long id);

    /**
     * Get all received matches for a user
     */
    List<MatchResponse> getReceivedMatches(Long userId);

    /**
     * Get all sent matches for a user
     */
    List<MatchResponse> getSentMatches(Long userId);

    /**
     * Get pending matches for a user
     */
    List<MatchResponse> getPendingMatches(Long userId);

    /**
     * Find potential matches for a user
     */
    List<MatchSuggestionResponse> findPotentialMatches(Long userId, FindMatchesRequest request);

    /**
     * Calculate match score between two users
     */
    Double calculateMatchScore(Long userId1, Long userId2);
}
