'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-purple-50/30 to-blue-50/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-[var(--color-text)]"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get In Touch
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Send me a message and I'll get back to you as soon as possible.
          </motion.p>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-elevation-high border border-white/50" noValidate>
              {/* Name Input */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2 text-[var(--color-text)]"
                >
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.name
                      ? 'border-red-500 focus:border-red-600'
                      : focusedField === 'name'
                      ? 'border-[var(--color-primary)] shadow-elevation-medium'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Your name"
                  whileFocus={prefersReducedMotion ? {} : { scale: 1.01 }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <motion.p
                    id="name-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-[var(--color-text)]"
                >
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.email
                      ? 'border-red-500 focus:border-red-600'
                      : focusedField === 'email'
                      ? 'border-[var(--color-primary)] shadow-elevation-medium'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                  whileFocus={prefersReducedMotion ? {} : { scale: 1.01 }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <motion.p
                    id="email-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Subject Input */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold mb-2 text-[var(--color-text)]"
                >
                  Subject
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.subject
                      ? 'border-red-500 focus:border-red-600'
                      : focusedField === 'subject'
                      ? 'border-[var(--color-primary)] shadow-elevation-medium'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="What's this about?"
                  whileFocus={prefersReducedMotion ? {} : { scale: 1.01 }}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <motion.p
                    id="subject-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.subject}
                  </motion.p>
                )}
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2 text-[var(--color-text)]"
                >
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-600'
                      : focusedField === 'message'
                      ? 'border-[var(--color-primary)] shadow-elevation-medium'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Tell me about your project..."
                  whileFocus={prefersReducedMotion ? {} : { scale: 1.01 }}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <motion.p
                    id="message-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-8 py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold shadow-elevation-high disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                whileHover={!isSubmitting && !prefersReducedMotion ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && !prefersReducedMotion ? { scale: 0.98 } : {}}
                aria-label="Send message"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {!isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-800"
                  role="alert"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  ✓ Thank you! Your message has been sent successfully. I'll get back to you soon.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-800"
                  role="alert"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  ✗ {errorMessage || 'Oops! Something went wrong. Please try again later.'}
                </motion.div>
              )}
            </form>

            {/* Contact Info */}
            <motion.div
              className="mt-12 pt-12 border-t-2 border-gray-200/50"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex flex-col md:flex-row justify-center gap-8 text-center md:text-left">
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  <h3 className="font-semibold text-[var(--color-text)] mb-2">Email</h3>
                  <a
                    href="mailto:hello@johndoe.com"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    hello@johndoe.com
                  </a>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  <h3 className="font-semibold text-[var(--color-text)] mb-2">Location</h3>
                  <p className="text-gray-600">San Francisco, CA</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
