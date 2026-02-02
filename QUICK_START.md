# Quick Start Guide - Backend Setup

Get the contact form backend running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm (comes with Node.js)

## Setup (First Time Only)

### 1. Install Dependencies (if not already done)

```bash
cd agent-swarm/generated-sites/personal-portfolio
npm install
```

### 2. Initialize Convex

This creates your database and generates TypeScript types:

```bash
npx convex dev
```

**What happens:**
- Browser opens → Log in or create Convex account (free)
- Creates a new deployment
- Generates `.env.local` with your database URL
- Generates `convex/_generated/` folder (TypeScript types)
- Starts watching for schema changes

**Keep this terminal running!** This is your Convex dev server.

## Running the App (Every Time)

You need **two terminal windows**:

### Terminal 1: Convex Dev Server

```bash
npm run convex:dev
```

Keep this running. It watches for database changes.

### Terminal 2: Next.js Dev Server

```bash
npm run dev
```

**App is live at:** http://localhost:3000

## Testing

### Via UI
1. Open http://localhost:3000
2. Scroll to "Get In Touch" section
3. Fill out the form and submit

### Via Test Script (Bash)

```bash
./test-api.sh
```

### Via Test Script (Node.js)

```bash
node test-api.js
```

### Via cURL (Manual)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Hello from the API!"
  }'
```

## View Submissions

**Option 1: Convex Dashboard** (Recommended)
1. Go to https://dashboard.convex.dev
2. Select your deployment
3. Click "Data" → `contactSubmissions` table

**Option 2: Query in Code**
```typescript
// In a React component with Convex provider:
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const submissions = useQuery(api.contact.list);
```

## Common Issues

### "Cannot find module '@/convex/_generated/api'"
**Fix:** Run `npx convex dev` to generate the types.

### "NEXT_PUBLIC_CONVEX_URL is undefined"
**Fix:** 
1. Check that `.env.local` exists and has `NEXT_PUBLIC_CONVEX_URL`
2. Restart Next.js dev server (`npm run dev`)

### Port 3000 already in use
**Fix:** Kill existing process or use different port:
```bash
npm run dev -- -p 3001
```

## Production Deployment

See `BACKEND_SETUP.md` for full production deployment guide.

Quick version:
```bash
# 1. Deploy Convex
npx convex deploy

# 2. Add environment variable to Vercel/hosting:
#    NEXT_PUBLIC_CONVEX_URL=https://your-prod.convex.cloud

# 3. Deploy Next.js
vercel
```

## Need More Help?

- **Full Documentation:** See `BACKEND_SETUP.md`
- **Convex Docs:** https://docs.convex.dev
- **Next.js Docs:** https://nextjs.org/docs

---

**That's it!** Your backend is running. 🚀
