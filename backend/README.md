# Agenza Backend

Lean FastAPI server that runs AI agents as subprocesses, captures execution logs, and scores performance.

## Quick Start

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Server starts at `http://localhost:8000`. SQLite database auto-creates on first run with 6 seed agents.

## How It Works

```
User clicks "Run Agent"
  → POST /api/execute { agent_id, goal }
  → Backend loads agent file path from SQLite
  → Spawns subprocess: python agent.py --goal '{"goal":"..."}'
  → Captures stdout line-by-line (JSON logs)
  → Enforces 60s timeout (kills process if exceeded)
  → Calculates Brutal Score
  → Stores output + logs in SQLite
  → Returns full result to frontend
```

### Agent Output Protocol

Agents print **one JSON object per line** to stdout:

```json
{"type": "log", "time": "0.0s", "level": "info", "text": "Starting research..."}
{"type": "log", "time": "2.1s", "level": "tool", "text": "[TOOL] WebSearch('quantum')"}
{"type": "log", "time": "4.3s", "level": "success", "text": "Found 12 results"}
{"type": "result", "output": "...", "tool_calls": 4, "token_cost": 0.02}
```

Log levels: `info`, `tool`, `success`, `error`

The final line must be `type: "result"` with the agent's output.

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/api/agents` | List all agents (optional `?category=research`) |
| `GET` | `/api/agents/{id}` | Agent details + recent executions |
| `POST` | `/api/agents` | Register a new agent |
| `POST` | `/api/execute` | Run agent on a goal |
| `POST` | `/api/arena/battle` | Head-to-head battle (concurrent) |
| `GET` | `/api/executions` | Execution history |
| `GET` | `/api/battles` | Battle history |
| `WS` | `/ws/execute/{id}` | Stream execution logs |
| `WS` | `/ws/arena/{id}` | Stream battle logs |

## Brutal Score

```
Score = Speed (25%) + Cost Efficiency (25%) + Accuracy (30%) + Reliability (20%)
```

- **Speed**: How fast vs. 60s baseline
- **Cost**: Token spend vs. $0.10 baseline
- **Accuracy**: Output quality (length + structure)
- **Reliability**: Success rate across runs

## Project Structure

```
backend/
├── main.py              # FastAPI app + all routes
├── database.py          # SQLite schema + seed data
├── execution.py         # Subprocess runner + timeout
├── benchmark.py         # Score calculator
├── websocket_manager.py # WebSocket log streaming
├── requirements.txt     # Python deps
├── agenza.db            # SQLite (auto-created)
└── agents/              # Agent scripts
    ├── _mock_agent.py
    ├── citation_hunter.py
    └── thesis_director.py
```

## Adding a New Agent

1. Create `agents/my_agent.py`
2. Print JSON log lines to stdout
3. End with a `{"type": "result", ...}` line
4. Register via `POST /api/agents`:

```bash
curl -X POST http://localhost:8000/api/agents \
  -H "Content-Type: application/json" \
  -d '{"name": "My Agent", "category": "research", "file_path": "agents/my_agent.py"}'
```

## Tech Stack

- **FastAPI** — async REST + WebSocket
- **SQLite** (via aiosqlite) — zero-config database
- **Pydantic** — request validation
- **subprocess** — agent execution with timeout enforcement
