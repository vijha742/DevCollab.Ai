package com.devcollab.service;

import com.devcollab.model.User;

import java.util.List;

/**
 * Service interface for Gemini AI integration
 */
public interface GeminiService {

    /**
     * Parse user bio and extract skills and interests
     */
    ParsedBioResult parseBio(String bio);

    /**
     * Generate match explanation between two users
     */
    String generateMatchExplanation(User user1, User user2, int compatibilityScore, 
                                   int commonSkills, int commonInterests);

    /**
     * Get skill recommendations based on user profile
     */
    List<String> getSkillRecommendations(Long userId);

    /**
     * Generate project description enhancement
     */
    String enhanceProjectDescription(String originalDescription);

    /**
     * Data class for parsed bio results
     */
    record ParsedBioResult(List<String> skills, List<String> interests, String summary) {
    }
}
