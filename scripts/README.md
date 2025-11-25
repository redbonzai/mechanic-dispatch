# Database Setup Scripts

This directory contains scripts for managing database migrations and seeding.

## Setup Script

`setup-db.sh` - Unified script that:
- Applies all Prisma migrations
- Seeds the database with test data

### Usage

```bash
# Works with Docker Compose
pnpm db:setup

# Or run directly
./scripts/setup-db.sh
```

The script automatically detects if you're running Docker Compose and executes commands in the appropriate context.

## Archive

The `archive/` directory contains old migration SQL files that have been replaced by the Prisma migration system. These are kept for reference but should not be used.

