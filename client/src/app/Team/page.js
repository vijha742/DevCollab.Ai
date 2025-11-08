"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
function TeamSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

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

  const toggleShowAllSkills = () => {
    setShowAllSkills(!showAllSkills);
  };

  // Display limited skills or all skills based on state
  const displayedSkills = showAllSkills
    ? availableSkills
    : availableSkills.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-black/5 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-black/3 rounded-full translate-x-32"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-black/4 rounded-full translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-black/2 rounded-full transform -translate-x-16 -translate-y-16"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Navbar />

        {/* Hero Section */}
        <div className="text-center mb-12 mt-24">
          <h1 className="font-display text-6xl font-black text-transparent bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text mb-6 tracking-tight leading-tight">
            Find Your Perfect Team
          </h1>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Connect with talented developers and designers worldwide
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-black to-transparent mx-auto"></div>
        </div>

        {/* Search and Filter Container */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl shadow-black/5 p-8 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg
                  className="h-6 w-6 text-gray-400"
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
                className="font-inter block w-full pl-16 pr-6 py-4 border-2 border-gray-200 rounded-2xl leading-5 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-300 text-lg font-medium shadow-inner"
              />
            </div>
          </div>

          {/* Skills Filter */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">
              Filter by Skills
            </h3>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap gap-2 flex-1">
                {displayedSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`font-inter px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border-2 transform hover:scale-105 ${
                      selectedSkills.includes(skill)
                        ? "bg-black text-white border-black shadow-lg shadow-black/20"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {/* Dropdown Arrow */}
              <button
                onClick={toggleShowAllSkills}
                className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md group"
                title={showAllSkills ? "Show less skills" : "Show more skills"}
              >
                <svg
                  className={`w-5 h-5 text-gray-600 group-hover:text-black transition-all duration-300 ${
                    showAllSkills ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Filter Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors duration-200 font-medium"
            >
              Clear all filters
            </button>
          </div>

          <div className="text-sm text-gray-600 font-medium">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              `${filteredUsers.length} team member${
                filteredUsers.length !== 1 ? "s" : ""
              } found`
            )}
          </div>
        </div>

        {/* Selected Skills Tags */}
        {selectedSkills.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-4 py-2 rounded-xl text-sm bg-black text-white font-medium shadow-lg shadow-black/20"
                >
                  {skill}
                  <button
                    onClick={() => toggleSkill(skill)}
                    className="ml-2 text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* User Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 animate-pulse shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-lg w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded-lg"></div>
                  <div className="h-3 bg-gray-200 rounded-lg w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded-xl mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200/50 max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-gray-300 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No team members found
              </h3>
              <p className="text-gray-500 font-light">
                Try adjusting your search criteria or filters to discover more
                talent.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="group bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 p-6 hover:scale-105 hover:border-gray-300"
              >
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover border-3 border-gray-200 group-hover:border-black transition-colors duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors duration-300">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {user.role}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed font-light">
                  {user.bio}
                </p>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {user.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs border border-gray-200 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skills.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs border border-gray-200 font-medium">
                        +{user.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <span className="text-gray-500 font-medium">Location</span>
                    <p className="text-gray-900 font-semibold">
                      {user.location.split(",")[0]}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <span className="text-gray-500 font-medium">Rating</span>
                    <p className="text-gray-900 font-semibold">
                      ⭐ {user.rating}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                  <div className="text-center">
                    <span className="text-gray-500 font-medium">
                      Experience
                    </span>
                    <p className="text-gray-900 font-semibold">
                      {user.experience}
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-500 font-medium">Projects</span>
                    <p className="text-gray-900 font-semibold">
                      {user.projects}
                    </p>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transform hover:-translate-y-0.5">
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
