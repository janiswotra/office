# 🐉 DRAGON HQ — START HERE

## ⚡ Quick Commands

```bash
# RUN LOCALLY (right now!)
cd /home/ubuntu/clawd/dragon-hq
npm run dev
# → Open http://localhost:3000

# DEPLOY TO PRODUCTION
vercel --prod
# Or use: ./deploy.sh

# TEST API
./TEST_API.sh
```

## 📚 Documentation Guide

| File | Purpose |
|------|---------|
| **QUICKSTART.md** | 🚀 Get running in 60 seconds |
| **DEPLOYMENT.md** | 🌐 Deploy to Vercel step-by-step |
| **PROJECT_SUMMARY.md** | 📊 Complete technical overview |
| **VISUAL_PREVIEW.md** | 🎨 See what it looks like |
| **README.md** | 📖 Standard project docs |

## 🎯 What This Does

**Dragon HQ** is a real-time dashboard showing your AI agent team working:

- 🐉 **6 AI Agents** — Each with their own card showing status and tasks
- 📊 **Live Stats** — Blog posts, candidates, emails, total tasks
- 📡 **Activity Feed** — Real-time stream of what just happened
- 🔄 **Auto-refresh** — Updates every 30 seconds from OpenClaw gateway
- 🎨 **Premium UI** — Dark theme, smooth animations, mobile responsive

## 🏃 Run It Now

```bash
npm run dev
```

That's it. Open http://localhost:3000 and watch your AI team work.

## 🚀 Deploy It

First time:
```bash
vercel --prod
```

After that:
```bash
./deploy.sh
```

You'll get a URL like `dragon-hq.vercel.app` — bookmark it and watch your agents 24/7.

## 📦 What's Included

✅ Complete React + Vite + TypeScript app
✅ Vercel serverless API endpoint
✅ Tailwind CSS with custom theme
✅ All 6 agent cards (Daniel, Scribe, Hunter, Scout, Herald, Builder)
✅ Real-time activity feed
✅ Live stats bar
✅ Mobile responsive design
✅ Smooth animations
✅ Auto-refresh (30s)
✅ Build tested (successful)
✅ Ready to deploy

## 🎨 Agent Colors

- 🐉 **Daniel Dragon** — Teal (#00d4aa)
- ✍️ **Scribe** — Blue (#4A90D9)
- 🔍 **Hunter** — Orange (#FF6B35)
- 📊 **Scout** — Purple (#9B59B6)
- 📣 **Herald** — Pink (#E74C8C)
- 🏗️ **Builder** — Green (#2ECC71)

## 📡 How It Works

```
OpenClaw Gateway
    ↓ (every 30s)
/api/status.ts (Vercel serverless)
    ↓ (processes & maps cron jobs)
Frontend (React)
    ↓ (displays)
Beautiful Dashboard
```

## 🔧 Tech Stack

- **Frontend:** React 18 + Vite 5 + TypeScript
- **Styling:** Tailwind CSS 3 + Custom theme
- **Deployment:** Vercel (serverless functions)
- **API:** OpenClaw Gateway integration
- **Animations:** CSS + Tailwind animations

## 💻 Code Stats

- **740 lines** of source code
- **18 files** (excluding node_modules)
- **4 components** (AgentCard, ActivityFeed, StatsBar, OfficeLayout)
- **1 API endpoint** (status.ts)
- **100% TypeScript** (type-safe)

## ✅ Status Indicators

- 🟢 **Active** — Agent working right now (pulsing)
- ⚪ **Idle** — Waiting for next task
- 🔵 **Completed** — Just finished (<5 min ago)

## 🎯 Next Steps

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Access from anywhere:**
   - Use the Vercel URL
   - Or add custom domain (e.g., hq.yena.ai)

4. **Customize** (optional):
   - Edit colors in `tailwind.config.js`
   - Adjust polling interval in `src/App.tsx`
   - Add more agents in `api/status.ts`

## 🆘 Troubleshooting

**Nothing showing?**
- Check OpenClaw gateway is running
- Verify auth token in `api/status.ts`

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Dev server won't start?**
```bash
# Kill any process on port 3000
lsof -i :3000
# Then restart
npm run dev
```

## 📞 Support

Read the docs:
- `QUICKSTART.md` — Fast setup
- `DEPLOYMENT.md` — Deploy guide
- `PROJECT_SUMMARY.md` — Technical details
- `VISUAL_PREVIEW.md` — Design overview

---

## 🎉 Ready to Go!

Everything is built, tested, and documented. Just run `npm run dev` to see it in action.

**Mission:** Give the CEO a premium dashboard to watch his AI team work in real-time.

**Status:** ✅ COMPLETE

Built by Daniel Dragon 🐉 — Your Chief Orchestrator
