
import json
import sys
import time
import random

STEPS = [
    {"level": "info", "text": "Initializing agent..."},
    {"level": "info", "text": "Parsing goal parameters..."},
    {"level": "tool", "text": "[TOOL] WebSearch.query(goal_keywords)"},
    {"level": "success", "text": "Found 18 relevant results across 3 databases"},
    {"level": "tool", "text": "[TOOL] ContentParser.extract(top_results)"},
    {"level": "info", "text": "[PLAN] Ranking results by relevance score"},
    {"level": "tool", "text": "[TOOL] Synthesizer.merge(findings, format='structured')"},
    {"level": "success", "text": "Generated structured analysis (723 words)"},
    {"level": "tool", "text": "[TOOL] QualityCheck.validate(output)"},
    {"level": "success", "text": "Output validated — confidence: 94%"},
]

def main():
    goal_json = sys.argv[sys.argv.index("--goal") + 1] if "--goal" in sys.argv else "{}"
    goal_data = json.loads(goal_json)

    start = time.time()

    for i, step in enumerate(STEPS):
        elapsed = time.time() - start
        log = {
            "type": "log",
            "time": f"{elapsed:.1f}s",
            "level": step["level"],
            "text": step["text"],
        }
        print(json.dumps(log), flush=True)
        time.sleep(random.uniform(0.3, 0.8))

    elapsed = time.time() - start
    result = {
        "type": "result",
        "output": f"Analysis complete for: {goal_data.get('goal', 'unknown goal')}. "
        f"Found 18 sources, synthesized into structured report with 94% confidence. "
        f"Key findings include relevant data points across multiple domains.",
        "tool_calls": 4,
        "token_cost": round(random.uniform(0.01, 0.05), 3),
    }
    print(json.dumps(result), flush=True)

if __name__ == "__main__":
    main()
