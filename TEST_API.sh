#!/bin/bash
# Test API endpoint locally

echo "🧪 Testing Dragon HQ API Endpoint"
echo "=================================="
echo ""

# Check if dev server is running
if ! lsof -i :3000 &> /dev/null; then
    echo "⚠️  Dev server not running on port 3000"
    echo "Start it with: npm run dev"
    exit 1
fi

echo "✅ Dev server detected on port 3000"
echo ""

echo "📡 Fetching /api/status..."
echo ""

# Test the API endpoint
curl -s http://localhost:3000/api/status | jq '.' || curl -s http://localhost:3000/api/status

echo ""
echo ""
echo "✅ Test complete!"
