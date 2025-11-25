# Docker Build Requirements

## Prerequisites

Before building Docker images, you must generate the `pnpm-lock.yaml` file:

```bash
pnpm install
```

This creates the lockfile that ensures consistent dependency versions across builds.

## Build Process

```bash
# 1. Generate lockfile (if not exists)
pnpm install

# 2. Build Docker images
docker compose build

# 3. Start containers
docker compose up
```

## Why pnpm-lock.yaml is Required

The Dockerfile uses `pnpm install` which works with or without a lockfile, but:
- **With lockfile**: Ensures exact dependency versions (recommended)
- **Without lockfile**: Installs latest compatible versions (may cause inconsistencies)

## Troubleshooting

### Error: "pnpm-lock.yaml: not found"

**Solution:**
```bash
pnpm install
```

This will generate `pnpm-lock.yaml` in the project root.

### Lockfile Out of Date

If dependencies change:
```bash
pnpm install
# This updates pnpm-lock.yaml
```

Then rebuild Docker:
```bash
docker compose build --no-cache
```

