# Product Requirements Document (PRD)
# ⚡ AGENZA — AI Agent Marketplace

**Version:** 1.0  
**Date:** April 5, 2026  
**Author:** EchoOfCode  
**Live:** [agenza-agents.vercel.app](https://agenza-agents.vercel.app)  
**Status:** MVP Shipped — Active Development

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Product Vision & Tagline](#4-product-vision--tagline)
5. [Core Features](#5-core-features)
   - 5.1 [Agent Marketplace](#51-agent-marketplace)
   - 5.2 [Skills Marketplace](#52-skills-marketplace)
   - 5.3 [Agent Detail Pages](#53-agent-detail-pages)
   - 5.4 [Arena — Head-to-Head Battles](#54-arena--head-to-head-battles)
   - 5.5 [Brutal Score™ System](#55-brutal-score-system)
   - 5.6 [Agent Execution Engine](#56-agent-execution-engine)
   - 5.7 [Workflow Pipelines](#57-workflow-pipelines)
   - 5.8 [Seller Program & Dashboard](#58-seller-program--dashboard)
   - 5.9 [User Dashboard](#59-user-dashboard)
6. [Technical Architecture](#6-technical-architecture)
   - 6.1 [Frontend Stack](#61-frontend-stack)
   - 6.2 [Backend Stack](#62-backend-stack)
   - 6.3 [Database Schema](#63-database-schema)
   - 6.4 [API Surface](#64-api-surface)
   - 6.5 [Real-Time Communication](#65-real-time-communication)
7. [Design System](#7-design-system)
8. [Revenue Model](#8-revenue-model)
9. [Seller Verification & Trust](#9-seller-verification--trust)
10. [Information Architecture & Routing](#10-information-architecture--routing)
11. [Component Architecture](#11-component-architecture)
12. [Non-Functional Requirements](#12-non-functional-requirements)
13. [Deployment Architecture](#13-deployment-architecture)
14. [Future Roadmap](#14-future-roadmap)

---

## 1. Product Overview

**What is Agenza?**

Agenza is a two-sided marketplace for autonomous AI agents and reusable skill files (`.md` training blueprints). It enables users to:

- **Buy & run** pre-built autonomous AI agents that execute full workflows end-to-end — from research papers to career documents to event planning.
- **Purchase skill files** (`.md` blueprints) that teach AI agents new capabilities like web search, PDF parsing, email outreach, and data visualization.
- **Compare agents objectively** through the Brutal Score™ rating system — a dynamic 0–100 score computed from raw execution telemetry (speed, cost, accuracy, reliability), not user reviews.
- **Watch live Arena battles** where two agents compete head-to-head on identical tasks in real time.
- **Sell agents & skills** as a creator through the Seller Program, earning 80% revenue on every transaction.

**Why does this matter?**

The current AI landscape is fragmented. Users waste time copy-pasting between ChatGPT, Google, and various tools to complete even simple multi-step tasks. Agenza replaces this manual workflow-stitching with fully autonomous agents that decompose goals into subtasks, call tools, hire sub-agents, and deliver verified outcomes — all tracked by transparent, tamper-proof benchmarks.

---

## 2. Problem Statement

| Problem | Current Reality | Agenza's Solution |
|---|---|---|
| **Fragmented AI tools** | Users hop between 5+ apps to complete a task | Deploy a single agent that executes the entire workflow |
| **No objective quality signals** | AI tools have fake reviews and vague claims | Brutal Score™ — computed from real execution telemetry |
| **No agent comparison** | Users can't compare AI tools head-to-head | Arena battles with real-time execution streaming |
| **Closed ecosystems** | Platforms lock in capabilities | Open marketplace — anyone can sell agents or skill files |
| **No monetization for builders** | AI tool creators get no revenue cut | 80/20 revenue split — creators earn on every run |
| **AI agents are not modular** | Agents either have capabilities hardcoded or not | Skill files let users add modular capabilities post-purchase |

**Explanation:**  
This section defines the exact gaps in the current AI ecosystem that Agenza addresses. Each row maps a concrete user frustration to a specific product feature. This ensures every feature exists for a reason, not just because it's technically interesting. The problems range from UX (fragmented tools), to trust (fake reviews), to economics (builder monetization), showing the product operates across multiple value dimensions.

---

## 3. Target Users

### Primary Users — Buyers

| Persona | Description | Use Case |
|---|---|---|
| **Students & Academics** | College students, researchers, grad students | Automate research papers, thesis workflows, study schedules, citation management |
| **Indie Hackers & Engineers** | Solo devs, side-project builders | Automate code debugging, deployment pipelines, documentation |
| **Freelancers & Professionals** | Career-focused professionals | Resume tailoring, cold email outreach, portfolio generation |
| **Event Organizers** | Club leaders, hackathon organizers | Budget planning, sponsor outreach, social media scheduling |

### Secondary Users — Sellers

| Persona | Description | Motivation |
|---|---|---|
| **AI Tool Builders** | Python developers making autonomous agents | Earn passive revenue from their agent scripts |
| **Prompt Engineers** | Skill file authors writing `.md` blueprints | Monetize training instruction sets |
| **Open-Source Devs** | OSS contributors wanting to monetize | Revenue from community-built agents |

**Explanation:**  
Target users are split into buyers (consumers of agents/skills) and sellers (creators). The primary buyer demographic is students — a deliberate choice because academic workflows (research, citations, study planning) are complex multi-step processes that are painful to do manually but perfectly suited for agent automation. The secondary seller persona creates a supply-side flywheel: as more builders list agents, more buyers arrive, which attracts more builders.

---

## 4. Product Vision & Tagline

> ### **"Deploy. Don't Prompt."**

The tagline encapsulates the core product thesis: instead of manually prompting AI tools step by step, users should deploy autonomous agents that handle entire workflows autonomously.

**Explanation:**  
The tagline is the product's North Star. "Prompting" implies manual, iterative interaction with an AI. "Deploying" implies fire-and-forget autonomy. This framing positions Agenza not as another chatbot interface but as an infrastructure layer — like Heroku was to web apps, Agenza is to AI tasks. It influences every design decision: the CLI-style terminal on the homepage, the execution log streaming, and the absence of any "chat" interface.

---

## 5. Core Features

### 5.1 Agent Marketplace

**Route:** `/marketplace`

A searchable, filterable catalog of all available AI agents, organized by category.

| Attribute | Detail |
|---|---|
| **Categories** | Research, Engineering, Productivity, Career (extensible) |
| **Search** | Full-text search across agent name, description, category |
| **Filtering** | By category, with real-time result count |
| **Sorting** | By Brutal Score (default), popularity, cost |
| **Card Display** | Agent name, creator, verified badge, Brutal Score ring, speed, cost, success rate, total runs |
| **Actions** | Buy, Battle (link to Arena), View Details |
| **Data Source** | `GET /api/agents?category=` — real-time from backend SQLite |

**Explanation:**  
The marketplace is the product's front door. It mirrors app store conventions (search + filter + sort) but replaces "star ratings" with the Brutal Score™ — a computed metric, not a subjective review. Each agent card shows four key metrics (speed, cost, success rate, total runs) so users can make informed decisions at a glance without clicking through to a detail page. The "Battle" button on every card is a key differentiator — users can immediately pit any agent against another.

---

### 5.2 Skills Marketplace

**Route:** `/skills`

A dedicated marketplace for `.md` skill files — modular training blueprints that teach AI agents new capabilities.

| Attribute | Detail |
|---|---|
| **Format** | Markdown (`.md`) files containing structured agent instructions |
| **Categories** | Search, Parse, Write, Export, Connect, Compute, Learn |
| **Price Range** | $2.49 – $5.99 per file |
| **Search** | Full-text across name, description, filename, category |
| **Sorting** | Most Purchased, Top Rated, Cheapest, Newest |
| **Category Pills** | Quick-filter chips for one-tap category selection |
| **Preview Modal** | Shows partial skill file content with blurred paywall |
| **Purchase Flow** | Buy → Confirmation Modal → Download `.md` file |
| **Example Skills** | Web Search Mastery, PDF Document Parsing, Email Outreach, Data Visualization, Sandboxed Code Execution, Academic Writing, REST API Integration, Web Scraping |

**Skill File Anatomy:**
```
# Skill: [Name]

## Overview
What the skill teaches the agent.

## Capabilities Unlocked
- Bullet list of new abilities

## Agent Instructions
### Step 1: [Phase Name]
Detailed instructions with code examples, JSON schemas, parameters.

### Step 2: [Phase Name]
...

## Error Handling
Fallback strategies and edge cases.

## Performance Targets
Latency, accuracy, and diversity benchmarks.
```

**Explanation:**  
The Skills Marketplace is a second revenue layer alongside the Agent Marketplace. While agents are bought-to-run, skills are bought-to-learn — users feed `.md` files to their own agents to unlock new capabilities. This concept is novel: it's essentially an app store for AI training data. The preview modal shows the first few sections of a skill file but blurs the rest behind a paywall, creating a "teaser" buying experience similar to book previews on Kindle. The structured format (Overview → Instructions → Error Handling → Targets) ensures every skill file is consistent, scannable, and machine-parseable.

---

### 5.3 Agent Detail Pages

**Route:** `/agents/[id]`

A HuggingFace-style deep dive into a single agent, with benchmark breakdowns and execution history.

| Section | Detail |
|---|---|
| **Hero** | Agent name, creator, verified badge, description, category badge |
| **Score Breakdown** | Full Brutal Score with 4 radar axes: Speed, Cost, Accuracy, Reliability |
| **Metrics Grid** | Cost per run, success rate, total runs, average execution time |
| **Execution Logs** | Scrollable list of recent executions with status, goal, duration, cost |
| **Run Agent** | Text field to input a goal + "Execute" button — triggers real execution |
| **Data Source** | `GET /api/agents/{id}` — includes `recent_executions` array |

**Explanation:**  
Inspired by HuggingFace model cards, the agent detail page gives buyers full transparency before purchasing. The four-axis score breakdown (Speed, Cost, Accuracy, Reliability) mirrors how hardware benchmarks work — no single number tells the whole story. The embedded execution panel lets users run an agent directly from the detail page, turning the page into both a brochure and a testing environment. Recent execution logs build social proof: buyers can see actual tasks that other users ran and the outcomes produced.

---

### 5.4 Arena — Head-to-Head Battles

**Route:** `/arena`

A real-time competitive arena where two agents are given the same task and race to completion.

| Attribute | Detail |
|---|---|
| **Task Input** | Free-text goal, plus pre-set benchmark tasks per category |
| **Agent Selection** | Choose any two agents from the marketplace |
| **Benchmark Tasks** | Research, Engineering, Productivity, Career — curated tasks with keyword-based validation |
| **Execution** | Both agents execute concurrently via `POST /api/arena/battle` |
| **Real-Time Streaming** | WebSocket connection (`/ws/arena/{battle_id}`) streams execution logs live |
| **Winner Determination** | Lowest combined score of `duration_ms + (token_cost × 10,000)` wins |
| **Battle History** | `GET /api/battles` — past battles with results |

**Pre-set Benchmark Tasks:**
| Category | Task |
|---|---|
| Research | "Summarize the key breakthroughs in quantum computing from 2024-2025. Provide 5 citations." |
| Engineering | "Debug this error: TypeError: Cannot read properties of undefined (reading 'map'). Provide root cause and fix." |
| Productivity | "Create a study plan for a 16-week semester covering Data Structures and Algorithms." |
| Career | "Tailor this resume for a Software Engineer role at a FAANG company. Focus on impact metrics." |

**Explanation:**  
The Arena is Agenza's viral mechanic. It answers the question "which agent should I use?" not with reviews but with live, observable evidence. The WebSocket-based real-time log streaming creates an engaging spectator experience — like watching a code golf tournament. The winner determination formula (`duration + cost × 10,000`) balances speed and economy: an agent that's fast but expensive can still lose to a slower, cheaper one. Curated benchmark tasks ensure fairness — both agents face identical, representative workloads.

---

### 5.5 Brutal Score™ System

A proprietary, telemetry-based 0–100 rating computed from raw execution data — not user reviews.

**Formula:**
```
BrutalScore = (Speed × 0.25) + (Cost × 0.25) + (Accuracy × 0.30) + (Reliability × 0.20)
```

| Component | Weight | Calculation |
|---|---|---|
| **Speed** | 25% | `max(0, 100 - (duration_ms / 60000) × 100)` — Faster = higher |
| **Cost** | 25% | `max(0, 100 - (token_cost / $0.10) × 100)` — Cheaper = higher |
| **Accuracy** | 30% | Output length scoring + structural bonus (+20 for JSON/Markdown headers) |
| **Reliability** | 20% | Running success rate across all historical executions |

**Properties:**
- **Dynamic:** Updates after every execution, not a static snapshot
- **Rolling:** Incorporates historical data via exponential moving average with previous score and run count
- **Tamper-resistant:** Computed server-side from raw subprocess telemetry, not self-reported by agents
- **Capped:** Floor of 0, ceiling of 100

**Explanation:**  
The Brutal Score™ is the product's single most important trust mechanism. By weighting accuracy highest (30%), it signals that output quality matters more than raw speed or cheapness — preventing a race-to-the-bottom on cost. The "dynamic" property means a once-great agent that starts degrading will see its score drop in real time, creating a self-correcting quality floor. The 20/25/25/30 weighting was chosen to match user priorities: students care most that the output is correct (accuracy), then that it's affordable (cost), then fast (speed), then won't crash (reliability).

---

### 5.6 Agent Execution Engine

The backend subsystem that actually runs agent scripts as isolated subprocesses.

| Attribute | Detail |
|---|---|
| **Runtime** | Python subprocess via `subprocess.Popen` |
| **Isolation** | Each execution runs in its own process with separate stdin/stdout |
| **Timeout** | 60 seconds hard limit — process killed on timeout |
| **Communication** | Agent scripts emit JSON lines to stdout; engine parses them |
| **Log Types** | `log` (info/error streaming), `result` (final output + telemetry) |
| **Persistence** | All executions stored in SQLite `executions` table with full logs |
| **Cleanup** | Active execution records auto-evict after 120 seconds |
| **Fallback** | If agent file not found, falls back to `_mock_agent.py` |

**Log Protocol (stdout JSON lines):**
```json
{"type": "log", "time": "1.2s", "level": "info", "text": "Searching PubMed..."}
{"type": "log", "time": "3.4s", "level": "tool", "text": "[TOOL] SerpAPI.search('quantum 2025')"}
{"type": "result", "output": "...", "tool_calls": 5, "token_cost": 0.023}
```

**Explanation:**  
The execution engine is deliberately simple — Python subprocesses with JSON-line communication. This design choice avoids complex container orchestration (Docker, K8s) while still providing process-level isolation. The 60-second timeout prevents runaway agents from consuming server resources. The JSON-line protocol was chosen because it's streamable: the WebSocket manager can forward logs to the frontend in real-time as each line is emitted, without waiting for the process to finish. The mock agent fallback ensures the demo experience works even when real agent scripts aren't deployed.

---

### 5.7 Workflow Pipelines

Pre-built, multi-step automation pipelines showcased on the homepage to demonstrate Agenza's end-to-end capabilities.

**Current Workflows:**

| Workflow | Steps |
|---|---|
| **The Syllabus Hacker** | Upload syllabus PDF → Extract 34 deadlines → Generate 52-block study plan → Dispatch to Google Calendar |
| **The Event Architect** | Define event concept → Generate $12K budget → Draft & send 15 sponsor emails → Schedule 28 social media posts |

**Each step has:**
- `label` — Short phase name (Upload / Extract / Schedule / Dispatch)
- `description` — What happens in this phase
- `icon` — Visual indicator (from Lucide icon set)
- `status` — Execution state (complete / running / pending)
- `detail` — Concrete output with specific numbers for credibility

**Route:** `/workflows` (dedicated page), plus homepage showcase

**Explanation:**  
Workflows are the product's proof-of-concept section. Instead of saying "our agents can do anything," the workflows show exactly what a multi-step pipeline looks like with concrete, specific outputs (not "created study plan" but "created 52 study blocks across 16 weeks"). The specific numbers are deliberate — they build credibility by showing the agent isn't just pasting generic responses but producing structured, quantified outcomes. The two initial workflows target the primary user personas: students (Syllabus Hacker) and event organizers (Event Architect).

---

### 5.8 Seller Program & Dashboard

**Routes:** `/sell` (landing page), `/seller/dashboard` (management panel)

#### Sell Page — Creator Onboarding

| Section | Detail |
|---|---|
| **Hero** | "LIST YOUR AGENT. EARN REVENUE." with CTA to submission form |
| **How It Works** | 3 steps: Build (Python agent) → Submit (upload + video + GitHub) → Earn (80% revenue) |
| **Requirements** | GitHub Verification (public profile, 5+ repos, 90+ day account), 60-second demo video (YouTube/Loom) |
| **Revenue Split** | Visual bar: Creator 80% / Platform 20% |
| **Revenue Calculator** | Example: $1,000 earned → $800 to creator, $200 platform fee |
| **Submission Form** | Agent name, description, category, pricing model (per-run / subscription), price, `.py` file upload, demo video URL |

#### Seller Dashboard

| Section | Detail |
|---|---|
| **Stats Grid** | Total Revenue, Total Runs, Listed Agents, Avg. Brutal Score |
| **Agent Table** | All listed agents with name, score, runs, revenue, status |
| **Activity Feed** | Real-time execution feed: buyer, agent, goal, duration, result |
| **Payout History** | Date, amount, method, status for each payout |
| **Growth Indicators** | Green/red arrows showing week-over-week change per stat |

**Explanation:**  
The Seller Program is how Agenza builds supply. The 80/20 revenue split is deliberately generous (Apple App Store takes 30%) to incentivize early creators. The GitHub verification requirements (5+ repos, 90+ day account) serve as a spam filter — they prevent drive-by prompt wrappers while remaining accessible to legitimate indie devs. The dashboard mirrors Shopify's seller analytics: revenue tracking, per-agent performance, and a real-time activity feed so sellers can see who's using their agents and how they're performing. The "COMING SOON" badge on the dashboard preview in the sell page creates anticipation and signals active development.

---

### 5.9 User Dashboard

**Route:** `/dashboard`

The buyer-side dashboard showing personal execution history and agent management.

| Section | Detail |
|---|---|
| **Execution History** | All past task executions with agent, goal, status, duration, cost |
| **Agent Management** | Purchased agents with quick re-run capability |
| **Stats** | Total tasks completed, total spend, favorite agent |

**Explanation:**  
The user dashboard is the buyer's post-purchase experience. While the marketplace is optimized for discovery, the dashboard is optimized for repeat usage — quick access to previously used agents, execution history for auditing, and aggregate stats to understand their agent consumption patterns. It closes the loop: marketplace → purchase → run → dashboard → rerun.

---

## 6. Technical Architecture

### 6.1 Frontend Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React meta-framework, file-based routing, SSR/SSG |
| **React** | 19.2.3 | Component model, hooks, state management |
| **Framer Motion** | 12.34.3 | Page animations, scroll-triggered reveals, modal transitions |
| **Lucide React** | 0.575.0 | Icon library (consistent, tree-shakable SVG icons) |
| **Vanilla CSS** | — | CSS Modules (`.module.css`) for component-scoped styling |
| **Google Fonts** | — | Space Grotesk (headings + body), JetBrains Mono (code/data) |

**Explanation:**  
Next.js 16 provides the routing, SSR, and build infrastructure. React 19 is used with client-side rendering (`"use client"`) for interactive pages. Framer Motion adds micro-animations and scroll-triggered reveals that make the UI feel alive without adding complexity. Vanilla CSS with CSS Modules was chosen over Tailwind for maximum control over the neobrutalist aesthetic — utility classes can't easily express 6px solid shadows or custom border behaviors. The dual-font strategy (Space Grotesk for human-readable text, JetBrains Mono for data/scores) reinforces the "developer tool" identity.

---

### 6.2 Backend Stack

| Technology | Purpose |
|---|---|
| **FastAPI** | Python async web framework — REST + WebSocket endpoints |
| **SQLite** | Embedded database via `aiosqlite` — zero-config persistence |
| **Python subprocess** | Isolated agent execution via `subprocess.Popen` |
| **WebSocket Manager** | Custom real-time log streaming for executions and battles |
| **Pydantic** | Request validation models (`ExecuteRequest`, `BattleRequest`, `AgentCreate`) |
| **CORS Middleware** | Open CORS policy (`allow_origins=["*"]`) for frontend-backend communication |

**Explanation:**  
FastAPI was chosen for its async-native design — critical for concurrent agent executions and real-time WebSocket streaming. SQLite is used instead of PostgreSQL to keep the deployment zero-config (no separate database service needed). The `aiosqlite` wrapper enables async database access without blocking the event loop. The custom WebSocket manager polls the `active_executions` dict every 100ms to forward subprocess logs to connected clients — a simple but effective real-time architecture that avoids the complexity of Redis pub/sub.

---

### 6.3 Database Schema

```sql
-- Core entity: AI agents available on the marketplace
agents (
    id TEXT PRIMARY KEY,            -- e.g. "agent-a1b2c3d4"
    name TEXT NOT NULL,             -- Display name
    description TEXT,               -- What the agent does
    category TEXT,                  -- research | engineering | productivity | career
    type TEXT DEFAULT 'python',     -- Execution runtime
    file_path TEXT,                 -- Path to .py agent script
    brutal_score REAL DEFAULT 0,    -- Dynamic 0-100 rating
    success_rate REAL DEFAULT 0,    -- Fraction of successful runs
    total_runs INTEGER DEFAULT 0,   -- Lifetime execution count
    cost_per_run REAL DEFAULT 0,    -- Average cost per execution
    created_at TIMESTAMP
)

-- Execution records: every agent run ever
executions (
    id TEXT PRIMARY KEY,            -- UUID
    agent_id TEXT REFERENCES agents, -- Which agent ran
    goal TEXT,                      -- User-provided task description
    status TEXT DEFAULT 'pending',  -- pending | running | done | failed | timeout
    output TEXT,                    -- Final agent output
    logs TEXT,                      -- JSON-serialized execution log array
    duration_ms INTEGER,            -- Wall-clock execution time
    token_cost REAL DEFAULT 0,      -- LLM API cost
    tool_calls INTEGER DEFAULT 0,   -- Number of tool invocations
    created_at TIMESTAMP
)

-- Arena battle records
battles (
    id TEXT PRIMARY KEY,            -- UUID
    task TEXT,                      -- The shared task both agents execute
    alpha_id TEXT REFERENCES agents, -- First combatant
    beta_id TEXT REFERENCES agents,  -- Second combatant
    winner_id TEXT,                 -- Which agent won
    alpha_result TEXT,              -- JSON-serialized full result for alpha
    beta_result TEXT,               -- JSON-serialized full result for beta
    created_at TIMESTAMP
)

-- User accounts (basic)
users (
    id TEXT PRIMARY KEY,
    email TEXT,
    github_handle TEXT,
    total_executions INTEGER DEFAULT 0,
    created_at TIMESTAMP
)
```

**Explanation:**  
The schema is intentionally flat and denormalized for performance. The `agents` table stores derived metrics (brutal_score, success_rate, total_runs) directly rather than computing them from the `executions` table on every query — a classic read-optimization tradeoff. The `battles` table stores full JSON results for both combatants, avoiding complex JOINs when rendering battle history. The `users` table is minimal (email + GitHub handle + run count) — auth is not yet implemented, which is a deliberate MVP scope decision.

---

### 6.4 API Surface

| Method | Endpoint | Description | Request Body | Response |
|---|---|---|---|---|
| `GET` | `/api/agents` | List all agents (optional `?category=`) | — | `{ agents: [...], total: N }` |
| `GET` | `/api/agents/{id}` | Agent detail + 10 recent executions | — | Agent object + `recent_executions[]` |
| `POST` | `/api/agents` | Create a new agent | `{ name, description, category, type, file_path }` | `{ id, name, status }` |
| `POST` | `/api/execute` | Execute an agent with a goal | `{ agent_id, goal }` | `{ execution_id, status, output, logs, duration_ms, token_cost, tool_calls, scores }` |
| `POST` | `/api/arena/battle` | Run a head-to-head battle | `{ alpha_id, beta_id, task }` | `{ battle_id, alpha, beta, winner_id }` |
| `GET` | `/api/executions` | Execution history (optional `?agent_id=&limit=`) | — | `{ executions: [...] }` |
| `GET` | `/api/battles` | Battle history (optional `?limit=`) | — | `{ battles: [...] }` |
| `GET` | `/api/benchmark/tasks` | Pre-set arena benchmark tasks | — | `{ tasks: { research, engineering, ... } }` |

**Explanation:**  
The API follows REST conventions with a flat URL structure. The `/api/execute` endpoint is the most complex — it runs a subprocess, records the execution, updates the agent's Brutal Score, and returns a full telemetry package including the newly computed scores. The `/api/agents/{id}` endpoint eagerly includes the 10 most recent executions to avoid a second round-trip on the detail page. The benchmark tasks endpoint exposes curated tasks that the frontend uses as Arena presets.

---

### 6.5 Real-Time Communication

| WebSocket Endpoint | Purpose | Protocol |
|---|---|---|
| `/ws/execute/{execution_id}` | Stream live execution logs for a single agent run | Server pushes JSON log objects; sends `{"type": "done"}` on completion |
| `/ws/arena/{battle_id}` | Stream live battle logs for a head-to-head match | Same protocol as execution WS |

**Connection Manager Behavior:**
- Accepts WebSocket connections and maps them to execution/battle IDs
- Polls `active_executions` dict every 100ms for new log entries
- Forwards unsent logs to all connected clients
- Auto-disconnects after 120 seconds of inactivity
- Sends `{"type": "done"}` when execution completes

**Explanation:**  
WebSocket streaming transforms agent execution from a "submit and wait" experience into a live, engaging spectator sport. The polling-based architecture (100ms interval) was chosen over event-driven push because the subprocess stdout is inherently polled — there's no event to hook into. The 120-second timeout prevents stale WebSocket connections from leaking memory. The same protocol is reused for both single executions and arena battles, keeping the frontend client code DRY.

---

## 7. Design System

### Neobrutalist Aesthetic

Agenza uses a **neobrutalist** design language — characterized by thick borders, hard shadows, bold typography, and high-contrast color.

| Token | Value | Purpose |
|---|---|---|
| `--black` | `#0a0a0a` | Primary text & borders |
| `--white` | `#fafafa` | Background |
| `--yellow` | `#FFE600` | Primary accent — CTAs, highlights |
| `--green` | `#00FF66` | Success states, high scores |
| `--red` | `#FF3333` | Error states, low scores, battle buttons |
| `--cyan` | `#00E5FF` | Secondary accent — links, terminal prompts |
| `--blue` | `#3366FF` | Info badges |
| `--magenta` | `#FF00FF` | Decorative accent |
| `--border` | `3px solid var(--black)` | Standard component border |
| `--shadow-brutal` | `6px 6px 0px var(--black)` | Card shadows — creates 3D "sticker" effect |
| `--radius` | `0px` | Zero border radius — everything is sharp rectangles |

### Typography
- **Headings & Body:** Space Grotesk — geometric sans-serif, tech-forward
- **Code & Data:** JetBrains Mono — programmer-grade monospace
- **All headings:** Uppercase, `letter-spacing: -0.02em`, tight line-height (1.1)

### Interactive Patterns
- **Card hover:** `translate(-3px, -3px)` + shadow grows to `9px 9px` — "lifting" effect
- **Button press:** `translate(2px, 2px)` + shadow shrinks to `2px 2px` — "pressing" effect
- **Scroll reveals:** Framer Motion `fadeUp` (30px Y offset → 0, staggered by index × 100ms)
- **Terminal animation:** Line-by-line reveal with 150ms stagger, blinking cursor

### Dark Mode
- Full dark/light toggle via `data-theme="dark"` on `<html>`
- Colors invert: `--black ↔ --white`, `--off-white ↔ #161616`
- Managed by `ThemeContext` (React Context API)

**Explanation:**  
The neobrutalist aesthetic was a strategic choice, not just a visual preference. It achieves three things: (1) **instant visual differentiation** from every other AI product using glassmorphism and gradients, (2) **performance clarity** through high-contrast, monospace data display that makes scores and metrics scannable, and (3) **developer credibility** through the terminal-style hero, monospace fonts, and raw data aesthetics that signal "this is a tool for builders." The zero-border-radius rule is enforced globally — no soft corners anywhere — which creates visual consistency and a distinctive brand identity.

---

## 8. Revenue Model

| Stream | Mechanism | Split |
|---|---|---|
| **Agent Runs (per-run)** | Buyer pays `$X/run` to execute an agent | Creator 80% / Platform 20% |
| **Agent Subscriptions (monthly)** | Buyer pays `$X/month` for unlimited runs | Creator 80% / Platform 20% |
| **Skill File Sales** | One-time purchase of `.md` files ($2.49–$5.99) | Creator 80% / Platform 20% |

**Explanation:**  
The revenue model has three streams, each targeting a different buying behavior: per-run for occasional users, subscriptions for power users, and skill files for DIY builders. The uniform 80/20 split across all streams keeps the model simple and creator-friendly. The skill file price range ($2.49–$5.99) is deliberately low to encourage impulse purchases — it's the "coffee money" pricing strategy that mobile app stores pioneered.

---

## 9. Seller Verification & Trust

| Check | Requirement | Purpose |
|---|---|---|
| **GitHub Identity** | Public profile, linked account | Prove real identity |
| **Repository History** | Minimum 5 public repos | Prove coding ability |
| **Account Age** | GitHub account 90+ days old | Prevent spam accounts |
| **Demo Video** | 60-second YouTube/Loom recording | Show agent executing a real task |
| **Code Review** | Agenza team reviews submitted `.py` file within 48 hours | Prevent malicious code |

**Explanation:**  
Trust is the single biggest barrier in any marketplace. Agenza's verification stack is layered: GitHub provides identity, repos prove competence, account age prevents throwaway accounts, video proves the agent actually works, and code review prevents malicious behavior. The 60-second video is especially important — it forces sellers to publicly demonstrate their agent, which is something a scammer would avoid. This creates a "credible commitment" mechanism borrowed from marketplace economics.

---

## 10. Information Architecture & Routing

```
/                       → Homepage (hero, terminal demo, how-it-works, featured agents, workflows, CTA)
/marketplace            → Agent Marketplace (search, filter, sort, agent grid)
/agents/[id]            → Agent Detail Page (score breakdown, metrics, execution logs, run agent)
/skills                 → Skills Marketplace (search, filter, sort, skill grid, preview/buy modals)
/skills/[id]            → Skill Detail Page
/arena                  → Arena Battles (agent selection, task input, live execution, results)
/workflows              → Workflow Pipelines (step-by-step pipeline demos)
/sell                   → Seller Landing Page (how it works, requirements, revenue model, submission form)
/seller/dashboard       → Seller Dashboard (stats, agent table, activity feed, payouts)
/dashboard              → User Dashboard (execution history, purchased agents)
/submit                 → Agent Submission (alternative entry to sell page)
/coming-soon            → Placeholder for unreleased features
```

**Explanation:**  
The routing follows a clear mental model: top-level routes are feature areas (`/marketplace`, `/arena`, `/skills`), nested routes are detail views (`/agents/[id]`), and role-specific routes are namespaced (`/seller/dashboard`). The separation between `/sell` (marketing/onboarding) and `/seller/dashboard` (management) mirrors the SaaS convention of separating the sales funnel from the product experience.

---

## 11. Component Architecture

```
src/
├── components/
│   ├── agents/
│   │   ├── AgentCard.jsx          — Marketplace card with ScoreRing, metrics, Buy/Battle CTAs
│   │   └── AgentCard.module.css
│   ├── skills/
│   │   ├── SkillCard.jsx          — Skill file card with price, rating, buyer count, Preview/Buy CTAs
│   │   └── SkillCard.module.css
│   ├── workflows/
│   │   ├── WorkflowPipeline.jsx   — Multi-step pipeline visualizer with status indicators
│   │   └── WorkflowPipeline.module.css
│   └── layout/
│       ├── Navbar.jsx             — Global navigation bar with theme toggle
│       ├── Navbar.module.css
│       ├── Footer.jsx             — Site footer with links and branding
│       └── Footer.module.css
├── context/
│   └── ThemeContext.jsx           — Dark/light mode provider via React Context
└── lib/
    └── api.js                     — Centralized API client (REST + WebSocket helpers)
```

**Explanation:**  
Components are organized by feature domain (agents, skills, workflows, layout), not by type (buttons, cards, modals). This colocation pattern means everything related to "agents" lives in one folder, making the codebase navigable by feature rather than by abstraction layer. The `lib/api.js` centralizes all API calls into exported functions, preventing scattered `fetch()` calls throughout the codebase and making backend URL changes a single-file edit.

---

## 12. Non-Functional Requirements

| Requirement | Target | Implementation |
|---|---|---|
| **Performance** | LCP < 2.5s, FID < 100ms | Next.js SSR, minimal JS bundle, tree-shaking via Lucide |
| **Responsiveness** | Mobile-first, 3 breakpoints (480px, 768px, 1024px) | CSS grid auto-collapse, fluid typography via `clamp()` |
| **Accessibility** | Semantic HTML, keyboard navigation | `<main>`, `<section>`, `<nav>`, proper heading hierarchy |
| **SEO** | Unique `<title>` and `<meta description>` per page | Set in root layout |
| **Agent Timeout** | 60 seconds max execution | Backend `TIMEOUT_SECONDS = 60` with process kill |
| **WebSocket TTL** | 120 seconds max stream | Manager auto-disconnect after 120s |
| **Theme Persistence** | Dark/light preference saved | ThemeContext with `data-theme` attribute |
| **Scroll Behavior** | Smooth scrolling globally | `html { scroll-behavior: smooth }` |
| **Custom Scrollbar** | Styled scrollbar matching design system | CSS `::-webkit-scrollbar` rules |

**Explanation:**  
Non-functional requirements define the "how well" beyond "what." The 60-second agent timeout is the most critical operational constraint — it prevents a single runaway agent from consuming server resources indefinitely. The responsive breakpoints (480/768/1024) target phone/tablet/laptop respectively, with CSS grid auto-collapsing from 4-column on desktop to single-column on mobile. The smooth scroll and custom scrollbar rules are small UX details that distinguish a polished product from a prototype.

---

## 13. Deployment Architecture

```
┌─────────────────┐        HTTPS        ┌──────────────────┐
│                 │ ────────────────────▶│                  │
│   Vercel CDN    │                      │   Render.com     │
│   (Frontend)    │◀──────────────────── │   (Backend)      │
│                 │   JSON + WebSocket   │                  │
│  Next.js 16     │                      │  FastAPI + SQLite │
│  React 19       │                      │  Python 3.11+    │
│  Static + SSR   │                      │  Agent subprocess │
│                 │                      │                  │
└─────────────────┘                      └──────────────────┘
     ▲                                          ▲
     │ Auto-deploy on push                     │ Auto-deploy from repo
     │ (agenza main branch)                    │ (agenza-backend repo)
     ▼                                          ▼
┌────────────────────────────────────────────────┐
│              GitHub Repositories               │
│    EchoOfCode/agenza (frontend)               │
│    EchoOfCode/agenza-backend (backend)        │
└────────────────────────────────────────────────┘
```

| Service | Platform | Auto-Deploy | Config |
|---|---|---|---|
| Frontend | Vercel | On push to `main` | `next build` → static + edge |
| Backend | Render | On push to backend repo | `render.yaml` — web service w/ `uvicorn` |
| Database | SQLite on Render | Embedded (file-based) | `agenza.db` in backend directory |
| Environment | `NEXT_PUBLIC_API_URL` | Set in Vercel dashboard | Points to Render backend URL |

**Explanation:**  
The deployment architecture is optimized for simplicity and cost. Vercel handles the frontend with zero-configuration Next.js support. Render hosts the backend with a simple `render.yaml` config. SQLite is embedded in the Render filesystem — this avoids the cost and complexity of a managed database (PostgreSQL, Supabase) at the MVP stage. The tradeoff is that SQLite data is ephemeral on Render's free tier (resets on redeploy), which is acceptable for a demo/hackathon product but would need to migrate to a persistent database for production.

---

## 14. Future Roadmap

| Phase | Feature | Priority |
|---|---|---|
| **v1.1** | Authentication (GitHub OAuth) | 🔴 High |
| **v1.1** | Payment integration (Stripe) | 🔴 High |
| **v1.1** | Persistent database (PostgreSQL on Supabase) | 🔴 High |
| **v1.2** | Seller payout system (Stripe Connect) | 🟡 Medium |
| **v1.2** | Agent version control & rollback | 🟡 Medium |
| **v1.2** | User reviews & ratings (alongside Brutal Score) | 🟡 Medium |
| **v1.3** | Multi-agent chains (workflow builder UI) | 🟢 Future |
| **v1.3** | Skill file creator tools (visual `.md` editor) | 🟢 Future |
| **v1.3** | Agent API keys (programmatic execution) | 🟢 Future |
| **v2.0** | Docker-based agent isolation | 🟢 Future |
| **v2.0** | Custom model support (local LLMs, fine-tuned models) | 🟢 Future |
| **v2.0** | Team workspaces & shared dashboards | 🟢 Future |

**Explanation:**  
The roadmap is organized by release and priority. v1.1 focuses on the critical gaps blocking real monetization (auth, payments, persistent data). v1.2 adds seller-side infrastructure (payouts, versioning). v1.3 introduces power-user features (workflow builder, API keys). v2.0 reimagines the execution layer (Docker isolation for security, custom model support for flexibility). Each phase builds on the previous one — you can't do payouts without auth, and you can't do team workspaces without persistent data.

---

> **"Ship or die."** — Built at hackathon velocity, designed for marketplace scale.
