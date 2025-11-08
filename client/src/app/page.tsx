import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="app-container">
      <div className="main-card-wrapper">
        <img
          src="https://cdn.auth0.com/website/auth0-logo-dark.svg"
          alt="Auth0 Logo"
          className="auth0-logo"
        />
        <h1 className="main-title">DevCollab.Ai</h1>
        <p className="subtitle">Secure Authentication with Next.js + Auth0</p>

        <div className="action-card">
          {user ? (
            <div className="logged-in-section">
              <p className="logged-in-message">
                <span>🎉</span> Welcome back! You're successfully authenticated.
              </p>
              <Profile user={user} />
              <div className="button-group">
                <LogoutButton />
              </div>
            </div>
          ) : (
            <div className="login-section">
              <h2 className="welcome-title">Welcome to DevCollab.Ai</h2>
              <p className="action-text">
                🚀 Ready to start collaborating? Sign in with your Auth0 account
                to access your personalized dashboard and connect with other
                developers.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure Authentication</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">👥</span>
                  <span>Team Collaboration</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Fast Development</span>
                </div>
              </div>
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
