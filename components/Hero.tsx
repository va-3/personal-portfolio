'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 pt-16"
    >
      <div className="container-custom">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[var(--color-text)]">
            Hi, I'm{' '}
            <span className="text-[var(--color-primary)]">John Doe</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8">
            Full-Stack Developer & UI/UX Designer
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            I create beautiful, functional, and user-centered digital experiences
            that solve real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToProjects}
              className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="View My Work"
            >
              View My Work
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-white text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-xl font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="Get In Touch"
            >
              Get In Touch
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-[var(--color-primary)]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
