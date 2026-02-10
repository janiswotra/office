# Dragon HQ v2 — Live Office View

## ✅ What's Been Done

### 1. Status Server (Express on Port 3002)
- **Location:** `/home/ubuntu/clawd/dragon-hq/server/status-server.js`
- **Status:** ✅ RUNNING on PM2
- **Endpoint:** `http://3.74.149.204:3002/status`
- **Features:**
  - Reads OpenClaw session data from `/home/ubuntu/.openclaw/agents/main/sessions/`
  - Parses `.jsonl` transcript files for recent activity
  - Maps cron IDs to agents (Scribe, Hunter, Herald, Scout, Builder, Daniel)
  - Auto-refreshes cache every 60 seconds
  - CORS enabled for all origins
  - Health check at `/health`

### 2. Agent Mapping
```javascript
// Scribe (Blog Writer)
fb78f97d, 39ba03ce, e456ede7, ec9f1cea, 5d0b5928, 8fab4d0c, ba090a67

// Hunter (Recruiter)
c52aab3a, 9ba06984

// Herald (Social)
916cbc7e, fdc3758d

// Scout (Research)
235c17c8

// Builder (Dev/SEO)
8267aa87, 823e7d2b

// Daniel (Main)
agent:main:main
```

### 3. Office UI Redesign
- **Components Created:**
  - `AgentDesk.tsx` — Individual agent workspace with animations
  - Updated `OfficeLayout.tsx` — Office floor with boss desk + team grid
  - Updated `ActivityFeed.tsx` — Real-time scrolling activity log
  - Updated `StatsBar.tsx` — Live stats with color-coded metrics
  - Updated `App.tsx` — Fetches from status server

- **Design Features:**
  - 🐉 Daniel Dragon as boss desk (center, larger)
  - Each agent has a visual "desk" with emoji avatar
  - Active agents: pulsing green glow + animated typing dots
  - Completed tasks: checkmark badge + green flash
  - Idle agents: dimmed/grey with sleep emoji
  - Speech bubbles showing current work
  - Monitor/screen displays showing task text
  - Desk decorations matching agent roles

- **Animations:**
  - Pulsing glow for active agents
  - Bounce animations for typing indicators
  - Smooth transitions between states
  - Slide-in animations for activity feed
  - CSS keyframe animations (no JS animation libraries)

### 4. PM2 Configuration
- **File:** `ecosystem.config.cjs`
- **Command to start:** `pm2 start ecosystem.config.cjs`
- **Command to check:** `pm2 list`
- **Logs:** `pm2 logs dragon-hq-status`
- **Auto-restart:** Enabled
- **Saved:** Yes (`pm2 save` completed)

### 5. Deployment
- **GitHub Repo:** `janiswotra/office`
- **Vercel URL:** `https://office-snowy-theta.vercel.app/`
- **Status:** ✅ PUSHED to main branch
- **Build:** ✅ SUCCESSFUL (vite build completed)

## ⚠️ IMPORTANT: AWS Security Group

**Port 3002 is currently NOT accessible externally.**

The server is running and listening on `0.0.0.0:3002`, but the AWS Security Group needs to be configured.

### To Fix (Manual Step Required):

1. **Go to AWS EC2 Console**
2. **Find instance:** `i-0865d3fc5e57b19d5`
3. **Security Groups** → Find the attached security group
4. **Edit Inbound Rules** → Add rule:
   - Type: Custom TCP
   - Port: 3002
   - Source: 0.0.0.0/0 (or specific IPs)
   - Description: Dragon HQ Status Server

**Alternative (if AWS CLI is available):**
```bash
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
INSTANCE_ID=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)
SG_ID=$(aws ec2 describe-instances --instance-id $INSTANCE_ID --query 'Reservations[0].Instances[0].SecurityGroups[0].GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 3002 --cidr 0.0.0.0/0
```

## 🧪 Testing

### Local Test (Server):
```bash
curl http://localhost:3002/status | jq '.'
curl http://localhost:3002/health
```

### External Test (After Security Group Fix):
```bash
curl http://3.74.149.204:3002/status
```

### Frontend Development:
```bash
cd /home/ubuntu/clawd/dragon-hq
npm run dev  # Start dev server on http://localhost:5173
```

## 📊 Status JSON Structure

```json
{
  "agents": [
    {
      "id": "daniel",
      "name": "Daniel Dragon",
      "emoji": "🐉",
      "role": "Chief Orchestrator",
      "model": "Opus 4.6",
      "status": "active|idle|completed",
      "currentTask": "Chatting with Janis about Dragon HQ",
      "lastCompleted": "Hunter Pipeline v2",
      "lastCompletedAt": "2026-02-10T08:27:00Z",
      "tasksToday": 12,
      "color": "#00d4aa"
    }
  ],
  "stats": {
    "blogPostsToday": 3,
    "candidatesSourced": 24,
    "emailsSent": 17,
    "totalTasksToday": 15
  },
  "recentActivity": [
    {
      "agent": "Scribe",
      "action": "Published blog post",
      "time": "07:30",
      "status": "completed"
    }
  ]
}
```

## 🚀 Next Steps

1. **Open port 3002** in AWS Security Group (manual step)
2. **Verify external access:** `curl http://3.74.149.204:3002/status`
3. **Vercel auto-deploy** will pick up the GitHub changes
4. **Monitor Vercel deployment** at https://vercel.com/janiswotra/office

## 🔧 Maintenance

### PM2 Commands:
```bash
pm2 list                    # List all processes
pm2 logs dragon-hq-status   # View logs
pm2 restart dragon-hq-status # Restart server
pm2 stop dragon-hq-status   # Stop server
pm2 save                    # Save process list
```

### Update Frontend:
```bash
cd /home/ubuntu/clawd/dragon-hq
# Make changes to src/ files
npm run build
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_office -o IdentitiesOnly=yes" git add -A
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_office -o IdentitiesOnly=yes" git commit -m "Update Dragon HQ"
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_office -o IdentitiesOnly=yes" git push origin main
```

### Update Server:
```bash
cd /home/ubuntu/clawd/dragon-hq/server
# Edit status-server.js
pm2 restart dragon-hq-status
```

## 📝 Notes

- Status server refreshes every 60 seconds from disk
- Frontend polls every 30 seconds
- Session files parsed from `/home/ubuntu/.openclaw/agents/main/sessions/`
- Cron session format: `agent:main:cron:<cronId>-<uuid>`
- Agent status logic:
  - Updated < 5 min ago = "active"
  - Updated < 30 min ago = "completed"
  - Otherwise = "idle"

## 🎨 Design Philosophy

The office view makes the AI team feel **ALIVE**:
- Real desks with decorations
- Pulsing animations for active work
- Speech bubbles showing current thoughts
- Activity feed like a team chat
- Each agent has personality through emoji + colors
- Boss desk is bigger (Daniel Dragon at center/top)

Built with: React + TypeScript + Tailwind CSS + Vite
Server: Express.js + Node.js
Deployed: Vercel (frontend) + EC2 PM2 (backend)
