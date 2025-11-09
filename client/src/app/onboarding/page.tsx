"use client";
import Onboarding from "@/components/Onboarding";
import { useEffect, useState } from "react";

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if profile is already completed
    const profileCompleted = localStorage.getItem("profile_completed");
    if (profileCompleted) {
      // Redirect to teams page if already completed
      window.location.href = "/Team";
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <Onboarding />;
}
