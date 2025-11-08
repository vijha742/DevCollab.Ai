"use client";
import React, { useState, useEffect } from "react";

function TeamSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample skills data
  const availableSkills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "TypeScript",
    "Java",
    "Angular",
    "Vue.js",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "C++",
    "C#",
    ".NET",
    "Django",
    "Flask",
    "Spring Boot",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Git",
    "Jenkins",
    "CI/CD",
    "Machine Learning",
    "Data Science",
    "AI",
    "DevOps",
    "UI/UX",
    "Figma",
    "Adobe XD",
  ];

  // Sample user data
  const sampleUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Full Stack Developer",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
      experience: "3 years",
      location: "San Francisco, CA",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      bio: "Passionate full-stack developer with expertise in modern web technologies.",
      rating: 4.8,
      projects: 15,
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Developer",
      skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
      experience: "5 years",
      location: "New York, NY",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "Experienced backend developer specializing in scalable systems.",
      rating: 4.9,
      projects: 28,
    },
    {
      id: 3,
      name: "Carol Davis",
      role: "Frontend Developer",
      skills: ["React", "TypeScript", "Vue.js", "CSS", "Figma"],
      experience: "4 years",
      location: "Austin, TX",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      bio: "Creative frontend developer with a passion for user experience.",
      rating: 4.7,
      projects: 22,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
      experience: "6 years",
      location: "Seattle, WA",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "DevOps specialist focused on automation and infrastructure.",
      rating: 4.8,
      projects: 31,
    },
    {
      id: 5,
      name: "Emma Brown",
      role: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "UI/UX", "Prototyping", "Design Systems"],
      experience: "3 years",
      location: "Los Angeles, CA",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
      bio: "Designer creating intuitive and beautiful user experiences.",
      rating: 4.9,
      projects: 18,
    },
    {
      id: 6,
      name: "Frank Miller",
      role: "Mobile Developer",
      skills: ["React Native", "Swift", "Kotlin", "JavaScript", "Firebase"],
      experience: "4 years",
      location: "Chicago, IL",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      bio: "Mobile app developer building cross-platform solutions.",
      rating: 4.6,
      projects: 20,
    },
    {
      id: 7,
      name: "Grace Lee",
      role: "Data Scientist",
      skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "SQL"],
      experience: "5 years",
      location: "Boston, MA",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      bio: "Data scientist turning complex data into actionable insights.",
      rating: 4.8,
      projects: 25,
    },
    {
      id: 8,
      name: "Henry Clark",
      role: "Cloud Architect",
      skills: ["AWS", "Azure", "GCP", "Terraform", "Docker", "Kubernetes"],
      experience: "7 years",
      location: "Denver, CO",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
      bio: "Cloud architect designing scalable and secure cloud solutions.",
      rating: 4.9,
      projects: 35,
    },
  ];

  // Filter users based on search query and selected skills
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = sampleUsers;

      // Filter by search query
      if (searchQuery.trim()) {
        filtered = filtered.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.skills.some((skill) =>
              skill.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
      }

      // Filter by selected skills
      if (selectedSkills.length > 0) {
        filtered = filtered.filter((user) =>
          selectedSkills.every((skill) =>
            user.skills.some(
              (userSkill) => userSkill.toLowerCase() === skill.toLowerCase()
            )
          )
        );
      }

      setFilteredUsers(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedSkills]);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
  };

  return (
    <div
      className="bg-white"
      style={{
        backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
      `,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Find Your Perfect Team
          </h1>
          <p className="text-lg text-gray-600">
            Search and connect with talented developers and designers
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, role, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-1 border-black rounded-lg leading-5 bg-white/10 backdrop-blur-md text-black placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Skills Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">
              Filter by Skills
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Clear all filters
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border-1 ${
                  selectedSkills.includes(skill)
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black hover:bg-gray-100"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {selectedSkills.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected skills ({selectedSkills.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-black border border-black"
                  >
                    {skill}
                    <button
                      onClick={() => toggleSkill(skill)}
                      className="ml-2 text-black hover:text-gray-600 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading
              ? "Searching..."
              : `Found ${filteredUsers.length} team members`}
          </p>
        </div>

        {/* User Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white border-1 border-black rounded-lg p-6 animate-pulse"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-black">
              No team members found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white border-1 border-black rounded-lg hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-1 border-black"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-black">
                      {user.name}
                    </h3>
                    <p className="text-gray-600">{user.role}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{user.bio}</p>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-200 text-black rounded text-xs border border-gray-400"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 text-black rounded text-xs border border-gray-400">
                        +{user.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>📍 {user.location}</span>
                  <span>⭐ {user.rating}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>💼 {user.experience}</span>
                  <span>🚀 {user.projects} projects</span>
                </div>

                <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 border-1 border-black">
                  Connect
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamSearchPage;
