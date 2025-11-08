package com.devcollab.service.impl;

import com.devcollab.model.Project;
import com.devcollab.model.Skill;
import com.devcollab.model.User;
import com.devcollab.service.GeminiService;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of GeminiService for AI-powered features
 * TODO: Implement actual Gemini API integration
 */
@Service
@Slf4j
public class GeminiServiceImpl implements GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final Gson gson;

    public GeminiServiceImpl() {
        this.restTemplate = new RestTemplate();
        this.gson = new Gson();
    }

    @Override
    public ParsedBioResult parseBio(String bio) {
        log.info("Parsing bio with Gemini AI (stub implementation)");
        // TODO: Implement actual Gemini API call
        // For now, return empty results
        return new ParsedBioResult(new ArrayList<>(), new ArrayList<>(), "");
    }

    @Override
    public String generateMatchExplanation(User user1, User user2, int compatibilityScore, 
                                          int commonSkills, int commonInterests) {
        log.info("Generating match explanation between {} and {} with Gemini AI", 
                user1.getFullName(), user2.getFullName());
        
        try {
            // Build comprehensive user profiles for context
            String prompt = buildMatchExplanationPrompt(user1, user2, compatibilityScore, 
                    commonSkills, commonInterests);
            
            // Call Gemini API
            String explanation = callGeminiAPI(prompt);
            
            log.info("Successfully generated match explanation");
            return explanation;
            
        } catch (Exception e) {
            log.error("Error generating match explanation with Gemini: {}", e.getMessage());
            // Fallback to rule-based explanation
            return generateFallbackExplanation(user1, user2, compatibilityScore, 
                    commonSkills, commonInterests);
        }
    }

    private String buildMatchExplanationPrompt(User user1, User user2, int compatibilityScore,
                                               int commonSkills, int commonInterests) {
        StringBuilder prompt = new StringBuilder();
        
        prompt.append("You are a technical matching expert for a developer collaboration platform. ");
        prompt.append("Analyze the following two developer profiles and explain why they would be good collaboration partners. ");
        prompt.append("Be concise, professional, and highlight specific technical synergies.\n\n");
        
        // User 1 Profile
        prompt.append("Developer 1: ").append(user1.getFullName()).append("\n");
        prompt.append("Experience Level: ").append(user1.getExperienceLevel()).append("\n");
        prompt.append("Bio: ").append(user1.getBio() != null ? user1.getBio() : "N/A").append("\n");
        prompt.append("Skills: ").append(user1.getSkills().stream()
                .map(Skill::getName)
                .collect(Collectors.joining(", "))).append("\n");
        prompt.append("Interests: ").append(String.join(", ", user1.getInterests())).append("\n");
        prompt.append("Hours per week: ").append(user1.getHoursPerWeek() != null ? user1.getHoursPerWeek() : "N/A").append("\n");
        // prompt.append("Timezone: ").append(user1.getTimezone() != null ? user1.getTimezone() : "N/A").append("\n");
        
        if (!user1.getCreatedProjects().isEmpty()) {
            prompt.append("Projects: ");
            List<String> projectTitles = user1.getCreatedProjects().stream()
                    .limit(3)
                    .map(Project::getTitle)
                    .collect(Collectors.toList());
            prompt.append(String.join(", ", projectTitles)).append("\n");
        }
        
        prompt.append("\n");
        
        // User 2 Profile
        prompt.append("Developer 2: ").append(user2.getFullName()).append("\n");
        prompt.append("Experience Level: ").append(user2.getExperienceLevel()).append("\n");
        prompt.append("Bio: ").append(user2.getBio() != null ? user2.getBio() : "N/A").append("\n");
        prompt.append("Skills: ").append(user2.getSkills().stream()
                .map(Skill::getName)
                .collect(Collectors.joining(", "))).append("\n");
        prompt.append("Interests: ").append(String.join(", ", user2.getInterests())).append("\n");
        prompt.append("Hours per week: ").append(user2.getHoursPerWeek() != null ? user2.getHoursPerWeek() : "N/A").append("\n");
        // prompt.append("Timezone: ").append(user2.getTimezone() != null ? user2.getTimezone() : "N/A").append("\n");
        
        if (!user2.getCreatedProjects().isEmpty()) {
            prompt.append("Projects: ");
            List<String> projectTitles = user2.getCreatedProjects().stream()
                    .limit(3)
                    .map(Project::getTitle)
                    .collect(Collectors.toList());
            prompt.append(String.join(", ", projectTitles)).append("\n");
        }
        
        prompt.append("\n");
        
        // Match Statistics
        prompt.append("Match Statistics:\n");
        prompt.append("Compatibility Score: ").append(compatibilityScore).append("/100\n");
        prompt.append("Common Skills: ").append(commonSkills).append("\n");
        prompt.append("Common Interests: ").append(commonInterests).append("\n\n");
        
        prompt.append("Generate a brief, engaging explanation (2-3 sentences) of why these developers would make good collaboration partners. ");
        prompt.append("Focus on their complementary skills, shared interests, and potential project synergies.");
        
        return prompt.toString();
    }

    private String callGeminiAPI(String prompt) {
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("your-gemini-api-key-here")) {
            throw new RuntimeException("Gemini API key not configured");
        }
        
        try {
            // Build Gemini API request
            JsonObject requestBody = new JsonObject();
            
            JsonArray contents = new JsonArray();
            JsonObject content = new JsonObject();
            JsonArray parts = new JsonArray();
            JsonObject part = new JsonObject();
            part.addProperty("text", prompt);
            parts.add(part);
            content.add("parts", parts);
            contents.add(content);
            
            requestBody.add("contents", contents);
            
            // Configure generation settings
            JsonObject generationConfig = new JsonObject();
            generationConfig.addProperty("temperature", 0.7);
            generationConfig.addProperty("maxOutputTokens", 200);
            requestBody.add("generationConfig", generationConfig);
            
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Make API call
            String url = apiUrl + "?key=" + apiKey;
            HttpEntity<String> entity = new HttpEntity<>(gson.toJson(requestBody), headers);
            
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            
            // Parse response
            JsonObject responseJson = gson.fromJson(response.getBody(), JsonObject.class);
            
            if (responseJson.has("candidates")) {
                JsonArray candidates = responseJson.getAsJsonArray("candidates");
                if (candidates.size() > 0) {
                    JsonObject candidate = candidates.get(0).getAsJsonObject();
                    JsonObject contentObj = candidate.getAsJsonObject("content");
                    JsonArray partsArray = contentObj.getAsJsonArray("parts");
                    if (partsArray.size() > 0) {
                        JsonObject partObj = partsArray.get(0).getAsJsonObject();
                        return partObj.get("text").getAsString().trim();
                    }
                }
            }
            
            throw new RuntimeException("Invalid response from Gemini API");
            
        } catch (Exception e) {
            log.error("Error calling Gemini API: {}", e.getMessage());
            throw new RuntimeException("Failed to call Gemini API", e);
        }
    }

    private String generateFallbackExplanation(User user1, User user2, int compatibilityScore,
                                               int commonSkills, int commonInterests) {
        StringBuilder explanation = new StringBuilder();
        
        explanation.append(user1.getFullName()).append(" and ").append(user2.getFullName());
        explanation.append(" have a ").append(compatibilityScore).append("% compatibility score. ");
        
        if (commonSkills > 0) {
            explanation.append("They share ").append(commonSkills)
                    .append(" technical skill").append(commonSkills > 1 ? "s" : "")
                    .append(", enabling effective collaboration. ");
        }
        
        if (commonInterests > 0) {
            explanation.append("With ").append(commonInterests)
                    .append(" common interest").append(commonInterests > 1 ? "s" : "")
                    .append(", they're likely to work well on similar project types. ");
        }
        
        if (user1.getTimezone() != null && user1.getTimezone().equals(user2.getTimezone())) {
            explanation.append("Being in the same timezone facilitates real-time collaboration. ");
        }
        
        if (user1.getHoursPerWeek() != null && user2.getHoursPerWeek() != null && 
                user1.getHoursPerWeek().equals(user2.getHoursPerWeek())) {
            explanation.append("Their matching availability ensures consistent project momentum.");
        }
        
        return explanation.toString();
    }

    @Override
    public List<String> getSkillRecommendations(Long userId) {
        log.info("Getting skill recommendations for user {} (stub implementation)", userId);
        // TODO: Implement actual Gemini API call
        return new ArrayList<>();
    }

    @Override
    public String enhanceProjectDescription(String originalDescription) {
        log.info("Enhancing project description (stub implementation)");
        // TODO: Implement actual Gemini API call
        return originalDescription;
    }
}
