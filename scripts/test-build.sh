#!/bin/bash
# Test script to verify the build process works

set -e

echo "🧪 Testing build process..."

cd "$(dirname "$0")/.."

echo "1. Checking Prisma schema..."
test -f prisma/schema.prisma || { echo "❌ prisma/schema.prisma not found"; exit 1; }
echo "✅ Schema file exists"

echo "2. Generating Prisma client..."
DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public" \
  pnpm exec prisma generate --schema=./prisma/schema.prisma

echo "3. Verifying Prisma client generated..."
test -d node_modules/.prisma/client || { echo "❌ Prisma client not generated"; exit 1; }
echo "✅ Prisma client generated"

echo "4. Building application..."
pnpm build

echo "5. Verifying build output..."
test -d dist || { echo "❌ dist directory not found"; exit 1; }
test -f dist/src/main.js || { echo "❌ dist/src/main.js not found"; exit 1; }
echo "✅ Build successful"

echo ""
echo "🎉 All tests passed!"

