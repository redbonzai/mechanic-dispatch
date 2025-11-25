# Troubleshooting Guide

## Build Issues

### Error: "Module '@prisma/client' has no exported member 'PrismaClient'"

**Cause:** Prisma client hasn't been generated.

**Solution:**
```bash
# Generate Prisma client
DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public" \
  pnpm prisma generate

# Then build
pnpm build
```

Or use the fix script:
```bash
pnpm fix:all
```

### Error: "Cannot find module '/app/dist/main.js'" in Docker

**Cause:** Build failed in Docker, so dist folder doesn't exist.

**Solution:**
1. Clean up old migrations (they can cause Prisma generate to fail)
2. Rebuild Docker image:
```bash
docker compose build --no-cache
docker compose up
```

### Build Fails with TypeScript Errors

**Solution:**
```bash
# 1. Clean up old migrations
pnpm db:clean

# 2. Generate Prisma client
pnpm prisma:generate

# 3. Build
pnpm build
```

## Migration Issues

### Error: "relation 'ServiceRequest' does not exist"

**Cause:** Migrations are out of order.

**Solution:**
```bash
# Clean up old migrations
pnpm db:clean

# Drop and recreate database
docker compose exec db psql -U postgres -c "DROP DATABASE IF EXISTS mechanic;"
docker compose exec db psql -U postgres -c "CREATE DATABASE mechanic;"

# Run setup
pnpm db:setup
```

### Migration Failed to Apply

**Solution:**
```bash
# Reset everything
pnpm db:reset
```

## Docker Issues

### Container Exits Immediately

**Check logs:**
```bash
docker compose logs api
```

**Common causes:**
- Build failed (check Docker build logs)
- Missing dist/main.js (run `pnpm fix:all` first)
- Database connection issues (check DATABASE_URL)

### Database Not Accessible

**Check:**
```bash
# Is database running?
docker compose ps

# Can we connect?
docker compose exec db psql -U postgres -d mechanic -c "SELECT 1;"
```

## Quick Fix Script

For comprehensive fixes, run:

```bash
pnpm fix:all
```

This will:
1. Clean up old migrations
2. Generate Prisma client
3. Build the application
4. Verify everything works

## Verification Commands

```bash
# Check Prisma client
test -d node_modules/.prisma/client && echo "✅" || echo "❌"

# Check build output
test -f dist/main.js && echo "✅" || echo "❌"

# Check migrations
ls -d prisma/migrations/202* | wc -l
# Should show 3 migrations (20241115000000, 20241115000001, 20241115000002)
```

