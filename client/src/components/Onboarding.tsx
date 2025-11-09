"use client";
import React, { useState, useEffect } from "react";
import { apiClient, ExperienceLevel, OnboardingRequest } from "@/lib/api";
import { TokenStorage } from "@/lib/tokenStorage";

interface UserProfile {
  // Step 1 data
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  gender: string;
  age: string;
  profilePic: string;
  experienceLevel: string;
  interests: string[];
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    link: string;
  }>;
  // Step 2 data
  extendedBio: string;
  github: string;
  linkedin: string;
  twitter: string;
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    gender: "",
    age: "",
    profilePic: "",
    experienceLevel: "",
    interests: [],
    skills: [],
    projects: [{ name: "", description: "", link: "" }],
    extendedBio: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  // Check if we're editing an existing profile
  useEffect(() => {
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error("Error parsing saved profile:", error);
      }
    }
  }, []);

  const interestOptions = [
    "Fintech",
    "Healthtech",
    "Edtech",
    "E-commerce",
    "Gaming",
    "AI/ML",
    "Blockchain",
    "IoT",
    "Cybersecurity",
    "SaaS",
    "Mobile Apps",
    "Web Development",
  ];

  const skillOptions = [
    "React",
    "Python",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Next.js",
    "Vue.js",
    "Angular",
    "Java",
    "C++",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Flutter",
    "React Native",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Firebase",
  ];

  const experienceLevels = [
    "Beginner (0-1 years)",
    "Intermediate (1-3 years)",
    "Advanced (3-5 years)",
    "Expert (5+ years)",
  ];

  const addProject = () => {
    setProfile({
      ...profile,
      projects: [...profile.projects, { name: "", description: "", link: "" }],
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = profile.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setProfile({ ...profile, projects: updatedProjects });
  };

  const removeProject = (index: number) => {
    if (profile.projects.length > 1) {
      const updatedProjects = profile.projects.filter((_, i) => i !== index);
      setProfile({ ...profile, projects: updatedProjects });
    }
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const mapExperienceLevel = (level: string): ExperienceLevel => {
    if (level.includes("Beginner")) return "BEGINNER";
    if (level.includes("Intermediate")) return "INTERMEDIATE";
    if (level.includes("Advanced")) return "ADVANCED";
    if (level.includes("Expert")) return "EXPERT";
    return "BEGINNER";
  };

  const handleSubmit = async () => {
    try {
      // Get user ID from TokenStorage (backend sync)
      const userData = TokenStorage.getUserData();

      if (!userData?.userId) {
        alert("User ID not found. Please login again.");
        window.location.href = "/api/auth/login";
        return;
      }

      // Validate required fields
      if (!profile.firstName || !profile.lastName || !profile.email || !profile.bio || !profile.experienceLevel) {
        alert("Please fill in all required fields (Name, Email, Bio, Experience Level)");
        return;
      }

      if (profile.interests.length === 0) {
        alert("Please select at least one interest");
        return;
      }

      // Prepare onboarding request
      const fullName = `${profile.firstName} ${profile.lastName}`.trim();
      const combinedBio = profile.extendedBio
        ? `${profile.bio}\n\n${profile.extendedBio}`
        : profile.bio;

      const onboardingData: OnboardingRequest = {
        fullName,
        email: profile.email,
        bio: combinedBio,
        experienceLevel: mapExperienceLevel(profile.experienceLevel),
        githubUsername: profile.github || undefined,
        linkedinUrl: profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : undefined,
        profilePicture: profile.profilePic || undefined,
        timezone: undefined, // Can be added to form if needed
        hoursPerWeek: undefined, // Can be added to form if needed
        interests: profile.interests,
        skillNames: profile.skills.length > 0 ? profile.skills : undefined,
      };

      console.log("Submitting onboarding data:", onboardingData);

      // Send data to backend
      const response = await apiClient.completeOnboarding(userData.userId, onboardingData);

      console.log("Onboarding response:", response);

      // Mark profile as completed in localStorage
      localStorage.setItem("profile_completed", "true");

      // Save the complete profile data
      localStorage.setItem("user_profile", JSON.stringify(profile));

      // Store updated user data
      if (response.data) {
        localStorage.setItem("user_data", JSON.stringify(response.data));
      }

      // Show success message
      alert("Profile completed successfully!");

      // Redirect to the main app
      window.location.href = "/Team";
    } catch (error: any) {
      console.error("Error completing onboarding:", error);
      alert(`Failed to complete onboarding: ${error.message || "Unknown error"}`);
    }
  };

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

      <div className="relative z-10 flex items-center justify-center p-4 min-h-screen py-8">
        <div className="max-w-4xl w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                  }`}
              >
                1
              </div>
              <div
                className={`w-20 h-1 ${currentStep >= 2 ? "bg-black" : "bg-gray-200"
                  }`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                  }`}
              >
                2
              </div>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentStep === 1 ? "Basic Information" : "Social & Bio"}
              </h2>
              <p className="text-gray-600">
                {currentStep === 1
                  ? "Let's get to know you better"
                  : "Connect your social profiles"}
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email and Age */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={profile.age}
                      onChange={(e) =>
                        setProfile({ ...profile, age: e.target.value })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="25"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Bio *
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Tell us about yourself in a few sentences..."
                  />
                </div>

                {/* Profile Picture URL */}
                <div>
                  <label className="block text-gray-800 text-sm font-medium text-gray-700 mb-2">
                    Profile Picture URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={profile.profilePic}
                    onChange={(e) =>
                      setProfile({ ...profile, profilePic: e.target.value })
                    }
                    className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                  {profile.profilePic && (
                    <div className="mt-2">
                      <img
                        src={profile.profilePic}
                        alt="Profile preview"
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Gender and Experience Level */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={profile.gender}
                      onChange={(e) =>
                        setProfile({ ...profile, gender: e.target.value })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <select
                      value={profile.experienceLevel}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          experienceLevel: e.target.value,
                        })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() =>
                          setProfile({
                            ...profile,
                            interests: toggleArrayItem(
                              profile.interests,
                              interest
                            ),
                          })
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${profile.interests.includes(interest)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() =>
                          setProfile({
                            ...profile,
                            skills: toggleArrayItem(profile.skills, skill),
                          })
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${profile.skills.includes(skill)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Projects
                    </label>
                    <button
                      type="button"
                      onClick={addProject}
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
                    >
                      Add Project
                    </button>
                  </div>
                  <div className="space-y-4">
                    {profile.projects.map((project, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex text-gray-800 justify-between items-center mb-3">
                          <h4 className="text-gray-800 font-medium">
                            Project {index + 1}
                          </h4>
                          {profile.projects.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeProject(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <input
                            type="text"
                            value={project.name}
                            onChange={(e) =>
                              updateProject(index, "name", e.target.value)
                            }
                            placeholder="Project name"
                            className="w-full text-gray-800 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                          <textarea
                            value={project.description}
                            onChange={(e) =>
                              updateProject(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Project description"
                            rows={2}
                            className="w-full text-gray-800 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                          <input
                            type="url"
                            value={project.link}
                            onChange={(e) =>
                              updateProject(index, "link", e.target.value)
                            }
                            placeholder="Project link (GitHub, demo, etc.)"
                            className="w-full text-gray-800 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Extended Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Extended Bio
                  </label>
                  <textarea
                    value={profile.extendedBio}
                    onChange={(e) =>
                      setProfile({ ...profile, extendedBio: e.target.value })
                    }
                    rows={5}
                    className="w-full text-gray-800  p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Tell us more about your background, goals, and what you're passionate about..."
                  />
                </div>

                {/* Social Media Handles */}
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Username
                    </label>
                    <input
                      type="text"
                      value={profile.github}
                      onChange={(e) =>
                        setProfile({ ...profile, github: e.target.value })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your GitHub username"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      e.g., "johndoe" for github.com/johndoe
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Username
                    </label>
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) =>
                        setProfile({ ...profile, linkedin: e.target.value })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your LinkedIn username"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      e.g., "johndoe" for linkedin.com/in/johndoe
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter/X Username (Optional)
                    </label>
                    <input
                      type="text"
                      value={profile.twitter}
                      onChange={(e) =>
                        setProfile({ ...profile, twitter: e.target.value })
                      }
                      className="w-full text-gray-800 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter your Twitter/X username"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      e.g., "johndoe" for twitter.com/johndoe
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium ${currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Previous
              </button>

              {currentStep < 2 ? (
                <button
                  onClick={handleNext}
                  className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800"
                >
                  Complete Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
