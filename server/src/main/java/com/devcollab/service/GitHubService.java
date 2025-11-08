package com.devcollab.service;

import java.util.List;

/**
 * Service interface for GitHub API integration
 */
public interface GitHubService {

    /**
     * Extract skills from user's GitHub repositories
     */
    List<String> extractSkillsFromGitHub(String githubUsername);

    /**
     * Get user's GitHub profile information
     */
    GitHubProfile getGitHubProfile(String githubUsername);

    /**
     * Get user's most used programming languages
     */
    List<String> getMostUsedLanguages(String githubUsername);

    /**
     * Data class for GitHub profile information
     */
    record GitHubProfile(
            String login,
            String name,
            String bio,
            String location,
            Integer publicRepos,
            Integer followers,
            Integer following,
            String avatarUrl
    ) {
    }
}
