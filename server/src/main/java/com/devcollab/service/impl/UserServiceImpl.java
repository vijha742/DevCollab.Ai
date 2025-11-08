package com.devcollab.service.impl;

import com.devcollab.dto.request.UpdateUserRequest;
import com.devcollab.dto.response.UserResponse;
import com.devcollab.exception.ResourceNotFoundException;
import com.devcollab.mapper.UserMapper;
import com.devcollab.model.Skill;
import com.devcollab.model.User;
import com.devcollab.repository.UserRepository;
import com.devcollab.service.SkillService;
import com.devcollab.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Implementation of UserService
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final SkillService skillService;
    private final UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        log.info("Fetching user with ID: {}", id);
        User user = getUserEntityById(id);
        return userMapper.toResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserByEmail(String email) {
        log.info("Fetching user with email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        log.info("Updating user with ID: {}", id);

        User user = getUserEntityById(id);

        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }
        if (request.getGithubUsername() != null) {
            user.setGithubUsername(request.getGithubUsername());
        }
        if (request.getLinkedinUrl() != null) {
            user.setLinkedinUrl(request.getLinkedinUrl());
        }
        if (request.getExperienceLevel() != null) {
            user.setExperienceLevel(request.getExperienceLevel());
        }
        if (request.getTimezone() != null) {
            user.setTimezone(request.getTimezone());
        }
        if (request.getHoursPerWeek() != null) {
            user.setHoursPerWeek(request.getHoursPerWeek());
        }
        if (request.getInterests() != null) {
            user.setInterests(request.getInterests());
        }
        if (request.getSkillIds() != null) {
            Set<Skill> skills = request.getSkillIds().stream()
                    .map(skillService::getSkillEntityById)
                    .collect(Collectors.toSet());
            user.setSkills(skills);
        }

        User updatedUser = userRepository.save(user);
        log.info("User updated successfully");
        return userMapper.toResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        log.info("Deactivating user with ID: {}", id);
        User user = getUserEntityById(id);
        user.setActive(false);
        userRepository.save(user);
        log.info("User deactivated successfully");
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllActiveUsers() {
        log.info("Fetching all active users");
        return userRepository.findByActiveTrue().stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse syncGitHubSkills(Long userId) {
        log.info("Syncing GitHub skills for user ID: {}", userId);
        // TODO: Implement GitHub skills synchronization
        // This will be implemented when GitHubService is complete
        User user = getUserEntityById(userId);
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse enrichProfileWithAI(Long userId) {
        log.info("Enriching profile with AI for user ID: {}", userId);
        // TODO: Implement AI-based profile enrichment
        // This will be implemented when GeminiService is complete
        User user = getUserEntityById(userId);
        return userMapper.toResponse(user);
    }
}
