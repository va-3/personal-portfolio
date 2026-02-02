'use client';

import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skills = [
    'React & Next.js',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'UI/UX Design',
    'Figma',
    'PostgreSQL',
    'API Development',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--color-text)]">
            About Me
          </h2>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image/Visual */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  {/* Placeholder for profile image */}
                  <div className="w-3/4 h-3/4 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-1/2 h-1/2 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-text)]">
                Passionate Developer & Designer
              </h3>
              
              <div className="space-y-4 text-lg text-gray-700 mb-8">
                <p>
                  With over 5 years of experience in web development, I specialize
                  in creating intuitive and engaging digital experiences that
                  blend aesthetics with functionality.
                </p>
                <p>
                  I'm passionate about clean code, user-centered design, and
                  staying at the forefront of modern web technologies. My goal is
                  to build products that make a difference.
                </p>
              </div>

              {/* Skills Grid */}
              <div>
                <h4 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
                  Skills & Technologies
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg text-[var(--color-text)] font-medium hover:shadow-md transition-shadow"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
