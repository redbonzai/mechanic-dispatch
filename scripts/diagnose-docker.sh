#!/bin/bash
# Diagnose Docker build issues

set -e

echo "🔍 Diagnosing Docker Build Issues"
echo "================================="
echo ""

cd "$(dirname "$0")/.."

echo "1. Building Docker image with verbose output..."
docker compose build api 2>&1 | tee /tmp/docker-build.log

echo ""
echo "2. Checking build logs for errors..."
if grep -i "error\|fail" /tmp/docker-build.log | grep -v "node_modules"; then
    echo "❌ Found errors in build:"
    grep -i "error\|fail" /tmp/docker-build.log | grep -v "node_modules" | head -10
else
    echo "✅ No obvious errors in build log"
fi

echo ""
echo "3. Inspecting built image..."
docker run --rm --entrypoint sh mechanic-dispatch-api -c "
    echo 'Checking /app structure:'
    ls -la /app/ | head -10
    echo ''
    echo 'Checking /app/dist:'
    ls -la /app/dist/ 2>&1 || echo 'dist does not exist'
    echo ''
    echo 'Finding all .js files:'
    find /app -name '*.js' -type f | head -10
    echo ''
    echo 'Checking if main.js exists:'
    test -f /app/dist/src/main.js && echo '✅ main.js exists' || echo '❌ main.js missing'
"

echo ""
echo "4. Checking local build for comparison..."
if [ -d "dist" ]; then
    echo "Local dist contents:"
    ls -la dist/ | head -10
    if [ -f "dist/src/main.js" ]; then
        echo "✅ Local dist/src/main.js exists"
    else
        echo "❌ Local dist/src/main.js missing"
    fi
else
    echo "⚠️  Local dist directory doesn't exist (run 'pnpm build' first)"
fi

