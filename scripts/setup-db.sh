#!/bin/bash
# Unified database setup script
# This script generates Prisma client, runs migrations, and seeds the database

set -e

echo "🚀 Setting up database..."

# Check if running in Docker container
if [ -f /.dockerenv ]; then
    echo "📦 Running in Docker container..."
    # DATABASE_URL should already be set by docker-compose
else
    echo "💻 Running locally..."
    
    # Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        echo "⚠️  DATABASE_URL not set. Using default..."
        export DATABASE_URL="postgresql://postgres:postgres@localhost:15432/mechanic?schema=public"
    fi
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

