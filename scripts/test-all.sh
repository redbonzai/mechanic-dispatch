#!/bin/bash
# Comprehensive test script for the entire system

set -e

echo "🧪 Testing Mechanic Dispatch System"
echo "===================================="
echo ""

cd "$(dirname "$0")/.."

ERRORS=0

# Test 1: Clean up old migrations
echo "Test 1: Cleaning up old migrations..."
rm -rf prisma/migrations/20250115000000_add_mechanics_reviews_skills 2>/dev/null || true
rm -rf prisma/migrations/202511151100_payment_workflow 2>/dev/null || true
rm -rf prisma/migrations/20251115160659_init 2>/dev/null || true
rm -rf prisma/migrations/20251115195905_init 2>/dev/null || true

MIGRATION_COUNT=$(ls -d prisma/migrations/202* 2>/dev/null | wc -l | tr -d ' ')
if [ "$MIGRATION_COUNT" -eq 3 ]; then
    echo "✅ Correct number of migrations ($MIGRATION_COUNT)"
else
    echo "⚠️  Found $MIGRATION_COUNT migrations (expected 3)"
fi
echo ""

# Test 2: Generate Prisma client
echo "Test 2: Generating Prisma client..."
if DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public" \
   pnpm prisma generate > /tmp/prisma-generate.log 2>&1; then
    echo "✅ Prisma client generated successfully"
else
    echo "❌ Failed to generate Prisma client"
    cat /tmp/prisma-generate.log
    ERRORS=$((ERRORS + 1))
fi

if [ -d "node_modules/.prisma/client" ]; then
    echo "✅ Prisma client directory exists"
else
    echo "❌ Prisma client directory missing"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Test 3: Build application
echo "Test 3: Building application..."
if pnpm build > /tmp/build.log 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    tail -30 /tmp/build.log
    ERRORS=$((ERRORS + 1))
fi

if [ -f "dist/src/main.js" ]; then
    echo "✅ dist/src/main.js exists"
else
    echo "❌ dist/src/main.js missing"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Test 4: Check Docker Compose
echo "Test 4: Checking Docker Compose setup..."
if command -v docker > /dev/null && command -v docker compose > /dev/null; then
    echo "✅ Docker and Docker Compose available"
    
    # Check if containers are running
    if docker compose ps 2>/dev/null | grep -q "mechanic-dispatch"; then
        echo "✅ Docker containers detected"
        
        # Check database health
        if docker compose exec -T db pg_isready -U postgres > /dev/null 2>&1; then
            echo "✅ Database is healthy"
        else
            echo "⚠️  Database not ready (may need to start)"
        fi
    else
        echo "⚠️  Containers not running (will test build)"
    fi
else
    echo "⚠️  Docker not available, skipping container tests"
fi
echo ""

# Test 5: Verify migrations structure
echo "Test 5: Verifying migrations structure..."
EXPECTED_MIGRATIONS=("20241115000000_init" "20241115000001_payment_workflow" "20241115000002_add_mechanics_reviews_skills")
for migration in "${EXPECTED_MIGRATIONS[@]}"; do
    if [ -d "prisma/migrations/$migration" ] && [ -f "prisma/migrations/$migration/migration.sql" ]; then
        echo "✅ Migration $migration exists"
    else
        echo "❌ Migration $migration missing or incomplete"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# Test 6: Verify seed file
echo "Test 6: Verifying seed file..."
if [ -f "prisma/seed.ts" ]; then
    echo "✅ Seed file exists"
    
    # Check if it imports PrismaClient
    if grep -q "PrismaClient" prisma/seed.ts; then
        echo "✅ Seed file imports PrismaClient"
    else
        echo "❌ Seed file missing PrismaClient import"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "❌ Seed file missing"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Test 7: Verify setup script
echo "Test 7: Verifying setup script..."
if [ -f "scripts/setup-db.sh" ] && [ -x "scripts/setup-db.sh" ]; then
    echo "✅ Setup script exists and is executable"
else
    echo "❌ Setup script missing or not executable"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Test 8: Check package.json scripts
echo "Test 8: Verifying package.json scripts..."
REQUIRED_SCRIPTS=("db:setup" "prisma:generate" "prisma:seed" "build" "prebuild")
for script in "${REQUIRED_SCRIPTS[@]}"; do
    if grep -q "\"$script\"" package.json; then
        echo "✅ Script '$script' exists"
    else
        echo "❌ Script '$script' missing"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# Summary
echo "===================================="
if [ $ERRORS -eq 0 ]; then
    echo "🎉 All tests passed!"
    echo ""
    echo "Next steps:"
    echo "  1. Start Docker: docker compose up -d"
    echo "  2. Setup database: pnpm db:setup"
    echo "  3. Start API: pnpm start:dev"
    exit 0
else
    echo "❌ Found $ERRORS error(s)"
    echo ""
    echo "Run 'pnpm fix:all' to attempt automatic fixes"
    exit 1
fi

