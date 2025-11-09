"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);

  useEffect(() => {
    // Check if user has completed profile from localStorage
    const profileCompleted = localStorage.getItem("profile_completed");
    setHasCompletedProfile(!!profileCompleted);
  }, []);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      // Set initial states for all animated elements
      gsap.set("[data-scroll-reveal]", {
        scale: 0,
        opacity: 0,
      });

      // Video container animation with scale 1.25 - follows scroll
      gsap.to(".video-container", {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".video-container",
          start: "top 200%",
          end: "bottom 20%",
          scrub: 1, // Makes animation follow scroll
          toggleActions: "play reverse play reverse",
          // Play on enter, reverse on leave
        },
      });

      // Features header animation
      gsap.to(".features-header", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-header",
          start: "top 80%",
          once: true,
        },
      });

      // Feature cards with staggered animation
      gsap.to(".feature-card", {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".feature-card",
          start: "top 80%",
          once: true,
        },
      });

      // How it works section animations
      gsap.to(".how-it-works-header", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".how-it-works-header",
          start: "top 80%",
          once: true,
        },
      });

      gsap.to(".how-it-works-step", {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".how-it-works-step",
          start: "top 80%",
          once: true,
        },
      });

      // Statistics container animation
      gsap.to(".stats-container", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
          once: true,
        },
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(
            anchor.getAttribute("href") as string
          );
          if (target) {
            gsap.to(window, {
              duration: 1,
              scrollTo: target,
              ease: "power2.out",
            });
          }
        });
      });
    };

    loadGSAP();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-black/5 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-black/3 rounded-full translate-x-32"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-black/4 rounded-full translate-y-40"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-black/2 rounded-full transform -translate-x-16 -translate-y-16"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section - Full viewport height */}
        <section className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-display text-7xl md:text-8xl font-black text-transparent bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text mb-8 tracking-tight leading-tight">
              DevCollab.Ai
            </h1>
            <p className="font-inter text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              The future of collaborative development where AI meets human
              creativity
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/Team"
                className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transform hover:-translate-y-1"
              >
                Explore Teams
              </a>
              <a
                href="#video-section"
                className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300"
              >
                Learn More
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Video Section with scroll animation */}
        <section
          id="video-section"
          className="flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="video-container" data-scroll-reveal>
              <div className="bg-black/20 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl shadow-black/5 p-8">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className=" bg-black/10 flex items-center justify-center">
                    <video
                      className="w-full object-contain"
                      controls
                      autoPlay
                      muted
                      loop
                      poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop"
                    >
                      <source src="/Hero.mp4" type="video/mp4" />
                      {/* Placeholder for when video is not available */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">�</div>
                          <p className="text-gray-600 font-medium">
                            Demo Video Coming Soon
                          </p>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with scroll animation */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Feature Showcase */}
            <div className="features-header mb-20">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Content */}
                <div>
                  <h2 className="font-display text-5xl font-bold text-gray-900 mb-6">
                    DevCollab.Ai is your
                    <br />
                    <span className="text-gray-600">
                      development partner provider
                    </span>
                  </h2>
                  <p className="font-inter text-lg text-gray-600 mb-8 leading-relaxed">
                    Build with people who match your skills and passion. Get
                    AI-powered teammate suggestions based on your tech stack,
                    interests, and working style.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/Team"
                      className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
                    >
                      Start Finding
                    </a>
                    <a
                      href="#how-it-works"
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                {/* Right Side - App Preview */}
                <div className="relative">
                  <div className="relative mx-auto w-80 h-96 bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
                    {/* Mock Phone Interface */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="text-sm font-semibold text-gray-600">
                          DevCollab.Ai
                        </div>
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">⚡</span>
                        </div>
                      </div>

                      {/* Mock Content */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium">
                              React Developer
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            5 years experience • Remote
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">
                              UI/UX Designer
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            3 years experience • Hybrid
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                            <span className="text-sm font-medium">
                              Full Stack Dev
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            7 years experience • On-site
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">🔍</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">👥</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Partners Section */}

            {/* Data Insights Section */}
          </div>
        </section>

        {/* How It Works Section with scroll animation */}
        <section
          id="how-it-works"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            <div
              className="how-it-works-header text-center mb-16"
              data-scroll-reveal
            >
              <h2 className="font-display text-5xl font-bold text-gray-900 mb-6">
                How DevCollab.Ai Works
              </h2>
              <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
                From discovery to deployment—streamline your entire development
                collaboration process
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className="how-it-works-step text-center bg-white rounded-2xl p-8 shadow-sm"
                data-scroll-reveal
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  Create Profile
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Build your developer profile with skills, experience, and
                  project preferences. Our AI learns your collaboration style.
                </p>
              </div>

              <div
                className="how-it-works-step text-center bg-white rounded-2xl p-8 shadow-sm"
                data-scroll-reveal
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  Smart Matching
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  AI analyzes compatibility, work styles, and project
                  requirements to suggest optimal team compositions.
                </p>
              </div>

              <div
                className="how-it-works-step text-center bg-white rounded-2xl p-8 shadow-sm"
                data-scroll-reveal
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  3
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  Start Collaborating
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with teammates through integrated tools, real-time
                  chat, and shared workspaces.
                </p>
              </div>

              <div
                className="how-it-works-step text-center bg-white rounded-2xl p-8 shadow-sm"
                data-scroll-reveal
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  4
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  Track & Improve
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor project progress with analytics and AI-powered
                  insights to continuously improve collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section with scroll animation */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div
              className="stats-container bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl shadow-black/5 p-12"
              data-scroll-reveal
            >
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-black mb-2">10K+</div>
                  <p className="text-gray-600 font-medium">Active Developers</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-black mb-2">500+</div>
                  <p className="text-gray-600 font-medium">
                    Successful Projects
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-black mb-2">50+</div>
                  <p className="text-gray-600 font-medium">Countries</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-black mb-2">95%</div>
                  <p className="text-gray-600 font-medium">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Collaborating?
            </h2>
            <p className="font-inter text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of developers and designers who are already
              building the future together on DevCollab.Ai
            </p>
            {!hasCompletedProfile ? (
              <a
                href="/api/auth/login?returnTo=%2Fonboarding"
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transform hover:-translate-y-1 text-lg"
              >
                Get Started Free
              </a>
            ) : (
              <a
                href="/Team"
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transform hover:-translate-y-1 text-lg"
              >
                Explore Teams
              </a>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                DevCollab.Ai
              </h3>
              <p className="text-gray-600">
                Connecting creators, building the future
              </p>
            </div>
            <div className="flex justify-center space-x-8 mb-8">
              <a
                href="#video-section"
                className="text-gray-600 hover:text-black transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Features
              </a>
              <a
                href="/Team"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Find Teams
              </a>
              <a
                href="/contact"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 DevCollab.Ai. All rights reserved. Built with ❤️ for
              developers.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
