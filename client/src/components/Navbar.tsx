"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <span className="text-black font-bold text-lg">DevCollab.Ai</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                href="/Team"
                className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
              >
                Team
              </Link>
              <Link
                href="/about"
                className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* User Profile / Auth */}
            <div className="flex items-center space-x-4">
              {!isLoading && (
                <>
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-white/30 rounded-full px-3 py-1.5">
                        <img
                          src={user.picture || "/default-avatar.png"}
                          alt={user.name || "User"}
                          className="w-6 h-6 rounded-full border border-black/20"
                        />
                        <span className="text-black text-sm font-medium hidden sm:block">
                          {user.name?.split(" ")[0] || "User"}
                        </span>
                      </div>
                      <Link
                        href="/api/auth/logout"
                        className="bg-black/80 hover:bg-black text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                      >
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/api/auth/login"
                      className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                  )}
                </>
              )}

              {/* Mobile Menu Button */}
              <button className="md:hidden bg-white/30 rounded-full p-2">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-black hover:text-gray-600 transition-colors duration-200 font-medium py-1"
              >
                Home
              </Link>
              <Link
                href="/Team"
                className="text-black hover:text-gray-600 transition-colors duration-200 font-medium py-1"
              >
                Team
              </Link>
              <Link
                href="/about"
                className="text-black hover:text-gray-600 transition-colors duration-200 font-medium py-1"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-black hover:text-gray-600 transition-colors duration-200 font-medium py-1"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
