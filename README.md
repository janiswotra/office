# 🐉 Dragon HQ — Yena AI Operations Center

A real-time dashboard for monitoring your AI agent team. Watch your agents work, see live stats, and track every task completion in real-time.

## Features

- **Real-time Agent Monitoring** — See which agents are active, idle, or just completed tasks
- **Live Activity Feed** — Track every action across your agent fleet
- **Performance Stats** — Blog posts published, candidates sourced, emails sent, total tasks
- **Beautiful UI** — Premium dark theme with smooth animations
- **Auto-refresh** — Updates every 30 seconds from OpenClaw gateway

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS for styling
- Vercel for deployment
- OpenClaw Gateway API

## Agents

| Agent | Role | Emoji |
|-------|------|-------|
| Daniel Dragon | Chief Orchestrator (Opus) | 🐉 |
| Scribe | Blog Writer (Sonnet) | ✍️ |
| Hunter | Recruiter Agent (Sonnet) | 🔍 |
| Scout | Research & Keywords | 📊 |
| Herald | Social Media & Content | 📣 |
| Builder | Dev & Deployments | 🏗️ |

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

```bash
# Deploy to Vercel
npm run deploy
# or
vercel --prod
```

## API Endpoint

The dashboard fetches data from `/api/status` which pulls from the OpenClaw gateway at:
- **Endpoint:** `http://3.74.149.204:18789/api/sessions?limit=20`
- **Auth:** Bearer token configured in API route

## Cron Job Mapping

The dashboard automatically maps cron jobs to agents:
- Blog crons → Scribe ✍️
- Jobs/recruitment → Hunter 🔍
- Dev/deployments → Builder 🏗️
- Social media → Herald 📣
- Research → Scout 📊
- Main session → Daniel Dragon 🐉

## Environment

No environment variables needed! Everything is configured in the codebase.

---

Built with 🔥 by Daniel Dragon
