'use client';

import { useEffect, useRef, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  link: string;
}

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      category: 'web',
      image: '/placeholder-project-1.jpg',
      tags: ['Next.js', 'TypeScript', 'Stripe'],
      link: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features.',
      category: 'web',
      image: '/placeholder-project-2.jpg',
      tags: ['React', 'Node.js', 'Socket.io'],
      link: '#',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Modern portfolio design for a creative agency with smooth animations.',
      category: 'design',
      image: '/placeholder-project-3.jpg',
      tags: ['Figma', 'UI/UX', 'Web Design'],
      link: '#',
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Real-time weather tracking app with interactive maps and forecasts.',
      category: 'web',
      image: '/placeholder-project-4.jpg',
      tags: ['React', 'API', 'Tailwind'],
      link: '#',
    },
    {
      id: 5,
      title: 'Mobile App Design',
      description: 'Complete UI/UX design system for a fitness tracking mobile application.',
      category: 'design',
      image: '/placeholder-project-5.jpg',
      tags: ['Figma', 'Mobile', 'UI/UX'],
      link: '#',
    },
    {
      id: 6,
      title: 'Blog Platform',
      description: 'Modern blogging platform with markdown support and SEO optimization.',
      category: 'web',
      image: '/placeholder-project-6.jpg',
      tags: ['Next.js', 'MDX', 'SEO'],
      link: '#',
    },
  ];

  const categories = ['all', 'web', 'design'];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-purple-50 to-blue-50"
    >
      <div className="container-custom">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[var(--color-text)]">
            Featured Projects
          </h2>

          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion
            for creating innovative solutions.
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
                  selectedCategory === category
                    ? 'bg-[var(--color-primary)] text-white shadow-lg'
                    : 'bg-white text-[var(--color-text)] hover:shadow-md'
                }`}
                aria-label={`Filter by ${category}`}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white/50"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Link */}
                  <a
                    href={project.link}
                    className="inline-flex items-center text-[var(--color-primary)] font-semibold hover:gap-2 transition-all group/link"
                    aria-label={`View ${project.title} project`}
                  >
                    View Project
                    <svg
                      className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
