# 🔧 Operations & Maintenance Guide

## Quick Command Reference

### Development
```bash
# Start local dev server
npm run dev

# Start Convex dev server (separate terminal)
npx convex dev

# Run production build locally
npm run build
npm start
```

### Deployment
```bash
# Deploy to Vercel production (manual)
npx vercel --prod

# Deploy Convex to production
CONVEX_DEPLOYMENT=prod:tangible-pony-604 npx convex deploy

# View deployment logs
npx vercel logs
```

### Git Operations
```bash
# Check status
git status

# Commit changes
git add .
git commit -m "Your message"

# Deploy (push to GitHub triggers auto-deploy)
git push origin main
```

---

## 📅 Routine Maintenance Schedule

### Weekly
- [ ] Check Vercel analytics for traffic/errors
- [ ] Review contact form submissions in Convex dashboard
- [ ] Monitor deployment success rate

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Run Lighthouse audit for performance
- [ ] Review and clean up old Vercel deployments
- [ ] Backup Convex data (export if needed)

### Quarterly
- [ ] Security audit of dependencies: `npm audit`
- [ ] Review and update content/projects
- [ ] Performance optimization review
- [ ] SSL certificate check (auto-renewed by Vercel)

---

## 🔄 Common Workflows

### Adding a New Project

1. **Update the data:**
   Edit `components/Projects.tsx` and add new project object

2. **Test locally:**
   ```bash
   npm run dev
   ```

3. **Deploy:**
   ```bash
   git add components/Projects.tsx
   git commit -m "feat: add new project"
   git push origin main
   ```

4. **Verify:** Check live site in 2-3 minutes

### Updating Contact Email/Info

1. **Edit contact info:**
   Modify `components/Contact.tsx` or `components/Footer.tsx`

2. **Test and deploy:**
   ```bash
   npm run dev  # Test
   git add .
   git commit -m "update: contact information"
   git push origin main
   ```

### Modifying Backend Schema

1. **Update schema:**
   Edit `convex/schema.ts`

2. **Test in dev:**
   ```bash
   npx convex dev  # Schema updates automatically
   ```

3. **Deploy to production:**
   ```bash
   CONVEX_DEPLOYMENT=prod:tangible-pony-604 npx convex deploy
   ```

4. **Verify:** Check Convex production dashboard

---

## 🚨 Emergency Procedures

### Site Down / 500 Errors

1. **Check Vercel status:**
   - Go to https://vercel.com/vishnus-projects-2166f0a0/personal-portfolio
   - Check deployment logs for errors

2. **Quick rollback:**
   ```bash
   npx vercel rollback
   ```
   Or use Vercel dashboard to promote previous deployment

3. **Check Convex backend:**
   - Verify production deployment is active
   - Check dashboard for error logs

### Build Failures

1. **View build logs:**
   ```bash
   npx vercel logs
   ```

2. **Test build locally:**
   ```bash
   npm run build
   ```

3. **Common fixes:**
   - Clear Vercel build cache (Settings → General → Clear Cache)
   - Verify environment variables
   - Check for TypeScript errors

### Contact Form Issues

1. **Test API directly:**
   ```bash
   curl -X POST https://personal-portfolio-sage-eta.vercel.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
   ```

2. **Check Convex:**
   - Verify production deployment is active
   - Check for rate limiting or errors

3. **Verify environment variables:**
   ```bash
   npx vercel env ls
   ```

---

## 📊 Monitoring Checklist

### Daily (Optional - Automated Alerts Recommended)
- [ ] No failed deployments
- [ ] No 500 errors in logs
- [ ] Site is loading (uptime check)

### Weekly
- [ ] Review contact submissions
- [ ] Check for security updates: `npm audit`
- [ ] Monitor Vercel analytics

### Monthly
- [ ] Lighthouse performance audit
- [ ] Dependency updates
- [ ] Review and archive old deployments

---

## 🔐 Security Best Practices

### Environment Variables
- ✅ Never commit .env files
- ✅ Use Vercel dashboard for production secrets
- ✅ Rotate sensitive credentials periodically
- ✅ Use NEXT_PUBLIC_ prefix only for client-safe variables

### Dependencies
```bash
# Check for vulnerabilities
npm audit

# Fix automatically (minor/patch)
npm audit fix

# Review and fix manually (major)
npm audit fix --force  # Use with caution
```

### Access Control
- Keep Vercel/Convex credentials secure
- Use 2FA on GitHub account
- Review team access periodically
- Use personal access tokens (not passwords) for CLI

---

## 🎯 Performance Optimization

### Images
- Use Next.js `<Image>` component (already implemented)
- Serve WebP format with fallbacks
- Lazy load below-the-fold images

### Caching
- Static assets auto-cached by Vercel CDN
- API routes can use `Cache-Control` headers
- Consider `stale-while-revalidate` for dynamic content

### Code Splitting
- Already optimized by Next.js
- Monitor bundle size: `npm run build` shows sizes
- Keep components small and focused

### Monitoring
```bash
# Run Lighthouse audit
npx lighthouse https://personal-portfolio-sage-eta.vercel.app \
  --output=json --output-path=./lighthouse.json

# View bundle analyzer (optional)
npm install -D @next/bundle-analyzer
# Add to next.config.ts if needed
```

---

## 📈 Analytics & Insights

### Vercel Analytics
- **Location:** https://vercel.com/vishnus-projects-2166f0a0/personal-portfolio/analytics
- **Metrics:** Page views, top pages, devices, locations
- **Web Vitals:** LCP, FID, CLS scores

### Convex Logs
- **Location:** Convex dashboard
- **What to monitor:** API call frequency, error rates, slow queries
- **Exports:** Can export data for analysis

### Custom Tracking (Optional)
Consider adding:
- Google Analytics 4
- Plausible (privacy-focused)
- Umami (self-hosted)

---

## 🔄 Backup & Recovery

### Code Backup
✅ **Automatic via GitHub**
- All code versioned in Git
- Hosted on GitHub: https://github.com/va-3/personal-portfolio
- Can restore any previous version

### Database Backup
```bash
# Export Convex data (if needed)
# Contact submissions stored in Convex production database
# Access via Convex dashboard → Export data
```

### Deployment History
- Vercel keeps deployment history
- Can promote any previous deployment to production
- Retention: Indefinite for projects on Pro plan

---

## 📞 Escalation & Support

### Self-Service Resources
1. Check this operations guide
2. Review DEPLOYMENT.md
3. Check Vercel deployment logs
4. Review Convex dashboard

### External Support
- **Vercel:** https://vercel.com/support
- **Convex:** https://docs.convex.dev/support
- **Next.js:** https://nextjs.org/docs/getting-started

### Critical Issues
1. Check status pages: status.vercel.com
2. Rollback to last working deployment
3. Review recent changes in Git history
4. Check environment variables

---

## 🎓 Knowledge Base

### Useful Commands
```bash
# Check Node/npm versions
node -v && npm -v

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Force Vercel redeploy (same code)
npx vercel --force

# View Vercel project settings
npx vercel project ls

# Check Convex deployment status
npx convex env list
```

### File Locations
- **Environment vars:** `.env.local`, `.env.production`
- **Vercel config:** `.vercel/project.json`
- **Convex config:** `convex.json`
- **Build output:** `.next/`
- **Dependencies:** `node_modules/`

---

## 📝 Change Log Template

Keep a simple change log for major updates:

```markdown
## [Version] - YYYY-MM-DD

### Added
- New features

### Changed
- Modified features

### Fixed
- Bug fixes

### Deployed
- Deployment notes
```

---

**Last Updated:** February 1, 2026  
**Maintained By:** DevOps Team  
**Review Frequency:** Monthly
