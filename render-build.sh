#!/usr/bin/env bash
# render-build.sh

# Exit on error
set -o errexit

echo "📦 Installing dependencies..."
npm install

echo "🔄 Generating Prisma Client..."
npx prisma generate

echo "🏗️  Building application..."
npm run build

echo "✅ Build completed successfully!"