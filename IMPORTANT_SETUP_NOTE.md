# ⚠️ IMPORTANT: TypeScript Errors Before Setup

## Expected TypeScript Errors

If you see TypeScript errors like:
```
error TS2307: Cannot find module '@/convex/_generated/api'
error TS2307: Cannot find module './_generated/server'
```

**This is NORMAL and EXPECTED!** ✅

## Why?

The Convex `_generated` folder doesn't exist yet. It will be automatically created when you initialize Convex.

## How to Fix

Simply run:
```bash
npx convex dev
```

This will:
1. ✅ Create the `convex/_generated/` folder
2. ✅ Generate all TypeScript types
3. ✅ Resolve all import errors
4. ✅ Make TypeScript happy

## After Setup

Once you run `npx convex dev`, you'll see:
```
✓ Convex functions ready
✓ Types generated
✓ Watching for changes...
```

Then run TypeScript check again:
```bash
npx tsc --noEmit
```

**All errors will be gone!** 🎉

## TL;DR

1. **Before setup:** TypeScript errors are normal
2. **Run:** `npx convex dev`
3. **After setup:** No errors

See [QUICK_START.md](./QUICK_START.md) for complete setup instructions.

---

**This is a feature, not a bug!** Convex generates types at initialization.
