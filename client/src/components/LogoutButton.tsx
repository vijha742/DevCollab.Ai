"use client";

import { TokenStorage } from "@/lib/tokenStorage";
import { apiClient } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Get user data to call backend logout
      const userData = TokenStorage.getUserData();

      if (userData) {
        // Logout from backend
        await apiClient.logout(userData.userId).catch(err => {
          console.error('Backend logout failed:', err);
        });
      }

      // Clear local tokens
      TokenStorage.clearTokens();

      // Redirect to Auth0 logout endpoint
      router.push('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: use window.location for hard redirect
      window.location.href = '/api/auth/logout';
    }
  };

  return (
    <button onClick={handleLogout} className="button logout">
      Log Out
    </button>
  );
}
