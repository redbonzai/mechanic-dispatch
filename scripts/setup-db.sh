#!/bin/bash
# Unified database setup script
# This script generates Prisma client, runs migrations, and seeds the database

set -e

echo "🚀 Setting up database..."

# Check if running in Docker Compose
if docker compose ps 2>/dev/null | grep -q "mechanic-dispatch"; then
    echo "📦 Docker Compose detected. Running setup in container..."
    
    # Generate Prisma client
    echo "🔧 Generating Prisma client..."
    docker compose exec api pnpm prisma generate
    
    # Run migrations
    echo "📋 Applying Prisma migrations..."
    docker compose exec api pnpm prisma migrate deploy
    
    # Run seed
    echo "🌱 Seeding database..."
    docker compose exec api pnpm prisma db seed
    
    echo "✅ Database setup complete!"
else
    echo "💻 Running locally..."
    
    # Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        echo "⚠️  DATABASE_URL not set. Using default..."
        export DATABASE_URL="postgresql://postgres:postgres@localhost:15432/mechanic?schema=public"
    fi
    
    # Generate Prisma client first (required before migrations and seed)
    echo "🔧 Generating Prisma client..."
    pnpm prisma generate
    
    # Run migrations
    echo "📋 Applying Prisma migrations..."
    pnpm prisma migrate deploy
    
    # Run seed
    echo "🌱 Seeding database..."
    pnpm prisma db seed
    
    echo "✅ Database setup complete!"
fi

