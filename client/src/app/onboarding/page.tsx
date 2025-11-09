"use client";
import Onboarding from "@/components/Onboarding";
import { useEffect, useState } from "react";
import { useBackendAuth } from "@/hooks/useBackendAuth";

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading, isSynced } = useBackendAuth();

  useEffect(() => {
    // Wait for auth to complete
    if (authLoading) {
      return;
    }

    // Check if user is authenticated
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = "/api/auth/login";
      return;
    }

    // Check if profile is already completed
    const profileCompleted = localStorage.getItem("profile_completed");
    if (profileCompleted) {
      // Redirect to teams page if already completed
      window.location.href = "/Team";
    } else {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  // Show loading spinner while authenticating or checking profile
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">
            {authLoading ? "Authenticating..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Show error if not synced with backend
  if (user && !isSynced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Authentication Error</div>
          <p className="text-gray-600 mb-4">
            Failed to sync with backend. Please try logging in again.
          </p>
          <a
            href="/api/auth/logout"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Logout and Try Again
          </a>
        </div>
      </div>
    );
  }

  return <Onboarding />;
}
