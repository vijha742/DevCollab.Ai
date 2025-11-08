package com.devcollab.service.impl;

import com.devcollab.dto.response.SkillResponse;
import com.devcollab.exception.ResourceAlreadyExistsException;
import com.devcollab.exception.ResourceNotFoundException;
import com.devcollab.mapper.SkillMapper;
import com.devcollab.model.Skill;
import com.devcollab.repository.SkillRepository;
import com.devcollab.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Implementation of SkillService
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    @Override
    @Transactional(readOnly = true)
    public List<SkillResponse> getAllSkills() {
        log.info("Fetching all skills");
        return skillRepository.findAll().stream()
                .map(skillMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SkillResponse getSkillById(Long id) {
        log.info("Fetching skill with ID: {}", id);
        Skill skill = getSkillEntityById(id);
        return skillMapper.toResponse(skill);
    }

    @Override
    @Transactional(readOnly = true)
    public Skill getSkillEntityById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SkillResponse> getSkillsByCategory(Skill.SkillCategory category) {
        log.info("Fetching skills by category: {}", category);
        return skillRepository.findByCategory(category).stream()
                .map(skillMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SkillResponse> searchSkills(String query) {
        log.info("Searching skills with query: {}", query);
        return skillRepository.findByNameContainingIgnoreCase(query).stream()
                .map(skillMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SkillResponse createSkill(String name, Skill.SkillCategory category, String description) {
        log.info("Creating new skill: {}", name);

        if (skillRepository.existsByName(name)) {
            throw new ResourceAlreadyExistsException("Skill with name " + name + " already exists");
        }

        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        skill.setDescription(description);

        Skill savedSkill = skillRepository.save(skill);
        log.info("Skill created successfully with ID: {}", savedSkill.getId());
        return skillMapper.toResponse(savedSkill);
    }

    @Override
    public Set<Skill> getOrCreateSkills(Set<String> skillNames) {
        log.info("Getting or creating skills: {}", skillNames);
        Set<Skill> skills = new HashSet<>();

        for (String skillName : skillNames) {
            Skill skill = skillRepository.findByName(skillName)
                    .orElseGet(() -> {
                        Skill newSkill = new Skill();
                        newSkill.setName(skillName);
                        newSkill.setCategory(Skill.SkillCategory.OTHER);
                        return skillRepository.save(newSkill);
                    });
            skills.add(skill);
        }

        return skills;
    }
}
