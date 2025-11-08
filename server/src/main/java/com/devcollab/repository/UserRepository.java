package com.devcollab.repository;

import com.devcollab.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByGithubUsername(String githubUsername);
    
    Optional<User> findByProviderAndProviderId(String provider, String providerId);

    List<User> findByActiveTrue();

    @Query("SELECT u FROM User u JOIN u.skills s WHERE s.id IN :skillIds AND u.active = true")
    List<User> findBySkillIds(@Param("skillIds") List<Long> skillIds);

    @Query("SELECT u FROM User u WHERE u.experienceLevel = :experienceLevel AND u.active = true")
    List<User> findByExperienceLevel(@Param("experienceLevel") User.ExperienceLevel experienceLevel);

    @Query("SELECT u FROM User u WHERE u.timezone = :timezone AND u.active = true")
    List<User> findByTimezone(@Param("timezone") String timezone);
}
