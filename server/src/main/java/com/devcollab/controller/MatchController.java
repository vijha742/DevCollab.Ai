package com.devcollab.controller;

import com.devcollab.dto.request.CreateMatchRequest;
import com.devcollab.dto.request.FindMatchesRequest;
import com.devcollab.dto.request.MatchResponseRequest;
import com.devcollab.dto.response.ApiResponse;
import com.devcollab.dto.response.MatchResponse;
import com.devcollab.dto.response.MatchSuggestionResponse;
import com.devcollab.service.MatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for matching and collaboration endpoints
 */
@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@Slf4j
public class MatchController {

    private final MatchService matchService;

    @PostMapping
    public ResponseEntity<ApiResponse<MatchResponse>> createMatch(
            @Valid @RequestBody CreateMatchRequest request,
            Authentication authentication) {
        log.info("Create match request");
        Long userId = 1L; // Placeholder
        MatchResponse match = matchService.createMatch(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Match request created successfully", match));
    }

    @PutMapping("/{matchId}/respond")
    public ResponseEntity<ApiResponse<MatchResponse>> respondToMatch(
            @PathVariable Long matchId,
            @Valid @RequestBody MatchResponseRequest request,
            Authentication authentication) {
        log.info("Respond to match request for match ID: {}", matchId);
        Long userId = 1L; // Placeholder
        MatchResponse match = matchService.respondToMatch(matchId, userId, request);
        return ResponseEntity.ok(ApiResponse.success("Match response recorded successfully", match));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MatchResponse>> getMatchById(@PathVariable Long id) {
        log.info("Get match request for ID: {}", id);
        MatchResponse match = matchService.getMatchById(id);
        return ResponseEntity.ok(ApiResponse.success(match));
    }

    @GetMapping("/received")
    public ResponseEntity<ApiResponse<List<MatchResponse>>> getReceivedMatches(Authentication authentication) {
        log.info("Get received matches request");
        Long userId = 1L; // Placeholder
        List<MatchResponse> matches = matchService.getReceivedMatches(userId);
        return ResponseEntity.ok(ApiResponse.success(matches));
    }

    @GetMapping("/sent")
    public ResponseEntity<ApiResponse<List<MatchResponse>>> getSentMatches(Authentication authentication) {
        log.info("Get sent matches request");
        Long userId = 1L; // Placeholder
        List<MatchResponse> matches = matchService.getSentMatches(userId);
        return ResponseEntity.ok(ApiResponse.success(matches));
    }

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<MatchResponse>>> getPendingMatches(Authentication authentication) {
        log.info("Get pending matches request");
        Long userId = 1L; // Placeholder
        List<MatchResponse> matches = matchService.getPendingMatches(userId);
        return ResponseEntity.ok(ApiResponse.success(matches));
    }

    @PostMapping("/find")
    public ResponseEntity<ApiResponse<List<MatchSuggestionResponse>>> findPotentialMatches(
            @RequestBody FindMatchesRequest request,
            Authentication authentication) {
        log.info("Find potential matches request");
        Long userId = 40L; // Placeholder
        List<MatchSuggestionResponse> suggestions = matchService.findPotentialMatches(userId, request);
        return ResponseEntity.ok(ApiResponse.success(suggestions));
    }

    @GetMapping("/score/{userId1}/{userId2}")
    public ResponseEntity<ApiResponse<Double>> calculateMatchScore(
            @PathVariable Long userId1,
            @PathVariable Long userId2) {
        log.info("Calculate match score request for users: {} and {}", userId1, userId2);
        Double score = matchService.calculateMatchScore(userId1, userId2);
        return ResponseEntity.ok(ApiResponse.success(score));
    }
}
