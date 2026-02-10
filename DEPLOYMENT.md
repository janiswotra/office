# 🚀 Deployment Guide for Dragon HQ

## Prerequisites

1. **Vercel Account** — Sign up at https://vercel.com
2. **Vercel CLI** — Install with `npm install -g vercel`

## First-Time Deployment

```bash
# 1. Navigate to project
cd /home/ubuntu/clawd/dragon-hq

# 2. Login to Vercel (if not already)
vercel login

# 3. Deploy (will prompt for project setup)
vercel --prod
```

### Vercel Setup Prompts

When you run `vercel --prod` for the first time:

1. **Set up and deploy?** → Yes
2. **Which scope?** → Choose your account
3. **Link to existing project?** → No (first time)
4. **Project name?** → `dragon-hq` (or your choice)
5. **Directory?** → `.` (current directory)
6. **Override settings?** → No

## Subsequent Deployments

After initial setup, just run:

```bash
./deploy.sh
# or
vercel --prod
```

## Quick Deploy Script

Make the deploy script executable:

```bash
chmod +x deploy.sh
```

Then deploy with:

```bash
./deploy.sh
```

## Environment Variables

**None required!** Everything is configured in the code. The API endpoint and auth token are baked into `/api/status.ts`.

⚠️ **Security Note:** For production, consider moving the auth token to Vercel environment variables:

1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add: `GATEWAY_AUTH_TOKEN` = `6bd6bfd52ef611dee38f19d1428716a297982e7ebd3d9111`
4. Update `api/status.ts` to use `process.env.GATEWAY_AUTH_TOKEN`

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Testing the API

Test the status endpoint locally:

```bash
# Start dev server
npm run dev

# In another terminal, test API
curl http://localhost:3000/api/status
```

## Custom Domain

To add a custom domain (e.g., `hq.yena.ai`):

1. Go to Vercel dashboard → Your project
2. Settings → Domains
3. Add domain and follow DNS instructions

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### API Not Working

Check that the OpenClaw gateway is accessible:

```bash
curl -H "Authorization: Bearer 6bd6bfd52ef611dee38f19d1428716a297982e7ebd3d9111" \
  http://3.74.149.204:18789/api/sessions?limit=5
```

### Vercel Deployment Issues

```bash
# Re-link project
vercel link

# Deploy again
vercel --prod
```

## Production URL

After deployment, Vercel will give you a URL like:
- `https://dragon-hq.vercel.app`
- Or your custom domain

## Updating the Dashboard

```bash
# Make your changes
# Then deploy
git add .
git commit -m "Update dashboard"
vercel --prod
```

---

**Need help?** Check Vercel docs: https://vercel.com/docs
