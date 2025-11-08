package com.devcollab.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

/**
 * Skill entity representing technical skills/technologies
 */
@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"users", "projects"})
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SkillCategory category;

    private String description;

    @ManyToMany(mappedBy = "skills")
    private Set<User> users = new HashSet<>();

    @ManyToMany(mappedBy = "requiredSkills")
    private Set<Project> projects = new HashSet<>();

    public enum SkillCategory {
        FRONTEND,
        BACKEND,
        MOBILE,
        DATABASE,
        DEVOPS,
        DESIGN,
        DATA_SCIENCE,
        MACHINE_LEARNING,
        BLOCKCHAIN,
        OTHER
    }
}
