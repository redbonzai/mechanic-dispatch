# Build Fix Guide

## Problem

The build is failing because:
1. Prisma client is not generated before the build
2. Old migrations are causing conflicts
3. Docker build fails because `dist/main.js` doesn't exist

## Solution

### Step 1: Clean Up Old Migrations

```bash
# Remove conflicting migrations
rm -rf prisma/migrations/20250115000000_add_mechanics_reviews_skills
rm -rf prisma/migrations/202511151100_payment_workflow
rm -rf prisma/migrations/20251115160659_init
rm -rf prisma/migrations/20251115195905_init
```

### Step 2: Generate Prisma Client

```bash
# Generate Prisma client (doesn't need database)
DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public" \
  pnpm prisma generate
```

### Step 3: Build

```bash
pnpm build
```

### Step 4: Verify

```bash
# Check Prisma client exists
test -d node_modules/.prisma/client && echo "✅ Prisma client exists"

# Check build output exists
test -f dist/main.js && echo "✅ Build successful"
```

## Docker Build

The Dockerfile has been updated to:
1. Generate Prisma client before building
2. Copy source files after generating client

To rebuild:

```bash
docker compose build --no-cache
docker compose up
```

## Package.json Changes

Added `prebuild` script that automatically generates Prisma client before building:

```json
"prebuild": "prisma generate",
"build": "nest build",
```

This ensures Prisma client is always generated before building.

## Verification Checklist

- [ ] Old migrations removed
- [ ] Prisma client generated (`node_modules/.prisma/client` exists)
- [ ] Build succeeds (`dist/main.js` exists)
- [ ] Docker build succeeds
- [ ] Application starts without errors

