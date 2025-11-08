"use client";
import { auth0 } from "@/lib/auth0";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function Home() {
  // Note: Auth0 session would need to be handled differently in                      {/* Fallback for when video is not available */}
  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4"></div>
      <p className="text-gray-600 font-medium">Hero Video Loading...</p>
    </div>
  </div>;

  // Note: Auth0 session would need to be handled differently in client component
  // For now, we'll use a placeholder
  const user = null; // You'll need to implement proper auth state management

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
          markers: true, // Play on enter, reverse on leave
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
            <div className="features-header mb-16" data-scroll-reveal>
              <div className="text-center">
                <h2 className="font-display text-5xl font-bold text-gray-900 mb-6">
                  AI FIND YOUR GREAT MEMBER WITH AI
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div
                className="feature-card bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 hover:shadow-xl hover:scale-105"
                data-scroll-reveal
              >
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  Smart Search & Filtering
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced search capabilities with AI-powered matching. Filter
                  by skills, experience, location, and project preferences to
                  find your ideal collaborators.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="feature-card bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 hover:shadow-xl hover:scale-105"
                data-scroll-reveal
              >
                <div className="text-4xl mb-4">👥</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  Team Formation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create diverse, high-performing teams with complementary
                  skills. Our AI analyzes compatibility and suggests optimal
                  team compositions.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="feature-card bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 hover:shadow-xl hover:scale-105"
                data-scroll-reveal
              >
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  Secure Authentication
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Enterprise-grade security with Auth0 integration. Your data
                  and connections are protected with industry-leading security
                  standards.
                </p>
              </div>

              {/* Feature 4 */}
              <div
                className="feature-card bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 hover:shadow-xl hover:scale-105"
                data-scroll-reveal
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  Real-time Collaboration
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Instant messaging, video calls, and collaborative workspaces.
                  Work together seamlessly regardless of time zones or
                  locations.
                </p>
              </div>

              {/* Feature 5 */}
              <div
                className="feature-card bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 hover:shadow-xl hover:scale-105"
                data-scroll-reveal
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  Analytics & Insights
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Track project progress, team performance, and collaboration
                  metrics. Data-driven insights to optimize your development
                  workflow.
                </p>
              </div>

              {/* Feature 6 */}
              <div
                className="feature-card bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 hover:shadow-xl hover:scale-105"
                data-scroll-reveal
              >
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  AI-Powered Matching
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Machine learning algorithms analyze skills, work styles, and
                  project requirements to suggest the most compatible team
                  members.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section with scroll animation */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/5">
          <div className="max-w-6xl mx-auto">
            <div
              className="how-it-works-header text-center mb-16"
              data-scroll-reveal
            >
              <h2 className="font-display text-5xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
                Simple steps to start collaborating with amazing developers and
                designers
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="how-it-works-step text-center" data-scroll-reveal>
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                  Sign Up
                </h3>
                <p className="text-gray-600">
                  Create your profile with Auth0 security and showcase your
                  skills and experience
                </p>
              </div>

              <div className="how-it-works-step text-center" data-scroll-reveal>
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                  Discover
                </h3>
                <p className="text-gray-600">
                  Browse through our talented community and use smart filters to
                  find perfect matches
                </p>
              </div>

              <div className="how-it-works-step text-center" data-scroll-reveal>
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                  Connect
                </h3>
                <p className="text-gray-600">
                  Reach out to potential team members and start building
                  meaningful connections
                </p>
              </div>

              <div className="how-it-works-step text-center" data-scroll-reveal>
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                  Collaborate
                </h3>
                <p className="text-gray-600">
                  Work together on amazing projects and bring your innovative
                  ideas to life
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
            {!user ? (
              <a
                href="/api/auth/login"
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
