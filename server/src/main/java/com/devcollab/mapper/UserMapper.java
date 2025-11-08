package com.devcollab.mapper;

import com.devcollab.dto.response.UserResponse;
import com.devcollab.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

/**
 * Mapper for User entity and DTOs
 */
@Component
@RequiredArgsConstructor
public class UserMapper {

    private final SkillMapper skillMapper;

    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setBio(user.getBio());
        response.setGithubUsername(user.getGithubUsername());
        response.setLinkedinUrl(user.getLinkedinUrl());
        response.setTimezone(user.getTimezone());
        response.setHoursPerWeek(user.getHoursPerWeek());
        response.setExperienceLevel(user.getExperienceLevel());
        response.setInterests(user.getInterests());
        response.setActive(user.getActive());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());

        if (user.getSkills() != null) {
            response.setSkills(user.getSkills().stream()
                    .map(skillMapper::toResponse)
                    .collect(Collectors.toSet()));
        }

        return response;
    }
}
