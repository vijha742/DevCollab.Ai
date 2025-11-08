"use client";
import { useEffect, useState } from "react";
import ProfileView from "@/components/ProfileView";
import { useRouter } from "next/navigation";

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

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if profile exists
    const profileCompleted = localStorage.getItem("profile_completed");
    const savedProfile = localStorage.getItem("user_profile");

    if (!profileCompleted || !savedProfile) {
      // Redirect to onboarding if no profile found
      router.push("/onboarding");
    } else {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error("Error parsing profile:", error);
        router.push("/onboarding");
      }
    }
    setIsLoading(false);
  }, [router]);

  const handleEditProfile = () => {
    // Clear completed status and redirect to onboarding for editing
    localStorage.removeItem("profile_completed");
    router.push("/onboarding");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null; // Will redirect to onboarding
  }

  return <ProfileView profile={profile} onEdit={handleEditProfile} />;
}
