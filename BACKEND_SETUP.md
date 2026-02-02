# Backend Setup Guide - Personal Portfolio

This guide covers the setup and configuration of the backend API and database for the personal portfolio contact form.

## Tech Stack

- **Database:** Convex (serverless database with real-time sync)
- **API:** Next.js API Routes (App Router)
- **Validation:** Server-side validation with TypeScript
- **Storage:** Contact form submissions with metadata

---

## Installation & Setup

### 1. Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Convex account (free tier available at [convex.dev](https://www.convex.dev))

### 2. Install Dependencies

Dependencies are already installed. If needed:

```bash
npm install
```

This includes:
- `convex` - Convex client and CLI
- `next` - Next.js framework
- Other existing dependencies

### 3. Initialize Convex

First, install the Convex CLI globally (optional, but recommended):

```bash
npm install -g convex
```

Then initialize your Convex project:

```bash
cd agent-swarm/generated-sites/personal-portfolio
npx convex dev
```

This will:
1. Prompt you to log in to Convex (or create an account)
2. Create a new Convex deployment
3. Generate the `convex/_generated` folder with TypeScript types
4. Start watching for schema changes
5. Create `.env.local` with your `NEXT_PUBLIC_CONVEX_URL`

### 4. Environment Configuration

After running `npx convex dev`, your `.env.local` should be automatically created with:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

If it wasn't created automatically, copy `.env.local.example` to `.env.local` and add your Convex URL from the [Convex Dashboard](https://dashboard.convex.dev).

### 5. Start Development Servers

You need to run **two** terminal windows:

**Terminal 1 - Next.js:**
```bash
npm run dev
```

**Terminal 2 - Convex:**
```bash
npm run convex:dev
```

The app will be available at `http://localhost:3000`

---

## Project Structure

```
agent-swarm/generated-sites/personal-portfolio/
├── app/
│   └── api/
│       └── contact/
│           └── route.ts           # POST /api/contact endpoint
├── components/
│   └── Contact.tsx                # Contact form component
├── convex/
│   ├── _generated/                # Auto-generated types (do not edit)
│   ├── contact.ts                 # Convex mutations and queries
│   ├── schema.ts                  # Database schema
│   └── tsconfig.json              # Convex TypeScript config
├── .env.local                     # Environment variables (not in git)
├── .env.local.example             # Example environment file
└── convex.json                    # Convex configuration
```

---

## API Documentation

### POST /api/contact

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "id": "k17dg9s8x9y2z3x4y5z6"
}
```

**Error Responses:**

400 - Missing fields:
```json
{
  "error": "All fields are required"
}
```

400 - Invalid email:
```json
{
  "error": "Invalid email address"
}
```

500 - Server error:
```json
{
  "error": "Failed to submit form"
}
```

---

## Database Schema

### contactSubmissions Table

| Field        | Type     | Description                          |
|--------------|----------|--------------------------------------|
| name         | string   | Sender's name                        |
| email        | string   | Sender's email address               |
| subject      | string   | Email subject                        |
| message      | string   | Message content                      |
| submittedAt  | number   | Unix timestamp (milliseconds)        |
| status       | string   | "new", "read", or "replied"          |
| ipAddress    | string?  | Sender's IP (optional)               |

**Indexes:**
- `by_submitted_at` - Query by submission time (DESC)
- `by_status` - Query by status for filtering

---

## Convex Functions

### Mutations

**`api.contact.submit`**
- Store a new contact form submission
- Returns the submission ID

**`api.contact.markAsRead`**
- Mark a submission as "read"
- Args: `{ id: Id<"contactSubmissions"> }`

### Queries

**`api.contact.list`**
- Retrieve all submissions (up to 100)
- Ordered by submission time (newest first)

---

## Testing

### 1. Valid Submission Test

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

**Expected:**
```json
{"success":true,"id":"k17..."}
```

### 2. Missing Fields Test

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
```

**Expected:**
```json
{"error":"All fields are required"}
```

### 3. Invalid Email Test

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "subject": "Test",
    "message": "Hello"
  }'
```

**Expected:**
```json
{"error":"Invalid email address"}
```

### 4. Verify in Database

Visit the [Convex Dashboard](https://dashboard.convex.dev) and check the `contactSubmissions` table to see stored data.

Or query programmatically:
```typescript
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const submissions = await convex.query(api.contact.list);
console.log(submissions);
```

---

## Viewing Submissions

### Option 1: Convex Dashboard
1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Select your deployment
3. Click "Data" in the sidebar
4. View the `contactSubmissions` table

### Option 2: Create Admin Page (Optional)

Create `app/admin/page.tsx`:

```typescript
'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function AdminPage() {
  const submissions = useQuery(api.contact.list);
  
  if (!submissions) return <div>Loading...</div>;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
      {submissions.map((sub) => (
        <div key={sub._id} className="border p-4 mb-4 rounded">
          <h3 className="font-bold">{sub.name} - {sub.email}</h3>
          <p className="text-sm text-gray-600">{sub.subject}</p>
          <p>{sub.message}</p>
          <span className="text-xs">
            {new Date(sub.submittedAt).toLocaleString()} - {sub.status}
          </span>
        </div>
      ))}
    </div>
  );
}
```

---

## Production Deployment

### 1. Deploy Convex

```bash
npx convex deploy
```

This will create a production deployment and output a production URL.

### 2. Update Environment Variables

Add to your hosting platform (Vercel, Netlify, etc.):

```env
NEXT_PUBLIC_CONVEX_URL=https://your-production.convex.cloud
```

### 3. Deploy Next.js

Deploy to Vercel (recommended):

```bash
vercel
```

Or your preferred hosting platform.

---

## Optional Enhancements

### Email Notifications

To receive email alerts for new submissions, install Resend:

```bash
npm install resend
```

Create `lib/email.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await resend.emails.send({
    from: 'Portfolio <noreply@yourdomain.com>',
    to: 'your-email@example.com',
    subject: `New Contact: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}
```

Then update `app/api/contact/route.ts` to call `sendContactEmail()` after storing the submission.

### Rate Limiting

Consider adding rate limiting to prevent spam:

```bash
npm install @upstash/ratelimit @upstash/redis
```

### Spam Protection

Add honeypot fields or integrate with services like:
- reCAPTCHA
- hCaptcha
- Turnstile (Cloudflare)

---

## Troubleshooting

### "Cannot find module '@/convex/_generated/api'"

**Solution:** Run `npx convex dev` to generate the types folder.

### "NEXT_PUBLIC_CONVEX_URL is undefined"

**Solution:** 
1. Make sure `.env.local` exists with the Convex URL
2. Restart the Next.js dev server after creating `.env.local`

### Database schema errors

**Solution:** 
1. Check `convex/schema.ts` for syntax errors
2. Make sure `npx convex dev` is running
3. Convex will auto-apply schema changes

### API returns 500 errors

**Solution:**
1. Check the terminal/console for error messages
2. Verify Convex dev server is running
3. Check that all required fields are being sent

---

## Support & Resources

- **Convex Docs:** https://docs.convex.dev
- **Next.js Docs:** https://nextjs.org/docs
- **Convex Discord:** https://convex.dev/community

---

**Created by:** Bruce (Backend Specialist)  
**Date:** February 1, 2026  
**Phase:** 6 - Backend Development
