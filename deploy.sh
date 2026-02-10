#!/bin/bash
# Dragon HQ Deployment Script

echo "🐉 Dragon HQ Deployment"
echo "======================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Deploying to Vercel..."
    vercel --prod
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi
