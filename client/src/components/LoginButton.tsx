"use client";

export default function LoginButton() {
  return (
    <a href="/api/auth/login" className="button login">
      🔐 Log In with Auth0
    </a>
  );
}
