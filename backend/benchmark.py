
def calculate_brutal_score(
    duration_ms: int,
    token_cost: float,
    tool_calls: int,
    output: str,
    success: bool,
    prev_score: float = 0,
    prev_runs: int = 0,
) -> dict:

    speed_score = max(0, 100 - (duration_ms / 60000) * 100)

    cost_score = max(0, 100 - (token_cost / 0.10) * 100)

    if output and len(output) > 0:
        length_score = min(100, len(output) / 5)
        has_structure = 20 if any(c in output for c in ["{", "[", "#", "##"]) else 0
        accuracy_score = min(100, length_score + has_structure)
    else:
        accuracy_score = 0

    if prev_runs > 0:
        success_count = (prev_score / 100 * prev_runs * 0.2) + (1 if success else 0)
        reliability_score = (success_count / (prev_runs + 1)) * 100
    else:
        reliability_score = 100 if success else 0

    brutal_score = (
        speed_score * 0.25
        + cost_score * 0.25
        + accuracy_score * 0.30
        + reliability_score * 0.20
    )

    return {
        "brutal_score": round(min(100, max(0, brutal_score)), 1),
        "speed_score": round(speed_score, 1),
        "cost_score": round(cost_score, 1),
        "accuracy_score": round(accuracy_score, 1),
        "reliability_score": round(reliability_score, 1),
    }

BENCHMARK_TASKS = {
    "research": {
        "goal": "Summarize the key breakthroughs in quantum computing from 2024-2025. Provide 5 citations.",
        "keywords": ["quantum", "computing", "breakthrough", "citation", "2024"],
    },
    "engineering": {
        "goal": "Debug this error: TypeError: Cannot read properties of undefined (reading 'map'). Provide root cause and fix.",
        "keywords": ["TypeError", "undefined", "map", "root cause", "fix"],
    },
    "productivity": {
        "goal": "Create a study plan for a 16-week semester covering Data Structures and Algorithms.",
        "keywords": ["week", "schedule", "study", "algorithm", "data structure"],
    },
    "career": {
        "goal": "Tailor this resume for a Software Engineer role at a FAANG company. Focus on impact metrics.",
        "keywords": ["experience", "skills", "impact", "software", "engineer"],
    },
}
