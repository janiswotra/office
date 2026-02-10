# 🧪 Dragon HQ Status Test

## Quick Test Commands

### 1. Test Status API
```bash
curl http://localhost:3002/status | jq '.'
```

### 2. Check Health
```bash
curl http://localhost:3002/health
```

### 3. View Active Agents
```bash
curl -s http://localhost:3002/status | jq '.agents[] | select(.status == "active") | {name, currentTask}'
```

### 4. View Today's Stats
```bash
curl -s http://localhost:3002/status | jq '.stats'
```

### 5. Recent Activity
```bash
curl -s http://localhost:3002/status | jq '.recentActivity[0:5]'
```

### 6. PM2 Status
```bash
pm2 list
pm2 logs dragon-hq-status --lines 20
```

### 7. Test External Access (after port opens)
```bash
curl http://3.74.149.204:3002/health
```

## Expected Output

When agents are active, you should see:
- ✅ Status: "active" for working agents
- ✅ Current tasks with descriptions
- ✅ Tasks today counter
- ✅ Recent activity feed
- ✅ Stats totals

## Troubleshooting

### Server not responding
```bash
pm2 restart dragon-hq-status
pm2 logs dragon-hq-status
```

### No agents detected
Check session files:
```bash
ls -lh /home/ubuntu/.openclaw/agents/main/sessions/ | head
```

### Port not accessible
```bash
ss -tlnp | grep 3002  # Should show 0.0.0.0:3002
```

Run the port opener:
```bash
cd /home/ubuntu/clawd/dragon-hq
./scripts/open-port.sh
```
