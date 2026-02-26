
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import uuid

from database import get_db, init_db
from execution import run_agent, run_battle
from benchmark import calculate_brutal_score, BENCHMARK_TASKS
from websocket_manager import manager

app = FastAPI(title="Agenza API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await init_db()

class ExecuteRequest(BaseModel):
    agent_id: str
    goal: str

class BattleRequest(BaseModel):
    alpha_id: str
    beta_id: str
    task: str

class AgentCreate(BaseModel):
    name: str
    description: Optional[str] = ""
    category: Optional[str] = "general"
    type: Optional[str] = "python"
    file_path: Optional[str] = ""

@app.get("/")
async def root():
    return {"name": "Agenza API", "version": "1.0.0", "status": "operational"}

@app.get("/api/agents")
async def list_agents(category: Optional[str] = None):
    db = await get_db()
    try:
        if category:
            cursor = await db.execute(
                "SELECT * FROM agents WHERE category = ? ORDER BY brutal_score DESC",
                (category,),
            )
        else:
            cursor = await db.execute(
                "SELECT * FROM agents ORDER BY brutal_score DESC"
            )
        rows = await cursor.fetchall()
        agents = [dict(row) for row in rows]
        return {"agents": agents, "total": len(agents)}
    finally:
        await db.close()

@app.get("/api/agents/{agent_id}")
async def get_agent(agent_id: str):
    db = await get_db()
    try:
        cursor = await db.execute("SELECT * FROM agents WHERE id = ?", (agent_id,))
        row = await cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Agent not found")

        agent = dict(row)

        exec_cursor = await db.execute(
            "SELECT * FROM executions WHERE agent_id = ? ORDER BY created_at DESC LIMIT 10",
            (agent_id,),
        )
        executions = [dict(r) for r in await exec_cursor.fetchall()]
        agent["recent_executions"] = executions

        return agent
    finally:
        await db.close()

@app.post("/api/agents")
async def create_agent(agent: AgentCreate):
    agent_id = f"agent-{uuid.uuid4().hex[:8]}"
    db = await get_db()
    try:
        await db.execute(
            (
                agent_id,
                agent.name,
                agent.description,
                agent.category,
                agent.type,
                agent.file_path,
            ),
        )
        await db.commit()
        return {"id": agent_id, "name": agent.name, "status": "created"}
    finally:
        await db.close()

@app.post("/api/execute")
async def execute_agent(req: ExecuteRequest):
    try:
        result = await run_agent(req.agent_id, req.goal)

        if result["status"] == "done":
            db = await get_db()
            try:
                cursor = await db.execute(
                    "SELECT brutal_score, total_runs FROM agents WHERE id = ?",
                    (req.agent_id,),
                )
                agent = await cursor.fetchone()
                if agent:
                    scores = calculate_brutal_score(
                        duration_ms=result["duration_ms"],
                        token_cost=result["token_cost"],
                        tool_calls=result["tool_calls"],
                        output=result["output"] or "",
                        success=True,
                        prev_score=agent["brutal_score"],
                        prev_runs=agent["total_runs"],
                    )
                    await db.execute(
                        "UPDATE agents SET brutal_score = ? WHERE id = ?",
                        (scores["brutal_score"], req.agent_id),
                    )
                    await db.commit()
                    result["scores"] = scores
            finally:
                await db.close()

        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.post("/api/arena/battle")
async def arena_battle(req: BattleRequest):
    try:
        result = await run_battle(req.alpha_id, req.beta_id, req.task)
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/api/executions")
async def list_executions(agent_id: Optional[str] = None, limit: int = 20):
    db = await get_db()
    try:
        if agent_id:
            cursor = await db.execute(
                "SELECT * FROM executions WHERE agent_id = ? ORDER BY created_at DESC LIMIT ?",
                (agent_id, limit),
            )
        else:
            cursor = await db.execute(
                "SELECT * FROM executions ORDER BY created_at DESC LIMIT ?", (limit,)
            )
        rows = await cursor.fetchall()
        return {"executions": [dict(r) for r in rows]}
    finally:
        await db.close()

@app.get("/api/battles")
async def list_battles(limit: int = 10):
    db = await get_db()
    try:
        cursor = await db.execute(
            "SELECT * FROM battles ORDER BY created_at DESC LIMIT ?", (limit,)
        )
        rows = await cursor.fetchall()
        return {"battles": [dict(r) for r in rows]}
    finally:
        await db.close()

@app.get("/api/benchmark/tasks")
async def get_benchmark_tasks():
    return {"tasks": BENCHMARK_TASKS}

@app.websocket("/ws/execute/{execution_id}")
async def ws_execute(websocket: WebSocket, execution_id: str):
    await manager.connect(websocket, execution_id)
    try:
        await manager.stream_logs(websocket, execution_id)
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(websocket, execution_id)

@app.websocket("/ws/arena/{battle_id}")
async def ws_arena(websocket: WebSocket, battle_id: str):
    await manager.connect(websocket, battle_id)
    try:
        await manager.stream_logs(websocket, battle_id)
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(websocket, battle_id)
