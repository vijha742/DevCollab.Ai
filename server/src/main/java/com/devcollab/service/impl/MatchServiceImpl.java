package com.devcollab.service.impl;

import com.devcollab.dto.request.CreateMatchRequest;
import com.devcollab.dto.request.FindMatchesRequest;
import com.devcollab.dto.request.MatchResponseRequest;
import com.devcollab.dto.response.MatchResponse;
import com.devcollab.dto.response.MatchSuggestionResponse;
import com.devcollab.exception.BadRequestException;
import com.devcollab.exception.ForbiddenException;
import com.devcollab.exception.ResourceNotFoundException;
import com.devcollab.mapper.MatchMapper;
import com.devcollab.mapper.UserMapper;
import com.devcollab.model.Match;
import com.devcollab.model.Project;
import com.devcollab.model.Skill;
import com.devcollab.model.User;
import com.devcollab.repository.MatchRepository;
import com.devcollab.repository.ProjectRepository;
import com.devcollab.repository.UserRepository;
import com.devcollab.service.GeminiService;
import com.devcollab.service.MatchService;
import com.devcollab.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Implementation of MatchService
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MatchServiceImpl implements MatchService {

    private final MatchRepository matchRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final MatchMapper matchMapper;
    private final UserMapper userMapper;
    private final GeminiService geminiService;

    @Override
    public MatchResponse createMatch(Long userId, CreateMatchRequest request) {
        log.info("Creating match request from user {} to user {}", userId, request.getRecipientUserId());

        User requester = userService.getUserEntityById(userId);
        User recipient = userService.getUserEntityById(request.getRecipientUserId());

        if (userId.equals(request.getRecipientUserId())) {
            throw new BadRequestException("Cannot create a match request to yourself");
        }

        // Check if match already exists
        if (matchRepository.existsByRequesterIdAndRecipientIdAndStatus(
                userId, request.getRecipientUserId(), Match.MatchStatus.PENDING)) {
            throw new BadRequestException("A pending match request already exists");
        }

        Match match = new Match();
        match.setRequester(requester);
        match.setRecipient(recipient);
        match.setMessage(request.getMessage());
        match.setStatus(Match.MatchStatus.PENDING);

        if (request.getProjectId() != null) {
            Project project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
            match.setProject(project);
        }

        // Calculate match score
        Double matchScore = calculateMatchScore(userId, request.getRecipientUserId());
        match.setMatchScore(matchScore);
        match.setMatchExplanation("AI-generated match explanation (to be implemented)");

        Match savedMatch = matchRepository.save(match);
        log.info("Match request created successfully with ID: {}", savedMatch.getId());
        return matchMapper.toResponse(savedMatch);
    }

    @Override
    public MatchResponse respondToMatch(Long matchId, Long userId, MatchResponseRequest request) {
        log.info("User {} responding to match {}", userId, matchId);

        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found with ID: " + matchId));

        if (!match.getRecipient().getId().equals(userId)) {
            throw new ForbiddenException("You are not authorized to respond to this match");
        }

        if (match.getStatus() != Match.MatchStatus.PENDING) {
            throw new BadRequestException("This match request has already been responded to");
        }

        match.setStatus(request.getStatus());
        match.setRespondedAt(LocalDateTime.now());

        Match updatedMatch = matchRepository.save(match);
        log.info("Match response recorded successfully");
        return matchMapper.toResponse(updatedMatch);
    }

    @Override
    @Transactional(readOnly = true)
    public MatchResponse getMatchById(Long id) {
        log.info("Fetching match with ID: {}", id);
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found with ID: " + id));
        return matchMapper.toResponse(match);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MatchResponse> getReceivedMatches(Long userId) {
        log.info("Fetching received matches for user ID: {}", userId);
        return matchRepository.findByRecipientId(userId).stream()
                .map(matchMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MatchResponse> getSentMatches(Long userId) {
        log.info("Fetching sent matches for user ID: {}", userId);
        return matchRepository.findByRequesterId(userId).stream()
                .map(matchMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MatchResponse> getPendingMatches(Long userId) {
        log.info("Fetching pending matches for user ID: {}", userId);
        return matchRepository.findReceivedMatchesByStatus(userId, Match.MatchStatus.PENDING).stream()
                .map(matchMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MatchSuggestionResponse> findPotentialMatches(Long userId, FindMatchesRequest request) {
        log.info("Finding potential matches for user ID: {}", userId);
        
        User currentUser = userService.getUserEntityById(userId);
        List<User> allActiveUsers = userRepository.findByActiveTrue();
        
        // Filter out the current user
        allActiveUsers = allActiveUsers.stream()
                .filter(user -> !user.getId().equals(userId))
                .collect(Collectors.toList());
        
        // Apply filters from request
        if (request.getSkillIds() != null && !request.getSkillIds().isEmpty()) {
            allActiveUsers = allActiveUsers.stream()
                    .filter(user -> user.getSkills().stream()
                            .anyMatch(skill -> request.getSkillIds().contains(skill.getId())))
                    .collect(Collectors.toList());
        }
        
        if (request.getInterests() != null && !request.getInterests().isEmpty()) {
            allActiveUsers = allActiveUsers.stream()
                    .filter(user -> user.getInterests().stream()
                            .anyMatch(request.getInterests()::contains))
                    .collect(Collectors.toList());
        }
        
        if (request.getExperienceLevel() != null) {
            allActiveUsers = allActiveUsers.stream()
                    .filter(user -> user.getExperienceLevel().equals(request.getExperienceLevel()))
                    .collect(Collectors.toList());
        }
        
        // if (request.getTimezone() != null) {
        //     allActiveUsers = allActiveUsers.stream()
        //             .filter(user -> request.getTimezone().equals(user.getTimezone()))
        //             .collect(Collectors.toList());
        // }
        
        if (request.getMinHoursPerWeek() != null) {
            allActiveUsers = allActiveUsers.stream()
                    .filter(user -> user.getHoursPerWeek() != null && 
                            user.getHoursPerWeek() >= request.getMinHoursPerWeek())
                    .collect(Collectors.toList());
        }
        
        // Calculate compatibility scores and create suggestions
        List<MatchSuggestionResponse> suggestions = allActiveUsers.stream()
                .map(candidate -> {
                    int compatibilityScore = calculateCompatibilityScore(currentUser, candidate);
                    
                    // Calculate common skills and interests
                    int commonSkills = (int) currentUser.getSkills().stream()
                            .filter(candidate.getSkills()::contains)
                            .count();
                    
                    int commonInterests = (int) currentUser.getInterests().stream()
                            .filter(candidate.getInterests()::contains)
                            .count();
                    
                    // Generate match explanation
                    String explanation = generateMatchExplanation(currentUser, candidate, 
                            compatibilityScore, commonSkills, commonInterests);
                    
                    return new MatchSuggestionResponse(
                            userMapper.toResponse(candidate),
                            (double) compatibilityScore,
                            explanation,
                            commonSkills,
                            commonInterests
                    );
                })
                .filter(suggestion -> suggestion.getMatchScore() > 0) // Only include matches with score > 0
                .sorted((s1, s2) -> Double.compare(s2.getMatchScore(), s1.getMatchScore())) // Sort by score descending
                .limit(request.getLimit() != null ? request.getLimit() : 10)
                .collect(Collectors.toList());
        
        log.info("Found {} potential matches for user ID: {}", suggestions.size(), userId);
        return suggestions;
    }

    @Override
    @Transactional(readOnly = true)
    public Double calculateMatchScore(Long userId1, Long userId2) {
        log.info("Calculating match score between users {} and {}", userId1, userId2);

        User user1 = userService.getUserEntityById(userId1);
        User user2 = userService.getUserEntityById(userId2);

        return (double) calculateCompatibilityScore(user1, user2);
    }

    /**
     * Calculate compatibility score between two users
     * @param user The current user
     * @param candidate The candidate user to match with
     * @return Compatibility score (0-100)
     */
    private int calculateCompatibilityScore(User user, User candidate) {
        int score = 0;
        
        // 1. Experience Level Complementarity (40 points)
        // Award points for compatible experience levels
        if (user.getExperienceLevel() != null && candidate.getExperienceLevel() != null) {
            score += calculateExperienceLevelScore(user.getExperienceLevel(), candidate.getExperienceLevel());
        }
        
        // 2. Shared Project Interests (30 points)
        Set<String> userInterests = new HashSet<>(user.getInterests());
        Set<String> candidateInterests = new HashSet<>(candidate.getInterests());
        
        userInterests.retainAll(candidateInterests); // intersection
        int sharedInterests = userInterests.size();
        score += Math.min(30, sharedInterests * 10);
        
        // 3. Availability Match (20 points)
        if (user.getTimezone() != null && candidate.getTimezone() != null 
                && user.getTimezone().equals(candidate.getTimezone())) {
            score += 10;
        }
        if (user.getHoursPerWeek() != null && candidate.getHoursPerWeek() != null 
                && user.getHoursPerWeek().equals(candidate.getHoursPerWeek())) {
            score += 10;
        }
        
        // 4. Skill Overlap (10 points)
        Set<Skill> userSkills = new HashSet<>(user.getSkills());
        Set<Skill> candidateSkills = new HashSet<>(candidate.getSkills());
        
        userSkills.retainAll(candidateSkills);
        int sharedSkills = userSkills.size();
        score += Math.min(10, sharedSkills * 2);
        
        return Math.min(100, score); // cap at 100
    }

    /**
     * Calculate score based on experience level compatibility
     * @param userLevel User's experience level
     * @param candidateLevel Candidate's experience level
     * @return Score (0-40 points)
     */
    private int calculateExperienceLevelScore(User.ExperienceLevel userLevel, User.ExperienceLevel candidateLevel) {
        // Same level gets full points
        if (userLevel == candidateLevel) {
            return 40;
        }
        
        // Adjacent levels get partial points
        int userLevelValue = getExperienceLevelValue(userLevel);
        int candidateLevelValue = getExperienceLevelValue(candidateLevel);
        int difference = Math.abs(userLevelValue - candidateLevelValue);
        
        if (difference == 1) {
            return 30; // One level apart
        } else if (difference == 2) {
            return 20; // Two levels apart
        } else {
            return 10; // Three levels apart
        }
    }

    /**
     * Convert experience level to numeric value for comparison
     * @param level Experience level
     * @return Numeric value (0-3)
     */
    private int getExperienceLevelValue(User.ExperienceLevel level) {
        switch (level) {
            case BEGINNER: return 0;
            case INTERMEDIATE: return 1;
            case ADVANCED: return 2;
            case EXPERT: return 3;
            default: return 0;
        }
    }

    /**
     * Generate a human-readable explanation for why two users match using Gemini AI
     * 
     * @param user Current user
     * @param candidate Potential match candidate
     * @param score Compatibility score
     * @param commonSkills Number of common skills
     * @param commonInterests Number of common interests
     * @return AI-generated match explanation string
     */
    private String generateMatchExplanation(User user, User candidate, int score, 
                                           int commonSkills, int commonInterests) {
        // Call Gemini service with full user objects for rich context
        return geminiService.generateMatchExplanation(user, candidate, score, 
                commonSkills, commonInterests);
    }
}
