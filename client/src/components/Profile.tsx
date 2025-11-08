"use client";

interface ProfileProps {
  user?: {
    name?: string;
    email?: string;
    picture?: string;
    email_verified?: boolean;
  };
}

export default function Profile({ user }: ProfileProps) {
  if (!user) {
    return (
      <div className="loading-state">
        <div className="loading-text">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name || "User profile"}
            className="profile-picture"
          />
        )}
        <div className="profile-info">
          <h2 className="profile-name">{user.name || "Anonymous User"}</h2>
          <p className="profile-email">{user.email}</p>
          {user.email_verified && (
            <span className="verified-badge">✓ Verified</span>
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
      </div>
    </div>
  );
}
