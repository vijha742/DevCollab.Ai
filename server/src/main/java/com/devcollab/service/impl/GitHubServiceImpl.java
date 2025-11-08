package com.devcollab.service.impl;

import com.devcollab.service.GitHubService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of GitHubService for GitHub API integration
 * TODO: Implement actual GitHub API integration
 */
@Service
@Slf4j
public class GitHubServiceImpl implements GitHubService {

    @Value("${github.api.url}")
    private String apiUrl;

    @Value("${github.api.token:}")
    private String apiToken;

    @Override
    public List<String> extractSkillsFromGitHub(String githubUsername) {
        log.info("Extracting skills from GitHub for username: {} (stub implementation)", githubUsername);
        // TODO: Implement actual GitHub API call to fetch repositories and extract skills
        return new ArrayList<>();
    }

    @Override
    public GitHubProfile getGitHubProfile(String githubUsername) {
        log.info("Fetching GitHub profile for username: {} (stub implementation)", githubUsername);
        // TODO: Implement actual GitHub API call
        return new GitHubProfile(
                githubUsername,
                null,
                null,
                null,
                0,
                0,
                0,
                null
        );
    }

    @Override
    public List<String> getMostUsedLanguages(String githubUsername) {
        log.info("Getting most used languages for username: {} (stub implementation)", githubUsername);
        // TODO: Implement actual GitHub API call to analyze repositories
        return new ArrayList<>();
    }
}
