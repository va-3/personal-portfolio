'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-gray-50 to-purple-50/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--color-text)]"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Projects
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Here are some of my recent projects that showcase my skills and passion
            for creating innovative solutions.
          </motion.p>

          {/* Category Filter */}
          <motion.div
            className="flex justify-center gap-4 mb-12 flex-wrap"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
                  selectedCategory === category
                    ? 'bg-[var(--color-primary)] text-white shadow-elevation-high'
                    : 'bg-white/80 backdrop-blur-sm text-[var(--color-text)] hover:shadow-elevation-medium border border-gray-200'
                }`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                aria-label={`Filter by ${category}`}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Separate ProjectCard component for 3D tilt effect
function ProjectCard({ 
  project, 
  index, 
  prefersReducedMotion 
}: { 
  project: Project; 
  index: number;
  prefersReducedMotion: boolean;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXVal = ((y - centerY) / centerY) * -10;
    const rotateYVal = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut" as const,
          },
        },
      }}
      style={prefersReducedMotion ? {} : {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-elevation-medium hover:shadow-elevation-high transition-all duration-500 border border-white/50">
        {/* Glassmorphic overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-2xl`} />
        
        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isHovered && !prefersReducedMotion ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
          
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered && !prefersReducedMotion ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Project Content */}
        <div className="p-6 relative z-20">
          <h3 className="text-xl font-bold mb-2 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
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
                className="px-3 py-1 bg-gray-100/80 backdrop-blur-sm text-gray-700 text-sm rounded-full border border-gray-200/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Link */}
          <motion.a
            href={project.link}
            className="inline-flex items-center text-[var(--color-primary)] font-semibold group/link"
            whileHover={prefersReducedMotion ? {} : { x: 5 }}
            aria-label={`View ${project.title} project`}
          >
            View Project
            <motion.svg
              className="w-4 h-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              animate={isHovered && !prefersReducedMotion ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </motion.svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
