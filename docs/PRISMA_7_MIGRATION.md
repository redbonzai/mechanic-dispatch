# Prisma 7 Migration Guide

## Changes Made

### 1. Schema Changes
- Removed `url` from `datasource` in `prisma/schema.prisma`
- Connection URL now configured in `prisma.config.ts`

### 2. New Configuration File
Created `prisma.config.ts`:
```typescript
import { defineConfig } from 'prisma';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```

### 3. Updated PrismaClient Initialization

**Before (Prisma 5):**
```typescript
const prisma = new PrismaClient();
```

**After (Prisma 7):**
```typescript
import { postgres } from '@prisma/adapter-postgres';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = postgres(pool);
const prisma = new PrismaClient({ adapter });
```

### 4. Updated Files
- `src/infrastructure/database/prisma.service.ts` - Uses adapter
- `prisma/seed.ts` - Uses adapter
- `prisma.config.ts` - New config file for migrations

### 5. Dependencies
Added:
- `@prisma/adapter-postgres@^7.0.0`
- `pg@^8.11.3`
- Updated `@prisma/client` and `prisma` to `^7.0.0`

## Installation

```bash
pnpm install
```

## Usage

Everything works the same, but PrismaClient now uses the adapter pattern:

```typescript
// In your services
constructor(private prisma: PrismaService) {}

// PrismaService automatically uses the adapter
await this.prisma.mechanic.findMany();
```

## Migrations

Migrations work the same way:
```bash
pnpm prisma migrate dev
pnpm prisma migrate deploy
```

The `prisma.config.ts` file provides the DATABASE_URL for migrations.

## Benefits

- Better connection pooling
- More flexible connection management
- Future-proof for Prisma 7+ features

