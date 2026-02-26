
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function apiFetch(path, options = {}) {
    try {
        const res = await fetch(`${API_BASE}${path}`, {
            headers: { "Content-Type": "application/json", ...options.headers },
            ...options,
        });
        if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error(`[API] ${path} failed:`, err.message);
        return null;
    }
}

export async function fetchAgents(category) {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return apiFetch(`/api/agents${query}`);
}

export async function fetchAgent(agentId) {
    return apiFetch(`/api/agents/${agentId}`);
}

export async function createAgent(data) {
    return apiFetch("/api/agents", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function executeAgent(agentId, goal) {
    return apiFetch("/api/execute", {
        method: "POST",
        body: JSON.stringify({ agent_id: agentId, goal }),
    });
}

export async function fetchExecutions(agentId, limit = 20) {
    const query = agentId ? `?agent_id=${agentId}&limit=${limit}` : `?limit=${limit}`;
    return apiFetch(`/api/executions${query}`);
}

export async function runBattle(alphaId, betaId, task) {
    return apiFetch("/api/arena/battle", {
        method: "POST",
        body: JSON.stringify({ alpha_id: alphaId, beta_id: betaId, task }),
    });
}

export async function fetchBattles(limit = 10) {
    return apiFetch(`/api/battles?limit=${limit}`);
}

export async function fetchBenchmarkTasks() {
    return apiFetch("/api/benchmark/tasks");
}

export function connectExecutionWS(executionId, onMessage, onDone) {
    const wsBase = API_BASE.replace("http", "ws");
    const ws = new WebSocket(`${wsBase}/ws/execute/${executionId}`);

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "done") {
            onDone?.(data);
        } else {
            onMessage?.(data);
        }
    };

    ws.onerror = (err) => console.error("[WS] Error:", err);
    ws.onclose = () => onDone?.({ type: "done", text: "Connection closed" });

    return ws;
}

export function connectArenaWS(battleId, onMessage, onDone) {
    const wsBase = API_BASE.replace("http", "ws");
    const ws = new WebSocket(`${wsBase}/ws/arena/${battleId}`);

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "done") {
            onDone?.(data);
        } else {
            onMessage?.(data);
        }
    };

    ws.onerror = (err) => console.error("[WS] Error:", err);
    ws.onclose = () => onDone?.({ type: "done", text: "Connection closed" });

    return ws;
}
