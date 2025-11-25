#!/bin/bash
# Comprehensive fix script for build and migration issues

set -e

echo "🔧 Fixing build and migration issues..."
echo ""

cd "$(dirname "$0")/.."

# Step 1: Clean up old migrations
echo "1️⃣  Cleaning up old migrations..."
rm -rf prisma/migrations/20250115000000_add_mechanics_reviews_skills 2>/dev/null || true
rm -rf prisma/migrations/202511151100_payment_workflow 2>/dev/null || true
rm -rf prisma/migrations/20251115160659_init 2>/dev/null || true
rm -rf prisma/migrations/20251115195905_init 2>/dev/null || true
echo "✅ Old migrations removed"
echo ""

# Step 2: Generate Prisma client
echo "2️⃣  Generating Prisma client..."
DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public" \
  pnpm prisma generate || {
    echo "❌ Failed to generate Prisma client"
    exit 1
  }
echo "✅ Prisma client generated"
echo ""

# Step 3: Verify Prisma client
echo "3️⃣  Verifying Prisma client..."
if [ -d "node_modules/.prisma/client" ]; then
    echo "✅ Prisma client exists"
else
    echo "❌ Prisma client not found"
    exit 1
fi
echo ""

# Step 4: Build
echo "4️⃣  Building application..."
pnpm build || {
    echo "❌ Build failed"
    exit 1
}
echo "✅ Build successful"
echo ""

# Step 5: Verify build output
echo "5️⃣  Verifying build output..."
if [ -f "dist/src/main.js" ]; then
    echo "✅ dist/src/main.js exists"
else
    echo "❌ dist/src/main.js not found"
    exit 1
fi
echo ""

echo "🎉 All fixes applied successfully!"
echo ""
echo "Next steps:"
echo "  1. Run 'pnpm db:setup' to setup database"
echo "  2. Run 'docker compose up --build' to rebuild containers"

