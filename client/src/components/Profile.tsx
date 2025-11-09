"use client";

import { useBackendAuth } from "@/hooks/useBackendAuth";
import { TokenStorage } from "@/lib/tokenStorage";

interface ProfileProps {
  user?: {
    name?: string;
    email?: string;
    picture?: string;
    email_verified?: boolean;
  };
}

export default function Profile({ user: initialUser }: ProfileProps) {
  // Use the backend auth hook to ensure sync with backend
  const { user, isLoading, error, isSynced } = useBackendAuth();

  // Get backend user data if available
  const backendUser = TokenStorage.getUserData();

  // Use Auth0 user or initial user
  const displayUser = user || initialUser;

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-text">Loading your profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-text">Error: {error.toString()}</div>
      </div>
    );
  }

  if (!displayUser) {
    return (
      <div className="loading-state">
        <div className="loading-text">No user data available</div>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        {displayUser.picture && (
          <img
            src={displayUser.picture}
            alt={displayUser.name || "User profile"}
            className="profile-picture"
          />
        )}
        <div className="profile-info">
          <h2 className="profile-name">{displayUser.name || "Anonymous User"}</h2>
          <p className="profile-email">{displayUser.email}</p>
          {displayUser.email_verified && (
            <span className="verified-badge">✓ Verified</span>
          )}
          {isSynced && backendUser && (
            <span className="sync-badge">🔗 Synced with Backend (ID: {backendUser.userId})</span>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-label">Status</span>
          <span className="stat-value online">🟢 Online</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Account</span>
          <span className="stat-value">🔒 Secure</span>
        </div>
        {isSynced && (
          <div className="stat-item">
            <span className="stat-label">Backend Auth</span>
            <span className="stat-value">✓ Active</span>
          </div>
        )}
      </div>
    </div>
  );
}
