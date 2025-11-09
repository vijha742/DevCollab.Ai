"use client";
import { useEffect, useState } from "react";
import { useBackendAuth } from "@/hooks/useBackendAuth";
import { apiClient, UserResponse } from "@/lib/api";
import { TokenStorage } from "@/lib/tokenStorage";
import Link from "next/link";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading: authLoading, isSynced } = useBackendAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authLoading || !isSynced) return;

      if (!user) {
        window.location.href = "/api/auth/login";
        return;
      }

      try {
        const userData = TokenStorage.getUserData();
        if (!userData?.userId) {
          throw new Error("User ID not found");
        }

        const response = await apiClient.getCurrentUser();
        setUserProfile(response.data);
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, authLoading, isSynced]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error Loading Profile</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-xl mb-4">Profile Not Found</div>
          <Link
            href="/onboarding"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Complete Your Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <div className="flex space-x-3">
              <Link
                href="/onboarding"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Edit Profile
              </Link>
              <Link
                href="/Team"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Browse Teams
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={userProfile.fullName}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
                  />
                ) : (
                  <span>{userProfile.fullName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{userProfile.fullName}</h2>
                <p className="text-white/80 text-lg">{userProfile.email}</p>
                {userProfile.experienceLevel && (
                  <div className="mt-2">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {userProfile.experienceLevel.charAt(0) + userProfile.experienceLevel.slice(1).toLowerCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  {userProfile.bio && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bio</label>
                      <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {userProfile.bio}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {userProfile.timezone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Timezone</label>
                        <p className="mt-1 text-gray-900">{userProfile.timezone}</p>
                      </div>
                    )}

                    {userProfile.hoursPerWeek && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Hours per Week</label>
                        <p className="mt-1 text-gray-900">{userProfile.hoursPerWeek} hours</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-gray-900">
                      {userProfile.createdAt
                        ? new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                        : 'Unknown'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Links & Contact */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Links & Contact</h3>
                <div className="space-y-4">
                  {userProfile.githubUsername && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">GitHub</label>
                      <a
                        href={`https://github.com/${userProfile.githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <span>@{userProfile.githubUsername}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}

                  {userProfile.linkedinUrl && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                      <a
                        href={userProfile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <span>LinkedIn Profile</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{userProfile.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            {userProfile.interests && userProfile.interests.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(userProfile.interests).map((interest, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {userProfile.skills && userProfile.skills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Account Status */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Account Status</h3>
                  <p className="text-sm text-gray-600">
                    Your account is {userProfile.active ? 'active' : 'inactive'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${userProfile.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-sm font-medium ${userProfile.active ? 'text-green-700' : 'text-red-700'}`}>
                    {userProfile.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
