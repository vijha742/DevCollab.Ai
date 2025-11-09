"use client";

import { useBackendAuth } from "@/hooks/useBackendAuth";
import { TokenStorage } from "@/lib/tokenStorage";
import Profile from "@/components/Profile";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
    const { user, isLoading, error, isSynced } = useBackendAuth();

    if (isLoading) {
        return (
            <div className="container">
                <div className="loading-state">
                    <div className="loading-text">Authenticating...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error-state">
                    <h2>Authentication Error</h2>
                    <p>{error.toString()}</p>
                    <a href="/api/auth/login" className="button">
                        Try Again
                    </a>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container">
                <h1>Please log in</h1>
                <a href="/api/auth/login" className="button">
                    Log In
                </a>
            </div>
        );
    }

    const backendUser = TokenStorage.getUserData();

    return (
        <div className="container">
            <h1>Dashboard</h1>

            <div className="auth-status">
                <div className="status-item">
                    <span className="label">Auth0 Status:</span>
                    <span className="value success">✓ Authenticated</span>
                </div>
                <div className="status-item">
                    <span className="label">Backend Status:</span>
                    <span className={`value ${isSynced ? 'success' : 'warning'}`}>
                        {isSynced ? '✓ Synced' : '⚠ Not Synced'}
                    </span>
                </div>
                {backendUser && (
                    <div className="status-item">
                        <span className="label">Backend User ID:</span>
                        <span className="value">{backendUser.userId}</span>
                    </div>
                )}
            </div>

            <Profile user={user} />

            <div className="actions">
                <LogoutButton />
            </div>

            {isSynced && (
                <div className="info-box">
                    <h3>🎉 You're all set!</h3>
                    <p>
                        Your Auth0 authentication is now synced with the backend.
                        All API calls will use the JWT token issued by the backend server.
                    </p>
                    <p>
                        The backend has verified your Auth0 credentials and created/updated
                        your user account with ID: <strong>{backendUser?.userId}</strong>
                    </p>
                </div>
            )}
        </div>
    );
}
