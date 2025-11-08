"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

function Navbar() {
  const { user, isLoading } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

              {/* Creative Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden relative w-10 h-10 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/50 transition-all duration-300 group"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 relative">
                    {/* Animated hamburger lines */}
                    <span
                      className={`absolute left-0 top-1 w-5 h-0.5 bg-black rounded-full transition-all duration-300 transform ${
                        isMobileMenuOpen
                          ? "rotate-45 translate-y-1.5"
                          : "rotate-0 translate-y-0"
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-2.5 w-5 h-0.5 bg-black rounded-full transition-all duration-300 ${
                        isMobileMenuOpen
                          ? "opacity-0 scale-0"
                          : "opacity-100 scale-100"
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-4 w-5 h-0.5 bg-black rounded-full transition-all duration-300 transform ${
                        isMobileMenuOpen
                          ? "-rotate-45 -translate-y-1.5"
                          : "rotate-0 translate-y-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Floating dots effect */}
                <div className="absolute -top-1 -right-1">
                  <div
                    className={`w-2 h-2 bg-black rounded-full transition-all duration-500 ${
                      isMobileMenuOpen
                        ? "scale-0 opacity-0"
                        : "scale-100 opacity-30"
                    }`}
                  ></div>
                </div>
                <div className="absolute -bottom-1 -left-1">
                  <div
                    className={`w-1.5 h-1.5 bg-black rounded-full transition-all duration-700 ${
                      isMobileMenuOpen
                        ? "scale-0 opacity-0"
                        : "scale-100 opacity-20"
                    }`}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 mt-4 pt-4 border-t border-white/20"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col space-y-3">
              {/* Mobile nav links with staggered animation */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-black hover:text-gray-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/20 transform ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                Home
              </Link>
              <Link
                href="/Team"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-black hover:text-gray-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/20 transform ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Team
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-black hover:text-gray-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/20 transform ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-black hover:text-gray-600 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/20 transform ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                Contact
              </Link>

              {/* Mobile auth section */}
              <div
                className={`pt-3 border-t border-white/20 transform ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 bg-white/30 rounded-lg px-3 py-2">
                      <img
                        src={user.picture || "/default-avatar.png"}
                        alt={user.name || "User"}
                        className="w-6 h-6 rounded-full border border-black/20"
                      />
                      <span className="text-black text-sm font-medium">
                        {user.name?.split(" ")[0] || "User"}
                      </span>
                    </div>
                    <Link
                      href="/api/auth/logout"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-center"
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="/api/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 block text-center"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
