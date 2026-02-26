# Deployment Guide

Agenza is optimized for zero-config deployment on **Vercel**.

## Production Deployment

To ship the current build to production:

```bash
npx vercel --prod
```

## Environment Setup

Ensure the following is configured in your Vercel project settings:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (if deploying from the project root)

## Build Settings

- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Domain Configuration

Agenza is currently aliased to:
- [agenza-agents.vercel.app](https://agenza-agents.vercel.app)
