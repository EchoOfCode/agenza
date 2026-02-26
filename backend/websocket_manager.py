
from fastapi import WebSocket
from execution import active_executions
import asyncio
import json

class ConnectionManager:
    def __init__(self):
        self.connections: dict[str, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, execution_id: str):
        await websocket.accept()
        if execution_id not in self.connections:
            self.connections[execution_id] = []
        self.connections[execution_id].append(websocket)

    def disconnect(self, websocket: WebSocket, execution_id: str):
        if execution_id in self.connections:
            self.connections[execution_id].remove(websocket)
            if not self.connections[execution_id]:
                del self.connections[execution_id]

    async def stream_logs(self, websocket: WebSocket, execution_id: str):
        sent_count = 0
        max_wait = 120
        waited = 0

        while waited < max_wait:
            logs = active_executions.get(execution_id, [])

            while sent_count < len(logs):
                try:
                    await websocket.send_json(logs[sent_count])
                    sent_count += 1
                except Exception:
                    return

            if execution_id not in active_executions and sent_count > 0:
                try:
                    await websocket.send_json(
                        {"type": "done", "text": "Execution complete"}
                    )
                except Exception:
                    pass
                return

            await asyncio.sleep(0.1)
            waited += 0.1

        try:
            await websocket.send_json(
                {"type": "done", "text": "Stream timeout"}
            )
        except Exception:
            pass

manager = ConnectionManager()
