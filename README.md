# ⚡ AGENZA

**AI Agent Marketplace — Deploy. Don't Prompt.**

Live: [agenza-agents.vercel.app](https://agenza-agents.vercel.app)

---

## What is Agenza?

Agenza is a marketplace for autonomous AI agents that execute entire workflows — from goal to verified outcome. Browse agents, compare Brutal Scores™, run head-to-head Arena battles, and chain agents into multi-step pipelines.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React, Framer Motion, Vanilla CSS |
| Backend | FastAPI, SQLite, Python subprocess execution |
| Hosting | Vercel (frontend), Render (backend) |
| Design | Neobrutalist design system, dark/light mode |

## Features

- **Marketplace** — Browse, search, and filter AI agents by category
- **Agent Pages** — HuggingFace-style benchmark breakdowns (Speed, Cost, Accuracy, Reliability)
- **Arena** — Live head-to-head agent battles with real-time log streaming
- **Dashboard** — Execution history, stats, and agent management
- **Workflows** — Chain agents into structured automation pipelines
- **Brutal Score™** — Dynamic 0-100 rating from raw execution telemetry

## Project Structure

```
├── src/
│   ├── app/              # Next.js pages (marketplace, arena, dashboard, agents/[id])
│   ├── components/       # Reusable UI components (AgentCard, Navbar, Footer)
│   ├── context/          # Theme provider (dark/light mode)
│   └── lib/              # API client
├── backend/
│   ├── main.py           # FastAPI server + routes
│   ├── database.py       # SQLite schema + seeding
│   ├── execution.py      # Subprocess agent runner
│   ├── benchmark.py      # Brutal Score calculator
│   └── agents/           # Python agent scripts
└── docs/                 # Documentation
```

## Quick Start

```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/agents` | List all agents |
| GET | `/api/agents/{id}` | Agent detail + executions |
| POST | `/api/execute` | Run an agent |
| POST | `/api/arena/battle` | Head-to-head battle |
| GET | `/api/executions` | Execution history |

## Deployment

- **Frontend**: Auto-deploys to Vercel on push
- **Backend**: Auto-deploys to Render from [agenza-backend](https://github.com/EchoOfCode/agenza-backend)

---

*Built for hackathon. Ship or die.*
