# Quick Start Guide

Get the project running locally in 5 minutes.

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop (for database)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
APP_PORT=3000
CLIENT_ORIGIN=http://localhost:4200
DATABASE_URL=postgresql://postgres:postgres@db:5432/mechanic?schema=public
STRIPE_SECRET_KEY=sk_test_replace_me
STRIPE_WEBHOOK_SECRET=whsec_replace_me
```

> **Note:** For local development without Docker, use:
> ```env
> DATABASE_URL=postgresql://postgres:postgres@localhost:15432/mechanic?schema=public
> ```

### 3. Start Database

```bash
docker compose up -d
```

Wait for the database to be ready (about 10 seconds).

### 4. Setup Database

```bash
pnpm db:setup
```

This will:
- Generate Prisma client
- Run all migrations
- Seed test data

**Expected output:**
```
🚀 Setting up database...
📦 Docker Compose detected. Running setup in container...
🔧 Generating Prisma client...
📋 Applying Prisma migrations...
🌱 Seeding database...
✅ Database setup complete!
```

### 5. Start the API

```bash
pnpm start:dev
```

The API will be available at `http://localhost:3000`

### 6. (Optional) Start Frontend

```bash
cd web
pnpm install
pnpm start
```

Frontend will be available at `http://localhost:4200`

## Verify Setup

### Check API Health

```bash
curl http://localhost:3000/health
```

### Check Mechanics Endpoint

```bash
curl http://localhost:3000/mechanics
```

You should see a list of 11 mechanics.

### Check Database

```bash
docker compose exec db psql -U postgres -d mechanic -c "SELECT COUNT(*) FROM \"Mechanic\";"
```

Should return: `11`

## Common Issues

### "PrismaClient not found"

```bash
pnpm prisma:generate
```

### "Cannot connect to database"

1. Check Docker is running: `docker compose ps`
2. Wait a few seconds for database to initialize
3. Try `pnpm db:setup` again

### "Migration failed"

```bash
pnpm db:reset
```

⚠️ This deletes all data and starts fresh.

## Next Steps

- Read [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed database info
- Check [README.md](../README.md) for project overview
- Explore the API at `http://localhost:3000`

## Need Help?

See the [troubleshooting section](./DATABASE_SETUP.md#troubleshooting) in DATABASE_SETUP.md

