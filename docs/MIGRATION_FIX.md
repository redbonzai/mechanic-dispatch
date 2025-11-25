# Migration Fix

The migrations have been reorganized to fix the dependency order issue.

## Problem

The original migrations were out of order:
- `20250115000000_add_mechanics_reviews_skills` (January) tried to reference `ServiceRequest` table
- `20251115160659_init` (November) created the `ServiceRequest` table
- Prisma applies migrations in chronological order, so it failed

## Solution

Migrations have been reorganized with proper timestamps:

1. **20241115000000_init** - Creates `ServiceRequest` table and enum
2. **20241115000001_payment_workflow** - Adds payment columns and `MechanicWorkLog` table
3. **20241115000002_add_mechanics_reviews_skills** - Creates `Mechanic`, `Skill`, `MechanicSkill`, and `Review` tables

## How to Apply

If you have an existing database with failed migrations:

```bash
# Option 1: Reset everything (recommended for development)
pnpm db:reset

# Option 2: Manual cleanup
# 1. Drop the database
docker compose exec db psql -U postgres -c "DROP DATABASE mechanic;"
docker compose exec db psql -U postgres -c "CREATE DATABASE mechanic;"

# 2. Run setup
pnpm db:setup
```

## Verification

After running `pnpm db:setup`, verify:

```bash
# Check migrations applied
pnpm prisma migrate status

# Check tables exist
docker compose exec db psql -U postgres -d mechanic -c "\dt"
```

You should see:
- ServiceRequest
- MechanicWorkLog
- Mechanic
- Skill
- MechanicSkill
- Review

