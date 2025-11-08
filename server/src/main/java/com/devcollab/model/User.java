package com.devcollab.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * User entity representing a developer on the platform
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"skills", "createdProjects", "joinedProjects", "sentMatches", "receivedMatches"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email; // Nullable for GitHub users without public email

    @Column
    private String password; // Nullable for OAuth users

    @Column(nullable = false)
    private String fullName;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String githubUsername;

    private String linkedinUrl;

    // OAuth fields
    private String provider; // "google", "github", "auth0", "local"
    
    private String providerId; // Unique ID from OAuth provider
    
    private String profilePicture;

    private String timezone;

    @Column(name = "hours_per_week")
    private Integer hoursPerWeek;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExperienceLevel experienceLevel;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_interests", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "interest")
    private Set<String> interests = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_skills",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skills = new HashSet<>();

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    private Set<Project> createdProjects = new HashSet<>();

    @ManyToMany(mappedBy = "teamMembers")
    private Set<Project> joinedProjects = new HashSet<>();

    @OneToMany(mappedBy = "requester", cascade = CascadeType.ALL)
    private Set<Match> sentMatches = new HashSet<>();

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    private Set<Match> receivedMatches = new HashSet<>();

    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum ExperienceLevel {
        BEGINNER,
        INTERMEDIATE,
        ADVANCED,
        EXPERT
    }
}
