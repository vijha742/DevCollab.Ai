package com.devcollab.controller;

import com.devcollab.dto.response.ApiResponse;
import com.devcollab.dto.response.SkillResponse;
import com.devcollab.model.Skill;
import com.devcollab.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for skill management endpoints
 */
@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@Slf4j
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillResponse>>> getAllSkills() {
        log.info("Get all skills request");
        List<SkillResponse> skills = skillService.getAllSkills();
        return ResponseEntity.ok(ApiResponse.success(skills));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SkillResponse>> getSkillById(@PathVariable Long id) {
        log.info("Get skill request for ID: {}", id);
        SkillResponse skill = skillService.getSkillById(id);
        return ResponseEntity.ok(ApiResponse.success(skill));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> getSkillsByCategory(
            @PathVariable Skill.SkillCategory category) {
        log.info("Get skills by category request: {}", category);
        List<SkillResponse> skills = skillService.getSkillsByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(skills));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> searchSkills(@RequestParam String query) {
        log.info("Search skills request with query: {}", query);
        List<SkillResponse> skills = skillService.searchSkills(query);
        return ResponseEntity.ok(ApiResponse.success(skills));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SkillResponse>> createSkill(
            @RequestParam String name,
            @RequestParam Skill.SkillCategory category,
            @RequestParam(required = false) String description) {
        log.info("Create skill request: {}", name);
        SkillResponse skill = skillService.createSkill(name, category, description);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Skill created successfully", skill));
    }
}
