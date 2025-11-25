# Database Setup Guide

This guide will help you set up the database for local development. The process is automated and repeatable.

## Quick Start

```bash
# Start Docker Compose (if using Docker)
docker compose up -d

# Run database setup (migrations + seed)
pnpm db:setup
```

That's it! The database will be migrated and seeded with test data.

## Prerequisites

- **Node.js 20+** and **pnpm 9+** installed
- **PostgreSQL database** running (via Docker Compose or locally)
- **DATABASE_URL** environment variable set (or use defaults)

## Setup Methods

### Option 1: Docker Compose (Recommended)

Docker Compose is the easiest way to get started. It handles both the database and API.

#### Step 1: Start Services

```bash
docker compose up -d
```

This starts:
- PostgreSQL database on port `15432`
- API container (when ready)

#### Step 2: Setup Database

```bash
pnpm db:setup
```

This command will:
1. Generate Prisma client
2. Apply all database migrations
3. Seed the database with test data

**What you'll see:**
```
🚀 Setting up database...
📦 Docker Compose detected. Running setup in container...
🔧 Generating Prisma client...
📋 Applying Prisma migrations...
🌱 Seeding database...
✅ Database setup complete!
```

### Option 2: Local PostgreSQL

If you're running PostgreSQL locally (not via Docker):

#### Step 1: Ensure PostgreSQL is Running

```bash
# Check if PostgreSQL is running
psql -h localhost -p 15432 -U postgres -d mechanic -c "SELECT 1;" || echo "Database not accessible"
```

#### Step 2: Set DATABASE_URL

Create or update your `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:15432/mechanic?schema=public
```

#### Step 3: Setup Database

```bash
pnpm db:setup
```

## Available Commands

### Database Setup

| Command | Description |
|---------|-------------|
| `pnpm db:setup` | **Complete setup**: Generate client, run migrations, and seed data |
| `pnpm prisma:generate` | Generate Prisma client only |
| `pnpm prisma:migrate:deploy` | Apply pending migrations only |
| `pnpm prisma:seed` | Seed database with test data only |
| `pnpm db:reset` | **Reset everything**: Drop database, re-run migrations, and seed |

### Development Workflow

```bash
# Create a new migration
pnpm prisma:migrate:dev --name your_migration_name

# After creating migration, regenerate client
pnpm prisma:generate

# Apply migrations (production-like)
pnpm prisma:migrate:deploy
```

## What Gets Seeded?

The seed script (`prisma/seed.ts`) creates:

- **10 Skills**: Oil Change, Brake Pads, Battery Replacement, etc.
- **11 Mechanics**: Rocco, Robert, Grzegorz, and 8 others with profiles
- **27 Mechanic-Skill relationships**: Links mechanics to their skills
- **8 Reviews**: Sample reviews for the mechanics

## Troubleshooting

### Error: "Module '@prisma/client' has no exported member 'PrismaClient'"

**Solution:** Generate the Prisma client first:

```bash
pnpm prisma:generate
```

Then run your command again.

### Error: "Unable to connect to database"

**Check:**
1. Is PostgreSQL running?
   ```bash
   # Docker Compose
   docker compose ps
   
   # Local
   psql -h localhost -p 15432 -U postgres -d mechanic -c "SELECT 1;"
   ```

2. Is DATABASE_URL correct in `.env`?
   ```bash
   # For Docker Compose
   DATABASE_URL=postgresql://postgres:postgres@db:5432/mechanic?schema=public
   
   # For local
   DATABASE_URL=postgresql://postgres:postgres@localhost:15432/mechanic?schema=public
   ```

### Error: "Migration failed" or "Table already exists"

**Solution:** Reset the database and start fresh:

```bash
pnpm db:reset
```

⚠️ **Warning:** This will delete all data!

### Error: "relation 'ServiceRequest' does not exist" during migration

**Cause:** Migrations are out of order. The mechanics migration is trying to run before ServiceRequest is created.

**Solution:**

1. **Clean up old migrations** (if you have conflicting migrations):
   ```bash
   # Remove old migrations with wrong timestamps
   rm -rf prisma/migrations/20250115000000_add_mechanics_reviews_skills
   rm -rf prisma/migrations/202511151100_payment_workflow
   rm -rf prisma/migrations/20251115160659_init
   rm -rf prisma/migrations/20251115195905_init
   ```

2. **Reset the database:**
   ```bash
   # Drop and recreate database
   docker compose exec db psql -U postgres -c "DROP DATABASE IF EXISTS mechanic;"
   docker compose exec db psql -U postgres -c "CREATE DATABASE mechanic;"
   ```

3. **Run setup again:**
   ```bash
   pnpm db:setup
   ```

The correct migration order should be:
- `20241115000000_init` - Creates ServiceRequest
- `20241115000001_payment_workflow` - Adds payment columns
- `20241115000002_add_mechanics_reviews_skills` - Creates mechanics/reviews

### Error: "Cannot find module 'ts-node'"

**Solution:** Install dependencies:

```bash
pnpm install
```

### Database is Empty After Setup

**Check:**
1. Did migrations run successfully?
   ```bash
   # Check migration status
   pnpm prisma migrate status
   ```

2. Did seed run successfully?
   ```bash
   # Re-run seed only
   pnpm prisma:seed
   ```

3. Check database directly:
   ```bash
   # Via Docker
   docker compose exec db psql -U postgres -d mechanic -c "SELECT COUNT(*) FROM \"Mechanic\";"
   
   # Via local psql
   psql -h localhost -p 15432 -U postgres -d mechanic -c "SELECT COUNT(*) FROM \"Mechanic\";"
   ```

## Verification

After setup, verify everything worked:

```bash
# Check tables exist
docker compose exec db psql -U postgres -d mechanic -c "\dt"

# Check data counts
docker compose exec db psql -U postgres -d mechanic << EOF
SELECT 'Mechanic' as table_name, COUNT(*) as count FROM "Mechanic"
UNION ALL SELECT 'Skill', COUNT(*) FROM "Skill"
UNION ALL SELECT 'Review', COUNT(*) FROM "Review"
UNION ALL SELECT 'MechanicSkill', COUNT(*) FROM "MechanicSkill";
EOF
```

Expected output:
- Mechanic: 11
- Skill: 10
- Review: 8
- MechanicSkill: 27

## Resetting the Database

To completely reset the database (useful when migrations get messy):

```bash
pnpm db:reset
```

This will:
1. Drop all tables
2. Re-run all migrations
3. Regenerate Prisma client
4. Seed with test data

### If db:reset Fails Due to Migration Order

If you see errors about migrations being out of order:

1. **Clean up old migrations manually:**
   ```bash
   # Remove old migrations with incorrect timestamps
   rm -rf prisma/migrations/20250115000000_add_mechanics_reviews_skills
   rm -rf prisma/migrations/202511151100_payment_workflow
   rm -rf prisma/migrations/20251115160659_init
   rm -rf prisma/migrations/20251115195905_init
   ```

2. **Drop and recreate the database:**
   ```bash
   # Via Docker
   docker compose exec db psql -U postgres -c "DROP DATABASE IF EXISTS mechanic;"
   docker compose exec db psql -U postgres -c "CREATE DATABASE mechanic;"
   
   # Or via local psql
   psql -h localhost -p 15432 -U postgres -c "DROP DATABASE IF EXISTS mechanic;"
   psql -h localhost -p 15432 -U postgres -c "CREATE DATABASE mechanic;"
   ```

3. **Run setup:**
   ```bash
   pnpm db:setup
   ```

The correct migrations should be:
- `20241115000000_init` - Creates ServiceRequest table
- `20241115000001_payment_workflow` - Adds payment columns and MechanicWorkLog
- `20241115000002_add_mechanics_reviews_skills` - Creates Mechanic, Skill, Review tables

## How It Works

### The Setup Script (`scripts/setup-db.sh`)

1. **Detects environment**: Checks if Docker Compose is running
2. **Generates Prisma client**: Creates TypeScript types from schema
3. **Applies migrations**: Runs all pending migrations in order
4. **Seeds database**: Inserts test data using `prisma/seed.ts`

### Migration Files

Migrations are stored in `prisma/migrations/` and are applied in chronological order based on their timestamp.

### Seed File

The seed file (`prisma/seed.ts`) uses Prisma's upsert operations, so it's safe to run multiple times. It will:
- Create or update records based on unique fields (slug for mechanics, name for skills)
- Link mechanics to skills
- Create reviews
- Update mechanic statistics (ratings, review counts)

## Next Steps

After database setup:

1. **Start the API:**
   ```bash
   pnpm start:dev
   ```

2. **Access the database:**
   - Use pgAdmin, DBeaver, or your preferred database tool
   - Connection: `localhost:15432`, database: `mechanic`, user: `postgres`, password: `postgres`

3. **View seeded data:**
   - Mechanics: `GET http://localhost:3000/mechanics`
   - Skills: Query the database directly

## Need Help?

If you encounter issues not covered here:

1. Check the [main README](../README.md) for general setup
2. Review Prisma logs: `pnpm prisma migrate deploy --verbose`
3. Check Docker logs: `docker compose logs db`
4. Verify environment: `cat .env | grep DATABASE_URL`

