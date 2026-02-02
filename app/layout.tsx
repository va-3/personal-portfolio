import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'John Doe - Full-Stack Developer & UI/UX Designer',
  description: 'Personal portfolio showcasing modern web development projects and design work. Specializing in React, Next.js, TypeScript, and user-centered design.',
  keywords: ['portfolio', 'web developer', 'UI/UX designer', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'John Doe - Full-Stack Developer & UI/UX Designer',
    description: 'Creating beautiful, functional digital experiences',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
