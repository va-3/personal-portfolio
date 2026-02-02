# Personal Portfolio

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, accessibility compliance (WCAG 2.2 AA), and a clean, professional design.

## Features

- ✅ **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS v4
- ✅ **Fully Responsive**: Mobile-first design that works on all devices
- ✅ **Accessibility**: WCAG 2.2 AA compliant with semantic HTML and ARIA labels
- ✅ **Type-Safe**: TypeScript strict mode with zero `any` types
- ✅ **Smooth Animations**: Intersection Observer animations and hover effects
- ✅ **Contact Form**: Validated contact form with error handling
- ✅ **Backend API**: RESTful API with Convex serverless database
- ✅ **SEO Optimized**: Meta tags, semantic HTML, and performance optimized
- ✅ **Design Tokens**: Centralized design system with custom CSS variables

## Sections

1. **Hero** - Eye-catching landing section with CTA buttons
2. **About** - Personal introduction with skills showcase
3. **Projects** - Filterable project gallery with hover effects
4. **Contact** - Validated contact form with real-time validation
5. **Navigation** - Fixed header with smooth scroll navigation
6. **Footer** - Social links and quick navigation

## Design Tokens

The design uses a consistent token system:

- **Colors**: Primary (#9333EA), Secondary (#3B82F6)
- **Typography**: Inter font family
- **Spacing**: Section padding (80px), Grid gap (24px)
- **Effects**: Border radius (12px), Box shadows

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
cd agent-swarm/generated-sites/personal-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. **Initialize Convex (Backend - First Time Only):**
```bash
npx convex dev
```
This will:
- Create your serverless database
- Generate TypeScript types
- Create `.env.local` with your database URL

**Keep the Convex terminal running!**

4. **Run the development server (New Terminal):**
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

> **📚 Quick Start:** See [QUICK_START.md](./QUICK_START.md) for a 5-minute setup guide  
> **📖 Full Docs:** See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for complete backend documentation

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
personal-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts   # Contact form API endpoint
│   ├── layout.tsx          # Root layout with Navigation/Footer
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── Navigation.tsx      # Fixed navigation header
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Projects.tsx       # Projects gallery
│   ├── Contact.tsx        # Contact form with API integration
│   └── Footer.tsx         # Footer
├── convex/
│   ├── _generated/        # Auto-generated types (don't edit)
│   ├── contact.ts         # Database mutations and queries
│   ├── schema.ts          # Database schema
│   └── tsconfig.json      # Convex TypeScript config
├── public/                # Static assets
├── BACKEND_SETUP.md       # Backend documentation
└── QUICK_START.md         # 5-minute setup guide
```

## Accessibility Features

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Skip to main content link
- Color contrast ratios > 4.5:1
- Alt text for images
- Form validation with error messages
- Focus states on all interactive elements

## Performance

The site is optimized for performance:

- Server-side rendering with Next.js
- Optimized fonts with `next/font`
- Lazy loading images
- Minimal JavaScript
- CSS-in-JS with Tailwind
- Production build optimizations

Target Lighthouse scores: >90 for all categories

## Customization

### Update Content

1. Edit component content in `components/*.tsx`
2. Modify design tokens in `app/globals.css`
3. Update metadata in `app/layout.tsx`

### Add New Sections

1. Create a new component in `components/`
2. Import and add to `app/page.tsx`
3. Update navigation links in `components/Navigation.tsx`

### Customize Colors

Update the CSS variables in `app/globals.css`:

```css
--color-primary: #9333EA;
--color-secondary: #3B82F6;
--color-background: #FFFFFF;
--color-text: #1F2937;
```

## Testing

### Manual Testing Checklist

- [ ] Visual comparison with design mockups
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Form validation and submission
- [ ] All animations work smoothly
- [ ] No console errors

### Automated Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build check
npm run build
```

### Lighthouse Audit

Run a Lighthouse audit in Chrome DevTools:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Click "Generate report"

Target scores: >90 for all categories

## Technologies

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter (Google Fonts)
- **Icons**: Inline SVG
- **Animations**: CSS transitions + Intersection Observer

### Backend
- **Database**: Convex (serverless)
- **API**: Next.js API Routes (App Router)
- **Validation**: Server-side with TypeScript
- **Real-time**: Convex live queries (optional)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this as a template for your own portfolio!

## Credits

Built with ❤️ using modern web technologies.

Design tokens based on purple/blue gradient theme with modern spacing and effects.

## Backend API

The contact form is powered by a full-stack backend:

- **Database**: Convex serverless database stores all submissions
- **API Endpoint**: `/api/contact` handles form submissions
- **Validation**: Server-side email and field validation
- **Status Tracking**: Track submission status (new/read/replied)

### API Usage

**Submit Contact Form:**
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss..."
}
```

**Responses:**
- `200 OK`: `{"success": true, "id": "..."}`
- `400 Bad Request`: `{"error": "All fields are required"}`
- `400 Bad Request`: `{"error": "Invalid email address"}`
- `500 Server Error`: `{"error": "Failed to submit form"}`

### Test the API

Run the test scripts:
```bash
# Bash
./test-api.sh

# Node.js
node test-api.js
```

### View Submissions

1. Visit [Convex Dashboard](https://dashboard.convex.dev)
2. Select your deployment → Data → `contactSubmissions`

Or query in code:
```typescript
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const submissions = useQuery(api.contact.list);
```

---

## Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Complete backend documentation
- **[TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)** - QA testing guide

---

## 🚀 Deployment

### Production Site
**Live URL:** https://personal-portfolio-sage-eta.vercel.app

### Quick Deploy
The site is configured for automatic deployment via GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Site deploys automatically in 2-3 minutes
```

### Manual Deploy
```bash
# Deploy to Vercel
npx vercel --prod

# Deploy Convex backend
CONVEX_DEPLOYMENT=prod:tangible-pony-604 npx convex deploy
```

### Documentation
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[OPERATIONS.md](./OPERATIONS.md)** - Maintenance and operations guide

### Infrastructure
- **Hosting:** Vercel (Next.js optimized)
- **Database:** Convex Production (`tangible-pony-604`)
- **CI/CD:** GitHub → Vercel automatic deployments
- **SSL:** Automatic via Vercel
- **CDN:** Global edge network

---

**Generated by Agent Swarm**
- **Phase 5:** Tony (Frontend Code Generation)
- **Phase 6:** Bruce (Backend Development)
- **Phase 7:** Natasha (Quality Assurance)
- **Phase 8:** Thor (DevOps & Deployment) ✅
