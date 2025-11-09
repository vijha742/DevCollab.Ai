"use client";
import React from "react";
import Navbar from "./Navbar";

interface UserProfile {
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
  extendedBio: string;
  github: string;
  linkedin: string;
  twitter: string;
}

interface ProfileViewProps {
  profile: UserProfile;
  onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onEdit }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <Navbar />
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

      <div className="relative md:mt-20 z-10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6 border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
              <button
                onClick={onEdit}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            {/* Basic Info */}
            <div className="flex items-start space-x-6">
              <img
                src={
                  profile.profilePic ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600 mb-2">{profile.email}</p>
                <p className="text-gray-600 mb-4">{profile.experienceLevel}</p>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills & Interests */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Skills & Interests
              </h3>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-black text-white px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Social Profiles
              </h3>

              <div className="space-y-3">
                {profile.github && (
                  <a
                    href={`https://github.com/${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-900 font-medium">GitHub:</span>
                    <span className="text-gray-600">@{profile.github}</span>
                  </a>
                )}

                {profile.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-900 font-medium">LinkedIn:</span>
                    <span className="text-gray-600">@{profile.linkedin}</span>
                  </a>
                )}

                {profile.twitter && (
                  <a
                    href={`https://twitter.com/${profile.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-900 font-medium">Twitter:</span>
                    <span className="text-gray-600">@{profile.twitter}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Projects */}
          {profile.projects.length > 0 && profile.projects[0].name && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 mt-6 border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Projects</h3>
              <div className="grid gap-4">
                {profile.projects
                  .filter((project) => project.name)
                  .map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {project.name}
                          </h4>
                          <p className="text-gray-600 mt-1">
                            {project.description}
                          </p>
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors ml-4"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Extended Bio */}
          {profile.extendedBio && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 mt-6 border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About Me</h3>
              <p className="text-gray-700 leading-relaxed">
                {profile.extendedBio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
