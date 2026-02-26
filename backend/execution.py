
import asyncio
import json
import os
import subprocess
import sys
import time
import threading
import uuid

from database import get_db

AGENT_DIR = os.path.join(os.path.dirname(__file__), "agents")
TIMEOUT_SECONDS = 60

active_executions: dict[str, list[dict]] = {}

def _run_subprocess(file_path: str, goal_json: str, execution_id: str) -> dict:

    start_time = time.time()
    logs = []
    output = None
    status = "done"
    tool_calls = 0
    token_cost = 0.0

    active_executions[execution_id] = logs

    try:
        proc = subprocess.Popen(
            [sys.executable, file_path, "--goal", goal_json],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=AGENT_DIR,
            text=True,
            bufsize=1,
        )

        try:
            deadline = time.time() + TIMEOUT_SECONDS
            while proc.poll() is None:
                if time.time() > deadline:
                    proc.kill()
                    status = "timeout"
                    timeout_log = {
                        "type": "log",
                        "time": f"{time.time() - start_time:.1f}s",
                        "level": "error",
                        "text": f"TIMEOUT after {TIMEOUT_SECONDS}s — agent killed",
                    }
                    logs.append(timeout_log)
                    break

                line = proc.stdout.readline()
                if not line:
                    continue

                line_str = line.strip()
                if not line_str:
                    continue

                try:
                    parsed = json.loads(line_str)
                    if parsed.get("type") == "result":
                        output = parsed.get("output", "")
                        tool_calls = parsed.get("tool_calls", 0)
                        token_cost = parsed.get("token_cost", 0.0)
                    else:
                        logs.append(parsed)
                except json.JSONDecodeError:
                    log_entry = {
                        "type": "log",
                        "time": f"{time.time() - start_time:.1f}s",
                        "level": "info",
                        "text": line_str,
                    }
                    logs.append(log_entry)

            remaining = proc.stdout.read()
            if remaining:
                for line_str in remaining.strip().split("\n"):
                    if not line_str.strip():
                        continue
                    try:
                        parsed = json.loads(line_str.strip())
                        if parsed.get("type") == "result":
                            output = parsed.get("output", "")
                            tool_calls = parsed.get("tool_calls", 0)
                            token_cost = parsed.get("token_cost", 0.0)
                        else:
                            logs.append(parsed)
                    except json.JSONDecodeError:
                        pass

        except Exception as e:
            status = "failed"
            logs.append(
                {
                    "type": "log",
                    "time": f"{time.time() - start_time:.1f}s",
                    "level": "error",
                    "text": f"Execution error: {str(e)}",
                }
            )

    except FileNotFoundError:
        status = "failed"
        logs.append(
            {
                "type": "log",
                "time": "0.0s",
                "level": "error",
                "text": "Python not found or agent file missing",
            }
        )

    duration_ms = int((time.time() - start_time) * 1000)

    return {
        "status": status,
        "output": output,
        "logs": logs,
        "duration_ms": duration_ms,
        "token_cost": token_cost,
        "tool_calls": tool_calls,
    }

async def run_agent(agent_id: str, goal: str) -> dict:

    execution_id = str(uuid.uuid4())

    db = await get_db()
    try:
        cursor = await db.execute(
            "SELECT file_path, name FROM agents WHERE id = ?", (agent_id,)
        )
        agent = await cursor.fetchone()
        if not agent:
            raise ValueError(f"Agent {agent_id} not found")

        file_path = os.path.join(
            AGENT_DIR, os.path.basename(agent["file_path"]))
        if not os.path.exists(file_path):
            file_path = os.path.join(AGENT_DIR, "_mock_agent.py")

        await db.execute(
            "INSERT INTO executions (id, agent_id, goal, status) VALUES (?, ?, ?, ?)",
            (execution_id, agent_id, goal, "running"),
        )
        await db.commit()
    finally:
        await db.close()

    goal_json = json.dumps({"goal": goal, "agent_id": agent_id})
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(
        None, _run_subprocess, file_path, goal_json, execution_id
    )

    db = await get_db()
    try:
        await db.execute(
            (
                result["status"],
                result["output"] or "",
                json.dumps(result["logs"]),
                result["duration_ms"],
                result["token_cost"],
                result["tool_calls"],
                execution_id,
            ),
        )
        await db.execute(
            "UPDATE agents SET total_runs = total_runs + 1 WHERE id = ?",
            (agent_id,),
        )
        await db.commit()
    finally:
        await db.close()

    def cleanup():
        active_executions.pop(execution_id, None)

    loop.call_later(120, cleanup)

    return {
        "execution_id": execution_id,
        "agent_id": agent_id,
        **result,
    }

async def run_battle(alpha_id: str, beta_id: str, task: str) -> dict:

    battle_id = str(uuid.uuid4())

    alpha_result, beta_result = await asyncio.gather(
        run_agent(alpha_id, task),
        run_agent(beta_id, task),
    )

    alpha_score = (alpha_result["duration_ms"] or 99999) + (
        alpha_result["token_cost"] or 1
    ) * 10000
    beta_score = (beta_result["duration_ms"] or 99999) + (
        beta_result["token_cost"] or 1
    ) * 10000
    winner_id = alpha_id if alpha_score <= beta_score else beta_id

    db = await get_db()
    try:
        await db.execute(
            (
                battle_id,
                task,
                alpha_id,
                beta_id,
                winner_id,
                json.dumps(alpha_result),
                json.dumps(beta_result),
            ),
        )
        await db.commit()
    finally:
        await db.close()

    return {
        "battle_id": battle_id,
        "task": task,
        "alpha": alpha_result,
        "beta": beta_result,
        "winner_id": winner_id,
    }
