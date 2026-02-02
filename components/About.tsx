'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--color-text)]"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About Me
          </motion.h2>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image/Visual */}
            <motion.div
              className="relative"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-3xl overflow-hidden shadow-elevation-high relative group">
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                <div className="w-full h-full flex items-center justify-center relative z-10">
                  {/* Placeholder for profile image */}
                  <motion.div
                    className="w-3/4 h-3/4 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
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
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
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
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      variants={itemVariants}
                      whileHover={prefersReducedMotion ? {} : { 
                        scale: 1.05,
                        boxShadow: "0 4px 12px rgba(147, 51, 234, 0.15)"
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg text-[var(--color-text)] font-medium shadow-sm border border-purple-100/50 cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
