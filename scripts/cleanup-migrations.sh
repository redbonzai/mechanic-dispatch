#!/bin/bash
# Script to clean up old conflicting migrations

set -e

echo "🧹 Cleaning up old migrations..."

cd "$(dirname "$0")/.."

# Remove old migrations with wrong timestamps
echo "Removing old migration directories..."
rm -rf prisma/migrations/20250115000000_add_mechanics_reviews_skills
rm -rf prisma/migrations/202511151100_payment_workflow
rm -rf prisma/migrations/20251115160659_init
rm -rf prisma/migrations/20251115195905_init

echo "✅ Cleanup complete!"
echo ""
echo "Remaining migrations:"
ls -d prisma/migrations/202* 2>/dev/null | sort || echo "No migrations found"

