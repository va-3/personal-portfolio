# 🚀 Deployment Guide - Personal Portfolio Website

## 📋 Deployment Summary

**Status:** ✅ Successfully Deployed  
**Production URL:** https://personal-portfolio-sage-eta.vercel.app  
**GitHub Repository:** https://github.com/va-3/personal-portfolio  
**Hosting Platform:** Vercel  
**Backend:** Convex (Production)  
**Deployment Date:** February 1, 2026

---

## 🌐 Live URLs

- **Production:** https://personal-portfolio-sage-eta.vercel.app
- **Vercel Dashboard:** https://vercel.com/vishnus-projects-2166f0a0/personal-portfolio
- **GitHub Repo:** https://github.com/va-3/personal-portfolio
- **Convex Dashboard:** https://tangible-pony-604.convex.cloud

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Vercel CDN    │ ← HTTPS/SSL
└────────┬────────┘
         │
    ┌────▼────┐
    │ Next.js │ (SSR + Static)
    │  App    │
    └────┬────┘
         │
    ┌────▼────┐
    │ Convex  │ (Production Database)
    │ Backend │ https://tangible-pony-604.convex.cloud
    └─────────┘
```

---

## ✅ Deployment Checklist

All tasks completed successfully:

- [x] Production build optimized
- [x] Environment variables configured
- [x] Convex production database deployed
- [x] Vercel deployment successful
- [x] SSL/HTTPS working
- [x] Contact form tested and working
- [x] GitHub repository created
- [x] CI/CD pipeline enabled
- [x] Lighthouse scores maintained (98/100)
- [x] Documentation complete

---

## 🔧 Environment Configuration

### Production Environment Variables

**Vercel Environment Variables:**
```bash
NEXT_PUBLIC_CONVEX_URL=https://tangible-pony-604.convex.cloud
```

**Local Development (.env.local):**
```bash
# Development deployment
CONVEX_DEPLOYMENT=dev:ceaseless-crow-441
NEXT_PUBLIC_CONVEX_URL=https://ceaseless-crow-441.convex.cloud
```

**Production (.env.production):**
```bash
# Production deployment
CONVEX_DEPLOYMENT=prod:tangible-pony-604
NEXT_PUBLIC_CONVEX_URL=https://tangible-pony-604.convex.cloud
```

---

## 🔄 CI/CD Pipeline

### Automatic Deployments

✅ **GitHub Integration Active**

**Workflow:**
```
git push origin main
    ↓
GitHub triggers webhook
    ↓
Vercel builds & deploys
    ↓
Production live in ~2-3 minutes
```

### Deployment Triggers

1. **Production Deployment:** Push to `main` branch
2. **Preview Deployment:** Open pull request
3. **Manual Deployment:** Run `npx vercel --prod`

### Build Configuration

**Vercel automatically:**
- Detects Next.js framework
- Installs dependencies (`npm install`)
- Runs build command (`npm run build`)
- Optimizes static assets
- Deploys to global CDN

---

## 📦 Manual Deployment (If Needed)

### Prerequisites
```bash
npm install -g vercel  # (or use npx vercel)
```

### Deploy to Production
```bash
# From project directory
cd agent-swarm/generated-sites/personal-portfolio

# Build locally (optional verification)
npm run build

# Deploy to production
npx vercel --prod
```

### Deploy Convex Updates
```bash
# Deploy Convex schema/functions to production
CONVEX_DEPLOYMENT=prod:tangible-pony-604 npx convex deploy
```

---

## 🧪 Testing the Deployment

### 1. Basic Site Test
```bash
curl -I https://personal-portfolio-sage-eta.vercel.app
# Should return: HTTP/2 200
```

### 2. Contact Form Test
```bash
curl -X POST https://personal-portfolio-sage-eta.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'

# Expected response:
# {"success":true,"id":"<convex-document-id>"}
```

### 3. Performance Test
```bash
# Run Lighthouse audit
npx lighthouse https://personal-portfolio-sage-eta.vercel.app \
  --output=html \
  --output-path=./lighthouse-production.html
```

**Current Scores (Feb 1, 2026):**
- Performance: 98/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

---

## 🔐 Security

### SSL/HTTPS
✅ Automatic SSL certificate via Vercel (Let's Encrypt)

### Environment Variables
- Stored securely in Vercel dashboard
- Never committed to Git (.env files in .gitignore)
- NEXT_PUBLIC_* variables are client-side safe (intended for public use)

### Convex Security
- Production deployment isolated from dev
- API endpoints use Convex auth (rate limiting built-in)
- Database queries validated server-side

---

## 📊 Monitoring & Maintenance

### Vercel Dashboard
- **Analytics:** https://vercel.com/vishnus-projects-2166f0a0/personal-portfolio/analytics
- **Deployment Logs:** https://vercel.com/vishnus-projects-2166f0a0/personal-portfolio/deployments
- **Settings:** https://vercel.com/vishnus-projects-2166f0a0/personal-portfolio/settings

### Convex Dashboard
- **Production Database:** https://dashboard.convex.dev/t/vishnu-anapalli/personal-portfolio-98341/prod:tangible-pony-604
- **Query Logs:** Available in Convex dashboard
- **Schema Management:** Deploy with `npx convex deploy`

### Key Metrics to Monitor
- Deployment success rate
- Build times
- Contact form submissions (in Convex dashboard)
- Error rates (Vercel logs)
- Performance scores (Lighthouse)

---

## 🛠️ Common Maintenance Tasks

### Update Content
1. Edit files locally
2. Commit changes: `git commit -am "Update content"`
3. Push to GitHub: `git push origin main`
4. Vercel auto-deploys in ~2-3 minutes

### Update Dependencies
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Test locally
npm run dev

# Deploy
git add package-lock.json package.json
git commit -m "chore: update dependencies"
git push origin main
```

### Rollback Deployment
```bash
# Via Vercel Dashboard:
# 1. Go to Deployments tab
# 2. Find previous working deployment
# 3. Click "Promote to Production"

# Or via CLI:
npx vercel rollback
```

### View Deployment Logs
```bash
# Latest deployment logs
npx vercel logs

# Specific deployment
npx vercel logs <deployment-url>
```

---

## 🐛 Troubleshooting

### Build Failures

**Issue:** Build fails on Vercel  
**Solution:**
1. Check build logs in Vercel dashboard
2. Verify build works locally: `npm run build`
3. Check environment variables are set correctly
4. Ensure all dependencies are in package.json

### Contact Form Not Working

**Issue:** Contact form returns errors  
**Solution:**
1. Verify Convex production URL is correct in Vercel env vars
2. Check Convex dashboard for error logs
3. Test API endpoint directly (see testing section above)
4. Verify Convex deployment is active: `npx convex env list`

### Environment Variable Issues

**Issue:** Changes to env vars not reflected  
**Solution:**
1. Update variables in Vercel dashboard
2. Trigger new deployment (redeploy or push to GitHub)
3. Environment variables are baked into build at build-time

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Convex Docs](https://docs.convex.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Project-Specific Docs
- `README.md` - Project overview and local setup
- `BACKEND_SETUP.md` - Convex backend configuration
- `TESTING_COMPLETE.md` - Testing results and validation
- `QUICK_START.md` - Quick start guide

---

## 👤 Access & Credentials

### Vercel Account
- **Username:** vishnuanapalli-8269
- **Organization:** vishnus-projects-2166f0a0
- **Project:** personal-portfolio

### GitHub Account
- **Username:** va-3
- **Repository:** https://github.com/va-3/personal-portfolio

### Convex Account
- **Team:** vishnu-anapalli
- **Project:** personal-portfolio-98341
- **Production Deployment:** tangible-pony-604

---

## 📞 Support

### For Issues:
1. Check troubleshooting section above
2. Review Vercel deployment logs
3. Check Convex dashboard for backend errors
4. Review GitHub Actions (if enabled)

### Update This Document
This file should be updated whenever:
- Deployment configuration changes
- New features are deployed
- Environment variables are modified
- URLs or credentials change

---

**Last Updated:** February 1, 2026  
**Deployed By:** Thor (DevOps Specialist)  
**Status:** ✅ Production Ready
