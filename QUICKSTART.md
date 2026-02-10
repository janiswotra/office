# ⚡ Dragon HQ — Quick Start

## 🎯 What This Is

A real-time dashboard showing your AI agent team working. Watch agents process tasks, see live stats, and track every action across your AI workforce.

## 🏃 Run It Locally (Right Now!)

```bash
cd /home/ubuntu/clawd/dragon-hq
npm run dev
```

Open **http://localhost:3000** in your browser. You'll see:

- 🐉 **Daniel Dragon** — Your main orchestrator
- ✍️ **Scribe** — Blog writing agent  
- 🔍 **Hunter** — Recruitment pipeline
- 📊 **Scout** — Research & keywords
- 📣 **Herald** — Social media content
- 🏗️ **Builder** — Dev & deployments

The dashboard auto-refreshes every 30 seconds from the OpenClaw gateway.

## 🚀 Deploy to Production

```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Deploy (will prompt for setup first time)
vercel --prod
```

Follow the prompts, and you'll get a live URL like `dragon-hq.vercel.app`

## 📊 What You'll See

### Top Stats Bar
- ⚡ Total tasks completed today
- ✍️ Blog posts published
- 🔍 Candidates sourced
- 📧 Emails sent

### Agent Cards
Each agent shows:
- Current status (🟢 active, ⚪ idle, 🔵 completed)
- What they're working on right now
- Last completed task
- Tasks completed today

### Activity Feed
Live stream of recent actions:
- "Scribe published Polish blog post — 06:09"
- "Hunter scraped 311 LinkedIn jobs — 06:02"
- Real-time updates every 30s

## 🎨 Visual Features

- **Dark navy theme** — Easy on the eyes for monitoring
- **Pulsing indicators** — Active agents pulse green
- **Smooth animations** — Cards fade in, activities slide in
- **Mobile responsive** — Works on phone, tablet, desktop
- **Premium feel** — Gradient text, subtle shadows, polished UI

## 🔧 How It Works

1. **API Endpoint** (`/api/status.ts`) fetches from OpenClaw gateway
2. **Cron mapping** identifies which agent ran which job
3. **Frontend polls** every 30s for updates
4. **Smart status** — Detects active/idle/completed from session data

## 🎯 Customization

### Add a New Agent

Edit `api/status.ts`:

```typescript
const agentDefinitions = {
  // ... existing agents
  newAgent: {
    id: 'newagent',
    name: 'New Agent',
    emoji: '🤖',
    role: 'Your Role',
    model: 'Sonnet 4.5',
    color: '#FF5733'
  }
};
```

### Change Polling Interval

Edit `src/App.tsx`:

```typescript
// Poll every 30 seconds (default)
const interval = setInterval(fetchStatus, 30000)

// Change to 1 minute
const interval = setInterval(fetchStatus, 60000)
```

### Modify Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  navy: '#1a1a2e',  // Main background
  teal: '#00d4aa',  // Accent color
  // ... add your colors
}
```

## 📁 Project Structure

```
dragon-hq/
├── api/
│   └── status.ts          # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── AgentCard.tsx      # Individual agent display
│   │   ├── ActivityFeed.tsx   # Recent activity sidebar
│   │   ├── StatsBar.tsx       # Top stats bar
│   │   └── OfficeLayout.tsx   # Agent grid layout
│   ├── App.tsx            # Main app component
│   ├── types.ts           # TypeScript interfaces
│   └── index.css          # Tailwind + custom styles
├── package.json
├── vite.config.ts
└── vercel.json
```

## 🐛 Troubleshooting

**Dashboard shows all agents idle?**
- Check OpenClaw gateway is running: `curl http://3.74.149.204:18789/api/sessions`
- Verify auth token is correct in `api/status.ts`

**Build fails?**
```bash
rm -rf node_modules
npm install
npm run build
```

**Dev server won't start?**
```bash
# Check port 3000 isn't in use
lsof -i :3000
# Kill process if needed, then
npm run dev
```

## 🎉 You're Done!

Your CEO can now watch the AI team work in real-time. Premium command center vibes. 🐉

---

**Pro tip:** Bookmark the deployed URL and open it on a second monitor while you work. Watch your agents crush tasks throughout the day.
